import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import config from "@/config/site";
import Section from "@/components/ui/Section";
import GardenScene from "./GardenScene";
import PixelCharacter from "./PixelCharacter";

type Phase = "asking" | "story";

// Roteiro da historinha do "Sim". Cada passo tem uma duração e o estado da cena.
interface Step {
  ms: number;
  boy: number; // posição horizontal (%)
  girl: number;
  blush?: boolean;
  smile?: boolean;
  hearts?: boolean;
  hug?: boolean;
  kiss?: boolean;
  bigHeart?: boolean;
  fireworks?: boolean;
  caption?: string;
}

const START_BOY = 20;
const START_GIRL = 68;

const script: Step[] = [
  { ms: 1600, boy: START_BOY, girl: START_GIRL, caption: "Eles se olham..." },
  { ms: 1400, boy: START_BOY, girl: START_GIRL, smile: true, caption: "E abrem um sorriso" },
  { ms: 1400, boy: START_BOY, girl: START_GIRL, smile: true, blush: true, caption: "Ficam corados..." },
  { ms: 1600, boy: START_BOY, girl: START_GIRL, smile: true, blush: true, hearts: true, caption: "Coraçõezinhos no ar" },
  { ms: 2200, boy: 33, girl: 55, smile: true, blush: true, hearts: true, caption: "Caminham um em direção ao outro..." },
  { ms: 1500, boy: 36, girl: 52, smile: true, blush: true, hearts: true, caption: "Param e se olham de novo" },
  { ms: 1800, boy: 40, girl: 49, smile: true, blush: true, hearts: true, caption: "E dão as mãos" },
  { ms: 1800, boy: 40, girl: 49, smile: true, blush: true, hearts: true, caption: "Ficam ali, só admirando um ao outro..." },
  { ms: 2000, boy: 43, girl: 46, smile: true, blush: true, hearts: true, hug: true, caption: "Um abraço bem fofinho" },
  { ms: 1300, boy: 39, girl: 50, smile: true, blush: true, hearts: true, caption: "Se afastam um pouquinho..." },
  { ms: 2000, boy: 43, girl: 47, smile: true, blush: true, hearts: true, kiss: true, caption: "E um beijinho delicado" },
  { ms: 2200, boy: 42, girl: 48, smile: true, blush: true, hearts: true, bigHeart: true, fireworks: true, caption: "" },
  { ms: 100000, boy: 42, girl: 48, smile: true, blush: true, hearts: true, bigHeart: true, fireworks: true, caption: "" },
];

