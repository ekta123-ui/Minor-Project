-- ============================================================
-- COLA — Migration Script (run on existing Railway MySQL DB)
-- Adds missing tables and columns without destroying existing data
-- ============================================================

-- 1. Add 'name' column to admins if missing
ALTER TABLE admins ADD COLUMN IF NOT EXISTS name VARCHAR(100) AFTER admin_id;

-- 2. Add 'category' column to feedback if missing
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'general';

-- 3. Rename 'chats' → 'chat_logs' if old name exists (run only if needed)
-- RENAME TABLE chats TO chat_logs;
-- (Uncomment the line above ONLY if your DB has 'chats' but not 'chat_logs')

-- 4. Create chat_logs if it doesn't exist
CREATE TABLE IF NOT EXISTS chat_logs (
    chat_id      INT AUTO_INCREMENT PRIMARY KEY,
    student_id   INT,
    user_query   TEXT,
    bot_response TEXT,
    timestamp_   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create student_problems if it doesn't exist
CREATE TABLE IF NOT EXISTS student_problems (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    problem_id    INT,
    student_email VARCHAR(255),
    problem_text  TEXT,
    status        VARCHAR(50) DEFAULT 'unsolved',
    admin_reply   TEXT,
    created_at    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

-- 6. Create student_activity if it doesn't exist
CREATE TABLE IF NOT EXISTS student_activity (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100),
    email      VARCHAR(255),
    status     VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. Create admin_logins if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_logins (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(100),
    email     VARCHAR(255),
    loginTime DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. Create admin_dashboard_students if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_dashboard_students (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255),
    email         VARCHAR(255) UNIQUE,
    auth_provider VARCHAR(50)  DEFAULT 'microsoft',
    roll_number   VARCHAR(100),
    joined_at     DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- 9. Add role column to students if missing
ALTER TABLE students ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'student';

-- 10. Add roll_number column to students if missing (some queries use roll_number vs roll_no)
ALTER TABLE students ADD COLUMN IF NOT EXISTS roll_number VARCHAR(50);
