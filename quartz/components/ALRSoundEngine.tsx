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
            const AMBIENT_SOUND = "/sounds/ambient_loop.wav";

            const state = {
              enabled: (() => {
                const saved = localStorage.getItem("alr-sound-enabled");
                return saved === null ? true : saved === "true";
              })(),
              unlocked: false,
              audioContext: null,
              clickBuffer: null,
              ambientBuffer: null,
              ambientSource: null,
              ambientGain: null,
              clickBufferPromise: null,
              ambientBufferPromise: null,
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

            const loadBuffer = async (url) => {
              const ctx = getAudioContext();
              if (!ctx) return null;

              const response = await fetch(url);
              const arrayBuffer = await response.arrayBuffer();
              return await ctx.decodeAudioData(arrayBuffer.slice(0));
            };

            const loadClickBuffer = () => {
              if (state.clickBuffer) return Promise.resolve(state.clickBuffer);
              if (!state.clickBufferPromise) {
                state.clickBufferPromise = loadBuffer(CLICK_SOUND)
                  .then((buf) => {
                    state.clickBuffer = buf;
                    return buf;
                  })
                  .catch((err) => {
                    console.error("Failed to load click sound:", err);
                    return null;
                  })
                  .finally(() => {
                    state.clickBufferPromise = null;
                  });
              }
              return state.clickBufferPromise;
            };

            const loadAmbientBuffer = () => {
              if (state.ambientBuffer) return Promise.resolve(state.ambientBuffer);
              if (!state.ambientBufferPromise) {
                state.ambientBufferPromise = loadBuffer(AMBIENT_SOUND)
                  .then((buf) => {
                    state.ambientBuffer = buf;
                    return buf;
                  })
                  .catch((err) => {
                    console.error("Failed to load ambient sound:", err);
                    return null;
                  })
                  .finally(() => {
                    state.ambientBufferPromise = null;
                  });
              }
              return state.ambientBufferPromise;
            };

            const stopAmbient = () => {
              try {
                if (state.ambientSource) {
                  state.ambientSource.stop();
                  state.ambientSource.disconnect();
                }
              } catch {}

              try {
                if (state.ambientGain) {
                  state.ambientGain.disconnect();
                }
              } catch {}

              state.ambientSource = null;
              state.ambientGain = null;
            };

            const startAmbient = async () => {
              if (!state.enabled || !state.unlocked) return;

              const ctx = getAudioContext();
              if (!ctx) return;

              if (ctx.state === "suspended") {
                try {
                  await ctx.resume();
                } catch {}
              }

              if (!state.ambientBuffer) {
                await loadAmbientBuffer();
              }

              if (!state.ambientBuffer) return;
              if (state.ambientSource) return;

              try {
                const source = ctx.createBufferSource();
                source.buffer = state.ambientBuffer;
                source.loop = true;

                const gain = ctx.createGain();
                gain.gain.value = 0.020;

                source.connect(gain);
                gain.connect(ctx.destination);

                source.start(0);

                state.ambientSource = source;
                state.ambientGain = gain;
              } catch (err) {
                console.error("Failed to start ambient sound:", err);
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
                source.playbackRate.value = 0.96 + Math.random() * 0.08;

                const gain = ctx.createGain();
                gain.gain.value = 0.16 + Math.random() * 0.04;

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
              loadAmbientBuffer();

              if (state.enabled) {
                startAmbient();
              }
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

              if (state.unlocked) {
                startAmbient();
              }
            };

            const disable = () => {
              state.enabled = false;
              localStorage.setItem("alr-sound-enabled", "false");
              stopAmbient();
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

            const handleVisibility = () => {
              if (document.visibilityState === "hidden") {
                stopAmbient();
              } else if (state.enabled && state.unlocked) {
                startAmbient();
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
            document.addEventListener("visibilitychange", handleVisibility);
            document.addEventListener("nav", () => {
              emitState();
              if (state.enabled && state.unlocked) {
                startAmbient();
              }
            });

            emitState();
          })();
        `,
      }}
    />
  )
}

ALRSoundEngine.displayName = "ALRSoundEngine"
export default (() => ALRSoundEngine) satisfies QuartzComponentConstructor