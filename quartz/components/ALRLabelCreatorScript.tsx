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
      var bw = 1 + (d[k % d.length] + k) % 3, gap = 1 + (d[(k + 2) % d.length] * 3 + k) % 3;
      if (cx + bw > x + w) break;
      out += '<rect x="' + cx + '" y="' + y + '" width="' + bw + '" height="' + h + '" fill="' + fill + '"/>';
      cx += bw + gap; k++;
    }
    return out;
  }
  // The site's signal bars on the grade panel: four for 9 and up, down to one.
  function sigbars(x, y, grade, on) {
    var gn = parseFloat(grade), n = isNaN(gn) ? 2 : gn >= 9 ? 4 : gn >= 7 ? 3 : gn >= 5 ? 2 : 1, out = '';
    for (var k = 0; k < 4; k++) {
      var h = 5 + k * 4;
      out += '<rect x="' + (x + k * 8) + '" y="' + (y - h) + '" width="5" height="' + h + '" rx="1" fill="' + on + '"' + (k < n ? '' : ' opacity="0.3"') + '/>';
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
    return '<defs><clipPath id="' + id + '"><rect width="' + VW + '" height="200" rx="11"/></clipPath></defs><g clip-path="url(#' + id + ')">';
  }
  function frameRect(d) {
    return '</g><rect x="1" y="1" width="' + (VW - 2) + '" height="198" rx="10" fill="none" stroke="' + d.border + '" stroke-width="2"/>';
  }
  function sidePanel(v, d) {
    return '<rect width="150" height="200" fill="' + d.side + '"/>'
      + logo(46, 30, 0.105, v.acc)
      + t(75, 118, 12.5, v.txt, 'ALR INITIATIVE', { anchor: 'middle', weight: 600, ls: 1.4 })
      + t(75, 136, 12.5, d.acct, 'GRADING', { anchor: 'middle', weight: 500, ls: 3 })
      + '<line x1="150" y1="0" x2="150" y2="200" stroke="' + d.line + '" stroke-width="1.5"/>';
  }

  function frontInner(v) {
    var d = derive(v), id = 'lf' + Math.random().toString(36).slice(2);
    var room = GX - 172 - 20;   // width available for the card name
    var lines = nameLines(v.name), dy = lines.length > 1 ? 8 : 0, nameSvg;
    if (lines.length > 1) {
      nameSvg = t(172, 32, 20, v.txt, lines[0], { weight: 600 }) + t(172, 56, 20, v.txt, lines[1], { weight: 600 });
    } else {
      var size = Math.max(21, Math.min(34, Math.floor(room / Math.max(1, v.name.length * 0.6))));
      nameSvg = t(172, 52, size, v.txt, v.name, { weight: 600, ls: -0.3 });
    }
    var g = String(v.grade), gl = String(v.gl);
    return clipOpen(id)
      + '<rect width="' + VW + '" height="200" fill="' + v.body + '"/>'
      + sidePanel(v, d)
      + t(75, 178, 10.5, v.mut, 'CYCLE 7', { anchor: 'middle', mono: true, ls: 1 })
      + nameSvg
      + t(172, 80 + dy, 13, v.mut, v.set, { mono: true, ls: 0.4 })
      + t(172, 103 + dy, 16, d.acct, v.variant, { weight: 500 })
      + '<line x1="172" y1="116" x2="' + (GX - 22) + '" y2="116" stroke="' + d.line + '" stroke-width="1"/>'
      + t(172, 136, 11.5, v.mut, 'TRADING CARD · ENGLISH', { mono: true, ls: 1.2 })
      + t(172, 157, 14, v.txt, 'CERT ' + v.cert, { mono: true, ls: 0.6 })
      + barcode(v.cert, 172, 166, 200, 20, v.txt)
      + '<rect x="' + GX + '" y="0" width="152" height="200" fill="' + v.zone + '"/>'
      + t(GC, 24, 10.5, d.gtxt, 'ARCHIVE GRADE', { anchor: 'middle', mono: true, ls: 1.5, op: 0.85 })
      + sigbars(GC - 14, 50, g, d.gtxt)
      + t(GC, 138, g.length < 3 ? 88 : 68, d.gtxt, g, { anchor: 'middle', weight: 700, ls: -3 })
      + t(GC, 174, gl.length < 10 ? 15 : 13, d.gtxt, gl, { anchor: 'middle', weight: 600, ls: 2 })
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
      boxes += '<rect x="' + x + '" y="70" width="' + bw + '" height="38" rx="6" fill="' + (on ? v.acc : 'none') + '" stroke="' + (on ? v.acc : d.line) + '" stroke-width="1.5"/>'
        + t(x + bw / 2, 95, 15, on ? gtxt : v.mut, s[0], { anchor: 'middle', weight: 600 });
    });
    return clipOpen(id)
      + '<rect width="' + VW + '" height="200" fill="' + v.body + '"/>'
      + sidePanel(v, d)
      + t(170, 46, 11.5, v.mut, 'ARCHIVED · GRADED · CERTIFIED', { mono: true, ls: 1.8 })
      + boxes
      + t(litX, 132, 12.5, d.acct, '▲ ' + f.gl, { weight: 600, ls: 1.2 })
      + t(170, 178, 10, v.mut, 'GRADED BY THE ALR INITIATIVE', { mono: true, ls: 1 })
      + '<line x1="' + GX + '" y1="0" x2="' + GX + '" y2="200" stroke="' + d.line + '" stroke-width="1.5"/>'
      + t(GC, 40, 10.5, v.mut, 'CERT NO.', { anchor: 'middle', mono: true, ls: 1.5 })
      + t(GC, 62, 14, v.txt, f.cert, { anchor: 'middle', mono: true })
      + barcode(f.cert, GX + 20, 78, 112, 70, v.txt)
      + t(GC, 176, 10, v.mut, SIZE_TXT, { anchor: 'middle', mono: true, ls: 1.2 })
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
      + '<rect x="' + (-m) + '" y="' + (-m) + '" width="' + (W + 2 * m) + '" height="' + (H + 2 * m) + '" fill="#fff"/>'
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

  // Downloads carry Inter and JetBrains Mono inside the SVG, so the label prints in the same
  // fonts as the preview. The two font files are fetched once and kept.
  var fontDefs = null;
  function loadFonts() {
    if (fontDefs !== null) return Promise.resolve(fontDefs);
    function b64(url) {
      return fetch(url).then(function(r) { if (!r.ok) throw new Error('font'); return r.arrayBuffer(); }).then(function(buf) {
        var u = new Uint8Array(buf), out = '';
        for (var i = 0; i < u.length; i += 32768) out += String.fromCharCode.apply(null, u.subarray(i, i + 32768));
        return btoa(out);
      });
    }
    return Promise.all([b64('/static/fonts/inter-latin.woff2'), b64('/static/fonts/jetbrains-mono-latin.woff2')]).then(function(f) {
      fontDefs = '<defs><style>'
        + '@font-face{font-family:Inter;src:url(data:font/woff2;base64,' + f[0] + ') format("woff2");font-weight:100 900}'
        + '@font-face{font-family:"JetBrains Mono";src:url(data:font/woff2;base64,' + f[1] + ') format("woff2");font-weight:400}'
        + '</style></defs>';
      return fontDefs;
    }).catch(function() { return ''; });
  }

  // ── PNG export: the label is drawn at 600 DPI onto a white background (one flat image, no
  //    transparency), and the DPI is written into the file so it prints at its true size. ──
  var DPI = 600;
  var CRC = null;
  function crc32(bytes) {
    if (!CRC) {
      CRC = [];
      for (var n = 0; n < 256; n++) {
        var c = n;
        for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
        CRC[n] = c >>> 0;
      }
    }
    var crc = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i++) crc = CRC[(crc ^ bytes[i]) & 255] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  // Adds a pHYs chunk (pixels per metre) right after IHDR.
  function withDpi(buf, dpi) {
    var src = new Uint8Array(buf), ppm = Math.round(dpi / 0.0254);
    var chunk = new Uint8Array(21), dv = new DataView(chunk.buffer);
    dv.setUint32(0, 9);
    chunk.set([0x70, 0x48, 0x59, 0x73], 4);
    dv.setUint32(8, ppm); dv.setUint32(12, ppm); chunk[16] = 1;
    dv.setUint32(17, crc32(chunk.subarray(4, 17)));
    var at = 33, out = new Uint8Array(src.length + 21);
    out.set(src.subarray(0, at), 0); out.set(chunk, at); out.set(src.subarray(at), at + 21);
    return out;
  }
  function saveBlob(blob, fn) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = fn;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 2000);
  }
  function rasterize(svg, win, hin) {
    return new Promise(function(resolve, reject) {
      var w = Math.round(win * DPI), h = Math.round(hin * DPI);
      var img = new Image();
      var url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      img.onload = function() {
        // a short wait lets the embedded fonts settle before drawing
        setTimeout(function() {
          var c = document.createElement('canvas');
          c.width = w; c.height = h;
          var ctx = c.getContext('2d');
          ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          URL.revokeObjectURL(url);
          c.toBlob(function(b) {
            if (!b) { reject(new Error('png')); return; }
            b.arrayBuffer().then(function(ab) { resolve(new Blob([withDpi(ab, DPI)], { type: 'image/png' })); });
          }, 'image/png');
        }, 120);
      };
      img.onerror = function() { URL.revokeObjectURL(url); reject(new Error('svg')); };
      img.src = url;
    });
  }

  // PNG (flat, 600 DPI) or SVG (editable vector, fonts embedded), picked with the format switch.
  var fmt = 'png';
  function setFormat(f) {
    fmt = f;
    ['png', 'svg'].forEach(function(n) {
      var b = g('alr-lc-fmt-' + n);
      if (!b) return;
      b.className = 'alr-lc-fmt-btn' + (n === f ? ' alr-lc-fmt-on' : '');
      b.setAttribute('aria-pressed', n === f ? 'true' : 'false');
    });
  }

  function download(which) {
    var s = g('alr-lc-status'), want = fmt;
    if (s) s.textContent = 'Preparing…';
    loadFonts().then(function(fonts) {
      var vf = getF(), vb = getB(), svg, base, win = LABEL_W_IN, hin = LABEL_H_IN;
      if (which === 'front') { svg = buildFront(vf, fonts); base = 'alr_label_front'; }
      else if (which === 'back') { svg = buildBack(vb, fonts); base = 'alr_label_back'; }
      else { svg = buildFold(vf, vb, fonts); base = 'alr_label_foldcut'; win = FOLD_W_IN; hin = FOLD_H_IN; }
      if (want === 'svg') {
        saveBlob(new Blob([svg], { type: 'image/svg+xml' }), base + '.svg');
        if (s) s.textContent = fonts ? 'Downloaded SVG · ' + inch(win) + ' × ' + inch(hin) : 'Downloaded SVG (fonts could not be embedded)';
        return;
      }
      return rasterize(svg, win, hin).then(function(png) {
        saveBlob(png, base + '.png');
        if (s) s.textContent = 'Downloaded PNG · ' + inch(win) + ' × ' + inch(hin) + ' at ' + DPI + ' DPI';
      });
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

    var fp = freshBtn('alr-lc-fmt-png'), fs = freshBtn('alr-lc-fmt-svg');
    if (fp) fp.addEventListener('click', function() { setFormat('png'); });
    if (fs) fs.addEventListener('click', function() { setFormat('svg'); });
    setFormat(fmt);

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
