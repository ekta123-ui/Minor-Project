const express = require("express");
const router  = express.Router();
const db      = require("../config/db");

// Student submits a problem
router.post("/add-problem", async (req, res) => {
    const { problemText, studentEmail } = req.body;
    await db.query(
        "INSERT INTO problems (problemText, studentEmail, status) VALUES (?, ?, 'unsolved')",
        [problemText, studentEmail]
    );
    res.json({ success: true });
});

// Student fetches their own problems
router.get("/student-problems/:email", async (req, res) => {
    const [rows] = await db.query(
        "SELECT * FROM problems WHERE studentEmail = ? ORDER BY createdAt DESC",
        [req.params.email]
    );
    res.json(rows);
});

// Admin fetches all problems
router.get("/all-problems", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM problems ORDER BY createdAt DESC");
    res.json(rows);
});

// Admin updates a problem (reply / mark solved)
router.patch("/update-problem/:id", async (req, res) => {
    const { adminReply, status } = req.body;
    await db.query(
        "UPDATE problems SET adminReply = ?, status = ? WHERE problem_id = ?",
        [adminReply, status, req.params.id]
    );
    res.json({ success: true });
});

// Admin deletes a problem
router.delete("/delete-problem/:id", async (req, res) => {
    await db.query("DELETE FROM problems WHERE problem_id = ?", [req.params.id]);
    res.json({ success: true });
});

module.exports = router;