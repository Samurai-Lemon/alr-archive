import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Always-rendered (afterBody) component, deliberately not living inline inside
// ALRShop's own markup. ALRShop (and the Shop-specific sidebar with the price
// slider) are only present in the DOM on the /Shop page, so an inline <script>
// there would hit the same micromorph "patch text instead of replace" issue
// documented in ALRLabelCreatorScript — navigating into /Shop via a client-side
// link click could silently fail to (re)load products or wire up the slider.
// Keeping this script's content identical and always-present on every page
// sidesteps that: it only needs to truly execute once, then reacts to "nav"
// like every other always-on ALR script.
const ALRShopScript: QuartzComponent = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  var PROXY = "https://alr-shop-proxy.lamouttejohn.workers.dev/";
  var SHOP_DOMAIN = "shop.alrinitiative.com";

  function formatPrice(amount, currency) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(amount);
  }

  function productPrice(product) {
    return product.variants && product.variants[0] ? Number(product.variants[0].unitPrice.value) : 0;
  }

  function renderProducts(products) {
    var container = document.getElementById('alr-shop-products');
    if (!container) return;

    if (!products || products.length === 0) {
      var allProducts = window.__ALR_SHOP_ALL_PRODUCTS__ || [];
      if (allProducts.length > 0) {
        container.innerHTML = '<div class="alr-shop-empty">No products match the current price range.</div>';
      } else {
        container.innerHTML = '<div class="alr-shop-empty">No products currently available. <a href="https://' + SHOP_DOMAIN + '" target="_blank">Visit the store directly.</a></div>';
      }
      return;
    }

    var html = '<div class="alr-shop-grid">';
    products.forEach(function(product) {
      var image = product.images && product.images[0] ? product.images[0].url : '';
      var price = product.variants && product.variants[0] ? formatPrice(product.variants[0].unitPrice.value, product.variants[0].unitPrice.currency) : '';
      var url = 'https://' + SHOP_DOMAIN + '/products/' + product.slug;

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
        var products = data.results || [];
        window.__ALR_SHOP_ALL_PRODUCTS__ = products;
        renderProducts(products);
        document.dispatchEvent(new CustomEvent('alr-shop-products-loaded', { detail: { products: products } }));
      })
      .catch(function(err) {
        window.__ALR_SHOP_ALL_PRODUCTS__ = [];
        if (container) {
          container.innerHTML = '<div class="alr-shop-empty">Unable to load products. <a href="https://' + SHOP_DOMAIN + '" target="_blank">Visit the store directly.</a></div>';
        }
      });
  }

  window.__ALR_SHOP_SET_PRICE_FILTER__ = function(min, max) {
    var all = window.__ALR_SHOP_ALL_PRODUCTS__ || [];
    var filtered = all.filter(function(p) {
      var price = productPrice(p);
      return price >= min && price <= max;
    });
    renderProducts(filtered);
  };

  function initPriceSlider() {
    var slider = document.getElementById('alr-price-slider');
    if (!slider) return;

    var minLabel = document.getElementById('alr-price-min-label');
    var maxLabel = document.getElementById('alr-price-max-label');
    var trackWrap = slider.querySelector('.alr-sb-price-track-wrap');
    if (!minLabel || !maxLabel || !trackWrap) return;

    // Strip stale listeners from a previous init by cloning the whole wrapper
    // (inputs + fill bar) in one go, rather than each piece separately.
    var freshTrackWrap = trackWrap.cloneNode(true);
    trackWrap.parentNode.replaceChild(freshTrackWrap, trackWrap);
    trackWrap = freshTrackWrap;

    var minInput = trackWrap.querySelector('#alr-price-min');
    var maxInput = trackWrap.querySelector('#alr-price-max');
    var fill = trackWrap.querySelector('#alr-price-fill');
    if (!minInput || !maxInput || !fill) return;

    var sliderMax = Number(slider.getAttribute('data-max')) || 100;
    var step = Number(minInput.step) || 1;

    function update() {
      var minVal = Number(minInput.value);
      var maxVal = Number(maxInput.value);

      minLabel.textContent = '$' + minVal;
      maxLabel.textContent = maxVal >= sliderMax ? '$' + maxVal + '+' : '$' + maxVal;

      var pctMin = (minVal / sliderMax) * 100;
      var pctMax = (maxVal / sliderMax) * 100;
      fill.style.left = pctMin + '%';
      fill.style.width = Math.max(0, pctMax - pctMin) + '%';

      if (window.__ALR_SHOP_SET_PRICE_FILTER__) {
        window.__ALR_SHOP_SET_PRICE_FILTER__(minVal, maxVal >= sliderMax ? Infinity : maxVal);
      }
    }

    minInput.addEventListener('input', function() {
      if (Number(minInput.value) > Number(maxInput.value)) {
        minInput.value = maxInput.value;
      }
      update();
    });

    maxInput.addEventListener('input', function() {
      if (Number(maxInput.value) < Number(minInput.value)) {
        maxInput.value = minInput.value;
      }
      update();
    });

    // Clicking anywhere on the track (not on a thumb itself, which handles its
    // own drag/click natively) jumps whichever handle is nearer to that spot.
    trackWrap.addEventListener('click', function(evt) {
      if (evt.target === minInput || evt.target === maxInput) return;

      var rect = trackWrap.getBoundingClientRect();
      var pct = (evt.clientX - rect.left) / rect.width;
      pct = Math.max(0, Math.min(1, pct));
      var rawVal = pct * sliderMax;
      var val = Math.round(rawVal / step) * step;

      var minVal = Number(minInput.value);
      var maxVal = Number(maxInput.value);

      if (Math.abs(val - minVal) <= Math.abs(val - maxVal)) {
        minInput.value = String(Math.min(val, maxVal));
      } else {
        maxInput.value = String(Math.max(val, minVal));
      }
      update();
    });

    document.addEventListener('alr-shop-products-loaded', update);

    update();
  }

  function initShop() {
    if (window.location.pathname === '/Shop' || window.location.pathname === '/Shop/') {
      loadProducts();
      initPriceSlider();
    }
  }

  document.addEventListener('DOMContentLoaded', initShop);
  document.addEventListener('nav', initShop);
})();
      `,
      }}
    />
  )
}

ALRShopScript.displayName = "ALRShopScript"
export default (() => ALRShopScript) satisfies QuartzComponentConstructor
