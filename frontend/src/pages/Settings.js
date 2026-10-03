import React, { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    securityAlerts: true,
    emailReports: false,
    darkMode: false,
    autoRefresh: true,
  });

  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, checked } = event.target;

    setSettings({
      ...settings,
      [name]: checked,
    });

    setSaved(false);
  }

  function saveSettings() {
    localStorage.setItem(
      "securecoreSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  return (
    <div className="container-fluid">

      {/* HEADER */}

      <div className="mb-4">
        <h2 className="fw-bold">
          Settings
        </h2>

        <p className="text-muted">
          Manage SecureCore application preferences
        </p>
      </div>

      <div className="row g-4">

        {/* SECURITY SETTINGS */}

        <div className="col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <h5 className="fw-bold mb-4">
                Security Settings
              </h5>

              <div className="form-check form-switch mb-4">

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="securityAlerts"
                  checked={settings.securityAlerts}
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  <strong>Security Alerts</strong>

                  <div className="text-muted small">
                    Receive alerts for security incidents
                  </div>
                </label>

              </div>

              <div className="form-check form-switch mb-4">

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  <strong>System Notifications</strong>

                  <div className="text-muted small">
                    Enable application notifications
                  </div>
                </label>

              </div>

              <div className="form-check form-switch">

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="emailReports"
                  checked={settings.emailReports}
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  <strong>Email Reports</strong>

                  <div className="text-muted small">
                    Receive generated reports through email
                  </div>
                </label>

              </div>

            </div>

          </div>

        </div>

        {/* APPLICATION SETTINGS */}

        <div className="col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <h5 className="fw-bold mb-4">
                Application Settings
              </h5>

              <div className="form-check form-switch mb-4">

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  <strong>Dark Mode</strong>

                  <div className="text-muted small">
                    Use dark interface for the application
                  </div>
                </label>

              </div>

              <div className="form-check form-switch">

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="autoRefresh"
                  checked={settings.autoRefresh}
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  <strong>Automatic Refresh</strong>

                  <div className="text-muted small">
                    Automatically refresh security information
                  </div>
                </label>

              </div>

            </div>

          </div>

        </div>

        {/* SYSTEM INFORMATION */}

        <div className="col-12">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <h5 className="fw-bold mb-4">
                System Information
              </h5>

              <div className="row">

                <div className="col-md-3 mb-3">

                  <small className="text-muted">
                    Application
                  </small>

                  <div className="fw-bold">
                    SecureCore IT Management
                  </div>

                </div>

                <div className="col-md-3 mb-3">

                  <small className="text-muted">
                    Version
                  </small>

                  <div className="fw-bold">
                    1.0.0
                  </div>

                </div>

                <div className="col-md-3 mb-3">

                  <small className="text-muted">
                    Backend
                  </small>

                  <div>
                    <span className="badge bg-success">
                      Python API
                    </span>
                  </div>

                </div>

                <div className="col-md-3 mb-3">

                  <small className="text-muted">
                    Database
                  </small>

                  <div>
                    <span className="badge bg-primary">
                      SQLite
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* SAVE */}

      <div className="d-flex justify-content-end align-items-center mt-4">

        {saved && (
          <span className="text-success me-3">
            ✓ Settings saved successfully
          </span>
        )}

        <button
          className="btn btn-primary px-4"
          onClick={saveSettings}
        >
          Save Settings
        </button>

      </div>

    </div>
  );
}

export default Settings;