const db = require("../config/db");

const addProblem = async (studentEmail, problemText) => {
    const [result] = await db.query(
        "INSERT INTO problems (studentEmail, problemText, status) VALUES (?, ?, 'unsolved')",
        [studentEmail, problemText]
    );
    return result;
};

const getStudentProblems = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM problems WHERE studentEmail = ? ORDER BY createdAt DESC",
        [email]
    );
    return rows;
};

const getAllProblems = async () => {
    const [rows] = await db.query("SELECT * FROM problems ORDER BY createdAt DESC");
    return rows;
};

const updateProblem = async (id, fields) => {
    // fields = { status, adminReply } — only update what is passed
    const parts = [];
    const values = [];
    if (fields.status !== undefined)     { parts.push("status = ?");     values.push(fields.status); }
    if (fields.adminReply !== undefined) { parts.push("adminReply = ?"); values.push(fields.adminReply); }
    values.push(id);
    const [result] = await db.query(`UPDATE problems SET ${parts.join(", ")} WHERE id = ?`, values);
    return result;
};

const deleteProblem = async (id) => {
    const [result] = await db.query("DELETE FROM problems WHERE id = ?", [id]);
    return result;
};

const getProblemStats = async () => {
    const [rows] = await db.query(`
        SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN status = 'solved'   THEN 1 ELSE 0 END) AS solved,
            SUM(CASE WHEN status = 'unsolved' THEN 1 ELSE 0 END) AS unsolved
        FROM problems
    `);
    return rows[0];
};

const getGraphData = async () => {
    const [rows] = await db.query(
        "SELECT status AS name, COUNT(*) AS value FROM problems GROUP BY status"
    );
    return rows;
};

module.exports = {
    addProblem,
    getStudentProblems,
    getAllProblems,
    updateProblem,
    deleteProblem,
    getProblemStats,
    getGraphData
};