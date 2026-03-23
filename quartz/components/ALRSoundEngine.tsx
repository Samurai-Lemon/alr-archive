import { useEffect, useRef } from "preact/hooks"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

type SoundMap = {
  hover: string
  click: string
  enter: string
  ambient: string
}

type SoundEngineState = {
  enabled: boolean
  unlocked: boolean
  ambientTimer: number | null
}

declare global {
  interface Window {
    __ALR_SOUND_ENGINE__?: {
      play: (name: keyof SoundMap, volume?: number) => void
      toggle: () => boolean
      enable: () => void
      disable: () => void
      isEnabled: () => boolean
    }
    __ALR_SOUND_STATE__?: SoundEngineState
  }
}

const SOUNDS: SoundMap = {
  hover: "/sounds/digital_blips.wav",
  click: "/sounds/click.wav",
  enter: "/sounds/reverse_echo.wav",
  ambient: "/sounds/radio_static.wav",
}

const DEFAULT_VOLUMES: Record<keyof SoundMap, number> = {
  hover: 0.06,
  click: 0.12,
  enter: 0.09,
  ambient: 0.045,
}

function createAudio(src: string, volume: number) {
  const audio = new Audio(src)
  audio.volume = Math.max(0, Math.min(1, volume))
  audio.preload = "auto"
  return audio
}

const ALRSoundEngine: QuartzComponent = () => {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    if (!window.__ALR_SOUND_STATE__) {
      const saved = localStorage.getItem("alr-sound-enabled")
      window.__ALR_SOUND_STATE__ = {
        enabled: saved === null ? true : saved === "true",
        unlocked: false,
        ambientTimer: null,
      }
    }

    const state = window.__ALR_SOUND_STATE__

    const unlockAudio = () => {
      if (!state) return
      state.unlocked = true
      document.removeEventListener("pointerdown", unlockAudio)
      document.removeEventListener("keydown", unlockAudio)
      startAmbientLoop()
    }

    const play = (name: keyof SoundMap, volume?: number) => {
      if (!state?.enabled || !state.unlocked) return

      const src = SOUNDS[name]
      const finalVolume = volume ?? DEFAULT_VOLUMES[name]

      try {
        const audio = createAudio(src, finalVolume)
        void audio.play().catch(() => {})
      } catch {
        // ignore audio failures
      }
    }

    const stopAmbientLoop = () => {
      if (state?.ambientTimer != null) {
        window.clearTimeout(state.ambientTimer)
        state.ambientTimer = null
      }
    }

    const scheduleAmbient = () => {
      if (!state?.enabled || !state.unlocked) return

      const delay = 25000 + Math.random() * 35000

      state.ambientTimer = window.setTimeout(() => {
        if (document.visibilityState === "visible" && Math.random() < 0.45) {
          play("ambient", 0.035 + Math.random() * 0.03)
        }
        scheduleAmbient()
      }, delay)
    }

    const startAmbientLoop = () => {
      stopAmbientLoop()
      scheduleAmbient()
    }

    const enable = () => {
      if (!state) return
      state.enabled = true
      localStorage.setItem("alr-sound-enabled", "true")
      if (state.unlocked) startAmbientLoop()
    }

    const disable = () => {
      if (!state) return
      state.enabled = false
      localStorage.setItem("alr-sound-enabled", "false")
      stopAmbientLoop()
    }

    const toggle = () => {
      if (!state) return false
      if (state.enabled) disable()
      else enable()
      return state.enabled
    }

    window.__ALR_SOUND_ENGINE__ = {
      play,
      toggle,
      enable,
      disable,
      isEnabled: () => !!window.__ALR_SOUND_STATE__?.enabled,
    }

    document.addEventListener("pointerdown", unlockAudio, { once: true })
    document.addEventListener("keydown", unlockAudio, { once: true })

    const onVisibilityChange = () => {
      if (!state) return
      if (document.visibilityState !== "visible") {
        stopAmbientLoop()
      } else if (state.enabled && state.unlocked) {
        startAmbientLoop()
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange)

    const hoverHandler = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest(
        'a, button, .alr-card, .alr-stat, .alr-person, .alr-notice-row'
      )

      if (!interactive) return

      const now = Date.now()
      const last = Number((interactive as HTMLElement).dataset.alrHoverPlayedAt ?? "0")
      if (now - last < 700) return

      ;(interactive as HTMLElement).dataset.alrHoverPlayedAt = String(now)
      play("hover")
    }

    const clickHandler = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest('a, button, .alr-card, .alr-stat, .alr-person')
      if (!interactive) return

      play("click")
    }

    document.addEventListener("mouseover", hoverHandler)
    document.addEventListener("click", clickHandler)

    if (state.enabled && state.unlocked) {
      startAmbientLoop()
    }

    return () => {
      stopAmbientLoop()
      document.removeEventListener("pointerdown", unlockAudio)
      document.removeEventListener("keydown", unlockAudio)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      document.removeEventListener("mouseover", hoverHandler)
      document.removeEventListener("click", clickHandler)
    }
  }, [])

  return null
}

ALRSoundEngine.displayName = "ALRSoundEngine"
export default (() => ALRSoundEngine) satisfies QuartzComponentConstructor