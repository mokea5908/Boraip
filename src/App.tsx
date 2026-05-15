import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/sections/Navigation';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import WhyBora from './components/sections/WhyBora';
import Vision from './components/sections/Vision';
import BizModel from './components/sections/BizModel';
import Services from './components/sections/Services';
import Clients from './components/sections/Clients';
import Footer from './components/sections/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-bora-primary selection:text-white">
        <Navigation />
        <Hero />
        <Experience />
        <WhyBora />
        <BizModel />
        <Vision />
        <Services />
        <Clients />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
