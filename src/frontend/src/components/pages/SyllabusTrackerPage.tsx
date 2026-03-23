import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  CA_CATEGORIES,
  CA_MONTHS,
  caMonthKey,
  caTopicKey,
} from "@/data/caData";
import {
  SECTIONS,
  parentKey,
  subKey,
  useSyllabusProgress,
} from "@/hooks/useSyllabusProgress";
import { Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

function IndeterminateCheckbox({
  id,
  checked,
  indeterminate,
  onCheckedChange,
  "data-ocid": dataOcid,
}: {
  id: string;
  checked: boolean;
  indeterminate?: boolean;
  onCheckedChange: () => void;
  "data-ocid"?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (ref.current) {
      (ref.current as unknown as HTMLInputElement).indeterminate =
        !!indeterminate;
    }
  }, [indeterminate]);
  return (
    <Checkbox
      ref={ref}
      id={id}
      data-ocid={dataOcid}
      checked={indeterminate ? "indeterminate" : checked}
      onCheckedChange={onCheckedChange}
    />
  );
}

function groupBySection(
  pendingTopics: ReturnType<typeof useSyllabusProgress>["pendingTopics"],
) {
  const map: Record<string, { title: string; items: string[] }> = {};
  for (const pt of pendingTopics) {
    if (!map[pt.sectionId])
      map[pt.sectionId] = { title: pt.sectionTitle, items: [] };
    const label = pt.subtopicLabel
      ? `${pt.topicLabel} → ${pt.subtopicLabel}`
      : pt.topicLabel;
    map[pt.sectionId].items.push(label);
  }
  return Object.entries(map);
}

