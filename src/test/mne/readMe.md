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
.mnemonicBox {
  width: 100%;
  max-width: 280px;

  margin: 0;
  padding: 10px 0;

  /* Let sidebar background show */
  background: transparent !important;

  /* Remove Box/card appearance */
  border: none;
  border-radius: 0;
  box-shadow: none !important;
}

/* --------------------
   Header
-------------------- */

.header {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 0 4px 8px;
  margin-bottom: 8px;

  color: #ffffff;
  font-size: 14px;
  font-weight: 600;

  border-bottom: 1px solid #365066;
}

.headerIcon {
  width: 14px;
  height: 14px;

  color: #d9732a;
}

/* --------------------
   Mnemonic List
-------------------- */

.list {
  display: flex;
  flex-direction: column;

  gap: 5px;
}

/*
  4 visible rows

  32px × 4 = 128px
  5px × 3 = 15px

  Total = 143px
*/

.scrollable {
  max-height: 143px;
  overflow-y: auto;

  padding-right: 4px;
}

/* --------------------
   Mnemonic Item
-------------------- */

.mnemonic {
  flex: 0 0 32px;

  width: 100%;
  height: 32px;

  display: flex;
  align-items: center;

  gap: 7px;

  padding: 0 10px;

  border: none;
  border-radius: 5px;

  background: #d9732a;

  color: #ffffff;

  font-family: inherit;
  font-size: 12px;
  font-weight: 600;

  text-align: left;

  cursor: pointer;

  transition:
    background-color 150ms ease,
    transform 100ms ease;
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

/* --------------------
   Small Font Awesome Tag
-------------------- */

.tagIcon {
  width: 10px;
  min-width: 10px;
  height: 10px;

  font-size: 10px;

  color: #ffffff;

  flex-shrink: 0;
}

/* --------------------
   Scrollbar
-------------------- */

.scrollable {
  scrollbar-width: thin;
  scrollbar-color: #7690a3 transparent;
}

.scrollable::-webkit-scrollbar {
  width: 4px;
}

.scrollable::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable::-webkit-scrollbar-thumb {
  background: #7690a3;
  border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb:hover {
  background: #91a5b4;
}

/* --------------------
   Empty State
-------------------- */

.empty {
  min-height: 90px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 7px;

  border: 1px dashed #587287;
  border-radius: 5px;

  color: #9eb0bf;

  font-size: 12px;
}

.emptyIcon {
  width: 18px;
  height: 18px;

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
