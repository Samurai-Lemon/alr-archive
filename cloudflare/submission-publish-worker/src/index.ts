// Fires on Supabase's Database Webhook for UPDATE on public.submissions. When a submission is
// newly approved (status flips to "approved"), this builds the corresponding Echo/Reality/
// Equipment/Organization markdown file per the site's real Archive Documentation Format docs,
// opens it as a branch + pull request against GITHUB_BASE_BRANCH (never commits directly — the
// PR is the review checkpoint before anything goes live), and writes the PR url back onto the
// submission row so the admin panel can link to it and redeliveries are a no-op.
//
// Classification labels/section keys below are duplicated from quartz/util/alrClassifications.ts
// and quartz/components/AccountScript.tsx's SUBMISSION_LAYOUTS (the same duplication pattern
// AccountScript.tsx itself already uses, since neither runtime can import the other's module) —
// if the submit forms or those layouts change, update this file to match.

export interface Env {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  WEBHOOK_SECRET: string
  GITHUB_TOKEN: string
  GITHUB_OWNER: string
  GITHUB_REPO: string
  GITHUB_BASE_BRANCH: string
}

interface SubmissionRow {
  id: string
  submission_type: "echo" | "reality" | "equipment" | "organization"
  title: string
  form_data: Record<string, string>
  status: string
  github_pr_url: string | null
}

interface SupabaseWebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE"
  table: string
  record: SubmissionRow
  old_record: SubmissionRow | null
}

// ── classification labels (mirrors quartz/util/alrClassifications.ts) ──────────────────────
const EC_LABELS: Record<string, string> = { ENT: "Entity", OBJ: "Object", LOC: "Location", PHN: "Phenomenon", EVT: "Event" }
const ESC_LABELS: Record<string, string> = { S1: "Stable", S2: "Volatile", S3: "Fractured", S4: "Terminal" }
const RTS_LABELS: Record<string, string> = { T1: "Fragmentary", T2: "Localized", T3: "Developed", T4: "Grand", T5: "Cosmic" }
const RDS_LABELS: Record<string, string> = { A: "Analogous", B: "Variant", C: "Divergent", D: "Exotic" }
const RCC_LABELS: Record<string, string> = { "RCC-1": "Silent Collapse", "RCC-2": "Systemic Failure", "RCC-3": "Catastrophic Collapse" }

// Echo Classification -> the real subfolder each existing ECHO-### lives under (content/Echoes/*).
const EC_FOLDER: Record<string, string> = { ENT: "Entities", OBJ: "Objects", LOC: "Locations", PHN: "Phenomena", EVT: "Events" }

function classifiedLabel(code: string, labels: Record<string, string>): string {
  if (!code || code === "Unknown") return "Unknown"
  return labels[code] ? `${code} — ${labels[code]}` : code
}

// Filenames on this site are literally "<ID> — <Name>.md" (em dash, spaces) — GitHub's Contents
// API handles that fine URL-encoded; only strip characters that are actually invalid in a path.
function safeFilename(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, "").trim()
}

function frontmatterBlock(fields: Array<[string, string]>): string {
  const lines = fields.filter(([, v]) => v !== undefined && v !== null && v !== "")
  return "---\n" + lines.map(([k, v]) => `${k}: ${v}`).join("\n") + "\n---"
}

// ── per-type file builders ──────────────────────────────────────────────────────────────────
// Each returns the full repo-relative path and file content, following the corresponding format
// doc under content/Archive Documentation Format/ exactly (classification callout shape, section
// order, Notes/Reference callouts).

