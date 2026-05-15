import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { servicesDetailed } from '../../constants';
import { useLanguage } from '../../context/LanguageContext';
import { t, servicesEn } from '../../i18n/translations';

const Services: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const { lang } = useLanguage();
  const tr = t[lang].services;
  const isEn = lang === 'en';

  const toggleCard = (idx: number) => {
    setExpandedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const services = servicesDetailed.map((service, idx) => {
    if (isEn) {
      const en = servicesEn[idx];
      return { ...service, title: en.title, titleEn: en.titleEn, desc: en.desc, boraEdge: en.boraEdge };
    }
    return service;
  });

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-bora-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-bora-deep/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-4xl">
            <span className="micro-label text-slate-600 mb-6 block font-bold tracking-[0.2em]">{tr.microLabel}</span>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight mb-8 ${!isEn ? 'break-keep' : ''}`}>
              {tr.h2} <br /> <span className="gradient-text">{tr.h2End}</span>
            </h2>
            <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight ${!isEn ? 'break-keep' : ''}`}>
              {tr.h3}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const isExpanded = expandedCards[idx];
            const total = services.length;
            const isLast = idx === total - 1;
            // Centre the final card when it would otherwise sit alone on its last row.
            const mdLeftover = total % 2 === 1 && isLast;
            const lgLeftover = total % 3 === 1 && isLast;
            const centerClass = [
              mdLeftover ? 'md:col-span-2 md:justify-self-center md:w-full md:max-w-md' : '',
              lgLeftover ? 'lg:col-start-2 lg:col-span-1 lg:max-w-none' : '',
            ].filter(Boolean).join(' ');
            return (
              <motion.div
                key={`${lang}-${idx}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group p-8 md:p-10 glass-panel rounded-[3rem] hover:bg-white transition-all border border-slate-100/60 flex flex-col relative overflow-hidden ${centerClass}`}
              >
                {/* Hover gradient border glow */}
                <div className="absolute -inset-px rounded-[3rem] bg-gradient-to-br from-bora-accent/40 via-transparent to-bora-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />

                <div className="relative z-10 mb-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-slate-50 flex items-center justify-center text-bora-primary shadow-sm group-hover:scale-110 group-hover:shadow-[0_10px_30px_rgba(79,70,229,0.25)] transition-all">
                  <service.icon size={26} strokeWidth={1.5} />
                  <div className="absolute inset-0 rounded-2xl bg-bora-accent/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                </div>
                <div className="mb-4">
                  <h3 className={`font-bold mb-2 tracking-tight ${isEn ? 'text-xl md:text-2xl lg:text-3xl' : 'text-2xl md:text-3xl lg:text-4xl'}`}>
                    {service.title}
                  </h3>
                  <p className={`font-bold uppercase tracking-widest ${isEn ? 'text-[11px] text-slate-400' : 'text-sm text-slate-500'}`}>
                    {service.titleEn}
                  </p>
                </div>
                <div className={`leading-relaxed mb-6 font-medium ${isEn ? 'text-base md:text-lg' : 'text-lg md:text-xl break-keep'}`}>
                  {service.desc.split('\n').map((line, i) => (
                    <span
                      key={i}
                      className={`block ${
                        i === 0
                          ? `font-bold text-slate-900 mb-3 ${isEn ? 'text-base md:text-lg min-h-[4.5rem]' : 'text-xl md:text-2xl min-h-[5.5rem] lg:min-h-[6.5rem]'}`
                          : `mt-3 text-slate-600 leading-normal ${isEn ? 'text-sm md:text-base' : ''}`
                      }`}
                    >
                      {i === 1 ? (
                        line.split('BorA').map((part, pI) => (
                          <React.Fragment key={pI}>
                            {pI > 0 && <span className="text-bora-primary font-bold">BorA</span>}
                            {part}
                          </React.Fragment>
                        ))
                      ) : (
                        line
                      )}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-col justify-end">
                  <div className="flex items-center mb-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleCard(idx);
                      }}
                      className="bg-bora-primary/10 text-bora-primary hover:bg-bora-primary/15 px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm transition-colors cursor-pointer"
                    >
                      {isExpanded ? tr.collapseBtn : tr.expandBtn}
                      <ChevronDown className={`w-4 h-4 mt-0.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'animate-bounce'}`} />
                    </button>
                  </div>

                  <div
                    className={`transition-all duration-700 ease-in-out border-t overflow-hidden ${
                      isExpanded
                        ? 'border-slate-300 max-h-[2000px] opacity-100 pt-8 mt-4'
                        : 'border-transparent max-h-0 opacity-0 pt-0 mb-0 mt-0'
                    }`}
                  >
                    <div className="text-[13px] text-bora-primary font-black uppercase tracking-[0.15em] mb-6">{tr.boraEdgeLabel}</div>
                    <div className={`font-semibold leading-relaxed text-slate-800 ${isEn ? 'text-sm md:text-base' : 'text-base md:text-lg break-keep'}`}>
                      {service.boraEdge.map((edge, i) => (
                        <div key={i} className={`flex flex-col gap-1.5 last:mb-0 ${isEn ? 'mb-4' : 'mb-6'}`}>
                          {edge.label && (
                            <div className="flex gap-3 items-start">
                              <span className="text-bora-primary flex-shrink-0 mt-1">•</span>
                              <span className={`font-black text-bora-primary tracking-wide ${isEn ? 'text-sm md:text-base' : 'text-lg'}`}>{edge.label}</span>
                            </div>
                          )}
                          <span className={`font-semibold text-slate-700 leading-relaxed ${edge.label ? 'ml-6' : ''} ${isEn ? 'text-sm md:text-base' : 'text-lg'}`}>{edge.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
