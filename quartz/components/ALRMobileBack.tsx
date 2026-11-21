import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Phone-only top-bar content for entry pages: a back link to the registry the entry belongs to,
// plus the entry's ID in the middle of the bar. Renders nothing on other pages, and is hidden
// above 800px (the desktop header has the full nav instead).
const ALRMobileBack: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>
  const type = String(fm.type ?? "")
  const title = String(fm.title ?? "")
  const slug = String(fileData.slug ?? "")

  let href = ""
  let id = ""
  if (type === "echo") {
    href = "/Index/ECHO-Registry"
    id = ((title.match(/ECHO-\d+/i) ?? slug.match(/ECHO-\d+/i)) ?? [""])[0].toUpperCase()
  } else if (type === "reality") {
    href = "/Index/Reality-Registry"
    id = ((title.match(/R-\d+/i) ?? slug.match(/R-\d+/i)) ?? [""])[0].toUpperCase()
  }
  if (!href) return null

  return (
    <div class="alr-mback">
      <a href={href} class="internal alr-mback-link" aria-label="Back to the registry">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Registry
      </a>
      {id && <span class="alr-mback-id">{id}</span>}
    </div>
  )
}

ALRMobileBack.displayName = "ALRMobileBack"
export default (() => ALRMobileBack) satisfies QuartzComponentConstructor
