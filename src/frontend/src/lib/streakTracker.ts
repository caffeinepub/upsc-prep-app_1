const STREAK_KEY = "lawcet_streak";
const STREAK_DATE_KEY = "lawcet_streak_last_date";

function todayStr(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function getStreak(): number {
  try {
    const lastDate = localStorage.getItem(STREAK_DATE_KEY);
    const streakVal = Number.parseInt(
      localStorage.getItem(STREAK_KEY) || "0",
      10,
    );
    if (!lastDate || Number.isNaN(streakVal)) return 0;
    const today = todayStr();
    const yesterday = yesterdayStr();
    if (lastDate === today || lastDate === yesterday) return streakVal;
    // Streak broken
    return 0;
  } catch {
    return 0;
  }
}

export function recordActivity(): void {
  try {
    const today = todayStr();
    const yesterday = yesterdayStr();
    const lastDate = localStorage.getItem(STREAK_DATE_KEY);
    const current = Number.parseInt(
      localStorage.getItem(STREAK_KEY) || "0",
      10,
    );

    if (lastDate === today) {
      // Already recorded today, no change
      return;
    }

    let newStreak: number;
    if (lastDate === yesterday) {
      newStreak = (Number.isNaN(current) ? 0 : current) + 1;
    } else {
      newStreak = 1;
    }

    localStorage.setItem(STREAK_KEY, String(newStreak));
    localStorage.setItem(STREAK_DATE_KEY, today);
  } catch {
    // ignore
  }
}
