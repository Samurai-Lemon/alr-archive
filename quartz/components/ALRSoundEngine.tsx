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
              audioContext: null,
              clickBuffer: null,
              loading: false,
            };

            const emitState = () => {
              window.dispatchEvent(
                new CustomEvent("alr-sound-state-change", {
                  detail: { enabled: state.enabled },
                })
              );
            };

            const getAudioContext = () => {
              if (!state.audioContext) {
                const Ctx = window.AudioContext || window.webkitAudioContext;
                if (!Ctx) return null;
                state.audioContext = new Ctx();
              }
              return state.audioContext;
            };

            const loadClickBuffer = async () => {
              if (state.clickBuffer || state.loading) return;
              state.loading = true;

              try {
                const ctx = getAudioContext();
                if (!ctx) return;

                const response = await fetch(CLICK_SOUND);
                const arrayBuffer = await response.arrayBuffer();
                state.clickBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
              } catch (err) {
                console.error("Failed to load click sound:", err);
              } finally {
                state.loading = false;
              }
            };

            const playClick = async () => {
              if (!state.enabled || !state.unlocked) return;

              const ctx = getAudioContext();
              if (!ctx) return;

              if (ctx.state === "suspended") {
                try {
                  await ctx.resume();
                } catch {}
              }

              if (!state.clickBuffer) {
                await loadClickBuffer();
              }

              if (!state.clickBuffer) return;

              try {
                const source = ctx.createBufferSource();
                source.buffer = state.clickBuffer;

                // subtle pitch variation
                source.playbackRate.value = 0.96 + Math.random() * 0.08;

                const gain = ctx.createGain();
                gain.gain.value = 0.18;

                source.connect(gain);
                gain.connect(ctx.destination);

                source.start(0);
              } catch (err) {
                console.error("Failed to play click sound:", err);
              }
            };

            const unlockAudio = async () => {
              if (state.unlocked) return;
              state.unlocked = true;

              const ctx = getAudioContext();
              if (ctx && ctx.state === "suspended") {
                try {
                  await ctx.resume();
                } catch {}
              }

              loadClickBuffer();
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