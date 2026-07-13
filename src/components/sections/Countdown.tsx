import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { formatNumber, formatDatePt } from "@/lib/utils";
import config from "@/config/site";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

/** Célula individual de tempo (anos, meses, ...). */
function TimeCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass flex min-w-[4.5rem] flex-col items-center px-3 py-4 sm:min-w-[5.5rem] sm:px-5">
      <motion.span
        key={value}
        initial={{ y: -8, opacity: 0.4 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="font-display text-3xl font-bold tabular-nums text-gradient sm:text-4xl"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="mt-1 text-[0.65rem] uppercase tracking-widest text-muted">
        {label}
      </span>
    </div>
  );
}

/** Card de total acumulado. */
function TotalCard({ value, label }: { value: number; label: string }) {
  return (
    <Reveal direction="scale">
      <div className="glass px-6 py-5 text-center">
        <div className="font-display text-2xl font-bold text-ink sm:text-3xl">
          {formatNumber(value)}
        </div>
        <div className="mt-1 text-xs uppercase tracking-widest text-muted">
          {label}
        </div>
      </div>
    </Reveal>
  );
}

export function Countdown() {
  const t = useCountdown(config.couple.startDate);

  return (
    <Section
      id="contador"
      eyebrow="Desde o primeiro dia"
      title={<span className="text-gradient">Nosso tempo juntos</span>}
      subtitle={`Tudo começou em ${formatDatePt(config.couple.startDate)}, e não parou mais.`}
    >
      {/* Relógio principal */}
      <Reveal>
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
          <TimeCell value={t.years} label="anos" />
          <TimeCell value={t.months} label="meses" />
          <TimeCell value={t.days} label="dias" />
          <TimeCell value={t.hours} label="horas" />
          <TimeCell value={t.minutes} label="min" />
          <TimeCell value={t.seconds} label="seg" />
        </div>
      </Reveal>

      {/* Totais acumulados */}
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        <TotalCard value={t.totalDays} label="dias juntos" />
        <TotalCard value={t.totalHours} label="horas" />
        <TotalCard value={t.totalMinutes} label="minutos" />
        <TotalCard value={t.totalSeconds} label="segundos" />
      </div>

      <Reveal>
        <p className="mt-10 text-center font-hand text-2xl text-primary">
          ...e que venham muitos e muitos mais ❤️
        </p>
      </Reveal>
    </Section>
  );
}

export default Countdown;
