import { Card } from "../common/Card";
import { Button } from "../common/Button";
import type { ScanStatus } from "../../api/settingsApi";

function fmtTime(ms?: number) {
  if (!ms) return "";
  const d = new Date(ms);
  return d.toLocaleString();
}

export function ScanStatusCard(props: {
  status: ScanStatus | null;
  onScan: () => Promise<void>;
  scanning: boolean;
  onRefresh: () => Promise<void>;
}) {
  const { status, onScan, scanning, onRefresh } = props;

  const running = !!status && (status as any).running;

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold">Library scan</div>
          <div className="mt-1 text-sm text-zinc-400">
            Start a background scan. Only new/changed files will be parsed.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onRefresh} disabled={scanning}>
            Refresh
          </Button>
          <Button onClick={onScan} disabled={scanning || running}>
            {running ? "Scanning…" : "Scan now"}
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
          <div className="text-zinc-400">Status</div>
          <div className="mt-1 font-medium">
            {running ? "Running" : status?.error ? "Failed" : status?.result ? "Finished" : "Idle"}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
          <div className="text-zinc-400">Started</div>
          <div className="mt-1 font-medium">{fmtTime((status as any)?.startedAt) || "—"}</div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
          <div className="text-zinc-400">Finished</div>
          <div className="mt-1 font-medium">{fmtTime((status as any)?.finishedAt) || "—"}</div>
        </div>
      </div>

      {status?.error ? (
        <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-200">
          {status.error}
        </div>
      ) : null}

      {status && (status as any).result ? (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {Object.entries((status as any).result).map(([k, v]) => (
            <div key={k} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
              <div className="text-zinc-400">{k}</div>
              <div className="mt-1 text-sm font-semibold tabular-nums">{String(v)}</div>
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
