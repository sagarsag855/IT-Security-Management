import React, { useEffect, useState } from "react";

function Employees() {
  const API = "http://127.0.0.1:8001/api/employees";

  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Employee loading error:", error);
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function addEmployee(event) {
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
        throw new Error("Failed to add employee");
      }

      setForm({
        employee_id: "",
        name: "",
        email: "",
        department: "",
        role: "",
        status: "Active",
      });

      setShowForm(false);
      loadEmployees();
    } catch (error) {
      console.error(error);
      alert("Could not add employee.");
    }
  }

  async function deleteEmployee(id) {
    if (!window.confirm("Delete this employee?")) {
      return;
    }

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      loadEmployees();
    } catch (error) {
      console.error(error);
    }
  }

  const filteredEmployees = employees.filter((employee) => {
    const text = search.toLowerCase();

    return (
      employee.employee_id?.toLowerCase().includes(text) ||
      employee.name?.toLowerCase().includes(text) ||
      employee.email?.toLowerCase().includes(text) ||
      employee.department?.toLowerCase().includes(text) ||
      employee.role?.toLowerCase().includes(text)
    );
  });

  return (
    <div>

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h2>Employees</h2>

          <p>
            Manage employee accounts, roles and organizational access.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Employee
        </button>

      </div>

      {/* ADD FORM */}

      {showForm && (
        <div className="form-card">

          <div className="form-card-title">

            <h5>
              Add New Employee
            </h5>

            <p>
              Create an employee record for the organization.
            </p>

          </div>

          <form onSubmit={addEmployee}>

            <div className="row g-3">

              <div className="col-md-6">

                <label className="form-label">
                  Employee ID
                </label>

                <input
                  className="form-control"
                  name="employee_id"
                  value={form.employee_id}
                  onChange={handleChange}
                  placeholder="EMP-001"
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Full Name
                </label>

                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Employee name"
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="employee@company.com"
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
                  Role
                </label>

                <input
                  className="form-control"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="Security Analyst"
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
                  <option>Suspended</option>
                </select>

              </div>

            </div>

            <div className="mt-4">

              <button
                type="submit"
                className="btn btn-primary me-2"
              >
                Save Employee
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

      {/* EMPLOYEE TABLE */}

      <div className="data-card">

        <div className="data-card-header">

          <div>

            <h5>
              Employee Directory
            </h5>

            <p>
              {employees.length} registered employees
            </p>

          </div>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search employees..."
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
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredEmployees.length === 0 ? (

                <tr>

                  <td colSpan="7">

                    <div className="empty-state">

                      <div className="empty-state-icon">
                        👥
                      </div>

                      <h6>
                        No employees found
                      </h6>

                      <p>
                        Add an employee or adjust your search.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredEmployees.map((employee) => (

                  <tr key={employee.id}>

                    <td>
                      <strong>
                        {employee.employee_id}
                      </strong>
                    </td>

                    <td>
                      {employee.name}
                    </td>

                    <td>
                      {employee.email}
                    </td>

                    <td>
                      {employee.department}
                    </td>

                    <td>
                      {employee.role}
                    </td>

                    <td>

                      <span className="status-indicator">

                        <span className="status-dot"></span>

                        {employee.status}

                      </span>

                    </td>

                    <td>

                      <button
                        className="action-btn delete"
                        onClick={() =>
                          deleteEmployee(employee.id)
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

export default Employees;