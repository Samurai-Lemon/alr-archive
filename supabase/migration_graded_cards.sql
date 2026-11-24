-- Run once in the Supabase SQL editor (Database > SQL Editor > New query) — adds saved grading
-- cards to accounts: the Grading Terminal (site and desktop app) saves a card here, the site issues
-- its cert number, and the QR on the label opens a public report page for that one card.
--
-- Design notes:
--   * graded_cards rows are private to their owner through RLS (read, add, edit, delete).
--   * The public cert page never reads the table directly. It calls get_cert(), a security-definer
--     function that returns only report fields for one cert: no user id, email or display name.
--   * Cert numbers come from a sequence and are set by a trigger, so a user can't choose, reuse
--     or change one. They print as 000001-ALR, 000002-ALR, ...
--   * Photos live in the public "card-photos" bucket under <card id>/front.jpg (and back.jpg).
--     Paths carry the card id, never the user id. Only the card's owner can upload, replace or
--     delete them. The app shrinks photos to ~300 KB before upload; the bucket rejects anything
--     over 1 MB or that isn't JPEG, PNG or WebP.
--   * Deleting an account removes its cards (on delete cascade). The client deletes a card's
--     photos before deleting the card.

-- ── cert numbers ─────────────────────────────────────────────────────────────
create sequence public.graded_card_cert_seq start 1;

-- ── graded_cards ─────────────────────────────────────────────────────────────
create table public.graded_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  cert_no bigint not null unique,
  cert text generated always as (lpad(cert_no::text, 6, '0') || '-ALR') stored,

  -- the card
  game text not null default 'other' check (game in ('one-piece', 'pokemon', 'magic', 'yugioh', 'sports', 'other')),
  card_name text not null check (char_length(card_name) between 1 and 120),
  card_number text check (char_length(card_number) <= 40),        -- e.g. OP05-119
  set_name text check (char_length(set_name) <= 120),             -- e.g. Awakening of the New Era
  printing text check (char_length(printing) <= 120),             -- e.g. SEC · Alternate Art
  language text check (char_length(language) <= 40),

  -- the grade
  grade smallint not null check (grade between 1 and 10),
  grade_label text not null check (char_length(grade_label) between 1 and 40),
  condition jsonb not null default '{}'::jsonb,                   -- {centering, corners, edges, surface}
  notes text check (char_length(notes) <= 2000),
  graded_on date not null default current_date,

  -- the label as printed (set/variant lines, colours) so it can be downloaded again later
  label jsonb not null default '{}'::jsonb,

  -- pictures: an official reference image URL, and the owner's own photos in storage
  official_image_url text check (official_image_url is null or official_image_url ~ '^https://'),
  front_photo_path text,
  back_photo_path text,

  source text not null default 'site' check (source in ('site', 'app')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- keep the jsonb fields small
  check (pg_column_size(condition) <= 2000),
  check (pg_column_size(label) <= 4000)
);

create unique index graded_cards_cert_key on public.graded_cards (cert);
create index graded_cards_user_idx on public.graded_cards (user_id, created_at desc);

alter table public.graded_cards enable row level security;

-- Signed-out visitors get no direct access at all; the cert page goes through get_cert() below.
revoke all on public.graded_cards from anon;
revoke all on sequence public.graded_card_cert_seq from anon, authenticated;

create policy "graded cards are viewable by their owner"
  on public.graded_cards for select
  using (auth.uid() = user_id);

create policy "graded cards are insertable by their owner"
  on public.graded_cards for insert
  with check (auth.uid() = user_id);

create policy "graded cards are updatable by their owner"
  on public.graded_cards for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "graded cards are deletable by their owner"
  on public.graded_cards for delete
  using (auth.uid() = user_id);

-- New card: the cert number always comes from the sequence (whatever the client sent), and each
-- account is capped at 1000 cards to keep storage in check.
create function public.graded_cards_before_insert()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  if (select count(*) from public.graded_cards where user_id = new.user_id) >= 1000 then
    raise exception 'card limit reached (1000 per account)';
  end if;
  new.cert_no := nextval('public.graded_card_cert_seq');
  new.created_at := now();
  new.updated_at := now();
  return new;
end;
$$;

create trigger graded_cards_before_insert
  before insert on public.graded_cards
  for each row execute procedure public.graded_cards_before_insert();

-- Edits: the owner, cert number and created date can never change.
create function public.graded_cards_before_update()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  new.user_id := old.user_id;
  new.cert_no := old.cert_no;
  new.created_at := old.created_at;
  new.updated_at := now();
  return new;
end;
$$;

create trigger graded_cards_before_update
  before update on public.graded_cards
  for each row execute procedure public.graded_cards_before_update();

-- ── public cert lookup (what the QR opens) ───────────────────────────────────
-- Accepts "000124-ALR", "000124" or "124". Returns null if there's no such card.
create function public.get_cert(c text)
returns jsonb
language sql
stable
security definer set search_path = ''
as $$
  select jsonb_build_object(
    'cert', g.cert,
    'game', g.game,
    'card_name', g.card_name,
    'card_number', g.card_number,
    'set_name', g.set_name,
    'printing', g.printing,
    'language', g.language,
    'grade', g.grade,
    'grade_label', g.grade_label,
    'condition', g.condition,
    'notes', g.notes,
    'graded_on', g.graded_on,
    'label', g.label,
    'official_image_url', g.official_image_url,
    'front_photo_path', g.front_photo_path,
    'back_photo_path', g.back_photo_path
  )
  from public.graded_cards g
  where g.cert_no = nullif(regexp_replace(coalesce(c, ''), '[^0-9]', '', 'g'), '')::bigint
    and char_length(regexp_replace(coalesce(c, ''), '[^0-9]', '', 'g')) <= 12;
$$;

revoke all on function public.get_cert(text) from public;
grant execute on function public.get_cert(text) to anon, authenticated;

-- ── card photos ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('card-photos', 'card-photos', true, 1048576, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- Paths are <card id>/<file>. Only the owner of that card may add, replace or remove files.
-- Anyone can view them through the public URL (public bucket), which is what the cert page needs;
-- the owner-only select policy below is what lets the owner overwrite (upsert) a photo.
create policy "card photos are listable by the card owner"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'card-photos'
    and exists (
      select 1 from public.graded_cards g
      where g.id::text = (storage.foldername(name))[1] and g.user_id = auth.uid()
    )
  );

create policy "card photos are uploadable by the card owner"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'card-photos'
    and exists (
      select 1 from public.graded_cards g
      where g.id::text = (storage.foldername(name))[1] and g.user_id = auth.uid()
    )
  );

create policy "card photos are replaceable by the card owner"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'card-photos'
    and exists (
      select 1 from public.graded_cards g
      where g.id::text = (storage.foldername(name))[1] and g.user_id = auth.uid()
    )
  );

create policy "card photos are deletable by the card owner"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'card-photos'
    and exists (
      select 1 from public.graded_cards g
      where g.id::text = (storage.foldername(name))[1] and g.user_id = auth.uid()
    )
  );
