import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Always-rendered (afterBody) component, same reasoning as ALRShopScript / ALRLabelCreatorScript:
// an inline <script> scoped to just the /Account page can silently fail to (re)execute after an
// SPA navigation (micromorph patches text instead of replacing nodes). Keeping this identical and
// always-present on every page means it only needs to truly execute once, then reacts to the
// custom "nav" event like every other always-on ALR script. It also updates the sidebar/topnav
// "Account" link on every page (not just /Account), so login state is visible sitewide.
const AccountScript: QuartzComponent = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  // TODO: fill in with your Supabase project's URL + anon (public) key.
  // The anon key is designed to be public — Row Level Security policies (see supabase/schema.sql)
  // are what actually keep users' data private, not hiding this key.
  var SUPABASE_URL = "https://jkxduwtsssxayscbaxet.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_lbVFeryLdCR19axiOZKWcA_RdToAKOb";
  var SUPABASE_SDK_SRC = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  var CONFIGURED = SUPABASE_URL.indexOf("YOUR_SUPABASE") !== 0;

  var clientPromise = null;

  function getClient() {
    if (!CONFIGURED) return Promise.reject(new Error("Supabase is not configured yet"));
    if (clientPromise) return clientPromise;

    clientPromise = new Promise(function(resolve, reject) {
      function create() {
        try {
          resolve(window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
        } catch (err) {
          reject(err);
        }
      }

      if (window.supabase && window.supabase.createClient) {
        create();
        return;
      }

      var existing = document.getElementById("alr-supabase-sdk");
      if (existing) {
        existing.addEventListener("load", create);
        existing.addEventListener("error", function() { reject(new Error("Failed to load Supabase SDK")); });
        return;
      }

      var script = document.createElement("script");
      script.id = "alr-supabase-sdk";
      script.src = SUPABASE_SDK_SRC;
      script.onload = create;
      script.onerror = function() { reject(new Error("Failed to load Supabase SDK")); };
      document.head.appendChild(script);
    });

    return clientPromise;
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ── Sitewide nav auth-state sync ──────────────────────────────────────
  function updateNavForSession(session) {
    var label = "Log In";
    if (session && session.user) {
      label = (session.user.user_metadata && session.user.user_metadata.display_name) || session.user.email;
    }
    var topLabel = document.getElementById("alr-topnav-account-label");
    if (topLabel) topLabel.textContent = label;
  }

  function syncNav() {
    if (!CONFIGURED) return;
    getClient().then(function(sb) {
      return sb.auth.getSession();
    }).then(function(res) {
      updateNavForSession(res.data.session);
    }).catch(function() {});
  }

  // ── /Account page: render helpers ─────────────────────────────────────
  function renderList(containerId, items, emptyText, rowFn) {
    var container = document.getElementById(containerId);
    if (!container) return;
    if (!items || items.length === 0) {
      container.innerHTML = '<div class="alr-shop-empty">' + emptyText + "</div>";
      return;
    }
    var html = '<div class="alr-account-list-rows">';
    items.forEach(function(item) { html += rowFn(item); });
    html += "</div>";
    container.innerHTML = html;
  }

  function renderOrders(orders) {
    renderList("alr-account-orders", orders, "No orders yet.", function(o) {
      var date = o.created_at ? new Date(o.created_at).toLocaleDateString() : "";
      var total = o.total != null ? escapeHtml(o.currency || "$") + " " + escapeHtml(o.total) : "";
      return '<div class="alr-account-row"><div class="alr-account-row-main">' +
        '<div class="alr-account-row-title">Order ' + escapeHtml(o.fourthwall_order_id || o.id) + "</div>" +
        '<div class="alr-account-row-sub">' + escapeHtml(date) + "</div>" +
        '</div><div class="alr-account-row-side">' + total + "</div></div>";
    });
  }

  function renderSubmissions(subs) {
    renderList("alr-account-submissions", subs, "No submissions yet.", function(s) {
      var date = s.created_at ? new Date(s.created_at).toLocaleDateString() : "";
      return '<div class="alr-account-row"><div class="alr-account-row-main">' +
        '<div class="alr-account-row-title">' + escapeHtml(s.title) + "</div>" +
        '<div class="alr-account-row-sub">' + escapeHtml(s.submission_type) + " &middot; " + escapeHtml(date) + "</div>" +
        '</div><div class="alr-account-row-side alr-account-status-' + escapeHtml(s.status) + '">' + escapeHtml(s.status) + "</div></div>";
    });
  }

  function renderBadges(badges) {
    renderList("alr-account-badges", badges, "No badges earned yet.", function(b) {
      return '<div class="alr-account-row"><div class="alr-account-row-main">' +
        '<div class="alr-account-row-title">' + escapeHtml(b.badge_key) + "</div>" +
        "</div></div>";
    });
  }

  function loadProfileData(sb) {
    sb.from("orders").select("*").order("created_at", { ascending: false }).then(function(res) {
      renderOrders(res.data || []);
    });
    sb.from("submissions").select("*").order("created_at", { ascending: false }).then(function(res) {
      renderSubmissions(res.data || []);
    });
    sb.from("badges").select("*").order("awarded_at", { ascending: false }).then(function(res) {
      renderBadges(res.data || []);
    });
  }

  function claimAndLoad(sb) {
    sb.rpc("claim_orders").then(function() {
      loadProfileData(sb);
    }).catch(function() {
      loadProfileData(sb);
    });
  }

  function showLoggedOut() {
    var auth = document.getElementById("alr-account-auth");
    var profile = document.getElementById("alr-account-profile");
    if (auth) auth.style.display = "";
    if (profile) profile.style.display = "none";
  }

  function showLoggedIn(session) {
    var auth = document.getElementById("alr-account-auth");
    var profile = document.getElementById("alr-account-profile");
    if (auth) auth.style.display = "none";
    if (profile) profile.style.display = "";
    var nameEl = document.getElementById("alr-account-display-name");
    var emailEl = document.getElementById("alr-account-display-email");
    if (nameEl) nameEl.textContent = (session.user.user_metadata && session.user.user_metadata.display_name) || "Investigator";
    if (emailEl) emailEl.textContent = session.user.email;
  }

  function onAccountPage() {
    return window.location.pathname === "/Account" || window.location.pathname === "/Account/";
  }

  function initAccountPage() {
    if (!onAccountPage()) return;

    if (!CONFIGURED) {
      var authEl = document.getElementById("alr-account-auth");
      if (authEl) authEl.innerHTML = '<div class="alr-shop-empty">Account system is not configured yet.</div>';
      return;
    }

    var loginForm = document.getElementById("alr-account-login-form");
    var signupForm = document.getElementById("alr-account-signup-form");
    var tabLogin = document.getElementById("alr-account-tab-login");
    var tabSignup = document.getElementById("alr-account-tab-signup");
    var logoutBtn = document.getElementById("alr-account-logout-btn");
    var refreshBtn = document.getElementById("alr-account-refresh-orders-btn");

    if (tabLogin && !tabLogin._alrBound) {
      tabLogin._alrBound = true;
      tabLogin.addEventListener("click", function() {
        tabLogin.classList.add("active");
        if (tabSignup) tabSignup.classList.remove("active");
        if (loginForm) loginForm.style.display = "";
        if (signupForm) signupForm.style.display = "none";
      });
    }

    if (tabSignup && !tabSignup._alrBound) {
      tabSignup._alrBound = true;
      tabSignup.addEventListener("click", function() {
        tabSignup.classList.add("active");
        if (tabLogin) tabLogin.classList.remove("active");
        if (signupForm) signupForm.style.display = "";
        if (loginForm) loginForm.style.display = "none";
      });
    }

    if (loginForm && !loginForm._alrBound) {
      loginForm._alrBound = true;
      loginForm.addEventListener("submit", function(evt) {
        evt.preventDefault();
        var status = document.getElementById("alr-account-login-status");
        var email = document.getElementById("alr-account-login-email").value;
        var password = document.getElementById("alr-account-login-password").value;
        if (status) status.textContent = "Logging in...";
        getClient().then(function(sb) {
          return sb.auth.signInWithPassword({ email: email, password: password });
        }).then(function(res) {
          if (status) status.textContent = res.error ? res.error.message : "";
        }).catch(function(err) {
          if (status) status.textContent = "Login failed: " + err.message;
        });
      });
    }

    if (signupForm && !signupForm._alrBound) {
      signupForm._alrBound = true;
      signupForm.addEventListener("submit", function(evt) {
        evt.preventDefault();
        var status = document.getElementById("alr-account-signup-status");
        var name = document.getElementById("alr-account-signup-name").value;
        var email = document.getElementById("alr-account-signup-email").value;
        var password = document.getElementById("alr-account-signup-password").value;
        if (status) status.textContent = "Creating account...";
        getClient().then(function(sb) {
          return sb.auth.signUp({ email: email, password: password, options: { data: { display_name: name } } });
        }).then(function(res) {
          if (res.error) { if (status) status.textContent = res.error.message; return; }
          if (status) status.textContent = res.data && res.data.session ? "" : "Check your email to confirm your account.";
        }).catch(function(err) {
          if (status) status.textContent = "Sign up failed: " + err.message;
        });
      });
    }

    if (logoutBtn && !logoutBtn._alrBound) {
      logoutBtn._alrBound = true;
      logoutBtn.addEventListener("click", function() {
        getClient().then(function(sb) { return sb.auth.signOut(); });
      });
    }

    if (refreshBtn && !refreshBtn._alrBound) {
      refreshBtn._alrBound = true;
      refreshBtn.addEventListener("click", function() {
        var status = document.getElementById("alr-account-claim-status");
        if (status) status.textContent = "Checking...";
        getClient().then(function(sb) {
          return sb.auth.getSession().then(function(res) {
            if (!res.data.session) return;
            claimAndLoad(sb);
            if (status) status.textContent = "Updated.";
          });
        });
      });
    }

    getClient().then(function(sb) {
      return sb.auth.getSession().then(function(res) {
        var session = res.data.session;
        if (session) {
          showLoggedIn(session);
          claimAndLoad(sb);
        } else {
          showLoggedOut();
        }
      });
    }).catch(function() {});
  }

  // ── Submit forms (Submit-Echo/Reality/Equipment/Organization): mirror into Supabase ──
  var SUBMISSION_TYPE_BY_PATH = {
    "/Submit-Echo": { type: "echo", titleField: "echo_name" },
    "/Submit-Reality": { type: "reality", titleField: "reality_name" },
    "/Submit-Equipment": { type: "equipment", titleField: "device_name" },
    "/Submit-Organization": { type: "organization", titleField: "organization_name" }
  };

  function recordSubmission(config, payload) {
    if (!config || !CONFIGURED) return Promise.resolve();
    return getClient().then(function(sb) {
      return sb.auth.getSession().then(function(res) {
        var session = res.data.session;
        if (!session) return;
        return sb.from("submissions").insert({
          user_id: session.user.id,
          submission_type: config.type,
          title: payload[config.titleField] || config.type,
          form_data: payload
        });
      });
    }).catch(function() { /* non-fatal: submission still reaches Formspree */ });
  }

  function initSubmitFormHook() {
    var form = document.querySelector(".alr-submit-form:not(.alr-account-form)");
    if (!form || form._alrBound) return;
    form._alrBound = true;

    var config = SUBMISSION_TYPE_BY_PATH[window.location.pathname];

    form.addEventListener("submit", function(evt) {
      evt.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      var hint = form.querySelector(".alr-submit-hint");
      if (submitBtn) submitBtn.disabled = true;
      if (hint) hint.textContent = "Submitting...";

      var formData = new FormData(form);
      var payload = {};
      formData.forEach(function(value, key) { payload[key] = value; });

      Promise.all([
        recordSubmission(config, payload),
        fetch(form.action, { method: "POST", body: formData, headers: { Accept: "application/json" } })
      ]).then(function(results) {
        var fsResponse = results[1];
        if (fsResponse && fsResponse.ok) {
          form.style.display = "none";
          var success = document.createElement("div");
          success.className = "alr-submit-notice";
          success.innerHTML = '<div class="alr-submit-notice-dot"></div><div><div class="alr-submit-notice-title">Submission Received</div>' +
            '<div class="alr-submit-notice-text">Your submission has entered the Archive review queue.</div></div>';
          form.parentNode.insertBefore(success, form);
        } else {
          if (hint) hint.textContent = "Something went wrong. Please try again.";
          if (submitBtn) submitBtn.disabled = false;
        }
      }).catch(function() {
        if (hint) hint.textContent = "Something went wrong. Please try again.";
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  function initAccount() {
    syncNav();
    initAccountPage();
    initSubmitFormHook();
  }

  document.addEventListener("DOMContentLoaded", initAccount);
  document.addEventListener("nav", initAccount);

  // Persistent auth subscription: set up once (this IIFE only truly runs once, ever,
  // per the micromorph-dodge pattern documented above) so login/logout reflects
  // immediately without waiting for the next navigation.
  if (CONFIGURED) {
    getClient().then(function(sb) {
      sb.auth.onAuthStateChange(function(_event, session) {
        updateNavForSession(session);
        if (onAccountPage()) {
          if (session) {
            showLoggedIn(session);
            claimAndLoad(sb);
          } else {
            showLoggedOut();
          }
        }
      });
    }).catch(function() {});
  }
})();
      `,
      }}
    />
  )
}

AccountScript.displayName = "AccountScript"
export default (() => AccountScript) satisfies QuartzComponentConstructor
