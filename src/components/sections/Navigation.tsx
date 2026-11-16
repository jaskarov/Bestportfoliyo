import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, Volume2, VolumeX, Menu, X } from 'lucide-react';
import type { Language } from '../../localization';

export const Navigation = ({
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