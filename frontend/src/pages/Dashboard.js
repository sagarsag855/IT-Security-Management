import React, { useEffect, useState } from "react";

function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [software, setSoftware] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const responses = await Promise.all([
        fetch("http://127.0.0.1:8001/api/assets"),
        fetch("http://127.0.0.1:8001/api/employees"),
        fetch("http://127.0.0.1:8001/api/software"),
        fetch("http://127.0.0.1:8001/api/incidents"),
      ]);

      const [
        assetsData,
        employeesData,
        softwareData,
        incidentsData,
      ] = await Promise.all(
        responses.map((response) => response.json())
      );

      setAssets(assetsData);
      setEmployees(employeesData);
      setSoftware(softwareData);
      setIncidents(incidentsData);
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  }

  const activeAssets = assets.filter(
    (item) => item.status === "Active"
  ).length;

  const activeEmployees = employees.filter(
    (item) => item.status === "Active"
  ).length;

  const activeSoftware = software.filter(
    (item) => item.status === "Active"
  ).length;

  const openIncidents = incidents.filter(
    (item) =>
      item.status === "Open" ||
      item.status === "Investigating"
  ).length;

  const criticalIncidents = incidents.filter(
    (item) => item.severity === "Critical"
  ).length;

  const highIncidents = incidents.filter(
    (item) => item.severity === "High"
  ).length;

  return (
    <div>

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Security Dashboard
          </h2>

          <p className="text-muted mb-0">
            Monitor your organization's IT environment and security posture.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={loadDashboard}
        >
          ↻ Refresh
        </button>

      </div>

      {/* STAT CARDS */}

      <div className="row g-4 mb-4">

        <div className="col-md-6 col-xl-3">

          <div className="card stat-card border-0 h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-start">

                <div>
                  <small className="text-muted">
                    IT Assets
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {assets.length}
                  </h2>

                  <small className="text-success">
                    ● {activeAssets} active
                  </small>
                </div>

                <div
                  className="rounded-3 p-3"
                  style={{
                    background: "#eff6ff",
                    fontSize: "22px",
                  }}
                >
                  💻
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="col-md-6 col-xl-3">

          <div className="card stat-card border-0 h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-start">

                <div>
                  <small className="text-muted">
                    Employees
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {employees.length}
                  </h2>

                  <small className="text-success">
                    ● {activeEmployees} active
                  </small>
                </div>

                <div
                  className="rounded-3 p-3"
                  style={{
                    background: "#f0fdf4",
                    fontSize: "22px",
                  }}
                >
                  👥
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="col-md-6 col-xl-3">

          <div className="card stat-card border-0 h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-start">

                <div>
                  <small className="text-muted">
                    Software
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {software.length}
                  </h2>

                  <small className="text-success">
                    ● {activeSoftware} active
                  </small>
                </div>

                <div
                  className="rounded-3 p-3"
                  style={{
                    background: "#f5f3ff",
                    fontSize: "22px",
                  }}
                >
                  ◈
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="col-md-6 col-xl-3">

          <div className="card stat-card border-0 h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-start">

                <div>
                  <small className="text-muted">
                    Open Incidents
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {openIncidents}
                  </h2>

                  <small className="text-danger">
                    ● {criticalIncidents} critical
                  </small>
                </div>

                <div
                  className="rounded-3 p-3"
                  style={{
                    background: "#fef2f2",
                    fontSize: "22px",
                  }}
                >
                  ⚠
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* SECURITY POSTURE */}

      <div className="row g-4 mb-4">

        <div className="col-lg-8">

          <div className="card border-0 h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                  <h5 className="fw-bold mb-1">
                    Security Posture
                  </h5>

                  <small className="text-muted">
                    Current security environment overview
                  </small>
                </div>

                <span className="badge bg-success">
                  Monitoring Active
                </span>

              </div>

              <div className="row text-center">

                <div className="col-md-4 border-end">

                  <div className="py-3">

                    <div className="fs-2 mb-2">
                      🛡️
                    </div>

                    <h3 className="fw-bold mb-1">
                      {incidents.length === 0
                        ? "100%"
                        : `${Math.max(
                            0,
                            100 -
                              Math.round(
                                (criticalIncidents /
                                  incidents.length) *
                                  100
                              )
                          )}%`}
                    </h3>

                    <small className="text-muted">
                      Security Health
                    </small>

                  </div>

                </div>

                <div className="col-md-4 border-end">

                  <div className="py-3">

                    <div className="fs-2 mb-2">
                      🚨
                    </div>

                    <h3 className="fw-bold text-danger mb-1">
                      {criticalIncidents}
                    </h3>

                    <small className="text-muted">
                      Critical
                    </small>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="py-3">

                    <div className="fs-2 mb-2">
                      ⚠️
                    </div>

                    <h3 className="fw-bold text-warning mb-1">
                      {highIncidents}
                    </h3>

                    <small className="text-muted">
                      High Severity
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SYSTEM STATUS */}

        <div className="col-lg-4">

          <div className="card border-0 h-100">

            <div className="card-body">

              <h5 className="fw-bold mb-4">
                System Status
              </h5>

              <div className="d-flex justify-content-between align-items-center mb-4">

                <span>
                  Backend API
                </span>

                <span className="badge bg-success">
                  Online
                </span>

              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">

                <span>
                  SQLite Database
                </span>

                <span className="badge bg-success">
                  Connected
                </span>

              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">

                <span>
                  Security Monitoring
                </span>

                <span className="badge bg-success">
                  Active
                </span>

              </div>

              <div className="d-flex justify-content-between align-items-center">

                <span>
                  Incident Management
                </span>

                <span className="badge bg-primary">
                  Enabled
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* RECENT INCIDENTS */}

      <div className="card border-0">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h5 className="fw-bold mb-1">
                Recent Security Incidents
              </h5>

              <small className="text-muted">
                Latest recorded security events
              </small>
            </div>

            <span className="badge bg-secondary">
              {incidents.length} Total
            </span>

          </div>

          {incidents.length === 0 ? (

            <div className="text-center py-5">

              <div className="fs-1 mb-3">
                🛡️
              </div>

              <h6 className="fw-bold">
                No incidents recorded
              </h6>

              <p className="text-muted small mb-0">
                Your security incident database is currently clear.
              </p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>
                  <tr>
                    <th>Incident ID</th>
                    <th>Incident</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  {incidents.slice(0, 5).map((incident) => (

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
                          className={
                            incident.severity === "Critical"
                              ? "badge bg-danger"
                              : incident.severity === "High"
                              ? "badge bg-warning text-dark"
                              : "badge bg-secondary"
                          }
                        >
                          {incident.severity}
                        </span>

                      </td>

                      <td>

                        <span className="badge bg-primary">
                          {incident.status}
                        </span>

                      </td>

                      <td>
                        {incident.assigned_to}
                      </td>

                      <td>
                        {incident.created_date}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;