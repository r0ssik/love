import { motion } from "framer-motion";
import { Quote } from "lucide-react";

/** Frase romântica flutuante usada entre as seções. */
export function FloatingQuote({ text }: { text: string }) {
  return (
    <div className="relative px-5 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <Quote
          className="mx-auto mb-4 text-primary/60"
          size={28}
          strokeWidth={1.5}
        />
        <p className="font-display text-2xl italic leading-relaxed text-ink/90 sm:text-3xl">
          {text}
        </p>
      </motion.div>
    </div>
  );
}

export default FloatingQuote;
