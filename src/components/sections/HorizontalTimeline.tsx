import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import config from "@/config/site";
import Section from "@/components/ui/Section";

/** Carrossel horizontal com as fotos em ordem cronológica (scroll-snap). */
export function HorizontalTimeline() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  // Reúne fotos da timeline + galeria (as com legenda) para um "filme" cronológico.
  const captionedGalleryPhotos = config.galleryTabs
    .flatMap((tab) => tab.photos)
    .filter((p) => p.caption)
    .slice(0, 4);

  const frames = [
    ...config.timeline.map((t) => ({ src: t.image, label: t.date })),
    ...captionedGalleryPhotos.map((g) => ({ src: g.src, label: g.caption! })),
  ];

  return (
    <Section
      id="linha-horizontal"
      eyebrow="Do começo até aqui"
      title={<>Nossa história em <span className="text-gradient">quadros</span></>}
      subtitle="Deslize para percorrer nossos momentos, um a um."
    >
      <div className="relative">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Anterior"
          className="glass-strong absolute -left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full sm:grid"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
        >
          {frames.map((frame, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="group relative w-64 flex-shrink-0 snap-center sm:w-72"
            >
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={frame.src}
                  alt={frame.label}
                  loading="lazy"
                  className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 rounded-b-3xl bg-gradient-to-t from-black/80 to-transparent p-5">
                <span className="font-hand text-2xl text-white">{frame.label}</span>
              </div>
              {/* número do quadro */}
              <span className="glass absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-ink">
                {i + 1}
              </span>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scrollBy(1)}
          aria-label="Próxima"
          className="glass-strong absolute -right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full sm:grid"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </Section>
  );
}

export default HorizontalTimeline;
