import { useState, useMemo, useEffect } from "react";
import { gStyles, C, CHART_COLORS } from "../styles/adminStyles";
import {
    LayoutDashboard, MessageSquareWarning, ClipboardList,
    BarChart3, LogOut, Menu, CheckCircle, XCircle, Trash2,
    MessageSquare, Send, ChevronDown, ChevronUp, Star,
    Users, Bell, Search, RefreshCw, X,
    Mail, GraduationCap, Bot, User,
} from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { useAdminData } from "../hooks/useAdminData";
import TeacherRecordsPage from "./TeacherDrawer";   // unchanged from your original
// import { C, CHART_COLORS } from "../styles/adminStyles";
export default function AdminDashboard() {
    const {
        problems, stats, graphData,
        feedbacks, studentStats,
        msStudents, msTotal,
        loading, error,
        fetchAll, fetchFeedback, fetchMsStudents,
        updateProblem, deleteProblem,
    } = useAdminData();

    // 🔒 Security Check: Redirect to login if not authenticated as an admin
    useEffect(() => {
        const logged = localStorage.getItem("isLoggedIn");
        const role = localStorage.getItem("role");
        if (logged !== "true" || role !== "admin") {
            window.location.href = "/admin-login";
        }
    }, []);

    // 🔄 Auto-Refresh: Keep counts and problem lists in sync every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchAll();
        }, 10000);
        return () => clearInterval(interval);
    }, [fetchAll]);

    console.log("Admin Problems:", problems);
    const [open, setOpen] = useState(true);
    const [page, setPage] = useState("dashboard");
    const [replyMap, setReplyMap] = useState({});
    const [expandedId, setExpandedId] = useState(null);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [msSearch, setMsSearch] = useState("");

    // ── Derived values ──────────────────────────────────────────
    const avgRating = feedbacks.length
        ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)
        : "–";

    const filteredProblems = useMemo(() =>
        problems
            .filter(p => filter === "all" || p.status === filter)
            .filter(p => !search ||
                (p.problemText || '').toLowerCase().includes(search.toLowerCase()) ||
                (p.studentEmail || '').toLowerCase().includes(search.toLowerCase())
            ),
        [problems, filter, search]
    );

    const filteredMsStudents = useMemo(() =>
        msStudents.filter(s =>
            !msSearch ||
            s.name?.toLowerCase().includes(msSearch.toLowerCase()) ||
            s.email?.toLowerCase().includes(msSearch.toLowerCase()) ||
            (s.roll_number || "").includes(msSearch)
        ),
        [msStudents, msSearch]
    );

    // ── Handlers ────────────────────────────────────────────────
    const sendReply = async (id) => {
        const reply = replyMap[id]?.trim();
        if (!reply) return;
        await updateProblem(id, { adminReply: reply, status: "solved" });
        setReplyMap(prev => ({ ...prev, [id]: "" }));
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/admin-login";
    };

    const handleRefresh = () => {
        fetchAll();
    };

    // ── Nav config ──────────────────────────────────────────────
    const navItems = [
        { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
        { id: "problems", icon: <ClipboardList size={18} />, label: "All Problems" },
        { id: "teachers", icon: <GraduationCap size={18} />, label: "Teacher Records" },
        { id: "students", icon: <Users size={18} />, label: "Outlook Students" },
        { id: "feedback", icon: <Star size={18} />, label: "Feedback" },
        { id: "graph", icon: <BarChart3 size={18} />, label: "Analytics" },
    ];

    const pageLabel = navItems.find(n => n.id === page)?.label || page;

    // ── Shared problem card props builder ───────────────────────
    const problemCardProps = (p) => ({
        p,
        expanded: expandedId === p.problem_id,
        onToggle: () => setExpandedId(expandedId === p.problem_id ? null : p.problem_id),
        reply: replyMap[p.problem_id] || "",
        onReplyChange: v => setReplyMap(prev => ({ ...prev, [p.problem_id]: v })),
        onSendReply: () => sendReply(p.problem_id),
        onMarkSolved: () => updateProblem(p.problem_id, { adminReply: replyMap[p.problem_id] || p.adminReply || "", status: "solved" }),
        onMarkUnsolved: () => updateProblem(p.problem_id, { adminReply: p.adminReply || "", status: "unsolved" }),
        onDelete: () => deleteProblem(p.problem_id),
    });

    return (
        <>
            <style>{gStyles}</style>  ✅ styles injected once, here

            <div className="admin-shell">

                {/* ── SIDEBAR ── */}
                <div className="sidebar" style={{ width: open ? 240 : 68 }}>
                    <div className="sidebar-logo-area">
                        <button className="menu-toggle" onClick={() => setOpen(!open)}>
                            <Menu size={17} />
                        </button>
                        {open && <span className="sidebar-logo">AdminPro</span>}
                    </div>
                    <nav className="sidebar-nav">
                        <div style={{ flex: 1 }}>
                            {navItems.map(n => (
                                <div key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
                                    {n.icon}
                                    {open && <span className="nav-label">{n.label}</span>}
                                </div>
                            ))}
                        </div>
                        <div style={{ paddingTop: 12 }}>
                            <div className="nav-item danger" onClick={handleLogout}>
                                <LogOut size={18} />
                                {open && <span className="nav-label">Logout</span>}
                            </div>
                        </div>
                    </nav>
                </div>

                {/* ── MAIN ── */}
                <div className="main-content">
                    <div className="topbar">
                        <div className="topbar-title">{pageLabel}</div>
                        <div className="topbar-right">
                            {error && (
                                <span style={{ fontSize: 12, color: C.rose, background: "#fff1f2", padding: "5px 10px", borderRadius: 8, fontWeight: 600 }}>
                                    ⚠ {error}
                                </span>
                            )}
                            <button className="refresh-btn" onClick={handleRefresh} disabled={loading}>
                                <RefreshCw size={14} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
                                {loading ? "Loading…" : "Refresh"}
                            </button>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${C.accent},${C.teal})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "0.8rem" }}>
                                AD
                            </div>
                        </div>
                    </div>

                    <div className="page">

                        {/* ── DASHBOARD ── */}
                        {page === "dashboard" && (
                            <>
                                <div className="stats-row">
                                    <StatCard label="Total Problems" value={stats.total} color={C.accent} icon={<ClipboardList size={20} />} />
                                    <StatCard label="Solved" value={stats.solved} color={C.green} icon={<CheckCircle size={20} />} />
                                    <StatCard label="Unsolved" value={stats.unsolved} color={C.rose} icon={<XCircle size={20} />} />
                                    <StatCard label="Avg. Feedback ⭐" value={avgRating} color={C.amber} icon={<Star size={20} />} sub={`from ${feedbacks.length} reviews`} />
                                    <StatCard label="Total Students" value={studentStats.totalActiveStudents} color={C.teal} icon={<Users size={20} />} />
                                    <StatCard label="Outlook Students" value={msTotal} color="#1D4ED8" icon={<Mail size={20} />} sub="unique accounts" />
                                    <StatCard label="Total Faculty" value={200} color="#4f46e5" icon={<GraduationCap size={20} />} sub="8 domains" />
                                </div>

                                <div className="two-col">
                                    <div className="g-card">
                                        <div className="g-card-title"><BarChart3 size={18} color={C.accent} />Problem Status</div>
                                        <ResponsiveContainer width="100%" height={220}>
                                            <PieChart>
                                                <Pie data={graphData} cx="50%" cy="50%" outerRadius={85} dataKey="value" label>
                                                    {graphData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                                                </Pie>
                                                <Tooltip /><Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="g-card">
                                        <div className="g-card-title"><Star size={18} color={C.amber} />Recent Feedback</div>
                                        {feedbacks.length === 0
                                            ? <div className="empty"><Star size={32} /><p>No feedback yet.</p></div>
                                            : feedbacks.slice(0, 3).map(f => <FeedbackCard key={f.id} f={f} />)
                                        }
                                    </div>
                                </div>

                                <div className="g-card">
                                    <div className="g-card-title"><ClipboardList size={18} color={C.accent} />Recent Problems</div>
                                    {problems.slice(0, 5).map(p => <ProblemCard key={p.problem_id} {...problemCardProps(p)} />)}
                                </div>
                            </>
                        )}

                        {/* ── ALL PROBLEMS ── */}
                        {page === "problems" && (
                            <div className="g-card">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
                                    <div className="g-card-title" style={{ marginBottom: 0 }}>
                                        <ClipboardList size={18} color={C.accent} />All Problems ({filteredProblems.length})
                                    </div>
                                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                                        <SearchInput value={search} onChange={setSearch} placeholder="Search problems…" />
                                        <div className="filter-pills">
                                            {["all", "unsolved", "in_progress", "solved"].map(s => (
                                                <button key={s} className={`pill ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>
                                                    {s === "in_progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {filteredProblems.length === 0
                                    ? <div className="empty"><ClipboardList size={36} /><p>No problems found.</p></div>
                                    : filteredProblems.map(p => <ProblemCard key={p.problem_id} {...problemCardProps(p)} />)
                                }
                            </div>
                        )}

                        {/* ── TEACHER RECORDS ── */}
                        {page === "teachers" && <TeacherRecordsPage />}

                        {/* ── OUTLOOK STUDENTS ── */}
                        {page === "students" && (
                            <div className="g-card">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
                                    <div className="g-card-title" style={{ marginBottom: 0 }}>
                                        <Mail size={18} color="#1D4ED8" />Outlook Students
                                        <span style={{ marginLeft: 8, background: "#EFF6FF", color: "#1D4ED8", borderRadius: 99, padding: "3px 12px", fontSize: "0.78rem", fontWeight: 700 }}>
                                            {msTotal} unique
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                        <SearchInput value={msSearch} onChange={setMsSearch} placeholder="Search name, email, roll no…" width={210} />
                                        <button className="refresh-btn" onClick={fetchMsStudents}><RefreshCw size={14} />Refresh</button>
                                    </div>
                                </div>
                                {filteredMsStudents.length === 0
                                    ? <div className="empty"><Mail size={36} style={{ opacity: 0.2, marginBottom: 10 }} /><p>{msSearch ? "No students match." : "No Outlook students yet."}</p></div>
                                    : (
                                        <div style={{ overflowX: "auto" }}>
                                            <table className="stu-table">
                                                <thead>
                                                    <tr><th>#</th><th>Student</th><th>Email</th><th>Roll Number</th><th>Auth</th><th>Joined</th></tr>
                                                </thead>
                                                <tbody>
                                                    {filteredMsStudents.map((s, i) => (
                                                        <tr key={s.id}>
                                                            <td style={{ color: C.muted, fontWeight: 700, fontSize: "0.8rem" }}>{i + 1}</td>
                                                            <td>
                                                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                                    <div className="stu-avatar">{s.name?.charAt(0)?.toUpperCase() || "?"}</div>
                                                                    <div>
                                                                        <div className="stu-name">{s.name}</div>
                                                                        <div className="stu-roll">{s.roll_number}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style={{ color: C.slate, fontSize: "0.85rem" }}>{s.email}</td>
                                                            <td style={{ fontWeight: 700, fontSize: "0.85rem" }}>{s.roll_number || "—"}</td>
                                                            <td>
                                                                <span className="ms-badge">
                                                                    <img src="https://img.icons8.com/color/20/microsoft.png" alt="ms" style={{ width: 13 }} />Outlook
                                                                </span>
                                                            </td>
                                                            <td className="stu-date">
                                                                {s.joined_at
                                                                    ? new Date(s.joined_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                                                    : "—"}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                }
                            </div>
                        )}

                        {/* ── FEEDBACK ── */}
                        {page === "feedback" && (
                            <div className="g-card">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                    <div className="g-card-title" style={{ marginBottom: 0 }}>
                                        <Star size={18} color={C.amber} />Student Feedback ({feedbacks.length})
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#FEF3C7", padding: "8px 16px", borderRadius: 99, fontWeight: 700, fontSize: "0.85rem", color: "#92400E" }}>
                                        ⭐ {avgRating} / 5 Average
                                    </div>
                                </div>
                                {feedbacks.length > 0 && (
                                    <>
                                        <RatingBreakdown feedbacks={feedbacks} />
                                        <div className="divider" />
                                    </>
                                )}
                                {feedbacks.length === 0
                                    ? <div className="empty"><Star size={36} /><p>No feedback yet.</p></div>
                                    : feedbacks.map(f => <FeedbackCard key={f.id} f={f} showLabel />)
                                }
                            </div>
                        )}

                        {/* ── ANALYTICS ── */}
                        {page === "graph" && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                                <div className="g-card">
                                    <div className="g-card-title"><BarChart3 size={18} color={C.accent} />Problem Status – Pie Chart</div>
                                    <ResponsiveContainer width="100%" height={320}>
                                        <PieChart>
                                            <Pie data={graphData} cx="50%" cy="50%" outerRadius={120} dataKey="value" label>
                                                {graphData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                                            </Pie>
                                            <Tooltip /><Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="g-card">
                                    <div className="g-card-title"><Star size={18} color={C.amber} />Feedback Rating Distribution</div>
                                    <ResponsiveContainer width="100%" height={260}>
                                        <BarChart data={[5, 4, 3, 2, 1].map(s => ({ star: `${s}★`, count: feedbacks.filter(f => f.rating === s).length }))}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                                            <XAxis dataKey="star" tick={{ fontSize: 13 }} />
                                            <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
                                            <Tooltip />
                                            <Bar dataKey="count" fill={C.amber} radius={[6, 6, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </>
    );
}

// ════════════════════════════════════════════════════════════════
//  SUB-COMPONENTS
// ════════════════════════════════════════════════════════════════
function StatCard({ label, value, color, icon, sub }) {
    return (
        <div className="stat-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span className="stat-label">{label}</span>
                <div style={{ background: `${color}18`, borderRadius: 10, padding: 8, color }}>{icon}</div>
            </div>
            <div className="stat-value" style={{ color }}>{value}</div>
            {sub && <div className="stat-sub">{sub}</div>}
        </div>
    );
}

function SearchInput({ value, onChange, placeholder, width = 180 }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F8FAFF", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "7px 14px" }}>
            <Search size={15} color={C.muted} />
            <input
                style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.85rem", width }}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            {value && (
                <button style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }} onClick={() => onChange("")}>
                    <X size={13} />
                </button>
            )}
        </div>
    );
}

function FeedbackCard({ f, showLabel = false }) {
    return (
        <div className="fb-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="fb-stars">{"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}</div>
                {showLabel && (
                    <span style={{ fontSize: "0.7rem", color: C.muted, fontWeight: 600 }}>
                        {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][f.rating]}
                    </span>
                )}
            </div>
            <p className="fb-text">{f.feedbackText}</p>
            <p className="fb-email">{f.studentEmail}</p>
        </div>
    );
}

function RatingBreakdown({ feedbacks }) {
    return (
        <div style={{ marginBottom: 24 }}>
            {[5, 4, 3, 2, 1].map(star => {
                const count = feedbacks.filter(f => f.rating === star).length;
                const pct = feedbacks.length ? Math.round((count / feedbacks.length) * 100) : 0;
                return (
                    <div key={star} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, width: 16, color: C.muted }}>{star}</span>
                        <span style={{ color: "#F59E0B", fontSize: "0.85rem" }}>★</span>
                        <div style={{ flex: 1, height: 8, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: "#F59E0B", borderRadius: 99, transition: "width 0.5s" }} />
                        </div>
                        <span style={{ fontSize: "0.75rem", color: C.muted, width: 30 }}>{count}</span>
                    </div>
                );
            })}
        </div>
    );
}

function ProblemCard({ p, expanded, onToggle, reply, onReplyChange, onSendReply, onMarkSolved, onMarkUnsolved, onDelete }) {
    return (
        <div className={`prob-card ${p.status}`}>
            <div className="prob-header" onClick={onToggle}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="prob-text">{p.problemText}</p>
                    <p className="prob-meta">
                        <strong>{p.studentEmail}</strong> · {new Date(p.createdAt || p.created_at).toLocaleString()}
                        {p.adminReply && <span style={{ color: "#2563EB", marginLeft: 6 }}>💬 Replied</span>}
                    </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span className={`prob-badge ${p.status}`}>
                        {p.status === "solved" ? <><CheckCircle size={11} />Solved</> : p.status === "in_progress" ? <>🔄 In Progress</> : <><XCircle size={11} />Unsolved</>}
                    </span>
                    {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
            </div>
            {expanded && (
                <div className="prob-expanded">
                    {p.adminReply && (
                        <div className="prev-reply">
                            <p style={{ fontSize: "0.77rem", fontWeight: 700, color: "#2563EB", marginBottom: 4 }}>Previous Reply:</p>
                            <p style={{ fontSize: "0.87rem" }}>{p.adminReply}</p>
                        </div>
                    )}
                    <div>
                        <label style={{ fontSize: "0.77rem", fontWeight: 700, color: C.muted, display: "block", marginBottom: 6 }}>Reply to Student</label>
                        <div className="reply-row">
                            <input
                                className="reply-input"
                                placeholder="Type your reply…"
                                value={reply}
                                onChange={e => onReplyChange(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && onSendReply()}
                            />
                            <button className="act-btn send" onClick={onSendReply}><Send size={13} />Send</button>
                        </div>
                    </div>
                    <div className="action-row">
                        {p.status !== "solved"
                            ? <button className="act-btn green" onClick={onMarkSolved}>  <CheckCircle size={13} />Mark Solved</button>
                            : <button className="act-btn amber" onClick={onMarkUnsolved}><XCircle size={13} />Mark Unsolved</button>
                        }
                        <button className="act-btn red" onClick={onDelete}><Trash2 size={13} />Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}