import { OperationReviewSummary } from "./operation-review-summary";
import { PayloadFormatSelector, PayloadPreview } from "./payload-preview";
import { Button } from "@/components/ui/button";
import type { OperationTemplate } from "@/features/operations/types";

export type ReviewFormat = "json" | "yaml";

type Props = {
  template: OperationTemplate;
  environmentId?: string;
  selectedServerCount: number;
  parameters: Record<string, unknown>;
  payload: string;
  format: ReviewFormat;
  isPending: boolean;
  error: boolean;
  operationId?: string;
  onFormatChange: (format: ReviewFormat) => void;
  onSupport: () => void;
  onClear: () => void;
  onBack: () => void;
  onExecute: () => void;
};

export function OperationReviewStep(props: Props) {
  return (
    <div>
      <OperationReviewSummary
        template={props.template}
        environmentId={props.environmentId}
        selectedServerCount={props.selectedServerCount}
        parameters={props.parameters}
      />
      {props.operationId && (
        <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700">
          Operation submitted successfully. ID: {props.operationId}
        </div>
      )}
      {props.error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          Failed to submit operation.
        </div>
      )}
      <div className="my-4 flex flex-wrap items-center justify-between gap-4">
        <PayloadFormatSelector
          format={props.format}
          onFormatChange={props.onFormatChange}
        />
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={props.onSupport} className="text-sm text-indigo-600">Support</button>
          <Button variant="outline" onClick={props.onClear}>Clear</Button>
          <Button variant="outline" onClick={props.onBack}>Back</Button>
          <Button disabled={props.isPending} onClick={props.onExecute}>
            {props.isPending ? "Running..." : "Run Operation"}
          </Button>
        </div>
      </div>
      <PayloadPreview
        payload={props.payload}
        format={props.format}
        onFormatChange={props.onFormatChange}
      />
    </div>
  );
}
