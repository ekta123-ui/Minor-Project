const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require("../models/userModel");

// POST /api/users/register
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
        return res.status(400).json({ message: "firstName, lastName, email and password are required." });

    try {
        const existing = await getUserByEmail(email.trim().toLowerCase());
        if (existing.length > 0)
            return res.status(409).json({ message: "Email already exists." });

        const hashed = await bcrypt.hash(password, 10);
        const result = await createUser(firstName, lastName, email.trim().toLowerCase(), hashed, "student");

        res.status(200).json({
            message: "Account created successfully",
            role: "student",
            id: result.insertId
        });
    } catch (err) {
        console.error("REGISTER ERROR:", err);
        if (err.code === "ER_DUP_ENTRY")
            return res.status(409).json({ message: "Email already exists." });
        res.status(500).json({ message: "Database error", error: err.message });
    }
};

// POST /api/users/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "email and password are required." });

    try {
        const results = await getUserByEmail(email.trim().toLowerCase());

        if (results.length === 0)
            return res.status(400).json({ message: "User not found." });

        const user = results[0];

        if (!user.password)
            return res.status(401).json({ message: "No password set. Please register properly." });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: "Wrong password." });

        res.status(200).json({
            message: "Login successful",
            role: user.role || "student",
            id: user.id,
            email: user.email
        });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { registerUser, loginUser };
