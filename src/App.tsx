import { MotionConfig } from 'framer-motion';
import { useCallback, useState } from 'react';
import { About } from './components/About';
import { AuthorityStrip } from './components/AuthorityStrip';
import { ConsentBanner } from './components/ConsentBanner';
import { FloatingWhatsApp, MobileActionBar } from './components/ContactBars';
import { CustomSearch } from './components/CustomSearch';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Intro, shouldShowIntro } from './components/Intro';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Services } from './components/Services';
import { Stores } from './components/Stores';
import { StructuredData } from './components/StructuredData';
import { Testimonials } from './components/Testimonials';
import { TradeIn } from './components/TradeIn';
import { VehiclesSection } from './components/vehicles/VehiclesSection';

export default function App() {
  const [showIntro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!showIntro);
  const reveal = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="fixed left-3 top-3 z-[90] -translate-y-24 rounded-[10px] bg-ouro px-4 py-3 font-semibold text-asfalto transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      {showIntro && <Intro onReveal={reveal} />}
      <Header />
      <main id="conteudo">
        <Hero ready={ready} />
        <AuthorityStrip />
        <VehiclesSection />
        <CustomSearch />
        <Services />
        <HowItWorks />
        <About />
        <TradeIn />
        <Stores />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <div className="pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        <Footer />
      </div>
      <FloatingWhatsApp />
      <MobileActionBar />
      <ConsentBanner />
      <PrivacyPolicy />
      <StructuredData />
    </MotionConfig>
  );
}
