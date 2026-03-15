require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    uri: process.env.DATABASE_URL || 'mysql://user:pass@localhost:3306/parking',
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
