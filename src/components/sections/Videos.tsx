import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState } from "react";
import config from "@/config/site";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export function Videos() {
  const [active, setActive] = useState<number | null>(null);
  const videos = config.videos;

  if (videos.length === 0) return null;

  return (
    <Section
      id="videos"
      eyebrow="Nossos vídeos"
      title={<>Momentos em <span className="text-gradient">movimento</span></>}
      subtitle="Porque algumas lembranças precisam ser vistas em vídeo."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {videos.map((v, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <button
              onClick={() => setActive(i)}
              className="group relative block w-full overflow-hidden rounded-3xl text-left"
            >
              {v.thumbnail ? (
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  loading="lazy"
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                // Sem thumbnail definida: usa o primeiro frame do próprio vídeo como capa.
                <video
                  src={v.url}
                  muted
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Botão play */}
              <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary/90 text-white shadow-glow transition-transform group-hover:scale-110">
                <Play size={26} className="ml-1 fill-white" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-bold text-white">
                  {v.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">{v.description}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Player modal */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Fechar vídeo"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
            >
              {videos[active].type === "youtube" ? (
                <iframe
                  src={`${videos[active].url}?autoplay=1`}
                  title={videos[active].title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              ) : (
                <video
                  src={videos[active].url}
                  controls
                  autoPlay
                  className="aspect-video w-full bg-black"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default Videos;
