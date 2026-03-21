import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  {
    id: "legal",
    title: "Legal Aptitude",
    icon: "⚖️",
    color: "oklch(0.85 0.06 243)",
    topics: [
      {
        id: "contracts",
        label: "Contracts",
        subtopics: ["Offer", "Acceptance", "Consent"],
      },
      {
        id: "torts",
        label: "Torts",
        subtopics: ["Negligence", "Nuisance", "Defamation"],
      },
      {
        id: "constitutional",
        label: "Constitutional Law",
        subtopics: ["Fundamental Rights", "Fundamental Duties"],
      },
      { id: "maxims", label: "Legal Maxims", subtopics: [] },
      {
        id: "reasoning",
        label: "Legal Reasoning",
        subtopics: ["Principle-Fact Method"],
      },
    ],
  },
  {
    id: "gk",
    title: "GK & Current Affairs",
    icon: "🌐",
    color: "oklch(0.88 0.07 155)",
    topics: [
      {
        id: "current",
        label: "Current Affairs",
        subtopics: ["Last 12 months"],
      },
      { id: "history", label: "Indian History Basics", subtopics: [] },
      { id: "polity", label: "Polity Basics", subtopics: [] },
      { id: "personalities", label: "Important Personalities", subtopics: [] },
      { id: "awards", label: "Awards & Sports", subtopics: [] },
    ],
  },
  {
    id: "mental",
    title: "Mental Ability",
    icon: "🧠",
    color: "oklch(0.87 0.05 300)",
    topics: [
      { id: "series", label: "Number Series", subtopics: [] },
      { id: "coding", label: "Coding-Decoding", subtopics: [] },
      { id: "analogies", label: "Analogies", subtopics: [] },
      { id: "blood", label: "Blood Relations", subtopics: [] },
      { id: "direction", label: "Direction Sense", subtopics: [] },
    ],
  },
];

function parentKey(sectionId: string, topicId: string) {
  return `${sectionId}-${topicId}`;
}
function subKey(sectionId: string, topicId: string, idx: number) {
  return `${sectionId}-${topicId}-${idx}`;
}

function getSectionCounts(sectionId: string, checked: Record<string, boolean>) {
  const section = SECTIONS.find((s) => s.id === sectionId)!;
  let total = 0;
  let done = 0;
  for (const topic of section.topics) {
    if (topic.subtopics.length === 0) {
      total += 1;
      if (checked[parentKey(sectionId, topic.id)]) done += 1;
    } else {
      total += topic.subtopics.length;
      for (let i = 0; i < topic.subtopics.length; i++) {
        if (checked[subKey(sectionId, topic.id, i)]) done += 1;
      }
    }
  }
  return { total, done };
}

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
      (ref.current as HTMLInputElement).indeterminate = !!indeterminate;
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

export function SyllabusTrackerPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem("tslawcet_syllabus") ?? "{}");
    } catch {
      return {};
    }
  });

  const save = (next: Record<string, boolean>) => {
    localStorage.setItem("tslawcet_syllabus", JSON.stringify(next));
    setChecked(next);
  };

  const toggleParent = (
    sectionId: string,
    topicId: string,
    subtopics: string[],
  ) => {
    const pk = parentKey(sectionId, topicId);
    if (subtopics.length === 0) {
      save({ ...checked, [pk]: !checked[pk] });
      return;
    }
    // determine new state: check all if not all checked, else uncheck all
    const allChecked = subtopics.every(
      (_, i) => checked[subKey(sectionId, topicId, i)],
    );
    const next = { ...checked };
    for (let i = 0; i < subtopics.length; i++) {
      next[subKey(sectionId, topicId, i)] = !allChecked;
    }
    save(next);
  };

  const toggleSub = (sectionId: string, topicId: string, idx: number) => {
    const sk = subKey(sectionId, topicId, idx);
    save({ ...checked, [sk]: !checked[sk] });
  };

  // Overall counts
  let totalAll = 0;
  let doneAll = 0;
  for (const section of SECTIONS) {
    const { total, done } = getSectionCounts(section.id, checked);
    totalAll += total;
    doneAll += done;
  }
  const overallProgress =
    totalAll > 0 ? Math.round((doneAll / totalAll) * 100) : 0;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
          Syllabus Tracker
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Track your TS LAWCET syllabus completion
        </p>
      </motion.div>

      {/* Overall completion card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
        className="bg-white border border-border rounded-xl shadow-card p-5 mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Overall Completion
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {doneAll} of {totalAll} items completed
            </p>
          </div>
          <span className="text-3xl font-bold" style={{ color: "#0F3554" }}>
            {overallProgress}%
          </span>
        </div>
        <Progress value={overallProgress} className="h-2.5" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        <Accordion
          type="multiple"
          defaultValue={["legal", "gk", "mental"]}
          className="space-y-3"
        >
          {SECTIONS.map((section) => {
            const { total, done } = getSectionCounts(section.id, checked);
            const prog = total > 0 ? Math.round((done / total) * 100) : 0;
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
                          {done}/{total}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Progress value={prog} className="h-1.5 flex-1" />
                        <span className="text-xs font-medium text-muted-foreground w-8 text-right">
                          {prog}%
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="space-y-0.5 pt-2">
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

                      return (
                        <div key={pk}>
                          {/* Parent row */}
                          <label
                            htmlFor={pk}
                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                          >
                            <IndeterminateCheckbox
                              data-ocid={`syllabus.${section.id}.checkbox.${ti + 1}`}
                              id={pk}
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
                              className={`text-sm font-medium ${
                                parentChecked
                                  ? "line-through text-muted-foreground"
                                  : "text-foreground"
                              }`}
                            >
                              {topic.label}
                            </span>
                            {hasSubs && (
                              <span className="ml-auto text-xs text-muted-foreground">
                                {checkedSubs}/{topic.subtopics.length}
                              </span>
                            )}
                          </label>

                          {/* Subtopic rows */}
                          {hasSubs && (
                            <div className="pl-8 space-y-0.5">
                              {topic.subtopics.map((sub, si) => {
                                const sk = subKey(section.id, topic.id, si);
                                return (
                                  <label
                                    key={sk}
                                    htmlFor={sk}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer"
                                  >
                                    <Checkbox
                                      id={sk}
                                      checked={!!checked[sk]}
                                      onCheckedChange={() =>
                                        toggleSub(section.id, topic.id, si)
                                      }
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
        </Accordion>
      </motion.div>
    </div>
  );
}
