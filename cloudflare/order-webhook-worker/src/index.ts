// Receives Fourthwall's ORDER_PLACED webhook and writes the order into Supabase using the
// service-role key (bypasses RLS — this is the only writer `orders` ever has, by design; see
// supabase/schema.sql). Deployed separately from the main Quartz site; see README.md.
//
// Field paths in extractOrderFields() are confirmed against a real Fourthwall test webhook
// (2026-08-27): `data.email`, `data.id`, `data.offers` (line items), and
// `data.amounts.total.{value,currency}`. The full raw `data` blob is always stored regardless,
// so nothing is lost even if Fourthwall changes this shape later.

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

  return { email, orderId, items, total: totalValue, currency: totalCurrency }
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

    if (payload.type !== "ORDER_PLACED") {
      // Acknowledge and ignore any other subscribed event types.
      return new Response("Ignored", { status: 200 })
    }

    const { email, orderId, items, total, currency } = extractOrderFields(payload.data)

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
