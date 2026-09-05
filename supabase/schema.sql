-- ALR Initiative — Account system schema.
-- Run once in the Supabase SQL editor for your project (Database > SQL Editor > New query).
--
-- Design notes:
--   * profiles/submissions are readable+writable by their own owner via RLS.
--   * orders/badges are read-only to their owner — only the service_role key can insert/update
--     them (service_role bypasses RLS entirely). The order-webhook Worker uses that key; badges
--     will later be granted the same way once a badge-granting system exists.
--   * claim_orders() lets someone who ordered as a guest (or before creating an account) attach
--     that order to their account the first time they log in with the same email.
--   * profiles.is_admin marks the (small, manually-flipped) set of accounts allowed to review
--     submissions on /Admin — see the bottom of this file.

-- ── profiles ───────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles are viewable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles are updatable by their owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user is created.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── submissions ────────────────────────────────────────────────────────────
-- Mirrors the four Submit-*.md / Formspree forms so a user can see their own submission history.
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  submission_type text not null check (submission_type in ('echo', 'reality', 'equipment', 'organization')),
  title text not null,
  form_data jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewer_notes text,
  status_updated_at timestamptz not null default now(),
  seen_at timestamptz,
  -- Set by the submission-publish-worker once it opens a PR for an approved submission — see
  -- ../cloudflare/submission-publish-worker/README.md. Null until then; also doubles as the
  -- idempotency guard so a redelivered webhook doesn't open a second PR for the same submission.
  github_pr_url text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.submissions enable row level security;

create policy "submissions are viewable by their owner"
  on public.submissions for select
  using (auth.uid() = user_id);

create policy "submissions are insertable by their owner"
  on public.submissions for insert
  with check (auth.uid() = user_id);

-- The submitter can never update status/reviewer_notes themselves (no owner-scoped update
-- policy for those) — only admins (below) and the seen-tracking RPC can touch this table further.

-- Admins (profiles.is_admin = true) can see and update every submission, for the /Admin review
-- queue. The profiles subquery is safe under RLS: profiles' own "viewable by owner" policy only
-- lets this lookup see auth.uid()'s own row anyway, which is exactly the row being checked.
create policy "admins can view all submissions"
  on public.submissions for select
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

create policy "admins can update submissions"
  on public.submissions for update
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Auto-stamp status_updated_at whenever status actually changes, regardless of how the update
-- happens — this is what "new update the submitter hasn't seen yet" is measured against.
create function public.set_submission_status_updated_at()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  if new.status is distinct from old.status then
    new.status_updated_at = now();
  end if;
  return new;
end;
$$;

create trigger on_submission_status_change
  before update on public.submissions
  for each row execute procedure public.set_submission_status_updated_at();

-- Submitters can mark their own submission "seen" (and only that) via this RPC rather than a
-- blanket UPDATE policy, so they can't touch status/reviewer_notes themselves.
create function public.mark_submission_seen(submission_id uuid)
returns void
language plpgsql
security definer set search_path = ''
as $$
begin
  update public.submissions
  set seen_at = now()
  where id = submission_id and user_id = auth.uid();
end;
$$;

-- ── orders ─────────────────────────────────────────────────────────────────
-- Populated only by the order-webhook Cloudflare Worker (cloudflare/order-webhook-worker) using
-- the service_role key, which bypasses RLS — there is intentionally no insert/update policy for
-- the authenticated role, so a user can never fabricate their own order.
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_email text not null,
  fourthwall_order_id text not null unique,
  raw_payload jsonb not null,
  items jsonb,
  total numeric,
  currency text,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "orders are viewable by their owner"
  on public.orders for select
  using (auth.uid() = user_id);

-- Retroactively attach guest/pre-signup orders to the logged-in user's account by email match.
create function public.claim_orders()
returns void
language plpgsql
security definer set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  update public.orders
  set user_id = auth.uid()
  where user_id is null
    and customer_email = auth.email();
end;
$$;

-- ── badges ─────────────────────────────────────────────────────────────────
-- Ships now so the profile page has a real section to query; will render empty until a
-- badge-granting system exists. Same "service_role only" write pattern as orders.
create table public.badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_key text not null,
  awarded_at timestamptz not null default now(),
  unique (user_id, badge_key)
);

alter table public.badges enable row level security;

create policy "badges are viewable by their owner"
  on public.badges for select
  using (auth.uid() = user_id);

-- ── making yourself an admin ─────────────────────────────────────────────────
-- Once this schema is applied and you've signed up an account, flip it to admin so /Admin's
-- review queue lets you in (find your id under Authentication > Users, or:
-- select id, email from auth.users;):
-- update public.profiles set is_admin = true where id = '<your-user-id>';
