import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const OrdoBanner: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <svg
      class="ordo-banner-svg"
      width="100%"
      viewBox="0 0 680 180"
      xmlns="http://www.w3.org/2000/svg"
      style="display:block;margin-bottom:20px;"
    >
      <defs>
        <clipPath id="ordo-bc">
          <rect x="0" y="0" width="680" height="180" />
        </clipPath>
        <radialGradient id="ordo-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#c0281a" stop-opacity="0.07" />
          <stop offset="100%" stop-color="#050202" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="ordo-grey" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#3a3028" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#050202" stop-opacity="0" />
        </radialGradient>
      </defs>

      <g clip-path="url(#ordo-bc)">

        <rect x="0" y="0" width="680" height="180" fill="#080402" />
        <rect x="0" y="0" width="680" height="180" fill="url(#ordo-center)" />
        <rect x="0" y="0" width="680" height="180" fill="url(#ordo-grey)" />

        <circle cx="340" cy="90" r="155" fill="none" stroke="#2a1808" stroke-width="0.5" opacity="0.6" />
        <circle cx="340" cy="90" r="120" fill="none" stroke="#2a1808" stroke-width="0.4" opacity="0.5" />
        <circle cx="340" cy="90" r="85"  fill="none" stroke="#3a2010" stroke-width="0.4" opacity="0.5" />
        <circle cx="340" cy="90" r="50"  fill="none" stroke="#3a2010" stroke-width="0.3" opacity="0.4" />

        <line x1="0" y1="0" x2="680" y2="180" stroke="#1e1410" stroke-width="0.5" opacity="0.5" />
        <line x1="680" y1="0" x2="0" y2="180" stroke="#1e1410" stroke-width="0.5" opacity="0.5" />

        <rect x="0" y="0" width="680" height="2" fill="#8b1e0e" opacity="0.95" />
        <rect x="0" y="178" width="680" height="2" fill="#3a1008" opacity="0.7" />

        <line x1="0"   y1="50" x2="290" y2="50" stroke="#8b1e0e" stroke-width="0.5" opacity="0.35" />
        <line x1="390" y1="50" x2="680" y2="50" stroke="#8b1e0e" stroke-width="0.5" opacity="0.35" />
        <line x1="0"   y1="130" x2="290" y2="130" stroke="#8b1e0e" stroke-width="0.5" opacity="0.35" />
        <line x1="390" y1="130" x2="680" y2="130" stroke="#8b1e0e" stroke-width="0.5" opacity="0.35" />

        <line x1="0"   y1="90" x2="240" y2="90" stroke="#3a3028" stroke-width="0.4" opacity="0.4" />
        <line x1="440" y1="90" x2="680" y2="90" stroke="#3a3028" stroke-width="0.4" opacity="0.4" />

        <line x1="40" y1="0"   x2="40" y2="68"  stroke="#2a1008" stroke-width="0.5" opacity="0.8" />
        <line x1="40" y1="112" x2="40" y2="180" stroke="#2a1008" stroke-width="0.5" opacity="0.8" />
        <line x1="640" y1="0"   x2="640" y2="68"  stroke="#2a1008" stroke-width="0.5" opacity="0.8" />
        <line x1="640" y1="112" x2="640" y2="180" stroke="#2a1008" stroke-width="0.5" opacity="0.8" />

        <polyline points="18,18 18,40 40,40"       fill="none" stroke="#5a1808" stroke-width="0.8" />
        <polyline points="662,18 662,40 640,40"    fill="none" stroke="#5a1808" stroke-width="0.8" />
        <polyline points="18,162 18,140 40,140"    fill="none" stroke="#5a1808" stroke-width="0.8" />
        <polyline points="662,162 662,140 640,140" fill="none" stroke="#5a1808" stroke-width="0.8" />

        <line x1="100" y1="46" x2="100" y2="50" stroke="#3a1008" stroke-width="0.6" />
        <line x1="170" y1="46" x2="170" y2="50" stroke="#3a1008" stroke-width="0.6" />
        <line x1="240" y1="46" x2="240" y2="50" stroke="#3a1008" stroke-width="0.6" />
        <line x1="440" y1="46" x2="440" y2="50" stroke="#3a1008" stroke-width="0.6" />
        <line x1="510" y1="46" x2="510" y2="50" stroke="#3a1008" stroke-width="0.6" />
        <line x1="580" y1="46" x2="580" y2="50" stroke="#3a1008" stroke-width="0.6" />
        <line x1="100" y1="130" x2="100" y2="134" stroke="#3a1008" stroke-width="0.6" />
        <line x1="170" y1="130" x2="170" y2="134" stroke="#3a1008" stroke-width="0.6" />
        <line x1="240" y1="130" x2="240" y2="134" stroke="#3a1008" stroke-width="0.6" />
        <line x1="440" y1="130" x2="440" y2="134" stroke="#3a1008" stroke-width="0.6" />
        <line x1="510" y1="130" x2="510" y2="134" stroke="#3a1008" stroke-width="0.6" />
        <line x1="580" y1="130" x2="580" y2="134" stroke="#3a1008" stroke-width="0.6" />

        <line x1="318" y1="80"  x2="362" y2="80"  stroke="#8b1e0e" stroke-width="0.6" opacity="0.45" />
        <line x1="318" y1="100" x2="362" y2="100" stroke="#8b1e0e" stroke-width="0.6" opacity="0.45" />
        <line x1="328" y1="70"  x2="328" y2="110" stroke="#8b1e0e" stroke-width="0.6" opacity="0.45" />
        <line x1="352" y1="70"  x2="352" y2="110" stroke="#8b1e0e" stroke-width="0.6" opacity="0.45" />
        <rect x="338" y="88" width="4" height="4" fill="#c0281a" opacity="0.9" />

        <circle cx="360" cy="22"  r="1.5" fill="#8b1e0e" opacity="0.3" />
        <circle cx="390" cy="40"  r="1"   fill="#8b1e0e" opacity="0.2" />
        <circle cx="410" cy="62"  r="1.5" fill="#8b1e0e" opacity="0.18" />
        <circle cx="380" cy="80"  r="1"   fill="#8b1e0e" opacity="0.22" />
        <circle cx="420" cy="100" r="1.5" fill="#8b1e0e" opacity="0.15" />
        <circle cx="395" cy="122" r="1"   fill="#8b1e0e" opacity="0.18" />
        <circle cx="370" cy="145" r="1.5" fill="#8b1e0e" opacity="0.14" />
        <circle cx="435" cy="35"  r="1"   fill="#8b1e0e" opacity="0.12" />
        <circle cx="450" cy="75"  r="1.2" fill="#8b1e0e" opacity="0.1" />
        <circle cx="445" cy="115" r="1"   fill="#8b1e0e" opacity="0.12" />
        <circle cx="430" cy="155" r="1"   fill="#8b1e0e" opacity="0.1" />

        <text x="52" y="34" font-family="'Courier Prime', monospace" font-size="6.5" font-weight="700" fill="#5a2010" letter-spacing="2">THREAT FILE · ODM-001</text>
        <text x="52" y="44" font-family="'Courier Prime', monospace" font-size="6" fill="#321008" letter-spacing="1.5">ORIGIN UNKNOWN — PRE-ALR</text>
        <text x="52" y="144" font-family="'Courier Prime', monospace" font-size="6" fill="#321008" letter-spacing="1.5">STATUS · ACTIVE — UNCONFIRMED</text>
        <text x="52" y="154" font-family="'Courier Prime', monospace" font-size="6" fill="#281008" letter-spacing="1.5">INTEL · FRAGMENTED · CYCLE 7</text>
        <text x="628" y="34" font-family="'Courier Prime', monospace" font-size="6.5" font-weight="700" fill="#5a2010" letter-spacing="2" text-anchor="end">RESTRICTED</text>
        <text x="628" y="44" font-family="'Courier Prime', monospace" font-size="6" fill="#321008" letter-spacing="1.5" text-anchor="end">ALR DIRECTORATE ONLY</text>
        <text x="628" y="144" font-family="'Courier Prime', monospace" font-size="6" fill="#321008" letter-spacing="1.5" text-anchor="end">THREAT LEVEL · SEVERE</text>
        <text x="628" y="154" font-family="'Courier Prime', monospace" font-size="6" fill="#281008" letter-spacing="1.5" text-anchor="end">ALR INITIATIVE</text>

        <text x="340" y="70" font-family="'Courier Prime', monospace" font-size="7" font-weight="700" fill="#7a1810" letter-spacing="4" text-anchor="middle">ORDO DAMNATIO MEMORIAE</text>
        <text x="340" y="108" font-family="'IM Fell English', serif" font-size="36" font-weight="400" fill="#ede0c8" letter-spacing="1" text-anchor="middle" opacity="0.95">Memoria damnata</text>
        <text x="340" y="124" font-family="'IM Fell English', serif" font-size="14" font-style="italic" fill="#7a1810" letter-spacing="0.5" text-anchor="middle">existentia negata.</text>
        <text x="340" y="166" font-family="'Courier Prime', monospace" font-size="6" fill="#200a04" letter-spacing="4" text-anchor="middle">██████ ██ ██ ██████</text>

      </g>
    </svg>
  )
}

OrdoBanner.displayName = "OrdoBanner"
export default (() => OrdoBanner) satisfies QuartzComponentConstructor