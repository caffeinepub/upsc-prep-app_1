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

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start justify-between gap-4 mb-8"
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
              key={result.testId}
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
                          LAWCET Mock Test {result.testId}
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
        className="mb-6"
      >
        <Card
          className="shadow-card"
          style={{ background: "oklch(var(--navy))" }}
        >
          <CardContent className="p-5">
            <h2 className="text-white font-bold text-lg mb-4">
              LAWCET Mock Test {result.testId}
            </h2>
            <div className="grid grid-cols-3 gap-4">
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
