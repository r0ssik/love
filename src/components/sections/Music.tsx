import { AnimatePresence, motion } from "framer-motion";
import { Music2, Pause, Play, Volume2, VolumeX, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import config from "@/config/site";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function Music() {
  const songs = config.songs;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });
  const [volume, setVolume] = useState(0.8);

  // Toca apenas uma faixa por vez: trocar de música pausa a anterior automaticamente.
  const toggle = (i: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playingIndex === i) {
      audio.pause();
      setPlayingIndex(null);
      return;
    }
    audio.src = songs[i].audio!;
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(() => {});
    setPlayingIndex(i);
  };

  // Aplica o volume em tempo real enquanto o controle é arrastado.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () =>
      setProgress({ current: audio.currentTime, duration: audio.duration || 0 });
    const onEnd = () => setPlayingIndex(null);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const percent =
    progress.duration > 0 ? (progress.current / progress.duration) * 100 : 0;

  return (
    <Section
      id="musicas"
      eyebrow="Nossa trilha sonora"
      title={<>As músicas <span className="text-gradient">da gente</span></>}
      subtitle="Cada uma delas conta um pedacinho da nossa história."
    >
      <audio ref={audioRef} preload="none" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {songs.map((song, i) => {
          const isPlaying = playingIndex === i;
          return (
            <Reveal key={i} delay={i * 0.08} direction="up">
              <div className="glass group flex h-full flex-col overflow-hidden p-4">
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={song.cover}
                    alt={`Capa de ${song.title}`}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Botão de play/pause da faixa local */}
                  {song.audio && (
                    <button
                      onClick={() => toggle(i)}
                      aria-label={isPlaying ? `Pausar ${song.title}` : `Tocar ${song.title}`}
                      className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30"
                    >
                      <span
                        className={`grid h-14 w-14 place-items-center rounded-full bg-primary/90 text-white shadow-glow transition-all duration-300 ${
                          isPlaying
                            ? "scale-100 opacity-100"
                            : "scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                        }`}
                      >
                        {isPlaying ? (
                          <Pause size={22} className="fill-white" />
                        ) : (
                          <Play size={22} className="ml-1 fill-white" />
                        )}
                      </span>
                    </button>
                  )}

                  {/* Disco girando (detalhe) — gira de verdade enquanto toca */}
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 8, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                    className="pointer-events-none absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur"
                  >
                    <Music2 size={16} />
                  </motion.div>
                </div>

                {/* Barra de progresso, só na faixa ativa */}
                {isPlaying && (
                  <div className="mb-3">
                    <div className="h-1 overflow-hidden rounded-full bg-glass/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-200"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[0.65rem] text-muted">
                      <span>{formatTime(progress.current)}</span>
                      <span>{formatTime(progress.duration)}</span>
                    </div>
                  </div>
                )}

                <h3 className="font-display text-lg font-bold">{song.title}</h3>
                <p className="text-sm text-primary">{song.artist}</p>
                <p className="mt-2 flex-1 text-sm text-muted">{song.description}</p>

                {song.audio && (
                  <button
                    onClick={() => toggle(i)}
                    className={`mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 ${
                      isPlaying ? "bg-primary" : "bg-gradient-to-r from-primary to-primary-soft"
                    }`}
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                    {isPlaying ? "Pausar" : "Ouvir agora"}
                  </button>
                )}

                <div className="mt-2 flex gap-2">
                  <a
                    href={song.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir no Spotify"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1DB954] px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                  >
                    <Music2 size={15} /> Spotify
                  </a>
                  <a
                    href={song.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir no YouTube"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FF0000] px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                  >
                    <Youtube size={15} /> YouTube
                  </a>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Controle de volume flutuante — só aparece com alguma faixa tocando */}
      <AnimatePresence>
        {playingIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="glass-strong fixed bottom-6 left-6 z-[65] flex items-center gap-3 rounded-full py-3 pl-3 pr-5 shadow-glow"
          >
            <button
              onClick={() => setVolume((v) => (v > 0 ? 0 : 0.8))}
              aria-label={volume > 0 ? "Silenciar" : "Ativar som"}
              className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-primary/20 text-primary"
            >
              {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="w-20 accent-[rgb(var(--c-primary))] sm:w-28"
            />
            <span className="hidden max-w-[8rem] truncate text-xs text-muted sm:inline">
              {songs[playingIndex].title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default Music;
