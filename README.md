# OpsCenter — Next.js 16 + shadcn-style UI

This version reflects the corrected architecture.

## Stack

- Next.js 16.2.9
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn-style reusable components
- TanStack Query
- Next.js Route Handlers for the mock backend

## Important architecture rules

Most operational data can come from the backend API, but these UI items are intentionally maintained manually in the frontend:

### 1. Mnemonics

Mnemonics is a dropdown, not an environment.

Frontend options include:

```text
ALL
PAYMENTS — Payments Team
CARDS — Cards Team
IDENTITY — Identity Team
DIGITAL — Digital Team
SHARED-SERVICES — Shared Services
```

Edit them in:

```text
src/config/operations-ui.ts
```

### 2. Platform

Platform is a frontend-only filter with exactly:

```text
ALL
Windows
Linux
```

Edit it in:

```text
src/config/operations-ui.ts
```

### 3. Dynamic forms

Forms are rendered dynamically by the reusable `DynamicTemplateForm` component,
but the schema is maintained manually in the frontend rather than fetched from
the backend.

Add or update template form definitions in:

```text
src/config/template-forms.ts
```

The backend does NOT need to return form field definitions.

## Backend/mock API data

The mock backend still provides:

```text
GET  /api/template-categories
GET  /api/templates?category=apache
GET  /api/templates/{templateId}/environments
GET  /api/servers?templateId=...&environment=...&search=...
POST /api/operations/run
```

There is no requirement for the real backend to provide:

```text
Mnemonics dropdown values
Platform dropdown values
Dynamic form schema
```

## Run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Mock data

```text
src/mock/data.ts
```

## Frontend-only configuration

```text
src/config/operations-ui.ts
src/config/template-forms.ts
```

## Template platform filtering

Each template has frontend-maintained platform metadata:

```ts
supportedPlatforms: ["linux"];
supportedPlatforms: ["windows"];
supportedPlatforms: ["linux", "windows"];
```

Behavior:

- Linux-only template -> only Linux servers are shown.
- Windows-only template -> only Windows servers are shown.
- Linux + Windows template -> both are shown, and the user can filter with ALL / Windows / Linux.
- A user cannot accidentally select a server outside the template's supported platform.

This metadata is maintained in the frontend/mock template configuration, not fetched as a separate platform list from the backend.

## Latest UI updates

### Top navbar

The application now includes the requested top navigation:

```text
Apache | Change LogLevel Preset    View Docs | History | Light/Dark | Admin User
```

The selected template drives the breadcrumb title automatically.

### Templates -> Platforms

The `Platforms` tab now filters the templates displayed inside an expanded
category:

```text
ALL
Windows
Linux
```

Examples:

- Linux selected -> only templates with `supportedPlatforms: ["linux"]`
  or `["linux", "windows"]` are shown.
- Windows selected -> only Windows-compatible templates are shown.
- ALL -> all templates are shown.

### Server filtering

After a template is selected, its `supportedPlatforms` metadata is enforced
again when servers are shown.

- Linux-only template -> Linux servers only.
- Windows-only template -> Windows servers only.
- Linux + Windows template -> Platform dropdown offers ALL / Windows / Linux.

This prevents an incompatible target from being selected even if the user
changes other filters.

## Reverse-fill from raw JSON/YAML

The app now supports the legacy "Submit Raw JSON/YAML" workflow.

Paste a payload such as:

```json
{
  "apache": {
    "config": {
      "backup": {
        "backup_name": "www.example.com.xml-20230627-181802"
      }
    }
  },
  "hostname": ["example.net", "example.net"],
  "template_name": "apache-restore_xml_backup"
}
```

The app works backwards:

```text
Raw JSON/YAML
   ↓
Find template
   ↓
Infer environment
   ↓
Match/select hostnames
   ↓
Enforce template platform compatibility
   ↓
Map config values into the dynamic form
   ↓
Open the workflow at Parameters/Review
```

JSON and YAML are both accepted. The parser is in:

```text
src/lib/raw-operation.ts
```

The modal is in:

```text
src/components/operations/raw-operation-import.tsx
```

Template-specific backward field mappings can be added to `mapRawParameters`.

## Combined Environment + Server step

The workflow is now 3 steps instead of 4:

```text
1. Targets
   - Environment
   - Servers

2. Parameters

3. Review & Execute
```

Environment and server selection live on the same screen. The server list appears
after an environment is chosen, which removes one extra navigation step while
still preventing a server from being selected before its environment is known.

The raw JSON/YAML reverse-fill flow now also lands at the Parameters step once
template, environment, and servers are successfully resolved.

```bash

npm install next@16.2.9 react@19.2.0 react-dom@19.2.0 @tanstack/react-query@5.90.21 lucide-react@0.468.0 clsx@2.1.1 tailwind-merge@2.6.0 class-variance-authority@0.7.1 js-yaml@4.1.0

```

```bash
npm install -D typescript@5 tailwindcss@4 @tailwindcss/postcss@4 @types/node@20 @types/react@19 @types/react-dom@19 @types/js-yaml@4.0.9

```

```ts
src/
├── app/
│ ├── page.tsx Server page
│ └── api/ Browser-facing API routes
│
├── components/
│ ├── ui/ Shared shadcn components
│ ├── layout/ Shared application layout
│ └── providers/ React Query provider
│
└── features/operations/
├── components/ Operations UI
├── hooks/ Client state and React Query
├── data/ Server-only data access
├── services/ Browser API calls using fetch
├── config/ Form and UI configuration
├── lib/ Operations business logic
├── types/ TypeScript types
└── mock/ Temporary mock data
```
