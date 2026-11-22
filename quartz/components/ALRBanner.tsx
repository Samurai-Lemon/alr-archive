import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { BroadcastStrip } from "./broadcast/Banner"

// Slim broadcast strip above regular reading pages (Foundations, Systems, Protocols, reports...):
// the old banner's decaying grid with the tape overlay on channel 06, carrying the breadcrumb.
// The page's own H1 follows right below it.
const ALRBanner: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = String(fileData.slug ?? "")
  const parts = slug.split("/").filter((p) => p && p !== "index")
  const folders = parts.slice(0, -1)

  const crumbs = [
    { label: "Archive", href: "/" },
    ...folders.map((name, i) => ({
      label: name.replace(/-/g, " "),
      href: "/" + folders.slice(0, i + 1).join("/") + "/",
    })),
  ]

  return <BroadcastStrip key_={slug || "index"} ch="CH 06" crumbs={crumbs} />
}

ALRBanner.displayName = "ALRBanner"
export default (() => ALRBanner) satisfies QuartzComponentConstructor
