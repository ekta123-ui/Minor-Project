const express = require("express");
const router  = express.Router();
const {
    handleChat,
    getChatHistoryHandler,
    proxyAI,
    classifyQuery,
} = require("../controllers/chatController");

router.post("/",                   handleChat);
router.post("/ai",                 proxyAI);           // main chat endpoint
router.post("/classify",           classifyQuery);     // local model only
router.get ("/history/:studentId", getChatHistoryHandler);

module.exports = router;