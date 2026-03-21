import type { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div
        data-ocid="auth.loading_state"
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#F5F7FA" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "#0F3554" }}
          >
            ⚖️
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-[#0F3554] rounded-full animate-spin" />
            <span className="text-gray-600 text-sm font-medium">Loading…</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
