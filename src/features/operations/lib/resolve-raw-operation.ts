import { findTemplateFromRaw, getRawHostnames, mapRawParameters, type RawOperationPayload } from "./raw-operation";
import { operationsApi } from "@/features/operations/services/operations-client";
import type { OperationTemplate, Server } from "@/features/operations/types";

export async function resolveRawOperation(
  templates: OperationTemplate[],
  payload: RawOperationPayload,
) {
  const template = findTemplateFromRaw(templates, payload);
  if (!template) {
    const name = String(payload.template_name ?? payload.templateName ?? "");
    throw new Error(`Template "${name}" was not found.`);
  }

  const hostnames = getRawHostnames(payload);
  const desiredHosts = new Set(hostnames.map((host) => host.toLowerCase()));
  const environments = await operationsApi.getEnvironments(template.id);
  let environment = payload.environment
    ? environments.find((item) => matchesEnvironment(item, String(payload.environment)))
    : undefined;
  let serverIds: string[] = [];

  if (environment) {
    const result = await operationsApi.getServers(template.id, environment.id);
    serverIds = eligibleServerIds(result.servers, desiredHosts, template);
  } else if (desiredHosts.size > 0) {
    for (const item of await loadEnvironmentServers(template.id, environments)) {
      const ids = eligibleServerIds(item.servers, desiredHosts, template);
      if (ids.length > 0) {
        environment = item.environment;
        serverIds = ids;
        break;
      }
    }
  }

  if (hostnames.length > 0 && !environment) {
    throw new Error(
      "The template was found, but none of the pasted hostnames matched an eligible environment/server.",
    );
  }

  return {
    template,
    environmentId: environment?.id,
    serverIds,
    parameters: mapRawParameters(template.id, payload),
  };
}

function matchesEnvironment(environment: { id: string; name: string }, value: string) {
  const query = value.toLowerCase();
  return environment.id.toLowerCase() === query || environment.name.toLowerCase() === query;
}

async function loadEnvironmentServers(
  templateId: string,
  environments: { id: string; name: string }[],
) {
  return Promise.all(
    environments.map(async (environment) => ({
      environment,
      servers: (await operationsApi.getServers(templateId, environment.id)).servers,
    })),
  );
}

function eligibleServerIds(
  servers: Server[],
  desiredHosts: Set<string>,
  template: OperationTemplate,
) {
  return servers
    .filter((server) => desiredHosts.has(server.hostname.toLowerCase()))
    .filter((server) =>
      template.supportedPlatforms.includes(
        (server.os ?? "").toLowerCase() as "windows" | "linux",
      ),
    )
    .map((server) => server.id);
}
