import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { FlipGallery3D } from '../FlipGallery3D';
import { projects, type Project } from '../../data/projects';

export const ProjectShowcaseSection = ({ onOpenProject }: { onOpenProject: (p: Project) => void }) => {
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