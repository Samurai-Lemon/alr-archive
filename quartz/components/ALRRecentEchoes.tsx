import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

type EchoItem = {
  slug: string
  href: string
  title: string
  echoId: string
  name: string
  ec: string
  esc: string
  dotColor: string
  sortTime: number
}

function getEcFromSlug(slug: string): string {
  if (slug.startsWith("Echoes/Entities/")) return "ENT"
  if (slug.startsWith("Echoes/Objects/")) return "OBJ"
  if (slug.startsWith("Echoes/Locations/")) return "LOC"
  if (slug.startsWith("Echoes/Phenomena/")) return "PHN"
  return "EVT"
}

function getDotColor(ec: string, esc: string): string {
  if (esc === "S4") return "#993c1d"
  if (ec === "LOC") return "#378add"
  if (ec === "PHN") return "#ba7517"
  if (ec === "OBJ") return "#1d9e75"
  return "#7f77dd"
}

function getEscFromFrontmatter(frontmatter: Record<string, any> | undefined): string {
  const esc = String(frontmatter?.esc ?? "").toUpperCase().trim()
  return ["S1", "S2", "S3", "S4"].includes(esc) ? esc : "S1"
}

function getDateValue(file: any): number {
  const fmDate = file.frontmatter?.date ? new Date(file.frontmatter.date).getTime() : 0
  const modified = file.dates?.modified ? new Date(file.dates.modified).getTime() : 0
  const created = file.dates?.created ? new Date(file.dates.created).getTime() : 0
  return fmDate || modified || created || 0
}

function buildEchoItem(file: any): EchoItem | null {
  const slug = String(file.slug ?? "")
  const title = String(file.frontmatter?.title ?? slug)
  const echoIdMatch = title.match(/ECHO-\d+/i) ?? slug.match(/ECHO-\d+/i)
  if (!echoIdMatch) return null
  const echoId = echoIdMatch[0].toUpperCase()

  const nameFromTitle = title.replace(/^ECHO-\d+\s*[—-]\s*/i, "").trim()
  const name = nameFromTitle || title

  const ec = String(file.frontmatter?.ec ?? getEcFromSlug(slug)).toUpperCase()
  const esc = getEscFromFrontmatter(file.frontmatter)
  const dotColor = getDotColor(ec, esc)

  return {
    slug,
    href: `/${slug}`,
    title,
    echoId,
    name,
    ec,
    esc,
    dotColor,
    sortTime: getDateValue(file),
  }
}

const ALRRecentEchoes: QuartzComponent = ({ allFiles }: QuartzComponentProps & { allFiles?: any[] }) => {
  const echoes = (allFiles ?? [])
    .filter((file: any) => {
      const slug = String(file.slug ?? "")
      return slug.startsWith("Echoes/") && !slug.endsWith("/index") && !slug.endsWith("/Index")
    })
    .map(buildEchoItem)
    .filter((item: EchoItem | null): item is EchoItem => item !== null)
    .sort((a, b) => b.sortTime - a.sortTime)
    .slice(0, 7)

  return (
    <div class="alr-card alr-card-wide" id="alr-recent-echoes-slot">
      <div class="alr-card-head">
        <span class="alr-card-head-title">Recent echoes</span>
        <a href="/Index/ECHO-Registry" class="alr-card-head-action internal">
          View all
        </a>
      </div>

      {echoes.map((echo) => (
        <div class="alr-echo-row">
          <div class="alr-echo-dot" style={{ background: echo.dotColor }}></div>
          <div class="alr-echo-id">{echo.echoId}</div>
          <div class="alr-echo-name">
            <a href={echo.href} class="internal">
              {echo.name}
            </a>
          </div>
          <span class={`alr-etag alr-et-${echo.ec.toLowerCase()}`}>{echo.ec}</span>
          <span class={`alr-etag alr-es-${echo.esc.toLowerCase()}`}>{echo.esc}</span>
        </div>
      ))}
    </div>
  )
}

ALRRecentEchoes.displayName = "ALRRecentEchoes"
export default (() => ALRRecentEchoes) satisfies QuartzComponentConstructor