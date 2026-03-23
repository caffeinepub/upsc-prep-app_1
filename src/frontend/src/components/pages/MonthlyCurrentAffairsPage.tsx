import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Star,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  type Category,
  type DailyAffairs,
  type NewsItem as RawNewsItem,
  currentAffairsData,
} from "../../data/currentAffairsData";

// ── Types ──────────────────────────────────────────────────────────────────
interface MonthGroup {
  key: string;
  label: string;
  days: DailyAffairs[];
}

interface NewsItem extends RawNewsItem {
  date: string;
  displayDate: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getMonthLabel(key: string) {
  const [year, month] = key.split("-").map(Number);
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

function groupByMonth(data: DailyAffairs[]): MonthGroup[] {
  const map = new Map<string, DailyAffairs[]>();
  for (const day of data) {
    const key = day.date.slice(0, 7);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(day);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, days]) => ({
      key,
      label: getMonthLabel(key),
      days: days.sort((a, b) => b.date.localeCompare(a.date)),
    }));
}

const categoryConfig: Record<
  Category,
  { label: string; bg: string; text: string; border: string }
> = {
  National: {
    label: "National",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  International: {
    label: "International",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  Economy: {
    label: "Economy",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  Legal: {
    label: "Legal",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  "Awards/Sports": {
    label: "Awards/Sports",
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
  },
};

const CATEGORIES: Category[] = [
  "National",
  "International",
  "Economy",
  "Legal",
  "Awards/Sports",
];

// ── Quick Revision Item ────────────────────────────────────────────────────
function RevisionItem({ item, index }: { item: NewsItem; index: number }) {
  const cat = categoryConfig[item.category];
  return (
    <div className="flex gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-xs font-bold text-gray-400 w-5 flex-shrink-0 pt-0.5">
        {index + 1}.
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 leading-snug">
          {item.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cat.bg} ${cat.text} ${cat.border}`}
          >
            {cat.label}
          </span>
          <span className="text-[10px] text-gray-400">{item.displayDate}</span>
        </div>
      </div>
    </div>
  );
}

// ── Full Detail Item ───────────────────────────────────────────────────────
function DetailItem({ item }: { item: NewsItem }) {
  const [open, setOpen] = useState(false);
  const cat = categoryConfig[item.category];
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <button
        type="button"
        className="w-full text-left px-4 py-3.5 flex items-start gap-3"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 leading-snug">
            {item.title}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cat.bg} ${cat.text} ${cat.border}`}
            >
              {cat.label}
            </span>
            <span className="text-[10px] text-gray-400">
              {item.displayDate}
            </span>
          </div>
        </div>
        <ChevronDown
          size={15}
          className={`flex-shrink-0 mt-0.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-50">
          <p className="text-sm text-gray-600 leading-relaxed pt-3">
            {item.summary}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export function MonthlyCurrentAffairsPage() {
  const months = useMemo(() => groupByMonth(currentAffairsData), []);
  const [monthIndex, setMonthIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<
    Category | "All" | "Highlights"
  >("All");
  const [quickRevision, setQuickRevision] = useState(false);

  const current = months[monthIndex];

  const allItems: NewsItem[] = useMemo(
    () =>
      current?.days.flatMap((d) =>
        d.items.map((item) => ({
          ...item,
          date: d.date,
          displayDate: d.displayDate,
        })),
      ) ?? [],
    [current],
  );

  const highlights: NewsItem[] = useMemo(() => {
    const seen = new Set<Category>();
    const result: NewsItem[] = [];
    for (const item of allItems) {
      if (!seen.has(item.category)) {
        seen.add(item.category);
        result.push(item);
      }
    }
    return result;
  }, [allItems]);

  const displayItems: NewsItem[] = useMemo(() => {
    if (activeCategory === "Highlights") return highlights;
    if (activeCategory === "All") return allItems;
    return allItems.filter((i) => i.category === activeCategory);
  }, [allItems, highlights, activeCategory]);

  const stats = useMemo(() => {
    const byCat: Record<string, number> = {};
    for (const item of allItems) {
      byCat[item.category] = (byCat[item.category] ?? 0) + 1;
    }
    return { total: allItems.length, days: current?.days.length ?? 0, byCat };
  }, [allItems, current]);

  const handlePrint = () => window.print();

  if (!current) {
    return (
      <div className="px-4 py-10 text-center text-sm text-gray-500">
        No monthly data available yet.
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto" id="monthly-ca-root">
      <style>{`
        @media print {
          #monthly-ca-root { padding: 0; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-start justify-between mb-5 no-print">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "#0F3554" }}
          >
            <Calendar size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#0F3554" }}>
              Monthly Current Affairs
            </h1>
            <p className="text-xs text-gray-500">
              All daily news combined by month
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setQuickRevision((v) => !v)}
            className={[
              "flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-all",
              quickRevision
                ? "text-white border-transparent"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300",
            ].join(" ")}
            style={quickRevision ? { background: "#0F3554" } : {}}
          >
            <Zap size={13} />
            {quickRevision ? "Full View" : "Quick Revision"}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border bg-white text-gray-600 border-gray-200 hover:border-gray-300 transition-all"
          >
            <Download size={13} />
            Download
          </button>
        </div>
      </div>

      {/* Month Navigator */}
      <div className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={() =>
            setMonthIndex((i) => Math.min(i + 1, months.length - 1))
          }
          disabled={monthIndex >= months.length - 1}
          className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 disabled:opacity-30 transition-all no-print"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-lg font-bold" style={{ color: "#0F3554" }}>
            {current.label}
          </h2>
          <p className="text-[11px] text-gray-400">
            {stats.days} days &middot; {stats.total} news items
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMonthIndex((i) => Math.max(i - 1, 0))}
          disabled={monthIndex <= 0}
          className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 disabled:opacity-30 transition-all no-print"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
        {CATEGORIES.map((cat) => {
          const c = categoryConfig[cat];
          const count = stats.byCat[cat] ?? 0;
          return (
            <button
              key={cat}
              type="button"
              className={`rounded-xl border p-3 text-center transition-all ${c.bg} ${c.border}`}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? "All" : cat)
              }
            >
              <p className={`text-lg font-bold ${c.text}`}>{count}</p>
              <p className={`text-[10px] font-semibold ${c.text} opacity-80`}>
                {c.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* Highlights Banner */}
      {!quickRevision && (
        <button
          type="button"
          className="w-full rounded-xl border p-4 mb-5 text-left transition-all no-print"
          style={
            activeCategory === "Highlights"
              ? { background: "#0F3554", borderColor: "#0F3554" }
              : { background: "#EEF3F8", borderColor: "#CBD9E6" }
          }
          onClick={() =>
            setActiveCategory(
              activeCategory === "Highlights" ? "All" : "Highlights",
            )
          }
        >
          <div className="flex items-center gap-2">
            <Star
              size={15}
              className={
                activeCategory === "Highlights"
                  ? "text-yellow-300"
                  : "text-yellow-500"
              }
            />
            <span
              className={`text-sm font-bold ${activeCategory === "Highlights" ? "text-white" : "text-[#0F3554]"}`}
            >
              Important Highlights
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold ml-auto ${
                activeCategory === "Highlights"
                  ? "bg-white/20 text-white"
                  : "bg-white text-[#0F3554]"
              }`}
            >
              {highlights.length} key news
            </span>
          </div>
          <p
            className={`text-[11px] mt-1 ${
              activeCategory === "Highlights"
                ? "text-white/70"
                : "text-gray-500"
            }`}
          >
            One representative story per category &mdash; ideal for last-minute
            revision.
          </p>
        </button>
      )}

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 no-print">
        {(["All", ...CATEGORIES] as Array<Category | "All">).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={[
              "text-xs font-semibold px-3 py-1.5 rounded-full border transition-all",
              activeCategory === cat
                ? "text-white border-transparent"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300",
            ].join(" ")}
            style={activeCategory === cat ? { background: "#0F3554" } : {}}
          >
            {cat !== "All" ? `${cat} (${stats.byCat[cat] ?? 0})` : "All"}
          </button>
        ))}
      </div>

      {/* Print Header */}
      <div className="hidden print:block mb-4">
        <h1 className="text-2xl font-bold" style={{ color: "#0F3554" }}>
          {current.label} &mdash; Current Affairs Summary
        </h1>
        <p className="text-sm text-gray-500">
          {stats.total} items across {stats.days} days
        </p>
        <hr className="mt-3" />
      </div>

      {/* Content */}
      {displayItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <BookOpen size={28} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-gray-400">No items for this filter</p>
        </div>
      ) : quickRevision ? (
        <div className="bg-white rounded-xl border border-gray-100 px-4 py-2">
          <div className="flex items-center gap-2 py-2.5 mb-1 border-b border-gray-100">
            <Zap size={14} style={{ color: "#0F3554" }} />
            <span className="text-sm font-bold" style={{ color: "#0F3554" }}>
              Quick Revision &mdash; {current.label}
            </span>
            <span className="ml-auto text-xs text-gray-400">
              {displayItems.length} items
            </span>
          </div>
          {displayItems.map((item, i) => (
            <RevisionItem key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {displayItems.map((item) => (
            <DetailItem key={item.id} item={item} />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-6 no-print">
        Daily data is preserved &mdash; this view only summarizes by month.
      </p>
    </div>
  );
}
