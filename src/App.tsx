import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Code2, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  Mail,
  Phone,
  MapPin,
  Send,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Terminal,
  Database,
  Layers,
  Zap,
  CheckCircle2,
  MessageCircle,
  Globe,
  Palette,
  Server,
  Cloud,
  Bot,
  Calendar,
  Atom,
  FileCode2,
  Braces,
  Hexagon,
  Package,
  Play,
  Volume2,
  VolumeX,
  Menu,
  X
} from 'lucide-react';
import { projects, type Project } from './data/projects';
import { ProjectModal } from './components/ProjectModal';
import { AIChatWidget } from './components/AIChatWidget';
import { WorkProcessSection } from './components/WorkProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingModal } from './components/BookingModal';
import { UISoundEngine } from './components/UISoundEngine';
import { AutoTranslator, type Language } from './localization';
import { sendLead } from './utils/leadCapture';
import { CircadianAtmosphere } from './components/CircadianAtmosphere';
import { SpatialTiltCard } from './components/SpatialTiltCard';
import { PCBTraceBorder } from './components/PCBTraceBorder';
import { AscentLenisProvider } from './components/AscentLenisProvider';
import { QuantumCore3D } from './components/QuantumCore3D';
import { WebGPUCosmicCanvas } from './components/WebGPUCosmicCanvas';
import { InteractiveGrid, TECH_ITEMS } from './components/InteractiveGrid';
import { CursorRingField } from './components/CursorRingField';
import { MagneticSpringText } from './components/MagneticSpringText';
import { FlipGallery3D } from './components/FlipGallery3D';
import { NeonBorderButton } from './components/NeonBorderButton';

