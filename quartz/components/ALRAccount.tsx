import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRAccount: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="alr-account-page">

      <div class="alr-submit-header">
        <div class="alr-eyebrow" style="margin-bottom:8px;">Archive of Lost Realities Initiative</div>
        <div class="alr-hero-title" style="margin-bottom:8px;">Account</div>
        <p class="alr-hero-sub" style="margin-bottom:0;">
        Log in to track your procurement orders, review your Archive submissions, and see badges earned for your contributions.
        </p>
      </div>

      <div id="alr-account-auth" class="alr-account-auth">
        <div class="alr-account-tabs">
          <button type="button" class="alr-account-tab active" id="alr-account-tab-login">Log In</button>
          <button type="button" class="alr-account-tab" id="alr-account-tab-signup">Create Account</button>
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

      <div id="alr-account-profile" class="alr-account-profile" style="display:none;">
        <div class="alr-account-profile-header">
          <div>
            <div class="alr-account-profile-name" id="alr-account-display-name"></div>
            <div class="alr-account-profile-email" id="alr-account-display-email"></div>
          </div>
          <button type="button" class="alr-submit-btn alr-account-logout-btn" id="alr-account-logout-btn">Log Out</button>
        </div>

        <div class="alr-account-section">
          <div class="alr-submit-section-label">Your Orders</div>
          <div id="alr-account-orders" class="alr-account-list">
            <div class="alr-shop-loading"><div class="alr-shop-loading-text">Loading orders...</div></div>
          </div>
          <button type="button" class="alr-account-refresh-btn" id="alr-account-refresh-orders-btn">Check for new orders</button>
          <span class="alr-submit-hint" id="alr-account-claim-status"></span>
        </div>

        <div class="alr-account-section">
          <div class="alr-submit-section-label">Your Submissions</div>
          <div id="alr-account-submissions" class="alr-account-list">
            <div class="alr-shop-loading"><div class="alr-shop-loading-text">Loading submissions...</div></div>
          </div>
        </div>

        <div class="alr-account-section">
          <div class="alr-submit-section-label">Your Badges</div>
          <div id="alr-account-badges" class="alr-account-list">
            <div class="alr-shop-loading"><div class="alr-shop-loading-text">Loading badges...</div></div>
          </div>
        </div>
      </div>

    </div>
  )
}

ALRAccount.displayName = "ALRAccount"
export default (() => ALRAccount) satisfies QuartzComponentConstructor
