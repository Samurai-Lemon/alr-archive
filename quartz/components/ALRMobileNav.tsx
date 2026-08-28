import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const items = [
  {
    href: "/",
    label: "Home",
    match: (slug: string) => slug === "index" || slug === "",
    icon: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`,
  },
  {
    href: "/Index/ECHO-Registry",
    label: "Registry",
    match: (slug: string) => slug.startsWith("Index/"),
    icon: `<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>`,
  },
  {
    href: "/Echoes/ECHOES",
    label: "Echoes",
    match: (slug: string) => slug.startsWith("Echoes/"),
    icon: `<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>`,
  },
  {
    href: "/About",
    label: "Archive",
    match: (slug: string) => slug === "About",
    icon: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
  },
]

const moreIcon = `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`

const ALRMobileNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = String(fileData?.slug ?? "")

  return (
    <div class="alr-mnav">
      {items.map((item) => (
        <a href={item.href} class={`alr-mnav-item internal${item.match(slug) ? " alr-mnav-active" : ""}`}>
          <span
            class="alr-mnav-icon"
            dangerouslySetInnerHTML={{
              __html: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>`,
            }}
          />
          <span class="alr-mnav-label">{item.label}</span>
        </a>
      ))}
      {/* Not a link — reuses the existing hamburger drawer (ALRTopNav.tsx) that already holds
          the full sidebar, rather than duplicating that open/close/overlay logic here. Every
          primary nav entry point now lives in this one bar, like a native app's "More" tab. */}
      <button
        type="button"
        class="alr-mnav-more"
        id="alr-mnav-more-btn"
        aria-label="Open menu"
      >
        <span
          class="alr-mnav-icon"
          dangerouslySetInnerHTML={{
            __html: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${moreIcon}</svg>`,
          }}
        />
        <span class="alr-mnav-label">More</span>
      </button>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function initMore() {
                var btn = document.getElementById("alr-mnav-more-btn");
                if (!btn || btn._alrBound) return;
                btn._alrBound = true;
                btn.addEventListener("click", function() {
                  var menuBtn = document.getElementById("alr-mobile-menu-btn");
                  if (menuBtn) menuBtn.click();
                });
              }
              document.addEventListener("DOMContentLoaded", initMore);
              document.addEventListener("nav", initMore);
            })();
          `,
        }}
      />
    </div>
  )
}

ALRMobileNav.displayName = "ALRMobileNav"
export default (() => ALRMobileNav) satisfies QuartzComponentConstructor
