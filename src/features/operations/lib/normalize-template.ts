import type { ApiTemplate, OperationTemplate } from "../types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function platformsFor(value?: string) {
  const platform = value?.toLowerCase() ?? "";
  const platforms = ["windows", "linux"].filter((item) =>
    platform.includes(item),
  ) as ("windows" | "linux")[];
  return platforms.length > 0
    ? platforms
    : (["linux", "windows"] as ("windows" | "linux")[]);
}

export function normalizeTemplate(template: ApiTemplate): OperationTemplate {
  const categoryName = template.category?.trim() || "Other";
  const id = template.template_name;

  return {
    id,
    name: template.friendly_name?.trim() || template.template_name,
    apiName: template.template_name,
    categoryId: slugify(categoryName),
    categoryName,
    description:
      typeof template.JSONSchema?.description === "string"
        ? template.JSONSchema.description
        : undefined,
    requiresApproval:
      template.requires_variance === true ||
      template.requires_variance === "True",
    supportedPlatforms: platformsFor(
      template.platform ?? String(template.server_requirements?.platform ?? ""),
    ),
    jsonSchema: template.JSONSchema,
    raw: template,
  };
}

export function normalizeTemplates(value: ApiTemplate | ApiTemplate[]) {
  return (Array.isArray(value) ? value : [value]).map(normalizeTemplate);
}
