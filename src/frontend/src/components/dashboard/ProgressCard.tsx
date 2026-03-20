interface ProgressCardProps {
  overallProgress: number;
}

export function ProgressCard({ overallProgress }: ProgressCardProps) {
  return (
    <div
      data-ocid="progress.card"
      className="bg-white rounded-xl border border-border shadow-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">
          My Study Progress
        </h2>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{
            background: "oklch(var(--icon-circle))",
            color: "oklch(var(--navy))",
          }}
        >
          Overall
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">
              Total syllabus coverage
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: "oklch(var(--navy))" }}
            >
              {overallProgress}%
            </span>
          </div>
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ background: "oklch(var(--progress-track))" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${overallProgress}%`,
                background: "oklch(var(--navy))",
              }}
            />
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p
            className="text-2xl font-bold"
            style={{ color: "oklch(var(--navy))" }}
          >
            {overallProgress}%
          </p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>
    </div>
  );
}
