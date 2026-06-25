const db = require("../config/db");

const addFeedback = async (studentEmail, feedbackText, rating, category) => {
    const [result] = await db.query(
        "INSERT INTO feedback (studentEmail, feedbackText, rating, category) VALUES (?, ?, ?, ?)",
        [studentEmail, feedbackText, rating, category || "general"]
    );
    return result;
};

const getAllFeedback = async () => {
    const [rows] = await db.query(
        "SELECT * FROM feedback ORDER BY id DESC"
    );
    return rows;
};

module.exports = {
    addFeedback,
    getAllFeedback
};