// @ts-nocheck
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRLabelCreator: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="alr-lc">

      <div class="alr-lc-banner">
        <div class="alr-lc-banner-inner">
          <div class="alr-eyebrow">ALR Initiative — Label Forge</div>
          <div class="alr-lc-banner-title">Label Creator</div>
          <div class="alr-lc-banner-sub">Generate a print-ready grading label for any card. Download your SVG at exact print size (70 × 20 mm).</div>
        </div>
        <div class="alr-lc-banner-meta">
          <div class="alr-lc-banner-meta-item">FORMAT · SVG</div>
          <div class="alr-lc-banner-meta-item">SIZE · 70 × 20 MM</div>
          <div class="alr-lc-banner-meta-item">STANDARD · PSA</div>
        </div>
      </div>

      <div id="alr-lc-tool">
        <div class="alr-lc-wrap">
          <div class="alr-lc-topbar">
            <span class="alr-lc-topbar-title">ALR INITIATIVE GRADING</span>
            <span class="alr-lc-topbar-sub">70mm x 20mm - PSA STANDARD</span>
          </div>
          <div class="alr-lc-body">
            <div class="alr-lc-left">

              <div class="alr-lc-section-label">Preset</div>
              <div class="alr-lc-preset-row">
                <button id="alr-lc-preset-dark" class="alr-lc-preset-btn alr-lc-preset-active">ALR Dark</button>
                <button id="alr-lc-preset-light" class="alr-lc-preset-btn">ALR Light</button>
              </div>
              <div class="alr-lc-rule"></div>

              <div class="alr-lc-section-label">Card Identity</div>
              <div class="alr-lc-field">
                <div class="alr-lc-label">Card Name <span class="alr-lc-req">*</span></div>
                <input class="alr-lc-input" id="alr-lc-name" value="CARD NAME" />
              </div>
              <div class="alr-lc-field">
                <div class="alr-lc-label">Set / Series</div>
                <input class="alr-lc-input" id="alr-lc-set" value="SET - SERIES - EN - YEAR" />
              </div>
              <div class="alr-lc-field">
                <div class="alr-lc-label">Variant / Edition</div>
                <input class="alr-lc-input" id="alr-lc-variant" value="VARIANT / EDITION" />
              </div>
              <div class="alr-lc-field">
                <div class="alr-lc-label">Cert Number</div>
                <div class="alr-lc-cert-row">
                  <input class="alr-lc-input" id="alr-lc-cert" value="0000-ALR" />
                  <button class="alr-lc-cert-gen" id="alr-lc-cert-gen" title="Generate">&#x21BB;</button>
                </div>
              </div>
              <div class="alr-lc-rule"></div>

              <div class="alr-lc-section-label">Grade</div>
              <div class="alr-lc-two">
                <div class="alr-lc-field">
                  <div class="alr-lc-label">Grade</div>
                  <input class="alr-lc-input" id="alr-lc-grade" type="number" value="10" />
                </div>
                <div class="alr-lc-field">
                  <div class="alr-lc-label">Grade Label</div>
                  <input class="alr-lc-input" id="alr-lc-gl" value="PRISTINE" />
                </div>
              </div>
              <div class="alr-lc-rule"></div>

              <div id="alr-lc-colours-front">
                <div class="alr-lc-section-label">Front Colours</div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Info Panel</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-cbody" value="#1a1814" /><input class="alr-lc-hex" id="alr-lc-hbody" value="#1a1814" /></div>
                  </div>
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Grade Panel</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-czone" value="#141410" /><input class="alr-lc-hex" id="alr-lc-hzone" value="#141410" /></div>
                  </div>
                </div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Accent</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-cacc" value="#cc785c" /><input class="alr-lc-hex" id="alr-lc-hacc" value="#cc785c" /></div>
                  </div>
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Primary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-ctxt" value="#f0ece0" /><input class="alr-lc-hex" id="alr-lc-htxt" value="#f0ece0" /></div>
                  </div>
                </div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Secondary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-cmut" value="#b0ac9f" /><input class="alr-lc-hex" id="alr-lc-hmut" value="#b0ac9f" /></div>
                  </div>
                </div>
              </div>

              <div id="alr-lc-colours-back" style="display:none">
                <div class="alr-lc-section-label">Back Colours</div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Body BG</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcbody" value="#1a1814" /><input class="alr-lc-hex" id="alr-lc-bhbody" value="#1a1814" /></div>
                  </div>
                </div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Accent</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcacc" value="#cc785c" /><input class="alr-lc-hex" id="alr-lc-bhacc" value="#cc785c" /></div>
                  </div>
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Primary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bctxt" value="#f0ece0" /><input class="alr-lc-hex" id="alr-lc-bhtxt" value="#f0ece0" /></div>
                  </div>
                </div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Secondary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcmut" value="#b0ac9f" /><input class="alr-lc-hex" id="alr-lc-bhmut" value="#b0ac9f" /></div>
                  </div>
                </div>
              </div>

            </div>

            <div class="alr-lc-right">
              <div class="alr-lc-tabs">
                <button class="alr-lc-tab alr-lc-tab-active" id="alr-lc-tab-front">Front</button>
                <button class="alr-lc-tab" id="alr-lc-tab-back">Back</button>
                <button class="alr-lc-tab" id="alr-lc-tab-fold">Fold Sheet</button>
              </div>
              <div class="alr-lc-preview" id="alr-lc-preview"></div>
              <div class="alr-lc-actions">
                <button class="alr-lc-btn-primary" id="alr-lc-dl-front">Download Front</button>
                <button class="alr-lc-btn-ghost" id="alr-lc-dl-back">Download Back</button>
                <button class="alr-lc-btn-ghost" id="alr-lc-dl-fold">Download Fold</button>
                <span class="alr-lc-status" id="alr-lc-status">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
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
      ` }} />

      <style dangerouslySetInnerHTML={{ __html: `
        .alr-lc{max-width:100%}
        .alr-lc-banner{background:#181714;border-bottom:0.5px solid #26251f;padding:28px 32px 24px;margin:-28px -32px 0;display:flex;align-items:flex-end;justify-content:space-between;gap:20px;position:relative;overflow:hidden}
        .alr-lc-banner::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:#a85c42;border-radius:0}
        .alr-lc-banner-inner{display:flex;flex-direction:column;gap:6px}
        .alr-lc-banner-title{font-size:26px;font-weight:500;color:#f0ece0;line-height:1.15;letter-spacing:-0.3px}
        .alr-lc-banner-sub{font-size:12px;color:#555048;line-height:1.7;max-width:480px}
        .alr-lc-banner-meta{display:flex;flex-direction:column;gap:4px;align-items:flex-end;flex-shrink:0}
        .alr-lc-banner-meta-item{font-size:9px;color:#3a3830;letter-spacing:0.14em;font-family:var(--codeFont),monospace}
        .alr-lc-wrap{border:1px solid var(--lightgray);border-radius:6px;overflow:hidden;font-family:var(--codeFont),'Courier New',monospace;margin-top:24px}
        .alr-lc-wrap{border:1px solid var(--lightgray);border-radius:6px;overflow:hidden;font-family:var(--codeFont),'Courier New',monospace}
        .alr-lc-topbar{background:var(--lightgray);padding:10px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--lightgray)}
        .alr-lc-topbar-title{font-size:11px;font-weight:700;color:#cc785c;letter-spacing:2.5px}
        .alr-lc-topbar-sub{font-size:10px;color:var(--gray);letter-spacing:1px;margin-left:auto}
        .alr-lc-body{display:grid;grid-template-columns:300px 1fr;min-height:560px}
        .alr-lc-left{border-right:1px solid var(--lightgray);padding:16px;display:flex;flex-direction:column;gap:8px;overflow-y:auto;max-height:640px}
        .alr-lc-right{display:flex;flex-direction:column}
        .alr-lc-section-label{font-size:9px;color:#cc785c;letter-spacing:2px;text-transform:uppercase}
        .alr-lc-rule{height:1px;background:var(--lightgray);margin:2px 0}
        .alr-lc-field{display:flex;flex-direction:column;gap:3px}
        .alr-lc-label{font-size:9px;color:var(--gray);letter-spacing:1.5px;text-transform:uppercase}
        .alr-lc-req{color:#cc785c}
        .alr-lc-input{background:var(--light);border:1px solid var(--lightgray);color:var(--dark);font-family:var(--codeFont),'Courier New',monospace;font-size:11px;padding:6px 8px;border-radius:3px;width:100%;outline:none;box-sizing:border-box}
        .alr-lc-input:focus{border-color:#cc785c}
        .alr-lc-two{display:grid;grid-template-columns:1fr 1fr;gap:6px}
        .alr-lc-color-row{display:flex;flex-direction:column;gap:8px}
        .alr-lc-color-wrap{display:flex;align-items:center;gap:5px;background:var(--light);border:1px solid var(--lightgray);border-radius:3px;padding:3px 6px}
        .alr-lc-color-wrap input[type="color"]{width:20px;height:20px;border:none;background:none;cursor:pointer;padding:0}
        .alr-lc-hex{font-size:10px;color:var(--dark);font-family:var(--codeFont),monospace;background:none;border:none;outline:none;width:58px}
        .alr-lc-preset-row{display:flex;gap:6px}
        .alr-lc-preset-btn{flex:1;font-family:var(--codeFont),monospace;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:7px 0;border-radius:3px;cursor:pointer;border:1px solid var(--lightgray);background:transparent;color:var(--gray);transition:all .15s}
        .alr-lc-preset-btn:hover{border-color:#cc785c;color:#cc785c}
        .alr-lc-preset-active{border-color:#cc785c!important;color:#cc785c!important;background:rgba(204,120,92,.08)!important}
        .alr-lc-tabs{display:flex;border-bottom:1px solid var(--lightgray)}
        .alr-lc-tab{font-family:var(--codeFont),monospace;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:8px 14px;cursor:pointer;color:var(--gray);background:none;border:none;border-bottom:2px solid transparent;transition:all .15s}
        .alr-lc-tab:hover{color:var(--dark)}
        .alr-lc-tab-active{color:#cc785c!important;border-bottom-color:#cc785c!important}
        .alr-lc-preview{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:20px;background:var(--lightgray);min-height:180px}
        .alr-lc-plabel{font-size:9px;color:var(--gray);letter-spacing:2px;text-transform:uppercase;align-self:flex-start}
        .alr-lc-svgwrap{width:100%;max-width:520px;border:1px solid var(--lightgray);border-radius:3px;overflow:hidden;background:#2a2824}
        .alr-lc-svgwrap svg{width:100%;height:auto;display:block}
        .alr-lc-foldline{width:100%;max-width:520px;display:flex;align-items:center;gap:8px;font-size:9px;color:var(--gray);letter-spacing:1.5px}
        .alr-lc-foldline-dash{flex:1;border-top:1px dashed var(--gray)}
        .alr-lc-actions{border-top:1px solid var(--lightgray);padding:10px 16px;display:flex;gap:8px;align-items:center;background:var(--lightgray);flex-wrap:wrap}
        .alr-lc-btn-primary{font-family:var(--codeFont),monospace;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:7px 12px;border-radius:3px;cursor:pointer;background:#cc785c;border:1px solid #cc785c;color:#fff;transition:all .15s}
        .alr-lc-btn-primary:hover{background:#b86848;border-color:#b86848}
        .alr-lc-btn-ghost{font-family:var(--codeFont),monospace;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:7px 12px;border-radius:3px;cursor:pointer;background:transparent;border:1px solid var(--lightgray);color:var(--gray);transition:all .15s}
        .alr-lc-btn-ghost:hover{border-color:#cc785c;color:#cc785c}
        .alr-lc-status{font-size:9px;color:#cc785c;letter-spacing:1px;margin-left:auto}
        #alr-lc-colours-front,#alr-lc-colours-back{display:flex;flex-direction:column;gap:8px}
        .alr-lc-cert-row{display:flex;gap:6px;align-items:center}
        .alr-lc-cert-row .alr-lc-input{flex:1}
        .alr-lc-cert-gen{flex-shrink:0;width:28px;height:28px;border-radius:3px;border:1px solid var(--lightgray);background:transparent;color:var(--gray);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .15s;padding:0}
        .alr-lc-cert-gen:hover{border-color:#cc785c;color:#cc785c}
        @media(max-width:700px){.alr-lc-body{grid-template-columns:1fr}.alr-lc-left{border-right:none;border-bottom:1px solid var(--lightgray);max-height:none}}
      ` }} />

    </div>
  )
}

ALRLabelCreator.displayName = "ALRLabelCreator"
export default (() => ALRLabelCreator) satisfies QuartzComponentConstructor
