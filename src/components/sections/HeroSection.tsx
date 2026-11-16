import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Calendar } from 'lucide-react';
import { QuantumCore3D } from '../QuantumCore3D';
import { NeonBorderButton } from '../NeonBorderButton';
import { MagneticSpringText } from '../MagneticSpringText';
import { PCBTraceBorder } from '../PCBTraceBorder';
import { SpatialTiltCard } from '../SpatialTiltCard';
import { WebGPUCosmicCanvas } from '../WebGPUCosmicCanvas';
import { CursorRingField } from '../CursorRingField';

export const HeroSection = ({ onBookCall }: { onBookCall: () => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#050608]"
    >
      {/* Background Subtle Gradient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,175,55,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_120%,rgba(0,240,255,0.05),transparent_70%)]" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Tier-1 WebGPU Gravitational Particle Engine (100k particles) */}
      <WebGPUCosmicCanvas />

      {/* Originkit WebGL Cursor Ring Field */}
      <CursorRingField />

      {/* Exquisite 3D Quantum Core Interactive Gyroscope */}
      <QuantumCore3D />

      {/* Hero Content Overlay */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pointer-events-none"
        style={{ opacity, y }}
      >
        {/* Elite Monolithic Status Capsule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-8 pointer-events-auto"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.08)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono tracking-[0.2em] text-white/70 uppercase">
              TASHKENT (UTC+5) · ARCHITECTING ENTERPRISE AI &amp; SYSTEMS
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-[11px] font-mono text-[#D4AF37] font-semibold tracking-wider">
              ACTIVE
            </span>
          </div>
        </motion.div>

        {/* Colossal Authoritative Name Heading with Originkit Spring & Magnetic Aberration */}
        <div className="pointer-events-auto mb-5">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight select-none"
            style={{ letterSpacing: '-0.035em' }}
          >
            <MagneticSpringText
              text="JAVOHIRBEK"
              className="block text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            />
            <MagneticSpringText
              text="ASQAROV"
              className="block bg-gradient-to-r from-[#F5D77F] via-[#FFEBB0] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(212,175,55,0.3)]"
            />
          </motion.h1>
        </div>

        {/* Title & Architectural Thesis */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-white/85 font-light tracking-wide mb-2.5"
        >
          Senior Full-Stack &amp; AI Systems Architect
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm text-white/45 max-w-xl mx-auto mb-8 leading-relaxed font-mono"
        >
          Engineering zero-compromise distributed architectures, high-throughput fintech pipelines, and autonomous AI swarms with extreme aesthetic precision.
        </motion.p>

        {/* Tactile Luxury Action CTAs with Neon Border Beams */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pointer-events-auto"
        >
          <a href="#projects" data-sound="open">
            <NeonBorderButton variant="gold">
              <span>Explore Masterworks</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </NeonBorderButton>
          </a>
          <NeonBorderButton
            variant="cyan"
            data-sound="click"
            onClick={onBookCall}
          >
            <Calendar className="w-4 h-4 text-[#00F0FF]" />
            <span>Schedule Discovery Session</span>
          </NeonBorderButton>
        </motion.div>

        {/* Core Architecture Tech Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="mt-8 flex flex-wrap justify-center gap-2 pointer-events-auto"
        >
          {[
            'Next.js 15',
            'Python 3.12 / FastAPI',
            'Multi-Agent Swarms',
            'Three.js / WebGL',
            'PostgreSQL & Qdrant',
            'Fintech & Payments',
          ].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 + i * 0.08 }}
              className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-white/60 hover:text-white hover:border-[#D4AF37]/50 hover:bg-white/[0.06] transition-all cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Interactive 3D Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[10px] font-mono text-white/40 tracking-wider backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
          <span>DRAG 3D ARTIFACT TO ROTATE</span>
        </div>
      </motion.div>
    </section>
  );
};

// Quest Map (Timeline) Section