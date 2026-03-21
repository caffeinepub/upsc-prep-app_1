import { Button } from "@/components/ui/button";
import { Subject } from "../../types/local";
import type { SubjectProgress } from "../../types/local";

const SUBJECT_META: Record<
  Subject,
  { label: string; icon: string; color: string }
> = {
  [Subject.history]: {
    label: "Legal Aptitude",
    icon: "⚖️",
    color: "oklch(0.85 0.06 243)",
  },
  [Subject.geography]: {
    label: "General Knowledge & Current Affairs",
    icon: "🌐",
    color: "oklch(0.88 0.07 155)",
  },
  [Subject.polity]: {
    label: "Mental Ability",
    icon: "🧠",
    color: "oklch(0.87 0.05 300)",
  },
  [Subject.economy]: {
    label: "Indian Economy",
    icon: "📈",
    color: "oklch(0.88 0.07 75)",
  },
  [Subject.scienceTech]: {
    label: "Science & Tech",
    icon: "🔬",
    color: "oklch(0.87 0.06 300)",
  },
  [Subject.currentAffairs]: {
    label: "Current Affairs",
    icon: "📰",
    color: "oklch(0.87 0.05 15)",
  },
};

interface SubjectCardProps {
  progress: SubjectProgress;
  index: number;
}

export function SubjectCard({ progress, index }: SubjectCardProps) {
  const meta = SUBJECT_META[progress.subject] ?? {
    label: String(progress.subject),
    icon: "📚",
    color: "oklch(var(--icon-circle))",
  };
  const pct = Number(progress.completionPercentage);

  return (
    <div
      data-ocid={`subjects.item.${index}`}
      className="bg-white rounded-xl border border-border shadow-card p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
          style={{ background: meta.color }}
        >
          {meta.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">
            {meta.label}
          </p>
          <p className="text-xs text-muted-foreground">{pct}% complete</p>
        </div>
      </div>
      <div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "oklch(var(--progress-track))" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: "oklch(var(--navy))" }}
          />
        </div>
      </div>
      <Button
        data-ocid={`subjects.study.button.${index}`}
        size="sm"
        variant="outline"
        className="h-7 text-xs rounded-lg w-full"
        style={{
          borderColor: "oklch(var(--navy))",
          color: "oklch(var(--navy))",
        }}
      >
        Study Now
      </Button>
    </div>
  );
}
