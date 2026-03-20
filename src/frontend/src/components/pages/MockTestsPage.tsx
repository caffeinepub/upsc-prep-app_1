import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, PlayCircle, Trophy } from "lucide-react";
import { motion } from "motion/react";

const MOCK_TESTS = [
  {
    id: 1,
    name: "LAWCET Mock Test 1",
    status: "Completed",
    score: 82,
    duration: "90 min",
    questions: 120,
  },
  {
    id: 2,
    name: "LAWCET Mock Test 2",
    status: "Completed",
    score: 76,
    duration: "90 min",
    questions: 120,
  },
  {
    id: 3,
    name: "LAWCET Mock Test 3",
    status: "Completed",
    score: 79,
    duration: "90 min",
    questions: 120,
  },
  {
    id: 4,
    name: "LAWCET Mock Test 4",
    status: "New",
    score: null,
    duration: "90 min",
    questions: 120,
  },
  {
    id: 5,
    name: "LAWCET Mock Test 5",
    status: "New",
    score: null,
    duration: "90 min",
    questions: 120,
  },
  {
    id: 6,
    name: "LAWCET Mock Test 6",
    status: "New",
    score: null,
    duration: "90 min",
    questions: 120,
  },
];

export function MockTestsPage() {
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
        <p className="text-sm text-muted-foreground mb-8">
          Practice with full-length TS LAWCET mock tests
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, staggerChildren: 0.06 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {MOCK_TESTS.map((test, i) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
          >
            <Card
              data-ocid={`mock_tests.item.${test.id}`}
              className="shadow-card hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm font-semibold">
                    {test.name}
                  </CardTitle>
                  <Badge
                    data-ocid={`mock_tests.item.${test.id}.toggle`}
                    variant={
                      test.status === "Completed" ? "default" : "outline"
                    }
                    className="text-xs flex-shrink-0"
                    style={
                      test.status === "Completed"
                        ? {
                            background: "oklch(var(--success-bg))",
                            color: "oklch(var(--success-text))",
                            border: "none",
                          }
                        : {
                            borderColor: "oklch(var(--navy))",
                            color: "oklch(var(--navy))",
                          }
                    }
                  >
                    {test.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {test.duration}
                  </span>
                  <span>{test.questions} questions</span>
                </div>

                {test.score !== null && (
                  <div
                    className="flex items-center gap-2 mb-4 p-2 rounded-lg"
                    style={{ background: "oklch(0.97 0.01 155)" }}
                  >
                    <Trophy
                      size={14}
                      style={{ color: "oklch(var(--success-text))" }}
                    />
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "oklch(var(--success-text))" }}
                    >
                      Score: {test.score}%
                    </span>
                  </div>
                )}

                <Button
                  data-ocid={`mock_tests.item.${test.id}.primary_button`}
                  size="sm"
                  className="w-full h-8 text-xs rounded-lg gap-1.5"
                  style={{ background: "oklch(var(--navy))", color: "white" }}
                >
                  <PlayCircle size={13} />
                  {test.status === "Completed" ? "Retake Test" : "Start Test"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
