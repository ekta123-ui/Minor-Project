const db = require("../config/db");

// Get student by email
const getStudentByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM students WHERE email = ?", [email]);
    return rows;
};

// Create new student
const createStudent = async (firstName, lastName, email, hashedPassword) => {
    const [result] = await db.query(
        "INSERT INTO students (firstName, lastName, email, password, auth_provider) VALUES (?, ?, ?, ?, 'local')",
        [firstName, lastName, email, hashedPassword]
    );
    return result;
};

// Upsert for Microsoft login
const upsertMicrosoftStudent = async (name, email) => {
    const [rows] = await db.query("SELECT * FROM students WHERE email = ?", [email]);

    if (rows.length > 0) {
        await db.query(
            "UPDATE students SET auth_provider = ? WHERE email = ?",
            ["microsoft", email]
        );

        const existing = rows[0];
        const displayName =
            existing.name ||
            `${existing.firstName || ""} ${existing.lastName || ""}`.trim() ||
            name;

        return {
            id: existing.id,
            name: displayName,
            email: existing.email
        };

    } else {
        const displayName = name || email.split("@")[0];

        const [result] = await db.query(
            "INSERT INTO students (name, email, password, auth_provider) VALUES (?, ?, NULL, 'microsoft')",
            [displayName, email]
        );

        return {
            id: result.insertId,
            name: displayName,
            email
        };
    }
};

// Log student activity
const logStudentActivity = async (name, email, status) => {
    await db.query(
        "INSERT INTO student_activity (name, email, status) VALUES (?, ?, ?)",
        [name || email.split("@")[0], email, status]
    );
};

// Add to dashboard
const addToDashboard = async (name, email) => {
    await db.query(
        `INSERT IGNORE INTO admin_dashboard_students 
        (name, email, auth_provider, roll_number, joined_at)
        VALUES (?, ?, 'microsoft', ?, NOW())`,
        [name, email, email.split("@")[0]]
    );
};

// Get active student count
const getActiveStudentCount = async () => {
    const [rows] = await db.query(
        "SELECT COUNT(DISTINCT email) AS totalActiveStudents FROM student_activity"
    );
    return rows[0];
};

module.exports = {
    getStudentByEmail,
    createStudent,
    upsertMicrosoftStudent,
    logStudentActivity,
    addToDashboard,
    getActiveStudentCount
};