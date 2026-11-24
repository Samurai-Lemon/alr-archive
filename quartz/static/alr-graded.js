// ALR graded cards: the one-page grading report (PDF), the public cert page that the label's QR
// opens (/cert?c=<number>), and the "Your Graded Cards" list on the Account page.
// Loaded once on every page (see ALRGradedCards.tsx) and re-run on in-site navigation.
// The label drawing itself lives in the Grading Terminal script, exposed as window.ALRLabel.
(function () {
  if (window.ALRGraded) return;

  var JSPDF_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  var QR_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';
  var SITE = 'https://alrinitiative.com';
  var PHOTO_BASE = 'https://jkxduwtsssxayscbaxet.supabase.co/storage/v1/object/public/card-photos/';
  var FONT_DIR = (window.ALR_ASSETS && window.ALR_ASSETS.fonts) || '/static/fonts';

  // ── small helpers ───────────────────────────────────────────────────────────
  var scripts = {};
  function loadScript(src, ready) {
    if (ready()) return Promise.resolve();
    if (scripts[src]) return scripts[src];
    scripts[src] = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function () { scripts[src] = null; reject(new Error('could not load ' + src)); };
      document.head.appendChild(s);
    });
    return scripts[src];
  }
  function loadQR() { return loadScript(QR_SRC, function () { return !!window.qrcode; }); }
  function loadPdf() { return loadScript(JSPDF_SRC, function () { return !!(window.jspdf && window.jspdf.jsPDF); }); }
  function client() {
    return window.ALR_supabase ? window.ALR_supabase() : Promise.reject(new Error('accounts are not available here'));
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function certUrl(certNo) { return SITE + '/cert?c=' + Number(certNo); }
  function photoUrl(path) { return path ? PHOTO_BASE + String(path).split('/').map(encodeURIComponent).join('/') : null; }
  function fmtDate(d) {
    if (!d) return '';
    var p = String(d).split('-');
    if (p.length !== 3) return String(d);
    var dt = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  function toBase64(buf) {
    var u = new Uint8Array(buf), out = '';
    for (var i = 0; i < u.length; i += 32768) out += String.fromCharCode.apply(null, u.subarray(i, i + 32768));
    return btoa(out);
  }
  function fetchB64(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error('fetch ' + url); return r.arrayBuffer(); }).then(toBase64);
  }
  // An image URL as a data: URL, re-encoded through a canvas (so any format becomes JPEG/PNG).
  function imageData(url, maxPx, type) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        var s = Math.min(1, (maxPx || 1600) / Math.max(img.naturalWidth, img.naturalHeight));
        var c = document.createElement('canvas');
        c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
        var ctx = c.getContext('2d');
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        try { resolve({ data: c.toDataURL(type || 'image/jpeg', 0.9), w: c.width, h: c.height }); }
        catch (e) { reject(e); }
      };
      img.onerror = function () { reject(new Error('image')); };
      img.src = url;
    });
  }

  // QR modules for a URL (error correction M), as a boolean grid.
  function qrMatrix(text) {
    var q = window.qrcode(0, 'M');
    q.addData(text); q.make();
    var n = q.getModuleCount(), rows = [];
    for (var r = 0; r < n; r++) { var row = []; for (var c = 0; c < n; c++) row.push(q.isDark(r, c)); rows.push(row); }
    return rows;
  }

  // ── grading report PDF ──────────────────────────────────────────────────────
  // d = { cert, certNo (number|null when not saved), name, set, variant, cardNumber, printing, game,
  //       grade, gradeLabel, date (YYYY-MM-DD), condition {centering, corners, edges, surface},
  //       notes, labelPng (data URL of the front label), photo (URL or data URL), photoIsOfficial }
  var pdfFonts = null;
  function loadPdfFonts() {
    if (pdfFonts) return Promise.resolve(pdfFonts);
    return Promise.all([
      fetchB64(FONT_DIR + '/inter-500.ttf'), fetchB64(FONT_DIR + '/inter-700.ttf'), fetchB64(FONT_DIR + '/jetbrains-mono-400.ttf')
    ]).then(function (f) { pdfFonts = f; return f; });
  }
  var iconData = null;
  function loadIcon() {
    if (iconData) return Promise.resolve(iconData);
    return imageData('/static/app/icon-192.png', 192, 'image/png').then(function (i) { iconData = i.data; return iconData; }).catch(function () { return null; });
  }

  function reportPdf(d) {
    var needsQR = d.certNo != null;
    return Promise.all([loadPdf(), loadPdfFonts(), loadIcon(), needsQR ? loadQR() : null,
      d.photo ? imageData(d.photo, 1400).catch(function () { return null; }) : null
    ]).then(function (r) {
      var fonts = r[1], icon = r[2], photo = r[4];
      var doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'letter' });
      doc.addFileToVFS('Inter-500.ttf', fonts[0]); doc.addFont('Inter-500.ttf', 'Inter', 'normal');
      doc.addFileToVFS('Inter-700.ttf', fonts[1]); doc.addFont('Inter-700.ttf', 'Inter', 'bold');
      doc.addFileToVFS('Mono-400.ttf', fonts[2]); doc.addFont('Mono-400.ttf', 'Mono', 'normal');
      doc.setProperties({ title: 'ALR Grading Report ' + (d.cert || ''), creator: 'ALR Initiative Grading Terminal' });

      var INK = [31, 27, 23], MUTED = [107, 98, 88], ACC = [168, 92, 66], LINE = [227, 221, 209], BOX = [246, 243, 236], EDGE = [212, 204, 189];
      var L = 40, R = 572, W = R - L;
      function font(f, style, size, color) { doc.setFont(f, style); doc.setFontSize(size); doc.setTextColor.apply(doc, color || INK); }
      function txt(s, x, y, o) { doc.text(String(s == null ? '' : s), x, y, o || {}); }
      function spaced(s, x, y, cs, o) { doc.setCharSpace(cs); txt(s, x, y, o); doc.setCharSpace(0); }

      // header
      if (icon) doc.addImage(icon, 'PNG', L, 36, 38, 38, 'icon', 'FAST');
      font('Mono', 'normal', 8, ACC); spaced('ALR INITIATIVE GRADING', L + 48, 50, 1.2);
      font('Inter', 'bold', 19); txt('Grading Report', L + 48, 70);
      font('Mono', 'normal', 8, ACC); spaced('CERT NO.', R, 50, 1.2, { align: 'right' });
      font('Mono', 'normal', 15); txt(d.cert || '', R, 70, { align: 'right' });
      if (!needsQR) { font('Inter', 'normal', 7.5, MUTED); txt('Not registered to an ALR account', R, 82, { align: 'right' }); }
      doc.setDrawColor.apply(doc, INK); doc.setLineWidth(1.5); doc.line(L, 90, R, 90);

      // photo (if any) on the left, grade + details on the right
      var top = 106, colX = L, colW = W, leftBottom = top;
      if (photo) {
        var pw = 178, ph = Math.min(260, pw * photo.h / photo.w);
        doc.setFillColor(240, 238, 233); doc.setDrawColor.apply(doc, EDGE); doc.setLineWidth(0.75);
        doc.roundedRect(L, top, pw + 16, ph + 34, 8, 8, 'FD');
        doc.addImage(photo.data, 'JPEG', L + 8, top + 8, pw, ph);
        font('Inter', 'bold', 7.5); txt('Front', L + 8, top + ph + 22);
        font('Inter', 'normal', 7.5, MUTED); txt(d.photoIsOfficial ? '· official image' : '· photo', L + 8 + doc.getTextWidth('Front') + 3, top + ph + 22);
        colX = L + pw + 34; colW = R - colX; leftBottom = top + ph + 34;
      }

      // grade box
      doc.setFillColor.apply(doc, BOX); doc.setDrawColor.apply(doc, EDGE); doc.setLineWidth(0.75);
      doc.roundedRect(colX, top, colW, 76, 8, 8, 'FD');
      font('Inter', 'bold', 52, ACC); txt(String(d.grade), colX + 16, top + 57);
      var gx = colX + 24 + doc.getTextWidth(String(d.grade));
      font('Inter', 'bold', 12, ACC);
      var gl = String(d.gradeLabel || ''), glw = doc.getTextWidth(gl) + 1 * gl.length + 16;
      doc.setDrawColor.apply(doc, ACC); doc.setLineWidth(1.8); doc.roundedRect(gx, top + 18, glw, 22, 2, 2, 'S');
      spaced(gl, gx + 8, top + 33.5, 1);
      font('Inter', 'normal', 8.5, MUTED); txt('Archive grade · 1 to 10 scale', gx, top + 56);

      // details
      var y = top + 96, rows = [['Card', d.name, true], ['Set / Series', d.set], ['Variant / Edition', d.variant],
        ['Card number', d.cardNumber], ['Printing', d.printing], ['Game', d.game], ['Date graded', fmtDate(d.date)]];
      doc.setDrawColor.apply(doc, LINE); doc.setLineWidth(0.6);
      rows.forEach(function (row) {
        if (!row[1]) return;
        font('Inter', 'normal', 9, MUTED); txt(row[0], colX, y);
        font('Inter', row[2] ? 'bold' : 'normal', 9.5);
        txt(doc.splitTextToSize(String(row[1]), colW - 100)[0], colX + 96, y);
        doc.line(colX, y + 7, colX + colW, y + 7);
        y += 21;
      });
      // 1 to 10 scale
      var gs = Math.max(1, Math.min(10, Math.round(Number(d.grade) || 10))), bw = (colW - 9 * 4) / 10;
      for (var k = 0; k < 10; k++) {
        var n = 10 - k, bx = colX + k * (bw + 4), on = n === gs;
        doc.setLineWidth(1); doc.setDrawColor.apply(doc, on ? ACC : EDGE);
        if (on) { doc.setFillColor.apply(doc, ACC); doc.roundedRect(bx, y, bw, 19, 3, 3, 'FD'); }
        else doc.roundedRect(bx, y, bw, 19, 3, 3, 'S');
        font('Inter', 'bold', 9, on ? [255, 255, 255] : MUTED); txt(String(n), bx + bw / 2, y + 13, { align: 'center' });
      }
      y = Math.max(y + 19, leftBottom) + 22;

      // condition
      var cond = d.condition || {}, keys = [['centering', 'CENTERING'], ['corners', 'CORNERS'], ['edges', 'EDGES'], ['surface', 'SURFACE']];
      if (keys.some(function (k) { return cond[k[0]]; })) {
        font('Mono', 'normal', 7.5, MUTED); spaced('CONDITION', L, y, 1.3); y += 8;
        var cw = (W - 3 * 8) / 4;
        keys.forEach(function (k, i) {
          var cx = L + i * (cw + 8);
          doc.setFillColor(255, 254, 251); doc.setDrawColor.apply(doc, LINE); doc.setLineWidth(0.6);
          doc.roundedRect(cx, y, cw, 40, 6, 6, 'FD');
          font('Inter', 'normal', 7, MUTED); spaced(k[1], cx + 9, y + 14, 0.5);
          font('Inter', 'bold', 12); txt(doc.splitTextToSize(String(cond[k[0]] || '—'), cw - 18)[0], cx + 9, y + 31);
        });
        y += 40 + 20;
      }
      // notes
      if (d.notes) {
        font('Mono', 'normal', 7.5, MUTED); spaced('GRADER NOTES', L, y, 1.3); y += 8;
        font('Inter', 'normal', 9.5, [79, 71, 64]);
        var lines = doc.splitTextToSize(String(d.notes), W - 22).slice(0, 8), nh = 16 + lines.length * 13;
        doc.setFillColor(255, 254, 251); doc.setDrawColor.apply(doc, LINE); doc.setLineWidth(0.6);
        doc.roundedRect(L, y, W, nh, 6, 6, 'FD');
        txt(lines, L + 11, y + 17);
        y += nh + 20;
      }
      // the label at actual size (2.65 × 0.78 in)
      if (d.labelPng && y < 640) {
        font('Mono', 'normal', 7.5, MUTED); spaced('LABEL · ACTUAL SIZE', L, y, 1.3); y += 8;
        doc.addImage(d.labelPng, 'PNG', L, y, 190.8, 56.16, 'label', 'FAST');
        font('Inter', 'normal', 8.5, MUTED); txt('2.65 × 0.78 in', L + 204, y + 24); txt('fits a 2.68 × 0.79 in slab slot', L + 204, y + 37);
      }

      // footer: signature line, and the cert link + QR for saved cards
      doc.setDrawColor.apply(doc, EDGE); doc.setLineWidth(0.6); doc.line(L, 690, R, 690);
      doc.setDrawColor.apply(doc, INK); doc.setLineWidth(0.8); doc.line(L, 742, L + 190, 742);
      font('Inter', 'normal', 8.5, MUTED); txt('Grader signature', L, 755);
      if (needsQR) {
        var m = qrMatrix(certUrl(d.certNo)), size = 64, cell = size / m.length, qx = R - size, qy = 700;
        doc.setFillColor.apply(doc, INK);
        m.forEach(function (row, r) {
          var c = 0;
          while (c < row.length) {
            if (!row[c]) { c++; continue; }
            var s = c; while (c < row.length && row[c]) c++;
            doc.rect(qx + s * cell, qy + r * cell, (c - s) * cell + 0.05, cell + 0.05, 'F');
          }
        });
        font('Inter', 'normal', 8.5, MUTED); txt('Look up this cert', qx - 10, 722, { align: 'right' });
        font('Inter', 'bold', 9); txt(certUrl(d.certNo).replace('https://', ''), qx - 10, 735, { align: 'right' });
      } else {
        font('Inter', 'normal', 8.5, MUTED); txt('Made with the ALR Grading Terminal · alrinitiative.com', R, 742, { align: 'right' });
      }
      if (d.photo && d.photoIsOfficial) {
        font('Inter', 'normal', 6.5, [154, 148, 136]);
        txt('Card image: official card list via optcgapi.com. Card art © its publisher.', L, 778);
      }
      return doc.output('blob');
    });
  }

  // A saved card row (from the database) as report data, with the label drawn from what was saved.
  function rowToReport(row) {
    var lab = row.label || {}, f = lab.front || {};
    var v = {};
    Object.keys(f).forEach(function (k) { v[k] = f[k]; });
    v.name = row.card_name; v.set = lab.set || row.set_name || ''; v.variant = lab.variant || row.printing || '';
    v.cert = row.cert; v.grade = String(row.grade); v.gl = row.grade_label;
    var png = window.ALRLabel && window.ALRLabel.frontPng ? window.ALRLabel.frontPng(v).catch(function () { return null; }) : Promise.resolve(null);
    return png.then(function (labelPng) {
      return {
        cert: row.cert, certNo: row.cert_no != null ? row.cert_no : Number(String(row.cert).replace(/[^0-9]/g, '')),
        name: row.card_name, set: row.set_name, variant: row.printing, cardNumber: row.card_number, game: gameName(row.game),
        grade: row.grade, gradeLabel: row.grade_label, date: row.graded_on, condition: row.condition || {}, notes: row.notes,
        labelPng: labelPng,
        photo: photoUrl(row.front_photo_path) || row.official_image_url || null,
        photoIsOfficial: !row.front_photo_path && !!row.official_image_url
      };
    });
  }
  function gameName(g) {
    return { 'one-piece': 'One Piece Card Game', pokemon: 'Pokémon TCG', magic: 'Magic: The Gathering', yugioh: 'Yu-Gi-Oh!', sports: 'Sports' }[g] || '';
  }
  function fileStem(name, grade) {
    var n = String(name || 'CARD').trim().toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'CARD';
    return n + '_' + grade;
  }
  function saveFile(blob, fn) {
    if (typeof window.ALR_SAVE_FILE === 'function') return window.ALR_SAVE_FILE(blob, fn);
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = fn; a.style.display = 'none';
    a.setAttribute('data-router-ignore', '');                    // keep the site's page router off it
    a.addEventListener('click', function (e) { e.stopPropagation(); });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
    return Promise.resolve(fn);
  }

  // ── public cert page (/cert?c=124) ──────────────────────────────────────────
  function onCertPage() { return /^\/cert(\.html)?\/?$/.test(location.pathname); }
  function initCert() {
    var box = document.getElementById('alr-cert');
    if (!box || !onCertPage()) return;
    var c = new URLSearchParams(location.search).get('c') || '';
    if (!/[0-9]/.test(c)) { box.innerHTML = certMessage('Enter a cert number', 'Scan the QR on an ALR label, or add ?c= and the number to this page’s address.'); return; }
    box.innerHTML = '<div class="alr-cert-loading">Looking up cert…</div>';
    client().then(function (sb) { return sb.rpc('get_cert', { c: c }); }).then(function (res) {
      if (res.error) throw res.error;
      var row = res.data;
      if (!row) { box.innerHTML = certMessage('No card found', 'There’s no ALR record for cert ' + esc(c) + '. It may have been removed by its owner.'); return; }
      renderCert(box, row);
    }).catch(function () {
      box.innerHTML = certMessage('Couldn’t look up this cert', 'Check your connection and reload the page.');
    });
  }
  function certMessage(title, text) {
    return '<div class="alr-cert-card alr-cert-empty"><div class="alr-cert-eb">ALR INITIATIVE GRADING</div><h2>' + esc(title) + '</h2><p>' + text + '</p></div>';
  }
  function renderCert(box, row) {
    var img = photoUrl(row.front_photo_path) || row.official_image_url;
    var cond = row.condition || {}, ck = [['centering', 'Centering'], ['corners', 'Corners'], ['edges', 'Edges'], ['surface', 'Surface']]
      .filter(function (k) { return cond[k[0]]; });
    var rows = [['Cert', '<span class="alr-cert-mono">' + esc(row.cert) + '</span>'], ['Card', esc(row.card_name)], ['Set / Series', esc(row.set_name)],
      ['Variant / Edition', esc(row.printing)], ['Card number', esc(row.card_number)], ['Game', esc(gameName(row.game))], ['Graded', esc(fmtDate(row.graded_on))]]
      .filter(function (r) { return r[1]; });
    var labelSvg = '';
    if (window.ALRLabel && window.ALRLabel.frontSvg) {
      var lab = row.label || {}, v = {};
      Object.keys(lab.front || {}).forEach(function (k) { v[k] = lab.front[k]; });
      v.name = row.card_name; v.set = lab.set || row.set_name || ''; v.variant = lab.variant || row.printing || '';
      v.cert = row.cert; v.grade = String(row.grade); v.gl = row.grade_label;
      try { labelSvg = window.ALRLabel.frontSvg(v); } catch (e) { labelSvg = ''; }
    }
    box.innerHTML =
      '<div class="alr-cert-card">' +
        '<div class="alr-cert-head"><img src="/static/app/icon-192.png" alt="" width="40" height="40"><div><div class="alr-cert-eb">ALR INITIATIVE GRADING</div><div class="alr-cert-title">Grading Report</div></div>' +
          '<div class="alr-cert-no"><div class="alr-cert-eb">CERT NO.</div><div class="alr-cert-mono alr-cert-big">' + esc(row.cert) + '</div></div></div>' +
        '<div class="alr-cert-ok">✓ Recorded in the ALR archive</div>' +
        '<div class="alr-cert-main">' +
          (img ? '<figure class="alr-cert-photo"><img src="' + esc(img) + '" alt="' + esc(row.card_name) + '"><figcaption>' + (row.front_photo_path ? 'Front photo' : 'Official card image') + '</figcaption></figure>' : '') +
          '<div class="alr-cert-info">' +
            '<div class="alr-cert-grade"><span class="alr-cert-num">' + esc(row.grade) + '</span><div><div class="alr-cert-name">' + esc(row.card_name) + '</div><span class="alr-cert-stamp">' + esc(row.grade_label) + '</span></div></div>' +
            '<table class="alr-cert-table">' + rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>'; }).join('') + '</table>' +
          '</div>' +
        '</div>' +
        (ck.length ? '<div class="alr-cert-sub">CONDITION</div><div class="alr-cert-cond">' + ck.map(function (k) { return '<div><span>' + k[1] + '</span><b>' + esc(cond[k[0]]) + '</b></div>'; }).join('') + '</div>' : '') +
        (row.notes ? '<div class="alr-cert-sub">GRADER NOTES</div><div class="alr-cert-notes">' + esc(row.notes) + '</div>' : '') +
        (labelSvg ? '<div class="alr-cert-sub">LABEL</div><div class="alr-cert-label">' + labelSvg + '</div>' : '') +
        '<div class="alr-cert-actions"><button type="button" class="alr-cert-btn" id="alr-cert-pdf">Download report (PDF)</button><span id="alr-cert-status"></span></div>' +
        '<div class="alr-cert-foot">This page shows the grading report only. alrinitiative.com</div>' +
      '</div>';
    var btn = document.getElementById('alr-cert-pdf');
    if (btn) btn.addEventListener('click', function () {
      var st = document.getElementById('alr-cert-status');
      if (st) st.textContent = 'Making the PDF…';
      rowToReport(row).then(reportPdf).then(function (blob) {
        return saveFile(blob, fileStem(row.card_name, row.grade) + '_report.pdf');
      }).then(function () { if (st) st.textContent = 'Downloaded'; })
        .catch(function () { if (st) st.textContent = 'Could not make the PDF. Try again.'; });
    });
  }

  // ── Account page: Your Graded Cards ────────────────────────────────────────
  var accountRows = [];
  function loadAccount(sb) {
    var box = document.getElementById('alr-account-graded');
    if (!box) return;
    sb.from('graded_cards').select('id, cert, cert_no, card_name, set_name, printing, grade, grade_label, graded_on, front_photo_path, official_image_url, source')
      .order('created_at', { ascending: false }).then(function (res) {
        if (res.error) { box.innerHTML = '<div class="alr-reg-empty">Couldn’t load your graded cards.</div>'; return; }
        accountRows = res.data || [];
        renderAccount(box, sb);
      });
  }
  function renderAccount(box, sb) {
    var count = document.getElementById('alr-account-graded-count');
    if (count) count.textContent = accountRows.length ? accountRows.length + (accountRows.length === 1 ? ' card' : ' cards') : '';
    if (!accountRows.length) {
      box.innerHTML = '<div class="alr-reg-empty">No graded cards yet. Make a label in the <a href="/label-creator" class="internal">Grading Terminal</a> and choose Save card.</div>';
      return;
    }
    box.innerHTML = '<div class="alr-gc-grid">' + accountRows.map(function (r, i) {
      var img = photoUrl(r.front_photo_path) || r.official_image_url;
      return '<div class="alr-gc">' +
        '<div class="alr-gc-img">' + (img ? '<img src="' + esc(img) + '" alt="" loading="lazy">' : '<span class="alr-gc-ph">' + esc(r.grade) + '</span>') + '</div>' +
        '<div class="alr-gc-meta"><div class="alr-gc-name">' + esc(r.card_name) + '</div>' +
          '<div class="alr-gc-sub"><span class="alr-gc-mono">' + esc(r.cert) + '</span>' + (r.set_name ? ' · ' + esc(r.set_name) : '') + '</div>' +
          '<div class="alr-gc-grade"><b>' + esc(r.grade) + '</b><span>' + esc(r.grade_label) + '</span></div>' +
          '<div class="alr-gc-actions">' +
            '<a href="/cert?c=' + Number(r.cert_no) + '" target="_blank" rel="noopener">Report page ↗</a>' +
            '<a href="/label-creator?edit=' + encodeURIComponent(r.id) + '" class="internal">Edit</a>' +
            '<button type="button" data-gc-pdf="' + i + '">PDF</button>' +
            '<button type="button" data-gc-del="' + i + '" class="alr-gc-del">Delete</button>' +
          '</div><div class="alr-gc-status" id="alr-gc-st-' + i + '"></div>' +
        '</div></div>';
    }).join('') + '</div>';
    Array.prototype.forEach.call(box.querySelectorAll('[data-gc-pdf]'), function (b) {
      b.addEventListener('click', function () {
        var i = Number(b.getAttribute('data-gc-pdf')), st = document.getElementById('alr-gc-st-' + i);
        if (st) st.textContent = 'Making the PDF…';
        sb.from('graded_cards').select('*').eq('id', accountRows[i].id).single().then(function (res) {
          if (res.error) throw res.error;
          return rowToReport(res.data);
        }).then(reportPdf).then(function (blob) {
          return saveFile(blob, fileStem(accountRows[i].card_name, accountRows[i].grade) + '_report.pdf');
        }).then(function () { if (st) st.textContent = 'Downloaded'; })
          .catch(function () { if (st) st.textContent = 'Could not make the PDF.'; });
      });
    });
    Array.prototype.forEach.call(box.querySelectorAll('[data-gc-del]'), function (b) {
      b.addEventListener('click', function () {
        var i = Number(b.getAttribute('data-gc-del')), r = accountRows[i], st = document.getElementById('alr-gc-st-' + i);
        if (!window.confirm('Delete ' + r.card_name + ' (' + r.cert + ')? Its QR code will stop working. This can’t be undone.')) return;
        if (st) st.textContent = 'Deleting…';
        var paths = [r.front_photo_path].filter(Boolean);
        (paths.length ? sb.storage.from('card-photos').remove(paths) : Promise.resolve()).then(function () {
          return sb.from('graded_cards').delete().eq('id', r.id);
        }).then(function (res) {
          if (res && res.error) throw res.error;
          accountRows.splice(i, 1);
          renderAccount(box, sb);
        }).catch(function () { if (st) st.textContent = 'Could not delete. Try again.'; });
      });
    });
  }

  window.ALRGraded = {
    loadQR: loadQR, qrMatrix: qrMatrix, certUrl: certUrl, photoUrl: photoUrl,
    reportPdf: reportPdf, rowToReport: rowToReport, fileStem: fileStem, saveFile: saveFile,
    gameName: gameName, loadAccount: loadAccount
  };
  // The Account page may have asked for the list before this file finished loading.
  function initAccount() {
    var box = document.getElementById('alr-account-graded');
    if (!box || !window.ALR_supabase) return;
    client().then(function (sb) {
      return sb.auth.getSession().then(function (res) { if (res.data && res.data.session) loadAccount(sb); });
    }).catch(function () {});
  }
  function init() { initCert(); initAccount(); }
  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('nav', init);
  if (document.readyState !== 'loading') init();
})();
