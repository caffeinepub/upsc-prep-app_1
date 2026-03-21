import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface Category {
  id: string;
  label: string;
  cards: Flashcard[];
}

const CATEGORIES: Category[] = [
  {
    id: "legal-aptitude",
    label: "Legal Aptitude",
    cards: [
      {
        id: "la-0",
        front: "What is a contract?",
        back: "An agreement enforceable by law.",
      },
      {
        id: "la-1",
        front: "What is free consent?",
        back: "Consent not caused by coercion, fraud, misrepresentation, or mistake.",
      },
      {
        id: "la-2",
        front: "What is tort?",
        back: "A civil wrong causing harm or loss.",
      },
      {
        id: "la-3",
        front: "What is negligence?",
        back: "Failure to take reasonable care resulting in damage.",
      },
      {
        id: "la-4",
        front: "What is defamation?",
        back: "False statement harming someone's reputation.",
      },
      {
        id: "la-5",
        front: "What is nuisance?",
        back: "Unlawful interference with use of land.",
      },
      {
        id: "la-6",
        front: 'Meaning of "Actus Non Facit Reum Nisi Mens Sit Rea"',
        back: "An act is not guilty unless done with a guilty mind.",
      },
      {
        id: "la-7",
        front: "What is consideration?",
        back: "Something of value exchanged in a contract.",
      },
      {
        id: "la-8",
        front: "What is void agreement?",
        back: "Agreement not enforceable by law.",
      },
      {
        id: "la-9",
        front: "Fundamental Rights are in which part of Constitution?",
        back: "Part III",
      },
    ],
  },
  {
    id: "gk-current-affairs",
    label: "GK & Current Affairs",
    cards: [
      {
        id: "gk-0",
        front: "Who is the President of India?",
        back: "Droupadi Murmu",
      },
      {
        id: "gk-1",
        front: "When did Indian Constitution come into force?",
        back: "26 January 1950",
      },
      {
        id: "gk-2",
        front: "Capital of Telangana?",
        back: "Hyderabad",
      },
      {
        id: "gk-3",
        front: "G20 Summit 2023 host country?",
        back: "India",
      },
      {
        id: "gk-4",
        front: "Who is known as Father of Nation?",
        back: "Mahatma Gandhi",
      },
    ],
  },
  {
    id: "mental-ability",
    label: "Mental Ability",
    cards: [
      {
        id: "ma-0",
        front: "What is analogy?",
        back: "Relationship between two pairs of words/numbers.",
      },
      {
        id: "ma-1",
        front: "What is coding-decoding?",
        back: "Converting words/numbers using a pattern.",
      },
      {
        id: "ma-2",
        front: "What is number series?",
        back: "Sequence following a pattern.",
      },
      {
        id: "ma-3",
        front: "What is blood relation?",
        back: "Questions based on family relationships.",
      },
      {
        id: "ma-4",
        front: "What is direction sense?",
        back: "Determining direction after movements.",
      },
    ],
  },
];

type Mark = "known" | "revise" | null;
type Marks = Record<string, Mark>;

const STORAGE_KEY = "tslawcet_flashcard_marks";

function loadMarks(): Marks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveMarks(marks: Marks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
}

