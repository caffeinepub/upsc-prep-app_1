import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Globe,
  MapPin,
  Pencil,
  RefreshCw,
  Scale,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { DailyReviewQuiz, loadMistakes } from "./DailyReviewQuiz";
import { PracticeQuiz } from "./PracticeQuiz";

const LAWCET_SECTIONS = [
  {
    id: "legal",
    title: "Legal Aptitude",
    icon: Scale,
    color: "oklch(0.85 0.06 243)",
    questions: 25,
    description: "Constitutional law, torts, contracts, and legal reasoning",
    topics: ["Contract Law", "Constitutional Law", "Torts", "Legal Reasoning"],
  },
  {
    id: "gk",
    title: "GK & Current Affairs",
    icon: Globe,
    color: "oklch(0.88 0.07 155)",
    questions: 20,
    description: "National events, state news, and general awareness",
    topics: ["National Affairs", "Telangana GK", "Science & Tech", "Sports"],
  },
  {
    id: "mental",
    title: "Mental Ability",
    icon: Brain,
    color: "oklch(0.87 0.05 300)",
    questions: 15,
    description:
      "Logical reasoning, data interpretation, and analytical thinking",
    topics: [
      "Logical Reasoning",
      "Verbal Ability",
      "Data Sufficiency",
      "Analogies",
    ],
  },
];

const UPSC_SUBJECTS = [
  {
    id: "polity" as const,
    title: "Polity",
    icon: BookOpen,
    color: "oklch(0.90 0.06 50)",
    description: "Constitutional framework, governance, and political theory",
    tags: ["Constitution", "Governance", "Federalism", "Rights"],
  },
  {
    id: "history" as const,
    title: "History",
    icon: Clock,
    color: "oklch(0.88 0.06 30)",
    description:
      "Freedom struggle, medieval and ancient India, colonial economy",
    tags: ["Modern India", "Medieval", "Ancient", "Economy"],
  },
  {
    id: "geography" as const,
    title: "Geography",
    icon: MapPin,
    color: "oklch(0.88 0.07 155)",
    description:
      "Physical, human, and economic geography of India and the world",
    tags: ["Monsoon", "Soils", "Rivers", "Climate"],
  },
];

function StatusBadge({ percent }: { percent: number }) {
  if (percent >= 80) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
        <CheckCircle2 size={11} /> On Track
      </span>
    );
  }
  if (percent >= 50) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
        In Progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
      Getting Started
    </span>
  );
}

