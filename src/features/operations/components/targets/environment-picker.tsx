import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Environment } from "@/features/operations/types";

type Props = { environments: Environment[]; loading: boolean; selectedId?: string; onChange: (id: string) => void };

export function EnvironmentPicker({ environments, loading, selectedId, onChange }: Props) {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold">Environment &amp; Servers</h2>
      <p className="mb-3 mt-1 text-sm text-slate-500">Choose an environment, then select eligible servers.</p>
      <div className="flex flex-wrap gap-2">
        {loading && <span className="text-sm text-slate-500">Loading environments...</span>}
        {environments.map((environment) => (
          <Button key={environment.id} variant={selectedId === environment.id ? "default" : "outline"} onClick={() => onChange(environment.id)}>
            {environment.name}
          </Button>
        ))}
      </div>
    </Card>
  );
}
