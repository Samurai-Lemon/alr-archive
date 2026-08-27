# ALR order webhook

Receives Fourthwall's `ORDER_PLACED` webhook and writes the order into the `orders` table in
Supabase (see `../../supabase/schema.sql`), so it shows up on a user's `/Account` page. Separate
from the existing `alr-shop-proxy` Worker — deploying this can't break the product catalog.

## Deploy

```
cd cloudflare/order-webhook-worker
npm install
npx wrangler login          # once, if you haven't already
npx wrangler secret put FOURTHWALL_WEBHOOK_SECRET
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY   # Project Settings > API > service_role key — never expose this client-side
npx wrangler deploy
```

Edit `SUPABASE_URL` in `wrangler.toml` to your project's URL first (not secret, just needs to be correct).

`wrangler deploy` prints the Worker's URL, e.g. `https://alr-order-webhook.<your-subdomain>.workers.dev`.

## Wire it up in Fourthwall

1. Fourthwall shop admin → Developer/Webhooks settings (or `POST /webhooks` via their API — see
   https://docs.fourthwall.com/webhooks/).
2. Create a webhook subscribed to `ORDER_PLACED`, pointing at the Worker URL above.
3. Fourthwall generates a webhook secret in that same panel — that's the value for
   `FOURTHWALL_WEBHOOK_SECRET`, not something you invent yourself.

## Verify field mapping before trusting it

Fourthwall's public docs confirm the outer webhook envelope and the HMAC-SHA256 signature scheme,
but not the exact field names inside an order's `data` payload. `src/index.ts`'s
`extractOrderFields()` guesses a few plausible paths (`data.customer.email`, `data.id`,
`data.lineItems`, `data.total.value`, etc.) with fallbacks, and always stores the *entire* raw
`data` object in the `raw_payload` column regardless of whether the guesses are right — nothing is
ever lost even if a field path is wrong.

Before relying on this for real:

1. Use Fourthwall's dashboard "send test webhook" button (or place a real test order).
2. Run `npx wrangler tail` while it fires, or check a row's `raw_payload` column directly in the
   Supabase table editor.
3. If `customer_email` or `fourthwall_order_id` come back wrong/empty on a row, fix the paths in
   `extractOrderFields()` and redeploy — everything else (signature check, upsert, user matching)
   doesn't need to change.

## Idempotency

Fourthwall's own docs warn that events can be delivered out of order or more than once. The
upsert is keyed on `fourthwall_order_id` (`on_conflict=fourthwall_order_id` + `Prefer:
resolution=merge-duplicates`), so redeliveries just overwrite the same row rather than
duplicating it.
