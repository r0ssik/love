import { useEffect, useState } from "react";

export interface CountdownValue {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  // totais acumulados desde o início
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

function diff(from: Date, now: Date): CountdownValue {
  const totalSeconds = Math.max(0, Math.floor((now.getTime() - from.getTime()) / 1000));
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  // Cálculo calendário-consciente (anos/meses/dias reais)
  let years = now.getFullYear() - from.getFullYear();
  let months = now.getMonth() - from.getMonth();
  let days = now.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    // dias no mês anterior
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const hours = now.getHours() - from.getHours();
  const minutes = now.getMinutes() - from.getMinutes();
  const seconds = now.getSeconds() - from.getSeconds();

  // normaliza hora/min/seg negativos "emprestando" das unidades maiores
  let h = hours;
  let m = minutes;
  let s = seconds;
  if (s < 0) {
    s += 60;
    m -= 1;
  }
  if (m < 0) {
    m += 60;
    h -= 1;
  }
  if (h < 0) {
    h += 24;
    days -= 1;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, h),
    minutes: Math.max(0, m),
    seconds: Math.max(0, s),
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
  };
}

/** Contador em tempo real (atualiza a cada segundo) a partir de uma data ISO. */
export function useCountdown(startISO: string): CountdownValue {
  const start = new Date(startISO);
  const [value, setValue] = useState<CountdownValue>(() => diff(start, new Date()));

  useEffect(() => {
    const id = setInterval(() => setValue(diff(start, new Date())), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startISO]);

  return value;
}
