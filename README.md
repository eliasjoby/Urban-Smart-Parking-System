# Urban Smart Parking Management System

This repository is now prepared for deployment on Render with a MySQL database hosted on Clever Cloud.

## Step 1: Create and Host a New Render Website (Team Submission)

Follow these steps exactly.

1. Push this branch to GitHub.
2. Open Render dashboard and click New > Web Service.
3. Connect your GitHub repo.
4. Set the service name to `CS02_Team1`.
5. Use these settings:
	- Runtime: Node
	- Build Command: `npm install`
	- Start Command: `npm start`
6. Add environment variables in Render.

### Required Render Environment Variables

Use either Option A or Option B.

Option A (recommended, single variable):

- `DATABASE_URL` = your Clever Cloud `MYSQL_ADDON_URI`
- `PORT` = `10000` (Render overrides this automatically, but it is safe to keep)

Option B (if you prefer separate variables):

- `MYSQL_ADDON_HOST`
- `MYSQL_ADDON_PORT`
- `MYSQL_ADDON_DB`
- `MYSQL_ADDON_USER`
- `MYSQL_ADDON_PASSWORD`
- `MYSQL_ADDON_URI` (optional if all above are provided)

## Clever Cloud Variable Mapping

From your Clever Cloud MySQL panel:

- `MYSQL_ADDON_DB` -> database name
- `MYSQL_ADDON_HOST` -> host
- `MYSQL_ADDON_PASSWORD` -> password
- `MYSQL_ADDON_PORT` -> port
- `MYSQL_ADDON_URI` -> full URI
- `MYSQL_ADDON_USER` -> username

This project supports both `DATABASE_URL` and `MYSQL_ADDON_*` variables.

## Post-Deploy Verification Checklist

After Render deploy finishes:

1. Open: `https://<your-render-domain>/health`
2. Confirm response is:

```json
{"ok": true}
```

3. Open home page and confirm it loads.
4. Login using seeded admin account:
	- Username: `admin`
	- Password: `admin123`

## Notes

- The backend auto-creates required tables on startup.
- If DB connection fails, verify the Render environment variables and redeploy.
- Local run command remains:

```bash
npm install
npm start
```

## Project Structure

```text
Urban-Smart-Parking-System/
├── public/
├── server/
├── package.json
└── README.md
```
