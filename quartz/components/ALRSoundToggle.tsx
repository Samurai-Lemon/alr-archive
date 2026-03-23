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
              const syncLabel = () => {
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

              const bindToggle = () => {
                const btn = document.getElementById("alr-sound-toggle");
                if (!btn || btn.dataset.bound === "true") return;

                btn.dataset.bound = "true";
                syncLabel();

                btn.addEventListener("click", () => {
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

                  syncLabel();
                });
              };

              bindToggle();
              document.addEventListener("nav", bindToggle);
              document.addEventListener("DOMContentLoaded", bindToggle);
            })();
          `,
        }}
      />
    </>
  )
}

ALRSoundToggle.displayName = "ALRSoundToggle"
export default (() => ALRSoundToggle) satisfies QuartzComponentConstructor