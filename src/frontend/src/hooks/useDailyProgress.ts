import { useEffect, useState } from "react";

const TARGET_KEY = "lawcet_daily_target";
const PROGRESS_KEY = "lawcet_daily_progress";

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function loadTarget(): number {
  try {
    const v = localStorage.getItem(TARGET_KEY);
    if (v) return Math.max(1, Number(v));
  } catch {
    // ignore
  }
  return 20;
}

function loadCompleted(): number {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { date: string; count: number };
      if (parsed.date === todayString()) return parsed.count;
    }
  } catch {
    // ignore
  }
  return 0;
}

export function useDailyProgress() {
  const [dailyTarget, setDailyTargetState] = useState<number>(loadTarget);
  const [completedToday, setCompletedToday] = useState<number>(loadCompleted);

  // Sync on mount in case tab was open overnight
  useEffect(() => {
    setCompletedToday(loadCompleted());
  }, []);

  const remaining = Math.max(0, dailyTarget - completedToday);
  const percentComplete =
    dailyTarget > 0
      ? Math.min(100, Math.round((completedToday / dailyTarget) * 100))
      : 0;

  function setDailyTarget(n: number) {
    const val = Math.max(1, n);
    localStorage.setItem(TARGET_KEY, String(val));
    setDailyTargetState(val);
  }

  function incrementCompleted(n: number) {
    setCompletedToday((prev) => {
      const next = prev + n;
      localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify({ date: todayString(), count: next }),
      );
      return next;
    });
  }

  return {
    dailyTarget,
    completedToday,
    remaining,
    percentComplete,
    setDailyTarget,
    incrementCompleted,
  };
}
