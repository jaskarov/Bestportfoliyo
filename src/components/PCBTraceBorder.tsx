import React from 'react';

interface PCBTraceBorderProps {
  className?: string;
  color?: string; // laser pulse color (default: #00F0FF)
  children?: React.ReactNode;
}

export const PCBTraceBorder: React.FC<PCBTraceBorderProps> = ({
  className = '',
  color = '#00F0FF',
  children,
}) => {
  return (
    <div className={`relative p-[1px] rounded-3xl group overflow-hidden ${className}`}>
      {/* Laser trace beam running around the perimeter */}
      <div
        className="absolute inset-[-100%] rounded-full animate-spin pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          animationDuration: '6s',
          background: `conic-gradient(from 0deg, transparent 0deg, ${color} 40deg, #D4AF37 80deg, transparent 120deg)`,
          filter: 'blur(3px)',
        }}
      />

      {/* Subtle secondary reverse beam */}
      <div
        className="absolute inset-[-100%] rounded-full animate-spin pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          animationDuration: '10s',
          animationDirection: 'reverse',
          background: `conic-gradient(from 180deg, transparent 0deg, #8B5CF6 30deg, transparent 90deg)`,
          filter: 'blur(4px)',
        }}
      />

      {/* Inner surface background to clip inner content */}
      <div className="relative rounded-[calc(1.5rem-1px)] bg-[#0D0D0F]/90 backdrop-blur-xl h-full w-full border border-white/[0.06]">
        {/* Micro PCB corner vias */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00F0FF] transition-colors shadow-[0_0_6px_#00F0FF]" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#D4AF37] transition-colors shadow-[0_0_6px_#D4AF37]" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#D4AF37] transition-colors shadow-[0_0_6px_#D4AF37]" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00F0FF] transition-colors shadow-[0_0_6px_#00F0FF]" />

        {children}
      </div>
    </div>
  );
};
