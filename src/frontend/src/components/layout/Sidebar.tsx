import {
  BookMarked,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileQuestion,
  Layers,
  LayoutDashboard,
  Newspaper,
  UserCircle,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { ActivePage } from "../../App";

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (p: ActivePage) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const CA_PAGES: ActivePage[] = [
  "Current Affairs",
  "Monthly Affairs",
  "CA MCQs",
];

const CA_SUB_ITEMS: {
  label: string;
  page: ActivePage;
  icon: React.ElementType;
}[] = [
  { label: "Daily Current Affairs", page: "Current Affairs", icon: Newspaper },
  { label: "Monthly Affairs", page: "Monthly Affairs", icon: CalendarDays },
  { label: "CA MCQs", page: "CA MCQs", icon: FileQuestion },
];

type TopNavItem = {
  label: string;
  page: ActivePage;
  icon: React.ElementType;
};

const TOP_ITEMS: TopNavItem[] = [
  { label: "Dashboard", page: "Dashboard", icon: LayoutDashboard },
];

const BOTTOM_ITEMS: TopNavItem[] = [
  { label: "Mock Tests", page: "Mock Tests", icon: ClipboardList },
  { label: "PYQ Tests", page: "PYQ Tests", icon: BookOpen },
  { label: "Syllabus", page: "Syllabus Tracker", icon: BookMarked },
  { label: "Flashcards", page: "Flashcards", icon: Layers },
  { label: "Profile", page: "Profile", icon: UserCircle },
];

function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
  ocid,
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  ocid: string;
}) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      className={[
        "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left",
        active
          ? "text-[#0F3554]"
          : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
      ].join(" ")}
      style={
        active ? { background: "oklch(0.93 0.04 243)", color: "#0F3554" } : {}
      }
    >
      {active && (
        <span
          className="absolute left-0 inset-y-2 w-[3px] rounded-r-full"
          style={{ background: "#0F3554" }}
        />
      )}
      <Icon
        size={16}
        strokeWidth={active ? 2.2 : 1.8}
        style={{ flexShrink: 0 }}
      />
      <span className="truncate">{label}</span>
    </button>
  );
}

function SidebarContent({
  activePage,
  setActivePage,
  onClose,
}: {
  activePage: ActivePage;
  setActivePage: (p: ActivePage) => void;
  onClose?: () => void;
}) {
  const caIsActive = CA_PAGES.includes(activePage);
  const [caOpen, setCaOpen] = useState(caIsActive);

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="h-14 flex items-center px-4 border-b border-gray-100 flex-shrink-0">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm mr-2.5 flex-shrink-0"
          style={{ background: "#0F3554" }}
        >
          ⚖️
        </div>
        <span className="font-bold text-sm tracking-tight flex-1 text-[#0F3554] truncate">
          TS LAWCET
        </span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav
        className="flex-1 px-3 py-3 flex flex-col gap-0.5 overflow-y-auto"
        aria-label="Sidebar navigation"
      >
        {/* Dashboard */}
        {TOP_ITEMS.map((item) => (
          <NavButton
            key={item.page}
            icon={item.icon}
            label={item.label}
            active={activePage === item.page}
            onClick={() => handleNav(item.page)}
            ocid={`sidebar.${item.page.toLowerCase().replace(/ /g, "_")}.link`}
          />
        ))}

        {/* Current Affairs collapsible */}
        <div>
          <button
            type="button"
            data-ocid="sidebar.current_affairs.toggle"
            onClick={() => setCaOpen((o) => !o)}
            className={[
              "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left",
              caIsActive
                ? "text-[#0F3554]"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
            ].join(" ")}
            style={
              caIsActive
                ? { background: "oklch(0.93 0.04 243)", color: "#0F3554" }
                : {}
            }
          >
            {caIsActive && (
              <span
                className="absolute left-0 inset-y-2 w-[3px] rounded-r-full"
                style={{ background: "#0F3554" }}
              />
            )}
            <Newspaper
              size={16}
              strokeWidth={caIsActive ? 2.2 : 1.8}
              style={{ flexShrink: 0 }}
            />
            <span className="flex-1 truncate">Current Affairs</span>
            {caOpen ? (
              <ChevronDown size={14} style={{ flexShrink: 0 }} />
            ) : (
              <ChevronRight size={14} style={{ flexShrink: 0 }} />
            )}
          </button>

          <AnimatePresence initial={false}>
            {caOpen && (
              <motion.div
                key="ca-sub"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="pl-4 mt-0.5 flex flex-col gap-0.5">
                  {CA_SUB_ITEMS.map((sub) => {
                    const active = activePage === sub.page;
                    return (
                      <button
                        key={sub.page}
                        type="button"
                        data-ocid={`sidebar.${sub.page.toLowerCase().replace(/ /g, "_")}.link`}
                        onClick={() => handleNav(sub.page)}
                        className={[
                          "relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors w-full text-left",
                          active
                            ? "text-[#0F3554] bg-[oklch(0.96_0.025_243)]"
                            : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
                        ].join(" ")}
                      >
                        {active && (
                          <span
                            className="absolute left-0 inset-y-1.5 w-[2px] rounded-r-full"
                            style={{ background: "#0F3554" }}
                          />
                        )}
                        <sub.icon
                          size={14}
                          strokeWidth={active ? 2.2 : 1.8}
                          style={{ flexShrink: 0 }}
                        />
                        <span className="truncate">{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Remaining items */}
        {BOTTOM_ITEMS.map((item) => (
          <NavButton
            key={item.page}
            icon={item.icon}
            label={item.label}
            active={activePage === item.page}
            onClick={() => handleNav(item.page)}
            ocid={`sidebar.${item.page.toLowerCase().replace(/ /g, "_")}.link`}
          />
        ))}
      </nav>
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
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col w-[220px] flex-shrink-0 bg-white border-r border-gray-100 h-full"
        aria-label="Main sidebar"
      >
        <SidebarContent activePage={activePage} setActivePage={setActivePage} />
      </aside>

      {/* Mobile: backdrop + slide-out drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 md:hidden"
              style={{ zIndex: 9998 }}
              onClick={onMobileClose}
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-[240px] bg-white border-r border-gray-100 md:hidden flex flex-col"
              style={{ zIndex: 9999 }}
              aria-label="Mobile navigation"
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
