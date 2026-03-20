# TS LAWCET PrepSage

## Current State
The app is a UPSC preparation dashboard with 6 subjects (History, Geography, Polity, Economy, Science & Tech, Current Affairs), a nav with Syllabus/Live Classes/Mock Tests/Study Materials/Profile links, daily targets, deadlines list, and an Internet Identity status card.

## Requested Changes (Diff)

### Add
- LAWCET-specific stat cards on dashboard: Today's Target, Questions Completed Today, Mock Tests Completed, Accuracy %
- New nav items: Dashboard, Mock Tests, Daily Practice, Syllabus Tracker, Progress
- LAWCET section cards: Legal Aptitude, General Knowledge & Current Affairs, Mental Ability
- Mock Tests page (basic)
- Daily Practice page (basic)
- Syllabus Tracker page (basic)
- Progress page (basic)

### Modify
- App branding from "PrepSage" to "LAWCET PrepSage" or "TS LAWCET"
- Subject/section list reduced from 6 UPSC subjects to 3 LAWCET sections
- Header navigation links updated to LAWCET nav items
- Dashboard greeting and context updated to LAWCET
- Daily targets updated to LAWCET-relevant tasks
- QuickNav updated to LAWCET quick actions

### Remove
- UPSC-specific content (NCERT Books, mind maps references)
- Deadline list (replaced with stat cards)
- IIStatusCard can remain (auth still Internet Identity)

## Implementation Plan
1. Update Header nav links to: Dashboard, Mock Tests, Daily Practice, Syllabus Tracker, Progress
2. Update SubjectCard metadata to map to 3 LAWCET sections using existing 3 backend subjects
3. Add stat cards row in Dashboard (Today's Target, Questions Completed Today, Mock Tests Completed, Accuracy %)
4. Update Dashboard fallback data for LAWCET subjects
5. Update QuickNav for LAWCET quick actions
6. Add stub page components for Mock Tests, Daily Practice, Syllabus Tracker, Progress
7. Wire navigation state in App.tsx to show correct page
8. Update branding to TS LAWCET
