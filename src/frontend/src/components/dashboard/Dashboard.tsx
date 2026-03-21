import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import { BarChart2, TrendingUp } from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import type { ActivePage } from "../../App";
import { Subject } from "../../backend.d";
import type { SubjectProgress } from "../../backend.d";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  useDailyTargets,
  useStudyProgress,
  useToggleTarget,
  useUserProfile,
} from "../../hooks/useQueries";
import { DailyTargetCard } from "./DailyTargetCard";
import { IIStatusCard } from "./IIStatusCard";
import { ProgressCard } from "./ProgressCard";
import { QuickNav } from "./QuickNav";
import { SubjectCard } from "./SubjectCard";

const PREP_DAY = 142;

const LAWCET_SUBJECTS = [Subject.history, Subject.geography, Subject.polity];

const FALLBACK_PROGRESS: SubjectProgress[] = [
  { subject: Subject.history, completionPercentage: BigInt(65) },
  { subject: Subject.geography, completionPercentage: BigInt(48) },
  { subject: Subject.polity, completionPercentage: BigInt(72) },
];

const FALLBACK_TARGETS = [
  {
    id: BigInt(1),
    isCompleted: true,
    description: "Solve 20 Legal Aptitude MCQs",
  },
  {
    id: BigInt(2),
    isCompleted: true,
    description: "Read Constitution basics - Ch.3",
  },
  {
    id: BigInt(3),
    isCompleted: false,
    description: "Practice 15 Mental Ability questions",
  },
  {
    id: BigInt(4),
    isCompleted: false,
    description: "Revise GK Current Affairs - May 2025",
  },
  {
    id: BigInt(5),
    isCompleted: false,
    description: "Attempt 1 LAWCET mock test",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface DashboardProps {
  setActivePage: (page: ActivePage) => void;
}

export function Dashboard({ setActivePage }: DashboardProps) {
  const { identity } = useInternetIdentity();
  const { data: profile } = useUserProfile();
  const { data: progressData, isLoading: progressLoading } = useStudyProgress();
  const { data: targetsData, isLoading: targetsLoading } = useDailyTargets();
  const toggleTarget = useToggleTarget();
  const { dailyTarget, completedToday, percentComplete } = useDailyProgress();

  const displayName = profile?.displayName ?? "Rahul Sharma";
  const principal = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal = principal ? `${principal.slice(0, 10)}…` : "";

  const allSubjects =
    progressData && progressData.length > 0 ? progressData : FALLBACK_PROGRESS;
  const subjects = allSubjects.filter((s) =>
    LAWCET_SUBJECTS.includes(s.subject),
  );
  const targets =
    targetsData && targetsData.length > 0 ? targetsData : FALLBACK_TARGETS;

  const overallProgress = Math.round(
    subjects.reduce((sum, s) => sum + Number(s.completionPercentage), 0) /
      subjects.length,
  );

  const statCards = [
    {
      id: "today_target",
      label: "Today's Target",
      value: `${dailyTarget} Questions`,
      sub: `${percentComplete}% completed`,
      progress: percentComplete,
      showBar: true,
      color: "oklch(0.85 0.06 243)",
    },
    {
      id: "questions_today",
      label: "Questions Completed Today",
      value: String(completedToday),
      sub: `out of ${dailyTarget}`,
      progress: null,
      showBar: false,
      color: "oklch(0.88 0.07 155)",
    },
    {
      id: "mock_tests",
      label: "Mock Tests Completed",
      value: "3",
      sub: "this week",
      progress: null,
      showBar: false,
      color: "oklch(0.87 0.05 300)",
    },
    {
      id: "accuracy",
      label: "Accuracy %",
      value: "74%",
      sub: "+3% from last week",
      progress: null,
      showBar: false,
      trend: true,
      color: "oklch(0.88 0.07 75)",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 py-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-7"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome back, {displayName}!
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Day {PREP_DAY} of your LAWCET preparation journey
          {shortPrincipal ? (
            <span className="ml-2 font-mono text-xs opacity-60">
              {shortPrincipal}
            </span>
          ) : null}
        </p>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {statCards.map((card) => (
          <motion.div
            key={card.id}
            variants={itemVariants}
            data-ocid={`dashboard.${card.id}.card`}
            className="bg-white rounded-xl border border-border shadow-card p-4 flex flex-col gap-2"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
              style={{ background: card.color }}
            >
              <BarChart2 size={16} style={{ color: "oklch(var(--navy))" }} />
            </div>
            <p className="text-xs text-muted-foreground leading-tight">
              {card.label}
            </p>
            <div className="flex items-end gap-1.5">
              <p className="text-xl font-bold text-foreground">{card.value}</p>
              {card.trend && (
                <TrendingUp
                  size={14}
                  className="mb-0.5"
                  style={{ color: "oklch(var(--success-text))" }}
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground">{card.sub}</p>
            {card.showBar && card.progress !== null && (
              <Progress value={card.progress} className="h-1.5" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Two-column grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5"
      >
        {/* Left column */}
        <div className="flex flex-col gap-5">
          <motion.div variants={itemVariants}>
            {progressLoading ? (
              <Skeleton
                data-ocid="progress.loading_state"
                className="h-28 rounded-xl"
              />
            ) : (
              <ProgressCard overallProgress={overallProgress} />
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-xl border border-border shadow-card p-5">
              <h2 className="text-sm font-semibold text-foreground mb-4">
                Section Overview
              </h2>
              {progressLoading ? (
                <div
                  data-ocid="subjects.loading_state"
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {[1, 2, 3].map((n) => (
                    <Skeleton key={n} className="h-28 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {subjects.map((s, i) => (
                    <SubjectCard
                      key={String(s.subject)}
                      progress={s}
                      index={i + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <QuickNav setActivePage={setActivePage} />
          </motion.div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          <motion.div variants={itemVariants}>
            {targetsLoading ? (
              <Skeleton
                data-ocid="daily_target.loading_state"
                className="h-64 rounded-xl"
              />
            ) : (
              <DailyTargetCard
                targets={targets}
                onToggle={(id) => toggleTarget.mutate(id)}
              />
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <IIStatusCard />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
