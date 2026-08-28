import type {
  Environment,
  OperationTemplate,
  Server,
  TemplateCategory,
  TemplateFormSchema,
} from "@/features/operations/types";

export const templateCategories: TemplateCategory[] = [
  { id: "apache", name: "Apache", count: 10 },
  { id: "database", name: "Database", count: 5 },
  { id: "kubernetes", name: "Kubernetes", count: 4 },
  { id: "network", name: "Network", count: 4 },
  { id: "security", name: "Security", count: 3 },
  { id: "monitoring", name: "Monitoring", count: 3 },
];

// supportedPlatforms is frontend-maintained metadata.
// A template may support Linux only, Windows only, or both.
export const templates: OperationTemplate[] = [
  {
    id: "apache-change-loglevel",
    name: "Change LogLevel Preset",
    categoryId: "apache",
    categoryName: "Apache",
    description:
      "Change the Apache server log level preset using a predefined configuration.",
    supportedPlatforms: ["linux"],
  },
  {
    id: "apache-aliases-replace",
    name: "Aliases - Replace All",
    categoryId: "apache",
    categoryName: "Apache",
    description: "Replace all Apache aliases.",
    supportedPlatforms: ["linux"],
  },
  {
    id: "apache-autoindexes-replace",
    name: "Autoindexes - Replace All",
    categoryId: "apache",
    categoryName: "Apache",
    description: "Replace Apache autoindex configuration.",
    supportedPlatforms: ["linux"],
  },
  {
    id: "apache-backups-list",
    name: "Backups (XML) - List",
    categoryId: "apache",
    categoryName: "Apache",
    description: "List available Apache XML backups.",
    supportedPlatforms: ["linux"],
  },
  {
    id: "apache-backups-restore",
    apiName: "apache-restore_xml_backup",
    name: "Backups (XML) - Restore",
    categoryId: "apache",
    categoryName: "Apache",
    description: "Restore an Apache XML configuration backup.",
    requiresApproval: true,
    supportedPlatforms: ["linux"],
  },
  {
    id: "apache-backups-view",
    name: "Backups (XML) - View Configs",
    categoryId: "apache",
    categoryName: "Apache",
    description: "View stored Apache backup configurations.",
    supportedPlatforms: ["linux"],
  },
  {
    id: "apache-cors-replace",
    name: "CORS Domain Whitelist - Replace All",
    categoryId: "apache",
    categoryName: "Apache",
    description: "Replace the complete Apache CORS domain whitelist.",
    supportedPlatforms: ["linux"],
  },
  {
    id: "apache-config-backup",
    name: "Config dir - Backup",
    categoryId: "apache",
    categoryName: "Apache",
    description: "Create a backup of the Apache config directory.",
    supportedPlatforms: ["linux"],
  },
  {
    id: "apache-config-sanity",
    name: "Config - Sanity Check",
    categoryId: "apache",
    categoryName: "Apache",
    description: "Run a sanity check against Apache configuration.",
    supportedPlatforms: ["linux", "windows"],
  },
  {
    id: "apache-custom-config",
    name: "Custom Configurations - Replace All",
    categoryId: "apache",
    categoryName: "Apache",
    description: "Replace all custom Apache configuration fragments.",
    requiresApproval: true,
    supportedPlatforms: ["linux"],
  },
  {
    id: "db-restart",
    name: "Restart Database Service",
    categoryId: "database",
    categoryName: "Database",
    description: "Restart the selected database service.",
    requiresApproval: true,
    supportedPlatforms: ["linux", "windows"],
  },
  {
    id: "db-backup",
    name: "Create Database Backup",
    categoryId: "database",
    categoryName: "Database",
    description: "Create an on-demand database backup.",
    supportedPlatforms: ["linux", "windows"],
  },
  {
    id: "db-health",
    name: "Database Health Check",
    categoryId: "database",
    categoryName: "Database",
    description: "Run connectivity and replication health checks.",
    supportedPlatforms: ["linux", "windows"],
  },
  {
    id: "db-connections",
    name: "List Active Connections",
    categoryId: "database",
    categoryName: "Database",
    description: "List active database connections.",
    supportedPlatforms: ["linux", "windows"],
  },
  {
    id: "db-maintenance",
    name: "Maintenance Mode",
    categoryId: "database",
    categoryName: "Database",
    description: "Enable or disable maintenance mode.",
    requiresApproval: true,
    supportedPlatforms: ["linux", "windows"],
  },
  {
    id: "k8s-rollout",
    name: "Restart Deployment",
    categoryId: "kubernetes",
    categoryName: "Kubernetes",
    description: "Trigger a Kubernetes rollout restart.",
    supportedPlatforms: ["linux"],
  },
  {
    id: "k8s-scale",
    name: "Scale Deployment",
    categoryId: "kubernetes",
    categoryName: "Kubernetes",
    description: "Change deployment replica count.",
    supportedPlatforms: ["linux"],
  },
  {
    id: "k8s-pods",
    name: "List Pods",
    categoryId: "kubernetes",
    categoryName: "Kubernetes",
    description: "List pods on selected targets.",
    supportedPlatforms: ["linux"],
  },
  {
    id: "k8s-events",
    name: "View Namespace Events",
    categoryId: "kubernetes",
    categoryName: "Kubernetes",
    description: "View recent namespace events.",
    supportedPlatforms: ["linux"],
  },
  {
    id: "network-dns",
    name: "DNS Lookup",
    categoryId: "network",
    categoryName: "Network",
    description: "Resolve DNS from selected servers.",
    supportedPlatforms: ["linux", "windows"],
  },
  {
    id: "network-port",
    name: "Port Connectivity Check",
    categoryId: "network",
    categoryName: "Network",
    description: "Check target host and port connectivity.",
    supportedPlatforms: ["linux", "windows"],
  },
  {
    id: "network-route",
    name: "Trace Route",
    categoryId: "network",
    categoryName: "Network",
    description: "Trace network route to a destination.",
    supportedPlatforms: ["linux", "windows"],
  },
  {
    id: "network-flush",
    name: "Flush DNS Cache",
    categoryId: "network",
    categoryName: "Network",
    description: "Flush local DNS cache.",
    requiresApproval: true,
    supportedPlatforms: ["windows"],
  },
];

