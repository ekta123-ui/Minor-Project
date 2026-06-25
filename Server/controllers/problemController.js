const {
    addProblem,
    getStudentProblems,
    getAllProblems,
    updateProblem,
    deleteProblem,
    getProblemStats,
    getGraphData
} = require("../models/problemModel");


// POST /api/problems/add-problem
const addProblemController = async (req, res) => {
    const { problemText, studentEmail } = req.body;

    if (!problemText || !studentEmail)
        return res.status(400).json({
            error: "problemText and studentEmail are required."
        });

    try {
        const result = await addProblem(studentEmail, problemText);
        res.json({ success: true, id: result.insertId, message: "Problem submitted successfully." });
    } catch (err) {
        console.error("Add Problem Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET /api/problems/student-problems/:email
const getStudentProblemsController = async (req, res) => {
    try {
        // const rows = await getStudentProblems(req.params.email);
        const email = decodeURIComponent(req.params.email);
        const rows = await getStudentProblems(email);
        res.json(rows);
    } catch (err) {
        console.error("Student Problems Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET /api/problems/all-problems
const getAllProblemsController = async (req, res) => {
    try {
        const rows = await getAllProblems();
        res.json(rows);
    } catch (err) {
        console.error("All Problems Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// PATCH /api/problems/update-problem/:id
const updateProblemController = async (req, res) => {
    try {
        const id = req.params.id;

        const fields = {
            ...req.body,
            status: "solved"   // 👈 automatically move to solved
        };

        const result = await updateProblem(id, fields);

        res.json({
            success: true,
            affectedRows: result.affectedRows
        });

    } catch (err) {
        console.error("Update Problem Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// DELETE /api/problems/delete-problem/:id
const deleteProblemController = async (req, res) => {
    try {
        const result = await deleteProblem(req.params.id);
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error("Delete Problem Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET /api/problems/stats
const getProblemStatsController = async (req, res) => {
    try {
        const stats = await getProblemStats();
        res.json(stats);
    } catch (err) {
        console.error("Stats Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// GET /api/problems/graph-data
const getGraphDataController = async (req, res) => {
    try {
        const data = await getGraphData();
        res.json(data);
    } catch (err) {
        console.error("Graph Error:", err);
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    addProblemController,
    getStudentProblemsController,
    getAllProblemsController,
    updateProblemController,
    deleteProblemController,
    getProblemStatsController,
    getGraphDataController
};
