import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRTopNav: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <nav class="alr-topnav">
      <a href="/alr-archive/" class="alr-topnav-link">Archive</a>
      <a href="/alr-archive/Index/ECHO-Registry" class="alr-topnav-link">Echoes</a>
      <a href="/alr-archive/Index/Reality-Registry" class="alr-topnav-link">Realities</a>
      <a href="/alr-archive/About" class="alr-topnav-link">About</a>
    </nav>
  )
}

ALRTopNav.displayName = "ALRTopNav"
export default (() => ALRTopNav) satisfies QuartzComponentConstructor