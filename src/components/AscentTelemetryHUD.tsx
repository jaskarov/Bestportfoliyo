import React, { useEffect, useRef } from 'react';
import { Compass, Wind, Mountain, Navigation2 } from 'lucide-react';

export const AscentTelemetryHUD: React.FC<{
  audioActive: boolean;
  onToggleAudio: () => void;
}> = ({ audioActive, onToggleAudio }) => {
  const altRef = useRef<HTMLSpanElement | null>(null);
  const pressureRef = useRef<HTMLDivElement | null>(null);
  const percentRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLSpanElement | null>(null);
  const spineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const update = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const altitude = Math.round(2860 + progress * (8848 - 2860));
      const pressure = Math.round(1013 - progress * (1013 - 337));
      const percent = Math.round(progress * 100);

      let stage = 'STAGE 01: LUKLA VALLEY // RUNWAY';
      if (progress >= 0.90) {
        stage = 'STAGE 05: THE SUMMIT // ENTERPRISE ARCHITECT';
      } else if (progress >= 0.70) {
        stage = 'STAGE 04: SOUTH COL // MULTI-AGENT SWARMS';
      } else if (progress >= 0.45) {
        stage = 'STAGE 03: KHUMBU RIDGE // FINTECH & SECURITY';
      } else if (progress >= 0.20) {
        stage = 'STAGE 02: BASE CAMP // FULL-STACK SAAS CORE';
      }

      if (altRef.current) altRef.current.textContent = `${altitude.toLocaleString()} M`;
      if (pressureRef.current) pressureRef.current.textContent = `${pressure} hPa`;
      if (percentRef.current) percentRef.current.textContent = `${percent}%`;
      if (stageRef.current) stageRef.current.textContent = stage;
      if (spineRef.current) spineRef.current.style.height = `${percent}%`;

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Top-Right Technical Expedition Badge (Altitude & Telemetry) */}
      <div className="fixed top-20 right-6 z-40 hidden md:flex flex-col items-end gap-1 pointer-events-none select-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D0D0F]/85 backdrop-blur-md border border-white/10 shadow-xl">
          {/* Compass Icon */}
          <Compass className="w-3.5 h-3.5 text-[#00F0FF] animate-spin" style={{ animationDuration: '18s' }} />

          {/* Altitude readout */}
          <div className="font-mono text-xs tracking-wider flex items-center gap-1.5">
            <span className="text-white/40">ALT:</span>
            <span ref={altRef} className="text-[#D4AF37] font-bold text-sm">
              2,860 M
            </span>
          </div>

          <span className="text-white/20">|</span>

          {/* Barometric Pressure */}
          <div ref={pressureRef} className="font-mono text-[10px] text-white/50 tracking-wider">
            1013 hPa
          </div>

          <span className="text-white/20">|</span>

          {/* Elevation progress */}
          <div ref={percentRef} className="font-mono text-[10px] text-[#00F0FF] font-semibold">
            0%
          </div>
        </div>

        {/* Current Expedition Stage Label */}
        <div className="font-mono text-[9px] tracking-widest text-white/40 uppercase pr-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span ref={stageRef}>STAGE 01: LUKLA VALLEY // RUNWAY</span>
        </div>
      </div>

      {/* Left-Edge Expedition Elevation Ruler Track (Subtle Everest Spine) */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 pointer-events-none select-none">
        <div className="flex flex-col items-center gap-1">
          <Mountain className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-mono text-[8px] text-white/30 tracking-widest">8848M</span>
        </div>

        {/* Vertical Progress Spine */}
        <div className="w-[2px] h-36 bg-white/10 rounded-full relative overflow-hidden">
          <div
            ref={spineRef}
            className="absolute bottom-0 left-0 right-0 rounded-full bg-gradient-to-t from-[#00F0FF] via-[#D4AF37] to-white transition-all duration-75"
            style={{ height: '0%' }}
          />
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[8px] text-white/30 tracking-widest">2860M</span>
          <Navigation2 className="w-3.5 h-3.5 text-[#00F0FF]" />
        </div>
      </div>

      {/* Floating Mountain Wind Sound Controller (Bottom Left HUD) */}
      <div className="fixed bottom-6 left-[350px] sm:left-[365px] z-30 pointer-events-auto hidden sm:flex items-center gap-2">
        <button
          onClick={onToggleAudio}
          data-sound="click"
          title="Toggle Everest Mountain Wind Atmosphere"
          className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
            audioActive
              ? 'bg-[#D4AF37]/15 border-[#D4AF37]/60 text-[#D4AF37] shadow-[#D4AF37]/20'
              : 'bg-[#0D0D0F]/80 border-white/10 text-white/60 hover:text-white hover:border-[#D4AF37]/50'
          }`}
        >
          <Wind className={`w-3.5 h-3.5 ${audioActive ? 'text-[#D4AF37] animate-pulse' : 'text-white/40'}`} />
          <span className="text-[11px] font-mono font-medium tracking-wider">
            {audioActive ? 'WIND: 8,848M' : 'WIND FX'}
          </span>
        </button>
      </div>
    </>
  );
};
