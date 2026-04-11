import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const OrdoThreatStrip: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="ordo-threat-strip">
      <span class="ordo-threat-tag ordo-threat-file">ODM-001 · Threat File</span>
      <div class="ordo-threat-sep" />
      <span class="ordo-threat-tag ordo-threat-severe">Threat Level · Severe</span>
      <div class="ordo-threat-sep" />
      <span class="ordo-threat-tag ordo-threat-dim">Intel · Fragmented</span>
      <div class="ordo-threat-sep" />
      <span class="ordo-threat-tag ordo-threat-dim">Origin · Unknown — Pre-ALR</span>
    </div>
  )
}

OrdoThreatStrip.css = `
.ordo-threat-strip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0 16px;
  border-bottom: 0.5px solid #1e1208;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.ordo-threat-tag {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 2px;
}

.ordo-threat-file {
  background: rgba(138, 48, 32, 0.1);
  border: 0.5px solid #4a2010;
  color: #7a3a20;
}

.ordo-threat-severe {
  background: rgba(138, 48, 32, 0.16);
  border: 0.5px solid #8a3020;
  color: #b05030;
}

.ordo-threat-dim {
  background: rgba(40, 24, 12, 0.5);
  border: 0.5px solid #2a1a0e;
  color: #4a3020;
}

.ordo-threat-sep {
  width: 1px;
  height: 12px;
  background: #2a1a0e;
  flex-shrink: 0;
}
`

OrdoThreatStrip.displayName = "OrdoThreatStrip"
export default (() => OrdoThreatStrip) satisfies QuartzComponentConstructor