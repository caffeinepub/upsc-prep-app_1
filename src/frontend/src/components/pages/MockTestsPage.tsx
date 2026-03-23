import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadAllResults } from "@/lib/mockTestStorage";
import { Clock, History, PlayCircle, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { MockExamPage } from "./MockExamPage";
import { MockTestHistoryPage } from "./MockTestHistoryPage";

interface MockTest {
  id: number;
  name: string;
  status: string;
  score: number | null;
}

const BASE_TESTS: MockTest[] = [
  { id: 1, name: "LAWCET Mock Test 1", status: "New", score: null },
  { id: 2, name: "LAWCET Mock Test 2", status: "New", score: null },
  { id: 3, name: "LAWCET Mock Test 3", status: "New", score: null },
  { id: 4, name: "LAWCET Mock Test 4", status: "New", score: null },
  { id: 5, name: "LAWCET Mock Test 5", status: "New", score: null },
  { id: 6, name: "LAWCET Mock Test 6", status: "New", score: null },
];

type Tab = "tests" | "history";

interface MockTestsPageProps {
  onExamActiveChange?: (active: boolean) => void;
}

export function MockTestsPage({ onExamActiveChange }: MockTestsPageProps) {
  const [tests, setTests] = useState<MockTest[]>(BASE_TESTS);
  const [activeExam, setActiveExam] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("tests");

  const refreshResults = useCallback(() => {
    const results = loadAllResults();
    if (results.length === 0) return;
    const resultMap = new Map(results.map((r) => [r.testId, r]));
    setTests(
      BASE_TESTS.map((t) => {
        const result = resultMap.get(t.id);
        if (result) {
          return { ...t, status: "Completed", score: result.accuracy };
        }
        return t;
      }),
    );
  }, []);

  useEffect(() => {
    refreshResults();
  }, [refreshResults]);

  useEffect(() => {
    if (activeExam !== null) {
      onExamActiveChange?.(true);
    }
  }, [activeExam, onExamActiveChange]);

  const handleExamExit = () => {
    onExamActiveChange?.(false);
    setActiveExam(null);
    refreshResults();
  };

  if (activeExam !== null) {
    return (
      <MockExamPage
        testId={activeExam}
        onExit={handleExamExit}
        onExamActiveChange={onExamActiveChange}
      />
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
          Mock Tests
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Practice with full-length TS LAWCET mock tests · 120 questions · 90
          min
        </p>

        {/* Tabs */}
        <div
          data-ocid="mock_tests.filter.tab"
          className="flex items-center gap-1 p-1 rounded-xl border border-border bg-muted w-fit mb-8"
        >
          <button
            type="button"
            data-ocid="mock_tests.tests.tab"
            onClick={() => setActiveTab("tests")}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "tests"
                ? "text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={
              activeTab === "tests"
                ? { background: "oklch(var(--navy))" }
                : undefined
            }
          >
            <PlayCircle size={14} />
            Mock Tests
          </button>
          <button
            type="button"
            data-ocid="mock_tests.history.tab"
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "history"
                ? "text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={
              activeTab === "history"
                ? { background: "oklch(var(--navy))" }
                : undefined
            }
          >
            <History size={14} />
            History
          </button>
        </div>
      </motion.div>

      {activeTab === "history" ? (
        <MockTestHistoryPage />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tests.map((test) => (
              <Card
                key={test.id}
                className="hover:shadow-md transition-shadow border"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-semibold">
                      {test.name}
                    </CardTitle>
                    <Badge
                      className={
                        test.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200 text-xs shrink-0"
                          : "bg-sky-100 text-sky-700 border-sky-200 text-xs shrink-0"
                      }
                    >
                      {test.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} />
                      90 min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Trophy size={13} />
                      {test.score !== null
                        ? `${test.score}% accuracy`
                        : "120 questions"}
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    style={{ backgroundColor: "#0F3554" }}
                    onClick={() => setActiveExam(test.id)}
                    data-ocid={`mock_tests.item.${test.id}`}
                  >
                    {test.status === "Completed" ? "Retake Test" : "Start Test"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
