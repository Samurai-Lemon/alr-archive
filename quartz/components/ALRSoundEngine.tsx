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

            const playClick = () => {
              if (!state.enabled || !state.unlocked) return;

              try {
                const audio = new Audio(CLICK_SOUND);
                audio.volume = 0.08;
                audio.play().catch(() => {});
              } catch {}
            };

            const clickHandler = (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const interactive = target.closest("a, button");
  if (!interactive) return;

  if (interactive.classList.contains("alr-sound-toggle")) return;

  // only play for internal links
  if (interactive.tagName.toLowerCase() === "a") {
    const href = interactive.getAttribute("href") || "";

    const isInternal =
      href.startsWith("/") ||
      href.startsWith("./") ||
      href.startsWith("../") ||
      (!href.startsWith("http") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        !href.startsWith("#"));

    if (!isInternal) return;
  }

  playClick();
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