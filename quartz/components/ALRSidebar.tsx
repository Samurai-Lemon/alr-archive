import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { rccLabels } from "../util/alrClassifications"

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar: an icon rail (one button per section) beside a panel that lists only the chosen
// section's links. A filter box at the top of the panel searches every section at once.
// Clicking the open section's rail button — or the arrow in the panel header — tucks the panel
// away, leaving just the rail (the old "collapse sidebar" behavior, now remembered across pages).
//
// Contracts other components rely on, kept intact:
//   • every navigation link is an `.alr-sb-item` (ALRTopNav closes the mobile drawer on click)
//   • the shop price slider keeps #alr-price-slider / -min / -max / -fill / labels (ALRShopScript)
//   • #alr-collapse-btn, #alr-sidebar-wrapper and #quartz-body.alr-sidebar-collapsed for collapse
// ─────────────────────────────────────────────────────────────────────────────

type FileLike = {
  slug?: string
  frontmatter?: Record<string, any>
}

type NavItem = {
  name: string
  tag: string
  href: string
  active: boolean
  sev?: string
}

type Block = { heading: string; items: NavItem[] }

type Section = {
  key: string
  title: string
  short: string
  blocks: Block[]
  foot?: { label: string; href: string }
}

function getTitle(file: FileLike): string {
  return String(file.frontmatter?.title ?? file.slug ?? "")
}

function getHref(slug: string): string {
  return `/${slug}`
}

function idNum(file: FileLike, re: RegExp): number {
  const m = `${getTitle(file)} ${String(file.slug ?? "")}`.match(re)
  return m ? Number(m[1]) : 999999
}

function alphaTitle(a: FileLike, b: FileLike): number {
  return getTitle(a).localeCompare(getTitle(b))
}

function orderBySlug(slug: string, order: string[]): number {
  const idx = order.indexOf(slug)
  return idx === -1 ? 999999 : idx
}

function byOrderThenAlpha(order: string[]) {
  return (a: FileLike, b: FileLike) => {
    const diff = orderBySlug(String(a.slug ?? ""), order) - orderBySlug(String(b.slug ?? ""), order)
    return diff !== 0 ? diff : alphaTitle(a, b)
  }
}

// Rail icons — simple 24px line glyphs, inherit currentColor.
const Icon = ({ name }: { name: string }) => {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 1.8, "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" } as any
  switch (name) {
    case "registries":
      return <svg {...p}><line x1="8" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="8" y1="18" x2="20" y2="18" /><circle cx="4" cy="6" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="18" r="1" /></svg>
    case "echoes":
      return <svg {...p}><path d="M2 12h3l2-6 4 12 3-9 2 3h6" /></svg>
    case "realities":
      return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18" /><path d="M12 3a14 14 0 0 0 0 18" /></svg>
    case "foundations":
      return <svg {...p}><path d="M3 10 12 4l9 6" /><line x1="6" y1="10" x2="6" y2="18" /><line x1="10" y1="10" x2="10" y2="18" /><line x1="14" y1="10" x2="14" y2="18" /><line x1="18" y1="10" x2="18" y2="18" /><line x1="3" y1="20" x2="21" y2="20" /></svg>
    case "systems":
      return <svg {...p}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="20" y2="17" /><circle cx="9" cy="7" r="2.2" /><circle cx="15" cy="17" r="2.2" /></svg>
    case "equipment":
      return <svg {...p}><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="10" r="3" /><line x1="9" y1="17" x2="15" y2="17" /></svg>
    case "shop":
      return <svg {...p}><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
    default:
      return <svg {...p}><circle cx="5" cy="12" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="19" cy="12" r="1.2" /></svg>
  }
}

