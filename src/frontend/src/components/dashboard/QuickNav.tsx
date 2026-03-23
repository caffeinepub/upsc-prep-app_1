import { Button } from "@/components/ui/button";
import {
  BookMarked,
  BookOpen,
  Brain,
  FileText,
  Globe,
  UserCircle,
} from "lucide-react";
import type { ActivePage } from "../../App";

const QUICK_NAV_ITEMS = [
  {
    label: "Legal Aptitude",
    icon: BookOpen,
    filled: true,
    page: "Daily Practice" as ActivePage,
  },
  {
    label: "Mock Tests",
    icon: FileText,
    filled: false,
    page: "Mock Tests" as ActivePage,
  },
  {
    label: "GK & Current Affairs",
    icon: Globe,
    filled: false,
    page: "Daily Practice" as ActivePage,
  },
  {
    label: "Mental Ability",
    icon: Brain,
    filled: false,
    page: "Daily Practice" as ActivePage,
  },
  {
    label: "Syllabus Tracker",
    icon: BookMarked,
    filled: false,
    page: "Syllabus Tracker" as ActivePage,
  },
  {
    label: "Profile",
    icon: UserCircle,
    filled: false,
    page: "Profile" as ActivePage,
  },
];

interface QuickNavProps {
  setActivePage: (page: ActivePage) => void;
}

export function QuickNav({ setActivePage }: QuickNavProps) {
  return (
    <div
      data-ocid="quick_nav.section"
      className="bg-white rounded-2xl border border-gray-100 shadow-card p-5"
    >
      <h2 className="text-sm font-semibold text-foreground mb-4">
        Quick Navigation
      </h2>
      <div className="flex flex-wrap gap-2">
        {QUICK_NAV_ITEMS.map((item, i) => (
          <Button
            key={item.label}
            data-ocid={`quick_nav.item.${i + 1}`}
            size="sm"
            variant={item.filled ? "default" : "outline"}
            onClick={() => setActivePage(item.page)}
            className="h-8 px-3 text-xs rounded-full gap-1.5"
            style={
              item.filled
                ? { background: "oklch(var(--navy))", color: "white" }
                : {
                    borderColor: "oklch(var(--navy))",
                    color: "oklch(var(--navy))",
                  }
            }
          >
            <item.icon size={12} />
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
