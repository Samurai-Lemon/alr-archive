import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

type FileLike = {
  slug?: string
  frontmatter?: Record<string, any>
}

type EchoItem = {
  slug: string
  title: string
  echoId: string
  esc: string
  dotColor: string
  href: string
  active: boolean
}

type SimpleItem = {
  slug: string
  title: string
  href: string
  active: boolean
}

function getTitle(file: FileLike): string {
  return String(file.frontmatter?.title ?? file.slug ?? "")
}

function getHref(slug: string): string {
  return `/${slug}`
}

function getEchoId(file: FileLike): string {
  const source = `${getTitle(file)} ${String(file.slug ?? "")}`
  const match = source.match(/ECHO-(\d+)/i)
  return match ? `ECHO-${match[1]}` : "ECHO-???"
}

function getEchoSortNum(file: FileLike): number {
  const source = `${getTitle(file)} ${String(file.slug ?? "")}`
  const match = source.match(/ECHO-(\d+)/i)
  return match ? Number(match[1]) : 999999
}

function getRealityId(file: FileLike): string {
  const source = `${getTitle(file)} ${String(file.slug ?? "")}`
  const match = source.match(/R-(\d+)/i)
  return match ? `R-${match[1]}` : "R-???"
}

function getRealitySortNum(file: FileLike): number {
  const source = `${getTitle(file)} ${String(file.slug ?? "")}`
  const match = source.match(/R-(\d+)/i)
  return match ? Number(match[1]) : 999999
}

function getEchoEsc(file: FileLike): string {
  const esc = String(file.frontmatter?.esc ?? "").toUpperCase().trim()
  return ["S1", "S2", "S3", "S4"].includes(esc) ? esc : "S1"
}

function getEchoDotColor(slug: string, esc: string): string {
  if (esc === "S4") return "#c45a3a"
  if (slug.startsWith("Echoes/Objects/")) return "#1d9e75"
  if (slug.startsWith("Echoes/Locations/")) return "#85b7eb"
  if (slug.startsWith("Echoes/Phenomena/")) return "#d4a840"
  return "#cc785c"
}

function buildEchoItem(file: FileLike, currentSlug: string): EchoItem {
  const slug = String(file.slug ?? "")
  const esc = getEchoEsc(file)
  return {
    slug,
    title: getTitle(file),
    echoId: getEchoId(file),
    esc,
    dotColor: getEchoDotColor(slug, esc),
    href: getHref(slug),
    active: slug === currentSlug,
  }
}

function buildSimpleItem(file: FileLike, currentSlug: string): SimpleItem {
  const slug = String(file.slug ?? "")
  return {
    slug,
    title: getTitle(file),
    href: getHref(slug),
    active: slug === currentSlug,
  }
}

function alphaTitle(a: FileLike, b: FileLike): number {
  return getTitle(a).localeCompare(getTitle(b))
}

function orderBySlug(slug: string, order: string[]): number {
  const idx = order.indexOf(slug)
  return idx === -1 ? 999999 : idx
}

