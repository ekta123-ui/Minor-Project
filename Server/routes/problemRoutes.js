const express = require("express");
const router = express.Router();

const {
    addProblemController,
    getStudentProblemsController,
    getAllProblemsController,
    updateProblemController,
    deleteProblemController,
    getProblemStatsController,
    getGraphDataController
} = require("../controllers/problemController");


router.post("/add-problem", addProblemController);

router.get("/student-problems/:email", getStudentProblemsController);

router.get("/all-problems", getAllProblemsController);

router.patch("/update-problem/:id", updateProblemController);

router.delete("/delete-problem/:id", deleteProblemController);

router.get("/stats", getProblemStatsController);

router.get("/graph-data", getGraphDataController);


module.exports = router;