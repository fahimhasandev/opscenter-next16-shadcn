import { useState } from "react";
import styles from "./App.module.css";
import Day2OpsSidebar from "./sidebar/Day2OpsSidebar";

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className={styles.appLayout}>
      <Day2OpsSidebar
        role="ADMIN"
        expanded={sidebarExpanded}
        onExpandedChange={setSidebarExpanded}
      />

      {/* Blank main content */}
      <main className={styles.mainContent} />
    </div>
  );
}

export default App;
