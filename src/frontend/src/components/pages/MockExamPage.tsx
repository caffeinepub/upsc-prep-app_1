import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import {
  clearSession,
  completeAttempt,
  createOrResumeAttempt,
  generateAttemptId,
  loadSession,
  saveAttempt,
  saveResult,
  saveSession,
} from "@/lib/mockTestStorage";
import { recordActivity } from "@/lib/streakTracker";
import { cn } from "@/lib/utils";
import { saveWeakQuestion } from "@/lib/weakAreasStorage";
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
  ];
  // DO NOT shuffle the combined array — order must be Legal → GK → Mental
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
  onExamActiveChange?: (active: boolean) => void;
}

export function MockExamPage({
  testId,
  onExit,
  onExamActiveChange,
}: MockExamPageProps) {
  const { incrementCompleted } = useDailyProgress();
  const { user } = useAuth();
  const userId = user?.email ?? "guest";

  const [questions] = useState<Question[]>(() => {
    const session = loadSession(testId);
    if (session?.questionIds && session.questionIds.length > 0) {
      const byId = new Map(questionBank.map((q) => [q.id, q]));
      const restored = session.questionIds
        .map((id) => byId.get(id))
        .filter(Boolean) as Question[];
      if (restored.length > 0) return restored;
    }
    return selectQuestions();
  });

  // Initialize attempt (create or resume) — must happen after questions are known
  const attemptRef = useRef(
    createOrResumeAttempt(
      userId,
      testId,
      "Mock",
      90 * 60,
      questions.map((q) => q.id),
    ),
  );

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    // Prefer attempt's stored currentIndex, fall back to session
    const attempt = attemptRef.current;
    if (attempt.currentIndex !== undefined) return attempt.currentIndex;
    const session = loadSession(testId);
    return session?.currentIndex ?? 0;
  });
  const [reviewIndex, setReviewIndex] = useState(0);

  // Id-based answers (question.id → option index)
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    // Prefer attempt's answers if non-empty, fall back to session
    const attempt = attemptRef.current;
    if (Object.keys(attempt.answers).length > 0) return attempt.answers;
    const session = loadSession(testId);
    return session ? session.answers : {};
  });
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(() => {
    const attempt = attemptRef.current;
    if (attempt.markedForReview.length > 0)
      return new Set(attempt.markedForReview);
    const session = loadSession(testId);
    return session ? new Set(session.markedForReview) : new Set();
  });
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(() => {
    const attempt = attemptRef.current;
    return new Set(attempt.visitedQuestions);
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
    const session = loadSession(testId);
    if (session?.startedAt) {
      const elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
      return Math.max(0, 90 * 60 - elapsed);
    }
    return 90 * 60;
  });
  const [phase, setPhase] = useState<Phase>("exam");

  // Signal exam active state to parent
  useEffect(() => {
    onExamActiveChange?.(true);
    return () => onExamActiveChange?.(false);
  }, [onExamActiveChange]);

  useEffect(() => {
    if (phase === "results") onExamActiveChange?.(false);
  }, [phase, onExamActiveChange]);

  const startTimeRef = useRef<number>(
    (() => {
      const attempt = attemptRef.current;
      if (attempt.startTime) return attempt.startTime;
      const session = loadSession(testId);
      return session ? session.startedAt : Date.now();
    })(),
  );

  // Persist startTime immediately on mount so reload can use it
  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
  useEffect(() => {
    try {
      const existing = localStorage.getItem(`lawcet_session_${testId}`);
      const parsed = existing ? JSON.parse(existing) : {};
      if (!parsed.startedAt) {
        localStorage.setItem(
          `lawcet_session_${testId}`,
          JSON.stringify({ ...parsed, startedAt: startTimeRef.current }),
        );
      }
    } catch {}
  }, []);

  // Auto-save session on every state change
  useEffect(() => {
    if (phase !== "exam") return;
    saveSession({
      testId,
      questionIds: questions.map((q) => q.id),
      answers,
      markedForReview: Array.from(markedForReview),
      timeLeft,
      currentIndex,
      startedAt: startTimeRef.current,
      savedAt: Date.now(),
    });
    // Also sync attempt
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
    testId,
    questions,
    answers,
    markedForReview,
    visitedQuestions,
    timeLeft,
    currentIndex,
    phase,
  ]);

  // Additional 5-second periodic save for extra safety
  useEffect(() => {
    if (phase !== "exam") return;
    const interval = setInterval(() => {
      saveSession({
        testId,
        questionIds: questions.map((q) => q.id),
        answers,
        markedForReview: Array.from(markedForReview),
        timeLeft,
        currentIndex,
        startedAt: startTimeRef.current,
        savedAt: Date.now(),
      });
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
    testId,
    questions,
    answers,
    markedForReview,
    visitedQuestions,
    timeLeft,
    currentIndex,
  ]);

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
      testName: `LAWCET Mock Test ${testId}`,
      testType: "mock",
      score: results.correct,
      total: results.total,
      accuracy,
      timeTaken: elapsed,
      bySubject: results.bySubject,
      completedAt: Date.now(),
      questions,
      answers,
    });
    // Complete and persist the unified attempt
    const completed = completeAttempt(
      attemptRef.current,
      results.correct,
      accuracy,
    );
    attemptRef.current = completed;
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
      setVisitedQuestions((prev) => {
        if (prev.has(currentIndexRef.current)) return prev;
        const next = new Set(prev);
        next.add(currentIndexRef.current);
        return next;
      });
      // Instant save — do not wait for useEffect
      try {
        const existing = localStorage.getItem(`lawcet_session_${testId}`);
        if (existing) {
          const prev = JSON.parse(existing);
          localStorage.setItem(
            `lawcet_session_${testId}`,
            JSON.stringify({ ...prev, answers: idAnswers }),
          );
        }
      } catch {}
    },
    [questions, testId],
  );

  const handleMarkedChange = useCallback((markedArr: number[]) => {
    setMarkedForReview(new Set(markedArr));
  }, []);

  const handleTimeChange = useCallback((t: number) => {
    setTimeLeft(t);
  }, []);

  const currentIndexRef = useRef(0);

  const handleCurrentIndexChange = useCallback((idx: number) => {
    currentIndexRef.current = idx;
    setCurrentIndex(idx);
    setVisitedQuestions((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  }, []);

  const handleVisitedChange = useCallback((visited: number[]) => {
    setVisitedQuestions(new Set(visited));
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
      // Save wrong answers as weak questions
      for (const [idxStr, optIdx] of Object.entries(indexAnswers)) {
        const q = questions[Number(idxStr)];
        if (q && q.correct !== optIdx) {
          saveWeakQuestion({
            id: `mock_${testId}_${q.id}`,
            text: q.question,
            options: q.options,
            correct: q.correct,
            explanation: q.explanation,
            subject: q.subject,
            source: "mock",
            savedAt: Date.now(),
          });
        }
      }
      setPhase("results");
    },
    [questions, testId],
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
        initialCurrentIndex={currentIndex}
        onCurrentIndexChange={handleCurrentIndexChange}
        testName={`LAWCET Mock Test ${testId}`}
        questions={cbtQuestions}
        initialAnswers={indexBasedAnswers}
        initialMarked={Array.from(markedForReview)}
        initialTimeLeft={timeLeft}
        onAnswerChange={handleAnswerChange}
        onVisitedChange={handleVisitedChange}
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

            <div className="flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-300">
                <CheckCircle2 size={13} /> Test Completed
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                data-ocid="mock_results.primary_button"
                className="flex-1 gap-2"
                style={{ background: "oklch(var(--navy))", color: "white" }}
                onClick={() => {
                  const el = document.getElementById("mock-full-review");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <BookOpen size={15} /> View Full Review
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

            {/* ── Full Question Review ─────────────────────────────────────── */}
            <div id="mock-full-review">
              <h2
                className="text-base font-bold mb-4 flex items-center gap-2"
                style={{ color: "oklch(var(--navy))" }}
              >
                <BookOpen size={16} /> Full Question Review
                <span className="text-xs font-normal text-muted-foreground ml-1">
                  ({questions.length} questions)
                </span>
              </h2>
              <div className="space-y-5" data-ocid="mock_results.list">
                {questions.map((q, idx) => {
                  const userAns = answers[q.id];
                  const isCorrect = userAns === q.correct;
                  const isAnswered = userAns !== undefined;
                  return (
                    <Card
                      key={q.id}
                      className="shadow-sm overflow-hidden"
                      data-ocid={`mock_results.item.${idx + 1}`}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="text-xs font-bold text-muted-foreground">
                            Q{idx + 1}
                          </span>
                          <Badge
                            className={cn(
                              "text-xs font-medium border-0",
                              SUBJECT_COLOR[q.subject],
                            )}
                          >
                            {q.subject}
                          </Badge>
                          {isAnswered && isCorrect && (
                            <span className="flex items-center gap-1 text-xs text-green-700 font-semibold">
                              <CheckCircle2 size={12} /> Correct
                            </span>
                          )}
                          {isAnswered && !isCorrect && (
                            <span className="flex items-center gap-1 text-xs text-red-600 font-semibold">
                              <XCircle size={12} /> Incorrect
                            </span>
                          )}
                          {!isAnswered && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <AlertTriangle size={12} /> Not Answered
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
                              cls =
                                "bg-green-50 border-green-400 text-green-700";
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
                                  <CheckCircle2
                                    size={14}
                                    className="text-green-600 flex-shrink-0"
                                  />
                                )}
                                {isUserPick && !isCorrectOpt && (
                                  <XCircle
                                    size={14}
                                    className="text-red-600 flex-shrink-0"
                                  />
                                )}
                                {!isUserPick && isCorrectOpt && (
                                  <CheckCircle2
                                    size={14}
                                    className="text-green-500 flex-shrink-0"
                                  />
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

      <ScrollArea>
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
