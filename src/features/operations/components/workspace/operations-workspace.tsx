"use client";

import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { TopNavbar } from "./header/top-navbar";
import { OperationStepper } from "./operation-stepper";
import { OperationWorkflow } from "./operation-workflow";
import { RawOperationImport } from "../raw-import/raw-operation-import";
import { TemplatePanel } from "@/features/operations/components/templates/template-panel";
import { useOperationWorkspace } from "@/features/operations/hooks/use-operation-workspace";
import type { InitialOperationsData } from "@/features/operations/types";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function OperationsWorkspace({
  initialData,
}: {
  initialData: InitialOperationsData;
}) {
  const workspace = useOperationWorkspace(initialData.templates);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="max-h-svh overflow-hidden">
        <TopNavbar template={workspace.template} />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <TemplatePanel
            initialData={initialData}
            selectedTemplateId={workspace.template?.id}
            onSelectTemplate={workspace.chooseTemplate}
          />
          <section className="flex min-w-0 flex-1 flex-col">
            <div className="flex justify-end border-b border-slate-200 bg-white px-5 py-2 dark:border-slate-800 dark:bg-slate-950">
              <RawOperationImport onApply={workspace.applyRawPayload} />
            </div>
            <OperationStepper
              currentStep={workspace.step}
              disabled={!workspace.template}
              onChange={workspace.setStep}
            />
            {workspace.template ? (
              <OperationWorkflow
                step={workspace.step}
                template={workspace.template}
                environments={workspace.environments.data ?? []}
                environmentsLoading={workspace.environments.isLoading}
                environmentId={workspace.environmentId}
                selectedServerIds={workspace.selectedServerIds}
                schema={workspace.form.data}
                parameters={workspace.parameters}
                payload={workspace.renderPayload()}
                reviewFormat={workspace.reviewFormat}
                runPending={workspace.runOperation.isPending}
                runError={workspace.runOperation.isError}
                operationId={
                  workspace.runOperation.isSuccess
                    ? workspace.runOperation.data.id
                    : undefined
                }
                onStepChange={workspace.setStep}
                onEnvironmentChange={workspace.chooseEnvironment}
                onServersChange={workspace.setSelectedServerIds}
                onParametersChange={workspace.setParameters}
                onFormatChange={workspace.setReviewFormat}
                onSupport={workspace.contactSupport}
                onClear={workspace.reset}
                onExecute={workspace.execute}
              />
            ) : (
              <EmptyWorkspace />
            )}
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function EmptyWorkspace() {
  return (
    <div className="grid flex-1 place-items-center p-10 text-center">
      <div>
        <div className="text-xl font-semibold">Choose a template</div>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          Expand a category and select the operation you want to run.
        </p>
      </div>
    </div>
  );
}
