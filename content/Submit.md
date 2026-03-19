<div class="alr-submit-page">

<div class="alr-submit-header">
  <div class="alr-eyebrow" style="margin-bottom:8px;">Archive of Lost Realities Initiative</div>
  <h1 class="alr-hero-title" style="margin-bottom:8px;">Submit an Echo</h1>
  <p class="alr-hero-sub" style="margin-bottom:0;">Field investigators and independent researchers may submit Echo documentation for review by the ALR Initiative. All submissions are reviewed before inclusion in the archive. Refer to the <a href="/alr-archive/Archive-Documentation-Format/Echo-Entry-Format">Echo Entry Format</a> guide before completing this form.</p>
</div>

<div class="alr-submit-notice">
  <div class="alr-submit-notice-dot"></div>
  <div>
    <div class="alr-submit-notice-title">Submission Review Policy</div>
    <div class="alr-submit-notice-text">All submissions enter a review queue and are evaluated by Archive Operations before formal documentation. Submissions that do not follow the Echo Entry Format guidelines may be returned for revision. The ALR Initiative reserves the right to decline any submission.</div>
  </div>
</div>

<form class="alr-submit-form" action="https://formspree.io/f/mwvraddn" method="POST">

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Identity</div>
    <div class="alr-submit-row">
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="submitter-name">Submitter Name or Handle</label>
        <input class="alr-submit-input" type="text" id="submitter-name" name="submitter_name" placeholder="E. Maren" required />
      </div>
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="submitter-email">Contact Email</label>
        <input class="alr-submit-input" type="email" id="submitter-email" name="submitter_email" placeholder="investigator@example.com" required />
      </div>
    </div>
  </div>

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Echo Identification</div>
    <div class="alr-submit-row">
      <div class="alr-submit-field alr-submit-field-wide">
        <label class="alr-submit-label" for="echo-name">Echo Designation</label>
        <input class="alr-submit-input" type="text" id="echo-name" name="echo_name" placeholder="e.g. The Hollow Gate" required />
      </div>
    </div>
    <div class="alr-submit-row">
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="echo-desc">Description</label>
        <textarea class="alr-submit-textarea" id="echo-desc" name="echo_description" rows="4" placeholder="Provide a concise description of the Echo. What is it? What does it appear to be? What is known about its origin?" required></textarea>
      </div>
    </div>
  </div>

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Classification</div>
    <div class="alr-submit-row alr-submit-row-grid">
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="ec">Echo Classification (EC)</label>
        <select class="alr-submit-select" id="ec" name="ec" required>
          <option value="" disabled selected>Select type</option>
          <option value="ENT">ENT — Entity</option>
          <option value="OBJ">OBJ — Object</option>
          <option value="LOC">LOC — Location</option>
          <option value="PHN">PHN — Phenomenon</option>
          <option value="EVT">EVT — Event</option>
        </select>
      </div>
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="esc">Echo Stability (ESC)</label>
        <select class="alr-submit-select" id="esc" name="esc" required>
          <option value="" disabled selected>Select stability</option>
          <option value="S1">S1 — Stable</option>
          <option value="S2">S2 — Volatile</option>
          <option value="S3">S3 — Fractured</option>
          <option value="S4">S4 — Terminal</option>
        </select>
      </div>
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="rcc">Reality Collapse Classification (RCC)</label>
        <select class="alr-submit-select" id="rcc" name="rcc" required>
          <option value="" disabled selected>Select collapse type</option>
          <option value="RCC-1">RCC-1 — Silent Collapse</option>
          <option value="RCC-2">RCC-2 — Systemic Failure</option>
          <option value="RCC-3">RCC-3 — Catastrophic Collapse</option>
        </select>
      </div>
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="rts">Reality Tier (RTS)</label>
        <select class="alr-submit-select" id="rts" name="rts" required>
          <option value="" disabled selected>Select tier</option>
          <option value="T1">T1 — Fragmentary</option>
          <option value="T2">T2 — Localized</option>
          <option value="T3">T3 — Developed</option>
          <option value="T4">T4 — Grand</option>
          <option value="T5">T5 — Cosmic</option>
        </select>
      </div>
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="rds">Reality Divergence (RDS)</label>
        <select class="alr-submit-select" id="rds" name="rds" required>
          <option value="" disabled selected>Select divergence</option>
          <option value="A">A — Analogous</option>
          <option value="B">B — Variant</option>
          <option value="C">C — Divergent</option>
          <option value="D">D — Exotic</option>
        </select>
      </div>
    </div>
  </div>

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Field Documentation</div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="observed-behavior">Observed Behavior</label>
      <textarea class="alr-submit-textarea" id="observed-behavior" name="observed_behavior" rows="4" placeholder="Describe the behavior of the Echo as observed in the field. How does it act? Does it respond to external stimuli? Has its behavior changed over time?" required></textarea>
    </div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="manifestation">Manifestation Pattern</label>
      <textarea class="alr-submit-textarea" id="manifestation" name="manifestation_pattern" rows="4" placeholder="When and how does the Echo manifest? Is it persistent, cyclical, or triggered? Describe the conditions of manifestation." required></textarea>
    </div>
    <div class="alr-submit-field">
      <label class="alr-submit-label" for="investigator-notes">Investigator Notes</label>
      <textarea class="alr-submit-textarea" id="investigator-notes" name="investigator_notes" rows="4" placeholder="Any additional observations, hypotheses, or field notes relevant to this Echo. Personal commentary is permitted in this section."></textarea>
    </div>
  </div>

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Declaration</div>
    <div class="alr-submit-declaration">
      <input type="checkbox" id="declaration" name="declaration" required style="accent-color:#cc785c;margin-right:10px;flex-shrink:0;" />
      <label for="declaration" class="alr-submit-declaration-text">I confirm that this submission is original documentation and that I have reviewed the Echo Entry Format guidelines. I understand that submission does not guarantee inclusion in the archive.</label>
    </div>
  </div>

  <div class="alr-submit-actions">
    <button type="submit" class="alr-submit-btn">Submit for Review</button>
    <span class="alr-submit-hint">Submissions are reviewed by Archive Operations. You will not receive an automated confirmation.</span>
  </div>

</form>

</div>