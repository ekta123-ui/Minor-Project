require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    keepAlive: true
});

pool.on("error", (error) => {
    console.error("Unexpected database idle client error:", error.code || error.message);
});

// Safe connection test
async function testDatabaseConnection() {
    try {
        const client = await pool.connect();
        console.log("✅ Connected to Supabase PostgreSQL");
        client.release();
    } catch (error) {
        console.error("❌ Database connection failed:", error.code || error.message);
        console.error("   → Common causes:");
        console.error("   → 1. Wrong DATABASE_URL in .env");
        console.error("   → 2. Supabase project is paused");
    }
}

testDatabaseConnection();

// Create a wrapper to mimic mysql2's `.promise().query()` return format
// and translate `?` parameters to `$1, $2` etc.
const promisePool = {
    query: async (sql, params = []) => {
        let count = 1;
        // Replace `?` with `$1, $2, ...`
        const pgSql = sql.replace(/\?/g, () => `$${count++}`);
        
        const result = await pool.query(pgSql, params);
        
        // Match the `[rows]` or `[result]` array format expected by the models
        if (['INSERT', 'UPDATE', 'DELETE'].includes(result.command)) {
            // For insert/update/delete, we return a mock result object
            return [{ 
                insertId: result.rows.length > 0 ? result.rows[0].id : null,
                affectedRows: result.rowCount
            }];
        }
        
        return [result.rows];
    }
};

module.exports = promisePool;
