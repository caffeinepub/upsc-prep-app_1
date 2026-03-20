import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const SUBJECT_PROGRESS = [
  {
    label: "Legal Aptitude",
    icon: "⚖️",
    color: "oklch(0.85 0.06 243)",
    value: 65,
  },
  {
    label: "GK & Current Affairs",
    icon: "🌐",
    color: "oklch(0.88 0.07 155)",
    value: 48,
  },
  {
    label: "Mental Ability",
    icon: "🧠",
    color: "oklch(0.87 0.05 300)",
    value: 72,
  },
];

const WEEKLY = [
  { day: "Mon", count: 28 },
  { day: "Tue", count: 35 },
  { day: "Wed", count: 22 },
  { day: "Thu", count: 40 },
  { day: "Fri", count: 31 },
  { day: "Sat", count: 18 },
  { day: "Sun", count: 10 },
];

const STAT_CARDS = [
  { label: "Overall Accuracy", value: "74%", trend: true },
  {
    label: "Questions This Week",
    value: String(WEEKLY.reduce((a, b) => a + b.count, 0)),
  },
  { label: "Study Streak", value: "12 days" },
];

const maxDaily = Math.max(...WEEKLY.map((w) => w.count));

export function ProgressPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
          Progress
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Track your TS LAWCET preparation progress
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        <div className="flex flex-col gap-5">
          {/* Overall stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {STAT_CARDS.map((stat) => (
              <Card
                key={stat.label}
                data-ocid={`progress.stat.${stat.label.toLowerCase().replace(/ /g, "_")}.card`}
                className="shadow-card"
              >
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <div className="flex items-end gap-1.5">
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    {stat.trend && (
                      <TrendingUp
                        size={14}
                        className="mb-1"
                        style={{ color: "oklch(var(--success-text))" }}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Weekly chart */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            <Card data-ocid="progress.weekly.card" className="shadow-card">
              <CardHeader>
                <CardTitle className="text-sm font-semibold">
                  Weekly Question Count
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 h-32">
                  {WEEKLY.map((w) => (
                    <div
                      key={w.day}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-full rounded-t-md"
                        style={{
                          height: `${(w.count / maxDaily) * 100}%`,
                          background: "oklch(var(--navy))",
                          opacity: 0.8,
                          minHeight: "4px",
                        }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {w.day}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Section-wise progress */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
        >
          <Card data-ocid="progress.subjects.card" className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Section-wise Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {SUBJECT_PROGRESS.map((s, i) => (
                <div
                  key={s.label}
                  data-ocid={`progress.subjects.item.${i + 1}`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{ background: s.color }}
                    >
                      {s.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-1">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {s.label}
                        </p>
                        <p className="text-xs font-bold text-foreground flex-shrink-0">
                          {s.value}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <Progress value={s.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
