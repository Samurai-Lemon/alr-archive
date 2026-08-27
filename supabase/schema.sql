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

-- ── profiles ───────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
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
  created_at timestamptz not null default now()
);

alter table public.submissions enable row level security;

create policy "submissions are viewable by their owner"
  on public.submissions for select
  using (auth.uid() = user_id);

create policy "submissions are insertable by their owner"
  on public.submissions for insert
  with check (auth.uid() = user_id);

-- Deliberately no update/delete policy: submissions are immutable once sent, matching
-- the existing "you will not receive an automated confirmation" / no-edit Formspree flow.

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
