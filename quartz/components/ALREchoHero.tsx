import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { ecTypeLabels, escLabels, rtsLabels, rdsLabels, rccLabels } from "../util/alrClassifications"

// Mirrors the registry's own EC-type tag colors (.alr-et-ent/obj/loc/phn/evt in custom.scss) —
// extending that already-established per-type identity into the entry hero itself, rather than
// the single fixed rust tone every EC type shared here before.
const EC_ACCENT: Record<string, { color: string; border: string }> = {
  ENT: { color: "#cc785c", border: "#8a4a32" },
  OBJ: { color: "#5dcaa5", border: "#0e4030" },
  LOC: { color: "#85b7eb", border: "#0e2840" },
  PHN: { color: "#d4a840", border: "#4a3810" },
  EVT: { color: "#d48878", border: "#501818" },
}

// Small stroke-based glyph per EC type, shown beside the classification tag — a figure for
// Entities, a door for Locations, a framed specimen for Objects, a waveform for Phenomena, a
// marker for Events. Purely decorative identity, same minimal icon language used site-wide.
const EcIcon = ({ ec, color }: { ec: string; color: string }) => {
  switch (ec) {
    case "OBJ":
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <rect x="8" y="8" width="8" height="8" rx="0.5" />
        </svg>
      )
    case "LOC":
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="5" y="3" width="14" height="18" rx="1" />
          <circle cx="15" cy="12" r="1" fill={color} stroke="none" />
        </svg>
      )
    case "PHN":
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12h3l2-7 4 14 3-10 2 5h4" />
        </svg>
      )
    case "EVT":
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 3v18" />
          <path d="M6 4h11l-3 4 3 4H6" />
        </svg>
      )
    default:
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="7" r="3.5" />
          <path d="M6 20c0-4 2.5-7 6-7s6 3 6 7" />
        </svg>
      )
  }
}

const EC_PLURAL: Record<string, string> = {
  ENT: "Entities",
  OBJ: "Objects",
  LOC: "Locations",
  PHN: "Phenomena",
  EVT: "Events",
}

type TocEntry = { depth: number; text: string; slug: string }

