# TS LAWCET Prep

## Current State
The app has 7 PYQ Mock Tests and 6 AI Mock Tests. Tests 5, 6, 7 use expansion data files (pyqExpansion56.ts, pyqExpansion7.ts). The CBTExamInterface requests fullscreen via the Fullscreen API. App.tsx hides the nav when `examActive` is true.

## Requested Changes (Diff)

### Add
- Normalize all subject names in pyqExpansion56.ts: change `"General Knowledge"` → `"GK & Current Affairs"` to match the rest of the system
- Graceful fullscreen fallback for iOS Safari (which doesn't support `requestFullscreen`)

### Modify
- CBTExamInterface: wrap fullscreen request in try/catch with webkit prefix support (`webkitRequestFullscreen`), and add a CSS fallback so the exam fills the screen even without fullscreen API
- PYQExamPage: ensure sortBySection handles both "General Knowledge" and "GK & Current Affairs" (already done, verify)
- MockTestsPage: fix potential state loss on `examActive` re-render — move `activeExam` initialization so it's stable
- App.tsx: ensure the exam container uses `position: fixed; inset: 0` to truly cover the viewport on mobile without relying on fullscreen API

### Remove
- Nothing

## Implementation Plan
1. In pyqExpansion56.ts: replace all `subject: "General Knowledge"` with `subject: "GK & Current Affairs"`
2. In CBTExamInterface.tsx: improve fullscreen request to include webkit prefix and handle iOS gracefully; make the exam container `position: fixed; inset: 0; z-index: 9999` as a CSS fallback
3. In App.tsx: when examActive, use `position: fixed; inset: 0` container so nav is always hidden without fullscreen API
4. Validate and build
