import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const tr = t[lang].nav;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 glass-panel !rounded-none border-b border-slate-100/60"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center group cursor-pointer text-bora-primary"
            aria-label="Back to top"
          >
            <div className="flex flex-col w-fit">
              <span className="text-3xl lg:text-4xl font-black tracking-tighter leading-none transition-all duration-300 group-hover:drop-shadow-[0_2px_8px_rgba(30,58,138,0.2)]">
                BorA
              </span>
              <div className="flex justify-between w-full text-[9px] mt-1 text-slate-500 font-bold uppercase tracking-tighter">
                {"IP Consulting Firm".split('').map((char, i) => (char === ' ' ? <span key={i}>&nbsp;</span> : <span key={i}>{char}</span>))}
              </div>
            </div>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {tr.items.map((item, idx) => (
              <motion.a
                key={item.slug}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.5 }}
                href={`#${item.slug}`}
                className="text-[14px] lg:text-[15px] uppercase tracking-[0.2em] font-bold hover:text-bora-primary transition-all relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bora-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              onClick={toggleLang}
              className="relative px-6 py-2.5 rounded-full border border-bora-primary/60 text-bora-primary text-[13px] font-bold uppercase tracking-widest hover:text-white hover:border-transparent transition-all overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-bora-deep via-bora-primary to-bora-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-bora-accent to-bora-primary opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500" />
              <span className="relative z-10">
                {lang === 'ko' ? 'EN' : 'KR'}
              </span>
            </motion.button>
          </div>

          <button className="md:hidden p-2 text-bora-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 z-40 bg-white md:hidden p-6 pt-32 overflow-hidden"
        >
          <div className="flex flex-col gap-10">
            {tr.items.map((item, idx) => (
              <motion.a
                key={item.slug}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                href={`#${item.slug}`}
                className="text-6xl font-extrabold tracking-tighter text-slate-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => { toggleLang(); setIsMenuOpen(false); }}
              className="text-left text-6xl font-extrabold tracking-tighter text-bora-primary"
            >
              {lang === 'ko' ? 'EN' : 'KR'}
            </motion.button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;
