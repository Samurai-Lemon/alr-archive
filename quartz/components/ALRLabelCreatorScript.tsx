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
  // The site's own colours (custom.scss --alr-* tokens). Panels 1-3 run left to right:
  // front = logo, card info, grade; back = logo, grade scale, cert.
  var PRESETS = {
    dark:  { front: { txt:'#ede8de', mut:'#b7b1a6', acc:'#cc785c', p1:'#121110', p2:'#1a1917', p3:'#121110' },
             back:  { txt:'#ede8de', mut:'#b7b1a6', acc:'#cc785c', sbox:'#44423f', p1:'#121110', p2:'#1a1917', p3:'#1a1917' } },
    light: { front: { txt:'#1f1b17', mut:'#504941', acc:'#a85c42', p1:'#f0eee9', p2:'#fffdf8', p3:'#f0eee9' },
             back:  { txt:'#1f1b17', mut:'#504941', acc:'#a85c42', sbox:'#d2d0cb', p1:'#f0eee9', p2:'#fffdf8', p3:'#fffdf8' } }
  };
  var FRONT_KEYS = ['txt', 'mut', 'acc', 'p1', 'p2', 'p3'];
  var BACK_KEYS = ['txt', 'mut', 'acc', 'sbox', 'p1', 'p2', 'p3'];

  function g(id) { return document.getElementById(id); }
  function val(id) { var el = g(id); return el ? el.value : ''; }

  function getF() {
    return {
      name: val('alr-lc-name') || 'CARD NAME',
      set: val('alr-lc-set') || 'SET - SERIES - EN - YEAR',
      variant: val('alr-lc-variant') || 'VARIANT / EDITION',
      cert: acct.saved ? acct.saved.cert : (val('alr-lc-cert') || '0000-ALR'),
      qr: acct.saved && window.qrcode && window.ALRGraded ? window.ALRGraded.certUrl(acct.saved.cert_no) : null,
      grade: val('alr-lc-grade') || '10',
      gl: val('alr-lc-gl') || 'GEM MINT',
      txt: val('alr-lc-ctxt'), mut: val('alr-lc-cmut'), acc: val('alr-lc-cacc'),
      p1: val('alr-lc-cp1'), p2: val('alr-lc-cp2'), p3: val('alr-lc-cp3')
    };
  }

  // Optional report details (not printed on the label).
  function getReport() {
    var c = { centering: val('alr-lc-rcen'), corners: val('alr-lc-rcor'), edges: val('alr-lc-redg'), surface: val('alr-lc-rsur') };
    Object.keys(c).forEach(function(k) { c[k] = String(c[k] || '').trim(); if (!c[k]) delete c[k]; });
    return { date: val('alr-lc-rdate'), condition: c, notes: String(val('alr-lc-rnotes') || '').trim() };
  }

  function getB() {
    return {
      txt: val('alr-lc-bctxt'), mut: val('alr-lc-bcmut'), acc: val('alr-lc-bcacc'),
      sbox: val('alr-lc-bcsbox'),
      p1: val('alr-lc-bcp1'), p2: val('alr-lc-bcp2'), p3: val('alr-lc-bcp3')
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
  // Divider and frame lines, a little lighter (or darker) than the middle panel.
  function derive(v) {
    return { line: mix(v.p2, v.txt, 0.13), border: mix(v.p2, v.txt, 0.2) };
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
  // Faint diagonal lines over one panel (x0 to x1), a shade off that panel's own colour.
  // Each line is cut to the panel (Cricut exports don't use clip paths).
  function texture(bg, ink, x0, x1) {
    var col = mix(bg, ink, 0.06), out = '', y0 = 3, y1 = 197;
    for (var c = x0 - 200; c < x1; c += 9) {
      // the line x = c + (y1 - y), clipped to x0..x1 and y0..y1
      var ya = Math.min(y1, y1 - (x0 - c)), yb = Math.max(y0, y1 - (x1 - c));
      if (ya <= yb) continue;
      out += '<line x1="' + (c + y1 - ya) + '" y1="' + ya + '" x2="' + (c + y1 - yb) + '" y2="' + yb + '" stroke="' + col + '" stroke-width="1.5"/>';
    }
    return out;
  }
  function sidePanel(v, d) {
    return '<rect width="150" height="200" fill="' + v.p1 + '"/>'
      + texture(v.p1, v.txt, 0, 150)
      + logo(36, 38, 0.14, v.acc)
      + t(75, 136, 14, v.txt, 'ALR INITIATIVE', { anchor: 'middle', weight: 700, ls: 0.4 })
      + t(75, 157, 15, v.acc, 'GRADING', { anchor: 'middle', weight: 600, ls: 2 })
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
      + '<rect width="' + VW + '" height="200" fill="' + v.p2 + '"/>'
      + texture(v.p2, v.txt, 150, GX)
      + sidePanel(v, d)
      + nameSvg
      + t(172, 78 + dy, 17, v.mut, v.set, { weight: 500 })
      + t(172, 102 + dy, 19, v.acc, v.variant, { weight: 600 })
      + '<line x1="172" y1="122" x2="' + (GX - 22) + '" y2="122" stroke="' + d.line + '" stroke-width="2"/>'
      + t(172, 150, 15, v.mut, 'TRADING CARD · ENGLISH', { weight: 600, ls: 0.4 })
      + t(172, 178, 18, v.txt, 'CERT ' + v.cert, { mono: true })
      + barcode(v.cert, GX - 22 - 104, 138, 104, 44, v.txt)
      + '<rect x="' + GX + '" y="0" width="152" height="200" fill="' + v.p3 + '"/>'
      + texture(v.p3, v.txt, GX, VW)
      + '<line x1="' + GX + '" y1="0" x2="' + GX + '" y2="200" stroke="' + d.line + '" stroke-width="2"/>'
      + t(GC, 118, g.length < 3 ? 100 : 74, v.acc, g, { anchor: 'middle', weight: 700, ls: -3 })
      + '<rect x="' + (GC - 60) + '" y="142" width="120" height="34" rx="3" fill="none" stroke="' + v.acc + '" stroke-width="2.5"/>'
      + t(GC, 165, Math.max(12, Math.min(17, Math.floor(104 / Math.max(1, gl.length * 0.7)))), v.acc, gl, { anchor: 'middle', weight: 700, ls: 1 })
      + frameRect(d);
  }

  // The back: the grading scale with this card's grade lit, and the cert number and barcode again.
  // The QR on a saved card's back opens its public report page. It sits on its own tile in the
  // lighter of the text/panel colours (scanners need dark modules on a light ground).
  function qrTile(url, v) {
    var m = window.ALRGraded.qrMatrix(url), n = m.length, size = 112, x0 = GC - size / 2, y0 = 74, q = 2, cell = size / (n + 2 * q);
    var light = lum(v.txt) >= lum(v.p3) ? v.txt : v.p3, dark = light === v.txt ? v.p3 : v.txt;
    var out = '<rect x="' + x0 + '" y="' + y0 + '" width="' + size + '" height="' + size + '" rx="4" fill="' + light + '"/>';
    for (var r = 0; r < n; r++) {
      var c = 0;
      while (c < n) {
        if (!m[r][c]) { c++; continue; }
        var st = c; while (c < n && m[r][c]) c++;
        out += '<rect x="' + r3(x0 + (q + st) * cell) + '" y="' + r3(y0 + (q + r) * cell) + '" width="' + r3((c - st) * cell + 0.05) + '" height="' + r3(cell + 0.05) + '" fill="' + dark + '"/>';
      }
    }
    return out;
  }

  function backInner(v, f) {
    f = f || getF();
    var d = derive(v), id = 'lb' + Math.random().toString(36).slice(2);
    var gn = Math.floor(parseFloat(f.grade)), lit = isNaN(gn) ? 10 : Math.max(1, Math.min(10, gn));
    var gtxt = onColour(v.acc), boxes = '', litX = 170, step = Math.min(35, (GX - 170 - 12) / 10), bw = step - 4;
    SCALE.forEach(function(s, k) {
      var x = 170 + k * step, on = Number(s[0]) === lit;
      if (on) litX = x;
      boxes += '<rect x="' + x + '" y="70" width="' + bw + '" height="38" rx="6" fill="' + (on ? v.acc : 'none') + '" stroke="' + (on ? v.acc : v.sbox) + '" stroke-width="2"/>'
        + t(x + bw / 2, 96, 18, on ? gtxt : v.mut, s[0], { anchor: 'middle', weight: 700 });
    });
    return clipOpen(id)
      + '<rect width="' + VW + '" height="200" fill="' + v.p2 + '"/>'
      + texture(v.p2, v.txt, 150, GX)
      + '<rect x="' + GX + '" y="0" width="152" height="200" fill="' + v.p3 + '"/>'
      + texture(v.p3, v.txt, GX, VW)
      + sidePanel(v, d)
      + t(170, 46, 15, v.mut, 'ARCHIVED · GRADED · CERTIFIED', { weight: 600, ls: 0.6 })
      + boxes
      + t(lit === 10 ? litX : litX + bw / 2, 138, 17, v.acc, lit === 10 ? '▲ ' + f.gl : '▲', { anchor: lit === 10 ? null : 'middle', weight: 700, ls: lit === 10 ? 0.6 : 0 })
      + '<line x1="' + GX + '" y1="0" x2="' + GX + '" y2="200" stroke="' + d.line + '" stroke-width="2"/>'
      + t(GC, 36, 14, v.mut, 'CERT NO.', { anchor: 'middle', weight: 700, ls: 1 })
      + t(GC, 60, Math.max(13, Math.min(18, Math.floor(130 / Math.max(1, f.cert.length * 0.6)))), v.txt, f.cert, { anchor: 'middle', mono: true })
      + (f.qr ? qrTile(f.qr, v) : barcode(f.cert, GX + 20, 76, 112, 100, v.txt))
      + frameRect(d);
  }

  // Width and height are written in inches, so the file opens at the label's real size.
  function svgOpen(win, hin, vb) {
    return '<svg width="' + win + 'in" height="' + hin + 'in" viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" style="color:unset">';
  }
  function buildFront(v, fonts) {
    return svgOpen(LABEL_W_IN, LABEL_H_IN, '0 0 ' + VW + ' 200') + (fonts || '') + frontInner(v) + '</svg>';
  }
  function buildBack(v, fonts, f) {
    return svgOpen(LABEL_W_IN, LABEL_H_IN, '0 0 ' + VW + ' 200') + (fonts || '') + backInner(v, f) + '</svg>';
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
      + '<g transform="translate(' + W + ',' + H + ') rotate(180)"><svg width="' + W + '" height="200" viewBox="0 0 ' + W + ' 200" style="color:unset">' + backInner(vb, vf) + '</svg></g>'
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
    a.href = url; a.download = fn; a.rel = 'noopener'; a.style.display = 'none';
    // The site's page router treats any same-site link as a page change and would swallow this
    // click (a blob: URL counts as same-site), so it's told to leave the link alone.
    a.setAttribute('data-router-ignore', '');
    a.addEventListener('click', function(e) { e.stopPropagation(); });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 60000);
  }


  // ── Cricut export. Design Space ignores a PNG's DPI (it counts 72 pixels per inch) and can't
  //    use text inside an SVG, so this makes a vector SVG with every letter turned into a shape,
  //    sized in px at 72 per inch: it lands at true size and stays sharp. ──
  // The ALR Grading desktop app reuses this script; it sets ALR_ASSETS (bundled font and
  // opentype.js locations) and ALR_SAVE (writes the file to the chosen folder).
  var ASSETS = window.ALR_ASSETS || {};
  var OT_URL = ASSETS.opentype || 'https://cdnjs.cloudflare.com/ajax/libs/opentype.js/1.3.4/opentype.min.js';
  var FONT_DIR = ASSETS.fonts || '/static/fonts';
  var otReady = null;
  var otFonts = null;   // set once the outline fonts have loaded
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
      return Promise.all([load(FONT_DIR + '/inter-500.ttf'), load(FONT_DIR + '/inter-600.ttf'), load(FONT_DIR + '/inter-700.ttf'), load(FONT_DIR + '/jetbrains-mono-400.ttf')]);
    }).then(function(f) { otFonts = { 500: f[0], 600: f[1], 700: f[2], mono: f[3] }; return otFonts; });
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
  // The file is built and saved inside the click itself. Safari only honours the file name
  // (and saves instead of opening a tab) while it still counts as the user's click, so the
  // fonts are loaded ahead of time when the page opens.
  function download(which) {
    var s = g('alr-lc-status');
    if (!otFonts) {
      if (s) s.textContent = 'Loading fonts… click again in a moment.';
      loadOutliner().then(function() { if (s) s.textContent = 'Ready'; })
        .catch(function() { if (s) s.textContent = 'Could not load the fonts. Check your connection.'; });
      return;
    }
    try {
      var vf = getF(), vb = getB(), svg, base, win = LABEL_W_IN, hin = LABEL_H_IN;
      if (which === 'front') { svg = buildFront(vf); base = 'alr_label_front'; }
      else if (which === 'back') { svg = buildBack(vb); base = 'alr_label_back'; }
      else { svg = buildFold(vf, vb); base = 'alr_label_foldcut'; win = FOLD_W_IN; hin = FOLD_H_IN; }
      var out = cricutSvg(svg, win, hin, otFonts), size = inch(win) + ' × ' + inch(hin);
      if (typeof window.ALR_SAVE === 'function') {
        if (s) s.textContent = 'Saving…';
        Promise.resolve(window.ALR_SAVE({ side: which === 'fold' ? 'foldcut' : which, name: vf.name, grade: vf.grade, svg: out }))
          .then(function(msg) { if (s) s.textContent = (msg || 'Saved') + ' · ' + size; })
          .catch(function(e) { if (s) s.textContent = 'Could not save: ' + (e && e.message ? e.message : e); });
        return;
      }
      saveBlob(new Blob([out], { type: 'image/svg+xml' }), base + '.svg');
      if (s) s.textContent = 'Downloaded ' + base + '.svg · ' + size;
    } catch (e) { if (s) s.textContent = 'Could not make the file. Try again.'; }
  }

  // ── Grading report (PDF). Built by alr-graded.js; the label goes on it at actual size. ──
  function downloadReport() {
    var s = g('alr-lc-status');
    if (!window.ALRGraded) { if (s) s.textContent = 'Report tools are still loading. Try again in a moment.'; return; }
    var vf = getF(), r = getReport();
    if (s) s.textContent = 'Making the report…';
    labelPng(vf).then(function(png) {
      return window.ALRGraded.reportPdf({
        cert: vf.cert, certNo: acct.saved ? acct.saved.cert_no : null,
        name: vf.name, set: vf.set, variant: vf.variant, grade: vf.grade, gradeLabel: vf.gl,
        date: r.date, condition: r.condition, notes: r.notes, labelPng: png, photo: null
      });
    }).then(function(blob) {
      return window.ALRGraded.saveFile(blob, window.ALRGraded.fileStem(vf.name, vf.grade) + '_report.pdf');
    }).then(function(fn) { if (s) s.textContent = 'Downloaded ' + (fn || 'report') + ' · letter size'; })
      .catch(function() { if (s) s.textContent = 'Could not make the report. Try again.'; });
  }

  // The front label as a 600 DPI PNG (text drawn as shapes, so it looks the same everywhere).
  function labelPng(v) {
    return loadOutliner().then(function(fonts) {
      var svg = cricutSvg(buildFront(v), LABEL_W_IN, LABEL_H_IN, fonts);
      return new Promise(function(resolve, reject) {
        var img = new Image(), url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
        img.onload = function() {
          var c = document.createElement('canvas');
          c.width = Math.round(LABEL_W_IN * 600); c.height = Math.round(LABEL_H_IN * 600);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          URL.revokeObjectURL(url);
          resolve(c.toDataURL('image/png'));
        };
        img.onerror = function() { URL.revokeObjectURL(url); reject(new Error('label')); };
        img.src = url;
      });
    });
  }

  // Other pages (cert page, Account) draw saved labels with this. Missing colours fall back to ALR Dark.
  function fullFront(v) {
    var o = {}, d = PRESETS.dark.front;
    Object.keys(d).forEach(function(k) { o[k] = d[k]; });
    Object.keys(v || {}).forEach(function(k) { if (v[k] != null && v[k] !== '') o[k] = v[k]; });
    o.name = o.name || 'CARD NAME'; o.set = o.set || ''; o.variant = o.variant || '';
    o.cert = o.cert || ''; o.grade = String(o.grade || '10'); o.gl = o.gl || '';
    return o;
  }
  window.ALRLabel = {
    frontPng: function(v) { return labelPng(fullFront(v)); },
    frontSvg: function(v) {
      return loadOutliner().then(function(fonts) {
        return cricutSvg(buildFront(fullFront(v)), LABEL_W_IN, LABEL_H_IN, fonts).replace(/^<[?]xml[^>]*>/, '');
      });
    }
  };

  // ── Saving cards to an account (Supabase, shared with the Account page). ──
  var acct = { sb: null, session: null, saved: null, dirty: false, busy: false, msg: '', bound: false };
  function pick(v, keys) { var o = {}; keys.forEach(function(k) { o[k] = v[k]; }); return o; }
  function displayName(sess) {
    var u = sess && sess.user;
    return (u && u.user_metadata && u.user_metadata.display_name) || (u && u.email) || 'your account';
  }
  function setCertLock() {
    var el = g('alr-lc-cert'), gen = g('alr-lc-cert-gen');
    if (el) { el.readOnly = !!acct.saved; if (acct.saved) el.value = acct.saved.cert; el.title = acct.saved ? 'Issued when the card was saved' : ''; }
    if (gen) gen.style.display = acct.saved ? 'none' : '';
  }
  function markDirty() {
    if (acct.saved && !acct.dirty) { acct.dirty = true; renderAcct(); }
  }
  function renderAcct() {
    var box = g('alr-lc-account');
    if (!box) return;
    if (window.ALR_DESKTOP || !window.ALR_supabase) { box.hidden = true; return; }
    box.hidden = false;
    var dis = acct.busy ? ' disabled' : '', html;
    if (!acct.session) {
      html = '<div class="alr-lc-acct-txt"><b>Save this card to your account</b><span>Keep the report, get an official cert number and a QR code on the label that opens this card’s report.</span></div>'
        + '<a class="alr-lc-acct-btn alr-lc-acct-ghost" href="/Account" target="_blank" rel="noopener">Sign in ↗</a>';
    } else if (!acct.saved) {
      html = '<div class="alr-lc-acct-txt"><b>Save to my account</b><span>Signed in as ' + esc(displayName(acct.session)) + '. Saving gives this card an official cert number and puts its QR code on the back.</span></div>'
        + '<button type="button" class="alr-lc-acct-btn" id="alr-lc-acct-save"' + dis + '>Save card</button>';
    } else if (acct.dirty) {
      html = '<div class="alr-lc-acct-txt"><b>Unsaved changes · ' + esc(acct.saved.cert) + '</b><span>Update the saved card so its report page matches.</span></div>'
        + '<button type="button" class="alr-lc-acct-btn" id="alr-lc-acct-save"' + dis + '>Update card</button>'
        + '<button type="button" class="alr-lc-acct-btn alr-lc-acct-ghost" id="alr-lc-acct-new"' + dis + '>New card</button>';
    } else {
      html = '<div class="alr-lc-acct-txt alr-lc-acct-ok"><b>✓ Saved as ' + esc(acct.saved.cert) + '</b><span>The QR code on the back opens this card’s report.</span></div>'
        + '<a class="alr-lc-acct-btn alr-lc-acct-ghost" href="/cert?c=' + Number(acct.saved.cert_no) + '" target="_blank" rel="noopener">Report page ↗</a>'
        + '<button type="button" class="alr-lc-acct-btn alr-lc-acct-ghost" id="alr-lc-acct-new"' + dis + '>New card</button>';
    }
    box.innerHTML = '<div class="alr-lc-acct">' + html + '</div>' + (acct.msg ? '<div class="alr-lc-acct-msg">' + esc(acct.msg) + '</div>' : '');
    var sv = g('alr-lc-acct-save'), nw = g('alr-lc-acct-new');
    if (sv) sv.addEventListener('click', saveCard);
    if (nw) nw.addEventListener('click', newCard);
  }
  function saveCard() {
    if (!acct.sb || !acct.session || acct.busy) return;
    var vf = getF(), vb = getB(), r = getReport();
    var payload = {
      card_name: String(vf.name).slice(0, 120), set_name: String(vf.set).slice(0, 120), printing: String(vf.variant).slice(0, 120),
      grade: Math.max(1, Math.min(10, Math.round(Number(vf.grade)) || 10)), grade_label: String(vf.gl).slice(0, 40),
      condition: r.condition, notes: r.notes ? r.notes.slice(0, 2000) : null,
      label: { set: vf.set, variant: vf.variant, front: pick(vf, FRONT_KEYS), back: pick(vb, BACK_KEYS) },
      source: window.ALR_DESKTOP ? 'app' : 'site'
    };
    if (r.date) payload.graded_on = r.date;
    acct.busy = true; acct.msg = acct.saved ? 'Updating…' : 'Saving…'; renderAcct();
    var q = acct.saved
      ? acct.sb.from('graded_cards').update(payload).eq('id', acct.saved.id).select('id, cert, cert_no').single()
      : acct.sb.from('graded_cards').insert(payload).select('id, cert, cert_no').single();
    q.then(function(res) {
      if (res.error) throw res.error;
      var first = !acct.saved;
      acct.saved = res.data; acct.dirty = false; acct.busy = false;
      acct.msg = first ? 'Saved. Your label files now carry cert ' + res.data.cert + ' and its QR code.' : 'Updated.';
      setCertLock();
      return window.ALRGraded ? window.ALRGraded.loadQR() : null;
    }).then(function() { render(); renderAcct(); })
      .catch(function(e) {
        acct.busy = false;
        acct.msg = 'Couldn’t save: ' + ((e && e.message) || 'check your connection and try again.');
        renderAcct();
      });
  }
  function newCard() {
    acct.saved = null; acct.dirty = false; acct.msg = '';
    var el = g('alr-lc-cert'); if (el) el.value = '0000-ALR';
    if (/[?&]edit=/.test(location.search)) history.replaceState(history.state, '', location.pathname);
    setCertLock(); render(); renderAcct();
  }
  function setVal(id, v) { var el = g(id); if (el && v != null) el.value = v; }
  function loadForEdit(id) {
    acct.msg = 'Loading saved card…'; renderAcct();
    acct.sb.from('graded_cards').select('*').eq('id', id).single().then(function(res) {
      if (res.error || !res.data) throw res.error || new Error('not found');
      var row = res.data, lab = row.label || {};
      setVal('alr-lc-name', row.card_name); setVal('alr-lc-set', lab.set != null ? lab.set : row.set_name);
      setVal('alr-lc-variant', lab.variant != null ? lab.variant : row.printing);
      setVal('alr-lc-grade', row.grade); setVal('alr-lc-gl', row.grade_label);
      setVal('alr-lc-rdate', row.graded_on); setVal('alr-lc-rnotes', row.notes || '');
      var c = row.condition || {};
      setVal('alr-lc-rcen', c.centering || ''); setVal('alr-lc-rcor', c.corners || ''); setVal('alr-lc-redg', c.edges || ''); setVal('alr-lc-rsur', c.surface || '');
      FRONT_KEYS.forEach(function(k) { if (lab.front && lab.front[k]) { setVal('alr-lc-c' + k, lab.front[k]); setVal('alr-lc-h' + k, lab.front[k]); } });
      BACK_KEYS.forEach(function(k) { if (lab.back && lab.back[k]) { setVal('alr-lc-bc' + k, lab.back[k]); setVal('alr-lc-bh' + k, lab.back[k]); } });
      acct.saved = { id: row.id, cert: row.cert, cert_no: row.cert_no }; acct.dirty = false; acct.msg = 'Editing ' + row.cert + '.';
      setCertLock();
      return window.ALRGraded ? window.ALRGraded.loadQR() : null;
    }).then(function() { render(); renderAcct(); })
      .catch(function() { acct.msg = 'Couldn’t open that saved card. It may have been deleted.'; renderAcct(); });
  }
  function setupAccount() {
    var tool = g('alr-lc-tool');
    if (tool && !tool._alrDirty) {
      tool._alrDirty = true;
      tool.addEventListener('input', function(e) {
        if (e.target && e.target.id === 'alr-lc-cert') return;
        markDirty();
      });
    }
    if (window.ALR_DESKTOP || !window.ALR_supabase) { renderAcct(); return; }
    renderAcct();
    window.ALR_supabase().then(function(sb) {
      acct.sb = sb;
      if (!acct.bound) {
        acct.bound = true;
        sb.auth.onAuthStateChange(function(_evt, session) {
          acct.session = session;
          if (!session) { acct.saved = null; acct.dirty = false; setCertLock(); render(); }
          renderAcct();
        });
      }
      return sb.auth.getSession();
    }).then(function(res) {
      acct.session = res && res.data ? res.data.session : null;
      renderAcct();
      var m = /[?&]edit=([0-9a-f-]{36})/.exec(location.search);
      if (m && acct.session && (!acct.saved || acct.saved.id !== m[1])) loadForEdit(m[1]);
    }).catch(function() { renderAcct(); });
  }

  function setPreset(name) {
    var p = PRESETS[name];
    ['dark', 'light'].forEach(function(n) {
      var b = g('alr-lc-preset-' + n);
      if (b) b.className = 'alr-lc-preset-btn' + (n === name ? ' alr-lc-preset-active' : '');
    });
    function sc(cid, hid, v) { var c = g(cid), h = g(hid); if (c) c.value = v; if (h) h.value = v; }
    FRONT_KEYS.forEach(function(k) { sc('alr-lc-c' + k, 'alr-lc-h' + k, p.front[k]); });
    BACK_KEYS.forEach(function(k) { sc('alr-lc-bc' + k, 'alr-lc-bh' + k, p.back[k]); });
    markDirty();
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

  // ── Web app. The manifest and icon are added here too (not only in <head>) so the page
  //    can be installed even when it was reached by an in-site link. Opened as the app
  //    (standalone, or from the app's start link) the site's menus are hidden. ──
  function setupApp() {
    if (window.ALR_DESKTOP) { document.documentElement.classList.add('alr-app'); return; }
    var head = document.head;
    function ensure(sel, tag, attrs) {
      if (head.querySelector(sel)) return;
      var el = document.createElement(tag);
      Object.keys(attrs).forEach(function(k) { el.setAttribute(k, attrs[k]); });
      head.appendChild(el);
    }
    ensure('link[rel="manifest"]', 'link', { rel: 'manifest', href: '/static/app/grading.webmanifest' });
    ensure('link[rel="apple-touch-icon"]', 'link', { rel: 'apple-touch-icon', href: '/static/app/apple-touch-icon.png' });
    ensure('meta[name="apple-mobile-web-app-title"]', 'meta', { name: 'apple-mobile-web-app-title', content: 'ALR Grading' });
    var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    var fromApp = location.search.indexOf('source=app') > -1;
    try { if (fromApp) sessionStorage.setItem('alr-app', '1'); if (sessionStorage.getItem('alr-app') === '1') fromApp = true; } catch (e) {}
    document.documentElement.classList.toggle('alr-app', !!(standalone || fromApp));
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(function() {});
    }
  }

  // ── Desktop app download strip: the big button matches the visitor's computer; links,
  //    version and sizes come from the latest GitHub release (cached for 5 minutes). ──
  var APP_REPO = 'Samurai-Lemon/alr-grading-app';
  var APPLE_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9s-2-.9-3.4-.9c-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.3-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.5.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.6-3.9zM13.9 4.9c.7-.8 1.2-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z"/></svg>';
  var WIN_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 4.5 10 3.4v7.8H2zm9-1.2L22 2v9.2H11zM2 12.2h8V20l-8-1.1zm9 0h11V22l-11-1.5z"/></svg>';
  function visitorOS() {
    var ua = navigator.userAgent || '', pf = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
    if (/iPhone|iPad|iPod|Android/i.test(ua) || (/Mac/i.test(pf) && navigator.maxTouchPoints > 1)) return 'mobile';
    if (/Win/i.test(pf) || /Windows/i.test(ua)) return 'win';
    if (/Mac/i.test(pf) || /Mac OS X/i.test(ua)) return 'mac';
    return 'other';
  }
  function latestRelease() {
    var KEY = 'alr-app-release';
    try { var c = JSON.parse(localStorage.getItem(KEY) || 'null'); if (c && Date.now() - c.t < 300000) return Promise.resolve(c.r); } catch (e) {}
    return fetch('https://api.github.com/repos/' + APP_REPO + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
      .then(function(r) { if (!r.ok) throw new Error('release'); return r.json(); })
      .then(function(j) {
        var r = { tag: j.tag_name, page: j.html_url, assets: (j.assets || []).map(function(a) { return { n: a.name, u: a.browser_download_url, s: a.size }; }) };
        try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), r: r })); } catch (e) {}
        return r;
      });
  }
  function setupDesk() {
    var box = g('alr-lc-desk');
    if (!box) return;
    var os = visitorOS(), main = g('alr-lc-desk-main'), sub = g('alr-lc-desk-sub'), oth = g('alr-lc-desk-oth'), eb = g('alr-lc-desk-eb');
    box.classList.toggle('is-mobile', os === 'mobile');
    if (os === 'mobile') { if (main) main.textContent = 'Desktop app for Mac & Windows ↗'; return; }
    latestRelease().then(function(r) {
      function find(re) { for (var i = 0; i < r.assets.length; i++) if (re.test(r.assets[i].n)) return r.assets[i]; return null; }
      function mb(a) { return a ? (Math.round(a.s / 104857.6) / 10) + ' MB' : ''; }
      function link(a, html) { return a ? '<a href="' + a.u + '" rel="noopener">' + html + '</a>' : ''; }
      var arm = find(/_aarch64\.dmg$/), intel = find(/_x64\.dmg$/), exe = find(/-setup\.exe$/) || find(/\.msi$/);
      var all = '<a href="' + r.page + '" target="_blank" rel="noopener">All versions ↗</a>';
      if (eb) eb.textContent = 'DESKTOP APP · ' + r.tag;
      if (os === 'win' && exe) {
        main.href = exe.u; main.removeAttribute('target'); main.innerHTML = WIN_SVG + ' Download for Windows';
        sub.textContent = 'Windows 10 and 11 · ' + mb(exe) + ' installer';
        oth.innerHTML = link(arm, APPLE_SVG + ' Mac (Apple Silicon)') + link(intel, 'Intel Mac') + all;
      } else if (arm) {
        // Browsers can't tell Apple Silicon from Intel, so Macs (and anyone else) get Apple Silicon first.
        main.href = arm.u; main.removeAttribute('target'); main.innerHTML = APPLE_SVG + ' Download for Mac';
        sub.textContent = 'Apple Silicon (M1 and later) · ' + mb(arm);
        oth.innerHTML = link(intel, 'Intel Mac') + link(exe, WIN_SVG + ' Windows') + all;
      }
    }).catch(function() { /* keep the plain link to the release page */ });
  }

  function init() {
    if (!g('alr-lc-tool')) { document.documentElement.classList.remove('alr-app'); return; }
    setupApp();
    setupDesk();
    loadOutliner().catch(function() {});   // get the download fonts ready now

    function freshBtn(id) {
      var el = g(id); if (!el) return null;
      var n = el.cloneNode(true); el.parentNode.replaceChild(n, el); return n;
    }

    ['name','set','variant','cert','gl'].forEach(function(id) {
      var el = freshBtn('alr-lc-' + id);
      if (el) el.addEventListener('input', render);
    });
    // Grade: whole numbers 1 to 10 only, and each level fills in its own name.
    var gr = freshBtn('alr-lc-grade');
    if (gr) {
      var fix = function(final) {
        if (gr.value === '' && !final) return;
        var n = Math.round(Number(gr.value));
        if (isNaN(n)) n = 10;
        n = Math.max(1, Math.min(10, n));
        if (String(n) !== gr.value) gr.value = String(n);
        var name = SCALE[10 - n][1], gl = g('alr-lc-gl');
        if (gl) gl.value = name;
        render();
      };
      gr.addEventListener('input', function() { fix(false); });
      gr.addEventListener('change', function() { fix(true); });
      gr.addEventListener('blur', function() { fix(true); });
    }

    var genBtn = freshBtn('alr-lc-cert-gen');
    if (genBtn) genBtn.addEventListener('click', function() {
      var num = String(Math.floor(Math.random() * 900000) + 100000);
      var el = g('alr-lc-cert');
      if (el) { el.value = num + '-ALR'; render(); }
    });

    FRONT_KEYS.forEach(function(k) { bindColor('alr-lc-c' + k, 'alr-lc-h' + k); });
    BACK_KEYS.forEach(function(k) { bindColor('alr-lc-bc' + k, 'alr-lc-bh' + k); });

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
    var drp = freshBtn('alr-lc-dl-report');
    if (drp) drp.addEventListener('click', downloadReport);

    var rd = g('alr-lc-rdate');
    if (rd && !rd.value) {
      var now = new Date();
      rd.value = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    }
    setCertLock();
    setupAccount();
    if (acct.saved && window.ALRGraded) window.ALRGraded.loadQR().then(render).catch(function() {});
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
