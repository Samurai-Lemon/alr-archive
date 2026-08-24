import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ecTypeLabels: Record<string, string> = {
  ENT: "Entity",
  OBJ: "Object",
  LOC: "Location",
  PHN: "Phenomenon",
  EVT: "Event",
}

const escLabels: Record<string, string> = {
  S1: "Stable",
  S2: "Volatile",
  S3: "Fractured",
  S4: "Terminal",
}

const rtsLabels: Record<string, string> = {
  T1: "Fragmentary",
  T2: "Localized",
  T3: "Developed",
  T4: "Grand",
  T5: "Cosmic",
}

const rdsLabels: Record<string, string> = {
  A: "Analogous",
  B: "Variant",
  C: "Divergent",
  D: "Exotic",
}

const rccLabels: Record<string, string> = {
  "RCC-1": "Silent Collapse",
  "RCC-2": "Systemic Failure",
  "RCC-3": "Catastrophic Collapse",
}

const ALREchoHero: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>

  const echoId = String(fm.echo_id ?? "ECHO-???")
  const ec     = String(fm.ec  ?? "").toUpperCase()
  const esc    = String(fm.esc ?? "").toUpperCase()
  const rts    = String(fm.rts ?? "").toUpperCase()
  const rds    = String(fm.rds ?? "").toUpperCase()
  const rcc    = String(fm.rcc ?? "")
  const title  = String(fm.title ?? fileData.slug ?? "")
  const status = String(fm.status ?? "documented")

  const ecLabel     = ec  ? `${ec} — ${ecTypeLabels[ec]   ?? ec}`  : ""
  const escLabel    = esc ? `${esc} — ${escLabels[esc]    ?? esc}` : ""
  const rtsLabel    = rts ? `${rts} — ${rtsLabels[rts]    ?? rts}` : ""
  const rdsLabel    = rds ? `${rds} — ${rdsLabels[rds]    ?? rds}` : ""
  const rccLabel    = rcc ? `${rcc} · ${rccLabels[rcc]    ?? rcc}` : ""
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)

  const escClass = esc ? `alr-echo-hero-tag-${esc.toLowerCase()}` : ""
  const imgSrc   = `/Images/${echoId}.webp`

  return (
    <div class="alr-echo-hero">
      <div
        class="alr-echo-hero-img"
        style={`background-image: url('${imgSrc}');`}
      />
      <div class="alr-echo-hero-gradient" />

      <div class="alr-echo-hero-topbar">
        <div class="alr-echo-hero-designation">E.C.H.O. — Archive of Lost Realities Initiative</div>
        {rccLabel && <div class="alr-echo-hero-rcc">{rccLabel}</div>}
      </div>

      <div class="alr-echo-hero-content">
        <div class="alr-echo-hero-eyebrow">
          <span class="alr-echo-hero-id">{echoId}</span>
          {ecLabel && (
            <>
              <div class="alr-echo-hero-divider" />
              <span class="alr-echo-hero-tag alr-echo-hero-tag-ec">{ecLabel}</span>
            </>
          )}
          {escLabel && (
            <>
              <div class="alr-echo-hero-divider" />
              <span class={`alr-echo-hero-tag ${escClass}`}>{escLabel}</span>
            </>
          )}
        </div>

        <div class="alr-echo-hero-title">{title}</div>

        <div class="alr-echo-hero-meta">
          {rtsLabel && (
            <>
              <div class="alr-echo-hero-meta-item">
                <span class="alr-echo-hero-meta-label">RTS</span>
                <span class="alr-echo-hero-meta-value">{rtsLabel}</span>
              </div>
              <div class="alr-echo-hero-meta-sep" />
            </>
          )}
          {rdsLabel && (
            <>
              <div class="alr-echo-hero-meta-item">
                <span class="alr-echo-hero-meta-label">RDS</span>
                <span class="alr-echo-hero-meta-value">{rdsLabel}</span>
              </div>
              <div class="alr-echo-hero-meta-sep" />
            </>
          )}
          <div class="alr-echo-hero-meta-item">
            <span class="alr-echo-hero-meta-label">Status</span>
            <span class="alr-echo-hero-meta-value">{statusLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

ALREchoHero.css = `
.alr-echo-hero {
  position: relative;
  width: calc(100% + 64px);
  height: 340px;
  overflow: hidden;
  margin-bottom: 28px;
  margin-left: -32px;
  margin-right: -32px;
}

.alr-echo-hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: grayscale(25%) brightness(0.55);
}

.alr-echo-hero-gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, #1a1915 0%, rgba(26,25,21,0.75) 45%, rgba(26,25,21,0.15) 100%),
    linear-gradient(to right, rgba(26,25,21,0.65) 0%, transparent 65%);
}

.alr-echo-hero-topbar {
  position: absolute;
  top: 0; left: 0; right: 0;
  padding: 14px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.alr-echo-hero-designation {
  font-size: 9px;
  letter-spacing: 0.2em;
  color: rgba(204,120,92,0.45);
  text-transform: uppercase;
  font-family: var(--codeFont);
}

.alr-echo-hero-rcc {
  font-size: 9px;
  letter-spacing: 0.14em;
  color: rgba(106,104,96,0.45);
  font-family: var(--codeFont);
}

.alr-echo-hero-content {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 28px 32px;
}

.alr-echo-hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.alr-echo-hero-id {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  color: #cc785c;
  font-family: var(--codeFont);
}

.alr-echo-hero-divider {
  width: 1px;
  height: 12px;
  background: #3a3830;
  flex-shrink: 0;
}

.alr-echo-hero-tag {
  font-size: 9px;
  letter-spacing: 0.12em;
  padding: 2px 7px;
  border-radius: 2px;
  font-family: var(--codeFont);
}

.alr-echo-hero-tag-ec {
  background: rgba(204,120,92,0.1);
  border: 0.5px solid #8a4a32;
  color: #cc785c;
}

.alr-echo-hero-tag-s1 {
  background: rgba(29,158,117,0.1);
  border: 0.5px solid #0e4030;
  color: #1d9e75;
}

.alr-echo-hero-tag-s2 {
  background: rgba(196,144,48,0.1);
  border: 0.5px solid #4a3010;
  color: #c49030;
}

.alr-echo-hero-tag-s3 {
  background: rgba(176,120,40,0.1);
  border: 0.5px solid #3a2c0e;
  color: #b07828;
}

.alr-echo-hero-tag-s4 {
  background: rgba(196,90,58,0.1);
  border: 0.5px solid #4a2010;
  color: #c45a3a;
}

.alr-echo-hero-title {
  font-size: 40px;
  font-weight: 500;
  color: #f0ece0;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin-bottom: 12px;
  text-shadow: 0 2px 24px rgba(0,0,0,0.6);
}

.alr-echo-hero-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.alr-echo-hero-meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.alr-echo-hero-meta-label {
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #4a4840;
  font-family: var(--codeFont);
}

.alr-echo-hero-meta-value {
  font-size: 11px;
  color: #8a8678;
  font-family: var(--codeFont);
  letter-spacing: 0.04em;
}

.alr-echo-hero-meta-sep {
  width: 1px;
  height: 10px;
  background: #2a2824;
  flex-shrink: 0;
}

@media (max-width: 800px) {
  .alr-echo-hero {
    height: 260px;
    margin-left: -16px;
    margin-right: -16px;
    width: calc(100% + 32px);
  }

  .alr-echo-hero-title {
    font-size: 26px !important;
  }
}
`

ALREchoHero.displayName = "ALREchoHero"
export default (() => ALREchoHero) satisfies QuartzComponentConstructor