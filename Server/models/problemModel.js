const db = require("../config/db");

// Add a problem submitted by a student
const addProblem = async (studentEmail, problemText) => {
    const sql = `
        INSERT INTO student_problems 
        (student_email, problem_text, status)
        VALUES (?, ?, 'unsolved') RETURNING id
    `;
    const [result] = await db.query(sql, [studentEmail, problemText]);
    return result;
};

// Get problems for a specific student (aliased columns for frontend)
const getStudentProblems = async (email) => {
    const [rows] = await db.query(
        `SELECT id, 
                problem_id,
                problem_text AS problemText, 
                student_email AS studentEmail, 
                status, 
                admin_reply AS adminReply, 
                created_at AS createdAt 
        FROM student_problems 
        WHERE student_email = ? 
        ORDER BY created_at DESC`,
        [email]
    );
    return rows;
};

// Get all student problems (for admin view)
const getAllProblems = async () => {
    const [rows] = await db.query(
        `SELECT sp.id, 
                sp.problem_id,
                p.problem_name,
                sp.problem_text AS problemText, 
                sp.student_email AS studentEmail, 
                sp.status, 
                sp.admin_reply AS adminReply, 
                sp.created_at AS createdAt 
        FROM student_problems sp
        LEFT JOIN problems p ON sp.problem_id = p.problem_id
        ORDER BY sp.created_at DESC`
    );
    return rows;
};

// Update a problem's status and/or admin reply
const updateProblem = async (id, fields) => {
    const parts = [];
    const values = [];
    if (fields.status !== undefined)     { parts.push("status = ?");      values.push(fields.status); }
    if (fields.adminReply !== undefined) { parts.push("admin_reply = ?"); values.push(fields.adminReply); }
    if (parts.length === 0) return { affectedRows: 0 };
    values.push(id);
    const [result] = await db.query(
        `UPDATE student_problems SET ${parts.join(", ")} WHERE id = ?`,
        values
    );
    return result;
};

// Delete a problem
const deleteProblem = async (id) => {
    const [result] = await db.query("DELETE FROM student_problems WHERE id = ?", [id]);
    return result;
};

// Get aggregate problem stats
const getProblemStats = async () => {
    const [rows] = await db.query(`
        SELECT
            COUNT(*) AS total,
            COALESCE(SUM(CASE WHEN status = 'solved'      THEN 1 ELSE 0 END), 0) AS solved,
            COALESCE(SUM(CASE WHEN status = 'unsolved'    THEN 1 ELSE 0 END), 0) AS unsolved,
            COALESCE(SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END), 0) AS in_progress
        FROM student_problems
    `);
    return rows[0];
};

// Get graph data (status distribution)
const getGraphData = async () => {
    const [rows] = await db.query(
        "SELECT status AS name, COUNT(*) AS value FROM student_problems GROUP BY status"
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