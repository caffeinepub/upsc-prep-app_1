import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import {
  clearSession,
  generateAttemptId,
  loadSession,
  saveResult,
  saveSession,
} from "@/lib/mockTestStorage";
import { recordActivity } from "@/lib/streakTracker";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Send,
  Star,
  Timer,
  TrendingDown,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  type Question,
  type Subject,
  questionBank,
} from "../../data/questionBank";
import { CBTExamInterface, type CBTQuestion } from "../exam/CBTExamInterface";

type Phase = "exam" | "results" | "review";

function selectQuestions(): Question[] {
  const bySubject = (s: Subject) => questionBank.filter((q) => q.subject === s);
  const pick = (arr: Question[], n: number) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  };
  return [
    ...pick(bySubject("Legal Aptitude"), 60),
    ...pick(bySubject("General Knowledge"), 30),
    ...pick(bySubject("Mental Ability"), 30),
  ].sort(() => Math.random() - 0.5);
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const SUBJECT_COLOR: Record<Subject, string> = {
  "Legal Aptitude": "bg-blue-100 text-blue-800",
  "General Knowledge": "bg-emerald-100 text-emerald-800",
  "Mental Ability": "bg-purple-100 text-purple-800",
};

interface MockExamPageProps {
  testId: number;
  onExit: () => void;
}

