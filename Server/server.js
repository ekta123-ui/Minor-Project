require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://cola-university-portal.vercel.app",
    "https://cola-university-portal-h5rr25kj0-ektas-projects-bc826660.vercel.app",
    "https://minor-project-git-main-ektas-projects-bc826660.vercel.app"
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
}));

<<<<<<< HEAD
=======
app.use(cors({
    origin: ["http://localhost:5173", "https://minor-project-gilt-kappa.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)
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
<<<<<<< HEAD
    console.log(`🚀 Server running on port ${PORT}`);
=======
    console.log(`Server running at http://localhost:${PORT}`);
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)
});