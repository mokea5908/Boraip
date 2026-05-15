import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const Clients: React.FC = () => {
  const { lang } = useLanguage();
  const tr = t[lang].clients;
  const isEn = lang === 'en';

  return (
    <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 aurora-bg opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-bora-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="micro-label text-slate-400 mb-10 block font-bold tracking-[0.3em] uppercase">{tr.microLabel}</span>

          <h2 className={`font-bold text-slate-900 mb-16 tracking-tight ${isEn ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-3xl md:text-4xl lg:text-5xl break-keep'}`}>
            {tr.h2p1}<br className="md:hidden" /><span className="gradient-text">BorA</span>{tr.h2p2}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tr.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="rotating-border-container rounded-[2rem] group"
              >
                <div className="rotating-border-bg" />
                <div className="rotating-border-content p-8 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all">
                  <div className="flex flex-col items-center">
                    <CheckCircle2 size={32} className="text-bora-primary/40 group-hover:text-bora-primary transition-colors mb-6" />
                    <div className={`font-bold text-slate-900 mb-3 tracking-tight ${isEn ? 'text-base md:text-lg' : 'text-xl md:text-2xl break-keep'}`}>{item.label}</div>
                    <div className={`font-medium text-slate-600 ${isEn ? 'text-sm md:text-base' : 'text-lg'}`}>{item.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
