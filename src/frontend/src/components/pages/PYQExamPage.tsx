import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import {
  completeAttempt,
  createOrResumeAttempt,
  generateAttemptId,
  saveAttempt,
  saveResult,
} from "@/lib/mockTestStorage";
import { cn } from "@/lib/utils";
import { saveWeakQuestion } from "@/lib/weakAreasStorage";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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

function getPYQSessionKey(year?: number, title?: string): string {
  const id = title
    ? title.replace(/\s+/g, "_").toLowerCase()
    : `year_${year ?? 0}`;
  return `pyq_session_${id}`;
}

// Derive a stable numeric testId from the PYQ test parameters
function getPYQTestId(year?: number, title?: string): number {
  if (title) {
    // Hash the title to a stable integer
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = (hash * 31 + title.charCodeAt(i)) | 0;
    }
    return Math.abs(hash) + 100000;
  }
  return (year ?? 0) + 200000;
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

function sortBySection(qs: PYQQuestion[]): PYQQuestion[] {
  const order: Record<string, number> = {
    "Legal Aptitude": 0,
    "GK & Current Affairs": 1,
    "General Knowledge": 1,
    "Mental Ability": 2,
  };
  return [...qs].sort(
    (a, b) => (order[a.subject] ?? 3) - (order[b.subject] ?? 3),
  );
}

interface PYQExamPageProps {
  year?: number;
  title?: string;
  questions?: PYQQuestion[];
  onExit: () => void;
  onExamActiveChange?: (active: boolean) => void;
}

