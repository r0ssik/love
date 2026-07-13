import { motion } from "framer-motion";
import config from "@/config/site";
import Section from "@/components/ui/Section";

/** Linha do tempo vertical com fotos alternando dos lados (zig-zag). */
export function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="Nossa história"
      title={<>Momentos que <span className="text-gradient">nos definem</span></>}
      subtitle="Cada data, uma lembrança que eu guardo com todo o carinho."
    >
      <div className="relative mx-auto max-w-4xl">
        {/* Linha central */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-12">
          {config.timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`relative flex flex-col gap-4 pl-12 md:flex-row md:items-center md:gap-8 md:pl-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Ponto na linha */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute left-4 top-2 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-primary text-xs text-white shadow-glow md:left-1/2"
                >
                  ❤
                </motion.span>

                {/* Foto */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="md:w-1/2"
                >
                  <div className="group overflow-hidden rounded-3xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        objectPosition:
                          item.imagePosition === "top"
                            ? "top"
                            : item.imagePosition === "bottom"
                              ? "bottom"
                              : "center",
                      }}
                      className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-64"
                    />
                  </div>
                </motion.div>

                {/* Texto */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`glass p-6 md:w-1/2 ${isLeft ? "md:text-left" : "md:text-right"}`}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {item.date}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-muted">{item.description}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export default Timeline;
