import { MNEMONIC_OPTIONS } from "@/features/operations/config/operations-ui";
import type { Server } from "@/features/operations/types";

type Props = {
  servers: Server[];
  selectedIds: string[];
  loading: boolean;
  error: boolean;
  onToggle: (server: Server) => void;
};

export function ServerList({ servers, selectedIds, loading, error, onToggle }: Props) {
  return (
    <div className="max-h-[460px] overflow-y-auto border-t border-slate-100">
      {loading && <ListMessage>Loading servers...</ListMessage>}
      {error && <ListMessage error>Could not load servers from the backend.</ListMessage>}
      {servers.map((server) => (
        <ServerRow
          key={server.id}
          server={server}
          selected={selectedIds.includes(server.id)}
          onToggle={onToggle}
        />
      ))}
      {!loading && servers.length === 0 && (
        <ListMessage centered>No servers match the current filters.</ListMessage>
      )}
    </div>
  );
}

function ServerRow({ server, selected, onToggle }: { server: Server; selected: boolean; onToggle: (server: Server) => void }) {
  const mnemonic = MNEMONIC_OPTIONS.find((item) => item.id === server.mnemonicId);

  return (
    <label className={`grid cursor-pointer grid-cols-1 items-center gap-2 border-b border-slate-100 px-4 py-3 text-sm sm:grid-cols-[28px_1fr_90px_110px_130px] ${selected ? "bg-indigo-50" : "hover:bg-slate-50"}`}>
      <input type="checkbox" checked={selected} onChange={() => onToggle(server)} className="hidden sm:inline-block" />
      <span className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${statusColor(server.status)}`} />
        {server.hostname.replace(/\.rnd\.dev\.net$/i, "")}
      </span>
      <span className="hidden text-slate-500 sm:block">{server.os ?? "—"}</span>
      <span className="hidden text-slate-500 sm:block">{server.platform ?? "—"}</span>
      <span className="hidden truncate text-slate-500 sm:block">{mnemonic?.label ?? "—"}</span>
    </label>
  );
}

function statusColor(status?: string) {
  if (status === "online") return "bg-emerald-500";
  if (status === "warning") return "bg-amber-500";
  return "bg-slate-300";
}

function ListMessage({ children, error = false, centered = false }: { children: React.ReactNode; error?: boolean; centered?: boolean }) {
  return <div className={`${centered ? "p-6 text-center" : "p-4"} text-sm ${error ? "text-red-700" : "text-slate-500"}`}>{children}</div>;
}
