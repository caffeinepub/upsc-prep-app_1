import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Newspaper,
  UserCircle,
} from "lucide-react";
import type { ActivePage } from "../../App";

interface BottomNavProps {
  activePage: ActivePage;
  setActivePage: (p: ActivePage) => void;
}

const TABS: { label: string; page: ActivePage; icon: React.ElementType }[] = [
  { label: "Home", page: "Dashboard", icon: LayoutDashboard },
  { label: "Affairs", page: "Current Affairs", icon: Newspaper },
  { label: "Mock", page: "Mock Tests", icon: ClipboardList },
  { label: "PYQ", page: "PYQ Tests", icon: BookOpen },
  { label: "Profile", page: "Profile", icon: UserCircle },
];

export function BottomNav({ activePage, setActivePage }: BottomNavProps) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-stretch"
      style={{ zIndex: 9990, paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Bottom navigation"
    >
      {TABS.map((tab) => {
        const active = activePage === tab.page;
        return (
          <button
            key={tab.page}
            type="button"
            onClick={() => setActivePage(tab.page)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors"
            style={{ color: active ? "#0F3554" : "#9ca3af" }}
            aria-label={tab.label}
            aria-current={active ? "page" : undefined}
          >
            <tab.icon size={20} strokeWidth={active ? 2.2 : 1.7} />
            <span
              className="text-[10px] font-medium leading-none"
              style={{ color: active ? "#0F3554" : "#9ca3af" }}
            >
              {tab.label}
            </span>
            {active && (
              <span
                className="absolute bottom-0 h-0.5 w-10 rounded-t-full"
                style={{ background: "#0F3554" }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
