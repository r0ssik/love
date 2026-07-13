import { AnimatePresence, motion } from "framer-motion";
import { Lock, Unlock, X } from "lucide-react";
import { useState } from "react";
import config from "@/config/site";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { formatDatePt } from "@/lib/utils";

export function TimeCapsule() {
  const [open, setOpen] = useState<number | null>(null);
  const [shake, setShake] = useState<number | null>(null);
  const now = new Date();

  const handleClick = (i: number, unlocked: boolean) => {
    if (unlocked) setOpen(i);
    else {
      setShake(i);
      setTimeout(() => setShake(null), 500);
    }
  };

  return (
    <Section
      id="capsula"
      eyebrow="Mensagens para o futuro"
      title={<>Nossa <span className="text-gradient">cápsula do tempo</span></>}
      subtitle="Algumas palavras guardadas para abrirmos lá na frente."
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {config.capsules.map((cap, i) => {
          const openDate = new Date(cap.openDate + "T00:00:00");
          const unlocked = now >= openDate;
          const daysLeft = Math.ceil(
            (openDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );
          return (
            <Reveal key={i} delay={i * 0.1} direction="up">
              <motion.button
                onClick={() => handleClick(i, unlocked)}
                animate={shake === i ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                whileHover={{ y: -6 }}
                className="glass flex h-full w-full flex-col items-center p-8 text-center"
              >
                <div
                  className={`mb-4 grid h-16 w-16 place-items-center rounded-full ${
                    unlocked
                      ? "bg-primary/20 text-primary"
                      : "bg-glass/10 text-muted"
                  }`}
                >
                  {unlocked ? <Unlock size={28} /> : <Lock size={28} />}
                </div>
                <h3 className="font-display text-xl font-bold">
                  {cap.openLabel}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {unlocked
                    ? "Toque para abrir ❤"
                    : `Faltam ${daysLeft} dias, abre em ${formatDatePt(cap.openDate)}`}
                </p>
              </motion.button>
            </Reveal>
          );
        })}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: 40 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-lg p-8 text-center"
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Fechar"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full hover:bg-glass/10"
              >
                <X size={18} />
              </button>
              <h3 className="font-display text-2xl font-bold text-gradient">
                {config.capsules[open].openLabel}
              </h3>
              {config.capsules[open].message && (
                <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-ink/90">
                  {config.capsules[open].message}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default TimeCapsule;
