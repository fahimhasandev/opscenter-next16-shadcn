import type { ReviewFormat } from "./operation-review-step";

type Props = {
  payload: string;
  format: ReviewFormat;
  onFormatChange: (format: ReviewFormat) => void;
};

export function PayloadPreview({ payload, format }: Props) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      // Clipboard access is optional.
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([payload], { type: "text/plain" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `payload.${format}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-lg bg-slate-50 p-3">
        <div className="mb-2 flex items-center justify-end gap-2">
          <button onClick={copy} className="text-sm text-indigo-600">Copy</button>
          <button onClick={download} className="text-sm text-indigo-600">Download</button>
        </div>
        <textarea readOnly value={payload} className="w-full resize-none rounded-md border border-slate-100 bg-white p-3 text-xs font-mono leading-5" rows={12} />
    </div>
  );
}

export function PayloadFormatSelector({ format, onFormatChange }: Pick<Props, "format" | "onFormatChange">) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600">View:</span>
      <div className="rounded-md bg-slate-50 p-1">
        {(["json", "yaml"] as const).map((option) => (
          <button
            key={option}
            onClick={() => onFormatChange(option)}
            className={`rounded px-2 py-1 text-xs ${option === "yaml" ? "ml-1" : ""} ${format === option ? "bg-white font-medium text-indigo-700" : "text-slate-600"}`}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
