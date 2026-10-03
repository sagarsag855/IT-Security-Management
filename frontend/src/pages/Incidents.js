import React, { useEffect, useState } from "react";

function Incidents() {
  const API = "http://127.0.0.1:8001/api/incidents";

  const [incidents, setIncidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    incident_id: "",
    title: "",
    description: "",
    severity: "Medium",
    status: "Open",
    assigned_to: "",
    created_date: "",
  });

  useEffect(() => {
    loadIncidents();
  }, []);

  async function loadIncidents() {
    try {
      const response = await fetch(API);
      setIncidents(await response.json());
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function addIncident(event) {
    event.preventDefault();

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to add incident");
      }

      setForm({
        incident_id: "",
        title: "",
        description: "",
        severity: "Medium",
        status: "Open",
        assigned_to: "",
        created_date: "",
      });

      setShowForm(false);
      loadIncidents();
    } catch (error) {
      console.error(error);
      alert("Could not add incident.");
    }
  }

  async function deleteIncident(id) {
    if (!window.confirm("Delete this incident?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    loadIncidents();
  }

  const filteredIncidents = incidents.filter((incident) => {
    const text = search.toLowerCase();

    return (
      incident.incident_id?.toLowerCase().includes(text) ||
      incident.title?.toLowerCase().includes(text) ||
      incident.severity?.toLowerCase().includes(text) ||
      incident.status?.toLowerCase().includes(text) ||
      incident.assigned_to?.toLowerCase().includes(text)
    );
  });

  const critical = incidents.filter(
    (item) => item.severity === "Critical"
  ).length;

  const high = incidents.filter(
    (item) => item.severity === "High"
  ).length;

  const open = incidents.filter(
    (item) =>
      item.status === "Open" ||
      item.status === "Investigating"
  ).length;

  function severityClass(severity) {
    if (severity === "Critical") return "badge bg-danger";
    if (severity === "High") return "badge bg-warning text-dark";
    if (severity === "Medium") return "badge bg-info text-dark";
    return "badge bg-secondary";
  }

  return (
    <div>

      <div className="page-header">
        <div>
          <h2>Security Incidents</h2>
          <p>
            Monitor, track and manage security incidents.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          + Create Incident
        </button>
      </div>

      {/* SECURITY SUMMARY */}

      <div className="row g-4 mb-4">

        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body">
              <small className="text-muted">
                Open Incidents
              </small>
              <h2 className="fw-bold mt-2">
                {open}
              </h2>
              <small className="text-primary">
                Active investigation
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body">
              <small className="text-muted">
                High Severity
              </small>
              <h2 className="fw-bold text-warning mt-2">
                {high}
              </h2>
              <small className="text-muted">
                Requires attention
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body">
              <small className="text-muted">
                Critical
              </small>
              <h2 className="fw-bold text-danger mt-2">
                {critical}
              </h2>
              <small className="text-danger">
                Immediate attention
              </small>
            </div>
          </div>
        </div>

      </div>

      {/* FORM */}

      {showForm && (
        <div className="form-card">

          <div className="form-card-title">
            <h5>Create Security Incident</h5>
            <p>
              Record a new security event for investigation.
            </p>
          </div>

          <form onSubmit={addIncident}>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">
                  Incident ID
                </label>

                <input
                  className="form-control"
                  name="incident_id"
                  value={form.incident_id}
                  onChange={handleChange}
                  placeholder="INC-001"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Title
                </label>

                <input
                  className="form-control"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Suspicious login detected"
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the security incident..."
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Severity
                </label>

                <select
                  className="form-select"
                  name="severity"
                  value={form.severity}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Open</option>
                  <option>Investigating</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Assigned To
                </label>

                <input
                  className="form-control"
                  name="assigned_to"
                  value={form.assigned_to}
                  onChange={handleChange}
                  placeholder="Security Analyst"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Created Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="created_date"
                  value={form.created_date}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-primary me-2"
              >
                Create Incident
              </button>

              <button
                type="button"
                className="btn btn-light"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* INCIDENT TABLE */}

      <div className="data-card">

        <div className="data-card-header">

          <div>
            <h5>Incident Register</h5>
            <p>
              {incidents.length} recorded security incidents
            </p>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search incidents..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
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
                <th>Assigned To</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredIncidents.length === 0 ? (

                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <div className="empty-state-icon">
                        🛡️
                      </div>

                      <h6>No incidents found</h6>

                      <p>
                        No security incidents match your search.
                      </p>
                    </div>
                  </td>
                </tr>

              ) : (

                filteredIncidents.map((incident) => (

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
                      <span className={severityClass(incident.severity)}>
                        {incident.severity}
                      </span>
                    </td>

                    <td>
                      <span className="status-indicator">
                        <span className="status-dot"></span>
                        {incident.status}
                      </span>
                    </td>

                    <td>
                      {incident.assigned_to}
                    </td>

                    <td>
                      {incident.created_date}
                    </td>

                    <td>
                      <button
                        className="action-btn delete"
                        onClick={() =>
                          deleteIncident(incident.id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Incidents;