import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRTopNav: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <>
      <button class="alr-mobile-menu-btn" id="alr-mobile-menu-btn" aria-label="Open menu">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="2" y1="4.5" x2="16" y2="4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="2" y1="13.5" x2="16" y2="13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>

      <div class="alr-mobile-overlay" id="alr-mobile-overlay"></div>

      <nav class="alr-topnav">
        <a href="/" class="alr-topnav-link">Archive</a>

        <div class="alr-topnav-dropdown" id="alr-resources-dropdown">
          <span class="alr-topnav-link alr-topnav-dropdown-trigger" id="alr-resources-trigger">Resources ›</span>
          <div class="alr-topnav-dropdown-menu" id="alr-resources-menu">
            <div class="alr-topnav-dropdown-menu-inner">
              <a href="/Archive-Documentation-Format/Echo-Entry-Format" class="alr-topnav-dropdown-item">Echo Entry Format</a>
              <a href="/Archive-Documentation-Format/Reality-Investigation-Report-Format" class="alr-topnav-dropdown-item">Reality Investigation Report Format</a>
              <a href="/Archive-Documentation-Format/Device-Entry-Format" class="alr-topnav-dropdown-item">Device Entry Format</a>
              <a href="/Archive-Documentation-Format/Organization-Entry-Format" class="alr-topnav-dropdown-item">Organization Entry Format</a>
            </div>
          </div>
        </div>

        <div class="alr-topnav-dropdown" id="alr-protocols-dropdown">
          <span class="alr-topnav-link alr-topnav-dropdown-trigger" id="alr-protocols-trigger">Protocols ›</span>
          <div class="alr-topnav-dropdown-menu" id="alr-protocols-menu">
            <div class="alr-topnav-dropdown-menu-inner">
              <a href="/Protocols" class="alr-topnav-dropdown-item">Archive Protocols</a>
              <a href="/Protocols/Terms-of-Submission" class="alr-topnav-dropdown-item">Terms of Submission</a>
              <a href="/Protocols/Privacy" class="alr-topnav-dropdown-item">Privacy</a>
              <a href="/Protocols/License" class="alr-topnav-dropdown-item">License</a>
            </div>
          </div>
        </div>

        <a href="/Submit" class="alr-topnav-link">Submit</a>
        <a href="/About" class="alr-topnav-link">About</a>
      </nav>

      <script dangerouslySetInnerHTML={{__html: `
        function initALRTopNav() {
          var resourcesDropdown = document.getElementById('alr-resources-dropdown');
          var resourcesMenu = document.getElementById('alr-resources-menu');
          var protocolsDropdown = document.getElementById('alr-protocols-dropdown');
          var protocolsMenu = document.getElementById('alr-protocols-menu');
          var menuBtn = document.getElementById('alr-mobile-menu-btn');
          var overlay = document.getElementById('alr-mobile-overlay');
          var sidebar = document.querySelector('.sidebar.left');

          function bindDropdown(dropdown, menu) {
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

          bindDropdown(resourcesDropdown, resourcesMenu);
          bindDropdown(protocolsDropdown, protocolsMenu);

          function openSidebar() {
            sidebar = document.querySelector('.sidebar.left');
            if (sidebar) sidebar.classList.add('alr-mobile-open');
            if (overlay) overlay.classList.add('alr-mobile-overlay-open');
            document.body.style.overflow = 'hidden';
          }

          function closeSidebar() {
            sidebar = document.querySelector('.sidebar.left');
            if (sidebar) sidebar.classList.remove('alr-mobile-open');
            if (overlay) overlay.classList.remove('alr-mobile-overlay-open');
            document.body.style.overflow = '';
          }

          if (menuBtn) {
            menuBtn.removeEventListener('click', menuBtn._alrHandler);
            menuBtn._alrHandler = function() {
              var sb = document.querySelector('.sidebar.left');
              if (sb && sb.classList.contains('alr-mobile-open')) {
                closeSidebar();
              } else {
                openSidebar();
              }
            };
            menuBtn.addEventListener('click', menuBtn._alrHandler);
          }

          if (overlay) {
            overlay.removeEventListener('click', overlay._alrHandler);
            overlay._alrHandler = closeSidebar;
            overlay.addEventListener('click', overlay._alrHandler);
          }

          var sidebarLinks = document.querySelectorAll('.alr-sb-item');
          sidebarLinks.forEach(function(link) {
            link.addEventListener('click', closeSidebar);
          });
        }

        document.addEventListener('DOMContentLoaded', initALRTopNav);
        document.addEventListener('nav', initALRTopNav);
      `}} />
    </>
  )
}

ALRTopNav.displayName = "ALRTopNav"
export default (() => ALRTopNav) satisfies QuartzComponentConstructor