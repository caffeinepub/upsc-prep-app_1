import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { AuthGuard } from "./components/auth/AuthGuard";
import { LoginPage } from "./components/auth/LoginPage";
import { SignupPage } from "./components/auth/SignupPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/TopBar";
import { DailyPracticePage } from "./components/pages/DailyPracticePage";
import { FlashcardsPage } from "./components/pages/FlashcardsPage";
import { MockTestsPage } from "./components/pages/MockTestsPage";
import { PYQPage } from "./components/pages/PYQPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { SyllabusTrackerPage } from "./components/pages/SyllabusTrackerPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

export type ActivePage =
  | "Dashboard"
  | "Mock Tests"
  | "PYQ"
  | "Syllabus"
  | "Flashcards"
  | "Profile"
  | "Daily Practice";

function AppContent() {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState<ActivePage>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authPage, setAuthPage] = useState<"login" | "signup">("login");

  if (!user) {
    return authPage === "signup" ? (
      <SignupPage onSwitchToLogin={() => setAuthPage("login")} />
    ) : (
      <LoginPage onSwitchToSignup={() => setAuthPage("signup")} />
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "Mock Tests":
        return <MockTestsPage />;
      case "PYQ":
        return <PYQPage />;
      case "Daily Practice":
        return <DailyPracticePage />;
      case "Syllabus":
        return <SyllabusTrackerPage />;
      case "Flashcards":
        return <FlashcardsPage />;
      case "Profile":
        return <ProfilePage />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#F5F7FA" }}
    >
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">{renderPage()}</main>
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