export function FlashcardsPage() {
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [marks, setMarks] = useState<Marks>(loadMarks);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);

  const category = CATEGORIES.find((c) => c.id === categoryId)!;
  const card = category.cards[index];
  const cardMark = marks[card.id] ?? null;

  const knownCount = category.cards.filter(
    (c) => marks[c.id] === "known",
  ).length;
  const progressPct = Math.round((knownCount / category.cards.length) * 100);

  const goTo = useCallback((nextIndex: number, dir: 1 | -1) => {
    setSlideDir(dir);
    setIndex(nextIndex);
    setFlipped(false);
  }, []);

  const handlePrev = () => {
    if (index > 0) goTo(index - 1, -1);
  };

  const handleNext = () => {
    if (index < category.cards.length - 1) goTo(index + 1, 1);
  };

  const handleMark = (mark: "known" | "revise") => {
    const newMarks = { ...marks, [card.id]: cardMark === mark ? null : mark };
    setMarks(newMarks);
    saveMarks(newMarks);
  };

  const handleCategoryChange = (id: string) => {
    setCategoryId(id);
    setIndex(0);
    setFlipped(false);
  };

  const handleReset = () => {
    const newMarks = { ...marks };
    for (const c of category.cards) {
      delete newMarks[c.id];
    }
    setMarks(newMarks);
    saveMarks(newMarks);
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: "oklch(var(--navy))" }}
        >
          Flashcards
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Quick revision for TS LAWCET — flip to reveal, mark your confidence.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-5" data-ocid="flashcards.tab">
        {CATEGORIES.map((cat) => {
          const catKnown = cat.cards.filter(
            (c) => marks[c.id] === "known",
          ).length;
          const isActive = cat.id === categoryId;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={[
                "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                isActive
                  ? "text-white border-transparent shadow-sm"
                  : "bg-white text-muted-foreground border-border hover:border-primary/50",
              ].join(" ")}
              style={
                isActive
                  ? { background: "oklch(var(--navy))", color: "white" }
                  : {}
              }
            >
              {cat.label}
              <span
                className="ml-2 text-xs rounded-full px-1.5 py-0.5"
                style={
                  isActive
                    ? { background: "rgba(255,255,255,0.2)", color: "white" }
                    : {
                        background: "oklch(var(--muted))",
                        color: "oklch(var(--muted-foreground))",
                      }
                }
              >
                {catKnown}/{cat.cards.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-border p-4 mb-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-sm font-medium"
            style={{ color: "oklch(var(--navy))" }}
          >
            {knownCount} / {category.cards.length} Known
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {progressPct}% complete
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
              title="Reset progress for this category"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
        </div>
        <Progress value={progressPct} className="h-2" />
        <div className="flex gap-4 mt-2">
          <span className="text-xs text-muted-foreground">
            ✓ {knownCount} Known
          </span>
          <span className="text-xs text-muted-foreground">
            ↩ {category.cards.filter((c) => marks[c.id] === "revise").length} To
            Revise
          </span>
          <span className="text-xs text-muted-foreground">
            ○ {category.cards.filter((c) => !marks[c.id]).length} Unseen
          </span>
        </div>
      </div>

      {/* Card */}
      <div
        className="relative mb-5"
        style={{ perspective: "1200px", minHeight: "260px" }}
        data-ocid="flashcards.card"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${categoryId}-${index}`}
            initial={{ x: slideDir * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: slideDir * -60, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Status badge */}
            {cardMark && (
              <div className="absolute top-3 right-3 z-10">
                <Badge
                  className="text-xs font-semibold"
                  style={
                    cardMark === "known"
                      ? {
                          background: "oklch(0.72 0.18 142)",
                          color: "white",
                          border: "none",
                        }
                      : {
                          background: "oklch(0.75 0.18 55)",
                          color: "white",
                          border: "none",
                        }
                  }
                >
                  {cardMark === "known" ? "✓ Known" : "↩ Revise"}
                </Badge>
              </div>
            )}

            {/* Flip card container */}
            <button
              type="button"
              className="relative cursor-pointer w-full text-left"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.55s cubic-bezier(0.4,0.2,0.2,1)",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                minHeight: "260px",
                background: "transparent",
                border: "none",
                padding: 0,
              }}
              onClick={() => setFlipped((f) => !f)}
              aria-label={
                flipped ? "Click to see question" : "Click to see answer"
              }
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-white rounded-2xl border border-border shadow-md flex flex-col items-center justify-center p-8 select-none"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "oklch(var(--navy) / 0.4)" }}
                >
                  {category.label}
                </div>
                <p
                  className="text-xl sm:text-2xl font-bold text-center leading-snug"
                  style={{ color: "oklch(var(--navy))" }}
                >
                  {card.front}
                </p>
                <p className="text-xs text-muted-foreground mt-6 flex items-center gap-1">
                  <span className="inline-block w-4 h-4 rounded-full border border-muted-foreground/40 flex items-center justify-center text-[9px]">
                    ↻
                  </span>
                  Click to flip
                </p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl border border-border shadow-md flex flex-col items-center justify-center p-8 select-none"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "oklch(var(--navy))",
                }}
              >
                <div className="text-xs font-semibold uppercase tracking-widest mb-4 text-white/50">
                  Answer
                </div>
                <p className="text-sm sm:text-base font-medium text-center leading-relaxed text-white">
                  {card.back}
                </p>
                <p className="text-xs text-white/40 mt-6 flex items-center gap-1">
                  <span className="inline-block">↻</span> Click to flip back
                </p>
              </div>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation + Mark */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Prev / Counter / Next */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={index === 0}
            data-ocid="flashcards.pagination_prev"
            className="h-9 w-9 rounded-lg"
          >
            <ChevronLeft size={16} />
          </Button>
          <span
            className="text-sm font-semibold tabular-nums"
            style={{ color: "oklch(var(--navy))" }}
          >
            {index + 1} / {category.cards.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={index === category.cards.length - 1}
            data-ocid="flashcards.pagination_next"
            className="h-9 w-9 rounded-lg"
          >
            <ChevronRight size={16} />
          </Button>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-7 bg-border" />

        {/* Mark buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleMark("known")}
            data-ocid="flashcards.known.toggle"
            className={[
              "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border transition-all",
              cardMark === "known"
                ? "text-white border-transparent shadow-sm"
                : "bg-white border-border text-muted-foreground hover:border-green-400",
            ].join(" ")}
            style={
              cardMark === "known"
                ? {
                    background: "oklch(0.65 0.18 142)",
                    borderColor: "transparent",
                  }
                : {}
            }
          >
            <CheckCircle size={14} />
            Known
          </button>
          <button
            type="button"
            onClick={() => handleMark("revise")}
            data-ocid="flashcards.revise.toggle"
            className={[
              "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border transition-all",
              cardMark === "revise"
                ? "text-white border-transparent shadow-sm"
                : "bg-white border-border text-muted-foreground hover:border-amber-400",
            ].join(" ")}
            style={
              cardMark === "revise"
                ? {
                    background: "oklch(0.72 0.18 55)",
                    borderColor: "transparent",
                  }
                : {}
            }
          >
            <RefreshCw size={14} />
            Revise
          </button>
        </div>
      </div>

      {/* Mini card list (quick jump) */}
      <div className="mt-8">
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          All Cards
        </p>
        <div className="flex flex-wrap gap-2" data-ocid="flashcards.list">
          {category.cards.map((c, i) => {
            const m = marks[c.id];
            const isActive = i === index;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => goTo(i, i > index ? 1 : -1)}
                data-ocid={`flashcards.item.${i + 1}`}
                className={[
                  "w-8 h-8 rounded-lg text-xs font-bold border transition-all",
                  isActive ? "ring-2 ring-offset-1" : "",
                  m === "known"
                    ? "border-transparent text-white"
                    : m === "revise"
                      ? "border-transparent text-white"
                      : "bg-white border-border text-muted-foreground hover:border-primary/40",
                ].join(" ")}
                style={{
                  ...(isActive ? { ringColor: "oklch(var(--navy))" } : {}),
                  ...(m === "known"
                    ? { background: "oklch(0.65 0.18 142)" }
                    : {}),
                  ...(m === "revise"
                    ? { background: "oklch(0.72 0.18 55)" }
                    : {}),
                  ...(isActive
                    ? {
                        outline: "2px solid oklch(var(--navy))",
                        outlineOffset: "2px",
                      }
                    : {}),
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
