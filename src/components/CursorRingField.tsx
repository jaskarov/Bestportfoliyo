import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  angle: number;
  length: number;
  radius: number;
}

export const CursorRingField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let particles: Particle[] = [];
    const spacing = 45;

    const initParticles = () => {
      particles = [];
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);
      const offsetX = (width - cols * spacing) / 2;
      const offsetY = (height - rows * spacing) / 2;

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = offsetX + c * spacing;
          const y = offsetY + r * spacing;
          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            angle: Math.random() * Math.PI * 2,
            length: 12 + Math.random() * 8,
            radius: 1.5,
          });
        }
      }
    };

    initParticles();

    const ringRadius = 130;
    const ringThickness = 35;

    const render = () => {
      // Lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // Render glowing trailing ring
      const grad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        ringRadius - ringThickness,
        mouse.x,
        mouse.y,
        ringRadius + ringThickness
      );
      grad.addColorStop(0, 'rgba(212, 175, 55, 0)');
      grad.addColorStop(0.5, 'rgba(212, 175, 55, 0.12)');
      grad.addColorStop(0.8, 'rgba(0, 240, 255, 0.08)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, ringRadius + ringThickness, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles (scattered capsules)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Distance from the ring perimeter
        const distFromRing = Math.abs(dist - ringRadius);

        if (distFromRing < ringThickness && dist > 0) {
          // Push outward along the ring
          const force = (1 - distFromRing / ringThickness) * 14;
          const nx = dx / dist;
          const ny = dy / dist;
          p.vx += nx * force * 0.15;
          p.vy += ny * force * 0.15;

          // Capsule aligns to ring center with noise
          p.angle = Math.atan2(dy, dx) + Math.PI / 2;
        }

        // Spring back to origin
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.05;
        p.vy += homeDy * 0.05;

        // Damping
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        // Brightness based on proximity to ring
        let alpha = 0.15;
        let strokeColor = 'rgba(255, 255, 255, ';

        if (distFromRing < ringThickness) {
          const intensity = 1 - distFromRing / ringThickness;
          alpha = 0.2 + intensity * 0.75;
          strokeColor = intensity > 0.5 ? 'rgba(212, 175, 55, ' : 'rgba(0, 240, 255, ';
        }

        // Draw capsule
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.strokeStyle = `${strokeColor}${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.moveTo(-p.length / 2, 0);
        ctx.lineTo(p.length / 2, 0);
        ctx.stroke();

        // Capsule endpoints glowing dot
        ctx.fillStyle = `${strokeColor}${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(-p.length / 2, 0, p.radius, 0, Math.PI * 2);
        ctx.arc(p.length / 2, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70"
    />
  );
};
