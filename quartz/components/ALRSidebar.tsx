import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRSidebar: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="alr-sidebar-wrapper" id="alr-sidebar-wrapper">
      <div class="alr-sidebar-nav" id="alr-sidebar-nav">

        <div class="alr-sb-topbar">
          <span class="alr-sb-site-label">ALR</span>
          <button class="alr-sb-collapse-btn" id="alr-collapse-btn" onClick={"toggleALRSidebar()" as any} title="Collapse sidebar">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Archive</div>
          <a href="/alr-archive/" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">Home</span>
          </a>
          <a href="/alr-archive/Foundations/ALR/The-Archive" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">The Archive</span>
          </a>
          <a href="/alr-archive/Foundations/ALR/ALR-Initiative" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">ALR Initiative</span>
          </a>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Registries</div>
          <a href="/alr-archive/Index/ECHO-Registry" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">Echo Registry</span>
            <span class="alr-sb-badge">7</span>
          </a>
          <a href="/alr-archive/Index/Reality-Registry" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">Reality Registry</span>
            <span class="alr-sb-badge">2</span>
          </a>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Echoes</div>

          <details class="alr-sb-group">
            <summary class="alr-sb-group-title">
              <span class="alr-sb-dot" style="background:#cc785c;"></span>
              <span class="alr-sb-text">Entities</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              <a href="/alr-archive/Echoes/Entities/ECHO-001-The-Watchers" class="alr-sb-item alr-sb-item-child">
                <span class="alr-sb-dot" style="background:#cc785c;"></span>
                <span class="alr-sb-text">ECHO-001</span>
                <span class="alr-sb-badge alr-sb-badge-s1">S1</span>
              </a>
              <a href="/alr-archive/Echoes/Entities/ECHO-002-%E2%80%94-Dreamwalker" class="alr-sb-item alr-sb-item-child">
                <span class="alr-sb-dot" style="background:#cc785c;"></span>
                <span class="alr-sb-text">ECHO-002</span>
                <span class="alr-sb-badge alr-sb-badge-s1">S1</span>
              </a>
              <a href="/alr-archive/Echoes/Entities/ECHO-003-%E2%80%94-Nightmare-Stalker" class="alr-sb-item alr-sb-item-child">
                <span class="alr-sb-dot" style="background:#c45a3a;"></span>
                <span class="alr-sb-text">ECHO-003</span>
                <span class="alr-sb-badge alr-sb-badge-s4">S4</span>
              </a>
            </div>
          </details>

          <details class="alr-sb-group">
            <summary class="alr-sb-group-title">
              <span class="alr-sb-dot" style="background:#1d9e75;"></span>
              <span class="alr-sb-text">Objects</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              <a href="/alr-archive/Echoes/Objects/ECHO-005-%E2%80%94-The-Blood-Painting" class="alr-sb-item alr-sb-item-child">
                <span class="alr-sb-dot" style="background:#c45a3a;"></span>
                <span class="alr-sb-text">ECHO-005</span>
                <span class="alr-sb-badge alr-sb-badge-s4">S4</span>
              </a>
            </div>
          </details>

          <details class="alr-sb-group">
            <summary class="alr-sb-group-title">
              <span class="alr-sb-dot" style="background:#85b7eb;"></span>
              <span class="alr-sb-text">Locations</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              <a href="/alr-archive/Echoes/Locations/ECHO-006-%E2%80%94-The-Waiting-Room" class="alr-sb-item alr-sb-item-child">
                <span class="alr-sb-dot" style="background:#85b7eb;"></span>
                <span class="alr-sb-text">ECHO-006</span>
                <span class="alr-sb-badge alr-sb-badge-s2">S2</span>
              </a>
            </div>
          </details>

          <details class="alr-sb-group">
            <summary class="alr-sb-group-title">
              <span class="alr-sb-dot" style="background:#d4a840;"></span>
              <span class="alr-sb-text">Phenomena</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              <a href="/alr-archive/Echoes/Phenomena/ECHO-031-%E2%80%94-Those-Who-Sleep" class="alr-sb-item alr-sb-item-child">
                <span class="alr-sb-dot" style="background:#d4a840;"></span>
                <span class="alr-sb-text">ECHO-031</span>
                <span class="alr-sb-badge alr-sb-badge-s3">S3</span>
              </a>
              <a href="/alr-archive/Echoes/Phenomena/ECHO-047-%E2%80%94-A-Hollow-Bloom" class="alr-sb-item alr-sb-item-child">
                <span class="alr-sb-dot" style="background:#d4a840;"></span>
                <span class="alr-sb-text">ECHO-047</span>
                <span class="alr-sb-badge alr-sb-badge-s2">S2</span>
              </a>
            </div>
          </details>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Realities</div>
          <a href="/alr-archive/Reality-Reports/Reality-Investigation-Report-%E2%80%94-R-019" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">R-019</span>
          </a>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Systems</div>
          <a href="/alr-archive/Systems/The-Unwritten" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">The Unwritten</span>
          </a>
          <a href="/alr-archive/Systems/Reality-Tier-System-(RTS)" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">Reality Tier System</span>
          </a>
          <a href="/alr-archive/Systems/Reality-Divergence-Scale-(RDS)" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">Reality Divergence Scale</span>
          </a>
          <a href="/alr-archive/Systems/Reality-Collapse-Classification-(RCC)" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">Reality Collapse Classification</span>
          </a>
          <a href="/alr-archive/Systems/Echo-Classification-(EC)" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">Echo Classification</span>
          </a>
          <a href="/alr-archive/Systems/Echo-Stability-Classification-(ESC)" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">Echo Stability Classification</span>
          </a>

          <details class="alr-sb-group">
            <summary class="alr-sb-group-title">
              <span class="alr-sb-dot" style="background:#6b6860;"></span>
              <span class="alr-sb-text">Interactions</span>
              <span class="alr-sb-chevron">›</span>
            </summary>
            <div class="alr-sb-group-items">
              <a href="/alr-archive/Systems/Interactions/Declarations" class="alr-sb-item alr-sb-item-child">
                <span class="alr-sb-dot" style="background:#6b6860;"></span>
                <span class="alr-sb-text">Declarations</span>
              </a>
              <a href="/alr-archive/Systems/Interactions/The-Weight-of-Words" class="alr-sb-item alr-sb-item-child">
                <span class="alr-sb-dot" style="background:#6b6860;"></span>
                <span class="alr-sb-text">The Weight of Words</span>
              </a>
            </div>
          </details>
        </div>

        <div class="alr-sb-section">
          <div class="alr-sb-label">Equipment</div>
          <a href="/alr-archive/Equipment/Lastlight-Recorder" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">Lastlight Recorder</span>
          </a>
          <a href="/alr-archive/Equipment/Echo-Scanner-Unit" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">Echo Scanner Unit</span>
          </a>
          <a href="/alr-archive/Equipment/A.L.I.C.E_" class="alr-sb-item">
            <span class="alr-sb-dot" style="background:#6b6860;"></span>
            <span class="alr-sb-text">A.L.I.C.E.</span>
          </a>
        </div>

        <div class="alr-sb-bottom">
          <div class="alr-sb-darkmode-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="alr-sb-text alr-sb-darkmode-label">Dark mode</span>
            <div class="alr-sb-darkmode-toggle" id="alr-darkmode-slot"></div>
          </div>
        </div>

      </div>

      <script dangerouslySetInnerHTML={{__html: `
        function toggleALRSidebar() {
          var wrapper = document.getElementById('alr-sidebar-wrapper');
          var quartzBody = document.getElementById('quartz-body');
          var collapsed = wrapper.classList.toggle('alr-collapsed');
          if (collapsed) {
            quartzBody.classList.add('alr-sidebar-collapsed');
          } else {
            quartzBody.classList.remove('alr-sidebar-collapsed');
          }
        }

        function toggleALRDarkmode() {
          var btn = document.querySelector('button.darkmode');
          if (btn) btn.click();
        }

        document.addEventListener('DOMContentLoaded', function() {
          var slot = document.getElementById('alr-darkmode-slot');
          if (slot) {
            slot.innerHTML = '<button class="alr-dm-btn" title="Toggle dark mode"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
            slot.querySelector('.alr-dm-btn').addEventListener('click', toggleALRDarkmode);
          }
        });
      `}} />
    </div>
  )
}

ALRSidebar.displayName = "ALRSidebar"
export default (() => ALRSidebar) satisfies QuartzComponentConstructor