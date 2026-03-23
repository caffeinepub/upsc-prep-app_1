import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Grid3X3,
  Send,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface CBTQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

interface CBTExamInterfaceProps {
  testName: string;
  questions: CBTQuestion[];
  initialAnswers?: Record<number, number>;
  initialMarked?: number[];
  initialTimeLeft?: number;
  initialCurrentIndex?: number;
  initialVisited?: number[];
  onCurrentIndexChange?: (idx: number) => void;
  onAnswerChange?: (answers: Record<number, number>) => void;
  onVisitedChange?: (visited: number[]) => void;
  onMarkedChange?: (marked: number[]) => void;
  onTimeChange?: (timeLeft: number) => void;
  onSubmit: (
    answers: Record<number, number>,
    markedForReview: Set<number>,
    timeLeft: number,
  ) => void;
  onExit: () => void;
}

// Section definitions
const SECTIONS = [
  {
    key: "legal",
    label: "Legal",
    fullName: "Legal Aptitude",
    start: 0,
    end: 59,
    color: "#2563EB",
    bg: "bg-blue-600",
    light: "bg-blue-50 text-blue-700",
    border: "border-blue-600",
  },
  {
    key: "gk",
    label: "GK",
    fullName: "GK & Current Affairs",
    start: 60,
    end: 89,
    color: "#059669",
    bg: "bg-emerald-600",
    light: "bg-emerald-50 text-emerald-700",
    border: "border-emerald-600",
  },
  {
    key: "mental",
    label: "Mental",
    fullName: "Mental Ability",
    start: 90,
    end: 119,
    color: "#7C3AED",
    bg: "bg-violet-600",
    light: "bg-violet-50 text-violet-700",
    border: "border-violet-600",
  },
] as const;

