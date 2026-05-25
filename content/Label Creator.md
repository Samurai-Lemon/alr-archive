---

## title: ALR Label Creator
---
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