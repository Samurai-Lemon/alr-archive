import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Previous / next echo, in Echo ID order, at the end of an echo entry. Phone-only (hidden above
// 800px) — on desktop the sidebar list already does this job.
const ALREchoPager: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const idOf = (f: any) => {
    const fm = (f.frontmatter ?? {}) as Record<string, unknown>
    const m = String(fm.title ?? "").match(/ECHO-(\d+)/i) ?? String(f.slug ?? "").match(/ECHO-(\d+)/i)
    return m ? parseInt(m[1], 10) : NaN
  }
  const nameOf = (f: any) =>
    String((f.frontmatter ?? {}).title ?? f.slug ?? "").replace(/^ECHO-\d+\s*[—-]\s*/i, "").trim()

  const echoes = allFiles
    .filter((f) => (f.frontmatter as any)?.type === "echo" && !isNaN(idOf(f)))
    .sort((a, b) => idOf(a) - idOf(b))
  const i = echoes.findIndex((f) => f.slug === fileData.slug)
  if (i === -1 || echoes.length < 2) return null

  const prev = i > 0 ? echoes[i - 1] : null
  const next = i < echoes.length - 1 ? echoes[i + 1] : null
  const pad = (n: number) => "ECHO-" + String(n).padStart(3, "0")

  return (
    <nav class="alr-echo-pager" aria-label="More echoes">
      {prev ? (
        <a href={"/" + prev.slug} class="internal alr-echo-pager-link">
          <span class="alr-echo-pager-id">← {pad(idOf(prev))}</span>
          <span class="alr-echo-pager-name">{nameOf(prev)}</span>
        </a>
      ) : <span />}
      {next ? (
        <a href={"/" + next.slug} class="internal alr-echo-pager-link alr-echo-pager-next">
          <span class="alr-echo-pager-id">{pad(idOf(next))} →</span>
          <span class="alr-echo-pager-name">{nameOf(next)}</span>
        </a>
      ) : <span />}
    </nav>
  )
}

ALREchoPager.displayName = "ALREchoPager"
export default (() => ALREchoPager) satisfies QuartzComponentConstructor
