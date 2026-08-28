import { ServerSelector } from "@/features/operations/components/servers/server-selector";
import { EnvironmentPicker } from "./environment-picker";
import { SelectionSummary } from "./selection-summary";
import { Button } from "@/components/ui/button";
import type { Environment, OperationTemplate } from "@/features/operations/types";

type Props = {
  template: OperationTemplate;
  environments: Environment[];
  environmentsLoading: boolean;
  environmentId?: string;
  selectedServerIds: string[];
  onEnvironmentChange: (id: string) => void;
  onServersChange: (ids: string[]) => void;
  onNext: () => void;
};

export function OperationTargetsStep({
  template,
  environments,
  environmentsLoading,
  environmentId,
  selectedServerIds,
  onEnvironmentChange,
  onServersChange,
  onNext,
}: Props) {
  return (
    <div className="space-y-5">
      <EnvironmentPicker environments={environments} loading={environmentsLoading} selectedId={environmentId} onChange={onEnvironmentChange} />

      {environmentId ? (
        <div className="grid min-h-0 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)]">
          <ServerSelector
            templateId={template.id}
            environmentId={environmentId}
            selectedServerIds={selectedServerIds}
            onChange={onServersChange}
            allowedPlatforms={template.supportedPlatforms}
          />
          <SelectionSummary environmentId={environmentId} serverCount={selectedServerIds.length} template={template} onClear={() => onServersChange([])} />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500 dark:border-slate-700">
          Select an environment to load the eligible servers.
        </div>
      )}

      <div className="flex justify-end">
        <Button disabled={!environmentId || selectedServerIds.length === 0} onClick={onNext}>
          Next: Configure Parameters
        </Button>
      </div>
    </div>
  );
}
