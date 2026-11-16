import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Briefcase, Code2, GraduationCap, CheckCircle2 } from 'lucide-react';

export const QuestMapSection = () => {
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

