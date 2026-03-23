import { BookOpen, ChevronDown, Newspaper, Star, X, Zap } from "lucide-react";
import { useState } from "react";
import {
  type Category,
  type DailyAffairs,
  type NewsItem,
  type NewsTag,
  currentAffairsData,
} from "../../data/currentAffairsData";

const categoryConfig: Record<Category, { label: string; className: string }> = {
  National: {
    label: "National",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  International: {
    label: "International",
    className: "bg-purple-50 text-purple-700 border border-purple-200",
  },
  Economy: {
    label: "Economy",
    className: "bg-green-50 text-green-700 border border-green-200",
  },
  Legal: {
    label: "Legal",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  "Awards/Sports": {
    label: "Awards/Sports",
    className: "bg-pink-50 text-pink-700 border border-pink-200",
  },
};

// Reference date for time filters
const REFERENCE_DATE = new Date("2026-03-22");

type TimeFilter = "today" | "this-week" | "this-month" | "all";

function TagBadges({ tags }: { tags?: NewsTag[] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <span className="flex flex-wrap gap-1 mt-1.5">
      {tags.includes("most-important") && (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          <Star size={9} className="fill-amber-500 text-amber-500" />
          Most Important
        </span>
      )}
      {tags.includes("exam-likely") && (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
          <BookOpen size={9} />
          Exam Likely
        </span>
      )}
    </span>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  const [expanded, setExpanded] = useState(false);
  const cat = categoryConfig[item.category];

  return (
    <div
      className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-shadow hover:shadow-sm"
      data-ocid="current_affairs.card"
    >
      <button
        type="button"
        className="w-full text-left px-5 py-4 flex items-start gap-3"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        data-ocid="current_affairs.toggle"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 leading-snug">
            {item.title}
          </p>
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span
              className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cat.className}`}
            >
              {cat.label}
            </span>
            {item.tags?.includes("most-important") && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                <Star size={9} className="fill-amber-500 text-amber-500" />
                Most Important
              </span>
            )}
            {item.tags?.includes("exam-likely") && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                <BookOpen size={9} />
                Exam Likely
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 mt-1 text-gray-400 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {expanded && (
        <div className="px-5 pb-4 border-t border-gray-50">
          <p className="text-sm text-gray-600 leading-relaxed pt-3">
            {item.summary}
          </p>
        </div>
      )}
    </div>
  );
}

function QuickRevisionCard({ item }: { item: NewsItem }) {
  const cat = categoryConfig[item.category];
  return (
    <div
      className="bg-white border border-gray-100 rounded-xl px-4 py-3 hover:shadow-sm transition-shadow"
      data-ocid="current_affairs.card"
    >
      <p className="text-sm font-semibold text-gray-900 leading-snug mb-2">
        {item.title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        <span
          className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cat.className}`}
        >
          {cat.label}
        </span>
        <TagBadges tags={item.tags} />
      </div>
    </div>
  );
}

function DateSection({ day }: { day: DailyAffairs }) {
  return (
    <section className="mb-8" data-ocid="current_affairs.section">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="h-5 w-1 rounded-full flex-shrink-0"
          style={{ background: "#0F3554" }}
        />
        <h2 className="text-base font-bold" style={{ color: "#0F3554" }}>
          {day.displayDate}
        </h2>
        <span className="text-xs text-gray-400 font-medium">
          {day.items.length} items
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {day.items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export function DailyCurrentAffairsPage() {
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [tagFilters, setTagFilters] = useState<Set<NewsTag>>(new Set());
  const [quickRevision, setQuickRevision] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const categories: Array<Category | "All"> = [
    "All",
    "National",
    "International",
    "Economy",
    "Legal",
    "Awards/Sports",
  ];

  const timeFilters: Array<{ key: TimeFilter; label: string }> = [
    { key: "today", label: "Today" },
    { key: "this-week", label: "This Week" },
    { key: "this-month", label: "This Month" },
    { key: "all", label: "All Time" },
  ];

  function toggleTag(tag: NewsTag) {
    setTagFilters((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function dateInRange(dateStr: string): boolean {
    // Date selector takes priority over time filter
    if (selectedDate) {
      return dateStr === selectedDate;
    }
    const d = new Date(dateStr);
    if (timeFilter === "today") {
      return dateStr === "2026-03-22";
    }
    if (timeFilter === "this-week") {
      const diff =
        (REFERENCE_DATE.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff < 7;
    }
    if (timeFilter === "this-month") {
      return (
        d.getFullYear() === REFERENCE_DATE.getFullYear() &&
        d.getMonth() === REFERENCE_DATE.getMonth()
      );
    }
    return true;
  }

  function itemMatchesTags(item: NewsItem): boolean {
    if (tagFilters.size === 0) return true;
    return [...tagFilters].every((tag) => item.tags?.includes(tag));
  }

  // Quick Revision: items tagged most-important OR exam-likely
  const quickRevisionItems: Array<{ item: NewsItem; date: string }> =
    currentAffairsData.flatMap((day) =>
      day.items
        .filter(
          (item) => item.tags && item.tags.length > 0 && dateInRange(day.date),
        )
        .map((item) => ({ item, date: day.displayDate })),
    );

  const filteredData: DailyAffairs[] = currentAffairsData
    .filter((day) => dateInRange(day.date))
    .map((day) => ({
      ...day,
      items: day.items.filter(
        (item) =>
          (filterCategory === "All" || item.category === filterCategory) &&
          itemMatchesTags(item),
      ),
    }))
    .filter((day) => day.items.length > 0);

  return (
    <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#0F3554" }}
            >
              <Newspaper size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "#0F3554" }}>
                Daily Current Affairs
              </h1>
              <p className="text-xs text-gray-500">
                Stay updated with important news for TS LAWCET
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setQuickRevision((v) => !v)}
            data-ocid="current_affairs.toggle"
            className={[
              "flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-all",
              quickRevision
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white text-amber-700 border-amber-300 hover:bg-amber-50",
            ].join(" ")}
          >
            <Zap size={13} />
            Quick Revision
          </button>
        </div>
      </div>

      {/* Quick Revision Mode Banner */}
      {quickRevision && (
        <div
          className="mb-5 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-center justify-between gap-3"
          data-ocid="current_affairs.panel"
        >
          <div className="flex items-center gap-2">
            <Zap size={15} className="text-amber-600 flex-shrink-0" />
            <p className="text-sm font-semibold text-amber-800">
              Quick Revision Mode —{" "}
              <span className="font-normal text-amber-700">
                showing tagged items only ({quickRevisionItems.length} items)
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setQuickRevision(false)}
            className="text-amber-600 hover:text-amber-800 flex-shrink-0"
            data-ocid="current_affairs.close_button"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Filters — hidden in Quick Revision mode */}
      {!quickRevision && (
        <div className="space-y-3 mb-6">
          {/* Row 1: Time filters + Date picker */}
          <div
            className="flex flex-wrap items-center gap-2"
            data-ocid="current_affairs.filter.tab"
          >
            {timeFilters.map((tf) => (
              <button
                key={tf.key}
                type="button"
                onClick={() => {
                  setTimeFilter(tf.key);
                  setSelectedDate("");
                }}
                className={[
                  "text-xs font-semibold px-3 py-1.5 rounded-full border transition-all",
                  timeFilter === tf.key && !selectedDate
                    ? "text-white border-transparent"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700",
                ].join(" ")}
                style={
                  timeFilter === tf.key && !selectedDate
                    ? { background: "#0F3554", borderColor: "#0F3554" }
                    : {}
                }
              >
                {tf.label}
              </button>
            ))}

            {/* Date picker */}
            <div className="flex items-center gap-1 ml-1">
              <div className="relative flex items-center">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  data-ocid="current_affairs.input"
                  className="text-xs font-medium px-3 py-1.5 rounded-full border bg-white text-gray-700 focus:outline-none transition-colors"
                  style={{
                    borderColor: selectedDate ? "#0F3554" : undefined,
                    boxShadow: selectedDate ? "0 0 0 1px #0F3554" : undefined,
                    paddingRight: selectedDate ? "1.75rem" : undefined,
                  }}
                  placeholder="Pick a date"
                />
                {selectedDate && (
                  <button
                    type="button"
                    onClick={() => setSelectedDate("")}
                    data-ocid="current_affairs.close_button"
                    className="absolute right-2 text-gray-400 hover:text-gray-700 transition-colors"
                    aria-label="Clear date filter"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Category filters */}
          <div
            className="flex flex-wrap gap-2"
            data-ocid="current_affairs.filter.tab"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={[
                  "text-xs font-semibold px-3 py-1.5 rounded-full border transition-all",
                  filterCategory === cat
                    ? "text-white border-transparent"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700",
                ].join(" ")}
                style={
                  filterCategory === cat
                    ? { background: "#0F3554", borderColor: "#0F3554" }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Row 3: Tag filters */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => toggleTag("most-important")}
              data-ocid="current_affairs.toggle"
              className={[
                "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all",
                tagFilters.has("most-important")
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white text-amber-700 border-amber-200 hover:bg-amber-50",
              ].join(" ")}
            >
              <Star
                size={11}
                className={
                  tagFilters.has("most-important")
                    ? "fill-white text-white"
                    : "fill-amber-500 text-amber-500"
                }
              />
              Most Important
            </button>
            <button
              type="button"
              onClick={() => toggleTag("exam-likely")}
              data-ocid="current_affairs.toggle"
              className={[
                "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all",
                tagFilters.has("exam-likely")
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50",
              ].join(" ")}
            >
              <BookOpen size={11} />
              Exam Likely
            </button>
          </div>

          {/* Active date filter pill */}
          {selectedDate && (
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                style={{ background: "#0F3554" }}
              >
                Showing: {selectedDate}
                <button
                  type="button"
                  onClick={() => setSelectedDate("")}
                  className="ml-0.5 hover:opacity-75 transition-opacity"
                  aria-label="Clear date"
                >
                  <X size={11} />
                </button>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Quick Revision Content */}
      {quickRevision ? (
        quickRevisionItems.length === 0 ? (
          <div
            className="text-center py-16 bg-white rounded-2xl border border-gray-100"
            data-ocid="current_affairs.empty_state"
          >
            <Zap size={32} className="mx-auto text-amber-300 mb-3" />
            <p className="text-sm font-medium text-gray-500">
              No tagged items found
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {quickRevisionItems.map(({ item }) => (
              <QuickRevisionCard key={item.id} item={item} />
            ))}
          </div>
        )
      ) : (
        /* Normal Content */
        <>
          {filteredData.length === 0 ? (
            <div
              className="text-center py-16 bg-white rounded-2xl border border-gray-100"
              data-ocid="current_affairs.empty_state"
            >
              <Newspaper size={32} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm font-medium text-gray-500">
                No items found for selected filters
              </p>
            </div>
          ) : (
            filteredData.map((day) => <DateSection key={day.date} day={day} />)
          )}
        </>
      )}

      {/* Footer note */}
      <p className="text-center text-xs text-gray-400 mt-4">
        Data is stored date-wise. Previous days are never overwritten.
      </p>
    </div>
  );
}
