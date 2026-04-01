
<div class="alr-submit-page">

<div class="alr-submit-header">
  <div class="alr-eyebrow" style="margin-bottom:8px;">Archive of Lost Realities Initiative</div>
  <h1 class="alr-hero-title" style="margin-bottom:8px;">Submit a Reality Investigation Report</h1>
  <p class="alr-hero-sub" style="margin-bottom:0;">
  Field investigators and independent researchers may submit Reality Investigation Reports for review by the ALR Initiative. All submissions are processed under Archive Protocols and reviewed prior to inclusion. Refer to the <a href="/Archive-Documentation-Format/Reality-Investigation-Report-Format" class="internal">Reality Investigation Report Format</a> guide before completing this form, and ensure compliance with the <a href="/Protocols/Terms-of-Submission" class="internal">Submission Protocol</a> and <a href="/Protocols/License" class="internal">Archive Licensing Protocol</a>.
  </p>
</div>

<div class="alr-submit-notice">
  <div class="alr-submit-notice-dot"></div>
  <div>
    <div class="alr-submit-notice-title">Submission Review Policy</div>
    <div class="alr-submit-notice-text">All submissions enter a review queue and are evaluated by Archive Operations before formal documentation. Submissions that do not follow the Reality Investigation Report Format guidelines may be returned for revision. The ALR Initiative reserves the right to decline any submission.</div>
  </div>
</div>

<form class="alr-submit-form" action="https://formspree.io/f/mojplqqj" method="POST">

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
    <div class="alr-submit-section-label">Reality Identification</div>
    <div class="alr-submit-row">
      <div class="alr-submit-field alr-submit-field-wide">
        <label class="alr-submit-label" for="reality-name">Reality Designation or Informal Name</label>
        <input class="alr-submit-input" type="text" id="reality-name" name="reality_name" placeholder="e.g. The Greywood, R-???" required />
      </div>
    </div>
    <div class="alr-submit-row">
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="reality-overview">Investigation Overview</label>
        <textarea class="alr-submit-textarea" id="reality-overview" name="investigation_overview" rows="4" placeholder="Summarize the circumstances of investigation. How was this reality identified? What prompted formal reporting?" required></textarea>
      </div>
    </div>
  </div>

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Classification</div>
    <div class="alr-submit-row alr-submit-row-grid">
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
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="rcc">Reality Collapse Classification (RCC)</label>
        <select class="alr-submit-select" id="rcc" name="rcc" required>
          <option value="" disabled selected>Select collapse type</option>
          <option value="RCC-1">RCC-1 — Silent Collapse</option>
          <option value="RCC-2">RCC-2 — Systemic Failure</option>
          <option value="RCC-3">RCC-3 — Catastrophic Collapse</option>
        </select>
      </div>
    </div>
  </div>

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Field Documentation</div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="environmental-obs">Environmental Observations</label>
      <textarea class="alr-submit-textarea" id="environmental-obs" name="environmental_observations" rows="4" placeholder="Describe the environmental characteristics of the reality as observed. Atmospheric conditions, spatial properties, anomalous environmental features." required></textarea>
    </div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="civilizational-status">Civilizational Status</label>
      <textarea class="alr-submit-textarea" id="civilizational-status" name="civilizational_status" rows="4" placeholder="Document evidence of prior civilizational presence. Artifacts, structural remnants, cultural indicators, population evidence." required></textarea>
    </div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="collapse-evidence">Collapse Evidence</label>
      <textarea class="alr-submit-textarea" id="collapse-evidence" name="collapse_evidence" rows="4" placeholder="Describe all observed indicators of reality collapse. Material, environmental, structural, and anomalous evidence supporting the assigned RCC." required></textarea>
    </div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="echo-manifestations">Echo Manifestations</label>
      <textarea class="alr-submit-textarea" id="echo-manifestations" name="echo_manifestations" rows="3" placeholder="List any Echoes identified within or associated with this reality. Reference existing entries by designation if known."></textarea>
    </div>
    <div class="alr-submit-field">
      <label class="alr-submit-label" for="investigator-notes">Investigator Notes</label>
      <textarea class="alr-submit-textarea" id="investigator-notes" name="investigator_notes" rows="4" placeholder="Any additional observations, hypotheses, or field notes relevant to this reality. Personal commentary is permitted in this section."></textarea>
    </div>
  </div>

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Declaration</div>
    <div style="display:flex;align-items:flex-start;gap:10px;">
      <input class="alr-submit-checkbox" type="checkbox" id="declaration" name="declaration" required style="margin-top:3px;flex-shrink:0;accent-color:#cc785c;width:14px;height:14px;cursor:pointer;" />
      <label for="declaration" style="font-size:12px;color:#6b6860;line-height:1.6;cursor:pointer;text-align:left;">
      I confirm that this submission is original documentation and that I have reviewed and agree to the <a href="/Protocols/Terms-of-Submission" class="internal">Submission Protocol</a> and <a href="/Protocols/License" class="internal">Archive Licensing Protocol</a>. I acknowledge that submitted material may be modified, classified, and permanently archived by the ALR Initiative, and that submission does not guarantee inclusion.
      </label>
    </div>
  </div>

  <div class="alr-submit-actions">
    <button type="submit" class="alr-submit-btn">Submit for Review</button>
    <span class="alr-submit-hint">Submissions are reviewed by Archive Operations. You will not receive an automated confirmation.</span>
  </div>

</form>

</div>