import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Search,
  Layers,
  BrainCircuit,
  Rocket,
  CheckCircle2,
  Compass,
  Clock3,
  FileCheck2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface ProcessStep {
  id: number;
  stepNumber: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  icon: typeof Search;
  color: string;
  deliverables: string[];
}

const steps: ProcessStep[] = [
  {
    id: 1,
    stepNumber: 'PHASE 01',
    title: 'Discovery & Strategy',
    tagline: 'Deep architectural dive before coding',
    description:
      'A forensic audit of business goals, end-user flows, and scalability boundaries. We establish non-negotiable success metrics and technical constraints before writing a single line of code.',
    duration: 'Week 1',
    icon: Search,
    color: '#D4AF37',
    deliverables: ['System Blueprint & KPIs', 'Scope & Milestone Agreement', 'Security & Risk Radar'],
  },
  {
    id: 2,
    stepNumber: 'PHASE 02',
    title: 'Architecture & Contracts',
    tagline: 'Resilient blueprint before bricks',
    description:
      'High-throughput distributed system design: schema modeling, OpenAPI type-safe contracts, and serverless/microservices topology configured to handle 100x traffic scale.',
    duration: 'Week 1–2',
    icon: Layers,
    color: '#00F0FF',
    deliverables: ['Database Schema & ERD', 'Type-Safe API Contracts', 'Cloud Infrastructure Diagram'],
  },
  {
    id: 3,
    stepNumber: 'PHASE 03',
    title: 'AI & Full-Stack Engine',
    tagline: 'Visible velocity & autonomous intelligence',
    description:
      'Rapid iterative sprints with continuous live deployments. Real-time Gemini/OpenAI agentic workflows, clean tested TypeScript/Python, and zero technical debt.',
    duration: 'Weeks 2–8',
    icon: BrainCircuit,
    color: '#A855F7',
    deliverables: ['Live Staging Environments', 'Multi-Agent Autonomous Loops', '95%+ Automated Test Proof'],
  },
  {
    id: 4,
    stepNumber: 'PHASE 04',
    title: 'Launch & Autonomous Scale',
    tagline: 'Zero-downtime rollout with 24/7 observability',
    description:
      'Dockerized production deployment, Prometheus/Grafana telemetries, and distributed tracing. Active post-launch monitoring to scale and refine based on live operational load.',
    duration: 'Week 8+',
    icon: Rocket,
    color: '#22C55E',
    deliverables: ['99.9% Production SLA', 'Observability & Instant Alerting', 'Enterprise Handover & CI/CD'],
  },
];

export const WorkProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [active, setActive] = useState(0);

  const current = steps[active];

  return (
    <section id="process" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan-400 text-sm font-medium mb-4 border border-cyan-400/20 bg-cyan-400/10">
            <Compass className="w-4 h-4 text-cyan-400" />
            Battle-Tested Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            4-Stage <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-400 to-emerald-400">Execution Framework</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            From initial concept to enterprise deployment — transparent, high-velocity engineering
          </p>
        </motion.div>

        {/* Step Nav Rail */}
        <div className="relative mb-12">
          {/* Connector line */}
          <div className="absolute top-[28px] left-[12%] right-[12%] h-[2px] bg-white/[0.08] hidden md:block">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37] via-[#00F0FF] to-[#22C55E]"
              initial={{ width: '0%' }}
              animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {steps.map((step, index) => {
              const isActive = active === index;
              const isPast = index < active;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setActive(index)}
                  className={`relative p-5 rounded-2xl text-left transition-all duration-300 backdrop-blur-xl border ${
                    isActive
                      ? 'bg-[#121724] border-white/20 shadow-2xl scale-[1.02]'
                      : isPast
                      ? 'bg-[#0a0d14]/80 border-white/10 hover:border-white/20'
                      : 'bg-[#080a0f]/60 border-white/[0.06] hover:border-white/10'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 25px ${step.color}25` : 'none',
                  }}
                >
                  {/* Active Border Glow */}
                  {isActive && (
                    <div 
                      className="absolute -inset-[1px] rounded-2xl pointer-events-none opacity-75"
                      style={{
                        background: `linear-gradient(135deg, ${step.color} 0%, transparent 70%)`,
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        padding: '1px',
                      }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? step.color : `${step.color}15`,
                        color: isActive ? '#000000' : step.color,
                        border: `1px solid ${step.color}35`,
                      }}
                    >
                      {isPast ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span 
                      className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full"
                      style={{
                        color: step.color,
                        backgroundColor: `${step.color}15`,
                      }}
                    >
                      {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-sm mb-1">{step.title}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Clock3 className="w-3 h-3 text-gray-400" />
                    <span>{step.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Card */}
        <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-[#0a0d14]/90 border border-white/[0.1] backdrop-blur-2xl shadow-2xl">
          {/* Ambient Glow */}
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
            style={{ backgroundColor: current.color }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  style={{
                    backgroundColor: `${current.color}15`,
                    color: current.color,
                    border: `1px solid ${current.color}30`,
                  }}
                >
                  {current.stepNumber} • {current.duration}
                </span>
                <span className="text-gray-400 text-sm font-medium">
                  {current.tagline}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {current.title}
              </h3>

              <p className="text-gray-300 text-base leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Navigation buttons between steps */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  disabled={active === 0}
                  onClick={() => setActive(Math.max(0, active - 1))}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous Phase
                </button>
                <button
                  disabled={active === steps.length - 1}
                  onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
                  className="px-5 py-2 rounded-xl text-xs font-medium text-black font-semibold hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                  style={{ backgroundColor: current.color }}
                >
                  Next Phase <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Deliverables Checklist Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl p-6 bg-black/40 border border-white/[0.08] backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-gray-400">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  <span>Guaranteed Deliverables</span>
                </div>

                <div className="space-y-3">
                  {current.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] text-sm text-gray-200"
                    >
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: `${current.color}20`, color: current.color }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
