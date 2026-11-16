import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  Calendar, 
  ArrowRight, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { sendLead } from '../../utils/leadCapture';

export const ContactSection = ({ onBookCall }: { onBookCall: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendLead({
        name: formState.name,
        email: formState.email,
        message: formState.message,
        source: 'contact',
      });
      setSubmitted(true);
    } catch {
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 3000);
      setFormState({ name: '', email: '', message: '' });
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+998 90 508-33-02', href: 'tel:+998905083302' },
    { icon: MessageCircle, label: 'Telegram', value: '@Dr_eviluz', href: 'https://t.me/Dr_eviluz' },
    { icon: Mail, label: 'Email', value: 'salomh46@gmail.com', href: 'mailto:salomh46@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Tashkent, Uzbekistan', href: '#' },
  ];

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-[#D4AF37] text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Contact <span className="text-gradient-gold">Hub</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Let's discuss your next project and bring your vision to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Your Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl btn-primary text-black font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                  />
                ) : submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Fast booking banner */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              onClick={onBookCall}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl p-5 text-left transition-all relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(0,240,255,0.08))',
                border: '1px solid rgba(212,175,55,0.35)',
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">Prefer to talk it through?</p>
                  <p className="text-white/50 text-sm">Book a free 15-minute discovery call</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="glass-card rounded-xl p-5 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                  <info.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">{info.label}</p>
                  <p className="text-white font-medium group-hover:text-[#D4AF37] transition-colors">
                    {info.value}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 ml-auto group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}

            {/* Response time hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="glass rounded-xl p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Typical response time</p>
                <p className="text-white font-medium">Under 3 hours · GMT+5 timezone</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component