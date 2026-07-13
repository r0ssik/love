import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

/** Botão de alternância de tema com animação suave. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="glass relative grid h-11 w-11 place-items-center overflow-hidden text-ink"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={className}
      >
        {isDark ? <Moon size={19} /> : <Sun size={19} />}
      </motion.span>
    </motion.button>
  );
}

export default ThemeToggle;
