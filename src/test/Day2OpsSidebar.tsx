"use client";

import { useState } from "react";
import {
  Settings,
  History,
  BookOpen,
  LogOut,
  Users,
  FileText,
  Server,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import styles from "./Day2OpsSidebar.module.css";

type UserRole = "ADMIN" | "USER";

interface Day2OpsSidebarProps {
  role: UserRole;
}

export default function Day2OpsSidebar({ role }: Day2OpsSidebarProps) {
  const [expanded, setExpanded] = useState(false);

  const [serverPanelOpen, setServerPanelOpen] = useState(false);

  const [recordPanelOpen, setRecordPanelOpen] = useState(false);

  const [mnemonic, setMnemonic] = useState("");
  const [recordNumber, setRecordNumber] = useState("");

  const isAdmin = role === "ADMIN";

  return (
    <aside className={`${styles.sidebar} ${expanded ? styles.expanded : ""}`}>
      {/* LOGO */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>2</div>

        {expanded && <span className={styles.logoText}>Day2Ops</span>}
      </div>

      {/* MAIN NAV */}
      <nav className={styles.navigation}>
        <NavItem
          icon={<Settings size={19} />}
          label="Operations"
          expanded={expanded}
        />

        <NavItem
          icon={<History size={19} />}
          label="Tracking"
          expanded={expanded}
        />

        <NavItem
          icon={<BookOpen size={19} />}
          label="Documentation"
          expanded={expanded}
          active
        />
      </nav>

      <div className={styles.divider} />

      {/* ADMIN ONLY */}
      {isAdmin && (
        <>
          <button
            className={styles.navItem}
            onClick={() => setServerPanelOpen(!serverPanelOpen)}
          >
            <Server size={19} />

            {expanded && <span>Live Servers</span>}
          </button>

          {serverPanelOpen && (
            <Flyout
              title="Live Servers"
              onClose={() => setServerPanelOpen(false)}
            >
              <label className={styles.fieldLabel}>Mnemonic</label>

              <div className={styles.searchRow}>
                <input
                  value={mnemonic}
                  onChange={(e) => setMnemonic(e.target.value)}
                  placeholder="Enter MNE"
                />

                <button className={styles.searchButton}>
                  <Search size={16} />
                </button>
              </div>

              <div className={styles.tags}>
                <span>DOE</span>
              </div>
            </Flyout>
          )}

          <NavItem
            icon={<Users size={19} />}
            label="Admin"
            expanded={expanded}
          />

          <div className={styles.divider} />
        </>
      )}

      {/* RECORD NUMBER */}
      <button
        className={styles.navItem}
        onClick={() => setRecordPanelOpen(!recordPanelOpen)}
      >
        <FileText size={19} />

        {expanded && <span>Record Number</span>}
      </button>

      {recordPanelOpen && (
        <Flyout title="CHG / INC" onClose={() => setRecordPanelOpen(false)}>
          <div className={styles.searchRow}>
            <input
              value={recordNumber}
              onChange={(e) => setRecordNumber(e.target.value)}
              placeholder="CHG or INC"
            />

            <button className={styles.searchButton}>Go</button>
          </div>

          <div className={styles.assistanceText}>CHG/INC Assistance</div>
        </Flyout>
      )}

      {/* PUSH BOTTOM ITEMS DOWN */}
      <div className={styles.spacer} />

      {/* LOGOUT */}
      <NavItem icon={<LogOut size={19} />} label="Logout" expanded={expanded} />

      {/* COLLAPSE */}
      <button
        className={styles.collapseButton}
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </aside>
  );
}

/* -------------------------- */
/* NAV ITEM                   */
/* -------------------------- */

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  active?: boolean;
}

function NavItem({ icon, label, expanded, active = false }: NavItemProps) {
  return (
    <button
      className={`${styles.navItem} ${active ? styles.active : ""}`}
      title={!expanded ? label : undefined}
    >
      <span className={styles.navIcon}>{icon}</span>

      {expanded && <span className={styles.navLabel}>{label}</span>}
    </button>
  );
}

/* -------------------------- */
/* FLYOUT                     */
/* -------------------------- */

interface FlyoutProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

function Flyout({ title, children, onClose }: FlyoutProps) {
  return (
    <div className={styles.flyout}>
      <div className={styles.flyoutHeader}>
        <span>{title}</span>

        <button onClick={onClose}>
          <X size={15} />
        </button>
      </div>

      {children}
    </div>
  );
}
