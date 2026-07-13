import { motion } from "framer-motion";
import { Check, ListChecks, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import config from "@/config/site";
import type { DreamItem } from "@/config/site";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

/** Lista marcável com barra de progresso; persiste o estado no navegador. */
function Checklist({
  title,
  icon,
  items,
  storageKey,
}: {
  title: string;
  icon: React.ReactNode;
  items: DreamItem[];
  storageKey: string;
}) {
  const [checked, setChecked] = useState<boolean[]>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        try {
          const arr = JSON.parse(saved) as boolean[];
          if (arr.length === items.length) return arr;
        } catch {
          /* ignora */
        }
      }
    }
    return items.map((i) => i.done);
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked, storageKey]);

  const toggle = (i: number) =>
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));

  const doneCount = checked.filter(Boolean).length;
  const progress = Math.round((doneCount / items.length) * 100);

  return (
    <div className="glass flex flex-col p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary">
          {icon}
        </span>
        <div>
          <h3 className="font-display text-xl font-bold">{title}</h3>
          <p className="text-xs text-muted">
            {doneCount} de {items.length} realizados
          </p>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="mb-5 h-2 overflow-hidden rounded-full bg-glass/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-colors hover:bg-glass/10"
            >
              <span
                className={`grid h-6 w-6 flex-shrink-0 place-items-center rounded-md border transition-all ${
                  checked[i]
                    ? "border-primary bg-primary text-white"
                    : "border-line/30"
                }`}
              >
                {checked[i] && <Check size={14} />}
              </span>
              <span
                className={`transition-all ${
                  checked[i] ? "text-muted line-through" : "text-ink"
                }`}
              >
                {item.text}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DreamsSection() {
  return (
    <Section
      id="sonhos"
      eyebrow="O que ainda queremos viver"
      title={<>Nossos <span className="text-gradient">sonhos</span> & bucket list</>}
      subtitle="Marque os que já realizamos, e vamos riscando o resto juntos."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal direction="right">
          <Checklist
            title="Nossos sonhos"
            icon={<Sparkles size={22} />}
            items={config.dreams}
            storageKey="nosso-ano-sonhos"
          />
        </Reveal>
        <Reveal direction="left">
          <Checklist
            title="Bucket list"
            icon={<ListChecks size={22} />}
            items={config.bucketList}
            storageKey="nosso-ano-bucket"
          />
        </Reveal>
      </div>
    </Section>
  );
}

export default DreamsSection;
