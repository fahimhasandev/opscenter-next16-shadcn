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

## New Bloomer

```ts
import { useState } from "react";
import {
  Button,
  Control,
  Field,
  Input,
  Menu,
  MenuList,
  MenuLink,
  Tag,
} from "bloomer";

export default function VerticalNavbar() {
  const [server, setServer] = useState("MNE");
  const [chgInc, setChgInc] = useState("");
  const [mne, setMne] = useState("");
  const [mnemonics, setMnemonics] = useState(["ddf", "yyu"]);

  const addMnemonic = () => {
    const value = mne.trim();

    if (!value || mnemonics.includes(value)) return;

    setMnemonics((current) => [...current, value]);
    setMne("");
  };

  const removeMnemonic = (value: string) => {
    setMnemonics((current) =>
      current.filter((item) => item !== value)
    );
  };

  return (
    <aside className="day2ops-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-mark">2</div>

        <div>
          Day2<span>Ops</span>
        </div>
      </div>

      {/* Main Navigation */}
      <Menu className="sidebar-menu">
        <MenuList>
          <li>
            <MenuLink className="nav-item active">
              ⚙️
              <span>Operations</span>
            </MenuLink>
          </li>

          <li>
            <MenuLink className="nav-item">
              ↶
              <span>Tracking</span>
            </MenuLink>
          </li>

          <li>
            <MenuLink className="nav-item">
              📄
              <span>Documentation</span>
            </MenuLink>
          </li>
        </MenuList>
      </Menu>

      {/* Operational Context */}
      <div className="context-card">
        <div className="context-title">
          <span>▤</span>
          <span>Server & Incident</span>
        </div>

        {/* Live Server */}
        <Field>
          <label className="field-label">
            Live Server
          </label>

          <Control>
            <div className="select-wrapper">
              <select
                value={server}
                onChange={(event) =>
                  setServer(event.target.value)
                }
              >
                <option value="MNE">MNE</option>
                <option value="PROD-WEB-01">
                  PROD-WEB-01
                </option>
                <option value="PROD-APP-02">
                  PROD-APP-02
                </option>
              </select>
            </div>
          </Control>
        </Field>

        {/* CHG / INC */}
        <Field>
          <label className="field-label">
            CHG / INC
          </label>

          <Control>
            <Input
              value={chgInc}
              placeholder="Search CHG or INC..."
              onChange={(event: any) =>
                setChgInc(event.target.value)
              }
            />
          </Control>
        </Field>

        {/* MNE */}
        <Field>
          <label className="field-label">
            MNE
          </label>

          <div className="mne-search">
            <Control>
              <Input
                value={mne}
                placeholder="Enter MNE..."
                onChange={(event: any) =>
                  setMne(event.target.value)
                }
                onKeyDown={(event: any) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addMnemonic();
                  }
                }}
              />
            </Control>

            <Button
              className="add-button"
              onClick={addMnemonic}
            >
              Add
            </Button>
          </div>
        </Field>

        {/* Selected MNE */}
        <div className="selected-section">
          <div className="selected-header">
            <span>Selected MNE</span>

            {mnemonics.length > 0 && (
              <button
                className="clear-button"
                onClick={() => setMnemonics([])}
              >
                Clear all
              </button>
            )}
          </div>

          <div className="tag-list">
            {mnemonics.map((item) => (
              <Tag
                key={item}
                className="mne-tag"
              >
                {item}

                <button
                  onClick={() =>
                    removeMnemonic(item)
                  }
                >
                  ×
                </button>
              </Tag>
            ))}
          </div>
        </div>
      </div>

      {/* Push bottom navigation down */}
      <div className="sidebar-spacer" />

      {/* Bottom */}
      <div className="bottom-navigation">
        <a className="bottom-item">
          👥
          <span>Admin</span>
        </a>

        <a className="bottom-item logout">
          ⇥
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
}

```

