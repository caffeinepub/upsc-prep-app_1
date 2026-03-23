import type { Question } from "../data/questionBank";

export interface TestSession {
  testId: number;
  questionIds: number[];
  answers: Record<number, number>;
  markedForReview: number[];
  timeLeft: number;
  currentIndex?: number;
  startedAt: number;
  savedAt?: number;
}

export interface TestResult {
  testId: number;
  attemptId?: string;
  testName?: string;
  testType?: "mock" | "pyq" | "daily";
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

export function generateAttemptId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

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

/**
 * Always appends — each call uses a unique attemptId key so old results are never overwritten.
 */
export function saveResult(result: TestResult): void {
  try {
    // Ensure we have an attemptId so every save is a new unique key
    const attemptId = result.attemptId ?? generateAttemptId();
    const key = `${RESULT_PREFIX}${attemptId}`;
    localStorage.setItem(key, JSON.stringify({ ...result, attemptId }));
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
  // Sort newest first
  return results.sort((a, b) => b.completedAt - a.completedAt);
}

// ─── Unified Exam Attempt ────────────────────────────────────────────────────

export type TestType = "Mock" | "PYQ" | "Daily";
export type AttemptStatus = "in-progress" | "completed";

export interface ExamAttempt {
  attemptId: string;
  userId: string;
  testId: number;
  testType: TestType;
  answers: Record<number, number>; // questionIndex → selectedOptionIndex
  visitedQuestions: number[];
  markedForReview: number[];
  startTime: number; // epoch ms
  remainingTime: number; // seconds
  status: AttemptStatus;
  score: number | null;
  accuracy: number | null;
  currentIndex?: number;
  questionIds?: number[];
}

const ATTEMPT_PREFIX = "lawcet_attempt_";

function attemptKey(userId: string, testId: number): string {
  return `${ATTEMPT_PREFIX}${userId}_${testId}`;
}

/** Load an existing attempt for this user+test. Returns null if none. */
export function loadAttempt(
  userId: string,
  testId: number,
): ExamAttempt | null {
  try {
    const raw = localStorage.getItem(attemptKey(userId, testId));
    if (!raw) return null;
    return JSON.parse(raw) as ExamAttempt;
  } catch {
    return null;
  }
}

/** Save (create or update) an attempt. Always overwrites the same key — no duplicates. */
export function saveAttempt(attempt: ExamAttempt): void {
  try {
    localStorage.setItem(
      attemptKey(attempt.userId, attempt.testId),
      JSON.stringify(attempt),
    );
  } catch {
    // ignore quota errors
  }
}

/**
 * Create a brand-new attempt only if one does not already exist.
 * If one exists and is in-progress, returns the existing one (resume).
 */
export function createOrResumeAttempt(
  userId: string,
  testId: number,
  testType: TestType,
  initialRemainingTime: number,
  questionIds?: number[],
): ExamAttempt {
  const existing = loadAttempt(userId, testId);
  if (existing && existing.status === "in-progress") {
    return existing; // resume
  }
  const attempt: ExamAttempt = {
    attemptId: generateAttemptId(),
    userId,
    testId,
    testType,
    answers: {},
    visitedQuestions: [],
    markedForReview: [],
    startTime: Date.now(),
    remainingTime: initialRemainingTime,
    status: "in-progress",
    score: null,
    accuracy: null,
    currentIndex: 0,
    questionIds,
  };
  saveAttempt(attempt);
  return attempt;
}

/** Mark attempt as completed with final score/accuracy and persist. */
export function completeAttempt(
  attempt: ExamAttempt,
  score: number,
  accuracy: number,
): ExamAttempt {
  const completed: ExamAttempt = {
    ...attempt,
    status: "completed",
    score,
    accuracy,
    remainingTime: attempt.remainingTime,
  };
  saveAttempt(completed);
  return completed;
}

/** Clear attempt after submission (optional cleanup). */
export function clearAttempt(userId: string, testId: number): void {
  localStorage.removeItem(attemptKey(userId, testId));
}
