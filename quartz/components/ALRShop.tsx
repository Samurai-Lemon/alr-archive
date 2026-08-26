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