// Current Affairs Section Component
function CurrentAffairsSection({
  checked,
  toggle,
}: {
  checked: Record<string, boolean>;
  toggle: (key: string) => void;
}) {
  // Overall CA progress
  let caTotal = 0;
  let caDone = 0;
  for (const cat of CA_CATEGORIES) {
    caTotal += cat.topics.length + CA_MONTHS.length;
    for (let i = 0; i < cat.topics.length; i++) {
      if (checked[caTopicKey(cat.id, i)]) caDone += 1;
    }
    for (let m = 0; m < CA_MONTHS.length; m++) {
      if (checked[caMonthKey(cat.id, m)]) caDone += 1;
    }
  }
  const caPercent = caTotal > 0 ? Math.round((caDone / caTotal) * 100) : 0;

  // Monthly completion % (across all categories)
  const totalMonthSlots = CA_CATEGORIES.length * CA_MONTHS.length;
  let doneMonthSlots = 0;
  for (const cat of CA_CATEGORIES) {
    for (let m = 0; m < CA_MONTHS.length; m++) {
      if (checked[caMonthKey(cat.id, m)]) doneMonthSlots += 1;
    }
  }
  const monthPercent =
    totalMonthSlots > 0
      ? Math.round((doneMonthSlots / totalMonthSlots) * 100)
      : 0;

  return (
    <AccordionItem
      value="current_affairs"
      className="border border-border rounded-xl bg-white shadow-card overflow-hidden"
    >
      <AccordionTrigger className="px-5 py-4 hover:no-underline">
        <div className="flex items-center gap-3 flex-1 mr-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
            style={{ background: "oklch(0.90 0.07 55)" }}
          >
            📰
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">
                Current Affairs (Last 12 Months)
              </p>
              <span className="text-xs text-muted-foreground mr-1">
                {caDone}/{caTotal}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <Progress value={caPercent} className="h-1.5 flex-1" />
              <span className="text-xs font-medium text-muted-foreground w-8 text-right">
                {caPercent}%
              </span>
            </div>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-5 pb-5">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 pt-1">
          <div className="bg-slate-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold" style={{ color: "#0F3554" }}>
              {caPercent}%
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Overall CA</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-amber-600">{monthPercent}%</p>
            <p className="text-xs text-muted-foreground mt-0.5">Monthly</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 text-center col-span-2 sm:col-span-1">
            <p className="text-2xl font-bold text-emerald-600">
              {CA_CATEGORIES.length}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Categories</p>
          </div>
        </div>

        {/* Categories */}
        <Accordion type="multiple" className="space-y-2">
          {CA_CATEGORIES.map((cat) => {
            // Category topic stats
            const topicDone = cat.topics.filter(
              (_, i) => checked[caTopicKey(cat.id, i)],
            ).length;
            const monthDone = CA_MONTHS.filter(
              (_, m) => checked[caMonthKey(cat.id, m)],
            ).length;
            const catTotal = cat.topics.length + CA_MONTHS.length;
            const catDone = topicDone + monthDone;
            const catPercent =
              catTotal > 0 ? Math.round((catDone / catTotal) * 100) : 0;

            return (
              <AccordionItem
                key={cat.id}
                value={cat.id}
                className="border border-border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline bg-slate-50/80">
                  <div className="flex items-center gap-2.5 flex-1 mr-2">
                    <span
                      className="w-7 h-7 rounded-md flex items-center justify-center text-sm flex-shrink-0"
                      style={{ background: cat.color }}
                    >
                      {cat.icon}
                    </span>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">
                          {cat.title}
                        </p>
                        <span className="text-xs text-muted-foreground mr-1">
                          {catDone}/{catTotal}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={catPercent} className="h-1 flex-1" />
                        <span className="text-xs text-muted-foreground w-8 text-right">
                          {catPercent}%
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4">
                  {/* Topics */}
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-3 mb-2">
                    Topics ({topicDone}/{cat.topics.length})
                  </p>
                  <div className="space-y-1 mb-4">
                    {cat.topics.map((topic, i) => {
                      const tk = caTopicKey(cat.id, i);
                      return (
                        <label
                          key={tk}
                          htmlFor={`chk-${tk}`}
                          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer ${
                            !checked[tk]
                              ? "border-l-2 border-l-amber-300 bg-amber-50/60"
                              : ""
                          }`}
                        >
                          <Checkbox
                            id={`chk-${tk}`}
                            checked={!!checked[tk]}
                            onCheckedChange={() => toggle(tk)}
                          />
                          <span
                            className={`text-sm ${
                              checked[tk]
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {topic}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Monthly tracking */}
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Monthly Tracking ({monthDone}/{CA_MONTHS.length})
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                    {CA_MONTHS.map((month, m) => {
                      const mk = caMonthKey(cat.id, m);
                      const isDone = !!checked[mk];
                      return (
                        <button
                          type="button"
                          key={mk}
                          onClick={() => toggle(mk)}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-medium transition-all ${
                            isDone
                              ? "bg-emerald-100 border-emerald-300 text-emerald-700"
                              : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                          }`}
                        >
                          <span className="text-sm">{isDone ? "✓" : "○"}</span>
                          <span>{month}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="inline-block w-3 h-3 rounded-sm bg-amber-100 border border-amber-300 mr-1 align-middle" />
                    Pending
                    <span className="inline-block w-3 h-3 rounded-sm bg-emerald-100 border border-emerald-300 ml-3 mr-1 align-middle" />
                    Done
                  </p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
}

export function SyllabusTrackerPage() {
  const {
    checked,
    toggle,
    sectionStats,
    overallStats,
    pendingTopics,
    nextSuggestion,
  } = useSyllabusProgress();

  const toggleParent = useCallback(
    (sectionId: string, topicId: string, subtopics: readonly string[]) => {
      if (subtopics.length === 0) {
        toggle(parentKey(sectionId, topicId));
        return;
      }
      const allChecked = subtopics.every(
        (_, i) => checked[subKey(sectionId, topicId, i)],
      );
      for (let i = 0; i < subtopics.length; i++) {
        const k = subKey(sectionId, topicId, i);
        if (Boolean(checked[k]) !== !allChecked) {
          toggle(k);
        }
      }
    },
    [checked, toggle],
  );

  const grouped = groupBySection(pendingTopics);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Syllabus Tracker
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {overallStats.done} of {overallStats.total} items completed
        </p>
      </motion.div>

      {/* Overall progress card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
        className="bg-white border border-border rounded-xl shadow-card p-5 mb-5"
        data-ocid="syllabus.overall.card"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Overall Completion
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {overallStats.done} of {overallStats.total} items completed
            </p>
          </div>
          <span className="text-4xl font-bold" style={{ color: "#0F3554" }}>
            {overallStats.percent}%
          </span>
        </div>
        <Progress value={overallStats.percent} className="h-2.5" />
      </motion.div>

      {/* Smart suggestion banner */}
      <AnimatePresence>
        {nextSuggestion && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mb-5 flex items-start gap-3 rounded-xl border border-[oklch(0.85_0.07_210)] bg-[oklch(0.97_0.03_210)] px-4 py-3.5"
            data-ocid="syllabus.suggestion.card"
          >
            <div className="mt-0.5 rounded-md p-1.5 bg-[oklch(0.85_0.07_210)]">
              <Zap size={14} style={{ color: "#0F3554" }} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0F3554] uppercase tracking-wide mb-0.5">
                Next Suggested Topic
              </p>
              <p className="text-sm text-foreground font-medium">
                {nextSuggestion.subtopicLabel
                  ? `${nextSuggestion.topicLabel} → ${nextSuggestion.subtopicLabel}`
                  : nextSuggestion.topicLabel}{" "}
                <span className="text-muted-foreground font-normal">
                  in {nextSuggestion.sectionTitle}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accordion per subject */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.35 }}
      >
        <Accordion
          type="multiple"
          defaultValue={["legal", "gk", "mental"]}
          className="space-y-3 mb-6"
        >
          {SECTIONS.map((section, si) => {
            const stats = sectionStats(section.id);
            return (
              <AccordionItem
                key={section.id}
                value={section.id}
                data-ocid={`syllabus.${section.id}.panel`}
                className="border border-border rounded-xl bg-white shadow-card overflow-hidden"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 flex-1 mr-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: section.color }}
                    >
                      {section.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-foreground">
                          {section.title}
                        </p>
                        <span className="text-xs text-muted-foreground mr-1">
                          {stats.done}/{stats.total}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Progress
                          value={stats.percent}
                          className="h-1.5 flex-1"
                        />
                        <span className="text-xs font-medium text-muted-foreground w-8 text-right">
                          {stats.percent}%
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-5">
                  <p className="text-xs text-muted-foreground mb-3 pt-1">
                    You have completed{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "#0F3554" }}
                    >
                      {stats.percent}%
                    </span>{" "}
                    of {section.title}
                  </p>

                  <div className="space-y-0.5">
                    {section.topics.map((topic, ti) => {
                      const pk = parentKey(section.id, topic.id);
                      const hasSubs = topic.subtopics.length > 0;
                      const checkedSubs = hasSubs
                        ? topic.subtopics.filter(
                            (_, i) => checked[subKey(section.id, topic.id, i)],
                          ).length
                        : 0;
                      const allSubsChecked =
                        hasSubs && checkedSubs === topic.subtopics.length;
                      const someSubsChecked =
                        hasSubs && checkedSubs > 0 && !allSubsChecked;
                      const parentChecked = hasSubs
                        ? allSubsChecked
                        : !!checked[pk];
                      const notStarted = hasSubs
                        ? checkedSubs === 0
                        : !checked[pk];

                      return (
                        <div
                          key={pk}
                          className={`rounded-lg ${
                            notStarted
                              ? "border-l-2 border-l-amber-300 bg-amber-50/60"
                              : ""
                          }`}
                        >
                          <label
                            htmlFor={`chk-${pk}`}
                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                          >
                            <IndeterminateCheckbox
                              id={`chk-${pk}`}
                              data-ocid={`syllabus.${section.id}.checkbox.${si * 10 + ti + 1}`}
                              checked={parentChecked}
                              indeterminate={someSubsChecked}
                              onCheckedChange={() =>
                                toggleParent(
                                  section.id,
                                  topic.id,
                                  topic.subtopics,
                                )
                              }
                            />
                            <span
                              className={`text-sm font-medium flex-1 ${
                                parentChecked
                                  ? "line-through text-muted-foreground"
                                  : "text-foreground"
                              }`}
                            >
                              {topic.label}
                            </span>
                            {hasSubs && (
                              <span className="text-xs text-muted-foreground">
                                {checkedSubs}/{topic.subtopics.length}
                              </span>
                            )}
                          </label>

                          {hasSubs && (
                            <div className="pl-9 space-y-0.5 pb-1">
                              {topic.subtopics.map((sub, si2) => {
                                const sk = subKey(section.id, topic.id, si2);
                                return (
                                  <label
                                    key={sk}
                                    htmlFor={`chk-${sk}`}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer"
                                  >
                                    <Checkbox
                                      id={`chk-${sk}`}
                                      checked={!!checked[sk]}
                                      onCheckedChange={() => toggle(sk)}
                                    />
                                    <span
                                      className={`text-xs ${
                                        checked[sk]
                                          ? "line-through text-muted-foreground"
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      {sub}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}

          {/* Current Affairs special section */}
          <CurrentAffairsSection checked={checked} toggle={toggle} />
        </Accordion>
      </motion.div>

      {/* Pending Topics panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.35 }}
        className="bg-white border border-border rounded-xl shadow-card p-5"
        data-ocid="syllabus.pending.panel"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground">
            Pending Topics
          </h2>
          <Badge variant="secondary">{pendingTopics.length}</Badge>
        </div>

        {pendingTopics.length === 0 ? (
          <div
            className="text-center py-6"
            data-ocid="syllabus.pending.empty_state"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-sm font-semibold text-foreground">
              Congratulations!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              You have completed the entire TS LAWCET syllabus!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {grouped.map(([sectionId, group]) => (
              <div key={sectionId}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  {group.title}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      data-ocid="syllabus.pending.item.1"
                      className="flex items-center gap-2 text-xs text-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
