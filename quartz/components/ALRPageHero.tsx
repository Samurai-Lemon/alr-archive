import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const typeLabels: Record<string, string> = {
  organization: "Organization",
  reality: "Reality Investigation Report",
  echo: "Echo",
  device: "Device",
  system: "System",
  protocol: "Protocol",
  index: "Index",
}

const ALRPageHero: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>
  const title = String(fm.title ?? fileData.slug ?? "")
  const type = String(fm.type ?? "")
  const typeLabel = typeLabels[type] ?? ""

  return (
    <div class="alr-page-hero">
      <div class="alr-page-hero-banner">
        <svg
          class="alr-page-hero-svg"
          width="100%"
          viewBox="0 0 680 180"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <clipPath id="phbc">
              <rect x="0" y="0" width="680" height="180" />
            </clipPath>
          </defs>
          <g clip-path="url(#phbc)">
            <rect x="0" y="0" width="680" height="180" fill="#0f0e0b" />
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
            <g transform="translate(483, 5) scale(0.354)" opacity="0.18">
              <path
                d="M 531.0 468.5 L 384.0 467.5 L 283.0 400.5 L 271.0 403.5 L 184.0 463.5 L 172.0 468.5 L 26.0 468.5 L 14.5 461.0 L 11.5 454.0 L 14.5 439.0 L 250.5 39.0 L 269.0 13.5 L 285.0 11.5 L 298.5 24.0 L 542.5 438.0 L 545.5 446.0 L 544.5 458.0 L 531.0 468.5 Z M 448.5 429.0 L 480.0 428.5 L 484.5 425.0 L 484.5 419.0 L 287.5 85.0 L 282.0 78.5 L 276.0 78.5 L 77.5 411.0 L 73.5 425.0 L 78.0 428.5 L 96.0 429.5 L 159.0 428.5 L 237.5 376.0 L 237.5 371.0 L 232.0 365.5 L 175.0 328.5 L 170.5 324.0 L 169.5 317.0 L 262.5 155.0 L 271.0 145.5 L 283.0 143.5 L 293.5 151.0 L 389.5 316.0 L 388.5 323.0 L 382.0 329.5 L 325.0 366.5 L 321.5 370.0 L 322.5 377.0 L 395.0 426.5 L 409.0 429.5 L 448.5 429.0 Z M 283.5 345.0 L 332.0 311.5 L 335.5 303.0 L 284.5 217.0 L 276.0 215.5 L 222.5 308.0 L 274.0 344.5 L 283.5 345.0 Z"
                fill="#cc785c"
                fill-rule="evenodd"
              />
            </g>
          </g>
        </svg>
      </div>

      <div class="alr-page-hero-overlay">
        {typeLabel && (
          <div class="alr-page-hero-eyebrow">{typeLabel}</div>
        )}
        <div class="alr-page-hero-title">{title}</div>
      </div>
    </div>
  )
}

ALRPageHero.css = `
.alr-page-hero {
  position: relative;
  width: calc(100% + 64px);
  margin-left: -32px;
  margin-right: -32px;
  margin-bottom: 28px;
  overflow: hidden;
  height: 180px;
}

.alr-page-hero-banner {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.alr-page-hero-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.alr-page-hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 32px;
  background: linear-gradient(
    to top,
    rgba(26,25,21,0.85) 0%,
    rgba(26,25,21,0.4) 50%,
    transparent 100%
  );
}

.alr-page-hero-eyebrow {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #cc785c;
  font-family: var(--codeFont);
  margin-bottom: 6px;
}

.alr-page-hero-title {
  font-size: 28px;
  font-weight: 500;
  color: #f0ece0;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

@media (max-width: 800px) {
  .alr-page-hero {
    margin-left: -16px;
    margin-right: -16px;
    width: calc(100% + 32px);
  }

  .alr-page-hero-title {
    font-size: 20px !important;
  }
}
`

ALRPageHero.displayName = "ALRPageHero"
export default (() => ALRPageHero) satisfies QuartzComponentConstructor