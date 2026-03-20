import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Globe, Scale } from "lucide-react";
import { motion } from "motion/react";

const PRACTICE_SECTIONS = [
  {
    id: "legal",
    title: "Legal Aptitude",
    icon: Scale,
    color: "oklch(0.85 0.06 243)",
    questions: 25,
    description: "Constitutional law, torts, contracts, and legal reasoning",
    topics: ["Contract Law", "Constitutional Law", "Torts", "Legal Reasoning"],
  },
  {
    id: "gk",
    title: "GK & Current Affairs",
    icon: Globe,
    color: "oklch(0.88 0.07 155)",
    questions: 20,
    description: "National events, state news, and general awareness",
    topics: ["National Affairs", "Telangana GK", "Science & Tech", "Sports"],
  },
  {
    id: "mental",
    title: "Mental Ability",
    icon: Brain,
    color: "oklch(0.87 0.05 300)",
    questions: 15,
    description:
      "Logical reasoning, data interpretation, and analytical thinking",
    topics: [
      "Logical Reasoning",
      "Verbal Ability",
      "Data Sufficiency",
      "Analogies",
    ],
  },
];

export function DailyPracticePage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
          Daily Practice
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Sharpen your skills with targeted daily practice
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PRACTICE_SECTIONS.map((section, i) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
          >
            <Card
              data-ocid={`daily_practice.${section.id}.card`}
              className="shadow-card h-full"
            >
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: section.color }}
                >
                  <section.icon
                    size={22}
                    style={{ color: "oklch(var(--navy))" }}
                  />
                </div>
                <CardTitle className="text-base">{section.title}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {section.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-foreground mb-2">
                    Today's Topics
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {section.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: section.color,
                          color: "oklch(var(--navy))",
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground">
                    Today's questions
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {section.questions}
                  </span>
                </div>

                <Button
                  data-ocid={`daily_practice.${section.id}.primary_button`}
                  className="w-full h-8 text-xs rounded-lg"
                  style={{ background: "oklch(var(--navy))", color: "white" }}
                >
                  Practice Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
