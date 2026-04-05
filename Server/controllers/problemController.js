const problemModel = require("../models/problemModel");


// ================= ADD PROBLEM =================
const createProblem = (req, res) => {
    const { problemText, studentEmail } = req.body;

    if (!problemText || !studentEmail) {
        return res.status(400).json({
            message: "Problem text and email required"
        });
    }

    problemModel.addProblem(problemText, studentEmail, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json({
            message: "Problem added successfully"
        });
    });
};


// ================= STUDENT PROBLEMS =================
const fetchStudentProblems = (req, res) => {
    const email = req.params.email;

    problemModel.getStudentProblems(email, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
};


// ================= ALL PROBLEMS =================
const fetchAllProblems = (req, res) => {

    problemModel.getAllProblems((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
};


// ================= SOLVE PROBLEM =================
const updateProblem = (req, res) => {
    const id = req.params.id;
    const { solution } = req.body;

    problemModel.solveProblem(id, solution, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json({
            message: "Problem solved successfully"
        });
    });
};


// ================= PROBLEM STATS =================
const fetchProblemStats = (req, res) => {

    problemModel.getProblemStats((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};


// ================= GRAPH DATA =================
const fetchGraphData = (req, res) => {

    problemModel.getGraphData((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
};


module.exports = {
    createProblem,
    fetchStudentProblems,
    fetchAllProblems,
    updateProblem,
    fetchProblemStats,
    fetchGraphData
};