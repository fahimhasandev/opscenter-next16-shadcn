import { DynamicTemplateForm } from "@/features/operations/components/forms/dynamic-template-form";
import { Button } from "@/components/ui/button";
import type { TemplateFormSchema } from "@/features/operations/types";

type Props = {
  schema?: TemplateFormSchema;
  parameters: Record<string, unknown>;
  onChange: (parameters: Record<string, unknown>) => void;
  onBack: () => void;
  onReview: () => void;
};

export function OperationParametersStep({ schema, parameters, onChange, onBack, onReview }: Props) {
  return (
    <div>
      <div className="mb-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
        This form is dynamic, but its schema is maintained manually in the frontend.
      </div>
      {schema && <DynamicTemplateForm schema={schema} value={parameters} onChange={onChange} />}
      <div className="mt-5 flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onReview}>Review</Button>
      </div>
    </div>
  );
}
