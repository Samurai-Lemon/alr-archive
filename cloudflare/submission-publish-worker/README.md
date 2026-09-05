# ALR submission → publish worker

Closes the loop on approving a submission on `/Admin`: instead of you hand-copying the approved
form data into a new file in your Obsidian vault and committing it yourself, this Worker fires
the moment a submission's `status` flips to `approved`, builds the corresponding Echo / Reality
Investigation Report / Equipment / Organization markdown file (matching the real format docs
under `content/Archive Documentation Format/`), and opens it as a **pull request** against `v4` —
never commits directly. You still review and merge it (merging triggers the existing
`deploy.yml` automatically), so nothing goes live without you looking at it, but you never have
to retype a submission by hand again.

Separate from `../order-webhook-worker` — deploying this can't touch orders.

## One-time setup

### 1. A GitHub token the Worker can use to open PRs

Create a fine-grained personal access token (GitHub → Settings → Developer settings →
Personal access tokens → Fine-grained tokens) scoped to **only this repository**, with
Contents: Read and write, and Pull requests: Read and write. Copy it — you'll paste it into
`wrangler secret put` below and won't see it again.

### 2. Add the `github_pr_url` / `published_at` columns

Run `../../supabase/migration_submission_publish.sql` once in the Supabase SQL editor
(Database > SQL Editor > New query) if you haven't already.

### 3. Deploy the Worker

```
cd cloudflare/submission-publish-worker
npm install
npx wrangler login          # once, if you haven't already
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY   # Project Settings > API > service_role key
npx wrangler secret put GITHUB_TOKEN                # the token from step 1
npx wrangler secret put WEBHOOK_SECRET              # any random string you generate yourself
npx wrangler deploy
```

Edit `SUPABASE_URL`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BASE_BRANCH` in `wrangler.toml`
first if any of them aren't already correct for your setup.

`wrangler deploy` prints the Worker's URL, e.g.
`https://alr-submission-publish.<your-subdomain>.workers.dev`.

### 4. Wire it up as a Supabase Database Webhook

Supabase dashboard → Database → Webhooks → Create a new webhook:
- Table: `submissions`
- Events: `Update` only
- Type: HTTP Request → POST to the Worker URL from step 3
- HTTP Headers: add `X-Webhook-Secret: <the same random string from WEBHOOK_SECRET>`

That's it — no code path changes. `/Admin`'s Approve button still does exactly what it always
did (`update submissions set status = 'approved'`); Supabase's own webhook system is what
notices that and calls the Worker.

## What happens on approval

1. Supabase calls the Worker with the updated row (and the row's previous state, so the Worker
   can tell "just became approved" apart from "already approved, notes got edited" or a
   redelivery — see Idempotency below).
2. The Worker reads the live `v4` branch's file tree to find the next free `ECHO-###` or `R-###`
   id (echo/reality only — equipment and organization entries in this site don't carry numeric
   ids, matching the real content already in `content/Equipment/` and the one existing
   `content/Foundations/Opposition/Ordo Damnatio Memoriae.md`-style organization file). New
   organization entries land in `content/Organizations/` — there's no dedicated folder for them
   yet in the real content tree, so this is a judgment call; move that folder if you'd rather
   organizations lived somewhere else.
3. It builds the markdown file from the submission's `form_data` — the exact same fields the
   `/Admin` detail panel already shows you, using the identical field keys/section labels
   (`SUBMISSION_LAYOUTS` in `quartz/components/AccountScript.tsx`). The submitted freeform text
   (Description, Observed Behavior, etc.) is used as-is — this is a draft, not a finished
   entry, which is exactly why it's a PR and not a direct commit.
4. It opens a branch (`submission/<type>-<id-prefix>`) and a PR against `v4` with a body linking
   back to the submission id and explicitly flagging it as a draft to review before merging.
5. It writes the PR url back onto the `submissions` row (`github_pr_url`, `published_at`) — the
   `/Admin` detail panel shows a "View PR →" link once that's set.

## Idempotency

Supabase's own webhook docs warn deliveries can repeat or arrive out of order. The Worker only
acts when `record.status === "approved"` **and** `old_record.status !== "approved"` **and**
`record.github_pr_url` is still null — so a redelivered or duplicate webhook call for a
submission that's already been published is a silent no-op, not a second PR.

## If a submission type's fields ever change

The field mapping lives in two places that have to be kept in sync by hand (same as the
order-webhook-worker's `extractOrderFields()` — there's no shared module between this Worker's
build and the main site's): `content/Submit-*.md` (the real form field names) and
`SUBMISSION_LAYOUTS` in `quartz/components/AccountScript.tsx` (what the admin panel displays).
If you add/rename a field in a submit form, update the matching `build*()` function in
`src/index.ts` to match.
