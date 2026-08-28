import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const activeCycle = "7"

const ALRAdmin: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="alr-reg-root">

      <div class="alr-reg-banner">
        <div class="alr-reg-banner-meta">
          <div class="alr-reg-banner-meta-item">RESTRICTED ACCESS</div>
          <div class="alr-reg-banner-meta-item">CYCLE {activeCycle} · ARCHIVE OPS</div>
        </div>
        <div class="alr-reg-banner-eyebrow">ALR Initiative — Archive Operations</div>
        <div class="alr-reg-banner-title">Submission Review</div>
        <div class="alr-reg-banner-sub">
          Internal review queue for Archive submissions. Not for general access.
        </div>
      </div>

      <div class="alr-reg-body">

        <div id="alr-admin-gate">
          <div class="alr-reg-empty">Checking clearance...</div>
        </div>

        <div id="alr-admin-content" style="display:none">
          <div class="alr-reg-controls">
            <div class="alr-reg-filter-row">
              <button type="button" class="alr-reg-filter-btn alr-reg-filter-active" data-status-filter="all">All</button>
              <button type="button" class="alr-reg-filter-btn" data-status-filter="pending">Pending</button>
              <button type="button" class="alr-reg-filter-btn" data-status-filter="approved">Approved</button>
              <button type="button" class="alr-reg-filter-btn" data-status-filter="rejected">Rejected</button>
            </div>
          </div>

          <div class="alr-reg-table-wrap" style="margin-bottom:20px">
            <div class="alr-reg-table-head">
              <div class="alr-reg-th">Submission Queue</div>
            </div>
            <div id="alr-admin-queue">
              <div class="alr-reg-empty">Loading submissions...</div>
            </div>
          </div>

          <div id="alr-admin-detail" class="alr-reg-detail" style="display:none"></div>
        </div>

      </div>
    </div>
  )
}

ALRAdmin.displayName = "ALRAdmin"
export default (() => ALRAdmin) satisfies QuartzComponentConstructor
