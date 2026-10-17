/**
 * A small generative soundscape for the manifesto film, built with the Web
 * Audio API so the site ships no audio file and owes nobody a licence.
 *
 * Two layers: a low drone of detuned sines and triangles that slowly breathe
 * against each other, and brown noise pushed through a drifting low-pass
 * filter, which reads as water moving in the dark. Everything is created on
 * the first user gesture, which browsers require before any sound can play.
 */
export type Ambience = {
  /** Ramp the master level (0..1) over `seconds`, optionally after `delay` seconds. */
  fadeTo: (level: number, seconds: number, delay?: number) => void;
  /** Resume after a user gesture, or when the tab becomes visible again. */
  resume: () => Promise<void>;
  suspend: () => Promise<void>;
  dispose: () => void;
};

/** A1, E2, A2, E3, E4: an open fifth, nothing that reads as a melody. */
const VOICES: { freq: number; gain: number; type: OscillatorType }[] = [
  { freq: 55, gain: 0.5, type: "sine" },
  { freq: 82.41, gain: 0.45, type: "triangle" },
  { freq: 110, gain: 0.4, type: "sine" },
  { freq: 164.81, gain: 0.25, type: "triangle" },
  { freq: 329.63, gain: 0.08, type: "sine" },
];

type WindowWithWebkit = Window & { webkitAudioContext?: typeof AudioContext };

export function createAmbience(): Ambience | null {
  if (typeof window === "undefined") return null;
  const Ctx = window.AudioContext ?? (window as WindowWithWebkit).webkitAudioContext;
  if (!Ctx) return null;

  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // --- drone -----------------------------------------------------------
  const drone = ctx.createGain();
  drone.gain.value = 0.16;
  drone.connect(master);
  VOICES.forEach((v, i) => {
    const osc = ctx.createOscillator();
    osc.type = v.type;
    osc.frequency.value = v.freq;
    osc.detune.value = (i - 2) * 4;
    const voice = ctx.createGain();
    voice.gain.value = v.gain;
    // A slow, slightly different tremolo per voice so the chord breathes.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.04 + i * 0.021;
    const depth = ctx.createGain();
    depth.gain.value = v.gain * 0.35;
    lfo.connect(depth).connect(voice.gain);
    osc.connect(voice).connect(drone);
    osc.start();
    lfo.start();
  });

  // --- water -----------------------------------------------------------
  const seconds = 6;
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  // Tilt the walk so it ends where it began: no click at the loop point.
  const drift = data[data.length - 1] - data[0];
  for (let i = 0; i < data.length; i++) data[i] -= (drift * i) / (data.length - 1);

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 360;
  lowpass.Q.value = 0.8;
  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 40;
  // The cutoff drifts up and down over about fifteen seconds, like a swell.
  const sweep = ctx.createOscillator();
  sweep.frequency.value = 0.065;
  const sweepDepth = ctx.createGain();
  sweepDepth.gain.value = 200;
  sweep.connect(sweepDepth).connect(lowpass.frequency);
  const water = ctx.createGain();
  water.gain.value = 0.4;
  noise.connect(lowpass).connect(highpass).connect(water).connect(master);
  noise.start();
  sweep.start();

  const fadeTo = (level: number, seconds: number, delay = 0) => {
    const g = master.gain;
    const now = ctx.currentTime;
    if (typeof g.cancelAndHoldAtTime === "function") {
      g.cancelAndHoldAtTime(now);
    } else {
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
    }
    g.setValueAtTime(g.value, now + delay);
    g.linearRampToValueAtTime(level, now + delay + seconds);
  };

  return {
    fadeTo,
    resume: () => ctx.resume(),
    suspend: () => ctx.suspend(),
    dispose: () => {
      ctx.close().catch(() => {});
    },
  };
}
