import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const Footer: React.FC = () => {
  const { lang } = useLanguage();
  const tr = t[lang].footer;

  return (
    <footer id="contact" className="bg-slate-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-8 group cursor-pointer translate-y-1">
              <div className="flex flex-col w-fit text-left">
                <span className="text-4xl font-black tracking-tighter text-white transition-all duration-300 group-hover:text-bora-primary group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] leading-none">
                  BorA
                </span>
                <div className="flex justify-between w-full text-[9px] mt-1 text-slate-500 font-bold uppercase tracking-tighter">
                  {"IP Consulting Firm".split('').map((char, i) => (char === ' ' ? <span key={i}>&nbsp;</span> : <span key={i}>{char}</span>))}
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed break-keep">{tr.desc}</p>
          </div>

          <div>
            <h4 className="micro-label !text-white mb-6">Location</h4>
            <a
              href="https://www.google.com/maps/search/?api=1&query=인천광역시+연수구+인천타워대로+323"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 text-slate-300 text-sm leading-snug break-keep hover:text-white transition-colors group/map"
            >
              <MapPin className="w-5 h-5 flex-shrink-0 text-bora-primary group-hover/map:text-white transition-colors" />
              <div>
                인천광역시 연수구 인천타워대로 323 <br />
                A동 801-802호
              </div>
            </a>
          </div>

          <div>
            <h4 className="micro-label !text-white mb-6">Direct Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Phone className="w-5 h-5 text-bora-primary" />
                <a href="tel:010-8926-9994" className="hover:text-white transition-colors">010-8926-9994</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Mail className="w-5 h-5 text-bora-primary" />
                <a href="mailto:bora@boraip.com" className="hover:text-white transition-colors">bora@boraip.com</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="micro-label !text-white mb-6">Collaborate</h4>
            <a
              href={
                'mailto:bora@boraip.com' +
                '?subject=' +
                encodeURIComponent(
                  lang === 'ko'
                    ? '[Partner Inquiry] BorA 협업 문의'
                    : '[Partner Inquiry] BorA Collaboration'
                ) +
                '&body=' +
                encodeURIComponent(
                  lang === 'ko'
                    ? '안녕하세요, BorA IP Consulting Firm 담당자님.\n\n아래 내용으로 협업/상담을 문의드립니다.\n\n■ 회사명:\n■ 담당자 성함 / 직책:\n■ 연락처(이메일/전화):\n■ 문의 분야 (해당 항목 선택):\n   ☐ 특허 출원 및 자산화 전략\n   ☐ 특허 조사 / 자유실시(FTO)\n   ☐ 특허 분쟁 / 무효·비침해\n   ☐ 특허 소송 및 관리\n   ☐ 특허 협상 및 라이선싱\n   ☐ 전략적 IP 실사 (DD)\n   ☐ IR 지원\n   ☐ 기타\n■ 문의 내용 (자유 기재):\n\n\n감사합니다.'
                    : 'Hello BorA IP Consulting Firm,\n\nI would like to discuss a potential partnership / consultation as outlined below.\n\n■ Company:\n■ Contact Name / Title:\n■ Email / Phone:\n■ Area of Interest (please tick):\n   ☐ Patent Prosecution Strategy\n   ☐ Patent Search / FTO\n   ☐ Patent Disputes / Invalidity & Non-Infringement\n   ☐ Patent Litigation & Management\n   ☐ Patent Negotiation & Licensing\n   ☐ Strategic IP Due Diligence\n   ☐ IR Support\n   ☐ Other\n■ Message:\n\n\nThank you.'
                )
              }
              className="block text-center w-full py-5 rounded-full bg-white text-slate-900 font-bold uppercase tracking-widest text-[13px] hover:bg-bora-primary hover:text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-white/5"
            >
              Partner Inquiry
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11.5px] text-slate-500 uppercase tracking-widest font-bold">
          <p>© 2024 BORA IP CONSULTING FIRM. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href={lang === 'en' ? '/privacy-en.html' : '/privacy.html'} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy</a>
            <a href={lang === 'en' ? '/terms-en.html' : '/terms.html'} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
