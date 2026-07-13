import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import config from "@/config/site";

const links = [
  { id: "contador", label: "Contador" },
  { id: "timeline", label: "História" },
  { id: "galeria", label: "Galeria" },
  { id: "musicas", label: "Músicas" },
  { id: "cartinhas", label: "Cartas" },
  { id: "sonhos", label: "Sonhos" },
  { id: "jogo", label: "Surpresa" },
];

/** Barra de navegação flutuante com menu responsivo, tema e estrela secreta. */
export function Navbar({ onSecret }: { onSecret: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { personName, partnerName } = config.couple;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 ${
          scrolled ? "glass-strong mx-3 rounded-full py-2 md:mx-auto" : ""
        }`}
      >
        {/* Logo / nomes */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 font-display text-lg font-bold"
        >
          <Heart
            size={20}
            className="fill-primary text-primary transition-transform group-hover:scale-125"
          />
          <span className="hidden sm:inline">
            {personName} <span className="text-primary">&</span> {partnerName}
          </span>
        </button>

        {/* Links desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-glass/10 hover:text-ink"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Estrela secreta (easter egg) */}
          <motion.button
            onClick={onSecret}
            whileHover={{ rotate: 20, scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            aria-label="Estrela secreta"
            title="Clique em mim ✨"
            className="grid h-11 w-11 place-items-center text-accent"
          >
            <Sparkles size={18} />
          </motion.button>

          <ThemeToggle />

          {/* Menu mobile */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menu"
            className="glass grid h-11 w-11 place-items-center text-ink md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="glass-strong mx-3 mt-2 overflow-hidden rounded-3xl p-2 md:hidden"
          >
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="w-full rounded-2xl px-4 py-3 text-left text-ink transition-colors hover:bg-glass/10"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
