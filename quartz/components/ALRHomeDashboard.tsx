import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import ALRRecentEchoes from "./ALRRecentEchoes"
import ALRRecentRealities from "./ALRRecentRealities"

const RecentEchoes = ALRRecentEchoes()
const RecentRealities = ALRRecentRealities()

const ALRHomeDashboard: QuartzComponent = (props: QuartzComponentProps) => {
  const { allFiles } = props

  const normalize = (v: unknown) => String(v ?? "").trim().toLowerCase()

  const hasTag = (tags: unknown, target: string) =>
    Array.isArray(tags) && tags.some((t) => normalize(t) === normalize(target))

  const echoes = allFiles.filter((file) => {
    const slug = normalize(file.slug)
    const fm = (file.frontmatter ?? {}) as Record<string, unknown>
    return hasTag(fm.tags, "echo") || slug.includes("/echoes/") || slug.startsWith("echo-")
  })

  const realities = allFiles.filter((file) => {
    const slug = normalize(file.slug)
    const fm = (file.frontmatter ?? {}) as Record<string, unknown>
    return hasTag(fm.tags, "reality") || slug.includes("/realities/") || slug.startsWith("r-")
  })

  const terminalEchoes = echoes.filter((file) => {
    const fm = (file.frontmatter ?? {}) as Record<string, unknown>
    return normalize(fm.esc) === "s4"
  })

  const activeCycle = "7"

  // Field notes from Archive personnel — some drawn from existing entry documentation,
  // some newly logged for echoes that didn't have a note yet. Rotates client-side, same
  // pattern as the featured-echo rotation below.
  const dispatchQuotes = [
    { text: "The oldest entry in the catalog. Classification framework formally flagged as potentially inapplicable.", attr: "M. Voss, Archive Operations" },
    { text: "I have worked inside this structure longer than anywhere else. It feels like it has been waiting.", attr: "E. Maren, Reality Investigation" },
    { text: "The composition changes between manifestations, but the character of suffering it depicts never does.", attr: "N. Ossic, Echo Research" },
    { text: "Reclassification under review — manifestation pattern shows increased frequency this cycle.", attr: "J. Calloway, Reality Investigation" },
    { text: "They arrange themselves around whoever is filing, not whoever asked them to. I still don't know how they decide.", attr: "L. Dray, Archive Operations" },
    { text: "You feel it before you see it in the dream. That's the part nobody warns new investigators about.", attr: "V. Arend, Echo Research" },
    { text: "The file insists 'comfortable' is the correct word for the first phase. The recording equipment has failed on every attempt to document what comes after.", attr: "K. Albrecht, Device Development" },
    { text: "The receptionist's desk is always empty. I have started to find that worse than if someone were sitting at it.", attr: "J. Calloway, Reality Investigation" },
    { text: "R-031's collapse field keeps producing them. We stopped counting after the fourth recovery site.", attr: "E. Maren, Reality Investigation" },
  ]

  return (
    <>
      <div class="alr-home">

        {/* ── MOBILE TOP ROW (compact brand + search trigger, mobile-only) ── */}
        <div class="alr-home-mtop">
          <div class="alr-home-mtop-brand">
            <span class="alr-home-mtop-mark">◆</span>
            <span class="alr-home-mtop-word">ALR Initiative</span>
          </div>
          <button class="alr-home-mtop-search" id="alr-home-mtop-search" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
(function() {
  function wire() {
    var btn = document.getElementById('alr-home-mtop-search');
    if (!btn) return;
    btn.onclick = function() {
      var sb = document.querySelector('.search-button');
      if (sb) sb.click();
    };
  }
  wire();
  document.addEventListener('nav', wire);
})();
        ` }} />

        {/* ── HERO — banner SVG as background ── */}
        <div class="alr-home-hero-wrap">
          <svg
            class="alr-home-hero-svg"
            width="100%"
            viewBox="0 0 680 220"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect class="alr-banner-bg" x="0" y="0" width="680" height="220" fill="#0f0e0b" />

            <line x1="0" y1="30"  x2="680" y2="30"  stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="0" y1="60"  x2="680" y2="60"  stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="0" y1="90"  x2="680" y2="90"  stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="0" y1="120" x2="680" y2="120" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="0" y1="150" x2="680" y2="150" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="0" y1="180" x2="680" y2="180" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />

            <line x1="68"  y1="0" x2="68"  y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="136" y1="0" x2="136" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="204" y1="0" x2="204" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="272" y1="0" x2="272" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="340" y1="0" x2="340" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="408" y1="0" x2="408" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="476" y1="0" x2="476" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="544" y1="0" x2="544" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />
            <line x1="612" y1="0" x2="612" y2="220" stroke="#cc785c" stroke-width="0.3" opacity="0.15" />

            <rect x="2"   y="32"  width="64" height="26" fill="#cc785c" opacity="0.05" />
            <rect x="70"  y="2"   width="64" height="26" fill="#cc785c" opacity="0.04" />
            <rect x="70"  y="32"  width="64" height="26" fill="#cc785c" opacity="0.07" />
            <rect x="138" y="2"   width="64" height="26" fill="#cc785c" opacity="0.05" />
            <rect x="138" y="62"  width="64" height="26" fill="#cc785c" opacity="0.05" />
            <rect x="2"   y="92"  width="64" height="26" fill="#cc785c" opacity="0.04" />
            <rect x="70"  y="92"  width="64" height="26" fill="#cc785c" opacity="0.06" />
            <rect x="2"   y="122" width="64" height="26" fill="#cc785c" opacity="0.03" />
            <rect x="138" y="152" width="64" height="26" fill="#cc785c" opacity="0.04" />
            <rect x="2"   y="182" width="64" height="26" fill="#cc785c" opacity="0.05" />
            <rect x="70"  y="182" width="64" height="26" fill="#cc785c" opacity="0.03" />

            <circle cx="360" cy="18"  r="1.5" fill="#cc785c" opacity="0.30" />
            <circle cx="380" cy="45"  r="1"   fill="#cc785c" opacity="0.20" />
            <circle cx="355" cy="72"  r="2"   fill="#cc785c" opacity="0.15" />
            <circle cx="390" cy="98"  r="1.5" fill="#cc785c" opacity="0.25" />
            <circle cx="370" cy="130" r="1"   fill="#cc785c" opacity="0.18" />
            <circle cx="420" cy="22"  r="1.5" fill="#cc785c" opacity="0.12" />
            <circle cx="440" cy="58"  r="1"   fill="#cc785c" opacity="0.10" />
            <circle cx="460" cy="88"  r="2"   fill="#cc785c" opacity="0.08" />
            <circle cx="415" cy="115" r="1"   fill="#cc785c" opacity="0.12" />
            <circle cx="450" cy="175" r="1.5" fill="#cc785c" opacity="0.09" />
            <circle cx="332" cy="24"  r="1"   fill="#cc785c" opacity="0.14" />
            <circle cx="402" cy="34"  r="1"   fill="#cc785c" opacity="0.15" />
            <circle cx="472" cy="30"  r="1"   fill="#cc785c" opacity="0.10" />
            <circle cx="478" cy="66"  r="1.1" fill="#cc785c" opacity="0.09" />
            <circle cx="472" cy="104" r="1"   fill="#cc785c" opacity="0.08" />
            <circle cx="482" cy="168" r="1.1" fill="#cc785c" opacity="0.09" />

            <line
              class="alr-banner-scanline"
              x1="320" y1="0" x2="338" y2="220"
              stroke="#cc785c" stroke-width="0.8" opacity="0.35"
              stroke-dasharray="6 4"
            />

            <g transform="translate(345, 10) scale(0.4)" opacity="0.12">
              <path
                class="alr-home-hero-logo"
                d="M 531.0 468.5 L 384.0 467.5 L 283.0 400.5 L 271.0 403.5 L 184.0 463.5 L 172.0 468.5 L 26.0 468.5 L 14.5 461.0 L 11.5 454.0 L 14.5 439.0 L 250.5 39.0 L 269.0 13.5 L 285.0 11.5 L 298.5 24.0 L 542.5 438.0 L 545.5 446.0 L 544.5 458.0 L 531.0 468.5 Z M 448.5 429.0 L 480.0 428.5 L 484.5 425.0 L 484.5 419.0 L 287.5 85.0 L 282.0 78.5 L 276.0 78.5 L 77.5 411.0 L 73.5 425.0 L 78.0 428.5 L 96.0 429.5 L 159.0 428.5 L 237.5 376.0 L 237.5 371.0 L 232.0 365.5 L 175.0 328.5 L 170.5 324.0 L 169.5 317.0 L 262.5 155.0 L 271.0 145.5 L 283.0 143.5 L 293.5 151.0 L 389.5 316.0 L 388.5 323.0 L 382.0 329.5 L 325.0 366.5 L 321.5 370.0 L 322.5 377.0 L 395.0 426.5 L 409.0 429.5 L 448.5 429.0 Z M 283.5 345.0 L 332.0 311.5 L 335.5 303.0 L 284.5 217.0 L 276.0 215.5 L 222.5 308.0 L 274.0 344.5 L 283.5 345.0 Z"
                fill="#cc785c"
                fill-rule="evenodd"
              />
            </g>

            <rect class="alr-banner-vignette" x="0" y="190" width="680" height="30" fill="#0f0e0b" opacity="0.5" />
          </svg>

          <div class="alr-home-hero-overlay">
            <div class="alr-home-hero-left">
              <div class="alr-eyebrow">Archive of Lost Realities Initiative — Cycle {activeCycle}</div>
              <div class="alr-home-hero-title">What's Unwritten<br />is not empty.</div>
              <div class="alr-home-hero-sub">
                What remains when a reality collapses is not nothing.<br />
                Fragments persist. Echoes persist. We document what remains.
              </div>
              <div class="alr-home-hero-links">
                <a href="/Index/ECHO-Registry"          class="alr-home-hero-link">Echo Registry</a>
                <a href="/Index/Reality-Registry"        class="alr-home-hero-link">Reality Registry</a>
                <a href="/Foundations/ALR/ALR-Initiative" class="alr-home-hero-link-ghost">About the Initiative</a>
              </div>

              <div class="alr-home-hero-mstats">
                <div class="alr-home-hero-mstat"><div class="alr-home-hero-mstat-n">{echoes.length}</div><div class="alr-home-hero-mstat-l">Echoes</div></div>
                <div class="alr-home-hero-mstat"><div class="alr-home-hero-mstat-n">{realities.length}</div><div class="alr-home-hero-mstat-l">Realities</div></div>
                <div class="alr-home-hero-mstat"><div class="alr-home-hero-mstat-n">{activeCycle}</div><div class="alr-home-hero-mstat-l">Cycle</div></div>
                <div class="alr-home-hero-mstat"><div class="alr-home-hero-mstat-n">ALR-01</div><div class="alr-home-hero-mstat-l">Node</div></div>
              </div>
            </div>

            <div class="alr-home-hero-right">
              <div class="alr-home-status-card">
                <div class="alr-home-status-label">Echoes documented</div>
                <div class="alr-home-status-val">{echoes.length}</div>
                <div class="alr-home-status-sub">{echoes.length - terminalEchoes.length} active — {terminalEchoes.length} terminal</div>
              </div>
              <div class="alr-home-status-card">
                <div class="alr-home-status-label">Realities investigated</div>
                <div class="alr-home-status-val">{realities.length}</div>
                <div class="alr-home-status-sub">All RCC-1 Silent</div>
              </div>
              <div class="alr-home-status-card">
                <div class="alr-home-status-label">Terminal echoes (S4)</div>
                <div class="alr-home-status-val alr-red">{terminalEchoes.length}</div>
                <div class="alr-home-status-sub">Highest severity class</div>
              </div>
              <div class="alr-home-status-card">
                <div class="alr-home-status-label">Active cycle</div>
                <div class="alr-home-status-val alr-home-status-val-dim">{activeCycle}</div>
                <div class="alr-home-status-sub">Archive Operations</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURED ECHO ── */}
        <div class="alr-home-featured" id="alr-featured-echo">
          <div class="alr-home-featured-left">
            <div class="alr-home-featured-label">Featured Echo — Rotating Selection</div>
            <div class="alr-home-featured-title" id="alr-fe-title">—</div>
            <div class="alr-home-featured-desc" id="alr-fe-desc">Loading archive entry...</div>
            <div class="alr-home-featured-tags" id="alr-fe-tags"></div>
            <a href="#" id="alr-fe-link" class="alr-home-featured-btn">View full entry →</a>
          </div>
          <div class="alr-home-featured-img" id="alr-fe-img">
            <span class="alr-home-featured-badge" id="alr-fe-badge">—</span>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
(function() {
  var echoes = ${JSON.stringify(echoes.map(file => {
    const fm = (file.frontmatter ?? {}) as Record<string, unknown>
    return {
      id: String(fm.echo_id ?? ""),
      name: String(file.frontmatter?.title ?? "Unknown Echo"),
      slug: file.slug ?? "",
      ec: String(fm.ec ?? ""),
      esc: String(fm.esc ?? ""),
      desc: String(fm.description ?? fm.desc ?? ""),
      image: '/Images/' + String(fm.echo_id ?? "") + '.webp',
    }
  }))};

  var current = -1;

  function showEcho(idx) {
    var e = echoes[idx];
    if (!e) return;

    var title = document.getElementById('alr-fe-title');
    var desc = document.getElementById('alr-fe-desc');
    var tags = document.getElementById('alr-fe-tags');
    var link = document.getElementById('alr-fe-link');
    var img = document.getElementById('alr-fe-img');
    var badge = document.getElementById('alr-fe-badge');
    var wrap = document.getElementById('alr-featured-echo');

    if (!title || !desc || !tags || !link || !img || !badge || !wrap) return;

    wrap.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    wrap.style.opacity = '0';
    wrap.style.transform = 'translateX(-18px)';

    setTimeout(function() {
      title.textContent = e.name.startsWith(e.id) ? e.name : (e.id ? e.id + ' — ' : '') + e.name;
      desc.textContent = e.desc || 'An anomalous remnant recovered from a collapsed reality. Classification data preserved within the Archive.';
      link.href = '/' + e.slug;

      var ecKey = e.ec.split(' ')[0].toLowerCase();
      var escKey = e.esc.split(' ')[0].toLowerCase();
      tags.innerHTML = '';

      if (e.ec) {
        var ecSpan = document.createElement('span');
        ecSpan.className = 'alr-etag alr-et-' + ecKey;
        ecSpan.textContent = e.ec.split(' ')[0];
        tags.appendChild(ecSpan);
      }

      if (e.esc) {
        var escSpan = document.createElement('span');
        escSpan.className = 'alr-etag alr-es-' + escKey;
        escSpan.textContent = e.esc.split(' ')[0];
        tags.appendChild(escSpan);
      }

      badge.textContent = (e.id || 'ECHO') + ' — ' + (e.esc || 'Classified');

      if (e.image) {
        img.style.backgroundImage = 'url(' + e.image + ')';
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
      } else {
        img.style.backgroundImage = 'none';
      }

      wrap.style.transform = 'translateX(18px)';
      wrap.style.opacity = '0';

      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          wrap.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          wrap.style.opacity = '1';
          wrap.style.transform = 'translateX(0)';
        });
      });
    }, 260);
  }

  function next() {
    if (echoes.length === 0) return;
    current = (current + 1) % echoes.length;
    showEcho(current);
  }

  function init() {
    if (echoes.length === 0) return;
    current = Math.floor(Math.random() * echoes.length);
    showEcho(current);
    setInterval(next, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('nav', function() {
    if (window.location.pathname === '/' || window.location.pathname === '') {
      current = Math.floor(Math.random() * echoes.length);
      showEcho(current);
    }
  });
})();
        ` }} />

        {/* ── MAIN GRID ── */}
        <div class="alr-grid">
          <RecentEchoes {...props} />

          <div class="alr-card-stack">
            <RecentRealities {...props} />

            <div class="alr-card">
              <div class="alr-card-head">
                <span class="alr-card-head-title">Archive notices</span>
                <span class="alr-card-head-action">Cycle {activeCycle}</span>
              </div>
              <div class="alr-notice-row">
                <div class="alr-notice-dot" style={{ background: "#993c1d" }}></div>
                <div>
                  <div class="alr-notice-label" style={{ color: "#c45a3a" }}>S4 — Terminal review</div>
                  <div class="alr-notice-text">ECHO-003 stability review due. S4 classification confirmed.</div>
                  <div class="alr-notice-time">Cycle 7 — Archive Operations</div>
                </div>
              </div>
              <div class="alr-notice-row">
                <div class="alr-notice-dot" style={{ background: "#854f0b" }}></div>
                <div>
                  <div class="alr-notice-label" style={{ color: "#c49030" }}>S3 — Reclassification pending</div>
                  <div class="alr-notice-text">
                    ECHO-031 reclassification under review. Manifestation pattern shows increased frequency.
                  </div>
                  <div class="alr-notice-time">Cycle 7 — Echo Research Division</div>
                </div>
              </div>
              <div class="alr-notice-row">
                <div class="alr-notice-dot" style={{ background: "#3c3489" }}></div>
                <div>
                  <div class="alr-notice-label" style={{ color: "#6898c8" }}>Field — Transfer complete</div>
                  <div class="alr-notice-text">
                    R-019 field documentation complete. Entry transferred to Archive Operations.
                  </div>
                  <div class="alr-notice-time">Cycle 6 — Reality Investigation Division</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PERSONNEL ── */}
        <div class="alr-card alr-card-full">
          <div class="alr-card-head">
            <span class="alr-card-head-title">Active personnel — Cycle {activeCycle}</span>
          </div>
          <div class="alr-personnel">
            <div class="alr-person"><div class="alr-avatar alr-av-inv">EM</div><div><div class="alr-person-name">E. Maren</div><div class="alr-person-div">Reality Investigation</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-res">VA</div><div><div class="alr-person-name">V. Arend</div><div class="alr-person-div">Echo Research</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-ops">MV</div><div><div class="alr-person-name">M. Voss</div><div class="alr-person-div">Archive Operations</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-dev">KA</div><div><div class="alr-person-name">K. Albrecht</div><div class="alr-person-div">Device Development</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-inv">JC</div><div><div class="alr-person-name">J. Calloway</div><div class="alr-person-div">Reality Investigation</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-res">NO</div><div><div class="alr-person-name">N. Ossic</div><div class="alr-person-div">Echo Research</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-ops">LD</div><div><div class="alr-person-name">L. Dray</div><div class="alr-person-div">Archive Operations</div></div></div>
            <div class="alr-person"><div class="alr-avatar alr-av-dev">DT</div><div><div class="alr-person-name">D. Tessir</div><div class="alr-person-div">Device Development</div></div></div>
          </div>
        </div>

        {/* ── DIRECTOR'S LOG — original long-form editorial content, deliberately placed
             immediately before the ad row so the ad sits beside substantive writing
             rather than only navigation/list widgets ── */}
        <div class="alr-card alr-card-full alr-home-directorlog">
          <div class="alr-card-head">
            <span class="alr-card-head-title">From the Office of the Director — Cycle {activeCycle}</span>
          </div>
          <div class="alr-directorlog-body">
            <p>
              Seven cycles into sustained operation, the Archive holds {echoes.length} confirmed Echoes and {realities.length} fully investigated
              realities — modest totals against the scale of what the Unwritten has produced, and a number I do not expect to grow
              quickly. Confirmation is slow work. Every entry in this catalog survived a process built specifically to reject
              anything that could be explained another way.
            </p>
            <p>
              This cycle's correspondence has been dominated by ECHO-003. The entity has held a stable classification since its
              filing, paired from the beginning with ECHO-002 as a linked entry, and its scheduled S4 review is now the
              most-discussed item on the Directorate's desk. Reviews of this kind are not procedural formalities. An S4
              reclassification changes who is permitted near an anomaly, how it is documented, and in several cases, whether
              documentation continues at all. I have read every field note submitted on ECHO-003 this cycle. I do not have
              anything reassuring to add to them.
            </p>
            <p>
              R-031's collapse field continues to produce recoverable material well past the point Reality Investigation
              projected it would go quiet. The Still Ones are the fourth class of remnant catalogued from that site alone.
              Whatever the reality was before it ended, it does not appear to be finished ending.
            </p>
            <p>
              Elsewhere, R-019's field documentation closed out clean and was transferred to Archive Operations without
              incident — the kind of entry that does not generate discussion, and is exactly as valuable to this catalog as
              the ones that do.
            </p>
            <p>
              None of this is offered as reassurance. The Archive does not exist to reassure anyone, including the people
              who staff it. It exists so that what has been observed is not lost twice — once to whatever ended it, and
              again to the absence of a record. That is the whole of the mandate, and it has not changed since Cycle 1.
            </p>
            <div class="alr-directorlog-sig">— Office of the Director</div>
          </div>
        </div>

        {/* ── DISPATCH CARD (sticky-note field notes + shop promo) + AD ── */}
        <div class="alr-home-ad-row">
          <div class="alr-home-dispatch">
            <div class="alr-home-dispatch-pin"></div>
            <div class="alr-home-dispatch-eyebrow">Archive Field Note — Cycle {activeCycle}</div>
            <div class="alr-home-dispatch-quote" id="alr-home-dispatch-quote">{dispatchQuotes[0].text}</div>
            <div class="alr-home-dispatch-attr" id="alr-home-dispatch-attr">— {dispatchQuotes[0].attr}</div>

            <div class="alr-home-dispatch-shop">
              <span>Field equipment &amp; archive materials support ongoing operations.</span>
              <a href="/Shop" class="internal">Browse the Shop →</a>
            </div>

            <script dangerouslySetInnerHTML={{ __html: `
(function() {
  var quotes = ${JSON.stringify(dispatchQuotes)};
  var current = -1;

  function showQuote(idx) {
    var q = quotes[idx];
    var quoteEl = document.getElementById('alr-home-dispatch-quote');
    var attrEl = document.getElementById('alr-home-dispatch-attr');
    if (!q || !quoteEl || !attrEl) return;
    quoteEl.textContent = q.text;
    attrEl.textContent = '— ' + q.attr;
  }

  function next() {
    current = (current + 1) % quotes.length;
    showQuote(current);
  }

  function init() {
    current = Math.floor(Math.random() * quotes.length);
    showQuote(current);
    setInterval(next, 20000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('nav', function() {
    if (window.location.pathname === '/' || window.location.pathname === '') {
      current = Math.floor(Math.random() * quotes.length);
      showQuote(current);
    }
  });
})();
            ` }} />
          </div>

          <div class="alr-home-ad-wrap">
            <div class="alr-home-ad-head">
              <span class="alr-home-ad-label">Sponsored • External Signal</span>
            </div>
            <div class="alr-home-ad-box">
              <ins
                class="adsbygoogle"
                style="display:inline-block;width:300px;height:250px"
                data-ad-client="ca-pub-1009528022941792"
                data-ad-slot="6380168218"
              ></ins>
              <script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).push({});` }} />
            </div>
            <div class="alr-home-ad-foot">Archive Initiative — Index Stable</div>
          </div>
        </div>

      </div>
    </>
  )
}

ALRHomeDashboard.displayName = "ALRHomeDashboard"
export default (() => ALRHomeDashboard) satisfies QuartzComponentConstructor