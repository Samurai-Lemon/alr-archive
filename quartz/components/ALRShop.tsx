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

      <script dangerouslySetInnerHTML={{ __html: `
(function() {
  var PROXY = "https://alr-shop-proxy.lamouttejohn.workers.dev/";
  var SHOP = "john-lamoutte-shop";

  function formatPrice(amount, currency) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(amount / 100);
  }

  function renderProducts(products) {
    var container = document.getElementById('alr-shop-products');
    if (!container) return;

    if (!products || products.length === 0) {
      container.innerHTML = '<div class="alr-shop-empty">No products currently available. <a href="https://' + SHOP + '.fourthwall.com" target="_blank">Visit the store directly.</a></div>';
      return;
    }

    var html = '<div class="alr-shop-grid">';
    products.forEach(function(product) {
      var image = product.images && product.images[0] ? product.images[0].url : '';
      var price = product.variants && product.variants[0] ? formatPrice(product.variants[0].unitPrice.value, product.variants[0].unitPrice.currency) : '';
      var url = 'https://' + SHOP + '.fourthwall.com/products/' + product.slug;

      html += '<div class="alr-shop-card">';
      if (image) {
        html += '<div class="alr-shop-card-img"><img src="' + image + '" alt="' + product.name + '" loading="lazy" /></div>';
      } else {
        html += '<div class="alr-shop-card-img alr-shop-card-img-empty"><svg width="40" height="40" viewBox="0 0 557 480" fill="#cc785c" fill-rule="evenodd" opacity="0.15"><path d="M 531.0 468.5 L 384.0 467.5 L 283.0 400.5 L 271.0 403.5 L 184.0 463.5 L 172.0 468.5 L 26.0 468.5 L 14.5 461.0 L 11.5 454.0 L 14.5 439.0 L 250.5 39.0 L 269.0 13.5 L 285.0 11.5 L 298.5 24.0 L 542.5 438.0 L 545.5 446.0 L 544.5 458.0 L 531.0 468.5 Z M 448.5 429.0 L 480.0 428.5 L 484.5 425.0 L 484.5 419.0 L 287.5 85.0 L 282.0 78.5 L 276.0 78.5 L 77.5 411.0 L 73.5 425.0 L 78.0 428.5 L 96.0 429.5 L 159.0 428.5 L 237.5 376.0 L 237.5 371.0 L 232.0 365.5 L 175.0 328.5 L 170.5 324.0 L 169.5 317.0 L 262.5 155.0 L 271.0 145.5 L 283.0 143.5 L 293.5 151.0 L 389.5 316.0 L 388.5 323.0 L 382.0 329.5 L 325.0 366.5 L 321.5 370.0 L 322.5 377.0 L 395.0 426.5 L 409.0 429.5 L 448.5 429.0 Z M 283.5 345.0 L 332.0 311.5 L 335.5 303.0 L 284.5 217.0 L 276.0 215.5 L 222.5 308.0 L 274.0 344.5 L 283.5 345.0 Z"/></svg></div>';
      }
      html += '<div class="alr-shop-card-body">';
      html += '<div class="alr-shop-card-category">Archive Collection</div>';
      html += '<div class="alr-shop-card-name">' + product.name + '</div>';
      if (product.description) {
        var desc = product.description.replace(/<[^>]*>/g, '');
        html += '<div class="alr-shop-card-desc">' + desc.substring(0, 100) + (desc.length > 100 ? '...' : '') + '</div>';
      }
      html += '<div class="alr-shop-card-footer">';
      html += '<div class="alr-shop-card-price">' + price + '</div>';
      html += '<a href="' + url + '" target="_blank" class="alr-shop-card-btn">Procure</a>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function loadProducts() {
    var container = document.getElementById('alr-shop-products');
    if (!container) return;

    fetch(PROXY + "?path=collections/all/products")
      .then(function(r) { return r.json(); })
      .then(function(data) {
        renderProducts(data.results || []);
      })
      .catch(function(err) {
        if (container) {
          container.innerHTML = '<div class="alr-shop-empty">Unable to load products. <a href="https://' + SHOP + '.fourthwall.com" target="_blank">Visit the store directly.</a></div>';
        }
      });
  }

  function initShop() {
    if (window.location.pathname === '/Shop' || window.location.pathname === '/Shop/') {
      loadProducts();
    }
  }

  document.addEventListener('DOMContentLoaded', initShop);
  document.addEventListener('nav', initShop);
})();
      ` }} />
    </div>
  )
}

ALRShop.displayName = "ALRShop"
export default (() => ALRShop) satisfies QuartzComponentConstructor