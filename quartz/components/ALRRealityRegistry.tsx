import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { rtsLabels, rdsLabels, rccLabels } from "../util/alrClassifications"

type RealityRegistryItem = {
  slug: string
  href: string
  title: string
  realityId: string
  rcc: string
  rts: string
  rds: string
  status: string
  associatedEchoIds: string[]
  sortNum: number
}

type EchoRef = { id: string; href: string; name: string }

const activeCycle = "7"

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

function buildEchoIndex(allFiles: any[]): Record<string, EchoRef> {
  const index: Record<string, EchoRef> = {}
  for (const file of allFiles) {
    const slug = String(file.slug ?? "")
    if (!slug.startsWith("Echoes/") || slug.endsWith("/index") || slug.endsWith("/Index")) continue

    const title = String(file.frontmatter?.title ?? slug)
    const match = title.match(/ECHO-(\d+)/i) ?? slug.match(/ECHO-(\d+)/i)
    if (!match) continue

    const id = `ECHO-${match[1]}`
    const name = title.replace(/^ECHO-\d+\s*[—-]\s*/i, "").trim() || title
    index[id] = { id, href: `/${slug}`, name }
  }
  return index
}

function buildRealityItem(file: any): RealityRegistryItem | null {
  const slug = String(file.slug ?? "")
  const title = String(file.frontmatter?.title ?? slug)

  const realityIdMatch = title.match(/R-(\d+)/i) ?? slug.match(/R-(\d+)/i)
  if (!realityIdMatch) return null

  const realityId = `R-${realityIdMatch[1]}`
  const sortNum = Number(realityIdMatch[1])
  const rcc = getRcc(file.frontmatter)
  const rts = getRts(file.frontmatter)
  const rds = getRds(file.frontmatter)
  const status = String(file.frontmatter?.status ?? "documented").trim()

  const rawAssociated = file.frontmatter?.associatedEcho ?? file.frontmatter?.associatedecho ?? ""
  const associatedEchoIds = (Array.isArray(rawAssociated) ? rawAssociated : String(rawAssociated).split(","))
    .map((s: string) => String(s).trim().toUpperCase())
    .filter(Boolean)

  return {
    slug,
    href: `/${slug}`,
    title,
    realityId,
    rcc,
    rts,
    rds,
    status,
    associatedEchoIds,
    sortNum,
  }
}

function rccFilterClass(rcc: string): string {
  const n = rcc.replace(/[^0-9]/g, "")
  return `alr-reg-tag-rcc-${n || "1"}`
}

function detailPanelData(reality: RealityRegistryItem, echoIndex: Record<string, EchoRef>) {
  return {
    id: reality.realityId,
    href: reality.href,
    rcc: reality.rcc,
    rccLabel: rccLabels[reality.rcc] ?? reality.rcc,
    rts: reality.rts,
    rtsLabel: rtsLabels[reality.rts] ?? reality.rts,
    rds: reality.rds,
    rdsLabel: rdsLabels[reality.rds] ?? reality.rds,
    status: reality.status,
    echoes: reality.associatedEchoIds.map((id) => echoIndex[id] ?? { id, href: "", name: id }),
  }
}

