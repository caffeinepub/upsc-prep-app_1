import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import type { ActivePage } from "../../App";
import { useAuth } from "../../contexts/AuthContext";

const NAV_LINKS: ActivePage[] = [
  "Dashboard",
  "Mock Tests",
  "PYQ Tests",
  "Syllabus Tracker",
  "Flashcards",
  "Profile",
];

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export function Header({ activePage, setActivePage }: HeaderProps) {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
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

        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              type="button"
              data-ocid={`nav.${link.toLowerCase().replace(/ /g, "_")}.link`}
              onClick={() => setActivePage(link)}
              className={[
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                activePage === link
                  ? "text-foreground border-b-2 rounded-b-none pb-[5px]"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
              style={
                activePage === link ? { borderBottomColor: "#0F3554" } : {}
              }
            >
              {link}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <Button
          data-ocid="header.logout.button"
          variant="outline"
          size="sm"
          onClick={logout}
          className="hidden md:flex flex-shrink-0 h-8 px-3 text-xs font-medium rounded-lg"
          style={{ borderColor: "#0F3554", color: "#0F3554" }}
        >
          <LogOut size={13} className="mr-1.5" />
          Logout
        </Button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-3">
          <nav className="flex flex-col gap-1 mb-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                type="button"
                data-ocid={`nav.mobile.${link.toLowerCase().replace(/ /g, "_")}.link`}
                onClick={() => {
                  setActivePage(link);
                  setMenuOpen(false);
                }}
                className={[
                  "text-left px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  activePage === link
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
                style={activePage === link ? { background: "#0F3554" } : {}}
              >
                {link}
              </button>
            ))}
          </nav>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full h-8 text-xs"
            style={{ borderColor: "#0F3554", color: "#0F3554" }}
          >
            <LogOut size={13} className="mr-1.5" /> Logout
          </Button>
        </div>
      )}
    </header>
  );
}
