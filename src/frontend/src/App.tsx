import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { AuthGuard } from "./components/auth/AuthGuard";
import { LoginPage } from "./components/auth/LoginPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { DailyPracticePage } from "./components/pages/DailyPracticePage";
import { MockTestsPage } from "./components/pages/MockTestsPage";
import { ProgressPage } from "./components/pages/ProgressPage";
import { SyllabusTrackerPage } from "./components/pages/SyllabusTrackerPage";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

export type ActivePage =
  | "Dashboard"
  | "Mock Tests"
  | "Daily Practice"
  | "Syllabus Tracker"
  | "Progress";

function AppContent() {
  const { identity } = useInternetIdentity();
  const [activePage, setActivePage] = useState<ActivePage>("Dashboard");

  if (!identity) return <LoginPage />;

  const renderPage = () => {
    switch (activePage) {
      case "Mock Tests":
        return <MockTestsPage />;
      case "Daily Practice":
        return <DailyPracticePage />;
      case "Syllabus Tracker":
        return <SyllabusTrackerPage />;
      case "Progress":
        return <ProgressPage />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <AuthGuard>
        <AppContent />
      </AuthGuard>
      <Toaster />
    </>
  );
}
