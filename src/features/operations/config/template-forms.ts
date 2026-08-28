import type { TemplateFormSchema } from "@/features/operations/types";

const fallbackForm = (templateId: string, title: string): TemplateFormSchema => ({
  templateId,
  title,
  description: "Configure parameters for this operation.",
  fields: [
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      placeholder: "Optional notes..."
    },
    {
      name: "dryRun",
      label: "Dry Run",
      type: "boolean",
      defaultValue: true
    }
  ]
});

export const TEMPLATE_FORM_REGISTRY: Record<string, TemplateFormSchema> = {
  "apache-change-loglevel": {
    templateId: "apache-change-loglevel",
    title: "Change LogLevel Preset",
    description: "Configure the log level for selected Apache servers.",
    fields: [
      {
        name: "logLevel",
        label: "Log Level Preset",
        type: "select",
        required: true,
        defaultValue: "info",
        options: [
          { label: "Debug", value: "debug" },
          { label: "Info", value: "info" },
          { label: "Warn", value: "warn" },
          { label: "Error", value: "error" }
        ]
      },
      {
        name: "logFile",
        label: "Log File",
        type: "text",
        required: true,
        defaultValue: "/var/log/httpd/error_log"
      },
      {
        name: "component",
        label: "Component",
        type: "select",
        defaultValue: "all",
        options: [
          { label: "All Components", value: "all" },
          { label: "Core", value: "core" },
          { label: "Proxy", value: "proxy" },
          { label: "SSL", value: "ssl" }
        ]
      },
      {
        name: "dryRun",
        label: "Dry Run",
        type: "boolean",
        defaultValue: false
      },
      {
        name: "notes",
        label: "Notes",
        type: "textarea",
        maxLength: 250
      }
    ]
  },

  "apache-backups-restore": {
    templateId: "apache-backups-restore",
    title: "Backups (XML) - Restore",
    description: "Restore a saved Apache configuration backup.",
    fields: [
      {
        name: "backupName",
        label: "Backup",
        type: "select",
        required: true,
        options: [
          { label: "Latest Backup", value: "latest" },
          { label: "Previous Backup", value: "previous" }
        ]
      },
      {
        name: "restartApache",
        label: "Restart Apache after restore",
        type: "boolean",
        defaultValue: true
      },
      {
        name: "notes",
        label: "Change Notes",
        type: "textarea",
        required: true
      }
    ]
  }
};

export function getFrontendTemplateForm(
  templateId: string,
  title = "Operation"
): TemplateFormSchema {
  return TEMPLATE_FORM_REGISTRY[templateId] ?? fallbackForm(templateId, title);
}
