import { motion, useScroll, useSpring } from "framer-motion";

/** Barra fina no topo indicando o progresso de leitura da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-primary via-accent to-primary"
    />
  );
}

export default ScrollProgress;
