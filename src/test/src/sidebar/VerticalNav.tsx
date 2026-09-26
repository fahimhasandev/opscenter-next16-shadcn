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
} from "@fortawesome/free-solid-svg-icons";

import styles from "./VerticalNav.module.css";

type Role = "ADMIN" | "USER";

type Props = {
  expanded: boolean;
  onToggle: () => void;
  role: Role;
};

export default function VerticalNav({ expanded, onToggle, role }: Props) {
  const [mnemonic, setMnemonic] = useState("");
  const [recordNumber, setRecordNumber] = useState("");

  const isAdmin = role === "ADMIN";

  return (
    <aside className={`${styles.nav} ${expanded ? styles.expanded : ""}`}>
      {/* LOGO */}

      <div className={styles.logo}>
        <div className={styles.logoIcon}>2</div>

        {expanded && <span className={styles.logoText}>Day2Ops</span>}
      </div>

      {/* MAIN NAV */}

      <div className={styles.menu}>
        <NavItem icon={faGear} label="Operations" expanded={expanded} active />

        <NavItem
          icon={faClockRotateLeft}
          label="Tracking"
          expanded={expanded}
        />

        <NavItem icon={faBookOpen} label="Documentation" expanded={expanded} />
      </div>

      <div className={styles.divider} />

      {/* ===============================
          ADMIN ONLY
      ================================ */}

      {isAdmin && (
        <>
          <div
            className={styles.sectionTitle}
            title={!expanded ? "Live Servers" : undefined}
          >
            <FontAwesomeIcon icon={faServer} />

            {expanded && <span>Live Servers</span>}
          </div>

          {/* MNEMONIC */}

          {expanded && (
            <div className={styles.mnemonicBox}>
              <label>Mnemonic</label>

              <div className={styles.inputRow}>
                <input
                  value={mnemonic}
                  onChange={(e) => setMnemonic(e.target.value)}
                  placeholder="MNE"
                />

                <button type="button">Add</button>
              </div>

              <div className={styles.tags}>
                <span>DOE</span>
              </div>
            </div>
          )}

          <NavItem icon={faUserShield} label="Admin" expanded={expanded} />

          <div className={styles.divider} />
        </>
      )}

      {/* ===============================
          RECORD NUMBER
      ================================ */}

      <div
        className={styles.sectionTitle}
        title={!expanded ? "Record Number" : undefined}
      >
        <FontAwesomeIcon icon={faFileLines} />

        {expanded && <span>Record Number</span>}
      </div>

      {expanded && (
        <div className={styles.recordBox}>
          <div className={styles.inputRow}>
            <input
              value={recordNumber}
              onChange={(e) => setRecordNumber(e.target.value)}
              placeholder="CHG or INC"
            />

            <button type="button">Go</button>
          </div>

          <div className={styles.assistance}>CHG/INC Assistance</div>
        </div>
      )}

      {/* PUSH BOTTOM ITEMS DOWN */}

      <div className={styles.spacer} />

      {/* LOGOUT */}

      <NavItem icon={faRightFromBracket} label="Logout" expanded={expanded} />

      {/* COLLAPSE */}

      <button
        type="button"
        className={styles.toggle}
        onClick={onToggle}
        title={expanded ? "Collapse" : "Expand"}
      >
        <FontAwesomeIcon icon={expanded ? faChevronLeft : faChevronRight} />

        {expanded && <span>Collapse</span>}
      </button>
    </aside>
  );
}

/* =====================================
   NAV ITEM
===================================== */

type NavItemProps = {
  icon: any;
  label: string;
  expanded: boolean;
  active?: boolean;
};

function NavItem({ icon, label, expanded, active = false }: NavItemProps) {
  return (
    <button
      type="button"
      className={`${styles.navItem} ${active ? styles.active : ""}`}
      title={!expanded ? label : undefined}
    >
      <FontAwesomeIcon icon={icon} />

      {expanded && <span>{label}</span>}
    </button>
  );
}