export function LoveGame() {
  const [phase, setPhase] = useState<Phase>("asking");
  const [typed, setTyped] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);
  const [step, setStep] = useState(0);
  const [showFinal, setShowFinal] = useState(0); // 0 nenhum, 1 primeira linha, 2 segunda + botão
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [teaseIdx, setTeaseIdx] = useState(-1);
  const scoreRef = useRef(0);

  const { game } = config;

  // Efeito de máquina de escrever na frase de introdução.
  useEffect(() => {
    if (phase !== "asking") return;
    setTyped("");
    setShowQuestion(false);
    let i = 0;
    const line = game.introLine;
    const id = setInterval(() => {
      i++;
      setTyped(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(id);
        setTimeout(() => setShowQuestion(true), 600);
      }
    }, 45);
    return () => clearInterval(id);
  }, [phase, game.introLine]);

  // Avança o roteiro da historinha.
  useEffect(() => {
    if (phase !== "story") return;
    if (step >= script.length - 1) {
      // último passo: revela as mensagens finais
      const t1 = setTimeout(() => setShowFinal(1), 600);
      const t2 = setTimeout(() => setShowFinal(2), 2600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    const t = setTimeout(() => setStep((s) => s + 1), script[step].ms);
    return () => clearTimeout(t);
  }, [phase, step]);

  const current = script[Math.min(step, script.length - 1)];
  const night = phase === "story" && step >= 3; // vira noite conforme a mágica acontece

  // Botão "Não" foge.
  const flee = useCallback(() => {
    const x = (Math.random() - 0.5) * 260;
    const y = (Math.random() - 0.5) * 120;
    setNoPos({ x, y });
    setTeaseIdx((t) => Math.min(t + 1, game.noTeases.length - 1));
    scoreRef.current += 1;
  }, [game.noTeases.length]);

  const sayYes = () => {
    setPhase("story");
    setStep(0);
    setShowFinal(0);
  };

  const reset = () => {
    setPhase("asking");
    setStep(0);
    setShowFinal(0);
    setNoPos({ x: 0, y: 0 });
    setTeaseIdx(-1);
    scoreRef.current = 0;
  };

  return (
    <Section
      id="jogo"
      eyebrow="Uma surpresa especial"
      title={<>Você me <span className="text-gradient">ama?</span></>}
      subtitle="Fica até o final... tem uma perguntinha muito importante"
    >
      <GameStyles />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto aspect-[4/5] w-full max-w-2xl overflow-hidden rounded-[2rem] border border-glass/15 shadow-soft sm:aspect-[16/12]"
      >
        <GardenScene night={night} />

        {/* Personagens */}
        <motion.div
          className="absolute bottom-[16%] z-10 h-[38%]"
          animate={{ left: `${current.boy}%` }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          style={{ translateX: "-50%" }}
        >
          <PixelCharacter
            variant="boy"
            blush={current.blush}
            bigSmile={current.smile}
            className="h-full w-auto"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-[16%] z-10 h-[38%]"
          animate={{ left: `${current.girl}%` }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          style={{ translateX: "-50%" }}
        >
          <PixelCharacter
            variant="girl"
            flip
            blush={current.blush}
            bigSmile={current.smile}
            className="h-full w-auto"
          />
        </motion.div>

        {/* Coraçõezinhos ao redor */}
        <AnimatePresence>
          {phase === "story" && current.hearts && (
            <div className="pointer-events-none absolute inset-0 z-20">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-primary"
                  style={{ left: `${35 + Math.random() * 30}%`, bottom: "30%", fontSize: 12 + Math.random() * 12 }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -120 - Math.random() * 60 }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25, ease: "easeOut" }}
                >
                  ❤
                </motion.span>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Coração grande acima do casal */}
        <AnimatePresence>
          {current.bigHeart && (
            <motion.div
              className="absolute left-[45%] top-[12%] z-20 -translate-x-1/2 text-6xl text-primary drop-shadow-[0_0_20px_rgba(220,38,38,0.7)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              ❤
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fogos em forma de coração */}
        <AnimatePresence>
          {current.fireworks && (
            <div className="pointer-events-none absolute inset-0 z-10">
              {[
                { x: 22, y: 20 },
                { x: 70, y: 16 },
                { x: 50, y: 10 },
              ].map((f, fi) => (
                <div key={fi} className="absolute" style={{ left: `${f.x}%`, top: `${f.y}%` }}>
                  {Array.from({ length: 14 }).map((_, i) => {
                    const t = (i / 14) * Math.PI * 2;
                    // curva de coração (paramétrica)
                    const hx = 16 * Math.pow(Math.sin(t), 3);
                    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                    return (
                      <motion.span
                        key={i}
                        className="absolute h-1.5 w-1.5 rounded-full"
                        style={{ background: ["#ff5d6c", "#ffd6a5", "#c4b5fd"][fi % 3] }}
                        initial={{ x: 0, y: 0, opacity: 0 }}
                        animate={{ x: hx * 4, y: hy * 4, opacity: [0, 1, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, delay: fi * 0.4 + i * 0.02, ease: "easeOut" }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Zoom cinematográfico + mensagem final */}
        <AnimatePresence>
          {showFinal > 0 && (
            <motion.div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 px-6 text-center backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-display text-4xl font-bold text-white drop-shadow-lg sm:text-5xl"
              >
                {game.successLines[0]}
              </motion.p>
              {showFinal >= 2 && (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 max-w-md font-hand text-2xl text-white/95 sm:text-3xl"
                  >
                    {game.successLines[1]}
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={reset}
                    className="btn-primary mt-8"
                  >
                    <RotateCcw size={17} /> {game.backLabel}
                  </motion.button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Caixa de diálogo + botões (fase de pergunta) */}
        <AnimatePresence>
          {phase === "asking" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="absolute inset-x-3 bottom-3 z-30"
            >
              <div className="glass-strong rounded-2xl p-4 sm:p-5">
                <p className="min-h-[1.5rem] font-display text-lg text-ink sm:text-xl">
                  {!showQuestion ? (
                    <>
                      {typed}
                      <span className="ml-0.5 inline-block h-5 w-1 animate-pulse bg-primary align-middle" />
                    </>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-bold text-gradient"
                    >
                      {game.question}
                    </motion.span>
                  )}
                </p>

                {showQuestion && (
                  <div className="relative mt-4 flex min-h-[3.5rem] items-center justify-center gap-4">
                    <button onClick={sayYes} className="btn-primary z-10">
                      💛 {game.yesLabel}
                    </button>

                    {/* Botão que foge */}
                    <motion.button
                      onMouseEnter={flee}
                      onClick={flee}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        flee();
                      }}
                      animate={{ x: noPos.x, y: noPos.y, rotate: teaseIdx * 15 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                      className="btn-ghost absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                    >
                      💔 {game.noLabel}
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legenda narrativa durante a historinha */}
        <AnimatePresence mode="wait">
          {phase === "story" && current.caption && showFinal === 0 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-3 bottom-3 z-30"
            >
              <div className="glass-strong rounded-2xl px-5 py-3 text-center">
                <p className="font-display text-lg text-ink">{current.caption}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

/** Keyframes específicos do cenário do jogo (injetados uma vez). */
function GameStyles() {
  return (
    <style>{`
      .pixel-char { image-rendering: pixelated; }
      .pixel-flip { transform: scaleX(-1); }
      /* transform-box: fill-box faz o transform-origin usar o centro do
         próprio elemento (olhos, cabelo, corpo), e não o canto do SVG
         inteiro — sem isso, escalar/inclinar "puxa" o elemento para fora
         do lugar. */
      .pc-breathe { animation: pc-breathe 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
      @keyframes pc-breathe { 0%,100%{ transform: scaleY(1);} 50%{ transform: scaleY(1.03);} }
      .pc-hair { animation: pc-sway 4s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 0%; }
      @keyframes pc-sway { 0%,100%{ transform: skewX(0deg) translateX(0);} 50%{ transform: skewX(-3deg) translateX(-0.4px);} }
      .pc-eyes { animation: pc-blink 4.5s infinite; transform-box: fill-box; transform-origin: center; }
      @keyframes pc-blink { 0%,92%,100%{ transform: scaleY(1);} 96%{ transform: scaleY(0.1);} }

      .gs-cloud { position:absolute; width:90px; height:26px; background:#fff; border-radius:999px;
        filter: blur(2px); left:-20%; animation: gs-cloud linear infinite; opacity:0.8; }
      .gs-cloud::before { content:''; position:absolute; width:44px; height:44px; background:#fff; border-radius:50%; top:-18px; left:16px; }
      @keyframes gs-cloud { from{ transform: translateX(0);} to{ transform: translateX(140vw);} }

      .gs-bird { position:absolute; left:-8%; font-size:18px; color:#3a2b2b; animation: gs-bird linear infinite; }
      @keyframes gs-bird { from{ transform: translate(0,0);} to{ transform: translate(120vw,-16px);} }

      .gs-grass { width:3px; border-radius:2px 2px 0 0; transform-origin: bottom;
        animation: gs-grass 2.6s ease-in-out infinite; }
      @keyframes gs-grass { 0%,100%{ transform: rotate(-4deg);} 50%{ transform: rotate(5deg);} }

      .gs-tree-crown { width:64px; height:64px; border-radius:50% 50% 45% 45%; margin:0 auto; box-shadow: inset -6px -6px 0 rgba(0,0,0,0.12); }

      .gs-flower { animation: gs-grass 3.4s ease-in-out infinite; transform-origin: bottom; }

      .gs-butterfly { position:absolute; font-size:16px; animation: gs-butterfly 8s ease-in-out infinite; }
      @keyframes gs-butterfly {
        0%{ transform: translate(0,0) rotate(0);} 25%{ transform: translate(30px,-20px) rotate(10deg);}
        50%{ transform: translate(60px,0) rotate(-8deg);} 75%{ transform: translate(30px,20px) rotate(6deg);}
        100%{ transform: translate(0,0) rotate(0);}
      }

      .gs-firefly { position:absolute; width:5px; height:5px; border-radius:50%;
        background: radial-gradient(circle, #fff6a8, #ffd24d); box-shadow:0 0 8px 2px rgba(255,220,90,0.8);
        animation: gs-firefly ease-in-out infinite; }
      @keyframes gs-firefly {
        0%,100%{ opacity:0; transform: translate(0,0);} 50%{ opacity:1; transform: translate(12px,-14px);}
      }

      .gs-petal { position:absolute; top:-5%; border-radius:60% 0 60% 0; background:#f7a8cf;
        opacity:0.85; animation: gs-petal linear infinite; }
      @keyframes gs-petal {
        0%{ transform: translateY(0) rotate(0); opacity:0; }
        10%{ opacity:0.9; }
        100%{ transform: translateY(120%) translateX(40px) rotate(360deg); opacity:0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .gs-cloud,.gs-bird,.gs-petal,.gs-butterfly,.gs-firefly,.pc-breathe,.pc-hair,.pc-eyes,.gs-grass,.gs-flower { animation: none !important; }
      }
    `}</style>
  );
}

export default LoveGame;
