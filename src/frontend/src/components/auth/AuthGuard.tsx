import type { ReactNode } from "react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div
        data-ocid="auth.loading_state"
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(var(--navy-deep))" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "oklch(var(--icon-circle))" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-label="PrepSage logo"
              role="img"
            >
              <rect
                x="2"
                y="2"
                width="11"
                height="11"
                rx="2"
                fill="white"
                opacity="0.9"
              />
              <rect
                x="15"
                y="2"
                width="11"
                height="11"
                rx="2"
                fill="white"
                opacity="0.6"
              />
              <rect
                x="2"
                y="15"
                width="11"
                height="11"
                rx="2"
                fill="white"
                opacity="0.6"
              />
              <rect
                x="15"
                y="15"
                width="11"
                height="11"
                rx="2"
                fill="white"
                opacity="0.3"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-white/70 text-sm font-medium">
              Initializing PrepSage…
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
