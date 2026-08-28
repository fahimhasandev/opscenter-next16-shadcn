import { OperationParametersStep } from "../forms/operation-parameters-step";
import { OperationReviewStep, type ReviewFormat } from "../review/operation-review-step";
import type { OperationStep } from "./operation-stepper";
import { OperationTargetsStep } from "../targets/operation-targets-step";
import type { Environment, OperationTemplate, TemplateFormSchema } from "@/features/operations/types";

type Props = {
  step: OperationStep;
  template: OperationTemplate;
  environments: Environment[];
  environmentsLoading: boolean;
  environmentId?: string;
  selectedServerIds: string[];
  schema?: TemplateFormSchema;
  parameters: Record<string, unknown>;
  payload: string;
  reviewFormat: ReviewFormat;
  runPending: boolean;
  runError: boolean;
  operationId?: string;
  onStepChange: (step: OperationStep) => void;
  onEnvironmentChange: (id: string) => void;
  onServersChange: (ids: string[]) => void;
  onParametersChange: (value: Record<string, unknown>) => void;
  onFormatChange: (format: ReviewFormat) => void;
  onSupport: () => void;
  onClear: () => void;
  onExecute: () => void;
};

export function OperationWorkflow(props: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 lg:p-6">
      {props.step === 1 && (
        <OperationTargetsStep
          template={props.template}
          environments={props.environments}
          environmentsLoading={props.environmentsLoading}
          environmentId={props.environmentId}
          selectedServerIds={props.selectedServerIds}
          onEnvironmentChange={props.onEnvironmentChange}
          onServersChange={props.onServersChange}
          onNext={() => props.onStepChange(2)}
        />
      )}
      {props.step === 2 && (
        <OperationParametersStep
          schema={props.schema}
          parameters={props.parameters}
          onChange={props.onParametersChange}
          onBack={() => props.onStepChange(1)}
          onReview={() => props.onStepChange(3)}
        />
      )}
      {props.step === 3 && (
        <OperationReviewStep
          template={props.template}
          environmentId={props.environmentId}
          selectedServerCount={props.selectedServerIds.length}
          parameters={props.parameters}
          payload={props.payload}
          format={props.reviewFormat}
          isPending={props.runPending}
          error={props.runError}
          operationId={props.operationId}
          onFormatChange={props.onFormatChange}
          onSupport={props.onSupport}
          onClear={props.onClear}
          onBack={() => props.onStepChange(2)}
          onExecute={props.onExecute}
        />
      )}
    </div>
  );
}
