import React from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, ShieldCheck, AlertCircle, ArrowRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const BizModel: React.FC = () => {
  const { lang } = useLanguage();
  const tr = t[lang].bizModel;
  const isEn = lang === 'en';

  return (
    <section id="bizmodel" className="py-24 bg-slate-50 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 px-4">
          <span className="micro-label text-slate-600 mb-6 block font-bold uppercase tracking-widest">{tr.microLabel}</span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight mb-8 ${!isEn ? 'break-keep' : ''}`}>{tr.h2}</h2>
          <div className="space-y-6 max-w-5xl mx-auto">
            <h3 className={`font-bold text-slate-900 leading-tight ${isEn ? 'text-xl md:text-2xl lg:text-3xl' : 'text-2xl md:text-3xl lg:text-4xl break-keep'}`}>
              "{tr.h3p1}<span className="text-bora-primary">{tr.h3hl1}</span>{tr.h3p2}<span className="text-bora-primary">{tr.h3hl2}</span>{tr.h3end}"
            </h3>
            <p className={`font-bold text-slate-800 leading-relaxed ${isEn ? 'text-base md:text-lg lg:text-xl' : 'text-lg md:text-xl lg:text-2xl break-keep'}`}>
              <span className="text-bora-primary">BorA</span>{tr.pp1}<br className="hidden md:block" />
              <span className="text-emerald-600">{tr.phl1}</span>{tr.pp2}<span className="text-bora-primary">{tr.phl2}</span>{tr.pend}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 rounded-full bora-gradient shadow-[0_0_40px_rgba(79,70,229,0.3)] border-4 border-white items-center justify-center text-white overflow-hidden transition-transform hover:scale-110 duration-500">
            <div className="animate-[sweep-x_3s_infinite_linear]">
              <ArrowRight size={38} strokeWidth={2.5} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch h-full">
            <motion.div
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-10 md:p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group flex flex-col min-h-[500px]"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity size={120} />
              </div>
              <h4 className={`font-bold mb-10 text-slate-900 ${isEn ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl break-keep'}`}>
                {tr.conventionalTitle} <br />{tr.conventionalSubtitle}
              </h4>
              <ul className="space-y-8 flex-grow">
                {tr.conventional.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-slate-700">
                    <AlertCircle size={22} className="text-slate-300 mt-1 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className={`font-bold text-slate-900 mb-1.5 tracking-tight ${isEn ? 'text-base md:text-lg' : 'text-lg md:text-xl lg:text-2xl'}`}>{item.label}</span>
                      <span className={`font-semibold text-slate-600 leading-relaxed ${isEn ? 'text-sm md:text-base' : 'text-base md:text-lg lg:text-xl break-keep'}`}>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="lg:hidden flex justify-center py-8">
              <div className="w-20 h-20 rounded-full bora-gradient shadow-lg border-4 border-white flex items-center justify-center text-white overflow-hidden">
                <div className="animate-[sweep-y_3s_infinite_linear]">
                  <ArrowDown size={30} strokeWidth={3} />
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-10 md:p-12 bora-gradient rounded-[3rem] text-white shadow-2xl relative overflow-hidden z-10 border border-white/10 flex flex-col min-h-[500px]"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Zap size={120} />
              </div>
              <h4 className={`font-bold mb-10 ${isEn ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl break-keep'}`}>
                {tr.boraTitle} <br />{tr.boraSubtitle}
              </h4>
              <ul className="space-y-8 flex-grow">
                {tr.edge.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-white/90">
                    <ShieldCheck size={22} className="text-green-400 mt-1 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className={`font-bold text-white mb-1.5 tracking-tight ${isEn ? 'text-base md:text-lg' : 'text-lg md:text-xl lg:text-2xl'}`}>{item.label}</span>
                      <span className={`font-semibold text-white/90 leading-relaxed ${isEn ? 'text-sm md:text-base' : 'text-base md:text-lg lg:text-xl break-keep'}`}>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BizModel;
