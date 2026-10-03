import React, { useEffect, useState } from "react";

function Security() {
  const API = "http://127.0.0.1:8001/api/incidents";

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    loadIncidents();
  }, []);

  async function loadIncidents() {
    try {
      const response = await fetch(API);
      const data = await response.json();

      if (Array.isArray(data)) {
        setIncidents(data);
      }
    } catch (error) {
      console.error("Security loading error:", error);
    }
  }

  const critical = incidents.filter(
    (item) => item.severity === "Critical"
  ).length;

  const high = incidents.filter(
    (item) => item.severity === "High"
  ).length;

  const active = incidents.filter(
    (item) =>
      item.status === "Open" ||
      item.status === "Investigating"
  ).length;

  const resolved = incidents.filter(
    (item) =>
      item.status === "Resolved" ||
      item.status === "Closed"
  ).length;

  function severityClass(severity) {
    if (severity === "Critical") {
      return "badge bg-danger";
    }

    if (severity === "High") {
      return "badge bg-warning text-dark";
    }

    if (severity === "Medium") {
      return "badge bg-info text-dark";
    }

    return "badge bg-secondary";
  }

  return (
    <div>

      <div className="page-header">
        <div>
          <h2>Security Center</h2>
          <p>
            Monitor security incidents and organizational risk.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={loadIncidents}
        >
          Refresh
        </button>
      </div>

      {/* SECURITY OVERVIEW */}

      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div className="card border-0">
            <div className="card-body">
              <small className="text-muted">
                Critical Alerts
              </small>

              <h2 className="fw-bold text-danger mt-2">
                {critical}
              </h2>

              <small className="text-danger">
                Critical incidents
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0">
            <div className="card-body">
              <small className="text-muted">
                High Risk
              </small>

              <h2 className="fw-bold text-warning mt-2">
                {high}
              </h2>

              <small className="text-muted">
                High severity incidents
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0">
            <div className="card-body">
              <small className="text-muted">
                Active Incidents
              </small>

              <h2 className="fw-bold text-primary mt-2">
                {active}
              </h2>

              <small className="text-muted">
                Open investigations
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0">
            <div className="card-body">
              <small className="text-muted">
                Resolved
              </small>

              <h2 className="fw-bold text-success mt-2">
                {resolved}
              </h2>

              <small className="text-muted">
                Closed incidents
              </small>
            </div>
          </div>
        </div>

      </div>

      {/* SECURITY HEALTH */}

      <div className="row g-4 mb-4">

        <div className="col-md-7">

          <div className="data-card">

            <div className="data-card-header">
              <div>
                <h5>Security Alerts</h5>
                <p>
                  Latest incidents requiring security attention
                </p>
              </div>
            </div>

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>
                  <tr>
                    <th>Incident</th>
                    <th>Title</th>
                    <th>Severity</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {incidents.length === 0 ? (

                    <tr>
                      <td colSpan="4">
                        <div className="empty-state">
                          <div className="empty-state-icon">
                            🛡️
                          </div>

                          <h6>No Security Alerts</h6>

                          <p>
                            No incidents have been recorded.
                          </p>
                        </div>
                      </td>
                    </tr>

                  ) : (

                    incidents.slice(0, 8).map((incident) => (

                      <tr key={incident.id}>

                        <td>
                          <strong>
                            {incident.incident_id}
                          </strong>
                        </td>

                        <td>
                          {incident.title}
                        </td>

                        <td>
                          <span
                            className={severityClass(
                              incident.severity
                            )}
                          >
                            {incident.severity}
                          </span>
                        </td>

                        <td>
                          <span className="status-indicator">
                            <span className="status-dot"></span>
                            {incident.status}
                          </span>
                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        <div className="col-md-5">

          <div className="card border-0 h-100">

            <div className="card-body">

              <h5 className="fw-bold">
                Security Health
              </h5>

              <p className="text-muted">
                Current incident-based security overview
              </p>

              <div className="text-center py-4">

                <div
                  style={{
                    fontSize: "52px",
                    fontWeight: "700",
                  }}
                >
                  {incidents.length === 0
                    ? "100%"
                    : active === 0
                    ? "95%"
                    : "82%"}
                </div>

                <span className="badge bg-success">
                  Monitoring Active
                </span>

              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <span>Incident Monitoring</span>
                <strong>Active</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Database Status</span>
                <strong className="text-success">
                  Online
                </strong>
              </div>

              <div className="d-flex justify-content-between">
                <span>Security Engine</span>
                <strong className="text-success">
                  Operational
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ACTIVITY */}

      <div className="data-card">

        <div className="data-card-header">

          <div>
            <h5>Security Activity</h5>
            <p>
              Recent security events recorded by SecureCore
            </p>
          </div>

        </div>

        <div className="p-4">

          {incidents.length === 0 ? (

            <p className="text-muted mb-0">
              No recent security activity.
            </p>

          ) : (

            incidents.slice(0, 5).map((incident) => (

              <div
                key={incident.id}
                className="d-flex align-items-center mb-3"
              >

                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#2563eb",
                    marginRight: "12px",
                  }}
                ></div>

                <div>
                  <strong>
                    {incident.title}
                  </strong>

                  <div className="text-muted small">
                    {incident.incident_id} ·{" "}
                    {incident.status}
                  </div>
                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Security;