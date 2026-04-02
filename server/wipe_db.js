require('dotenv').config();
const mysql = require('mysql2/promise');

function resolveDatabaseUri() {
    if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
    if (process.env.MYSQL_ADDON_URI) return process.env.MYSQL_ADDON_URI;

    const host = process.env.MYSQL_ADDON_HOST;
    const user = process.env.MYSQL_ADDON_USER;
    const password = process.env.MYSQL_ADDON_PASSWORD;
    const database = process.env.MYSQL_ADDON_DB;
    const port = process.env.MYSQL_ADDON_PORT || '3306';

    if (host && user && password && database) {
        return `mysql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${encodeURIComponent(database)}`;
    }

    return 'mysql://user:pass@localhost:3306/parking';
}

const pool = mysql.createPool({
    uri: resolveDatabaseUri(),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function wipeDatabase() {
    console.log("Connecting to MySQL to wipe database...");
    const conn = await pool.getConnection();
    try {
        await conn.query("SET FOREIGN_KEY_CHECKS = 0;");
        
        console.log("Truncating parking_sessions...");
        await conn.query("TRUNCATE TABLE parking_sessions;");
        
        console.log("Truncating parking_slots...");
        await conn.query("TRUNCATE TABLE parking_slots;");
        
        console.log("Truncating parking_lots...");
        await conn.query("TRUNCATE TABLE parking_lots;");
        
        console.log("Truncating vehicles...");
        await conn.query("TRUNCATE TABLE vehicles;");
        
        console.log("Truncating users...");
        await conn.query("TRUNCATE TABLE users;");
        
        await conn.query("SET FOREIGN_KEY_CHECKS = 1;");

        console.log("Database wiped. Re-seeding default Admin account...");
        await conn.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ["admin", "admin123", "admin"]);
        
        console.log("\nSuccess! Database is completely clean and Admin account restored.\n");
    } catch (e) {
        console.error("Wipe failed:", e);
    } finally {
        conn.release();
        process.exit(0);
    }
}

wipeDatabase();
