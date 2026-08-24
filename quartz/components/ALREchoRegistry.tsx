import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { ecTypeLabels, escLabels, rtsLabels, rdsLabels, rccLabels } from "../util/alrClassifications"

type EchoRegistryItem = {
  slug: string
  href: string
  title: string
  echoId: string
  name: string
  ec: string
  esc: string
  rcc: string
  rts: string
  rds: string
  sortNum: number
}

const activeCycle = "7"

function getEcFromSlug(slug: string): string {
  if (slug.startsWith("Echoes/Entities/")) return "ENT"
  if (slug.startsWith("Echoes/Objects/")) return "OBJ"
  if (slug.startsWith("Echoes/Locations/")) return "LOC"
  if (slug.startsWith("Echoes/Phenomena/")) return "PHN"
  return "EVT"
}

function getEsc(frontmatter: Record<string, any> | undefined): string {
  const esc = String(frontmatter?.esc ?? "").toUpperCase().trim()
  return ["S1", "S2", "S3", "S4"].includes(esc) ? esc : "S1"
}

function getRcc(frontmatter: Record<string, any> | undefined): string {
  const rcc = String(frontmatter?.rcc ?? "").toUpperCase().trim()
  return rcc || "RCC-1"
}

function getRts(frontmatter: Record<string, any> | undefined): string {
  const rts = String(frontmatter?.rts ?? "").toUpperCase().trim()
  return rts || "T1"
}

function getRds(frontmatter: Record<string, any> | undefined): string {
  const rds = String(frontmatter?.rds ?? "").toUpperCase().trim()
  return rds || "A"
}

function buildEchoItem(file: any): EchoRegistryItem | null {
  const slug = String(file.slug ?? "")
  const title = String(file.frontmatter?.title ?? slug)

  const echoIdMatch = title.match(/ECHO-(\d+)/i) ?? slug.match(/ECHO-(\d+)/i)
  if (!echoIdMatch) return null

  const echoId = `ECHO-${echoIdMatch[1]}`
  const sortNum = Number(echoIdMatch[1])
  const name = title.replace(/^ECHO-\d+\s*[—-]\s*/i, "").trim() || title
  const ec = String(file.frontmatter?.ec ?? getEcFromSlug(slug)).toUpperCase().trim()
  const esc = getEsc(file.frontmatter)
  const rcc = getRcc(file.frontmatter)
  const rts = getRts(file.frontmatter)
  const rds = getRds(file.frontmatter)

  return {
    slug,
    href: `/${slug}`,
    title,
    echoId,
    name,
    ec,
    esc,
    rcc,
    rts,
    rds,
    sortNum,
  }
}

function escFilterClass(esc: string): string {
  return `alr-reg-tag-esc-${esc.toLowerCase()}`
}

function rccFilterClass(rcc: string): string {
  const n = rcc.replace(/[^0-9]/g, "")
  return `alr-reg-tag-rcc-${n || "1"}`
}

function ecFilterClass(ec: string): string {
  return `alr-reg-tag-ec-${ec.toLowerCase()}`
}

function detailPanelData(echo: EchoRegistryItem) {
  return {
    id: echo.echoId,
    name: echo.name,
    href: echo.href,
    ec: echo.ec,
    ecLabel: ecTypeLabels[echo.ec] ?? echo.ec,
    esc: echo.esc,
    escLabel: escLabels[echo.esc] ?? echo.esc,
    rcc: echo.rcc,
    rccLabel: rccLabels[echo.rcc] ?? echo.rcc,
    rts: echo.rts,
    rtsLabel: rtsLabels[echo.rts] ?? echo.rts,
    rds: echo.rds,
    rdsLabel: rdsLabels[echo.rds] ?? echo.rds,
  }
}