```css
.day2ops-sidebar {
  width: 290px;
  height: 100vh;

  display: flex;
  flex-direction: column;

  padding: 20px 16px;

  background: linear-gradient(180deg, #102b4c 0%, #071b2d 100%);

  color: white;

  overflow-y: auto;
}

/* -----------------------
   LOGO
----------------------- */

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 4px 10px 24px;

  font-size: 26px;
  font-weight: 700;
}

.sidebar-logo span {
  color: #d9732a;
}

.logo-mark {
  width: 42px;
  height: 42px;

  display: grid;
  place-items: center;

  border-radius: 12px;

  background: #d9732a;

  font-size: 22px;
  font-weight: 800;
}

/* -----------------------
   NAVIGATION
----------------------- */

.sidebar-menu {
  margin-bottom: 20px;
}

.nav-item {
  display: flex !important;
  align-items: center;
  gap: 14px;

  min-height: 48px;

  margin-bottom: 5px;
  padding: 0 14px !important;

  border-radius: 9px;

  color: #d8e2ed !important;

  font-size: 15px;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.06) !important;
  color: white !important;
}

.nav-item.active {
  position: relative;

  background: rgba(39, 113, 184, 0.25) !important;

  color: white !important;
}

.nav-item.active::before {
  content: "";

  position: absolute;
  left: 0;

  width: 3px;
  height: 26px;

  border-radius: 0 3px 3px 0;

  background: #d9732a;
}

/* -----------------------
   SERVER / INCIDENT CARD
----------------------- */

.context-card {
  padding: 16px;

  border: 1px solid rgba(217, 115, 42, 0.35);
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.045);
}

.context-title {
  display: flex;
  align-items: center;
  gap: 9px;

  margin-bottom: 18px;

  font-size: 15px;
  font-weight: 700;
}

.context-title > span:first-child {
  color: #d9732a;
}

/* -----------------------
   FIELDS
----------------------- */

.field-label {
  display: block;

  margin-bottom: 7px;

  color: #c9d5e2;

  font-size: 12px;
  font-weight: 600;
}

.context-card .field {
  margin-bottom: 16px;
}

.context-card input,
.select-wrapper select {
  width: 100%;
  height: 39px;

  padding: 0 11px;

  border: 1px solid #405a72;
  border-radius: 7px;

  background: #182f43;

  color: white;

  box-shadow: none;
}

.context-card input::placeholder {
  color: #7f93a7;
}

/* -----------------------
   SERVER SELECT
----------------------- */

.select-wrapper select {
  cursor: pointer;
}

/* -----------------------
   MNE INPUT
----------------------- */

.mne-search {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 7px;
}

.add-button {
  height: 39px !important;

  border: none !important;

  background: #d9732a !important;
  color: white !important;
}

/* -----------------------
   TAGS
----------------------- */

.selected-section {
  margin-top: 5px;
}

.selected-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 10px;

  color: #c9d5e2;

  font-size: 12px;
  font-weight: 600;
}

.clear-button {
  border: 0;
  background: transparent;

  color: #e58a49;

  font-size: 11px;

  cursor: pointer;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.mne-tag {
  display: inline-flex !important;
  align-items: center;
  gap: 7px;

  padding: 5px 9px !important;

  border: 1px solid rgba(217, 115, 42, 0.5);

  background: rgba(217, 115, 42, 0.18) !important;
  color: #ffd5b6 !important;
}

.mne-tag button {
  padding: 0;

  border: 0;
  background: transparent;

  color: white;

  font-size: 16px;
  cursor: pointer;
}

/* -----------------------
   BOTTOM
----------------------- */

.sidebar-spacer {
  flex: 1;
  min-height: 25px;
}

.bottom-navigation {
  padding-top: 12px;

  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.bottom-item {
  display: flex;
  align-items: center;
  gap: 13px;

  padding: 13px 12px;

  border-radius: 8px;

  color: #d8e2ed;

  cursor: pointer;
}

.bottom-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.bottom-item.logout {
  margin-top: 3px;
}
```
