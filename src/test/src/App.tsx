import { useState } from "react";
import styles from "./App.module.css";

export default function App() {
  const [navExpanded, setNavExpanded] = useState(true);

  return (
    <div className={styles.app}>
      {/* LEFT */}
      <VerticalNav
        expanded={navExpanded}
        onToggle={() => setNavExpanded(!navExpanded)}
        role="ADMIN"
      />

      {/* RIGHT */}
      <main className={styles.main}>{/* Your application goes here */}</main>
    </div>
  );
}
