import React, { useState } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Employees from "./pages/Employees";
import Software from "./pages/Software";
import Incidents from "./pages/Incidents";
import Security from "./pages/Security";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  const [page, setPage] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "assets", icon: "▣", label: "IT Assets" },
    { id: "employees", icon: "♙", label: "Employees" },
    { id: "software", icon: "◈", label: "Software" },
    { id: "incidents", icon: "⚠", label: "Incidents" },
    { id: "security", icon: "♢", label: "Security" },
    { id: "reports", icon: "▤", label: "Reports" },
    { id: "settings", icon: "⚙", label: "Settings" },
  ];

  function renderPage() {
    switch (page) {
      case "assets":
        return <Assets />;

      case "employees":
        return <Employees />;

      case "software":
        return <Software />;

      case "incidents":
        return <Incidents />;

      case "security":
        return <Security />;

      case "reports":
        return <Reports />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  }

  const currentPage =
    menuItems.find((item) => item.id === page)?.label ||
    "Dashboard";

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-brand">

          <div className="sidebar-brand-icon">
            🛡
          </div>

          <div>
            <h4>SecureCore</h4>
            <span>IT Security Management</span>
          </div>

        </div>

        <nav className="sidebar-nav">

          {menuItems.map((item) => (

            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              onClick={() => setPage(item.id)}
              title={item.label}
            >

              <span
                style={{
                  display: "inline-block",
                  width: "25px",
                  fontSize: "16px",
                }}
              >
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>

            </button>

          ))}

        </nav>

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "16px",
            right: "16px",
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.04)",
            color: "#64748b",
            fontSize: "10px",
            textAlign: "center",
          }}
        >
          SecureCore v1.0.0
        </div>

      </aside>

      {/* MAIN */}

      <main className="main-content">

        {/* TOPBAR */}

        <header className="topbar">

          <div className="topbar-title">
            {currentPage}
          </div>

          <div className="topbar-user">

            <div style={{ textAlign: "right" }}>
              <div className="user-name">
                Administrator
              </div>

              <div className="user-role">
                Security Administrator
              </div>
            </div>

            <div className="user-avatar">
              SA
            </div>

          </div>

        </header>

        {/* PAGE */}

        <div className="page-content">
          {renderPage()}
        </div>

      </main>

    </div>
  );
}

export default App;