const ALREchoHero: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>

  const echoId = String(fm.echo_id ?? "ECHO-???")
  const ec     = String(fm.ec  ?? "").toUpperCase()
  const esc    = String(fm.esc ?? "").toUpperCase()
  const rts    = String(fm.rts ?? "").toUpperCase()
  const rds    = String(fm.rds ?? "").toUpperCase()
  const rcc    = String(fm.rcc ?? "")
  const title  = String(fm.title ?? fileData.slug ?? "")
  const status = String(fm.status ?? "documented")
  const submittedBy = String(fm.submitted_by ?? "").trim()
  const description = String(fm.description ?? "").trim()

  // Titles arrive as "ECHO-001 — The Watchers" (or the filename form "ECHO-001-The Watchers");
  // the ID gets its own line above the name, so strip it from the display title.
  const name = title.replace(/^ECHO-\d+\s*[—–-]?\s*/i, "").trim() || title
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)
  const imgSrc = `/Images/${echoId}.webp`
  const ecAccent = EC_ACCENT[ec] ?? EC_ACCENT.ENT
  const escKey = ["S1", "S2", "S3", "S4"].includes(esc) ? esc.toLowerCase() : ""

  // "On this page" — built at render time from the headings the TableOfContents transformer
  // already extracted. The entry's own H1 (hidden; the hero shows the title) is dropped, and
  // only the top remaining heading level is listed so the card stays a short section index.
  const toc = ((fileData as { toc?: TocEntry[] }).toc ?? []).filter(
    (t) => !/^ECHO-\d+/i.test(t.text),
  )
  const topDepth = toc.length ? Math.min(...toc.map((t) => t.depth)) : 0
  const sections = toc.filter((t) => t.depth === topDepth)

  return (
    <div class="alr-echo-hero">
      <nav class="alr-echo-crumbs" aria-label="Breadcrumb">
        <a href="/Index/ECHO-Registry" class="internal">Echo Registry</a>
        {ec && (
          <>
            <span aria-hidden="true">/</span>
            <span>{EC_PLURAL[ec] ?? ec}</span>
          </>
        )}
        <span aria-hidden="true">/</span>
        <span class="alr-echo-crumbs-current">{echoId}</span>
      </nav>

      <div class="alr-echo-hero-card">
        <div class="alr-echo-hero-main">
          <div class="alr-echo-hero-id">{echoId}</div>
          <h1 class="alr-echo-hero-title">{name}</h1>
          {description && <p class="alr-echo-hero-desc">{description}</p>}
        </div>
        <div class="alr-echo-hero-img" style={`background-image: url('${imgSrc}');`}>
          {/* Hallow Cycle seasonal layer — hidden except the week of Halloween (Oct 25–31); defs/script live sitewide in ALRHallowDefs.tsx */}
          <svg class="alr-echo-hero-texture" viewBox="0 0 900 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g transform="translate(690,35)"><g class="alr-hallow-bat"><use href="#alr-hallow-bat" class="alr-hallow-bat-fill" transform="scale(0.02)" opacity="0.85" /></g></g>
            <g transform="translate(800,80)"><g class="alr-hallow-bat alr-hallow-bat-c"><use href="#alr-hallow-bat" class="alr-hallow-bat-fill" transform="scale(0.014)" opacity="0.75" /></g></g>
          </svg>
        </div>
      </div>

      <dl class="alr-echo-tiles" aria-label="Classification">
        {ec && (
          <div class="alr-echo-tile">
            <dt>Class</dt>
            <dd>
              <span class="alr-echo-tile-icon"><EcIcon ec={ec} color={ecAccent.color} /></span>
              {ec} · {ecTypeLabels[ec] ?? ec}
            </dd>
          </div>
        )}
        {esc && (
          <div class="alr-echo-tile">
            <dt>Stability</dt>
            <dd>
              {escKey && <span class={`alr-sev-dot alr-sev-${escKey}`} aria-hidden="true"></span>}
              {esc} · {escLabels[esc] ?? esc}
            </dd>
          </div>
        )}
        {rcc && (
          <div class="alr-echo-tile">
            <dt>Collapse</dt>
            <dd>{rcc}{rccLabels[rcc] && <span class="alr-echo-tile-sub">{rccLabels[rcc]}</span>}</dd>
          </div>
        )}
        {rts && (
          <div class="alr-echo-tile">
            <dt>RTS</dt>
            <dd>{rts}{rtsLabels[rts] && <span class="alr-echo-tile-sub">{rtsLabels[rts]}</span>}</dd>
          </div>
        )}
        {rds && (
          <div class="alr-echo-tile">
            <dt>RDS</dt>
            <dd>{rds}{rdsLabels[rds] && <span class="alr-echo-tile-sub">{rdsLabels[rds]}</span>}</dd>
          </div>
        )}
        <div class="alr-echo-tile">
          <dt>Status</dt>
          <dd>{statusLabel}</dd>
        </div>
        {submittedBy && (
          <div class="alr-echo-tile">
            <dt>Contributed by</dt>
            <dd>{submittedBy}</dd>
          </div>
        )}
      </dl>

      {sections.length > 1 && (
        <details class="alr-echo-toc" open>
          <summary class="alr-echo-toc-title">On this page</summary>
          <ul>
            {sections.map((t) => (
              <li><a href={`#${t.slug}`}>{t.text}</a></li>
            ))}
          </ul>
        </details>
      )}
      {/* Desktop shows the contents card open beside the text; narrower screens start it
          collapsed so it doesn't push the entry down. */}
      <script dangerouslySetInnerHTML={{ __html: `
(function() {
  function fold() {
    if (!window.matchMedia('(max-width: 1199px)').matches) return;
    document.querySelectorAll('details.alr-echo-toc').forEach(function(d) { d.open = false; });
  }
  fold();
  document.addEventListener('nav', fold);
})();
      ` }} />
    </div>
  )
}

