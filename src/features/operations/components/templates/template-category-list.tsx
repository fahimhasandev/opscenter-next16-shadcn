import { TemplateCategoryItem } from "./template-category-item";
import type { OperationTemplate, TemplateCategory } from "@/features/operations/types";
import type { PlatformFilter, TemplateTab } from "./template-panel-types";

type Props = {
  categories: TemplateCategory[];
  expandedId?: string;
  filteredTemplates: OperationTemplate[];
  isCategoriesLoading: boolean;
  isCategoriesError: boolean;
  isTemplatesLoading: boolean;
  platformFilter: PlatformFilter;
  selectedTemplateId?: string;
  tab: TemplateTab;
  visibleCounts: Map<string, number>;
  onExpandedChange: (id?: string) => void;
  onSelectTemplate: (template: OperationTemplate) => void;
};

export function TemplateCategoryList({
  categories,
  expandedId,
  filteredTemplates,
  isCategoriesLoading,
  isCategoriesError,
  isTemplatesLoading,
  platformFilter,
  selectedTemplateId,
  tab,
  visibleCounts,
  onExpandedChange,
  onSelectTemplate,
}: Props) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      {isCategoriesLoading && (
        <div className="p-3 text-sm text-slate-500">Loading categories...</div>
      )}
      {isCategoriesError && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          Could not load categories from the backend API.
        </div>
      )}

      <div className="space-y-2">
        {categories.map((category) => {
          const open = expandedId === category.id;
          const count = visibleCounts.get(category.id) ?? category.count;

          return <TemplateCategoryItem key={category.id} category={category} open={open} count={count} templates={filteredTemplates} loading={isTemplatesLoading} emptyMessage={tab === "platforms" ? platformFilter.toUpperCase() : "your search"} selectedId={selectedTemplateId} onToggle={() => onExpandedChange(open ? undefined : category.id)} onSelect={onSelectTemplate} />;
        })}
      </div>
    </div>
  );
}
