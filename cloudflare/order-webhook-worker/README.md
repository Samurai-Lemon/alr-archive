# ALR order webhook

Receives Fourthwall's `ORDER_PLACED` and `ORDER_UPDATED` webhooks and writes/updates the order in
the `orders` table in Supabase (see `../../supabase/schema.sql`), so it shows up on a user's
`/Account` page — including fulfillment status (Confirmed, In Production, Shipped, Delivered,
etc.) as it changes. Separate from the existing `alr-shop-proxy` Worker — deploying this can't
break the product catalog.

**On tracking numbers:** Fourthwall does not expose a real carrier tracking number or tracking
URL to shop owners through any documented API or webhook — confirmed by reading their actual
`platform.json` OpenAPI spec (2026-09-12), not assumed. A `ShippingLabel` with `trackingNumber`/
`trackingCompany` exists internally (submitted by whichever print-on-demand partner fulfills the
order via `POST /fulfillments`), but it's never returned back out anywhere. `status` is the most
granular fulfillment signal actually available — that's what this Worker and the `/Account` page
show instead.

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
2. Create **two** webhook subscriptions, both pointing at the same Worker URL above — Fourthwall
   subscribes one event type per webhook, it can't be a single webhook covering both:
   - one subscribed to `ORDER_PLACED`
   - one subscribed to `ORDER_UPDATED`
3. Fourthwall generates a webhook secret per subscription — if it gives you two different secrets,
   only one `FOURTHWALL_WEBHOOK_SECRET` value is set on the Worker, so either use the same secret
   for both subscriptions if Fourthwall lets you set it, or check which of the two the Worker
   needs to accept (its signature check is against a single shared secret).

## Field mapping

Confirmed against a real Fourthwall test webhook (2026-08-27) and their `platform.json` OpenAPI
spec (2026-09-12) — `extractOrderFields()` in `src/index.ts` reads `data.email`, `data.id`,
`data.offers` (line items), `data.status`, and `data.amounts.total.{value,currency}` for
`ORDER_PLACED`. For `ORDER_UPDATED`, `extractOrderUpdateFields()` reads the same `id`/`status`
fields but nested one level deeper, under `data.order` (that event's `data` is
`{ order: {...}, update: {...} }`, not the order fields directly — a real, confirmed difference
between the two event shapes, not an inconsistency in this code). The full raw `data` object from
`ORDER_PLACED` is always stored in the `raw_payload` column regardless, so nothing is lost if
Fourthwall ever changes either shape — if a future order looks off, check that column first and
adjust the relevant extract function to match.

## Idempotency

Fourthwall's own docs warn that events can be delivered out of order or more than once. The
`ORDER_PLACED` upsert is keyed on `fourthwall_order_id` (`on_conflict=fourthwall_order_id` +
`Prefer: resolution=merge-duplicates`), so redeliveries just overwrite the same row rather than
duplicating it. `ORDER_UPDATED` is a plain `PATCH` matched on that same id, not an upsert — if it
somehow arrives before the corresponding `ORDER_PLACED` has created the row yet, the patch matches
zero rows and is silently skipped rather than erroring (inserting a partial row would fail the
table's `NOT NULL` constraints on `customer_email`/`raw_payload` anyway). The next status update
after `ORDER_PLACED` catches up lands normally, so at worst one intermediate status is missed, not
lost data.

## Badges

After a successful order upsert, if the order matched a real account (`findUserIdByEmail` found
one), this grants the `field_equipped` badge (see `quartz/components/AccountScript.tsx`'s
`BADGE_LABELS` for the display name) — any order, current or future products alike, since it's
not tied to a specific product id. Guest checkouts with no matching account don't get it; if they
later create an account and run `claim_orders()` to attach that old order, the badge still won't
retroactively appear, since granting only happens on the live webhook event, not on claim. Uses
the same `on_conflict` + `ignore-duplicates` pattern as the badges-granting code in
`../submission-publish-worker/src/index.ts` (duplicated there, not shared — these are two
separately deployed Workers).
