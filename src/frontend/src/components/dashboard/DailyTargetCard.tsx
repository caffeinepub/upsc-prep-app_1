import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardList } from "lucide-react";
import type { DailyTarget } from "../../types/local";

interface DailyTargetCardProps {
  targets: DailyTarget[];
  onToggle: (id: bigint) => void;
}

export function DailyTargetCard({ targets, onToggle }: DailyTargetCardProps) {
  const completed = targets.filter((t) => t.isCompleted).length;
  const total = targets.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const r = 40;
  const cx = 52;
  const cy = 52;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div
      data-ocid="daily_target.card"
      className="bg-white rounded-xl border border-border shadow-card p-5"
    >
      <h2 className="text-sm font-semibold text-foreground mb-4">
        Today's Daily Target
      </h2>

      {total === 0 ? (
        <div
          data-ocid="daily_target.empty_state"
          className="flex flex-col items-center justify-center py-6 gap-3 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
            <ClipboardList size={22} className="text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
            No daily targets yet. Start a mock test or practice session to track
            your progress.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <svg
                width="104"
                height="104"
                viewBox="0 0 104 104"
                aria-label={`${pct}% daily targets completed`}
                role="img"
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="oklch(var(--progress-track))"
                  strokeWidth="10"
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="oklch(var(--navy))"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform={`rotate(-90 ${cx} ${cy})`}
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-xl font-bold"
                  style={{ color: "oklch(var(--navy))" }}
                >
                  {pct}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide"
              style={{
                background: "oklch(var(--success-bg))",
                color: "oklch(var(--success-text))",
              }}
            >
              {pct >= 80
                ? "On Track"
                : pct >= 50
                  ? "In Progress"
                  : "Getting Started"}
            </span>
          </div>

          <div className="space-y-2">
            {targets.map((target, i) => (
              <div
                key={String(target.id)}
                data-ocid={`daily_target.item.${i + 1}`}
                className="flex items-center gap-2.5 py-1"
              >
                <Checkbox
                  data-ocid={`daily_target.checkbox.${i + 1}`}
                  checked={target.isCompleted}
                  onCheckedChange={() => onToggle(target.id)}
                  className="rounded-[4px]"
                />
                <span
                  className={`text-xs flex-1 ${
                    target.isCompleted
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {target.description}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
