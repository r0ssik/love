import { useMemo } from "react";

/**
 * Cenário: jardim romântico que alterna suavemente entre pôr do sol e noite.
 * Árvores, flores, grama, borboletas, pétalas, pássaros, estrelas e vagalumes.
 * Tudo desenhado em SVG/CSS — sem imagens externas.
 */
export function GardenScene({ night }: { night: boolean }) {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 8,
        size: Math.random() * 8 + 6,
      })),
    []
  );

  const fireflies = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 60 + 20,
        delay: Math.random() * 4,
        duration: Math.random() * 4 + 3,
      })),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 55,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Céu que transiciona sol -> noite */}
      <div
        className="absolute inset-0 transition-all duration-[2000ms]"
        style={{
          background: night
            ? "linear-gradient(180deg,#0b1026 0%,#1b1740 45%,#3a2757 100%)"
            : "linear-gradient(180deg,#ffb56b 0%,#ff8fa3 40%,#ffd6a5 100%)",
        }}
      />

      {/* Estrelas (só à noite) */}
      <div
        className="absolute inset-0 transition-opacity duration-[2000ms]"
        style={{ opacity: night ? 1 : 0 }}
      >
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Sol / Lua */}
      <div
        className="absolute rounded-full transition-all duration-[2000ms]"
        style={{
          left: "50%",
          top: night ? "12%" : "22%",
          width: 70,
          height: 70,
          transform: "translateX(-50%)",
          background: night
            ? "radial-gradient(circle at 40% 40%, #fdfdfd, #d8d8f0)"
            : "radial-gradient(circle, #fff3c4, #ffce6b)",
          boxShadow: night
            ? "0 0 40px 8px rgba(255,255,255,0.3)"
            : "0 0 70px 20px rgba(255,200,120,0.6)",
        }}
      />

      {/* Nuvens */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: night ? 0.25 : 0.8 }}>
        <div className="gs-cloud" style={{ top: "18%", animationDuration: "40s" }} />
        <div className="gs-cloud" style={{ top: "30%", left: "40%", animationDuration: "55s", transform: "scale(0.7)" }} />
      </div>

      {/* Pássaros (de dia) */}
      {!night && (
        <div className="pointer-events-none absolute inset-0">
          <span className="gs-bird" style={{ top: "22%", animationDuration: "18s" }}>﹀</span>
          <span className="gs-bird" style={{ top: "26%", left: "-10%", animationDuration: "24s", animationDelay: "4s" }}>﹀</span>
        </div>
      )}

      {/* Colinas */}
      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute bottom-0 h-2/5 w-full">
        <path d="M0 60 Q100 20 200 55 T400 45 V120 H0 Z" fill={night ? "#20304a" : "#7cc36a"} />
        <path d="M0 80 Q120 45 240 78 T400 70 V120 H0 Z" fill={night ? "#182338" : "#5fae52"} />
      </svg>

      {/* Chão de grama */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/4"
        style={{ background: night ? "#132014" : "#4b9e3f" }}
      >
        {/* fios de grama balançando */}
        <div className="absolute inset-x-0 top-0 flex justify-around">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="gs-grass"
              style={{
                height: 10 + (i % 5) * 3,
                background: night ? "#1f3a22" : "#3f8a35",
                animationDelay: `${(i % 7) * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Árvores */}
      <Tree left="6%" night={night} scale={1} />
      <Tree left="86%" night={night} scale={1.15} />

      {/* Flores */}
      {[14, 24, 68, 78, 92].map((l, i) => (
        <Flower key={i} left={`${l}%`} color={["#f7a8cf", "#fff3c4", "#c4b5fd", "#ff8fa3", "#fca5f1"][i % 5]} />
      ))}

      {/* Borboletas */}
      <span className="gs-butterfly" style={{ top: "55%", left: "20%" }}>🦋</span>
      <span className="gs-butterfly" style={{ top: "62%", left: "70%", animationDelay: "3s" }}>🦋</span>

      {/* Vagalumes (à noite) */}
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: night ? 1 : 0 }}>
        {fireflies.map((f) => (
          <span
            key={f.id}
            className="gs-firefly"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Pétalas voando */}
      {petals.map((p) => (
        <span
          key={p.id}
          className="gs-petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function Tree({ left, night, scale }: { left: string; night: boolean; scale: number }) {
  return (
    <div className="absolute bottom-[22%]" style={{ left, transform: `scale(${scale})`, transformOrigin: "bottom" }}>
      <div className="gs-tree-crown" style={{ background: night ? "#1c3324" : "#3f8f3a" }} />
      <div className="mx-auto h-16 w-3 rounded-b" style={{ background: night ? "#3a2a1c" : "#6b4a2b" }} />
    </div>
  );
}

function Flower({ left, color }: { left: string; color: string }) {
  return (
    <div className="gs-flower absolute bottom-[8%]" style={{ left }}>
      <div className="mx-auto h-8 w-0.5 bg-green-700" />
      <div className="relative -mt-9 grid place-items-center">
        {[0, 72, 144, 216, 288].map((deg) => (
          <span
            key={deg}
            className="absolute h-3 w-2 rounded-full"
            style={{ background: color, transform: `rotate(${deg}deg) translateY(-4px)` }}
          />
        ))}
        <span className="relative h-2 w-2 rounded-full bg-yellow-300" />
      </div>
    </div>
  );
}

export default GardenScene;
