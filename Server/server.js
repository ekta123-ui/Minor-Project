require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

console.log("🚀 Starting server...");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/problems", require("./routes/problemRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
    res.send("✅ COLA Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});