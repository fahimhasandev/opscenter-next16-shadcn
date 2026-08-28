"use client";

import { useTemplatePanel } from "@/features/operations/hooks/use-template-panel";
import type { InitialOperationsData, OperationTemplate } from "@/features/operations/types";
import { TemplateCategoryList } from "./template-category-list";
import { PlatformFilterMenu } from "./platform-filter-menu";
import { TemplateSearchControls } from "./template-search-controls";

type Props = {
  initialData: InitialOperationsData;
  selectedTemplateId?: string;
  onSelectTemplate: (template: OperationTemplate) => void;
};

export function TemplatePanel({ initialData, selectedTemplateId, onSelectTemplate }: Props) {
  const panel = useTemplatePanel(initialData);

  return (
    <section className="flex max-h-[45svh] min-h-0 w-full shrink-0 flex-col border-b border-slate-200 bg-white p-4 lg:max-h-none lg:w-[350px] lg:border-b-0 lg:border-r">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Templates</h2>
      </div>

      <TemplateSearchControls
        tab={panel.activeTab}
        platform={panel.platformFilter}
        search={panel.search}
        total={panel.totalMatches}
        onTabChange={panel.setActiveTab}
        onSearchChange={panel.setSearch}
      />
      {panel.activeTab === "platforms" && <PlatformFilterMenu selected={panel.platformFilter} onChange={panel.selectPlatform} />}

      <TemplateCategoryList
        categories={panel.categories.data ?? []}
        expandedId={panel.expandedId}
        filteredTemplates={panel.filteredTemplates}
        isCategoriesLoading={panel.categories.isLoading}
        isCategoriesError={panel.categories.isError}
        isTemplatesLoading={panel.templates.isLoading}
        platformFilter={panel.platformFilter}
        selectedTemplateId={selectedTemplateId}
        tab={panel.activeTab}
        visibleCounts={panel.visibleCounts}
        onExpandedChange={panel.setExpandedId}
        onSelectTemplate={onSelectTemplate}
      />
    </section>
  );
}
