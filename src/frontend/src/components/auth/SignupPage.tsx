import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface SignupPageProps {
  onSwitchToLogin: () => void;
}

const features = [
  "120-question full-length mock tests",
  "Smart hierarchical syllabus tracker",
  "Daily practice & weak area review",
];

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.06,
      duration: 0.35,
      ease: [0, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

export function SignupPage({ onSwitchToLogin }: SignupPageProps) {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (confirmPassword !== password) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const result = await signup(name, email, password);
    setLoading(false);
    if (!result.success) setError(result.error ?? "Signup failed.");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F0F4F8" }}>
      {/* Left branding panel — desktop only */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className="hidden md:flex w-[45%] lg:w-[42%] flex-col items-center justify-center px-12 py-16 relative overflow-hidden"
        style={{ background: "#0F3554" }}
      >
        {/* Subtle background circles */}
        <div
          className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div
          className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full opacity-[0.07]"
          style={{ background: "white" }}
        />

        <div className="relative z-10 max-w-xs text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(4px)",
              }}
            >
              ⚖️
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
            TS LAWCET Prep
          </h1>
          <p
            className="text-sm mb-10"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Telangana Law Entrance Preparation
          </p>

          {/* Feature bullets */}
          <ul className="space-y-4 text-left">
            {features.map((feat) => (
              <li key={feat} className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.82)" }}
                >
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Right form panel */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className="flex-1 flex items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: "#0F3554" }}
            >
              ⚖️
            </div>
            <div>
              <h1
                className="text-lg font-bold tracking-tight"
                style={{ color: "#0F3554" }}
              >
                TS LAWCET Prep
              </h1>
              <p className="text-xs text-gray-500">
                Telangana Law Entrance Preparation
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {/* Heading */}
            <motion.div
              custom={0}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="mb-7"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Get started today
              </h2>
              <p className="text-sm text-gray-500">
                Create your free account and start preparing
              </p>
            </motion.div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="signup.modal"
            >
              <motion.div
                custom={1}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1.5"
              >
                <Label
                  htmlFor="signup-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </Label>
                <Input
                  id="signup-name"
                  data-ocid="signup.input"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="h-11 rounded-xl border-gray-200 focus:border-[#0F3554] focus:ring-2 focus:ring-[#0F3554]/20"
                />
              </motion.div>

              <motion.div
                custom={2}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1.5"
              >
                <Label
                  htmlFor="signup-email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="signup-email"
                  data-ocid="signup.input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="h-11 rounded-xl border-gray-200 focus:border-[#0F3554] focus:ring-2 focus:ring-[#0F3554]/20"
                />
              </motion.div>

              <motion.div
                custom={3}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1.5"
              >
                <Label
                  htmlFor="signup-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Input
                  id="signup-password"
                  data-ocid="signup.input"
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="h-11 rounded-xl border-gray-200 focus:border-[#0F3554] focus:ring-2 focus:ring-[#0F3554]/20"
                />
              </motion.div>

              <motion.div
                custom={4}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1.5"
              >
                <Label
                  htmlFor="signup-confirm-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </Label>
                <Input
                  id="signup-confirm-password"
                  data-ocid="signup.input"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="h-11 rounded-xl border-gray-200 focus:border-[#0F3554] focus:ring-2 focus:ring-[#0F3554]/20"
                />
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    key="signup-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    data-ocid="signup.error_state"
                    className="p-3 rounded-xl bg-red-50 border border-red-100"
                  >
                    <p className="text-sm text-red-600">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                custom={5}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.15 }}
                >
                  <Button
                    type="submit"
                    data-ocid="signup.submit_button"
                    disabled={loading}
                    className="w-full h-11 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-110"
                    style={{ background: "#0F3554" }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Creating account…
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>

            <motion.p
              custom={6}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 text-center text-sm text-gray-500"
            >
              Already have an account?{" "}
              <button
                type="button"
                data-ocid="signup.link"
                onClick={onSwitchToLogin}
                className="font-semibold hover:underline transition-colors"
                style={{ color: "#0F3554" }}
              >
                Sign in
              </button>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