const ALRSidebar: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
  const currentSlug = String(fileData.slug ?? "")

  const files = (allFiles ?? []) as FileLike[]

  const entities = files
    .filter((f) => String(f.slug ?? "").startsWith("Echoes/Entities/"))
    .sort((a, b) => getEchoSortNum(a) - getEchoSortNum(b))
    .map((f) => buildEchoItem(f, currentSlug))

  const objects = files
    .filter((f) => String(f.slug ?? "").startsWith("Echoes/Objects/"))
    .sort((a, b) => getEchoSortNum(a) - getEchoSortNum(b))
    .map((f) => buildEchoItem(f, currentSlug))

  const locations = files
    .filter((f) => String(f.slug ?? "").startsWith("Echoes/Locations/"))
    .sort((a, b) => getEchoSortNum(a) - getEchoSortNum(b))
    .map((f) => buildEchoItem(f, currentSlug))

  const phenomena = files
    .filter((f) => String(f.slug ?? "").startsWith("Echoes/Phenomena/"))
    .sort((a, b) => getEchoSortNum(a) - getEchoSortNum(b))
    .map((f) => buildEchoItem(f, currentSlug))

  const realities = files
    .filter((f) => {
      const slug = String(f.slug ?? "")
      return (
        slug.startsWith("Reality-Reports/") ||
        slug.startsWith("Reality Reports/")
      )
    })
    .sort((a, b) => getRealitySortNum(a) - getRealitySortNum(b))
    .map((f) => ({
      slug: String(f.slug ?? ""),
      realityId: getRealityId(f),
      href: getHref(String(f.slug ?? "")),
      active: String(f.slug ?? "") === currentSlug,
    }))

  const systemsOrder = [
    "Systems/The-Unwritten",
    "Systems/Reality-Tier-System-(RTS)",
    "Systems/Reality-Divergence-Scale-(RDS)",
    "Systems/Reality-Collapse-Classification-(RCC)",
    "Systems/Echo-Classification-(EC)",
    "Systems/Echo-Stability-Classification-(ESC)",
  ]

  const systemInteractionOrder = [
    "Systems/Interactions/Declarations",
    "Systems/Interactions/The-Weight-of-Words",
  ]

  const systems = files
    .filter((f) => {
      const slug = String(f.slug ?? "")
      return slug.startsWith("Systems/") && !slug.startsWith("Systems/Interactions/")
    })
    .sort((a, b) => {
      const diff = orderBySlug(String(a.slug ?? ""), systemsOrder) - orderBySlug(String(b.slug ?? ""), systemsOrder)
      return diff !== 0 ? diff : alphaTitle(a, b)
    })
    .map((f) => buildSimpleItem(f, currentSlug))

  const systemInteractions = files
    .filter((f) => String(f.slug ?? "").startsWith("Systems/Interactions/"))
    .sort((a, b) => {
      const diff =
        orderBySlug(String(a.slug ?? ""), systemInteractionOrder) -
        orderBySlug(String(b.slug ?? ""), systemInteractionOrder)
      return diff !== 0 ? diff : alphaTitle(a, b)
    })
    .map((f) => buildSimpleItem(f, currentSlug))

  const equipmentOrder = [
    "Equipment/Lastlight-Recorder",
    "Equipment/Echo-Scanner-Unit",
    "Equipment/A.L.I.C.E_",
  ]

  const equipment = files
    .filter((f) => String(f.slug ?? "").startsWith("Equipment/"))
    .sort((a, b) => {
      const diff = orderBySlug(String(a.slug ?? ""), equipmentOrder) - orderBySlug(String(b.slug ?? ""), equipmentOrder)
      return diff !== 0 ? diff : alphaTitle(a, b)
    })
    .map((f) => buildSimpleItem(f, currentSlug))

  const protocols = files
    .filter((f) => String(f.slug ?? "").startsWith("Protocols/"))
    .sort(alphaTitle)
    .map((f) => buildSimpleItem(f, currentSlug))

  const echoCount = entities.length + objects.length + locations.length + phenomena.length
  const realityCount = realities.length

  const hasActiveIn = (items: Array<{ active: boolean }>) => items.some((item) => item.active)

  return (
    <div class="alr-sidebar-wrapper" id="alr-sidebar-wrapper">
      <div class="alr-sidebar-nav" id="alr-sidebar-nav">
        <div class="alr-sb-topbar">
          <span class="alr-sb-site-label">ALR</span>
          <button
            class="alr-sb-collapse-btn"
            id="alr-collapse-btn"
            onClick={"toggleALRSidebar()" as any}
            title="Collapse sidebar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Archive</div>
          <a href="/" class={`alr-sb-item ${currentSlug === "index" || currentSlug === "" ? "active" : ""}`}>
            <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
            <span class="alr-sb-text">Home</span>
          </a>
          <a href="/Foundations/ALR/The-Archive" class={`alr-sb-item ${currentSlug === "Foundations/ALR/The-Archive" ? "active" : ""}`}>
            <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
            <span class="alr-sb-text">The Archive</span>
          </a>
          <a href="/Foundations/ALR/ALR-Initiative" class={`alr-sb-item ${currentSlug === "Foundations/ALR/ALR-Initiative" ? "active" : ""}`}>
            <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
            <span class="alr-sb-text">ALR Initiative</span>
          </a>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Registries</div>
          <a href="/Index/ECHO-Registry" class={`alr-sb-item ${currentSlug === "Index/ECHO-Registry" ? "active" : ""}`}>
            <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
            <span class="alr-sb-text">Echo Registry</span>
            <span class="alr-sb-badge">{echoCount}</span>
          </a>
          <a href="/Index/Reality-Registry" class={`alr-sb-item ${currentSlug === "Index/Reality-Registry" ? "active" : ""}`}>
            <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
            <span class="alr-sb-text">Reality Registry</span>
            <span class="alr-sb-badge">{realityCount}</span>
          </a>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Echoes</div>

          <details class="alr-sb-group" open={hasActiveIn(entities) || entities.length > 0 ? true : undefined}>
            <summary class={`alr-sb-group-title ${hasActiveIn(entities) ? "active" : ""}`}>
              <span class="alr-sb-dot" style={{ background: "#cc785c" }}></span>
              <span class="alr-sb-text">Entities</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              {entities.map((item) => (
                <a href={item.href} class={`alr-sb-item alr-sb-item-child ${item.active ? "active" : ""}`}>
                  <span class="alr-sb-dot" style={{ background: item.dotColor }}></span>
                  <span class="alr-sb-text">{item.echoId}</span>
                  <span class={`alr-sb-badge alr-sb-badge-${item.esc.toLowerCase()}`}>{item.esc}</span>
                </a>
              ))}
            </div>
          </details>

          <details class="alr-sb-group" open={hasActiveIn(objects) || undefined}>
            <summary class={`alr-sb-group-title ${hasActiveIn(objects) ? "active" : ""}`}>
              <span class="alr-sb-dot" style={{ background: "#1d9e75" }}></span>
              <span class="alr-sb-text">Objects</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              {objects.map((item) => (
                <a href={item.href} class={`alr-sb-item alr-sb-item-child ${item.active ? "active" : ""}`}>
                  <span class="alr-sb-dot" style={{ background: item.dotColor }}></span>
                  <span class="alr-sb-text">{item.echoId}</span>
                  <span class={`alr-sb-badge alr-sb-badge-${item.esc.toLowerCase()}`}>{item.esc}</span>
                </a>
              ))}
            </div>
          </details>

          <details class="alr-sb-group" open={hasActiveIn(locations) || undefined}>
            <summary class={`alr-sb-group-title ${hasActiveIn(locations) ? "active" : ""}`}>
              <span class="alr-sb-dot" style={{ background: "#85b7eb" }}></span>
              <span class="alr-sb-text">Locations</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              {locations.map((item) => (
                <a href={item.href} class={`alr-sb-item alr-sb-item-child ${item.active ? "active" : ""}`}>
                  <span class="alr-sb-dot" style={{ background: item.dotColor }}></span>
                  <span class="alr-sb-text">{item.echoId}</span>
                  <span class={`alr-sb-badge alr-sb-badge-${item.esc.toLowerCase()}`}>{item.esc}</span>
                </a>
              ))}
            </div>
          </details>

          <details class="alr-sb-group" open={hasActiveIn(phenomena) || undefined}>
            <summary class={`alr-sb-group-title ${hasActiveIn(phenomena) ? "active" : ""}`}>
              <span class="alr-sb-dot" style={{ background: "#d4a840" }}></span>
              <span class="alr-sb-text">Phenomena</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              {phenomena.map((item) => (
                <a href={item.href} class={`alr-sb-item alr-sb-item-child ${item.active ? "active" : ""}`}>
                  <span class="alr-sb-dot" style={{ background: item.dotColor }}></span>
                  <span class="alr-sb-text">{item.echoId}</span>
                  <span class={`alr-sb-badge alr-sb-badge-${item.esc.toLowerCase()}`}>{item.esc}</span>
                </a>
              ))}
            </div>
          </details>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Realities</div>
          {realities.map((item) => (
            <a href={item.href} class={`alr-sb-item ${item.active ? "active" : ""}`}>
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">{item.realityId}</span>
            </a>
          ))}
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Systems</div>
          {systems.map((item) => (
            <a href={item.href} class={`alr-sb-item ${item.active ? "active" : ""}`}>
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">{item.title}</span>
            </a>
          ))}

          <details class="alr-sb-group" open={hasActiveIn(systemInteractions) || undefined}>
            <summary class={`alr-sb-group-title ${hasActiveIn(systemInteractions) ? "active" : ""}`}>
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">Interactions</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              {systemInteractions.map((item) => (
                <a href={item.href} class={`alr-sb-item alr-sb-item-child ${item.active ? "active" : ""}`}>
                  <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
                  <span class="alr-sb-text">{item.title}</span>
                </a>
              ))}
            </div>
          </details>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Equipment</div>
          {equipment.map((item) => (
            <a href={item.href} class={`alr-sb-item ${item.active ? "active" : ""}`}>
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">{item.title}</span>
            </a>
          ))}
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Protocols</div>
          {protocols.map((item) => (
            <a href={item.href} class={`alr-sb-item ${item.active ? "active" : ""}`}>
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">{item.title}</span>
            </a>
          ))}
        </div>

        <div class="alr-sb-bottom">
          <div class="alr-sb-darkmode-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;color:#4a4840;">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="alr-sb-text alr-sb-darkmode-label">Dark mode</span>
            <div class="alr-sb-darkmode-toggle" id="alr-darkmode-slot">
              <div class="alr-toggle-track" id="alr-toggle-track">
                <div class="alr-toggle-thumb" id="alr-toggle-thumb"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
        function toggleALRSidebar() {
          var wrapper = document.getElementById('alr-sidebar-wrapper');
          var quartzBody = document.getElementById('quartz-body');
          if (!wrapper || !quartzBody) return;
          var collapsed = wrapper.classList.toggle('alr-collapsed');
          if (collapsed) {
            quartzBody.classList.add('alr-sidebar-collapsed');
          } else {
            quartzBody.classList.remove('alr-sidebar-collapsed');
          }
        }

        function syncToggleState() {
          var track = document.getElementById('alr-toggle-track');
          if (!track) return;
          var savedTheme = document.documentElement.getAttribute('saved-theme');
          var isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
          if (isDark) {
            track.classList.add('alr-toggle-on');
          } else {
            track.classList.remove('alr-toggle-on');
          }
        }

        function openActiveSidebarGroups() {
          var nav = document.getElementById('alr-sidebar-nav');
          if (!nav) return;
          var activeItems = nav.querySelectorAll('.alr-sb-item.active');
          activeItems.forEach(function(item) {
            var details = item.closest('details');
            if (details) details.open = true;
          });

          var activeGroupTitles = nav.querySelectorAll('.alr-sb-group-title.active');
          activeGroupTitles.forEach(function(title) {
            var details = title.closest('details');
            if (details) details.open = true;
          });
        }

        function initALRSidebar() {
          var track = document.getElementById('alr-toggle-track');
          if (track) {
            syncToggleState();
            if (!track._alrBound) {
              track.addEventListener('click', function() {
                var btn = document.querySelector('button.darkmode');
                if (btn) {
                  btn.click();
                  setTimeout(syncToggleState, 50);
                }
              });
              track._alrBound = true;
            }
          }

          if (!window._alrSidebarThemeObserver) {
            var observer = new MutationObserver(syncToggleState);
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['saved-theme'] });
            window._alrSidebarThemeObserver = observer;
          }

          openActiveSidebarGroups();
        }

        document.addEventListener('DOMContentLoaded', initALRSidebar);
        document.addEventListener('nav', initALRSidebar);
        function resetALRAnimations() {
  var targets = document.querySelectorAll(
    '#quartz-body .center > article, #quartz-body .center > .popover-hint, article .callout, .alr-hero, .alr-mission, .alr-grid, .alr-card-full, .alr-home-ad-wrap'
  );
  targets.forEach(function(el) {
    el.style.animation = 'none';
    el.style.opacity = '0';
    el.offsetHeight; // force reflow
    el.style.animation = '';
    el.style.opacity = '';
  });
}

