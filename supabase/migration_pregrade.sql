-- Run once in the Supabase SQL editor (Database > SQL Editor > New query), after
-- migration_graded_cards.sql. Adds pre-grades (made only in the ALR Grading desktop app):
--
--   * graded_cards.kind is 'grade' (official ALR cert, 000001-ALR) or 'pregrade' (estimate before
--     sending to PSA/TAG/Beckett/CGC, PRE-000001). Each kind has its own number sequence, so
--     pre-grades never use up or mix with official certs. Existing cards stay 'grade' with the
--     same numbers, so every printed QR keeps working.
--   * graded_cards.pregrade holds the measurements: centering ratios, inspection ratings,
--     sub-grades and per-company estimates.
--   * get_cert() now returns kind and pregrade, and reads "PRE-12" as pre-grade 12 while "12" or
--     "000012-ALR" stays official cert 12.

-- ── kind + measurements ──────────────────────────────────────────────────────
alter table public.graded_cards
  add column kind text not null default 'grade' check (kind in ('grade', 'pregrade')),
  add column pregrade jsonb not null default '{}'::jsonb check (pg_column_size(pregrade) <= 8000);

-- ── numbering per kind ───────────────────────────────────────────────────────
create sequence public.graded_card_precert_seq start 1;
revoke all on sequence public.graded_card_precert_seq from anon, authenticated;

-- cert_no is now unique within its kind; the printed cert carries the kind.
alter table public.graded_cards drop constraint graded_cards_cert_no_key;
drop index public.graded_cards_cert_key;
alter table public.graded_cards drop column cert;
alter table public.graded_cards add column cert text generated always as (
  case when kind = 'pregrade' then 'PRE-' || lpad(cert_no::text, 6, '0')
       else lpad(cert_no::text, 6, '0') || '-ALR' end
) stored;
create unique index graded_cards_kind_cert_no_key on public.graded_cards (kind, cert_no);
create unique index graded_cards_cert_key on public.graded_cards (cert);

-- New card: number from its kind's sequence (whatever the client sent).
create or replace function public.graded_cards_before_insert()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  if (select count(*) from public.graded_cards where user_id = new.user_id) >= 1000 then
    raise exception 'card limit reached (1000 per account)';
  end if;
  if new.kind = 'pregrade' then
    new.cert_no := nextval('public.graded_card_precert_seq');
  else
    new.cert_no := nextval('public.graded_card_cert_seq');
  end if;
  new.created_at := now();
  new.updated_at := now();
  return new;
end;
$$;

-- Edits: owner, kind, number and created date never change.
create or replace function public.graded_cards_before_update()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  new.user_id := old.user_id;
  new.kind := old.kind;
  new.cert_no := old.cert_no;
  new.created_at := old.created_at;
  new.updated_at := now();
  return new;
end;
$$;

-- ── public cert lookup ───────────────────────────────────────────────────────
-- "PRE-000012", "pre-12" -> pre-grade 12; "000012-ALR", "000012", "12" -> official cert 12.
create or replace function public.get_cert(c text)
returns jsonb
language sql
stable
security definer set search_path = ''
as $$
  select jsonb_build_object(
    'kind', g.kind,
    'cert', g.cert,
    'cert_no', g.cert_no,
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
    'pregrade', g.pregrade,
    'official_image_url', g.official_image_url,
    'front_photo_path', g.front_photo_path,
    'back_photo_path', g.back_photo_path
  )
  from public.graded_cards g
  where g.kind = case when coalesce(c, '') ~* 'pre' then 'pregrade' else 'grade' end
    and g.cert_no = nullif(regexp_replace(coalesce(c, ''), '[^0-9]', '', 'g'), '')::bigint
    and char_length(regexp_replace(coalesce(c, ''), '[^0-9]', '', 'g')) <= 12;
$$;

revoke all on function public.get_cert(text) from public;
grant execute on function public.get_cert(text) to anon, authenticated;
