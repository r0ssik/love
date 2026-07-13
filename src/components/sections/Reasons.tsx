import { motion } from "framer-motion";
import {
  Bird,
  Hand,
  Heart,
  Laugh,
  Smile,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import config from "@/config/site";
import Section from "@/components/ui/Section";

// Mapa de ícones editável (adicione novos aqui se precisar).
const icons: Record<string, LucideIcon> = {
  smile: Smile,
  hand: Hand,
  laugh: Laugh,
  heart: Heart,
  sparkles: Sparkles,
  users: Users,
  bird: Bird,
};

export function Reasons() {
  return (
    <Section
      id="motivos"
      eyebrow="Só alguns dos infinitos"
      title={<>Motivos pelos quais <span className="text-gradient">eu te amo</span></>}
      subtitle="A lista completa não caberia aqui, mas aqui vão alguns favoritos."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {config.reasons.map((reason, i) => {
          const Icon = icons[reason.icon] ?? Heart;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8, rotate: 1 }}
              className="glass group flex flex-col items-start p-6"
            >
              <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6">
                <Icon size={26} />
              </span>
              <h3 className="font-display text-xl font-bold">{reason.title}</h3>
              <p className="mt-2 text-muted">{reason.text}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export default Reasons;
