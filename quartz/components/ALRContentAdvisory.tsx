import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { escLabels, rccLabels } from "../util/alrClassifications"

// Self-gating: renders nothing unless the page's own frontmatter crosses the
// threshold (Echo esc === S4, Reality rcc === RCC-3), so it's safe to mount
// on every echo/reality page without a separate per-entry opt-in.
const ALRContentAdvisory: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>
  const type = String(fm.type ?? "")
  const esc = String(fm.esc ?? "").toUpperCase()
  const rcc = String(fm.rcc ?? "").toUpperCase()

  const isTerminalEcho = type === "echo" && esc === "S4"
  const isCatastrophicReality = type === "reality" && rcc === "RCC-3"

  if (!isTerminalEcho && !isCatastrophicReality) return null

  const label = isTerminalEcho
    ? `Terminal-Class Anomaly (S4 — ${escLabels.S4})`
    : `Catastrophic Collapse (RCC-3 — ${rccLabels["RCC-3"]})`

  const body = isTerminalEcho
    ? "This entry documents an anomaly classified Terminal under the Echo Stability Classification system. Field accounts in this file describe sustained harm to observing personnel. Personnel below Level III clearance should review with assigned supervision present."
    : "This entry documents a reality classified Catastrophic Collapse under the Reality Collapse Classification system. Recovered material includes accounts of large-scale loss of life preceding the collapse event."

  return (
    <div class="alr-content-advisory">
      <div class="alr-content-advisory-icon">⚠</div>
      <div class="alr-content-advisory-body">
        <div class="alr-content-advisory-label">Advisory — {label}</div>
        <div class="alr-content-advisory-text">{body}</div>
      </div>
    </div>
  )
}

ALRContentAdvisory.css = `
.alr-content-advisory {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: rgba(196,90,58,0.07);
  border: 0.5px solid rgba(196,90,58,0.4);
  border-left: 3px solid #c45a3a;
  border-radius: 0 6px 6px 0;
  padding: 14px 16px;
  margin-bottom: 24px;
}

.alr-content-advisory-icon {
  font-size: 15px;
  color: #c45a3a;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 1px;
}

.alr-content-advisory-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c45a3a;
  font-family: var(--codeFont);
  margin-bottom: 4px;
}

.alr-content-advisory-text {
  font-size: 12.5px;
  color: #9a9488;
  line-height: 1.6;
}
`

ALRContentAdvisory.displayName = "ALRContentAdvisory"
export default (() => ALRContentAdvisory) satisfies QuartzComponentConstructor
