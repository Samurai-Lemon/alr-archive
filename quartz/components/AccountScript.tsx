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

  // Captured once, at the top of this real page load — the confirmation link always lands here
  // as a fresh navigation (never an SPA nav), and Supabase's client strips these params from the
  // URL shortly after parsing the session, so this needs to be read before that happens.
  var justConfirmedSignup = /type=signup/.test(window.location.hash) || /type=signup/.test(window.location.search);

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

  function updateNotificationDot() {
    var dot = document.getElementById("alr-topnav-account-dot");
    if (!dot) return;
    getClient().then(function(sb) {
      return sb.auth.getSession().then(function(res) {
        var session = res.data.session;
        if (!session) { dot.style.display = "none"; return; }
        return sb.from("submissions").select("status, status_updated_at, seen_at").eq("user_id", session.user.id).then(function(res2) {
          var hasUnseen = (res2.data || []).some(function(s) { return isUnseen(s); });
          dot.style.display = hasUnseen ? "" : "none";
        });
      });
    }).catch(function() {});
  }

  function syncNav() {
    if (!CONFIGURED) return;
    getClient().then(function(sb) {
      return sb.auth.getSession();
    }).then(function(res) {
      updateNavForSession(res.data.session);
    }).catch(function() {});
    updateNotificationDot();
  }

  // ── /Account page: render helpers ─────────────────────────────────────
  function renderList(containerId, items, emptyText, rowFn) {
    var container = document.getElementById(containerId);
    if (!container) return;
    if (!items || items.length === 0) {
      container.innerHTML = '<div class="alr-reg-empty">' + emptyText + "</div>";
      return;
    }
    var html = "";
    items.forEach(function(item, i) { html += rowFn(item, i); });
    container.innerHTML = html;
  }

  function statusTagClass(status) {
    if (status === "approved") return "alr-reg-tag-esc-s1";
    if (status === "rejected") return "alr-reg-tag-esc-s4";
    return "alr-reg-tag-esc-s2";
  }

  // Mirrors quartz/util/alrClassifications.ts — duplicated here because this script runs as a
  // plain browser <script>, not through the TSX build, so it can't import that module directly.
  var EC_LABELS = { ENT: "Entity", OBJ: "Object", LOC: "Location", PHN: "Phenomenon", EVT: "Event" };
  var ESC_LABELS = { S1: "Stable", S2: "Volatile", S3: "Fractured", S4: "Terminal" };
  var RTS_LABELS = { T1: "Fragmentary", T2: "Localized", T3: "Developed", T4: "Grand", T5: "Cosmic" };
  var RDS_LABELS = { A: "Analogous", B: "Variant", C: "Divergent", D: "Exotic" };
  var RCC_LABELS = { "RCC-1": "Silent Collapse", "RCC-2": "Systemic Failure", "RCC-3": "Catastrophic Collapse" };

  // Same classification-cell + prose-section split used by the real Echo/Reality entries and
  // the registry's own detail panel, per submission type's actual form fields.
  var SUBMISSION_LAYOUTS = {
    echo: {
      classification: [
        { key: "ec", label: "Echo Class", labels: EC_LABELS },
        { key: "esc", label: "Stability", labels: ESC_LABELS },
        { key: "rcc", label: "Collapse Class", labels: RCC_LABELS },
        { key: "rts", label: "Origin Tier", labels: RTS_LABELS },
        { key: "rds", label: "Divergence", labels: RDS_LABELS },
      ],
      sections: [
        { key: "echo_description", label: "Description" },
        { key: "observed_behavior", label: "Observed Behavior" },
        { key: "manifestation_pattern", label: "Manifestation Pattern" },
        { key: "investigator_notes", label: "Investigator Notes" },
      ],
    },
    reality: {
      classification: [
        { key: "rts", label: "Origin Tier", labels: RTS_LABELS },
        { key: "rds", label: "Divergence", labels: RDS_LABELS },
        { key: "rcc", label: "Collapse Class", labels: RCC_LABELS },
      ],
      sections: [
        { key: "investigation_overview", label: "Overview" },
        { key: "environmental_observations", label: "Environmental Observations" },
        { key: "civilizational_status", label: "Civilizational Status" },
        { key: "collapse_evidence", label: "Collapse Evidence" },
        { key: "echo_manifestations", label: "Echo Manifestations" },
        { key: "investigator_notes", label: "Investigator Notes" },
      ],
    },
    equipment: {
      classification: [
        { key: "device_type", label: "Device Type" },
        { key: "operational_status", label: "Status" },
      ],
      sections: [
        { key: "primary_function", label: "Primary Function" },
        { key: "operating_procedure", label: "Operating Procedure" },
        { key: "known_limitations", label: "Known Limitations" },
        { key: "engineer_notes", label: "Engineer Notes" },
      ],
    },
    organization: {
      classification: [
        { key: "operational_status", label: "Status" },
        { key: "primary_domain", label: "Primary Domain" },
      ],
      sections: [
        { key: "description", label: "Description" },
        { key: "history", label: "History" },
        { key: "primary_activities", label: "Primary Activities" },
        { key: "submitter_notes", label: "Submitter Notes" },
      ],
    },
  };

  function renderOrders(orders) {
    renderList("alr-account-orders", orders, "No orders yet.", function(o) {
      var date = o.created_at ? new Date(o.created_at).toLocaleDateString() : "";
      var total = o.total != null ? escapeHtml(o.currency || "$") + " " + escapeHtml(o.total) : "";
      return '<div class="alr-reg-row alr-reg-row-simple alr-account-static-row"><div>' +
        '<div class="alr-reg-id">' + escapeHtml(o.fourthwall_order_id || o.id) + "</div>" +
        '<div class="alr-reg-name-sub">' + escapeHtml(date) + "</div>" +
        '</div><div class="alr-reg-name">' + total + "</div></div>";
    });
  }

  // A submission counts as an unseen update once Archive Operations has reviewed it (moved off
  // "pending") and the submitter hasn't opened its detail view since that review happened.
  function isUnseen(sub) {
    if (!sub || sub.status === "pending") return false;
    if (!sub.seen_at) return true;
    return new Date(sub.seen_at).getTime() < new Date(sub.status_updated_at).getTime();
  }

  // Shared with the /Admin review queue: classification-cell + prose-section body used by both
  // the submitter's own read-only view and the admin's review view.
  function buildSubmissionDetailHtml(sub) {
    var date = sub.created_at ? new Date(sub.created_at).toLocaleDateString() : "";
    var data = sub.form_data || {};
    var layout = SUBMISSION_LAYOUTS[sub.submission_type] || { classification: [], sections: [] };

    var html = '<div class="alr-reg-detail-head"><div>' +
      '<div class="alr-reg-detail-id">' + escapeHtml((sub.submission_type || "").toUpperCase()) + " &middot; " +
      escapeHtml((sub.status || "").toUpperCase()) + "</div>" +
      '<div class="alr-reg-detail-title">' + escapeHtml(sub.title) + "</div>" +
      '<div class="alr-reg-detail-sub">Submitted ' + escapeHtml(date) + "</div>" +
      "</div></div>";

    var classCells = layout.classification.filter(function(f) { return data[f.key]; });
    if (classCells.length > 0) {
      html += '<div class="alr-reg-detail-grid alr-reg-detail-grid-' + classCells.length + '">';
      classCells.forEach(function(f) {
        var code = data[f.key];
        var val = f.labels ? escapeHtml(code) + " — " + escapeHtml(f.labels[code] || code) : escapeHtml(code);
        html += '<div class="alr-reg-detail-cell">' +
          '<div class="alr-reg-detail-cell-label">' + escapeHtml(f.label) + "</div>" +
          '<div class="alr-reg-detail-cell-val">' + val + "</div></div>";
      });
      html += "</div>";
    }

    layout.sections.forEach(function(s) {
      var text = data[s.key];
      if (!text) return;
      html += '<div class="alr-account-detail-section">' +
        '<div class="alr-account-detail-section-label">' + escapeHtml(s.label) + "</div>" +
        '<div class="alr-account-detail-section-text">' + escapeHtml(text) + "</div></div>";
    });

    if (sub.reviewer_notes) {
      html += '<div class="alr-submit-notice" style="margin-top:16px"><div class="alr-submit-notice-dot"></div>' +
        '<div><div class="alr-submit-notice-title">Archive Operations Note</div>' +
        '<div class="alr-submit-notice-text">' + escapeHtml(sub.reviewer_notes) + "</div></div></div>";
    }

    return html;
  }

  // Full submitted form content isn't visible anywhere else once sent — clicking a row here
  // is the only way to read back what was submitted before Archive Operations reviews it.
  // Clicking the already-expanded row again collapses it (currentDetailIndex tracks that).
  var currentSubmissions = [];
  var currentDetailIndex = -1;

  function renderSubmissionDetail(index) {
    var panel = document.getElementById("alr-account-submission-detail");
    if (!panel) return;
    currentDetailIndex = index;
    var sub = currentSubmissions[index];

    var container = document.getElementById("alr-account-submissions");
    if (container) {
      container.querySelectorAll(".alr-reg-row").forEach(function(row) {
        row.classList.remove("alr-reg-row-selected");
      });
      var activeRow = container.querySelector('[data-index="' + index + '"]');
      if (activeRow) activeRow.classList.add("alr-reg-row-selected");
    }

    if (!sub) {
      panel.style.display = "none";
      panel.innerHTML = "";
      return;
    }

    panel.innerHTML = buildSubmissionDetailHtml(sub);
    panel.style.display = "";

    if (isUnseen(sub)) {
      sub.seen_at = new Date().toISOString();
      renderSubmissions(currentSubmissions, index);
      getClient().then(function(sb) {
        return sb.rpc("mark_submission_seen", { submission_id: sub.id });
      }).catch(function() {});
      updateNotificationDot();
    }
  }

  function renderSubmissions(subs, keepDetailIndex) {
    currentSubmissions = subs || [];

    renderList("alr-account-submissions", subs, "No submissions yet.", function(s, i) {
      var date = s.created_at ? new Date(s.created_at).toLocaleDateString() : "";
      var dot = isUnseen(s) ? '<span class="alr-account-new-dot" title="Updated"></span>' : "";
      return '<div class="alr-reg-row alr-reg-row-simple" data-index="' + i + '"><div>' +
        '<div class="alr-reg-name">' + dot + escapeHtml(s.title) + "</div>" +
        '<div class="alr-reg-name-sub">' + escapeHtml(s.submission_type) + " &middot; " + escapeHtml(date) + "</div>" +
        '</div><span class="alr-reg-tag ' + statusTagClass(s.status) + '">' + escapeHtml(s.status) + "</span></div>";
    });

    var container = document.getElementById("alr-account-submissions");
    if (container) {
      container.querySelectorAll(".alr-reg-row").forEach(function(row) {
        row.addEventListener("click", function() {
          var idx = Number(row.getAttribute("data-index"));
          renderSubmissionDetail(idx === currentDetailIndex ? -1 : idx);
        });
      });
    }

    var target = keepDetailIndex != null ? keepDetailIndex : (currentSubmissions.length > 0 ? 0 : -1);
    if (keepDetailIndex != null) {
      var activeRow = container && container.querySelector('[data-index="' + target + '"]');
      if (activeRow) activeRow.classList.add("alr-reg-row-selected");
      var panel = document.getElementById("alr-account-submission-detail");
      if (panel) { panel.innerHTML = buildSubmissionDetailHtml(currentSubmissions[target]); panel.style.display = ""; }
    } else {
      renderSubmissionDetail(target);
    }
  }

  function renderBadges(badges) {
    renderList("alr-account-badges", badges, "No badges earned yet.", function(b) {
      return '<div class="alr-reg-row alr-reg-row-simple alr-account-static-row"><div class="alr-reg-name">' +
        escapeHtml(b.badge_key) + "</div></div>";
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
      if (authEl) authEl.innerHTML = '<div class="alr-reg-empty">Account system is not configured yet.</div>';
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
        tabLogin.classList.add("alr-reg-filter-active");
        if (tabSignup) tabSignup.classList.remove("alr-reg-filter-active");
        if (loginForm) loginForm.style.display = "";
        if (signupForm) signupForm.style.display = "none";
      });
    }

    if (tabSignup && !tabSignup._alrBound) {
      tabSignup._alrBound = true;
      tabSignup.addEventListener("click", function() {
        tabSignup.classList.add("alr-reg-filter-active");
        if (tabLogin) tabLogin.classList.remove("alr-reg-filter-active");
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
          return sb.auth.signUp({
            email: email,
            password: password,
            options: {
              data: { display_name: name },
              emailRedirectTo: window.location.origin + "/Account"
            }
          });
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
          if (justConfirmedSignup) {
            var claimStatus = document.getElementById("alr-account-claim-status");
            if (claimStatus) claimStatus.textContent = "Email confirmed — welcome to the Archive.";
            window.history.replaceState(null, "", window.location.pathname);
          }
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

  // ── /Admin: submission review queue (not linked anywhere — reached by URL, gated by RLS) ──
  var adminSubmissions = [];
  var adminStatusFilter = "all";
  var adminDetailId = null;

  function onAdminPage() {
    return window.location.pathname === "/Admin" || window.location.pathname === "/Admin/";
  }

  function renderAdminQueue() {
    var visible = adminSubmissions.filter(function(s) {
      return adminStatusFilter === "all" || s.status === adminStatusFilter;
    });

    renderList("alr-admin-queue", visible, "No submissions match this filter.", function(s) {
      var data = s.form_data || {};
      var date = s.created_at ? new Date(s.created_at).toLocaleDateString() : "";
      var submitter = data.submitter_name || data.submitter_email || "Unknown";
      return '<div class="alr-reg-row alr-reg-row-simple" data-id="' + escapeHtml(s.id) + '"><div>' +
        '<div class="alr-reg-name">' + escapeHtml(s.title) + "</div>" +
        '<div class="alr-reg-name-sub">' + escapeHtml(s.submission_type) + " &middot; " + escapeHtml(submitter) + " &middot; " + escapeHtml(date) + "</div>" +
        '</div><span class="alr-reg-tag ' + statusTagClass(s.status) + '">' + escapeHtml(s.status) + "</span></div>";
    });

    var container = document.getElementById("alr-admin-queue");
    if (container) {
      container.querySelectorAll(".alr-reg-row").forEach(function(row) {
        row.addEventListener("click", function() {
          var id = row.getAttribute("data-id");
          renderAdminDetail(id === adminDetailId ? null : id);
        });
      });
      if (adminDetailId) {
        var activeRow = container.querySelector('[data-id="' + adminDetailId + '"]');
        if (activeRow) activeRow.classList.add("alr-reg-row-selected");
      }
    }
  }

  function renderAdminDetail(id) {
    adminDetailId = id;
    var panel = document.getElementById("alr-admin-detail");
    if (!panel) return;

    var sub = adminSubmissions.filter(function(s) { return s.id === id; })[0];
    if (!sub) {
      panel.style.display = "none";
      panel.innerHTML = "";
      renderAdminQueue();
      return;
    }

    var html = buildSubmissionDetailHtml(sub);
    html += '<div class="alr-account-detail-section">' +
      '<div class="alr-account-detail-section-label">Reviewer Notes</div>' +
      '<textarea class="alr-submit-textarea" id="alr-admin-notes-input" rows="3" placeholder="Visible to the submitter once you approve or reject.">' +
      escapeHtml(sub.reviewer_notes || "") + "</textarea></div>" +
      '<div class="alr-submit-actions" style="margin-top:12px">' +
      '<button type="button" class="alr-submit-btn" id="alr-admin-approve-btn">Approve</button>' +
      '<button type="button" class="alr-submit-btn" id="alr-admin-reject-btn" style="background:#a85c42">Reject</button>' +
      '<span class="alr-submit-hint" id="alr-admin-save-status"></span></div>';

    panel.innerHTML = html;
    panel.style.display = "";
    renderAdminQueue();

    function saveReview(sb, status) {
      var status$ = document.getElementById("alr-admin-save-status");
      var notes = document.getElementById("alr-admin-notes-input").value;
      if (status$) status$.textContent = "Saving...";
      sb.from("submissions").update({ status: status, reviewer_notes: notes }).eq("id", sub.id).then(function(res) {
        if (res.error) { if (status$) status$.textContent = res.error.message; return; }
        sub.status = status;
        sub.reviewer_notes = notes;
        if (status$) status$.textContent = "Saved.";
        renderAdminQueue();
      }).catch(function(err) {
        if (status$) status$.textContent = "Failed: " + err.message;
      });
    }

    getClient().then(function(sb) {
      var approveBtn = document.getElementById("alr-admin-approve-btn");
      var rejectBtn = document.getElementById("alr-admin-reject-btn");
      if (approveBtn) approveBtn.addEventListener("click", function() { saveReview(sb, "approved"); });
      if (rejectBtn) rejectBtn.addEventListener("click", function() { saveReview(sb, "rejected"); });
    });
  }

  function initAdminPage() {
    if (!onAdminPage()) return;

    var gate = document.getElementById("alr-admin-gate");
    var content = document.getElementById("alr-admin-content");
    if (!gate || !content) return;

    if (!CONFIGURED) {
      gate.innerHTML = '<div class="alr-reg-empty">Account system is not configured yet.</div>';
      return;
    }

    getClient().then(function(sb) {
      return sb.auth.getSession().then(function(res) {
        var session = res.data.session;
        if (!session) {
          gate.innerHTML = '<div class="alr-reg-empty">Log in via <a href="/Account" class="internal">/Account</a> first.</div>';
          content.style.display = "none";
          return;
        }
        return sb.from("profiles").select("is_admin").eq("id", session.user.id).single().then(function(profRes) {
          if (!profRes.data || !profRes.data.is_admin) {
            gate.innerHTML = '<div class="alr-reg-empty">ACCESS DENIED — Insufficient clearance.</div>';
            content.style.display = "none";
            return;
          }

          gate.style.display = "none";
          content.style.display = "";

          var filterBtns = document.querySelectorAll("#alr-admin-content [data-status-filter]");
          filterBtns.forEach(function(btn) {
            if (btn._alrBound) return;
            btn._alrBound = true;
            btn.addEventListener("click", function() {
              filterBtns.forEach(function(b) { b.classList.remove("alr-reg-filter-active"); });
              btn.classList.add("alr-reg-filter-active");
              adminStatusFilter = btn.getAttribute("data-status-filter");
              renderAdminQueue();
            });
          });

          sb.from("submissions").select("*").order("created_at", { ascending: false }).then(function(subRes) {
            adminSubmissions = subRes.data || [];
            renderAdminQueue();
          });
        });
      });
    }).catch(function() {
      gate.innerHTML = '<div class="alr-reg-empty">Something went wrong checking access.</div>';
    });
  }

  function initAccount() {
    syncNav();
    initAccountPage();
    initSubmitFormHook();
    initAdminPage();
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
        updateNotificationDot();
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
