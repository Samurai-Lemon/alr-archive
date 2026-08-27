// Receives Fourthwall's ORDER_PLACED webhook and writes the order into Supabase using the
// service-role key (bypasses RLS — this is the only writer `orders` ever has, by design; see
// supabase/schema.sql). Deployed separately from the main Quartz site; see README.md.
//
// NOTE: Fourthwall's public docs confirm the outer envelope shape ({ id, webhookId, shopId,
// type, apiVersion, createdAt, testMode, data }) and the signature scheme, but not the exact
// field names inside `data` for an order. This worker stores the full raw `data` blob regardless
// of shape (nothing is ever lost) and *guesses* a few plausible paths for email/total/line items
// with fallbacks. Use Fourthwall's dashboard "send test webhook" button, inspect a real payload
// via `wrangler tail`, and adjust `extractOrderFields` below if the guessed paths are wrong.

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
  const email: string | null =
    data?.customer?.email ?? data?.email ?? data?.order?.customer?.email ?? data?.billingAddress?.email ?? null

  const orderId: string | null = String(data?.id ?? data?.orderId ?? data?.order?.id ?? "") || null

  const items = data?.lineItems ?? data?.items ?? data?.order?.lineItems ?? null

  const totalValue = data?.total?.value ?? data?.totalPrice?.value ?? data?.amount?.value ?? null
  const totalCurrency = data?.total?.currency ?? data?.totalPrice?.currency ?? data?.amount?.currency ?? null

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

    return new Response("OK", { status: 200 })
  },
}
