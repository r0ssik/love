import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import config from "@/config/site";
import Section from "@/components/ui/Section";

export function Gallery() {
  const tabs = config.galleryTabs;
  const [tabIndex, setTabIndex] = useState(0);
  const [index, setIndex] = useState<number | null>(null);

  const photos = tabs[tabIndex].photos;

  // Fecha o lightbox e reseta a foto ativa ao trocar de aba.
  const selectTab = (i: number) => {
    setTabIndex(i);
    setIndex(null);
  };

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );

  // Navegação por teclado no lightbox
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  return (
    <Section
      id="galeria"
      eyebrow="Álbum de memórias"
      title={<>Nossa <span className="text-gradient">galeria</span></>}
      subtitle="Toque em uma foto para ampliar e reviver o momento."
    >
      {/* Mini abas de seleção */}
      <div className="mb-8 flex justify-center">
        <div className="glass inline-flex gap-1 p-1.5">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => selectTab(i)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${
                tabIndex === i ? "text-white" : "text-muted hover:text-ink"
              }`}
            >
              {tabIndex === i && (
                <motion.span
                  layoutId="gallery-tab-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-soft"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grade estilo mosaico */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tabs[tabIndex].id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4"
        >
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group relative block w-full overflow-hidden rounded-2xl"
            >
              <img
                src={photo.src}
                alt={photo.caption ?? tabs[tabIndex].label}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {photo.caption && (
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-sm font-medium text-white">
                    {photo.caption}
                  </span>
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={22} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Anterior"
              className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft size={26} />
            </button>

            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[85vh] max-w-4xl flex-col items-center"
            >
              <img
                src={photos[index].src}
                alt={photos[index].caption ?? tabs[tabIndex].label}
                className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
              />
              {photos[index].caption && (
                <figcaption className="mt-4 text-center font-hand text-2xl text-white">
                  {photos[index].caption}
                </figcaption>
              )}
              <span className="mt-1 text-xs text-white/50">
                {index + 1} / {photos.length}
              </span>
            </motion.figure>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Próxima"
              className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default Gallery;
