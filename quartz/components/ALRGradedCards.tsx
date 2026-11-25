// @ts-nocheck
import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { readFileSync } from "fs"
import { createHash } from "crypto"
import { join } from "path"

// A version stamp from the script's contents, so browsers fetch the new file as soon as it
// changes instead of reusing a cached copy for up to 10 minutes.
let VERSION = "1"
try {
  VERSION = createHash("sha1").update(readFileSync(join(process.cwd(), "quartz", "static", "alr-graded.js"))).digest("hex").slice(0, 10)
} catch (_e) {}

// Always rendered (afterBody), like the other ALR scripts: Quartz's in-site navigation doesn't
// re-run scripts, so /static/alr-graded.js loads once and reacts to "nav" itself. It powers the
// grading report PDF, the public cert page (/cert) and "Your Graded Cards" on the Account page.
const CSS = `
/* cert page */
body[data-slug="cert"] h1.article-title, body[data-slug="cert"] p.content-meta, body[data-slug="cert"] .breadcrumb-container { display: none !important; }
.alr-cert-wrap { max-width: 760px; margin: 8px auto 32px; }
.alr-cert-card { background: var(--alr-surface); border: 1px solid var(--alr-border); border-radius: var(--alr-r-lg); padding: clamp(18px, 4vw, 30px); }
.alr-cert-empty h2 { margin: 8px 0 6px; font-size: 22px; }
.alr-cert-empty p { margin: 0; color: var(--alr-text-2); }
.alr-cert-loading { padding: 40px; text-align: center; color: var(--alr-muted); }
.alr-cert-head { display: flex; align-items: center; gap: 12px; padding-bottom: 14px; border-bottom: 2px solid var(--alr-text); }
.alr-cert-head img { border-radius: 9px; display: block; }
.alr-cert-eb { font: 600 10.5px var(--codeFont), monospace; letter-spacing: 1.4px; color: var(--alr-accent-text); }
.alr-cert-title { font-size: 21px; font-weight: 800; color: var(--alr-text); }
.alr-cert-no { margin-left: auto; text-align: right; }
.alr-cert-mono { font-family: var(--codeFont), monospace; }
.alr-cert-big { font-size: 17px; color: var(--alr-text); }
.alr-cert-ok { display: inline-block; margin: 14px 0 4px; padding: 4px 11px; border-radius: 999px; font-size: 12px; font-weight: 700; color: #2f6a2a; background: #e3f0df; border: 1px solid #b9d3b2; }
[saved-theme="dark"] .alr-cert-ok { color: #b9d9b4; background: #1f2a1f; border-color: #2f4a2f; }
.alr-cert-main { display: grid; grid-template-columns: minmax(150px, 220px) 1fr; gap: 22px; margin-top: 14px; align-items: start; }
.alr-cert-main:not(:has(.alr-cert-photo)) { grid-template-columns: 1fr; }
.alr-cert-photo { margin: 0; }
.alr-cert-photo img { width: 100%; border-radius: 10px; display: block; box-shadow: 0 6px 18px rgba(0,0,0,.25); }
.alr-cert-photo figcaption { font-size: 11.5px; color: var(--alr-muted); margin-top: 6px; text-align: center; }
.alr-cert-grade { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border: 1px solid var(--alr-border-strong); border-radius: 12px; background: var(--alr-surface-2); }
.alr-cert-num { font-size: 58px; font-weight: 800; line-height: .85; letter-spacing: -2px; color: var(--alr-accent); }
.alr-cert-name { font-size: 17px; font-weight: 700; color: var(--alr-text); margin-bottom: 5px; }
.alr-cert-stamp { display: inline-block; border: 2px solid var(--alr-accent); color: var(--alr-accent); border-radius: 3px; padding: 2px 8px; font-weight: 800; font-size: 12px; letter-spacing: .8px; }
.alr-cert-table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px; }
.alr-cert-table td { padding: 7px 0; border-bottom: 1px solid var(--alr-border); vertical-align: top; }
.alr-cert-table td:first-child { color: var(--alr-muted); width: 130px; }
.alr-cert-sub { font: 600 10.5px var(--codeFont), monospace; letter-spacing: 1.4px; color: var(--alr-muted); margin: 20px 0 8px; }
.alr-cert-cond { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.alr-cert-cond div { border: 1px solid var(--alr-border); border-radius: 10px; padding: 9px 11px; }
.alr-cert-cond span { display: block; font-size: 11px; color: var(--alr-muted); }
.alr-cert-cond b { font-size: 15px; color: var(--alr-text); }
.alr-cert-notes { border: 1px solid var(--alr-border); border-radius: 10px; padding: 11px 13px; color: var(--alr-text-2); line-height: 1.55; white-space: pre-wrap; }
.alr-cert-label { max-width: 420px; }
.alr-cert-label svg { width: 100%; height: auto; display: block; }
.alr-cert-actions { display: flex; align-items: center; gap: 12px; margin-top: 22px; flex-wrap: wrap; }
.alr-cert-btn { background: var(--alr-accent); color: var(--alr-on-accent); border: 0; border-radius: var(--alr-r-sm); padding: 11px 18px; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform .15s ease; }
.alr-cert-btn:hover { transform: translateY(-2px); }
#alr-cert-status { font-size: 13px; color: var(--alr-muted); }
.alr-cert-foot { margin-top: 18px; font-size: 11.5px; color: var(--alr-muted); text-align: center; }
@media (max-width: 640px) {
  .alr-cert-main { grid-template-columns: 1fr; }
  .alr-cert-photo { max-width: 240px; margin: 0 auto; }
  .alr-cert-cond { grid-template-columns: repeat(2, 1fr); }
  .alr-cert-no { display: none; }
}
/* account: your graded cards */
.alr-gc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 12px; padding: 14px; }
.alr-gc { border: 1px solid var(--alr-border); border-radius: 12px; overflow: hidden; background: var(--alr-bg); display: flex; flex-direction: column; }
.alr-gc-img { height: 170px; display: flex; align-items: center; justify-content: center; background: var(--alr-surface-2); }
.alr-gc-img img { max-height: 154px; max-width: 90%; border-radius: 6px; }
.alr-gc-ph { font-size: 48px; font-weight: 800; color: var(--alr-accent); opacity: .5; }
.alr-gc-meta { padding: 10px 12px 12px; display: flex; flex-direction: column; gap: 4px; flex: 1; }
.alr-gc-name { font-weight: 700; color: var(--alr-text); }
.alr-gc-sub { font-size: 12px; color: var(--alr-muted); }
.alr-gc-mono { font-family: var(--codeFont), monospace; }
.alr-gc-grade { display: flex; align-items: center; gap: 7px; }
.alr-gc-grade b { font-size: 20px; color: var(--alr-accent); }
.alr-gc-grade span { font-size: 10px; font-weight: 800; border: 1.5px solid var(--alr-accent); color: var(--alr-accent); border-radius: 2px; padding: 1px 5px; letter-spacing: .5px; }
.alr-gc-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 6px; }
.alr-gc-actions a, .alr-gc-actions button { font-size: 12px; padding: 5px 9px; border-radius: 8px; background: var(--alr-hover); color: var(--alr-text) !important; border: 0; cursor: pointer; text-decoration: none !important; font-family: inherit; }
.alr-gc-actions .alr-gc-del { color: #e27a5e !important; }
.alr-gc-status { font-size: 11.5px; color: var(--alr-muted); min-height: 1em; }
.alr-gc-img { position: relative; }
.alr-gc-tag { position: absolute; top: 8px; left: 8px; font-size: 9px; font-weight: 800; letter-spacing: .6px; padding: 2px 6px; border-radius: 4px; }
.alr-gc-tag.pre { background: #3a2a10; color: #d9a441; border: 1px solid #5a4318; }
.alr-gc-tag.fin { background: #1f2a1f; color: #9fd18f; border: 1px solid #2f4a2f; }
.alr-gc-grade.pre span { border-color: #d9a441; color: #d9a441; }
.alr-gc-grade em { font-style: normal; font-size: 11px; color: var(--alr-muted); }
.alr-gc-grade { flex-wrap: wrap; }
.alr-gc-grade em.alr-gc-real { color: var(--alr-text); font-weight: 700; }
.alr-gc-filters { display: flex; gap: 6px; padding: 14px 14px 0; }
.alr-gc-filters button { font-family: inherit; font-size: 12px; padding: 5px 12px; border-radius: 999px; border: 1px solid var(--alr-border-strong); background: transparent; color: var(--alr-muted); cursor: pointer; }
.alr-gc-filters button.on { background: var(--alr-text); color: var(--alr-bg); border-color: var(--alr-text); }
/* pre-grade cert page */
.alr-cert-pre { color: #8a5a12 !important; background: #fbefd6 !important; border-color: #eacb8a !important; }
[saved-theme="dark"] .alr-cert-pre { color: #e5c26e !important; background: #2a2210 !important; border-color: #5a4318 !important; }
.alr-cert-estline { margin-top: 6px; font-size: 13px; font-weight: 700; color: var(--alr-accent-text); }
.alr-cert-est div { text-align: center; }
.alr-cert-est small { display: block; font-size: 11px; color: var(--alr-muted); }
.alr-cert-app { margin-top: 14px; font-size: 12.5px; color: var(--alr-text-2); background: var(--alr-surface-2); border: 1px dashed var(--alr-border-strong); border-radius: 10px; padding: 10px 12px; line-height: 1.5; }
`

export const ALRGradedCardsScript: QuartzComponent = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: CSS }} />
    <script src={"/static/alr-graded.js?v=" + VERSION} defer></script>
  </>
)
ALRGradedCardsScript.displayName = "ALRGradedCardsScript"

export const ALRCertPage: QuartzComponent = () => (
  <div class="alr-cert-wrap">
    <div id="alr-cert"><div class="alr-cert-loading">Looking up cert…</div></div>
  </div>
)
ALRCertPage.displayName = "ALRCertPage"

export const GradedCardsScript = (() => ALRGradedCardsScript) satisfies QuartzComponentConstructor
export const CertPage = (() => ALRCertPage) satisfies QuartzComponentConstructor