function DailyProgressBanner() {
  const {
    dailyTarget,
    completedToday,
    remaining,
    percentComplete,
    setDailyTarget,
  } = useDailyProgress();
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function startEdit() {
    setInputVal(String(dailyTarget));
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  }

  function commitEdit() {
    const n = Number.parseInt(inputVal, 10);
    if (!Number.isNaN(n) && n > 0) setDailyTarget(n);
    setEditing(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6"
      data-ocid="daily_progress.card"
    >
      <div className="bg-white rounded-2xl border border-border shadow-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left — stats */}
          <div className="flex flex-wrap gap-6">
            {/* Daily Target */}
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Daily Target
              </p>
              <div className="flex items-center gap-1.5">
                {editing ? (
                  <input
                    ref={inputRef}
                    data-ocid="daily_progress.input"
                    type="number"
                    min="1"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitEdit();
                      if (e.key === "Escape") setEditing(false);
                    }}
                    className="w-16 text-lg font-bold text-foreground border-b-2 border-primary outline-none bg-transparent"
                  />
                ) : (
                  <>
                    <span className="text-xl font-bold text-foreground">
                      {dailyTarget}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      questions
                    </span>
                    <button
                      type="button"
                      onClick={startEdit}
                      data-ocid="daily_progress.edit_button"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Completed */}
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Completed Today
              </p>
              <span className="text-xl font-bold text-foreground">
                {completedToday}
              </span>
            </div>

            {/* Remaining */}
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Remaining</p>
              <span className="text-xl font-bold text-foreground">
                {remaining}
              </span>
            </div>
          </div>

          {/* Right — badge */}
          <div className="shrink-0">
            <StatusBadge percent={percentComplete} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Progress</span>
            <span>{percentComplete}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "oklch(var(--navy))" }}
              animate={{ width: `${percentComplete}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function DailyPracticePage() {
  const [activeQuiz, setActiveQuiz] = useState<
    "polity" | "history" | "geography" | "daily_review" | null
  >(null);

  const mistakeCount = loadMistakes().length;

  if (activeQuiz === "daily_review") {
    return <DailyReviewQuiz onClose={() => setActiveQuiz(null)} />;
  }

  if (activeQuiz) {
    return (
      <PracticeQuiz subject={activeQuiz} onClose={() => setActiveQuiz(null)} />
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
          Daily Practice
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sharpen your skills with targeted daily practice
        </p>
      </motion.div>

      {/* Daily Progress Banner */}
      <DailyProgressBanner />

      {/* Daily Review Banner */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
        className="mb-8"
      >
        <div
          className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
          style={{ background: "oklch(var(--navy))" }}
          data-ocid="daily_review.card"
        >
          <div className="flex items-start gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "oklch(1 0 0 / 0.12)" }}
            >
              <RefreshCw size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white mb-0.5">
                Daily Review
              </h2>
              {mistakeCount > 0 ? (
                <>
                  <p className="text-sm text-white/90">
                    {mistakeCount} question{mistakeCount !== 1 ? "s" : ""} from
                    your weak areas
                  </p>
                  <p className="text-xs text-white/60 mt-0.5">
                    {mistakeCount} question{mistakeCount !== 1 ? "s" : ""}{" "}
                    tracked · refreshes daily
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-white/90">
                    No mistakes yet — keep practicing!
                  </p>
                  <p className="text-xs text-white/60 mt-0.5">
                    Wrong answers will appear here for review
                  </p>
                </>
              )}
            </div>
          </div>
          <Button
            onClick={() => setActiveQuiz("daily_review")}
            data-ocid="daily_review.primary_button"
            className="shrink-0 font-semibold rounded-xl px-6"
            style={{ background: "white", color: "oklch(var(--navy))" }}
          >
            {mistakeCount > 0 ? "Start Review" : "Preview"}
          </Button>
        </div>
      </motion.div>

      {/* TS LAWCET Section */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4"
      >
        TS LAWCET
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {LAWCET_SECTIONS.map((section, i) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 + 0.12, duration: 0.35 }}
          >
            <Card
              data-ocid={`daily_practice.${section.id}.card`}
              className="shadow-card h-full"
            >
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: section.color }}
                >
                  <section.icon
                    size={22}
                    style={{ color: "oklch(var(--navy))" }}
                  />
                </div>
                <CardTitle className="text-base">{section.title}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {section.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-foreground mb-2">
                    Today's Topics
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {section.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: section.color,
                          color: "oklch(var(--navy))",
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground">
                    Today's questions
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {section.questions}
                  </span>
                </div>
                <Button
                  data-ocid={`daily_practice.${section.id}.primary_button`}
                  className="w-full h-8 text-xs rounded-lg"
                  style={{ background: "oklch(var(--navy))", color: "white" }}
                >
                  Practice Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* UPSC Section */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4"
      >
        UPSC Practice — 10 Questions per Session
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {UPSC_SUBJECTS.map((subject, i) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 + i * 0.08, duration: 0.35 }}
          >
            <Card
              data-ocid={`upsc_practice.${subject.id}.card`}
              className="shadow-card h-full"
            >
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: subject.color }}
                >
                  <subject.icon
                    size={22}
                    style={{ color: "oklch(var(--navy))" }}
                  />
                </div>
                <CardTitle className="text-base">{subject.title}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {subject.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-foreground mb-2">
                    Topics Covered
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {subject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: subject.color,
                          color: "oklch(var(--navy))",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground">
                    Questions per session
                  </span>
                  <span className="text-sm font-bold text-foreground">10</span>
                </div>
                <Button
                  data-ocid={`upsc_practice.${subject.id}.primary_button`}
                  onClick={() => setActiveQuiz(subject.id)}
                  className="w-full h-8 text-xs rounded-lg"
                  style={{ background: "oklch(var(--navy))", color: "white" }}
                >
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
