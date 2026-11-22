// Background art for the broadcast banners: the old ALR banner's grid, decaying from left to
// right into loose square "blocks", with the dashed scanline. Generated at build time from a seed
// so each page has its own pattern that never changes between builds.

export const ALR_LOGO_PATH =
  "M 531.0 468.5 L 384.0 467.5 L 283.0 400.5 L 271.0 403.5 L 184.0 463.5 L 172.0 468.5 L 26.0 468.5 L 14.5 461.0 L 11.5 454.0 L 14.5 439.0 L 250.5 39.0 L 269.0 13.5 L 285.0 11.5 L 298.5 24.0 L 542.5 438.0 L 545.5 446.0 L 544.5 458.0 L 531.0 468.5 Z M 448.5 429.0 L 480.0 428.5 L 484.5 425.0 L 484.5 419.0 L 287.5 85.0 L 282.0 78.5 L 276.0 78.5 L 77.5 411.0 L 73.5 425.0 L 78.0 428.5 L 96.0 429.5 L 159.0 428.5 L 237.5 376.0 L 237.5 371.0 L 232.0 365.5 L 175.0 328.5 L 170.5 324.0 L 169.5 317.0 L 262.5 155.0 L 271.0 145.5 L 283.0 143.5 L 293.5 151.0 L 389.5 316.0 L 388.5 323.0 L 382.0 329.5 L 325.0 366.5 L 321.5 370.0 L 322.5 377.0 L 395.0 426.5 L 409.0 429.5 L 448.5 429.0 Z M 283.5 345.0 L 332.0 311.5 L 335.5 303.0 L 284.5 217.0 L 276.0 215.5 L 222.5 308.0 L 274.0 344.5 L 283.5 345.0 Z"

function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function seedOf(key: string): number {
  let h = 2166136261
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619)
  return h >>> 0
}

export interface ArtOptions {
  w: number
  h: number
  cellW: number
  cellH: number
  edge: number // fraction of the width where the grid stops being filled
  particles: number
}

// Returns SVG markup (no outer <svg>). Colors come from CSS classes so light/dark mode follows the site.
export function decayArt(key: string, o: ArtOptions): string {
  const rnd = mulberry32(seedOf(key))
  const pick = <T,>(a: T[]) => a[Math.floor(rnd() * a.length)]
  const out: string[] = []
  const cols = Math.floor(o.w / o.cellW) + 1
  const rows = Math.floor(o.h / o.cellH) + 1
  for (let i = 1; i < cols; i++) out.push(`<line class="bb-grid" x1="${i * o.cellW}" y1="0" x2="${i * o.cellW}" y2="${o.h}"/>`)
  for (let j = 1; j < rows; j++) out.push(`<line class="bb-grid" x1="0" y1="${j * o.cellH}" x2="${o.w}" y2="${j * o.cellH}"/>`)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const fx = (i * o.cellW) / o.w
      if (fx < o.edge && rnd() < 0.55 - fx * 0.7) {
        const wf = fx < o.edge * 0.6 ? 1 : pick([1, 0.6, 0.4, 0.25])
        out.push(
          `<rect class="bb-fill" x="${i * o.cellW + 2}" y="${j * o.cellH + 2}" width="${((o.cellW - 4) * wf).toFixed(1)}" height="${o.cellH - 4}" opacity="${(0.03 + rnd() * 0.06).toFixed(3)}"/>`,
        )
      }
    }
  }
  for (let k = 0; k < o.particles; k++) {
    const x = o.w * (o.edge - 0.02 + rnd() * (0.98 - o.edge) * rnd())
    const y = rnd() * o.h
    const s = pick([2, 2, 3, 3, 4, 5])
    const dur = 6 + rnd() * 8
    out.push(
      `<rect class="bb-fill bb-drift" style="animation-duration:${dur.toFixed(1)}s;animation-delay:-${(rnd() * dur).toFixed(1)}s" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s}" height="${s}" opacity="${(0.08 + rnd() * 0.22).toFixed(2)}"/>`,
    )
  }
  const sx = Math.round(o.w * (o.edge - 0.03))
  out.push(`<line class="bb-scan" x1="${sx}" y1="0" x2="${sx + 16}" y2="${o.h}"/>`)
  return out.join("")
}
