```tsx
import { useState } from "react";
import { Field, Control, Input, Button, Checkbox } from "bloomer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTag,
  faXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Mnemonic.module.css";

type Props = {
  mnemonics: string[];

  isAdmin?: boolean;

  liveServers?: boolean;

  onSelect?: (mne: string) => void;
  onAdd?: (mne: string) => void;
  onRemove?: (mne: string) => void;
  onLiveServersChange?: (value: boolean) => void;
};

export default function Mnemonic({
  mnemonics,
  isAdmin = false,
  liveServers = false,
  onSelect,
  onAdd,
  onRemove,
  onLiveServersChange,
}: Props) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const mne = value.trim().toUpperCase();

    if (!mne) return;

    onAdd?.(mne);

    setValue("");
  };

  return (
    <div className={styles.mnemonicBox}>
      {/* HEADER */}

      <div className={styles.header}>
        <FontAwesomeIcon icon={faUser} className={styles.headerIcon} />

        <span>Mnemonic</span>
      </div>

      {/* ADMIN CONTROLS */}

      {isAdmin && (
        <div className={styles.adminControls}>
          <Checkbox
            checked={liveServers}
            onChange={(e) => onLiveServersChange?.(e.currentTarget.checked)}
          >
            Live Servers
          </Checkbox>

          <Field className={styles.addField}>
            <Control className={styles.inputControl}>
              <Input
                className={styles.input}
                placeholder="Enter MNE"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdd();
                  }
                }}
              />
            </Control>

            <Control>
              <Button className={styles.addButton} onClick={handleAdd}>
                <FontAwesomeIcon icon={faPlus} />
                Add
              </Button>
            </Control>
          </Field>
        </div>
      )}

      {/* EMPTY */}

      {mnemonics.length === 0 ? (
        <div className={styles.empty}>
          <FontAwesomeIcon icon={faTag} className={styles.emptyIcon} />

          <span>No mnemonic yet</span>
        </div>
      ) : (
        /* SAME LIST FOR BOTH USER + ADMIN */

        <div
          className={`${styles.list} ${
            mnemonics.length > 4 ? styles.scrollable : ""
          }`}
        >
          {mnemonics.map((mne) => (
            <button
              key={mne}
              type="button"
              className={styles.mnemonic}
              onClick={() => {
                if (!isAdmin) {
                  onSelect?.(mne);
                }
              }}
            >
              <div className={styles.mnemonicName}>
                <FontAwesomeIcon icon={faTag} className={styles.tagIcon} />

                <span>{mne}</span>
              </div>

              {/* ONLY ADMIN GETS REMOVE */}

              {isAdmin && (
                <span
                  className={styles.removeButton}
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove ${mne}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.(mne);
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

```tsx
<Mnemonic
  mnemonics={mnemonics}
  onSelect={(mne) => {
    console.log(mne);
  }}
/>


# admin
<Mnemonic
  isAdmin
  mnemonics={mnemonics}
  liveServers={liveServers}
  onLiveServersChange={setLiveServers}
  onAdd={addMnemonic}
  onRemove={removeMnemonic}
/>
```

## Admin extra css

```tsx
.adminControls {
  margin-bottom: 10px;
}

.adminControls label {
  display: flex;
  align-items: center;
  gap: 6px;

  margin-bottom: 10px;

  color: #fff;
  font-size: 12px;
}

.adminControls input[type="checkbox"] {
  accent-color: #d9732a;
}

/* Add row */

.addField {
  display: flex !important;
  gap: 6px;

  margin-bottom: 10px !important;
}

.inputControl {
  flex: 1;
  min-width: 0;
}

.input {
  height: 30px !important;
  min-height: 30px !important;

  padding: 0 8px !important;

  font-size: 12px !important;

  border-radius: 4px !important;

  box-shadow: none !important;
}

.addButton {
  height: 30px !important;
  min-height: 30px !important;

  padding: 0 9px !important;

  display: flex !important;
  gap: 5px;

  background: #d9732a !important;
  border: none !important;

  color: #fff !important;

  font-size: 11px !important;
  font-weight: 600;
}

/* MNE content */

.mnemonicName {
  display: flex;
  align-items: center;
  gap: 7px;
}

/* Admin remove */

.removeButton {
  margin-left: auto;

  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 3px;

  background: rgba(0, 0, 0, 0.15);

  color: #fff;

  font-size: 10px;
}

.removeButton:hover {
  background: rgba(0, 0, 0, 0.3);
}
```

components/
└── Mnemonic/
├── Mnemonic.tsx
└── Mnemonic.module.css
