import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Edit3,
  Globe,
  Scale,
  Target,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DailyReviewQuiz, loadMistakes } from "./DailyReviewQuiz";
import { PracticeQuiz } from "./PracticeQuiz";

interface DailyPracticePageProps {
  onExamActiveChange?: (active: boolean) => void;
}

export function DailyPracticePage({
  onExamActiveChange,
}: DailyPracticePageProps) {
  const [activeQuiz, setActiveQuiz] = useState<
    "polity" | "history" | "geography" | "daily_review" | null
  >(null);
  const {
    dailyTarget,
    completedToday,
    setDailyTarget,
    remaining,
    percentComplete,
  } = useDailyProgress();
  const [editingTarget, setEditingTarget] = useState(false);
  const [targetInput, setTargetInput] = useState(String(dailyTarget));

  const mistakeCount = loadMistakes().length;

  useEffect(() => {
    if (activeQuiz !== null) {
      onExamActiveChange?.(true);
    } else {
      onExamActiveChange?.(false);
    }
  }, [activeQuiz, onExamActiveChange]);

  const handleCloseQuiz = () => {
    onExamActiveChange?.(false);
    setActiveQuiz(null);
  };

  if (activeQuiz === "daily_review") {
    return (
      <DailyReviewQuiz
        onClose={handleCloseQuiz}
        onExamActiveChange={onExamActiveChange}
      />
    );
  }

  if (activeQuiz) {
    return <PracticeQuiz subject={activeQuiz} onClose={handleCloseQuiz} />;
  }

  const subjects = [
    {
      id: "polity" as const,
      label: "Polity",
      desc: "Constitutional law, governance, rights",
      icon: Scale,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-500",
    },
    {
      id: "history" as const,
      label: "History",
      desc: "Ancient, medieval and modern India",
      icon: BookOpen,
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-500",
    },
    {
      id: "geography" as const,
      label: "Geography",
      desc: "Physical, human and economic geography",
      icon: Globe,
      color: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Daily Practice
        </h1>
        <p className="text-sm text-gray-500">
          Stay consistent — practice daily to improve your score
        </p>
      </div>

      {/* Daily Target Card */}
      <Card
        className="border-2"
        style={{
          borderColor: "rgba(15,53,84,0.2)",
          background: "rgba(15,53,84,0.03)",
        }}
      >
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" style={{ color: "#0F3554" }} />
              <span className="font-semibold text-gray-800">
                Today&apos;s Progress
              </span>
            </div>
            {!editingTarget ? (
              <button
                type="button"
                onClick={() => {
                  setEditingTarget(true);
                  setTargetInput(String(dailyTarget));
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Edit target"
                data-ocid="daily.edit_button"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  className="w-16 text-sm border rounded px-2 py-0.5 text-center"
                  min={1}
                  data-ocid="daily.target.input"
                />
                <button
                  type="button"
                  onClick={() => {
                    const val = Number.parseInt(targetInput, 10);
                    if (!Number.isNaN(val) && val > 0) setDailyTarget(val);
                    setEditingTarget(false);
                  }}
                  className="text-xs text-white bg-green-500 hover:bg-green-600 rounded px-2 py-0.5"
                  data-ocid="daily.target.save_button"
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="flex items-end gap-4 mb-3">
            <div className="text-center">
              <p className="text-3xl font-bold" style={{ color: "#0F3554" }}>
                {completedToday}
              </p>
              <p className="text-xs text-gray-400">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-300">/</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-600">{dailyTarget}</p>
              <p className="text-xs text-gray-400">Target</p>
            </div>
            <div className="flex-1" />
            {percentComplete >= 100 ? (
              <Badge className="bg-emerald-100 text-emerald-700">
                Goal Reached!
              </Badge>
            ) : (
              <Badge className="bg-amber-100 text-amber-700">
                {remaining} remaining
              </Badge>
            )}
          </div>
          <Progress value={percentComplete} className="h-2" />
        </CardContent>
      </Card>

      {/* Daily Review from Weak Areas */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-orange-500" />
          <h2 className="text-base font-semibold text-gray-800">
            Weak Areas Review
          </h2>
          {mistakeCount > 0 && (
            <Badge className="bg-orange-100 text-orange-700">
              {mistakeCount} questions
            </Badge>
          )}
        </div>
        <Card
          className={`border-2 ${mistakeCount > 0 ? "border-orange-200 bg-orange-50/30" : "border-gray-100"}`}
        >
          <CardContent className="p-5">
            {mistakeCount === 0 ? (
              <div className="flex items-center gap-3 text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    No weak areas yet
                  </p>
                  <p className="text-xs">
                    Complete practice sessions to track mistakes
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Review {Math.min(10, mistakeCount)} questions from your weak
                    areas
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Questions you got wrong in previous sessions
                  </p>
                </div>
                <Button
                  size="sm"
                  className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => setActiveQuiz("daily_review")}
                  data-ocid="daily.review.primary_button"
                >
                  Start Review
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* UPSC Practice Subjects */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5" style={{ color: "#0F3554" }} />
          <h2 className="text-base font-semibold text-gray-800">
            UPSC Practice
          </h2>
          <Badge className="bg-gray-100 text-gray-600 text-xs">
            10 questions each
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className={`border-2 ${subject.color} cursor-pointer hover:shadow-md transition-shadow`}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <subject.icon className={`w-5 h-5 ${subject.iconColor}`} />
                  <div>
                    <p className="font-semibold text-sm">{subject.label}</p>
                    <p className="text-xs text-gray-500">{subject.desc}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full"
                  style={{ backgroundColor: "#0F3554" }}
                  onClick={() => setActiveQuiz(subject.id)}
                  data-ocid={`daily.${subject.id}.primary_button`}
                >
                  Practice
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
