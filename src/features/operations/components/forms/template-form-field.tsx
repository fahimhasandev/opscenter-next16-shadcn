import { Input } from "@/components/ui/input";
import type { FormField } from "@/features/operations/types";

type Props = { field: FormField; value: unknown; onChange: (value: unknown) => void };

export function TemplateFormField({ field, value, onChange }: Props) {
  if (field.type === "select") {
    return (
      <select className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3" value={String(value ?? "")} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select...</option>
        {(field.options ?? []).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    );
  }
  if (field.type === "textarea") {
    return <textarea className="min-h-28 w-full rounded-lg border border-slate-200 bg-white p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" value={String(value ?? "")} maxLength={field.maxLength} placeholder={field.placeholder} onChange={(event) => onChange(event.target.value)} />;
  }
  if (field.type === "boolean") {
    return <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />Enabled</label>;
  }
  return <Input type={field.type === "number" ? "number" : "text"} value={String(value ?? "")} placeholder={field.placeholder} onChange={(event) => onChange(field.type === "number" ? Number(event.target.value) : event.target.value)} />;
}
