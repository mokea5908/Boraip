import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Milestone } from 'lucide-react';
import { practitioners } from '../../constants';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const Experience: React.FC = () => {
  const { lang } = useLanguage();
  const tr = t[lang].experience;
  const isEn = lang === 'en';

  return (
    <section id="experience" className="pt-24 pb-0 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="sticky top-32"
            >
              <span className="micro-label text-slate-600 mb-6 block font-bold">{tr.microLabel}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 tracking-tighter break-keep">
                {tr.h2} <br />
                <span className="text-bora-primary underline decoration-bora-primary/30 underline-offset-8">{tr.h2Highlight}</span>
              </h2>
              <div className="aspect-[453/522] overflow-hidden rounded-[2.5rem] bg-slate-100 mb-8 border border-slate-200/70 relative group shadow-[0_25px_60px_-20px_rgba(30,58,138,0.28)]">
                {/* Brand gradient ring on hover */}
                <div className="absolute -inset-px rounded-[2.5rem] bg-gradient-to-br from-bora-primary/40 via-transparent to-bora-accent/40 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700 pointer-events-none" />

                <img
                  src={practitioners[0].image}
                  alt="CEO Park Kwisu"
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-[filter,transform] duration-[900ms] ease-out group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />

                {/* Always-on subtle gradient at bottom for legibility */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate-900/75 via-slate-900/25 to-transparent pointer-events-none" />

                {/* Accent dot top-right */}
                <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-bora-accent shadow-[0_0_14px_rgba(144,122,214,0.85)] pulse-glow" />

                {/* Caption — always visible, intensifies on hover */}
                <div className="absolute bottom-7 left-7 right-7 flex flex-col gap-1.5">
                  <span className="text-bora-accent text-[10px] font-black tracking-[0.32em] uppercase opacity-90">— BorA</span>
                  <p className="text-white text-[13px] md:text-sm font-bold tracking-[0.22em] uppercase leading-tight">
                    Executive Strategy Lead
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight">{tr.name}</h4>
                <p className="text-bora-primary font-bold text-base md:text-lg tracking-widest uppercase">{tr.role}</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-10 bg-slate-50 rounded-[3rem] border border-slate-200 relative overflow-hidden"
            >
              <div className="space-y-8 relative z-10">
                <p className={`text-xl md:text-2xl font-bold text-slate-900 leading-relaxed ${!isEn ? 'break-keep' : ''}`}>
                  {tr.quote1Line1}<br className="hidden md:block" />
                  {tr.quote1Line2}
                </p>
                <div className="p-8 bg-white/70 backdrop-blur-md rounded-[2rem] border-l-8 border-bora-primary shadow-xl shadow-slate-200/40">
                  <p className={`text-lg md:text-xl font-medium text-slate-800 leading-relaxed ${!isEn ? 'break-keep lg:text-2xl' : ''}`}>
                    "<span className="text-bora-primary font-black tracking-tighter">BorA</span>{tr.quote2After}<span className="text-bora-primary font-extrabold">{tr.quote2Highlight}</span>{tr.quote2End}"
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-8 relative">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold flex items-center gap-3 tracking-tight text-slate-800"
              >
                <Milestone className="text-bora-primary" size={24} />
                Professional Experience
              </motion.h3>

              <div className="relative border-l-2 border-slate-200 ml-1.5 pl-8 space-y-12 pb-24">
                {tr.experienceData.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute top-2 left-[-38px] w-3 h-3 rounded-full bg-bora-primary ring-4 ring-white group-hover:scale-125 transition-transform z-10" />
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-2">
                      <span className="text-bora-primary font-extrabold tracking-tighter text-2xl md:text-3xl italic">{exp.period}</span>
                      <span className="text-slate-900 font-bold text-base md:text-lg lg:text-xl">{exp.role}</span>
                    </div>
                    <p className={`text-slate-900 mb-2 font-bold text-base md:text-lg leading-relaxed ${!isEn ? 'break-keep lg:text-xl whitespace-nowrap' : ''}`}>{exp.description}</p>
                    <ul className="flex flex-col gap-2">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className={`flex items-start gap-3 text-base md:text-lg text-slate-800 group ${!isEn ? 'whitespace-nowrap lg:text-xl' : 'leading-snug'}`}>
                          <ChevronRight size={20} className="text-bora-primary group-hover:translate-x-1 transition-transform flex-shrink-0 mt-0.5" />
                          <span className="font-semibold group-hover:text-bora-primary transition-colors tracking-tight">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