function getSectionForIndex(idx: number) {
  return SECTIONS.find((s) => idx >= s.start && idx <= s.end) ?? SECTIONS[0];
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

type PaletteState = "not-visited" | "answered" | "not-answered" | "marked";

function getPaletteState(
  idx: number,
  answers: Record<number, number>,
  marked: Set<number>,
  visited: Set<number>,
): PaletteState {
  if (marked.has(idx)) return "marked";
  if (answers[idx] !== undefined) return "answered";
  if (visited.has(idx)) return "not-answered";
  return "not-visited";
}

const PALETTE_CLASSES: Record<PaletteState, string> = {
  "not-visited": "bg-gray-200 text-gray-500",
  answered: "bg-green-500 text-white",
  "not-answered": "bg-red-500 text-white",
  marked: "bg-yellow-400 text-gray-800",
};

export function CBTExamInterface({
  testName,
  questions,
  initialAnswers = {},
  initialMarked = [],
  initialTimeLeft = 90 * 60,
  onAnswerChange,
  onVisitedChange,
  onMarkedChange,
  onTimeChange,
  initialCurrentIndex,
  initialVisited,
  onCurrentIndexChange,
  onSubmit,
  onExit,
}: CBTExamInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(initialCurrentIndex ?? 0);
  const [answers, setAnswers] =
    useState<Record<number, number>>(initialAnswers);
  const [marked, setMarked] = useState<Set<number>>(new Set(initialMarked));
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [visited, setVisited] = useState<Set<number>>(
    () => new Set([...(initialVisited ?? []), initialCurrentIndex ?? 0]),
  );
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const hasSubmitted = useRef(false);
  const onSubmitRef = useRef(onSubmit);
  onSubmitRef.current = onSubmit;
  const onTimeChangeRef = useRef(onTimeChange);
  onTimeChangeRef.current = onTimeChange;

  const currentSection = getSectionForIndex(currentIndex);

  // Section progress stats
  const sectionStats = useMemo(() => {
    return SECTIONS.map((sec) => {
      const total = Math.min(sec.end, questions.length - 1) - sec.start + 1;
      const answeredCount = Array.from(
        { length: total },
        (_, i) => sec.start + i,
      ).filter((i) => answers[i] !== undefined).length;
      return { ...sec, total: Math.max(0, total), answered: answeredCount };
    });
  }, [answers, questions.length]);

  // Lock body scroll and fix iOS viewport height
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Request fullscreen on mount
  useEffect(() => {
    const el = document.documentElement as any;
    try {
      if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } catch {}
    return () => {
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      } catch {}
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        onTimeChangeRef.current?.(next);
        if (next <= 0) {
          clearInterval(timer);
          if (!hasSubmitted.current) {
            hasSubmitted.current = true;
            setTimeout(() => {
              setAnswers((a) => {
                setMarked((m) => {
                  try {
                    if (document.fullscreenElement && document.exitFullscreen)
                      document.exitFullscreen().catch(() => {});
                  } catch {}
                  onSubmitRef.current(a, m, 0);
                  return m;
                });
                return a;
              });
            }, 0);
          }
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Warn before leaving while exam is active
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasSubmitted.current) return;
      e.preventDefault();
      e.returnValue =
        "Your test is in progress. Are you sure you want to leave?";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      setCurrentIndex(idx);
      onCurrentIndexChange?.(idx);
      setVisited((prev) => {
        const next = new Set(prev);
        next.add(idx);
        return next;
      });
    },
    [onCurrentIndexChange],
  );

  const goToSection = useCallback(
    (sec: (typeof SECTIONS)[number]) => {
      goTo(sec.start);
    },
    [goTo],
  );

  const handleAnswer = useCallback(
    (optIdx: number) => {
      setAnswers((prev) => {
        const next = { ...prev, [currentIndex]: optIdx };
        onAnswerChange?.(next);
        return next;
      });
      setVisited((prev) => {
        if (prev.has(currentIndex)) return prev;
        const next = new Set(prev);
        next.add(currentIndex);
        onVisitedChange?.(Array.from(next));
        return next;
      });
    },
    [currentIndex, onAnswerChange, onVisitedChange],
  );

  const toggleMarked = useCallback(() => {
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) next.delete(currentIndex);
      else next.add(currentIndex);
      onMarkedChange?.(Array.from(next));
      return next;
    });
  }, [currentIndex, onMarkedChange]);

  const handleSubmit = useCallback(() => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    try {
      if (document.fullscreenElement && document.exitFullscreen)
        document.exitFullscreen().catch(() => {});
    } catch {}
    onSubmit(answers, marked, timeLeft);
  }, [answers, marked, timeLeft, onSubmit]);

  const handleExitConfirm = useCallback(() => {
    try {
      if (document.fullscreenElement && document.exitFullscreen)
        document.exitFullscreen().catch(() => {});
    } catch {}
    onExit();
  }, [onExit]);

  const q = questions[currentIndex];
  const timeCritical = timeLeft < 5 * 60;
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;
  const isMarked = marked.has(currentIndex);
  const answered = Object.keys(answers).length;
  const markedCount = marked.size;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-white"
      style={{ height: "100dvh" }}
      data-ocid="cbt_exam.panel"
    >
      {/* TOP BAR */}
      <header
        className="flex items-center gap-2 px-3 sm:px-5 py-2.5 shadow-md flex-shrink-0"
        style={{ background: "#0F3554", color: "white" }}
      >
        <Button
          data-ocid="cbt_exam.close_button"
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 p-0 flex-shrink-0"
          onClick={() => setShowExitDialog(true)}
        >
          <X size={16} />
        </Button>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{testName}</p>
          <p className="text-xs text-white/60 hidden sm:block">
            Q {currentIndex + 1} / {questions.length} · {answered} answered
          </p>
        </div>

        <div
          className={cn(
            "flex items-center gap-1.5 font-mono text-sm font-bold px-3 py-1.5 rounded-lg flex-shrink-0",
            timeCritical ? "bg-red-600 text-white" : "bg-white/15 text-white",
          )}
        >
          <Clock size={14} />
          {formatTime(timeLeft)}
        </div>

        {/* Mobile Submit Button — always visible */}
        <Button
          data-ocid="cbt_exam.submit_button"
          variant="ghost"
          size="sm"
          className="text-white bg-green-600 hover:bg-green-700 h-8 px-2 flex-shrink-0 md:hidden"
          onClick={() => setShowSubmitDialog(true)}
        >
          <Send size={14} />
          <span className="ml-1 text-xs font-semibold">Submit</span>
        </Button>

        <Button
          data-ocid="cbt_exam.toggle"
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 p-0 flex-shrink-0 md:hidden"
          onClick={() => setPaletteOpen((v) => !v)}
        >
          <Grid3X3 size={16} />
        </Button>
      </header>

      {/* SECTION TABS */}
      <div className="flex-shrink-0 bg-white border-b shadow-sm">
        <div className="flex items-center justify-center gap-0 sm:gap-2 px-2 overflow-hidden">
          {sectionStats.map((sec) => {
            const isActive = currentSection.key === sec.key;
            return (
              <button
                type="button"
                key={sec.key}
                onClick={() => goToSection(sec)}
                className={cn(
                  "relative flex flex-col items-center px-3 sm:px-6 py-2.5 text-[10px] sm:text-sm font-semibold border-b-2 overflow-hidden",
                  isActive
                    ? "border-current"
                    : "border-transparent text-gray-400 hover:text-gray-600",
                )}
                style={
                  isActive ? { color: sec.color, borderColor: sec.color } : {}
                }
              >
                <span className="uppercase tracking-wider">{sec.label}</span>
                <span
                  className={cn(
                    "text-[10px] font-normal mt-0.5",
                    isActive ? "opacity-80" : "text-gray-400",
                  )}
                >
                  {sec.answered}/{sec.total}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION BANNER */}
      <div
        className="flex-shrink-0 px-4 py-1.5 text-xs font-medium text-white/90"
        style={{ background: currentSection.color }}
      >
        You are in {currentSection.fullName} section &nbsp;&bull;&nbsp; Q
        {currentIndex + 1} of {questions.length}
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Question Panel */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
          <div key={currentIndex} className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge
                className="text-xs border-0 text-white"
                style={{ background: currentSection.color }}
              >
                {q.subject}
              </Badge>
              <span className="text-xs text-gray-500">
                Question {currentIndex + 1} of {questions.length}
              </span>
              {isMarked && (
                <Badge className="text-xs bg-yellow-100 text-yellow-700 border-0 gap-1">
                  <Flag size={10} /> Marked
                </Badge>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-4">
              <p className="text-base sm:text-lg font-medium leading-relaxed text-gray-900 whitespace-pre-line">
                {q.question}
              </p>
            </div>

            <div className="space-y-2.5" data-ocid="cbt_exam.card">
              {q.options.map((opt, idx) => {
                const selected = answers[currentIndex] === idx;
                return (
                  <button
                    type="button"
                    key={opt}
                    data-ocid={`cbt_exam.radio.${idx + 1}`}
                    onClick={() => handleAnswer(idx)}
                    className={cn(
                      "w-full text-left px-5 py-4 rounded-xl border-2 text-sm flex items-center gap-3",
                      selected
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold flex-shrink-0",
                        selected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-500",
                      )}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span
                      className={cn(
                        "font-medium",
                        selected ? "text-blue-900" : "text-gray-700",
                      )}
                    >
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </main>

        {/* RIGHT: Question Palette (desktop) */}
        <aside className="hidden md:flex flex-col w-64 max-w-[280px] border-l bg-white flex-shrink-0">
          <div className="px-4 pt-4 pb-2 border-b">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Exam Palette
            </p>
            {/* Legend */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] mb-3">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-green-500 inline-block" />{" "}
                Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-red-500 inline-block" />{" "}
                Not Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block" />{" "}
                Flagged
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-gray-200 inline-block" />{" "}
                Not Visited
              </span>
            </div>
            {/* Summary counts */}
            <div className="grid grid-cols-2 gap-1.5 text-xs mb-3">
              <div className="bg-green-50 rounded-lg px-2 py-1.5 text-center">
                <div className="font-bold text-green-700">{answered}</div>
                <div className="text-green-600 text-[10px]">Answered</div>
              </div>
              <div className="bg-red-50 rounded-lg px-2 py-1.5 text-center">
                <div className="font-bold text-red-700">
                  {Math.max(0, visited.size - answered - markedCount)}
                </div>
                <div className="text-red-600 text-[10px]">Not Answered</div>
              </div>
              <div className="bg-yellow-50 rounded-lg px-2 py-1.5 text-center">
                <div className="font-bold text-yellow-700">{markedCount}</div>
                <div className="text-yellow-600 text-[10px]">Flagged</div>
              </div>
              <div className="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
                <div className="font-bold text-gray-600">
                  {questions.length - visited.size}
                </div>
                <div className="text-gray-500 text-[10px]">Not Visited</div>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-3">
            {/* Section-grouped palette */}
            {sectionStats.map((sec) => {
              if (sec.total === 0) return null;
              return (
                <div key={sec.key} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: sec.color }}
                    >
                      {sec.fullName}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {sec.answered} / {sec.total}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {Array.from(
                      { length: sec.total },
                      (_, i) => sec.start + i,
                    ).map((idx) => {
                      const state = getPaletteState(
                        idx,
                        answers,
                        marked,
                        visited,
                      );
                      const isCurrent = idx === currentIndex;
                      return (
                        <button
                          type="button"
                          key={idx}
                          data-ocid={`cbt_exam.item.${idx + 1}`}
                          onClick={() => goTo(idx)}
                          className={cn(
                            "w-10 h-10 rounded-lg text-xs font-semibold",
                            PALETTE_CLASSES[state],
                            isCurrent &&
                              "ring-2 ring-offset-1 ring-offset-white",
                          )}
                          style={
                            isCurrent
                              ? {
                                  boxShadow: `0 0 0 2px white, 0 0 0 4px ${sec.color}`,
                                }
                              : {}
                          }
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </ScrollArea>

          <div className="p-3 border-t">
            <Button
              data-ocid="cbt_exam.submit_button"
              className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
              size="sm"
              onClick={() => setShowSubmitDialog(true)}
            >
              <Send size={14} /> Submit Test
            </Button>
          </div>
        </aside>
      </div>

      {/* BOTTOM BAR */}
      <footer
        className="flex-shrink-0 flex items-center justify-between gap-2 px-5 py-3 bg-white border-t shadow-sm"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
        }}
      >
        <Button
          data-ocid="cbt_exam.pagination_prev"
          variant="outline"
          size="sm"
          disabled={isFirst}
          onClick={() => goTo(currentIndex - 1)}
          className="gap-1"
        >
          <ChevronLeft size={15} /> Previous
        </Button>

        <Button
          data-ocid="cbt_exam.toggle"
          variant={isMarked ? "default" : "outline"}
          size="sm"
          onClick={toggleMarked}
          className={cn(
            "gap-1.5",
            isMarked
              ? "bg-yellow-400 hover:bg-yellow-500 text-gray-800 border-yellow-400"
              : "border-yellow-300 text-yellow-700 hover:bg-yellow-50",
          )}
        >
          <Flag size={13} />
          <span className="hidden sm:inline">
            {isMarked ? "Unmark" : "Mark for Review"}
          </span>
          <span className="sm:hidden">{isMarked ? "Unmark" : "Mark"}</span>
        </Button>

        {isLast ? (
          <Button
            data-ocid="cbt_exam.submit_button"
            size="sm"
            className="gap-1.5 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setShowSubmitDialog(true)}
          >
            <Send size={13} /> Submit
          </Button>
        ) : (
          <Button
            data-ocid="cbt_exam.pagination_next"
            size="sm"
            className="gap-1 text-white"
            style={{ background: currentSection.color }}
            onClick={() => goTo(currentIndex + 1)}
          >
            Next <ChevronRight size={15} />
          </Button>
        )}
      </footer>

      {/* Mobile Palette Bottom Sheet */}
      {paletteOpen && (
        <div
          data-ocid="cbt_exam.modal"
          aria-modal="true"
          aria-label="Question palette overlay"
          className="fixed inset-0 z-[10000] bg-black/50 md:hidden"
          onClick={() => setPaletteOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setPaletteOpen(false)}
        >
          <div
            role="presentation"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[75vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">
                Exam Palette
              </p>
              <Button
                data-ocid="cbt_exam.close_button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setPaletteOpen(false)}
              >
                <X size={14} />
              </Button>
            </div>

            <div className="flex gap-3 flex-wrap text-[11px] mb-3">
              {(
                [
                  ["not-visited", "Not Visited"],
                  ["answered", "Answered"],
                  ["not-answered", "Not Answered"],
                  ["marked", "Flagged"],
                ] as [PaletteState, string][]
              ).map(([state, label]) => (
                <span key={state} className="flex items-center gap-1">
                  <span
                    className={cn("w-3 h-3 rounded-sm", PALETTE_CLASSES[state])}
                  />
                  {label}
                </span>
              ))}
            </div>

            <div className="overflow-y-auto space-y-4 flex-1">
              {sectionStats.map((sec) => {
                if (sec.total === 0) return null;
                return (
                  <div key={sec.key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-[10px] font-bold uppercase"
                        style={{ color: sec.color }}
                      >
                        {sec.fullName}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {sec.answered}/{sec.total}
                      </span>
                    </div>
                    <div className="grid grid-cols-8 gap-1.5">
                      {Array.from(
                        { length: sec.total },
                        (_, i) => sec.start + i,
                      ).map((idx) => {
                        const state = getPaletteState(
                          idx,
                          answers,
                          marked,
                          visited,
                        );
                        return (
                          <button
                            type="button"
                            key={idx}
                            data-ocid={`cbt_exam.item.${idx + 1}`}
                            onClick={() => {
                              goTo(idx);
                              setPaletteOpen(false);
                            }}
                            className={cn(
                              "w-9 h-9 rounded-lg text-xs font-semibold",
                              PALETTE_CLASSES[state],
                              idx === currentIndex &&
                                "ring-2 ring-offset-1 ring-[#0F3554]",
                            )}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit from palette */}
            <div className="pt-3 border-t mt-3">
              <Button
                data-ocid="cbt_exam.submit_button"
                className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
                size="sm"
                onClick={() => {
                  setPaletteOpen(false);
                  setShowSubmitDialog(true);
                }}
              >
                <Send size={14} /> Submit Test ({answered}/{questions.length}{" "}
                answered)
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent data-ocid="cbt_exam.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit? Your progress may be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="cbt_exam.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="cbt_exam.confirm_button"
              className="bg-red-600 hover:bg-red-700"
              onClick={handleExitConfirm}
            >
              Exit Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent data-ocid="cbt_exam.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {answered} of {questions.length} questions.
              Submit now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="cbt_exam.cancel_button">
              Review More
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="cbt_exam.confirm_button"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSubmit}
            >
              Submit Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
