import { ALR_LOGO_PATH, decayArt } from "./art"

// The broadcast banner: the old ALR SVG banner (decaying grid, drifting blocks, scanline, logo)
// behind a tape overlay — ▶ PLAY, REC + channel, the date and a running counter — with the page's
// eyebrow, title and three status lines in regular HTML so it reflows on small screens.
// The date and counter are filled in by ALRBroadcastScript.

export interface BannerProps {
  key_: string // seeds the background pattern
  ch: string // e.g. "CH 07"
  eyebrow: string
  title: string[] // one or two lines
  sub?: string
  status: string[] // up to three lines; the first is highlighted
}

const Logo = ({ cls }: { cls: string }) => (
  <svg class={cls} viewBox="0 0 560 480" aria-hidden="true">
    <path d={ALR_LOGO_PATH} fill-rule="evenodd" />
  </svg>
)

const Osd = ({ ch, bottom }: { ch?: string; bottom?: boolean }) =>
  bottom ? (
    <div class="alr-bb-osd alr-bb-osd-bottom" aria-hidden="true">
      <span data-bb-date>&nbsp;</span>
      <span>SP <span data-bb-counter>00:00:00</span></span>
    </div>
  ) : (
    <div class="alr-bb-osd alr-bb-osd-top" aria-hidden="true">
      <span>▶ PLAY</span>
      <span><i class="alr-bb-rec"></i>REC&nbsp; {ch}</span>
    </div>
  )

export function BroadcastBanner(p: BannerProps) {
  const art = decayArt(p.key_, { w: 1000, h: 300, cellW: 50, cellH: 26, edge: 0.5, particles: 46 })
  return (
    <div class="alr-bb alr-bb-full">
      <svg class="alr-bb-art" viewBox="0 0 1000 300" preserveAspectRatio="xMinYMid slice" aria-hidden="true" dangerouslySetInnerHTML={{ __html: art }} />
      <Logo cls="alr-bb-logo" />
      <div class="alr-bb-in">
      <Osd ch={p.ch} />
      <div class="alr-bb-body">
        <div class="alr-bb-eyebrow">{p.eyebrow}</div>
        <h1 class={`alr-bb-title${p.title.length > 1 ? " alr-bb-title-2" : ""}`}>
          {p.title.map((line, i) => (
            <>
              {i > 0 && <br />}
              {line}
            </>
          ))}
        </h1>
        {p.sub && <p class="alr-bb-sub">{p.sub}</p>}
      </div>
      {p.status.length > 0 && (
        <div class="alr-bb-status" aria-hidden="true">
          {p.status.map((s) => (
            <span>{s}</span>
          ))}
        </div>
      )}
      <Osd bottom />
      </div>
    </div>
  )
}

export interface Crumb {
  label: string
  href: string
}

// Slim version for reading pages: same art and overlay, with the breadcrumb instead of a title
// (the page's own heading follows right below it).
export function BroadcastStrip({ key_, ch, crumbs }: { key_: string; ch: string; crumbs: Crumb[] }) {
  const art = decayArt(key_, { w: 1000, h: 120, cellW: 50, cellH: 22, edge: 0.55, particles: 24 })
  return (
    <div class="alr-bb alr-bb-strip">
      <svg class="alr-bb-art" viewBox="0 0 1000 120" preserveAspectRatio="xMinYMid slice" aria-hidden="true" dangerouslySetInnerHTML={{ __html: art }} />
      <Logo cls="alr-bb-logo" />
      <div class="alr-bb-in">
      <Osd ch={ch} />
      <div class="alr-bb-stripfoot">
        <nav class="alr-bb-crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <>
              {i > 0 && <span aria-hidden="true">/</span>}
              <a href={c.href} class="internal">{c.label}</a>
            </>
          ))}
        </nav>
        <span class="alr-bb-osd-inline" aria-hidden="true">
          <span data-bb-date>&nbsp;</span>&nbsp;&nbsp; SP <span data-bb-counter>00:00:00</span>
        </span>
      </div>
      </div>
    </div>
  )
}
