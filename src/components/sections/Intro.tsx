import { AnimatePresence, motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import config from "@/config/site";

/**
 * Introdução cinematográfica.
 * Sequência: tela escura -> estrela -> frases uma a uma -> foto principal -> CTA.
 * A música ambiente (se configurada) só inicia após interação do usuário.
 */
export function Intro({ onFinish }: { onFinish: () => void }) {
  const { starLines, mainPhoto, ctaLabel, ambientMusic } = config.intro;
  const [step, setStep] = useState(0); // controla a progressão da cena
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Avança a cena automaticamente: estrela -> cada frase -> foto -> botão
  useEffect(() => {
    const totalSteps = 1 + starLines.length + 2; // estrela + frases + foto + cta
    if (step >= totalSteps) return;
    const delay = step === 0 ? 1200 : 1900;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step, starLines.length]);

  const showStar = step >= 0;
  const showPhoto = step >= 1 + starLines.length;
  const showCta = step >= 1 + starLines.length + 1;

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (muted) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
      setMuted(false);
    } else {
      audioRef.current.pause();
      setMuted(true);
    }
  };

  const handleStart = () => {
    // tenta iniciar a música (agora há interação do usuário)
    if (ambientMusic && audioRef.current && muted) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
      setMuted(false);
    }
    onFinish();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-black px-6 text-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1 }}
    >
      {ambientMusic && (
        <audio ref={audioRef} src={ambientMusic} loop preload="auto" />
      )}

      {/* Céu de fundo */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Estrela principal que surge (empilhada acima da frase, não sobreposta) */}
      <AnimatePresence>
        {showStar && !showPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="relative z-10 mb-6 text-5xl"
          >
            <span className="inline-block animate-float text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.9)]">
              ✦
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Frases, uma de cada vez */}
      <div className="relative z-10 flex min-h-[8rem] items-center">
        <AnimatePresence mode="wait">
          {!showPhoto &&
            step >= 1 &&
            step <= starLines.length &&
            starLines[step - 1] && (
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-2xl font-display text-2xl leading-relaxed text-white/90 sm:text-3xl md:text-4xl"
              >
                {starLines[step - 1]}
              </motion.p>
            )}
        </AnimatePresence>
      </div>

      {/* Foto principal + CTA */}
      <AnimatePresence>
        {showPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-red-600/40 to-pink-400/30 blur-2xl" />
              <img
                src={mainPhoto}
                alt="Nossa foto principal"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://picsum.photos/seed/nosso-inicio/800/800";
                }}
                className="relative h-64 w-64 rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/20 sm:h-80 sm:w-80"
              />
            </div>

            <AnimatePresence>
              {showCta && (
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  onClick={handleStart}
                  className="btn-primary mt-10 text-lg"
                >
                  <Play size={18} className="fill-white" />
                  {ctaLabel} ❤️
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controle de som (canto) */}
      {ambientMusic && showPhoto && (
        <button
          onClick={toggleSound}
          aria-label="Ativar/desativar música"
          className="absolute bottom-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 backdrop-blur"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}

      {/* Pular introdução */}
      <button
        onClick={handleStart}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white/80"
      >
        pular introdução
      </button>
    </motion.div>
  );
}

export default Intro;
