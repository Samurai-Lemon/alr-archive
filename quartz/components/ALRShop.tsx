import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRShop: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="alr-shop">

      <div class="alr-shop-header">
        <div class="alr-eyebrow">ALR Initiative — Procurement Terminal</div>
        <div class="alr-hero-title">ALR Procurement</div>
        <div class="alr-shop-sub">Official materials from the Archive of Lost Realities Initiative. All proceeds support ongoing reality investigation and archive maintenance.</div>
      </div>

      <div class="alr-shop-notice">
        <div class="alr-submit-notice-dot"></div>
        <div>
          <div class="alr-submit-notice-title">PROCUREMENT NOTICE — CYCLE 7</div>
          <div class="alr-submit-notice-text">3D Print orders are fulfilled manually and may require 7–14 cycles for delivery. All other items ship via standard distribution. Contact Archive Operations for bulk inquiries.</div>
        </div>
      </div>

      <button class="alr-shop-mobile-filter" id="alr-shop-mobile-filter" aria-label="Filter by price">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
        </svg>
        Filter by price
      </button>
      <script dangerouslySetInnerHTML={{ __html: `
(function() {
  function wire() {
    var btn = document.getElementById('alr-shop-mobile-filter');
    if (!btn) return;
    btn.onclick = function() {
      var menuBtn = document.getElementById('alr-mobile-menu-btn');
      if (menuBtn) menuBtn.click();
      setTimeout(function() {
        var slider = document.getElementById('alr-price-slider');
        if (slider) slider.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 320);
    };
  }
  wire();
  document.addEventListener('nav', wire);
})();
      ` }} />

      <div id="alr-shop-products" class="alr-shop-product-grid">
        <div class="alr-shop-loading">
          <div class="alr-shop-loading-text">Accessing procurement terminal...</div>
        </div>
      </div>

    </div>
  )
}

ALRShop.displayName = "ALRShop"
export default (() => ALRShop) satisfies QuartzComponentConstructor