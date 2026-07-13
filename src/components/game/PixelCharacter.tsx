/**
 * Personagens em PIXEL ART originais (SVG), desenhados bloco a bloco.
 * Nada de imagens prontas — tudo montado com <rect> em um grid,
 * com shape-rendering "crispEdges" para o visual pixelado.
 *
 * Animações idle (respirar, piscar, cabelo ao vento) via CSS.
 */

type Variant = "boy" | "girl";

interface Props {
  variant: Variant;
  /** rostos corados (usado na historinha do "Sim") */
  blush?: boolean;
  /** sorriso mais aberto */
  bigSmile?: boolean;
  /** vira o personagem para olhar para o outro lado */
  flip?: boolean;
  className?: string;
}

export function PixelCharacter({
  variant,
  blush = false,
  bigSmile = false,
  flip = false,
  className = "",
}: Props) {
  const isGirl = variant === "girl";

  // Cores
  const skin = "#f3c9a2";
  const hair = isGirl ? "#f6d872" : "#a9772f"; // loiro / loiro escuro
  const hairShade = isGirl ? "#e2bf4d" : "#8a5f22";
  const eye = isGirl ? "#7a4a22" : "#2f8f57"; // castanho / verde
  const cloth = isGirl ? "#f7a8cf" : "#4f86d6"; // vestido rosa / camisa azul
  const clothShade = isGirl ? "#e07db0" : "#3b68b0";
  const legs = isGirl ? "#f7a8cf" : "#39404d";

  return (
    <svg
      viewBox="0 0 32 44"
      className={`pixel-char ${flip ? "pixel-flip" : ""} ${className}`}
      style={{ shapeRendering: "crispEdges", overflow: "visible" }}
      role="img"
      aria-label={isGirl ? "Personagem dela" : "Meu personagem"}
    >
      {/* sombra no chão */}
      <ellipse cx="16" cy="43" rx="9" ry="1.6" fill="rgba(0,0,0,0.2)" />

      {/* Grupo que "respira" */}
      <g className="pc-breathe">
        {/* Cabelo (atrás) — com leve balanço */}
        <g className="pc-hair">
          {isGirl ? (
            <>
              {/* cabelo médio ondulado */}
              <rect x="6" y="6" width="20" height="18" fill={hair} />
              <rect x="5" y="10" width="3" height="12" fill={hairShade} />
              <rect x="24" y="10" width="3" height="12" fill={hairShade} />
              <rect x="6" y="22" width="4" height="4" fill={hair} />
              <rect x="22" y="22" width="4" height="4" fill={hair} />
            </>
          ) : (
            <>
              {/* cabelo cacheado levemente longo */}
              <rect x="7" y="5" width="18" height="12" fill={hair} />
              <rect x="6" y="7" width="2" height="8" fill={hairShade} />
              <rect x="24" y="7" width="2" height="8" fill={hairShade} />
              {/* cachos (blocos arredondados) */}
              <rect x="7" y="4" width="4" height="3" fill={hair} />
              <rect x="13" y="3" width="4" height="3" fill={hair} />
              <rect x="19" y="4" width="4" height="3" fill={hair} />
            </>
          )}
        </g>

        {/* Rosto */}
        <rect x="10" y="9" width="12" height="11" fill={skin} />

        {/* Franja por cima */}
        {isGirl ? (
          <rect x="9" y="7" width="14" height="4" fill={hair} />
        ) : (
          <rect x="9" y="7" width="14" height="3" fill={hair} />
        )}

        {/* Olhos (piscam) */}
        <g className="pc-eyes">
          <rect x="12" y="12" width="2" height="3" fill={eye} />
          <rect x="18" y="12" width="2" height="3" fill={eye} />
          {/* brilho */}
          <rect x="12" y="12" width="1" height="1" fill="#fff" />
          <rect x="18" y="12" width="1" height="1" fill="#fff" />
        </g>

        {/* Bochechas coradas */}
        <g style={{ opacity: blush ? 1 : 0, transition: "opacity .5s" }}>
          <rect x="11" y="15" width="2" height="2" fill="#f77" opacity="0.6" />
          <rect x="19" y="15" width="2" height="2" fill="#f77" opacity="0.6" />
        </g>

        {/* Bigode e barba leve (só no personagem masculino) */}
        {!isGirl && (
          <>
            <rect x="13" y="15" width="6" height="1" fill={hairShade} />
            <rect x="10" y="18" width="12" height="2" fill={hairShade} opacity="0.35" />
          </>
        )}

        {/* Boca / sorriso */}
        {bigSmile ? (
          <>
            <rect x="13" y="16" width="6" height="2" fill="#a1121f" />
            <rect x="14" y="18" width="4" height="1" fill="#ce4d5b" />
          </>
        ) : (
          <rect x="14" y="16" width="4" height="1" fill="#a1121f" />
        )}

        {/* Corpo / roupa */}
        {isGirl ? (
          <>
            {/* vestido de princesa (trapézio) */}
            <rect x="12" y="20" width="8" height="4" fill={cloth} />
            <rect x="10" y="24" width="12" height="5" fill={cloth} />
            <rect x="8" y="29" width="16" height="6" fill={cloth} />
            <rect x="8" y="34" width="16" height="2" fill={clothShade} />
            {/* detalhe cintura */}
            <rect x="12" y="23" width="8" height="1" fill="#fff" opacity="0.7" />
            {/* braços */}
            <rect x="9" y="21" width="2" height="7" fill={skin} />
            <rect x="21" y="21" width="2" height="7" fill={skin} />
          </>
        ) : (
          <>
            {/* camisa casual */}
            <rect x="11" y="20" width="10" height="9" fill={cloth} />
            <rect x="11" y="27" width="10" height="2" fill={clothShade} />
            {/* braços */}
            <rect x="8" y="21" width="3" height="8" fill={cloth} />
            <rect x="21" y="21" width="3" height="8" fill={cloth} />
            <rect x="8" y="28" width="3" height="2" fill={skin} />
            <rect x="21" y="28" width="3" height="2" fill={skin} />
            {/* pernas */}
            <rect x="12" y="29" width="3" height="7" fill={legs} />
            <rect x="17" y="29" width="3" height="7" fill={legs} />
          </>
        )}

        {/* pés */}
        <rect x="11" y="36" width="4" height="2" fill="#3a2b2b" />
        <rect x="17" y="36" width="4" height="2" fill="#3a2b2b" />
      </g>
    </svg>
  );
}

export default PixelCharacter;
