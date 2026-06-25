const express = require("express");
const router = express.Router();
const { submitFeedback, fetchAllFeedback } = require("../controllers/feedbackController");

// Primary routes
router.post("/add", submitFeedback);
router.get("/all", fetchAllFeedback);

// Aliases — match what the frontend expects
router.post("/add-feedback", submitFeedback);
router.get("/all-feedback", fetchAllFeedback);

module.exports = router;

