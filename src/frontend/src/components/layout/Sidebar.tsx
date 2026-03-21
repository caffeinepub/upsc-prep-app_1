import {
  BookMarked,
  BookOpen,
  ClipboardList,
  Flame,
  Layers,
  LayoutDashboard,
  LogOut,
  UserCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ActivePage } from "../../App";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (p: ActivePage) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const NAV_ITEMS: { label: ActivePage; icon: React.ElementType }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Mock Tests", icon: ClipboardList },
  { label: "PYQ", icon: BookOpen },
  { label: "Syllabus", icon: BookMarked },
  { label: "Flashcards", icon: Layers },
  { label: "Profile", icon: UserCircle },
];

function SidebarContent({
  activePage,
  setActivePage,
  onClose,
}: {
  activePage: ActivePage;
  setActivePage: (p: ActivePage) => void;
  onClose?: () => void;
}) {
  const { logout } = useAuth();

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="h-14 flex items-center px-5 border-b border-gray-100 flex-shrink-0">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm mr-2.5"
          style={{ background: "#0F3554" }}
        >
          ⚖️
        </div>
        <span
          className="font-bold text-sm tracking-tight"
          style={{ color: "#0F3554" }}
        >
          TS LAWCET
        </span>
      </div>

      {/* Nav */}
      <nav
        className="flex-1 px-3 py-4 flex flex-col gap-0.5"
        aria-label="Sidebar navigation"
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-2 mb-2">
          Menu
        </p>
        {NAV_ITEMS.map((item) => {
          const active = activePage === item.label;
          return (
            <button
              key={item.label}
              type="button"
              data-ocid={`sidebar.${item.label.toLowerCase().replace(/ /g, "_")}.link`}
              onClick={() => handleNav(item.label)}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left",
                active
                  ? "text-[#0F3554]"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
              ].join(" ")}
              style={
                active
                  ? { background: "oklch(0.93 0.04 243)", color: "#0F3554" }
                  : {}
              }
            >
              <item.icon
                size={16}
                strokeWidth={active ? 2.2 : 1.8}
                style={{ flexShrink: 0 }}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-3 flex flex-col gap-1">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: "oklch(0.97 0.03 25)" }}
        >
          <Flame size={15} className="text-orange-500" />
          <span className="text-xs font-semibold text-orange-600">
            Daily Streak
          </span>
        </div>
        <button
          type="button"
          data-ocid="sidebar.logout.button"
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all w-full text-left"
        >
          <LogOut size={16} strokeWidth={1.8} />
          Logout
        </button>
      </div>
    </div>
  );
}

export function Sidebar({
  activePage,
  setActivePage,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden md:flex flex-col w-[220px] flex-shrink-0 bg-white border-r border-gray-100 h-full"
        aria-label="Main sidebar"
      >
        <SidebarContent activePage={activePage} setActivePage={setActivePage} />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              key="drawer"
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-[220px] bg-white border-r border-gray-100 md:hidden"
            >
              <SidebarContent
                activePage={activePage}
                setActivePage={setActivePage}
                onClose={onMobileClose}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
