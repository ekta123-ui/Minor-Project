const express = require("express");
const router = express.Router();
const {
    registerStudent,
    loginStudent,
    microsoftLogin,
    logoutStudent,
    getStudentStats,
} = require("../controllers/studentController");

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/microsoft-login", microsoftLogin);
router.post("/logout", logoutStudent);
router.get("/stats", getStudentStats);

module.exports = router;