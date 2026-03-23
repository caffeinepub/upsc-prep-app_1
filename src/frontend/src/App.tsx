import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { AuthGuard } from "./components/auth/AuthGuard";
import { LoginPage } from "./components/auth/LoginPage";
import { SignupPage } from "./components/auth/SignupPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import { BottomNav } from "./components/layout/BottomNav";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/TopBar";
import { CurrentAffairsMCQPage } from "./components/pages/CurrentAffairsMCQPage";
import { DailyCurrentAffairsPage } from "./components/pages/DailyCurrentAffairsPage";
import { DailyPracticePage } from "./components/pages/DailyPracticePage";
import { FlashcardsPage } from "./components/pages/FlashcardsPage";
import { MockTestsPage } from "./components/pages/MockTestsPage";
import { MonthlyCurrentAffairsPage } from "./components/pages/MonthlyCurrentAffairsPage";
import { PYQPage } from "./components/pages/PYQPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { SyllabusTrackerPage } from "./components/pages/SyllabusTrackerPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

export type ActivePage =
  | "Dashboard"
  | "Mock Tests"
  | "PYQ Tests"
  | "Syllabus Tracker"
  | "Flashcards"
  | "Current Affairs"
  | "Monthly Affairs"
  | "CA MCQs"
  | "Profile"
  | "Daily Practice";

function AppContent() {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState<ActivePage>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authPage, setAuthPage] = useState<"login" | "signup">("login");
  const [examActive, setExamActive] = useState(false);

  if (!user) {
    return authPage === "signup" ? (
      <SignupPage onSwitchToLogin={() => setAuthPage("login")} />
    ) : (
      <LoginPage onSwitchToSignup={() => setAuthPage("signup")} />
    );
  }

  const handleSetActivePage = (page: ActivePage) => {
    if (examActive) {
      const confirmed = window.confirm(
        "A test is in progress. Leave the exam?",
      );
      if (!confirmed) return;
      setExamActive(false);
    }
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case "Mock Tests":
        return <MockTestsPage onExamActiveChange={setExamActive} />;
      case "PYQ Tests":
        return <PYQPage onExamActiveChange={setExamActive} />;
      case "Daily Practice":
        return <DailyPracticePage onExamActiveChange={setExamActive} />;
      case "Syllabus Tracker":
        return <SyllabusTrackerPage />;
      case "Flashcards":
        return <FlashcardsPage />;
      case "Current Affairs":
        return <DailyCurrentAffairsPage />;
      case "Monthly Affairs":
        return <MonthlyCurrentAffairsPage />;
      case "CA MCQs":
        return <CurrentAffairsMCQPage />;
      case "Profile":
        return <ProfilePage />;
      default:
        return <Dashboard setActivePage={handleSetActivePage} />;
    }
  };

  // IMPORTANT: renderPage() must always be at the SAME position in the tree.
  // Using CSS to hide chrome during exam instead of conditional rendering
  // prevents React from unmounting/remounting page components (which would
  // cause exam state to be lost when examActive flips).
  return (
    <div className="flex h-dvh" style={{ background: "#F5F7FA" }}>
      {/* Sidebar hidden during exam, NOT removed */}
      <div style={examActive ? { display: "none" } : undefined}>
        <Sidebar
          activePage={activePage}
          setActivePage={handleSetActivePage}
          mobileOpen={sidebarOpen}
          onMobileClose={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* TopBar hidden during exam, NOT removed */}
        <div style={examActive ? { display: "none" } : undefined}>
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* main always at same DOM position — only styling changes */}
        <main
          className={examActive ? "" : "flex-1 overflow-y-auto pb-16 md:pb-0"}
          style={
            examActive
              ? {
                  position: "fixed",
                  inset: 0,
                  overflow: "hidden",
                  background: "#F5F7FA",
                  zIndex: 9997,
                }
              : undefined
          }
        >
          {renderPage()}
        </main>
      </div>

      {/* BottomNav hidden during exam, NOT removed */}
      <div style={examActive ? { display: "none" } : undefined}>
        <BottomNav
          activePage={activePage}
          setActivePage={handleSetActivePage}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthGuard>
        <AppContent />
      </AuthGuard>
      <Toaster />
    </AuthProvider>
  );
}
