<<<<<<< HEAD
const mysql2 = require("mysql2");

const pool = mysql2.createPool({
    host:     process.env.DB_HOST     || "127.0.0.1",
    port:     parseInt(process.env.DB_PORT) || 3307,
    user:     process.env.DB_USER     || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME     || "cola",
    waitForConnections: true,
    connectionLimit:    10,
});

module.exports = pool.promise();
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to Railway MySQL");
        connection.release();
    }
});
=======
require("dotenv").config();
const mysql2 = require("mysql2");

if (!process.env.MYSQL_PUBLIC_URL) {
    console.error("❌ MYSQL_PUBLIC_URL is missing from .env");
    process.exit(1);
}

const pool = mysql2.createPool(process.env.MYSQL_PUBLIC_URL);

const promisePool = pool.promise();

// Safe database connection test
async function testDatabaseConnection() {
    try {
        const connection = await promisePool.getConnection();
        console.log("✅ Railway MySQL connected successfully");
        connection.release();
    } catch (error) {
        console.error(
            "❌ Railway MySQL connection failed:",
            error.code || error.message
        );
    }
}

testDatabaseConnection();

module.exports = promisePool;
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)