ALREchoHero.css = `
.alr-echo-crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 14px;
  color: var(--alr-muted);
  padding: 28px 0 16px;
}
.alr-echo-crumbs a { color: var(--alr-muted) !important; border-bottom: none !important; background: none !important; padding: 0 !important; font-weight: 400 !important; }
.alr-echo-crumbs a:hover { color: var(--alr-text) !important; }
.alr-echo-crumbs-current { color: var(--alr-text); }

.alr-echo-hero-card {
  display: flex;
  flex-wrap: wrap;
  background: var(--alr-surface);
  border: 1px solid var(--alr-border);
  border-radius: var(--alr-r-lg);
  overflow: hidden;
  margin-bottom: 16px;
}
.alr-echo-hero-main {
  flex: 1 1 420px;
  min-width: 0;
  padding: clamp(28px, 4.5vw, 52px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 320px;
  box-sizing: border-box;
}
.alr-echo-hero-id {
  font-family: var(--codeFont), monospace;
  font-size: 14px;
  color: var(--alr-accent-text);
  margin-bottom: 12px;
}
h1.alr-echo-hero-title {
  font-size: clamp(36px, 5vw, 60px) !important;
  line-height: 1.04 !important;
  letter-spacing: -0.035em;
  font-weight: 600 !important;
  color: var(--alr-text) !important;
  margin: 0 !important;
  border: none !important;
  padding: 0 !important;
}
.alr-echo-hero-desc {
  font-size: 17px;
  line-height: 1.6;
  color: var(--alr-text-2);
  margin: 16px 0 0;
  max-width: 460px;
}
.alr-echo-hero-img {
  position: relative;
  flex: 1 1 340px;
  min-height: 300px;
  background-color: var(--alr-surface-2);
  background-size: cover;
  background-position: center;
}
.alr-echo-hero-texture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.alr-echo-tiles {
  margin: 0 0 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}
.alr-echo-tile {
  padding: 18px 20px;
  background: var(--alr-surface);
  border: 1px solid var(--alr-border);
  border-radius: var(--alr-r-md);
  min-width: 0;
}
.alr-echo-tile dt {
  font-size: 13px;
  color: var(--alr-muted);
  margin: 0;
}
.alr-echo-tile dd {
  margin: 6px 0 0;
  font-size: 17px;
  font-weight: 600;
  color: var(--alr-text);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
}
.alr-echo-tile-icon { display: inline-flex; }
.alr-echo-tile-sub {
  flex-basis: 100%;
  font-size: 13px;
  font-weight: 400;
  color: var(--alr-muted);
}

.alr-echo-toc {
  background: var(--alr-surface);
  border: 1px solid var(--alr-border);
  border-radius: var(--alr-r-md);
  padding: 14px 16px;
  margin-bottom: 24px;
  font-size: 14px;
  box-sizing: border-box;
}
.alr-echo-toc-title {
  font-size: 13px;
  color: var(--alr-muted);
  cursor: pointer;
  list-style: none;
  min-height: 24px;
  display: flex;
  align-items: center;
}
.alr-echo-toc-title::-webkit-details-marker { display: none; }
.alr-echo-toc-title::after { content: "⌄"; margin-left: auto; transition: transform 0.2s ease; }
.alr-echo-toc[open] .alr-echo-toc-title::after { transform: rotate(180deg); }
@media (min-width: 1200px) { .alr-echo-toc-title::after { display: none; } }
.alr-echo-toc ul { list-style: none; margin: 8px 0 0; padding: 0; }
.alr-echo-toc li { margin: 0; }
.alr-echo-toc a {
  display: block;
  padding: 7px 10px;
  border-radius: 8px;
  color: var(--alr-text-2) !important;
  border-bottom: none !important;
  background: none !important;
  font-weight: 400 !important;
  text-decoration: none !important;
}
.alr-echo-toc a:hover { background: var(--alr-hover); color: var(--alr-text) !important; }

@media (max-width: 800px) {
  .alr-echo-crumbs { padding-top: calc(20px + env(safe-area-inset-top, 0px)); font-size: 13px; }
  .alr-echo-hero-main { min-height: 0; padding: 24px 20px; }
  .alr-echo-hero-img { min-height: 220px; order: -1; }
  .alr-echo-tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .alr-echo-tile { padding: 14px; }
  .alr-echo-tile dd { font-size: 15px; }
}
`

ALREchoHero.displayName = "ALREchoHero"
export default (() => ALREchoHero) satisfies QuartzComponentConstructor
