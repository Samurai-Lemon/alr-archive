import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { modInfo, isModPage, mcRange, modPayload, DISCLAIMER } from "./modData"

// The /Mods page: one card per mod. Versions and download links are filled in by ALRModsScript
// from each mod's GitHub Releases (plus any manual files listed in the mod's frontmatter).
const ALRModList: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
  const mods = allFiles
    .filter(isModPage)
    .map(modInfo)
    .sort((a, b) => a.title.localeCompare(b.title))
  const loaders = Array.from(new Set(mods.flatMap((m) => m.loaders)))

  return (
    <div class="alr-mods">
      <div class="alr-mods-banner">
        <div class="alr-eyebrow">ALR Initiative — Field Software</div>
        <h1 class="alr-hero-title">Mods</h1>
        <p class="alr-mods-sub">
          Minecraft mods made by the archive team. Free to download, built for Minecraft: Java Edition.
        </p>
        <div class="alr-mods-osd" aria-hidden="true">● {mods.length} {mods.length === 1 ? "FILE" : "FILES"}</div>
      </div>

      {loaders.length > 1 && (
        <div class="alr-mods-seg" role="group" aria-label="Filter by loader">
          <button type="button" class="on" data-mods-loader="All">All</button>
          {loaders.map((l) => (
            <button type="button" data-mods-loader={l}>{l}</button>
          ))}
        </div>
      )}

      <div class="alr-mods-grid">
        {mods.map((m) => (
          <div class="alr-mod-card" data-mod={modPayload(m)} data-mod-loaders={m.loaders.join(",")}>
            <a href={"/" + m.slug} class="internal alr-mod-card-link" aria-label={m.title}></a>
            {m.icon && <img class="alr-mod-icon" src={m.icon} alt="" width={84} height={84} loading="lazy" />}
            <div class="alr-mod-card-body">
              <div class="alr-mod-card-title">{m.title}</div>
              <p class="alr-mod-card-sum">{m.summary}</p>
              <div class="alr-mod-tags">
                {m.loaders.map((l) => <span class="alr-mod-chip alr-mod-chip-ld">{l}</span>)}
                {m.minecraft.length > 0 && <span class="alr-mod-chip">{mcRange(m.minecraft)}</span>}
                {m.category && <span class="alr-mod-chip">{m.category}</span>}
              </div>
              <div class="alr-mod-card-foot">
                <span class="alr-mod-ver" data-mod-ver>Checking for files…</span>
                <a class="alr-mod-btn alr-mod-btn-pri alr-mod-btn-sm" data-mod-dl href={m.repo ? `https://github.com/${m.repo}/releases` : "#"} rel="noopener">
                  ⤓ Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p class="alr-mods-disclaimer">{DISCLAIMER}</p>
    </div>
  )
}

ALRModList.displayName = "ALRModList"
export default (() => ALRModList) satisfies QuartzComponentConstructor
