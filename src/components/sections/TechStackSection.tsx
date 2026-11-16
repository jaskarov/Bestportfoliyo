import { useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Code2, Server, Brain, Terminal, Layers } from 'lucide-react';
import { InteractiveGrid, TECH_ITEMS } from '../InteractiveGrid';

export const TechStackSection = () => {
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

