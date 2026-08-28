"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { operationsApi } from "@/features/operations/services/operations-client";
import { getFrontendTemplateForm } from "@/features/operations/config/template-forms";

export function useCategories(initialData?: Awaited<ReturnType<typeof operationsApi.getCategories>>) {
  return useQuery({
    queryKey: ["template-categories"],
    queryFn: operationsApi.getCategories,
    initialData,
  });
}


export function useAllTemplates(initialData?: Awaited<ReturnType<typeof operationsApi.getAllTemplates>>) {
  return useQuery({
    queryKey: ["templates", "all"],
    queryFn: () => operationsApi.getAllTemplates(),
    initialData,
  });
}

export function useTemplates(categoryId?: string) {
  return useQuery({
    queryKey: ["templates", categoryId],
    queryFn: () => operationsApi.getTemplates(categoryId!),
    enabled: Boolean(categoryId)
  });
}

export function useEnvironments(templateId?: string) {
  return useQuery({
    queryKey: ["environments", templateId],
    queryFn: () => operationsApi.getEnvironments(templateId!),
    enabled: Boolean(templateId)
  });
}

export function useServers(
  templateId?: string,
  environmentId?: string,
  search = ""
) {
  return useQuery({
    queryKey: ["servers", templateId, environmentId, search],
    queryFn: () =>
      operationsApi.getServers(templateId!, environmentId!, search),
    enabled: Boolean(templateId && environmentId)
  });
}

export function useTemplateForm(templateId?: string, templateTitle?: string) {
  return {
    data: templateId
      ? getFrontendTemplateForm(templateId, templateTitle)
      : undefined,
    isLoading: false,
    isError: false
  };
}

export function useRunOperation() {
  return useMutation({
    mutationFn: operationsApi.runOperation
  });
}
