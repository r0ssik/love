import { AnimatePresence, motion } from "framer-motion";

/** Tela de carregamento inicial: coração pulsando + barra de progresso. */
export function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 0.95, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl text-primary drop-shadow-[0_0_25px_rgb(220,38,38,0.6)]"
          >
            ❤
          </motion.div>
          <p className="mt-6 font-display text-lg text-muted">
            Preparando as memórias...
          </p>
          <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-glass/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
