import { useState } from "react";

import Day2OpsSidebar from "./components/sidebar/Day2OpsSidebar";
import styles from "./App.module.css";

type UserRole = "ADMIN" | "USER";

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Change this to "USER" to test normal user.
  const [role, setRole] = useState<UserRole>("ADMIN");

  return (
    <div className={styles.app}>
      {/* =====================================
          LEFT SIDEBAR
      ====================================== */}

      <Day2OpsSidebar
        role={role}
        expanded={sidebarExpanded}
        onExpandedChange={setSidebarExpanded}
      />

      {/* =====================================
          RIGHT SIDE
      ====================================== */}

      <main className={styles.main}>
        {/* TOP HEADER */}

        <header className={styles.header}>
          <div>
            <h1>Operations Workspace</h1>

            <p>Build and manage operational changes.</p>
          </div>

          {/* Demo role switch */}

          <div className={styles.roleSwitcher}>
            <span>Preview as:</span>

            <button
              type="button"
              className={role === "USER" ? styles.selectedRole : ""}
              onClick={() => setRole("USER")}
            >
              User
            </button>

            <button
              type="button"
              className={role === "ADMIN" ? styles.selectedRole : ""}
              onClick={() => setRole("ADMIN")}
            >
              Admin
            </button>
          </div>
        </header>

        {/* =====================================
            THREE SECTIONS
        ====================================== */}

        <div className={styles.workspace}>
          {/* SECTION 1 */}

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.stepNumber}>1</span>

                <h2>Select Template</h2>
              </div>
            </div>

            <div className={styles.panelBody}>
              <p className={styles.description}>
                Select an operation template to get started.
              </p>

              <div className={styles.templateList}>
                <button
                  type="button"
                  className={`${styles.templateCard} ${styles.templateSelected}`}
                >
                  <strong>Apache Change Log Level</strong>

                  <span>Change Apache logging level on selected servers.</span>
                </button>

                <button type="button" className={styles.templateCard}>
                  <strong>Restart Application</strong>

                  <span>Restart an application on selected servers.</span>
                </button>

                <button type="button" className={styles.templateCard}>
                  <strong>Service Status</strong>

                  <span>Check the current status of a service.</span>
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.stepNumber}>2</span>

                <h2>Configure</h2>
              </div>
            </div>

            <div className={styles.panelBody}>
              <p className={styles.description}>
                Configure the selected operation.
              </p>

              <div className={styles.formGroup}>
                <label htmlFor="environment">Environment</label>

                <select id="environment">
                  <option>Select environment</option>

                  <option>Production</option>

                  <option>QA</option>

                  <option>Development</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="server">Server</label>

                <select id="server">
                  <option>Select server</option>

                  <option>server-001</option>

                  <option>server-002</option>

                  <option>server-003</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="logLevel">Log Level</label>

                <select id="logLevel">
                  <option>INFO</option>
                  <option>DEBUG</option>
                  <option>WARN</option>
                  <option>ERROR</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="notes">Notes</label>

                <textarea id="notes" rows={5} placeholder="Optional notes..." />
              </div>
            </div>
          </section>

          {/* SECTION 3 */}

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.stepNumber}>3</span>

                <h2>Review</h2>
              </div>
            </div>

            <div className={styles.panelBody}>
              <p className={styles.description}>
                Review your configuration before generating the operation.
              </p>

              <div className={styles.reviewBox}>
                <div className={styles.reviewItem}>
                  <span>Template</span>

                  <strong>Apache Change Log Level</strong>
                </div>

                <div className={styles.reviewItem}>
                  <span>Environment</span>

                  <strong>Production</strong>
                </div>

                <div className={styles.reviewItem}>
                  <span>Server</span>

                  <strong>server-001</strong>
                </div>

                <div className={styles.reviewItem}>
                  <span>Log Level</span>

                  <strong>INFO</strong>
                </div>
              </div>

              <div className={styles.outputTitle}>Generated Output</div>

              <pre className={styles.codeBox}>
                {`{
  "template": "apache-log-level",
  "environment": "production",
  "server": "server-001",
  "level": "INFO"
}`}
              </pre>

              <button type="button" className={styles.generateButton}>
                Generate Operation
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
