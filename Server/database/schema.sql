-- ============================================================
-- COLA University Portal — Full Database Schema (PostgreSQL)
-- ============================================================

-- Admins
CREATE TABLE IF NOT EXISTS admins (
    admin_id   SERIAL PRIMARY KEY,
    name       VARCHAR(100),
    username   VARCHAR(100),
    password   VARCHAR(255),
    email      VARCHAR(255) UNIQUE,
    role_      VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin login history
CREATE TABLE IF NOT EXISTS admin_logins (
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(100),
    email     VARCHAR(255),
    loginTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Microsoft-authenticated students dashboard
CREATE TABLE IF NOT EXISTS admin_dashboard_students (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(255),
    email         VARCHAR(255) UNIQUE,
    auth_provider VARCHAR(50)  DEFAULT 'microsoft',
    roll_number   VARCHAR(100),
    joined_at     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- OAuth users
CREATE TABLE IF NOT EXISTS oauth_users (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(255),
    email         VARCHAR(255),
    auth_provider VARCHAR(50),
    roll_number   VARCHAR(100),
    joined_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Login logs (legacy)
CREATE TABLE IF NOT EXISTS login_logs (
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(100),
    email     VARCHAR(255),
    loginTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users
CREATE TABLE IF NOT EXISTS users (
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(100),
    email    VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

-- Students
CREATE TABLE IF NOT EXISTS students (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(100),
    firstName     VARCHAR(50),
    lastName      VARCHAR(50),
    email         VARCHAR(100) UNIQUE,
    phone         VARCHAR(10),
    roll_no       VARCHAR(50),
    roll_number   VARCHAR(50),
    department_id INT,
    password      VARCHAR(255),
    auth_provider VARCHAR(50),
    role          VARCHAR(50)  DEFAULT 'student',
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- Student activity log
CREATE TABLE IF NOT EXISTS student_activity (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100),
    email      VARCHAR(255),
    status     VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat logs
CREATE TABLE IF NOT EXISTS chat_logs (
    chat_id      SERIAL PRIMARY KEY,
    student_id   INT,
    user_query   TEXT,
    bot_response TEXT,
    timestamp_   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Keep 'chats' as an alias view for backwards compatibility
CREATE OR REPLACE VIEW chats AS
    SELECT chat_id, student_id, user_query, bot_response, timestamp_
    FROM chat_logs;

-- Courses
CREATE TABLE IF NOT EXISTS courses (
    course_id   SERIAL PRIMARY KEY,
    course_name VARCHAR(200),
    school_id   INT
);

-- Departments
CREATE TABLE IF NOT EXISTS departments (
    department_id   SERIAL PRIMARY KEY,
    department_name VARCHAR(150),
    school_id       INT
);

-- Feedback
CREATE TABLE IF NOT EXISTS feedback (
    id           SERIAL PRIMARY KEY,
    feedbackText TEXT,
    rating       INT,
    studentEmail VARCHAR(255),
    category     VARCHAR(100) DEFAULT 'general',
    created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- Offices
CREATE TABLE IF NOT EXISTS offices (
    office_id   SERIAL PRIMARY KEY,
    office_name VARCHAR(200),
    block       VARCHAR(50),
    floor       VARCHAR(50),
    room_no     VARCHAR(50),
    desk_no     VARCHAR(50),
    teacher_id  INT,
    timings     VARCHAR(100)
);

-- Problems
CREATE TABLE IF NOT EXISTS problems (
    problem_id   SERIAL PRIMARY KEY,
    problem_name VARCHAR(200),
    keywords     TEXT,
    office_id    INT
);

-- Student problems
CREATE TABLE IF NOT EXISTS student_problems (
    id            SERIAL PRIMARY KEY,
    problem_id    INT,
    student_email VARCHAR(255),
    problem_text  TEXT,
    status        VARCHAR(50) DEFAULT 'unsolved',
    admin_reply   TEXT,
    created_at    TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
    review_id  SERIAL PRIMARY KEY,
    student_id INT,
    teacher_id INT,
    office_id  INT,
    rating     INT,
    message    TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schools
CREATE TABLE IF NOT EXISTS schools (
    school_id   SERIAL PRIMARY KEY,
    school_name VARCHAR(200)
);

-- Synonyms
CREATE TABLE IF NOT EXISTS synonyms (
    synonym_id SERIAL PRIMARY KEY,
    word       VARCHAR(200),
    synonym    VARCHAR(200)
);

-- Teachers
CREATE TABLE IF NOT EXISTS teachers (
    teacher_id       SERIAL PRIMARY KEY,
    teacher_name     VARCHAR(150),
    school_id        INT,
    department_id    INT,
    course_id        INT,
    designation      VARCHAR(120),
    email            VARCHAR(120),
    phone            VARCHAR(20),
    gender           VARCHAR(10),
    domain           VARCHAR(50),
    block            VARCHAR(10),
    coordinatorship  VARCHAR(200)
);

-- User status
CREATE TABLE IF NOT EXISTS user_status (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100),
    email      VARCHAR(255),
    status     VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
