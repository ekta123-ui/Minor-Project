CREATE TABLE IF NOT EXISTS student_problems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    problem_id INT NULL,
    student_email VARCHAR(255) NOT NULL,
    problem_text TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'unsolved',
    admin_reply TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (problem_id)
        REFERENCES problems(problem_id)
        ON DELETE SET NULL
);