const ALRSidebar: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
  const currentSlug = String(fileData.slug ?? "")
  const files = (allFiles ?? []) as FileLike[]
  const isShop = currentSlug === "Shop"

  const simple = (f: FileLike): NavItem => {
    const slug = String(f.slug ?? "")
    return { name: getTitle(f), tag: "", href: getHref(slug), active: slug === currentSlug }
  }

  const echo = (f: FileLike): NavItem => {
    const slug = String(f.slug ?? "")
    const title = getTitle(f)
    const m = `${title} ${slug}`.match(/ECHO-(\d+)/i)
    const esc = String(f.frontmatter?.esc ?? "").toUpperCase().trim()
    return {
      name: title.replace(/^ECHO-\d+\s*[—–-]?\s*/i, "").trim() || title,
      tag: m ? m[1] : "",
      href: getHref(slug),
      active: slug === currentSlug,
      sev: ["S1", "S2", "S3", "S4"].includes(esc) ? esc.toLowerCase() : "s1",
    }
  }

  const echoesIn = (folder: string) =>
    files
      .filter((f) => String(f.slug ?? "").startsWith(`Echoes/${folder}/`))
      .sort((a, b) => idNum(a, /ECHO-(\d+)/i) - idNum(b, /ECHO-(\d+)/i))
      .map(echo)

  const entities = echoesIn("Entities")
  const objects = echoesIn("Objects")
  const locations = echoesIn("Locations")
  const phenomena = echoesIn("Phenomena")

  const realities: NavItem[] = files
    .filter((f) => {
      const slug = String(f.slug ?? "")
      return slug.startsWith("Reality-Reports/") || slug.startsWith("Reality Reports/")
    })
    .sort((a, b) => idNum(a, /R-(\d+)/i) - idNum(b, /R-(\d+)/i))
    .map((f) => {
      const slug = String(f.slug ?? "")
      const m = `${getTitle(f)} ${slug}`.match(/R-(\d+)/i)
      const rcc = String(f.frontmatter?.rcc ?? "").toUpperCase().trim()
      return {
        name: rccLabels[rcc] ?? "Investigation Report",
        tag: m ? `R-${m[1]}` : "",
        href: getHref(slug),
        active: slug === currentSlug,
      }
    })

  const systems = files
    .filter((f) => {
      const slug = String(f.slug ?? "")
      return slug.startsWith("Systems/") && !slug.startsWith("Systems/Interactions/")
    })
    .sort(
      byOrderThenAlpha([
        "Systems/The-Unwritten",
        "Systems/Reality-Tier-System-(RTS)",
        "Systems/Reality-Divergence-Scale-(RDS)",
        "Systems/Reality-Collapse-Classification-(RCC)",
        "Systems/Echo-Classification-(EC)",
        "Systems/Echo-Stability-Classification-(ESC)",
      ]),
    )
    .map(simple)

  const systemInteractions = files
    .filter((f) => String(f.slug ?? "").startsWith("Systems/Interactions/"))
    .sort(byOrderThenAlpha(["Systems/Interactions/Declarations", "Systems/Interactions/The-Weight-of-Words"]))
    .map(simple)

  const equipment = files
    .filter((f) => String(f.slug ?? "").startsWith("Equipment/"))
    .sort(byOrderThenAlpha(["Equipment/Lastlight-Recorder", "Equipment/Echo-Scanner-Unit", "Equipment/A.L.I.C.E_"]))
    .map(simple)

  const protocols = files
    .filter((f) => String(f.slug ?? "").startsWith("Protocols/"))
    .sort(alphaTitle)
    .map(simple)

  const alrFoundations = files
    .filter((f) => {
      const slug = String(f.slug ?? "")
      return slug.startsWith("Foundations/ALR/") && !slug.startsWith("Foundations/ALR/Active-Personnel/")
    })
    .sort(alphaTitle)
    .map(simple)

  const activePersonnel = files
    .filter((f) => String(f.slug ?? "").startsWith("Foundations/ALR/Active-Personnel/"))
    .sort(
      byOrderThenAlpha([
        "Foundations/ALR/Active-Personnel/Reality-Investigation-Division",
        "Foundations/ALR/Active-Personnel/Echo-Research-Division",
        "Foundations/ALR/Active-Personnel/Archive-Operations",
        "Foundations/ALR/Active-Personnel/Device-Development-Bureau",
      ]),
    )
    .map(simple)

  const opposition = files
    .filter((f) => String(f.slug ?? "").startsWith("Foundations/Opposition/"))
    .sort(alphaTitle)
    .map(simple)

  const echoCount = entities.length + objects.length + locations.length + phenomena.length
  const link = (name: string, href: string, tag = ""): NavItem => ({
    name,
    tag,
    href,
    active: href === `/${currentSlug}` || (href === "/" && (currentSlug === "index" || currentSlug === "")),
  })

  const sections: Section[] = [
    {
      key: "registries",
      title: "Registries",
      short: "Registry",
      blocks: [
        {
          heading: "",
          items: [
            link("Echo Registry", "/Index/ECHO-Registry", String(echoCount)),
            link("Reality Registry", "/Index/Reality-Registry", String(realities.length)),
          ],
        },
      ],
      foot: { label: "Submit an echo", href: "/Submit-Echo" },
    },
    {
      key: "echoes",
      title: "Echoes",
      short: "Echoes",
      blocks: [
        { heading: "Entities", items: entities },
        { heading: "Objects", items: objects },
        { heading: "Locations", items: locations },
        { heading: "Phenomena", items: phenomena },
      ],
      foot: { label: "Echo Registry", href: "/Index/ECHO-Registry" },
    },
    {
      key: "realities",
      title: "Realities",
      short: "Realities",
      blocks: [{ heading: "Investigations", items: realities }],
      foot: { label: "Reality Registry", href: "/Index/Reality-Registry" },
    },
    {
      key: "foundations",
      title: "Foundations",
      short: "Founding",
      blocks: [
        { heading: "ALR", items: alrFoundations },
        { heading: "Active personnel", items: activePersonnel },
        { heading: "Opposition", items: opposition },
      ],
      foot: { label: "About the Initiative", href: "/Foundations/ALR/ALR-Initiative" },
    },
    {
      key: "systems",
      title: "Systems",
      short: "Systems",
      blocks: [
        { heading: "", items: systems },
        { heading: "Interactions", items: systemInteractions },
      ],
      foot: { label: "Echo entry format", href: "/Archive-Documentation-Format/Echo-Entry-Format" },
    },
    {
      key: "equipment",
      title: "Equipment",
      short: "Gear",
      blocks: [{ heading: "", items: equipment }],
      foot: { label: "Device entry format", href: "/Archive-Documentation-Format/Device-Entry-Format" },
    },
    {
      // Site-wide links. On desktop these also live in the top bar; on phones the top bar is
      // hidden, so this is how the drawer reaches them.
      key: "more",
      title: "More",
      short: "More",
      blocks: [
        {
          heading: "Archive",
          items: [link("Home", "/"), link("Mods", "/Mods/"), link("Shop", "/Shop"), link("Grading Terminal", "/label-creator"), link("About", "/About")],
        },
        { heading: "Protocols", items: protocols },
      ],
    },
  ]

  const hasActive = (s: Section) => s.blocks.some((b) => b.items.some((i) => i.active))
  // Open on the section that holds this page; pages only reachable via "More" (home, about,
  // protocols) open on Echoes, since on desktop the top bar already covers those links.
  const current = isShop ? "shop" : sections.find((s) => s.key !== "more" && hasActive(s))?.key ?? "echoes"

  const railSections = sections.filter((s) => s.key !== "more")
  const more = sections.find((s) => s.key === "more")!

  const RailBtn = ({ s }: { s: { key: string; title: string; short: string } }) => (
    <button
      type="button"
      class={`alr-rail-btn${s.key === current ? " is-current" : ""}`}
      data-section={s.key}
      aria-pressed={s.key === current ? "true" : "false"}
      title={s.title}
    >
      <Icon name={s.key} />
      <span class="alr-rail-label">{s.short}</span>
    </button>
  )

  const ItemLink = ({ item }: { item: NavItem }) => (
    <a
      href={item.href}
      class={`alr-sb-item${item.active ? " active" : ""}`}
      aria-current={item.active ? "page" : undefined}
      data-filter={`${item.name} ${item.tag}`.toLowerCase()}
    >
      {item.sev ? <span class={`alr-sig alr-sig-${item.sev}`} aria-hidden="true"></span> : null}
      <span class="alr-sb-text">{item.name}</span>
      {item.tag ? <span class="alr-sb-tag">{item.tag}</span> : null}
    </a>
  )

  const PanelSection = ({ s }: { s: Section }) => (
    <section class="alr-panel-section" data-section={s.key} hidden={s.key !== current || undefined}>
      <div class="alr-panel-section-title">{s.title}</div>
      {s.blocks
        .filter((b) => b.items.length > 0)
        .map((b) => (
          <div class="alr-panel-block">
            {b.heading ? <div class="alr-panel-block-title">{b.heading}</div> : null}
            {b.items.map((item) => (
              <ItemLink item={item} />
            ))}
          </div>
        ))}
      {s.foot ? (
        <a href={s.foot.href} class="alr-sb-item alr-panel-foot" data-filter="">
          <span class="alr-sb-text">{s.foot.label} →</span>
        </a>
      ) : null}
    </section>
  )

  const currentTitle = isShop ? "Shop" : sections.find((s) => s.key === current)?.title ?? "Echoes"

  return (
    <div class="alr-sidebar-wrapper" id="alr-sidebar-wrapper" data-current={current}>
      {/* ── RAIL ── */}
      <nav class="alr-rail" aria-label="Archive sections">
        {isShop ? <RailBtn s={{ key: "shop", title: "Shop", short: "Shop" }} /> : null}
        {railSections.map((s) => (
          <RailBtn s={s} />
        ))}

        <div class="alr-rail-bottom">
          <RailBtn s={more} />
          <button type="button" class="alr-rail-icon" id="alr-sound-btn" aria-pressed="true" aria-label="Sound" title="Sound">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4z" />
              <path class="alr-sound-wave" d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path class="alr-sound-wave" d="M18.5 5.5a9 9 0 0 1 0 13" />
              <path class="alr-sound-off" d="M16 9l5 6M21 9l-5 6" />
            </svg>
          </button>
          <button type="button" class="alr-rail-icon" id="alr-theme-btn" aria-pressed="true" aria-label="Dark mode" title="Dark mode">
            <svg class="alr-theme-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
            <svg class="alr-theme-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── PANEL ── */}
      <div class="alr-sidebar-nav alr-panel" id="alr-sidebar-nav">
        <div class="alr-panel-head">
          <h2 class="alr-panel-title" id="alr-panel-title">{currentTitle}</h2>
          <button type="button" class="alr-sb-collapse-btn" id="alr-collapse-btn" aria-label="Hide panel" title="Hide panel">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        <div class="alr-panel-filter">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="search" id="alr-panel-filter" placeholder="Filter all sections" autocomplete="off" spellcheck={false} aria-label="Filter all sections" />
        </div>

        <div class="alr-panel-body" id="alr-panel-body">
          {isShop ? (
            <section class="alr-panel-section" data-section="shop">
              <div class="alr-panel-section-title">Shop</div>
              <div class="alr-panel-block">
                <div class="alr-panel-block-title">Procurement</div>
                <a href="/Shop" class="alr-sb-item active" aria-current="page" data-filter="all items"><span class="alr-sb-text">All Items</span></a>
                <a href="/Shop" class="alr-sb-item" data-filter="archive collection"><span class="alr-sb-text">Archive Collection</span></a>
                <a href="/Shop" class="alr-sb-item" data-filter="tabletop & tcg"><span class="alr-sb-text">Tabletop &amp; TCG</span></a>
                <a href="/Shop" class="alr-sb-item" data-filter="3d prints"><span class="alr-sb-text">3D Prints</span></a>
              </div>
              <div class="alr-panel-block">
                <div class="alr-panel-block-title">Category</div>
                <a href="/Shop" class="alr-sb-item" data-filter="apparel"><span class="alr-sb-text">Apparel</span></a>
                <a href="/Shop" class="alr-sb-item" data-filter="headwear"><span class="alr-sb-text">Headwear</span></a>
                <a href="/Shop" class="alr-sb-item" data-filter="posters & prints"><span class="alr-sb-text">Posters &amp; Prints</span></a>
                <a href="/Shop" class="alr-sb-item" data-filter="accessories"><span class="alr-sb-text">Accessories</span></a>
                <a href="/Shop" class="alr-sb-item" data-filter="made to order"><span class="alr-sb-text">Made to Order</span></a>
              </div>
              <div class="alr-panel-block">
                <div class="alr-panel-block-title">Availability</div>
                <a href="/Shop" class="alr-sb-item" data-filter="in stock"><span class="alr-sb-dot alr-sev-s1" aria-hidden="true"></span><span class="alr-sb-text">In Stock</span></a>
                <a href="/Shop" class="alr-sb-item" data-filter="pre-order"><span class="alr-sb-dot alr-sev-s3" aria-hidden="true"></span><span class="alr-sb-text">Pre-Order</span></a>
                <a href="/Shop" class="alr-sb-item" data-filter="limited"><span class="alr-sb-dot alr-sev-s4" aria-hidden="true"></span><span class="alr-sb-text">Limited</span></a>
              </div>
              <div class="alr-panel-block alr-panel-nofilter">
                <div class="alr-panel-block-title">Price range</div>
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
            </section>
          ) : null}

          {sections.map((s) => (
            <PanelSection s={s} />
          ))}

          <p class="alr-panel-empty" id="alr-panel-empty" hidden>
            Nothing matches that filter.
          </p>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  var COLLAPSE_KEY = 'alr-sidebar-collapsed';

  function els() {
    return {
      wrapper: document.getElementById('alr-sidebar-wrapper'),
      body: document.getElementById('quartz-body'),
      title: document.getElementById('alr-panel-title'),
      filter: document.getElementById('alr-panel-filter'),
      empty: document.getElementById('alr-panel-empty')
    };
  }

  function isMobile() { return window.matchMedia('(max-width: 800px)').matches; }

  function setCollapsed(collapsed) {
    var e = els();
    if (!e.wrapper || !e.body) return;
    if (isMobile()) collapsed = false; // the phone drawer always shows its panel
    e.wrapper.classList.toggle('alr-collapsed', collapsed);
    e.body.classList.toggle('alr-sidebar-collapsed', collapsed);
    try { localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0'); } catch (err) {}
  }

  // Kept as a global: the old collapse button called it by name.
  window.toggleALRSidebar = function() {
    var e = els();
    if (e.wrapper) setCollapsed(!e.wrapper.classList.contains('alr-collapsed'));
  };

  function showSection(key) {
    var e = els();
    if (!e.wrapper) return;
    e.wrapper.dataset.current = key;
    e.wrapper.querySelectorAll('.alr-rail-btn').forEach(function(btn) {
      var on = btn.dataset.section === key;
      btn.classList.toggle('is-current', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var title = '';
    e.wrapper.querySelectorAll('.alr-panel-section').forEach(function(sec) {
      var on = sec.dataset.section === key;
      sec.hidden = !on;
      if (on) { var t = sec.querySelector('.alr-panel-section-title'); title = t ? t.textContent : ''; }
    });
    if (e.title) e.title.textContent = title;
    if (e.filter && e.filter.value) { e.filter.value = ''; applyFilter(); }
  }

  // Filter searches every section; matching links stay, their section titles show as headings.
  function applyFilter() {
    var e = els();
    if (!e.wrapper || !e.filter) return;
    var q = e.filter.value.trim().toLowerCase();
    var filtering = q.length > 0;
    e.wrapper.classList.toggle('alr-filtering', filtering);
    var anyHit = false;
    e.wrapper.querySelectorAll('.alr-panel-section').forEach(function(sec) {
      if (!filtering) {
        sec.hidden = sec.dataset.section !== e.wrapper.dataset.current;
        sec.querySelectorAll('.alr-sb-item, .alr-panel-block').forEach(function(n) { n.hidden = false; });
        return;
      }
      var secHit = false;
      sec.querySelectorAll('.alr-panel-block').forEach(function(block) {
        if (block.classList.contains('alr-panel-nofilter')) { block.hidden = true; return; }
        var blockHit = false;
        block.querySelectorAll('.alr-sb-item').forEach(function(a) {
          var hit = (a.dataset.filter || '').indexOf(q) !== -1;
          a.hidden = !hit;
          if (hit) blockHit = true;
        });
        block.hidden = !blockHit;
        if (blockHit) secHit = true;
      });
      sec.querySelectorAll('.alr-panel-foot').forEach(function(a) { a.hidden = true; });
      sec.hidden = !secHit;
      if (secHit) anyHit = true;
    });
    if (e.empty) e.empty.hidden = !filtering || anyHit;
    if (e.title) {
      if (filtering) e.title.textContent = 'Results';
      else {
        var cur = e.wrapper.querySelector('.alr-panel-section[data-section="' + e.wrapper.dataset.current + '"] .alr-panel-section-title');
        e.title.textContent = cur ? cur.textContent : '';
      }
    }
  }

  function isDark() {
    var saved = document.documentElement.getAttribute('saved-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function syncThemeBtn() {
    var btn = document.getElementById('alr-theme-btn');
    if (!btn) return;
    var dark = isDark();
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    btn.classList.toggle('is-on', dark);
    btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  }

  function syncSoundBtn() {
    var btn = document.getElementById('alr-sound-btn');
    if (!btn) return;
    var on = window.__ALR_SOUND_ENGINE__ ? window.__ALR_SOUND_ENGINE__.isEnabled() : localStorage.getItem('alr-sound-enabled') !== 'false';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.classList.toggle('is-on', on);
    btn.title = on ? 'Sound on' : 'Sound off';
  }

  function init() {
    var e = els();
    if (!e.wrapper) return;

    var stored = '0';
    try { stored = localStorage.getItem(COLLAPSE_KEY) || '0'; } catch (err) {}
    setCollapsed(stored === '1');

    e.wrapper.querySelectorAll('.alr-rail-btn').forEach(function(btn) {
      if (btn._alrBound) return;
      btn._alrBound = true;
      btn.addEventListener('click', function() {
        var w = els().wrapper;
        var key = btn.dataset.section;
        if (key === w.dataset.current && !w.classList.contains('alr-collapsed') && !isMobile()) {
          setCollapsed(true);
          return;
        }
        showSection(key);
        setCollapsed(false);
      });
    });

    var collapseBtn = document.getElementById('alr-collapse-btn');
    if (collapseBtn && !collapseBtn._alrBound) {
      collapseBtn._alrBound = true;
      collapseBtn.addEventListener('click', function() { setCollapsed(true); });
    }

    if (e.filter && !e.filter._alrBound) {
      e.filter._alrBound = true;
      e.filter.addEventListener('input', applyFilter);
      e.filter.addEventListener('keydown', function(ev) {
        if (ev.key === 'Escape') { e.filter.value = ''; applyFilter(); }
      });
    }

    var themeBtn = document.getElementById('alr-theme-btn');
    if (themeBtn && !themeBtn._alrBound) {
      themeBtn._alrBound = true;
      themeBtn.addEventListener('click', function() {
        var btn = document.querySelector('button.darkmode');
        if (btn) { btn.click(); setTimeout(syncThemeBtn, 50); }
      });
    }

    var soundBtn = document.getElementById('alr-sound-btn');
    if (soundBtn && !soundBtn._alrBound) {
      soundBtn._alrBound = true;
      soundBtn.addEventListener('click', function() {
        if (window.__ALR_SOUND_ENGINE__) { window.__ALR_SOUND_ENGINE__.toggle(); }
        setTimeout(syncSoundBtn, 50);
      });
    }

    syncThemeBtn();
    syncSoundBtn();

    if (!window._alrSidebarListeners) {
      window._alrSidebarListeners = true;
      window.addEventListener('alr-sound-state-change', syncSoundBtn);
      new MutationObserver(syncThemeBtn).observe(document.documentElement, { attributes: true, attributeFilter: ['saved-theme'] });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('nav', init);

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
})();
      `,
        }}
      />
    </div>
  )
}

ALRSidebar.displayName = "ALRSidebar"
export default (() => ALRSidebar) satisfies QuartzComponentConstructor
