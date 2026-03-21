# TS LAWCET Prep

## Current State
Mock test system stores a `TestResult` per test (score, accuracy, timeTaken, bySubject, completedAt) in localStorage under `lawcet_result_<id>`. `MockTestsPage` shows test cards with latest score badge. `MockExamPage` has exam, results, and review phases, but review is only accessible immediately after a test — not from history. Questions and user answers are NOT persisted in the result object, so post-session review is impossible.

## Requested Changes (Diff)

### Add
- `questions` and `answers` snapshot fields to `TestResult` interface and `saveResult` call so detailed history review is possible
- `MockTestHistoryPage` component: a full history list + detail view
  - History list shows all completed tests (Test 1, Test 2, ...), each card showing date, score (X/120), accuracy %, time taken
  - Filter/sort controls: Sort by Latest, Sort by Highest Score
  - Click any history card → detailed view: shows all 120 questions with user answer vs correct answer highlighted, explanations, same review UI as MockExamPage review phase
- History tab/button on `MockTestsPage` to navigate to `MockTestHistoryPage`

### Modify
- `mockTestStorage.ts`: Add `questions` (Question array snapshot) and `answers` (Record<number,number>) to `TestResult` interface; update `saveResult` type
- `MockExamPage.tsx`: Pass `questions` and `answers` to `saveResult` when entering results phase
- `MockTestsPage.tsx`: Add a "History" tab toggle at top to switch between test cards and history view

### Remove
- Nothing removed

## Implementation Plan
1. Update `mockTestStorage.ts`: add `questions` and `answers` to `TestResult`; keep backward-compatible (optional fields)
2. Update `MockExamPage.tsx`: include `questions` and `answers` in the `saveResult` call
3. Create `MockTestHistoryPage.tsx`: history list with sort filter, click-to-detail with full question review (reuse review UI logic from MockExamPage)
4. Update `MockTestsPage.tsx`: add tabs (Tests / History) at the top; render `MockTestHistoryPage` when History tab active
