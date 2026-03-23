import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ALRSoundEngine: QuartzComponent = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (() => {
            if (window.__ALR_SOUND_ENGINE_INITIALIZED__) return;
            window.__ALR_SOUND_ENGINE_INITIALIZED__ = true;

            const CLICK_SOUND = "/sounds/click.wav";

            const state = {
              enabled: (() => {
                const saved = localStorage.getItem("alr-sound-enabled");
                return saved === null ? true : saved === "true";
              })(),
              unlocked: false,
            };

            const emitState = () => {
              window.dispatchEvent(
                new CustomEvent("alr-sound-state-change", {
                  detail: { enabled: state.enabled },
                })
              );
            };

            const clickPool = Array.from({ length: 6 }, () => {
              const audio = new Audio(CLICK_SOUND);
              audio.volume = 0.08;
              audio.preload = "auto";
              return audio;
            });

            let clickIndex = 0;

            const playClick = () => {
              if (!state.enabled || !state.unlocked) return;

              try {
                const audio = clickPool[clickIndex];
                clickIndex = (clickIndex + 1) % clickPool.length;

                audio.pause();
                audio.currentTime = 0;
                audio.volume = 0.08;
                audio.play().catch(() => {});
              } catch {}
            };

            const unlockAudio = () => {
              state.unlocked = true;
            };

            const clickHandler = (event) => {
              const target = event.target;
              if (!(target instanceof HTMLElement)) return;

              const interactive = target.closest("a, button, input, summary, [role='button']");
              if (!interactive) return;

              playClick();
            };

            const enable = () => {
              state.enabled = true;
              localStorage.setItem("alr-sound-enabled", "true");
              emitState();
            };

            const disable = () => {
              state.enabled = false;
              localStorage.setItem("alr-sound-enabled", "false");
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

            window.__ALR_SOUND_ENGINE__ = {
              play: () => playClick(),
              toggle,
              enable,
              disable,
              isEnabled: () => state.enabled,
            };

            document.addEventListener("pointerdown", unlockAudio, true);
            document.addEventListener("keydown", unlockAudio, true);
            document.addEventListener("click", clickHandler, true);
            document.addEventListener("nav", emitState);

            emitState();
          })();
        `,
      }}
    />
  )
}

ALRSoundEngine.displayName = "ALRSoundEngine"
export default (() => ALRSoundEngine) satisfies QuartzComponentConstructor