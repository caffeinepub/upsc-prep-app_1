import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Question } from "@/data/questionBank";
import { loadAllResults } from "@/lib/mockTestStorage";
import type { TestResult } from "@/lib/mockTestStorage";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  SortAsc,
  TrendingUp,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(ts: number): string {
  return new Date(ts).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type SortMode = "latest" | "highest";
type FilterMode = "all" | "mock" | "pyq";

function AccuracyBadge({ accuracy }: { accuracy: number }) {
  if (accuracy >= 70)
    return (
      <Badge className="text-xs bg-emerald-100 text-emerald-700 border-0">
        {accuracy}%
      </Badge>
    );
  if (accuracy >= 50)
    return (
      <Badge className="text-xs bg-amber-100 text-amber-700 border-0">
        {accuracy}%
      </Badge>
    );
  return (
    <Badge className="text-xs bg-red-100 text-red-700 border-0">
      {accuracy}%
    </Badge>
  );
}

function TestTypeBadge({ type }: { type?: string }) {
  if (type === "pyq")
    return (
      <Badge className="text-xs bg-amber-100 text-amber-800 border-0">
        PYQ
      </Badge>
    );
  return (
    <Badge className="text-xs bg-blue-100 text-blue-800 border-0">Mock</Badge>
  );
}

function AnalyticsSection({ results }: { results: TestResult[] }) {
  const bestScore = results.length
    ? Math.max(...results.map((r) => r.score))
    : 0;
  const avgScore = results.length
    ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length)
    : 0;
  const last5 = [...results]
    .sort((a, b) => b.completedAt - a.completedAt)
    .slice(0, 5)
    .reverse();

  const barColor = (score: number) => {
    if (score >= 72) return "#10b981";
    if (score >= 48) return "#f59e0b";
    return "#ef4444";
  };

  const maxBar = 120;

  return (
    <motion.div
      data-ocid="analytics.section"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6"
    >
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Trophy
              size={18}
              className="mx-auto mb-1.5"
              style={{ color: "oklch(var(--navy))" }}
            />
            <p className="text-xs text-muted-foreground mb-0.5">Best Score</p>
            <p
              className="text-xl font-bold"
              style={{ color: "oklch(var(--navy))" }}
            >
              {bestScore}
              <span className="text-sm font-normal text-muted-foreground">
                /120
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <TrendingUp size={18} className="mx-auto mb-1.5 text-amber-500" />
            <p className="text-xs text-muted-foreground mb-0.5">Average</p>
            <p className="text-xl font-bold text-amber-600">
              {avgScore}
              <span className="text-sm font-normal text-muted-foreground">
                /120
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <BookOpen size={18} className="mx-auto mb-1.5 text-violet-500" />
            <p className="text-xs text-muted-foreground mb-0.5">Tests Taken</p>
            <p className="text-xl font-bold text-violet-600">
              {results.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Improvement trend */}
      {last5.length >= 2 && (
        <Card className="shadow-card">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-3">
              Score Trend (Last 5 Tests)
            </p>
            <div className="flex items-end gap-2 h-20">
              {last5.map((r, i) => (
                <div
                  key={r.attemptId ?? `${r.testId}-${i}`}
                  className="flex flex-col items-center flex-1 gap-1"
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: barColor(r.score) }}
                  >
                    {r.score}
                  </span>
                  <div
                    className="w-full rounded-t-md transition-all"
                    style={{
                      height: `${Math.round((r.score / maxBar) * 56)}px`,
                      background: barColor(r.score),
                      minHeight: "4px",
                    }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    T{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}

const SUBJECT_CONFIG = [
  { key: "Legal Aptitude", label: "Legal Aptitude", total: 60 },
  { key: "General Knowledge", label: "GK & Current Affairs", total: 30 },
  { key: "GK & Current Affairs", label: "GK & Current Affairs", total: 30 },
  { key: "Mental Ability", label: "Mental Ability", total: 30 },
];

function InsightSection({ results }: { results: TestResult[] }) {
  const seen = new Set<string>();
  const uniqueSubjects = SUBJECT_CONFIG.filter((s) => {
    if (seen.has(s.label)) return false;
    seen.add(s.label);
    return true;
  });

  const insights = uniqueSubjects.map(({ key, label, total }) => {
    const accs = results
      .map((r) => {
        const s = r.bySubject?.[key];
        if (!s) return null;
        return Math.round((s.correct / total) * 100);
      })
      .filter((v): v is number => v !== null);
    const avg = accs.length
      ? Math.round(accs.reduce((a, b) => a + b, 0) / accs.length)
      : 0;
    return { label, avg };
  });

  return (
    <Card className="shadow-card mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Subject Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
          {insights.map(({ label, avg }) => (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium">{label}</span>
                <span
                  className={
                    avg >= 70
                      ? "text-emerald-600 font-bold"
                      : avg >= 50
                        ? "text-amber-600 font-bold"
                        : "text-red-600 font-bold"
                  }
                >
                  {avg}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={
                    avg >= 70
                      ? "h-full bg-emerald-500 rounded-full"
                      : avg >= 50
                        ? "h-full bg-amber-400 rounded-full"
                        : "h-full bg-red-500 rounded-full"
                  }
                  style={{ width: `${avg}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface DetailViewProps {
  result: TestResult;
  onBack: () => void;
}

function DetailView({ result, onBack }: DetailViewProps) {
  const [qIdx, setQIdx] = useState(0);
  const questions = result.questions as Question[] | undefined;
  const rawAnswers = result.answers ?? {};
  // PYQ stores answers by array index; Mock stores by question id
  const isPyq = result.testType === "pyq";
  const getAnswerFor = (q: Question, i: number): number | undefined => {
    const val = isPyq ? rawAnswers[i] : rawAnswers[q.id];
    return val !== undefined ? val : undefined;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
      className="h-full"
      data-ocid="history.detail_view"
    >
      <div className="flex items-center gap-3 mb-5">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onBack}
          data-ocid="history.back_button"
        >
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h2 className="text-base font-bold text-foreground">
            {result.testName ?? `Test #${result.testId}`}
          </h2>
          <p className="text-xs text-muted-foreground">
            {formatDateTime(result.completedAt)}
          </p>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-navy/5 rounded-xl p-3 text-center">
          <p
            className="text-lg font-bold"
            style={{ color: "oklch(var(--navy))" }}
          >
            {result.score}/{result.total}
          </p>
          <p className="text-xs text-muted-foreground">Score</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-emerald-600">
            {result.accuracy}%
          </p>
          <p className="text-xs text-muted-foreground">Accuracy</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-purple-600">
            {formatTime(result.timeTaken)}
          </p>
          <p className="text-xs text-muted-foreground">Time</p>
        </div>
      </div>

      {/* Subject breakdown */}
      {result.bySubject && (
        <Card className="mb-4 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-semibold mb-3">Subject Breakdown</p>
            {Object.entries(result.bySubject).map(([subj, stat]) => (
              <div key={subj} className="mb-2">
                <div className="flex justify-between text-xs mb-0.5">
                  <span>{subj}</span>
                  <span className="text-muted-foreground">
                    {stat.correct}/{stat.total}
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[oklch(var(--navy))] rounded-full"
                    style={{
                      width: `${
                        stat.total > 0
                          ? Math.round((stat.correct / stat.total) * 100)
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Question review */}
      {questions && questions.length > 0 ? (
        <>
          <div className="flex gap-1 flex-wrap mb-4">
            {questions.map((q, i) => {
              const userAns = getAnswerFor(q, i);
              const isCorrect = userAns === q.correct;
              const isAnswered = userAns !== undefined;
              return (
                <button
                  type="button"
                  key={q.id}
                  onClick={() => setQIdx(i)}
                  className={[
                    "w-8 h-8 rounded text-xs font-semibold",
                    i === qIdx ? "ring-2 ring-[oklch(var(--navy))]" : "",
                    isAnswered && isCorrect ? "bg-green-500 text-white" : "",
                    isAnswered && !isCorrect ? "bg-red-500 text-white" : "",
                    !isAnswered ? "bg-muted text-muted-foreground" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  data-ocid={`history.q_palette.${i + 1}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={qIdx}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.15 }}
            >
              <Card className="shadow-sm" data-ocid="history.question_card">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold text-muted-foreground mb-3">
                    Q{qIdx + 1} of {questions.length}
                  </p>
                  <p className="text-sm font-medium leading-relaxed mb-4 whitespace-pre-line">
                    {questions[qIdx].question}
                  </p>
                  <div className="space-y-2">
                    {questions[qIdx].options.map((opt, oi) => {
                      const isCorrectAns = questions[qIdx].correct === oi;
                      const isUserAns =
                        getAnswerFor(questions[qIdx], qIdx) === oi;
                      return (
                        <div
                          key={opt}
                          className={[
                            "px-4 py-2.5 rounded-lg border text-sm flex items-center gap-2",
                            isCorrectAns
                              ? "border-green-400 bg-green-50 text-green-800"
                              : isUserAns
                                ? "border-red-400 bg-red-50 text-red-700"
                                : "border-border bg-background opacity-60",
                          ].join(" ")}
                        >
                          <span className="font-bold text-xs w-5">
                            {String.fromCharCode(65 + oi)}
                          </span>
                          {opt}
                          {isCorrectAns && (
                            <CheckCircle2
                              size={13}
                              className="ml-auto text-green-600"
                            />
                          )}
                          {isUserAns && !isCorrectAns && (
                            <XCircle
                              size={13}
                              className="ml-auto text-red-500"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {questions[qIdx].explanation && (
                    <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-xs font-semibold text-blue-800 mb-1">
                        Explanation
                      </p>
                      <p className="text-xs text-blue-900 leading-relaxed">
                        {questions[qIdx].explanation}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={qIdx === 0}
                      onClick={() => setQIdx((i) => i - 1)}
                      className="gap-1"
                    >
                      <ChevronLeft size={14} /> Prev
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={qIdx === questions.length - 1}
                      onClick={() => setQIdx((i) => i + 1)}
                      className="gap-1"
                    >
                      Next <ChevronRight size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-6">
          No question data stored for this attempt. Questions will appear here
          for future tests.
        </p>
      )}
    </motion.div>
  );
}

export function MockTestHistoryPage() {
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);

  const allResults = loadAllResults();

  const filteredResults = allResults.filter((r) => {
    if (filterMode === "mock") return r.testType === "mock" || !r.testType;
    if (filterMode === "pyq") return r.testType === "pyq";
    return true;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortMode === "latest") return b.completedAt - a.completedAt;
    return b.score - a.score;
  });

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6">
      <AnimatePresence mode="wait">
        {selectedResult ? (
          <DetailView
            key="detail"
            result={selectedResult}
            onBack={() => setSelectedResult(null)}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Test History
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {allResults.length} test{allResults.length !== 1 ? "s" : ""}{" "}
                  recorded
                </p>
              </div>
            </div>

            {allResults.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen size={36} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No tests completed yet</p>
                <p className="text-xs mt-1">
                  Complete a Mock Test or PYQ Test to see your history here.
                </p>
              </div>
            ) : (
              <>
                <AnalyticsSection results={sortedResults} />
                <InsightSection results={sortedResults} />

                {/* Controls */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {/* Filter tabs */}
                  <div className="flex rounded-lg border overflow-hidden">
                    {(["all", "mock", "pyq"] as FilterMode[]).map((m) => (
                      <button
                        type="button"
                        key={m}
                        onClick={() => setFilterMode(m)}
                        className={[
                          "px-3 py-1.5 text-xs font-medium transition-colors",
                          filterMode === m
                            ? "bg-[oklch(var(--navy))] text-white"
                            : "bg-background text-muted-foreground hover:bg-muted",
                        ].join(" ")}
                      >
                        {m === "all" ? "All" : m === "mock" ? "Mock" : "PYQ"}
                      </button>
                    ))}
                  </div>

                  {/* Sort */}
                  <button
                    type="button"
                    onClick={() =>
                      setSortMode((m) =>
                        m === "latest" ? "highest" : "latest",
                      )
                    }
                    className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:bg-muted transition-colors"
                  >
                    <SortAsc size={13} />
                    {sortMode === "latest" ? "Latest" : "Highest Score"}
                  </button>
                </div>

                {/* Results list */}
                <div className="space-y-3">
                  {sortedResults.map((result) => (
                    <motion.button
                      type="button"
                      key={
                        result.attemptId ??
                        `${result.testId}-${result.completedAt}`
                      }
                      data-ocid="history.test_card"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full text-left"
                      onClick={() => setSelectedResult(result)}
                    >
                      <Card className="shadow-card hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <TestTypeBadge type={result.testType} />
                                <span className="text-sm font-semibold text-foreground truncate">
                                  {result.testName ??
                                    `Mock Test ${result.testId}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                                <span className="flex items-center gap-1">
                                  <CalendarDays size={11} />
                                  {formatDate(result.completedAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock size={11} />
                                  {formatTime(result.timeTaken)}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                              <span
                                className="text-lg font-bold"
                                style={{ color: "oklch(var(--navy))" }}
                              >
                                {result.score}
                                <span className="text-xs font-normal text-muted-foreground">
                                  /{result.total}
                                </span>
                              </span>
                              <AccuracyBadge accuracy={result.accuracy} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
