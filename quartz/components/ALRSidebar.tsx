import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRSidebar: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="alr-sidebar-nav">
      <div class="alr-sb-section">
        <div class="alr-sb-label">Archive</div>
        <a href="/alr-archive/" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#cc785c;"></span>
          Home
        </a>
        <a href="/alr-archive/Foundations/ALR/The-Archive" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#cc785c;"></span>
          The Archive
        </a>
        <a href="/alr-archive/Foundations/ALR/ALR-Initiative" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#cc785c;"></span>
          ALR Initiative
        </a>
      </div>

      <div class="alr-sb-section">
        <div class="alr-sb-label">Registries</div>
        <a href="/alr-archive/Index/ECHO-Registry" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#7f77dd;"></span>
          Echo Registry
          <span class="alr-sb-badge">7</span>
        </a>
        <a href="/alr-archive/Index/Reality-Registry" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#4a4840;"></span>
          Reality Registry
          <span class="alr-sb-badge">2</span>
        </a>
      </div>

      <div class="alr-sb-section">
        <div class="alr-sb-label">Echoes</div>
        <a href="/alr-archive/Echoes/Entities/ECHO-001-The-Watchers" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#cc785c;"></span>
          ECHO-001
          <span class="alr-sb-badge alr-sb-badge-s1">S1</span>
        </a>
        <a href="/alr-archive/Echoes/Entities/ECHO-002-Dreamwalker" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#cc785c;"></span>
          ECHO-002
          <span class="alr-sb-badge alr-sb-badge-s1">S1</span>
        </a>
        <a href="/alr-archive/Echoes/Entities/ECHO-003-Nightmare-Stalker" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#c45a3a;"></span>
          ECHO-003
          <span class="alr-sb-badge alr-sb-badge-s4">S4</span>
        </a>
        <a href="/alr-archive/Echoes/Objects/ECHO-005-The-Blood-Painting" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#c45a3a;"></span>
          ECHO-005
          <span class="alr-sb-badge alr-sb-badge-s4">S4</span>
        </a>
        <a href="/alr-archive/Echoes/Locations/ECHO-006-The-Waiting-Room" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#85b7eb;"></span>
          ECHO-006
          <span class="alr-sb-badge alr-sb-badge-s2">S2</span>
        </a>
        <a href="/alr-archive/Echoes/Phenomena/ECHO-031-Those-Who-Sleep" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#d4a840;"></span>
          ECHO-031
          <span class="alr-sb-badge alr-sb-badge-s3">S3</span>
        </a>
        <a href="/alr-archive/Echoes/Phenomena/ECHO-047-A-Hollow-Bloom" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#d4a840;"></span>
          ECHO-047
          <span class="alr-sb-badge alr-sb-badge-s2">S2</span>
        </a>
      </div>

      <div class="alr-sb-section">
        <div class="alr-sb-label">Realities</div>
        <a href="/alr-archive/Reality-Reports/Reality-Investigation-Report-R-019" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#4a4840;"></span>
          R-019
        </a>
      </div>

      <div class="alr-sb-section">
        <div class="alr-sb-label">Equipment</div>
        <a href="/alr-archive/Equipment/Lastlight-Recorder" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#4a4840;"></span>
          Lastlight Recorder
        </a>
        <a href="/alr-archive/Equipment/Echo-Scanner-Unit" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#4a4840;"></span>
          Echo Scanner Unit
        </a>
        <a href="/alr-archive/Equipment/A-L-I-C-E-" class="alr-sb-item">
          <span class="alr-sb-dot" style="background:#4a4840;"></span>
          A.L.I.C.E.
        </a>
      </div>
    </div>
  )
}

ALRSidebar.displayName = "ALRSidebar"
export default (() => ALRSidebar) satisfies QuartzComponentConstructor