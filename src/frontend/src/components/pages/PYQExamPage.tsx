import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import {
  type PYQQuestion,
  getAllPYQQuestions,
  getQuestionsByYear,
} from "../../data/pyqBank";
import { CBTExamInterface, type CBTQuestion } from "../exam/CBTExamInterface";

type Phase = "exam" | "results" | "review";

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const SUBJECT_COLOR: Record<string, string> = {
  "Legal Aptitude": "bg-blue-100 text-blue-800",
  "General Knowledge": "bg-emerald-100 text-emerald-800",
  "GK & Current Affairs": "bg-emerald-100 text-emerald-800",
  "Mental Ability": "bg-purple-100 text-purple-800",
};

const SUBJECT_BAR_COLOR: Record<string, string> = {
  "Legal Aptitude": "bg-blue-500",
  "General Knowledge": "bg-emerald-500",
  "GK & Current Affairs": "bg-emerald-500",
  "Mental Ability": "bg-purple-500",
};

interface PYQExamPageProps {
  year?: number;
  title?: string;
  questions?: PYQQuestion[];
  onExit: () => void;
}

export function PYQExamPage({
  year,
  title,
  questions: propQuestions,
  onExit,
}: PYQExamPageProps) {
  const [questions] = useState<PYQQuestion[]>(() => {
    if (propQuestions) return propQuestions;
    if (year === 0) return getAllPYQQuestions();
    return getQuestionsByYear(year ?? 0);
  });

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(
    new Set(),
  );
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [phase, setPhase] = useState<Phase>("exam");
  const [reviewIndex, setReviewIndex] = useState(0);
  const startTimeRef = useRef(Date.now());

  const isMockSeries = !!propQuestions;
  const headerTitle =
    title ??
    (year === 0 ? "All Years Combined" : `Previous Year Paper ${year}`);
  const badgeLabel = isMockSeries
    ? "PYQ Series"
    : year === 0
      ? "All PYQ"
      : `PYQ ${year}`;

  const total = questions.length;
  const score = questions.reduce(
    (acc, q2, i) => acc + (answers[i] === q2.correct ? 1 : 0),
    0,
  );
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
  const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);

  const subjectKeys = [...new Set(questions.map((q2) => q2.subject))];
  const subjectBreakdown = subjectKeys.map((subj) => {
    const subjQs = questions
      .map((qs, i) => ({ qs, i }))
      .filter(({ qs }) => qs.subject === subj);
    const subjScore = subjQs.filter(
      ({ qs, i }) => answers[i] === qs.correct,
    ).length;
    const subjTotal = subjQs.length;
    const subjAccuracy =
      subjTotal > 0 ? Math.round((subjScore / subjTotal) * 100) : 0;
    return { subj, total: subjTotal, score: subjScore, accuracy: subjAccuracy };
  });

  const cbtQuestions: CBTQuestion[] = questions.map((q, i) => ({
    id: i,
    subject: q.subject,
    question: q.question,
    options: q.options,
    correct: q.correct,
    explanation: q.explanation,
  }));

  // ── Exam UI ────────────────────────────────────────────────────────────────
  if (phase === "exam") {
    return (
      <CBTExamInterface
        testName={headerTitle}
        questions={cbtQuestions}
        initialAnswers={answers}
        initialMarked={Array.from(markedForReview)}
        initialTimeLeft={timeLeft}
        onAnswerChange={setAnswers}
        onMarkedChange={(arr) => setMarkedForReview(new Set(arr))}
        onTimeChange={setTimeLeft}
        onSubmit={(finalAnswers, finalMarked, finalTimeLeft) => {
          setAnswers(finalAnswers);
          setMarkedForReview(finalMarked);
          setTimeLeft(finalTimeLeft);
          setPhase("results");
        }}
        onExit={onExit}
      />
    );
  }

  // ── Results UI ─────────────────────────────────────────────────────────────
  if (phase === "results") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gray-50 p-6"
        data-ocid="pyq_exam.success_state"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#0F3554" }}>
                Results
              </h1>
              <p className="text-gray-500 text-sm">{headerTitle}</p>
            </div>
            <Badge
              className={
                isMockSeries
                  ? "bg-violet-100 text-violet-800 border-violet-200"
                  : year === 0
                    ? "bg-indigo-100 text-indigo-800"
                    : "bg-amber-100 text-amber-800"
              }
            >
              {badgeLabel}
            </Badge>
          </div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div
                    className="text-3xl font-bold"
                    style={{ color: "#0F3554" }}
                  >
                    {score}/{total}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Score</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-emerald-600">
                    {accuracy}%
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Accuracy</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-purple-600">
                    {formatTime(timeTaken)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Time Taken</div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3">
                  Subject-wise Breakdown
                </h3>
                <div className="space-y-3">
                  {subjectBreakdown.map(
                    ({ subj, total: st, score: ss, accuracy: sa }) => (
                      <div key={subj}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-700 font-medium">
                            {subj}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {ss}/{st} · {sa}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className={cn(
                              "h-2 rounded-full transition-all",
                              SUBJECT_BAR_COLOR[subj] ?? "bg-blue-500",
                            )}
                            style={{ width: `${sa}%` }}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Button
              className="flex-1"
              style={{ backgroundColor: "#0F3554" }}
              onClick={() => {
                setReviewIndex(0);
                setPhase("review");
              }}
              data-ocid="pyq_exam.primary_button"
            >
              <BookOpen className="w-4 h-4 mr-2" /> Review Answers
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onExit}
              data-ocid="pyq_exam.secondary_button"
            >
              <X className="w-4 h-4 mr-2" /> Exit
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Review UI ─────────────────────────────────────────────────────────────
  const rq = questions[reviewIndex];
  const userAnswer = answers[reviewIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-4"
      data-ocid="pyq_exam.panel"
    >
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPhase("results")}
              className="h-8 w-8 p-0"
              data-ocid="pyq_exam.close_button"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-base font-bold" style={{ color: "#0F3554" }}>
              Review — Q{reviewIndex + 1}/{total}
            </h2>
          </div>
          <Badge
            className={
              isMockSeries
                ? "bg-violet-100 text-violet-800 text-xs"
                : "bg-amber-100 text-amber-800 text-xs"
            }
          >
            {badgeLabel}
          </Badge>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={reviewIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18 }}
          >
            <Card data-ocid="pyq_exam.card">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    className={
                      SUBJECT_COLOR[rq.subject] ?? "bg-gray-100 text-gray-800"
                    }
                  >
                    {rq.subject}
                  </Badge>
                  {userAnswer === rq.correct ? (
                    <span className="flex items-center gap-1 text-xs text-green-700 font-medium">
                      <CheckCircle2 size={13} /> Correct
                    </span>
                  ) : userAnswer !== undefined ? (
                    <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                      <XCircle size={13} /> Incorrect
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Not Answered</span>
                  )}
                </div>
                <p className="font-medium text-gray-800 leading-relaxed whitespace-pre-line">
                  {rq.question}
                </p>
                <div className="space-y-2">
                  {rq.options.map((opt, i) => (
                    <div
                      key={opt}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg border text-sm",
                        i === rq.correct &&
                          "bg-green-50 border-green-400 text-green-800 font-semibold",
                        i === userAnswer &&
                          i !== rq.correct &&
                          "bg-red-50 border-red-400 text-red-700",
                        i !== rq.correct &&
                          i !== userAnswer &&
                          "bg-gray-50 border-gray-200 text-gray-600",
                      )}
                    >
                      <span
                        className="w-6 h-6 flex items-center justify-center rounded-full border text-xs font-bold flex-shrink-0"
                        style={
                          i === rq.correct
                            ? {
                                background: "#16a34a",
                                color: "white",
                                borderColor: "#16a34a",
                              }
                            : {}
                        }
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                      {i === rq.correct && (
                        <CheckCircle2 className="w-4 h-4 ml-auto text-green-600" />
                      )}
                      {i === userAnswer && i !== rq.correct && (
                        <XCircle className="w-4 h-4 ml-auto text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                  <span className="font-semibold">Explanation: </span>
                  {rq.explanation}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3">
          <Button
            variant="outline"
            disabled={reviewIndex === 0}
            onClick={() => setReviewIndex((i) => i - 1)}
            data-ocid="pyq_exam.pagination_prev"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </Button>
          <ScrollArea className="flex-1">
            <div className="flex gap-1 pb-1">
              {questions.map((qItem, i) => (
                <button
                  type="button"
                  key={qItem.id}
                  onClick={() => setReviewIndex(i)}
                  className={cn(
                    "w-8 h-8 rounded text-xs font-semibold flex-shrink-0",
                    i === reviewIndex && "ring-2 ring-[#0F3554]",
                    answers[i] === questions[i].correct
                      ? "bg-green-500 text-white"
                      : answers[i] !== undefined
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-600",
                  )}
                  data-ocid={`pyq_exam.item.${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </ScrollArea>
          <Button
            variant="outline"
            disabled={reviewIndex === total - 1}
            onClick={() => setReviewIndex((i) => i + 1)}
            className="ml-auto"
            data-ocid="pyq_exam.pagination_next"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
