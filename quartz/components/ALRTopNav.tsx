import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRTopNav: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <nav class="alr-topnav">
      <a href="/alr-archive/" class="alr-topnav-link">Archive</a>
      <div class="alr-topnav-dropdown">
        <span class="alr-topnav-link alr-topnav-dropdown-trigger">Resources ›</span>
        <div class="alr-topnav-dropdown-menu">
          <div class="alr-topnav-dropdown-menu-inner">
            <a href="/alr-archive/Archive-Documentation-Format/Echo-Entry-Format" class="alr-topnav-dropdown-item">Echo Entry Format</a>
            <a href="/alr-archive/Archive-Documentation-Format/Reality-Investigation-Report-Format" class="alr-topnav-dropdown-item">Reality Investigation Report Format</a>
            <a href="/alr-archive/Archive-Documentation-Format/Device-Entry-Format" class="alr-topnav-dropdown-item">Device Entry Format</a>
            <a href="/alr-archive/Archive-Documentation-Format/Organization-Entry-Format" class="alr-topnav-dropdown-item">Organization Entry Format</a>
          </div>
        </div>
      </div>
      <a href="/alr-archive/About" class="alr-topnav-link">About</a>
    </nav>
  )
}

ALRTopNav.displayName = "ALRTopNav"
export default (() => ALRTopNav) satisfies QuartzComponentConstructor