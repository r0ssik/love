import { AnimatePresence, motion } from "framer-motion";
import { MapPin as PinIcon } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import config from "@/config/site";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const TOOLTIP_MARGIN = 12; // distância mínima até a borda do mapa

export function MapSection() {
  const [active, setActive] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  // Deslocamento extra (em px) aplicado ao balão para que ele nunca fique cortado.
  const [tooltipShift, setTooltipShift] = useState({ x: 0, flipUp: false });

  // Recalcula a posição do balão sempre que ele abre, medindo os limites reais
  // do mapa e do próprio balão (funciona em qualquer tamanho de tela).
  useLayoutEffect(() => {
    if (active === null) return;
    const map = mapRef.current;
    const tooltip = tooltipRef.current;
    if (!map || !tooltip) return;

    const mapRect = map.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let x = 0;
    if (tooltipRect.left < mapRect.left + TOOLTIP_MARGIN) {
      x = mapRect.left + TOOLTIP_MARGIN - tooltipRect.left;
    } else if (tooltipRect.right > mapRect.right - TOOLTIP_MARGIN) {
      x = mapRect.right - TOOLTIP_MARGIN - tooltipRect.right;
    }

    const flipUp = tooltipRect.bottom > mapRect.bottom - TOOLTIP_MARGIN;

    setTooltipShift({ x, flipUp });
  }, [active]);

  return (
    <Section
      id="mapa"
      eyebrow="Nossos lugares"
      title={<>O mapa da <span className="text-gradient">nossa história</span></>}
      subtitle="Cada pin guarda um lugar especial da nossa jornada."
    >
      <Reveal>
        <div
          ref={mapRef}
          className="relative mx-auto aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-3xl border border-glass/15"
        >
          {/* Mapa estilizado (SVG) */}
          <svg
            viewBox="0 0 800 500"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgb(var(--c-primary-soft) / 0.25)" />
                <stop offset="1" stopColor="rgb(var(--c-primary) / 0.1)" />
              </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#mapBg)" />
            {/* "ruas" decorativas */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 60}
                x2="800"
                y2={i * 60}
                stroke="rgb(var(--c-line) / 0.06)"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 60}
                y1="0"
                x2={i * 60}
                y2="500"
                stroke="rgb(var(--c-line) / 0.06)"
                strokeWidth="1"
              />
            ))}
            {/* rio/curva decorativa */}
            <path
              d="M0 380 C 200 320, 300 460, 500 400 S 800 360, 800 380"
              fill="none"
              stroke="rgb(var(--c-accent) / 0.25)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* linha tracejada conectando os pins, desenhando o contorno do coração */}
            <polyline
              points={[...config.map, config.map[0]]
                .map((p) => `${(p.x / 100) * 800},${(p.y / 100) * 500}`)
                .join(" ")}
              fill="none"
              stroke="rgb(var(--c-primary))"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeLinejoin="round"
              opacity="0.55"
            />
          </svg>

          {/* Pins */}
          {config.map.map((pin, i) => (
            <button
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              className="group absolute -translate-x-1/2 -translate-y-full"
              aria-label={pin.label}
            >
              <motion.span
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: i * 0.12, stiffness: 260 }}
                className="relative flex flex-col items-center"
              >
                <PinIcon
                  size={34}
                  className="fill-primary text-primary drop-shadow-md transition-transform group-hover:scale-125"
                />
                <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-primary/30" />
              </motion.span>
            </button>
          ))}

          {/* Tooltip do pin ativo. A posição (camada de fora) é calculada via
              JS para nunca vazar para fora do mapa; a animação (camada de
              dentro) fica isolada para não conflitar com esse cálculo. */}
          <AnimatePresence>
            {active !== null && (
              <div
                key={active}
                style={{
                  left: `${config.map[active].x}%`,
                  top: `${config.map[active].y}%`,
                  transform: `translate(calc(-50% + ${tooltipShift.x}px), ${
                    tooltipShift.flipUp
                      ? `calc(-100% - ${TOOLTIP_MARGIN}px)`
                      : `${TOOLTIP_MARGIN}px`
                  })`,
                }}
                className="absolute z-10"
              >
                <motion.div
                  ref={tooltipRef}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="glass-strong w-52 p-4 text-center"
                >
                  <span className="text-xs uppercase tracking-widest text-primary">
                    {config.map[active].label}
                  </span>
                  <h4 className="font-display text-lg font-bold">
                    {config.map[active].place}
                  </h4>
                  <p className="mt-1 text-sm text-muted">
                    {config.map[active].description}
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}

export default MapSection;
