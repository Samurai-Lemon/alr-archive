import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const activeCycle = "7"

const ALRAccount: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="alr-reg-root">

      <div class="alr-reg-banner">
        <div class="alr-reg-banner-meta">
          <div class="alr-reg-banner-meta-item">ACCOUNT ACCESS</div>
          <div class="alr-reg-banner-meta-item">CYCLE {activeCycle} · ARCHIVE OPS</div>
        </div>
        <div class="alr-reg-banner-eyebrow">ALR Initiative — Archive</div>
        <div class="alr-reg-banner-title">Account</div>
        <div class="alr-reg-banner-sub">
          Log in to track your procurement orders, review your Archive submissions, and see badges
          earned for your contributions.
        </div>
      </div>

      <div class="alr-reg-body">

        <div id="alr-account-auth">
          <div class="alr-reg-controls">
            <div class="alr-reg-filter-row">
              <button type="button" class="alr-reg-filter-btn alr-reg-filter-active" id="alr-account-tab-login">Log In</button>
              <button type="button" class="alr-reg-filter-btn" id="alr-account-tab-signup">Create Account</button>
            </div>
          </div>

          <form class="alr-submit-form alr-account-form" id="alr-account-login-form">
            <div class="alr-submit-section">
              <div class="alr-submit-row">
                <div class="alr-submit-field">
                  <label class="alr-submit-label" for="alr-account-login-email">Email</label>
                  <input class="alr-submit-input" type="email" id="alr-account-login-email" name="email" required autocomplete="email" />
                </div>
                <div class="alr-submit-field">
                  <label class="alr-submit-label" for="alr-account-login-password">Password</label>
                  <input class="alr-submit-input" type="password" id="alr-account-login-password" name="password" required autocomplete="current-password" />
                </div>
              </div>
            </div>
            <div class="alr-submit-actions">
              <button type="submit" class="alr-submit-btn">Log In</button>
              <span class="alr-submit-hint" id="alr-account-login-status"></span>
            </div>
          </form>

          <form class="alr-submit-form alr-account-form" id="alr-account-signup-form" style="display:none;">
            <div class="alr-submit-section">
              <div class="alr-submit-row">
                <div class="alr-submit-field">
                  <label class="alr-submit-label" for="alr-account-signup-name">Display Name</label>
                  <input class="alr-submit-input" type="text" id="alr-account-signup-name" name="display_name" placeholder="E. Maren" required autocomplete="nickname" />
                </div>
                <div class="alr-submit-field">
                  <label class="alr-submit-label" for="alr-account-signup-email">Email</label>
                  <input class="alr-submit-input" type="email" id="alr-account-signup-email" name="email" required autocomplete="email" />
                </div>
              </div>
              <div class="alr-submit-row">
                <div class="alr-submit-field">
                  <label class="alr-submit-label" for="alr-account-signup-password">Password</label>
                  <input class="alr-submit-input" type="password" id="alr-account-signup-password" name="password" minLength={8} required autocomplete="new-password" />
                </div>
              </div>
            </div>
            <div class="alr-submit-actions">
              <button type="submit" class="alr-submit-btn">Create Account</button>
              <span class="alr-submit-hint" id="alr-account-signup-status">Use the same email you order under to have past orders linked automatically.</span>
            </div>
          </form>
        </div>

        <div id="alr-account-profile" style="display:none">

          <div class="alr-reg-detail" style="margin-top:0">
            <div class="alr-reg-detail-head" style="border-bottom:none;margin-bottom:0;padding-bottom:0">
              <div>
                <div class="alr-reg-detail-id" id="alr-account-display-email"></div>
                <div class="alr-reg-detail-title" id="alr-account-display-name"></div>
              </div>
              <button type="button" class="alr-reg-view-btn" id="alr-account-logout-btn">Log Out</button>
            </div>
          </div>

          <div class="alr-reg-table-wrap" style="margin-top:20px;margin-bottom:20px">
            <div class="alr-reg-table-head" style="display:flex;align-items:center;justify-content:space-between">
              <div class="alr-reg-th">Your Orders</div>
              <button type="button" class="alr-reg-filter-btn" id="alr-account-refresh-orders-btn">Check for New Orders</button>
            </div>
            <div id="alr-account-orders">
              <div class="alr-reg-empty">Loading orders...</div>
            </div>
          </div>
          <div class="alr-submit-hint" id="alr-account-claim-status" style="margin:-12px 0 20px"></div>

          <div class="alr-reg-table-wrap" style="margin-bottom:20px">
            <div class="alr-reg-table-head">
              <div class="alr-reg-th">Your Submissions</div>
            </div>
            <div id="alr-account-submissions">
              <div class="alr-reg-empty">Loading submissions...</div>
            </div>
          </div>

          <div class="alr-reg-table-wrap">
            <div class="alr-reg-table-head">
              <div class="alr-reg-th">Your Badges</div>
            </div>
            <div id="alr-account-badges">
              <div class="alr-reg-empty">Loading badges...</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

ALRAccount.displayName = "ALRAccount"
export default (() => ALRAccount) satisfies QuartzComponentConstructor
