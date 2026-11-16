import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Sparkles, 
  Palette, 
  Server, 
  Brain, 
  Database, 
  Globe, 
  Cloud, 
  Layers, 
  Bot, 
  Zap, 
  CheckCircle2, 
  Terminal 
} from 'lucide-react';

export const BudgetCalculatorSection = () => {
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
