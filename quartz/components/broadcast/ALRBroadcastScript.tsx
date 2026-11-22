import { QuartzComponent, QuartzComponentConstructor } from "../types"

// Fills the broadcast banners' date ("NOV 21 2026") and runs their tape counter, which shows the
// visitor's local time of day like the homepage hero's. Rendered on every page so it survives SPA nav.
const script = `
(function () {
  if (window.__alrBroadcastWired) return;
  window.__alrBroadcastWired = true;
  var MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  function p(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    var d = new Date();
    var t = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
    document.querySelectorAll('[data-bb-counter]').forEach(function (el) { el.textContent = t; });
  }
  function dates() {
    var d = new Date();
    var s = MONTHS[d.getMonth()] + ' ' + p(d.getDate()) + ' ' + d.getFullYear();
    document.querySelectorAll('[data-bb-date]').forEach(function (el) { el.textContent = s; });
  }
  function run() { dates(); tick(); }
  setInterval(tick, 1000);
  document.addEventListener('nav', run);
  if (document.readyState !== 'loading') run(); else document.addEventListener('DOMContentLoaded', run);
})();
`

const ALRBroadcastScript: QuartzComponent = () => <script dangerouslySetInnerHTML={{ __html: script }} />

ALRBroadcastScript.displayName = "ALRBroadcastScript"
export default (() => ALRBroadcastScript) satisfies QuartzComponentConstructor
