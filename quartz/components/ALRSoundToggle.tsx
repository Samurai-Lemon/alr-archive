import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ALRSoundToggle: QuartzComponent = () => {
  return (
    <>
      <button
        type="button"
        class="alr-sound-toggle"
        id="alr-sound-toggle"
        aria-label="Toggle archive sounds"
        title="Toggle archive sounds"
      >
        Audio: On
      </button>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              if (window.__ALR_SOUND_TOGGLE_BOUND__) {
                window.__ALR_SYNC_SOUND_TOGGLE__?.();
                return;
              }

              window.__ALR_SOUND_TOGGLE_BOUND__ = true;

              window.__ALR_SYNC_SOUND_TOGGLE__ = () => {
                const btn = document.getElementById("alr-sound-toggle");
                if (!btn) return;

                const saved = localStorage.getItem("alr-sound-enabled");
                const enabled = saved === null ? true : saved === "true";

                btn.textContent = enabled ? "Audio: On" : "Audio: Off";
                btn.setAttribute(
                  "aria-label",
                  enabled ? "Mute archive sounds" : "Enable archive sounds"
                );
                btn.setAttribute(
                  "title",
                  enabled ? "Mute archive sounds" : "Enable archive sounds"
                );
              };

              const sync = window.__ALR_SYNC_SOUND_TOGGLE__;
              sync();

              document.addEventListener("click", (event) => {
                const target = event.target;
                if (!(target instanceof HTMLElement)) return;

                const btn = target.closest("#alr-sound-toggle");
                if (!btn) return;

                const saved = localStorage.getItem("alr-sound-enabled");
                const enabled = saved === null ? true : saved === "true";
                const next = !enabled;

                localStorage.setItem("alr-sound-enabled", String(next));

                if (window.__ALR_SOUND_ENGINE__) {
                  if (next) {
                    window.__ALR_SOUND_ENGINE__.enable();
                  } else {
                    window.__ALR_SOUND_ENGINE__.disable();
                  }
                }

                sync();
              });

              window.addEventListener("pageshow", sync);
              document.addEventListener("nav", sync);
              document.addEventListener("DOMContentLoaded", sync);
            })();
          `,
        }}
      />
    </>
  )
}

ALRSoundToggle.displayName = "ALRSoundToggle"
export default (() => ALRSoundToggle) satisfies QuartzComponentConstructor