import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

type RealityItem = {
  slug: string
  realityId: string
  rcc: string
  rts: string
  rds: string
  associatedEcho: string
  sortTime: number
}

function getDateValue(file: any): number {
  const fmDate = file.frontmatter?.date ? new Date(file.frontmatter.date).getTime() : 0
  const modified = file.dates?.modified ? new Date(file.dates.modified).getTime() : 0
  const created = file.dates?.created ? new Date(file.dates.created).getTime() : 0
  return fmDate || modified || created || 0
}

function buildRealityItem(file: any): RealityItem {
  const title = String(file.frontmatter?.title ?? file.slug ?? "")
  const slug = String(file.slug ?? "")
  const realityIdMatch = title.match(/R-\d+/i) ?? slug.match(/R-\d+/i)
  const realityId = realityIdMatch ? realityIdMatch[0].toUpperCase() : "R-???"

  const rcc = String(file.frontmatter?.rcc ?? "RCC-1").toUpperCase().trim()
  const rts = String(file.frontmatter?.rts ?? "T3").toUpperCase().trim()
  const rds = String(file.frontmatter?.rds ?? "B").toUpperCase().trim()
  const associatedEcho = String(file.frontmatter?.associatedEcho ?? file.frontmatter?.associatedecho ?? "").trim()

  return {
    slug,
    realityId,
    rcc,
    rts,
    rds,
    associatedEcho,
    sortTime: getDateValue(file),
  }
}

const ALRRecentRealities: QuartzComponent = ({ allFiles }: QuartzComponentProps & { allFiles?: any[] }) => {
  const realities = (allFiles ?? [])
    .filter((file: any) => {
      const slug = String(file.slug ?? "")
      return slug.startsWith("Reality-Reports/") && !slug.endsWith("/index") && !slug.endsWith("/Index")
    })
    .map(buildRealityItem)
    .sort((a, b) => b.sortTime - a.sortTime)
    .slice(0, 6)

  const cardHtml = `
<div class="alr-card">
  <div class="alr-card-head">
    <span class="alr-card-head-title">Reality investigations</span>
    <a href="Index/Reality-Registry" class="alr-card-head-action internal">View all</a>
  </div>
  ${realities
    .map(
      (reality) => `
  <div class="alr-real-row">
    <div class="alr-real-id">${reality.realityId}</div>
    <div class="alr-real-info">
      <div class="alr-real-rcc">${reality.rcc} — ${reality.rcc === "RCC-1" ? "Silent Collapse" : reality.rcc === "RCC-2" ? "Systemic Failure" : reality.rcc === "RCC-3" ? "Catastrophic Collapse" : "Unknown Collapse"}</div>
      <div class="alr-real-tags">
        <span class="alr-rtag">${reality.rts}</span>
        <span class="alr-rtag">RDS: ${reality.rds}</span>
        ${reality.associatedEcho ? `<span class="alr-rtag alr-rtag-echo">${reality.associatedEcho}</span>` : ""}
      </div>
    </div>
  </div>`,
    )
    .join("")}
</div>`.trim()

  const escapedCardHtml = JSON.stringify(cardHtml)

  return (
  <div id="alr-recent-realities-mount" style={{ display: "none" }}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function () {
  function mountALRRecentRealities() {
    var slot = document.getElementById("alr-recent-realities-slot");
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

  document.addEventListener("DOMContentLoaded", mountALRRecentRealities);
  document.addEventListener("nav", function () {
    setTimeout(mountALRRecentRealities, 0);
  });
  setTimeout(mountALRRecentRealities, 0);
})();
          `,
        }}
      />
    </div>
  )
}

ALRRecentRealities.displayName = "ALRRecentRealities"
export default (() => ALRRecentRealities) satisfies QuartzComponentConstructor