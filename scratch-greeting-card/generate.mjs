import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

// One master file per panel, built at the LARGEST size (5.83x8.27in @300dpi). Fourthwall's
// designer reuses a single uploaded image across size variants by scale-to-cover + center-crop
// (the standard "one image, multiple print sizes" behavior) — so switching down to 5x7 or 4x6
// crops in from the edges of this same master file rather than using a separately-sized upload.
// Because 4x6, 5x7 and 5.83x8.27 are three DIFFERENT aspect ratios, that crop eats a different
// amount off each axis depending on target size — most off the sides for 4x6, most off top/bottom
// for 5x7. H_MARGIN/V_MARGIN below are the worst case across all three sizes (crop inset at that
// size's cover-scale, converted back to master pixels, plus the 1cm/118px safe margin itself) —
// see the accompanying MARGIN_MATH.md for the derivation. Built with a small safety pad above the
// computed minimums (210.1px horizontal, 162.6px vertical).
const W = 1749, H = 2481; // 5.83in x 8.27in @ 300dpi — the master/max canvas
const H_MARGIN = 225; // required: >= 210.1px (worst case: 4x6's side crop)
const V_MARGIN = 175; // required: >= 162.6px (worst case: 5x7's top/bottom crop)
const s = W / 1500; // content scale, tuned relative to the original 5x7 baseline design

const LOGO_PATH = "M 531.0 468.5 L 384.0 467.5 L 283.0 400.5 L 271.0 403.5 L 184.0 463.5 L 172.0 468.5 L 26.0 468.5 L 14.5 461.0 L 11.5 454.0 L 14.5 439.0 L 250.5 39.0 L 269.0 13.5 L 285.0 11.5 L 298.5 24.0 L 542.5 438.0 L 545.5 446.0 L 544.5 458.0 L 531.0 468.5 Z M 448.5 429.0 L 480.0 428.5 L 484.5 425.0 L 484.5 419.0 L 287.5 85.0 L 282.0 78.5 L 276.0 78.5 L 77.5 411.0 L 73.5 425.0 L 78.0 428.5 L 96.0 429.5 L 159.0 428.5 L 237.5 376.0 L 237.5 371.0 L 232.0 365.5 L 175.0 328.5 L 170.5 324.0 L 169.5 317.0 L 262.5 155.0 L 271.0 145.5 L 283.0 143.5 L 293.5 151.0 L 389.5 316.0 L 388.5 323.0 L 382.0 329.5 L 325.0 366.5 L 321.5 370.0 L 322.5 377.0 L 395.0 426.5 L 409.0 429.5 L 448.5 429.0 Z M 283.5 345.0 L 332.0 311.5 L 335.5 303.0 L 284.5 217.0 L 276.0 215.5 L 222.5 308.0 L 274.0 344.5 L 283.5 345.0 Z";

const FONTS = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Source+Serif+4:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; }
    .mono { font-family: "JetBrains Mono", ui-monospace, "SF Mono", monospace; }
    .serif { font-family: "Source Serif 4", Georgia, serif; }
  </style>`;

function page(inner) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
${FONTS}
</head>
<body>
${inner}
</body>
</html>
`;
}

function px(n) {
  return Math.round(n);
}

