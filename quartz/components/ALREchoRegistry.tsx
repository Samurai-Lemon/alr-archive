import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

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

function buildEchoItem(file: any): EchoRegistryItem {
  const slug = String(file.slug ?? "")
  const title = String(file.frontmatter?.title ?? slug)

  const echoIdMatch = title.match(/ECHO-(\d+)/i) ?? slug.match(/ECHO-(\d+)/i)
  const echoId = echoIdMatch ? `ECHO-${echoIdMatch[1]}` : "ECHO-???"
  const sortNum = echoIdMatch ? Number(echoIdMatch[1]) : 999999

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

const ALREchoRegistry: QuartzComponent = ({
  allFiles,
}: QuartzComponentProps & { allFiles?: any[] }) => {
  const echoes = (allFiles ?? [])
    .filter((file: any) => {
      const slug = String(file.slug ?? "")
      return slug.startsWith("Echoes/") && !slug.endsWith("/index") && !slug.endsWith("/Index")
    })
    .map(buildEchoItem)
    .sort((a, b) => a.sortNum - b.sortNum)

  return (
    <>
      <h1>Echo Registry</h1>
      <p>
        Registered Echoes currently held within Archive custody. Entries update automatically as new
        records are added to the archive.
      </p>

      <div class="alr-registry">
        <div class="alr-registry-header">
          <span>Designation</span>
          <span>EC</span>
          <span>ESC</span>
          <span>RCC</span>
          <span>RTS</span>
          <span>RDS</span>
        </div>

        {echoes.map((echo) => (
          <div class="alr-registry-row">
            <div class="alr-reg-col-file">
              <a href={echo.href} class="internal">
                {echo.echoId} — {echo.name}
              </a>
            </div>
            <div class="alr-reg-col">{echo.ec}</div>
            <div class="alr-reg-col">{echo.esc}</div>
            <div class="alr-reg-col">{echo.rcc}</div>
            <div class="alr-reg-col">{echo.rts}</div>
            <div class="alr-reg-col">{echo.rds}</div>
          </div>
        ))}
      </div>
    </>
  )
}

ALREchoRegistry.displayName = "ALREchoRegistry"
export default (() => ALREchoRegistry) satisfies QuartzComponentConstructor