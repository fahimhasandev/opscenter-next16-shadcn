export type TemplateCategory = {
  id: string;
  name: string;
  count?: number;
  icon?: string;
};

export type OperationTemplate = {
  id: string;
  name: string;
  categoryId: string;
  categoryName?: string;
  description?: string;
  requiresApproval?: boolean;

  // Frontend-managed metadata.
  // Determines which server OS values are valid for this template.
  supportedPlatforms: ("windows" | "linux")[];
  apiName?: string;
  jsonSchema?: Record<string, unknown>;
  raw?: ApiTemplate;
};

export type ApiTemplate = {
  base_json?: string;
  category?: string;
  friendly_name?: string;
  job_type?: string;
  live_prod_snow_record_requirement?: string;
  platform?: string;
  custom_credentials?: string[];
  requires_variance?: string | boolean;
  server_requirements?: Record<string, unknown>;
  tags?: string;
  subcategory?: string;
  support_information?: Record<string, unknown>;
  urls?: Array<{ name?: string; url?: string }>;
  template_name: string;
  JSONSchema?: Record<string, unknown>;
  source?: Record<string, unknown>;
};

export type Environment = {
  id: string;
  name: string;
};

export type Server = {
  id: string;
  hostname: string;
  os?: string;
  platform?: string;
  status?: "online" | "offline" | "warning" | string;
  environmentId?: string;
  mnemonicId?: string;
};

export type FormOption = {
  label: string;
  value: string;
};

export type FormField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "boolean" | "number";
  required?: boolean;
  defaultValue?: string | number | boolean;
  placeholder?: string;
  options?: FormOption[];
  maxLength?: number;
};

export type TemplateFormSchema = {
  templateId: string;
  title: string;
  description?: string;
  fields: FormField[];
};

export type ServersResponse = {
  total: number;
  servers: Server[];
};

export type RunOperationPayload = {
  templateId: string;
  environmentId: string;
  serverIds: string[];
  parameters: Record<string, unknown>;
};

export type RunOperationResponse = {
  id: string;
  status: string;
  message?: string;
};

export type InitialOperationsData = {
  categories: TemplateCategory[];
  templates: OperationTemplate[];
};

export type MnemonicOption = {
  id: string;
  label: string;
  team?: string;
};
