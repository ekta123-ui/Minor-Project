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