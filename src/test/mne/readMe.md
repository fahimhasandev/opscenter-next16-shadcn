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

```cs
.mnemonicBox {
  width: 100%;
  max-width: 280px;

  margin: 0;
  padding: 14px;

  background: #0b2940;
  border: 1px solid #29465c;
  border-radius: 8px;

  box-shadow: none;
}

/* --------------------
   Header
-------------------- */

.header {
  display: flex;
  align-items: center;
  gap: 10px;

  padding-bottom: 12px;
  margin-bottom: 10px;

  color: #ffffff;
  font-size: 16px;
  font-weight: 700;

  border-bottom: 1px solid #365066;
}

.headerIcon {
  width: 18px;
  height: 18px;

  color: #d9732a;
}

/* --------------------
   Mnemonic List
-------------------- */

.list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

/*
  4 rows:
  44px * 4 = 176
  7px * 3 gaps = 21

  Total = 197px
*/

.scrollable {
  max-height: 197px;
  overflow-y: auto;

  padding-right: 5px;
}

/* --------------------
   Mnemonic
-------------------- */

.mnemonic {
  flex: 0 0 44px;

  width: 100%;
  height: 44px;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 0 16px;

  border: 0;
  border-radius: 7px;

  background: #d9732a;

  color: #ffffff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;

  text-align: left;

  cursor: pointer;

  transition:
    background-color 150ms ease,
    transform 150ms ease;
}

.mnemonic:hover {
  background: #c76624;
}

.mnemonic:active {
  transform: scale(0.98);
}

.mnemonic:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

.tagIcon {
  width: 16px;
  min-width: 16px;

  color: #ffffff;
}

/* --------------------
   Scrollbar
-------------------- */

.scrollable {
  scrollbar-width: thin;
  scrollbar-color: #7690a3 transparent;
}

.scrollable::-webkit-scrollbar {
  width: 5px;
}

.scrollable::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable::-webkit-scrollbar-thumb {
  background: #7690a3;
  border-radius: 10px;
}

/* --------------------
   Empty state
-------------------- */

.empty {
  min-height: 145px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  border: 1px dashed #587287;
  border-radius: 7px;

  color: #9eb0bf;

  font-size: 14px;
}

.emptyIcon {
  width: 30px;
  height: 30px;

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
