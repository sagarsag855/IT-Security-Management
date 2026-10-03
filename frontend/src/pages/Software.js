import React, { useEffect, useState } from "react";

function Software() {
  const API = "http://127.0.0.1:8001/api/software";

  const [software, setSoftware] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    software_id: "",
    name: "",
    version: "",
    installed_on: "",
    license_status: "Licensed",
    status: "Active",
  });

  useEffect(() => {
    loadSoftware();
  }, []);

  async function loadSoftware() {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setSoftware(data);
    } catch (error) {
      console.error("Software loading error:", error);
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function addSoftware(event) {
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
        throw new Error("Failed to add software");
      }

      setForm({
        software_id: "",
        name: "",
        version: "",
        installed_on: "",
        license_status: "Licensed",
        status: "Active",
      });

      setShowForm(false);
      loadSoftware();

    } catch (error) {
      console.error(error);
      alert("Could not add software.");
    }
  }

  async function deleteSoftware(id) {
    if (!window.confirm("Delete this software?")) {
      return;
    }

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      loadSoftware();

    } catch (error) {
      console.error(error);
    }
  }

  const filteredSoftware = software.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.software_id?.toLowerCase().includes(text) ||
      item.name?.toLowerCase().includes(text) ||
      item.version?.toLowerCase().includes(text) ||
      item.license_status?.toLowerCase().includes(text)
    );
  });

  return (
    <div>

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h2>Software Management</h2>

          <p>
            Manage installed software, versions and licensing.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Software
        </button>

      </div>

      {/* FORM */}

      {showForm && (

        <div className="form-card">

          <div className="form-card-title">

            <h5>
              Add Software
            </h5>

            <p>
              Register software and license information.
            </p>

          </div>

          <form onSubmit={addSoftware}>

            <div className="row g-3">

              <div className="col-md-6">

                <label className="form-label">
                  Software ID
                </label>

                <input
                  className="form-control"
                  name="software_id"
                  value={form.software_id}
                  onChange={handleChange}
                  placeholder="SW-001"
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Software Name
                </label>

                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Microsoft Office"
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Version
                </label>

                <input
                  className="form-control"
                  name="version"
                  value={form.version}
                  onChange={handleChange}
                  placeholder="2024"
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Installed On
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="installed_on"
                  value={form.installed_on}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  License Status
                </label>

                <select
                  className="form-select"
                  name="license_status"
                  value={form.license_status}
                  onChange={handleChange}
                >
                  <option>Licensed</option>
                  <option>Expired</option>
                  <option>Trial</option>
                </select>

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

              </div>

            </div>

            <div className="mt-4">

              <button
                type="submit"
                className="btn btn-primary me-2"
              >
                Save Software
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

      {/* SOFTWARE TABLE */}

      <div className="data-card">

        <div className="data-card-header">

          <div>

            <h5>
              Software Inventory
            </h5>

            <p>
              {software.length} registered software records
            </p>

          </div>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search software..."
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
                <th>Software ID</th>
                <th>Software</th>
                <th>Version</th>
                <th>Installed On</th>
                <th>License</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredSoftware.length === 0 ? (

                <tr>

                  <td colSpan="7">

                    <div className="empty-state">

                      <div className="empty-state-icon">
                        ◈
                      </div>

                      <h6>
                        No software found
                      </h6>

                      <p>
                        Add software or adjust your search.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredSoftware.map((item) => (

                  <tr key={item.id}>

                    <td>
                      <strong>
                        {item.software_id}
                      </strong>
                    </td>

                    <td>
                      {item.name}
                    </td>

                    <td>
                      {item.version}
                    </td>

                    <td>
                      {item.installed_on}
                    </td>

                    <td>

                      <span
                        className={
                          item.license_status === "Licensed"
                            ? "badge bg-success"
                            : item.license_status === "Expired"
                            ? "badge bg-danger"
                            : "badge bg-warning text-dark"
                        }
                      >
                        {item.license_status}
                      </span>

                    </td>

                    <td>

                      <span className="status-indicator">

                        <span className="status-dot"></span>

                        {item.status}

                      </span>

                    </td>

                    <td>

                      <button
                        className="action-btn delete"
                        onClick={() =>
                          deleteSoftware(item.id)
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

export default Software;