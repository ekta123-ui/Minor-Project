const express = require("express");
const router  = express.Router();
const { colaSystem } = require("../services/chatbotService");
const { saveChatLog, getChatHistory } = require("../models/chatModel");

// POST /api/chat  ← student dashboard calls this
router.post("/", async (req, res) => {
    const { query, studentId } = req.body;
    if (!query) return res.status(400).json({ error: "query is required." });

    try {
        const botResponse = await colaSystem(query);
        await saveChatLog(studentId || null, query, botResponse);
        res.json({ response: botResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong." });
    }
});

// GET /api/chat/history/:studentId
router.get("/history/:studentId", async (req, res) => {
    try {
        const rows = await getChatHistory(req.params.studentId);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;