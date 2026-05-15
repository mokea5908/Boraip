import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'motion/react';
import ThreeBackground from '../ThreeBackground';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { lang } = useLanguage();
  const tr = t[lang].hero;
  const isEn = lang === 'en';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative pt-40 pb-20 px-6 lg:pt-56 lg:pb-48 overflow-hidden min-h-[95vh] flex items-center bg-white border-b border-slate-50 font-sans">
      {/* Aurora gradient wash */}
      <div className="absolute inset-0 aurora-bg pointer-events-none z-0" />
      {/* Three.js particle background */}
      <ThreeBackground />

      {/* Soft glow orbs */}
      <div className="absolute top-1/4 -left-32 w-[480px] h-[480px] rounded-full bg-bora-accent/10 blur-[120px] pointer-events-none z-0 float-soft" />
      <div className="absolute bottom-1/4 -right-32 w-[520px] h-[520px] rounded-full bg-bora-deep/15 blur-[140px] pointer-events-none z-0 float-soft" style={{ animationDelay: '2s' }} />

      <motion.div
        style={{ y: y1, opacity }}
        className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel mb-8 glow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-bora-accent pulse-glow" />
            <span className="micro-label text-bora-primary font-bold tracking-[0.3em] uppercase">{tr.badge}</span>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[1.2] md:leading-[1.1] tracking-tighter mb-12 relative"
        >
          <span className="block text-slate-900 relative z-10">
            {tr.h1Line1}
          </span>
          <span className="gradient-text inline-block relative z-10">
            {tr.h1Line2}
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`max-w-5xl font-bold leading-relaxed mb-12 mx-auto drop-shadow-sm ${
            isEn
              ? 'text-lg md:text-xl lg:text-2xl text-slate-700'
              : 'text-xl md:text-2xl lg:text-3xl text-slate-900 break-keep'
          }`}
        >
          {tr.p.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br className="hidden md:block" />}
              {line}
            </React.Fragment>
          ))}
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative group px-14 py-7 rounded-full bg-slate-900 text-white text-[14px] font-bold uppercase tracking-[0.2em] transition-all overflow-hidden glow-primary"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-bora-deep via-bora-primary to-bora-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute -inset-px rounded-full bg-gradient-to-r from-bora-accent to-bora-primary opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
            <span className="relative z-10">{tr.cta}</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
