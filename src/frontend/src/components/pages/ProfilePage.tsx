import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loadAllResults } from "@/lib/mockTestStorage";
import { getStreak as getRealStreak } from "@/lib/streakTracker";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Flame,
  LogOut,
  Pencil,
  Percent,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function getStatsFromStorage() {
  const results = loadAllResults();
  const mockTests = results.length;
  const totalAttempted = results.reduce((s, r) => s + r.total, 0);
  const totalCorrect = results.reduce((s, r) => s + r.score, 0);
  const accuracy =
    totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const bestScore = results.reduce((m, r) => Math.max(m, r.score), 0);
  const avgScore =
    mockTests > 0
      ? Math.round(results.reduce((s, r) => s + r.score, 0) / mockTests)
      : 0;
  const streak = getRealStreak();
  return { mockTests, totalAttempted, accuracy, bestScore, avgScore, streak };
}

export function ProfilePage() {
  const { user, logout, updateName } = useAuth();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name ?? "");
  const [saving, setSaving] = useState(false);
  const [nameError, setNameError] = useState("");

  const displayName = user?.name ?? "Student";
  const email = user?.email ?? "";
  const initials = displayName
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  const { mockTests, totalAttempted, accuracy, bestScore, avgScore, streak } =
    getStatsFromStorage();

  const handleSaveName = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setNameError("Name cannot be empty.");
      return;
    }
    setSaving(true);
    updateName(trimmed);
    setSaving(false);
    setEditing(false);
    setNameError("");
  };

  const handleCancelEdit = () => {
    setNameInput(user?.name ?? "");
    setNameError("");
    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Your account and performance overview
        </p>
      </motion.div>

      {/* Basic Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4"
      >
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
            style={{ background: "#0F3554" }}
          >
            {initials || "S"}
          </div>
          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="space-y-2">
                <Input
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    setNameError("");
                  }}
                  className="h-8 text-sm font-semibold"
                  placeholder="Your name"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveName();
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                />
                {nameError && (
                  <p className="text-xs text-red-500">{nameError}</p>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="h-7 text-xs px-3"
                    style={{ background: "#0F3554" }}
                    onClick={handleSaveName}
                    disabled={saving}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs px-2"
                    onClick={handleCancelEdit}
                  >
                    <X size={12} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900 truncate">
                  {displayName}
                </h2>
                <button
                  onClick={() => {
                    setNameInput(user?.name ?? "");
                    setEditing(true);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                  type="button"
                  title="Edit name"
                >
                  <Pencil size={13} />
                </button>
              </div>
            )}
            <Badge variant="secondary" className="mt-1 text-xs">
              TS LAWCET Aspirant
            </Badge>
            <p className="text-sm text-gray-500 mt-1 truncate">
              {email || "—"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4"
      >
        {[
          {
            label: "Questions Attempted",
            value: totalAttempted || "0",
            icon: BookOpen,
            bg: "#EEF2FF",
            color: "#6366F1",
          },
          {
            label: "Accuracy",
            value: totalAttempted > 0 ? `${accuracy}%` : "—",
            icon: Percent,
            bg: "#F0FDF4",
            color: "#22C55E",
          },
          {
            label: "Mock Tests",
            value: mockTests,
            icon: CheckCircle2,
            bg: "#FFF7ED",
            color: "#F97316",
          },
          {
            label: "Streak",
            value: streak > 0 ? `${streak}d` : "—",
            icon: Flame,
            bg: "#FEF2F2",
            color: "#EF4444",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
              style={{ background: s.bg }}
            >
              <s.icon size={15} style={{ color: s.color }} />
            </div>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-tight">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Performance Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={15} style={{ color: "#0F3554" }} />
          <h3 className="text-sm font-semibold text-gray-800">Performance</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-3" style={{ background: "#F0F9FF" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Award size={13} style={{ color: "#0EA5E9" }} />
              <span className="text-xs text-gray-500">Best Score</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {mockTests > 0 ? `${bestScore}` : "—"}
            </p>
            {mockTests > 0 && (
              <p className="text-xs text-gray-400">out of 120</p>
            )}
          </div>
          <div className="rounded-xl p-3" style={{ background: "#F5F3FF" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Target size={13} style={{ color: "#8B5CF6" }} />
              <span className="text-xs text-gray-500">Average Score</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {mockTests > 0 ? `${avgScore}` : "—"}
            </p>
            {mockTests > 0 && (
              <p className="text-xs text-gray-400">out of 120</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
      >
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200"
          onClick={logout}
        >
          <LogOut size={15} className="mr-2" />
          Logout
        </Button>
      </motion.div>

      <p className="text-center text-xs text-gray-400 mt-8">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600 transition-colors"
        >
          caffeine.ai
        </a>
      </p>
    </div>
  );
}
