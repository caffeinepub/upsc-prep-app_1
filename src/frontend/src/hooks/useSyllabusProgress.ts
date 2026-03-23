import {
  CA_CATEGORIES,
  CA_MONTHS,
  caMonthKey,
  caTopicKey,
} from "@/data/caData";
import { useCallback, useEffect, useState } from "react";

export const SECTIONS = [
  {
    id: "legal",
    title: "Legal Aptitude",
    icon: "⚖️",
    color: "oklch(0.85 0.06 243)",
    topics: [
      {
        id: "contracts",
        label: "Contracts",
        subtopics: ["Offer & Acceptance", "Free Consent", "Void Agreements"],
      },
      {
        id: "torts",
        label: "Torts",
        subtopics: ["Negligence", "Nuisance", "Defamation"],
      },
      {
        id: "constitutional",
        label: "Constitutional Law",
        subtopics: [
          "Fundamental Rights",
          "Directive Principles",
          "Fundamental Duties",
        ],
      },
      { id: "maxims", label: "Legal Maxims", subtopics: [] },
      {
        id: "reasoning",
        label: "Legal Reasoning (Principle-Fact)",
        subtopics: [],
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
        subtopics: [
          "January 2025",
          "February 2025",
          "March 2025",
          "April 2025",
          "May 2025",
          "June 2025",
          "July 2025",
          "August 2025",
          "September 2025",
          "October 2025",
          "November 2025",
          "December 2025",
        ],
      },
      { id: "history", label: "Indian History (Basic)", subtopics: [] },
      { id: "polity", label: "Indian Polity", subtopics: [] },
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
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export function parentKey(sectionId: string, topicId: string) {
  return `${sectionId}-${topicId}`;
}
export function subKey(sectionId: string, topicId: string, idx: number) {
  return `${sectionId}-${topicId}-${idx}`;
}

function loadChecked(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem("tslawcet_syllabus") ?? "{}");
  } catch {
    return {};
  }
}

export interface PendingTopic {
  sectionTitle: string;
  sectionId: string;
  topicLabel: string;
  subtopicLabel?: string;
}

export interface SectionStats {
  total: number;
  done: number;
  percent: number;
}

export function useSyllabusProgress() {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadChecked);

  useEffect(() => {
    localStorage.setItem("tslawcet_syllabus", JSON.stringify(checked));
  }, [checked]);

  const toggle = useCallback((key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const sectionStats = useCallback(
    (id: string): SectionStats => {
      const section = SECTIONS.find((s) => s.id === id);
      if (!section) return { total: 0, done: 0, percent: 0 };
      let total = 0;
      let done = 0;
      for (const topic of section.topics) {
        if (topic.subtopics.length === 0) {
          total += 1;
          if (checked[parentKey(id, topic.id)]) done += 1;
        } else {
          total += topic.subtopics.length;
          for (let i = 0; i < topic.subtopics.length; i++) {
            if (checked[subKey(id, topic.id, i)]) done += 1;
          }
        }
      }
      return {
        total,
        done,
        percent: total > 0 ? Math.round((done / total) * 100) : 0,
      };
    },
    [checked],
  );

  // CA stats
  const caStats = useCallback(() => {
    let total = 0;
    let done = 0;
    for (const cat of CA_CATEGORIES) {
      // topics
      total += cat.topics.length;
      for (let i = 0; i < cat.topics.length; i++) {
        if (checked[caTopicKey(cat.id, i)]) done += 1;
      }
      // months
      total += CA_MONTHS.length;
      for (let m = 0; m < CA_MONTHS.length; m++) {
        if (checked[caMonthKey(cat.id, m)]) done += 1;
      }
    }
    return {
      total,
      done,
      percent: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  }, [checked]);

  const overallStats = (() => {
    let total = 0;
    let done = 0;
    for (const s of SECTIONS) {
      const st = sectionStats(s.id);
      total += st.total;
      done += st.done;
    }
    // include CA
    const ca = caStats();
    total += ca.total;
    done += ca.done;
    return {
      total,
      done,
      percent: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  })();

  const pendingTopics: PendingTopic[] = [];
  for (const section of SECTIONS) {
    for (const topic of section.topics) {
      if (topic.subtopics.length === 0) {
        if (!checked[parentKey(section.id, topic.id)]) {
          pendingTopics.push({
            sectionTitle: section.title,
            sectionId: section.id,
            topicLabel: topic.label,
          });
        }
      } else {
        for (let i = 0; i < topic.subtopics.length; i++) {
          if (!checked[subKey(section.id, topic.id, i)]) {
            pendingTopics.push({
              sectionTitle: section.title,
              sectionId: section.id,
              topicLabel: topic.label,
              subtopicLabel: topic.subtopics[i],
            });
          }
        }
      }
    }
  }

  const nextSuggestion = pendingTopics[0] ?? null;

  return {
    checked,
    toggle,
    sectionStats,
    caStats,
    overallStats,
    pendingTopics,
    nextSuggestion,
  };
}
