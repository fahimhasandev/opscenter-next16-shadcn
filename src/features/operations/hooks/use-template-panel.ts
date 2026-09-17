"use client";

import { useState } from "react";
import { useAllTemplates, useCategories, useTemplates } from "./use-operations";
import type {
  PlatformFilter,
  TemplateTab,
} from "@/features/operations/components/templates/template-panel-types";
import type { InitialOperationsData } from "../types";

export function useTemplatePanel(initialData: InitialOperationsData) {
  const [activeTab, setActiveTab] = useState<TemplateTab>("categories");
  const [expandedId, setExpandedId] = useState<string>();
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  const [search, setSearch] = useState("");
  const categories = useCategories(initialData.categories);
  const templates = useTemplates(expandedId);
  const allTemplates = useAllTemplates(initialData.templates);
  const categoryItems = allTemplates.data?.length
    ? Array.from(
        new Map(
          allTemplates.data.map((template) => [
            template.categoryId,
            {
              id: template.categoryId,
              name: template.categoryName ?? template.categoryId,
            },
          ]),
        ).values(),
      )
    : (categories.data ?? []);
  const query = search.trim().toLowerCase();
  const source = search.trim()
    ? (allTemplates.data ?? [])
    : (templates.data ?? []);
  const filteredTemplates = source.filter(
    (template) =>
      (!query || template.name.toLowerCase().includes(query)) &&
      (platformFilter === "all" ||
        template.supportedPlatforms.includes(platformFilter)),
  );
  const visibleCounts = new Map<string, number>();

  for (const template of allTemplates.data ?? []) {
    const matchesSearch = !query || template.name.toLowerCase().includes(query);
    const matchesPlatform =
      platformFilter === "all" ||
      template.supportedPlatforms.includes(platformFilter);
    if (matchesSearch && matchesPlatform) {
      visibleCounts.set(
        template.categoryId,
        (visibleCounts.get(template.categoryId) ?? 0) + 1,
      );
    }
  }

  function selectPlatform(filter: PlatformFilter) {
    setPlatformFilter(filter);
    setActiveTab("categories");
    setExpandedId(undefined);
  }

  return {
    activeTab,
    expandedId,
    platformFilter,
    search,
    categories,
    categoryItems,
    templates,
    filteredTemplates,
    visibleCounts,
    totalMatches: Array.from(visibleCounts.values()).reduce(
      (total, count) => total + count,
      0,
    ),
    setActiveTab,
    setExpandedId,
    setSearch,
    selectPlatform,
  };
}
