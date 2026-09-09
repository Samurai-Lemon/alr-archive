-- Run once in the Supabase SQL editor (Database > SQL Editor > New query) — incremental
-- follow-up to schema.sql. Lets a submitter delete their own submission (so it stops showing on
-- their /Account page) without granting them any ability to touch anyone else's row, or to
-- update status/reviewer_notes on their own (that stays locked down — see schema.sql's comments).
--
-- Deleting the submissions row has no effect on anything already published: the actual Echo/
-- Reality markdown file (and any PR the submission-publish-worker already opened) lives
-- independently in the git repo once merged — this only removes the review-queue record.

create policy "submissions are deletable by their owner"
  on public.submissions for delete
  using (auth.uid() = user_id);
