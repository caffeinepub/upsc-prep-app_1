import { Button } from "@/components/ui/button";
import { useState } from "react";
import { currentAffairsData } from "../../data/currentAffairsData";
import type { AffairsMCQ } from "../../data/currentAffairsMCQData";
import { getMCQDates, getMCQsByDate } from "../../data/currentAffairsMCQData";

const CATEGORY_COLOR: Record<string, string> = {
  Legal: "bg-blue-50 text-blue-700 border-blue-200",
  National: "bg-green-50 text-green-700 border-green-200",
  International: "bg-purple-50 text-purple-700 border-purple-200",
  Economy: "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Awards/Sports": "bg-orange-50 text-orange-700 border-orange-200",
};

const OPTION_LABELS = ["A", "B", "C", "D"];

function MCQCard({ mcq }: { mcq: AffairsMCQ }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleOption = (opt: string) => {
    if (revealed) return;
    setSelected(opt);
  };

  const handleSubmit = () => {
    if (selected) setRevealed(true);
  };

  const getOptionStyle = (opt: string) => {
    const base =
      "w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors cursor-pointer ";
    if (!revealed) {
      return `${base}${
        selected === opt
          ? "bg-[#0F3554] text-white border-[#0F3554]"
          : "bg-white text-gray-700 border-gray-200 hover:border-[#0F3554] hover:bg-blue-50"
      }`;
    }
    if (opt === mcq.answer) {
      return `${base}bg-green-50 text-green-800 border-green-400 font-semibold`;
    }
    if (opt === selected && opt !== mcq.answer) {
      return `${base}bg-red-50 text-red-700 border-red-300`;
    }
    return `${base}bg-white text-gray-400 border-gray-100`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
            CATEGORY_COLOR[mcq.category] ?? "bg-gray-50 text-gray-600"
          }`}
        >
          {mcq.category}
        </span>
        {revealed && (
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              selected === mcq.answer
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {selected === mcq.answer ? "Correct" : "Incorrect"}
          </span>
        )}
      </div>

      {/* Question */}
      <p className="text-gray-900 font-medium text-sm leading-relaxed">
        {mcq.question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {mcq.options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            className={getOptionStyle(opt)}
            onClick={() => handleOption(opt)}
          >
            <span className="font-bold mr-2 text-xs text-gray-400">
              {OPTION_LABELS[i]}.
            </span>
            {opt}
          </button>
        ))}
      </div>

      {/* Submit / Explanation */}
      {!revealed ? (
        <Button
          size="sm"
          disabled={!selected}
          onClick={handleSubmit}
          className="self-start"
          style={{ background: "#0F3554" }}
        >
          Submit Answer
        </Button>
      ) : (
        <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
          <p className="text-xs font-semibold text-blue-700 mb-1">
            Explanation
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {mcq.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

function getDisplayDate(dateStr: string): string {
  const found = currentAffairsData.find((d) => d.date === dateStr);
  if (found) return found.displayDate;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function CurrentAffairsMCQPage() {
  const dates = getMCQDates();
  const [activeDate, setActiveDate] = useState<string>(dates[0] ?? "");

  const mcqs = getMCQsByDate(activeDate);

  // Count categories for active date
  const categoryCount: Record<string, number> = {};
  for (const q of mcqs) {
    categoryCount[q.category] = (categoryCount[q.category] ?? 0) + 1;
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-1" style={{ color: "#0F3554" }}>
          Current Affairs MCQs
        </h1>
        <p className="text-sm text-gray-500">
          LAWCET-level MCQs generated from daily current affairs. Practice daily
          to stay ahead.
        </p>
      </div>

      {/* Date selector */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Select Date
        </p>
        <div className="flex flex-wrap gap-2">
          {dates.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDate(d)}
              className={[
                "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors",
                activeDate === d
                  ? "border-[#0F3554] text-white"
                  : "border-gray-200 text-gray-600 bg-white hover:border-[#0F3554] hover:text-[#0F3554]",
              ].join(" ")}
              style={activeDate === d ? { background: "#0F3554" } : {}}
            >
              {new Date(d).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </button>
          ))}
        </div>
      </div>

      {/* Active date header */}
      {activeDate && (
        <div
          className="rounded-xl p-4 mb-5 flex items-center justify-between flex-wrap gap-3"
          style={{ background: "oklch(0.93 0.04 243)" }}
        >
          <div>
            <p className="font-bold text-sm" style={{ color: "#0F3554" }}>
              {getDisplayDate(activeDate)}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {mcqs.length} MCQ{mcqs.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(categoryCount).map(([cat, count]) => (
              <span
                key={cat}
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  CATEGORY_COLOR[cat] ?? "bg-gray-50 text-gray-600"
                }`}
              >
                {cat}: {count}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* MCQ cards */}
      {mcqs.length === 0 ? (
        <div className="text-center text-gray-400 py-16">
          No MCQs available for this date yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {mcqs.map((mcq, idx) => (
            <div key={mcq.id}>
              <p className="text-xs text-gray-400 font-semibold mb-1.5">
                Q{idx + 1}
              </p>
              <MCQCard mcq={mcq} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
