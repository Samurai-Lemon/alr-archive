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
  // The site's own colours (custom.scss --alr-* tokens): zone is the grade panel.
  var PRESETS = {
    dark:  { body:'#1a1917', zone:'#cc785c', acc:'#cc785c', txt:'#ede8de', mut:'#9a9488' },
    light: { body:'#fffdf8', zone:'#a85c42', acc:'#a85c42', txt:'#1f1b17', mut:'#6b6258' }
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
      gl: val('alr-lc-gl') || 'GEM MINT',
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

  // ── Colour helpers: the label works out its side panel, rules and grade-panel text from the
  //    five picked colours, so any custom colours still give a readable label. ──
  function rgb(hex) {
    var n = parseInt(String(hex || '#000000').slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function hex(c) {
    return '#' + c.map(function(x) { return Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0'); }).join('');
  }
  function mix(a, b, t) {
    var x = rgb(a), y = rgb(b);
    return hex([x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t]);
  }
  function lum(h) {
    var c = rgb(h).map(function(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function contrast(a, b) {
    var la = lum(a), lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }
  function onColour(bg) {
    return contrast(bg, '#1a120d') >= contrast(bg, '#ffffff') ? '#1a120d' : '#ffffff';
  }
  function derive(v) {
    var dark = lum(v.body) < 0.4;
    return {
      side: dark ? mix(v.body, '#000000', 0.32) : mix(v.body, '#000000', 0.06),
      line: mix(v.body, v.txt, 0.13),
      border: mix(v.body, v.txt, 0.2),
      mut: mix(v.mut, v.txt, 0.35),
      acct: dark ? mix(v.acc, '#ffffff', 0.25) : mix(v.acc, '#000000', 0.1),
      gtxt: onColour(v.zone || v.acc)
    };
  }

  var SANS = "Inter, 'Helvetica Neue', Arial, sans-serif";
  var MONO = "'JetBrains Mono', 'Courier New', monospace";
  var LOGO = 'M 531.0 468.5 L 384.0 467.5 L 283.0 400.5 L 271.0 403.5 L 184.0 463.5 L 172.0 468.5 L 26.0 468.5 L 14.5 461.0 L 11.5 454.0 L 14.5 439.0 L 250.5 39.0 L 269.0 13.5 L 285.0 11.5 L 298.5 24.0 L 542.5 438.0 L 545.5 446.0 L 544.5 458.0 L 531.0 468.5 Z M 448.5 429.0 L 480.0 428.5 L 484.5 425.0 L 484.5 419.0 L 287.5 85.0 L 282.0 78.5 L 276.0 78.5 L 77.5 411.0 L 73.5 425.0 L 78.0 428.5 L 96.0 429.5 L 159.0 428.5 L 237.5 376.0 L 237.5 371.0 L 232.0 365.5 L 175.0 328.5 L 170.5 324.0 L 169.5 317.0 L 262.5 155.0 L 271.0 145.5 L 283.0 143.5 L 293.5 151.0 L 389.5 316.0 L 388.5 323.0 L 382.0 329.5 L 325.0 366.5 L 321.5 370.0 L 322.5 377.0 L 395.0 426.5 L 409.0 429.5 L 448.5 429.0 Z M 283.5 345.0 L 332.0 311.5 L 335.5 303.0 L 284.5 217.0 L 276.0 215.5 L 222.5 308.0 L 274.0 344.5 L 283.5 345.0 Z';
  var SCALE = [['10','GEM MINT'],['9','MINT'],['8','NM-MT'],['7','NEAR MINT'],['6','EX-MT'],['5','EXCELLENT'],['4','VG-EX'],['3','VERY GOOD'],['2','GOOD'],['1','POOR']];

  // Inline style, not a fill attribute: the site's base styles set a fill on every <text>.
  function t(x, y, size, fill, text, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" font-family="' + (o.mono ? MONO : SANS) + '" font-size="' + size + '"'
      + (o.weight ? ' font-weight="' + o.weight + '"' : '')
      + (o.ls ? ' letter-spacing="' + o.ls + '"' : '')
      + (o.anchor ? ' text-anchor="' + o.anchor + '"' : '')
      + (o.op ? ' opacity="' + o.op + '"' : '')
      + ' style="fill:' + fill + '">' + esc(text) + '</text>';
  }
  function logo(x, y, s, fill) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')"><path d="' + LOGO + '" fill="' + fill + '" fill-rule="evenodd"/></g>';
  }
  // A barcode drawn from the cert number's digits, so each cert gets its own.
  function barcode(seed, x, y, w, h, fill) {
    var d = String(seed).split('').filter(function(c) { return c >= '0' && c <= '9'; }).map(Number);
    if (!d.length) d = [1, 2, 7];
    var out = '', cx = x, k = 0;
    while (cx < x + w) {
      var bw = 2 + (d[k % d.length] + k) % 3, gap = 2 + (d[(k + 2) % d.length] * 3 + k) % 2;
      if (cx + bw > x + w) break;
      out += '<rect x="' + cx + '" y="' + y + '" width="' + bw + '" height="' + h + '" fill="' + fill + '"/>';
      cx += bw + gap; k++;
    }
    return out;
  }
  // The site's signal bars on the grade panel: four for 9 and up, down to one.
  function sigbars(x, y, grade, on, bg) {
    var gn = parseFloat(grade), n = isNaN(gn) ? 2 : gn >= 9 ? 4 : gn >= 7 ? 3 : gn >= 5 ? 2 : 1, out = '';
    for (var k = 0; k < 4; k++) {
      var h = 5 + k * 4;
      out += '<rect x="' + (x + k * 8) + '" y="' + (y - h) + '" width="5" height="' + h + '" rx="1" fill="' + (k < n ? on : mix(on, bg, 0.7)) + '"/>';
    }
    return out;
  }
  function nameLines(name) {
    var words = String(name).split(' '), lines = [], cur = '';
    words.forEach(function(w) {
      if (cur && (cur.length + w.length + 1) > 24) { lines.push(cur); cur = w; } else { cur = cur ? cur + ' ' + w : w; }
    });
    lines.push(cur);
    return lines.slice(0, 2);
  }
  // ── Label size. Sized for the 2.68 × 0.79 in label slot of the acrylic slabs in use, with
  //    a little room to slide in. Change these two numbers to fit a different slab. ──
  var LABEL_W_IN = 2.65, LABEL_H_IN = 0.78;
  var VH = 200, VW = Math.round(VH * LABEL_W_IN / LABEL_H_IN * 100) / 100;   // drawing units
  var UPI = VH / LABEL_H_IN;                                                  // units per inch
  var GX = VW - 152, GC = VW - 76;                                            // grade panel x, centre
  function inch(n) { return (Math.round(n * 1000) / 1000) + ' in'; }
  var SIZE_TXT = LABEL_W_IN + ' × ' + LABEL_H_IN + ' IN';

  function clipOpen(id) {
    return '<defs><clipPath id="' + id + '"><rect width="' + VW + '" height="200"/></clipPath></defs><g clip-path="url(#' + id + ')">';
  }
  function frameRect(d) {
    return '</g><rect x="1" y="1" width="' + (VW - 2) + '" height="198" fill="none" stroke="' + d.border + '" stroke-width="2"/>';
  }
  function sidePanel(v, d) {
    return '<rect width="150" height="200" fill="' + d.side + '"/>'
      + logo(46, 30, 0.105, v.acc)
      + t(75, 120, 14, v.txt, 'ALR INITIATIVE', { anchor: 'middle', weight: 700, ls: 0.4 })
      + t(75, 140, 15, d.acct, 'GRADING', { anchor: 'middle', weight: 600, ls: 2 })
      + '<line x1="150" y1="0" x2="150" y2="200" stroke="' + d.line + '" stroke-width="2"/>';
  }

  function frontInner(v) {
    var d = derive(v), id = 'lf' + Math.random().toString(36).slice(2);
    var room = GX - 172 - 20;   // width available for the card name
    var lines = nameLines(v.name), dy = lines.length > 1 ? 6 : 0, nameSvg;
    if (lines.length > 1) {
      nameSvg = t(172, 30, 22, v.txt, lines[0], { weight: 700 }) + t(172, 54, 22, v.txt, lines[1], { weight: 700 });
    } else {
      var size = Math.max(22, Math.min(36, Math.floor(room / Math.max(1, v.name.length * 0.62))));
      nameSvg = t(172, 48, size, v.txt, v.name, { weight: 700, ls: -0.3 });
    }
    var g = String(v.grade), gl = String(v.gl);
    return clipOpen(id)
      + '<rect width="' + VW + '" height="200" fill="' + v.body + '"/>'
      + sidePanel(v, d)
      + t(75, 180, 14, d.mut, 'CYCLE 7', { anchor: 'middle', weight: 600, ls: 1 })
      + nameSvg
      + t(172, 78 + dy, 17, d.mut, v.set, { weight: 500 })
      + t(172, 102 + dy, 19, d.acct, v.variant, { weight: 600 })
      + '<line x1="172" y1="122" x2="' + (GX - 22) + '" y2="122" stroke="' + d.line + '" stroke-width="2"/>'
      + t(172, 150, 15, d.mut, 'TRADING CARD · ENGLISH', { weight: 600, ls: 0.4 })
      + t(172, 178, 18, v.txt, 'CERT ' + v.cert, { mono: true })
      + barcode(v.cert, GX - 22 - 104, 138, 104, 44, v.txt)
      + '<rect x="' + GX + '" y="0" width="152" height="200" fill="' + v.zone + '"/>'
      + t(GC, 27, 14, d.gtxt, 'ARCHIVE GRADE', { anchor: 'middle', weight: 700, ls: 0.4 })
      + sigbars(GC - 14, 52, g, d.gtxt, v.zone)
      + t(GC, 138, g.length < 3 ? 86 : 66, d.gtxt, g, { anchor: 'middle', weight: 700, ls: -3 })
      + t(GC, 178, Math.max(14, Math.min(19, Math.floor(136 / Math.max(1, gl.length * 0.68)))), d.gtxt, gl, { anchor: 'middle', weight: 700, ls: 0.8 })
      + frameRect(d);
  }

  // The back: the grading scale with this card's grade lit, and the cert number and barcode again.
  function backInner(v) {
    var d = derive(v), f = getF(), id = 'lb' + Math.random().toString(36).slice(2);
    var gn = Math.floor(parseFloat(f.grade)), lit = isNaN(gn) ? 10 : Math.max(1, Math.min(10, gn));
    var gtxt = onColour(v.acc), boxes = '', litX = 170, step = Math.min(35, (GX - 170 - 12) / 10), bw = step - 4;
    SCALE.forEach(function(s, k) {
      var x = 170 + k * step, on = Number(s[0]) === lit;
      if (on) litX = x;
      boxes += '<rect x="' + x + '" y="70" width="' + bw + '" height="38" rx="6" fill="' + (on ? v.acc : 'none') + '" stroke="' + (on ? v.acc : d.border) + '" stroke-width="2"/>'
        + t(x + bw / 2, 96, 18, on ? gtxt : d.mut, s[0], { anchor: 'middle', weight: 700 });
    });
    return clipOpen(id)
      + '<rect width="' + VW + '" height="200" fill="' + v.body + '"/>'
      + sidePanel(v, d)
      + t(170, 46, 15, d.mut, 'ARCHIVED · GRADED · CERTIFIED', { weight: 600, ls: 0.6 })
      + boxes
      + t(litX, 138, 17, d.acct, '▲ ' + f.gl, { weight: 700, ls: 0.6 })
      + '<line x1="' + GX + '" y1="0" x2="' + GX + '" y2="200" stroke="' + d.line + '" stroke-width="2"/>'
      + t(GC, 36, 14, d.mut, 'CERT NO.', { anchor: 'middle', weight: 700, ls: 1 })
      + t(GC, 60, Math.max(13, Math.min(18, Math.floor(130 / Math.max(1, f.cert.length * 0.6)))), v.txt, f.cert, { anchor: 'middle', mono: true })
      + barcode(f.cert, GX + 20, 76, 112, 100, v.txt)
      + frameRect(d);
  }

  // Width and height are written in inches, so the file opens at the label's real size.
  function svgOpen(win, hin, vb) {
    return '<svg width="' + win + 'in" height="' + hin + 'in" viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" style="color:unset">';
  }
  function buildFront(v, fonts) {
    return svgOpen(LABEL_W_IN, LABEL_H_IN, '0 0 ' + VW + ' 200') + (fonts || '') + frontInner(v) + '</svg>';
  }
  function buildBack(v, fonts) {
    return svgOpen(LABEL_W_IN, LABEL_H_IN, '0 0 ' + VW + ' 200') + (fonts || '') + backInner(v) + '</svg>';
  }

  // Front, fold line, then the back upside down, with crop marks around the strip.
  var FOLD_M = 80, FOLD_H = 406;
  var FOLD_W_IN = Math.round((VW + 2 * FOLD_M) / UPI * 1000) / 1000, FOLD_H_IN = Math.round((FOLD_H + 2 * FOLD_M) / UPI * 1000) / 1000;
  function buildFold(vf, vb, fonts) {
    var W = VW, H = FOLD_H, m = FOLD_M;
    function ln(x1, y1, x2, y2) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>'; }
    return svgOpen(FOLD_W_IN, FOLD_H_IN, (-m) + ' ' + (-m) + ' ' + (W + 2 * m) + ' ' + (H + 2 * m))
      + (fonts || '')
      + '<g><svg width="' + W + '" height="200" viewBox="0 0 ' + W + ' 200" style="color:unset">' + frontInner(vf) + '</svg></g>'
      + '<g transform="translate(' + W + ',' + H + ') rotate(180)"><svg width="' + W + '" height="200" viewBox="0 0 ' + W + ' 200" style="color:unset">' + backInner(vb) + '</svg></g>'
      + '<line x1="-30" y1="203" x2="' + (W + 30) + '" y2="203" stroke="#888" stroke-width="0.7" stroke-dasharray="8,6"/>'
      + '<g stroke="#000" stroke-width="0.7" fill="none" stroke-linecap="square">'
      + ln(-70, 0, -20, 0) + ln(0, -70, 0, -20) + ln(W + 20, 0, W + 70, 0) + ln(W, -70, W, -20)
      + ln(-70, H, -20, H) + ln(0, H + 20, 0, H + 70) + ln(W + 20, H, W + 70, H) + ln(W, H + 20, W, H + 70)
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

  function saveBlob(blob, fn) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = fn;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 2000);
  }


  // ── Cricut export. Design Space ignores a PNG's DPI (it counts 72 pixels per inch) and can't
  //    use text inside an SVG, so this makes a vector SVG with every letter turned into a shape,
  //    sized in px at 72 per inch: it lands at true size and stays sharp. ──
  var OT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/opentype.js/1.3.4/opentype.min.js';
  var otReady = null;
  function loadOutliner() {
    if (otReady) return otReady;
    otReady = new Promise(function(resolve, reject) {
      if (window.opentype) { resolve(); return; }
      var sc = document.createElement('script');
      sc.src = OT_URL; sc.async = true;
      sc.onload = function() { resolve(); };
      sc.onerror = function() { otReady = null; reject(new Error('opentype')); };
      document.head.appendChild(sc);
    }).then(function() {
      function load(u) { return fetch(u).then(function(r) { if (!r.ok) throw new Error('font'); return r.arrayBuffer(); }).then(function(b) { return window.opentype.parse(b); }); }
      return Promise.all([load('/static/fonts/inter-500.ttf'), load('/static/fonts/inter-600.ttf'), load('/static/fonts/inter-700.ttf'), load('/static/fonts/jetbrains-mono-400.ttf')]);
    }).then(function(f) { return { 500: f[0], 600: f[1], 700: f[2], mono: f[3] }; });
    otReady.catch(function() { otReady = null; });
    return otReady;
  }
  var SVGNS = 'http://www.w3.org/2000/svg';
  function r3(n) { return Math.round(n * 1000) / 1000; }
  // 2D matrices as [a, b, c, d, e, f]
  function mmul(m, n) {
    return [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
      m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];
  }
  function parseTf(str) {
    var m = [1, 0, 0, 1, 0, 0], re = /(\\w+)\\s*\\(([^)]*)\\)/g, x;
    while ((x = re.exec(str || ''))) {
      var a = x[2].split(/[\\s,]+/).filter(Boolean).map(Number), n;
      if (x[1] === 'translate') n = [1, 0, 0, 1, a[0], a[1] || 0];
      else if (x[1] === 'scale') n = [a[0], 0, 0, a.length > 1 ? a[1] : a[0], 0, 0];
      else if (x[1] === 'rotate') {
        var r = a[0] * Math.PI / 180, co = Math.cos(r), si = Math.sin(r);
        n = [co, si, -si, co, 0, 0];
        if (a.length > 2) n = mmul(mmul([1, 0, 0, 1, a[1], a[2]], n), [1, 0, 0, 1, -a[1], -a[2]]);
      } else if (x[1] === 'matrix') n = a;
      else continue;
      m = mmul(m, n);
    }
    return m;
  }
  function pt(m, x, y) { return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]; }
  // Rewrites path data through matrix m (absolute output).
  function tfPath(d, m) {
    var tk = d.match(/[MLHVCSQTAZmlhvcsqtaz]|-?(?:\\d*\\.\\d+|\\d+\\.?)(?:[eE][-+]?\\d+)?/g) || [];
    var i = 0, cmd = '', cx = 0, cy = 0, sx = 0, sy = 0, out = [];
    var det = m[0] * m[3] - m[1] * m[2], sc = Math.sqrt(Math.abs(det)), rot = Math.atan2(m[1], m[0]) * 180 / Math.PI;
    function num() { return Number(tk[i++]); }
    function P(x, y) { var q = pt(m, x, y); return r3(q[0]) + ' ' + r3(q[1]); }
    while (i < tk.length) {
      if (/[A-Za-z]/.test(tk[i])) cmd = tk[i++];
      var rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase(), ox = rel ? cx : 0, oy = rel ? cy : 0;
      if (C === 'Z') { out.push('Z'); cx = sx; cy = sy; continue; }
      if (C === 'M' || C === 'L' || C === 'T') {
        var x = num() + ox, y = num() + oy;
        out.push((C === 'T' ? 'T' : C === 'M' && out.length && out[out.length - 1][0] === 'M' ? 'L' : C) + P(x, y));
        if (C === 'M') { sx = x; sy = y; cmd = rel ? 'l' : 'L'; }
        cx = x; cy = y;
      } else if (C === 'H') { cx = num() + (rel ? cx : 0); out.push('L' + P(cx, cy)); }
      else if (C === 'V') { cy = num() + (rel ? cy : 0); out.push('L' + P(cx, cy)); }
      else if (C === 'C') {
        var c = [num() + ox, num() + oy, num() + ox, num() + oy, num() + ox, num() + oy];
        out.push('C' + P(c[0], c[1]) + ' ' + P(c[2], c[3]) + ' ' + P(c[4], c[5])); cx = c[4]; cy = c[5];
      } else if (C === 'S' || C === 'Q') {
        var q = [num() + ox, num() + oy, num() + ox, num() + oy];
        out.push(C + P(q[0], q[1]) + ' ' + P(q[2], q[3])); cx = q[2]; cy = q[3];
      } else if (C === 'A') {
        var rx = num(), ry = num(), xr = num(), la = num(), sw = num(), ax = num() + ox, ay = num() + oy;
        out.push('A' + r3(rx * sc) + ' ' + r3(ry * sc) + ' ' + r3(xr + rot) + ' ' + la + ' ' + (det < 0 ? 1 - sw : sw) + ' ' + P(ax, ay));
        cx = ax; cy = ay;
      } else i++;
    }
    return out.join('');
  }
  function rectD(x, y, w, h, rx) {
    rx = Math.min(rx || 0, w / 2, h / 2);
    if (!rx) return 'M' + x + ' ' + y + 'L' + (x + w) + ' ' + y + 'L' + (x + w) + ' ' + (y + h) + 'L' + x + ' ' + (y + h) + 'Z';
    var a = 'A' + rx + ' ' + rx + ' 0 0 1 ';
    return 'M' + (x + rx) + ' ' + y + 'L' + (x + w - rx) + ' ' + y + a + (x + w) + ' ' + (y + rx)
      + 'L' + (x + w) + ' ' + (y + h - rx) + a + (x + w - rx) + ' ' + (y + h)
      + 'L' + (x + rx) + ' ' + (y + h) + a + x + ' ' + (y + h - rx)
      + 'L' + x + ' ' + (y + rx) + a + (x + rx) + ' ' + y + 'Z';
  }
  // A stroked line as filled quads (dashes and square caps included).
  function lineD(x1, y1, x2, y2, w, cap, dash) {
    var len = Math.hypot(x2 - x1, y2 - y1); if (!len) return '';
    var ux = (x2 - x1) / len, uy = (y2 - y1) / len, nx = -uy * w / 2, ny = ux * w / 2, ext = cap === 'square' ? w / 2 : 0;
    var segs = [], da = (dash || '').split(/[\\s,]+/).filter(Boolean).map(Number);
    if (da.length) { var s0 = 0, on = true, j = 0; while (s0 < len) { var e = Math.min(len, s0 + da[j % da.length]); if (on) segs.push([s0, e]); s0 = e; on = !on; j++; } }
    else segs.push([0, len]);
    return segs.map(function(sg) {
      var a = sg[0] - ext, b = sg[1] + ext, ax = x1 + ux * a, ay = y1 + uy * a, bx = x1 + ux * b, by = y1 + uy * b;
      return 'M' + (ax + nx) + ' ' + (ay + ny) + 'L' + (bx + nx) + ' ' + (by + ny) + 'L' + (bx - nx) + ' ' + (by - ny) + 'L' + (ax - nx) + ' ' + (ay - ny) + 'Z';
    }).join('');
  }
  function flatShapes(root, k) {
    var list = [];
    function inh(el, name) {
      for (var e = el; e && e !== root.parentNode; e = e.parentNode) {
        if (e.getAttribute) { var v = e.getAttribute(name); if (v !== null) return v; }
      }
      return null;
    }
    Array.prototype.slice.call(root.querySelectorAll('path,rect,line')).forEach(function(el) {
      if (el.closest('defs,clipPath')) return;
      var m = [k, 0, 0, k, 0, 0], chain = [];
      for (var e = el; e && e !== root; e = e.parentNode) chain.unshift(e);
      chain.forEach(function(e) { if (e.getAttribute('transform')) m = mmul(m, parseTf(e.getAttribute('transform'))); });
      var fill = inh(el, 'fill'), stroke = inh(el, 'stroke'), sw = Number(inh(el, 'stroke-width') || 1);
      function A(n) { return Number(el.getAttribute(n) || 0); }
      var tag = el.tagName.toLowerCase();
      if (tag === 'line') {
        if (stroke && stroke !== 'none') list.push({ fill: stroke, d: tfPath(lineD(A('x1'), A('y1'), A('x2'), A('y2'), sw, inh(el, 'stroke-linecap'), inh(el, 'stroke-dasharray')), m) });
        return;
      }
      if (tag === 'rect') {
        var x = A('x'), y = A('y'), w = A('width'), h = A('height');
        if (fill !== 'none') list.push({ fill: fill || '#000', d: tfPath(rectD(x, y, w, h, A('rx')), m) });
        if (stroke && stroke !== 'none') {
          var o = sw / 2, rx = A('rx');
          if (rx) list.push({ fill: stroke, rule: 'evenodd', d: tfPath(rectD(x - o, y - o, w + sw, h + sw, rx + o) + rectD(x + o, y + o, w - sw, h - sw, Math.max(0, rx - o)), m) });
          else list.push({ fill: stroke, d: tfPath(rectD(x - o, y - o, w + sw, sw) + rectD(x - o, y + h - o, w + sw, sw) + rectD(x - o, y + o, sw, h - sw) + rectD(x + w - o, y + o, sw, h - sw), m) });
        }
        return;
      }
      if (fill !== 'none') list.push({ fill: fill || '#000', rule: el.getAttribute('fill-rule') === 'evenodd' ? 'evenodd' : '', d: tfPath(el.getAttribute('d') || '', m) });
    });
    var out = [];
    list.forEach(function(sh) {
      var last = out[out.length - 1];
      if (last && !last.rule && !sh.rule && last.fill.toLowerCase() === sh.fill.toLowerCase()) last.d += sh.d;
      else out.push({ fill: sh.fill, rule: sh.rule, d: sh.d });
    });
    return out.filter(function(sh) { return sh.d; });
  }

  function cricutSvg(svg, win, hin, fonts) {
    var doc = new DOMParser().parseFromString(svg, 'image/svg+xml'), root = doc.documentElement;
    // no embedded fonts or styles: Design Space doesn't read them
    Array.prototype.slice.call(root.querySelectorAll('style')).forEach(function(st) { st.parentNode.removeChild(st); });
    // nested <svg> blocks (fold sheet) become plain groups
    Array.prototype.slice.call(root.querySelectorAll('svg')).forEach(function(inner) {
      var grp = doc.createElementNS(SVGNS, 'g');
      while (inner.firstChild) grp.appendChild(inner.firstChild);
      inner.parentNode.replaceChild(grp, inner);
    });
    // every letter becomes a filled path
    Array.prototype.slice.call(root.querySelectorAll('text')).forEach(function(tx) {
      var fam = tx.getAttribute('font-family') || '', w = Number(tx.getAttribute('font-weight') || 500);
      var font = fam.indexOf('Mono') > -1 ? fonts.mono : (fonts[w] || fonts[w >= 650 ? 700 : w >= 550 ? 600 : 500]);
      var size = Number(tx.getAttribute('font-size')), ls = Number(tx.getAttribute('letter-spacing') || 0);
      var str = tx.textContent, x = Number(tx.getAttribute('x')), y = Number(tx.getAttribute('y'));
      var opts = { kerning: true, letterSpacing: ls / size };
      var anchor = tx.getAttribute('text-anchor');
      if (anchor === 'middle' || anchor === 'end') {
        var adv = font.getAdvanceWidth(str, size, opts);
        x -= anchor === 'middle' ? adv / 2 : adv;
      }
      var p = doc.createElementNS(SVGNS, 'path');
      p.setAttribute('d', font.getPath(str, x, y, size, opts).toPathData(2));
      p.setAttribute('fill', (tx.getAttribute('style') || '').replace('fill:', '').trim() || '#000');
      tx.parentNode.replaceChild(p, tx);
    });
    // Design Space sizes an SVG from its drawing units at 72 per inch (it ignores width/height),
    // and it keeps every <g> as a subgroup it won't flatten. So the drawing is pre-flattened:
    // every shape becomes a filled path with its transforms baked in, at 72 units per inch,
    // side by side in one layer list. Neighbouring shapes of the same colour are merged.
    var vb = (root.getAttribute('viewBox') || '0 0 1 1').split(/[ ,]+/).map(Number);
    var k = (win * 72) / vb[2];
    var shapes = flatShapes(root, k);
    while (root.firstChild) root.removeChild(root.firstChild);
    shapes.forEach(function(sh) {
      var p = doc.createElementNS(SVGNS, 'path');
      p.setAttribute('d', sh.d);
      p.setAttribute('fill', sh.fill);
      if (sh.rule) p.setAttribute('fill-rule', sh.rule);
      root.appendChild(p);
    });
    root.setAttribute('viewBox', [vb[0] * k, vb[1] * k, vb[2] * k, vb[3] * k].map(r3).join(' '));
    root.setAttribute('width', String(r3(vb[2] * k)));
    root.setAttribute('height', String(r3(vb[3] * k)));
    root.removeAttribute('style');
    return '<?xml version="1.0" encoding="UTF-8"?>' + new XMLSerializer().serializeToString(root);
  }

  // One download: a vector SVG with text as shapes, transparent background, and drawing units
  // at 72 per inch so Cricut Design Space opens it at the label's real size.
  function download(which) {
    var s = g('alr-lc-status');
    if (s) s.textContent = 'Preparing…';
    loadOutliner().then(function(otf) {
      var vf = getF(), vb = getB(), svg, base, win = LABEL_W_IN, hin = LABEL_H_IN;
      if (which === 'front') { svg = buildFront(vf); base = 'alr_label_front'; }
      else if (which === 'back') { svg = buildBack(vb); base = 'alr_label_back'; }
      else { svg = buildFold(vf, vb); base = 'alr_label_foldcut'; win = FOLD_W_IN; hin = FOLD_H_IN; }
      saveBlob(new Blob([cricutSvg(svg, win, hin, otf)], { type: 'image/svg+xml' }), base + '.svg');
      if (s) s.textContent = 'Downloaded SVG · ' + inch(win) + ' × ' + inch(hin);
    }).catch(function() { if (s) s.textContent = 'Could not make the file. Try again.'; });
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
