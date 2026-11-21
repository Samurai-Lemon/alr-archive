import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Ordo file details as classification tiles — the same tile treatment echo entries use
// (.alr-echo-tiles), so the page reads as part of the archive in its own palette.
const OrdoThreatStrip: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <dl class="alr-echo-tiles ordo-threat-strip" aria-label="Threat file">
      <div class="alr-echo-tile">
        <dt>File</dt>
        <dd>ODM-001<span class="alr-echo-tile-sub">Threat file</span></dd>
      </div>
      <div class="alr-echo-tile">
        <dt>Threat level</dt>
        <dd>
          <span class="alr-sev-dot alr-sev-s4" aria-hidden="true"></span>
          Severe
        </dd>
      </div>
      <div class="alr-echo-tile">
        <dt>Intel</dt>
        <dd>Fragmented<span class="alr-echo-tile-sub">Partial, unverified</span></dd>
      </div>
      <div class="alr-echo-tile">
        <dt>Origin</dt>
        <dd>Unknown<span class="alr-echo-tile-sub">Pre-ALR</span></dd>
      </div>
      <div class="alr-echo-tile">
        <dt>Cycle</dt>
        <dd>7</dd>
      </div>
    </dl>
  )
}

OrdoThreatStrip.displayName = "OrdoThreatStrip"
export default (() => OrdoThreatStrip) satisfies QuartzComponentConstructor
