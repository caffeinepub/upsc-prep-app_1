import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";
import { useState } from "react";

const SECTIONS = [
  {
    id: "legal",
    title: "Legal Aptitude",
    icon: "⚖️",
    color: "oklch(0.85 0.06 243)",
    topics: [
      "Indian Constitution — Preamble & Fundamental Rights",
      "Directive Principles of State Policy",
      "Law of Contracts — Offer & Acceptance",
      "Law of Torts — Negligence & Liability",
      "Criminal Law — IPC Basics",
      "Legal Maxims & Terminology",
      "Judicial System — Courts Hierarchy",
      "Constitutional Amendments — Key Ones",
    ],
  },
  {
    id: "gk",
    title: "General Knowledge & Current Affairs",
    icon: "🌐",
    color: "oklch(0.88 0.07 155)",
    topics: [
      "Indian History — Modern Period",
      "Telangana State — Formation & Government",
      "National & International Events 2024-25",
      "Geography — India & Telangana",
      "Economy — Basic Concepts",
      "Science & Technology — Recent Developments",
      "Sports & Awards 2024",
      "Important Committees & Reports",
    ],
  },
  {
    id: "mental",
    title: "Mental Ability",
    icon: "🧠",
    color: "oklch(0.87 0.05 300)",
    topics: [
      "Number Series & Sequences",
      "Analogies — Verbal & Non-Verbal",
      "Coding & Decoding",
      "Blood Relations",
      "Direction Sense",
      "Syllogisms",
      "Data Sufficiency",
      "Logical Reasoning Puzzles",
    ],
  },
];

export function SyllabusTrackerPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const getProgress = (sectionId: string, topicCount: number) => {
    const done = Object.entries(checked).filter(
      ([k, v]) => k.startsWith(sectionId) && v,
    ).length;
    return Math.round((done / topicCount) * 100);
  };

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
        <p className="text-sm text-muted-foreground mb-8">
          Track your TS LAWCET syllabus completion
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        <Accordion
          type="multiple"
          defaultValue={["legal"]}
          className="space-y-3"
        >
          {SECTIONS.map((section) => {
            const prog = getProgress(section.id, section.topics.length);
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
                      <p className="text-sm font-semibold text-foreground">
                        {section.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress
                          value={prog}
                          className="h-1.5 flex-1 max-w-[120px]"
                        />
                        <span className="text-xs text-muted-foreground">
                          {prog}%
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="space-y-2.5 pt-2">
                    {section.topics.map((topic, ti) => {
                      const key = `${section.id}-${ti}`;
                      return (
                        <label
                          key={key}
                          htmlFor={key}
                          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                        >
                          <Checkbox
                            data-ocid={`syllabus.${section.id}.checkbox.${ti + 1}`}
                            id={key}
                            checked={!!checked[key]}
                            onCheckedChange={() => toggle(key)}
                          />
                          <span
                            className={`text-sm ${
                              checked[key]
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
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </motion.div>
    </div>
  );
}
