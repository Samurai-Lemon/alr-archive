
<div class="alr-submit-page">

<div class="alr-submit-header">
  <div class="alr-eyebrow" style="margin-bottom:8px;">Archive of Lost Realities Initiative</div>
  <h1 class="alr-hero-title" style="margin-bottom:8px;">Submit a Device</h1>
  <p class="alr-hero-sub" style="margin-bottom:0;">
  Researchers and engineers may submit device documentation for review by the ALR Initiative. All submissions are processed under Archive Protocols and reviewed prior to inclusion. Refer to the <a href="/Archive-Documentation-Format/Device-Entry-Format" class="internal">Device Entry Format</a> guide before completing this form, and ensure compliance with the <a href="/Protocols/Terms-of-Submission" class="internal">Submission Protocol</a> and <a href="/Protocols/License" class="internal">Archive Licensing Protocol</a>.
  </p>
</div>

<div class="alr-submit-notice">
  <div class="alr-submit-notice-dot"></div>
  <div>
    <div class="alr-submit-notice-title">Submission Review Policy</div>
    <div class="alr-submit-notice-text">All submissions enter a review queue and are evaluated by Archive Operations before formal documentation. Submissions that do not follow the Device Entry Format guidelines may be returned for revision. The ALR Initiative reserves the right to decline any submission.</div>
  </div>
</div>

<form class="alr-submit-form" action="https://formspree.io/f/mojplqrg" method="POST">

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Identity</div>
    <div class="alr-submit-row">
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="submitter-name">Submitter Name or Handle</label>
        <input class="alr-submit-input" type="text" id="submitter-name" name="submitter_name" placeholder="K. Albrecht" required />
      </div>
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="submitter-email">Contact Email</label>
        <input class="alr-submit-input" type="email" id="submitter-email" name="submitter_email" placeholder="engineer@example.com" required />
      </div>
    </div>
  </div>

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Device Identification</div>
    <div class="alr-submit-row">
      <div class="alr-submit-field alr-submit-field-wide">
        <label class="alr-submit-label" for="device-name">Device Name</label>
        <input class="alr-submit-input" type="text" id="device-name" name="device_name" placeholder="e.g. ECHO Scanner Unit" required />
      </div>
    </div>
    <div class="alr-submit-row alr-submit-row-grid">
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="device-type">Device Type</label>
        <select class="alr-submit-select" id="device-type" name="device_type" required>
          <option value="" disabled selected>Select type</option>
          <option value="Communications Interface">Communications Interface</option>
          <option value="Anomaly Detection / Scanning">Anomaly Detection / Scanning</option>
          <option value="Recording / Documentation">Recording / Documentation</option>
          <option value="Field Investigation Equipment">Field Investigation Equipment</option>
          <option value="Archive Access / Interface System">Archive Access / Interface System</option>
          <option value="Containment / Monitoring">Containment / Monitoring</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="operational-status">Operational Status</label>
        <select class="alr-submit-select" id="operational-status" name="operational_status" required>
          <option value="" disabled selected>Select status</option>
          <option value="Active">Active</option>
          <option value="Prototype">Prototype</option>
          <option value="Deprecated">Deprecated</option>
          <option value="Decommissioned">Decommissioned</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
    </div>
  </div>

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Device Documentation</div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="device-function">Primary Function</label>
      <textarea class="alr-submit-textarea" id="device-function" name="primary_function" rows="4" placeholder="Describe the device's primary purpose. What is it designed to do? What operational need does it address?" required></textarea>
    </div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="device-operation">Operating Procedure</label>
      <textarea class="alr-submit-textarea" id="device-operation" name="operating_procedure" rows="4" placeholder="Describe the general operating procedure. Include setup, activation, primary use, and shutdown where applicable." required></textarea>
    </div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="device-limitations">Known Limitations</label>
      <textarea class="alr-submit-textarea" id="device-limitations" name="known_limitations" rows="3" placeholder="Document any confirmed limitations, failure conditions, environmental sensitivities, or constraints on use."></textarea>
    </div>
    <div class="alr-submit-field">
      <label class="alr-submit-label" for="engineer-notes">Engineer Notes</label>
      <textarea class="alr-submit-textarea" id="engineer-notes" name="engineer_notes" rows="4" placeholder="Any additional observations, development context, or technical notes relevant to this device. Personal commentary is permitted in this section."></textarea>
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