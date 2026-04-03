# Urban Smart Parking Management System

A fullstack web application for managing urban parking operations, including driver reservations, lot administration, slot control, and parking fee tracking.

Live Deployment: https://urban-smart-parking-system.onrender.com

## Team

- Farzan Faisal - B240179CS
- Elias Joby - B240175CS
- Reja Fairooz - B240281CS
- Amil K - B240136CS
- Ronn Boban - B240286CS
- Kona Bhuvaneswar Reddy

## Project Overview

Urban Smart Parking Management System is designed to solve common parking management pain points:

- Drivers can sign up, register vehicles, discover lots, reserve slots, and release slots.
- Administrators can create and manage lots, monitor active and completed sessions, manage users, and override slot states when needed.
- The system keeps parking session records and automatically calculates and tracks due fees.

## Core Features

### Currency

- All parking prices, fees, and dues in the UI are displayed in INR (Indian Rupees, ₹).

### Driver Features

- User signup and login
- Vehicle registration and deletion
- Parking lot and slot discovery
- Reserve now or reserve later
- Release slot and complete session
- View active sessions
- View due fees

### Admin Features

- View all driver accounts and registered vehicles
- Create and remove parking lots
- Configure slot type per parking slot
- Force slot status updates (available, occupied, reserved)
- View all parking session history
- Set or update user dues
- Delete users with cleanup of active usage state

## System Architecture

The system uses a classic 3-layer architecture:

1. Frontend
- Static HTML, CSS, and JavaScript served from the public folder
- Client-side role-based page routing and API integration

2. Backend
- Node.js and Express server
- REST-like API endpoints under /api
- Business logic for reservation, release, and fee handling

3. Database
- MySQL (Clever Cloud)
- Auto-creation of required tables at startup if they do not exist

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express
- Database: MySQL (mysql2)
- Hosting: Render (web service)
- Database Hosting: Clever Cloud MySQL

## Repository Structure

```text
Urban-Smart-Parking-System/
├── public/
│   ├── admin.html
│   ├── driver.html
│   ├── index.html
│   ├── login.html
│   ├── css/
│   └── js/
├── server/
│   ├── database.js
│   ├── server.js
│   └── wipe_db.js
├── Docs/
├── package.json
└── README.md
```

## Local Setup

### Prerequisites

- Node.js 18+ (Node.js 22 also works)
- npm
- MySQL database (local or cloud)

### Installation

1. Clone the repository

```bash
git clone https://github.com/eliasjoby/Urban-Smart-Parking-System.git
cd Urban-Smart-Parking-System
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables in a .env file

```env
DATABASE_URL=mysql://username:password@host:3306/database_name
PORT=3000
```

4. Start the server

```bash
node server/server.js
```

5. Open the app

```text
http://localhost:3000
```

## Deployment (Render + Clever Cloud)

### Render Web Service Configuration

- Runtime: Node
- Build Command: npm install
- Start Command: node server/server.js

### Required Render Environment Variables

- DATABASE_URL = Clever Cloud MySQL connection URI
- PORT = 10000 (Render sets PORT automatically, safe to keep)
- NODE_ENV = production

## Main API Groups

### Authentication

- POST /api/login
- POST /api/signup

### Driver APIs

- POST /api/user/phone
- GET /api/vehicles/:userId
- POST /api/vehicles
- DELETE /api/vehicles/:id
- GET /api/lots
- GET /api/lots/:id/slots
- POST /api/reserve
- POST /api/release
- GET /api/my-sessions/:userId
- GET /api/user/dues/:userId

### Admin APIs

- GET /api/admin/users
- GET /api/admin/sessions
- POST /api/lots
- DELETE /api/lots/:id
- PUT /api/slots/:slotId
- PUT /api/admin/slots/:slotId/status
- DELETE /api/admin/users/:id
- PUT /api/admin/users/:userId/dues

## Evaluation Checklist

Use this for project demonstration or submission review:

1. Open deployed URL and verify homepage loads.
2. Sign up as a driver and log in.
3. Add one or more vehicles.
4. Log in as admin and create at least one parking lot.
5. Reserve a slot from driver panel.
6. Release slot and verify session completion.
7. Verify due fee updates in admin and driver views.
8. Validate admin slot override operations.

## Known Limitations

- Authentication currently uses plain credential checks without token-based sessions.
- Role protection is primarily client-side; production hardening should include backend auth middleware.
- Password hashing is recommended for future versions.

## Future Enhancements

- JWT-based authentication and role middleware
- Password hashing with bcrypt
- Reservation expiry and automatic release jobs
- Analytics dashboard for lot usage and revenue trends
- Payment integration for dues settlement

## License

This project is licensed under the ISC License.

## Acknowledgment

This project was collaboratively developed as a team submission for course evaluation.
