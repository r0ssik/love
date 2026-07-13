import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { useMemo, useState } from "react";
import config from "@/config/site";
import type { CalendarEvent } from "@/config/site";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { formatDatePt } from "@/lib/utils";

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

export function CalendarSection() {
  // Indexa eventos por "YYYY-M-D" para lookup rápido.
  const eventMap = useMemo(() => {
    const map = new Map<string, CalendarEvent>();
    config.calendar.forEach((e) => {
      const d = new Date(e.date + "T00:00:00");
      map.set(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`, e);
    });
    return map;
  }, []);

  const first = new Date(config.calendar[0]?.date ?? config.couple.startDate);
  const [view, setView] = useState({ year: first.getFullYear(), month: first.getMonth() });
  const [selected, setSelected] = useState<CalendarEvent | null>(null);

  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const startWeekday = new Date(view.year, view.month, 1).getDay();

  const changeMonth = (delta: number) => {
    setView((v) => {
      const m = v.month + delta;
      if (m < 0) return { year: v.year - 1, month: 11 };
      if (m > 11) return { year: v.year + 1, month: 0 };
      return { ...v, month: m };
    });
  };

  return (
    <Section
      id="calendario"
      eyebrow="Datas que importam"
      title={<>Nosso <span className="text-gradient">calendário</span></>}
      subtitle="Toque nos dias marcados com ❤ para reviver a lembrança."
    >
      <Reveal>
        <div className="glass mx-auto max-w-md p-6">
          {/* Cabeçalho do mês */}
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => changeMonth(-1)}
              aria-label="Mês anterior"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-glass/10"
            >
              <ChevronLeft size={18} />
            </button>
            <h3 className="font-display text-xl font-bold">
              {MONTHS[view.month]} {view.year}
            </h3>
            <button
              onClick={() => changeMonth(1)}
              aria-label="Próximo mês"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-glass/10"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dias da semana */}
          <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold uppercase text-muted">
            {WEEKDAYS.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>

          {/* Dias */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startWeekday }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const event = eventMap.get(`${view.year}-${view.month}-${day}`);
              return (
                <button
                  key={day}
                  onClick={() => event && setSelected(event)}
                  disabled={!event}
                  className={`relative grid aspect-square place-items-center rounded-xl text-sm transition-all ${
                    event
                      ? "bg-primary/20 font-bold text-primary hover:scale-110 hover:bg-primary/30"
                      : "text-muted"
                  }`}
                >
                  {day}
                  {event && (
                    <Heart
                      size={9}
                      className="absolute bottom-1 fill-primary text-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Modal da lembrança */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-md p-8 text-center"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Fechar"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full hover:bg-glass/10"
              >
                <X size={18} />
              </button>
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
                <Heart size={26} className="fill-primary" />
              </div>
              <span className="text-xs uppercase tracking-widest text-primary">
                {formatDatePt(selected.date)}
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold">
                {selected.title}
              </h3>
              <p className="mt-3 text-muted">{selected.memory}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default CalendarSection;
