-- Run once in the Supabase SQL editor (Database > SQL Editor > New query) — incremental
-- follow-up to schema.sql, adding the column order-webhook-worker needs to track fulfillment
-- progress. Fourthwall doesn't expose real carrier tracking numbers/links to shop owners via
-- any documented API (checked their real OpenAPI spec before building this) — `status` is the
-- most granular fulfillment signal actually available, via the ORDER_UPDATED webhook.

alter table public.orders
  add column status text;
