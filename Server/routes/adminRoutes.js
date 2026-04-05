const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcryptjs");
const { getAdminByEmail, createAdmin, logAdminLogin, getAllAdminLogins, getMicrosoftStudents } = require("../models/adminModel");

// Register admin
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: "name, email and password are required." });
    try {
        const hashed = await bcrypt.hash(password, 10);
        const result = await createAdmin(name, email, hashed);
        res.json({ id: result.insertId, message: "Admin registered successfully." });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY")
            return res.status(409).json({ error: "Admin email already exists." });
        res.status(500).json({ error: err.message });
    }
});

// Login admin
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const rows = await getAdminByEmail(email);
        if (!rows.length)
            return res.status(401).json({ error: "Invalid email or password." });

        const match = await bcrypt.compare(password, rows[0].password);
        if (!match)
            return res.status(401).json({ error: "Invalid email or password." });

        await logAdminLogin(rows[0].name, rows[0].email);
        res.json({ message: "Login successful", admin: { id: rows[0].id, name: rows[0].name, email: rows[0].email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all admin login history
router.get("/logins", async (req, res) => {
    try {
        const rows = await getAllAdminLogins();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get microsoft students (for admin dashboard)
router.get("/microsoft-students", async (req, res) => {
    try {
        const rows = await getMicrosoftStudents();
        res.json({ total: rows.length, students: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;