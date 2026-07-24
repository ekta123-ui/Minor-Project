CREATE TABLE IF NOT EXISTS admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(255),
    email VARCHAR(255),
    role_ VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS oauth_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    auth_provider VARCHAR(50),
    roll_number VARCHAR(100),
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS login_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255),
    loginTime DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS chats (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    user_query TEXT,
    bot_response TEXT,
    timestamp_ TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(200),
    school_id INT
);

CREATE TABLE IF NOT EXISTS departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(150),
    school_id INT
);

CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    feedbackText TEXT,
    rating INT,
    studentEmail VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS offices (
    office_id INT AUTO_INCREMENT PRIMARY KEY,
    office_name VARCHAR(200),
    block VARCHAR(50),
    floor VARCHAR(50),
    room_no VARCHAR(50),
    desk_no VARCHAR(50),
    teacher_id INT,
    timings VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS problems (
    problem_id INT AUTO_INCREMENT PRIMARY KEY,
    problem_name VARCHAR(200),
    keywords TEXT,
    office_id INT
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    teacher_id INT,
    office_id INT,
    rating INT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS schools (
    school_id INT AUTO_INCREMENT PRIMARY KEY,
    school_name VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS user_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255),
    status VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(10),
    roll_no VARCHAR(50),
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    password VARCHAR(255),
    auth_provider VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS synonyms (
    synonym_id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(200),
    synonym VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_name VARCHAR(150),
    school_id INT,
    department_id INT,
    course_id INT,
    designation VARCHAR(120),
    email VARCHAR(120),
    phone VARCHAR(20),
    gender VARCHAR(10),
    domain VARCHAR(50),
    block VARCHAR(10),
    coordinatorship VARCHAR(200)
);
