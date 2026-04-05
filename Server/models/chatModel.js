const db = require("../config/db");

const saveChatLog = async (studentId, userQuery, botResponse) => {
    const [result] = await db.query(
        "INSERT INTO chat_logs (student_id, user_query, bot_response) VALUES (?, ?, ?)",
        [studentId || null, userQuery, botResponse]
    );
    return result;
};

const getChatHistory = async (studentId) => {
    const [rows] = await db.query(
        "SELECT * FROM chat_logs WHERE student_id = ? ORDER BY timestamp_ DESC",
        [studentId]
    );
    return rows;
};

const loadTeachersFromDB = async () => {
    const [rows] = await db.query(`
        SELECT t.teacher_name, t.designation, t.coordinatorship,
    o.office_name, o.block, o.floor, o.room_number
        FROM teachers t
        LEFT JOIN offices o ON o.teacher_id = t.teacher_id
    `);
    return rows;
};

const loadCampusFromDB = async () => {
    const [rows] = await db.query(
        "SELECT office_name AS place, block, floor, room_number FROM offices"
    );
    return rows;
};

module.exports = { saveChatLog, getChatHistory, loadTeachersFromDB, loadCampusFromDB };