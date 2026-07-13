import { motion } from "framer-motion";
import config from "@/config/site";
import Reveal from "@/components/ui/Reveal";

/** A grande carta final do site. */
export function FinalLetter() {
  const { greeting, paragraphs, signature } = config.finalLetter;

  return (
    <section id="carta-final" className="relative scroll-mt-24 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal direction="scale">
          <div className="glass-strong relative overflow-hidden p-8 sm:p-14">
            {/* brilho de fundo */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="mb-6 text-center text-4xl text-primary"
            >
              ❤
            </motion.div>

            <h2 className="text-center font-hand text-4xl text-primary sm:text-5xl">
              {greeting}
            </h2>

            <div className="mx-auto mt-8 max-w-xl space-y-5">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-lg leading-relaxed text-ink/90">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <p className="mt-8 text-right font-hand text-2xl text-primary">
                {signature}
              </p>
            </Reveal>

            <Reveal direction="scale" delay={0.3}>
              <p className="mt-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-center font-display text-3xl font-bold text-transparent sm:text-4xl">
                Feliz 1 Ano de Namoro ❤️
              </p>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FinalLetter;