const ALRRealityRegistry: QuartzComponent = ({
  allFiles,
}: QuartzComponentProps & { allFiles?: any[] }) => {
  const files = allFiles ?? []
  const echoIndex = buildEchoIndex(files)

  const realities = files
    .filter((file: any) => {
      const slug = String(file.slug ?? "")
      return (
        (slug.startsWith("Reality-Reports/") || slug.startsWith("Reality Reports/")) &&
        !slug.endsWith("/index") &&
        !slug.endsWith("/Index")
      )
    })
    .map(buildRealityItem)
    .filter((item: RealityRegistryItem | null): item is RealityRegistryItem => item !== null)
    .sort((a, b) => a.sortNum - b.sortNum)

  const silentCount = realities.filter((r) => r.rcc === "RCC-1").length
  const associatedCount = realities.filter((r) => r.associatedEchoIds.length > 0).length
  const selected = realities[0]
  const payload = realities.map((r) => detailPanelData(r, echoIndex))

  return (
    <div class="alr-reg-root" id="alr-reality-registry-root">
      <script
        type="application/json"
        id="alr-reality-registry-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
      />

      <div class="alr-reg-banner">
        <div class="alr-reg-banner-meta">
          <div class="alr-reg-banner-meta-item">REGISTRY · ACTIVE</div>
          <div class="alr-reg-banner-meta-item">CYCLE {activeCycle} · ARCHIVE OPS</div>
        </div>
        <div class="alr-reg-banner-eyebrow">ALR Initiative — Archive</div>
        <div class="alr-reg-banner-titlerow">
          <div class="alr-reg-banner-title">Reality Registry</div>
          <div class="alr-reg-banner-count">{realities.length} documented</div>
        </div>
        <div class="alr-reg-banner-sub">
          Formal index of investigated realities. Entries update automatically as new investigation
          reports are added to the Archive.
        </div>
      </div>

      <div class="alr-reg-body">
        <div class="alr-reg-stats">
          <div class="alr-reg-stat-cell">
            <div class="alr-reg-stat-n">{realities.length}</div>
            <div class="alr-reg-stat-l">Realities Logged</div>
          </div>
          <div class="alr-reg-stat-cell">
            <div class="alr-reg-stat-n">{silentCount}</div>
            <div class="alr-reg-stat-l">RCC-1 Silent</div>
          </div>
          <div class="alr-reg-stat-cell">
            <div class="alr-reg-stat-n">{associatedCount}</div>
            <div class="alr-reg-stat-l">Echo Associations</div>
          </div>
          <div class="alr-reg-stat-cell">
            <div class="alr-reg-stat-n">{activeCycle}</div>
            <div class="alr-reg-stat-l">Current Cycle</div>
          </div>
        </div>

        <div class="alr-reg-controls">
          <div class="alr-reg-filter-row">
            <button class="alr-reg-filter-btn alr-reg-filter-active" data-filter="all">All</button>
            <button class="alr-reg-filter-btn" data-filter="RCC-1">RCC-1</button>
            <button class="alr-reg-filter-btn" data-filter="RCC-2">RCC-2</button>
            <button class="alr-reg-filter-btn" data-filter="RCC-3">RCC-3</button>
          </div>
          <div class="alr-reg-search">
            <span class="alr-reg-search-icon">⌕</span>
            <input
              type="text"
              id="alr-reality-registry-search"
              class="alr-reg-search-input"
              placeholder="Search registry..."
              autocomplete="off"
              spellcheck={false}
            />
          </div>
        </div>

        <div class="alr-reg-table-wrap">
          <div class="alr-reg-table-head alr-reg-grid-reality">
            <div class="alr-reg-th">ID</div>
            <div class="alr-reg-th">Designation</div>
            <div class="alr-reg-th">RTS</div>
            <div class="alr-reg-th">RDS</div>
            <div class="alr-reg-th">RCC</div>
            <div class="alr-reg-th">Echo</div>
          </div>

          <div id="alr-reality-registry-rows">
            {realities.map((reality, i) => (
              <div
                class={`alr-reg-row alr-reg-grid-reality${i === 0 ? " alr-reg-row-selected" : ""}`}
                data-index={i}
                data-rcc={reality.rcc}
                data-search={`${reality.realityId} ${reality.title}`.toLowerCase()}
              >
                <div class="alr-reg-row-head">
                  <div class="alr-reg-id">{reality.realityId}</div>
                  <div>
                    <div class="alr-reg-name">Reality {reality.realityId}</div>
                    <div class="alr-reg-name-sub">
                      {reality.status.charAt(0).toUpperCase() + reality.status.slice(1)}
                    </div>
                  </div>
                </div>
                <div class="alr-reg-row-tags">
                  <div>
                    <span class="alr-reg-tag alr-reg-tag-rts">{reality.rts}</span>
                  </div>
                  <div>
                    <span class="alr-reg-tag alr-reg-tag-rds">{reality.rds}</span>
                  </div>
                  <div>
                    <span class={`alr-reg-tag ${rccFilterClass(reality.rcc)}`}>{reality.rcc}</span>
                  </div>
                  <div>
                    {reality.associatedEchoIds.length > 0 ? (
                      <span class="alr-reg-echo-chip">
                        <span class="alr-reg-echo-dot"></span>
                        {reality.associatedEchoIds[0]}
                        {reality.associatedEchoIds.length > 1
                          ? ` +${reality.associatedEchoIds.length - 1}`
                          : ""}
                      </span>
                    ) : (
                      <span class="alr-reg-no-echo">—</span>
                    )}
                  </div>
                </div>
                <div class="alr-reg-card-expand" id={`alr-reality-card-expand-${i}`}></div>
              </div>
            ))}
          </div>

          <div id="alr-reality-registry-empty" class="alr-reg-empty" style="display:none">
            No realities match the current filter.
          </div>
        </div>

        {selected && (
          <div class="alr-reg-detail" id="alr-reality-registry-detail">
            <div class="alr-reg-detail-head">
              <div>
                <div class="alr-reg-detail-id" id="alr-reality-detail-id">
                  {selected.realityId} · SELECTED
                </div>
                <div class="alr-reg-detail-title" id="alr-reality-detail-title">
                  Reality {selected.realityId}
                </div>
                <div class="alr-reg-detail-sub" id="alr-reality-detail-sub">
                  {rtsLabels[selected.rts] ?? selected.rts} · {rdsLabels[selected.rds] ?? selected.rds} ·{" "}
                  {rccLabels[selected.rcc] ?? selected.rcc}
                </div>
              </div>
              <a href={selected.href} class="alr-reg-view-btn internal" id="alr-reality-detail-link">
                View Full Report →
              </a>
            </div>
            <div class="alr-reg-detail-grid alr-reg-detail-grid-4" id="alr-reality-detail-grid">
              <div class="alr-reg-detail-cell">
                <div class="alr-reg-detail-cell-label">Reality Tier</div>
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
              <div class="alr-reg-detail-cell">
                <div class="alr-reg-detail-cell-label">Status</div>
                <div class="alr-reg-detail-cell-val">
                  {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                </div>
              </div>
            </div>
            <div class="alr-reg-detail-cell-label" style="margin-bottom:6px">
              Associated Echoes
            </div>
            <div class="alr-reg-detail-echoes" id="alr-reality-detail-echoes">
              {selected.associatedEchoIds.length > 0 ? (
                selected.associatedEchoIds.map((id) => {
                  const ref = echoIndex[id]
                  return ref && ref.href ? (
                    <a href={ref.href} class="alr-reg-echo-chip alr-reg-echo-chip-link">
                      <span class="alr-reg-echo-dot"></span>
                      {ref.id} · {ref.name}
                    </a>
                  ) : (
                    <span class="alr-reg-echo-chip">
                      <span class="alr-reg-echo-dot"></span>
                      {id}
                    </span>
                  )
                })
              ) : (
                <span class="alr-reg-no-echo">No associated Echoes on record.</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

ALRRealityRegistry.displayName = "ALRRealityRegistry"
export default (() => ALRRealityRegistry) satisfies QuartzComponentConstructor