function buildEcho(sub: SubmissionRow, echoId: string): { path: string; content: string } {
  const d = sub.form_data
  const ec = d.ec || "ENT"
  const esc = d.esc || "S1"
  const name = d.echo_name || sub.title
  const folder = EC_FOLDER[ec] || "Entities"
  const title = `${echoId} — ${safeFilename(name)}`

  const frontmatter =
    "---\n" +
    "tags:\n  - echo\n" +
    "type: echo\n" +
    `echo_id: ${echoId}\n` +
    "designation: E.C.H.O.\n" +
    `ec: ${ec}\n` +
    `esc: ${esc}\n` +
    `rcc: ${d.rcc || "Unknown"}\n` +
    `rts: ${d.rts || "Unknown"}\n` +
    `rds: ${d.rds || "Unknown"}\n` +
    "status: documented\n" +
    (d.submitter_name ? `submitted_by: ${d.submitter_name}\n` : "") +
    "---"

  const notes = d.investigator_notes
    ? `\n---\n\n## Notes\n\n> [!note]- Investigator Note — ${d.submitter_name || "Unknown"}\n> ${d.investigator_notes}\n`
    : ""

  const body = `
# ${title}

> [!${esc.toLowerCase()}] Classification
> **Designation:** E.C.H.O.
> **EC:** ${classifiedLabel(ec, EC_LABELS)}
> **ESC:** ${classifiedLabel(esc, ESC_LABELS)}
> **RCC:** ${classifiedLabel(d.rcc, RCC_LABELS)}
> **RTS:** ${classifiedLabel(d.rts, RTS_LABELS)}
> **RDS:** ${classifiedLabel(d.rds, RDS_LABELS)}

---

## Description

${d.echo_description || ""}

---

## Observed Behavior

${d.observed_behavior || ""}

---

## Manifestation Pattern

${d.manifestation_pattern || ""}
${notes}
---

## Reference

> [!abstract] Archive Reference
> This entry is part of the [[Echoes]] catalog maintained by the [[ALR Initiative]] within [[The Archive]]. Submitted by ${d.submitter_name || "an independent researcher"} for Archive review.
`.trim()

  return { path: `content/Echoes/${folder}/${title}.md`, content: frontmatter + "\n\n" + body + "\n" }
}

function buildReality(sub: SubmissionRow, realityId: string): { path: string; content: string } {
  const d = sub.form_data
  const title = `Reality Investigation Report — ${realityId}`

  const frontmatter =
    "---\n" +
    "tags:\n  - reality\n" +
    "type: reality\n" +
    `rts: ${d.rts || "Unknown"}\n` +
    `rds: ${d.rds || "Unknown"}\n` +
    `rcc: ${d.rcc || "Unknown"}\n` +
    "status: documented\n" +
    (d.submitter_name ? `submitted_by: ${d.submitter_name}\n` : "") +
    "---"

  const body = `
# ${title}

> [!info] Reality Classification
> **RTS:** ${classifiedLabel(d.rts, RTS_LABELS)}
> **RDS:** ${classifiedLabel(d.rds, RDS_LABELS)}
> **RCC:** ${classifiedLabel(d.rcc, RCC_LABELS)}
> **Investigation Authority:** [[ALR Initiative]]

---

## Investigation Overview

> [!info] Investigation Summary
> ${d.investigation_overview || ""}

---

## Environmental Observations

> [!abstract] Environmental Survey
> ${d.environmental_observations || ""}

---

## Civilizational Status

> [!warning] Population Condition
> ${d.civilizational_status || ""}

---

## Echo Manifestations

> [!example] Documented Echoes
> ${d.echo_manifestations || "None documented at time of submission."}

---

## Collapse Evidence

> [!abstract] Collapse Analysis
> ${d.collapse_evidence || ""}
${d.investigator_notes ? `\n---\n\n## Notes\n\n> [!note]- Investigator Note — ${d.submitter_name || "Unknown"}\n> ${d.investigator_notes}\n` : ""}
---

## Reference

> [!abstract] Archive Reference
> This report is preserved as part of the reality investigation records maintained by the [[ALR Initiative]] within [[The Archive]]. Submitted by ${d.submitter_name || "an independent researcher"} for Archive review.
`.trim()

  return { path: `content/Reality Reports/${title}.md`, content: frontmatter + "\n\n" + body + "\n" }
}

function buildEquipment(sub: SubmissionRow): { path: string; content: string } {
  const d = sub.form_data
  const name = safeFilename(d.device_name || sub.title)

  const notes = d.engineer_notes ? `\n---\n\n## Notes\n\n> [!note]- Commentary — ${d.submitter_name || "Unknown"}\n> ${d.engineer_notes}\n` : ""

  const body = `
# ${name}

> [!info] Device Classification
> **Device Type:** ${d.device_type || "Unknown"}
> **Operational Status:** ${d.operational_status || "Unknown"}
> **Operational Authority:** [[ALR Initiative]]

---

## Function

${d.primary_function || ""}

---

## Operation

${d.operating_procedure || ""}

---

## Known Limitations

${d.known_limitations || ""}
${notes}
---

## Reference

Submitted by ${d.submitter_name || "an independent researcher"} for Archive review.
`.trim()

  return { path: `content/Equipment/${name}.md`, content: body + "\n" }
}

