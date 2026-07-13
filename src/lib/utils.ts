/** Concatena classes condicionalmente (versão leve de clsx). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Sorteia um item de um array. */
export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Formata um número com separador de milhar pt-BR. */
export function formatNumber(n: number): string {
  return n.toLocaleString("pt-BR");
}

/** Data ISO -> "16 de julho de 2025". Datas só-data são tratadas como locais
 *  (evita o "off-by-one" causado pela interpretação em UTC). */
export function formatDatePt(iso: string): string {
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T00:00:00` : iso;
  const d = new Date(normalized);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
