import React, { useEffect, useState } from "react";

function Reports() {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [software, setSoftware] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const responses = await Promise.all([
        fetch("http://127.0.0.1:8001/api/assets"),
        fetch("http://127.0.0.1:8001/api/employees"),
        fetch("http://127.0.0.1:8001/api/software"),
        fetch("http://127.0.0.1:8001/api/incidents"),
      ]);

      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      setAssets(Array.isArray(data[0]) ? data[0] : []);
      setEmployees(Array.isArray(data[1]) ? data[1] : []);
      setSoftware(Array.isArray(data[2]) ? data[2] : []);
      setIncidents(Array.isArray(data[3]) ? data[3] : []);
    } catch (error) {
      console.error("Report loading error:", error);
    }
  }

  const reports = [
    {
      name: "IT Asset Inventory",
      description:
        "Complete overview of registered IT assets.",
      type: "Asset Report",
      count: assets.length,
      icon: "▣",
    },
    {
      name: "Employee Security Report",
      description:
        "Employee accounts, departments and security status.",
      type: "Employee Report",
      count: employees.length,
      icon: "♙",
    },
    {
      name: "Software License Report",
      description:
        "Installed software and license information.",
      type: "Software Report",
      count: software.length,
      icon: "◈",
    },
    {
      name: "Security Incident Report",
      description:
        "Security incidents, severity and resolution status.",
      type: "Security Report",
      count: incidents.length,
      icon: "⚠",
    },
  ];

  function generateReport(name) {
    alert(`${name} generated successfully.`);
  }

  return (
    <div>

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h2>Reports & Analytics</h2>

          <p>
            Review organizational IT and security information.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={loadData}
        >
          Refresh Reports
        </button>

      </div>

      {/* SUMMARY */}

      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div className="card border-0">
            <div className="card-body">

              <small className="text-muted">
                Total Assets
              </small>

              <h2 className="fw-bold mt-2">
                {assets.length}
              </h2>

              <small className="text-primary">
                Registered assets
              </small>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0">
            <div className="card-body">

              <small className="text-muted">
                Employees
              </small>

              <h2 className="fw-bold mt-2">
                {employees.length}
              </h2>

              <small className="text-primary">
                Registered employees
              </small>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0">
            <div className="card-body">

              <small className="text-muted">
                Software
              </small>

              <h2 className="fw-bold mt-2">
                {software.length}
              </h2>

              <small className="text-primary">
                Software records
              </small>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0">
            <div className="card-body">

              <small className="text-muted">
                Incidents
              </small>

              <h2 className="fw-bold mt-2">
                {incidents.length}
              </h2>

              <small className="text-danger">
                Security records
              </small>

            </div>
          </div>
        </div>

      </div>

      {/* REPORTS */}

      <div className="data-card">

        <div className="data-card-header">

          <div>
            <h5>Available Reports</h5>

            <p>
              Generate reports from current SecureCore data.
            </p>
          </div>

        </div>

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead>
              <tr>
                <th>Report</th>
                <th>Description</th>
                <th>Type</th>
                <th>Records</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {reports.map((report) => (

                <tr key={report.name}>

                  <td>

                    <div className="d-flex align-items-center">

                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          background:
                            "rgba(37, 99, 235, 0.10)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "12px",
                          fontSize: "18px",
                        }}
                      >
                        {report.icon}
                      </div>

                      <strong>
                        {report.name}
                      </strong>

                    </div>

                  </td>

                  <td className="text-muted">
                    {report.description}
                  </td>

                  <td>
                    <span className="badge bg-secondary">
                      {report.type}
                    </span>
                  </td>

                  <td>
                    <strong>
                      {report.count}
                    </strong>
                  </td>

                  <td>
                    <span className="badge bg-success">
                      Ready
                    </span>
                  </td>

                  <td>

                    <button
                      className="action-btn edit"
                      onClick={() =>
                        generateReport(report.name)
                      }
                    >
                      Generate
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* SYSTEM SUMMARY */}

      <div className="row g-4 mt-1">

        <div className="col-md-6">

          <div className="card border-0">

            <div className="card-body">

              <h5 className="fw-bold">
                Data Coverage
              </h5>

              <p className="text-muted">
                Current records available for reporting.
              </p>

              <div className="d-flex justify-content-between mb-3">
                <span>Assets</span>
                <strong>{assets.length}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Employees</span>
                <strong>{employees.length}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Software</span>
                <strong>{software.length}</strong>
              </div>

              <div className="d-flex justify-content-between">
                <span>Incidents</span>
                <strong>{incidents.length}</strong>
              </div>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card border-0">

            <div className="card-body">

              <h5 className="fw-bold">
                Reporting Status
              </h5>

              <p className="text-muted">
                SecureCore reporting services.
              </p>

              <div className="d-flex align-items-center mb-3">
                <span className="status-dot"></span>
                <span className="ms-2">
                  Database Connected
                </span>
              </div>

              <div className="d-flex align-items-center mb-3">
                <span className="status-dot"></span>
                <span className="ms-2">
                  Report Engine Ready
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="status-dot"></span>
                <span className="ms-2">
                  Data Synchronization Active
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;