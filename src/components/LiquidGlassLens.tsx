import React, { useEffect, useState, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const LiquidGlassLens: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const targetPos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target && (target.closest('button') || target.closest('a') || target.closest('.glass-card'))) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth lerp loop for the floating lens
    const lerp = () => {
      const ease = 0.18;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      setPos({
        x: Math.round(currentPos.current.x),
        y: Math.round(currentPos.current.y),
      });

      rafRef.current = requestAnimationFrame(lerp);
    };

    rafRef.current = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  return (
    <>
      {/* Floating Refractive Optical Lens */}
      {enabled && (
        <div
          aria-hidden="true"
          className="fixed pointer-events-none z-50 rounded-full transition-all duration-300"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: isHoveringInteractive ? '140px' : '110px',
            height: isHoveringInteractive ? '140px' : '110px',
            transform: 'translate(-50%, -50%)',
            backdropFilter: 'blur(2px) contrast(1.15) brightness(1.12)',
            WebkitBackdropFilter: 'blur(2px) contrast(1.15) brightness(1.12)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            boxShadow: `
              inset 0 0 24px rgba(255, 255, 255, 0.2),
              inset 0 2px 6px rgba(212, 175, 55, 0.4),
              0 0 25px rgba(0, 240, 255, 0.25),
              0 14px 40px rgba(0, 0, 0, 0.6)
            `,
          }}
        >
          {/* Internal convex glare ring */}
          <div
            className="absolute inset-[8%] rounded-full pointer-events-none"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.18)',
              background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)',
            }}
          />
          {/* Micro optical center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#00F0FF]/60 shadow-[0_0_8px_#00F0FF]" />
        </div>
      )}

      {/* Luxury HUD Toggle Pill */}
      <div className="fixed bottom-6 left-[205px] sm:left-[225px] z-30 pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => setEnabled((prev) => !prev)}
          data-sound="click"
          title="Toggle 2026 Refractive Liquid Glass Lens"
          className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
            enabled
              ? 'bg-[#00F0FF]/15 border-[#00F0FF]/60 text-[#00F0FF] shadow-[#00F0FF]/20'
              : 'bg-[#0D0D0F]/80 border-white/10 text-white/60 hover:text-white hover:border-[#D4AF37]/50'
          }`}
        >
          {enabled ? (
            <Eye className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
          ) : (
            <EyeOff className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
          )}
          <span className="text-[11px] font-mono font-medium tracking-wider">
            {enabled ? 'OPTIC LENS: ON' : 'OPTIC LENS'}
          </span>
        </button>
      </div>
    </>
  );
};
