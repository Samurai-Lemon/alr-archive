import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { BroadcastBanner, BannerProps } from "./Banner"

// Full broadcast banner for content pages that open a section: About and the four Submit pages.
// (The registries, Shop, Grading Terminal and Mods render theirs inside their own components.)
// Channels: 00 About · 01 Echo Registry · 02 Reality Registry · 03 Submit · 04 Shop ·
// 05 Grading Terminal · 06 reading pages · 07 Mods.

const submit = (title: string[], format: string): Omit<BannerProps, "key_"> => ({
  ch: "CH 03",
  eyebrow: "ALR Initiative — Submissions",
  title,
  sub: "Send documentation to Archive Operations for review.",
  status: ["Review queue · Open", `Format · ${format}`, "Cycle 7 · Archive Ops"],
})

export const PAGE_BANNERS: Record<string, Omit<BannerProps, "key_">> = {
  About: {
    ch: "CH 00",
    eyebrow: "Archive of Lost Realities Initiative — Cycle 7",
    title: ["What's Unwritten", "is not empty."],
    sub: "A public overview of the Initiative and the archive.",
    status: ["Reality collapse detected", "RCC-1 — Silent collapse", "Cycle 7 — Archive Operations"],
  },
  "Submit-Echo": submit(["Submit an Echo"], "Echo entry"),
  "Submit-Reality": submit(["Submit a Reality", "Investigation Report"], "Reality report"),
  "Submit-Equipment": submit(["Submit a Device"], "Device entry"),
  "Submit-Organization": submit(["Submit an", "Organization"], "Organization entry"),
}

export const hasPageBanner = (slug: string) => slug in PAGE_BANNERS

const ALRPageBanner: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = String(fileData.slug ?? "")
  const cfg = PAGE_BANNERS[slug]
  if (!cfg) return null
  return <BroadcastBanner key_={slug} {...cfg} />
}

ALRPageBanner.displayName = "ALRPageBanner"
export default (() => ALRPageBanner) satisfies QuartzComponentConstructor
