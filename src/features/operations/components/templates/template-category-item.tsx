import { ChevronDown, ChevronRight } from "lucide-react";
import type { OperationTemplate, TemplateCategory } from "@/features/operations/types";

type Props = { category: TemplateCategory; open: boolean; count?: number; templates: OperationTemplate[]; loading: boolean; emptyMessage: string; selectedId?: string; onToggle: () => void; onSelect: (template: OperationTemplate) => void };

export function TemplateCategoryItem({ category, open, count, templates, loading, emptyMessage, selectedId, onToggle, onSelect }: Props) {
  return (
    <div className="rounded-xl border border-slate-100">
      <button className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left ${open ? "bg-indigo-50 text-indigo-700" : "hover:bg-slate-50"}`} onClick={onToggle}>
        <span className="font-medium">{category.name}</span>
        <span className="flex items-center gap-2">
          {count !== undefined && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{count}</span>}
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      </button>
      {open && <div className="space-y-1 px-2 pb-2">
        {loading && <div className="px-3 py-2 text-sm text-slate-500">Loading templates...</div>}
        {templates.map((template) => <TemplateButton key={template.id} template={template} selected={template.id === selectedId} onSelect={onSelect} />)}
        {!loading && templates.length === 0 && <div className="px-3 py-3 text-sm text-slate-400">No templates match {emptyMessage}.</div>}
      </div>}
    </div>
  );
}

function TemplateButton({ template, selected, onSelect }: { template: OperationTemplate; selected: boolean; onSelect: (template: OperationTemplate) => void }) {
  return <button onClick={() => onSelect(template)} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${selected ? "bg-indigo-100 font-medium text-indigo-800" : "hover:bg-slate-50"}`}>
    <span className="block">{template.name}</span>
    <span className="mt-1 flex gap-1">{template.supportedPlatforms.map((platform) => <span key={platform} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase text-slate-500">{platform}</span>)}</span>
  </button>;
}
