import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface NeonBorderButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'gold' | 'cyan';
  className?: string;
}

export const NeonBorderButton: React.FC<NeonBorderButtonProps> = ({
  children,
  variant = 'gold',
  className = '',
  onClick,
  ...props
}) => {
  const isGold = variant === 'gold';
  const glowColor = isGold ? '#D4AF37' : '#00F0FF';
  const bgGradient = isGold
    ? 'from-[#D4AF37] to-[#F3E5AB]'
    : 'from-[#00F0FF] to-cyan-300';

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full p-[1.5px] transition-all cursor-pointer ${className}`}
      {...props}
    >
      {/* 360-degree Rotating Neon Laser Border Beam */}
      <span
        className="absolute inset-[-100%] animate-[spin_3.5s_linear_infinite] opacity-90 group-hover:opacity-100 transition-opacity"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 320deg, ${glowColor} 360deg)`,
        }}
      />

      {/* Tactile Liquid Glass Inner Button */}
      <span
        className="relative flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide backdrop-blur-xl transition-all"
        style={{
          backgroundColor: '#0a0d14',
          color: isGold ? '#FFEBB0' : '#E0F7FA',
          boxShadow: `inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 0 25px ${glowColor}25`,
        }}
      >
        {children}
      </span>
    </motion.button>
  );
};
