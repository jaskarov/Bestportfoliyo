import { useEffect, useRef } from 'react';

export type SoundKind = 'click' | 'ceramic' | 'open' | 'success' | 'harmonic' | 'hover';

interface UISoundEngineProps {
  enabled: boolean;
}

/**
 * 2026+ Precision Synthesized Sound Engine (Teenage Engineering & Linear inspired)
 * Generates tactile micro-acoustic feedback purely via Web Audio API. Zero external audio assets.
 */
export const UISoundEngine = ({ enabled }: UISoundEngineProps) => {
  const contextRef = useRef<AudioContext | null>(null);
  const lastHoverTime = useRef<number>(0);

  useEffect(() => {
    const getContext = (): AudioContext | null => {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return null;

      const context = contextRef.current ?? new AudioContextClass();
      contextRef.current = context;
      if (context.state === 'suspended') void context.resume();
      return context;
    };

    const play = (kind: SoundKind) => {
      if (!enabled) return;
      const context = getContext();
      if (!context) return;

      const now = context.currentTime;

      if (kind === 'ceramic' || kind === 'click') {
        // Teenage Engineering Ceramic Micro-Snap: ultra-fast transient
        const master = context.createGain();
        master.gain.setValueAtTime(0.0001, now);
        master.gain.exponentialRampToValueAtTime(0.045, now + 0.003);
        master.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
        master.connect(context.destination);

        const osc = context.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(kind === 'ceramic' ? 2400 : 920, now);
        osc.frequency.exponentialRampToValueAtTime(kind === 'ceramic' ? 3600 : 1400, now + 0.02);
        osc.connect(master);
        osc.start(now);
        osc.stop(now + 0.038);

        // Low body impulse
        const body = context.createOscillator();
        body.type = 'triangle';
        body.frequency.setValueAtTime(160, now);
        body.frequency.exponentialRampToValueAtTime(60, now + 0.025);
        const bodyGain = context.createGain();
        bodyGain.gain.setValueAtTime(0.03, now);
        bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
        body.connect(bodyGain);
        bodyGain.connect(master);
        body.start(now);
        body.stop(now + 0.032);
      } else if (kind === 'hover') {
        // Sub-perceptual micro tick
        const nowMs = performance.now();
        if (nowMs - lastHoverTime.current < 45) return; // Debounce hover ticks
        lastHoverTime.current = nowMs;

        const master = context.createGain();
        master.gain.setValueAtTime(0.0001, now);
        master.gain.exponentialRampToValueAtTime(0.012, now + 0.002);
        master.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
        master.connect(context.destination);

        const osc = context.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2800, now);
        osc.connect(master);
        osc.start(now);
        osc.stop(now + 0.018);
      } else if (kind === 'harmonic' || kind === 'success') {
        // 432Hz Lush Triad Harmonic Chime
        const master = context.createGain();
        master.gain.setValueAtTime(0.0001, now);
        master.gain.exponentialRampToValueAtTime(0.04, now + 0.01);
        master.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        master.connect(context.destination);

        // Frequencies: 432Hz (Root), 540Hz (Major 3rd), 648Hz (5th)
        [432, 540, 648].forEach((freq, idx) => {
          const osc = context.createOscillator();
          const gain = context.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.03);
          gain.gain.setValueAtTime(0.025, now + idx * 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
          osc.connect(gain);
          gain.connect(master);
          osc.start(now + idx * 0.03);
          osc.stop(now + 0.58);
        });
      } else if (kind === 'open') {
        const master = context.createGain();
        master.gain.setValueAtTime(0.0001, now);
        master.gain.exponentialRampToValueAtTime(0.04, now + 0.008);
        master.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        master.connect(context.destination);

        const osc = context.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(940, now + 0.16);
        osc.connect(master);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const control = target?.closest<HTMLElement>('button, a, [role="button"]');
      if (!control || control.hasAttribute('disabled') || control.dataset.soundToggle === 'true') return;
      const requested = control.dataset.sound as SoundKind | undefined;
      play(requested ?? 'ceramic');
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const control = target?.closest<HTMLElement>('[data-sound-hover="true"]');
      if (control) {
        play('hover');
      }
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('mouseover', handleMouseOver, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('mouseover', handleMouseOver, true);
    };
  }, [enabled]);

  useEffect(
    () => () => {
      if (contextRef.current) void contextRef.current.close();
    },
    [],
  );

  return null;
};