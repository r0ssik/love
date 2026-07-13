import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

interface HeartsRainProps {
  active: boolean;
  /** quantidade de corações */
  count?: number;
}

/**
 * Chuva de corações (easter egg). Ativado por gatilhos espalhados pelo site.
 */
export function HeartsRain({ active, count = 40 }: HeartsRainProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: Math.random() * 2.5 + 3,
        size: Math.random() * 22 + 14,
        rotate: Math.random() * 60 - 30,
      })),
    [count, active]
  );

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
          {hearts.map((h) => (
            <motion.span
              key={h.id}
              initial={{ y: -60, opacity: 0, rotate: h.rotate }}
              animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: h.rotate + 20 }}
              transition={{ duration: h.duration, delay: h.delay, ease: "easeIn" }}
              className="absolute top-0 select-none text-primary"
              style={{ left: `${h.left}%`, fontSize: h.size }}
            >
              ❤
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

export default HeartsRain;
