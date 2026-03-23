import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ALRSoundEngine: QuartzComponent = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (() => {
            if (window.__ALR_SOUND_ENGINE_BOUND__) return;
            window.__ALR_SOUND_ENGINE_BOUND__ = true;

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

            const playClick = () => {
              if (!state.enabled || !state.unlocked) return;

              try {
                const audio = new Audio(CLICK_SOUND);
                audio.volume = 0.08;
                audio.play().catch(() => {});
              } catch {}
            };

            const unlockAudio = () => {
              if (state.unlocked) return;
              state.unlocked = true;
            };

            const clickHandler = (event) => {
              const target = event.target;
              if (!(target instanceof HTMLElement)) return;

              const interactive = target.closest(
                "a, button, .alr-card, .alr-stat, .alr-person"
              );

              if (!interactive) return;
              if (interactive.classList.contains("alr-sound-toggle")) return;

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
              toggle,
              enable,
              disable,
              isEnabled: () => state.enabled,
            };

            document.addEventListener("pointerdown", unlockAudio);
            document.addEventListener("keydown", unlockAudio);
            document.addEventListener("click", clickHandler);

            emitState();
          })();
        `,
      }}
    />
  )
}

ALRSoundEngine.displayName = "ALRSoundEngine"
export default (() => ALRSoundEngine) satisfies QuartzComponentConstructor