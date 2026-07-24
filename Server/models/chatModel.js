const db = require("../config/db");
const { getStudentByEmail } = require("./studentModel");

<<<<<<< HEAD
const saveChatLog = (studentId, query, response, isUnknown = false) =>
    db.query("INSERT INTO chat_logs (studentId, query, response, is_unknown) VALUES (?, ?, ?, ?)", [
        studentId,
        query,
        response,
        isUnknown,
    ]);
=======
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
            "INSERT INTO chat_logs (student_id, user_query, bot_response) VALUES (?, ?, ?)",
            [studentId, query, response]
        );
        return result;
    } catch (err) {
        console.error("Chat log save failed:", { code: err.code, message: err.message });
        return null;
    }
};
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)

const getChatHistory = async (email) => {
    let studentId = null;
    if (email) {
        const student = await getStudentByEmail(email);
        if (student && student.length > 0) {
            studentId = student[0].id;
        }
    }
    const [rows] = await db.query(
<<<<<<< HEAD
        "SELECT * FROM chat_logs WHERE studentId = ? ORDER BY timestamp DESC",
=======
        "SELECT chat_id AS chatId, student_id AS studentId, user_query AS query, bot_response AS response, timestamp_ AS timestamp FROM chat_logs WHERE student_id = ? ORDER BY timestamp_ DESC",
>>>>>>> 4d85c75 (Fix COLA backend APIs and update dashboards)
        [studentId]
    );
    return rows;
};

module.exports = {
    saveChatLog,
    getChatHistory,
};