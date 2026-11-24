// @ts-nocheck
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { BroadcastBanner } from "./broadcast/Banner"

const ALRLabelCreator: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="alr-lc">

      <BroadcastBanner
        key_="label-creator"
        ch="CH 05"
        eyebrow="ALR Initiative — Label Forge"
        title={["Label Creator"]}
        sub="Print-ready grading labels for any card, at exact size (2.65 × 0.78 in)."
        status={["Format · SVG, Cricut-ready", "Size · 2.65 × 0.78 in", "Fits a 2.68 × 0.79 in slot"]}
      />

      <div id="alr-lc-tool">
        <div class="alr-lc-wrap">
          <div class="alr-lc-topbar">
            <span class="alr-lc-topbar-title">ALR INITIATIVE GRADING</span>
            <span class="alr-lc-topbar-sub">2.65 × 0.78 in · fits a 2.68 × 0.79 in slab slot</span>
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
                  <input class="alr-lc-input" id="alr-lc-grade" type="number" min="1" max="10" step="1" inputmode="numeric" value="10" />
                </div>
                <div class="alr-lc-field">
                  <div class="alr-lc-label">Grade Label</div>
                  <input class="alr-lc-input" id="alr-lc-gl" value="GEM MINT" />
                </div>
              </div>
              <div class="alr-lc-rule"></div>

              <div id="alr-lc-colours-front">
                <div class="alr-lc-section-label">Front Colours</div>
                <div class="alr-lc-sub">Text</div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Primary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-ctxt" value="#ede8de" /><input class="alr-lc-hex" id="alr-lc-htxt" value="#ede8de" /></div>
                  </div>
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Secondary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-cmut" value="#b7b1a6" /><input class="alr-lc-hex" id="alr-lc-hmut" value="#b7b1a6" /></div>
                  </div>
                </div>
                <div class="alr-lc-sub">Accent</div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Accent</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-cacc" value="#cc785c" /><input class="alr-lc-hex" id="alr-lc-hacc" value="#cc785c" /></div>
                  </div>
                </div>
                <div class="alr-lc-sub">Panels</div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Panel 1 · Logo</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-cp1" value="#121110" /><input class="alr-lc-hex" id="alr-lc-hp1" value="#121110" /></div>
                  </div>
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Panel 2 · Card Info</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-cp2" value="#1a1917" /><input class="alr-lc-hex" id="alr-lc-hp2" value="#1a1917" /></div>
                  </div>
                </div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Panel 3 · Grade</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-cp3" value="#121110" /><input class="alr-lc-hex" id="alr-lc-hp3" value="#121110" /></div>
                  </div>
                </div>
              </div>

              <div id="alr-lc-colours-back" style="display:none">
                <div class="alr-lc-section-label">Back Colours</div>
                <div class="alr-lc-sub">Text</div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Primary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bctxt" value="#ede8de" /><input class="alr-lc-hex" id="alr-lc-bhtxt" value="#ede8de" /></div>
                  </div>
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Secondary Text</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcmut" value="#b7b1a6" /><input class="alr-lc-hex" id="alr-lc-bhmut" value="#b7b1a6" /></div>
                  </div>
                </div>
                <div class="alr-lc-sub">Accent</div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Accent</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcacc" value="#cc785c" /><input class="alr-lc-hex" id="alr-lc-bhacc" value="#cc785c" /></div>
                  </div>
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Scale Boxes</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcsbox" value="#44423f" /><input class="alr-lc-hex" id="alr-lc-bhsbox" value="#44423f" /></div>
                  </div>
                </div>
                <div class="alr-lc-sub">Panels</div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Panel 1 · Logo</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcp1" value="#121110" /><input class="alr-lc-hex" id="alr-lc-bhp1" value="#121110" /></div>
                  </div>
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Panel 2 · Grade Scale</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcp2" value="#1a1917" /><input class="alr-lc-hex" id="alr-lc-bhp2" value="#1a1917" /></div>
                  </div>
                </div>
                <div class="alr-lc-color-row">
                  <div class="alr-lc-field">
                    <div class="alr-lc-label">Panel 3 · Cert</div>
                    <div class="alr-lc-color-wrap"><input type="color" id="alr-lc-bcp3" value="#1a1917" /><input class="alr-lc-hex" id="alr-lc-bhp3" value="#1a1917" /></div>
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

      {/* Desktop app download (links filled from the latest GitHub release by the label script) */}
      <div class="alr-lc-desk" id="alr-lc-desk">
        <img class="alr-lc-desk-icon" src="/static/app/icon-192.png" alt="" width="56" height="56" />
        <div class="alr-lc-desk-txt">
          <div class="alr-lc-desk-eb" id="alr-lc-desk-eb">DESKTOP APP</div>
          <div class="alr-lc-desk-title">ALR Grading for Mac &amp; Windows</div>
          <div class="alr-lc-desk-desc">The same Grading Terminal in its own window. Works offline and saves labels straight into a folder you choose.</div>
        </div>
        <div class="alr-lc-desk-act">
          <a class="alr-lc-desk-btn" id="alr-lc-desk-main" href="https://github.com/Samurai-Lemon/alr-grading-app/releases/latest" target="_blank" rel="noopener">Download the desktop app</a>
          <div class="alr-lc-desk-sub" id="alr-lc-desk-sub">Mac and Windows</div>
          <div class="alr-lc-desk-oth" id="alr-lc-desk-oth"><a href="https://github.com/Samurai-Lemon/alr-grading-app/releases/latest" target="_blank" rel="noopener">All versions ↗</a></div>
        </div>
        <div class="alr-lc-desk-note">Not code-signed yet · Mac: open once, then System Settings › Privacy &amp; Security › Open Anyway · Windows: More info › Run anyway</div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .alr-lc{max-width:100%}
        .alr-lc-banner{background:var(--alr-surface);border:1px solid var(--alr-border);border-radius:var(--alr-r-lg);padding:clamp(24px,4vw,40px);margin:0;display:flex;align-items:flex-end;justify-content:space-between;gap:20px;position:relative;overflow:hidden;flex-wrap:wrap}
        .alr-lc-banner::before{display:none}
        .alr-lc-banner-inner{display:flex;flex-direction:column;gap:6px}
        .alr-lc-banner-title{font-size:clamp(32px,4vw,44px);font-weight:600;color:var(--alr-text);line-height:1.05;letter-spacing:-0.03em}
        .alr-lc-banner-sub{font-size:16px;color:var(--alr-text-2);line-height:1.6;max-width:560px}
        .alr-lc-banner-meta{display:flex;flex-direction:column;gap:4px;align-items:flex-end;flex-shrink:0}
        .alr-lc-banner-meta-item{font-size:12px;color:var(--alr-muted);font-family:var(--codeFont),monospace}
        .alr-lc-wrap{border:1px solid var(--alr-border);border-radius:var(--alr-r-lg);overflow:hidden;font-family:var(--bodyFont);margin-top:16px;background:var(--alr-surface)}
        .alr-lc-topbar{background:transparent;padding:14px 20px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--alr-border)}
        .alr-lc-topbar-title{font-size:14px;font-weight:600;color:var(--alr-text)}
        .alr-lc-topbar-sub{font-size:12px;color:var(--alr-muted);margin-left:auto}
        .alr-lc-body{display:grid;grid-template-columns:300px 1fr;min-height:560px}
        .alr-lc-left{border-right:1px solid var(--alr-border);padding:20px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;max-height:640px}
        .alr-lc-right{display:flex;flex-direction:column}
        .alr-lc-section-label{font-size:13px;font-weight:600;color:var(--alr-text)}
        .alr-lc-sub{font-size:12px;font-weight:600;color:var(--alr-text);margin-top:6px}
        .alr-lc-rule{height:1px;background:var(--alr-border);margin:4px 0}
        .alr-lc-field{display:flex;flex-direction:column;gap:3px}
        .alr-lc-label{font-size:12px;color:var(--alr-text-2);font-weight:500}
        .alr-lc-req{color:var(--alr-accent-text)}
        .alr-lc-input{background:var(--alr-bg);border:1px solid var(--alr-border-strong);color:var(--alr-text);font-family:var(--codeFont),'Courier New',monospace;font-size:13px;padding:8px 10px;border-radius:var(--alr-r-xs);width:100%;outline:none;box-sizing:border-box}
        .alr-lc-input:focus{border-color:var(--alr-accent)}
        .alr-lc-two{display:grid;grid-template-columns:1fr 1fr;gap:6px}
        .alr-lc-color-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .alr-lc-color-wrap{display:flex;align-items:center;gap:6px;background:var(--alr-bg);border:1px solid var(--alr-border-strong);border-radius:var(--alr-r-xs);padding:4px 8px}
        .alr-lc-color-wrap input[type="color"]{width:20px;height:20px;border:none;background:none;cursor:pointer;padding:0}
        .alr-lc-hex{font-size:10px;color:var(--dark);font-family:var(--codeFont),monospace;background:none;border:none;outline:none;width:58px}
        .alr-lc-preset-row{display:flex;gap:6px}
        .alr-lc-preset-btn{flex:1;font-family:var(--bodyFont);font-size:13px;font-weight:500;min-height:36px;border-radius:999px;cursor:pointer;border:1px solid var(--alr-border-strong);background:var(--alr-surface);color:var(--alr-text-2);transition:all .15s}
        .alr-lc-preset-btn:hover{border-color:var(--alr-muted);color:var(--alr-text)}
        .alr-lc-preset-active{border-color:var(--alr-text)!important;color:var(--alr-bg)!important;background:var(--alr-text)!important}
        .alr-lc-tabs{display:flex;border-bottom:1px solid var(--alr-border);padding:0 8px}
        .alr-lc-tab{font-family:var(--bodyFont);font-size:14px;font-weight:500;padding:12px 14px;cursor:pointer;color:var(--alr-muted);background:none;border:none;border-bottom:2px solid transparent;transition:all .15s}
        .alr-lc-tab:hover{color:var(--alr-text)}
        .alr-lc-tab-active{color:var(--alr-text)!important;border-bottom-color:var(--alr-accent)!important}
        .alr-lc-preview{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;background:var(--alr-bg);min-height:180px}
        .alr-lc-plabel{font-size:12px;color:var(--alr-muted);align-self:flex-start}
        .alr-lc-svgwrap{width:100%;max-width:520px;border:1px solid var(--alr-border);border-radius:0;overflow:hidden;background:var(--alr-surface-2)}
        .alr-lc-svgwrap svg{width:100%;height:auto;display:block}
        .alr-lc-foldline{width:100%;max-width:520px;display:flex;align-items:center;gap:8px;font-size:9px;color:var(--gray);letter-spacing:1.5px}
        .alr-lc-foldline-dash{flex:1;border-top:1px dashed var(--gray)}
        .alr-lc-desk{margin-top:16px;display:grid;grid-template-columns:auto 1fr auto;gap:8px 18px;align-items:center;border:1px solid var(--alr-border-strong);border-radius:var(--alr-r-lg);padding:16px 20px;background:var(--alr-surface)}
        .alr-lc-desk-icon{width:56px;height:56px;border-radius:13px;display:block}
        .alr-lc-desk-eb{font:600 11px var(--codeFont),monospace;letter-spacing:1.2px;color:var(--alr-accent-text)}
        .alr-lc-desk-title{font-size:17px;font-weight:700;color:var(--alr-text);margin:3px 0}
        .alr-lc-desk-desc{font-size:13px;color:var(--alr-text-2);line-height:1.45;max-width:420px}
        .alr-lc-desk-act{display:flex;flex-direction:column;align-items:flex-end;gap:5px}
        .alr-lc-desk-btn{display:inline-flex;align-items:center;gap:8px;background:var(--alr-accent);color:var(--alr-on-accent)!important;font-weight:700;font-size:14px;padding:10px 16px;border-radius:var(--alr-r-sm);white-space:nowrap;text-decoration:none!important}
        .alr-lc-desk-btn:hover{filter:brightness(1.07)}
        .alr-lc-desk-btn svg{width:15px;height:15px;flex:none}
        .alr-lc-desk-sub{font-size:11.5px;color:var(--alr-muted)}
        .alr-lc-desk-oth{display:flex;gap:12px;flex-wrap:wrap;justify-content:flex-end;font-size:12px}
        .alr-lc-desk-oth a{color:var(--alr-accent-text)!important;display:inline-flex;gap:4px;align-items:center;text-decoration:none!important}
        .alr-lc-desk-oth a:hover{text-decoration:underline!important}
        .alr-lc-desk-oth svg{width:12px;height:12px}
        .alr-lc-desk-note{grid-column:1/-1;font-size:11px;color:var(--alr-muted);text-align:right}
        .alr-lc-desk.is-mobile .alr-lc-desk-note,.alr-lc-desk.is-mobile .alr-lc-desk-sub{display:none}
        @media(max-width:700px){.alr-lc-desk{grid-template-columns:auto 1fr}.alr-lc-desk-act{grid-column:1/-1;align-items:stretch}.alr-lc-desk-btn{justify-content:center}.alr-lc-desk-oth{justify-content:center}.alr-lc-desk-note{text-align:center}}
        html.alr-app .alr-lc-desk{display:none!important}
        .alr-lc-right{container-type:inline-size}
        /* Opened as the installed web app: just the tool, no site menus. */
        html.alr-app #quartz-header,html.alr-app .left.sidebar,html.alr-app .right.sidebar,html.alr-app .page-footer,html.alr-app footer,html.alr-app #alr-terminal-mount,html.alr-app .alr-lc .alr-bb{display:none!important}
        html.alr-app .page-header > :not(.alr-lc):not(:has(.alr-lc)),html.alr-app .center > :not(.page-header){display:none!important}
        html.alr-app #quartz-body{display:block!important;padding:0!important;margin:0!important}
        html.alr-app .center{max-width:1100px!important;width:auto!important;margin:0 auto!important;padding:max(12px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left))!important}
        html.alr-app .center > hr{display:none}
        html.alr-app .alr-lc-wrap{margin-top:0}
        .alr-lc-actions{border-top:1px solid var(--alr-border);padding:12px 20px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;align-items:center;background:transparent}
        .alr-lc-actions button{width:100%;white-space:nowrap}
        @container (max-width:470px){.alr-lc-actions{grid-template-columns:1fr}}
        .alr-lc-btn-primary{font-family:var(--bodyFont);font-size:14px;font-weight:600;min-height:40px;padding:0 16px;border-radius:var(--alr-r-sm);cursor:pointer;background:var(--alr-accent);border:none;color:var(--alr-on-accent);transition:all .15s}
        .alr-lc-btn-primary:hover{background:var(--alr-accent-text)}
        .alr-lc-btn-ghost{font-family:var(--bodyFont);font-size:14px;font-weight:500;min-height:40px;padding:0 16px;border-radius:var(--alr-r-sm);cursor:pointer;background:var(--alr-hover);border:none;color:var(--alr-text);transition:all .15s}
        .alr-lc-btn-ghost:hover{background:var(--alr-border-strong)}
        .alr-lc-status{grid-column:1/-1;font-size:12px;color:var(--alr-accent-text);text-align:right}
        #alr-lc-colours-front,#alr-lc-colours-back{display:flex;flex-direction:column;gap:8px}
        .alr-lc-cert-row{display:flex;gap:6px;align-items:center}
        .alr-lc-cert-row .alr-lc-input{flex:1}
        .alr-lc-cert-gen{flex-shrink:0;width:36px;height:36px;border-radius:var(--alr-r-xs);border:1px solid var(--alr-border-strong);background:transparent;color:var(--alr-text-2);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .15s;padding:0}
        .alr-lc-cert-gen:hover{border-color:var(--alr-muted);color:var(--alr-text)}
        @media(max-width:700px){.alr-lc-body{grid-template-columns:1fr}.alr-lc-left{border-right:none;border-bottom:1px solid var(--alr-border);max-height:none}.alr-lc-banner-meta{align-items:flex-start}}
      ` }} />

    </div>
  )
}

ALRLabelCreator.displayName = "ALRLabelCreator"
export default (() => ALRLabelCreator) satisfies QuartzComponentConstructor
