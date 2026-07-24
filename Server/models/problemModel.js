const db = require("../config/db");

<<<<<<< HEAD
// Add Problem
const addProblem = async (studentEmail, problemText) => {
    const sql = `
        INSERT INTO problems 
        (problem_name, createdBy, status)
        VALUES (?, ?, 'unsolved')
    `;
    const [result] = await db.query(sql, [problemText, studentEmail]);
=======
// Add Problem to student_problems
const addProblem = async (studentEmail, problemText) => {
    // Assuming the frontend doesn't send a problem_id right now, so we leave it NULL
    const sql = `
        INSERT INTO student_problems 
        (student_email, problem_text, status)
        VALUES (?, ?, 'unsolved')
    `;
    const [result] = await db.query(sql, [studentEmail, problemText]);
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)
    return result;
};

// Get problems for a specific student (aliased columns for frontend)
const getStudentProblems = async (email) => {
    const [rows] = await db.query(
<<<<<<< HEAD
        `SELECT problem_id, 
                problem_name AS problemText, 
                createdBy AS studentEmail, 
                status, 
                adminReply, 
                createdAt 
        FROM problems 
        WHERE createdBy = ? 
        ORDER BY createdAt DESC`,
=======
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
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)
        [email]
    );
    return rows;
};

<<<<<<< HEAD
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
=======
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
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)
    );
    return rows;
};
const updateProblem = async (id, fields) => {
    // fields = { status, adminReply } — only update what is passed
    const parts = [];
    const values = [];
    if (fields.status !== undefined) { parts.push("status = ?"); values.push(fields.status); }
<<<<<<< HEAD
    if (fields.adminReply !== undefined) { parts.push("adminReply = ?"); values.push(fields.adminReply); }
    if (parts.length === 0) return { affectedRows: 0 };
    values.push(id);
    const [result] = await db.query(`UPDATE problems SET ${parts.join(", ")} WHERE problem_id = ?`, values);
=======
    if (fields.adminReply !== undefined) { parts.push("admin_reply = ?"); values.push(fields.adminReply); }
    if (parts.length === 0) return { affectedRows: 0 };
    values.push(id);
    const [result] = await db.query(`UPDATE student_problems SET ${parts.join(", ")} WHERE id = ?`, values);
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)
    return result;
};

const deleteProblem = async (id) => {
<<<<<<< HEAD
    const [result] = await db.query("DELETE FROM problems WHERE problem_id= ?", [id]);
=======
    const [result] = await db.query("DELETE FROM student_problems WHERE id = ?", [id]);
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)
    return result;
};

const getProblemStats = async () => {
    const [rows] = await db.query(`
        SELECT
            COUNT(*) AS total,
            COALESCE(SUM(CASE WHEN status = 'solved' THEN 1 ELSE 0 END), 0) AS solved,
            COALESCE(SUM(CASE WHEN status = 'unsolved' THEN 1 ELSE 0 END), 0) AS unsolved,
            COALESCE(SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END), 0) AS in_progress
<<<<<<< HEAD
        FROM problems
=======
        FROM student_problems
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)
    `);
    return rows[0];
};

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