export function MockExamPage({ testId, onExit }: MockExamPageProps) {
  const { incrementCompleted } = useDailyProgress();
  const [questions] = useState<Question[]>(() => selectQuestions());
  const [reviewIndex, setReviewIndex] = useState(0);

  // Id-based answers (question.id → option index)
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    const session = loadSession(testId);
    return session ? session.answers : {};
  });
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(() => {
    const session = loadSession(testId);
    return session ? new Set(session.markedForReview) : new Set();
  });
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const session = loadSession(testId);
    return session ? session.timeLeft : 90 * 60;
  });
  const [phase, setPhase] = useState<Phase>("exam");

  const startTimeRef = useRef<number>(
    (() => {
      const session = loadSession(testId);
      return session ? session.startedAt : Date.now();
    })(),
  );

  // Auto-save session
  useEffect(() => {
    if (phase !== "exam") return;
    saveSession({
      testId,
      questionIds: questions.map((q) => q.id),
      answers,
      markedForReview: Array.from(markedForReview),
      timeLeft,
      startedAt: startTimeRef.current,
    });
  }, [testId, questions, answers, markedForReview, timeLeft, phase]);

  // Results computation
  const results = useMemo(() => {
    let correct = 0;
    const bySubject: Record<Subject, { correct: number; total: number }> = {
      "Legal Aptitude": { correct: 0, total: 0 },
      "General Knowledge": { correct: 0, total: 0 },
      "Mental Ability": { correct: 0, total: 0 },
    };
    for (const q of questions) {
      bySubject[q.subject].total++;
      if (answers[q.id] === q.correct) {
        correct++;
        bySubject[q.subject].correct++;
      }
    }
    return { correct, total: questions.length, bySubject };
  }, [questions, answers]);

  // Save result and clear session when entering results phase
  useEffect(() => {
    if (phase !== "results") return;
    const accuracy = Math.round((results.correct / results.total) * 100);
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    saveResult({
      testId,
      attemptId: generateAttemptId(),
      score: results.correct,
      total: results.total,
      accuracy,
      timeTaken: elapsed,
      bySubject: results.bySubject,
      completedAt: Date.now(),
      questions,
      answers,
    });
    clearSession(testId);
    recordActivity();
    incrementCompleted(results.total);
  }, [phase, testId, results, questions, answers, incrementCompleted]);

  // Convert id-based answers → index-based for CBTInterface
  const indexBasedAnswers = useMemo(() => {
    const out: Record<number, number> = {};
    questions.forEach((q, i) => {
      if (answers[q.id] !== undefined) out[i] = answers[q.id];
    });
    return out;
  }, [questions, answers]);

  // Convert index-based answers → id-based for session saving
  const handleAnswerChange = useCallback(
    (indexAnswers: Record<number, number>) => {
      const idAnswers: Record<number, number> = {};
      for (const [idxStr, optIdx] of Object.entries(indexAnswers)) {
        const q = questions[Number(idxStr)];
        if (q) idAnswers[q.id] = optIdx;
      }
      setAnswers(idAnswers);
    },
    [questions],
  );

  const handleMarkedChange = useCallback((markedArr: number[]) => {
    // CBTInterface uses index-based marked, but we store question ids
    // For session compat, store as is (array of indices mapped to question ids)
    setMarkedForReview(new Set(markedArr));
  }, []);

  const handleTimeChange = useCallback((t: number) => {
    setTimeLeft(t);
  }, []);

  const handleSubmit = useCallback(
    (
      indexAnswers: Record<number, number>,
      finalMarked: Set<number>,
      finalTimeLeft: number,
    ) => {
      // Convert to id-based
      const idAnswers: Record<number, number> = {};
      for (const [idxStr, optIdx] of Object.entries(indexAnswers)) {
        const q = questions[Number(idxStr)];
        if (q) idAnswers[q.id] = optIdx;
      }
      setAnswers(idAnswers);
      setMarkedForReview(finalMarked);
      setTimeLeft(finalTimeLeft);
      setPhase("results");
    },
    [questions],
  );

  // Build CBT-compatible questions (index is used as key, id for identity)
  const cbtQuestions: CBTQuestion[] = useMemo(
    () =>
      questions.map((q) => ({
        id: q.id,
        subject: q.subject,
        question: q.question,
        options: q.options,
        correct: q.correct,
        explanation: q.explanation,
      })),
    [questions],
  );

  const currentQuestion = questions[reviewIndex];

  // ── Exam UI ────────────────────────────────────────────────────────────────
  if (phase === "exam") {
    return (
      <CBTExamInterface
        testName={`LAWCET Mock Test ${testId}`}
        questions={cbtQuestions}
        initialAnswers={indexBasedAnswers}
        initialMarked={Array.from(markedForReview)}
        initialTimeLeft={timeLeft}
        onAnswerChange={handleAnswerChange}
        onMarkedChange={handleMarkedChange}
        onTimeChange={handleTimeChange}
        onSubmit={handleSubmit}
        onExit={onExit}
      />
    );
  }

  // ── Results UI ─────────────────────────────────────────────────────────────
  if (phase === "results") {
    const accuracy = Math.round((results.correct / results.total) * 100);
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);

    const subjectStats = (
      Object.entries(results.bySubject) as [
        Subject,
        { correct: number; total: number },
      ][]
    ).map(([subject, stat]) => ({
      subject,
      accuracy:
        stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0,
      correct: stat.correct,
      total: stat.total,
    }));

    const weakSubjects = subjectStats.filter((s) => s.accuracy < 60);
    const isTimeSlow = elapsed > 70 * 60;
    const isStrongOverall = weakSubjects.length === 0 && accuracy >= 70;

    const barColor = (acc: number) => {
      if (acc >= 70) return { bar: "bg-green-500", text: "text-green-700" };
      if (acc >= 50) return { bar: "bg-amber-400", text: "text-amber-700" };
      return { bar: "bg-red-500", text: "text-red-700" };
    };

    return (
      <div
        className="min-h-screen"
        style={{ background: "oklch(0.96 0.008 243)" }}
      >
        <header
          className="flex items-center px-6 py-3 shadow-sm"
          style={{ background: "oklch(var(--navy))", color: "white" }}
        >
          <Button
            data-ocid="mock_results.close_button"
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 p-0 mr-3"
            onClick={onExit}
          >
            <X size={16} />
          </Button>
          <span className="font-semibold">Test Results</span>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            data-ocid="mock_results.card"
          >
            <Card className="shadow-lg mb-6 overflow-hidden">
              <div
                className="px-6 py-8 text-center text-white"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(var(--navy-deep)), oklch(var(--navy)))",
                }}
              >
                <div className="text-5xl font-bold mb-1">
                  {results.correct}
                  <span className="text-2xl font-medium text-white/70">
                    /{results.total}
                  </span>
                </div>
                <p className="text-white/80 text-sm mt-1">Questions Correct</p>
                <div className="flex items-center justify-center gap-6 mt-5">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{accuracy}%</div>
                    <div className="text-xs text-white/70">Accuracy</div>
                  </div>
                  <div className="w-px h-8 bg-white/25" />
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {formatTime(elapsed)}
                    </div>
                    <div className="text-xs text-white/70">Time Taken</div>
                  </div>
                  <div className="w-px h-8 bg-white/25" />
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {results.total - results.correct}
                    </div>
                    <div className="text-xs text-white/70">Incorrect</div>
                  </div>
                </div>
              </div>

              <CardContent className="p-5">
                <p className="text-sm font-semibold mb-3">Section Breakdown</p>
                {(
                  Object.entries(results.bySubject) as [
                    Subject,
                    { correct: number; total: number },
                  ][]
                ).map(([subject, stat]) => (
                  <div key={subject} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium">{subject}</span>
                      <span className="text-xs text-muted-foreground">
                        {stat.correct}/{stat.total}
                      </span>
                    </div>
                    <Progress
                      value={
                        stat.total > 0 ? (stat.correct / stat.total) * 100 : 0
                      }
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <Card className="shadow-md mb-6">
                <CardContent className="p-5">
                  <p className="text-sm font-semibold mb-4">
                    Accuracy by Subject
                  </p>
                  <div className="space-y-4">
                    {subjectStats.map(({ subject, accuracy: acc }) => {
                      const colors = barColor(acc);
                      return (
                        <div key={subject}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-medium text-foreground">
                              {subject}
                            </span>
                            <span
                              className={cn("text-xs font-bold", colors.text)}
                            >
                              {acc}%
                            </span>
                          </div>
                          <div className="h-5 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${acc}%` }}
                              transition={{
                                duration: 0.7,
                                ease: "easeOut",
                                delay: 0.2,
                              }}
                              className={cn("h-full rounded-full", colors.bar)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                      <span className="text-xs text-muted-foreground">
                        Strong (≥70%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                      <span className="text-xs text-muted-foreground">
                        Average (50–69%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                      <span className="text-xs text-muted-foreground">
                        Weak (&lt;50%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="shadow-md mb-6">
                <CardContent className="p-5">
                  <p className="text-sm font-semibold mb-4">Your Insights</p>
                  <div className="space-y-3" data-ocid="mock_results.panel">
                    {weakSubjects.map(({ subject, accuracy: acc }) => (
                      <div
                        key={subject}
                        className="flex items-start gap-3 bg-white border-l-4 border-red-500 rounded-r-xl px-4 py-3 shadow-sm"
                        data-ocid="mock_results.card"
                      >
                        <TrendingDown
                          size={18}
                          className="text-red-500 mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Focus on {subject}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Your accuracy in {subject} was {acc}%. Review the
                            fundamentals and practice more questions in this
                            area.
                          </p>
                        </div>
                      </div>
                    ))}

                    {isTimeSlow && (
                      <div
                        className="flex items-start gap-3 bg-white border-l-4 border-amber-400 rounded-r-xl px-4 py-3 shadow-sm"
                        data-ocid="mock_results.card"
                      >
                        <Timer
                          size={18}
                          className="text-amber-500 mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Improve Time Management
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            You used {formatTime(elapsed)} of your time. Try to
                            complete each question in under 90 seconds to finish
                            comfortably within 90 minutes.
                          </p>
                        </div>
                      </div>
                    )}

                    {isStrongOverall && (
                      <div
                        className="flex items-start gap-3 bg-white border-l-4 border-green-500 rounded-r-xl px-4 py-3 shadow-sm"
                        data-ocid="mock_results.card"
                      >
                        <Star
                          size={18}
                          className="text-green-500 mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Strong Performance!
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Great work! You scored {accuracy}% overall with no
                            weak areas. Keep up the consistent practice to stay
                            at this level.
                          </p>
                        </div>
                      </div>
                    )}

                    {weakSubjects.length === 0 &&
                      !isTimeSlow &&
                      !isStrongOverall && (
                        <div
                          className="flex items-start gap-3 bg-white border-l-4 border-amber-400 rounded-r-xl px-4 py-3 shadow-sm"
                          data-ocid="mock_results.card"
                        >
                          <Star
                            size={18}
                            className="text-amber-500 mt-0.5 flex-shrink-0"
                          />
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              Keep Practicing
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              You&apos;re making progress. Aim for 70%+ accuracy
                              across all sections for a strong LAWCET result.
                            </p>
                          </div>
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                data-ocid="mock_results.primary_button"
                className="flex-1 gap-2"
                style={{ background: "oklch(var(--navy))", color: "white" }}
                onClick={() => {
                  setReviewIndex(0);
                  setPhase("review");
                }}
              >
                <BookOpen size={15} /> Review Answers
              </Button>
              <Button
                data-ocid="mock_results.secondary_button"
                variant="outline"
                className="flex-1 gap-2"
                onClick={onExit}
              >
                Back to Tests
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Review UI ──────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.96 0.008 243)" }}
    >
      <header
        className="flex items-center justify-between px-4 sm:px-6 py-3 shadow-sm"
        style={{ background: "oklch(var(--navy))", color: "white" }}
      >
        <div className="flex items-center gap-3">
          <Button
            data-ocid="mock_review.close_button"
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
            onClick={() => setPhase("results")}
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="font-semibold text-sm sm:text-base">
            Review Mode — Q{reviewIndex + 1}/{questions.length}
          </span>
        </div>
        <span className="text-white/70 text-xs">
          {results.correct}/{results.total} correct
        </span>
      </header>

      <ScrollArea className="h-[calc(100vh-56px)]">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex gap-1.5 flex-wrap mb-5">
            {questions.map((q, idx) => {
              const isCorrect = answers[q.id] === q.correct;
              const wasAnswered = answers[q.id] !== undefined;
              return (
                <button
                  type="button"
                  key={q.id}
                  data-ocid={`mock_review.item.${idx + 1}`}
                  onClick={() => setReviewIndex(idx)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-xs font-semibold transition-all",
                    idx === reviewIndex &&
                      "ring-2 ring-offset-1 ring-[oklch(var(--navy))]",
                    wasAnswered && isCorrect && "bg-green-500 text-white",
                    wasAnswered && !isCorrect && "bg-red-500 text-white",
                    !wasAnswered && "bg-muted text-muted-foreground",
                  )}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
            >
              <Card className="shadow-md mb-4" data-ocid="mock_review.card">
                <CardContent className="p-5 sm:p-7">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge
                      className={cn(
                        "text-xs font-medium border-0",
                        SUBJECT_COLOR[currentQuestion.subject],
                      )}
                    >
                      {currentQuestion.subject}
                    </Badge>
                    {answers[currentQuestion.id] === currentQuestion.correct ? (
                      <span className="flex items-center gap-1 text-xs text-green-700 font-medium">
                        <CheckCircle2 size={13} /> Correct
                      </span>
                    ) : answers[currentQuestion.id] !== undefined ? (
                      <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                        <XCircle size={13} /> Incorrect
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <AlertTriangle size={13} /> Not Answered
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-medium leading-relaxed mb-6 whitespace-pre-line">
                    {currentQuestion.question}
                  </p>

                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, idx) => {
                      const isUserAnswer = answers[currentQuestion.id] === idx;
                      const isCorrectAnswer = currentQuestion.correct === idx;
                      return (
                        <div
                          key={opt}
                          className={cn(
                            "w-full text-left px-4 py-3 rounded-xl border-2 text-sm",
                            isCorrectAnswer && "border-green-500 bg-green-50",
                            isUserAnswer &&
                              !isCorrectAnswer &&
                              "border-red-400 bg-red-50",
                            !isCorrectAnswer &&
                              !isUserAnswer &&
                              "border-border bg-background opacity-60",
                          )}
                        >
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={cn(
                                "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0",
                                isCorrectAnswer
                                  ? "bg-green-500 text-white"
                                  : isUserAnswer
                                    ? "bg-red-500 text-white"
                                    : "bg-muted text-muted-foreground",
                              )}
                            >
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span
                              className={
                                isCorrectAnswer
                                  ? "text-green-800 font-medium"
                                  : isUserAnswer
                                    ? "text-red-700"
                                    : ""
                              }
                            >
                              {opt}
                            </span>
                            {isCorrectAnswer && (
                              <CheckCircle2
                                size={14}
                                className="ml-auto text-green-500"
                              />
                            )}
                            {isUserAnswer && !isCorrectAnswer && (
                              <XCircle
                                size={14}
                                className="ml-auto text-red-500"
                              />
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <p className="text-xs font-semibold text-blue-800 mb-1">
                      Explanation
                    </p>
                    <p className="text-sm text-blue-900 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-2">
            <Button
              data-ocid="mock_review.pagination_prev"
              variant="outline"
              size="sm"
              disabled={reviewIndex === 0}
              onClick={() => setReviewIndex((i) => i - 1)}
              className="gap-1"
            >
              <ChevronLeft size={15} /> Previous
            </Button>
            {reviewIndex < questions.length - 1 ? (
              <Button
                data-ocid="mock_review.pagination_next"
                size="sm"
                onClick={() => setReviewIndex((i) => i + 1)}
                className="gap-1"
                style={{ background: "oklch(var(--navy))", color: "white" }}
              >
                Next <ChevronRight size={15} />
              </Button>
            ) : (
              <Button
                data-ocid="mock_review.secondary_button"
                size="sm"
                variant="outline"
                onClick={() => setPhase("results")}
              >
                Back to Results
              </Button>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
