import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import { useSyllabusProgress } from "@/hooks/useSyllabusProgress";
import { loadAllResults } from "@/lib/mockTestStorage";
import { getStreak as getRealStreak } from "@/lib/streakTracker";
import {
  ClipboardCheck,
  Flame,
  Percent,
  Target,
  TrendingUp,
} from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import type { ActivePage } from "../../App";
import { useAuth } from "../../contexts/AuthContext";
import { useDailyTargets, useToggleTarget } from "../../hooks/useQueries";
import { DailyTargetCard } from "./DailyTargetCard";
import { ExamCountdownCard } from "./ExamCountdownCard";
import { IIStatusCard } from "./IIStatusCard";
import { ProgressCard } from "./ProgressCard";
import { QuickNav } from "./QuickNav";

function getPrepDay(): number {
  try {
    const stored = localStorage.getItem("tslawcet_signup_date");
    if (!stored) return 1;
    const signupDate = new Date(stored).getTime();
    const now = Date.now();
    return Math.max(1, Math.floor((now - signupDate) / 86400000) + 1);
  } catch {
    return 1;
  }
}

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

const SYLLABUS_SUBJECTS = [
  { id: "legal", label: "Legal Aptitude" },
  { id: "gk", label: "GK & Current Affairs" },
  { id: "mental", label: "Mental Ability" },
];

function getMockTestCount() {
  return loadAllResults().length;
}

function getAccuracy(): number | null {
  const results = loadAllResults();
  if (!results.length) return null;
  const totalQ = results.reduce((s, r) => s + r.total, 0);
  const totalCorrect = results.reduce((s, r) => s + r.score, 0);
  return totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : null;
}

function getStreak() {
  return getRealStreak();
}

interface DashboardProps {
  setActivePage: (page: ActivePage) => void;
}

export function Dashboard({ setActivePage }: DashboardProps) {
  const { user } = useAuth();
  const { data: targetsData, isLoading: targetsLoading } = useDailyTargets();
  const toggleTarget = useToggleTarget();
  const { dailyTarget, percentComplete } = useDailyProgress();
  const { sectionStats, overallStats, pendingTopics } = useSyllabusProgress();

  const displayName = user?.name ?? "Student";
  const prepDay = getPrepDay();

  const targets = targetsData && targetsData.length > 0 ? targetsData : [];

  const mockTestCount = getMockTestCount();
  const accuracy = getAccuracy();
  const streak = getStreak();

  const statCards = [
    {
      id: "today_target",
      label: "Today's Target",
      value: `${dailyTarget}`,
      unit: "questions",
      sub: `${percentComplete}% completed`,
      progress: percentComplete,
      showBar: true,
      icon: Target,
      bgColor: "#EEF6FF",
      iconColor: "#3B82F6",
    },
    {
      id: "progress",
      label: "Progress",
      value: `${overallStats.percent}%`,
      unit: "",
      sub: "Syllabus completion",
      progress: null,
      showBar: false,
      icon: TrendingUp,
      bgColor: "#F0FDF4",
      iconColor: "#22C55E",
    },
    {
      id: "accuracy",
      label: "Accuracy",
      value: accuracy !== null ? `${accuracy}%` : "—",
      unit: "",
      sub: accuracy !== null ? "Overall performance" : "Complete a mock test",
      progress: null,
      showBar: false,
      icon: Percent,
      bgColor: "#F5F3FF",
      iconColor: "#8B5CF6",
    },
    {
      id: "mock_tests",
      label: "Mock Tests Completed",
      value: String(mockTestCount),
      unit: "",
      sub: mockTestCount === 0 ? "None yet" : "Total completed",
      progress: null,
      showBar: false,
      icon: ClipboardCheck,
      bgColor: "#FFFBEB",
      iconColor: "#F59E0B",
    },
    {
      id: "streak",
      label: "Streak",
      value: streak > 0 ? `${streak}` : "—",
      unit: streak > 0 ? "days" : "",
      sub: streak > 0 ? "Keep it up! 🔥" : "Start practicing daily",
      progress: null,
      showBar: false,
      icon: Flame,
      bgColor: "#FFF1F2",
      iconColor: "#F43F5E",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 py-8">
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
          Day {prepDay} of your LAWCET preparation journey
        </p>
      </motion.div>

      {/* Exam Countdown Strip */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="mb-6"
      >
        <ExamCountdownCard compact />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6"
      >
        {statCards.map((card) => (
          <motion.div
            key={card.id}
            variants={itemVariants}
            data-ocid={`dashboard.${card.id}.card`}
            className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 flex flex-col gap-2"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: card.bgColor }}
            >
              <card.icon size={16} style={{ color: card.iconColor }} />
            </div>
            <p className="text-xs text-muted-foreground leading-tight">
              {card.label}
            </p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              {card.unit && (
                <span className="text-xs text-muted-foreground">
                  {card.unit}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{card.sub}</p>
            {card.showBar && card.progress !== null && (
              <Progress value={card.progress} className="h-1.5" />
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5"
      >
        <div className="flex flex-col gap-5">
          <motion.div variants={itemVariants}>
            <ProgressCard overallProgress={overallStats.percent} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h2 className="text-sm font-semibold text-foreground mb-4">
                Section Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SYLLABUS_SUBJECTS.map((sub, i) => {
                  const st = sectionStats(sub.id);
                  return (
                    <div
                      key={sub.id}
                      data-ocid={`subjects.item.${i + 1}`}
                      className="rounded-xl border border-gray-100 p-4"
                      style={{ background: "oklch(0.97 0.005 243)" }}
                    >
                      <p className="text-xs font-medium text-foreground mb-2">
                        {sub.label}
                      </p>
                      <p
                        className="text-2xl font-bold mb-1"
                        style={{ color: "#0F3554" }}
                      >
                        {st.percent}%
                      </p>
                      <Progress value={st.percent} className="h-1.5" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {st.done}/{st.total} topics
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div
              className="bg-white rounded-2xl border border-gray-100 shadow-card p-5"
              data-ocid="syllabus.overview.card"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground">
                  Syllabus Overview
                </h2>
                <button
                  type="button"
                  onClick={() => setActivePage("Syllabus Tracker")}
                  data-ocid="syllabus.overview.link"
                  className="text-xs font-medium hover:underline transition-colors"
                  style={{ color: "#0F3554" }}
                >
                  View all →
                </button>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">
                  {pendingTopics.length} pending topics
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: "#0F3554" }}
                >
                  {overallStats.percent}%
                </span>
              </div>
              <Progress value={overallStats.percent} className="h-2 mb-5" />
              <div className="space-y-3">
                {SYLLABUS_SUBJECTS.map((sub) => {
                  const st = sectionStats(sub.id);
                  return (
                    <div key={sub.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">
                          {sub.label}
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {st.percent}%
                        </span>
                      </div>
                      <Progress value={st.percent} className="h-1.5" />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <QuickNav setActivePage={setActivePage} />
          </motion.div>
        </div>

        <div className="flex flex-col gap-5">
          <motion.div variants={itemVariants}>
            {targetsLoading ? (
              <Skeleton
                data-ocid="daily_target.loading_state"
                className="h-64 rounded-2xl"
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
