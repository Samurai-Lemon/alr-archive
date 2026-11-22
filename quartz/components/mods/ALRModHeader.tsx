import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { modInfo, mcRange, modPayload } from "./modData"

// Top of a mod page: icon, name, summary, tags, the Download button (with a menu when there is
// more than one file for the newest version) and a strip of details.
const ALRModHeader: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const m = modInfo(fileData)
  return (
    <div class="alr-mod-page" data-mod={modPayload(m)}>
      <a href="/Mods/" class="internal alr-mod-back">‹ All mods</a>
      <div class="alr-mod-head">
        {m.icon && <img class="alr-mod-icon alr-mod-icon-lg" src={m.icon} alt="" width={104} height={104} />}
        <div class="alr-mod-head-text">
          <h1 class="alr-mod-title">{m.title}</h1>
          <p class="alr-mod-sum">{m.summary}</p>
          <div class="alr-mod-tags">
            {m.loaders.map((l) => <span class="alr-mod-chip alr-mod-chip-ld">{l}</span>)}
            {m.minecraft.length > 0 && <span class="alr-mod-chip">{mcRange(m.minecraft)}</span>}
            {m.category && <span class="alr-mod-chip">{m.category}</span>}
          </div>
        </div>
        <div class="alr-mod-act">
          <a class="alr-mod-btn alr-mod-btn-pri alr-mod-btn-lg" data-mod-dl href={m.repo ? `https://github.com/${m.repo}/releases` : "#"} rel="noopener">
            ⤓ <span data-mod-dl-label>Download</span>
          </a>
          <span class="alr-mod-count" data-mod-count></span>
          <div class="alr-mod-menu" data-mod-menu hidden>
            <div class="alr-mod-menu-head">Pick your setup — newest version</div>
            <div data-mod-menu-items></div>
          </div>
        </div>
      </div>
      <dl class="alr-mod-details">
        {m.minecraft.length > 0 && (<div><dt>Minecraft</dt><dd>{m.minecraft.join(", ")}</dd></div>)}
        <div><dt>Loader</dt><dd>{m.loaders.join(", ")}</dd></div>
        {m.environment && (<div><dt>Install on</dt><dd>{m.environment}</dd></div>)}
        {m.requires && (<div><dt>Needs</dt><dd>{m.requiresUrl ? <a href={m.requiresUrl} rel="noopener" target="_blank">{m.requires}</a> : m.requires}</dd></div>)}
        {m.license && (<div><dt>License</dt><dd>{m.license}</dd></div>)}
        {m.repo && (<div><dt>Links</dt><dd><a href={`https://github.com/${m.repo}`} rel="noopener" target="_blank">Source</a> · <a href={`https://github.com/${m.repo}/issues`} rel="noopener" target="_blank">Report a bug</a></dd></div>)}
      </dl>
    </div>
  )
}

ALRModHeader.displayName = "ALRModHeader"
export default (() => ALRModHeader) satisfies QuartzComponentConstructor
