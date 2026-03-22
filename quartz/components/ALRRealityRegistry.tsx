import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

type RealityRegistryItem = {
  slug: string
  href: string
  title: string
  realityId: string
  rcc: string
  rts: string
  rds: string
  associatedEcho: string
  sortNum: number
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

function buildRealityItem(file: any): RealityRegistryItem {
  const slug = String(file.slug ?? "")
  const title = String(file.frontmatter?.title ?? slug)

  const realityIdMatch = title.match(/R-(\d+)/i) ?? slug.match(/R-(\d+)/i)
  const realityId = realityIdMatch ? `R-${realityIdMatch[1]}` : "R-???"
  const sortNum = realityIdMatch ? Number(realityIdMatch[1]) : 999999

  const rcc = getRcc(file.frontmatter)
  const rts = getRts(file.frontmatter)
  const rds = getRds(file.frontmatter)
  const associatedEcho = String(
    file.frontmatter?.associatedEcho ?? file.frontmatter?.associatedecho ?? "",
  ).trim()

  return {
    slug,
    href: `/${slug}`,
    title,
    realityId,
    rcc,
    rts,
    rds,
    associatedEcho,
    sortNum,
  }
}

const ALRRealityRegistry: QuartzComponent = ({
  allFiles,
}: QuartzComponentProps & { allFiles?: any[] }) => {
  const realities = (allFiles ?? [])
    .filter((file: any) => {
      const slug = String(file.slug ?? "")
      return (
        (slug.startsWith("Reality-Reports/") || slug.startsWith("Reality Reports/")) &&
        !slug.endsWith("/index") &&
        !slug.endsWith("/Index")
      )
    })
    .map(buildRealityItem)
    .sort((a, b) => a.sortNum - b.sortNum)

  return (
    <>
      <h1>Reality Registry</h1>
      <p>
        Registered reality investigations currently retained within Archive custody. Entries update
        automatically as new reports are added to the archive.
      </p>

      <div class="alr-registry">
        <div class="alr-registry-header">
          <span>Designation</span>
          <span>RCC</span>
          <span>RTS</span>
          <span>RDS</span>
          <span>Echo</span>
          <span>Status</span>
        </div>

        {realities.map((reality) => (
          <div class="alr-registry-row">
            <div class="alr-reg-col-file">
              <a href={reality.href} class="internal">
                {reality.realityId}
              </a>
            </div>
            <div class="alr-reg-col">{reality.rcc}</div>
            <div class="alr-reg-col">{reality.rts}</div>
            <div class="alr-reg-col">{reality.rds}</div>
            <div class="alr-reg-col">{reality.associatedEcho || "—"}</div>
            <div class="alr-reg-col">Filed</div>
          </div>
        ))}
      </div>
    </>
  )
}

ALRRealityRegistry.displayName = "ALRRealityRegistry"
export default (() => ALRRealityRegistry) satisfies QuartzComponentConstructor