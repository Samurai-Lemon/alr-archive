import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Global afterBody component (same micromorph-dodge reasoning as every other ALR script here —
// see ALRShopScript.tsx for the full explanation): a thin progress bar fixed under the header,
// mobile-only, shown on long-form entry pages (Echoes/Realities/Foundations/etc.) and hidden on
// the site's special-purpose pages (home, Shop, Account, Admin, registries, Submit forms, the
// label creator) where "how far through this article am I" isn't a meaningful question.
const ALRReadingProgress: QuartzComponent = () => {
  return (
    <div class="alr-reading-progress" id="alr-reading-progress">
      <div class="alr-reading-progress-fill" id="alr-reading-progress-fill"></div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  var EXCLUDED_EXACT = [
    "/", "/Shop", "/Shop-Soon", "/Account", "/Admin", "/label-creator",
    "/Submit-Echo", "/Submit-Reality", "/Submit-Equipment", "/Submit-Organization"
  ];

  function normalizedPath() {
    var p = window.location.pathname;
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function shouldShow() {
    var path = normalizedPath();
    if (EXCLUDED_EXACT.indexOf(path) !== -1) return false;
    if (path.indexOf("/Index/") === 0) return false;
    return true;
  }

  var scrollHandler = null;

  function update() {
    // Content.tsx renders the actual entry body as <article class="popover-hint ...">, but a
    // separate, much smaller .popover-hint div also exists for beforeBody content (page-header)
    // earlier in the DOM — querying ".popover-hint" alone risks matching that one instead.
    var article = document.querySelector("#quartz-body .center > article");
    var fill = document.getElementById("alr-reading-progress-fill");
    if (!article || !fill) return;

    var rect = article.getBoundingClientRect();
    var articleTop = window.scrollY + rect.top;
    var scrollable = rect.height - window.innerHeight;
    var pct = scrollable > 0 ? ((window.scrollY - articleTop) / scrollable) * 100 : 0;
    pct = Math.max(0, Math.min(100, pct));
    fill.style.width = pct + "%";
  }

  function init() {
    var bar = document.getElementById("alr-reading-progress");
    if (!bar) return;

    if (scrollHandler) {
      window.removeEventListener("scroll", scrollHandler);
      scrollHandler = null;
    }

    if (!shouldShow()) {
      bar.style.display = "none";
      return;
    }

    bar.style.display = "";
    scrollHandler = function() { update(); };
    window.addEventListener("scroll", scrollHandler, { passive: true });
    update();
  }

  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("nav", init);
})();
          `,
        }}
      />
    </div>
  )
}

ALRReadingProgress.displayName = "ALRReadingProgress"
export default (() => ALRReadingProgress) satisfies QuartzComponentConstructor