export const environments: Environment[] = [
  { id: "rnd", name: "RND" },
  { id: "uat", name: "UAT" },
  { id: "qa", name: "QA" },
  { id: "prod", name: "PROD" },
];

const hostPrefixes = [
  "ldoe02nd",
  "ldoe02xa",
  "ldoe04dw",
  "ldoe05ad",
  "ldoe06wa",
  "ldoe07ew",
  "ldoe07ja",
  "ldoe07xd",
  "ldoe08bd",
  "ldoe08cd",
  "ldoe08ew",
  "ldoe08lw",
  "ldoe09aa",
  "ldoe09bw",
  "wdoe026w",
  "wdoe065w",
  "wdoe072a",
  "wdoe088b",
  "wdoe091d",
  "wdoe102c",
];

export const servers: Server[] = environments.flatMap((environment, envIndex) =>
  hostPrefixes.map(
    (prefix, index) =>
      ({
        id: `${environment.id}-${index + 1}`,
        hostname: `${prefix}.${environment.id}.example.net`,
        os: index % 5 === 0 ? "Windows" : "Linux",
        platform: index % 4 === 0 ? "Tomcat" : "Apache",
        status: index % 11 === 0 ? "warning" : "online",
        environmentId: environment.id,
        mnemonicId: [
          "payments",
          "cards",
          "identity",
          "digital",
          "shared-services",
        ][index % 5],
      }) as Server & { environmentId: string; mnemonicId: string },
  ),
);

export const formSchemas: Record<string, TemplateFormSchema> = {
  "apache-change-loglevel": {
    templateId: "apache-change-loglevel",
    title: "Change LogLevel Preset",
    description: "Configure the log level for the selected Apache servers.",
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
          { label: "Error", value: "error" },
        ],
      },
      {
        name: "logFile",
        label: "Log File",
        type: "text",
        required: true,
        defaultValue: "/var/log/httpd/error_log",
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
          { label: "SSL", value: "ssl" },
        ],
      },
      {
        name: "dryRun",
        label: "Dry Run",
        type: "boolean",
        defaultValue: false,
      },
      {
        name: "notes",
        label: "Notes",
        type: "textarea",
        placeholder: "Enter reason for this operation...",
        maxLength: 250,
      },
    ],
  },
  "apache-backups-restore": {
    templateId: "apache-backups-restore",
    title: "Restore Apache Backup",
    description:
      "Restore a saved configuration backup to the selected servers.",
    fields: [
      {
        name: "backupName",
        label: "Backup",
        type: "select",
        required: true,
        options: [
          { label: "2026-08-27 09:30", value: "backup-20260827-0930" },
          { label: "2026-08-26 18:00", value: "backup-20260826-1800" },
          { label: "2026-08-25 14:15", value: "backup-20260825-1415" },
        ],
      },
      {
        name: "restartApache",
        label: "Restart Apache after restore",
        type: "boolean",
        defaultValue: true,
      },
      {
        name: "notes",
        label: "Change Notes",
        type: "textarea",
        required: true,
      },
    ],
  },
  "db-restart": {
    templateId: "db-restart",
    title: "Restart Database Service",
    description: "Choose service and restart behavior.",
    fields: [
      {
        name: "service",
        label: "Database Service",
        type: "select",
        required: true,
        options: [
          { label: "PostgreSQL", value: "postgresql" },
          { label: "MySQL", value: "mysql" },
          { label: "Oracle Listener", value: "oracle-listener" },
        ],
      },
      {
        name: "timeout",
        label: "Timeout (seconds)",
        type: "number",
        defaultValue: 60,
        required: true,
      },
      {
        name: "force",
        label: "Force restart if graceful restart fails",
        type: "boolean",
        defaultValue: false,
      },
    ],
  },
};

export function getFormSchema(templateId: string): TemplateFormSchema {
  return (
    formSchemas[templateId] ?? {
      templateId,
      title:
        templates.find((item) => item.id === templateId)?.name ?? "Operation",
      description: "Mock dynamic form generated for this operation.",
      fields: [
        {
          name: "notes",
          label: "Notes",
          type: "textarea",
          placeholder: "Optional notes...",
        },
        {
          name: "dryRun",
          label: "Dry Run",
          type: "boolean",
          defaultValue: true,
        },
      ],
    }
  );
}
