import React, { useRef, useState, useCallback } from 'react';

interface SpatialTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default: 14)
  glareOpacity?: number; // spotlight glare opacity
  holographic?: boolean; // enable iridescent foil shimmer
  onClick?: () => void;
  depthScale?: number; // scale on hover
}

export const SpatialTiltCard: React.FC<SpatialTiltCardProps> = ({
  children,
  className = '',
  maxTilt = 12,
  glareOpacity = 0.16,
  holographic = true,
  onClick,
  depthScale = 1.02,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [holoAngle, setHoloAngle] = useState(135);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-maxTilt to +maxTilt)
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      // Calculate glare percentage
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      // Calculate holographic angle
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);

      setTransform({
        rotateX,
        rotateY,
        scale: depthScale,
      });

      setGlarePos({
        x: glareX,
        y: glareY,
        opacity: glareOpacity,
      });

      setHoloAngle(angle + 180);
    },
    [maxTilt, glareOpacity, depthScale]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(${transform.scale}, ${transform.scale}, 1)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Cursor Spotlight Glare */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(450px circle at ${glarePos.x}% ${glarePos.y}%, rgba(212, 175, 55, 0.18), rgba(0, 240, 255, 0.1) 35%, transparent 70%)`,
          opacity: glarePos.opacity,
          mixBlendMode: 'screen',
        }}
      />

      {/* Iridescent Holographic Foil Sheen */}
      {holographic && (
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none z-10 transition-opacity duration-400"
          style={{
            background: `linear-gradient(${holoAngle}deg, rgba(212,175,55,0.06) 0%, rgba(0,240,255,0.08) 25%, rgba(139,92,246,0.08) 50%, rgba(236,72,153,0.06) 75%, transparent 100%)`,
            opacity: glarePos.opacity > 0 ? 0.75 : 0,
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Card Content (Preserves 3D children translation) */}
      <div className="relative z-0 h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
};
