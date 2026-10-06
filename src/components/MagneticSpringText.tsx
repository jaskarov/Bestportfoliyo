import React, { useRef, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticSpringTextProps {
  text: string;
  className?: string;
}

export const MagneticSpringText: React.FC<MagneticSpringTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring dynamics for magnetic trail
  const springConfig = { damping: 14, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Chromatic split layers
  const redX = useTransform(smoothX, (v) => v * 1.35);
  const redY = useTransform(smoothY, (v) => v * 1.35);

  const cyanX = useTransform(smoothX, (v) => -v * 1.2);
  const cyanY = useTransform(smoothY, (v) => -v * 1.2);

  const handleMouseMove = (e: MouseEvent<HTMLHeadingElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Displacement offset limited to max range
    const maxOffset = 26;
    const dx = Math.max(-maxOffset, Math.min(maxOffset, (e.clientX - centerX) * 0.22));
    const dy = Math.max(-maxOffset, Math.min(maxOffset, (e.clientY - centerY) * 0.28));

    mouseX.set(dx);
    mouseY.set(dy);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block cursor-pointer select-none py-1 ${className}`}
    >
      {/* Cyan Chromatic Aberration Layer */}
      {isHovered && (
        <motion.span
          aria-hidden="true"
          style={{ x: cyanX, y: cyanY }}
          className="absolute inset-0 block select-none pointer-events-none text-[#00F0FF]/40 blur-[1px] mix-blend-screen"
        >
          {text}
        </motion.span>
      )}

      {/* Red / Gold Chromatic Aberration Layer */}
      {isHovered && (
        <motion.span
          aria-hidden="true"
          style={{ x: redX, y: redY }}
          className="absolute inset-0 block select-none pointer-events-none text-[#D4AF37]/50 blur-[1px] mix-blend-screen"
        >
          {text}
        </motion.span>
      )}

      {/* Primary Spring Heading */}
      <motion.span
        style={{ x: smoothX, y: smoothY }}
        className="relative block"
      >
        {text}
      </motion.span>
    </div>
  );
};
