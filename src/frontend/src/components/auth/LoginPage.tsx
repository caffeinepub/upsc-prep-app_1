import { Button } from "@/components/ui/button";
import { Fingerprint, Loader2, ShieldCheck, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export function LoginPage() {
  const { login, isLoggingIn, isLoginError, loginError } =
    useInternetIdentity();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.068 243) 0%, oklch(0.18 0.06 243) 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "oklch(var(--navy))" }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                aria-label="PrepSage logo"
                role="img"
              >
                <rect
                  x="1"
                  y="1"
                  width="9"
                  height="9"
                  rx="1.5"
                  fill="white"
                  opacity="0.95"
                />
                <rect
                  x="12"
                  y="1"
                  width="9"
                  height="9"
                  rx="1.5"
                  fill="white"
                  opacity="0.6"
                />
                <rect
                  x="1"
                  y="12"
                  width="9"
                  height="9"
                  rx="1.5"
                  fill="white"
                  opacity="0.6"
                />
                <rect
                  x="12"
                  y="12"
                  width="9"
                  height="9"
                  rx="1.5"
                  fill="white"
                  opacity="0.3"
                />
              </svg>
            </div>
            <div>
              <h1
                className="text-xl font-bold tracking-tight"
                style={{ color: "oklch(var(--navy))" }}
              >
                PrepSage
              </h1>
              <p className="text-xs text-muted-foreground">
                UPSC Preparation Platform
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sign in to continue your UPSC preparation journey. Your progress
              and targets are waiting.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                icon: Fingerprint,
                label: "Biometrics & Passkeys",
                desc: "Face ID, Touch ID, hardware keys",
              },
              {
                icon: ShieldCheck,
                label: "Cryptographically secure",
                desc: "No passwords stored anywhere",
              },
              {
                icon: Smartphone,
                label: "Works on all devices",
                desc: "Desktop, mobile, tablet",
              },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "oklch(var(--icon-circle))" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(var(--navy))" }}
                >
                  <Icon size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {isLoginError && (
            <div
              data-ocid="login.error_state"
              className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100"
            >
              <p className="text-xs text-red-600">
                {loginError?.message ?? "Login failed. Please try again."}
              </p>
            </div>
          )}

          <Button
            data-ocid="login.primary_button"
            onClick={login}
            disabled={isLoggingIn}
            className="w-full h-11 font-semibold text-sm rounded-xl"
            style={{ background: "oklch(var(--navy))", color: "white" }}
          >
            {isLoggingIn ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Connecting to Internet Identity…
              </>
            ) : (
              "Sign in with Internet Identity"
            )}
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Powered by{" "}
            <a
              href="https://identity.ic0.app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
              style={{ color: "oklch(var(--navy))" }}
            >
              Internet Identity
            </a>{" "}
            — a decentralized, password-free authentication system.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
