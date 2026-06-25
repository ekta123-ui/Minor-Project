const db = require("../config/db");

// Add Problem
const addProblem = async (studentEmail, problemText) => {
    const sql = `
        INSERT INTO problems 
        (problem_name, createdBy, status)
        VALUES (?, ?, 'unsolved')
    `;
    const [result] = await db.query(sql, [problemText, studentEmail]);
    return result;
};

// Get problems for a specific student (aliased columns for frontend)
const getStudentProblems = async (email) => {
    const [rows] = await db.query(
        `SELECT problem_id, 
                problem_name AS problemText, 
                createdBy AS studentEmail, 
                status, 
                adminReply, 
                createdAt 
        FROM problems 
        WHERE createdBy = ? 
        ORDER BY createdAt DESC`,
        [email]
    );
    return rows;
};

// Get all problems (aliased columns for frontend)
const getAllProblems = async () => {
    const [rows] = await db.query(
        `SELECT problem_id, 
                problem_name AS problemText, 
                createdBy AS studentEmail, 
                status, 
                adminReply, 
                createdAt 
        FROM problems 
        ORDER BY createdAt DESC`
    );
    return rows;
};
const updateProblem = async (id, fields) => {
    // fields = { status, adminReply } — only update what is passed
    const parts = [];
    const values = [];
    if (fields.status !== undefined) { parts.push("status = ?"); values.push(fields.status); }
    if (fields.adminReply !== undefined) { parts.push("adminReply = ?"); values.push(fields.adminReply); }
    if (parts.length === 0) return { affectedRows: 0 };
    values.push(id);
    const [result] = await db.query(`UPDATE problems SET ${parts.join(", ")} WHERE problem_id = ?`, values);
    return result;
};

const deleteProblem = async (id) => {
    const [result] = await db.query("DELETE FROM problems WHERE problem_id= ?", [id]);
    return result;
};

const getProblemStats = async () => {
    const [rows] = await db.query(`
        SELECT
            COUNT(*) AS total,
            COALESCE(SUM(CASE WHEN status = 'solved' THEN 1 ELSE 0 END), 0) AS solved,
            COALESCE(SUM(CASE WHEN status = 'unsolved' THEN 1 ELSE 0 END), 0) AS unsolved,
            COALESCE(SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END), 0) AS in_progress
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