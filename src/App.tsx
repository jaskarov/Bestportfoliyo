import { useEffect, useState } from 'react';
import type { Project } from './data/projects';
import { ProjectModal } from './components/ProjectModal';
import { AIChatWidget } from './components/AIChatWidget';
import { WorkProcessSection } from './components/WorkProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingModal } from './components/BookingModal';
import { UISoundEngine } from './components/UISoundEngine';
import { AutoTranslator, type Language } from './localization';
import { CircadianAtmosphere } from './components/CircadianAtmosphere';
import { AscentLenisProvider } from './components/AscentLenisProvider';

// Modular Sections
import { Navigation } from './components/sections/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { QuestMapSection } from './components/sections/QuestMapSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { ProjectShowcaseSection } from './components/sections/ProjectShowcaseSection';
import { BudgetCalculatorSection } from './components/sections/BudgetCalculatorSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

export function App() {
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
        ? 'Asqarov Javohirbek | Full-Cycle Product Architect & AI Systems Founder'
        : language === 'RU'
        ? 'Аскаров Джавохирбек | Full-Cycle Product Architect & AI Systems Founder'
        : 'Asqarov Javohirbek | Full-Cycle Product Architect & AI Systems Founder';
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
