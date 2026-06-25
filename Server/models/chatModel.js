const db = require("../config/db");

const saveChatLog = (studentId, query, response, isUnknown = false) =>
    db.query("INSERT INTO chat_logs (studentId, query, response, is_unknown) VALUES (?, ?, ?, ?)", [
        studentId,
        query,
        response,
        isUnknown,
    ]);

const getChatHistory = async (studentId) => {
    const [rows] = await db.query(
        "SELECT * FROM chat_logs WHERE studentId = ? ORDER BY timestamp DESC",
        [studentId]
    );
    return rows;
};

module.exports = {
    saveChatLog,
    getChatHistory,
};