function buildOrganization(sub: SubmissionRow): { path: string; content: string } {
  const d = sub.form_data
  const name = safeFilename(d.organization_name || sub.title)

  const frontmatter =
    "---\n" +
    "tags:\n  - organization\n" +
    "type: organization\n" +
    `status: ${(d.operational_status || "unknown").toLowerCase()}\n` +
    (d.submitter_name ? `submitted_by: ${d.submitter_name}\n` : "") +
    "---"

  const notes = d.submitter_notes ? `\n---\n\n## Notes\n\n> [!note]- Commentary — ${d.submitter_name || "Unknown"}\n> ${d.submitter_notes}\n` : ""

  const body = `
# ${name}

> [!info] Organizational Classification
> **Operational Status:** ${d.operational_status || "Unknown"}
> **Primary Domain:** ${d.primary_domain || "Unknown"}
> **Affiliation:** Unknown

---

## Description

${d.description || ""}

---

## History

${d.history || ""}

---

## Primary Activities

${d.primary_activities || ""}
${notes}
---

## Reference

Submitted by ${d.submitter_name || "an independent researcher"} for Archive review.
`.trim()

  return { path: `content/Organizations/${name}.md`, content: frontmatter + "\n\n" + body + "\n" }
}

// ── GitHub REST helpers ──────────────────────────────────────────────────────────────────────

