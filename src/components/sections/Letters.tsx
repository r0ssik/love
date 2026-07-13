import { AnimatePresence, motion } from "framer-motion";
import { Mail, X } from "lucide-react";
import { useState } from "react";
import config from "@/config/site";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export function Letters() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section
      id="cartinhas"
      eyebrow="Escrito para você"
      title={<>Cartinhas <span className="text-gradient">do coração</span></>}
      subtitle="Escolha um envelope e leia quando o coração pedir."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {config.letters.map((letter, i) => (
          <Reveal key={i} delay={i * 0.1} direction="scale">
            <motion.button
              onClick={() => setOpen(i)}
              whileHover={{ y: -6, rotate: -1 }}
              className="group relative flex h-52 w-full flex-col items-center justify-center overflow-hidden rounded-3xl p-6 text-center"
              style={{
                background:
                  "linear-gradient(150deg, rgb(var(--c-primary) / 0.9), rgb(var(--c-primary-soft) / 0.95))",
              }}
            >
              {/* Aba do envelope */}
              <div className="absolute inset-x-0 top-0 h-24 origin-top bg-black/10 [clip-path:polygon(0_0,100%_0,50%_100%)] transition-transform duration-500 group-hover:scale-y-90" />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative z-10 mb-3 grid h-14 w-14 place-items-center rounded-full bg-white/20 text-white"
              >
                <Mail size={26} />
              </motion.div>
              <span className="relative z-10 font-medium text-white/95">
                {letter.label}
              </span>
              <span className="relative z-10 mt-2 text-xs uppercase tracking-widest text-white/60">
                toque para abrir
              </span>
            </motion.button>
          </Reveal>
        ))}
      </div>

      {/* Carta aberta */}
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
              initial={{ opacity: 0, y: 60, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-[#fffdf7] p-8 text-[#3a2b2b] shadow-2xl sm:p-10"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Fechar carta"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/5 text-[#3a2b2b] hover:bg-black/10"
              >
                <X size={18} />
              </button>
              <h3 className="text-3xl font-bold text-[#a1121f]">
                {config.letters[open].title}
              </h3>
              <div className="my-4 h-px w-full bg-[#3a2b2b]/15" />
              <p className="whitespace-pre-line text-2xl leading-relaxed">
                {config.letters[open].body}
              </p>
              <p className="mt-6 text-right text-2xl text-[#a1121f]">
                com amor ❤
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default Letters;
