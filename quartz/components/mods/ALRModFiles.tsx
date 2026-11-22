import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { modInfo, DISCLAIMER } from "./modData"

// "Files" list at the end of a mod page. ALRModsScript fills it from GitHub Releases and the
// manual files in the frontmatter; until then (or without JavaScript) it links to the Releases page.
const ALRModFiles: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const m = modInfo(fileData)
  return (
    <section class="alr-mod-files" aria-label="Files">
      <h2 class="alr-mod-files-title">Files</h2>
      <div data-mod-files>
        <div class="alr-mod-files-empty">
          {m.repo ? (
            <a href={`https://github.com/${m.repo}/releases`} rel="noopener" target="_blank">See all releases on GitHub ↗</a>
          ) : (
            "No files yet."
          )}
        </div>
      </div>
      <p class="alr-mods-disclaimer">{DISCLAIMER}</p>
    </section>
  )
}

ALRModFiles.displayName = "ALRModFiles"
export default (() => ALRModFiles) satisfies QuartzComponentConstructor
