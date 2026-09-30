## NoMnemonicAccess.tsx

```tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./NoMnemonicAccess.module.css";

interface NoMnemonicAccessProps {
  onRequestAccess?: () => void;
}

export default function NoMnemonicAccess({
  onRequestAccess,
}: NoMnemonicAccessProps) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />

        <span>No mnemonic access</span>
      </div>

      <p className={styles.description}>
        You don&apos;t currently have access to any mnemonics.
      </p>

      <button
        type="button"
        className={styles.requestButton}
        onClick={onRequestAccess}
      >
        <span>Request access</span>

        <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
      </button>
    </div>
  );
}
```

## NoMnemonicAccess.module.css

```css
.card {
  width: 100%;
  padding: 14px;

  box-sizing: border-box;

  background: rgba(217, 115, 42, 0.1);

  border: 1px solid rgba(217, 115, 42, 0.75);
  border-left: 4px solid #d9732a;
  border-radius: 8px;
}

.title {
  display: flex;
  align-items: center;
  gap: 9px;

  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
}

.lockIcon {
  width: 15px;
  height: 15px;

  color: #d9732a;
}

.description {
  margin: 10px 0 12px;

  color: rgba(255, 255, 255, 0.68);

  font-size: 12px;
  line-height: 1.5;
}

.requestButton {
  width: 100%;
  min-height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 7px 10px;

  background: transparent;
  border: 1px solid #d9732a;
  border-radius: 6px;

  color: #f28a3a;

  font-family: inherit;
  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.requestButton:hover {
  background: #d9732a;
  color: #ffffff;
}

.requestButton:focus-visible {
  outline: 2px solid #f28a3a;
  outline-offset: 2px;
}

.arrowIcon {
  width: 12px;
  height: 12px;
}
```

##

```tsx
{
  !hasMnemonicAccess && (
    <NoMnemonicAccess
      onRequestAccess={() => {
        console.log("Request access");
      }}
    />
  );
}
```
