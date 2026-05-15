import React from 'react';
import { motion } from 'motion/react';
import { values as koValues } from '../../constants';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const WhyBora: React.FC = () => {
  const { lang } = useLanguage();
  const trValues = t[lang].values;
  const isEn = lang === 'en';
  const icons = koValues.map(v => v.icon);

  return (
    <section className="relative py-20 bg-white overflow-hidden border-y border-slate-200">
      {/* Ambient glow backdrop */}
      <div className="absolute inset-0 aurora-bg opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-bora-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {trValues.map((v, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, rotateX: -5 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{
                  y: -14,
                  scale: 1.04,
                  rotateY: idx === 0 ? 5 : idx === 2 ? -5 : 0,
                  rotateX: 2,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.15,
                  y: { type: "spring", stiffness: 300, damping: 20 },
                  scale: { type: "spring", stiffness: 300, damping: 20 },
                  rotateY: { type: "spring", stiffness: 200, damping: 30 },
                }}
                style={{ perspective: 1000 }}
                className="relative flex flex-col gap-6 p-10 rounded-[2.5rem] glass-dark text-white h-full group text-center items-center w-full max-w-sm cursor-pointer overflow-hidden"
              >
                {/* Animated gradient border glow on hover */}
                <div className="absolute -inset-px rounded-[2.5rem] bg-gradient-to-br from-bora-accent/50 via-transparent to-bora-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />
                {/* Top radial spotlight on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(144,122,214,0.28) 0%, transparent 60%)' }}
                />

                <div className="relative z-10 mb-4">
                  <div className="w-20 h-20 rounded-2xl border border-slate-600/40 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-bora-primary group-hover:text-bora-accent group-hover:border-bora-accent/60 transition-all duration-500 relative">
                    <Icon size={34} strokeWidth={1.5} />
                    <div className="absolute inset-0 rounded-2xl bg-bora-accent/35 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  </div>
                </div>

                <h4 className="relative z-10 text-xl md:text-2xl font-bold tracking-tight text-white">
                  {v.title}
                </h4>
                <p className={`relative z-10 text-slate-200 leading-[1.7] font-medium tracking-tight px-2 ${isEn ? 'text-base md:text-lg' : 'text-lg md:text-xl break-keep whitespace-pre-line'}`}>
                  {v.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyBora;
