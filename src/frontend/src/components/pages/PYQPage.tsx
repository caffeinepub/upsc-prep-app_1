import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calendar, FileText, Layers, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  getAllPYQQuestions,
  getPYQYears,
  getQuestionsByYear,
} from "../../data/pyqBank";
import { type PYQMockTest, getAllPYQMockTests } from "../../data/pyqMockSeries";
import { PYQExamPage } from "./PYQExamPage";

type ActiveTest =
  | { kind: "year"; year: number }
  | { kind: "series"; test: PYQMockTest };

interface PYQPageProps {
  onExamActiveChange?: (active: boolean) => void;
}

export function PYQPage({ onExamActiveChange }: PYQPageProps) {
  const [active, setActive] = useState<ActiveTest | null>(null);
  const years = getPYQYears();
  const allQuestions = getAllPYQQuestions();
  const mockTests = getAllPYQMockTests();

  const handleStart = (test: ActiveTest) => {
    setActive(test);
    onExamActiveChange?.(true);
  };

  const handleExit = () => {
    onExamActiveChange?.(false);
    setActive(null);
  };

  if (active) {
    if (active.kind === "year") {
      return (
        <PYQExamPage
          year={active.year}
          onExit={handleExit}
          onExamActiveChange={onExamActiveChange}
        />
      );
    }
    return (
      <PYQExamPage
        title={active.test.title}
        questions={active.test.questions}
        onExit={handleExit}
        onExamActiveChange={onExamActiveChange}
      />
    );
  }

  const legalCount = allQuestions.filter(
    (q) => q.subject === "Legal Aptitude",
  ).length;
  const gkCount = allQuestions.filter(
    (q) => q.subject === "General Knowledge",
  ).length;
  const mentalCount = allQuestions.filter(
    (q) => q.subject === "Mental Ability",
  ).length;

  return (
    <div className="p-6 max-w-5xl mx-auto" data-ocid="pyq.page">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <FileText className="w-6 h-6" style={{ color: "#0F3554" }} />
          <h1 className="text-2xl font-bold" style={{ color: "#0F3554" }}>
            PYQ Tests
          </h1>
        </div>
        <p className="text-gray-500 text-sm">
          Previous Year Question Papers — real exam pattern, static questions
        </p>
      </motion.div>

      {/* ── Year-wise Tests ── */}
      <h2 className="text-base font-semibold text-gray-700 mb-3">
        Year-wise Papers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {/* All Years Combined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className="hover:shadow-md transition-shadow border-2 hover:border-indigo-200 cursor-pointer group border-indigo-100 bg-indigo-50/30">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2
                    className="text-lg font-bold"
                    style={{ color: "#0F3554" }}
                  >
                    All Years Combined
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    TS LAWCET Full Practice
                  </p>
                </div>
                <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs">
                  All Years
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Layers className="w-4 h-4" />
                  {allQuestions.length} Questions
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  90 min
                </span>
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Legal Aptitude</span>
                  <span>{legalCount} Qs</span>
                </div>
                <div className="flex justify-between">
                  <span>General Knowledge</span>
                  <span>{gkCount} Qs</span>
                </div>
                <div className="flex justify-between">
                  <span>Mental Ability</span>
                  <span>{mentalCount} Qs</span>
                </div>
              </div>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                onClick={() => handleStart({ kind: "year", year: 0 })}
                data-ocid="pyq.primary_button"
              >
                Start Combined Test
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {years.map((year, idx) => {
          const questions = getQuestionsByYear(year);
          return (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx + 1) * 0.08 }}
            >
              <Card className="hover:shadow-md transition-shadow border-2 hover:border-blue-200 cursor-pointer group">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2
                        className="text-lg font-bold"
                        style={{ color: "#0F3554" }}
                      >
                        TS LAWCET {year} Paper
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Telangana Law CET
                      </p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                      PYQ {year}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {questions.length} Questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      90 min
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Legal Aptitude</span>
                      <span>
                        {
                          questions.filter(
                            (q) => q.subject === "Legal Aptitude",
                          ).length
                        }{" "}
                        Qs
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>General Knowledge</span>
                      <span>
                        {
                          questions.filter(
                            (q) => q.subject === "General Knowledge",
                          ).length
                        }{" "}
                        Qs
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mental Ability</span>
                      <span>
                        {
                          questions.filter(
                            (q) => q.subject === "Mental Ability",
                          ).length
                        }{" "}
                        Qs
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    style={{ backgroundColor: "#0F3554" }}
                    onClick={() => handleStart({ kind: "year", year })}
                    data-ocid={`pyq.item.${idx + 1}`}
                  >
                    Start PYQ {year}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* ── PYQ Mock Test Series ── */}
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-5 h-5 text-violet-600" />
        <h2 className="text-base font-semibold text-gray-700">
          PYQ Mock Test Series
        </h2>
        <Badge className="bg-violet-100 text-violet-700 text-xs">7 Tests</Badge>
      </div>
      <p className="text-xs text-gray-400 mb-4">
        Fixed PYQ-style mock tests — unique question sets, never regenerated
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockTests.map((test, idx) => {
          const lCount = test.questions.filter(
            (q) => q.subject === "Legal Aptitude",
          ).length;
          const gCount = test.questions.filter(
            (q) =>
              q.subject === "General Knowledge" ||
              q.subject === "GK & Current Affairs",
          ).length;
          const mCount = test.questions.filter(
            (q) => q.subject === "Mental Ability",
          ).length;
          return (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
            >
              <Card className="hover:shadow-md transition-shadow border-2 hover:border-violet-200 cursor-pointer group">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className="font-bold text-sm"
                        style={{ color: "#0F3554" }}
                      >
                        {test.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        TS LAWCET Style
                      </p>
                    </div>
                    <Badge className="bg-violet-100 text-violet-700 border-violet-200 text-xs">
                      Fixed
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {test.questions.length} Qs
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      90 min
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-0.5">
                    <div className="flex justify-between">
                      <span>Legal</span>
                      <span>{lCount} Qs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GK</span>
                      <span>{gCount} Qs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mental</span>
                      <span>{mCount} Qs</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-xs"
                    onClick={() => handleStart({ kind: "series", test })}
                    data-ocid={`pyq.series.item.${idx + 1}`}
                  >
                    Start Test {test.id}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
