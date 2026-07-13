import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import config from "@/config/site";

// Efeitos e chrome
import StarfieldBackground from "@/components/effects/StarfieldBackground";
import HeartsRain from "@/components/effects/HeartsRain";
import LoadingScreen from "@/components/chrome/LoadingScreen";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import BackToTop from "@/components/chrome/BackToTop";
import Navbar from "@/components/chrome/Navbar";

// Seções principais (carregadas de imediato)
import Intro from "@/components/sections/Intro";
import Hero from "@/components/sections/Hero";
import Countdown from "@/components/sections/Countdown";
import Timeline from "@/components/sections/Timeline";
import FloatingQuote from "@/components/ui/FloatingQuote";

// Seções mais pesadas / abaixo da dobra — lazy loading p/ performance
const Gallery = lazy(() => import("@/components/sections/Gallery"));
const Videos = lazy(() => import("@/components/sections/Videos"));
const Music = lazy(() => import("@/components/sections/Music"));
const Letters = lazy(() => import("@/components/sections/Letters"));
const Reasons = lazy(() => import("@/components/sections/Reasons"));
const CalendarSection = lazy(() => import("@/components/sections/CalendarSection"));
const MapSection = lazy(() => import("@/components/sections/MapSection"));
const TimeCapsule = lazy(() => import("@/components/sections/TimeCapsule"));
const DreamsSection = lazy(() => import("@/components/sections/DreamsSection"));
const HorizontalTimeline = lazy(() => import("@/components/sections/HorizontalTimeline"));
const Quiz = lazy(() => import("@/components/sections/Quiz"));
const LoveGame = lazy(() => import("@/components/game/LoveGame"));
const FinalLetter = lazy(() => import("@/components/sections/FinalLetter"));
const Footer = lazy(() => import("@/components/sections/Footer"));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const [heartsActive, setHeartsActive] = useState(false);

  // Loading inicial curto (dá tempo das fontes/estilos entrarem).
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  // Trava o scroll enquanto a introdução está aberta.
  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone]);

  // Easter egg: chuva de corações (usada em vários gatilhos).
  const triggerHearts = useCallback(() => {
    setHeartsActive(false);
    // reinicia a animação mesmo se já estiver ativa
    requestAnimationFrame(() => {
      setHeartsActive(true);
      setTimeout(() => setHeartsActive(false), 4500);
    });
  }, []);

  // Easter egg secreto: sequência de teclas "amor" no teclado.
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === "amor") triggerHearts();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [triggerHearts]);

  const quotes = config.quotes;

  return (
    <>
      <LoadingScreen visible={loading} />

      <AnimatePresence>
        {!introDone && !loading && (
          <Intro onFinish={() => setIntroDone(true)} />
        )}
      </AnimatePresence>

      <StarfieldBackground />
      <HeartsRain active={heartsActive} />
      <ScrollProgress />
      <Navbar onSecret={triggerHearts} />
      <BackToTop />

      <main className="relative">
        <Hero />
        <Countdown />

        {quotes[0] && <FloatingQuote text={quotes[0]} />}

        <Timeline />

        <Suspense fallback={<SectionFallback />}>
          <HorizontalTimeline />
          <Gallery />

          {quotes[1] && <FloatingQuote text={quotes[1]} />}

          <Videos />
          <Music />
          <Letters />
          <Reasons />

          {quotes[2] && <FloatingQuote text={quotes[2]} />}

          <CalendarSection />
          <MapSection />
          <TimeCapsule />
          <DreamsSection />

          {quotes[3] && <FloatingQuote text={quotes[3]} />}

          <Quiz />
          <LoveGame />

          {quotes[4] && <FloatingQuote text={quotes[4]} />}

          <FinalLetter />
          <Footer onSecret={triggerHearts} />
        </Suspense>
      </main>
    </>
  );
}

/** Placeholder animado enquanto uma seção lazy carrega. */
function SectionFallback() {
  return (
    <div className="flex justify-center px-5 py-20">
      <div className="glass h-40 w-full max-w-4xl shimmer rounded-3xl" />
    </div>
  );
}
