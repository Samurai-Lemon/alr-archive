import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Always-rendered (afterBody), fixed to the bottom of every page. Pure CSS marquee — no
// scroll/resize JS needed. The track content is duplicated exactly once so an infinite
// -50% translateX loop is seamless (the moment the first copy scrolls fully offscreen,
// the identical second copy is sitting in exactly the position the first started in).
const REPEATS = 5

const ALRFollowBanner: QuartzComponent = () => {
  const unit = (
    <a href="https://www.instagram.com/ALR-Initiative" class="alr-follow-item" target="_blank" rel="noopener noreferrer">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
      <span>Follow the Archive on Instagram — @ALR-Initiative</span>
    </a>
  )

  return (
    <div class="alr-follow-banner" aria-hidden="false">
      <div class="alr-follow-track">
        <div class="alr-follow-half">
          {Array.from({ length: REPEATS }).map(() => unit)}
        </div>
        <div class="alr-follow-half" aria-hidden="true">
          {Array.from({ length: REPEATS }).map(() => unit)}
        </div>
      </div>
    </div>
  )
}

ALRFollowBanner.displayName = "ALRFollowBanner"
export default (() => ALRFollowBanner) satisfies QuartzComponentConstructor
