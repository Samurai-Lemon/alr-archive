-- Run once in the Supabase SQL editor (Database > SQL Editor > New query) — incremental
-- follow-up to schema.sql, adding the columns the submission-publish-worker needs to record
-- what it did and to stay idempotent across webhook redeliveries (Supabase's own webhook docs
-- warn deliveries can repeat). See ../cloudflare/submission-publish-worker/README.md for the
-- Worker + Database Webhook this supports.

alter table public.submissions
  add column github_pr_url text,
  add column published_at timestamptz;

-- Nothing else changes: RLS already lets admins update these via the existing
-- "admins can update submissions" policy (migration_review_notifications.sql), and the Worker
-- itself writes through the service_role key, which bypasses RLS entirely.
