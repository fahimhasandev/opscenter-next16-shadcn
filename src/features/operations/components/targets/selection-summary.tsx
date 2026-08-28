import { Card } from "@/components/ui/card";
import type { OperationTemplate } from "@/features/operations/types";

type Props = { environmentId: string; serverCount: number; template: OperationTemplate; onClear: () => void };

export function SelectionSummary({ environmentId, serverCount, template, onClear }: Props) {
  return (
    <Card className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold">Your Selection</h3>
        <button onClick={onClear} className="text-sm text-indigo-600">Clear All</button>
      </div>
      <dl className="space-y-5 text-sm">
        <Detail label="Environment" value={environmentId.toUpperCase()} />
        <Detail label="Servers" value={`${serverCount} selected`} />
        <Detail label="Template" value={template.name} />
        <Detail label="Supported Platform" value={template.supportedPlatforms.join(" / ")} capitalize />
      </dl>
    </Card>
  );
}

function Detail({ label, value, capitalize = false }: { label: string; value: string; capitalize?: boolean }) {
  return <div><dt className="text-slate-500">{label}</dt><dd className={`mt-1 font-medium ${capitalize ? "capitalize" : ""}`}>{value}</dd></div>;
}
