const db = require("../config/db");
const { getStudentByEmail } = require("./studentModel");

// Save a chat log — accepts either a student email or null
const saveChatLog = async (email, query, response, isUnknown = false) => {
    try {
        let studentId = null;
        if (email) {
            const student = await getStudentByEmail(email);
            if (student && student.length > 0) {
                studentId = student[0].id;
            }
        }
        const [result] = await db.query(
            "INSERT INTO chat_logs (student_id, user_query, bot_response) VALUES (?, ?, ?) RETURNING chat_id",
            [studentId, query, response]
        );
        return result;
    } catch (err) {
        console.error("Chat log save failed:", { code: err.code, message: err.message });
        return null;
    }
};

// Get chat history for a student by email
const getChatHistory = async (email) => {
    let studentId = null;
    if (email) {
        const student = await getStudentByEmail(email);
        if (student && student.length > 0) {
            studentId = student[0].id;
        }
    }
    const [rows] = await db.query(
        "SELECT chat_id AS chatId, student_id AS studentId, user_query AS query, bot_response AS response, timestamp_ AS timestamp FROM chat_logs WHERE student_id = ? ORDER BY timestamp_ DESC",
        [studentId]
    );
    return rows;
};

module.exports = {
    saveChatLog,
    getChatHistory,
};