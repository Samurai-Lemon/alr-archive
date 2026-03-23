import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ALRSoundEngine: QuartzComponent = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (() => {
            const setupEngine = () => {
              if (window.__ALR_SOUND_ENGINE_BOUND__) return;
              window.__ALR_SOUND_ENGINE_BOUND__ = true;

              const SOUNDS = {
                click: "/sounds/click.wav",
                enter: "/sounds/reverse_echo.wav",
                ambient: "/sounds/radio_static.wav",
              };

              const DEFAULT_VOLUMES = {
                click: 0.08,
                enter: 0.06,
                ambient: 0.025,
              };

              const state = {
                enabled: (() => {
                  const saved = localStorage.getItem("alr-sound-enabled");
                  return saved === null ? true : saved === "true";
                })(),
                unlocked: false,
                ambientTimer: null,
              };

              const emitState = () => {
                window.dispatchEvent(
                  new CustomEvent("alr-sound-state-change", {
                    detail: { enabled: state.enabled },
                  })
                );
              };

              const createAudio = (src, volume) => {
                const audio = new Audio(src);
                audio.volume = Math.max(0, Math.min(1, volume));
                audio.preload = "auto";
                return audio;
              };

              const play = (name, volume) => {
                if (!state.enabled || !state.unlocked) return;
                const src = SOUNDS[name];
                if (!src) return;

                try {
                  const audio = createAudio(src, volume ?? DEFAULT_VOLUMES[name]);
                  audio.play().catch(() => {});
                } catch {}
              };

              const stopAmbientLoop = () => {
                if (state.ambientTimer != null) {
                  clearTimeout(state.ambientTimer);
                  state.ambientTimer = null;
                }
              };

              const scheduleAmbient = () => {
                if (!state.enabled || !state.unlocked) return;

                const delay = 30000 + Math.random() * 45000;

                state.ambientTimer = window.setTimeout(() => {
                  if (document.visibilityState === "visible" && state.enabled && state.unlocked) {
                    if (Math.random() < 0.4) {
                      play("ambient", 0.02 + Math.random() * 0.02);
                    }
                  }
                  scheduleAmbient();
                }, delay);
              };

              const startAmbientLoop = () => {
                stopAmbientLoop();
                if (state.enabled && state.unlocked) {
                  scheduleAmbient();
                }
              };

              const enable = () => {
                state.enabled = true;
                localStorage.setItem("alr-sound-enabled", "true");
                emitState();
                if (state.unlocked) startAmbientLoop();
              };

              const disable = () => {
                state.enabled = false;
                localStorage.setItem("alr-sound-enabled", "false");
                stopAmbientLoop();
                emitState();
              };

              const toggle = () => {
                if (state.enabled) {
                  disable();
                  return false;
                } else {
                  enable();
                  return true;
                }
              };

              const unlockAudio = () => {
                if (state.unlocked) return;
                state.unlocked = true;

                if (state.enabled) {
                  setTimeout(() => play("enter", 0.05), 80);
                  startAmbientLoop();
                }
              };

              const clickHandler = (event) => {
                const target = event.target;
                if (!(target instanceof HTMLElement)) return;

                const interactive = target.closest(
                  "a, button, .alr-card, .alr-stat, .alr-person"
                );

                if (!interactive) return;
                if (interactive.classList.contains("alr-sound-toggle")) return;

                play("click");
              };

              const onVisibilityChange = () => {
                if (document.visibilityState !== "visible") {
                  stopAmbientLoop();
                } else if (state.enabled && state.unlocked) {
                  startAmbientLoop();
                }
              };

              const onNav = () => {
                emitState();
                if (state.enabled && state.unlocked) {
                  setTimeout(() => play("enter", 0.04), 120);
                }
              };

              window.__ALR_SOUND_ENGINE__ = {
                play,
                toggle,
                enable,
                disable,
                isEnabled: () => state.enabled,
              };

              document.addEventListener("pointerdown", unlockAudio);
              document.addEventListener("keydown", unlockAudio);
              document.addEventListener("click", clickHandler);
              document.addEventListener("visibilitychange", onVisibilityChange);
              document.addEventListener("nav", onNav);

              emitState();
            };

            setupEngine();
            document.addEventListener("DOMContentLoaded", setupEngine);
            document.addEventListener("nav", setupEngine);
          })();
        `,
      }}
    />
  )
}

ALRSoundEngine.displayName = "ALRSoundEngine"
export default (() => ALRSoundEngine) satisfies QuartzComponentConstructor