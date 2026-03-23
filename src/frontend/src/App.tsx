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

  if (examActive) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          background: "#F5F7FA",
          zIndex: 9997,
        }}
      >
        {renderPage()}
      </div>
    );
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#F5F7FA" }}
    >
      <Sidebar
        activePage={activePage}
        setActivePage={handleSetActivePage}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        {/* pb-16 on mobile so content doesn't hide behind the bottom nav */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {renderPage()}
        </main>
      </div>
      <BottomNav activePage={activePage} setActivePage={handleSetActivePage} />
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
