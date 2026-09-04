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

  const alrFoundations = files
    .filter((f) => {
      const slug = String(f.slug ?? "")
      return slug.startsWith("Foundations/ALR/") && !slug.startsWith("Foundations/ALR/Active-Personnel/")
    })
    .sort(alphaTitle)
    .map((f) => buildSimpleItem(f, currentSlug))

  const personnelOrder = [
    "Foundations/ALR/Active-Personnel/Reality-Investigation-Division",
    "Foundations/ALR/Active-Personnel/Echo-Research-Division",
    "Foundations/ALR/Active-Personnel/Archive-Operations",
    "Foundations/ALR/Active-Personnel/Device-Development-Bureau",
  ]

  const activePersonnel = files
    .filter((f) => String(f.slug ?? "").startsWith("Foundations/ALR/Active-Personnel/"))
    .sort((a, b) => {
      const diff = orderBySlug(String(a.slug ?? ""), personnelOrder) - orderBySlug(String(b.slug ?? ""), personnelOrder)
      return diff !== 0 ? diff : alphaTitle(a, b)
    })
    .map((f) => buildSimpleItem(f, currentSlug))

  const opposition = files
    .filter((f) => String(f.slug ?? "").startsWith("Foundations/Opposition/"))
    .sort(alphaTitle)
    .map((f) => buildSimpleItem(f, currentSlug))

  const echoCount = entities.length + objects.length + locations.length + phenomena.length
  const realityCount = realities.length

  const hasActiveIn = (items: Array<{ active: boolean }>) => items.some((item) => item.active)

  if (currentSlug === "Shop") {
    return (
      <div class="alr-sidebar-wrapper" id="alr-sidebar-wrapper">
        <div class="alr-sidebar-nav" id="alr-sidebar-nav">
          <div class="alr-sb-topbar">
            <span class="alr-sb-site-label">SHOP</span>
          </div>

          <div class="alr-sb-section">
            <div class="alr-sb-label">Archive</div>
            <a href="/" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">Home</span>
            </a>
          </div>

          <div class="alr-sb-section">
            <div class="alr-sb-label">Procurement</div>
            <a href="/Shop" class="alr-sb-item active">
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">All Items</span>
            </a>
            <a href="/Shop" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#cc785c" }}></span>
              <span class="alr-sb-text">Archive Collection</span>
            </a>
            <a href="/Shop" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#d4a840" }}></span>
              <span class="alr-sb-text">Tabletop & TCG</span>
            </a>
            <a href="/Shop" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#85b7eb" }}></span>
              <span class="alr-sb-text">3D Prints</span>
            </a>
          </div>

          <div class="alr-sb-section">
            <div class="alr-sb-label">Category</div>
            <a href="/Shop" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">Apparel</span>
            </a>
            <a href="/Shop" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">Headwear</span>
            </a>
            <a href="/Shop" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">Posters & Prints</span>
            </a>
            <a href="/Shop" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">Accessories</span>
            </a>
            <a href="/Shop" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">Made to Order</span>
            </a>
          </div>

          <div class="alr-sb-section">
            <div class="alr-sb-label">Filter</div>
            <a href="/Shop" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#1d9e75" }}></span>
              <span class="alr-sb-text">In Stock</span>
            </a>
            <a href="/Shop" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#d4a840" }}></span>
              <span class="alr-sb-text">Pre-Order</span>
            </a>
            <a href="/Shop" class="alr-sb-item">
              <span class="alr-sb-dot" style={{ background: "#c45a3a" }}></span>
              <span class="alr-sb-text">Limited</span>
            </a>
          </div>

          <div class="alr-sb-section">
            <div class="alr-sb-label">Price Range</div>
            <div class="alr-sb-price-slider" id="alr-price-slider" data-max="100">
              <div class="alr-sb-price-values">
                <span id="alr-price-min-label">$0</span>
                <span id="alr-price-max-label">$100+</span>
              </div>
              <div class="alr-sb-price-track-wrap">
                <div class="alr-sb-price-track"></div>
                <div class="alr-sb-price-fill" id="alr-price-fill"></div>
                <input type="range" class="alr-sb-price-input" id="alr-price-min" min="0" max="100" step="5" value="0" aria-label="Minimum price" />
                <input type="range" class="alr-sb-price-input" id="alr-price-max" min="0" max="100" step="5" value="100" aria-label="Maximum price" />
              </div>
            </div>
          </div>

          <div class="alr-sb-bottom">
            <div class="alr-sb-darkmode-row" style={{ marginBottom: "6px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;color:#4a4840;">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span class="alr-sb-text alr-sb-darkmode-label">Audio</span>
              <div class="alr-sb-darkmode-toggle">
                <div class="alr-toggle-track" id="alr-sound-track">
                  <div class="alr-toggle-thumb"></div>
                </div>
              </div>
            </div>
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
          function syncToggleState() {
            var track = document.getElementById('alr-toggle-track');
            if (!track) return;
            var savedTheme = document.documentElement.getAttribute('saved-theme');
            var isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (isDark) { track.classList.add('alr-toggle-on'); } else { track.classList.remove('alr-toggle-on'); }
          }
          function syncSoundState() {
            var track = document.getElementById('alr-sound-track');
            if (!track) return;
            var enabled = window.__ALR_SOUND_ENGINE__ ? window.__ALR_SOUND_ENGINE__.isEnabled() : localStorage.getItem('alr-sound-enabled') !== 'false';
            if (enabled) { track.classList.add('alr-toggle-on'); } else { track.classList.remove('alr-toggle-on'); }
          }
          function initShopSidebar() {
            var track = document.getElementById('alr-toggle-track');
            if (track && !track._alrBound) {
              syncToggleState();
              track.addEventListener('click', function() {
                var btn = document.querySelector('button.darkmode');
                if (btn) { btn.click(); setTimeout(syncToggleState, 50); }
              });
              track._alrBound = true;
            }
            var soundTrack = document.getElementById('alr-sound-track');
            if (soundTrack && !soundTrack._alrBound) {
              syncSoundState();
              soundTrack.addEventListener('click', function() {
                if (window.__ALR_SOUND_ENGINE__) { window.__ALR_SOUND_ENGINE__.toggle(); }
                setTimeout(syncSoundState, 50);
              });
              soundTrack._alrBound = true;
            }
            window.addEventListener('alr-sound-state-change', syncSoundState);
            if (!window._alrSidebarThemeObserver) {
              var observer = new MutationObserver(syncToggleState);
              observer.observe(document.documentElement, { attributes: true, attributeFilter: ['saved-theme'] });
              window._alrSidebarThemeObserver = observer;
            }
          }
          document.addEventListener('DOMContentLoaded', initShopSidebar);
          document.addEventListener('nav', initShopSidebar);
            `,
          }}
        />
      </div>
    )
  }

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
          <a href="/Shop" class={`alr-sb-item ${currentSlug === "Shop" ? "active" : ""}`}>
            <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
            <span class="alr-sb-text">Shop</span>
          </a>
          <a href="/label-creator" class={`alr-sb-item ${currentSlug === "label-creator" ? "active" : ""}`}>
            <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
            <span class="alr-sb-text">Grading Terminal</span>
          </a>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Foundations</div>

          <details class="alr-sb-group" open={hasActiveIn(alrFoundations) || hasActiveIn(activePersonnel) || undefined}>
            <summary class={`alr-sb-group-title ${hasActiveIn(alrFoundations) || hasActiveIn(activePersonnel) ? "active" : ""}`}>
              <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
              <span class="alr-sb-text">ALR</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              {alrFoundations.map((item) => (
                <a href={item.href} class={`alr-sb-item alr-sb-item-child ${item.active ? "active" : ""}`}>
                  <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
                  <span class="alr-sb-text">{item.title}</span>
                </a>
              ))}

              <details class="alr-sb-group" open={hasActiveIn(activePersonnel) || undefined}>
                <summary class={`alr-sb-group-title ${hasActiveIn(activePersonnel) ? "active" : ""}`}>
                  <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
                  <span class="alr-sb-text">Active Personnel</span>
                  <span class="alr-sb-chevron">›</span>
                </summary>
                <div class="alr-sb-group-items">
                  {activePersonnel.map((item) => (
                    <a href={item.href} class={`alr-sb-item alr-sb-item-child ${item.active ? "active" : ""}`}>
                      <span class="alr-sb-dot" style={{ background: "#6b6860" }}></span>
                      <span class="alr-sb-text">{item.title}</span>
                    </a>
                  ))}
                </div>
              </details>
            </div>
          </details>

          <details class="alr-sb-group" open={hasActiveIn(opposition) || undefined}>
            <summary class={`alr-sb-group-title ${hasActiveIn(opposition) ? "active" : ""}`}>
              <span class="alr-sb-dot" style={{ background: "#8b1e0e" }}></span>
              <span class="alr-sb-text">Opposition</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              {opposition.map((item) => (
                <a href={item.href} class={`alr-sb-item alr-sb-item-child ${item.active ? "active" : ""}`}>
                  <span class="alr-sb-dot" style={{ background: "#8b1e0e" }}></span>
                  <span class="alr-sb-text">{item.title}</span>
                </a>
              ))}
            </div>
          </details>
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

          <details class="alr-sb-group" open={hasActiveIn(entities) || undefined}>
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
          <div class="alr-sb-darkmode-row" style={{ marginBottom: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;color:#4a4840;">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span class="alr-sb-text alr-sb-darkmode-label">Audio</span>
            <div class="alr-sb-darkmode-toggle">
              <div class="alr-toggle-track" id="alr-sound-track">
                <div class="alr-toggle-thumb"></div>
              </div>
            </div>
          </div>
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

        function syncSoundState() {
          var track = document.getElementById('alr-sound-track');
          if (!track) return;
          var enabled = window.__ALR_SOUND_ENGINE__ ? window.__ALR_SOUND_ENGINE__.isEnabled() : localStorage.getItem('alr-sound-enabled') !== 'false';
          if (enabled) { track.classList.add('alr-toggle-on'); } else { track.classList.remove('alr-toggle-on'); }
        }

        function openActiveSidebarGroups() {
          var nav = document.getElementById('alr-sidebar-nav');
          if (!nav) return;
          var allDetails = nav.querySelectorAll('details');
          allDetails.forEach(function(details) {
            details.open = false;
          });
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

          var soundTrack = document.getElementById('alr-sound-track');
          if (soundTrack && !soundTrack._alrBound) {
            syncSoundState();
            soundTrack.addEventListener('click', function() {
              if (window.__ALR_SOUND_ENGINE__) { window.__ALR_SOUND_ENGINE__.toggle(); }
              setTimeout(syncSoundState, 50);
            });
            soundTrack._alrBound = true;
          }

          window.addEventListener('alr-sound-state-change', syncSoundState);

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
            '#quartz-body .center > article, #quartz-body .center > .popover-hint, article .callout, .alr-hero, .alr-grid, .alr-card-full, .alr-home-ad-wrap'
          );
          targets.forEach(function(el) {
            el.style.animation = 'none';
            el.style.opacity = '0';
            el.offsetHeight;
            el.style.animation = '';
            el.style.opacity = '';
          });
        }

        document.addEventListener('nav', resetALRAnimations);
      `,
        }}
      />
    </div>
  )
}

ALRSidebar.displayName = "ALRSidebar"
export default (() => ALRSidebar) satisfies QuartzComponentConstructor