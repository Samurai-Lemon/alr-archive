import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import ALRRecentEchoes from "./ALRRecentEchoes"
import ALRRecentRealities from "./ALRRecentRealities"

const RecentEchoes = ALRRecentEchoes()
const RecentRealities = ALRRecentRealities()

const ALRHomeDashboard: QuartzComponent = (props: QuartzComponentProps) => {
  const { allFiles } = props

  const normalize = (v: unknown) => String(v ?? "").trim().toLowerCase()

  const hasTag = (tags: unknown, target: string) =>
    Array.isArray(tags) && tags.some((t) => normalize(t) === normalize(target))

  const echoes = allFiles.filter((file) => {
    const slug = normalize(file.slug)
    const fm = (file.frontmatter ?? {}) as Record<string, unknown>

    return hasTag(fm.tags, "echo") || slug.includes("/echoes/") || slug.startsWith("echo-")
  })

  const realities = allFiles.filter((file) => {
    const slug = normalize(file.slug)
    const fm = (file.frontmatter ?? {}) as Record<string, unknown>

    return hasTag(fm.tags, "reality") || slug.includes("/realities/") || slug.startsWith("r-")
  })

  const terminalEchoes = echoes.filter((file) => {
    const fm = (file.frontmatter ?? {}) as Record<string, unknown>
    return normalize(fm.esc) === "s4"
  })

  const activeCycle = "7"

  return (
    <>
      <div class="alr-home">
        <div class="alr-hero">
          <div class="alr-hero-accent"></div>
          <div class="alr-eyebrow">Archive of Lost Realities Initiative</div>
          <div class="alr-hero-title">The Archive</div>
          <div class="alr-hero-sub">
            A record of realities that no longer exist. What you find here was recovered from the
            Unwritten — fragments, echoes, and evidence of worlds that collapsed before they could
            be preserved.
          </div>
          <div class="alr-stats">
            <div class="alr-stat">
              <div class="alr-stat-num">{echoes.length}</div>
              <div class="alr-stat-lbl">Echoes documented</div>
            </div>
            <div class="alr-stat">
              <div class="alr-stat-num">{realities.length}</div>
              <div class="alr-stat-lbl">Realities investigated</div>
            </div>
            <div class="alr-stat">
              <div class="alr-stat-num alr-red">{terminalEchoes.length}</div>
              <div class="alr-stat-lbl">Terminal echoes (S4)</div>
            </div>
            <div class="alr-stat">
              <div class="alr-stat-num alr-muted">{activeCycle}</div>
              <div class="alr-stat-lbl">Active cycle</div>
            </div>
          </div>
        </div>

        <div class="alr-mission">
          <div class="alr-mission-item">
            <div class="alr-mission-title">Document echoes</div>
            <div class="alr-mission-desc">
              Classify and preserve anomalous remnants recovered from collapsed realities.
            </div>
          </div>
          <div class="alr-mission-item">
            <div class="alr-mission-title">Investigate realities</div>
            <div class="alr-mission-desc">
              Deploy field teams to survey collapsed reality sites and recover evidence.
            </div>
          </div>
          <div class="alr-mission-item">
            <div class="alr-mission-title">Archive lost realities</div>
            <div class="alr-mission-desc">
              Maintain an institutional record of civilizations and worlds lost to the Unwritten.
            </div>
          </div>
        </div>

        <div class="alr-grid">
          <RecentEchoes {...props} />

          <div class="alr-card-stack">
            <RecentRealities {...props} />

            <div class="alr-card">
              <div class="alr-card-head">
                <span class="alr-card-head-title">Archive notices</span>
              </div>
              <div class="alr-notice-row">
                <div class="alr-notice-dot" style={{ background: "#993c1d" }}></div>
                <div>
                  <div class="alr-notice-text">
                    ECHO-003 stability review due. S4 classification confirmed.
                  </div>
                  <div class="alr-notice-time">Cycle 7 — Archive Operations</div>
                </div>
              </div>
              <div class="alr-notice-row">
                <div class="alr-notice-dot" style={{ background: "#854f0b" }}></div>
                <div>
                  <div class="alr-notice-text">
                    ECHO-031 reclassification under review. Manifestation pattern shows increased
                    frequency.
                  </div>
                  <div class="alr-notice-time">Cycle 7 — Echo Research Division</div>
                </div>
              </div>
              <div class="alr-notice-row">
                <div class="alr-notice-dot" style={{ background: "#3c3489" }}></div>
                <div>
                  <div class="alr-notice-text">
                    R-019 field documentation complete. Entry transferred to Archive Operations.
                  </div>
                  <div class="alr-notice-time">Cycle 6 — Reality Investigation Division</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="alr-card alr-card-full">
          <div class="alr-card-head">
            <span class="alr-card-head-title">Active personnel — Cycle 7</span>
          </div>
          <div class="alr-personnel">
            <div class="alr-person">
              <div class="alr-avatar alr-av-inv">EM</div>
              <div>
                <div class="alr-person-name">E. Maren</div>
                <div class="alr-person-div">Reality Investigation</div>
              </div>
            </div>
            <div class="alr-person">
              <div class="alr-avatar alr-av-res">VA</div>
              <div>
                <div class="alr-person-name">V. Arend</div>
                <div class="alr-person-div">Echo Research</div>
              </div>
            </div>
            <div class="alr-person">
              <div class="alr-avatar alr-av-ops">MV</div>
              <div>
                <div class="alr-person-name">M. Voss</div>
                <div class="alr-person-div">Archive Operations</div>
              </div>
            </div>
            <div class="alr-person">
              <div class="alr-avatar alr-av-dev">KA</div>
              <div>
                <div class="alr-person-name">K. Albrecht</div>
                <div class="alr-person-div">Device Development</div>
              </div>
            </div>
            <div class="alr-person">
              <div class="alr-avatar alr-av-inv">JC</div>
              <div>
                <div class="alr-person-name">J. Calloway</div>
                <div class="alr-person-div">Reality Investigation</div>
              </div>
            </div>
            <div class="alr-person">
              <div class="alr-avatar alr-av-res">NO</div>
              <div>
                <div class="alr-person-name">N. Ossic</div>
                <div class="alr-person-div">Echo Research</div>
              </div>
            </div>
            <div class="alr-person">
              <div class="alr-avatar alr-av-ops">LD</div>
              <div>
                <div class="alr-person-name">L. Dray</div>
                <div class="alr-person-div">Archive Operations</div>
              </div>
            </div>
            <div class="alr-person">
              <div class="alr-avatar alr-av-dev">DT</div>
              <div>
                <div class="alr-person-name">D. Tessir</div>
                <div class="alr-person-div">Device Development</div>
              </div>
            </div>
          </div>
        </div>

        <div class="alr-home-ad-wrap">
          <div class="alr-home-ad-head">
            <span class="alr-home-ad-label">Sponsored • External Signal</span>
          </div>

          <div class="alr-home-ad-box">
            <ins
              class="adsbygoogle"
              style="display:inline-block;width:300px;height:250px"
              data-ad-client="ca-pub-1009528022941792"
              data-ad-slot="6380168218"
            ></ins>
            <script
              dangerouslySetInnerHTML={{
                __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
              }}
            />
          </div>

          <div class="alr-home-ad-foot">Archive Initiative — Index Stable</div>
        </div>
      </div>
    </>
  )
}

ALRHomeDashboard.displayName = "ALRHomeDashboard"
export default (() => ALRHomeDashboard) satisfies QuartzComponentConstructor