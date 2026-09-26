import { useState } from "react";

import { Box, Button, Control, Field, Input, Menu, MenuList } from "bloomer";

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

interface VerticalNavProps {
  role: Role;
  expanded: boolean;
  onToggle: () => void;
}

export default function VerticalNav({
  role,
  expanded,
  onToggle,
}: VerticalNavProps) {
  const [mnemonic, setMnemonic] = useState("");
  const [recordNumber, setRecordNumber] = useState("");

  const [mnemonics, setMnemonics] = useState(["DOE"]);

  const isAdmin = role === "ADMIN";

  function addMnemonic() {
    const value = mnemonic.trim().toUpperCase();

    if (!value) return;

    if (!mnemonics.includes(value)) {
      setMnemonics((current) => [...current, value]);
    }

    setMnemonic("");
  }

  function searchRecord() {
    if (!recordNumber.trim()) return;

    console.log("Searching:", recordNumber);
  }

  return (
    <aside className={`${styles.nav} ${expanded ? styles.expanded : ""}`}>
      {/* =========================
          LOGO
      ========================== */}

      <div className={styles.logo}>
        <div className={styles.logoMark}>2</div>

        {expanded && <span className={styles.logoText}>Day2Ops</span>}
      </div>

      {/* =========================
          MENU
      ========================== */}

      <Menu className={styles.menu}>
        <MenuList>
          <NavItem
            icon={faGear}
            label="Operations"
            expanded={expanded}
            active
          />

          <NavItem
            icon={faClockRotateLeft}
            label="Tracking"
            expanded={expanded}
          />

          <NavItem
            icon={faBookOpen}
            label="Documentation"
            expanded={expanded}
          />
        </MenuList>
      </Menu>

      <div className={styles.divider} />

      {/* =========================
          ADMIN ONLY
      ========================== */}

      {isAdmin && (
        <>
          <div
            className={styles.sectionTitle}
            title={!expanded ? "Live Servers" : undefined}
          >
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faServer} />
            </span>

            {expanded && <span>Live Servers</span>}
          </div>

          {/* =====================
              MNEMONIC
          ====================== */}

          {expanded && (
            <Box className={styles.mnemonicBox}>
              <label className={styles.label}>Mnemonic</label>

              <Field className={styles.inputField}>
                <Control className={styles.inputControl}>
                  <Input
                    value={mnemonic}
                    placeholder="MNE"
                    onChange={(event: any) => setMnemonic(event.target.value)}
                    onKeyDown={(event: any) => {
                      if (event.key === "Enter") {
                        addMnemonic();
                      }
                    }}
                  />
                </Control>

                <Control>
                  <Button className={styles.orangeButton} onClick={addMnemonic}>
                    Add
                  </Button>
                </Control>
              </Field>

              {mnemonics.length > 0 && (
                <div className={styles.tags}>
                  {mnemonics.map((item) => (
                    <span key={item} className={styles.tag}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </Box>
          )}

          {/* ADMIN */}

          <Menu className={styles.menu}>
            <MenuList>
              <NavItem icon={faUserShield} label="Admin" expanded={expanded} />
            </MenuList>
          </Menu>

          <div className={styles.divider} />
        </>
      )}

      {/* =========================
          RECORD NUMBER
      ========================== */}

      <div
        className={styles.sectionTitle}
        title={!expanded ? "Record Number" : undefined}
      >
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faFileLines} />
        </span>

        {expanded && <span>Record Number</span>}
      </div>

      {/* WHITE BOX */}

      {expanded && (
        <Box className={styles.recordBox}>
          <Field className={styles.inputField}>
            <Control className={styles.inputControl}>
              <Input
                value={recordNumber}
                placeholder="CHG or INC"
                onChange={(event: any) => setRecordNumber(event.target.value)}
                onKeyDown={(event: any) => {
                  if (event.key === "Enter") {
                    searchRecord();
                  }
                }}
              />
            </Control>

            <Control>
              <Button className={styles.orangeButton} onClick={searchRecord}>
                Go
              </Button>
            </Control>
          </Field>

          <div className={styles.assistance}>CHG/INC Assistance</div>
        </Box>
      )}

      {/* Push bottom down */}

      <div className={styles.spacer} />

      {/* =========================
          LOGOUT
      ========================== */}

      <Menu className={styles.menu}>
        <MenuList>
          <NavItem
            icon={faRightFromBracket}
            label="Logout"
            expanded={expanded}
          />
        </MenuList>
      </Menu>

      {/* =========================
          COLLAPSE
      ========================== */}

      <button
        type="button"
        className={styles.collapse}
        onClick={onToggle}
        title={expanded ? "Collapse" : "Expand"}
      >
        <span className={styles.icon}>
          <FontAwesomeIcon icon={expanded ? faChevronLeft : faChevronRight} />
        </span>

        {expanded && <span>Collapse</span>}
      </button>
    </aside>
  );
}

/* =============================
   NAV ITEM
============================= */

interface NavItemProps {
  icon: any;
  label: string;
  expanded: boolean;
  active?: boolean;
}

function NavItem({ icon, label, expanded, active = false }: NavItemProps) {
  return (
    <li>
      <button
        type="button"
        className={`${styles.navItem} ${active ? styles.active : ""}`}
        title={!expanded ? label : undefined}
      >
        <span className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </span>

        {expanded && <span>{label}</span>}
      </button>
    </li>
  );
}
