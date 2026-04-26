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

      <div class="alr-shop-sections">

        <div class="alr-shop-section">
          <div class="alr-card-head">
            <span class="alr-card-head-title">Archive Collection</span>
            <span class="alr-card-head-action">ALR-themed apparel, headwear & prints</span>
          </div>
          <div class="alr-shop-embed-wrap">
            <div class="alr-shop-placeholder">
              <div class="alr-shop-placeholder-icon">
                <svg width="32" height="32" viewBox="0 0 557 480" fill="#cc785c" fill-rule="evenodd" opacity="0.15">
                  <path d="M 531.0 468.5 L 384.0 467.5 L 283.0 400.5 L 271.0 403.5 L 184.0 463.5 L 172.0 468.5 L 26.0 468.5 L 14.5 461.0 L 11.5 454.0 L 14.5 439.0 L 250.5 39.0 L 269.0 13.5 L 285.0 11.5 L 298.5 24.0 L 542.5 438.0 L 545.5 446.0 L 544.5 458.0 L 531.0 468.5 Z M 448.5 429.0 L 480.0 428.5 L 484.5 425.0 L 484.5 419.0 L 287.5 85.0 L 282.0 78.5 L 276.0 78.5 L 77.5 411.0 L 73.5 425.0 L 78.0 428.5 L 96.0 429.5 L 159.0 428.5 L 237.5 376.0 L 237.5 371.0 L 232.0 365.5 L 175.0 328.5 L 170.5 324.0 L 169.5 317.0 L 262.5 155.0 L 271.0 145.5 L 283.0 143.5 L 293.5 151.0 L 389.5 316.0 L 388.5 323.0 L 382.0 329.5 L 325.0 366.5 L 321.5 370.0 L 322.5 377.0 L 395.0 426.5 L 409.0 429.5 L 448.5 429.0 Z M 283.5 345.0 L 332.0 311.5 L 335.5 303.0 L 284.5 217.0 L 276.0 215.5 L 222.5 308.0 L 274.0 344.5 L 283.5 345.0 Z"/>
                </svg>
              </div>
              <div class="alr-shop-placeholder-text">Archive Collection — Coming Soon</div>
              <div class="alr-shop-placeholder-sub">Fourthwall embed will appear here once products are live</div>
            </div>
          </div>
        </div>

        <div class="alr-shop-section">
          <div class="alr-card-head">
            <span class="alr-card-head-title">Tabletop & TCG</span>
            <span class="alr-card-head-action">Playmats, accessories & themed gear</span>
          </div>
          <div class="alr-shop-embed-wrap">
            <div class="alr-shop-placeholder">
              <div class="alr-shop-placeholder-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a840" stroke-width="1" opacity="0.2">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div class="alr-shop-placeholder-text">Tabletop & TCG — Coming Soon</div>
              <div class="alr-shop-placeholder-sub">Fourthwall embed will appear here once products are live</div>
            </div>
          </div>
        </div>

        <div class="alr-shop-section">
          <div class="alr-card-head">
            <span class="alr-card-head-title">3D Prints — Made to Order</span>
            <span class="alr-card-head-action">Hand-fulfilled by Archive Operations</span>
          </div>
          <div class="alr-shop-embed-wrap">
            <div class="alr-shop-placeholder">
              <div class="alr-shop-placeholder-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#85b7eb" stroke-width="1" opacity="0.2">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/>
                </svg>
              </div>
              <div class="alr-shop-placeholder-text">3D Prints — Coming Soon</div>
              <div class="alr-shop-placeholder-sub">Order form will appear here once listings are ready</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

ALRShop.displayName = "ALRShop"
export default (() => ALRShop) satisfies QuartzComponentConstructor