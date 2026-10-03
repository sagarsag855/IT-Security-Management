import React, { useEffect, useState } from "react";

function Assets() {
  const API = "http://127.0.0.1:8001/api/assets";

  const [assets, setAssets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    asset_id: "",
    device: "",
    assigned_to: "",
    department: "",
    status: "Active",
  });

  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error("Asset loading error:", error);
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function addAsset(event) {
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
        throw new Error("Failed to add asset");
      }

      setForm({
        asset_id: "",
        device: "",
        assigned_to: "",
        department: "",
        status: "Active",
      });

      setShowForm(false);
      loadAssets();

    } catch (error) {
      console.error(error);
      alert("Could not add asset.");
    }
  }

  async function deleteAsset(id) {
    if (!window.confirm("Delete this asset?")) {
      return;
    }

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      loadAssets();

    } catch (error) {
      console.error(error);
    }
  }

  const filteredAssets = assets.filter((asset) => {
    const text = search.toLowerCase();

    return (
      asset.asset_id?.toLowerCase().includes(text) ||
      asset.device?.toLowerCase().includes(text) ||
      asset.assigned_to?.toLowerCase().includes(text) ||
      asset.department?.toLowerCase().includes(text)
    );
  });

  return (
    <div>

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h2>IT Assets</h2>

          <p>
            Manage organizational hardware and assigned devices.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Asset
        </button>

      </div>

      {/* ADD FORM */}

      {showForm && (

        <div className="form-card">

          <div className="form-card-title">

            <h5>
              Add New Asset
            </h5>

            <p>
              Register a new device in the IT asset inventory.
            </p>

          </div>

          <form onSubmit={addAsset}>

            <div className="row g-3">

              <div className="col-md-6">

                <label className="form-label">
                  Asset ID
                </label>

                <input
                  className="form-control"
                  name="asset_id"
                  value={form.asset_id}
                  onChange={handleChange}
                  placeholder="AST-001"
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Device
                </label>

                <input
                  className="form-control"
                  name="device"
                  value={form.device}
                  onChange={handleChange}
                  placeholder="Dell Latitude 5440"
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Assigned To
                </label>

                <input
                  className="form-control"
                  name="assigned_to"
                  value={form.assigned_to}
                  onChange={handleChange}
                  placeholder="Employee name"
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Department
                </label>

                <input
                  className="form-control"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="IT Security"
                  required
                />

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
                  <option>Maintenance</option>
                </select>

              </div>

            </div>

            <div className="mt-4">

              <button
                type="submit"
                className="btn btn-primary me-2"
              >
                Save Asset
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

      {/* TABLE */}

      <div className="data-card">

        <div className="data-card-header">

          <div>

            <h5>
              Asset Inventory
            </h5>

            <p>
              {assets.length} registered assets
            </p>

          </div>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search assets..."
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
                <th>Asset ID</th>
                <th>Device</th>
                <th>Assigned To</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredAssets.length === 0 ? (

                <tr>

                  <td colSpan="6">

                    <div className="empty-state">

                      <div className="empty-state-icon">
                        💻
                      </div>

                      <h6>
                        No assets found
                      </h6>

                      <p>
                        Add an asset or adjust your search.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredAssets.map((asset) => (

                  <tr key={asset.id}>

                    <td>
                      <strong>
                        {asset.asset_id}
                      </strong>
                    </td>

                    <td>
                      {asset.device}
                    </td>

                    <td>
                      {asset.assigned_to}
                    </td>

                    <td>
                      {asset.department}
                    </td>

                    <td>

                      <span className="status-indicator">

                        <span className="status-dot"></span>

                        {asset.status}

                      </span>

                    </td>

                    <td>

                      <button
                        className="action-btn delete"
                        onClick={() =>
                          deleteAsset(asset.id)
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

export default Assets;