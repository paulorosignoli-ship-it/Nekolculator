// Plays the real cat sound recordings shipped in /public/sounds via the Web
// Audio API. Buffers are fetched + decoded once and cached, then played
// through BufferSourceNodes so multiple sounds can overlap cleanly even on
// rapid button presses.

import { CLICK_SOUNDS, ERROR_SOUNDS, PURR_SOUNDS } from "./soundManifest";

function pickRandom<T>(arr: T[]): T | undefined {
  if (!arr.length) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

class CatSoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;
  private buffers = new Map<string, AudioBuffer>();
  private pending = new Map<string, Promise<AudioBuffer | null>>();

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return null;
      this.ctx = new Ctx();
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  isMuted() {
    return this.muted;
  }

  private getBuffer(url: string): Promise<AudioBuffer | null> {
    const cached = this.buffers.get(url);
    if (cached) return Promise.resolve(cached);
    const inFlight = this.pending.get(url);
    if (inFlight) return inFlight;

    const ctx = this.ensureContext();
    if (!ctx) return Promise.resolve(null);

    const promise = fetch(url)
      .then((res) => res.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buf) => {
        this.buffers.set(url, buf);
        this.pending.delete(url);
        return buf;
      })
      .catch(() => {
        this.pending.delete(url);
        return null;
      });

    this.pending.set(url, promise);
    return promise;
  }

  /** Kick off background loading of every sound so playback is instant once it's needed. */
  preloadAll() {
    if (typeof window === "undefined") return;
    [...CLICK_SOUNDS, ...ERROR_SOUNDS, ...PURR_SOUNDS].forEach((url) => {
      this.getBuffer(url);
    });
  }

  private playBuffer(buffer: AudioBuffer, options: { rate?: number; gain?: number; fadeOutTail?: number } = {}) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const { rate = 1, gain = 1, fadeOutTail = 0 } = options;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = rate;

    const gainNode = ctx.createGain();
    const now = ctx.currentTime;
    const duration = buffer.duration / Math.max(rate, 0.01);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(gain, now + Math.min(0.03, duration / 4));
    if (fadeOutTail > 0 && duration > fadeOutTail) {
      gainNode.gain.setValueAtTime(gain, now + duration - fadeOutTail);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    }

    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start(now);
    source.stop(now + duration + 0.05);
  }

  /** A random button-click meow. pitchMultiplier comes from the active theme. */
  playClick(pitchMultiplier = 1) {
    if (this.muted) return;
    const url = pickRandom(CLICK_SOUNDS);
    if (!url) return;
    const jitter = 0.94 + Math.random() * 0.12; // subtle natural variance between presses
    this.getBuffer(url).then((buf) => {
      if (buf) this.playBuffer(buf, { rate: pitchMultiplier * jitter, gain: 0.85 });
    });
  }

  /** A random error sound for an invalid / illogical calculator action. */
  playError(pitchMultiplier = 1) {
    if (this.muted) return;
    const url = pickRandom(ERROR_SOUNDS);
    if (!url) return;
    this.getBuffer(url).then((buf) => {
      if (buf) this.playBuffer(buf, { rate: Math.min(1.1, Math.max(0.9, pitchMultiplier)), gain: 0.9 });
    });
  }

  /** A random ambient purr, meant to play occasionally and unprompted while the app is open. */
  playPurr(pitchMultiplier = 1) {
    if (this.muted) return;
    const url = pickRandom(PURR_SOUNDS);
    if (!url) return;
    const rate = Math.min(1.15, Math.max(0.85, pitchMultiplier));
    this.getBuffer(url).then((buf) => {
      if (buf) this.playBuffer(buf, { rate, gain: 0.5, fadeOutTail: 0.6 });
    });
  }
}

export const catSounds = new CatSoundEngine();
