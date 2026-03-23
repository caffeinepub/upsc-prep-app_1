import { Button } from "@/components/ui/button";
import { type Question, upscQuestions } from "@/data/upscQuestions";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import {
  type WeakQuestion,
  loadWeakQuestions,
  removeWeakQuestion,
} from "@/lib/weakAreasStorage";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

const MISTAKES_KEY = "lawcet_mistakes";
const DAILY_REVIEW_KEY = "lawcet_daily_review";
const OPTION_LABELS = ["A", "B", "C", "D"] as const;

export function loadMistakes(): string[] {
  try {
    return JSON.parse(localStorage.getItem(MISTAKES_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveMistakes(ids: string[]) {
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(ids));
}

export function saveMistake(id: string) {
  const current = loadMistakes();
  if (!current.includes(id)) {
    saveMistakes([...current, id]);
  }
}

export function removeMistake(id: string) {
  const current = loadMistakes();
  saveMistakes(current.filter((m) => m !== id));
}

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getDailyQuestions(): Question[] {
  const today = todayString();
  try {
    const cached = JSON.parse(localStorage.getItem(DAILY_REVIEW_KEY) ?? "null");
    if (cached && cached.date === today && Array.isArray(cached.ids)) {
      const qs = cached.ids
        .map((id: string) => upscQuestions.find((q) => q.id === id))
        .filter(Boolean) as Question[];
      if (qs.length > 0) return qs;
    }
  } catch {
    // ignore
  }

  const mistakes = loadMistakes();
  const available = upscQuestions.filter((q) => mistakes.includes(q.id));
  const seed = today.split("-").reduce((a, b) => a * 31 + Number(b), 0);
  const shuffled = seededShuffle(available, seed);
  const selected = shuffled.slice(0, Math.min(10, available.length));
  localStorage.setItem(
    DAILY_REVIEW_KEY,
    JSON.stringify({ date: today, ids: selected.map((q) => q.id) }),
  );
  return selected;
}

interface DailyReviewQuizProps {
  onClose: () => void;
  onExamActiveChange?: (active: boolean) => void;
}

const SUBJECT_LABELS: Record<string, string> = {
  polity: "Polity",
  history: "History",
  geography: "Geography",
};

export function DailyReviewQuiz({
  onClose,
  onExamActiveChange,
}: DailyReviewQuizProps) {
  const submittedRef = useRef(false);
  const questions = useMemo(() => {
    const base = getDailyQuestions();
    // Merge up to 5 weak questions from mock/PYQ
    const weak = loadWeakQuestions().slice(0, 5);
    const weakConverted = weak.map((wq: WeakQuestion) => ({
      id: wq.id,
      subject: wq.subject as "polity" | "history" | "geography",
      text: wq.text,
      options: wq.options as [string, string, string, string],
      correct: wq.correct as 0 | 1 | 2 | 3,
      explanation: wq.explanation,
      _fromWeak: true,
    }));
    return [...base, ...weakConverted];
  }, []);
  const { incrementCompleted } = useDailyProgress();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    onExamActiveChange?.(true);
    document.documentElement.requestFullscreen().catch(() => {});
    const handler = (e: BeforeUnloadEvent) => {
      if (submittedRef.current) return;
      e.preventDefault();
      e.returnValue =
        "Your review session is in progress. Are you sure you want to leave?";
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      onExamActiveChange?.(false);
    };
  }, [onExamActiveChange]);
  const [direction, setDirection] = useState(1);
  const [removedCount, setRemovedCount] = useState(0);

  if (questions.length === 0) {
    return (
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-8">
        <button
          type="button"
          onClick={() => {
            if (document.fullscreenElement)
              document.exitFullscreen().catch(() => {});
            onClose();
          }}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Practice
        </button>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-border p-10 text-center"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "oklch(0.93 0.02 243)" }}
          >
            <CheckCircle2 size={28} style={{ color: "oklch(var(--navy))" }} />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">
            No mistakes yet
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Complete practice sessions and your wrong answers will appear here
            for daily review.
          </p>
        </motion.div>
      </div>
    );
  }

  const q = questions[current];
  const selectedAnswer = answers[current];

  function selectOption(idx: number) {
    if (submitted) return;
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  }

  function goNext() {
    if (current < questions.length - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
    }
  }

  function goPrev() {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
    }
  }

  function handleSubmit() {
    let removed = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correct) {
        removeMistake(questions[i].id);
        removed++;
      } else {
        saveMistake(questions[i].id);
      }
    }
    incrementCompleted(questions.length);
    setRemovedCount(removed);
    setSubmitted(true);
  }

  const score = submitted
    ? answers.filter((a, i) => a === questions[i].correct).length
    : 0;
  const accuracy = submitted ? Math.round((score / questions.length) * 100) : 0;
  const stillWeak = submitted ? questions.length - score : 0;

  if (submitted) {
    return (
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="rounded-2xl p-6 mb-6 text-white"
            style={{ background: "oklch(var(--navy))" }}
          >
            <p className="text-sm font-medium opacity-75 mb-1">
              Daily Review — Weak Areas
            </p>
            <h2 className="text-3xl font-bold mb-4">Review Complete</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {score}/{questions.length}
                </p>
                <p className="text-xs opacity-75">Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{accuracy}%</p>
                <p className="text-xs opacity-75">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{stillWeak}</p>
                <p className="text-xs opacity-75">Still Weak</p>
              </div>
            </div>
          </div>

          {removedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-3"
            >
              <CheckCircle2 size={18} className="text-green-600 shrink-0" />
              <p className="text-sm text-green-800 font-medium">
                {removedCount} question{removedCount !== 1 ? "s" : ""} removed
                from your weak list
              </p>
            </motion.div>
          )}

          <div className="flex gap-3 mb-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
              data-ocid="daily_review.close_button"
            >
              <ArrowLeft size={15} /> Back to Practice
            </Button>
          </div>

          <div className="space-y-5">
            {questions.map((question, qi) => {
              const userAns = answers[qi];
              const isCorrect = userAns === question.correct;
              return (
                <div
                  key={question.id}
                  data-ocid={`daily_review.item.${qi + 1}`}
                  className="bg-white rounded-2xl shadow-sm border border-border p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: "oklch(0.90 0.06 50)",
                        color: "oklch(var(--navy))",
                      }}
                    >
                      {SUBJECT_LABELS[question.subject] ?? question.subject}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-green-500"
                      />
                    ) : (
                      <XCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-red-500"
                      />
                    )}
                    <p className="text-sm font-medium text-foreground">
                      <span className="text-muted-foreground mr-2">
                        Q{qi + 1}.
                      </span>
                      {question.text}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 mb-3 ml-7">
                    {question.options.map((opt, oi) => {
                      const isOpt = oi === question.correct;
                      const isUser = oi === userAns;
                      let cls = "text-xs px-3 py-2 rounded-lg border ";
                      if (isOpt)
                        cls +=
                          "bg-green-50 border-green-300 text-green-800 font-medium";
                      else if (isUser && !isOpt)
                        cls += "bg-red-50 border-red-300 text-red-700";
                      else cls += "border-transparent text-muted-foreground";
                      return (
                        <div key={`${question.id}-opt-${oi}`} className={cls}>
                          <span className="font-semibold mr-1">
                            {OPTION_LABELS[oi]}.
                          </span>{" "}
                          {opt}
                          {isOpt && (
                            <span className="ml-2 text-green-600">
                              ✓ Correct
                            </span>
                          )}
                          {isUser && !isOpt && (
                            <span className="ml-2 text-red-500">
                              ✗ Your answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="ml-7 bg-blue-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-blue-800">
                      <span className="font-semibold">Explanation: </span>
                      {question.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="daily_review.close_button"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-foreground">Daily Review</h1>
          <p className="text-xs text-muted-foreground">
            Weak Areas — {questions.length} Questions
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>
            Question {current + 1} of {questions.length}
          </span>
          <span>{answers.filter((a) => a !== null).length} answered</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "oklch(var(--navy))" }}
            animate={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl shadow-sm border border-border p-6 mb-5"
        >
          <div className="mb-3">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: "oklch(0.90 0.06 50)",
                color: "oklch(var(--navy))",
              }}
            >
              {SUBJECT_LABELS[q.subject] ?? q.subject}
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground mb-5 leading-relaxed">
            {q.text}
          </p>
          <div className="space-y-2.5">
            {q.options.map((opt, oi) => {
              const isSelected = selectedAnswer === oi;
              return (
                <button
                  key={`opt-${opt.slice(0, 10)}`}
                  type="button"
                  onClick={() => selectOption(oi)}
                  className={`w-full text-left text-sm px-4 py-3 rounded-xl border transition-all duration-150 ${
                    isSelected
                      ? "border-[#0F3554] bg-[#0F3554]/8 text-[#0F3554] font-medium"
                      : "border-border hover:border-[#0F3554]/40 hover:bg-muted/40 text-foreground"
                  }`}
                >
                  <span className="font-semibold mr-2 opacity-60">
                    {OPTION_LABELS[oi]}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={current === 0}
          className="flex-1"
          data-ocid="daily_review.pagination_prev"
        >
          Previous
        </Button>
        {current < questions.length - 1 ? (
          <Button
            onClick={goNext}
            className="flex-1"
            style={{ background: "oklch(var(--navy))", color: "white" }}
            data-ocid="daily_review.pagination_next"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={answers.some((a) => a === null)}
            className="flex-1"
            style={{ background: "oklch(var(--navy))", color: "white" }}
            data-ocid="daily_review.submit_button"
          >
            Submit Review
          </Button>
        )}
      </div>
      {answers.some((a) => a === null) && current === questions.length - 1 && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          Answer all questions to submit
        </p>
      )}
    </div>
  );
}
