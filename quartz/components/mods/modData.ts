// Shared helpers for the Mods pages. A mod is any content page with `type: mod` in its frontmatter.

export interface ManualFile {
  version: string
  minecraft?: string
  loader?: string
  url: string
  date?: string
  notes?: string
}

export interface GalleryImage {
  src: string
  caption: string
}

export interface ModInfo {
  slug: string
  title: string
  summary: string
  repo: string
  icon: string
  category: string
  loaders: string[]
  minecraft: string[]
  environment: string
  license: string
  requires: string
  requiresUrl: string
  files: ManualFile[]
  gallery: GalleryImage[]
  modrinth: string
}

const list = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : v ? String(v).split(",").map((s) => s.trim()).filter(Boolean) : []

export function modInfo(fileData: any): ModInfo {
  const fm = fileData.frontmatter ?? {}
  const files = Array.isArray(fm.files) ? fm.files : []
  return {
    slug: String(fileData.slug ?? ""),
    title: String(fm.title ?? fileData.slug ?? ""),
    summary: String(fm.summary ?? fm.description ?? ""),
    repo: String(fm.repo ?? ""),
    icon: String(fm.icon ?? ""),
    category: String(fm.category ?? ""),
    loaders: list(fm.loaders).length ? list(fm.loaders) : ["Fabric"],
    minecraft: list(fm.minecraft),
    environment: String(fm.environment ?? ""),
    license: String(fm.license ?? ""),
    requires: String(fm.requires ?? ""),
    requiresUrl: String(fm.requires_url ?? ""),
    modrinth: String(fm.modrinth ?? ""),
    gallery: (Array.isArray(fm.gallery) ? fm.gallery : [])
      .map((g: any) => (typeof g === "string" ? { src: g, caption: "" } : { src: String(g?.src ?? ""), caption: String(g?.caption ?? "") }))
      .filter((g: GalleryImage) => g.src),
    files: files
      .filter((f: any) => f && f.url)
      .map((f: any) => ({
        version: String(f.version ?? ""),
        minecraft: f.minecraft ? String(f.minecraft) : undefined,
        loader: f.loader ? String(f.loader) : undefined,
        url: String(f.url),
        date: f.date ? String(f.date instanceof Date ? f.date.toISOString().slice(0, 10) : f.date) : undefined,
        notes: f.notes ? String(f.notes) : undefined,
      })),
  }
}

export const isModPage = (fileData: any) => fileData.frontmatter?.type === "mod"

export function mcRange(mc: string[]): string {
  if (mc.length <= 1) return mc[0] ?? ""
  return `${mc[mc.length - 1]}–${mc[0]}`
}

// Data the browser script needs, embedded on the page as JSON.
export function modPayload(m: ModInfo) {
  return JSON.stringify({
    repo: m.repo,
    loader: m.loaders[0],
    mc: m.minecraft[0] ?? "",
    files: m.files,
  }).replace(/</g, "\\u003c")
}

export const DISCLAIMER =
  "Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft."
