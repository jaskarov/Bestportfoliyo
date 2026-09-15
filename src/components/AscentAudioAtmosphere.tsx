import { useEffect, useRef } from 'react';

interface AscentAudioAtmosphereProps {
  enabled: boolean;
}

/**
 * Procedural Everest Mountain Wind & Atmospheric Drone Synthesizer.
 * Generates dynamic high-altitude winds via Web Audio API. Modulates with altitude.
 */
export const AscentAudioAtmosphere = ({ enabled }: AscentAudioAtmosphereProps) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (gainRef.current && audioCtxRef.current) {
        // Smooth fade out
        const now = audioCtxRef.current.currentTime;
        gainRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.8);
        if (droneGainRef.current) {
          droneGainRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.8);
        }
      }
      return;
    }

    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = audioCtxRef.current ?? new AudioContextClass();
    audioCtxRef.current = ctx;
    if (ctx.state === 'suspended') void ctx.resume();

    const now = ctx.currentTime;

    // Master Wind Gain Node
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(0.045, now + 1.2);
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    // Pink/White Noise Buffer (2 seconds looped)
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Resonant Bandpass Filter for wind howling
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(360, now);
    filter.Q.setValueAtTime(2.8, now);
    filterRef.current = filter;

    noiseSource.connect(filter);
    filter.connect(masterGain);
    noiseSource.start(now);

    // Sub-bass atmospheric drone (55 Hz low rumble)
    const droneOsc = ctx.createOscillator();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(55, now);

    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.0001, now);
    droneGain.gain.linearRampToValueAtTime(0.025, now + 1.5);
    droneGainRef.current = droneGain;

    droneOsc.connect(droneGain);
    droneGain.connect(ctx.destination);
    droneOsc.start(now);

    // Listen to scroll to modulate wind pitch according to altitude
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      if (filterRef.current && audioCtxRef.current) {
        const targetFreq = 340 + progress * 580; // 340Hz -> 920Hz (thin high-altitude howl)
        filterRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.15);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled]);

  useEffect(
    () => () => {
      if (audioCtxRef.current) void audioCtxRef.current.close();
    },
    [],
  );

  return null;
};
