import { useState } from "react";
import styles from "./App.module.css";
import Day2OpsSidebar from "./sidebar/Day2OpsSidebar";

function App() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={styles.shell}>
      <Day2OpsSidebar
        role="ADMIN"
        expanded={expanded}
        onExpandedChange={setExpanded}
      />

      <main className={styles.main}>{children}</main>

      {/*
        Put your global modal/notification
        provider/component here if needed.
      */}
    </div>
  );
}

export default App;
