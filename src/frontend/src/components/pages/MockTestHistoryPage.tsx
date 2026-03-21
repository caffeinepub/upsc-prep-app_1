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

type SortMode = "latest" | "highest";

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

function AnalyticsSection({ results }: { results: TestResult[] }) {
  const bestScore = Math.max(...results.map((r) => r.score));
  const avgScore = Math.round(
    results.reduce((s, r) => s + r.score, 0) / results.length,
  );
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
              Improvement Trend (Last 5 Tests)
            </p>
            <div className="flex items-end gap-2 h-20">
              {last5.map((r, i) => (
                <div
                  key={r.attemptId ?? r.testId}
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
            <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" />{" "}
                ≥60% (Pass)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-amber-400 inline-block" />{" "}
                40–59%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-red-400 inline-block" />{" "}
                &lt;40%
              </span>
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
  { key: "Mental Ability", label: "Mental Ability", total: 30 },
];

function InsightSection({ results }: { results: TestResult[] }) {
  const insights = SUBJECT_CONFIG.map(({ key, label, total }) => {
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
    let chip = {
      label: `${label} is improving`,
      cls: "bg-amber-100 text-amber-700",
    };
    if (avg >= 70)
      chip = {
        label: `Your ${label} is strong ✓`,
        cls: "bg-emerald-100 text-emerald-700",
      };
    else if (avg < 50)
      chip = {
        label: `${label} needs improvement`,
        cls: "bg-red-100 text-red-700",
      };
    return { label, avg, chip };
  });

  return (
    <motion.div
      data-ocid="analytics.insights.section"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="mb-6"
    >
      <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <TrendingUp size={15} style={{ color: "oklch(var(--navy))" }} />
        Performance Insights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {insights.map(({ label, avg, chip }) => (
          <Card key={label} className="shadow-card">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-foreground mb-2">
                {label}
              </p>
              <p
                className="text-2xl font-bold mb-2"
                style={{ color: "oklch(var(--navy))" }}
              >
                {avg}%
              </p>
              <span
                className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${chip.cls}`}
              >
                {chip.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}

function SubjectBreakdown({ result }: { result: TestResult }) {
  return (
    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
      {SUBJECT_CONFIG.map(({ key, total }) => {
        const s = result.bySubject?.[key];
        const shortLabel =
          key === "Legal Aptitude"
            ? "Legal"
            : key === "General Knowledge"
              ? "GK"
              : "Mental";
        return (
          <span key={key} className="text-[11px] text-muted-foreground">
            {shortLabel}: {s ? s.correct : "–"}/{total}
          </span>
        );
      })}
    </div>
  );
}

function HistoryList({
  onViewDetail,
}: {
  onViewDetail: (result: TestResult) => void;
}) {
  const [sort, setSort] = useState<SortMode>("latest");
  const all = loadAllResults();
  const sorted =
    sort === "latest"
      ? [...all].sort((a, b) => b.completedAt - a.completedAt)
      : [...all].sort((a, b) => b.accuracy - a.accuracy);

  // Assign human-readable test number by chronological order
  const chronological = [...all].sort((a, b) => a.completedAt - b.completedAt);
  const testNumbers = new Map<string, number>();
  chronological.forEach((r, i) => {
    testNumbers.set(r.attemptId ?? String(r.testId), i + 1);
  });
  const getTestNum = (r: TestResult) =>
    testNumbers.get(r.attemptId ?? String(r.testId)) ?? r.testId;

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Test History
          </h1>
          <p className="text-sm text-muted-foreground">
            Review your past mock test performances
          </p>
        </div>

        <div
          data-ocid="history.filter.tab"
          className="flex items-center gap-1 p-1 rounded-xl border border-border bg-muted"
        >
          <button
            type="button"
            data-ocid="history.sort.latest.toggle"
            onClick={() => setSort("latest")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              sort === "latest"
                ? "text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={
              sort === "latest"
                ? { background: "oklch(var(--navy))" }
                : undefined
            }
          >
            <CalendarDays size={12} />
            Latest
          </button>
          <button
            type="button"
            data-ocid="history.sort.score.toggle"
            onClick={() => setSort("highest")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              sort === "highest"
                ? "text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={
              sort === "highest"
                ? { background: "oklch(var(--navy))" }
                : undefined
            }
          >
            <SortAsc size={12} />
            Highest Score
          </button>
        </div>
      </motion.div>

      {all.length >= 1 && <AnalyticsSection results={all} />}
      {all.length >= 2 && <InsightSection results={all} />}

      {sorted.length === 0 ? (
        <motion.div
          data-ocid="history.empty_state"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          <Card className="shadow-card">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-3">
              <BookOpen
                size={40}
                className="text-muted-foreground opacity-40"
              />
              <p className="font-semibold text-foreground">
                No tests completed yet
              </p>
              <p className="text-sm text-muted-foreground">
                Go take a mock test to see your history here!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-4">
          {sorted.map((result, i) => (
            <motion.div
              key={result.attemptId ?? result.testId}
              data-ocid={`history.item.${i + 1}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Card className="shadow-card hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-foreground truncate">
                          Mock Test {getTestNum(result)}
                        </h3>
                        <AccuracyBadge accuracy={result.accuracy} />
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={11} />
                          {formatDate(result.completedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy size={11} />
                          {result.score}/{result.total}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {formatTime(result.timeTaken)}
                        </span>
                      </div>
                      <SubjectBreakdown result={result} />
                    </div>
                    <Button
                      data-ocid={`history.item.${i + 1}.primary_button`}
                      size="sm"
                      className="h-8 text-xs rounded-lg flex-shrink-0"
                      style={{
                        background: "oklch(var(--navy))",
                        color: "white",
                      }}
                      onClick={() => onViewDetail(result)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function QuestionDetailView({
  result,
  onBack,
}: {
  result: TestResult;
  onBack: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const questions: Question[] = result.questions ?? [];
  const answers = result.answers ?? {};
  const hasQuestions = questions.length > 0;

  const getQuestionStatus = (q: Question) => {
    if (answers[q.id] === undefined) return "unanswered";
    return answers[q.id] === q.correct ? "correct" : "wrong";
  };

  const currentQuestion = hasQuestions ? questions[currentIndex] : null;

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 mb-6"
      >
        <Button
          data-ocid="history.detail.back.button"
          variant="ghost"
          size="sm"
          className="gap-1.5 text-sm -ml-2"
          onClick={onBack}
        >
          <ArrowLeft size={15} />
          Back to History
        </Button>
      </motion.div>

      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="mb-4"
      >
        <Card
          className="shadow-card"
          style={{ background: "oklch(var(--navy))" }}
        >
          <CardContent className="p-5">
            <h2 className="text-white font-bold text-lg mb-4">
              LAWCET Mock Test — {formatDate(result.completedAt)}
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Score</p>
                <p className="text-white font-bold text-xl">
                  {result.score}/{result.total}
                </p>
              </div>
              <div className="text-center border-x border-white/20">
                <p className="text-white/60 text-xs mb-1">Accuracy</p>
                <p className="text-white font-bold text-xl">
                  {result.accuracy}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Time Taken</p>
                <p className="text-white font-bold text-xl">
                  {formatTime(result.timeTaken)}
                </p>
              </div>
            </div>
            {/* Subject breakdown */}
            {result.bySubject && (
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/20">
                {SUBJECT_CONFIG.map(({ key, label, total }) => {
                  const s = result.bySubject?.[key];
                  const acc = s ? Math.round((s.correct / total) * 100) : 0;
                  return (
                    <div key={key} className="text-center">
                      <p className="text-white/50 text-[10px] mb-0.5 truncate">
                        {label}
                      </p>
                      <p className="text-white font-semibold text-sm">
                        {s ? s.correct : 0}/{total}
                      </p>
                      <p className="text-white/70 text-[10px]">{acc}%</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {!hasQuestions ? (
        <motion.div
          data-ocid="history.detail.error_state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="shadow-card">
            <CardContent className="flex flex-col items-center justify-center py-14 text-center gap-3">
              <BookOpen
                size={36}
                className="text-muted-foreground opacity-40"
              />
              <p className="font-semibold text-foreground">
                Detailed review not available for this test
              </p>
              <p className="text-sm text-muted-foreground max-w-md">
                Complete a new test to enable detailed history with question
                review.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Question number grid */}
          <Card className="shadow-card mb-4">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground mb-3">
                Question Overview
              </p>
              <div className="flex flex-wrap gap-1.5">
                {questions.map((q, idx) => {
                  const status = getQuestionStatus(q);
                  let cls =
                    "w-7 h-7 rounded-md text-xs font-semibold flex items-center justify-center cursor-pointer transition-all ";
                  if (status === "correct")
                    cls +=
                      idx === currentIndex
                        ? "bg-emerald-600 text-white ring-2 ring-emerald-400"
                        : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
                  else if (status === "wrong")
                    cls +=
                      idx === currentIndex
                        ? "bg-red-600 text-white ring-2 ring-red-400"
                        : "bg-red-100 text-red-700 hover:bg-red-200";
                  else
                    cls +=
                      idx === currentIndex
                        ? "bg-slate-500 text-white ring-2 ring-slate-400"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200";

                  return (
                    <button
                      type="button"
                      key={q.id}
                      className={cls}
                      onClick={() => setCurrentIndex(idx)}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-emerald-100 inline-block" />
                  Correct
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-red-100 inline-block" />
                  Wrong
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-slate-100 inline-block" />
                  Unanswered
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Question Card */}
          {currentQuestion && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <Card data-ocid="history.detail.card" className="shadow-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            borderColor: "oklch(var(--navy))",
                            color: "oklch(var(--navy))",
                          }}
                        >
                          {currentQuestion.subject}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Q{currentIndex + 1} of {questions.length}
                        </span>
                      </div>
                      {(() => {
                        const status = getQuestionStatus(currentQuestion);
                        if (status === "correct")
                          return (
                            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                              <CheckCircle2 size={14} /> Correct
                            </span>
                          );
                        if (status === "wrong")
                          return (
                            <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
                              <XCircle size={14} /> Incorrect
                            </span>
                          );
                        return (
                          <span className="text-xs font-semibold text-slate-500">
                            Not Answered
                          </span>
                        );
                      })()}
                    </div>
                    <CardTitle className="text-sm font-medium leading-relaxed mt-2">
                      {currentQuestion.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-col gap-2">
                    {currentQuestion.options.map((opt, idx) => {
                      const isCorrect = currentQuestion.correct === idx;
                      const isUserAnswer = answers[currentQuestion.id] === idx;
                      const isWrongUserAnswer = isUserAnswer && !isCorrect;

                      let cls =
                        "flex items-center gap-3 p-3 rounded-xl border text-sm transition-all ";
                      if (isCorrect)
                        cls +=
                          "bg-emerald-50 border-emerald-400 text-emerald-800 font-medium";
                      else if (isWrongUserAnswer)
                        cls += "bg-red-50 border-red-400 text-red-800";
                      else
                        cls +=
                          "bg-muted/30 border-border/50 text-muted-foreground";

                      return (
                        <div key={opt.slice(0, 20)} className={cls}>
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              isCorrect
                                ? "bg-emerald-600 text-white"
                                : isWrongUserAnswer
                                  ? "bg-red-600 text-white"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {opt}
                          {isCorrect && (
                            <CheckCircle2
                              size={14}
                              className="ml-auto text-emerald-600 flex-shrink-0"
                            />
                          )}
                          {isWrongUserAnswer && (
                            <XCircle
                              size={14}
                              className="ml-auto text-red-500 flex-shrink-0"
                            />
                          )}
                        </div>
                      );
                    })}

                    {/* Explanation */}
                    {currentQuestion.explanation && (
                      <div className="mt-3 p-3 rounded-xl border border-blue-200 bg-blue-50">
                        <p className="text-xs font-semibold text-blue-700 mb-1">
                          Explanation
                        </p>
                        <p className="text-xs text-blue-800 leading-relaxed">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <Button
              data-ocid="history.detail.pagination_prev"
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => p - 1)}
            >
              <ChevronLeft size={14} /> Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} / {questions.length}
            </span>
            <Button
              data-ocid="history.detail.pagination_next"
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((p) => p + 1)}
            >
              Next <ChevronRight size={14} />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function MockTestHistoryPage() {
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);

  if (selectedResult) {
    return (
      <QuestionDetailView
        result={selectedResult}
        onBack={() => setSelectedResult(null)}
      />
    );
  }

  return <HistoryList onViewDetail={setSelectedResult} />;
}
