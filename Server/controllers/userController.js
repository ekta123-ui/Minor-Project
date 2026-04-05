const { createUser, getUserByEmail } = require("../models/userModel");


// 🔹 REGISTER FUNCTION
const registerUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const role = "student";

    createUser(firstName, lastName, email, password, role, (err, result) => {

        if (err) {
            console.log("REGISTER ERROR:", err);

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({ message: "Email already exists" });
            }

            return res.status(500).json({ message: "Database error" });
        }

        res.status(200).json({
            message: "Account created successfully",
            role: role
        });
    });
};


// 🔹 LOGIN FUNCTION
const loginUser = (req, res) => {
    const { email, password } = req.body;

    getUserByEmail(email, (err, results) => {

        if (err) {
            return res.status(500).json({ message: "Server error" });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // ✅ Send role to frontend
        res.status(200).json({
            message: "Login successful",
            role: user.role
        });
    });
};

// ✅ VERY IMPORTANT — ADD THIS AT THE BOTTOM
module.exports = { registerUser, loginUser };


