const db = require("../config/db");

// Get admin by email
const getAdminByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);
    return rows;
};

// Create new admin
const createAdmin = async (name, email, hashedPassword) => {
    const [result] = await db.query(
        "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
    );
    return result;
};

// Log admin login
const logAdminLogin = async (name, email) => {
    await db.query(
        "INSERT INTO admin_logins (name, email) VALUES (?, ?)",
        [name, email]
    );
};

// Get all admin logins
const getAllAdminLogins = async () => {
    const [rows] = await db.query("SELECT * FROM admin_logins ORDER BY loginTime DESC");
    return rows;
};

// Get microsoft students
const getMicrosoftStudents = async () => {
    const [rows] = await db.query(
        "SELECT id, name, email, roll_number, joined_at FROM admin_dashboard_students ORDER BY joined_at DESC"
    );
    return rows;
};

module.exports = { getAdminByEmail, createAdmin, logAdminLogin, getAllAdminLogins, getMicrosoftStudents };