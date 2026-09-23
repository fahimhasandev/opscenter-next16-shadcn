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

## Night Day2OpsSidebar.tsx

```tsx
import { useState } from "react";
import "./Day2OpsSidebar.css";

type UserRole = "USER" | "ADMIN";

type Server = {
  id: string;
  name: string;
  defaultMnes: string[];
};

const LIVE_SERVERS: Server[] = [
  {
    id: "server-1",
    name: "MNE-01",
    defaultMnes: ["ddf"],
  },
  {
    id: "server-2",
    name: "WEB-01",
    defaultMnes: ["web"],
  },
  {
    id: "server-3",
    name: "APP-02",
    defaultMnes: ["app"],
  },
  {
    id: "server-4",
    name: "API-01",
    defaultMnes: ["api"],
  },
  {
    id: "server-5",
    name: "DB-01",
    defaultMnes: ["db"],
  },
];

export default function Day2OpsSidebar() {
  // Change to "USER" to see normal-user behavior.
  const userRole: UserRole = "ADMIN";

  const isAdmin = userRole === "ADMIN";

  const [collapsed, setCollapsed] = useState(false);

  const [activeNav, setActiveNav] = useState("Operations");

  const [selectedServerId, setSelectedServerId] = useState(LIVE_SERVERS[0].id);

  const [chgInc, setChgInc] = useState("");

  const [mnes, setMnes] = useState<string[]>(LIVE_SERVERS[0].defaultMnes);

  const [mneInput, setMneInput] = useState("");

  /* =============================================
     SERVER
  ============================================= */

  function handleServerSelect(server: Server) {
    setSelectedServerId(server.id);

    /*
     * Replace this later with your real API:
     *
     * const response = await fetch(
     *   `/api/servers/${server.id}/mnes`
     * );
     *
     * const data = await response.json();
     * setMnes(data.mnes);
     */

    setMnes(server.defaultMnes);
  }

  /* =============================================
     ADD MNE - ADMIN ONLY
  ============================================= */

  function addMne() {
    if (!isAdmin) return;

    const value = mneInput.trim();

    if (!value) return;

    if (!mnes.includes(value)) {
      setMnes((current) => [...current, value]);
    }

    setMneInput("");
  }

  /* =============================================
     REMOVE MNE - ADMIN ONLY
  ============================================= */

  function removeMne(mne: string) {
    if (!isAdmin) return;

    setMnes((current) => current.filter((currentMne) => currentMne !== mne));
  }

  return (
    <aside
      className={`
        day2ops-sidebar
        ${collapsed ? "sidebar-collapsed" : ""}
      `}
    >
      {/* =====================================
          HEADER
      ====================================== */}

      <header className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-brand">
            <div className="brand-logo">2</div>

            <div className="brand-name">
              Day2<span>Ops</span>
            </div>
          </div>
        )}

        <button
          type="button"
          className="collapse-button"
          onClick={() => setCollapsed((current) => !current)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </header>

      {/* =====================================
          BOX 1
          MAIN NAVIGATION
      ====================================== */}

      <div className="sidebar-box navigation-box">
        <NavItem
          icon="⚙"
          label="Operations"
          active={activeNav === "Operations"}
          collapsed={collapsed}
          onClick={() => setActiveNav("Operations")}
        />

        <NavItem
          icon="↶"
          label="Tracking"
          active={activeNav === "Tracking"}
          collapsed={collapsed}
          onClick={() => setActiveNav("Tracking")}
        />

        <NavItem
          icon="▤"
          label="Documentation"
          active={activeNav === "Documentation"}
          collapsed={collapsed}
          onClick={() => setActiveNav("Documentation")}
        />
      </div>

      {/* =====================================
          BOX 2
          SERVER + CHG/INC
      ====================================== */}

      <div className="sidebar-box">
        {collapsed ? (
          <div className="collapsed-controls">
            <CollapsedButton
              icon="▣"
              label="Live Servers"
              onClick={() => setCollapsed(false)}
            />

            <CollapsedButton
              icon="⌕"
              label="CHG / INC"
              onClick={() => setCollapsed(false)}
            />
          </div>
        ) : (
          <>
            <div className="box-heading">
              <span className="box-heading-icon">▣</span>

              <span>Server / Change</span>
            </div>

            {/* LIVE SERVERS */}

            <div className="field-group">
              <label>Live Servers</label>

              <div className="server-list">
                {LIVE_SERVERS.map((server) => {
                  const selected = selectedServerId === server.id;

                  return (
                    <button
                      key={server.id}
                      type="button"
                      className={`
                          server-button
                          ${selected ? "selected" : ""}
                        `}
                      onClick={() => handleServerSelect(server)}
                      title={server.name}
                    >
                      <span className="server-status" />

                      <span className="server-name">{server.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CHG / INC */}

            <div className="field-group">
              <label>CHG / INC</label>

              <div className="search-input">
                <span className="search-icon">⌕</span>

                <input
                  type="text"
                  value={chgInc}
                  onChange={(event) => setChgInc(event.target.value)}
                  placeholder="Search CHG / INC"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* =====================================
          BOX 3
          MNE
      ====================================== */}

      <div className="sidebar-box">
        {collapsed ? (
          <CollapsedButton
            icon="M"
            label="Mnemonics"
            onClick={() => setCollapsed(false)}
          />
        ) : (
          <>
            <div className="box-heading">
              <span className="box-heading-icon">M</span>

              <span>Mnemonics</span>

              {isAdmin && <span className="admin-badge">Admin</span>}
            </div>

            {/* CURRENT MNE */}

            <div className="field-group">
              <label>Selected MNE</label>

              {mnes.length > 0 ? (
                <div className="mne-tags">
                  {mnes.map((mne) => (
                    <span className="mne-tag" key={mne}>
                      <span>{mne}</span>

                      {/* ADMIN ONLY */}

                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => removeMne(mne)}
                          aria-label={`Remove ${mne}`}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="empty-mne">No MNE assigned</div>
              )}
            </div>

            {/* ADMIN ONLY ADD MNE */}

            {isAdmin && (
              <div className="field-group admin-mne">
                <label>Add MNE</label>

                <div className="mne-input-row">
                  <input
                    type="text"
                    value={mneInput}
                    onChange={(event) => setMneInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();

                        addMne();
                      }
                    }}
                    placeholder="Enter MNE"
                  />

                  <button
                    type="button"
                    className="add-mne-button"
                    onClick={addMne}
                    disabled={!mneInput.trim()}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* PUSH FOOTER DOWN */}

      <div className="sidebar-spacer" />

      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="sidebar-footer">
        {isAdmin && (
          <NavItem
            icon="♟"
            label="Admin"
            collapsed={collapsed}
            onClick={() => {}}
          />
        )}

        <NavItem
          icon="⇥"
          label="Logout"
          collapsed={collapsed}
          danger
          onClick={() => {}}
        />
      </footer>
    </aside>
  );
}

/* ==================================================
   NAV ITEM
================================================== */

type NavItemProps = {
  icon: string;
  label: string;
  collapsed: boolean;

  active?: boolean;
  danger?: boolean;

  onClick: () => void;
};

function NavItem({
  icon,
  label,
  collapsed,
  active = false,
  danger = false,
  onClick,
}: NavItemProps) {
  return (
    <button
      type="button"
      className={[
        "nav-item",
        active ? "active" : "",
        danger ? "danger" : "",
      ].join(" ")}
      title={collapsed ? label : undefined}
      onClick={onClick}
    >
      <span className="nav-icon">{icon}</span>

      {!collapsed && <span className="nav-label">{label}</span>}
    </button>
  );
}

/* ==================================================
   COLLAPSED BUTTON
================================================== */

type CollapsedButtonProps = {
  icon: string;
  label: string;
  onClick: () => void;
};

function CollapsedButton({ icon, label, onClick }: CollapsedButtonProps) {
  return (
    <button
      type="button"
      className="collapsed-button"
      title={label}
      aria-label={label}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
```