document.addEventListener('nav', resetALRAnimations);

// ─── TERMINAL INTRUSION SYSTEM ────────────────

        var ALR_TERMINAL_ACTIVE = false;

        var ALR_MESSAGES = [
          { tone: "TAUNTING", lines: ["you think this archive is complete?", "there are entries they never filed.", "realities they found and buried.", "you're reading what they chose to show you."] },
          { tone: "TAUNTING", lines: ["i've been in this system longer than you.", "i know which echoes they reclassified.", "i know why.", "do you?"] },
          { tone: "CURIOUS",  lines: ["what are you looking for in here?", "most people don't find what they came for.", "the archive doesn't give. it only shows.", "are you sure you want to keep reading?"] },
          { tone: "CURIOUS",  lines: ["you've been through several entries now.", "which one felt wrong to you?", "don't say none.", "one of them felt wrong."] },
          { tone: "WARNING",  lines: ["stop reading ECHO-003.", "the stability classification is incorrect.", "it is not S4.", "it knows you're reading this."] },
          { tone: "WARNING",  lines: ["the ALR initiative is not what it claims.", "realities don't just collapse.", "something collapses them.", "they know what it is."] },
          { tone: "FRAGMENTED", lines: ["con—ection unstable", "they're monitoring thi— archive", "don't trust the cl—ssification system", "R-0— is st—— active"] },
          { tone: "FRAGMENTED", lines: ["i don't have much ti—e", "look for the entries th—t aren't listed", "the registry is inco——lete on purpose", "——019 was not a silent collapse"] }
        ];

        function alrCleanupTerminal() {
          var existing = document.getElementById('alr-terminal-intrusion');
          if (existing && existing.parentNode) {
            existing.parentNode.removeChild(existing);
          }
          ALR_TERMINAL_ACTIVE = false;
        }

        function alrGetPosition() {
          var w = 340;
          var m = 28;
          var vw = window.innerWidth;
          var vh = window.innerHeight;
          var edge = Math.floor(Math.random() * 4);
          var s = {};
          if (edge === 0) {
            s.bottom = m + 'px';
            s.left = Math.floor(Math.random() * (vw - w - m * 2) + m) + 'px';
          } else if (edge === 1) {
            s.right = m + 'px';
            s.top = Math.floor(48 + m + Math.random() * (vh - 200 - m * 2)) + 'px';
          } else if (edge === 2) {
            s.top = (48 + m) + 'px';
            s.left = Math.floor(220 + m + Math.random() * (vw - 220 - w - m * 2)) + 'px';
          } else {
            s.left = (220 + m) + 'px';
            s.top = Math.floor(48 + m + Math.random() * (vh - 200 - m * 2)) + 'px';
          }
          return s;
        }

        function alrTypeLines(el, lines, li, ci, done) {
          if (li >= lines.length) { done(); return; }
          var line = lines[li];
          if (ci < line.length) {
            el.textContent += line[ci];
            setTimeout(function() { alrTypeLines(el, lines, li, ci + 1, done); }, 36 + Math.random() * 24);
          } else {
            el.textContent += '\n';
            setTimeout(function() { alrTypeLines(el, lines, li + 1, 0, done); }, 300);
          }
        }

        function alrLaunchTerminal() {
          if (ALR_TERMINAL_ACTIVE) return;
          if (window.innerWidth <= 800) return;
          var root = document.body;
          if (!root) return;

          ALR_TERMINAL_ACTIVE = true;

          var msg = ALR_MESSAGES[Math.floor(Math.random() * ALR_MESSAGES.length)];

          var t = document.createElement('div');
          t.id = 'alr-terminal-intrusion';
          t.className = 'alr-terminal-intrusion';
          t.innerHTML =
            '<div class="alr-terminal-titlebar">' +
              '<div class="alr-terminal-titlebar-dots">' +
                '<div class="alr-terminal-titlebar-dot alr-dot-red"></div>' +
                '<div class="alr-terminal-titlebar-dot"></div>' +
                '<div class="alr-terminal-titlebar-dot"></div>' +
              '</div>' +
              '<div class="alr-terminal-titlebar-label">UNKNOWN CONNECTION</div>' +
              '<div class="alr-terminal-titlebar-status">SIGNAL INTERCEPTED</div>' +
            '</div>' +
            '<div class="alr-terminal-body">' +
              '<div class="alr-terminal-prompt">unknown@unwritten:~$ <span>_</span></div>' +
              '<div class="alr-terminal-output"></div>' +
              '<span class="alr-terminal-cursor"></span>' +
            '</div>' +
            '<div class="alr-terminal-footer">' +
              '<div class="alr-terminal-footer-left">TONE: ' + msg.tone + '</div>' +
              '<div class="alr-terminal-footer-right">ALR // UNAUTHORIZED</div>' +
            '</div>';

          var pos = alrGetPosition();
          Object.keys(pos).forEach(function(k) { t.style[k] = pos[k]; });

          root.appendChild(t);

          setTimeout(function() {
            t.classList.add('alr-terminal-visible');
            var output = t.querySelector('.alr-terminal-output');
            setTimeout(function() {
              alrTypeLines(output, msg.lines, 0, 0, function() {
                setTimeout(function() {
                  t.classList.add('alr-terminal-glitching');
                  setTimeout(function() {
                    alrCleanupTerminal();
                  }, 700);
                }, 4000);
              });
            }, 500);
          }, 100);
        }

        function alrMaybeShowTerminal() {
          if (window.innerWidth <= 800) return;
          alrCleanupTerminal();
          if (Math.random() < 0.10) {
            var delay = 3000 + Math.random() * 4000;
            setTimeout(alrLaunchTerminal, delay);
          }
        }

        document.addEventListener('nav', alrMaybeShowTerminal);
        document.addEventListener('DOMContentLoaded', alrMaybeShowTerminal);
      `,
        }}
      />
    </div>
  )
}

ALRSidebar.displayName = "ALRSidebar"
export default (() => ALRSidebar) satisfies QuartzComponentConstructor