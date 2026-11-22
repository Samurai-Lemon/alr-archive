import { QuartzComponent, QuartzComponentConstructor } from "../types"

// Fills the Mods pages from each mod's GitHub Releases, merged with the manual files in its
// frontmatter. Rendered on every page so it is already loaded after SPA navigation.
//
// A release file named <name>-<version>+<loader>-<minecraft>.jar (what the mods' release workflow
// produces) is read for its loader and Minecraft version. Any other .jar falls back to the mod's
// first loader and Minecraft version, with the release tag as its version.
const script = `
(function () {
  if (window.__alrModsWired) return;
  window.__alrModsWired = true;

  var TTL = 5 * 60 * 1000;
  var pending = {};

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function safeUrl(u) {
    u = String(u || '');
    return /^(https?:\\/\\/|\\/)/i.test(u) ? u : '#';
  }
  function firstLine(body) {
    if (!body) return '';
    var lines = String(body).split(/\\r?\\n/);
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i].replace(/^[#*\\-\\s]+/, '').trim();
      if (l && !/^(what's changed|full changelog)/i.test(l) && !/^https?:/.test(l)) return l.replace(/\\*\\*/g, '');
    }
    return '';
  }
  function fmtDate(d) {
    if (!d) return '';
    var t = new Date(d.length === 10 ? d + 'T12:00:00' : d);
    if (isNaN(t)) return d;
    return t.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
  function fmtCount(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\\.0$/, '') + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\\.0$/, '') + 'k';
    return String(n);
  }
  function fmtSize(b) {
    if (!b) return '';
    return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
  }
  function cmpVer(a, b) {
    var pa = String(a).split(/[.\\-+]/), pb = String(b).split(/[.\\-+]/);
    for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
      var x = pa[i], y = pb[i];
      if (x === undefined) return -1;
      if (y === undefined) return 1;
      var nx = /^\\d+$/.test(x), ny = /^\\d+$/.test(y);
      if (nx && ny) { if (+x !== +y) return +x - +y; }
      else if (x !== y) return x < y ? -1 : 1;
    }
    return 0;
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  var LOADER_NAMES = { fabric: 'Fabric', neoforge: 'NeoForge', forge: 'Forge', quilt: 'Quilt' };

  function fetchReleases(repo) {
    if (!repo) return Promise.resolve([]);
    if (pending[repo]) return pending[repo];
    var key = 'alr-mod-releases:' + repo;
    try {
      var hit = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (hit && Date.now() - hit.t < TTL && hit.d && hit.d.length) return (pending[repo] = Promise.resolve(hit.d));
    } catch (e) {}
    pending[repo] = fetch('https://api.github.com/repos/' + repo + '/releases?per_page=30', {
      headers: { Accept: 'application/vnd.github+json' }
    }).then(function (r) { return r.ok ? r.json() : []; }).then(function (list) {
      var d = (Array.isArray(list) ? list : []).filter(function (r) { return !r.draft; }).map(function (r) {
        return {
          tag: r.tag_name, pre: !!r.prerelease, date: r.published_at, notes: firstLine(r.body),
          assets: (r.assets || []).filter(function (a) {
            return /\\.jar$/i.test(a.name) && !/-(sources|dev|javadoc)\\.jar$/i.test(a.name);
          }).map(function (a) {
            return { name: a.name, url: a.browser_download_url, size: a.size, dl: a.download_count };
          })
        };
      });
      // Only remember a list that has files: a mod with none yet is checked again on every visit,
      // so a brand-new release shows up right away.
      var hasFiles = d.some(function (r) { return r.assets.length > 0; });
      try {
        if (hasFiles) sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: d }));
        else sessionStorage.removeItem(key);
      } catch (e) {}
      return d;
    }).catch(function () { delete pending[repo]; return null; });
    return pending[repo];
  }

  // Every downloadable file for a mod, newest version first.
  function builds(mod, releases) {
    var out = [];
    (releases || []).forEach(function (r) {
      r.assets.forEach(function (a) {
        var m = /^(.+?)-(\\d[^+]*)\\+([a-z]+)-(.+)\\.jar$/i.exec(a.name);
        out.push({
          version: m ? m[2] : String(r.tag || '').replace(/^v/i, ''),
          loader: m ? (LOADER_NAMES[m[3].toLowerCase()] || cap(m[3])) : mod.loader,
          mc: m ? m[4] : mod.mc,
          url: a.url, name: a.name, size: a.size, dl: a.dl, date: r.date, notes: r.notes, pre: r.pre
        });
      });
    });
    (mod.files || []).forEach(function (f) {
      var name = String(f.url).split('/').pop();
      out.push({
        version: String(f.version || '').replace(/^v/i, ''), loader: f.loader || mod.loader, mc: f.minecraft || mod.mc,
        url: f.url, name: name, date: f.date, notes: f.notes, pre: false, manual: true
      });
    });
    out.sort(function (a, b) {
      return cmpVer(b.version, a.version) || String(b.date || '').localeCompare(String(a.date || ''));
    });
    return out;
  }
  function latestOf(list) {
    var stable = list.filter(function (b) { return !b.pre; });
    var top = (stable.length ? stable : list)[0];
    if (!top) return [];
    return list.filter(function (b) { return b.version === top.version && b.pre === top.pre; });
  }

  function readMod(el) {
    try { return JSON.parse(el.getAttribute('data-mod')); } catch (e) { return null; }
  }

  function fillCard(card) {
    var mod = readMod(card);
    if (!mod) return;
    var ver = card.querySelector('[data-mod-ver]');
    var btn = card.querySelector('[data-mod-dl]');
    fetchReleases(mod.repo).then(function (rel) {
      var all = builds(mod, rel || []);
      var top = latestOf(all);
      if (!top.length) {
        if (ver) ver.textContent = rel === null ? 'Files on GitHub' : 'Coming soon';
        if (btn && rel !== null && !all.length) { btn.classList.add('is-off'); btn.textContent = 'Coming soon'; btn.removeAttribute('href'); }
        return;
      }
      if (ver) ver.textContent = 'v' + top[0].version + (top[0].date ? ' · ' + fmtDate(top[0].date) : '');
      if (btn) {
        if (top.length === 1) { btn.href = safeUrl(top[0].url); btn.title = top[0].name; }
        else { btn.href = card.querySelector('.alr-mod-card-link').getAttribute('href'); btn.classList.add('internal'); }
      }
    });
  }

  function fillPage(page) {
    var mod = readMod(page);
    if (!mod) return;
    var btn = page.querySelector('[data-mod-dl]');
    var label = page.querySelector('[data-mod-dl-label]');
    var count = page.querySelector('[data-mod-count]');
    var menu = page.querySelector('[data-mod-menu]');
    var items = page.querySelector('[data-mod-menu-items]');
    var filesBox = document.querySelector('[data-mod-files]');

    fetchReleases(mod.repo).then(function (rel) {
      var all = builds(mod, rel || []);
      var top = latestOf(all);
      var total = (rel || []).reduce(function (n, r) { return n + r.assets.reduce(function (m, a) { return m + (a.dl || 0); }, 0); }, 0);
      if (count) count.textContent = total ? '⤓ ' + fmtCount(total) + ' downloads' : '';

      if (!top.length) {
        if (rel !== null && btn) { btn.classList.add('is-off'); btn.removeAttribute('href'); if (label) label.textContent = 'Coming soon'; }
      } else if (btn) {
        if (label) label.textContent = 'Download v' + top[0].version + (top.length > 1 ? ' ▾' : '');
        if (top.length === 1) {
          btn.href = safeUrl(top[0].url);
          btn.title = top[0].name;
        } else {
          btn.removeAttribute('href');
          btn.setAttribute('role', 'button');
          btn.setAttribute('tabindex', '0');
          btn.setAttribute('aria-haspopup', 'true');
          items.innerHTML = top.map(function (b) {
            return '<a class="alr-mod-menu-item" href="' + esc(safeUrl(b.url)) + '"><span><span class="alr-mod-menu-label">' +
              esc(b.loader + ' · Minecraft ' + b.mc) + '</span><span class="alr-mod-menu-file">' + esc(b.name) +
              '</span></span><span class="alr-mod-menu-go" aria-hidden="true">⤓</span></a>';
          }).join('');
          var toggle = function (e) {
            e.preventDefault();
            var open = menu.hasAttribute('hidden');
            if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          };
          btn.addEventListener('click', toggle);
          btn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') toggle(e); });
          document.addEventListener('click', function (e) {
            if (!menu.hasAttribute('hidden') && !menu.contains(e.target) && !btn.contains(e.target)) menu.setAttribute('hidden', '');
          });
        }
      }

      if (!filesBox) return;
      if (!all.length) {
        if (rel === null) return; // GitHub unreachable: keep the link to the Releases page
        filesBox.innerHTML = '<div class="alr-mod-files-empty">No downloads yet. Check back soon.</div>';
        return;
      }
      var topVer = top[0] && top[0].version;
      var groups = [];
      all.forEach(function (b) {
        var g = groups[groups.length - 1];
        if (!g || g.version !== b.version) groups.push(g = { version: b.version, items: [], date: b.date, notes: b.notes, pre: b.pre });
        g.items.push(b);
        if (!g.notes && b.notes) g.notes = b.notes;
      });
      filesBox.innerHTML = groups.map(function (g) {
        var setups = g.items.map(function (b) { return b.mc + ' · ' + b.loader; });
        setups = setups.filter(function (s, i) { return setups.indexOf(s) === i; });
        var badge = g.version === topVer ? '<span class="alr-mod-badge">Latest</span>' : (g.pre ? '<span class="alr-mod-badge alr-mod-badge-beta">Beta</span>' : '');
        var links = g.items.map(function (b) {
          var t = g.items.length > 1 ? esc(b.loader + ' ' + b.mc) : '';
          return '<a class="alr-mod-btn alr-mod-btn-sm" href="' + esc(safeUrl(b.url)) + '" title="' + esc(b.name) + (b.size ? ' (' + fmtSize(b.size) + ')' : '') + '" aria-label="Download ' + esc(b.name) + '">⤓' + (t ? ' ' + t : '') + '</a>';
        }).join('');
        return '<div class="alr-mod-file"><div class="alr-mod-file-ver">' + esc(g.version) + badge + '</div>' +
          '<div class="alr-mod-file-what"><span>' + esc(setups.join(', ')) + '</span>' + (g.notes ? ' — ' + esc(g.notes) : '') + '</div>' +
          '<div class="alr-mod-file-date">' + esc(fmtDate(g.date)) + '</div><div class="alr-mod-file-dl">' + links + '</div></div>';
      }).join('');
    });
  }

  function wireLoaderSwitch() {
    var btns = document.querySelectorAll('[data-mods-loader]');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var want = b.getAttribute('data-mods-loader');
        btns.forEach(function (o) { o.classList.toggle('on', o === b); });
        document.querySelectorAll('.alr-mod-card').forEach(function (c) {
          var ls = (c.getAttribute('data-mod-loaders') || '').split(',');
          c.style.display = want === 'All' || ls.indexOf(want) >= 0 ? '' : 'none';
        });
      });
    });
  }

  // Quartz fires 'nav' on the first load too, so each element is only wired once.
  function once(sel, fn) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.hasAttribute('data-mod-wired')) return;
      el.setAttribute('data-mod-wired', '');
      fn(el);
    });
  }
  function run() {
    once('.alr-mod-card[data-mod]', fillCard);
    once('.alr-mod-page[data-mod]', fillPage);
    if (document.querySelector('[data-mods-loader]:not([data-mod-wired])')) {
      document.querySelectorAll('[data-mods-loader]').forEach(function (b) { b.setAttribute('data-mod-wired', ''); });
      wireLoaderSwitch();
    }
  }
  document.addEventListener('nav', run);
  if (document.readyState !== 'loading') run(); else document.addEventListener('DOMContentLoaded', run);
})();
`

const ALRModsScript: QuartzComponent = () => <script dangerouslySetInnerHTML={{ __html: script }} />

ALRModsScript.displayName = "ALRModsScript"
export default (() => ALRModsScript) satisfies QuartzComponentConstructor
