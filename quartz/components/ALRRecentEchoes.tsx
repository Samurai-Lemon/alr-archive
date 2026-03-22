import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

type EchoItem = {
  slug: string
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

function buildEchoItem(file: any): EchoItem {
  const title = String(file.frontmatter?.title ?? file.slug ?? "")
  const echoIdMatch = title.match(/ECHO-\d+/i) ?? String(file.slug ?? "").match(/ECHO-\d+/i)
  const echoId = echoIdMatch ? echoIdMatch[0].toUpperCase() : "ECHO-???"

  const nameFromTitle = title.replace(/^ECHO-\d+\s*[—-]\s*/i, "").trim()
  const name = nameFromTitle || title

  const ec = String(file.frontmatter?.ec ?? getEcFromSlug(String(file.slug ?? ""))).toUpperCase()
  const esc = getEscFromFrontmatter(file.frontmatter)
  const dotColor = getDotColor(ec, esc)

  return {
    slug: String(file.slug ?? ""),
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
    .sort((a, b) => b.sortTime - a.sortTime)
    .slice(0, 7)

  const cardHtml = `
<div class="alr-card alr-card-wide">
  <div class="alr-card-head">
    <span class="alr-card-head-title">Recent echoes</span>
    <a href="Index/ECHO-Registry" class="alr-card-head-action internal">View all</a>
  </div>
  ${echoes
    .map(
      (echo) => `
  <div class="alr-echo-row">
    <div class="alr-echo-dot" style="background:${echo.dotColor};"></div>
    <div class="alr-echo-id">${echo.echoId}</div>
    <div class="alr-echo-name">${echo.name}</div>
    <span class="alr-etag alr-et-${echo.ec.toLowerCase()}">${echo.ec}</span>
    <span class="alr-etag alr-es-${echo.esc.toLowerCase()}">${echo.esc}</span>
  </div>`,
    )
    .join("")}
</div>`.trim()

  const escapedCardHtml = JSON.stringify(cardHtml)

  return (
  <div id="alr-recent-echoes-mount" style={{ display: "none" }}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function () {
  function mountALRRecentEchoes() {
    var slot = document.getElementById("alr-recent-echoes-slot");
    if (!slot) return;
    slot.innerHTML = ${escapedCardHtml};

    var internalLinks = slot.querySelectorAll("a.internal");
    internalLinks.forEach(function(link) {
      link.addEventListener("click", function() {
        var mobileSidebar = document.querySelector(".sidebar.left");
        var overlay = document.getElementById("alr-mobile-overlay");
        if (mobileSidebar) mobileSidebar.classList.remove("alr-mobile-open");
        if (overlay) overlay.classList.remove("alr-mobile-overlay-open");
        document.body.style.overflow = "";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", mountALRRecentEchoes);
  document.addEventListener("nav", function () {
    setTimeout(mountALRRecentEchoes, 0);
  });
  setTimeout(mountALRRecentEchoes, 0);
})();
          `,
        }}
      />
    </div>
  )
}

ALRRecentEchoes.displayName = "ALRRecentEchoes"
export default (() => ALRRecentEchoes) satisfies QuartzComponentConstructor