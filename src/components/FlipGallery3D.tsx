import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Sparkles, ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';

interface FlipGallery3DProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export const FlipGallery3D: React.FC<FlipGallery3DProps> = ({
  projects,
  onOpenProject,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full select-none py-6">
      {/* 3D Flip Card Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const isFlipped = !!flipped[index];

          return (
            <div
              key={project.title}
              className="group relative h-[440px] w-full [perspective:1400px]"
              onMouseEnter={() => setActiveIdx(index)}
            >
              {/* 3D Flippable Box */}
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="relative h-full w-full rounded-2xl [transform-style:preserve-3d] transition-shadow duration-500 shadow-xl"
              >
                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 h-full w-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden [backface-visibility:hidden] bg-[#0c0f17]/90 border border-white/10 backdrop-blur-xl group-hover:border-[#D4AF37]/40 transition-colors"
                  style={{
                    background: `radial-gradient(circle at 80% 20%, ${project.color}15, transparent 70%), #0a0d14`,
                  }}
                >
                  {/* Subtle Background Glow */}
                  <div
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ backgroundColor: project.color }}
                  />

                  {/* Header metadata */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/70">
                      {project.category || 'ARCHITECTURE'}
                    </span>
                    <button
                      onClick={(e) => toggleFlip(index, e)}
                      title="Flip to details"
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] font-mono text-[#D4AF37] transition-all cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>3D FLIP</span>
                    </button>
                  </div>

                  {/* Project Showcase Visual / Icon */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6 text-center">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 border border-white/15 shadow-2xl transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: `${project.color}20`,
                        boxShadow: `0 0 35px ${project.color}35`,
                      }}
                    >
                      <Sparkles className="w-9 h-9" style={{ color: project.color }} />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-gradient-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/50 max-w-xs mt-2 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-xs font-mono text-white/40">
                      {project.stats || 'Enterprise Grade'}
                    </span>
                    <button
                      onClick={() => onOpenProject(project)}
                      className="flex items-center gap-2 text-xs font-semibold text-white px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* BACK FACE (Architectural Blueprint & Stack Details) */}
                <div
                  className="absolute inset-0 h-full w-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#07090e] border border-[#00F0FF]/30 backdrop-blur-2xl shadow-2xl"
                  style={{
                    background: `radial-gradient(circle at 20% 80%, rgba(0,240,255,0.15), transparent 70%), #07090e`,
                  }}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#00F0FF] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                      TECH SPECIFICATION
                    </span>
                    <button
                      onClick={(e) => toggleFlip(index, e)}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] font-mono text-white/70 transition-all cursor-pointer"
                    >
                      FLIP BACK
                    </button>
                  </div>

                  {/* Middle Specs & Architecture */}
                  <div className="my-auto space-y-4">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-1.5">
                        Role &amp; Scope
                      </h4>
                      <p className="text-sm text-white/90 leading-relaxed">
                        {project.longDescription || project.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-cyan-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Direct Launch Button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-white/40">
                      Live Preview &amp; Code
                    </span>
                    <button
                      onClick={() => onOpenProject(project)}
                      className="flex items-center gap-2 text-xs font-semibold text-black px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F0FF] to-cyan-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Launch Showcase</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
