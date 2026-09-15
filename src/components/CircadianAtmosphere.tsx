import React, { useEffect, useState } from 'react';

export type CircadianPhase = 'DAWN' | 'DAY' | 'GOLDEN_HOUR' | 'CYBER_NIGHT';

interface CircadianState {
  timeStr: string;
  phase: CircadianPhase;
  label: string;
  accentColor: string;
  secondaryColor: string;
  ambientOpacity: number;
}

export const CircadianAtmosphere: React.FC<{
  onPhaseChange?: (phase: CircadianPhase) => void;
}> = ({ onPhaseChange }) => {
  const [state, setState] = useState<CircadianState>({
    timeStr: '--:--',
    phase: 'CYBER_NIGHT',
    label: 'Cyber Night',
    accentColor: '#00F0FF',
    secondaryColor: '#8B5CF6',
    ambientOpacity: 0.18,
  });

  useEffect(() => {
    const updateCircadianTime = () => {
      // Get current Tashkent time
      const now = new Date();
      const tashkentTimeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Tashkent',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });

      const [hours] = tashkentTimeStr.split(':').map(Number);

      let phase: CircadianPhase = 'CYBER_NIGHT';
      let label = 'Cyber Night';
      let accent = '#00F0FF';
      let secondary = '#8B5CF6';
      let opacity = 0.22;

      if (hours >= 5 && hours < 8) {
        phase = 'DAWN';
        label = 'Tashkent Dawn';
        accent = '#F472B6'; // Soft rose
        secondary = '#D4AF37'; // Gentle gold
        opacity = 0.15;
      } else if (hours >= 8 && hours < 17) {
        phase = 'DAY';
        label = 'High Noon Gold';
        accent = '#D4AF37'; // Luxury Gold
        secondary = '#00F0FF'; // Crisp Cyan
        opacity = 0.14;
      } else if (hours >= 17 && hours < 21) {
        phase = 'GOLDEN_HOUR';
        label = 'Golden Hour';
        accent = '#F59E0B'; // Deep amber
        secondary = '#EC4899'; // Twilight violet
        opacity = 0.2;
      } else {
        phase = 'CYBER_NIGHT';
        label = 'Cyber Midnight';
        accent = '#00F0FF'; // Electric Cyan
        secondary = '#8B5CF6'; // Neon Violet
        opacity = 0.24;
      }

      setState({
        timeStr: tashkentTimeStr,
        phase,
        label,
        accentColor: accent,
        secondaryColor: secondary,
        ambientOpacity: opacity,
      });

      if (onPhaseChange) {
        onPhaseChange(phase);
      }
    };

    updateCircadianTime();
    const interval = setInterval(updateCircadianTime, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [onPhaseChange]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] transition-all duration-1000 overflow-hidden"
    >
      {/* Top ambient bleed */}
      <div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[120vw] h-[50vh] rounded-full blur-[140px] transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at center, ${state.accentColor}, ${state.secondaryColor} 40%, transparent 70%)`,
          opacity: state.ambientOpacity,
        }}
      />

      {/* Floating subtle side twilight glow */}
      <div
        className="absolute top-1/3 -left-[15%] w-[45vw] h-[60vh] rounded-full blur-[160px] transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${state.secondaryColor} 0%, transparent 65%)`,
          opacity: state.ambientOpacity * 0.7,
        }}
      />
    </div>
  );
};
