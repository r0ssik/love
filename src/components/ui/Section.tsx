import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

/** Casca padrão de seção: espaçamento, cabeçalho animado e container central. */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 px-5 py-20 sm:py-28", className)}
    >
      <div className={cn("mx-auto w-full max-w-6xl", containerClassName)}>
        {(eyebrow || title || subtitle) && (
          <div className="mb-12 text-center">
            {eyebrow && (
              <Reveal direction="scale">
                <span className="eyebrow">
                  <span className="text-primary">❤</span> {eyebrow}
                </span>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="section-title mt-2">{title}</h2>
              </Reveal>
            )}
            {subtitle && (
              <Reveal delay={0.1}>
                <p className="mx-auto mt-4 max-w-2xl text-muted">{subtitle}</p>
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
