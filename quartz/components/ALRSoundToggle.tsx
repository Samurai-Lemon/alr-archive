import { useEffect, useState } from "preact/hooks"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ALRSoundToggle: QuartzComponent = () => {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("alr-sound-enabled")
    const initial = saved === null ? true : saved === "true"
    setEnabled(initial)

    const onStateChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ enabled: boolean }>
      if (typeof customEvent.detail?.enabled === "boolean") {
        setEnabled(customEvent.detail.enabled)
      }
    }

    window.addEventListener("alr-sound-state-change", onStateChange)

    return () => {
      window.removeEventListener("alr-sound-state-change", onStateChange)
    }
  }, [])

  const onToggle = () => {
    const next = !enabled

    setEnabled(next)
    localStorage.setItem("alr-sound-enabled", String(next))

    if (next) {
      window.__ALR_SOUND_ENGINE__?.enable()
    } else {
      window.__ALR_SOUND_ENGINE__?.disable()
    }
  }

  return (
    <button
      type="button"
      class="alr-sound-toggle"
      onClick={onToggle}
      aria-label={enabled ? "Mute archive sounds" : "Enable archive sounds"}
      title={enabled ? "Mute archive sounds" : "Enable archive sounds"}
    >
      {enabled ? "Audio: On" : "Audio: Off"}
    </button>
  )
}

ALRSoundToggle.displayName = "ALRSoundToggle"
export default (() => ALRSoundToggle) satisfies QuartzComponentConstructor