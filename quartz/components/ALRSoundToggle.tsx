import { useEffect, useState } from "preact/hooks"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ALRSoundToggle: QuartzComponent = () => {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("alr-sound-enabled")
    setEnabled(saved === null ? true : saved === "true")

    const onStateChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ enabled: boolean }>
      setEnabled(!!customEvent.detail?.enabled)
    }

    window.addEventListener("alr-sound-state-change", onStateChange)

    return () => {
      window.removeEventListener("alr-sound-state-change", onStateChange)
    }
  }, [])

  const onToggle = () => {
    const next = window.__ALR_SOUND_ENGINE__?.toggle()
    if (typeof next === "boolean") {
      setEnabled(next)
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