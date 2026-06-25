import { useState, useEffect, useCallback } from "react";
import { adminApi } from "../api/adminApi";

export function useAdminData() {
    const [problems, setProblems] = useState([]);
    const [stats, setStats] = useState({ total: 0, solved: 0, unsolved: 0, in_progress: 0 });
    const [graphData, setGraphData] = useState([
        { name: "solved", value: 0 },
        { name: "unsolved", value: 0 },
        { name: "in_progress", value: 0 },
    ]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [studentStats, setStudentStats] = useState({ totalActiveStudents: 0 });
    const [msStudents, setMsStudents] = useState([]);
    const [msTotal, setMsTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ── Individual fetchers ──────────────────────────────────────
    const fetchProblems = useCallback(async () => {
        try {
            const data = await adminApi.fetchProblems();
            setProblems(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error("Problems:", e);
        }
    }, []);

    const fetchStats = useCallback(async () => {
        try {
            const data = await adminApi.fetchStats();
            setStats(data);
        } catch (e) { console.error("Stats:", e); }
    }, []);

    const fetchGraphData = useCallback(async () => {
        try {
            const data = await adminApi.fetchGraphData();
            setGraphData(Array.isArray(data) ? data : []);
        } catch (e) { console.error("Graph:", e); }
    }, []);

    const fetchFeedback = useCallback(async () => {
        try {
            const data = await adminApi.fetchFeedback();
            setFeedbacks(Array.isArray(data) ? data : []);
        } catch (e) { console.error("Feedback:", e); }
    }, []);

    const fetchStudentStats = useCallback(async () => {
        try {
            const data = await adminApi.fetchStudentStats();
            setStudentStats(data);
        } catch (e) { console.error("Student stats:", e); }
    }, []);

    const fetchMsStudents = useCallback(async () => {
        try {
            const data = await adminApi.fetchMsStudents();
            setMsStudents(data.students || []);
            setMsTotal(data.total || 0);
        } catch (e) { console.error("MS Students:", e); }
    }, []);

    // ── Fetch everything at once ─────────────────────────────────
    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await Promise.all([
                fetchProblems(),
                fetchStats(),
                fetchGraphData(),
                fetchFeedback(),
                fetchStudentStats(),
                fetchMsStudents(),
            ]);
        } catch (err) {
            console.error("fetchAll error:", err);
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    }, [fetchProblems, fetchStats, fetchGraphData, fetchFeedback, fetchStudentStats, fetchMsStudents]);

    // ── Actions ──────────────────────────────────────────────────
    const updateProblem = useCallback(async (id, updates) => {
        try {
            await adminApi.updateProblem(id, updates);
            // Refresh problems, stats, and graph after update
            await Promise.all([fetchProblems(), fetchStats(), fetchGraphData()]);
        } catch (e) {
            console.error("Update problem:", e);
            setError("Failed to update problem");
        }
    }, [fetchProblems, fetchStats, fetchGraphData]);

    const deleteProblem = useCallback(async (id) => {
        if (!window.confirm("Delete permanently?")) return;
        try {
            await adminApi.deleteProblem(id);
            // Refresh problems, stats, and graph after delete
            await Promise.all([fetchProblems(), fetchStats(), fetchGraphData()]);
        } catch (e) {
            console.error("Delete problem:", e);
            setError("Failed to delete problem");
        }
    }, [fetchProblems, fetchStats, fetchGraphData]);

    // ── Initial load + polling every 5s ──────────────────────────
    useEffect(() => {
        // Fetch everything on mount
        fetchAll();

        // Poll problems, stats, feedback, and graph every 5 seconds
        const iv = setInterval(() => {
            fetchProblems();
            fetchStats();
            fetchFeedback();
            fetchGraphData();
        }, 5000);

        return () => clearInterval(iv);
    }, [fetchAll, fetchProblems, fetchStats, fetchFeedback, fetchGraphData]);

    return {
        problems, stats, graphData,
        feedbacks, studentStats,
        msStudents, msTotal,
        loading, error,
        fetchAll, fetchFeedback, fetchMsStudents,
        updateProblem, deleteProblem,
    };
}