async function gh(env: Env, path: string, init?: RequestInit): Promise<Response> {
  return fetch(`https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "alr-submission-publish-worker",
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  })
}

async function getBaseSha(env: Env): Promise<string> {
  const res = await gh(env, `/git/ref/heads/${env.GITHUB_BASE_BRANCH}`)
  if (!res.ok) throw new Error(`Failed to read base branch ref: ${res.status} ${await res.text()}`)
  const body: any = await res.json()
  return body.object.sha
}

// Scans the full base-branch tree for existing ECHO-### / R-### ids so a newly published
// submission never collides with one that's already in the repo (including ones only merged
// very recently — this always reads the live base branch, not a cached count).
async function nextId(env: Env, baseSha: string, pathPrefix: string, idPattern: RegExp): Promise<string> {
  const res = await gh(env, `/git/trees/${baseSha}?recursive=1`)
  if (!res.ok) throw new Error(`Failed to read repo tree: ${res.status} ${await res.text()}`)
  const body: any = await res.json()
  let max = 0
  for (const entry of body.tree || []) {
    if (typeof entry.path !== "string" || !entry.path.startsWith(pathPrefix)) continue
    const match = entry.path.match(idPattern)
    if (match) max = Math.max(max, parseInt(match[1], 10))
  }
  return String(max + 1).padStart(3, "0")
}

async function createBranch(env: Env, branch: string, fromSha: string): Promise<void> {
  const res = await gh(env, "/git/refs", {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: fromSha }),
  })
  if (!res.ok) throw new Error(`Failed to create branch: ${res.status} ${await res.text()}`)
}

async function putFile(env: Env, branch: string, path: string, content: string, message: string): Promise<void> {
  // btoa only handles Latin1 — encode UTF-8 bytes first so em dashes / smart quotes survive.
  const base64 = btoa(String.fromCharCode(...new TextEncoder().encode(content)))
  const res = await gh(env, `/contents/${path.split("/").map(encodeURIComponent).join("/")}`, {
    method: "PUT",
    body: JSON.stringify({ message, content: base64, branch }),
  })
  if (!res.ok) throw new Error(`Failed to create file: ${res.status} ${await res.text()}`)
}

async function openPullRequest(env: Env, branch: string, title: string, body: string): Promise<string> {
  const res = await gh(env, "/pulls", {
    method: "POST",
    body: JSON.stringify({ title, head: branch, base: env.GITHUB_BASE_BRANCH, body }),
  })
  if (!res.ok) throw new Error(`Failed to open PR: ${res.status} ${await res.text()}`)
  const pr: any = await res.json()
  return pr.html_url
}

// ── Supabase helper (service-role write-back, bypasses RLS by design — same pattern as the
// sibling order-webhook-worker) ──────────────────────────────────────────────────────────────

async function markPublished(env: Env, submissionId: string, prUrl: string): Promise<void> {
  await fetch(`${env.SUPABASE_URL}/rest/v1/submissions?id=eq.${submissionId}`, {
    method: "PATCH",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ github_pr_url: prUrl, published_at: new Date().toISOString() }),
  })
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return mismatch === 0
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 })
    }

    const secret = request.headers.get("X-Webhook-Secret")
    if (!secret || !timingSafeEqual(secret, env.WEBHOOK_SECRET)) {
      return new Response("Invalid signature", { status: 400 })
    }

    let payload: SupabaseWebhookPayload
    try {
      payload = await request.json()
    } catch {
      return new Response("Invalid JSON", { status: 400 })
    }

    if (payload.table !== "submissions" || payload.type !== "UPDATE") {
      return new Response("Ignored", { status: 200 })
    }

    const sub = payload.record
    const wasAlreadyApproved = payload.old_record?.status === "approved"
    if (sub.status !== "approved" || wasAlreadyApproved || sub.github_pr_url) {
      // Not a fresh approval, or already published (redelivery) — no-op, not an error.
      return new Response("Ignored", { status: 200 })
    }

    try {
      const baseSha = await getBaseSha(env)
      let file: { path: string; content: string }

      if (sub.submission_type === "echo") {
        const id = await nextId(env, baseSha, "content/Echoes/", /ECHO-(\d+)/)
        file = buildEcho(sub, `ECHO-${id}`)
      } else if (sub.submission_type === "reality") {
        const id = await nextId(env, baseSha, "content/Reality Reports/", /R-(\d+)/)
        file = buildReality(sub, `R-${id}`)
      } else if (sub.submission_type === "equipment") {
        file = buildEquipment(sub)
      } else if (sub.submission_type === "organization") {
        file = buildOrganization(sub)
      } else {
        console.error("Unknown submission_type", sub.submission_type)
        return new Response("Unknown submission_type", { status: 400 })
      }

      const branch = `submission/${sub.submission_type}-${sub.id.slice(0, 8)}`
      await createBranch(env, branch, baseSha)
      await putFile(env, branch, file.path, file.content, `Add ${file.path.split("/").pop()} (approved submission)`)

      const prTitle = `New ${sub.submission_type}: ${sub.title}`
      const prBody =
        `Auto-generated from an approved [Submit-${sub.submission_type[0].toUpperCase()}${sub.submission_type.slice(1)}](/${sub.submission_type}) ` +
        `submission by **${sub.form_data.submitter_name || "an independent researcher"}**.\n\n` +
        `This is a draft straight from the submitted form fields — review tone/formatting against the ` +
        `Archive Documentation Format before merging. Merging this PR deploys it live automatically.\n\n` +
        `Submission id: \`${sub.id}\``
      const prUrl = await openPullRequest(env, branch, prTitle, prBody)

      await markPublished(env, sub.id, prUrl)

      return new Response(JSON.stringify({ ok: true, pr: prUrl }), { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (err: any) {
      console.error("Failed to publish submission", sub.id, err.message)
      return new Response(`Failed: ${err.message}`, { status: 500 })
    }
  },
}
