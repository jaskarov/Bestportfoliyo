import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, RefreshCw, Zap } from 'lucide-react';

export type MorphMode = 'SAND' | 'JASPER' | 'AI_2026';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  tx: number; // target x for morphing
  ty: number; // target y for morphing
  size: number;
  color: string;
  alpha: number;
  wanderAngle: number;
  wanderSpeed: number;
}

const LUXURY_PALETTE = [
  '#D4AF37', // Luxury Gold
  '#F4D03F', // Light Gold
  '#00F0FF', // Neon Cyan
  '#8B5CF6', // Cyberpunk Violet
];

/**
 * Samples pixel coordinates from text rendered on an offscreen canvas
 */
function sampleTypographyPoints(
  text: string,
  viewportWidth: number,
  viewportHeight: number,
  targetCount: number
): Array<{ x: number; y: number }> {
  if (typeof document === 'undefined') return [];

  const offscreen = document.createElement('canvas');
  const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
  if (!offCtx) return [];

  // Determine target text size based on viewport
  const isMobile = viewportWidth < 768;
  const maxWidth = Math.min(viewportWidth * 0.88, isMobile ? 360 : 750);
  const fontSize = Math.floor(isMobile ? maxWidth / (text.length * 0.65) : maxWidth / (text.length * 0.58));
  
  const canvasW = Math.floor(viewportWidth);
  const canvasH = Math.floor(isMobile ? 220 : 320);
  offscreen.width = canvasW;
  offscreen.height = canvasH;

  offCtx.clearRect(0, 0, canvasW, canvasH);
  offCtx.fillStyle = '#FFFFFF';
  offCtx.textAlign = 'center';
  offCtx.textBaseline = 'middle';
  offCtx.font = `900 ${fontSize}px 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

  const centerX = canvasW / 2;
  const centerY = canvasH / 2;
  offCtx.fillText(text, centerX, centerY);

  // Read pixel data
  const imgData = offCtx.getImageData(0, 0, canvasW, canvasH);
  const data = imgData.data;
  const rawPoints: Array<{ x: number; y: number }> = [];

  // Sampling step based on density
  const step = isMobile ? 3 : 2;

  for (let y = 0; y < canvasH; y += step) {
    for (let x = 0; x < canvasW; x += step) {
      const alphaIndex = (y * canvasW + x) * 4 + 3;
      if (data[alphaIndex] > 140) {
        // Offset Y so text appears in upper-middle hero area (35% - 40% from top)
        const targetY = y + (viewportHeight * 0.38 - centerY);
        rawPoints.push({ x, y: targetY });
      }
    }
  }

  if (rawPoints.length === 0) return [];

  // Shuffle & sample exactly targetCount points
  const points: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < targetCount; i++) {
    const pt = rawPoints[Math.floor((i / targetCount) * rawPoints.length)];
    // Add tiny sub-pixel variance for natural organic sand feel
    points.push({
      x: pt.x + (Math.random() - 0.5) * 1.5,
      y: pt.y + (Math.random() - 0.5) * 1.5,
    });
  }

  return points;
}

export const MagneticParticleSand: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const rafRef = useRef<number | null>(null);
  const modeRef = useRef<MorphMode>('SAND');
  const [currentMode, setCurrentMode] = useState<MorphMode>('SAND');
  const [particleStats, setParticleStats] = useState({ count: 1280, fps: 60 });

  // Precomputed text points cached per resize
  const textPointsCache = useRef<{
    JASPER: Array<{ x: number; y: number }>;
    AI_2026: Array<{ x: number; y: number }>;
  }>({
    JASPER: [],
    AI_2026: [],
  });

  const nextMode = useCallback((forcedMode?: MorphMode) => {
    const modes: MorphMode[] = ['SAND', 'JASPER', 'AI_2026'];
    const currentIdx = modes.indexOf(modeRef.current);
    const target = forcedMode || modes[(currentIdx + 1) % modes.length];
    modeRef.current = target;
    setCurrentMode(target);

    // Apply target positions to particles
    const particles = particlesRef.current;
    if (target === 'SAND') {
      particles.forEach((p) => {
        p.tx = p.originX;
        p.ty = p.originY;
      });
    } else if (target === 'JASPER') {
      const targets = textPointsCache.current.JASPER;
      if (targets.length > 0) {
        particles.forEach((p, idx) => {
          const t = targets[idx % targets.length];
          p.tx = t.x;
          p.ty = t.y;
        });
      }
    } else if (target === 'AI_2026') {
      const targets = textPointsCache.current.AI_2026;
      if (targets.length > 0) {
        particles.forEach((p, idx) => {
          const t = targets[idx % targets.length];
          p.tx = t.x;
          p.ty = t.y;
        });
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Particle count: 1280+ for desktop, 860+ for mobile
    const particleCount = width < 768 ? 860 : 1380;
    setParticleStats((prev) => ({ ...prev, count: particleCount }));

    // Initialize particles
    const initParticles = () => {
      const list: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        // Color distribution: 40% Gold, 35% Cyan, 25% Violet
        const colorRand = Math.random();
        const color =
          colorRand < 0.35
            ? LUXURY_PALETTE[0] // #D4AF37
            : colorRand < 0.55
            ? LUXURY_PALETTE[1] // #F4D03F
            : colorRand < 0.82
            ? LUXURY_PALETTE[2] // #00F0FF
            : LUXURY_PALETTE[3]; // #8B5CF6

        list.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          originX: x,
          originY: y,
          tx: x,
          ty: y,
          size: Math.random() * 1.4 + 0.9, // 0.9px - 2.3px
          color,
          alpha: Math.random() * 0.45 + 0.5,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: Math.random() * 0.25 + 0.15,
        });
      }
      particlesRef.current = list;
    };

    const recomputeTypography = () => {
      textPointsCache.current.JASPER = sampleTypographyPoints('JASPER', width, height, particleCount);
      textPointsCache.current.AI_2026 = sampleTypographyPoints('2026 AI', width, height, particleCount);
      // Re-align current mode targets
      nextMode(modeRef.current);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      recomputeTypography();
    };

    initParticles();
    resize();
    window.addEventListener('resize', resize);

    // Mouse magnetic coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    // Touch support for mobile magnetic pull
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    // Double-click to instantly morph
    const handleDblClick = () => {
      nextMode();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('dblclick', handleDblClick);

    // Auto-morph timer: cycle every 9 seconds
    const intervalTimer = setInterval(() => {
      nextMode();
    }, 9000);

    // Main 60fps Physics & Render Loop
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const render = (time: number) => {
      // FPS measurement
      frameCount++;
      if (time - lastFpsUpdate > 1000) {
        setParticleStats((prev) => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (time - lastFpsUpdate)),
        }));
        frameCount = 0;
        lastFpsUpdate = time;
      }

      // Smooth clear
      ctx.clearRect(0, 0, width, height);

      const mode = modeRef.current;
      const mouse = mouseRef.current;
      const isMorphingText = mode === 'JASPER' || mode === 'AI_2026';
      const particles = particlesRef.current;

      // Group particles by color to minimize draw calls & context switching (batch rendering)
      const colorGroups: { [color: string]: Particle[] } = {};

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isMorphingText) {
          // Typography Spring Dynamics
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          
          // Silky spring force towards typography glyph coordinates
          const spring = 0.042;
          p.vx += dx * spring;
          p.vy += dy * spring;

          // Critical velocity damping to settle cleanly into legible typography
          p.vx *= 0.86;
          p.vy *= 0.86;

          // Gentle sand jitter / Brownian shimmer around target
          p.vx += (Math.random() - 0.5) * 0.16;
          p.vy += (Math.random() - 0.5) * 0.16;
        } else {
          // Natural Brownian wandering / Cosmic Sand Mode
          p.wanderAngle += (Math.random() - 0.5) * 0.35;
          p.vx += Math.cos(p.wanderAngle) * p.wanderSpeed * 0.25;
          p.vy += Math.sin(p.wanderAngle) * p.wanderSpeed * 0.25;

          // Subtle return pull to keep sand distributed uniformly
          const odx = p.originX - p.x;
          const ody = p.originY - p.y;
          p.vx += odx * 0.00035;
          p.vy += ody * 0.00035;

          // Smooth damping
          p.vx *= 0.95;
          p.vy *= 0.95;
        }

        // Magnetic Attraction & Swirl to Cursor (within 150px radius)
        if (mouse.active) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mDist = Math.hypot(mdx, mdy);

          if (mDist < 150 && mDist > 1) {
            const pullFactor = (1 - mDist / 150);
            // Magnetic attraction force
            const pullForce = pullFactor * 1.15;
            p.vx += (mdx / mDist) * pullForce;
            p.vy += (mdy / mDist) * pullForce;

            // Silky tangential vortex swirl (magnetic field lines effect)
            const swirlStrength = pullFactor * 0.45;
            p.vx += (-mdy / mDist) * swirlStrength;
            p.vy += (mdx / mDist) * swirlStrength;
          }
        }

        // Update Position
        p.x += p.vx;
        p.y += p.vy;

        // Boundary wrapping / softly keeping within viewport
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        // Add to batch draw group
        if (!colorGroups[p.color]) {
          colorGroups[p.color] = [];
        }
        colorGroups[p.color].push(p);
      }

      // Draw Batched Particles (4 draw calls instead of 1400!)
      for (const color in colorGroups) {
        const group = colorGroups[color];
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let j = 0; j < group.length; j++) {
          const p = group[j];
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Magnetic Filament connection to cursor
      if (mouse.active) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        let drawn = 0;
        for (let i = 0; i < particles.length && drawn < 24; i += 7) {
          const p = particles[i];
          const dist = Math.hypot(mouse.x - p.x, mouse.y - p.y);
          if (dist < 120) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            drawn++;
          }
        }
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('dblclick', handleDblClick);
      clearInterval(intervalTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [nextMode]);

  return (
    <>
      {/* HTML5 Canvas Surface */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.88 }}
        aria-hidden="true"
      />

      {/* Interactive Morph Control Badge (Subtle Luxury HUD) */}
      <div className="fixed bottom-6 left-6 z-30 pointer-events-auto">
        <button
          onClick={() => nextMode()}
          data-sound="click"
          title="Click to Morph typography (or double-click anywhere on screen)"
          className="group relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0D0D0F]/80 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/50 shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {/* Animated Neon border pulse */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#00F0FF]/20 to-[#8B5CF6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />

          {/* Icon indicator */}
          <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">
            {currentMode === 'SAND' ? (
              <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
            ) : currentMode === 'JASPER' ? (
              <Zap className="w-3 h-3 text-[#00F0FF]" />
            ) : (
              <RefreshCw className="w-3 h-3 text-[#8B5CF6] animate-spin" style={{ animationDuration: '4s' }} />
            )}
          </span>

          {/* Mode label */}
          <div className="relative flex items-center gap-1.5 text-[11px] font-mono tracking-wider">
            <span className="text-white/40 font-normal">ENGINE №14:</span>
            <span
              className={`font-semibold transition-colors duration-300 ${
                currentMode === 'SAND'
                  ? 'text-[#D4AF37]'
                  : currentMode === 'JASPER'
                  ? 'text-[#00F0FF]'
                  : 'text-[#8B5CF6]'
              }`}
            >
              {currentMode === 'SAND' ? 'SAND VORTEX' : currentMode === 'JASPER' ? 'JASPER' : '2026 AI'}
            </span>
          </div>

          {/* Micro tag */}
          <span className="relative hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-medium rounded bg-white/5 text-white/50 group-hover:text-white/80 transition-colors">
            {particleStats.count}p
          </span>
        </button>
      </div>
    </>
  );
};
