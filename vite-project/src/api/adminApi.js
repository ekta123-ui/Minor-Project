const BASE = "https://minor-project-i5hl.onrender.com/api";

const handleResponse = async (res) => {
    if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
};

const get = (path) => fetch(`${BASE}${path}`).then(handleResponse);

const post = (path, body) =>
    fetch(`${BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    }).then(handleResponse);

const patch = (path, body) =>
    fetch(`${BASE}${path}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    }).then(handleResponse);

const del = (path) =>
    fetch(`${BASE}${path}`, { method: "DELETE" }).then(handleResponse);

export const adminApi = {
    // Problems
    fetchProblems: () => get("/problems/all-problems"),
    fetchStats: () => get("/problems/stats"),
    fetchGraphData: () => get("/problems/graph-data"),
    updateProblem: (id, body) => patch(`/problems/update-problem/${id}`, body),
    deleteProblem: (id) => del(`/problems/delete-problem/${id}`),

    // Feedback
    fetchFeedback: () => get("/feedback/all-feedback"),
    submitFeedback: (body) => post("/feedback/add-feedback", body),

    // Students
    fetchStudentStats: () => get("/students/stats"),
    fetchMsStudents: () => get("/admin/microsoft-students"),

    // Student-specific problems
    fetchStudentProblems: (email) => get(`/problems/student-problems/${encodeURIComponent(email)}`),

    // Submit problem
    submitProblem: (body) => post("/problems/add-problem", body),
};