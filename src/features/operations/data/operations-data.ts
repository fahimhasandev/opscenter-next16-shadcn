import "server-only";

import { environments, servers, templateCategories, templates } from "../mock/data";

export async function getTemplateCategories() {
  return templateCategories;
}

export async function getTemplates(categoryId?: string) {
  return categoryId
    ? templates.filter((template) => template.categoryId === categoryId)
    : templates;
}

export async function getEnvironments(templateId: string) {
  const exists = templates.some((template) => template.id === templateId);
  return exists ? environments : null;
}

export async function getServers(environmentId?: string, search = "") {
  const query = search.toLowerCase();
  const filtered = servers.filter((server) => {
    const matchesEnvironment = !environmentId || server.environmentId === environmentId;
    const matchesSearch =
      !query ||
      server.hostname.toLowerCase().includes(query) ||
      (server.os ?? "").toLowerCase().includes(query) ||
      (server.platform ?? "").toLowerCase().includes(query);
    return matchesEnvironment && matchesSearch;
  });

  return { total: filtered.length, servers: filtered };
}
