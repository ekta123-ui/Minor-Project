require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express(); // Create app first

const allowedOrigins = [
    "http://localhost:5173",
    "https://cola-university-portal-h5rr25kj0-ektas-projects-bc826660.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());

console.log("🚀 Starting server...");

// Routes
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/problems", require("./routes/problemRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));

app.get("/", (req, res) => {
    res.send("COLA Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});