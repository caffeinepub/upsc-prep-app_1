import { ShieldCheck } from "lucide-react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export function IIStatusCard() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal = principal ? `${principal.slice(0, 10)}...` : "Unknown";

  return (
    <div
      data-ocid="ii_status.card"
      className="bg-white rounded-xl border border-border shadow-card p-5"
    >
      <h2 className="text-sm font-semibold text-foreground mb-4">
        Internet Identity Status
      </h2>

      {/* Verified badge */}
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "oklch(var(--success-bg))" }}
        >
          <ShieldCheck
            size={18}
            style={{ color: "oklch(var(--success-text))" }}
          />
        </div>
        <div>
          <p
            className="text-xs font-semibold"
            style={{ color: "oklch(var(--success-text))" }}
          >
            Verified & Connected
          </p>
          <p className="text-xs text-muted-foreground">
            Identity authenticated
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between gap-2">
          <span className="text-xs text-muted-foreground">Principal ID</span>
          <span className="text-xs font-mono font-medium text-foreground">
            {shortPrincipal}
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-xs text-muted-foreground">Session</span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(var(--success-bg))",
              color: "oklch(var(--success-text))",
            }}
          >
            Active
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-xs text-muted-foreground">Last login</span>
          <span className="text-xs text-foreground">Just now</span>
        </div>
      </div>
    </div>
  );
}
