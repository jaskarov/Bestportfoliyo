import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Timer,
  FolderKanban,
  Users,
  Sparkles,
} from 'lucide-react';

/* ---------------------------------- Metrics ---------------------------------- */

interface Metric {
  icon: typeof Timer;
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
  color: string;
}

const metrics: Metric[] = [
  {
    icon: ShieldCheck,
    value: 99.9,
    suffix: '%',
    decimals: 1,
    label: 'Uptime SLA in production',
    color: '#22C55E',
  },
  {
    icon: Timer,
    value: 45,
    prefix: '<',
    suffix: 'ms',
    label: 'Average API response time',
    color: '#00F0FF',
  },
  {
    icon: FolderKanban,
    value: 28,
    suffix: '+',
    label: 'Projects delivered end-to-end',
    color: '#D4AF37',
  },
  {
    icon: Users,
    value: 100,
    suffix: '%',
    label: 'Client satisfaction rate',
    color: '#A855F7',
  },
];

const Counter = ({ metric }: { metric: Metric }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [display, setDisplay] = useState(metric.value);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, metric.value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, metric.value]);

  const formatted = metric.decimals
    ? display.toFixed(metric.decimals)
    : Math.round(display).toString();

  return (
    <span ref={ref}>
      {metric.prefix}
      {formatted}
      {metric.suffix}
    </span>
  );
};

/* ---------------------------------- Testimonials ---------------------------------- */

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Javohir rebuilt our monolith into a microservices platform without a single minute of downtime. His AI integration work alone automated 60% of our support workflow. Rare mix of speed and rigor.',
    name: 'Davron Karimov',
    role: 'CTO',
    company: 'TechCorp Innovatsiya Markazi',
    initials: 'DK',
    color: '#D4AF37',
    project: 'Microservices & AI Integration',
  },
  {
    quote:
      'He delivered our ERP three weeks ahead of schedule — and it just works. The React architecture he set up is still the cleanest codebase our team has ever inherited.',
    name: 'Malika Rahimova',
    role: 'Product Owner',
    company: 'SoftSolutions IT',
    initials: 'MR',
    color: '#00F0FF',
    project: 'Enterprise ERP Platform',
  },
  {
    quote:
      'The Health AI platform exceeded every expectation. Symptom triage accuracy hit 94% in pilot, and physicians actually enjoy using it. Investors were impressed — that says everything.',
    name: 'Timur Yusupov',
    role: 'Founder & CEO',
    company: 'MedPort Health',
    initials: 'TY',
    color: '#A855F7',
    project: 'Health AI Medical System',
  },
  {
    quote:
      'Marketing output went from 3 posts a week to 30 — without hiring anyone new. The content engine Javohir built understands our brand voice better than most humans we interviewed.',
    name: 'Nodira Alimova',
    role: 'Head of Marketing',
    company: 'GrowthLab Agency',
    initials: 'NA',
    color: '#22C55E',
    project: 'AI Content Studio',
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => go(1), 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section id="reviews" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[#22C55E] text-sm font-medium mb-4 border border-[#22C55E]/20 bg-[#22C55E]/10">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            Proven Engineering Results
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300">Outcomes</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Numbers first — verified metrics and the leaders behind them
          </p>
        </motion.div>

        {/* Metrics Grid with Cyber Glass & Neon Aura */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-2xl p-6 text-center group overflow-hidden bg-[#0a0d14]/80 border border-white/[0.08] backdrop-blur-xl shadow-xl transition-all duration-300"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${metric.color}25 0%, transparent 70%)`,
                }}
              />
              <div 
                className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${metric.color}15`,
                  border: `1px solid ${metric.color}30`,
                }}
              >
                <metric.icon
                  className="w-6 h-6"
                  style={{ color: metric.color }}
                />
              </div>
              <p 
                className="text-3xl md:text-4xl font-extrabold text-white mb-2 tabular-nums tracking-tight"
                style={{ textShadow: `0 0 20px ${metric.color}40` }}
              >
                <Counter metric={metric} />
              </p>
              <p className="text-xs text-gray-400 font-medium">{metric.label}</p>
              
              {/* Bottom accent glow bar */}
              <div 
                className="absolute bottom-0 left-1/4 right-1/4 h-[2px] rounded-full opacity-30 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: metric.color, boxShadow: `0 0 8px ${metric.color}` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Testimonial slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-[#0a0d14]/90 border border-white/[0.1] backdrop-blur-2xl shadow-2xl">
            {/* Giant quote mark */}
            <Quote
              className="absolute -top-4 -left-2 w-32 h-32 text-white/[0.03] rotate-180 pointer-events-none"
              strokeWidth={1}
            />

            {/* Subtle glow orb */}
            <div 
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: current.color }}
            />

            <div className="min-h-[220px] md:min-h-[180px] flex items-center relative z-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: 50 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 * direction }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="w-full"
                >
                  <blockquote className="text-lg md:text-2xl text-gray-200 font-normal leading-relaxed mb-8">
                    "{current.quote}"
                  </blockquote>

                  <figcaption className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/[0.08]">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm text-black shadow-lg"
                        style={{ backgroundColor: current.color }}
                      >
                        {current.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-white flex items-center gap-2">
                          {current.name}
                          <span className="inline-flex items-center text-[11px] font-mono font-medium px-2 py-0.5 rounded-full border border-white/10 text-gray-400">
                            {current.project}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {current.role} — <span className="text-gray-300">{current.company}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Slider controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06] relative z-10">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? 'w-8 bg-gradient-to-r from-cyan-400 to-emerald-400'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => go(-1)}
                  className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-white hover:bg-white/10 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-white hover:bg-white/10 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
