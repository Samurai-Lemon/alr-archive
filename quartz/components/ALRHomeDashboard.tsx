import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import ALRRecentEchoes from "./ALRRecentEchoes"
import ALRRecentRealities from "./ALRRecentRealities"

const RecentEchoes = ALRRecentEchoes()
const RecentRealities = ALRRecentRealities()

const ALRHomeDashboard: QuartzComponent = (props: QuartzComponentProps) => {
  const { allFiles } = props

  const normalize = (v: unknown) => String(v ?? "").trim().toLowerCase()

  const hasTag = (tags: unknown, target: string) =>
    Array.isArray(tags) && tags.some((t) => normalize(t) === normalize(target))

  const echoes = allFiles.filter((file) => {
    const slug = normalize(file.slug)
    const fm = (file.frontmatter ?? {}) as Record<string, unknown>
    return hasTag(fm.tags, "echo") || slug.includes("/echoes/") || slug.startsWith("echo-")
  })

  const realities = allFiles.filter((file) => {
    const slug = normalize(file.slug)
    const fm = (file.frontmatter ?? {}) as Record<string, unknown>
    return hasTag(fm.tags, "reality") || slug.includes("/realities/") || slug.startsWith("r-")
  })

  const terminalEchoes = echoes.filter((file) => {
    const fm = (file.frontmatter ?? {}) as Record<string, unknown>
    return normalize(fm.esc) === "s4"
  })

  const activeCycle = "7"

  // Field notes from Archive personnel — some drawn from existing entry documentation,
  // some newly logged for echoes that didn't have a note yet. Rotates client-side, same
  // pattern as the featured-echo rotation below.
  const dispatchQuotes = [
    { text: "The oldest entry in the catalog. Classification framework formally flagged as potentially inapplicable.", attr: "M. Voss, Archive Operations" },
    { text: "I have worked inside this structure longer than anywhere else. It feels like it has been waiting.", attr: "E. Maren, Reality Investigation" },
    { text: "The composition changes between manifestations, but the character of suffering it depicts never does.", attr: "N. Ossic, Echo Research" },
    { text: "Reclassification under review — manifestation pattern shows increased frequency this cycle.", attr: "J. Calloway, Reality Investigation" },
    { text: "They arrange themselves around whoever is filing, not whoever asked them to. I still don't know how they decide.", attr: "L. Dray, Archive Operations" },
    { text: "You feel it before you see it in the dream. That's the part nobody warns new investigators about.", attr: "V. Arend, Echo Research" },
    { text: "The file insists 'comfortable' is the correct word for the first phase. The recording equipment has failed on every attempt to document what comes after.", attr: "K. Albrecht, Device Development" },
    { text: "The receptionist's desk is always empty. I have started to find that worse than if someone were sitting at it.", attr: "J. Calloway, Reality Investigation" },
    { text: "R-031's collapse field keeps producing them. We stopped counting after the fourth recovery site.", attr: "E. Maren, Reality Investigation" },
  ]

  return (
    <>
      <div class="alr-home">

        {/* ── MOBILE TOP ROW (compact brand + search trigger, mobile-only) ── */}
        <div class="alr-home-mtop">
          <div class="alr-home-mtop-brand">
            <span class="alr-home-mtop-mark">◆</span>
            <span class="alr-home-mtop-word">ALR Initiative</span>
          </div>
          <button class="alr-home-mtop-search" id="alr-home-mtop-search" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
(function() {
  function wire() {
    var btn = document.getElementById('alr-home-mtop-search');
    if (!btn) return;
    btn.onclick = function() {
      var sb = document.querySelector('.search-button');
      if (sb) sb.click();
    };
  }
  wire();
  document.addEventListener('nav', wire);
})();
        ` }} />

        {/* ── HERO — banner SVG as background ── */}
        <div class="alr-home-hero-wrap">
          <div class="alr-hallow-stripe"></div>
          <svg
            class="alr-home-hero-svg"
            width="100%"
            viewBox="0 0 680 220"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <g id="alr-hallow-pumpkin" transform="translate(0,1280) scale(0.1,-0.1)">
                <path d="M5525 12793 c-246 -30 -565 -182 -821 -389 -401 -324 -600 -752 -620
                -1329 -10 -271 20 -517 79 -665 40 -98 87 -168 172 -256 175 -179 338 -243
                625 -245 74 0 144 -4 155 -8 28 -12 51 3 63 39 12 34 11 35 -42 44 -107 20
                -229 115 -323 253 -196 286 -291 614 -263 900 20 198 73 336 202 529 203 304
                431 449 676 429 251 -19 586 -188 745 -374 136 -159 209 -416 209 -736 0 -319
                -51 -610 -140 -795 -97 -202 -426 -423 -722 -485 -36 -8 -79 -19 -95 -26 -17
                -7 -51 -11 -76 -10 -54 3 -100 -17 -197 -86 -77 -54 -134 -125 -161 -199 -13
                -34 -27 -112 -36 -197 -8 -77 -17 -143 -20 -145 -3 -3 -44 13 -92 35 -202 93
                -475 153 -690 153 -37 0 -153 -9 -258 -20 -104 -11 -262 -27 -350 -35 -181
                -17 -256 -30 -475 -85 -85 -21 -209 -49 -275 -60 -157 -28 -242 -62 -416 -166
                -166 -99 -258 -147 -347 -180 -197 -75 -371 -199 -569 -408 -101 -107 -496
                -576 -600 -712 -144 -189 -318 -477 -429 -709 -91 -192 -262 -629 -310 -793
                -49 -170 -111 -592 -121 -822 -12 -292 52 -847 143 -1240 72 -307 129 -455
                347 -900 282 -576 417 -788 591 -932 35 -29 92 -94 133 -150 45 -63 96 -120
                140 -156 37 -30 133 -119 213 -197 103 -100 177 -162 255 -214 125 -82 666
                -358 918 -467 191 -82 231 -110 398 -270 142 -136 191 -170 340 -233 63 -26
                173 -73 244 -104 189 -81 255 -96 488 -110 298 -17 504 8 662 78 68 30 181
                105 230 152 31 30 35 40 30 65 l-7 29 38 -16 c45 -19 37 -12 154 -127 126
                -124 253 -218 375 -279 80 -40 143 -61 315 -105 250 -64 334 -72 531 -55 342
                32 639 105 819 203 153 83 380 258 410 317 11 22 29 42 39 46 11 3 42 28 68
                56 67 70 90 75 266 55 166 -18 291 -20 462 -6 642 53 750 73 913 168 177 103
                174 102 234 102 54 0 63 -4 151 -64 173 -118 235 -139 422 -139 224 -1 438 63
                615 183 30 20 94 54 142 75 111 47 195 118 350 296 188 216 269 331 356 504
                27 55 60 132 72 170 13 39 47 111 77 161 73 123 82 149 167 491 115 457 115
                459 158 853 26 239 30 569 9 720 -15 115 -35 376 -33 445 2 70 -24 246 -59
                400 -46 197 -58 273 -59 353 0 86 -17 141 -105 342 -35 80 -93 224 -130 320
                -187 488 -478 980 -834 1410 -121 146 -521 546 -671 671 -382 319 -965 698
                -1241 808 -190 76 -591 139 -910 144 -103 1 -108 0 -173 -33 l-68 -35 -19 24
                c-10 13 -19 32 -19 42 0 10 50 119 111 241 l111 223 97 95 c158 156 335 280
                398 280 23 0 36 -6 44 -21 6 -13 15 -115 20 -248 13 -356 37 -408 252 -554
                101 -70 154 -82 291 -68 263 27 325 49 419 151 105 113 143 226 134 395 -8
                165 -69 290 -235 490 -75 90 -91 104 -160 138 -42 21 -85 48 -94 60 -22 28
                -23 69 -2 112 23 49 116 132 181 163 52 24 70 27 164 27 104 0 107 -1 190 -42
                89 -45 174 -110 237 -183 21 -25 110 -144 197 -265 251 -350 322 -429 439
                -485 117 -55 177 -64 426 -64 217 0 228 1 315 28 183 56 403 181 487 275 153
                174 244 483 209 708 -32 209 -120 390 -319 657 -40 54 -85 122 -99 150 -32 64
                -51 86 -75 86 -30 0 -44 -44 -30 -97 14 -52 44 -97 137 -208 37 -44 78 -102
                91 -130 27 -58 108 -333 123 -419 39 -217 -34 -416 -214 -585 -74 -69 -126
                -98 -235 -132 -67 -21 -95 -24 -250 -24 -160 0 -180 2 -232 23 -124 50 -212
                138 -304 302 -230 412 -502 639 -854 712 -199 42 -464 8 -647 -83 -134 -66
                -260 -195 -333 -338 -53 -107 -61 -111 -188 -111 -112 0 -228 -22 -292 -55
                -87 -45 -394 -258 -455 -317 -93 -88 -135 -164 -246 -443 -92 -233 -151 -360
                -199 -430 -42 -62 -80 -142 -80 -169 0 -32 -45 -65 -62 -48 -9 9 -7 29 9 79
                30 97 35 134 34 258 -1 194 -43 308 -181 493 -94 126 -149 220 -196 336 -99
                243 -113 422 -56 747 49 283 44 521 -18 799 -48 218 -150 466 -261 635 -69
                105 -221 256 -334 330 -167 110 -376 189 -580 220 -92 14 -236 18 -310 8z"/>
              </g>
              <g id="alr-hallow-bat" transform="translate(0,773) scale(0.1,-0.1)">
                <path d="M12696 7694 c-129 -50 -301 -136 -546 -275 -365 -206 -505 -268 -705
                -314 -55 -13 -155 -42 -223 -64 -404 -135 -819 -197 -1135 -172 -250 20 -466
                75 -673 171 -74 34 -84 37 -79 20 7 -21 -9 -28 -20 -10 -15 24 -26 8 -20 -27
                13 -83 21 -418 13 -592 -17 -374 -85 -699 -212 -1003 -42 -103 -250 -521 -379
                -763 -268 -504 -537 -901 -799 -1179 l-84 -90 -54 18 c-78 25 -139 67 -213
                145 -81 86 -147 187 -287 436 -101 179 -185 315 -194 315 -2 0 0 -17 5 -37 4
                -21 6 -39 4 -41 -2 -2 -15 14 -30 35 -24 34 -26 35 -21 11 3 -14 10 -67 15
                -116 18 -173 -18 -305 -102 -377 -52 -44 -110 -62 -234 -71 -54 -3 -104 -11
                -110 -17 -7 -5 -13 -6 -13 -2 0 4 -31 -22 -69 -58 -39 -36 -86 -70 -106 -77
                -49 -16 -123 -7 -183 22 -60 29 -175 139 -261 247 -65 83 -66 83 -69 52 l-3
                -32 -19 23 c-19 23 -19 23 -19 -57 -1 -100 16 -218 73 -510 64 -329 70 -375
                70 -520 0 -155 -20 -221 -83 -278 -39 -35 -39 -35 -167 -42 -480 -28 -1026 81
                -1719 342 -446 168 -898 469 -1544 1027 -74 64 -139 116 -143 116 -4 0 -8 -7
                -8 -16 0 -10 -6 -13 -18 -10 -14 5 -22 -7 -41 -57 -42 -111 -147 -319 -228
                -452 -211 -348 -473 -650 -943 -1090 -113 -105 -244 -223 -292 -262 -171 -140
                -498 -372 -713 -507 l-81 -51 346 0 c397 0 515 -12 765 -75 273 -68 483 -167
                702 -326 63 -47 77 -63 114 -134 49 -94 124 -182 182 -211 130 -67 277 -21
                600 184 181 115 279 169 342 186 67 17 294 41 400 41 505 -1 942 -294 1170
                -786 90 -193 107 -224 145 -258 50 -45 93 -53 166 -30 91 28 167 86 348 263
                277 270 344 320 455 331 36 4 105 19 153 33 132 39 247 58 408 64 557 22 1122
                -216 1632 -688 91 -84 98 -89 98 -63 0 25 1 26 18 11 17 -16 18 -9 30 141 21
                273 77 478 197 720 173 347 409 630 850 1017 50 44 101 93 115 110 68 87 144
                120 369 160 368 66 435 158 335 458 l-27 80 6 291 c6 315 25 496 73 714 77
                343 215 628 391 807 146 149 260 251 310 278 61 32 162 59 328 88 248 42 383
                109 451 224 35 60 61 176 68 298 5 97 11 120 60 256 204 560 491 1075 1043
                1870 63 90 113 165 111 166 -2 2 -43 -12 -92 -31z"/>
              </g>
            </defs>

            <rect class="alr-banner-bg" x="0" y="0" width="680" height="220" fill="#0f0e0b" />

            <line x1="0" y1="30"  x2="680" y2="30"  stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="0" y1="60"  x2="680" y2="60"  stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="0" y1="90"  x2="680" y2="90"  stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="0" y1="120" x2="680" y2="120" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="0" y1="150" x2="680" y2="150" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="0" y1="180" x2="680" y2="180" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />

            <line x1="68"  y1="0" x2="68"  y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="136" y1="0" x2="136" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="204" y1="0" x2="204" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="272" y1="0" x2="272" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="340" y1="0" x2="340" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="408" y1="0" x2="408" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="476" y1="0" x2="476" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="544" y1="0" x2="544" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="612" y1="0" x2="612" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />

            <rect x="2"   y="32"  width="64" height="26" fill="#cc785c" opacity="0.05" />
            <rect x="70"  y="2"   width="64" height="26" fill="#cc785c" opacity="0.04" />
            <rect x="70"  y="32"  width="64" height="26" fill="#cc785c" opacity="0.07" />
            <rect x="138" y="2"   width="64" height="26" fill="#cc785c" opacity="0.05" />
            <rect x="138" y="62"  width="64" height="26" fill="#cc785c" opacity="0.05" />
            <rect x="2"   y="92"  width="64" height="26" fill="#cc785c" opacity="0.04" />
            <rect x="70"  y="92"  width="64" height="26" fill="#cc785c" opacity="0.06" />
            <rect x="2"   y="122" width="64" height="26" fill="#cc785c" opacity="0.03" />
            <rect x="138" y="152" width="64" height="26" fill="#cc785c" opacity="0.04" />
            <rect x="2"   y="182" width="64" height="26" fill="#cc785c" opacity="0.05" />
            <rect x="70"  y="182" width="64" height="26" fill="#cc785c" opacity="0.03" />

            <circle cx="360" cy="18"  r="1.5" fill="#cc785c" opacity="0.30" />
            <circle cx="380" cy="45"  r="1"   fill="#cc785c" opacity="0.20" />
            <circle cx="355" cy="72"  r="2"   fill="#cc785c" opacity="0.15" />
            <circle cx="390" cy="98"  r="1.5" fill="#cc785c" opacity="0.25" />
            <circle cx="370" cy="130" r="1"   fill="#cc785c" opacity="0.18" />
            <circle cx="420" cy="22"  r="1.5" fill="#cc785c" opacity="0.12" />
            <circle cx="440" cy="58"  r="1"   fill="#cc785c" opacity="0.10" />
            <circle cx="460" cy="88"  r="2"   fill="#cc785c" opacity="0.08" />
            <circle cx="415" cy="115" r="1"   fill="#cc785c" opacity="0.12" />
            <circle cx="450" cy="175" r="1.5" fill="#cc785c" opacity="0.09" />
            <circle cx="332" cy="24"  r="1"   fill="#cc785c" opacity="0.14" />
            <circle cx="402" cy="34"  r="1"   fill="#cc785c" opacity="0.15" />
            <circle cx="472" cy="30"  r="1"   fill="#cc785c" opacity="0.10" />
            <circle cx="478" cy="66"  r="1.1" fill="#cc785c" opacity="0.09" />
            <circle cx="472" cy="104" r="1"   fill="#cc785c" opacity="0.08" />
            <circle cx="482" cy="168" r="1.1" fill="#cc785c" opacity="0.09" />

            <line
              class="alr-banner-scanline"
              x1="320" y1="0" x2="338" y2="220"
              stroke="#cc785c" stroke-width="0.8" opacity="0.35"
              stroke-dasharray="6 4"
            />

            {/* ── Hallow Cycle seasonal layer — hidden except the week of Halloween (Oct 25–31), toggled by the script below ── */}
            <g class="alr-hallow-glow" transform="translate(423,32)">
              <ellipse cx="60" cy="150" rx="55" ry="15" class="alr-hallow-glow-fill" opacity="0.12" />
              <use href="#alr-hallow-pumpkin" class="alr-hallow-glow-fill" transform="scale(0.098)" />
            </g>
            <g class="alr-hallow-bat" transform="translate(128,32)"><use href="#alr-hallow-bat" class="alr-hallow-bat-fill" transform="scale(0.012)" opacity="0.5" /></g>
            <g class="alr-hallow-bat alr-hallow-bat-b" transform="translate(222,82)"><use href="#alr-hallow-bat" class="alr-hallow-bat-fill" transform="scale(0.0075)" opacity="0.4" /></g>
            <g class="alr-hallow-bat alr-hallow-bat-c" transform="translate(552,40)"><use href="#alr-hallow-bat" class="alr-hallow-bat-fill" transform="scale(0.0095)" opacity="0.45" /></g>
            <g class="alr-hallow-bat alr-hallow-bat-d" transform="translate(294,24)"><use href="#alr-hallow-bat" class="alr-hallow-bat-fill" transform="scale(0.006)" opacity="0.35" /></g>
            <g class="alr-hallow-bat alr-hallow-bat-e" transform="translate(592,102)"><use href="#alr-hallow-bat" class="alr-hallow-bat-fill" transform="scale(0.0068)" opacity="0.4" /></g>
            <g class="alr-hallow-bat alr-hallow-bat-b" transform="translate(360,16)"><use href="#alr-hallow-bat" class="alr-hallow-bat-fill" transform="scale(0.009)" opacity="0.5" /></g>
            <g class="alr-hallow-bat alr-hallow-bat-d" transform="translate(630,50)"><use href="#alr-hallow-bat" class="alr-hallow-bat-fill" transform="scale(0.0105)" opacity="0.45" /></g>
            <g class="alr-hallow-watermark" opacity="0.12">
              <use href="#alr-hallow-pumpkin" class="alr-home-hero-logo" transform="translate(392,6) scale(0.108)" />
            </g>

            <g class="alr-home-hero-logo-wrap" transform="translate(345, 10) scale(0.4)" opacity="0.12">
              <path
                class="alr-home-hero-logo"
                d="M 531.0 468.5 L 384.0 467.5 L 283.0 400.5 L 271.0 403.5 L 184.0 463.5 L 172.0 468.5 L 26.0 468.5 L 14.5 461.0 L 11.5 454.0 L 14.5 439.0 L 250.5 39.0 L 269.0 13.5 L 285.0 11.5 L 298.5 24.0 L 542.5 438.0 L 545.5 446.0 L 544.5 458.0 L 531.0 468.5 Z M 448.5 429.0 L 480.0 428.5 L 484.5 425.0 L 484.5 419.0 L 287.5 85.0 L 282.0 78.5 L 276.0 78.5 L 77.5 411.0 L 73.5 425.0 L 78.0 428.5 L 96.0 429.5 L 159.0 428.5 L 237.5 376.0 L 237.5 371.0 L 232.0 365.5 L 175.0 328.5 L 170.5 324.0 L 169.5 317.0 L 262.5 155.0 L 271.0 145.5 L 283.0 143.5 L 293.5 151.0 L 389.5 316.0 L 388.5 323.0 L 382.0 329.5 L 325.0 366.5 L 321.5 370.0 L 322.5 377.0 L 395.0 426.5 L 409.0 429.5 L 448.5 429.0 Z M 283.5 345.0 L 332.0 311.5 L 335.5 303.0 L 284.5 217.0 L 276.0 215.5 L 222.5 308.0 L 274.0 344.5 L 283.5 345.0 Z"
                fill="#cc785c"
                fill-rule="evenodd"
              />
            </g>

            <rect class="alr-banner-vignette" x="0" y="190" width="680" height="30" fill="#0f0e0b" opacity="0.5" />
          </svg>

          <script dangerouslySetInnerHTML={{ __html: `
(function() {
  function isHallowWeek() {
    var d = new Date();
    return d.getMonth() === 9 && d.getDate() >= 25 && d.getDate() <= 31;
  }
  function applyHallow() {
    document.body.classList.toggle('alr-hallow-active', isHallowWeek());
  }
  applyHallow();
  document.addEventListener('nav', applyHallow);
})();
          ` }} />

          <div class="alr-home-hero-overlay">
            <div class="alr-home-hero-left">
              <div class="alr-eyebrow">Archive of Lost Realities Initiative — Cycle {activeCycle}</div>
              <div class="alr-home-hero-title">What's Unwritten<br />is not empty.</div>
              <div class="alr-home-hero-sub">
                What remains when a reality collapses is not nothing.<br />
                Fragments persist. Echoes persist. We document what remains.
              </div>
              <div class="alr-home-hero-links">
                <a href="/Index/ECHO-Registry"          class="alr-home-hero-link">Echo Registry</a>
                <a href="/Index/Reality-Registry"        class="alr-home-hero-link">Reality Registry</a>
                <a href="/Foundations/ALR/ALR-Initiative" class="alr-home-hero-link-ghost">About the Initiative</a>
              </div>

              <div class="alr-home-hero-mstats">
                <div class="alr-home-hero-mstat"><div class="alr-home-hero-mstat-n">{echoes.length}</div><div class="alr-home-hero-mstat-l">Echoes</div></div>
                <div class="alr-home-hero-mstat"><div class="alr-home-hero-mstat-n">{realities.length}</div><div class="alr-home-hero-mstat-l">Realities</div></div>
                <div class="alr-home-hero-mstat"><div class="alr-home-hero-mstat-n">{activeCycle}</div><div class="alr-home-hero-mstat-l">Cycle</div></div>
                <div class="alr-home-hero-mstat"><div class="alr-home-hero-mstat-n">ALR-01</div><div class="alr-home-hero-mstat-l">Node</div></div>
              </div>
            </div>

            <div class="alr-home-hero-right">
              <div class="alr-home-status-card">
                <div class="alr-home-status-label">Echoes documented</div>
                <div class="alr-home-status-val">{echoes.length}</div>
                <div class="alr-home-status-sub">{echoes.length - terminalEchoes.length} active — {terminalEchoes.length} terminal</div>
              </div>
              <div class="alr-home-status-card">
                <div class="alr-home-status-label">Realities investigated</div>
                <div class="alr-home-status-val">{realities.length}</div>
                <div class="alr-home-status-sub">All RCC-1 Silent</div>
              </div>
              <div class="alr-home-status-card">
                <div class="alr-home-status-label">Terminal echoes (S4)</div>
                <div class="alr-home-status-val alr-red">{terminalEchoes.length}</div>
                <div class="alr-home-status-sub">Highest severity class</div>
              </div>
              <div class="alr-home-status-card">
                <div class="alr-home-status-label">Active cycle</div>
                <div class="alr-home-status-val alr-home-status-val-dim">{activeCycle}</div>
                <div class="alr-home-status-sub">Archive Operations</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURED ECHO ── */}
        <div class="alr-home-featured" id="alr-featured-echo">
          <div class="alr-home-featured-left">
            <div class="alr-home-featured-label">Featured Echo — Rotating Selection</div>
            <div class="alr-home-featured-title" id="alr-fe-title">—</div>
            <div class="alr-home-featured-desc" id="alr-fe-desc">Loading archive entry...</div>
            <div class="alr-home-featured-tags" id="alr-fe-tags"></div>
            <a href="#" id="alr-fe-link" class="alr-home-featured-btn">View full entry →</a>
          </div>
          <div class="alr-home-featured-img" id="alr-fe-img">
            <span class="alr-home-featured-badge" id="alr-fe-badge">—</span>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
(function() {
  var echoes = ${JSON.stringify(echoes.map(file => {
    const fm = (file.frontmatter ?? {}) as Record<string, unknown>
    return {
      id: String(fm.echo_id ?? ""),
      name: String(file.frontmatter?.title ?? "Unknown Echo"),
      slug: file.slug ?? "",
      ec: String(fm.ec ?? ""),
      esc: String(fm.esc ?? ""),
      desc: String(fm.description ?? fm.desc ?? ""),
      image: '/Images/' + String(fm.echo_id ?? "") + '.webp',
    }
  }))};

  var current = -1;

  function showEcho(idx) {
    var e = echoes[idx];
    if (!e) return;

    var title = document.getElementById('alr-fe-title');
    var desc = document.getElementById('alr-fe-desc');
    var tags = document.getElementById('alr-fe-tags');
    var link = document.getElementById('alr-fe-link');
    var img = document.getElementById('alr-fe-img');
    var badge = document.getElementById('alr-fe-badge');
    var wrap = document.getElementById('alr-featured-echo');

    if (!title || !desc || !tags || !link || !img || !badge || !wrap) return;

    wrap.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    wrap.style.opacity = '0';
    wrap.style.transform = 'translateX(-18px)';

    setTimeout(function() {
      title.textContent = e.name.startsWith(e.id) ? e.name : (e.id ? e.id + ' — ' : '') + e.name;
      desc.textContent = e.desc || 'An anomalous remnant recovered from a collapsed reality. Classification data preserved within the Archive.';
      link.href = '/' + e.slug;

      var ecKey = e.ec.split(' ')[0].toLowerCase();
      var escKey = e.esc.split(' ')[0].toLowerCase();
      tags.innerHTML = '';

      if (e.ec) {
        var ecSpan = document.createElement('span');
        ecSpan.className = 'alr-etag alr-et-' + ecKey;
        ecSpan.textContent = e.ec.split(' ')[0];
        tags.appendChild(ecSpan);
      }

      if (e.esc) {
        var escSpan = document.createElement('span');
        escSpan.className = 'alr-etag alr-es-' + escKey;
        escSpan.textContent = e.esc.split(' ')[0];
        tags.appendChild(escSpan);
      }

      badge.textContent = (e.id || 'ECHO') + ' — ' + (e.esc || 'Classified');

      if (e.image) {
        img.style.backgroundImage = 'url(' + e.image + ')';
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
      } else {
        img.style.backgroundImage = 'none';
      }

      wrap.style.transform = 'translateX(18px)';
      wrap.style.opacity = '0';

      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          wrap.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          wrap.style.opacity = '1';
          wrap.style.transform = 'translateX(0)';
        });
      });
    }, 260);
  }

  function next() {
    if (echoes.length === 0) return;
    current = (current + 1) % echoes.length;
    showEcho(current);
  }

  function init() {
    if (echoes.length === 0) return;
    current = Math.floor(Math.random() * echoes.length);
    showEcho(current);
    setInterval(next, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('nav', function() {
    if (window.location.pathname === '/' || window.location.pathname === '') {
      current = Math.floor(Math.random() * echoes.length);
      showEcho(current);
    }
  });
})();
        ` }} />

        {/* ── MAIN GRID ── */}
        <div class="alr-grid">
          <RecentEchoes {...props} />

          <div class="alr-card-stack">
            <RecentRealities {...props} />

            <div class="alr-card">
              <div class="alr-card-head">
                <span class="alr-card-head-title">Archive notices</span>
                <span class="alr-card-head-action">Cycle {activeCycle}</span>
              </div>
              <div class="alr-notice-row">
                <div class="alr-notice-dot" style={{ background: "#993c1d" }}></div>
                <div>
                  <div class="alr-notice-label" style={{ color: "#c45a3a" }}>S4 — Terminal review</div>
                  <div class="alr-notice-text">ECHO-003 stability review due. S4 classification confirmed.</div>
                  <div class="alr-notice-time">Cycle 7 — Archive Operations</div>
                </div>
              </div>
              <div class="alr-notice-row">
                <div class="alr-notice-dot" style={{ background: "#854f0b" }}></div>
                <div>
                  <div class="alr-notice-label" style={{ color: "#c49030" }}>S3 — Reclassification pending</div>
                  <div class="alr-notice-text">
                    ECHO-031 reclassification under review. Manifestation pattern shows increased frequency.
                  </div>
                  <div class="alr-notice-time">Cycle 7 — Echo Research Division</div>
                </div>
              </div>
              <div class="alr-notice-row">
                <div class="alr-notice-dot" style={{ background: "#3c3489" }}></div>
                <div>
                  <div class="alr-notice-label" style={{ color: "#6898c8" }}>Field — Transfer complete</div>
                  <div class="alr-notice-text">
                    R-019 field documentation complete. Entry transferred to Archive Operations.
                  </div>
                  <div class="alr-notice-time">Cycle 6 — Reality Investigation Division</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PERSONNEL ── */}
        <div class="alr-card alr-card-full">
          <div class="alr-card-head">
            <span class="alr-card-head-title">Active personnel — Cycle {activeCycle}</span>
          </div>
          <div class="alr-personnel">
            <div class="alr-person"><div class="alr-avatar alr-av-inv">EM</div><div><div class="alr-person-name">E. Maren</div><div class="alr-person-div">Reality Investigation</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-res">VA</div><div><div class="alr-person-name">V. Arend</div><div class="alr-person-div">Echo Research</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-ops">MV</div><div><div class="alr-person-name">M. Voss</div><div class="alr-person-div">Archive Operations</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-dev">KA</div><div><div class="alr-person-name">K. Albrecht</div><div class="alr-person-div">Device Development</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-inv">JC</div><div><div class="alr-person-name">J. Calloway</div><div class="alr-person-div">Reality Investigation</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-res">NO</div><div><div class="alr-person-name">N. Ossic</div><div class="alr-person-div">Echo Research</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-ops">LD</div><div><div class="alr-person-name">L. Dray</div><div class="alr-person-div">Archive Operations</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-dev">DT</div><div><div class="alr-person-name">D. Tessir</div><div class="alr-person-div">Device Development</div></div></div>
          </div>
        </div>

        {/* ── DIRECTOR'S LOG — original long-form editorial content, deliberately placed
             immediately before the ad row so the ad sits beside substantive writing
             rather than only navigation/list widgets ── */}
        <div class="alr-card alr-card-full alr-home-directorlog">
          <div class="alr-card-head">
            <span class="alr-card-head-title">From the Office of the Director — Cycle {activeCycle}</span>
          </div>
          <div class="alr-directorlog-body">
            <p>
              Seven cycles into sustained operation, the Archive holds {echoes.length} confirmed Echoes and {realities.length} fully investigated
              realities — modest totals against the scale of what the Unwritten has produced, and a number I do not expect to grow
              quickly. Confirmation is slow work. Every entry in this catalog survived a process built specifically to reject
              anything that could be explained another way.
            </p>
            <p>
              This cycle's correspondence has been dominated by ECHO-003. The entity has held a stable classification since its
              filing, paired from the beginning with ECHO-002 as a linked entry, and its scheduled S4 review is now the
              most-discussed item on the Directorate's desk. Reviews of this kind are not procedural formalities. An S4
              reclassification changes who is permitted near an anomaly, how it is documented, and in several cases, whether
              documentation continues at all. I have read every field note submitted on ECHO-003 this cycle. I do not have
              anything reassuring to add to them.
            </p>
            <p>
              R-031's collapse field continues to produce recoverable material well past the point Reality Investigation
              projected it would go quiet. The Still Ones are the fourth class of remnant catalogued from that site alone.
              Whatever the reality was before it ended, it does not appear to be finished ending.
            </p>
            <p>
              Elsewhere, R-019's field documentation closed out clean and was transferred to Archive Operations without
              incident — the kind of entry that does not generate discussion, and is exactly as valuable to this catalog as
              the ones that do.
            </p>
            <p>
              None of this is offered as reassurance. The Archive does not exist to reassure anyone, including the people
              who staff it. It exists so that what has been observed is not lost twice — once to whatever ended it, and
              again to the absence of a record. That is the whole of the mandate, and it has not changed since Cycle 1.
            </p>
            <div class="alr-directorlog-sig">— Office of the Director</div>
          </div>
        </div>

        {/* ── DISPATCH CARD (sticky-note field notes + shop promo) + AD ── */}
        <div class="alr-home-ad-row">
          <div class="alr-home-dispatch">
            <div class="alr-home-dispatch-pin"></div>
            <div class="alr-home-dispatch-eyebrow">Archive Field Note — Cycle {activeCycle}</div>
            <div class="alr-home-dispatch-quote" id="alr-home-dispatch-quote">{dispatchQuotes[0].text}</div>
            <div class="alr-home-dispatch-attr" id="alr-home-dispatch-attr">— {dispatchQuotes[0].attr}</div>

            <div class="alr-home-dispatch-shop">
              <span>Field equipment &amp; archive materials support ongoing operations.</span>
              <a href="/Shop" class="internal">Browse the Shop →</a>
            </div>

            <script dangerouslySetInnerHTML={{ __html: `
(function() {
  var quotes = ${JSON.stringify(dispatchQuotes)};
  var current = -1;

  function showQuote(idx) {
    var q = quotes[idx];
    var quoteEl = document.getElementById('alr-home-dispatch-quote');
    var attrEl = document.getElementById('alr-home-dispatch-attr');
    if (!q || !quoteEl || !attrEl) return;
    quoteEl.textContent = q.text;
    attrEl.textContent = '— ' + q.attr;
  }

  function next() {
    current = (current + 1) % quotes.length;
    showQuote(current);
  }

  function init() {
    current = Math.floor(Math.random() * quotes.length);
    showQuote(current);
    setInterval(next, 20000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('nav', function() {
    if (window.location.pathname === '/' || window.location.pathname === '') {
      current = Math.floor(Math.random() * quotes.length);
      showQuote(current);
    }
  });
})();
            ` }} />
          </div>

          <div class="alr-home-ad-wrap">
            <div class="alr-home-ad-head">
              <span class="alr-home-ad-label">Sponsored • External Signal</span>
            </div>
            <div class="alr-home-ad-box">
              <ins
                class="adsbygoogle"
                style="display:inline-block;width:300px;height:250px"
                data-ad-client="ca-pub-1009528022941792"
                data-ad-slot="6380168218"
              ></ins>
              <script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).push({});` }} />
            </div>
            <div class="alr-home-ad-foot">Archive Initiative — Index Stable</div>
          </div>
        </div>

      </div>
    </>
  )
}

ALRHomeDashboard.displayName = "ALRHomeDashboard"
export default (() => ALRHomeDashboard) satisfies QuartzComponentConstructor