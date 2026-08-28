import yaml from "js-yaml";
import type { OperationTemplate } from "@/features/operations/types";

export type RawOperationPayload = {
  template_name?: string;
  templateName?: string;
  hostname?: string | string[];
  hostnames?: string[];
  environment?: string;
  config?: Record<string, unknown>;
  [key: string]: unknown;
};

export function parseRawOperation(text: string): RawOperationPayload {
  const trimmed = text.trim();
  if (!trimmed) throw new Error("Paste JSON or YAML first.");

  let parsed: unknown;

  try {
    parsed = JSON.parse(trimmed);
  } catch {
    parsed = yaml.load(trimmed);
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("The pasted content must be a JSON/YAML object.");
  }

  return parsed as RawOperationPayload;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[_|]/g, " ")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function findTemplateFromRaw(
  templates: OperationTemplate[],
  payload: RawOperationPayload
) {
  const rawName = String(
    payload.template_name ?? payload.templateName ?? ""
  ).trim();

  if (!rawName) return undefined;

  const needle = normalize(rawName);

  return templates.find((template) => {
    const candidates = [
      template.id,
      template.name,
      template.apiName ?? "",
      `${template.categoryName ?? ""} ${template.name}`
    ];

    return candidates.some((candidate) => normalize(candidate) === needle);
  });
}

export function getRawHostnames(payload: RawOperationPayload): string[] {
  const value = payload.hostname ?? payload.hostnames;

  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

function getAtPath(
  source: Record<string, unknown>,
  path: string[]
): unknown {
  let current: unknown = source;

  for (const key of path) {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return current;
}

export function mapRawParameters(
  templateId: string,
  payload: RawOperationPayload
): Record<string, unknown> {
  // Specific reverse mapping for the payload shown in the legacy modal.
  if (templateId === "apache-backups-restore") {
    const backupName =
      getAtPath(payload as Record<string, unknown>, [
        "apache",
        "config",
        "backup",
        "backup_name"
      ]) ??
      getAtPath(payload as Record<string, unknown>, [
        "config",
        "backup",
        "backup_name"
      ]);

    return {
      ...(backupName ? { backupName } : {}),
      restartApache: true
    };
  }

  if (payload.config && typeof payload.config === "object") {
    return payload.config;
  }

  // If there is no config wrapper, keep only non-routing keys.
  const ignored = new Set([
    "template_name",
    "templateName",
    "hostname",
    "hostnames",
    "environment"
  ]);

  return Object.fromEntries(
    Object.entries(payload).filter(([key]) => !ignored.has(key))
  );
}
