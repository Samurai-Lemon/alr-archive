import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Slim page header shown above regular content pages (Foundations, Protocols, reports, etc.).
// Replaces the old decorative SVG banner: the page's own H1 is now the headline, so this only
// carries the breadcrumb trail plus the seasonal Hallow stripe (toggled by ALRHallowDefs.tsx).
const ALRBanner: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = String(fileData.slug ?? "")
  const parts = slug.split("/").filter((p) => p && p !== "index")
  const folders = parts.slice(0, -1)

  const crumbs = folders.map((name, i) => ({
    label: name.replace(/-/g, " "),
    href: "/" + folders.slice(0, i + 1).join("/") + "/",
  }))

  return (
    <div class="alr-page-banner">
      <div class="alr-hallow-stripe"></div>
      <nav class="alr-page-crumbs" aria-label="Breadcrumb">
        <a href="/" class="internal">Archive</a>
        {crumbs.map((c) => (
          <>
            <span aria-hidden="true">/</span>
            <a href={c.href} class="internal">{c.label}</a>
          </>
        ))}
      </nav>
    </div>
  )
}

ALRBanner.displayName = "ALRBanner"
export default (() => ALRBanner) satisfies QuartzComponentConstructor
