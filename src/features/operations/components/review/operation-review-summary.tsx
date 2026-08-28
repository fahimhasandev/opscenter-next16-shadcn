import { Card } from "@/components/ui/card";
import type { OperationTemplate } from "@/features/operations/types";

type Props = {
  template: OperationTemplate;
  environmentId?: string;
  selectedServerCount: number;
  parameters: Record<string, unknown>;
};

export function OperationReviewSummary({ template, environmentId, selectedServerCount, parameters }: Props) {
  return (
    <Card className="p-6">
      <h2 className="mb-5 text-lg font-semibold">Review &amp; Execute</h2>
      <div className="grid gap-4 text-sm">
        <ReviewDetail label="Template" value={template.name} />
        <ReviewDetail label="Environment" value={environmentId?.toUpperCase() ?? "—"} />
        <ReviewDetail label="Servers" value={String(selectedServerCount)} />
        <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
          <span className="text-slate-500">Parameters</span>
          <pre className="overflow-auto rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-900">
            {JSON.stringify(parameters, null, 2)}
          </pre>
        </div>
      </div>
    </Card>
  );
}

function ReviewDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
