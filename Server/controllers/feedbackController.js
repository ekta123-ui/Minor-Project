const { addFeedback, getAllFeedback } = require("../models/feedbackModel");

// POST /api/feedback/add
const submitFeedback = async (req, res) => {
    const { studentEmail, feedbackText, rating } = req.body;

    if (!studentEmail || !feedbackText || !rating)
        return res.status(400).json({ error: "studentEmail, feedbackText and rating are required." });

    if (rating < 1 || rating > 5)
        return res.status(400).json({ error: "rating must be between 1 and 5." });

    try {
        const result = await addFeedback(studentEmail, feedbackText, Number(rating));
        res.json({ id: result.insertId, message: "Feedback submitted." });
    } catch (err) {
        console.error("Submit Feedback Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET /api/feedback/all
const fetchAllFeedback = async (req, res) => {
    try {
        const rows = await getAllFeedback();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    submitFeedback,
    fetchAllFeedback,
};