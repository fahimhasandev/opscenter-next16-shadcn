## MnemonicList.tsx

```tsx
import { Box } from "bloomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTag } from "@fortawesome/free-solid-svg-icons";

import styles from "./MnemonicList.module.css";

type MnemonicListProps = {
  mnemonics: string[];
  onSelect?: (mnemonic: string) => void;
};

export default function MnemonicList({
  mnemonics,
  onSelect,
}: MnemonicListProps) {
  return (
    <Box className={styles.mnemonicBox}>
      {/* Header */}
      <div className={styles.header}>
        <FontAwesomeIcon icon={faUser} className={styles.headerIcon} />

        <span>Mnemonic</span>
      </div>

      {/* Empty */}
      {mnemonics.length === 0 ? (
        <div className={styles.empty}>
          <FontAwesomeIcon icon={faTag} className={styles.emptyIcon} />

          <span>No mnemonic yet</span>
        </div>
      ) : (
        /* Mnemonics */
        <div
          className={`${styles.list} ${
            mnemonics.length > 4 ? styles.scrollable : ""
          }`}
        >
          {mnemonics.map((mnemonic) => (
            <button
              key={mnemonic}
              type="button"
              className={styles.mnemonic}
              onClick={() => onSelect?.(mnemonic)}
            >
              <FontAwesomeIcon icon={faTag} className={styles.tagIcon} />

              <span>{mnemonic}</span>
            </button>
          ))}
        </div>
      )}
    </Box>
  );
}
```

## MnemonicList.module.css

```css
/* =========================================================
   MNEMONIC CONTAINER
========================================================= */

.mnemonicBox {
  width: 100%;
  margin: 0;

  /* Space around the whole MNE section */
  padding: 10px 12px;

  /* Use sidebar background */
  background: transparent !important;

  border: none !important;
  border-radius: 0;

  box-shadow: none !important;

  box-sizing: border-box;
}

/* =========================================================
   HEADER
========================================================= */

.header {
  display: flex;
  align-items: center;

  gap: 8px;

  width: 100%;

  padding: 0 2px 8px;

  /* Space between divider and first MNE */
  margin-bottom: 8px;

  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  line-height: 1.2;

  border-bottom: 1px solid rgba(255, 255, 255, 0.18);

  box-sizing: border-box;
}

/* Font Awesome header icon */

.headerIcon {
  width: 14px;
  height: 14px;

  min-width: 14px;

  color: #d9732a;

  flex-shrink: 0;
}

/* =========================================================
   MNEMONIC LIST
========================================================= */

.list {
  display: flex;
  flex-direction: column;

  width: 100%;

  /*
    Enough separation without making
    the sidebar unnecessarily tall.
  */
  gap: 6px;

  margin: 0;
  padding: 0;

  box-sizing: border-box;
}

/* =========================================================
   SCROLLABLE LIST
========================================================= */

/*
   4 visible MNEs:

   30px × 4 = 120px
   6px × 3 = 18px

   Total = 138px
*/

.scrollable {
  max-height: 138px;

  overflow-y: auto;
  overflow-x: hidden;

  /*
    Prevent scrollbar from touching
    the orange MNE buttons.
  */
  padding-right: 6px;

  scrollbar-width: thin;
  scrollbar-color: #71899b transparent;
}

/* =========================================================
   MNEMONIC BUTTON
========================================================= */

.mnemonic {
  /* Fixed compact height */
  flex: 0 0 30px;

  width: 100%;
  height: 30px;

  display: flex;
  align-items: center;

  gap: 7px;

  margin: 0;

  padding: 0 10px;

  border: none;
  border-radius: 4px;

  background: #d9732a;

  color: #ffffff;

  font-family: inherit;

  font-size: 12px;
  font-weight: 600;

  line-height: 1;

  text-align: left;

  cursor: pointer;

  box-sizing: border-box;

  transition:
    background-color 150ms ease,
    transform 100ms ease;
}

/* Hover */

.mnemonic:hover {
  background: #c76624;
}

/* Click */

.mnemonic:active {
  transform: scale(0.98);
}

/* Keyboard focus */

.mnemonic:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: -2px;
}

/* =========================================================
   FONT AWESOME TAG ICON
========================================================= */

.tagIcon {
  width: 9px;
  height: 9px;

  min-width: 9px;

  font-size: 9px;

  color: #ffffff;

  flex-shrink: 0;
}

/* =========================================================
   SCROLLBAR - CHROME / EDGE / SAFARI
========================================================= */

.scrollable::-webkit-scrollbar {
  width: 4px;
}

.scrollable::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable::-webkit-scrollbar-thumb {
  background: #71899b;

  border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb:hover {
  background: #91a5b4;
}

/* =========================================================
   EMPTY STATE
========================================================= */

.empty {
  width: 100%;
  min-height: 75px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 6px;

  padding: 10px;

  color: #9eb0bf;

  font-size: 11px;
  font-weight: 500;

  text-align: center;

  background: transparent;

  border: 1px dashed rgba(255, 255, 255, 0.2);

  border-radius: 4px;

  box-sizing: border-box;
}

/* Empty state Font Awesome icon */

.emptyIcon {
  width: 16px;
  height: 16px;

  color: #7890a2;
}
```

## Use it

```tsx
import MnemonicList from "./MnemonicList";

export default function App() {
  const mnemonics = ["DFE", "DRF", "TYU", "WER", "ABC", "XYZ", "OPS"];

  return (
    <MnemonicList
      mnemonics={mnemonics}
      onSelect={(mne) => {
        console.log("Selected:", mne);
      }}
    />
  );
}
```
