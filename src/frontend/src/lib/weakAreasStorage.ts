export interface WeakQuestion {
  id: string;
  text: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
  subject: string;
  source: "mock" | "pyq";
  savedAt: number;
}

const KEY = "lawcet_weak_questions";
const MAX = 50;

export function loadWeakQuestions(): WeakQuestion[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveWeakQuestion(q: WeakQuestion): void {
  const current = loadWeakQuestions();
  const filtered = current.filter((wq) => wq.id !== q.id);
  const updated = [q, ...filtered].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function removeWeakQuestion(id: string): void {
  const current = loadWeakQuestions();
  localStorage.setItem(
    KEY,
    JSON.stringify(current.filter((wq) => wq.id !== id)),
  );
}
