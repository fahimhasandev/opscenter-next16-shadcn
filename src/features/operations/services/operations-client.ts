import "client-only";

import { apiClient } from "@/lib/api-client";
import type {
  Environment,
  OperationTemplate,
  RunOperationPayload,
  RunOperationResponse,
  ServersResponse,
  TemplateCategory
} from "@/features/operations/types";

export const operationsApi = {
  getCategories: () =>
    apiClient<TemplateCategory[]>("/api/template-categories"),

  getAllTemplates: () =>
    apiClient<OperationTemplate[]>("/api/templates"),

  getTemplates: (categoryId: string) =>
    apiClient<OperationTemplate[]>(
      `/api/templates?category=${encodeURIComponent(categoryId)}`
    ),

  getEnvironments: (templateId: string) =>
    apiClient<Environment[]>(
      `/api/templates/${encodeURIComponent(templateId)}/environments`
    ),

  getServers: (templateId: string, environmentId: string, search = "") =>
    apiClient<ServersResponse>(
      `/api/servers?templateId=${encodeURIComponent(templateId)}&environment=${encodeURIComponent(environmentId)}&search=${encodeURIComponent(search)}`
    ),

  runOperation: (payload: RunOperationPayload) =>
    apiClient<RunOperationResponse>("/api/operations/run", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};
