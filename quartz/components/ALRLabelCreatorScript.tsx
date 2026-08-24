import { QuartzComponent, QuartzComponentConstructor } from "./types"

// This is deliberately a separate, always-rendered (afterBody) component rather than
// living inline inside ALRLabelCreator's beforeBody markup. ALRLabelCreator is only
// present in the DOM on the label-creator page, so its inline <script> is absent on
// every other page. Quartz's SPA router morphs the body with micromorph, which for two
// <script> elements found at the same tree position only patches the *text content* of
// the existing node rather than replacing the element outright — and mutating a
// script's text after the fact does not make the browser (re-)execute it. So navigating
// into the label-creator page via a client-side link click silently no-ops instead of
// running init(), leaving the preview empty until a full reload. Keeping this script's
// content identical and always-present on every page sidesteps that path entirely: it
// only ever needs to truly execute once, and after that reacts to "nav" like the sound
// engine does.
const ALRLabelCreatorScript: QuartzComponent = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  var tab = 'front';
  var PRESETS = {
    dark:  { body:'#1a1814', zone:'#141410', acc:'#cc785c', txt:'#f0ece0', mut:'#b0ac9f' },
    light: { body:'#f5f0e8', zone:'#ede8dc', acc:'#cc785c', txt:'#1a1814', mut:'#6b6050' }
  };

  function g(id) { return document.getElementById(id); }
  function val(id) { var el = g(id); return el ? el.value : ''; }

  function getF() {
    return {
      name: val('alr-lc-name') || 'CARD NAME',
      set: val('alr-lc-set') || 'SET - SERIES - EN - YEAR',
      variant: val('alr-lc-variant') || 'VARIANT / EDITION',
      cert: val('alr-lc-cert') || '0000-ALR',
      grade: val('alr-lc-grade') || '10',
      gl: val('alr-lc-gl') || 'PRISTINE',
      body: val('alr-lc-cbody'),
      zone: val('alr-lc-czone'),
      acc: val('alr-lc-cacc'),
      txt: val('alr-lc-ctxt'),
      mut: val('alr-lc-cmut')
    };
  }

  function getB() {
    return {
      body: val('alr-lc-bcbody'),
      acc: val('alr-lc-bcacc'),
      txt: val('alr-lc-bctxt'),
      mut: val('alr-lc-bcmut')
    };
  }

  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function dk(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    var r = Math.max(0, ((n >> 16) & 255) - a);
    var gr = Math.max(0, ((n >> 8) & 255) - a);
    var b = Math.max(0, (n & 255) - a);
    return '#' + [r, gr, b].map(function(x) { return x.toString(16).padStart(2, '0'); }).join('');
  }

  function frontInner(v) {
    var id = 'lg' + Math.random().toString(36).slice(2);
    return '<defs>'
      + '<radialGradient id="' + id + '" cx="50%" cy="50%" r="50%">'
      + '<stop offset="0%" stop-color="' + v.acc + '" stop-opacity="0.04"/>'
      + '<stop offset="100%" stop-color="' + v.acc + '" stop-opacity="0"/>'
      + '</radialGradient>'
      + '</defs>'
      + '<rect x="0" y="0" width="700" height="200" fill="' + v.body + '"/>'
      + '<rect x="522" y="0" width="178" height="200" fill="' + v.zone + '"/>'
      + '<line x1="522" y1="0" x2="522" y2="200" stroke="' + v.acc + '" stroke-width="3"/>'
      + '<text x="261" y="30" text-anchor="middle" font-size="21" font-weight="700" style="fill:' + v.acc + '" letter-spacing="2" font-family="Courier New,monospace">ALR INITIATIVE GRADING</text>'
      + '<line x1="0" y1="35" x2="519" y2="35" stroke="' + v.acc + '" stroke-width="0.7" opacity="0.35"/>'
      + '<text x="20" y="61" font-size="28" font-weight="700" style="fill:' + v.txt + '" font-family="Courier New,monospace">' + esc(v.name) + '</text>'
      + '<line x1="20" y1="67" x2="510" y2="67" stroke="' + v.mut + '" stroke-width="1" opacity="0.3"/>'
      + '<text x="20" y="88" font-size="19" font-weight="700" style="fill:' + v.mut + '" font-family="Courier New,monospace">' + esc(v.set) + '</text>'
      + '<line x1="20" y1="94" x2="510" y2="94" stroke="' + v.mut + '" stroke-width="1" opacity="0.3"/>'
      + '<text x="20" y="115" font-size="21" font-weight="700" style="fill:' + v.acc + '" font-family="Courier New,monospace">' + esc(v.variant) + '</text>'
      + '<line x1="20" y1="121" x2="510" y2="121" stroke="' + v.mut + '" stroke-width="1" opacity="0.3"/>'
      + '<text x="20" y="133" font-size="16" font-weight="700" style="fill:' + v.mut + '" letter-spacing="1.2" font-family="Courier New,monospace">CATEGORY</text>'
      + '<text x="20" y="150" font-size="19" font-weight="700" style="fill:' + v.txt + '" font-family="Courier New,monospace">TRADING CARD</text>'
      + '<line x1="272" y1="123" x2="272" y2="154" stroke="' + v.mut + '" stroke-width="1" opacity="0.3"/>'
      + '<text x="277" y="133" font-size="16" font-weight="700" style="fill:' + v.mut + '" letter-spacing="1.2" font-family="Courier New,monospace">LANGUAGE</text>'
      + '<text x="277" y="150" font-size="19" font-weight="700" style="fill:' + v.txt + '" font-family="Courier New,monospace">ENGLISH</text>'
      + '<line x1="20" y1="155" x2="510" y2="155" stroke="' + v.mut + '" stroke-width="1" opacity="0.3"/>'
      + '<text x="20" y="169" font-size="16" font-weight="700" style="fill:' + v.mut + '" letter-spacing="1.2" font-family="Courier New,monospace">CERT NUMBER</text>'
      + '<text x="20" y="187" font-size="19" font-weight="700" style="fill:' + v.txt + '" font-family="Courier New,monospace">' + esc(v.cert) + '</text>'
      + '<text x="611" y="29" text-anchor="middle" font-size="15" font-weight="700" style="fill:' + v.mut + '" letter-spacing="1.8" font-family="Courier New,monospace">ARCHIVE GRADE</text>'
      + '<line x1="528" y1="35" x2="688" y2="35" stroke="' + v.acc + '" stroke-width="0.7" opacity="0.35"/>'
      + '<text x="611" y="128" text-anchor="middle" font-size="110" font-weight="700" style="fill:' + v.txt + '" font-family="Courier New,monospace">' + esc(v.grade) + '</text>'
      + '<line x1="528" y1="168" x2="688" y2="168" stroke="' + v.mut + '" stroke-width="1" opacity="0.3"/>'
      + '<text x="611" y="184" text-anchor="middle" font-size="17" font-weight="700" style="fill:' + v.mut + '" letter-spacing="3.5" font-family="Courier New,monospace">' + esc(v.gl) + '</text>'
      + '<line x1="528" y1="190" x2="688" y2="190" stroke="' + v.acc + '" stroke-width="0.7" opacity="0.35"/>'
      + '<rect x="1.5" y="1.5" width="697" height="197" rx="3.5" fill="none" stroke="' + v.acc + '" stroke-width="5"/>';
  }

  function backInner(v) {
    var id2 = 'gl' + Math.random().toString(36).slice(2);
    return '<defs>'
      + '<radialGradient id="' + id2 + '" cx="50%" cy="50%" r="40%">'
      + '<stop offset="0%" stop-color="' + v.acc + '" stop-opacity="0.08"/>'
      + '<stop offset="100%" stop-color="' + v.acc + '" stop-opacity="0"/>'
      + '</radialGradient>'
      + '</defs>'
      + '<rect x="0" y="0" width="700" height="200" fill="' + v.body + '"/>'
      + '<ellipse cx="350" cy="100" rx="220" ry="88" fill="url(#' + id2 + ')"/>'
      + '<line x1="30" y1="100" x2="218" y2="100" stroke="' + v.acc + '" stroke-width="0.8" opacity="0.4"/>'
      + '<line x1="482" y1="100" x2="670" y2="100" stroke="' + v.acc + '" stroke-width="0.8" opacity="0.4"/>'
      + '<polygon points="224,100 234,91 244,100 234,109" fill="none" stroke="' + v.acc + '" stroke-width="1" opacity="0.5"/>'
      + '<polygon points="456,100 466,91 476,100 466,109" fill="none" stroke="' + v.acc + '" stroke-width="1" opacity="0.5"/>'
      + '<text x="350" y="92" text-anchor="middle" font-size="68" font-weight="700" style="fill:' + v.txt + '" letter-spacing="6" font-family="Courier New,monospace">ALR</text>'
      + '<text x="350" y="116" text-anchor="middle" font-size="19" font-weight="700" style="fill:' + v.mut + '" letter-spacing="5" font-family="Courier New,monospace">INITIATIVE</text>'
      + '<line x1="274" y1="123" x2="426" y2="123" stroke="' + v.acc + '" stroke-width="0.6" opacity="0.4"/>'
      + '<text x="350" y="140" text-anchor="middle" font-size="14" font-weight="700" style="fill:' + dk(v.mut,20) + '" letter-spacing="2" font-family="Courier New,monospace">ARCHIVE - GRADE - CERTIFIED</text>'
      + '<line x1="18" y1="22" x2="38" y2="22" stroke="' + v.acc + '" stroke-width="0.9" opacity="0.5"/>'
      + '<line x1="18" y1="22" x2="18" y2="42" stroke="' + v.acc + '" stroke-width="0.9" opacity="0.5"/>'
      + '<line x1="682" y1="22" x2="662" y2="22" stroke="' + v.acc + '" stroke-width="0.9" opacity="0.5"/>'
      + '<line x1="682" y1="22" x2="682" y2="42" stroke="' + v.acc + '" stroke-width="0.9" opacity="0.5"/>'
      + '<line x1="18" y1="178" x2="38" y2="178" stroke="' + v.acc + '" stroke-width="0.9" opacity="0.5"/>'
      + '<line x1="18" y1="178" x2="18" y2="158" stroke="' + v.acc + '" stroke-width="0.9" opacity="0.5"/>'
      + '<line x1="682" y1="178" x2="662" y2="178" stroke="' + v.acc + '" stroke-width="0.9" opacity="0.5"/>'
      + '<line x1="682" y1="178" x2="682" y2="158" stroke="' + v.acc + '" stroke-width="0.9" opacity="0.5"/>'
      + '<rect x="1.5" y="1.5" width="697" height="197" rx="3.5" fill="none" stroke="' + v.acc + '" stroke-width="5"/>';
  }

  function buildFront(v) {
    return '<svg width="70mm" height="20mm" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" style="color:unset">'
      + frontInner(v) + '</svg>';
  }

  function buildBack(v) {
    return '<svg width="70mm" height="20mm" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" style="color:unset">'
      + backInner(v) + '</svg>';
  }

  function buildFold(vf, vb) {
    return '<svg width="70mm" height="40.6mm" viewBox="0 0 700 406" xmlns="http://www.w3.org/2000/svg">'
      + '<rect x="0" y="0" width="700" height="406" fill="#fff"/>'
      + '<g transform="translate(0,0)"><svg width="700" height="200" viewBox="0 0 700 200" style="color:unset">' + frontInner(vf) + '</svg></g>'
      + '<g transform="translate(700,406) rotate(180)"><svg width="700" height="200" viewBox="0 0 700 200" style="color:unset">' + backInner(vb) + '</svg></g>'
      + '<line x1="0" y1="203" x2="700" y2="203" stroke="#888" stroke-width="0.7" stroke-dasharray="8,6"/>'
      + '<g stroke="#000" stroke-width="0.7" fill="none" stroke-linecap="square">'
      + '<line x1="-70" y1="0" x2="-20" y2="0"/><line x1="0" y1="-70" x2="0" y2="-20"/>'
      + '<line x1="720" y1="0" x2="770" y2="0"/><line x1="700" y1="-70" x2="700" y2="-20"/>'
      + '<line x1="-70" y1="406" x2="-20" y2="406"/><line x1="0" y1="426" x2="0" y2="476"/>'
      + '<line x1="720" y1="406" x2="770" y2="406"/><line x1="700" y1="426" x2="700" y2="476"/>'
      + '</g></svg>';
  }

  function render() {
    var el = g('alr-lc-preview');
    if (!el) return;
    var vf = getF(), vb = getB();
    if (tab === 'fold') {
      el.innerHTML = '<div class="alr-lc-plabel">Front - fold - Back</div>'
        + '<div class="alr-lc-svgwrap">' + buildFront(vf) + '</div>'
        + '<div class="alr-lc-foldline"><div class="alr-lc-foldline-dash"></div><span>FOLD</span><div class="alr-lc-foldline-dash"></div></div>'
        + '<div class="alr-lc-svgwrap">' + buildBack(vb) + '</div>';
    } else if (tab === 'back') {
      el.innerHTML = '<div class="alr-lc-plabel">Back</div><div class="alr-lc-svgwrap">' + buildBack(vb) + '</div>';
    } else {
      el.innerHTML = '<div class="alr-lc-plabel">Front</div><div class="alr-lc-svgwrap">' + buildFront(vf) + '</div>';
    }
  }

  function download(which) {
    var vf = getF(), vb = getB(), svg, fn;
    if (which === 'front') { svg = buildFront(vf); fn = 'alr_label_front.svg'; }
    else if (which === 'back') { svg = buildBack(vb); fn = 'alr_label_back.svg'; }
    else { svg = buildFold(vf, vb); fn = 'alr_label_foldcut.svg'; }
    var encoded = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    var a = document.createElement('a');
    a.href = encoded; a.download = fn;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    var s = g('alr-lc-status'); if (s) s.textContent = 'Downloaded';
  }

  function setPreset(name) {
    var p = PRESETS[name];
    ['dark', 'light'].forEach(function(n) {
      var b = g('alr-lc-preset-' + n);
      if (b) b.className = 'alr-lc-preset-btn' + (n === name ? ' alr-lc-preset-active' : '');
    });
    function sc(cid, hid, v) { var c = g(cid), h = g(hid); if (c) c.value = v; if (h) h.value = v; }
    sc('alr-lc-cbody','alr-lc-hbody',p.body); sc('alr-lc-czone','alr-lc-hzone',p.zone);
    sc('alr-lc-cacc','alr-lc-hacc',p.acc); sc('alr-lc-ctxt','alr-lc-htxt',p.txt); sc('alr-lc-cmut','alr-lc-hmut',p.mut);
    sc('alr-lc-bcbody','alr-lc-bhbody',p.body);
    sc('alr-lc-bcacc','alr-lc-bhacc',p.acc); sc('alr-lc-bctxt','alr-lc-bhtxt',p.txt); sc('alr-lc-bcmut','alr-lc-bhmut',p.mut);
    render();
  }

  function switchTab(t) {
    tab = t;
    ['front', 'back', 'fold'].forEach(function(n) {
      var b = g('alr-lc-tab-' + n);
      if (b) b.className = 'alr-lc-tab' + (n === t ? ' alr-lc-tab-active' : '');
    });
    var cf = g('alr-lc-colours-front'), cb = g('alr-lc-colours-back');
    if (cf) cf.style.display = (t === 'back') ? 'none' : '';
    if (cb) cb.style.display = (t === 'front') ? 'none' : '';
    render();
  }

  function bindColor(cid, hid) {
    var c = g(cid), h = g(hid);
    if (!c) return;
    var cn = c.cloneNode(true); c.parentNode.replaceChild(cn, c); c = cn;
    if (h) { var hn = h.cloneNode(true); h.parentNode.replaceChild(hn, h); h = hn; }
    c.addEventListener('input', function() { if (h) h.value = c.value; render(); });
    c.addEventListener('change', function() { if (h) h.value = c.value; render(); });
    if (h) { h.addEventListener('input', function() { if (/^#[0-9a-fA-F]{6}$/.test(h.value)) c.value = h.value; render(); }); }
  }

  function init() {
    if (!g('alr-lc-tool')) return;

    function freshBtn(id) {
      var el = g(id); if (!el) return null;
      var n = el.cloneNode(true); el.parentNode.replaceChild(n, el); return n;
    }

    ['name','set','variant','cert','grade','gl'].forEach(function(id) {
      var el = freshBtn('alr-lc-' + id);
      if (el) el.addEventListener('input', render);
    });

    var genBtn = freshBtn('alr-lc-cert-gen');
    if (genBtn) genBtn.addEventListener('click', function() {
      var num = String(Math.floor(Math.random() * 900000) + 100000);
      var el = g('alr-lc-cert');
      if (el) { el.value = num + '-ALR'; render(); }
    });

    bindColor('alr-lc-cbody','alr-lc-hbody'); bindColor('alr-lc-czone','alr-lc-hzone');
    bindColor('alr-lc-cacc','alr-lc-hacc'); bindColor('alr-lc-ctxt','alr-lc-htxt'); bindColor('alr-lc-cmut','alr-lc-hmut');
    bindColor('alr-lc-bcbody','alr-lc-bhbody');
    bindColor('alr-lc-bcacc','alr-lc-bhacc'); bindColor('alr-lc-bctxt','alr-lc-bhtxt'); bindColor('alr-lc-bcmut','alr-lc-bhmut');

    var pd = freshBtn('alr-lc-preset-dark'), pl = freshBtn('alr-lc-preset-light');
    if (pd) pd.addEventListener('click', function() { setPreset('dark'); });
    if (pl) pl.addEventListener('click', function() { setPreset('light'); });

    var tf = freshBtn('alr-lc-tab-front'), tb = freshBtn('alr-lc-tab-back'), tfo = freshBtn('alr-lc-tab-fold');
    if (tf) tf.addEventListener('click', function() { switchTab('front'); });
    if (tb) tb.addEventListener('click', function() { switchTab('back'); });
    if (tfo) tfo.addEventListener('click', function() { switchTab('fold'); });

    var df = freshBtn('alr-lc-dl-front'), db = freshBtn('alr-lc-dl-back'), dfo = freshBtn('alr-lc-dl-fold');
    if (df) df.addEventListener('click', function() { download('front'); });
    if (db) db.addEventListener('click', function() { download('back'); });
    if (dfo) dfo.addEventListener('click', function() { download('fold'); });

    render();
  }

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('nav', init);
})();
      `,
      }}
    />
  )
}

ALRLabelCreatorScript.displayName = "ALRLabelCreatorScript"
export default (() => ALRLabelCreatorScript) satisfies QuartzComponentConstructor
