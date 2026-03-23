import { useEffect, useState } from "react";

const EXAM_DATE = new Date("2026-05-18T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = EXAM_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

interface ExamCountdownCardProps {
  compact?: boolean;
}

export function ExamCountdownCard({ compact }: ExamCountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isToday = new Date().toDateString() === EXAM_DATE.toDateString();
  const isPast = EXAM_DATE.getTime() < Date.now() && !isToday;

  if (compact) {
    return (
      <div
        data-ocid="exam_countdown.compact_card"
        className="flex items-center justify-between px-5 py-3 rounded-2xl"
        style={{ background: "#0F3554" }}
      >
        <div>
          <p className="text-xs font-medium text-blue-200 uppercase tracking-widest">
            TS LAWCET 2026
          </p>
          <p className="text-sm text-white font-semibold">
            18 May 2026 · Exam Countdown
          </p>
        </div>
        {timeLeft && !isPast && !isToday && (
          <div className="flex items-center gap-3">
            {[
              { label: "D", value: timeLeft.days },
              { label: "H", value: timeLeft.hours },
              { label: "M", value: timeLeft.minutes },
              { label: "S", value: timeLeft.seconds },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-xl font-bold tabular-nums text-white">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-blue-300">{label}</span>
              </div>
            ))}
          </div>
        )}
        {isToday && (
          <p className="text-sm font-bold text-green-300">🎓 Today!</p>
        )}
        {isPast && <p className="text-sm text-blue-300">Exam passed</p>}
      </div>
    );
  }

  return (
    <div
      data-ocid="exam_countdown.card"
      className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4" style={{ background: "#0F3554" }}>
        <p className="text-xs font-medium text-blue-200 uppercase tracking-widest">
          Exam Countdown
        </p>
        <p className="text-lg font-bold text-white mt-0.5">TS LAWCET 2026</p>
        <p className="text-xs text-blue-300 mt-0.5">18 May 2026 · Telangana</p>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        {isPast ? (
          <p className="text-center text-sm font-semibold text-gray-500">
            Exam has passed
          </p>
        ) : isToday ? (
          <p className="text-center text-base font-bold text-green-600">
            🎓 Exam is today!
          </p>
        ) : timeLeft ? (
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl py-3 px-1"
                style={{ background: "#EEF4FB" }}
              >
                <span
                  className="text-2xl font-bold tabular-nums"
                  style={{ color: "#0F3554" }}
                >
                  {String(value).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-medium text-gray-500 mt-0.5">
                  {label}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {!isPast && !isToday && timeLeft && (
          <p className="text-center text-xs text-muted-foreground mt-3">
            Study hard — you can do this! 💪
          </p>
        )}
      </div>
    </div>
  );
}
