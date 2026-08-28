"use client";

import { useState } from "react";
import yaml from "js-yaml";
import type { ReviewFormat } from "@/features/operations/components/review/operation-review-step";
import type { OperationStep } from "@/features/operations/components/workspace/operation-stepper";
import { useAllTemplates, useEnvironments, useRunOperation, useTemplateForm } from "./use-operations";
import type { RawOperationPayload } from "@/features/operations/lib/raw-operation";
import { resolveRawOperation } from "@/features/operations/lib/resolve-raw-operation";
import type { OperationTemplate } from "@/features/operations/types";

export function useOperationWorkspace(initialTemplates: OperationTemplate[]) {
  const [template, setTemplate] = useState<OperationTemplate>();
  const [environmentId, setEnvironmentId] = useState<string>();
  const [selectedServerIds, setSelectedServerIds] = useState<string[]>([]);
  const [parameters, setParameters] = useState<Record<string, unknown>>({});
  const [step, setStep] = useState<OperationStep>(1);
  const [rawPayloadText, setRawPayloadText] = useState<string>();
  const [reviewFormat, setReviewFormat] = useState<ReviewFormat>("json");
  const allTemplates = useAllTemplates(initialTemplates);
  const environments = useEnvironments(template?.id);
  const form = useTemplateForm(template?.id, template?.name);
  const runOperation = useRunOperation();

  function reset() {
    setEnvironmentId(undefined);
    setSelectedServerIds([]);
    setParameters({});
    setRawPayloadText(undefined);
    setStep(1);
  }

  function chooseTemplate(next: OperationTemplate) {
    setTemplate(next);
    reset();
  }

  function chooseEnvironment(id: string) {
    setEnvironmentId(id);
    setSelectedServerIds([]);
  }

  async function applyRawPayload(payload: RawOperationPayload, raw?: string) {
    const resolved = await resolveRawOperation(allTemplates.data ?? [], payload);
    setTemplate(resolved.template);
    setEnvironmentId(resolved.environmentId);
    setSelectedServerIds(resolved.serverIds);
    setParameters(resolved.parameters);
    setRawPayloadText(raw ?? "");
    setStep(raw ? 3 : resolved.environmentId && resolved.serverIds.length > 0 ? 2 : 1);
  }

  async function execute() {
    if (!template || !environmentId || selectedServerIds.length === 0) return;
    await runOperation.mutateAsync({
      templateId: template.id,
      environmentId,
      serverIds: selectedServerIds,
      parameters,
    });
  }

  function renderPayload() {
    if (rawPayloadText) return rawPayloadText;
    const payload = { templateId: template?.id, environmentId, serverIds: selectedServerIds, parameters };
    return reviewFormat === "json" ? JSON.stringify(payload, null, 2) : yaml.dump(payload);
  }

  async function contactSupport() {
    const payload = renderPayload();
    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      // Clipboard access is optional.
    }
    const subject = encodeURIComponent("Support request: operation payload");
    window.open(`mailto:support@example.com?subject=${subject}&body=${encodeURIComponent(payload)}`);
  }

  return {
    template, environmentId, selectedServerIds, parameters, step, reviewFormat,
    environments, form, runOperation,
    setStep, setSelectedServerIds, setParameters, setReviewFormat,
    reset, chooseTemplate, chooseEnvironment, applyRawPayload, execute, renderPayload, contactSupport,
  };
}
