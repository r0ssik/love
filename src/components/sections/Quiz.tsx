import { AnimatePresence, motion } from "framer-motion";
import { Check, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import config from "@/config/site";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export function Quiz() {
  const questions = config.quiz;
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const answer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answerIndex) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1100);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const percent = Math.round((score / questions.length) * 100);
  const verdict =
    percent === 100
      ? "Casal perfeito! Você me conhece de olhos fechados 😍"
      : percent >= 50
        ? "Muito bom! A gente se conhece bem ❤️"
        : "Hora de marcar mais encontros pra você me conhecer melhor 😜";

  return (
    <Section
      id="quiz"
      eyebrow="Será que você me conhece?"
      title={<>Quiz do <span className="text-gradient">casal</span></>}
      subtitle="Um joguinho rápido pra testar o quanto a gente se conhece."
    >
      <Reveal>
        <div className="glass mx-auto max-w-xl p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                {/* Progresso */}
                <div className="mb-6 flex items-center justify-between text-sm text-muted">
                  <span>
                    Pergunta {current + 1} de {questions.length}
                  </span>
                  <span>Acertos: {score}</span>
                </div>
                <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-glass/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${((current) / questions.length) * 100}%` }}
                  />
                </div>

                <h3 className="mb-6 font-display text-2xl font-bold">
                  {q.question}
                </h3>

                <div className="grid gap-3">
                  {q.options.map((opt, i) => {
                    const isCorrect = i === q.answerIndex;
                    const isChosen = selected === i;
                    let style =
                      "border-line/15 hover:border-primary/50 hover:bg-glass/10";
                    if (selected !== null) {
                      if (isCorrect)
                        style = "border-green-500/60 bg-green-500/15 text-green-400";
                      else if (isChosen)
                        style = "border-red-500/60 bg-red-500/15 text-red-400";
                      else style = "border-line/10 opacity-60";
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => answer(i)}
                        disabled={selected !== null}
                        className={`flex items-center justify-between rounded-2xl border px-5 py-3.5 text-left font-medium transition-all ${style}`}
                      >
                        {opt}
                        {selected !== null && isCorrect && <Check size={18} />}
                        {selected !== null && isChosen && !isCorrect && (
                          <X size={18} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mb-2 text-6xl">
                  {percent === 100 ? "🏆" : percent >= 50 ? "❤️" : "😅"}
                </div>
                <h3 className="font-display text-3xl font-bold text-gradient">
                  {score} / {questions.length}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-muted">{verdict}</p>
                <button onClick={restart} className="btn-primary mt-6">
                  <RotateCcw size={17} /> Jogar de novo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}

export default Quiz;
