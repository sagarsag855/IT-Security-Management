# SecureCore - IT Security & Asset Management System

SecureCore is a full-stack IT Security and Asset Management application designed to manage organizational IT assets, employees, software, and security incidents from a centralized dashboard.

## Features

- Security dashboard
- IT asset management
- Employee management
- Software inventory
- Security incident management
- Security monitoring center
- Reports and analytics
- Application settings
- SQLite database
- REST API backend
- Responsive React interface

## Technology Stack

### Frontend
- React
- JavaScript
- Bootstrap
- HTML/CSS

### Backend
- Python
- HTTP Server
- REST APIs
- SQLite

### Development Tools
- Visual Studio Code
- Git
- GitHub

## Architecture

React Frontend
↓
REST API
↓
Python Backend
↓
SQLite Database

## API Endpoints

```text
GET    /api/status

GET    /api/assets
POST   /api/assets
PUT    /api/assets/:id
DELETE /api/assets/:id

GET    /api/employees
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id

GET    /api/software
POST   /api/software
PUT    /api/software/:id
DELETE /api/software/:id

GET    /api/incidents
POST   /api/incidents
PUT    /api/incidents/:id
DELETE /api/incidents/:id