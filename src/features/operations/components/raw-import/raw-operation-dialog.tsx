import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  raw: string;
  error: string;
  applying: boolean;
  onRawChange: (value: string) => void;
  onApply: () => void;
  onClose: () => void;
};

export function RawOperationDialog({ raw, error, applying, onRawChange, onApply, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-6">
      <div className="flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-semibold">Submit Raw JSON/YAML</h2>
            <p className="mt-1 text-sm text-slate-500">Paste a payload and OpsCenter will reverse-fill the workflow.</p>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900" aria-label="Close raw operation dialog">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="min-h-0 flex-1 p-6">
          <textarea className="h-[52vh] w-full resize-none rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-900" value={raw} onChange={(event) => onRawChange(event.target.value)} spellCheck={false} />
          {error && <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        </div>
        <footer className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4 dark:border-slate-800">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button disabled={applying} onClick={onApply}>{applying ? "Applying..." : "Apply to Workflow"}</Button>
        </footer>
      </div>
    </div>
  );
}
