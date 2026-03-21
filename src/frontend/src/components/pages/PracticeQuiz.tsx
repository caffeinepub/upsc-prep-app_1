import { Button } from "@/components/ui/button";
import { type Question, upscQuestions } from "@/data/upscQuestions";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import { recordActivity } from "@/lib/streakTracker";
import { ArrowLeft, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { removeMistake, saveMistake } from "./DailyReviewQuiz";

interface PracticeQuizProps {
  subject: "polity" | "history" | "geography";
  onClose: () => void;
}

const SUBJECT_LABELS: Record<string, string> = {
  polity: "Polity",
  history: "History",
  geography: "Geography",
};

const OPTION_LABELS = ["A", "B", "C", "D"] as const;
const QUESTIONS_PER_SESSION = 10;

function shuffle(arr: Question[]): Question[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickQuestions(
  subject: "polity" | "history" | "geography",
): Question[] {
  const bank = upscQuestions.filter((q) => q.subject === subject);
  const topicKey = `upsc_seen_topics_${subject}`;
  const idKey = `upsc_used_ids_${subject}`;

  let seenTopics: string[] = [];
  let usedIds: string[] = [];
  try {
    seenTopics = JSON.parse(localStorage.getItem(topicKey) ?? "[]");
    usedIds = JSON.parse(localStorage.getItem(idKey) ?? "[]");
  } catch {
    seenTopics = [];
    usedIds = [];
  }

  const unseenByTopic = bank.filter((q) => !seenTopics.includes(q.topic));
  const seenByTopic = bank.filter((q) => seenTopics.includes(q.topic));
  const pool = [...shuffle(unseenByTopic), ...shuffle(seenByTopic)];
  const selected = pool.slice(0, QUESTIONS_PER_SESSION);

  const newSeenTopics = Array.from(
    new Set([...seenTopics, ...selected.map((q) => q.topic)]),
  );
  const newUsedIds = Array.from(
    new Set([...usedIds, ...selected.map((q) => q.id)]),
  );

  if (newSeenTopics.length >= bank.length) {
    localStorage.setItem(
      topicKey,
      JSON.stringify(selected.map((q) => q.topic)),
    );
    localStorage.setItem(idKey, JSON.stringify(selected.map((q) => q.id)));
  } else {
    localStorage.setItem(topicKey, JSON.stringify(newSeenTopics));
    localStorage.setItem(idKey, JSON.stringify(newUsedIds));
  }

  return selected;
}

export function PracticeQuiz({ subject, onClose }: PracticeQuizProps) {
  const questions = useMemo(() => pickQuestions(subject), [subject]);
  const { incrementCompleted } = useDailyProgress();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS_PER_SESSION).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const q = questions[current];
  const selectedAnswer = answers[current];

  function selectOption(idx: number) {
    if (submitted) return;
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  }

  function goNext() {
    if (current < QUESTIONS_PER_SESSION - 1) {
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
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correct) {
        removeMistake(questions[i].id);
      } else {
        saveMistake(questions[i].id);
      }
    }
    incrementCompleted(QUESTIONS_PER_SESSION);
    recordActivity();
    setSubmitted(true);
  }

  function handleRestart() {
    setAnswers(Array(QUESTIONS_PER_SESSION).fill(null));
    setCurrent(0);
    setSubmitted(false);
  }

  const score = submitted
    ? answers.filter((a, i) => a === questions[i].correct).length
    : 0;
  const accuracy = submitted
    ? Math.round((score / QUESTIONS_PER_SESSION) * 100)
    : 0;

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
              {SUBJECT_LABELS[subject]} — UPSC Practice
            </p>
            <h2 className="text-3xl font-bold mb-4">Session Complete</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {score}/{QUESTIONS_PER_SESSION}
                </p>
                <p className="text-xs opacity-75">Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{accuracy}%</p>
                <p className="text-xs opacity-75">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {QUESTIONS_PER_SESSION - score}
                </p>
                <p className="text-xs opacity-75">Incorrect</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={15} /> Back to Practice
            </Button>
            <Button
              onClick={handleRestart}
              className="flex items-center gap-2"
              style={{ background: "oklch(var(--navy))", color: "white" }}
            >
              <RotateCcw size={15} /> New Session
            </Button>
          </div>

          <div className="space-y-5">
            {questions.map((question, qi) => {
              const userAns = answers[qi];
              const isCorrect = userAns === question.correct;
              return (
                <div
                  key={question.id}
                  className="bg-white rounded-2xl shadow-sm border border-border p-5"
                >
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
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-foreground">
            {SUBJECT_LABELS[subject]}
          </h1>
          <p className="text-xs text-muted-foreground">
            UPSC Practice — {QUESTIONS_PER_SESSION} Questions
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>
            Question {current + 1} of {QUESTIONS_PER_SESSION}
          </span>
          <span>{answers.filter((a) => a !== null).length} answered</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "oklch(var(--navy))" }}
            animate={{
              width: `${((current + 1) / QUESTIONS_PER_SESSION) * 100}%`,
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
          data-ocid="practice_quiz.pagination_prev"
        >
          Previous
        </Button>
        {current < QUESTIONS_PER_SESSION - 1 ? (
          <Button
            onClick={goNext}
            className="flex-1"
            style={{ background: "oklch(var(--navy))", color: "white" }}
            data-ocid="practice_quiz.pagination_next"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={answers.some((a) => a === null)}
            className="flex-1"
            style={{ background: "oklch(var(--navy))", color: "white" }}
            data-ocid="practice_quiz.submit_button"
          >
            Submit
          </Button>
        )}
      </div>
      {answers.some((a) => a === null) &&
        current === QUESTIONS_PER_SESSION - 1 && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            Answer all questions to submit
          </p>
        )}
    </div>
  );
}