// Navigation Component
const Navigation = ({
  onBookCall,
  soundEnabled,
  onToggleSound,
  language,
  onLanguageChange,
}: {
  onBookCall: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Quest Map', href: '#timeline' },
    { name: 'Skills', href: '#skills' },
    { name: 'Process', href: '#process' },
    { name: 'Projects', href: '#projects' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 backdrop-blur-md ${
        scrolled
          ? 'py-3 bg-[#0D0D0F]/80 border-b border-white/10 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-[#0D0D0F]/40 border-b border-white/[0.04]'
      }`}
    >
      {/* Gold hairline accent that fades in on scroll */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), rgba(0,240,255,0.35), transparent)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className="text-xl font-bold text-gradient-gold"
            whileHover={{ scale: 1.05 }}
          >
            AJ
          </motion.a>

          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-white/60 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#00F0FF] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div
              data-no-translate="true"
              className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10"
              aria-label="Language selector"
            >
              {(['EN', 'UZ', 'RU'] as Language[]).map((item) => (
                <button
                  key={item}
                  onClick={() => onLanguageChange(item)}
                  className={`h-8 min-w-8 px-1.5 rounded-full text-[10px] font-bold tracking-wide transition-all ${
                    language === item
                      ? 'bg-[#D4AF37] text-black shadow-[0_0_14px_rgba(212,175,55,0.25)]'
                      : 'text-white/40 hover:text-white'
                  }`}
                  aria-pressed={language === item}
                >
                  {item}
                </button>
              ))}
            </div>

            <motion.button
              data-sound-toggle="true"
              onClick={onToggleSound}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-9 px-3 rounded-full bg-white/[0.04] border border-white/10 flex items-center gap-2 text-white/55 hover:text-[#00F0FF] hover:border-[#00F0FF]/30 transition-all"
              aria-label={soundEnabled ? 'Mute spatial audio' : 'Enable spatial audio'}
              title={soundEnabled ? 'Spatial 3D Audio: ACTIVE' : 'Enable spatial audio'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span className="flex items-center gap-0.5 h-2.5">
                    <span className="w-0.5 h-2.5 bg-[#00F0FF] rounded-full animate-pulse" />
                    <span className="w-0.5 h-1.5 bg-[#00F0FF] rounded-full animate-pulse delay-75" />
                    <span className="w-0.5 h-3 bg-[#00F0FF] rounded-full animate-pulse delay-150" />
                  </span>
                </>
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </motion.button>

            <motion.button
              onClick={onBookCall}
              className="px-5 py-2.5 rounded-full btn-primary text-sm font-semibold text-black flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Book a Call</span>
              <span className="sm:hidden">Book</span>
            </motion.button>

            <motion.button
              data-sound="click"
              onClick={() => setMobileMenuOpen((open) => !open)}
              whileTap={{ scale: 0.92 }}
              className="lg:hidden w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#00F0FF]/30 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden fixed inset-x-3 top-[76px] bottom-3 z-[61] rounded-3xl border border-white/10 bg-[#101014]/95 backdrop-blur-2xl shadow-2xl overflow-y-auto"
          >
            <div className="p-5">
              <p className="px-2 text-[10px] uppercase tracking-[0.24em] text-white/30 mb-3">
                Navigation
              </p>
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.045 }}
                    className="flex min-h-12 items-center justify-between px-3 rounded-xl text-lg text-white/75 hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4 text-white/25" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookCall();
                  }}
                  className="w-full min-h-12 rounded-xl btn-primary text-black font-semibold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book a 15-min Discovery Call
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = ({ onBookCall }: { onBookCall: () => void }) => {
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
const QuestMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const experiences = [
    {
      period: '2024 - Present',
      title: 'Full-Stack & AI Systems Architect',
      company: 'Independent Consultant / Product Engineering',
      description: 'Engineering zero-compromise distributed architectures, autonomous multi-agent swarms, and AI-enabled business tools that solve real operational bottlenecks for clients and enterprise products.',
      skills: ['Distributed Systems', 'Autonomous AI Swarms', 'Next.js 15 & Fastify', 'Fintech Pipelines'],
      icon: Briefcase,
      type: 'work',
      color: '#00F0FF'
    },
    {
      period: '2022 - 2024',
      title: 'Frontend & Full-Stack Developer',
      company: 'Digital Product Studio',
      description: 'Delivered mission-critical web platforms, high-throughput analytics dashboards, and internal business tools using React, Node.js, and strict API contracts.',
      skills: ['React & TypeScript', 'Node.js & Python', 'OpenAPI Contracts', 'PostgreSQL Schema'],
      icon: Code2,
      type: 'work',
      color: '#D4AF37'
    },
    {
      period: '2020 - 2024',
      title: 'Computer Science & Software Engineering',
      company: 'University Studies',
      description: 'Rigorous theoretical foundations in software engineering, algorithmic complexity, data structures, and enterprise architecture with practical real-world implementations.',
      skills: ['Algorithms', 'Data Structures', 'AI & Neural Systems', 'System Design'],
      icon: GraduationCap,
      type: 'education',
      color: '#A855F7'
    },
  ];

  return (
    <section id="timeline" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[#D4AF37] text-sm font-medium mb-4 border border-[#D4AF37]/20 bg-[#D4AF37]/10">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Quest <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">Map</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            My professional adventure through the realms of code and innovation
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Glowing Animated Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.08] -translate-x-1/2 origin-top hidden md:block overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="w-full bg-gradient-to-b from-[#00F0FF] via-[#D4AF37] to-[#A855F7] shadow-[0_0_12px_#00F0FF]"
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card with Cyber Glass & 3D Depth */}
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <motion.div 
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="relative rounded-3xl p-6 md:p-8 bg-[#0a0d14]/85 border border-white/[0.1] backdrop-blur-xl shadow-2xl transition-all duration-300 group overflow-hidden"
                  >
                    {/* Hover Glow Orb */}
                    <div 
                      className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                      style={{
                        background: `radial-gradient(circle at ${index % 2 === 0 ? '100%' : '0%'} 50%, ${exp.color}15 0%, transparent 70%)`
                      }}
                    />

                    <div className={`flex items-center gap-3 mb-4 flex-wrap ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider"
                        style={{
                          backgroundColor: `${exp.color}15`,
                          color: exp.color,
                          border: `1px solid ${exp.color}35`,
                        }}
                      >
                        {exp.period}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.05] border border-white/[0.08] text-gray-300">
                        {exp.type === 'work' ? 'SYSTEMS ARCHITECTURE' : 'ACADEMIC FOUNDATION'}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="font-medium text-sm mb-3 tracking-wide" style={{ color: exp.color }}>
                      {exp.company}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-xl bg-white/[0.04] border border-white/[0.06] text-gray-300 text-xs font-mono group-hover:border-white/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Center Node Icon with Pulse */}
                <div className="relative z-20 shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xl backdrop-blur-xl transition-all duration-300"
                    style={{
                      backgroundColor: '#0a0d14',
                      borderColor: `${exp.color}60`,
                      boxShadow: `0 0 20px ${exp.color}35`,
                    }}
                  >
                    <exp.icon className="w-6 h-6" style={{ color: exp.color }} />
                  </motion.div>
                </div>

                {/* Empty Counterpart for Symmetry */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// Tech Stack Section with Originkit InteractiveGrid
const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'ai' | 'tools'>('all');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return TECH_ITEMS;
    return TECH_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const categories = [
    { id: 'all', label: 'All Arsenals', count: TECH_ITEMS.length },
    { id: 'frontend', label: 'Frontend', count: TECH_ITEMS.filter(t => t.category === 'frontend').length },
    { id: 'backend', label: 'Backend', count: TECH_ITEMS.filter(t => t.category === 'backend').length },
    { id: 'ai', label: 'AI & Neural', count: TECH_ITEMS.filter(t => t.category === 'ai').length },
    { id: 'tools', label: 'DevOps & Tools', count: TECH_ITEMS.filter(t => t.category === 'tools').length },
  ];

  return (
    <section id="skills" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[#00F0FF] text-sm font-medium mb-4 border border-[#00F0FF]/20 bg-[#00F0FF]/10">
            <Terminal className="w-4 h-4 text-[#00F0FF]" />
            Interactive 3D Arsenal
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Stack</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Technologies I wield to craft digital excellence — interactive physics grid
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-white/[0.04] text-gray-400 border border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                  isActive ? 'bg-cyan-400/30 text-white' : 'bg-white/10 text-gray-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D Interactive Grid Engine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <InteractiveGrid items={filteredItems} columns={4} gap={18} />
        </motion.div>
      </div>
    </section>
  );
};


// Project Showcase Section
const ProjectShowcaseSection = ({ onOpenProject }: { onOpenProject: (p: Project) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-[#A855F7] text-sm font-medium mb-4">
            <Zap className="w-4 h-4 inline mr-2" />
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Project{' '}
            <span className="text-gradient-gold">
              Showcase
            </span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Click any project to launch its interactive live demo
          </p>
        </motion.div>

        {/* Originkit 3D Flip Card Gallery Engine */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <FlipGallery3D
            projects={projects}
            onOpenProject={onOpenProject}
          />
        </motion.div>
      </div>
    </section>
  );
};

// Budget Calculator Section
// Budget Calculator Section
const BudgetCalculatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const services = [
    { id: 'frontend', name: 'Frontend Development', price: 150, icon: Palette, note: 'Next.js 15, Three.js & Tailwind' },
    { id: 'backend', name: 'Backend Development', price: 200, icon: Server, note: 'FastAPI, Node.js & PostgreSQL' },
    { id: 'ai', name: 'AI Integration', price: 300, icon: Brain, note: 'Gemini, OpenAI & Autonomous Agents' },
    { id: 'database', name: 'Database Design', price: 100, icon: Database, note: 'High-scale schema & indexing' },
    { id: 'api', name: 'API Development', price: 150, icon: Globe, note: 'Type-safe REST & OpenAPI specs' },
    { id: 'devops', name: 'DevOps & Deployment', price: 120, icon: Cloud, note: 'Docker, CI/CD & Monitoring' },
  ];

  const [selectedServices, setSelectedServices] = useState<string[]>([
    'frontend',
    'backend',
  ]);
  const [complexity, setComplexity] = useState<'simple' | 'medium' | 'complex'>('medium');

  const complexityMultipliers = {
    simple: 0.7,
    medium: 1,
    complex: 1.5,
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const basePrice = selectedServices.reduce((total, id) => {
      const service = services.find((s) => s.id === id);
      return total + (service?.price || 0);
    }, 0);
    return Math.round(basePrice * complexityMultipliers[complexity]);
  };

  const calculateTimeline = () => {
    const baseWeeks = selectedServices.length * 2;
    const multiplier = complexity === 'simple' ? 0.7 : complexity === 'complex' ? 1.5 : 1;
    return Math.max(1, Math.round(baseWeeks * multiplier));
  };

  return (
    <section id="calculator" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[#00F0FF] text-sm font-medium mb-4 border border-[#00F0FF]/20 bg-[#00F0FF]/10">
            <Bot className="w-4 h-4 text-[#00F0FF]" />
            Project Estimator
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Budget <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Calculator</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Get an instant estimate for your project scope
          </p>
        </motion.div>

        <div className="grid min-w-0 lg:grid-cols-2 gap-8">
          {/* Services Selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="min-w-0 rounded-3xl p-6 md:p-8 bg-[#0a0d14]/85 border border-white/[0.1] backdrop-blur-xl shadow-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>Select Services</span>
              <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                {selectedServices.length} active
              </span>
            </h3>

            <div className="space-y-3">
              {services.map((service, index) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleService(service.id)}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-300 border ${
                      isSelected
                        ? 'bg-[#141b2b] border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                        : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 text-left">
                      <div 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-cyan-400 text-black font-bold' : 'bg-white/[0.05] text-gray-400'
                        }`}
                      >
                        <service.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm">{service.name}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{service.note}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-semibold text-gray-300">
                        ${service.price}
                      </span>
                      <div 
                        className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-cyan-400 border-cyan-400 text-black'
                            : 'border-white/20'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Complexity Picker */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3 font-mono">
                Project Complexity
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {(['simple', 'medium', 'complex'] as const).map((level) => {
                  const isActive = complexity === level;
                  return (
                    <button
                      key={level}
                      onClick={() => setComplexity(level)}
                      className={`p-3 rounded-xl text-xs font-mono capitalize transition-all border ${
                        isActive
                          ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                          : 'bg-white/[0.03] text-gray-400 border-white/[0.06] hover:bg-white/[0.06]'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Results Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="min-w-0 rounded-3xl p-6 md:p-8 bg-[#0a0d14]/90 border border-white/[0.1] backdrop-blur-2xl shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            <div 
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none bg-cyan-400"
            />

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Estimated Scope & Investment
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-1">
                    Estimated Budget
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 font-mono">
                    ${calculateTotal()}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">USD (Transparent pricing)</div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-1">
                    Estimated Timeline
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-mono">
                    {calculateTimeline()} <span className="text-lg font-normal text-gray-400">weeks</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">Sprints & milestones</div>
                </div>
              </div>

              {/* Selected List Pills */}
              <div className="mb-8">
                <div className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2.5">
                  Included Deliverables:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedServices.map((id) => {
                    const s = services.find((srv) => srv.id === id);
                    return (
                      <span
                        key={id}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-400/10 text-cyan-300 border border-cyan-400/20"
                      >
                        ✓ {s?.name}
                      </span>
                    );
                  })}
                  {selectedServices.length === 0 && (
                    <span className="text-xs text-gray-400">Select at least one service above.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/[0.08]">
              <a
                href="#contact"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold text-center block text-sm tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:brightness-110 transition-all"
              >
                Let's Build Something Exceptional ➔
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const ContactSection = ({ onBookCall }: { onBookCall: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendLead({
        name: formState.name,
        email: formState.email,
        message: formState.message,
        source: 'contact',
      });
      setSubmitted(true);
    } catch {
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 3000);
      setFormState({ name: '', email: '', message: '' });
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+998 90 508-33-02', href: 'tel:+998905083302' },
    { icon: MessageCircle, label: 'Telegram', value: '@Dr_eviluz', href: 'https://t.me/Dr_eviluz' },
    { icon: Mail, label: 'Email', value: 'salomh46@gmail.com', href: 'mailto:salomh46@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Tashkent, Uzbekistan', href: '#' },
  ];

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-[#D4AF37] text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Contact <span className="text-gradient-gold">Hub</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Let's discuss your next project and bring your vision to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Your Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl btn-primary text-black font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                  />
                ) : submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Fast booking banner */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              onClick={onBookCall}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl p-5 text-left transition-all relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(0,240,255,0.08))',
                border: '1px solid rgba(212,175,55,0.35)',
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">Prefer to talk it through?</p>
                  <p className="text-white/50 text-sm">Book a free 15-minute discovery call</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="glass-card rounded-xl p-5 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                  <info.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">{info.label}</p>
                  <p className="text-white font-medium group-hover:text-[#D4AF37] transition-colors">
                    {info.value}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 ml-auto group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}

            {/* Response time hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="glass rounded-xl p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Typical response time</p>
                <p className="text-white font-medium">Under 3 hours · GMT+5 timezone</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient-gold">AJ</span>
            <span className="text-white/40">|</span>
            <span className="text-white/40 text-sm">Full-Stack & AI Engineer</span>
          </div>
          
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Asqarov Javohirbek. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {['GitHub', 'LinkedIn', 'Telegram'].map((social) => (
              <a
                key={social}
                href={
                  social === 'Telegram'
                    ? 'https://t.me/Dr_eviluz'
                    : social === 'GitHub'
                    ? 'https://github.com/jaskarov'
                    : '#'
                }
                target={social === 'Telegram' || social === 'GitHub' ? '_blank' : undefined}
                rel={social === 'Telegram' || social === 'GitHub' ? 'noreferrer' : undefined}
                className="text-white/40 hover:text-[#D4AF37] text-sm transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('aj-ui-sound');
    return saved === null ? true : saved === 'on';
  });
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('aj-language');
    return saved === 'UZ' || saved === 'RU' ? saved : 'EN';
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const openBooking = () => setBookingOpen(true);

  const toggleSound = () => {
    setSoundEnabled((current) => {
      const next = !current;
      localStorage.setItem('aj-ui-sound', next ? 'on' : 'off');
      return next;
    });
  };

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    localStorage.setItem('aj-language', next);
    document.documentElement.lang = next.toLowerCase();
  };

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
    document.title =
      language === 'UZ'
        ? 'Asqarov Javohirbek | Full-Stack va AI muhandis'
        : language === 'RU'
        ? 'Аскаров Джавохирбек | Full-Stack и AI-инженер'
        : 'Asqarov Javohirbek | Full-Stack & AI Engineer';
  }, [language]);

  return (
    <AscentLenisProvider>
      <div className="relative min-h-screen bg-[#050608] text-white overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-white">
        <UISoundEngine enabled={soundEnabled} />
        <AutoTranslator language={language} />

        {/* Noise Grain Overlay */}
        <div className="noise-overlay opacity-40 pointer-events-none" />
        
        {/* Real-time Tashkent Circadian Atmosphere */}
        <CircadianAtmosphere />

      {/* Mouse Spotlight */}
      <div
        className="fixed pointer-events-none z-40 w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
        }}
      />

      {/* Navigation */}
      <Navigation
        onBookCall={openBooking}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        language={language}
        onLanguageChange={changeLanguage}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection onBookCall={openBooking} />
        <QuestMapSection />
        <TechStackSection />
        <WorkProcessSection />
        <ProjectShowcaseSection onOpenProject={setActiveProject} />
        <TestimonialsSection />
        <BudgetCalculatorSection />
        <ContactSection onBookCall={openBooking} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onBookCall={openBooking}
        language={language}
      />
      <AIChatWidget onBookCall={openBooking} language={language} />
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        language={language}
      />
      </div>
    </AscentLenisProvider>
  );
}

export default App;