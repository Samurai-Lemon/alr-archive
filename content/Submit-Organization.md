
<div class="alr-submit-page">

<div class="alr-submit-header">
  <div class="alr-eyebrow" style="margin-bottom:8px;">Archive of Lost Realities Initiative</div>
  <h1 class="alr-hero-title" style="margin-bottom:8px;">Submit an Organization Entry</h1>
  <p class="alr-hero-sub" style="margin-bottom:0;">
  Researchers and contributors may submit organization entries for review by the ALR Initiative. All submissions are processed under Archive Protocols and reviewed prior to inclusion. Refer to the <a href="/Archive-Documentation-Format/Organization-Entry-Format" class="internal">Organization Entry Format</a> guide before completing this form, and ensure compliance with the <a href="/Protocols/Terms-of-Submission" class="internal">Submission Protocol</a> and <a href="/Protocols/License" class="internal">Archive Licensing Protocol</a>.
  </p>
</div>

<div class="alr-submit-notice">
  <div class="alr-submit-notice-dot"></div>
  <div>
    <div class="alr-submit-notice-title">Submission Review Policy</div>
    <div class="alr-submit-notice-text">All submissions enter a review queue and are evaluated by Archive Operations before formal documentation. Submissions that do not follow the Organization Entry Format guidelines may be returned for revision. The ALR Initiative reserves the right to decline any submission.</div>
  </div>
</div>

<form class="alr-submit-form" action="https://formspree.io/f/REPLACE_WITH_ORG_FORM_ID" method="POST">

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Identity</div>
    <div class="alr-submit-row">
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="submitter-name">Submitter Name or Handle</label>
        <input class="alr-submit-input" type="text" id="submitter-name" name="submitter_name" placeholder="M. Voss" required />
      </div>
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="submitter-email">Contact Email</label>
        <input class="alr-submit-input" type="email" id="submitter-email" name="submitter_email" placeholder="records@example.com" required />
      </div>
    </div>
  </div>

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Organization Identification</div>
    <div class="alr-submit-row">
      <div class="alr-submit-field alr-submit-field-wide">
        <label class="alr-submit-label" for="org-name">Organization Name</label>
        <input class="alr-submit-input" type="text" id="org-name" name="organization_name" placeholder="e.g. Reality Investigation Division" required />
      </div>
    </div>
    <div class="alr-submit-row alr-submit-row-grid">
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="operational-status">Operational Status</label>
        <select class="alr-submit-select" id="operational-status" name="operational_status" required>
          <option value="" disabled selected>Select status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Dissolved">Dissolved</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
      <div class="alr-submit-field">
        <label class="alr-submit-label" for="primary-domain">Primary Domain</label>
        <select class="alr-submit-select" id="primary-domain" name="primary_domain" required>
          <option value="" disabled selected>Select domain</option>
          <option value="Field Investigation">Field Investigation</option>
          <option value="Research">Research</option>
          <option value="Archive Management">Archive Management</option>
          <option value="Device Development">Device Development</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  </div>

  <div class="alr-submit-section">
    <div class="alr-submit-section-label">Organization Documentation</div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="org-description">Description</label>
      <textarea class="alr-submit-textarea" id="org-description" name="description" rows="4" placeholder="Provide a concise description of the organization. What is it? What is its purpose? Where does it sit within the institutional structure?" required></textarea>
    </div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="org-history">History</label>
      <textarea class="alr-submit-textarea" id="org-history" name="history" rows="4" placeholder="Document the known history of the organization. Founding circumstances, significant milestones, changes to structure or function over time." required></textarea>
    </div>
    <div class="alr-submit-field" style="margin-bottom:14px;">
      <label class="alr-submit-label" for="org-activities">Primary Activities</label>
      <textarea class="alr-submit-textarea" id="org-activities" name="primary_activities" rows="3" placeholder="Describe the primary operational activities conducted by this organization." required></textarea>
    </div>
    <div class="alr-submit-field">
      <label class="alr-submit-label" for="submitter-notes">Submitter Notes</label>
      <textarea class="alr-submit-textarea" id="submitter-notes" name="submitter_notes" rows="4" placeholder="Any additional context, observations, or archive flags relevant to this submission. Personal commentary is permitted in this section."></textarea>
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