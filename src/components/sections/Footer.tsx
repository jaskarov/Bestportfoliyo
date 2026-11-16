import React from 'react';

export const Footer = () => {
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