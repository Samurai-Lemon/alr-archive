import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Always-rendered (afterBody) component, deliberately not living inline inside
// ALREchoRegistry/ALRRealityRegistry's own markup. Those components only exist in the DOM
// on their one respective page each, so an inline <script> there would hit the same
// micromorph "patch text instead of replace" issue documented in ALRLabelCreatorScript —
// navigating into the registry page via a client-side link click would silently fail to
// run init(). Keeping this script's content identical and always-present on every page
// sidesteps that: it only needs to truly execute once, then reacts to "nav" like every
// other always-on ALR script.
const ALRRegistryScript: QuartzComponent = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  function g(id) { return document.getElementById(id); }

  function freshEl(id) {
    var el = g(id);
    if (!el) return null;
    var clone = el.cloneNode(true);
    el.parentNode.replaceChild(clone, el);
    return clone;
  }

  function initEchoRegistry() {
    var root = g('alr-echo-registry-root');
    if (!root) return;

    var dataEl = g('alr-echo-registry-data');
    var items = [];
    try { items = JSON.parse(dataEl ? dataEl.textContent : '[]'); } catch (e) {}

    var rowsWrap = freshEl('alr-echo-registry-rows');
    var emptyEl = g('alr-echo-registry-empty');
    var searchInput = freshEl('alr-echo-registry-search');
    var filterBtns = root.querySelectorAll('.alr-reg-filter-btn');

    var state = { filter: 'all', search: '' };

    function applyFilter() {
      if (!rowsWrap) return;
      var rows = rowsWrap.querySelectorAll('.alr-reg-row');
      var visible = 0;
      rows.forEach(function(row) {
        var matchesFilter = state.filter === 'all' || row.getAttribute('data-esc') === state.filter;
        var matchesSearch = !state.search || (row.getAttribute('data-search') || '').indexOf(state.search) !== -1;
        var show = matchesFilter && matchesSearch;
        row.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (emptyEl) emptyEl.style.display = visible === 0 ? '' : 'none';
    }

    filterBtns.forEach(function(btn) {
      var clone = btn.cloneNode(true);
      btn.parentNode.replaceChild(clone, btn);
      clone.addEventListener('click', function() {
        root.querySelectorAll('.alr-reg-filter-btn').forEach(function(b) {
          b.classList.remove('alr-reg-filter-active');
        });
        clone.classList.add('alr-reg-filter-active');
        state.filter = clone.getAttribute('data-filter');
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function() {
        state.search = searchInput.value.trim().toLowerCase();
        applyFilter();
      });
    }

    function cardExpandHtml(item) {
      return '<div class="alr-reg-card-expand-inner">'
        + '<div class="alr-reg-detail-grid alr-reg-detail-grid-5">'
        + detailCell('Echo Class', item.ec + ' — ' + item.ecLabel)
        + detailCell('Stability', item.esc + ' — ' + item.escLabel)
        + detailCell('Origin Tier', item.rts + ' — ' + item.rtsLabel)
        + detailCell('Divergence', item.rds + ' — ' + item.rdsLabel)
        + detailCell('Collapse Class', item.rcc + ' — ' + item.rccLabel)
        + '</div>'
        + '<a href="' + item.href + '" class="alr-reg-view-btn alr-reg-card-view-btn">View Full Entry &rarr;</a>'
        + '</div>';
    }

    function selectRow(index) {
      var item = items[index];
      if (!item) return;

      if (rowsWrap) {
        rowsWrap.querySelectorAll('.alr-reg-row').forEach(function(r) {
          r.classList.remove('alr-reg-row-selected');
          var exp = r.querySelector('.alr-reg-card-expand');
          if (exp) exp.innerHTML = '';
        });
        var target = rowsWrap.querySelector('.alr-reg-row[data-index="' + index + '"]');
        if (target) {
          target.classList.add('alr-reg-row-selected');
          var exp = target.querySelector('.alr-reg-card-expand');
          if (exp) exp.innerHTML = cardExpandHtml(item);
        }
      }

      var idEl = g('alr-echo-detail-id');
      var titleEl = g('alr-echo-detail-title');
      var subEl = g('alr-echo-detail-sub');
      var linkEl = g('alr-echo-detail-link');
      var gridEl = g('alr-echo-detail-grid');

      if (idEl) idEl.textContent = item.id + ' · SELECTED';
      if (titleEl) titleEl.textContent = item.name;
      if (subEl) subEl.textContent = item.ecLabel + ' · ' + item.escLabel;
      if (linkEl) linkEl.setAttribute('href', item.href);
      if (gridEl) {
        gridEl.innerHTML =
          detailCell('Echo Class', item.ec + ' — ' + item.ecLabel) +
          detailCell('Stability', item.esc + ' — ' + item.escLabel) +
          detailCell('Origin Tier', item.rts + ' — ' + item.rtsLabel) +
          detailCell('Divergence', item.rds + ' — ' + item.rdsLabel) +
          detailCell('Collapse Class', item.rcc + ' — ' + item.rccLabel);
      }
    }

    if (rowsWrap) {
      rowsWrap.addEventListener('click', function(evt) {
        var row = evt.target.closest ? evt.target.closest('.alr-reg-row') : null;
        if (!row || !rowsWrap.contains(row)) return;
        var idx = row.getAttribute('data-index');
        if (idx === null) return;
        selectRow(Number(idx));
      });
    }

    if (items.length > 0) selectRow(0);
    applyFilter();
  }

  function detailCell(label, val) {
    return '<div class="alr-reg-detail-cell">'
      + '<div class="alr-reg-detail-cell-label">' + label + '</div>'
      + '<div class="alr-reg-detail-cell-val">' + val + '</div>'
      + '</div>';
  }

  function echoChipHtml(ref) {
    if (ref && ref.href) {
      return '<a href="' + ref.href + '" class="alr-reg-echo-chip alr-reg-echo-chip-link">'
        + '<span class="alr-reg-echo-dot"></span>' + ref.id + ' · ' + ref.name + '</a>';
    }
    var id = ref && ref.id ? ref.id : String(ref);
    return '<span class="alr-reg-echo-chip"><span class="alr-reg-echo-dot"></span>' + id + '</span>';
  }

  function initRealityRegistry() {
    var root = g('alr-reality-registry-root');
    if (!root) return;

    var dataEl = g('alr-reality-registry-data');
    var items = [];
    try { items = JSON.parse(dataEl ? dataEl.textContent : '[]'); } catch (e) {}

    var rowsWrap = freshEl('alr-reality-registry-rows');
    var emptyEl = g('alr-reality-registry-empty');
    var searchInput = freshEl('alr-reality-registry-search');
    var filterBtns = root.querySelectorAll('.alr-reg-filter-btn');

    var state = { filter: 'all', search: '' };

    function applyFilter() {
      if (!rowsWrap) return;
      var rows = rowsWrap.querySelectorAll('.alr-reg-row');
      var visible = 0;
      rows.forEach(function(row) {
        var matchesFilter = state.filter === 'all' || row.getAttribute('data-rcc') === state.filter;
        var matchesSearch = !state.search || (row.getAttribute('data-search') || '').indexOf(state.search) !== -1;
        var show = matchesFilter && matchesSearch;
        row.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (emptyEl) emptyEl.style.display = visible === 0 ? '' : 'none';
    }

    filterBtns.forEach(function(btn) {
      var clone = btn.cloneNode(true);
      btn.parentNode.replaceChild(clone, btn);
      clone.addEventListener('click', function() {
        root.querySelectorAll('.alr-reg-filter-btn').forEach(function(b) {
          b.classList.remove('alr-reg-filter-active');
        });
        clone.classList.add('alr-reg-filter-active');
        state.filter = clone.getAttribute('data-filter');
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function() {
        state.search = searchInput.value.trim().toLowerCase();
        applyFilter();
      });
    }

    function cardExpandHtml(item) {
      var echoesHtml = item.echoes && item.echoes.length
        ? item.echoes.map(echoChipHtml).join('')
        : '<span class="alr-reg-no-echo">No associated Echoes on record.</span>';
      return '<div class="alr-reg-card-expand-inner">'
        + '<div class="alr-reg-detail-grid alr-reg-detail-grid-4">'
        + detailCell('Reality Tier', item.rts + ' — ' + item.rtsLabel)
        + detailCell('Divergence', item.rds + ' — ' + item.rdsLabel)
        + detailCell('Collapse Class', item.rcc + ' — ' + item.rccLabel)
        + detailCell('Status', item.status.charAt(0).toUpperCase() + item.status.slice(1))
        + '</div>'
        + '<div class="alr-reg-detail-cell-label" style="margin-bottom:6px">Associated Echoes</div>'
        + '<div class="alr-reg-detail-echoes">' + echoesHtml + '</div>'
        + '<a href="' + item.href + '" class="alr-reg-view-btn alr-reg-card-view-btn">View Full Report &rarr;</a>'
        + '</div>';
    }

    function selectRow(index) {
      var item = items[index];
      if (!item) return;

      if (rowsWrap) {
        rowsWrap.querySelectorAll('.alr-reg-row').forEach(function(r) {
          r.classList.remove('alr-reg-row-selected');
          var exp = r.querySelector('.alr-reg-card-expand');
          if (exp) exp.innerHTML = '';
        });
        var target = rowsWrap.querySelector('.alr-reg-row[data-index="' + index + '"]');
        if (target) {
          target.classList.add('alr-reg-row-selected');
          var exp = target.querySelector('.alr-reg-card-expand');
          if (exp) exp.innerHTML = cardExpandHtml(item);
        }
      }

      var idEl = g('alr-reality-detail-id');
      var titleEl = g('alr-reality-detail-title');
      var subEl = g('alr-reality-detail-sub');
      var linkEl = g('alr-reality-detail-link');
      var gridEl = g('alr-reality-detail-grid');
      var echoesEl = g('alr-reality-detail-echoes');

      if (idEl) idEl.textContent = item.id + ' · SELECTED';
      if (titleEl) titleEl.textContent = 'Reality ' + item.id;
      if (subEl) subEl.textContent = item.rtsLabel + ' · ' + item.rdsLabel + ' · ' + item.rccLabel;
      if (linkEl) linkEl.setAttribute('href', item.href);
      if (gridEl) {
        gridEl.innerHTML =
          detailCell('Reality Tier', item.rts + ' — ' + item.rtsLabel) +
          detailCell('Divergence', item.rds + ' — ' + item.rdsLabel) +
          detailCell('Collapse Class', item.rcc + ' — ' + item.rccLabel) +
          detailCell('Status', item.status.charAt(0).toUpperCase() + item.status.slice(1));
      }
      if (echoesEl) {
        echoesEl.innerHTML = item.echoes && item.echoes.length
          ? item.echoes.map(echoChipHtml).join('')
          : '<span class="alr-reg-no-echo">No associated Echoes on record.</span>';
      }
    }

    if (rowsWrap) {
      rowsWrap.addEventListener('click', function(evt) {
        var row = evt.target.closest ? evt.target.closest('.alr-reg-row') : null;
        if (!row || !rowsWrap.contains(row)) return;
        var idx = row.getAttribute('data-index');
        if (idx === null) return;
        selectRow(Number(idx));
      });
    }

    if (items.length > 0) selectRow(0);
    applyFilter();
  }

  function init() {
    initEchoRegistry();
    initRealityRegistry();
  }

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('nav', init);
})();
      `,
      }}
    />
  )
}

ALRRegistryScript.displayName = "ALRRegistryScript"
export default (() => ALRRegistryScript) satisfies QuartzComponentConstructor
