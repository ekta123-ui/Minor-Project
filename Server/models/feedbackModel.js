const db = require("../config/db");

const addFeedback = async (studentEmail, feedbackText, rating) => {
    const [result] = await db.query(
        "INSERT INTO feedback (studentEmail, feedbackText, rating) VALUES (?, ?, ?)",
        [studentEmail, feedbackText, rating]
    );
    return result;
};

const getAllFeedback = async () => {
    const [rows] = await db.query("SELECT * FROM feedback ORDER BY createdAt DESC");
    return rows;
};

module.exports = { addFeedback, getAllFeedback };