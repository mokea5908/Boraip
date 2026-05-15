import React from 'react';
import { motion } from 'motion/react';
import { visionSteps as koSteps } from '../../constants';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const Vision: React.FC = () => {
  const { lang } = useLanguage();
  const tr = t[lang].vision;
  const isEn = lang === 'en';
  const icons = koSteps.map(s => s.icon);

  return (
    <section id="vision" className="py-24 bg-white text-slate-900 overflow-hidden relative border-y border-slate-100 scroll-mt-20">
      {/* Aurora wash + glow orbs */}
      <div className="absolute inset-0 aurora-bg opacity-50 pointer-events-none" />
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-bora-deep/12 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-bora-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="micro-label text-slate-500 mb-6 block font-bold tracking-[0.3em] uppercase">{tr.microLabel}</span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight ${!isEn ? 'break-keep' : ''}`}>
            {tr.h2} <br className="md:hidden" /> <span className="gradient-text">{tr.h2End}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tr.steps.map((step, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                whileHover="hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative p-10 rounded-[3rem] glass-panel hover:bg-white transition-all group cursor-default overflow-hidden"
              >
                {/* Hover gradient border glow */}
                <div className="absolute -inset-px rounded-[3rem] bg-gradient-to-br from-bora-accent/30 via-transparent to-bora-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bora-primary/10 to-bora-accent/10 text-bora-primary flex items-center justify-center mb-8 group-hover:bg-gradient-to-br group-hover:from-bora-primary group-hover:to-bora-accent group-hover:text-white transition-all shadow-sm group-hover:shadow-[0_8px_30px_rgba(144,122,214,0.4)] relative">
                    <Icon size={32} />
                    <div className="absolute inset-0 rounded-2xl bg-bora-accent/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  </div>

                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">
                      <motion.span
                        variants={{ hover: { x: [0, -2, 2, -2, 2, 0], transition: { duration: 0.4 } } }}
                        className="inline-block text-bora-primary mr-1"
                      >
                        {step.prefix}
                      </motion.span>
                      <span className="text-slate-900 opacity-90">{step.suffix}</span>
                    </h3>
                  </div>

                  <div className="text-bora-primary font-bold text-sm tracking-widest uppercase mb-1">{step.target}</div>
                  <div className="text-slate-400 font-medium text-xs tracking-tight mb-8 italic">{step.subtitle}</div>

                  <ul className="space-y-3 text-left w-full">
                    {step.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 group/li">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-bora-primary to-bora-accent shrink-0 group-hover/li:scale-150 group-hover/li:shadow-[0_0_8px_rgba(79,70,229,0.6)] transition-all" />
                        <span className={`text-slate-800 leading-snug font-semibold group-hover/li:text-bora-primary transition-colors ${isEn ? 'text-sm md:text-base' : 'text-base md:text-lg lg:text-xl break-keep'}`}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Vision;
