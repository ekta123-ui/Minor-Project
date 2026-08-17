const db = require("../config/db");

// Add a feedback entry
const addFeedback = async (studentEmail, feedbackText, rating, category) => {
    const [result] = await db.query(
        "INSERT INTO feedback (studentEmail, feedbackText, rating, category) VALUES (?, ?, ?, ?) RETURNING id",
        [studentEmail, feedbackText, rating, category || "general"]
    );
    return result;
};

// Get all feedback with aliased columns for frontend
const getAllFeedback = async () => {
    const [rows] = await db.query(
        "SELECT id, feedbackText, rating, studentEmail, created_at AS createdAt FROM feedback ORDER BY id DESC"
    );
    return rows;
};

module.exports = {
    addFeedback,
    getAllFeedback
};