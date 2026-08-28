-- Run once in the Supabase SQL editor (Database > SQL Editor > New query) — this is an
-- incremental follow-up to schema.sql, adding admin submission review + in-app notification
-- tracking. schema.sql itself has also been updated to include all of this for future fresh
-- installs, so this file only matters for a project that already ran the original schema.sql.

alter table public.submissions
  add column reviewer_notes text,
  add column status_updated_at timestamptz not null default now(),
  add column seen_at timestamptz;

alter table public.profiles
  add column is_admin boolean not null default false;

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

-- Admins (profiles.is_admin = true) can see and update every submission. The subquery against
-- profiles is safe under RLS here: profiles' own "viewable by owner" policy only lets this
-- lookup see auth.uid()'s own row anyway, which is exactly the row being checked.
create policy "admins can view all submissions"
  on public.submissions for select
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

create policy "admins can update submissions"
  on public.submissions for update
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Submitters can mark their own submission "seen" (and only that — not status/notes) via this
-- RPC rather than a blanket UPDATE policy, so they can't tamper with anything else.
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

-- Once this runs, flip your own account to admin (find your id under Authentication > Users,
-- or run: select id, email from auth.users;):
-- update public.profiles set is_admin = true where id = '<your-user-id>';
