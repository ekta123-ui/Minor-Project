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
<<<<<<< HEAD
        "SELECT * FROM feedback ORDER BY id DESC"
=======
        "SELECT id, feedbackText, rating, studentEmail, created_at AS createdAt FROM feedback ORDER BY id DESC"
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)
    );
    return rows;
};

module.exports = {
    addFeedback,
    getAllFeedback
};