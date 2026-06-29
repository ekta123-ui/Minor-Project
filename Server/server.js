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

app.use(express.json());