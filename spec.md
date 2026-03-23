# TS LAWCET Prep

## Current State
The app has a sidebar layout with `flex h-screen overflow-hidden` on the root div and `overflow-hidden` on the inner column wrapper. The `<main>` element uses `flex-1 overflow-y-auto` for scrolling. On mobile, `h-screen` doesn't account for browser chrome, causing content to be clipped. The inner column's `overflow-hidden` interferes with scroll context. MockExamPage review phase uses `h-[calc(100vh-56px)]` on a ScrollArea which double-constrains the review list. `index.css` has no explicit rules for `html`, `body`, or `#root`.

## Requested Changes (Diff)

### Add
- `html, body, #root { height: 100%; }` in `index.css`
- `scroll-behavior: smooth` on `html`

### Modify
- `App.tsx` root div: change `h-screen overflow-hidden` → `h-dvh` (dynamic viewport height, no overflow-hidden)
- `App.tsx` inner column wrapper: remove `overflow-hidden`, keep `flex-1 flex flex-col min-w-0`
- `App.tsx` `<main>` non-exam: keep `flex-1 overflow-y-auto pb-16 md:pb-0`
- `MockExamPage.tsx`: replace `h-[calc(100vh-56px)]` on ScrollArea in review phase with `flex-1` or `h-full` so it fills its container naturally
- `PYQExamPage.tsx`: same fix if similar ScrollArea pattern exists

### Remove
- `overflow-hidden` from root app container
- `overflow-hidden` from inner column wrapper

## Implementation Plan
1. Update `index.css` with html/body/#root scroll rules
2. Fix `App.tsx` root and column wrappers
3. Fix `MockExamPage.tsx` review ScrollArea height
4. Validate build
