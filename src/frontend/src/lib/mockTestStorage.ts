import type { Question } from "../data/questionBank";

export interface TestSession {
  testId: number;
  questionIds: number[];
  answers: Record<number, number>;
  markedForReview: number[];
  timeLeft: number;
  startedAt: number;
}

export interface TestResult {
  testId: number;
  score: number;
  total: number;
  accuracy: number;
  timeTaken: number;
  bySubject: Record<string, { correct: number; total: number }>;
  completedAt: number;
  questions?: Question[];
  answers?: Record<number, number>;
}

const SESSION_PREFIX = "lawcet_session_";
const RESULT_PREFIX = "lawcet_result_";

export function saveSession(session: TestSession): void {
  try {
    localStorage.setItem(
      `${SESSION_PREFIX}${session.testId}`,
      JSON.stringify(session),
    );
  } catch {
    // ignore quota errors
  }
}

export function loadSession(testId: number): TestSession | null {
  try {
    const raw = localStorage.getItem(`${SESSION_PREFIX}${testId}`);
    if (!raw) return null;
    return JSON.parse(raw) as TestSession;
  } catch {
    return null;
  }
}

export function clearSession(testId: number): void {
  localStorage.removeItem(`${SESSION_PREFIX}${testId}`);
}

export function saveResult(result: TestResult): void {
  try {
    localStorage.setItem(
      `${RESULT_PREFIX}${result.testId}`,
      JSON.stringify(result),
    );
  } catch {
    // ignore quota errors
  }
}

export function loadResult(testId: number): TestResult | null {
  try {
    const raw = localStorage.getItem(`${RESULT_PREFIX}${testId}`);
    if (!raw) return null;
    return JSON.parse(raw) as TestResult;
  } catch {
    return null;
  }
}

export function loadAllResults(): TestResult[] {
  const results: TestResult[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(RESULT_PREFIX)) continue;
    try {
      const raw = localStorage.getItem(key);
      if (raw) results.push(JSON.parse(raw) as TestResult);
    } catch {
      // skip malformed entries
    }
  }
  return results;
}
