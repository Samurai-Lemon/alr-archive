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
      </defs>

      <g clip-path="url(#ordo-bc)">
        <rect x="0" y="0" width="680" height="180" fill="#0a0806" />

        <line x1="0" y1="30" x2="680" y2="30" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="0" y1="60" x2="680" y2="60" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="0" y1="90" x2="680" y2="90" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="0" y1="120" x2="680" y2="120" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="0" y1="150" x2="680" y2="150" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />

        <line x1="68" y1="0" x2="68" y2="180" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="136" y1="0" x2="136" y2="180" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="204" y1="0" x2="204" y2="180" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="272" y1="0" x2="272" y2="180" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="340" y1="0" x2="340" y2="180" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="408" y1="0" x2="408" y2="180" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="476" y1="0" x2="476" y2="180" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="544" y1="0" x2="544" y2="180" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />
        <line x1="612" y1="0" x2="612" y2="180" stroke="#8a3020" stroke-width="0.3" opacity="0.15" />

        <rect x="2" y="32" width="64" height="26" fill="#8a3020" opacity="0.05" />
        <rect x="70" y="2" width="64" height="26" fill="#8a3020" opacity="0.04" />
        <rect x="70" y="32" width="64" height="26" fill="#8a3020" opacity="0.07" />
        <rect x="138" y="2" width="64" height="26" fill="#8a3020" opacity="0.04" />
        <rect x="138" y="62" width="64" height="26" fill="#8a3020" opacity="0.05" />
        <rect x="2" y="92" width="64" height="26" fill="#8a3020" opacity="0.04" />
        <rect x="70" y="92" width="64" height="26" fill="#8a3020" opacity="0.06" />
        <rect x="2" y="122" width="64" height="26" fill="#8a3020" opacity="0.03" />
        <rect x="138" y="122" width="64" height="26" fill="#8a3020" opacity="0.04" />
        <rect x="2" y="152" width="64" height="26" fill="#8a3020" opacity="0.05" />
        <rect x="70" y="152" width="64" height="26" fill="#8a3020" opacity="0.04" />
        <rect x="138" y="152" width="64" height="26" fill="#8a3020" opacity="0.06" />

        <circle cx="360" cy="18" r="1.5" fill="#8a3020" opacity="0.3" />
        <circle cx="380" cy="45" r="1" fill="#8a3020" opacity="0.2" />
        <circle cx="355" cy="72" r="2" fill="#8a3020" opacity="0.15" />
        <circle cx="390" cy="98" r="1.5" fill="#8a3020" opacity="0.25" />
        <circle cx="370" cy="130" r="1" fill="#8a3020" opacity="0.18" />
        <circle cx="420" cy="22" r="1.5" fill="#8a3020" opacity="0.12" />
        <circle cx="440" cy="58" r="1" fill="#8a3020" opacity="0.1" />
        <circle cx="460" cy="88" r="2" fill="#8a3020" opacity="0.08" />
        <circle cx="415" cy="115" r="1" fill="#8a3020" opacity="0.12" />
        <circle cx="450" cy="145" r="1.5" fill="#8a3020" opacity="0.09" />
        <circle cx="332" cy="24" r="1" fill="#8a3020" opacity="0.14" />
        <circle cx="346" cy="38" r="1.2" fill="#8a3020" opacity="0.16" />
        <circle cx="402" cy="34" r="1" fill="#8a3020" opacity="0.15" />
        <circle cx="428" cy="44" r="1.2" fill="#8a3020" opacity="0.11" />
        <circle cx="472" cy="30" r="1" fill="#8a3020" opacity="0.1" />
        <circle cx="342" cy="58" r="1" fill="#8a3020" opacity="0.14" />
        <circle cx="406" cy="70" r="1.1" fill="#8a3020" opacity="0.11" />
        <circle cx="432" cy="78" r="0.9" fill="#8a3020" opacity="0.12" />
        <circle cx="478" cy="66" r="1.1" fill="#8a3020" opacity="0.09" />
        <circle cx="335" cy="92" r="1" fill="#8a3020" opacity="0.11" />
        <circle cx="364" cy="108" r="0.9" fill="#8a3020" opacity="0.13" />
        <circle cx="425" cy="96" r="1.1" fill="#8a3020" opacity="0.1" />
        <circle cx="472" cy="104" r="1" fill="#8a3020" opacity="0.08" />
        <circle cx="338" cy="124" r="1.1" fill="#8a3020" opacity="0.12" />
        <circle cx="398" cy="128" r="0.9" fill="#8a3020" opacity="0.14" />
        <circle cx="438" cy="132" r="1" fill="#8a3020" opacity="0.1" />
        <circle cx="482" cy="138" r="1.1" fill="#8a3020" opacity="0.09" />
        <circle cx="352" cy="150" r="1" fill="#8a3020" opacity="0.12" />
        <circle cx="410" cy="152" r="0.9" fill="#8a3020" opacity="0.11" />
        <circle cx="468" cy="156" r="1" fill="#8a3020" opacity="0.08" />

        <line
          x1="320" y1="0" x2="335" y2="180"
          stroke="#8a3020" stroke-width="0.8" opacity="0.35"
          stroke-dasharray="6 4"
        />

        <text
          x="40" y="82"
          font-family="Inter, sans-serif"
          font-size="11"
          font-weight="400"
          letter-spacing="3"
          fill="#8a3020"
          opacity="0.7"
        >
          ORDO DAMNATIO MEMORIAE
        </text>

        <text
          x="40" y="112"
          font-family="Inter, sans-serif"
          font-size="28"
          font-weight="500"
          fill="#d8c8a8"
          opacity="0.9"
        >
          Memoria damnata
        </text>

        <text
          x="40" y="132"
          font-family="Inter, sans-serif"
          font-size="13"
          font-style="italic"
          fill="#6a4a30"
          opacity="0.8"
        >
          existentia negata.
        </text>

        <text
          x="648" y="120"
          font-family="Inter, sans-serif"
          font-size="9"
          letter-spacing="2"
          fill="#8a3020"
          opacity="0.35"
          text-anchor="end"
        >
          ADVERSARIAL ENTITY
        </text>

        <text
          x="648" y="134"
          font-family="Inter, sans-serif"
          font-size="9"
          letter-spacing="2"
          fill="#4a3020"
          opacity="0.5"
          text-anchor="end"
        >
          ODM-001 — ACTIVE
        </text>

        <text
          x="648" y="148"
          font-family="Inter, sans-serif"
          font-size="9"
          letter-spacing="2"
          fill="#4a3020"
          opacity="0.3"
          text-anchor="end"
        >
          INTEL FRAGMENTED
        </text>
      </g>
    </svg>
  )
}

OrdoBanner.displayName = "OrdoBanner"
export default (() => OrdoBanner) satisfies QuartzComponentConstructor