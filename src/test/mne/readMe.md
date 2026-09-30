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
.container {
  width: 100%;
  max-width: 250px;

  padding: 10px !important;
  margin: 0 !important;

  background: #0b2940 !important;
  border: 1px solid #29465c;
  border-radius: 6px;

  box-shadow: none !important;
}

/* Header */

.header {
  display: flex;
  align-items: center;
  gap: 7px;

  padding: 2px 2px 9px;
  margin-bottom: 8px;

  border-bottom: 1px solid #365066;

  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.headerIcon {
  width: 14px;
  height: 14px;

  color: #d9732a;
}

/* List */

.list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/*
  Each mnemonic = 32px
  4 rows = 128px
  3 gaps = 15px

  Total = 143px
*/

.scrollable {
  max-height: 143px;
  overflow-y: auto;

  padding-right: 4px;
}

/* Mnemonic */

.mnemonic {
  flex: 0 0 32px;

  width: 100%;
  height: 32px;

  display: flex;
  align-items: center;
  gap: 7px;

  padding: 0 10px;

  border: 0;
  border-radius: 5px;

  background: #d9732a;

  color: #fff;

  font-family: inherit;
  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    transform 0.1s ease;
}

.mnemonic:hover {
  background: #c86625;
}

.mnemonic:active {
  transform: scale(0.98);
}

/* SMALL Font Awesome tag */

.tagIcon {
  width: 10px;
  height: 10px;
  font-size: 10px;

  flex-shrink: 0;

  color: #fff;
}

/* Scrollbar */

.scrollable {
  scrollbar-width: thin;
  scrollbar-color: #71889a transparent;
}

.scrollable::-webkit-scrollbar {
  width: 4px;
}

.scrollable::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable::-webkit-scrollbar-thumb {
  background: #71889a;
  border-radius: 10px;
}

/* Empty state */

.empty {
  height: 90px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 7px;

  border: 1px dashed #506b80;
  border-radius: 5px;

  color: #91a6b6;

  font-size: 12px;
}

.emptyIcon {
  width: 18px;
  height: 18px;

  color: #71899b;
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
