import json
import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

DATABASE = "security.db"


# =========================================================
# DATABASE
# =========================================================

def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


# =========================================================
# HTTP SERVER
# =========================================================

class SecurityServer(BaseHTTPRequestHandler):

    # -----------------------------------------------------
    # CORS
    # -----------------------------------------------------

    def send_cors_headers(self):
        self.send_header(
            "Access-Control-Allow-Origin",
            "*"
        )
        self.send_header(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        )
        self.send_header(
            "Access-Control-Allow-Headers",
            "Content-Type"
        )

    # -----------------------------------------------------
    # JSON RESPONSE
    # -----------------------------------------------------

    def send_json(self, data, status=200):

        self.send_response(status)

        self.send_header(
            "Content-Type",
            "application/json"
        )

        self.send_cors_headers()

        self.end_headers()

        self.wfile.write(
            json.dumps(data).encode("utf-8")
        )

    # -----------------------------------------------------
    # READ REQUEST BODY
    # -----------------------------------------------------

    def get_request_data(self):

        content_length = int(
            self.headers.get("Content-Length", 0)
        )

        if content_length == 0:
            return {}

        body = self.rfile.read(
            content_length
        )

        return json.loads(
            body.decode("utf-8")
        )

    # =====================================================
    # OPTIONS
    # =====================================================

    def do_OPTIONS(self):

        self.send_response(200)

        self.send_cors_headers()

        self.end_headers()

    # =====================================================
    # GET
    # =====================================================

    def do_GET(self):

        parsed_url = urlparse(self.path)

        path = parsed_url.path

        # -------------------------------------------------
        # STATUS
        # -------------------------------------------------

        if path == "/api/status":

            self.send_json({
                "status": "online",
                "message": "IT Security Management Backend is running"
            })

            return

        # -------------------------------------------------
        # ASSETS
        # -------------------------------------------------

        if path == "/api/assets":

            connection = get_connection()

            rows = connection.execute(
                """
                SELECT *
                FROM assets
                ORDER BY id DESC
                """
            ).fetchall()

            connection.close()

            self.send_json(
                [dict(row) for row in rows]
            )

            return

        # -------------------------------------------------
        # EMPLOYEES
        # -------------------------------------------------

        if path == "/api/employees":

            connection = get_connection()

            rows = connection.execute(
                """
                SELECT *
                FROM employees
                ORDER BY id DESC
                """
            ).fetchall()

            connection.close()

            self.send_json(
                [dict(row) for row in rows]
            )

            return

        # -------------------------------------------------
        # SOFTWARE
        # -------------------------------------------------

        if path == "/api/software":

            connection = get_connection()

            rows = connection.execute(
                """
                SELECT *
                FROM software
                ORDER BY id DESC
                """
            ).fetchall()

            connection.close()

            self.send_json(
                [dict(row) for row in rows]
            )

            return

        # -------------------------------------------------
        # INCIDENTS
        # -------------------------------------------------

        if path == "/api/incidents":

            connection = get_connection()

            rows = connection.execute(
                """
                SELECT *
                FROM incidents
                ORDER BY id DESC
                """
            ).fetchall()

            connection.close()

            self.send_json(
                [dict(row) for row in rows]
            )

            return

        # -------------------------------------------------
        # UNKNOWN ROUTE
        # -------------------------------------------------

        self.send_json(
            {
                "error": "API endpoint not found"
            },
            404
        )

    # =====================================================
    # POST
    # =====================================================

    def do_POST(self):

        path = urlparse(self.path).path

        try:

            data = self.get_request_data()

            connection = get_connection()

            # -------------------------------------------------
            # ASSETS
            # -------------------------------------------------

            if path == "/api/assets":

                connection.execute(
                    """
                    INSERT INTO assets
                    (
                        asset_id,
                        device,
                        assigned_to,
                        department,
                        status
                    )
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    (
                        data["asset_id"],
                        data["device"],
                        data["assigned_to"],
                        data["department"],
                        data["status"]
                    )
                )

                connection.commit()

                connection.close()

                self.send_json({
                    "message": "Asset added successfully"
                }, 201)

                return

            # -------------------------------------------------
            # EMPLOYEES
            # -------------------------------------------------

            if path == "/api/employees":

                connection.execute(
                    """
                    INSERT INTO employees
                    (
                        employee_id,
                        name,
                        email,
                        department,
                        role,
                        status
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    (
                        data["employee_id"],
                        data["name"],
                        data["email"],
                        data["department"],
                        data["role"],
                        data["status"]
                    )
                )

                connection.commit()

                connection.close()

                self.send_json({
                    "message": "Employee added successfully"
                }, 201)

                return

            # -------------------------------------------------
            # SOFTWARE
            # -------------------------------------------------

            if path == "/api/software":

                connection.execute(
                    """
                    INSERT INTO software
                    (
                        software_id,
                        name,
                        version,
                        installed_on,
                        license_status,
                        status
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    (
                        data["software_id"],
                        data["name"],
                        data["version"],
                        data["installed_on"],
                        data["license_status"],
                        data["status"]
                    )
                )

                connection.commit()

                connection.close()

                self.send_json({
                    "message": "Software added successfully"
                }, 201)

                return

            # -------------------------------------------------
            # INCIDENTS
            # -------------------------------------------------

            if path == "/api/incidents":

                connection.execute(
                    """
                    INSERT INTO incidents
                    (
                        incident_id,
                        title,
                        description,
                        severity,
                        status,
                        assigned_to,
                        created_date
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        data["incident_id"],
                        data["title"],
                        data["description"],
                        data["severity"],
                        data["status"],
                        data["assigned_to"],
                        data["created_date"]
                    )
                )

                connection.commit()

                connection.close()

                self.send_json({
                    "message": "Incident created successfully"
                }, 201)

                return

            connection.close()

            self.send_json({
                "error": "API endpoint not found"
            }, 404)

        except sqlite3.IntegrityError as error:

            self.send_json({
                "error": "Duplicate ID or database constraint error",
                "details": str(error)
            }, 409)

        except KeyError as error:

            self.send_json({
                "error": f"Missing required field: {error.args[0]}"
            }, 400)

        except Exception as error:

            self.send_json({
                "error": str(error)
            }, 500)

    # =====================================================
    # DELETE
    # =====================================================

    def do_DELETE(self):

        path = urlparse(self.path).path

        parts = path.strip("/").split("/")

        if len(parts) != 3:

            self.send_json({
                "error": "Invalid delete URL"
            }, 400)

            return

        resource = parts[1]
        record_id = parts[2]

        table_map = {
            "assets": "assets",
            "employees": "employees",
            "software": "software",
            "incidents": "incidents"
        }

        if resource not in table_map:

            self.send_json({
                "error": "Unknown resource"
            }, 404)

            return

        table = table_map[resource]

        try:

            connection = get_connection()

            cursor = connection.execute(
                f"""
                DELETE FROM {table}
                WHERE id = ?
                """,
                (record_id,)
            )

            connection.commit()

            connection.close()

            if cursor.rowcount == 0:

                self.send_json({
                    "error": "Record not found"
                }, 404)

                return

            self.send_json({
                "message": "Record deleted successfully"
            })

        except Exception as error:

            self.send_json({
                "error": str(error)
            }, 500)

    # =====================================================
    # PUT
    # =====================================================

    def do_PUT(self):

        path = urlparse(self.path).path

        parts = path.strip("/").split("/")

        if len(parts) != 3:

            self.send_json({
                "error": "Invalid update URL"
            }, 400)

            return

        resource = parts[1]
        record_id = parts[2]

        table_map = {
            "assets": "assets",
            "employees": "employees",
            "software": "software",
            "incidents": "incidents"
        }

        if resource not in table_map:

            self.send_json({
                "error": "Unknown resource"
            }, 404)

            return

        try:

            data = self.get_request_data()

            connection = get_connection()

            if resource == "assets":

                connection.execute(
                    """
                    UPDATE assets
                    SET
                        asset_id = ?,
                        device = ?,
                        assigned_to = ?,
                        department = ?,
                        status = ?
                    WHERE id = ?
                    """,
                    (
                        data["asset_id"],
                        data["device"],
                        data["assigned_to"],
                        data["department"],
                        data["status"],
                        record_id
                    )
                )

            elif resource == "employees":

                connection.execute(
                    """
                    UPDATE employees
                    SET
                        employee_id = ?,
                        name = ?,
                        email = ?,
                        department = ?,
                        role = ?,
                        status = ?
                    WHERE id = ?
                    """,
                    (
                        data["employee_id"],
                        data["name"],
                        data["email"],
                        data["department"],
                        data["role"],
                        data["status"],
                        record_id
                    )
                )

            elif resource == "software":

                connection.execute(
                    """
                    UPDATE software
                    SET
                        software_id = ?,
                        name = ?,
                        version = ?,
                        installed_on = ?,
                        license_status = ?,
                        status = ?
                    WHERE id = ?
                    """,
                    (
                        data["software_id"],
                        data["name"],
                        data["version"],
                        data["installed_on"],
                        data["license_status"],
                        data["status"],
                        record_id
                    )
                )

            elif resource == "incidents":

                connection.execute(
                    """
                    UPDATE incidents
                    SET
                        incident_id = ?,
                        title = ?,
                        description = ?,
                        severity = ?,
                        status = ?,
                        assigned_to = ?,
                        created_date = ?
                    WHERE id = ?
                    """,
                    (
                        data["incident_id"],
                        data["title"],
                        data["description"],
                        data["severity"],
                        data["status"],
                        data["assigned_to"],
                        data["created_date"],
                        record_id
                    )
                )

            connection.commit()

            connection.close()

            self.send_json({
                "message": "Record updated successfully"
            })

        except Exception as error:

            self.send_json({
                "error": str(error)
            }, 500)


# =========================================================
# START SERVER
# =========================================================

if __name__ == "__main__":

    server = HTTPServer(
        ("localhost", 8001),
        SecurityServer
    )

    print(
        "SecureCore backend running on "
        "http://localhost:8001"
    )

    server.serve_forever()