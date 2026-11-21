import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Pages that get the "External Signal" sponsor slot at the end of their content.
const SPONSOR_PAGES = new Set(["About", "Shop"])

// Rendered on every page so the fill script is present after SPA navigation
// (body scripts are not re-run on nav). The slot markup only appears on SPONSOR_PAGES.
const ALRSponsorSlot: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const show = SPONSOR_PAGES.has(fileData.slug ?? "")
  return (
    <>
      {show && (
        <aside class="alr-sponsor" aria-label="Sponsored">
          <div class="alr-sponsor-head">
            <span class="alr-sponsor-label">Sponsored • External Signal</span>
            <span class="alr-sponsor-tag">Not affiliated with the ALR Initiative</span>
          </div>
          <div class="alr-sponsor-box">
            <ins
              class="adsbygoogle"
              style="display:inline-block;width:300px;height:250px"
              data-ad-client="ca-pub-1009528022941792"
              data-ad-slot="6380168218"
            ></ins>
          </div>
          <div class="alr-sponsor-foot">Archive Initiative — Index Stable</div>
        </aside>
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function () {
  if (window.__alrSponsorWired) return;
  window.__alrSponsorWired = true;
  function fill() {
    var slots = document.querySelectorAll('ins.adsbygoogle:not([data-alr-pushed])');
    for (var i = 0; i < slots.length; i++) {
      slots[i].setAttribute('data-alr-pushed', '1');
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    }
  }
  fill();
  document.addEventListener('nav', fill);
})();
`,
        }}
      />
    </>
  )
}

ALRSponsorSlot.displayName = "ALRSponsorSlot"
export default (() => ALRSponsorSlot) satisfies QuartzComponentConstructor
