import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { user, logout } = useAuth();

  const displayName = user?.name ?? "Student";
  const initials = displayName
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header
      className="h-14 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 gap-3 flex-shrink-0 sticky top-0 z-30"
      data-ocid="topbar.section"
    >
      <button
        type="button"
        data-ocid="topbar.menu.button"
        onClick={onMenuClick}
        className="md:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        {/* User info */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: "#0F3554" }}
          >
            {initials || "S"}
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-gray-800 leading-tight">
              {displayName}
            </span>
            {user?.email && (
              <span className="text-[10px] text-gray-400 leading-tight">
                {user.email}
              </span>
            )}
          </div>
        </div>

        <div className="h-6 w-px bg-gray-200" />

        <button
          type="button"
          data-ocid="topbar.logout.button"
          onClick={logout}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors text-sm"
          aria-label="Logout"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
