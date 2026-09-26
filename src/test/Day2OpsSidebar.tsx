"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGear,
  faClockRotateLeft,
  faBook,
  faRightFromBracket,
  faUsers,
  faFileLines,
  faServer,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Day2OpsSidebar.module.css";

type UserRole = "ADMIN" | "USER";

interface Day2OpsSidebarProps {
  role: UserRole;
}

export default function Day2OpsSidebar({ role }: Day2OpsSidebarProps) {
  const [expanded, setExpanded] = useState(true);

  const [mnemonic, setMnemonic] = useState("");
  const [recordNumber, setRecordNumber] = useState("");

  const [mnemonics, setMnemonics] = useState<string[]>(["DOE"]);

  const isAdmin = role === "ADMIN";

  // -----------------------------
  // ADD MNEMONIC
  // -----------------------------

  function handleAddMnemonic() {
    const value = mnemonic.trim().toUpperCase();

    if (!value) return;

    if (!mnemonics.includes(value)) {
      setMnemonics((current) => [...current, value]);
    }

    setMnemonic("");
  }

  // -----------------------------
  // RECORD SEARCH
  // -----------------------------

  function handleRecordSearch() {
    const value = recordNumber.trim();

    if (!value) return;

    console.log("Search CHG/INC:", value);

    // Call your API here
  }

  return (
    <aside className={`${styles.sidebar} ${expanded ? styles.expanded : ""}`}>
      {/* ================================= */}
      {/* LOGO                              */}
      {/* ================================= */}

      <div className={styles.logo}>
        <div className={styles.logoIcon}>2</div>

        {expanded && <span className={styles.logoText}>Day2Ops</span>}
      </div>

      {/* ================================= */}
      {/* MAIN NAVIGATION                   */}
      {/* ================================= */}

      <nav className={styles.navigation}>
        <NavItem
          icon={<FontAwesomeIcon icon={faGear} />}
          label="Operations"
          expanded={expanded}
        />

        <NavItem
          icon={<FontAwesomeIcon icon={faClockRotateLeft} />}
          label="Tracking"
          expanded={expanded}
        />

        <NavItem
          icon={<FontAwesomeIcon icon={faBook} />}
          label="Documentation"
          expanded={expanded}
          active
        />
      </nav>

      <div className={styles.divider} />

      {/* ================================= */}
      {/* ADMIN ONLY                        */}
      {/* ================================= */}

      {isAdmin && (
        <div className={styles.adminSection}>
          {/* LIVE SERVERS */}

          <div className={styles.sectionTitle}>
            <span className={styles.navIcon}>
              <FontAwesomeIcon icon={faServer} />
            </span>

            {expanded && <span>Live Servers</span>}
          </div>

          {/* MNEMONIC */}

          {expanded && (
            <div className={styles.mnemonicArea}>
              <label htmlFor="mnemonic" className={styles.fieldLabel}>
                Mnemonic
              </label>

              <div className={styles.inputRow}>
                <input
                  id="mnemonic"
                  type="text"
                  value={mnemonic}
                  placeholder="Mne"
                  onChange={(event) => setMnemonic(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleAddMnemonic();
                    }
                  }}
                />

                <button
                  type="button"
                  className={styles.addButton}
                  onClick={handleAddMnemonic}
                  aria-label="Add mnemonic"
                >
                  Add
                </button>
              </div>

              {/* MNEMONIC TAGS */}

              {mnemonics.length > 0 && (
                <div className={styles.mnemonicTags}>
                  {mnemonics.map((item) => (
                    <span key={item} className={styles.mnemonicTag}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADMIN */}

          <NavItem
            icon={<FontAwesomeIcon icon={faUsers} />}
            label="Admin"
            expanded={expanded}
            orange
          />

          <div className={styles.divider} />
        </div>
      )}

      {/* ================================= */}
      {/* RECORD NUMBER                     */}
      {/* ================================= */}

      <div className={styles.recordSection}>
        <div className={styles.sectionTitle}>
          <span className={`${styles.navIcon} ${styles.orangeIcon}`}>
            <FontAwesomeIcon icon={faFileLines} />
          </span>

          {expanded && <span>Record Number</span>}
        </div>

        {/* Always underneath Record Number */}
        {/* when sidebar is expanded */}

        {expanded && (
          <div className={styles.recordContent}>
            <div className={styles.recordSearch}>
              <input
                type="text"
                value={recordNumber}
                placeholder="CHG or INC"
                onChange={(event) => setRecordNumber(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleRecordSearch();
                  }
                }}
              />

              <button
                type="button"
                className={styles.goButton}
                onClick={handleRecordSearch}
              >
                Go
              </button>
            </div>

            <div className={styles.assistanceText}>CHG/INC Assistance</div>
          </div>
        )}
      </div>

      {/* Push bottom content down */}

      <div className={styles.spacer} />

      {/* ================================= */}
      {/* LOGOUT                            */}
      {/* ================================= */}

      <div className={styles.bottomSection}>
        <NavItem
          icon={<FontAwesomeIcon icon={faRightFromBracket} />}
          label="Logout"
          expanded={expanded}
        />

        {/* ================================= */}
        {/* COLLAPSE                          */}
        {/* ================================= */}

        <button
          type="button"
          className={styles.collapseButton}
          onClick={() => setExpanded((current) => !current)}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          title={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <FontAwesomeIcon icon={expanded ? faChevronLeft : faChevronRight} />

          {expanded && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

/* ======================================= */
/* NAV ITEM                                */
/* ======================================= */

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  active?: boolean;
  orange?: boolean;
}

function NavItem({
  icon,
  label,
  expanded,
  active = false,
  orange = false,
}: NavItemProps) {
  return (
    <button
      type="button"
      className={[
        styles.navItem,
        active ? styles.active : "",
        orange ? styles.orangeItem : "",
      ].join(" ")}
      title={!expanded ? label : undefined}
    >
      <span className={styles.navIcon}>{icon}</span>

      {expanded && <span className={styles.navLabel}>{label}</span>}
    </button>
  );
}
