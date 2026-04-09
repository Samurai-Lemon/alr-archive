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

  const echoId   = String(fm.echo_id ?? "ECHO-???")
  const ec       = String(fm.ec  ?? "").toUpperCase()
  const esc      = String(fm.esc ?? "").toUpperCase()
  const rts      = String(fm.rts ?? "").toUpperCase()
  const rds      = String(fm.rds ?? "").toUpperCase()
  const rcc      = String(fm.rcc ?? "")
  const title    = String(fm.title ?? fileData.slug ?? "")
  const status   = String(fm.status ?? "Documented")

  const ecLabel  = ec  ? `${ec} — ${ecTypeLabels[ec]  ?? ec}`  : ""
  const escLabel = esc ? `${esc} — ${escLabels[esc]   ?? esc}` : ""
  const rtsLabel = rts ? `${rts} — ${rtsLabels[rts]   ?? rts}` : ""
  const rdsLabel = rds ? `${rds} — ${rdsLabels[rds]   ?? rds}` : ""
  const rccLabel = rcc ? `${rcc} · ${rccLabels[rcc]   ?? rcc}` : ""

  const escClass = esc ? `alr-echo-hero-tag-${esc.toLowerCase()}` : ""
  const imgSrc   = `/Images/${echoId}.png`

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
              <span class={`alr-echo-hero-tag alr-echo-hero-tag-ec`}>{ecLabel}</span>
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
            <span class="alr-echo-hero-meta-value">{status}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

ALREchoHero.displayName = "ALREchoHero"
export default (() => ALREchoHero) satisfies QuartzComponentConstructor