import { ShieldCheck } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function IIStatusCard() {
  const { user } = useAuth();

  return (
    <div
      data-ocid="ii_status.card"
      className="bg-white rounded-xl border border-border shadow-card p-5"
    >
      <h2 className="text-sm font-semibold text-foreground mb-4">
        Account Status
      </h2>

      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-50">
          <ShieldCheck size={18} className="text-green-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-green-600">Signed In</p>
          <p className="text-xs text-muted-foreground">Session active</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between gap-2">
          <span className="text-xs text-muted-foreground">Name</span>
          <span className="text-xs font-medium text-foreground">
            {user?.name ?? "—"}
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-xs text-muted-foreground">Email</span>
          <span className="text-xs font-medium text-foreground truncate max-w-[140px]">
            {user?.email ?? "—"}
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-xs text-muted-foreground">Status</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-600">
            Active
          </span>
        </div>
      </div>
    </div>
  );
}