export function PYQExamPage({
  year,
  title,
  questions: propQuestions,
  onExit,
  onExamActiveChange,
}: PYQExamPageProps) {
  const sessionKey = getPYQSessionKey(year, title);
  const { user } = useAuth();

  // Signal exam active to parent
  useEffect(() => {
    onExamActiveChange?.(true);
    return () => onExamActiveChange?.(false);
  }, [onExamActiveChange]);
  const userId = user?.email ?? "guest";
  const testId = getPYQTestId(year, title);

  const [questions] = useState<PYQQuestion[]>(() => {
    if (propQuestions) return sortBySection(propQuestions);
    if (year === 0) return sortBySection(getAllPYQQuestions());
    return sortBySection(getQuestionsByYear(year ?? 0));
  });

  // Initialize attempt (create or resume) — never creates duplicates
  const attemptRef = useRef(
    createOrResumeAttempt(userId, testId, "PYQ", 90 * 60),
  );

  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    // Prefer attempt's answers if non-empty, fall back to session storage
    const attempt = attemptRef.current;
    if (Object.keys(attempt.answers).length > 0) return attempt.answers;
    try {
      const raw = localStorage.getItem(sessionKey);
      if (raw) return (JSON.parse(raw) as any).answers ?? {};
    } catch {}
    return {};
  });

  const [markedForReview, setMarkedForReview] = useState<Set<number>>(() => {
    const attempt = attemptRef.current;
    if (attempt.markedForReview.length > 0)
      return new Set(attempt.markedForReview);
    try {
      const raw = localStorage.getItem(sessionKey);
      if (raw) return new Set((JSON.parse(raw) as any).markedForReview ?? []);
    } catch {}
    return new Set();
  });

  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(() => {
    return new Set(attemptRef.current.visitedQuestions);
  });

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const attempt = attemptRef.current;
    if (attempt.status === "in-progress" && attempt.startTime) {
      const elapsed = Math.floor((Date.now() - attempt.startTime) / 1000);
      return Math.max(0, 90 * 60 - elapsed);
    }
    if (attempt.status === "in-progress" && attempt.remainingTime < 90 * 60) {
      return attempt.remainingTime;
    }
    try {
      const raw = localStorage.getItem(sessionKey);
      if (raw) {
        const parsed = JSON.parse(raw) as any;
        if (parsed.startedAt) {
          const elapsed = Math.floor((Date.now() - parsed.startedAt) / 1000);
          return Math.max(0, 90 * 60 - elapsed);
        }
      }
    } catch {}
    return 90 * 60;
  });

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const attempt = attemptRef.current;
    if (attempt.currentIndex !== undefined) return attempt.currentIndex;
    try {
      const raw = localStorage.getItem(sessionKey);
      if (raw) return (JSON.parse(raw) as any).currentIndex ?? 0;
    } catch {}
    return 0;
  });
  const [phase, setPhase] = useState<Phase>("exam");
  const [reviewIndex, setReviewIndex] = useState(0);
  const startTimeRef = useRef<number>(
    (() => {
      const attempt = attemptRef.current;
      if (attempt.startTime) return attempt.startTime;
      try {
        const raw = localStorage.getItem(sessionKey);
        if (raw) {
          const parsed = JSON.parse(raw) as any;
          if (parsed.startedAt) return parsed.startedAt as number;
        }
      } catch {}
      return Date.now();
    })(),
  );

  // Persist startTime immediately on mount so reload can use it
  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
  useEffect(() => {
    try {
      const existing = localStorage.getItem(sessionKey);
      const parsed = existing ? JSON.parse(existing) : {};
      if (!parsed.startedAt) {
        localStorage.setItem(
          sessionKey,
          JSON.stringify({ ...parsed, startedAt: startTimeRef.current }),
        );
      }
    } catch {}
  }, []);

  // Persist session to localStorage and attempt on every state change during exam
  useEffect(() => {
    if (phase !== "exam") return;
    try {
      localStorage.setItem(
        sessionKey,
        JSON.stringify({
          answers,
          markedForReview: Array.from(markedForReview),
          timeLeft,
          currentIndex,
          startedAt: startTimeRef.current,
          savedAt: Date.now(),
        }),
      );
    } catch {}
    const updated = {
      ...attemptRef.current,
      answers,
      markedForReview: Array.from(markedForReview),
      visitedQuestions: Array.from(visitedQuestions),
      remainingTime: timeLeft,
      currentIndex,
    };
    attemptRef.current = updated;
    saveAttempt(updated);
  }, [
    phase,
    answers,
    markedForReview,
    visitedQuestions,
    timeLeft,
    currentIndex,
    sessionKey,
  ]);

  // Additional 5-second periodic auto-save for extra safety
  useEffect(() => {
    if (phase !== "exam") return;
    const interval = setInterval(() => {
      try {
        localStorage.setItem(
          sessionKey,
          JSON.stringify({
            answers,
            markedForReview: Array.from(markedForReview),
            timeLeft,
            currentIndex,
            startedAt: startTimeRef.current,
            savedAt: Date.now(),
          }),
        );
      } catch {}
      const updated = {
        ...attemptRef.current,
        answers,
        markedForReview: Array.from(markedForReview),
        visitedQuestions: Array.from(visitedQuestions),
        remainingTime: timeLeft,
        currentIndex,
      };
      attemptRef.current = updated;
      saveAttempt(updated);
    }, 5000);
    return () => clearInterval(interval);
  }, [
    phase,
    answers,
    markedForReview,
    visitedQuestions,
    timeLeft,
    currentIndex,
    sessionKey,
  ]);

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

  const currentIndexRef = useRef(currentIndex);

  function handleCurrentIndexChange(idx: number) {
    currentIndexRef.current = idx;
    setCurrentIndex(idx);
    setVisitedQuestions((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  }

  function handleVisitedChange(visited: number[]) {
    setVisitedQuestions(new Set(visited));
  }

  function handleSubmit(
    finalAnswers: Record<number, number>,
    finalMarked: Set<number>,
    finalTimeLeft: number,
  ) {
    // Remove in-progress session
    try {
      localStorage.removeItem(sessionKey);
    } catch {}

    // Calculate final results
    const finalScore = questions.reduce(
      (acc, q, i) => acc + (finalAnswers[i] === q.correct ? 1 : 0),
      0,
    );
    const finalTotal = questions.length;
    const finalAccuracy =
      finalTotal > 0 ? Math.round((finalScore / finalTotal) * 100) : 0;
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);

    // Build subject breakdown
    const bySubject: Record<string, { correct: number; total: number }> = {};
    for (const subj of subjectKeys) {
      const subjQs = questions
        .map((qs, i) => ({ qs, i }))
        .filter(({ qs }) => qs.subject === subj);
      const correct = subjQs.filter(
        ({ qs, i }) => finalAnswers[i] === qs.correct,
      ).length;
      bySubject[subj] = { correct, total: subjQs.length };
    }

    // Save wrong answers as weak questions
    for (let idx2 = 0; idx2 < questions.length; idx2++) {
      const q2 = questions[idx2];
      if (
        finalAnswers[idx2] !== undefined &&
        finalAnswers[idx2] !== q2.correct
      ) {
        saveWeakQuestion({
          id: `pyq_${title ?? year}_${idx2}`,
          text: q2.question,
          options: q2.options,
          correct: q2.correct,
          explanation: q2.explanation,
          subject: q2.subject,
          source: "pyq",
          savedAt: Date.now(),
        });
      }
    }

    // Save result — always appends via unique attemptId
    saveResult({
      testId,
      attemptId: generateAttemptId(),
      testName: headerTitle,
      testType: "pyq",
      score: finalScore,
      total: finalTotal,
      accuracy: finalAccuracy,
      timeTaken: elapsed,
      bySubject,
      completedAt: Date.now(),
      questions: questions as never,
      answers: finalAnswers,
    });

    // Complete and persist the unified attempt
    const completed = completeAttempt(
      { ...attemptRef.current, remainingTime: finalTimeLeft },
      finalScore,
      finalAccuracy,
    );
    attemptRef.current = completed;

    setAnswers(finalAnswers);
    setMarkedForReview(finalMarked);
    setTimeLeft(finalTimeLeft);
    setPhase("results");
  }

  // ── Exam UI ──────────────────────────────────────────────────────────────
  if (phase === "exam") {
    return (
      <CBTExamInterface
        initialCurrentIndex={currentIndex}
        onCurrentIndexChange={handleCurrentIndexChange}
        testName={headerTitle}
        questions={cbtQuestions}
        initialAnswers={answers}
        initialMarked={Array.from(markedForReview)}
        initialTimeLeft={timeLeft}
        onAnswerChange={(idxAnswers) => {
          setAnswers(idxAnswers);
          setVisitedQuestions((prev) => {
            if (prev.has(currentIndexRef.current)) return prev;
            const next = new Set(prev);
            next.add(currentIndexRef.current);
            return next;
          });
        }}
        onVisitedChange={handleVisitedChange}
        onMarkedChange={(arr) => setMarkedForReview(new Set(arr))}
        onTimeChange={setTimeLeft}
        onSubmit={handleSubmit}
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
          <div className="flex items-center justify-center mb-2">
            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-300">
              <CheckCircle2 className="w-3 h-3" /> Test Completed
            </span>
          </div>

          <div className="flex gap-3 mb-8">
            <Button
              className="flex-1"
              style={{ backgroundColor: "#0F3554" }}
              onClick={() => {
                const el = document.getElementById("pyq-full-review");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid="pyq_exam.primary_button"
            >
              <BookOpen className="w-4 h-4 mr-2" /> View Full Review
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

          {/* ── Full Question Review ─────────────────────────────────────── */}
          <div id="pyq-full-review">
            <h2
              className="text-base font-bold mb-4 flex items-center gap-2"
              style={{ color: "#0F3554" }}
            >
              <BookOpen className="w-4 h-4" /> Full Question Review
              <span className="text-xs font-normal text-gray-500 ml-1">
                ({questions.length} questions)
              </span>
            </h2>
            <div className="space-y-5" data-ocid="pyq_exam.list">
              {questions.map((q, idx) => {
                const userAns = answers[idx];
                const isCorrect = userAns === q.correct;
                const isAnswered = userAns !== undefined;
                return (
                  <Card
                    key={q.id}
                    className="shadow-sm"
                    data-ocid={`pyq_exam.item.${idx + 1}`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xs font-bold text-gray-400">
                          Q{idx + 1}
                        </span>
                        <Badge
                          className={cn(
                            "text-xs",
                            SUBJECT_COLOR[q.subject] ??
                              "bg-gray-100 text-gray-700",
                          )}
                        >
                          {q.subject}
                        </Badge>
                        {isAnswered && isCorrect && (
                          <span className="flex items-center gap-1 text-xs text-green-700 font-semibold">
                            <CheckCircle2 className="w-3 h-3" /> Correct
                          </span>
                        )}
                        {isAnswered && !isCorrect && (
                          <span className="flex items-center gap-1 text-xs text-red-600 font-semibold">
                            <XCircle className="w-3 h-3" /> Incorrect
                          </span>
                        )}
                        {!isAnswered && (
                          <span className="text-xs text-gray-400">
                            Not Answered
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium leading-relaxed mb-4 whitespace-pre-line text-gray-900">
                        {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => {
                          const isUserPick = userAns === oi;
                          const isCorrectOpt = q.correct === oi;
                          let cls = "bg-white border-gray-200 text-gray-600";
                          if (isUserPick && isCorrectOpt)
                            cls =
                              "bg-green-100 border-green-500 text-green-800";
                          else if (isUserPick && !isCorrectOpt)
                            cls = "bg-red-100 border-red-500 text-red-800";
                          else if (isCorrectOpt)
                            cls = "bg-green-50 border-green-400 text-green-700";
                          return (
                            <div
                              key={opt}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2.5 rounded-lg border-2 text-sm",
                                cls,
                              )}
                            >
                              <span
                                className={cn(
                                  "w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0",
                                  isCorrectOpt
                                    ? "bg-green-500 text-white"
                                    : isUserPick
                                      ? "bg-red-500 text-white"
                                      : "bg-gray-100 text-gray-500",
                                )}
                              >
                                {String.fromCharCode(65 + oi)}
                              </span>
                              <span className="flex-1">{opt}</span>
                              {isUserPick && isCorrectOpt && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                              )}
                              {isUserPick && !isCorrectOpt && (
                                <XCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                              )}
                              {!isUserPick && isCorrectOpt && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-xs font-semibold text-blue-800 mb-1">
                          Explanation
                        </p>
                        <p className="text-sm text-blue-900 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Review UI ────────────────────────────────────────────────────────────
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
