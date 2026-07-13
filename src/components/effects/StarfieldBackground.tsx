import { useMemo } from "react";

/**
 * Fundo global sutil: estrelas piscando + partículas brilhantes flutuando.
 * Fica fixo atrás de todo o conteúdo (pointer-events: none).
 */
export function StarfieldBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      })),
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 8,
        duration: Math.random() * 10 + 12,
      })),
    []
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Gradiente ambiente que respira */}
      <div className="absolute inset-0 bg-hero-grad opacity-90" />

      {/* Estrelas piscando */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-ink animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: 0.5,
          }}
        />
      ))}

      {/* Partículas brilhantes subindo lentamente */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-[-10%] rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, rgb(var(--c-accent) / 0.9), transparent 70%)",
            animation: `rise ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes rise {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-115vh) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default StarfieldBackground;
