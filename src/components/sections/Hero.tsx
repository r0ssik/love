import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import config from "@/config/site";

/** Cabeçalho principal do site (primeira dobra depois da introdução). */
export function Hero() {
  const { personName, partnerName, hashtag } = config.couple;

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-24 text-center"
    >
      {/* Foto principal com moldura brilhante */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-6 rounded-full bg-gradient-to-tr from-primary/40 to-accent/40 blur-3xl"
        />
        <img
          src={config.intro.mainPhoto}
          alt="Rossik e Letícia"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://picsum.photos/seed/nosso-inicio/600/600";
          }}
          className="relative h-40 w-40 rounded-full object-cover shadow-glow ring-2 ring-glass/20 sm:h-52 sm:w-52"
        />
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -right-2 -top-2 text-3xl"
        >
          <Heart className="fill-primary text-primary" size={34} />
        </motion.div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="eyebrow"
      >
        Feliz 1 ano de namoro
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.9 }}
        className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl md:text-7xl"
      >
        {personName} <span className="text-gradient">&</span> {partnerName}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9 }}
        className="mt-5 max-w-xl font-hand text-2xl text-primary sm:text-3xl"
      >
        Um ano do começo da melhor história da minha vida.
      </motion.p>

      {hashtag && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-sm uppercase tracking-[0.3em] text-muted"
        >
          {hashtag}
        </motion.span>
      )}

      {/* Indicador de scroll */}
      <motion.button
        onClick={() =>
          document.getElementById("contador")?.scrollIntoView({ behavior: "smooth" })
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-muted"
        aria-label="Rolar para baixo"
      >
        <span className="text-xs uppercase tracking-widest">explore</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown size={22} />
        </motion.span>
      </motion.button>
    </section>
  );
}

export default Hero;
