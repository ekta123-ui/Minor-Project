// models/userModel.js
// NOTE: db is a promise pool (mysql2 .promise()).
// All functions are async — no callbacks.

const db = require("../config/db");

const createUser = async (firstName, lastName, email, password, role) => {
    const sql = `
        INSERT INTO students (firstName, lastName, email, password, role)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [firstName, lastName, email, password, role]);
    return result;
};

const getUserByEmail = async (email) => {
    const sql = "SELECT * FROM students WHERE email = ?";
    const [rows] = await db.query(sql, [email]);
    return rows;
};

module.exports = { createUser, getUserByEmail };


