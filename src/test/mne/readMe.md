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
/* =========================
   MNEMONIC LIST
========================= */

.list {
  display: flex;
  flex-direction: column;

  width: 100%;

  margin: 0;
  padding: 0;

  box-sizing: border-box;
}

/* =========================
   MNEMONIC ITEM
========================= */

.mnemonic {
  display: flex;
  align-items: center;

  width: 100%;
  height: 30px;
  min-height: 30px;

  /* REAL SPACE BETWEEN BUTTONS */
  margin: 0 0 6px 0 !important;

  padding: 0 10px;

  gap: 7px;

  border: none !important;
  border-radius: 4px;

  background: #d9732a !important;

  color: #ffffff !important;

  font-family: inherit;
  font-size: 12px;
  font-weight: 600;

  line-height: 30px;

  text-align: left;

  cursor: pointer;

  box-sizing: border-box;
}

/* Don't add extra space after final MNE */

.mnemonic:last-child {
  margin-bottom: 0 !important;
}

.mnemonic:hover {
  background: #c76624 !important;
}

/* =========================
   TAG ICON
========================= */

.tagIcon {
  width: 9px !important;
  height: 9px !important;

  min-width: 9px;

  font-size: 9px;

  color: #ffffff;

  flex-shrink: 0;
}

/* =========================
   4 ITEMS VISIBLE
========================= */

/*
   30px button × 4 = 120px
   6px spacing × 3 = 18px

   Total = 138px
*/

.scrollable {
  max-height: 138px;

  overflow-y: auto;
  overflow-x: hidden;

  padding-right: 7px;

  scrollbar-width: thin;
  scrollbar-color: #71899b transparent;
}

/* =========================
   SCROLLBAR
========================= */

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