const ALREchoRegistry: QuartzComponent = ({
  allFiles,
}: QuartzComponentProps & { allFiles?: any[] }) => {
  const echoes = (allFiles ?? [])
    .filter((file: any) => {
      const slug = String(file.slug ?? "")
      return slug.startsWith("Echoes/") && !slug.endsWith("/index") && !slug.endsWith("/Index")
    })
    .map(buildEchoItem)
    .filter((item: EchoRegistryItem | null): item is EchoRegistryItem => item !== null)
    .sort((a, b) => a.sortNum - b.sortNum)

  const terminalCount = echoes.filter((e) => e.esc === "S4").length
  const stableCount = echoes.filter((e) => e.esc === "S1").length
  const selected = echoes[0]
  const payload = echoes.map((e) => detailPanelData(e))

  return (
    <div class="alr-reg-root" id="alr-echo-registry-root">
      <script
        type="application/json"
        id="alr-echo-registry-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
      />

      <div class="alr-reg-banner">
        <div class="alr-reg-banner-meta">
          <div class="alr-reg-banner-meta-item">REGISTRY · ACTIVE</div>
          <div class="alr-reg-banner-meta-item">CYCLE {activeCycle} · ARCHIVE OPS</div>
        </div>
        <div class="alr-reg-banner-eyebrow">ALR Initiative — Archive</div>
        <div class="alr-reg-banner-title">Echo Registry</div>
        <div class="alr-reg-banner-sub">
          Formal index of documented Echoes. Entries update automatically as new records are added to
          the Archive.
        </div>
      </div>

      <div class="alr-reg-body">
        <div class="alr-reg-stats">
          <div class="alr-reg-stat-cell">
            <div class="alr-reg-stat-n">{echoes.length}</div>
            <div class="alr-reg-stat-l">Echoes Documented</div>
          </div>
          <div class="alr-reg-stat-cell">
            <div class="alr-reg-stat-n">{stableCount}</div>
            <div class="alr-reg-stat-l">S1 Stable</div>
          </div>
          <div class="alr-reg-stat-cell">
            <div class="alr-reg-stat-n alr-reg-stat-n-red">{terminalCount}</div>
            <div class="alr-reg-stat-l">S4 Terminal</div>
          </div>
          <div class="alr-reg-stat-cell">
            <div class="alr-reg-stat-n">{activeCycle}</div>
            <div class="alr-reg-stat-l">Current Cycle</div>
          </div>
        </div>

        <div class="alr-reg-controls">
          <button class="alr-reg-filter-btn alr-reg-filter-active" data-filter="all">All</button>
          <button class="alr-reg-filter-btn" data-filter="S1">S1</button>
          <button class="alr-reg-filter-btn" data-filter="S2">S2</button>
          <button class="alr-reg-filter-btn" data-filter="S3">S3</button>
          <button class="alr-reg-filter-btn" data-filter="S4">S4</button>
          <div class="alr-reg-search">
            <span class="alr-reg-search-icon">⌕</span>
            <input
              type="text"
              id="alr-echo-registry-search"
              class="alr-reg-search-input"
              placeholder="Search registry..."
              autocomplete="off"
              spellcheck={false}
            />
          </div>
        </div>

        <div class="alr-reg-table-wrap">
          <div class="alr-reg-table-head alr-reg-grid-echo">
            <div class="alr-reg-th">ID</div>
            <div class="alr-reg-th">Designation</div>
            <div class="alr-reg-th">EC</div>
            <div class="alr-reg-th">ESC</div>
            <div class="alr-reg-th">RCC</div>
            <div class="alr-reg-th">RTS</div>
            <div class="alr-reg-th">RDS</div>
          </div>

          <div id="alr-echo-registry-rows">
            {echoes.map((echo, i) => (
              <div
                class={`alr-reg-row alr-reg-grid-echo${i === 0 ? " alr-reg-row-selected" : ""}`}
                data-index={i}
                data-esc={echo.esc}
                data-search={`${echo.echoId} ${echo.name}`.toLowerCase()}
              >
                <div class="alr-reg-id">{echo.echoId}</div>
                <div>
                  <div class="alr-reg-name">{echo.name}</div>
                  <div class="alr-reg-name-sub">{ecTypeLabels[echo.ec] ?? echo.ec}</div>
                </div>
                <div>
                  <span class={`alr-reg-tag ${ecFilterClass(echo.ec)}`}>{echo.ec}</span>
                </div>
                <div>
                  <span class={`alr-reg-tag ${escFilterClass(echo.esc)}`}>{echo.esc}</span>
                </div>
                <div>
                  <span class={`alr-reg-tag ${rccFilterClass(echo.rcc)}`}>{echo.rcc}</span>
                </div>
                <div>
                  <span class="alr-reg-tag alr-reg-tag-rts">{echo.rts}</span>
                </div>
                <div>
                  <span class="alr-reg-tag alr-reg-tag-rds">{echo.rds}</span>
                </div>
              </div>
            ))}
          </div>

          <div id="alr-echo-registry-empty" class="alr-reg-empty" style="display:none">
            No Echoes match the current filter.
          </div>
        </div>

        {selected && (
          <div class="alr-reg-detail" id="alr-echo-registry-detail">
            <div class="alr-reg-detail-head">
              <div>
                <div class="alr-reg-detail-id" id="alr-echo-detail-id">
                  {selected.echoId} · SELECTED
                </div>
                <div class="alr-reg-detail-title" id="alr-echo-detail-title">
                  {selected.name}
                </div>
                <div class="alr-reg-detail-sub" id="alr-echo-detail-sub">
                  {ecTypeLabels[selected.ec] ?? selected.ec} · {escLabels[selected.esc] ?? selected.esc}
                </div>
              </div>
              <a href={selected.href} class="alr-reg-view-btn internal" id="alr-echo-detail-link">
                View Full Entry →
              </a>
            </div>
            <div class="alr-reg-detail-grid alr-reg-detail-grid-5" id="alr-echo-detail-grid">
              <div class="alr-reg-detail-cell">
                <div class="alr-reg-detail-cell-label">Echo Class</div>
                <div class="alr-reg-detail-cell-val">
                  {selected.ec} — {ecTypeLabels[selected.ec] ?? selected.ec}
                </div>
              </div>
              <div class="alr-reg-detail-cell">
                <div class="alr-reg-detail-cell-label">Stability</div>
                <div class="alr-reg-detail-cell-val">
                  {selected.esc} — {escLabels[selected.esc] ?? selected.esc}
                </div>
              </div>
              <div class="alr-reg-detail-cell">
                <div class="alr-reg-detail-cell-label">Origin Tier</div>
                <div class="alr-reg-detail-cell-val">
                  {selected.rts} — {rtsLabels[selected.rts] ?? selected.rts}
                </div>
              </div>
              <div class="alr-reg-detail-cell">
                <div class="alr-reg-detail-cell-label">Divergence</div>
                <div class="alr-reg-detail-cell-val">
                  {selected.rds} — {rdsLabels[selected.rds] ?? selected.rds}
                </div>
              </div>
              <div class="alr-reg-detail-cell">
                <div class="alr-reg-detail-cell-label">Collapse Class</div>
                <div class="alr-reg-detail-cell-val">
                  {selected.rcc} — {rccLabels[selected.rcc] ?? selected.rcc}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

ALREchoRegistry.displayName = "ALREchoRegistry"
export default (() => ALREchoRegistry) satisfies QuartzComponentConstructor
