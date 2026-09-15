import React, { useEffect, useState, useRef, useCallback } from 'react';

const GLYPHS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>_\\/{}[]—=+*^?#';

interface KineticDecryptionTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  speed?: number; // ms per tick
  delay?: number; // ms before start
  revealDuration?: number; // ticks per char
}

export const KineticDecryptionText: React.FC<KineticDecryptionTextProps> = ({
  text,
  className = '',
  triggerOnHover = true,
  speed = 30,
  delay = 0,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const totalIterations = text.length * 3;

    const tick = () => {
      iteration++;

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          // If iteration has progressed past this character's reveal threshold
          if (index < iteration / 3) {
            return char;
          }
          // Otherwise show random glyph
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (iteration < totalIterations) {
        timerRef.current = setTimeout(tick, speed);
      } else {
        setDisplayText(text);
        setIsAnimating(false);
      }
    };

    if (delay > 0) {
      timerRef.current = setTimeout(tick, delay);
    } else {
      tick();
    }
  }, [text, isAnimating, speed, delay]);

  useEffect(() => {
    // Run on initial mount
    startScramble();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [text]);

  return (
    <span
      className={`inline-block font-mono tracking-tight select-none cursor-default transition-all duration-200 ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover && !isAnimating) {
          startScramble();
        }
      }}
    >
      {displayText}
    </span>
  );
};
