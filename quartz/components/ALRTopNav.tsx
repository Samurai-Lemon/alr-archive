import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRTopNav: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <nav class="alr-topnav">
      <a href="/alr-archive/" class="alr-topnav-link">Archive</a>
      <div class="alr-topnav-dropdown" id="alr-resources-dropdown">
        <span class="alr-topnav-link alr-topnav-dropdown-trigger" id="alr-resources-trigger">Resources ›</span>
        <div class="alr-topnav-dropdown-menu" id="alr-resources-menu">
          <div class="alr-topnav-dropdown-menu-inner">
            <a href="/alr-archive/Archive-Documentation-Format/Echo-Entry-Format" class="alr-topnav-dropdown-item">Echo Entry Format</a>
            <a href="/alr-archive/Archive-Documentation-Format/Reality-Investigation-Report-Format" class="alr-topnav-dropdown-item">Reality Investigation Report Format</a>
            <a href="/alr-archive/Archive-Documentation-Format/Device-Entry-Format" class="alr-topnav-dropdown-item">Device Entry Format</a>
            <a href="/alr-archive/Archive-Documentation-Format/Organization-Entry-Format" class="alr-topnav-dropdown-item">Organization Entry Format</a>
          </div>
        </div>
      </div>
      <a href="/alr-archive/Submit" class="alr-topnav-link">Submit</a>
      <a href="/alr-archive/About" class="alr-topnav-link">About</a>

      <script dangerouslySetInnerHTML={{__html: `
        function initALRTopNav() {
          var dropdown = document.getElementById('alr-resources-dropdown');
          var menu = document.getElementById('alr-resources-menu');
          if (!dropdown || !menu) return;

          var hideTimer = null;

          function showMenu() {
            if (hideTimer) clearTimeout(hideTimer);
            menu.classList.add('alr-dropdown-open');
          }

          function hideMenu() {
            hideTimer = setTimeout(function() {
              menu.classList.remove('alr-dropdown-open');
            }, 100);
          }

          dropdown.addEventListener('mouseenter', showMenu);
          dropdown.addEventListener('mouseleave', hideMenu);
          menu.addEventListener('mouseenter', showMenu);
          menu.addEventListener('mouseleave', hideMenu);
        }

        document.addEventListener('DOMContentLoaded', initALRTopNav);
        document.addEventListener('nav', initALRTopNav);
      `}} />
    </nav>
  )
}

ALRTopNav.displayName = "ALRTopNav"
export default (() => ALRTopNav) satisfies QuartzComponentConstructor