const express = require("express");
const router = express.Router();
const {
    registerAdmin,
    loginAdmin,
    getLoginHistory,
    getMicrosoftStudentList,
} = require("../controllers/adminController");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/logins", getLoginHistory);
router.get("/microsoft-students", getMicrosoftStudentList);

module.exports = router;