---

## title: ALR Label Creator
---
---
title: ALR Label Creator
---

# Label Creator

Generate a print-ready ALR Initiative grading label for any card. Fill in the card details, pick a colour mode, and download your SVG at exact print size (70 × 20 mm).

<div id="alr-label-tool">

<style>
#alr-label-tool {
  --alr-bg: var(--background);
  --alr-surface: var(--lightgray);
  --alr-border: var(--lightgray);
  --alr-accent: #cc785c;
  --alr-accent-dim: #8a4a32;
  --alr-input-bg: var(--background);
  --alr-text: var(--dark);
  --alr-text-muted: var(--gray);
  --alr-text-dim: var(--gray);
  --font-mono: var(--codeFont), 'Courier New', monospace;
}

.lc-wrap {
  border: 1px solid var(--lightgray);
  border-radius: 6px;
  font-family: var(--font-mono);
  overflow: hidden;
  margin: 1.5rem 0;
}

.lc-header {
  background: var(--lightgray);
  border-bottom: 1px solid var(--lightgray);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.lc-header-title {
  font-size: 11px;
  font-weight: 700;
  color: #cc785c;
  letter-spacing: 2.5px;
  text-transform: uppercase;
}

.lc-header-sub {
  font-size: 10px;
  color: var(--gray);
  letter-spacing: 1px;
  margin-left: auto;
}

.lc-body {
  display: grid;
  grid-template-columns: 280px 1fr;
}

@media (max-width: 700px) {
  .lc-body { grid-template-columns: 1fr; }
  .lc-panel-left { border-right: none; border-bottom: 1px solid var(--lightgray); }
}

.lc-panel-left {
  border-right: 1px solid var(--lightgray);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  max-height: 560px;
}

.lc-field-group { display: flex; flex-direction: column; gap: 4px; }

.lc-field-label {
  font-size: 9px;
  color: var(--gray);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.lc-field-label .req { color: #cc785c; margin-left: 4px; }

.lc-input {
  background: var(--background);
  border: 1px solid var(--lightgray);
  color: var(--dark);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 6px 8px;
  border-radius: 3px;
  width: 100%;
  outline: none;
  transition: border-color 0.15s;
}

.lc-input:focus { border-color: #cc785c; }

.lc-section-rule { height: 1px; background: var(--lightgray); margin: 4px 0; }

.lc-section-label {
  font-size: 9px;
  color: #cc785c;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 2px;
}

.lc-color-row { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }

.lc-color-field { display: flex; flex-direction: column; gap: 3px; }

.lc-color-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--background);
  border: 1px solid var(--lightgray);
  border-radius: 3px;
  padding: 3px 6px;
}

.lc-color-wrap input[type="color"] {
  width: 20px; height: 20px;
  border: none; background: none;
  cursor: pointer; padding: 0; border-radius: 2px;
}

.lc-color-hex {
  font-size: 10px;
  color: var(--dark);
  font-family: var(--font-mono);
  background: none; border: none; outline: none;
  width: 62px;
}

.lc-panel-right { display: flex; flex-direction: column; }

.lc-tab-row {
  display: flex;
  border-bottom: 1px solid var(--lightgray);
}

.lc-tab {
  font-size: 9px; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase;
  padding: 8px 14px; cursor: pointer;
  color: var(--gray);
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
  background: none;
  border-top: none; border-left: none; border-right: none;
  font-family: var(--font-mono);
}

.lc-tab.active { color: #cc785c; border-bottom-color: #cc785c; }
.lc-tab:hover:not(.active) { color: var(--dark); }

.lc-preview-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  background: var(--lightgray);
  min-height: 200px;
}

.lc-preview-label {
  font-size: 9px; color: var(--gray);
  letter-spacing: 2px; text-transform: uppercase;
  align-self: flex-start;
}

.lc-svg-wrap {
  width: 100%; max-width: 520px;
  border: 1px solid var(--lightgray);
  border-radius: 4px; overflow: hidden;
  background: #fff;
}

.lc-svg-wrap svg { width: 100%; height: auto; display: block; }

.lc-divider {
  width: 100%; max-width: 520px;
  display: flex; align-items: center; gap: 8px;
}

.lc-divider-line { flex: 1; border-top: 1px dashed var(--gray); }
.lc-divider-label { font-size: 9px; color: var(--gray); letter-spacing: 1.5px; }

.lc-action-bar {
  border-top: 1px solid var(--lightgray);
  padding: 10px 16px;
  display: flex; gap: 8px; align-items: center;
  background: var(--lightgray);
  flex-wrap: wrap;
}

.lc-btn {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase;
  padding: 7px 12px; border-radius: 3px;
  cursor: pointer; border: 1px solid;
  transition: all 0.15s;
}

.lc-btn-primary {
  background: #cc785c; border-color: #cc785c; color: #fff;
}
.lc-btn-primary:hover { background: #b86848; border-color: #b86848; }

.lc-btn-ghost {
  background: transparent;
  border-color: var(--lightgray);
  color: var(--gray);
}
.lc-btn-ghost:hover { border-color: #cc785c; color: #cc785c; }

.lc-status { font-size: 9px; color: var(--gray); letter-spacing: 1px; margin-left: auto; }
.lc-status.ok { color: #cc785c; }

.lc-preset-row { display: flex; gap: 6px; }

.lc-preset-btn {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase;
  padding: 8px 0; border-radius: 3px;
  cursor: pointer;
  border: 1px solid var(--lightgray);
  background: transparent; color: var(--gray);
  transition: all 0.15s; flex: 1;
}
.lc-preset-btn:hover { border-color: #cc785c; color: #cc785c; }
.lc-preset-btn.lc-active { border-color: #cc785c; color: #cc785c; background: rgba(204,120,92,0.08); }

.lc-two { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
</style>

<div class="lc-wrap">
  <div class="lc-header">
    <span class="lc-header-title">ALR Label Creator</span>
    <span class="lc-header-sub">70mm × 20mm · PSA STANDARD</span>
  </div>

  <div class="lc-body">
    <div class="lc-panel-left">

      <div class="lc-section-label">Preset</div>
      <div class="lc-preset-row">
        <button class="lc-preset-btn lc-active" id="lc-preset-dark" onclick="lcApplyPreset('dark')">ALR Dark</button>
        <button class="lc-preset-btn" id="lc-preset-light" onclick="lcApplyPreset('light')">ALR Light</button>
      </div>

      <div class="lc-section-rule"></div>
      <div class="lc-section-label">Card Identity</div>

      <div class="lc-field-group">
        <div class="lc-field-label">Card Name <span class="req">*</span></div>
        <input class="lc-input" id="lc-name" value="MONKEY D. LUFFY" oninput="lcUpdate()">
      </div>
      <div class="lc-field-group">
        <div class="lc-field-label">Set / Series</div>
        <input class="lc-input" id="lc-set" value="ONE PIECE · ST21 · EN · 2025" oninput="lcUpdate()">
      </div>
      <div class="lc-field-group">
        <div class="lc-field-label">Variant / Edition</div>
        <input class="lc-input" id="lc-variant" value="B&W ALT ART" oninput="lcUpdate()">
      </div>
      <div class="lc-field-group">
        <div class="lc-field-label">Cert Number</div>
        <input class="lc-input" id="lc-cert" value="0001-ALR" oninput="lcUpdate()">
      </div>

      <div class="lc-section-rule"></div>
      <div class="lc-section-label">Grade</div>

      <div class="lc-two">
        <div class="lc-field-group">
          <div class="lc-field-label">Grade</div>
          <input class="lc-input" type="number" id="lc-grade" value="10" min="1" max="10" oninput="lcUpdate()">
        </div>
        <div class="lc-field-group">
          <div class="lc-field-label">Grade Label</div>
          <input class="lc-input" id="lc-grade-label" value="PRISTINE" oninput="lcUpdate()">
        </div>
      </div>

      <div class="lc-section-rule"></div>
      <div class="lc-section-label">Colours</div>

      <div class="lc-color-row">
        <div class="lc-color-field">
          <div class="lc-field-label">Body BG</div>
          <div class="lc-color-wrap">
            <input type="color" id="lc-cbody" value="#1a1814" oninput="lcSyncHex(this,'lc-hbody');lcClearPreset();lcUpdate()">
            <input class="lc-color-hex" id="lc-hbody" value="#1a1814" oninput="lcSyncColor(this,'lc-cbody');lcClearPreset();lcUpdate()">
          </div>
        </div>
        <div class="lc-color-field">
          <div class="lc-field-label">Zone BG</div>
          <div class="lc-color-wrap">
            <input type="color" id="lc-czone" value="#141410" oninput="lcSyncHex(this,'lc-hzone');lcClearPreset();lcUpdate()">
            <input class="lc-color-hex" id="lc-hzone" value="#141410" oninput="lcSyncColor(this,'lc-czone');lcClearPreset();lcUpdate()">
          </div>
        </div>
      </div>

      <div class="lc-color-row">
        <div class="lc-color-field">
          <div class="lc-field-label">Accent</div>
          <div class="lc-color-wrap">
            <input type="color" id="lc-caccent" value="#cc785c" oninput="lcSyncHex(this,'lc-haccent');lcClearPreset();lcUpdate()">
            <input class="lc-color-hex" id="lc-haccent" value="#cc785c" oninput="lcSyncColor(this,'lc-caccent');lcClearPreset();lcUpdate()">
          </div>
        </div>
        <div class="lc-color-field">
          <div class="lc-field-label">Grade Colour</div>
          <div class="lc-color-wrap">
            <input type="color" id="lc-cgrade" value="#cc785c" oninput="lcSyncHex(this,'lc-hgrade');lcClearPreset();lcUpdate()">
            <input class="lc-color-hex" id="lc-hgrade" value="#cc785c" oninput="lcSyncColor(this,'lc-cgrade');lcClearPreset();lcUpdate()">
          </div>
        </div>
      </div>

      <div class="lc-color-row">
        <div class="lc-color-field">
          <div class="lc-field-label">Primary Text</div>
          <div class="lc-color-wrap">
            <input type="color" id="lc-ctext" value="#f0ece0" oninput="lcSyncHex(this,'lc-htext');lcClearPreset();lcUpdate()">
            <input class="lc-color-hex" id="lc-htext" value="#f0ece0" oninput="lcSyncColor(this,'lc-ctext');lcClearPreset();lcUpdate()">
          </div>
        </div>
        <div class="lc-color-field">
          <div class="lc-field-label">Secondary Text</div>
          <div class="lc-color-wrap">
            <input type="color" id="lc-cmuted" value="#b0ac9f" oninput="lcSyncHex(this,'lc-hmuted');lcClearPreset();lcUpdate()">
            <input class="lc-color-hex" id="lc-hmuted" value="#b0ac9f" oninput="lcSyncColor(this,'lc-cmuted');lcClearPreset();lcUpdate()">
          </div>
        </div>
      </div>

    </div>

    <div class="lc-panel-right">
      <div class="lc-tab-row">
        <button class="lc-tab active" id="lc-tab-front" onclick="lcSwitchTab('front')">Front</button>
        <button class="lc-tab" id="lc-tab-back" onclick="lcSwitchTab('back')">Back</button>
        <button class="lc-tab" id="lc-tab-both" onclick="lcSwitchTab('both')">Fold Sheet</button>
      </div>
      <div class="lc-preview-area" id="lc-preview"></div>
      <div class="lc-action-bar">
        <button class="lc-btn lc-btn-primary" onclick="lcDownload('front')">↓ Front</button>
        <button class="lc-btn lc-btn-ghost" onclick="lcDownload('back')">↓ Back</button>
        <button class="lc-btn lc-btn-ghost" onclick="lcDownload('foldcut')">↓ Fold Sheet</button>
        <span class="lc-status ok" id="lc-status">Ready</span>
      </div>
    </div>
  </div>
</div>

<script>
(function() {
  var lcTab = 'front';

  var PRESETS = {
    dark:  { body:'#1a1814', zone:'#141410', accent:'#cc785c', grade:'#cc785c', text:'#f0ece0', muted:'#b0ac9f' },
    light: { body:'#f5f0e8', zone:'#ede8dc', accent:'#cc785c', grade:'#cc785c', text:'#1a1814', muted:'#6b6050' }
  };

  window.lcApplyPreset = function(name) {
    var p = PRESETS[name];
    lcSet('lc-cbody','lc-hbody',p.body);
    lcSet('lc-czone','lc-hzone',p.zone);
    lcSet('lc-caccent','lc-haccent',p.accent);
    lcSet('lc-cgrade','lc-hgrade',p.grade);
    lcSet('lc-ctext','lc-htext',p.text);
    lcSet('lc-cmuted','lc-hmuted',p.muted);
    document.querySelectorAll('.lc-preset-btn').forEach(function(b){ b.classList.remove('lc-active'); });
    document.getElementById('lc-preset-'+name).classList.add('lc-active');
    lcUpdate();
  };

  window.lcClearPreset = function() {
    document.querySelectorAll('.lc-preset-btn').forEach(function(b){ b.classList.remove('lc-active'); });
  };

  function lcSet(cid, hid, val) {
    document.getElementById(cid).value = val;
    document.getElementById(hid).value = val;
  }

  window.lcSyncHex = function(el, hid) { document.getElementById(hid).value = el.value; };
  window.lcSyncColor = function(el, cid) { if(/^#[0-9a-fA-F]{6}$/.test(el.value)) document.getElementById(cid).value = el.value; };

  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function g(id) { return document.getElementById(id); }

  function getV() {
    return {
      name:  g('lc-name').value||'CARD NAME',
      set:   g('lc-set').value||'SET · SERIES · EN · YEAR',
      variant: g('lc-variant').value||'VARIANT',
      cert:  g('lc-cert').value||'0000-ALR',
      grade: g('lc-grade').value||'10',
      gl:    g('lc-grade-label').value||'PRISTINE',
      body:  g('lc-cbody').value,
      zone:  g('lc-czone').value,
      acc:   g('lc-caccent').value,
      gcol:  g('lc-cgrade').value,
      text:  g('lc-ctext').value,
      muted: g('lc-cmuted').value
    };
  }

  function dk(hex, a) {
    var n=parseInt(hex.slice(1),16);
    var r=Math.max(0,((n>>16)&255)-a), gr=Math.max(0,((n>>8)&255)-a), b=Math.max(0,(n&255)-a);
    return '#'+[r,gr,b].map(function(x){return x.toString(16).padStart(2,'0');}).join('');
  }

  function front(v) {
    var div=dk(v.acc,40), dl=dk(v.zone,5);
    return '<svg width="70mm" height="20mm" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">'
      +'<defs>'
      +'<clipPath id="m"><rect x="0" y="0" width="700" height="200" rx="4"/></clipPath>'
      +'<clipPath id="cl"><rect x="0" y="0" width="521" height="200"/></clipPath>'
      +'<clipPath id="cr"><rect x="522" y="0" width="178" height="200"/></clipPath>'
      +'<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">'
      +'<stop offset="0%" stop-color="'+div+'"/><stop offset="45%" stop-color="'+v.acc+'"/><stop offset="100%" stop-color="'+div+'"/>'
      +'</linearGradient>'
      +'<pattern id="scn" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">'
      +'<rect x="0" y="2" width="4" height="2" fill="#000" opacity="0.07"/></pattern>'
      +'</defs>'
      +'<rect x="0" y="0" width="700" height="200" rx="4" fill="'+v.body+'"/>'
      +'<g clip-path="url(#m)">'
      +'<rect x="0" y="0" width="700" height="200" fill="url(#scn)"/>'
      +'<g clip-path="url(#cl)">'
      +'<rect x="0" y="0" width="519" height="200" fill="'+v.zone+'" opacity="0.85"/>'
      +'<text x="261" y="30" text-anchor="middle" font-size="21" font-weight="700" fill="'+v.acc+'" letter-spacing="2" font-family="\'Courier New\',Courier,monospace">ALR INITIATIVE GRADING</text>'
      +'<line x1="0" y1="35" x2="519" y2="35" stroke="'+v.acc+'" stroke-width="0.7" opacity="0.35"/>'
      +'<text x="10" y="61" font-size="28" font-weight="700" fill="'+v.text+'" letter-spacing="0" font-family="\'Courier New\',Courier,monospace">'+esc(v.name)+'</text>'
      +'<line x1="10" y1="67" x2="510" y2="67" stroke="'+dl+'" stroke-width="1"/>'
      +'<text x="10" y="88" font-size="19" font-weight="700" fill="'+v.muted+'" letter-spacing="0" font-family="\'Courier New\',Courier,monospace">'+esc(v.set)+'</text>'
      +'<line x1="10" y1="94" x2="510" y2="94" stroke="'+dl+'" stroke-width="1"/>'
      +'<text x="10" y="115" font-size="21" font-weight="700" fill="'+v.acc+'" letter-spacing="0" font-family="\'Courier New\',Courier,monospace">'+esc(v.variant)+'</text>'
      +'<line x1="10" y1="121" x2="510" y2="121" stroke="'+dl+'" stroke-width="1"/>'
      +'<text x="10" y="133" font-size="16" font-weight="700" fill="'+v.muted+'" letter-spacing="1.2" font-family="\'Courier New\',Courier,monospace">CATEGORY</text>'
      +'<text x="10" y="150" font-size="19" font-weight="700" fill="'+v.text+'" letter-spacing="0" font-family="\'Courier New\',Courier,monospace">TRADING CARD</text>'
      +'<line x1="262" y1="123" x2="262" y2="154" stroke="'+dl+'" stroke-width="1"/>'
      +'<text x="267" y="133" font-size="16" font-weight="700" fill="'+v.muted+'" letter-spacing="1.2" font-family="\'Courier New\',Courier,monospace">LANGUAGE</text>'
      +'<text x="267" y="150" font-size="19" font-weight="700" fill="'+v.text+'" letter-spacing="0" font-family="\'Courier New\',Courier,monospace">ENGLISH</text>'
      +'<line x1="10" y1="155" x2="510" y2="155" stroke="'+dl+'" stroke-width="1"/>'
      +'<text x="10" y="169" font-size="16" font-weight="700" fill="'+v.muted+'" letter-spacing="1.2" font-family="\'Courier New\',Courier,monospace">CERT NUMBER</text>'
      +'<text x="10" y="187" font-size="19" font-weight="700" fill="'+v.text+'" letter-spacing="0" font-family="\'Courier New\',Courier,monospace">'+esc(v.cert)+'</text>'
      +'</g>'
      +'<g clip-path="url(#cr)">'
      +'<rect x="522" y="0" width="178" height="200" fill="'+dk(v.zone,15)+'" opacity="0.92"/>'
      +'<line x1="522" y1="0" x2="522" y2="200" stroke="'+v.acc+'" stroke-width="1.5" opacity="0.4"/>'
      +'<text x="611" y="29" text-anchor="middle" font-size="15" font-weight="700" fill="'+v.muted+'" letter-spacing="1.8" font-family="\'Courier New\',Courier,monospace">ARCHIVE GRADE</text>'
      +'<line x1="528" y1="35" x2="688" y2="35" stroke="'+v.acc+'" stroke-width="0.7" opacity="0.35"/>'
      +'<text x="611" y="128" text-anchor="middle" font-size="110" font-weight="700" fill="'+v.gcol+'" font-family="\'Courier New\',Courier,monospace">'+esc(v.grade)+'</text>'
      +'<line x1="528" y1="168" x2="688" y2="168" stroke="'+dl+'" stroke-width="1"/>'
      +'<text x="611" y="184" text-anchor="middle" font-size="17" font-weight="700" fill="'+v.muted+'" letter-spacing="3.5" font-family="\'Courier New\',Courier,monospace">'+esc(v.gl)+'</text>'
      +'<line x1="528" y1="190" x2="688" y2="190" stroke="'+v.acc+'" stroke-width="0.7" opacity="0.35"/>'
      +'</g></g>'
      +'<rect x="1.5" y="1.5" width="697" height="197" rx="3.5" fill="none" stroke="url(#bg)" stroke-width="5"/>'
      +'</svg>';
  }

  function back(v) {
    var div=dk(v.acc,40);
    return '<svg width="70mm" height="20mm" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">'
      +'<defs>'
      +'<clipPath id="m"><rect x="0" y="0" width="700" height="200" rx="4"/></clipPath>'
      +'<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">'
      +'<stop offset="0%" stop-color="'+div+'"/><stop offset="45%" stop-color="'+v.acc+'"/><stop offset="100%" stop-color="'+div+'"/>'
      +'</linearGradient>'
      +'<radialGradient id="glow" cx="50%" cy="50%" r="40%">'
      +'<stop offset="0%" stop-color="'+v.acc+'" stop-opacity="0.08"/>'
      +'<stop offset="100%" stop-color="'+v.acc+'" stop-opacity="0"/>'
      +'</radialGradient>'
      +'<pattern id="scn" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">'
      +'<rect x="0" y="2" width="4" height="2" fill="#000" opacity="0.07"/></pattern>'
      +'</defs>'
      +'<rect x="0" y="0" width="700" height="200" rx="4" fill="'+v.body+'"/>'
      +'<g clip-path="url(#m)">'
      +'<rect x="0" y="0" width="700" height="200" fill="'+v.zone+'" opacity="0.7"/>'
      +'<rect x="0" y="0" width="700" height="200" fill="url(#scn)"/>'
      +'<line x1="0" y1="160" x2="180" y2="0" stroke="'+v.acc+'" stroke-width="1.2" opacity="0.08"/>'
      +'<line x1="500" y1="200" x2="700" y2="60" stroke="'+v.acc+'" stroke-width="1" opacity="0.06"/>'
      +'<ellipse cx="350" cy="100" rx="220" ry="88" fill="url(#glow)"/>'
      +'<line x1="30" y1="100" x2="218" y2="100" stroke="'+v.acc+'" stroke-width="0.8" opacity="0.4"/>'
      +'<line x1="482" y1="100" x2="670" y2="100" stroke="'+v.acc+'" stroke-width="0.8" opacity="0.4"/>'
      +'<polygon points="224,100 234,91 244,100 234,109" fill="none" stroke="'+v.acc+'" stroke-width="1" opacity="0.5"/>'
      +'<polygon points="456,100 466,91 476,100 466,109" fill="none" stroke="'+v.acc+'" stroke-width="1" opacity="0.5"/>'
      +'<text x="350" y="92" text-anchor="middle" font-size="68" font-weight="700" fill="'+v.text+'" letter-spacing="6" font-family="\'Courier New\',Courier,monospace">ALR</text>'
      +'<text x="350" y="116" text-anchor="middle" font-size="19" font-weight="700" fill="'+v.muted+'" letter-spacing="5" font-family="\'Courier New\',Courier,monospace">INITIATIVE</text>'
      +'<line x1="274" y1="123" x2="426" y2="123" stroke="'+v.acc+'" stroke-width="0.6" opacity="0.4"/>'
      +'<text x="350" y="140" text-anchor="middle" font-size="14" font-weight="700" fill="'+dk(v.muted,20)+'" letter-spacing="2" font-family="\'Courier New\',Courier,monospace">ARCHIVE · GRADE · CERTIFIED</text>'
      +'<line x1="18" y1="22" x2="38" y2="22" stroke="'+v.acc+'" stroke-width="0.9" opacity="0.5"/>'
      +'<line x1="18" y1="22" x2="18" y2="42" stroke="'+v.acc+'" stroke-width="0.9" opacity="0.5"/>'
      +'<line x1="682" y1="22" x2="662" y2="22" stroke="'+v.acc+'" stroke-width="0.9" opacity="0.5"/>'
      +'<line x1="682" y1="22" x2="682" y2="42" stroke="'+v.acc+'" stroke-width="0.9" opacity="0.5"/>'
      +'<line x1="18" y1="178" x2="38" y2="178" stroke="'+v.acc+'" stroke-width="0.9" opacity="0.5"/>'
      +'<line x1="18" y1="178" x2="18" y2="158" stroke="'+v.acc+'" stroke-width="0.9" opacity="0.5"/>'
      +'<line x1="682" y1="178" x2="662" y2="178" stroke="'+v.acc+'" stroke-width="0.9" opacity="0.5"/>'
      +'<line x1="682" y1="178" x2="682" y2="158" stroke="'+v.acc+'" stroke-width="0.9" opacity="0.5"/>'
      +'</g>'
      +'<rect x="1.5" y="1.5" width="697" height="197" rx="3.5" fill="none" stroke="url(#bg)" stroke-width="5"/>'
      +'</svg>';
  }

  function fold(v) {
    return '<svg width="70mm" height="40.6mm" viewBox="0 0 700 406" xmlns="http://www.w3.org/2000/svg">'
      +'<rect x="0" y="0" width="700" height="406" fill="#ffffff"/>'
      +'<g transform="translate(0,0)"><svg width="700" height="200" viewBox="0 0 700 200">'+front(v)+'</svg></g>'
      +'<g transform="translate(700,406) rotate(180)"><svg width="700" height="200" viewBox="0 0 700 200">'+back(v)+'</svg></g>'
      +'<line x1="0" y1="203" x2="700" y2="203" stroke="#888" stroke-width="0.7" stroke-dasharray="8,6"/>'
      +'<g stroke="#000" stroke-width="0.7" fill="none" stroke-linecap="square">'
      +'<line x1="-70" y1="0" x2="-20" y2="0"/><line x1="0" y1="-70" x2="0" y2="-20"/>'
      +'<line x1="720" y1="0" x2="770" y2="0"/><line x1="700" y1="-70" x2="700" y2="-20"/>'
      +'<line x1="-70" y1="406" x2="-20" y2="406"/><line x1="0" y1="426" x2="0" y2="476"/>'
      +'<line x1="720" y1="406" x2="770" y2="406"/><line x1="700" y1="426" x2="700" y2="476"/>'
      +'</g></svg>';
  }

  window.lcSwitchTab = function(tab) {
    lcTab = tab;
    document.querySelectorAll('.lc-tab').forEach(function(t){ t.classList.remove('active'); });
    document.getElementById('lc-tab-'+tab).classList.add('active');
    lcRender();
  };

  function lcRender() {
    var v = getV();
    var el = document.getElementById('lc-preview');
    if (lcTab === 'both') {
      el.innerHTML = '<div class="lc-preview-label">Front — fold line — Back (rotated)</div>'
        +'<div class="lc-svg-wrap">'+front(v)+'</div>'
        +'<div class="lc-divider"><div class="lc-divider-line"></div><div class="lc-divider-label">FOLD</div><div class="lc-divider-line"></div></div>'
        +'<div class="lc-svg-wrap">'+back(v)+'</div>';
    } else {
      var svg = lcTab === 'front' ? front(v) : back(v);
      var lbl = lcTab === 'front' ? 'Front' : 'Back (rotated when printed)';
      el.innerHTML = '<div class="lc-preview-label">'+lbl+'</div><div class="lc-svg-wrap">'+svg+'</div>';
    }
  }

  window.lcUpdate = function() { lcRender(); document.getElementById('lc-status').textContent = 'Updated'; };

  window.lcDownload = function(which) {
    var v = getV(); var svg, fn;
    if (which==='front')     { svg=front(v); fn='alr_label_front.svg'; }
    else if (which==='back') { svg=back(v);  fn='alr_label_back.svg'; }
    else                     { svg=fold(v);  fn='alr_label_foldcut.svg'; }
    var b = new Blob([svg],{type:'image/svg+xml'});
    var u = URL.createObjectURL(b);
    var a = document.createElement('a');
    a.href=u; a.download=fn;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(u);
    document.getElementById('lc-status').textContent = 'Downloaded \u2713';
  };

  lcRender();
})();
</script>

</div>

> [!info] Print Instructions
> Download the **Fold Sheet** SVG. Open in a browser, print at **100% / Actual Size** (no fit to page), margins **None**. Cut the outer rectangle, fold on the dashed line.
> 