Day2OpsSidebar.css

```css
* {
  box-sizing: border-box;
}

/* ==========================================
   SIDEBAR
========================================== */

.day2ops-sidebar {
  width: 248px;
  height: 100vh;

  display: flex;
  flex-direction: column;

  padding: 12px 10px;

  overflow-x: hidden;
  overflow-y: auto;

  background: linear-gradient(180deg, #102d4b 0%, #071a2b 100%);

  color: #ffffff;

  transition:
    width 220ms ease,
    padding 220ms ease;
}

.day2ops-sidebar.sidebar-collapsed {
  width: 68px;

  padding-left: 8px;
  padding-right: 8px;
}

/* ==========================================
   HEADER
========================================== */

.sidebar-header {
  min-height: 44px;

  display: flex;
  align-items: center;

  margin-bottom: 10px;
}

.sidebar-brand {
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 8px;
}

.brand-logo {
  width: 34px;
  height: 34px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border-radius: 8px;

  background: #d9732a;

  font-size: 17px;
  font-weight: 800;
}

.brand-name {
  white-space: nowrap;

  font-size: 18px;
  font-weight: 700;
}

.brand-name span {
  color: #d9732a;
}

/* ==========================================
   COLLAPSE
========================================== */

.collapse-button {
  width: 28px;
  height: 28px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  margin-left: auto;

  padding: 0;

  border: 1px solid rgba(255, 255, 255, 0.13);

  border-radius: 6px;

  background: rgba(255, 255, 255, 0.06);

  color: #dbe6ef;

  font-size: 20px;

  cursor: pointer;
}

.collapse-button:hover {
  background: rgba(255, 255, 255, 0.12);
}

.sidebar-collapsed .collapse-button {
  margin-left: auto;
  margin-right: auto;
}

/* ==========================================
   BOXES
========================================== */

.sidebar-box {
  width: 100%;

  padding: 8px;

  margin-bottom: 8px;

  border: 1px solid rgba(255, 255, 255, 0.1);

  border-radius: 9px;

  background: rgba(255, 255, 255, 0.035);
}

.sidebar-collapsed .sidebar-box {
  padding: 4px;
}

/* ==========================================
   BOX HEADING
========================================== */

.box-heading {
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 6px;

  margin-bottom: 9px;

  color: #edf3f8;

  font-size: 11px;
  font-weight: 700;
}

.box-heading-icon {
  color: #d9732a;

  font-weight: 800;
}

.admin-badge {
  margin-left: auto;

  padding: 2px 5px;

  border-radius: 4px;

  background: rgba(217, 115, 42, 0.16);

  color: #e99960;

  font-size: 8px;
  font-weight: 700;

  text-transform: uppercase;
}

/* ==========================================
   NAVIGATION
========================================== */

.navigation-box {
  display: flex;
  flex-direction: column;

  gap: 2px;
}

.nav-item {
  width: 100%;
  height: 37px;

  min-width: 0;

  display: flex;
  align-items: center;

  gap: 9px;

  padding: 0 9px;

  border: 0;
  border-radius: 6px;

  background: transparent;

  color: #cbd8e3;

  font-family: inherit;
  font-size: 12px;
  font-weight: 500;

  text-align: left;

  cursor: pointer;

  transition:
    background 150ms ease,
    color 150ms ease;
}

.nav-icon {
  width: 19px;

  flex: 0 0 19px;

  text-align: center;

  font-size: 15px;
}

.nav-label {
  min-width: 0;

  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.07);

  color: #ffffff;
}

.nav-item.active {
  background: rgba(43, 111, 175, 0.28);

  color: #ffffff;

  box-shadow: inset 3px 0 #d9732a;
}

.sidebar-collapsed .nav-item {
  justify-content: center;

  padding: 0;
}

.sidebar-collapsed .nav-icon {
  width: auto;

  flex-basis: auto;
}

/* ==========================================
   FORM LABEL
========================================== */

.field-group + .field-group {
  margin-top: 10px;
}

.field-group label {
  display: block;

  margin-bottom: 5px;

  color: #9fb1c0;

  font-size: 9px;
  font-weight: 700;

  letter-spacing: 0.05em;

  text-transform: uppercase;
}

/* ==========================================
   LIVE SERVER BUTTONS
========================================== */

.server-list {
  width: 100%;

  max-height: 88px;

  display: flex;
  flex-wrap: wrap;

  gap: 5px;

  overflow-y: auto;

  padding-right: 2px;
}

.server-button {
  min-width: 0;
  max-width: 100%;

  display: inline-flex;
  align-items: center;

  gap: 5px;

  padding: 6px 7px;

  border: 1px solid #3d576c;
  border-radius: 6px;

  background: #173147;

  color: #c7d5df;

  font-family: inherit;
  font-size: 9px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 150ms ease,
    border-color 150ms ease,
    color 150ms ease;
}

.server-button:hover {
  border-color: #60788c;

  background: #1b3951;

  color: #ffffff;
}

.server-button.selected {
  border-color: #d9732a;

  background: rgba(217, 115, 42, 0.16);

  color: #ffffff;
}

.server-status {
  width: 5px;
  height: 5px;

  flex: 0 0 5px;

  border-radius: 50%;

  background: #51c58c;

  box-shadow: 0 0 0 2px rgba(81, 197, 140, 0.1);
}

.server-name {
  min-width: 0;

  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ==========================================
   SCROLLBAR
========================================== */

.server-list::-webkit-scrollbar {
  width: 3px;
}

.server-list::-webkit-scrollbar-thumb {
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.2);
}

/* ==========================================
   SEARCH INPUT
========================================== */

.search-input {
  position: relative;
}

.search-icon {
  position: absolute;

  top: 50%;
  left: 8px;

  transform: translateY(-50%);

  color: #788fa2;

  font-size: 13px;

  pointer-events: none;
}

.search-input input {
  padding-left: 27px;
}

/* ==========================================
   INPUTS
========================================== */

.field-group input {
  width: 100%;
  height: 32px;

  min-width: 0;

  padding: 0 8px;

  border: 1px solid #405a70;
  border-radius: 6px;

  outline: none;

  background: #173147;

  color: #ffffff;

  font-family: inherit;
  font-size: 10px;

  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.field-group input::placeholder {
  color: #72899c;
}

.field-group input:focus {
  border-color: #d9732a;

  box-shadow: 0 0 0 2px rgba(217, 115, 42, 0.1);
}

/* ==========================================
   MNE TAGS
========================================== */

.mne-tags {
  width: 100%;

  display: flex;
  flex-wrap: wrap;

  gap: 5px;
}

.mne-tag {
  min-width: 0;

  display: inline-flex;
  align-items: center;

  gap: 5px;

  padding: 4px 7px;

  border: 1px solid rgba(217, 115, 42, 0.55);

  border-radius: 5px;

  background: rgba(217, 115, 42, 0.15);

  color: #ffd1ae;

  font-size: 9px;
  font-weight: 600;
}

.mne-tag button {
  padding: 0;

  border: 0;

  background: transparent;

  color: #ffffff;

  font-size: 12px;
  line-height: 1;

  cursor: pointer;
}

.mne-tag button:hover {
  color: #ff9650;
}

.empty-mne {
  padding: 7px;

  border: 1px dashed #3c566b;
  border-radius: 5px;

  color: #72899c;

  font-size: 9px;

  text-align: center;
}

/* ==========================================
   ADMIN ADD MNE
========================================== */

.admin-mne {
  padding-top: 8px;

  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.mne-input-row {
  min-width: 0;

  display: grid;

  grid-template-columns: minmax(0, 1fr) 30px;

  gap: 5px;
}

.add-mne-button {
  width: 30px;
  height: 32px;

  padding: 0;

  border: 0;
  border-radius: 6px;

  background: #d9732a;

  color: white;

  font-size: 17px;
  font-weight: 500;

  cursor: pointer;
}

.add-mne-button:hover {
  background: #e47d32;
}

.add-mne-button:disabled {
  opacity: 0.4;

  cursor: not-allowed;
}

/* ==========================================
   COLLAPSED CONTROLS
========================================== */

.collapsed-controls {
  display: flex;
  flex-direction: column;

  gap: 2px;
}

.collapsed-button {
  width: 100%;
  height: 35px;

  display: grid;
  place-items: center;

  padding: 0;

  border: 0;
  border-radius: 6px;

  background: transparent;

  color: #ccd9e3;

  font-family: inherit;
  font-size: 14px;
  font-weight: 700;

  cursor: pointer;
}

.collapsed-button:hover {
  background: rgba(255, 255, 255, 0.08);

  color: #d9732a;
}

/* ==========================================
   FOOTER
========================================== */

.sidebar-spacer {
  flex: 1;

  min-height: 10px;
}

.sidebar-footer {
  padding-top: 7px;

  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-item.danger:hover {
  background: rgba(217, 115, 42, 0.12);

  color: #ff9b55;
}

/* ==========================================
   SHORT HEIGHT SCREENS
========================================== */

@media (max-height: 650px) {
  .day2ops-sidebar {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .sidebar-header {
    min-height: 38px;

    margin-bottom: 6px;
  }

  .sidebar-box {
    margin-bottom: 6px;

    padding: 6px;
  }

  .nav-item {
    height: 32px;
  }

  .server-list {
    max-height: 62px;
  }

  .field-group + .field-group {
    margin-top: 7px;
  }

  .field-group input {
    height: 29px;
  }

  .mne-input-row {
    grid-template-columns: minmax(0, 1fr) 28px;
  }

  .add-mne-button {
    width: 28px;
    height: 29px;
  }
}

/* ==========================================
   SMALL WIDTH
========================================== */

@media (max-width: 600px) {
  .day2ops-sidebar {
    width: 220px;

    max-width: 85vw;

    padding-left: 8px;
    padding-right: 8px;
  }

  .day2ops-sidebar.sidebar-collapsed {
    width: 60px;

    padding-left: 6px;
    padding-right: 6px;
  }

  .sidebar-box {
    padding: 7px;
  }

  .server-list {
    max-height: 75px;
  }

  .server-button {
    padding: 5px 6px;

    font-size: 8px;
  }
}
```

![alt text](<CleanShot 2026-09-23 at 12.48.06 PM@2x.png>)
