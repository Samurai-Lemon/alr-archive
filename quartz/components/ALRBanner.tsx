import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRBanner: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <svg
      class="alr-banner-svg"
      width="100%"
      viewBox="0 0 680 180"
      xmlns="http://www.w3.org/2000/svg"
      style="display:block;margin-bottom:20px;"
    >
      <defs>
        <clipPath id="bc2">
          <rect x="0" y="0" width="680" height="180" />
        </clipPath>
      </defs>

      <g clip-path="url(#bc2)">
        <rect class="alr-banner-bg" x="0" y="0" width="680" height="180" fill="#0f0e0b" />

        <line x1="0" y1="30" x2="680" y2="30" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="0" y1="60" x2="680" y2="60" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="0" y1="90" x2="680" y2="90" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="0" y1="120" x2="680" y2="120" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="0" y1="150" x2="680" y2="150" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />

        <line x1="68" y1="0" x2="68" y2="180" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="136" y1="0" x2="136" y2="180" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="204" y1="0" x2="204" y2="180" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="272" y1="0" x2="272" y2="180" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="340" y1="0" x2="340" y2="180" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="408" y1="0" x2="408" y2="180" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="476" y1="0" x2="476" y2="180" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="544" y1="0" x2="544" y2="180" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
        <line x1="612" y1="0" x2="612" y2="180" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />

        <rect x="2" y="32" width="64" height="26" fill="#cc785c" opacity="0.06" />
        <rect x="70" y="2" width="64" height="26" fill="#cc785c" opacity="0.04" />
        <rect x="70" y="32" width="64" height="26" fill="#cc785c" opacity="0.08" />
        <rect x="138" y="2" width="64" height="26" fill="#cc785c" opacity="0.05" />
        <rect x="138" y="62" width="64" height="26" fill="#cc785c" opacity="0.06" />
        <rect x="2" y="92" width="64" height="26" fill="#cc785c" opacity="0.05" />
        <rect x="70" y="92" width="64" height="26" fill="#cc785c" opacity="0.07" />
        <rect x="2" y="122" width="64" height="26" fill="#cc785c" opacity="0.04" />
        <rect x="138" y="122" width="64" height="26" fill="#cc785c" opacity="0.05" />
        <rect x="2" y="152" width="64" height="26" fill="#cc785c" opacity="0.06" />
        <rect x="70" y="152" width="64" height="26" fill="#cc785c" opacity="0.04" />
        <rect x="138" y="152" width="64" height="26" fill="#cc785c" opacity="0.07" />
        <rect x="206" y="2" width="64" height="26" fill="#cc785c" opacity="0.05" />
        <rect x="206" y="32" width="40" height="26" fill="#cc785c" opacity="0.04" />
        <rect x="274" y="2" width="30" height="26" fill="#cc785c" opacity="0.03" />
        <rect x="206" y="62" width="20" height="26" fill="#cc785c" opacity="0.03" />
        <rect x="274" y="32" width="64" height="12" fill="#cc785c" opacity="0.04" />
        <rect x="274" y="62" width="50" height="26" fill="#cc785c" opacity="0.03" />
        <rect x="206" y="92" width="64" height="10" fill="#cc785c" opacity="0.02" />
        <rect x="274" y="92" width="30" height="26" fill="#cc785c" opacity="0.02" />
        <rect x="274" y="152" width="20" height="26" fill="#cc785c" opacity="0.02" />

        {/* existing particles */}
        <circle cx="360" cy="18" r="1.5" fill="#cc785c" opacity="0.3" />
        <circle cx="380" cy="45" r="1" fill="#cc785c" opacity="0.2" />
        <circle cx="355" cy="72" r="2" fill="#cc785c" opacity="0.15" />
        <circle cx="390" cy="98" r="1.5" fill="#cc785c" opacity="0.25" />
        <circle cx="370" cy="130" r="1" fill="#cc785c" opacity="0.18" />
        <circle cx="420" cy="22" r="1.5" fill="#cc785c" opacity="0.12" />
        <circle cx="440" cy="58" r="1" fill="#cc785c" opacity="0.1" />
        <circle cx="460" cy="88" r="2" fill="#cc785c" opacity="0.08" />
        <circle cx="415" cy="115" r="1" fill="#cc785c" opacity="0.12" />
        <circle cx="450" cy="145" r="1.5" fill="#cc785c" opacity="0.09" />

        {/* extra particles */}
        <circle cx="332" cy="24" r="1" fill="#cc785c" opacity="0.14" />
        <circle cx="346" cy="38" r="1.2" fill="#cc785c" opacity="0.16" />
        <circle cx="402" cy="34" r="1" fill="#cc785c" opacity="0.15" />
        <circle cx="428" cy="44" r="1.2" fill="#cc785c" opacity="0.11" />
        <circle cx="472" cy="30" r="1" fill="#cc785c" opacity="0.1" />
        <circle cx="342" cy="58" r="1" fill="#cc785c" opacity="0.14" />
        <circle cx="406" cy="70" r="1.1" fill="#cc785c" opacity="0.11" />
        <circle cx="432" cy="78" r="0.9" fill="#cc785c" opacity="0.12" />
        <circle cx="478" cy="66" r="1.1" fill="#cc785c" opacity="0.09" />
        <circle cx="335" cy="92" r="1" fill="#cc785c" opacity="0.11" />
        <circle cx="364" cy="108" r="0.9" fill="#cc785c" opacity="0.13" />
        <circle cx="425" cy="96" r="1.1" fill="#cc785c" opacity="0.1" />
        <circle cx="472" cy="104" r="1" fill="#cc785c" opacity="0.08" />
        <circle cx="338" cy="124" r="1.1" fill="#cc785c" opacity="0.12" />
        <circle cx="398" cy="128" r="0.9" fill="#cc785c" opacity="0.14" />
        <circle cx="438" cy="132" r="1" fill="#cc785c" opacity="0.1" />
        <circle cx="482" cy="138" r="1.1" fill="#cc785c" opacity="0.09" />
        <circle cx="352" cy="150" r="1" fill="#cc785c" opacity="0.12" />
        <circle cx="410" cy="152" r="0.9" fill="#cc785c" opacity="0.11" />
        <circle cx="468" cy="156" r="1" fill="#cc785c" opacity="0.08" />

        <line
          class="alr-banner-scanline"
          x1="320"
          y1="0"
          x2="335"
          y2="180"
          stroke="#cc785c"
          stroke-width="0.8"
          opacity="0.4"
          stroke-dasharray="6 4"
        />

        <g transform="translate(483, 5) scale(0.354)" opacity="0.18">
          <path
            d="M 531.0 468.5 L 384.0 467.5 L 283.0 400.5 L 271.0 403.5 L 184.0 463.5 L 172.0 468.5 L 26.0 468.5 L 14.5 461.0 L 11.5 454.0 L 14.5 439.0 L 250.5 39.0 L 269.0 13.5 L 285.0 11.5 L 298.5 24.0 L 542.5 438.0 L 545.5 446.0 L 544.5 458.0 L 531.0 468.5 Z M 448.5 429.0 L 480.0 428.5 L 484.5 425.0 L 484.5 419.0 L 287.5 85.0 L 282.0 78.5 L 276.0 78.5 L 77.5 411.0 L 73.5 425.0 L 78.0 428.5 L 96.0 429.5 L 159.0 428.5 L 237.5 376.0 L 237.5 371.0 L 232.0 365.5 L 175.0 328.5 L 170.5 324.0 L 169.5 317.0 L 262.5 155.0 L 271.0 145.5 L 283.0 143.5 L 293.5 151.0 L 389.5 316.0 L 388.5 323.0 L 382.0 329.5 L 325.0 366.5 L 321.5 370.0 L 322.5 377.0 L 395.0 426.5 L 409.0 429.5 L 448.5 429.0 Z M 283.5 345.0 L 332.0 311.5 L 335.5 303.0 L 284.5 217.0 L 276.0 215.5 L 222.5 308.0 L 274.0 344.5 L 283.5 345.0 Z"
            fill="#cc785c"
            fill-rule="evenodd"
          />
        </g>

        <text
          class="alr-banner-eyebrow"
          x="40"
          y="84"
          font-family="Inter, sans-serif"
          font-size="11"
          font-weight="400"
          letter-spacing="0.18em"
          fill="#cc785c"
          opacity="1"
        >
          ARCHIVE OF LOST REALITIES INITIATIVE — CYCLE 7
        </text>

        <text
          class="alr-banner-title"
          x="40"
          y="112"
          font-family="Inter, sans-serif"
          font-size="26"
          font-weight="500"
          fill="#f0ece0"
          opacity="0.9"
        >
          What's Unwritten
        </text>

        <text
          class="alr-banner-title"
          x="40"
          y="140"
          font-family="Inter, sans-serif"
          font-size="26"
          font-weight="500"
          fill="#f0ece0"
          opacity="0.9"
        >
          is not empty.
        </text>

        <text
          class="alr-banner-status1"
          x="648"
          y="120"
          font-family="Inter, sans-serif"
          font-size="9"
          letter-spacing="0.12em"
          fill="#cc785c"
          opacity="0.35"
          text-anchor="end"
        >
          REALITY COLLAPSE DETECTED
        </text>

        <text
          class="alr-banner-status2"
          x="648"
          y="134"
          font-family="Inter, sans-serif"
          font-size="9"
          letter-spacing="0.12em"
          fill="#4a4840"
          opacity="0.5"
          text-anchor="end"
        >
          RCC-1 — SILENT COLLAPSE
        </text>

        <text
          class="alr-banner-status3"
          x="648"
          y="148"
          font-family="Inter, sans-serif"
          font-size="9"
          letter-spacing="0.12em"
          fill="#4a4840"
          opacity="0.3"
          text-anchor="end"
        >
          CYCLE 7 — ARCHIVE OPERATIONS
        </text>
      </g>
    </svg>
  )
}

ALRBanner.displayName = "ALRBanner"
export default (() => ALRBanner) satisfies QuartzComponentConstructor