import { CalendarDays } from "lucide-react";

const DEADLINES = [
  { title: "Prelims Mock Test 7", date: "Oct 28", urgent: true },
  { title: "Essay Draft 3", date: "Nov 2", urgent: false },
  { title: "Polity Revision", date: "Nov 5", urgent: false },
  { title: "Economy Notes", date: "Nov 10", urgent: false },
];

export function DeadlineList() {
  return (
    <div
      data-ocid="deadlines.card"
      className="bg-white rounded-xl border border-border shadow-card p-5"
    >
      <h2 className="text-sm font-semibold text-foreground mb-4">
        Upcoming Deadlines
      </h2>
      <div className="space-y-3">
        {DEADLINES.map((d, i) => (
          <div
            key={d.title}
            data-ocid={`deadlines.item.${i + 1}`}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: d.urgent
                    ? "oklch(0.96 0.05 20)"
                    : "oklch(var(--icon-circle))",
                }}
              >
                <CalendarDays
                  size={13}
                  style={{
                    color: d.urgent
                      ? "oklch(0.5 0.18 20)"
                      : "oklch(var(--navy))",
                  }}
                />
              </div>
              <span className="text-xs font-medium text-foreground truncate">
                {d.title}
              </span>
            </div>
            <span
              className="text-xs font-medium whitespace-nowrap flex-shrink-0 px-2 py-0.5 rounded-full"
              style={
                d.urgent
                  ? {
                      background: "oklch(0.96 0.05 20)",
                      color: "oklch(0.5 0.18 20)",
                    }
                  : {
                      background: "oklch(var(--icon-circle))",
                      color: "oklch(var(--medium-gray))",
                    }
              }
            >
              {d.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
