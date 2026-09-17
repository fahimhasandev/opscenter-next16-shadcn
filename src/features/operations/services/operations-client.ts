import "client-only";

import { apiClient } from "@/lib/api-client";
import { normalizeTemplates } from "../lib/normalize-template";
import type {
  ApiTemplate,
  Environment,
  OperationTemplate,
  RunOperationPayload,
  RunOperationResponse,
  ServersResponse,
  TemplateCategory,
} from "@/features/operations/types";

export const operationsApi = {
  getCategories: () =>
    apiClient<TemplateCategory[]>("/api/template-categories"),

  getAllTemplates: () =>
    apiClient<ApiTemplate | ApiTemplate[]>("/api/templates").then(
      normalizeTemplates,
    ),

  getTemplates: (categoryId: string) =>
    apiClient<ApiTemplate | ApiTemplate[]>(
      `/api/templates?category=${encodeURIComponent(categoryId)}`,
    ).then(normalizeTemplates),

  getEnvironments: (templateId: string) =>
    apiClient<Environment[]>(
      `/api/templates/${encodeURIComponent(templateId)}/environments`,
    ),

  getServers: (templateId: string, environmentId: string, search = "") =>
    apiClient<ServersResponse>(
      `/api/servers?templateId=${encodeURIComponent(templateId)}&environment=${encodeURIComponent(environmentId)}&search=${encodeURIComponent(search)}`,
    ),

  runOperation: (payload: RunOperationPayload) =>
    apiClient<RunOperationResponse>("/api/operations/run", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
