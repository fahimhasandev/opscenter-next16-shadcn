import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGear,
  faClockRotateLeft,
  faBookOpen,
  faServer,
  faUserShield,
  faFileLines,
  faRightFromBracket,
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Day2OpsSidebar.module.css";

/* ========================================
   TYPES
======================================== */

export type UserRole = "ADMIN" | "USER";

interface Day2OpsSidebarProps {
  role: UserRole;

  expanded: boolean;

  onExpandedChange: (expanded: boolean) => void;
}

/* ========================================
   COMPONENT
======================================== */

export default function Day2OpsSidebar({
  role,
  expanded,
  onExpandedChange,
}: Day2OpsSidebarProps) {
  const [mnemonicInput, setMnemonicInput] = useState("");

  const [mnemonics, setMnemonics] = useState<string[]>(["DOE"]);

  const [recordNumber, setRecordNumber] = useState("");

  const isAdmin = role === "ADMIN";

  /* ========================================
     ADD MNEMONIC
  ======================================== */

  function handleAddMnemonic() {
    const value = mnemonicInput.trim().toUpperCase();

    if (!value) {
      return;
    }

    if (!mnemonics.includes(value)) {
      setMnemonics((current) => [...current, value]);
    }

    setMnemonicInput("");
  }

  /* ========================================
     REMOVE MNEMONIC
  ======================================== */

  function handleRemoveMnemonic(mnemonic: string) {
    setMnemonics((current) => current.filter((item) => item !== mnemonic));
  }

  /* ========================================
     RECORD SEARCH
  ======================================== */

  function handleRecordSearch() {
    const value = recordNumber.trim();

    if (!value) {
      return;
    }

    console.log("Searching record:", value);

    /*
      Add your API call here.

      Example:

      router.push(`/tracking/${value}`);
    */
  }

  return (
    <aside className={`${styles.sidebar} ${expanded ? styles.expanded : ""}`}>
      {/* =================================
          LOGO
      ================================= */}

      <div className={styles.logo}>
        <div className={styles.logoMark}>2</div>

        {expanded && <div className={styles.logoText}>Day2Ops</div>}
      </div>

      {/* =================================
          MAIN NAVIGATION
      ================================= */}

      <nav className={styles.navigation}>
        <NavItem icon={faGear} label="Operations" expanded={expanded} active />

        <NavItem
          icon={faClockRotateLeft}
          label="Tracking"
          expanded={expanded}
        />

        <NavItem icon={faBookOpen} label="Documentation" expanded={expanded} />
      </nav>

      <Divider />

      {/* =================================
          ADMIN ONLY
      ================================= */}

      {isAdmin && (
        <>
          {/* LIVE SERVERS */}

          <div
            className={styles.sectionHeading}
            title={!expanded ? "Live Servers" : undefined}
          >
            <span className={styles.iconContainer}>
              <FontAwesomeIcon icon={faServer} />
            </span>

            {expanded && <span>Live Servers</span>}
          </div>

          {/* MNEMONIC BOX */}

          {expanded && (
            <div className={styles.mnemonicCard}>
              <label htmlFor="mnemonic" className={styles.cardLabel}>
                Mnemonic
              </label>

              <div className={styles.inputRow}>
                <input
                  id="mnemonic"
                  type="text"
                  value={mnemonicInput}
                  placeholder="Mne"
                  onChange={(event) => setMnemonicInput(event.target.value)}
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
                >
                  Add
                </button>
              </div>

              {/* TAGS */}

              {mnemonics.length > 0 && (
                <div className={styles.mnemonicTags}>
                  {mnemonics.map((mnemonic) => (
                    <div key={mnemonic} className={styles.mnemonicTag}>
                      <span>{mnemonic}</span>

                      <button
                        type="button"
                        aria-label={`Remove ${mnemonic}`}
                        onClick={() => handleRemoveMnemonic(mnemonic)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADMIN */}

          <NavItem
            icon={faUserShield}
            label="Admin"
            expanded={expanded}
            orange
          />

          <Divider />
        </>
      )}

      {/* =================================
          RECORD NUMBER
      ================================= */}

      <div className={styles.recordSection}>
        <div
          className={styles.sectionHeading}
          title={!expanded ? "Record Number" : undefined}
        >
          <span className={`${styles.iconContainer} ${styles.orangeIcon}`}>
            <FontAwesomeIcon icon={faFileLines} />
          </span>

          {expanded && <span>Record Number</span>}
        </div>

        {/* WHITE BOX */}

        {expanded && (
          <div className={styles.recordCard}>
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

      {/* =================================
          PUSH BOTTOM NAV DOWN
      ================================= */}

      <div className={styles.spacer} />

      {/* =================================
          BOTTOM
      ================================= */}

      <div className={styles.bottom}>
        {/* LOGOUT */}

        <NavItem icon={faRightFromBracket} label="Logout" expanded={expanded} />

        {/* COLLAPSE */}

        <button
          type="button"
          className={styles.collapseButton}
          onClick={() => onExpandedChange(!expanded)}
          title={expanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <span className={styles.iconContainer}>
            <FontAwesomeIcon icon={expanded ? faChevronLeft : faChevronRight} />
          </span>

          {expanded && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

/* ========================================
   NAV ITEM
======================================== */

interface NavItemProps {
  icon: any;
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
  const classes = [
    styles.navItem,
    active ? styles.active : "",
    orange ? styles.orangeItem : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      title={!expanded ? label : undefined}
    >
      <span className={styles.iconContainer}>
        <FontAwesomeIcon icon={icon} />
      </span>

      {expanded && <span className={styles.navLabel}>{label}</span>}
    </button>
  );
}

/* ========================================
   DIVIDER
======================================== */

function Divider() {
  return <div className={styles.divider} />;
}
