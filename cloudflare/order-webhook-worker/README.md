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

## Field mapping

Confirmed against a real Fourthwall test webhook (2026-08-27) — `extractOrderFields()` in
`src/index.ts` reads `data.email`, `data.id`, `data.offers` (line items), and
`data.amounts.total.{value,currency}`. The full raw `data` object is always stored in the
`raw_payload` column regardless, so nothing is lost if Fourthwall ever changes this shape — if a
future order looks off, check that column first and adjust `extractOrderFields()` to match.

## Idempotency

Fourthwall's own docs warn that events can be delivered out of order or more than once. The
upsert is keyed on `fourthwall_order_id` (`on_conflict=fourthwall_order_id` + `Prefer:
resolution=merge-duplicates`), so redeliveries just overwrite the same row rather than
duplicating it.
