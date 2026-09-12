// Receives Fourthwall's ORDER_PLACED and ORDER_UPDATED webhooks and writes/updates the order in
// Supabase using the service-role key (bypasses RLS — this is the only writer `orders` ever has,
// by design; see supabase/schema.sql). Deployed separately from the main Quartz site; see
// README.md.
//
// Field paths in extractOrderFields() are confirmed against a real Fourthwall test webhook
// (2026-08-27): `data.email`, `data.id`, `data.offers` (line items), `data.status`, and
// `data.amounts.total.{value,currency}`. The full raw `data` blob is always stored regardless,
// so nothing is lost even if Fourthwall changes this shape later.
//
// ORDER_UPDATED has a different `data` shape than ORDER_PLACED — confirmed against Fourthwall's
// real platform.json OpenAPI spec (fetched 2026-09-12), not guessed: `data` is
// `{ order: <same Order shape as ORDER_PLACED's data>, update: { type: "STATUS" | "SHIPPING.ADDRESS" | "EMAIL", ... } }`,
// so the order fields are nested one level deeper under `data.order`. That same spec confirms
// Fourthwall does NOT expose a carrier tracking number or tracking URL to shop owners anywhere —
// not on this webhook, not on GET /order/{id}. `status` (CONFIRMED, IN_PRODUCTION, SHIPPED,
// DELIVERED, etc.) is the most granular fulfillment signal actually available.

export interface Env {
  FOURTHWALL_WEBHOOK_SECRET: string
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
}

async function verifySignature(rawBody: string, signatureHeader: string | null, secret: string): Promise<boolean> {
  if (!signatureHeader) return false

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody))
  const computed = btoa(String.fromCharCode(...new Uint8Array(digest)))

  // Constant-time-ish comparison (lengths are fixed/known, this is sufficient for a webhook secret).
  if (computed.length !== signatureHeader.length) return false
  let mismatch = 0
  for (let i = 0; i < computed.length; i++) {
    mismatch |= computed.charCodeAt(i) ^ signatureHeader.charCodeAt(i)
  }
  return mismatch === 0
}

function extractOrderFields(data: any) {
  const email: string | null = data?.email ?? data?.billing?.address?.email ?? null

  const orderId: string | null = String(data?.id ?? data?.friendlyId ?? "") || null

  const items = data?.offers ?? null

  const totalValue = data?.amounts?.total?.value ?? null
  const totalCurrency = data?.amounts?.total?.currency ?? null
  const status: string | null = data?.status ?? null

  return { email, orderId, items, total: totalValue, currency: totalCurrency, status }
}

// ORDER_UPDATED nests the order under `data.order` instead of putting order fields on `data`
// directly — see the file header comment for how this was confirmed.
function extractOrderUpdateFields(data: any) {
  const order = data?.order ?? {}
  const orderId: string | null = String(order?.id ?? order?.friendlyId ?? "") || null
  const status: string | null = order?.status ?? null
  return { orderId, status }
}

async function findUserIdByEmail(env: Env, email: string): Promise<string | null> {
  const res = await fetch(
    `${env.SUPABASE_URL}/auth/v1/admin/users?email=${encodeURIComponent(email)}`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    },
  )
  if (!res.ok) return null
  const body: any = await res.json()
  const users = body?.users ?? []
  return users.length > 0 ? users[0].id : null
}

async function upsertOrder(env: Env, row: Record<string, unknown>): Promise<Response> {
  return fetch(`${env.SUPABASE_URL}/rest/v1/orders?on_conflict=fourthwall_order_id`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(row),
  })
}

// Plain PATCH, not an upsert — an ORDER_UPDATED for an order this Worker hasn't seen an
// ORDER_PLACED for yet (Fourthwall's own docs warn deliveries can arrive out of order) just
// matches zero rows and is silently skipped, rather than inserting a partial row that would fail
// the orders table's NOT NULL constraints on customer_email/raw_payload anyway. The next status
// update after ORDER_PLACED catches up will land normally.
async function updateOrderStatus(env: Env, orderId: string, status: string): Promise<Response> {
  return fetch(`${env.SUPABASE_URL}/rest/v1/orders?fourthwall_order_id=eq.${encodeURIComponent(orderId)}`, {
    method: "PATCH",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ status }),
  })
}

// Grants the "field_equipped" shop badge (see quartz/components/AccountScript.tsx's
// BADGE_LABELS) on any order, current or future products alike — it's not tied to a specific
// product id. Duplicated (not shared) with submission-publish-worker's identical helper since
// these are two independently deployed Workers with no shared module between them, same as the
// other small duplications already in this codebase. Uses the badges table's unique(user_id,
// badge_key) constraint via on_conflict + ignore-duplicates, so a repeat purchase / redelivered
// webhook is a harmless no-op, not an error.
async function grantShopBadge(env: Env, userId: string): Promise<void> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/badges?on_conflict=user_id,badge_key`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify({ user_id: userId, badge_key: "field_equipped" }),
  })
  if (!res.ok) console.error("Failed to grant field_equipped badge to", userId, res.status, await res.text())
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 })
    }

    const rawBody = await request.text()
    const signature = request.headers.get("X-Fourthwall-Hmac-SHA256")

    const valid = await verifySignature(rawBody, signature, env.FOURTHWALL_WEBHOOK_SECRET)
    if (!valid) {
      return new Response("Invalid signature", { status: 400 })
    }

    let payload: any
    try {
      payload = JSON.parse(rawBody)
    } catch {
      return new Response("Invalid JSON", { status: 400 })
    }

    if (payload.type === "ORDER_UPDATED") {
      const { orderId, status } = extractOrderUpdateFields(payload.data)
      if (!orderId || !status) {
        console.error("ORDER_UPDATED payload missing expected fields", JSON.stringify(payload.data))
        return new Response("Missing expected fields", { status: 500 })
      }
      const patchRes = await updateOrderStatus(env, orderId, status)
      if (!patchRes.ok) {
        console.error("Supabase status update failed", patchRes.status, await patchRes.text())
        return new Response("Failed to update order status", { status: 500 })
      }
      return new Response("OK", { status: 200 })
    }

    if (payload.type !== "ORDER_PLACED") {
      // Acknowledge and ignore any other subscribed event types.
      return new Response("Ignored", { status: 200 })
    }

    const { email, orderId, items, total, currency, status } = extractOrderFields(payload.data)

    if (!orderId || !email) {
      console.error("ORDER_PLACED payload missing expected fields", JSON.stringify(payload.data))
      return new Response("Missing expected order fields", { status: 500 })
    }

    const userId = await findUserIdByEmail(env, email)

    const row = {
      user_id: userId,
      customer_email: email,
      fourthwall_order_id: orderId,
      raw_payload: payload.data,
      items,
      total,
      currency,
      status,
    }

    const upsertRes = await upsertOrder(env, row)
    if (!upsertRes.ok) {
      console.error("Supabase upsert failed", upsertRes.status, await upsertRes.text())
      return new Response("Failed to store order", { status: 500 })
    }

    // Guest checkouts (no matching account by email) have no user_id to attach a badge to —
    // that's expected, not an error; they can still claim_orders() and pick it up later if they
    // sign up (the badge itself only grants on a live order event, so it won't be backfilled).
    if (userId) await grantShopBadge(env, userId)

    return new Response("OK", { status: 200 })
  },
}
