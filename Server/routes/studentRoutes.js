const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcryptjs");
const {
    getStudentByEmail,
    createStudent,
    upsertMicrosoftStudent,
    logStudentActivity,
    addToDashboard,
    getActiveStudentCount
} = require("../models/studentModel");

const ALLOWED_DOMAIN = "krmu.edu.in";

// ── Register student ─────────────────────────────────────────────
router.post("/register", async (req, res) => {
    console.log("REGISTER BODY:", req.body);

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
        return res.status(400).json({ error: "firstName, lastName, email and password are required." });

    try {
        // Check duplicate email
        const existing = await getStudentByEmail(email.trim().toLowerCase());
        if (existing.length > 0)
            return res.status(409).json({ error: "An account with this email already exists." });

        // Hash password BEFORE storing
        const hashed = await bcrypt.hash(password, 10);

        const result = await createStudent(
            firstName.trim(),
            lastName.trim(),
            email.trim().toLowerCase(),
            hashed
        );

        const displayName = `${firstName.trim()} ${lastName.trim()}`;

        // Log activity
        await logStudentActivity(displayName, email.trim().toLowerCase(), "register");

        res.json({
            message: "Student registered successfully.",
            student: {
                id: result.insertId,
                name: displayName,
                email: email.trim().toLowerCase()
            }
        });

    } catch (err) {
        console.error("Register error:", err);
        if (err.code === "ER_DUP_ENTRY")
            return res.status(409).json({ error: "An account with this email already exists." });
        res.status(500).json({ error: err.message });
    }
});

// ── Login student ────────────────────────────────────────────────
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: "email and password are required." });

    try {
        const rows = await getStudentByEmail(email.trim().toLowerCase());

        if (!rows.length)
            return res.status(401).json({ error: "Invalid email or password." });

        const student = rows[0];

        // FIX: Handle NULL password
        if (!student.password) {
            return res.status(401).json({
                error: "Please register first. No password found."
            });
        }

        const match = await bcrypt.compare(password, student.password);

        if (!match)
            return res.status(401).json({ error: "Invalid email or password." });

        const displayName = student.name
            || `${student.firstName || ""} ${student.lastName || ""}`.trim()
            || email.split("@")[0];

        await logStudentActivity(displayName, student.email, "login");

        res.json({
            message: "Login successful.",
            student: {
                id: student.id,
                name: displayName,
                email: student.email
            }
        });

    } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    console.error("🔥 STACK:", err.stack);

    res.status(500).json({
        error: "Server error",
        message: err.message,
        stack: err.stack
    });
}
});

// ── Microsoft login ──────────────────────────────────────────────
router.post("/microsoft-login", async (req, res) => {
    const { name, email } = req.body;

    if (!email)
        return res.status(400).json({ error: "email is required." });

    if (!email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`))
        return res.status(403).json({ error: `Only @${ALLOWED_DOMAIN} accounts are allowed.` });

    try {
        const student = await upsertMicrosoftStudent(name, email.toLowerCase());
        await logStudentActivity(student.name, student.email, "login");
        await addToDashboard(student.name, student.email);

        res.json({
            message: "Microsoft login successful.",
            student: {
                id:    student.id,
                name:  student.name,
                email: student.email
            }
        });

    } catch (err) {
        console.error("Microsoft login error:", err);
        res.status(500).json({ error: err.message });
    }
});

// ── Logout student ───────────────────────────────────────────────
router.post("/logout", async (req, res) => {
    const { name, email } = req.body;
    try {
        await logStudentActivity(name, email, "logout");
        res.json({ message: "Logout recorded." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── Active student count (for admin dashboard) ───────────────────
router.get("/stats", async (req, res) => {
    try {
        const data = await getActiveStudentCount();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;