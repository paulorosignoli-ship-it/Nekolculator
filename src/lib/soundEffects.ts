// Lightweight, dependency-free cat sound synthesis using the Web Audio API.
// Nothing here loads external audio files — every sound is generated on the fly.

class CatSoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;
  private noiseBuffer: AudioBuffer | null = null;

  /** Must be called (or triggered indirectly) from within a user gesture the first time. */
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

  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.noiseBuffer) return this.noiseBuffer;
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  /** A short, playful meow/chirp — randomized pitch, pleasant for rapid button presses. */
  playClick(pitchMultiplier = 1) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const startFreq = (620 + Math.random() * 180) * pitchMultiplier;
    const dipFreq = (380 + Math.random() * 90) * pitchMultiplier;
    const endFreq = (720 + Math.random() * 140) * pitchMultiplier;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const dur = 0.11 + Math.random() * 0.05;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(dipFreq, 40), now + dur * 0.45);
    osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 40), now + dur);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc.start(now);
    osc.stop(now + dur + 0.02);
  }

  /** A low, warning hiss for errors (e.g. divide by zero). */
  playError(pitchMultiplier = 1) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dur = 0.42;

    // Filtered noise = the "hiss" texture
    const noise = ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer(ctx);
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 2200 * Math.min(pitchMultiplier, 1.15);
    bandpass.Q.value = 0.6;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.22, now + 0.03);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    noise.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Low growl tone underneath
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(140 * pitchMultiplier, now);
    osc.frequency.exponentialRampToValueAtTime(70 * pitchMultiplier, now + dur);
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.exponentialRampToValueAtTime(0.1, now + 0.04);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + dur + 0.02);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  }

  /** A gentle purring rumble, played briefly after a successful calculation. */
  playPurr(pitchMultiplier = 1) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dur = 0.85;

    const tone = ctx.createOscillator();
    tone.type = "sine";
    tone.frequency.value = 95 * pitchMultiplier;

    const toneGain = ctx.createGain();
    toneGain.gain.setValueAtTime(0.05, now);

    // LFO to create the "purr" tremolo texture
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 26;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.035;
    lfo.connect(lfoGain);
    lfoGain.connect(toneGain.gain);

    const envelope = ctx.createGain();
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(1, now + 0.15);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    tone.connect(toneGain);
    toneGain.connect(envelope);
    envelope.connect(ctx.destination);

    tone.start(now);
    lfo.start(now);
    tone.stop(now + dur + 0.05);
    lfo.stop(now + dur + 0.05);
  }
}

export const catSounds = new CatSoundEngine();
