import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRSidebar: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="alr-sidebar-nav">
      <div class="alr-sb-section">
        <div class="alr-sb-label">Archive</div>
        <a href="/alr-archive/" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          Home
        </a>
        <a href="/Foundations/ALR/The-Archive" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          The Archive
        </a>
        <a href="/Foundations/ALR/ALR-Initiative" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          ALR Initiative
        </a>
      </div>

      <div class="alr-sb-section">
        <div class="alr-sb-label">Registries</div>
        <a href="/Index/ECHO-Registry" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          Echo Registry
          <span class="alr-sb-badge">7</span>
        </a>
        <a href="/Index/Reality-Registry" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          Reality Registry
          <span class="alr-sb-badge">2</span>
        </a>
      </div>

      <div class="alr-sb-section">
        <div class="alr-sb-label">Echoes</div>

        <details class="alr-sb-group">
          <summary class="alr-sb-group-title">
            <span class="alr-sb-dot" style="background:#cc785c;"></span>
            Entities
            <span class="alr-sb-chevron">›</span>
          </summary>
          <div class="alr-sb-group-items">
            <a href="/Echoes/Entities/ECHO-001-The-Watchers" class="alr-sb-item alr-sb-item-child">
              <span class="alr-sb-dot" style="background:#cc785c;"></span>
              ECHO-001
              <span class="alr-sb-badge alr-sb-badge-s1">S1</span>
            </a>
            <a href="/Echoes/Entities/ECHO-002-%E2%80%94-Dreamwalker" class="alr-sb-item alr-sb-item-child">
              <span class="alr-sb-dot" style="background:#cc785c;"></span>
              ECHO-002
              <span class="alr-sb-badge alr-sb-badge-s1">S1</span>
            </a>
            <a href="/Echoes/Entities/ECHO-003-%E2%80%94-Nightmare-Stalker" class="alr-sb-item alr-sb-item-child">
              <span class="alr-sb-dot" style="background:#c45a3a;"></span>
              ECHO-003
              <span class="alr-sb-badge alr-sb-badge-s4">S4</span>
            </a>
          </div>
        </details>

        <details class="alr-sb-group">
          <summary class="alr-sb-group-title">
            <span class="alr-sb-dot" style="background:#1d9e75;"></span>
            Objects
            <span class="alr-sb-chevron">›</span>
          </summary>
          <div class="alr-sb-group-items">
            <a href="/Echoes/Objects/ECHO-005-%E2%80%94-The-Blood-Painting" class="alr-sb-item alr-sb-item-child">
              <span class="alr-sb-dot" style="background:#c45a3a;"></span>
              ECHO-005
              <span class="alr-sb-badge alr-sb-badge-s4">S4</span>
            </a>
          </div>
        </details>

        <details class="alr-sb-group">
          <summary class="alr-sb-group-title">
            <span class="alr-sb-dot" style="background:#85b7eb;"></span>
            Locations
            <span class="alr-sb-chevron">›</span>
          </summary>
          <div class="alr-sb-group-items">
            <a href="/Echoes/Locations/ECHO-006-%E2%80%94-The-Waiting-Room" class="alr-sb-item alr-sb-item-child">
              <span class="alr-sb-dot" style="background:#85b7eb;"></span>
              ECHO-006
              <span class="alr-sb-badge alr-sb-badge-s2">S2</span>
            </a>
          </div>
        </details>

        <details class="alr-sb-group">
          <summary class="alr-sb-group-title">
            <span class="alr-sb-dot" style="background:#d4a840;"></span>
            Phenomena
            <span class="alr-sb-chevron">›</span>
          </summary>
          <div class="alr-sb-group-items">
            <a href="/Echoes/Phenomena/ECHO-031-%E2%80%94-Those-Who-Sleep" class="alr-sb-item alr-sb-item-child">
              <span class="alr-sb-dot" style="background:#d4a840;"></span>
              ECHO-031
              <span class="alr-sb-badge alr-sb-badge-s3">S3</span>
            </a>
            <a href="/Echoes/Phenomena/ECHO-047-%E2%80%94-A-Hollow-Bloom" class="alr-sb-item alr-sb-item-child">
              <span class="alr-sb-dot" style="background:#d4a840;"></span>
              ECHO-047
              <span class="alr-sb-badge alr-sb-badge-s2">S2</span>
            </a>
          </div>
        </details>
      </div>

      <div class="alr-sb-section">
        <div class="alr-sb-label">Realities</div>
        <a href="/Reality-Reports/Reality-Investigation-Report-%E2%80%94-R-019" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          R-019
        </a>
      </div>

      <div class="alr-sb-section">
        <div class="alr-sb-label">Systems</div>
        <a href="/Systems/The-Unwritten" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          The Unwritten
        </a>
        <a href="/Systems/Reality-Tier-System-(RTS)" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          Reality Tier System
        </a>
        <a href="/Systems/Reality-Divergence-Scale-(RDS)" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          Reality Divergence Scale
        </a>
        <a href="/Systems/Reality-Collapse-Classification-(RCC)" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          Reality Collapse Classification
        </a>
        <a href="/Systems/Echo-Classification-(EC)" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          Echo Classification
        </a>
        <a href="/Systems/Echo-Stability-Classification-(ESC)" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          Echo Stability Classification
        </a>

        <details class="alr-sb-group">
          <summary class="alr-sb-group-title">
            <span class="alr-sb-dot" style="background:#f0ece0;"></span>
            Interactions
            <span class="alr-sb-chevron">›</span>
          </summary>
          <div class="alr-sb-group-items">
            <a href="/Systems/Interactions/Declarations" class="alr-sb-item alr-sb-item-child">
              <span class="alr-sb-dot" style="background:#f0ece0;"></span>
              Declarations
            </a>
            <a href="/Systems/Interactions/The-Weight-of-Words" class="alr-sb-item alr-sb-item-child">
              <span class="alr-sb-dot" style="background:#f0ece0;"></span>
              The Weight of Words
            </a>
          </div>
        </details>
      </div>

      <div class="alr-sb-section">
        <div class="alr-sb-label">Equipment</div>
        <a href="/Equipment/Lastlight-Recorder" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          Lastlight Recorder
        </a>
        <a href="/Equipment/Echo-Scanner-Unit" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          Echo Scanner Unit
        </a>
        <a href="/Equipment/A.L.I.C.E_" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#f0ece0;"></span>
          A.L.I.C.E.
        </a>
      </div>
    </div>
  )
}

ALRSidebar.displayName = "ALRSidebar"
export default (() => ALRSidebar) satisfies QuartzComponentConstructor