// ---- FRONT ----
function front() {
  return page(`
<div style="position:relative; width:${W}px; height:${H}px; background:#0f0e0b; overflow:hidden; font-family:Inter,-apple-system,sans-serif;">
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute; inset:0;">
    <line x1="0" y1="${px(H*0.14)}" x2="${W}" y2="${px(H*0.14)}" stroke="#cc785c" stroke-width="1" opacity="0.14"/>
    <line x1="0" y1="${px(H*0.29)}" x2="${W}" y2="${px(H*0.29)}" stroke="#cc785c" stroke-width="1" opacity="0.14"/>
    <line x1="0" y1="${px(H*0.43)}" x2="${W}" y2="${px(H*0.43)}" stroke="#cc785c" stroke-width="1" opacity="0.14"/>
    <line x1="0" y1="${px(H*0.57)}" x2="${W}" y2="${px(H*0.57)}" stroke="#cc785c" stroke-width="1" opacity="0.14"/>
    <line x1="0" y1="${px(H*0.71)}" x2="${W}" y2="${px(H*0.71)}" stroke="#cc785c" stroke-width="1" opacity="0.14"/>
    <line x1="0" y1="${px(H*0.86)}" x2="${W}" y2="${px(H*0.86)}" stroke="#cc785c" stroke-width="1" opacity="0.14"/>
    <line x1="${px(W*0.1)}" y1="0" x2="${px(W*0.1)}" y2="${H}" stroke="#cc785c" stroke-width="1" opacity="0.14"/>
    <line x1="${px(W*0.3)}" y1="0" x2="${px(W*0.3)}" y2="${H}" stroke="#cc785c" stroke-width="1" opacity="0.14"/>
    <line x1="${px(W*0.5)}" y1="0" x2="${px(W*0.5)}" y2="${H}" stroke="#cc785c" stroke-width="1" opacity="0.14"/>
    <line x1="${px(W*0.7)}" y1="0" x2="${px(W*0.7)}" y2="${H}" stroke="#cc785c" stroke-width="1" opacity="0.14"/>
    <line x1="${px(W*0.9)}" y1="0" x2="${px(W*0.9)}" y2="${H}" stroke="#cc785c" stroke-width="1" opacity="0.14"/>
    <rect x="${px(W*0.101)}" y="${px(H*0.144)}" width="${px(W*0.198)}" height="${px(H*0.144)}" fill="#cc785c" opacity="0.04"/>
    <rect x="${px(W*0.501)}" y="1" width="${px(W*0.198)}" height="${px(H*0.144)}" fill="#cc785c" opacity="0.035"/>
    <rect x="${px(W*0.701)}" y="${px(H*0.43)}" width="${px(W*0.198)}" height="${px(H*0.144)}" fill="#cc785c" opacity="0.045"/>
    <rect x="1" y="${px(H*0.715)}" width="${px(W*0.098)}" height="${px(H*0.144)}" fill="#cc785c" opacity="0.03"/>
    <rect x="${px(W*0.701)}" y="${px(H*0.858)}" width="${px(W*0.198)}" height="${px(H*0.144)}" fill="#cc785c" opacity="0.04"/>
    <circle cx="${px(W*0.787)}" cy="${px(H*0.124)}" r="${px(4*s)}" fill="#cc785c" opacity="0.32"/>
    <circle cx="${px(W*0.827)}" cy="${px(H*0.195)}" r="${px(2.5*s)}" fill="#cc785c" opacity="0.22"/>
    <circle cx="${px(W*0.747)}" cy="${px(H*0.248)}" r="${px(3*s)}" fill="#cc785c" opacity="0.24"/>
    <circle cx="${px(W*0.2)}" cy="${px(H*0.833)}" r="${px(3*s)}" fill="#cc785c" opacity="0.22"/>
    <circle cx="${px(W*0.147)}" cy="${px(H*0.771)}" r="${px(2*s)}" fill="#cc785c" opacity="0.18"/>
    <circle cx="${px(W*0.253)}" cy="${px(H*0.895)}" r="${px(4*s)}" fill="#cc785c" opacity="0.26"/>
    <circle cx="${px(W*0.84)}" cy="${px(H*0.514)}" r="${px(2.5*s)}" fill="#cc785c" opacity="0.2"/>
    <line x1="0" y1="${V_MARGIN}" x2="${W}" y2="${V_MARGIN}" stroke="#cc785c" stroke-width="3" opacity="0.6"/>
    <line x1="0" y1="${H-V_MARGIN}" x2="${W}" y2="${H-V_MARGIN}" stroke="#cc785c" stroke-width="3" opacity="0.6"/>
  </svg>

  <svg width="${px(1100*s)}" height="${px(946*s)}" viewBox="0 0 557 480" fill="#cc785c" fill-rule="evenodd" xmlns="http://www.w3.org/2000/svg" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); opacity:0.16;">
    <path d="${LOGO_PATH}"/>
  </svg>

  <!-- centered group and the pinned footer are two separate absolutely-positioned regions —
       a single flex column with one auto-margin child eats all the free space above that
       child, which pins the group above it to the top instead of centering it. -->
  <div style="position:absolute; top:${V_MARGIN}px; left:${H_MARGIN}px; right:${H_MARGIN}px; bottom:${V_MARGIN + px(50*s)}px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
    <div class="mono" style="font-size:${px(21*s)}px; letter-spacing:0.2em; text-transform:uppercase; color:#cc785c; margin-bottom:${px(48*s)}px;">Archive of Lost Realities Initiative — Cycle 7</div>
    <div class="mono" style="font-size:${px(56*s)}px; font-weight:500; color:#f0ece0; line-height:1.24; letter-spacing:-1px; margin-bottom:${px(48*s)}px; text-shadow:0 4px 40px rgba(15,14,11,0.8);">
      Seasons change.<br>The Archive remains.
    </div>
    <div style="display:flex; gap:${px(16*s)}px;">
      <span class="mono" style="font-size:${px(16*s)}px; color:#cc785c; border:1px solid #8a4a32; border-radius:6px; padding:${px(12*s)}px ${px(22*s)}px; background:rgba(10,10,8,0.6);">CYCLE 7</span>
      <span class="mono" style="font-size:${px(16*s)}px; color:#cc785c; border:1px solid #8a4a32; border-radius:6px; padding:${px(12*s)}px ${px(22*s)}px; background:rgba(10,10,8,0.6);">ARCHIVE OPERATIONS</span>
    </div>
  </div>
  <div class="mono" style="position:absolute; bottom:${V_MARGIN}px; left:${H_MARGIN}px; right:${H_MARGIN}px; text-align:center; font-size:${px(16*s)}px; letter-spacing:0.16em; text-transform:uppercase; color:#4a4840;">ALR Initiative — Archive</div>
</div>
`);
}

