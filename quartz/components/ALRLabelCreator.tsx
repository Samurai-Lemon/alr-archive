// @ts-nocheck
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRLabelCreator: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="alr-lc">

      <div class="alr-lc-banner">
        <div class="alr-lc-banner-inner">
          <div class="alr-eyebrow">ALR Initiative — Label Forge</div>
          <div class="alr-lc-banner-title">Label Creator</div>
          <div class="alr-lc-banner-sub">Generate a print-ready grading label for any card. Download your SVG at exact print size (70 × 20 mm).</div>
        </div>
        <div class="alr-lc-banner-meta">
          <div class="alr-lc-banner-meta-item">FORMAT · SVG</div>
          <div class="alr-lc-banner-meta-item">SIZE · 70 × 20 MM</div>
          <div class="alr-lc-banner-meta-item">STANDARD · PSA</div>
        </div>
      </div>

      <div id="alr-lc-tool">
        <div class="alr-lc-wrap">
          <div class="alr-lc-topbar">
            <span class="alr-lc-topbar-title">ALR INITIATIVE GRADING</span>
            <span class="alr-lc-topbar-sub">70mm x 20mm - PSA STANDARD</span>
          </div>
          <div class="alr-lc-body">
            <div class="alr-lc-left">

              <div class="alr-lc-section-label">Preset</div>
              <div class="alr-lc-preset-row">
                <button id="alr-lc-preset-dark" class="alr-lc-preset-btn alr-lc-preset-active">ALR Dark</button>
                <button id="alr-lc-preset-light" class="alr-lc-preset-btn">ALR Light</button>
              </div>
              <div class="alr-lc-rule"></div>

              <div class="alr-lc-section-label">Card Identity</div>
              <div class="alr-lc-field">
                <div class="alr-lc-label">Card Name <span class="alr-lc-req">*</span></div>
                <input class="alr-lc-input" id="alr-lc-name" value="CARD NAME" />
              </div>
              <div class="alr-lc-field">
                <div class="alr-lc-label">Set / Series</div>
                <input class="alr-lc-input" id="alr-lc-set" value="SET - SERIES - EN - YEAR" />
              </div>
              <div class="alr-lc-field">
                <div class="alr-lc-label">Variant / Edition</div>
                <input class="alr-lc-input" id="alr-lc-variant" value="VARIANT / EDITION" />
              </div>
              <div class="alr-lc-field">
                <div class="alr-lc-label">Cert Number</div>
                <div class="alr-lc-cert-row">
                  <input class="alr-lc-input" id="alr-lc-cert" value="0000-ALR" />
                  <button class="alr-lc-cert-gen" id="alr-lc-cert-gen" title="Generate">&#x21BB;</button>
                </div>
              </div>
              <div class="alr-lc-rule"></div>

              <div class="alr-lc-section-label">Grade</div>
              <div class="alr-lc-two">
                <div class="alr-lc-field">
                  <div class="alr-lc-label">Grade</div>
                  <input class="alr-lc-input" id="alr-lc-grade" type="number" value="10" />
                </div>
                <div class="alr-lc-field">
                  <div class="alr-lc-label">Grade Label</div>
                  <input class="alr-lc-input" id="alr-lc-gl" value="PRISTINE" />
                </div>
              </div>
              <div class="alr-lc-rule"></div>

              <div id="alr-lc-colours-front">
                <div class="alr-lc-section-label">Front Colours</div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Info Panel</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-cbody" value="#1a1814" /><input class="alr-lc-hex" id="alr-lc-hbody" value="#1a1814" /></div>
                  </div>
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Grade Panel</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-czone" value="#141410" /><input class="alr-lc-hex" id="alr-lc-hzone" value="#141410" /></div>
                  </div>
                </div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Accent</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-cacc" value="#cc785c" /><input class="alr-lc-hex" id="alr-lc-hacc" value="#cc785c" /></div>
                  </div>
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Primary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-ctxt" value="#f0ece0" /><input class="alr-lc-hex" id="alr-lc-htxt" value="#f0ece0" /></div>
                  </div>
                </div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Secondary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-cmut" value="#b0ac9f" /><input class="alr-lc-hex" id="alr-lc-hmut" value="#b0ac9f" /></div>
                  </div>
                </div>
              </div>

              <div id="alr-lc-colours-back" style="display:none">
                <div class="alr-lc-section-label">Back Colours</div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Body BG</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcbody" value="#1a1814" /><input class="alr-lc-hex" id="alr-lc-bhbody" value="#1a1814" /></div>
                  </div>
                </div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Accent</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcacc" value="#cc785c" /><input class="alr-lc-hex" id="alr-lc-bhacc" value="#cc785c" /></div>
                  </div>
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Primary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bctxt" value="#f0ece0" /><input class="alr-lc-hex" id="alr-lc-bhtxt" value="#f0ece0" /></div>
                  </div>
                </div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Secondary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcmut" value="#b0ac9f" /><input class="alr-lc-hex" id="alr-lc-bhmut" value="#b0ac9f" /></div>
                  </div>
                </div>
              </div>

            </div>

            <div class="alr-lc-right">
              <div class="alr-lc-tabs">
                <button class="alr-lc-tab alr-lc-tab-active" id="alr-lc-tab-front">Front</button>
                <button class="alr-lc-tab" id="alr-lc-tab-back">Back</button>
                <button class="alr-lc-tab" id="alr-lc-tab-fold">Fold Sheet</button>
              </div>
              <div class="alr-lc-preview" id="alr-lc-preview"></div>
              <div class="alr-lc-actions">
                <button class="alr-lc-btn-primary" id="alr-lc-dl-front">Download Front</button>
                <button class="alr-lc-btn-ghost" id="alr-lc-dl-back">Download Back</button>
                <button class="alr-lc-btn-ghost" id="alr-lc-dl-fold">Download Fold</button>
                <span class="alr-lc-status" id="alr-lc-status">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .alr-lc{max-width:100%}
        .alr-lc-banner{background:#181714;border-bottom:0.5px solid #26251f;padding:28px 32px 24px;margin:-28px -32px 0;display:flex;align-items:flex-end;justify-content:space-between;gap:20px;position:relative;overflow:hidden}
        .alr-lc-banner::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:#a85c42;border-radius:0}
        .alr-lc-banner-inner{display:flex;flex-direction:column;gap:6px}
        .alr-lc-banner-title{font-size:26px;font-weight:500;color:#f0ece0;line-height:1.15;letter-spacing:-0.3px}
        .alr-lc-banner-sub{font-size:12px;color:#555048;line-height:1.7;max-width:480px}
        .alr-lc-banner-meta{display:flex;flex-direction:column;gap:4px;align-items:flex-end;flex-shrink:0}
        .alr-lc-banner-meta-item{font-size:9px;color:#3a3830;letter-spacing:0.14em;font-family:var(--codeFont),monospace}
        .alr-lc-wrap{border:1px solid var(--lightgray);border-radius:6px;overflow:hidden;font-family:var(--codeFont),'Courier New',monospace;margin-top:24px}
        .alr-lc-wrap{border:1px solid var(--lightgray);border-radius:6px;overflow:hidden;font-family:var(--codeFont),'Courier New',monospace}
        .alr-lc-topbar{background:var(--lightgray);padding:10px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--lightgray)}
        .alr-lc-topbar-title{font-size:11px;font-weight:700;color:#cc785c;letter-spacing:2.5px}
        .alr-lc-topbar-sub{font-size:10px;color:var(--gray);letter-spacing:1px;margin-left:auto}
        .alr-lc-body{display:grid;grid-template-columns:300px 1fr;min-height:560px}
        .alr-lc-left{border-right:1px solid var(--lightgray);padding:16px;display:flex;flex-direction:column;gap:8px;overflow-y:auto;max-height:640px}
        .alr-lc-right{display:flex;flex-direction:column}
        .alr-lc-section-label{font-size:9px;color:#cc785c;letter-spacing:2px;text-transform:uppercase}
        .alr-lc-rule{height:1px;background:var(--lightgray);margin:2px 0}
        .alr-lc-field{display:flex;flex-direction:column;gap:3px}
        .alr-lc-label{font-size:9px;color:var(--gray);letter-spacing:1.5px;text-transform:uppercase}
        .alr-lc-req{color:#cc785c}
        .alr-lc-input{background:var(--light);border:1px solid var(--lightgray);color:var(--dark);font-family:var(--codeFont),'Courier New',monospace;font-size:11px;padding:6px 8px;border-radius:3px;width:100%;outline:none;box-sizing:border-box}
        .alr-lc-input:focus{border-color:#cc785c}
        .alr-lc-two{display:grid;grid-template-columns:1fr 1fr;gap:6px}
        .alr-lc-color-row{display:flex;flex-direction:column;gap:8px}
        .alr-lc-color-wrap{display:flex;align-items:center;gap:5px;background:var(--light);border:1px solid var(--lightgray);border-radius:3px;padding:3px 6px}
        .alr-lc-color-wrap input[type="color"]{width:20px;height:20px;border:none;background:none;cursor:pointer;padding:0}
        .alr-lc-hex{font-size:10px;color:var(--dark);font-family:var(--codeFont),monospace;background:none;border:none;outline:none;width:58px}
        .alr-lc-preset-row{display:flex;gap:6px}
        .alr-lc-preset-btn{flex:1;font-family:var(--codeFont),monospace;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:7px 0;border-radius:3px;cursor:pointer;border:1px solid var(--lightgray);background:transparent;color:var(--gray);transition:all .15s}
        .alr-lc-preset-btn:hover{border-color:#cc785c;color:#cc785c}
        .alr-lc-preset-active{border-color:#cc785c!important;color:#cc785c!important;background:rgba(204,120,92,.08)!important}
        .alr-lc-tabs{display:flex;border-bottom:1px solid var(--lightgray)}
        .alr-lc-tab{font-family:var(--codeFont),monospace;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:8px 14px;cursor:pointer;color:var(--gray);background:none;border:none;border-bottom:2px solid transparent;transition:all .15s}
        .alr-lc-tab:hover{color:var(--dark)}
        .alr-lc-tab-active{color:#cc785c!important;border-bottom-color:#cc785c!important}
        .alr-lc-preview{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:20px;background:var(--lightgray);min-height:180px}
        .alr-lc-plabel{font-size:9px;color:var(--gray);letter-spacing:2px;text-transform:uppercase;align-self:flex-start}
        .alr-lc-svgwrap{width:100%;max-width:520px;border:1px solid var(--lightgray);border-radius:3px;overflow:hidden;background:#2a2824}
        .alr-lc-svgwrap svg{width:100%;height:auto;display:block}
        .alr-lc-foldline{width:100%;max-width:520px;display:flex;align-items:center;gap:8px;font-size:9px;color:var(--gray);letter-spacing:1.5px}
        .alr-lc-foldline-dash{flex:1;border-top:1px dashed var(--gray)}
        .alr-lc-actions{border-top:1px solid var(--lightgray);padding:10px 16px;display:flex;gap:8px;align-items:center;background:var(--lightgray);flex-wrap:wrap}
        .alr-lc-btn-primary{font-family:var(--codeFont),monospace;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:7px 12px;border-radius:3px;cursor:pointer;background:#cc785c;border:1px solid #cc785c;color:#fff;transition:all .15s}
        .alr-lc-btn-primary:hover{background:#b86848;border-color:#b86848}
        .alr-lc-btn-ghost{font-family:var(--codeFont),monospace;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:7px 12px;border-radius:3px;cursor:pointer;background:transparent;border:1px solid var(--lightgray);color:var(--gray);transition:all .15s}
        .alr-lc-btn-ghost:hover{border-color:#cc785c;color:#cc785c}
        .alr-lc-status{font-size:9px;color:#cc785c;letter-spacing:1px;margin-left:auto}
        #alr-lc-colours-front,#alr-lc-colours-back{display:flex;flex-direction:column;gap:8px}
        .alr-lc-cert-row{display:flex;gap:6px;align-items:center}
        .alr-lc-cert-row .alr-lc-input{flex:1}
        .alr-lc-cert-gen{flex-shrink:0;width:28px;height:28px;border-radius:3px;border:1px solid var(--lightgray);background:transparent;color:var(--gray);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .15s;padding:0}
        .alr-lc-cert-gen:hover{border-color:#cc785c;color:#cc785c}
        @media(max-width:700px){.alr-lc-body{grid-template-columns:1fr}.alr-lc-left{border-right:none;border-bottom:1px solid var(--lightgray);max-height:none}}
      ` }} />

    </div>
  )
}

ALRLabelCreator.displayName = "ALRLabelCreator"
export default (() => ALRLabelCreator) satisfies QuartzComponentConstructor