// ---- BACK ----
function back() {
  return page(`
<div style="position:relative; width:${W}px; height:${H}px; background:#0f0e0b; overflow:hidden;">
  <div style="position:absolute; top:${V_MARGIN}px; left:0; right:0; height:3px; background:#cc785c; opacity:0.6;"></div>
  <div style="position:absolute; bottom:${V_MARGIN}px; left:0; right:0; height:3px; background:#cc785c; opacity:0.6;"></div>

  <div style="position:absolute; top:${V_MARGIN}px; left:${H_MARGIN}px; right:${H_MARGIN}px; bottom:${V_MARGIN + px(60*s)}px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
    <svg width="${px(150*s)}" height="${px(129*s)}" viewBox="0 0 557 480" fill="#cc785c" fill-rule="evenodd" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:${px(40*s)}px; filter:drop-shadow(0 0 40px rgba(204,120,92,0.4));">
      <path d="${LOGO_PATH}"/>
    </svg>
    <div class="mono" style="font-size:${px(46*s)}px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#f0ece0; margin-bottom:${px(20*s)}px;">ALR Initiative</div>
    <div class="mono" style="font-size:${px(26*s)}px; letter-spacing:0.1em; text-transform:uppercase; color:#8a8678;">Archive of Lost Realities</div>
  </div>
  <div class="mono" style="position:absolute; bottom:${V_MARGIN}px; left:${H_MARGIN}px; right:${H_MARGIN}px; text-align:center; font-size:${px(22*s)}px; letter-spacing:0.08em; color:#5a5750;">alrinitiative.com</div>
</div>
`);
}

// ---- INSIDE 1 (left, quiet writing space) ----
function inside1() {
  return page(`
<div style="position:relative; width:${W}px; height:${H}px; background:#ece4d4; overflow:hidden;">
  <div style="position:absolute; top:${V_MARGIN}px; left:${H_MARGIN}px; right:${H_MARGIN}px; bottom:${V_MARGIN}px; border:3px solid #d3c7ab; display:flex; align-items:flex-end; justify-content:center; padding-bottom:${px(40*s)}px;">
    <div class="mono" style="font-size:${px(18*s)}px; letter-spacing:0.1em; text-transform:uppercase; color:#c2b89e;">Cycle 7 — Archive of Lost Realities</div>
  </div>
</div>
`);
}

// ---- INSIDE 2 (right, message) ----
function inside2() {
  return page(`
<div style="position:relative; width:${W}px; height:${H}px; background:#ece4d4; overflow:hidden;">
  <div style="position:absolute; top:${V_MARGIN}px; left:${H_MARGIN}px; right:${H_MARGIN}px; bottom:${V_MARGIN}px; border:3px solid #d3c7ab;"></div>

  <div style="position:absolute; top:${V_MARGIN + px(60*s)}px; left:${H_MARGIN + px(60*s)}px; right:${H_MARGIN + px(60*s)}px; bottom:${V_MARGIN + px(60*s)}px; display:flex; flex-direction:column; justify-content:center;">
    <div class="mono" style="font-size:${px(30*s)}px; font-weight:600; letter-spacing:0.06em; color:#a85c42; margin-bottom:${px(16*s)}px;">RECORD NOTE — CYCLE CLOSE</div>
    <div class="mono" style="font-size:${px(23*s)}px; letter-spacing:0.04em; color:#a49a82; margin-bottom:${px(64*s)}px;">ARCHIVE DIRECTORATE</div>

    <div class="serif" style="font-size:${px(35*s)}px; color:#332b1f; line-height:1.7; margin-bottom:${px(40*s)}px;">
      Another cycle closes. The corridors are quiet, the lights are dimmed to standby, and the last surveys of the year are logged and shelved.
    </div>
    <div class="serif" style="font-size:${px(35*s)}px; color:#332b1f; line-height:1.7; margin-bottom:${px(40*s)}px;">
      Whatever reality you are returning to this season — we hope it holds still a while longer, and holds you kindly.
    </div>
    <div class="serif" style="font-size:${px(35*s)}px; color:#332b1f; line-height:1.7; margin-bottom:${px(56*s)}px;">
      Wishing you a quiet close and a steady return.
    </div>
    <div class="serif" style="font-size:${px(33*s)}px; font-style:italic; color:#a85c42;">— The Archive Directorate</div>
  </div>
</div>
`);
}

const outDir = path.join(dir, "sizes", "master");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "front.html"), front());
fs.writeFileSync(path.join(outDir, "back.html"), back());
fs.writeFileSync(path.join(outDir, "inside1.html"), inside1());
fs.writeFileSync(path.join(outDir, "inside2.html"), inside2());
console.log(`generated master (${W}x${H}) — H_MARGIN=${H_MARGIN} V_MARGIN=${V_MARGIN}`);
