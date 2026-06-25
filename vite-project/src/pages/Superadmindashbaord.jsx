import { useState, useMemo, useRef, useEffect } from "react";
import {
    Shield, Users, UserPlus, UserMinus, Clock,
    Search, ChevronLeft, ChevronRight, Send, Bot, User, X, MessageSquare,
    LogIn, LogOut, Activity, Calendar,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const DEPARTMENTS = [
    "Computer Science", "Electronics", "Mechanical", "Civil",
    "Physics", "Mathematics", "Chemistry", "Management",
];
const DESIGNATIONS = [
    "Professor", "Associate Professor", "Assistant Professor",
    "Lecturer", "HOD", "Lab Instructor",
];
const FIRST_NAMES = [
    "Arjun", "Priya", "Rahul", "Neha", "Amit", "Sunita", "Vijay", "Pooja", "Rajesh", "Anita",
    "Suresh", "Meena", "Deepak", "Kavita", "Manoj", "Ritu", "Anil", "Sonal", "Vivek", "Divya",
    "Naveen", "Rekha", "Sanjay", "Nisha", "Kiran", "Harish", "Usha", "Ravi", "Swati", "Prakash",
    "Leela", "Vinod", "Shweta", "Ashok", "Geeta", "Ramesh", "Seema", "Dinesh", "Madhu", "Gaurav",
    "Poonam", "Bharat", "Lata", "Sunil", "Savita", "Rohit", "Alka", "Vikram", "Jyoti", "Manish",
];
const LAST_NAMES = [
    "Sharma", "Verma", "Gupta", "Singh", "Patel", "Joshi", "Tiwari", "Kumar", "Mishra", "Yadav",
    "Chauhan", "Pandey", "Shukla", "Agrawal", "Srivastava", "Bose", "Nair", "Menon", "Rao", "Reddy",
    "Iyer", "Pillai", "Desai", "Shah", "Mehta", "Kapoor", "Malhotra", "Saxena", "Trivedi", "Chaudhary",
];

let _seed = 12345;
function srnd() { _seed = (_seed * 1664525 + 1013904223) & 0xffffffff; return Math.abs(_seed) / 2147483648; }
function pick(arr) { return arr[Math.floor(srnd() * arr.length)]; }
function pad(n) { return String(n).padStart(2, "0"); }
function fmtTime(h, m) { return `${pad(h)}:${pad(m)}`; }
function fmtDate(d) { return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
function fmtDateTime(d) {
    return d.toLocaleString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: true,
    });
}

const TEACHERS = Array.from({ length: 100 }, (_, i) => {
    const fn = pick(FIRST_NAMES), ln = pick(LAST_NAMES);
    const dept = pick(DEPARTMENTS), desig = pick(DESIGNATIONS);
    const status = srnd() < 0.78 ? "active" : "left";
    const joinYear = 2014 + Math.floor(srnd() * 10);
    const joinDate = new Date(joinYear, Math.floor(srnd() * 12), 1 + Math.floor(srnd() * 27));
    const entryH = 7 + Math.floor(srnd() * 4), entryM = Math.floor(srnd() * 60);
    const exitH = 16 + Math.floor(srnd() * 3), exitM = Math.floor(srnd() * 60);
    const leftDate = status === "left"
        ? new Date(Math.min(joinYear + 1 + Math.floor(srnd() * 6), 2024), Math.floor(srnd() * 12), 1 + Math.floor(srnd() * 27))
        : null;
    return {
        id: i + 1,
        name: `${fn} ${ln}`,
        initials: (fn[0] + ln[0]).toUpperCase(),
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i + 1}@college.edu`,
        dept, desig, status, joinDate, leftDate, entryH, entryM, exitH, exitM,
    };
});

// ─── Generate mock admin session history ─────────────────────────────────────

function generateSessionHistory() {
    const sessions = [];
    const admins = [
        { name: "Dr. Rajiv Sharma", email: "rajiv.sharma@college.edu", role: "Super Admin" },
        { name: "Prof. Meena Gupta", email: "meena.gupta@college.edu", role: "Admin" },
        { name: "Mr. Anil Verma", email: "anil.verma@college.edu", role: "Admin" },
    ];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
        const admin = admins[Math.floor(Math.random() * admins.length)];
        const loginDate = new Date(now);
        loginDate.setDate(now.getDate() - i);
        loginDate.setHours(8 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 60), 0, 0);
        const sessionMins = 30 + Math.floor(Math.random() * 300);
        const logoutDate = new Date(loginDate.getTime() + sessionMins * 60000);
        const isToday = i === 0;
        sessions.push({
            id: 30 - i,
            admin: admin.name,
            email: admin.email,
            role: admin.role,
            loginTime: loginDate,
            logoutTime: isToday ? null : logoutDate,
            duration: isToday ? null : sessionMins,
            status: isToday ? "active" : "completed",
            ip: `192.168.${1 + Math.floor(Math.random() * 5)}.${10 + Math.floor(Math.random() * 90)}`,
        });
    }
    return sessions.reverse();
}

const SESSION_HISTORY = generateSessionHistory();

// ─── Claude context builder ───────────────────────────────────────────────────

function buildContext() {
    const active = TEACHERS.filter(t => t.status === "active").length;
    const left = TEACHERS.filter(t => t.status === "left").length;
    const deptLines = DEPARTMENTS.map(d => {
        const arr = TEACHERS.filter(t => t.dept === d);
        const avg = arr.reduce((s, t) => s + t.entryH + t.entryM / 60, 0) / arr.length;
        return `  ${d}: ${arr.length} total, ${arr.filter(t => t.status === "active").length} active, avg entry ${fmtTime(Math.floor(avg), Math.round((avg % 1) * 60))}`;
    }).join("\n");
    const sample = TEACHERS.slice(0, 30).map(t =>
        `  ${t.name} | ${t.dept} | ${t.desig} | ${t.status} | Entry:${fmtTime(t.entryH, t.entryM)} Exit:${fmtTime(t.exitH, t.exitM)} | Joined:${fmtDate(t.joinDate)}${t.leftDate ? ` Left:${fmtDate(t.leftDate)}` : ""}`
    ).join("\n");
    return `You are an AI assistant for a college Super Admin Dashboard. Answer questions about teacher data concisely and accurately.

OVERALL STATS:
  Total: ${TEACHERS.length} | Active: ${active} | Left: ${left}

DEPARTMENT BREAKDOWN:
${deptLines}

SAMPLE RECORDS (30 of 100):
${sample}

Answer helpfully. Format lists clearly. Note you have a 30-record sample shown; full dataset has 100 teachers.`;
}

const DATA_CONTEXT = buildContext();

// ─── Dept color map ───────────────────────────────────────────────────────────

const DEPT_COLORS = {
    "Computer Science": "#4f46e5",
    "Electronics": "#0891b2",
    "Mechanical": "#d97706",
    "Civil": "#65a30d",
    "Physics": "#7c3aed",
    "Mathematics": "#db2777",
    "Chemistry": "#ea580c",
    "Management": "#0f766e",
};

// ─── Small components ─────────────────────────────────────────────────────────

function Avatar({ initials, dept, size = 32 }) {
    const bg = DEPT_COLORS[dept] || "#6b7280";
    return (
        <div style={{
            width: size, height: size, borderRadius: "50%",
            background: bg + "22", border: `1.5px solid ${bg}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: bg, fontSize: size * 0.35, fontWeight: 600, flexShrink: 0,
        }}>{initials}</div>
    );
}

function AdminAvatar({ name, size = 32 }) {
    const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
    return (
        <div style={{
            width: size, height: size, borderRadius: "50%",
            background: "#4f46e522", border: "1.5px solid #4f46e555",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#4f46e5", fontSize: size * 0.32, fontWeight: 600, flexShrink: 0,
        }}>{initials}</div>
    );
}

function StatusPill({ status }) {
    const active = status === "active";
    return (
        <span style={{
            display: "inline-block", padding: "2px 10px", borderRadius: 20,
            fontSize: 11, fontWeight: 600, letterSpacing: "0.03em",
            background: active ? "#dcfce7" : "#fee2e2",
            color: active ? "#15803d" : "#b91c1c",
            border: `1px solid ${active ? "#86efac" : "#fca5a5"}`,
        }}>
            {active ? "Active" : "Left"}
        </span>
    );
}

function SessionStatusPill({ status }) {
    const isActive = status === "active";
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
            background: isActive ? "#dcfce7" : "#f0f9ff",
            color: isActive ? "#15803d" : "#0369a1",
            border: `1px solid ${isActive ? "#86efac" : "#7dd3fc"}`,
        }}>
            {isActive && (
                <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#16a34a", display: "inline-block",
                    animation: "pulse 1.5s infinite",
                }} />
            )}
            {isActive ? "Online Now" : "Completed"}
        </span>
    );
}

function StatCard({ icon, label, value, color }) {
    return (
        <div style={{
            background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
            padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color, marginBottom: 8 }}>
                {icon}
                <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>{label}</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div>
        </div>
    );
}

function DeptBar({ dept, count, max, activeCount }) {
    const color = DEPT_COLORS[dept] || "#6b7280";
    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                <span style={{ color: "#374151", fontWeight: 500 }}>{dept}</span>
                <span style={{ color: "#6b7280" }}>{activeCount}/{count}</span>
            </div>
            <div style={{ height: 7, background: "#f3f4f6", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(count / max) * 100}%`, background: color, borderRadius: 4 }} />
            </div>
        </div>
    );
}

function formatDuration(mins) {
    if (!mins) return "—";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// ─── Admin Session Panel ──────────────────────────────────────────────────────

function AdminSessionPanel({ onClose }) {
    const [sessionPage, setSessionPage] = useState(1);
    const SESSION_PAGE_SIZE = 8;
    const totalSessionPages = Math.ceil(SESSION_HISTORY.length / SESSION_PAGE_SIZE);
    const paginatedSessions = SESSION_HISTORY.slice(
        (sessionPage - 1) * SESSION_PAGE_SIZE,
        sessionPage * SESSION_PAGE_SIZE
    );

    const activeSession = SESSION_HISTORY.find(s => s.status === "active");
    const totalSessions = SESSION_HISTORY.length;
    const completedSessions = SESSION_HISTORY.filter(s => s.status === "completed");
    const avgDuration = Math.round(
        completedSessions.reduce((s, sess) => s + (sess.duration || 0), 0) / completedSessions.length
    );

    return (
        <div style={{
            position: "fixed", top: 0, right: 0, width: 620, height: "100vh",
            background: "#fff", borderLeft: "1px solid #e5e7eb",
            boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
            display: "flex", flexDirection: "column", zIndex: 1000,
        }}>
            {/* Header */}
            <div style={{
                padding: "18px 22px", background: "#111827",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexShrink: 0,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: "#1f2937", border: "1px solid #374151",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <Activity size={17} color="#34d399" />
                    </div>
                    <div>
                        <div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Admin Session Logs</div>
                        <div style={{ color: "#9ca3af", fontSize: 11 }}>Login & logout history — last 30 days</div>
                    </div>
                </div>
                <button onClick={onClose} style={{
                    background: "#374151", border: "none", cursor: "pointer",
                    color: "#9ca3af", padding: 6, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <X size={17} />
                </button>
            </div>

            {/* Active session banner */}
            {activeSession && (
                <div style={{
                    margin: "16px 20px 0",
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: "#f0fdf4",
                    border: "1px solid #86efac",
                    display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
                }}>
                    <div style={{
                        width: 10, height: 10, borderRadius: "50%",
                        background: "#16a34a", flexShrink: 0,
                        boxShadow: "0 0 0 3px #bbf7d0",
                        animation: "pulse 1.5s infinite",
                    }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#15803d" }}>
                            {activeSession.admin} is currently logged in
                        </div>
                        <div style={{ fontSize: 11, color: "#16a34a", marginTop: 2 }}>
                            Session started · {fmtDateTime(activeSession.loginTime)} · IP: {activeSession.ip}
                        </div>
                    </div>
                    <span style={{
                        fontSize: 11, fontWeight: 600, padding: "3px 10px",
                        borderRadius: 20, background: "#dcfce7", color: "#15803d",
                        border: "1px solid #86efac",
                    }}>LIVE</span>
                </div>
            )}

            {/* Quick stats */}
            <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10, margin: "14px 20px 0", flexShrink: 0,
            }}>
                {[
                    { label: "Total Sessions", value: totalSessions, color: "#4f46e5", icon: <Calendar size={13} /> },
                    { label: "Avg Duration", value: formatDuration(avgDuration), color: "#d97706", icon: <Clock size={13} /> },
                    { label: "Active Now", value: activeSession ? "1" : "0", color: "#16a34a", icon: <Activity size={13} /> },
                ].map((s, i) => (
                    <div key={i} style={{
                        background: "#f9fafb", border: "1px solid #e5e7eb",
                        borderRadius: 10, padding: "10px 12px",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, color: s.color, marginBottom: 4 }}>
                            {s.icon}
                            <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>{s.label}</span>
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Table header */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "1.8fr 1.2fr 1fr 1fr 0.9fr 1fr",
                padding: "10px 20px", margin: "14px 0 0",
                background: "#f9fafb", borderTop: "1px solid #e5e7eb",
                borderBottom: "1px solid #e5e7eb", flexShrink: 0,
            }}>
                {["Admin", "Role", "Login Time", "Logout Time", "Duration", "Status"].map(h => (
                    <span key={h} style={{
                        fontSize: 11, fontWeight: 600, color: "#6b7280",
                        textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>{h}</span>
                ))}
            </div>

            {/* Session rows */}
            <div style={{ flex: 1, overflowY: "auto" }}>
                {paginatedSessions.map((s, i) => (
                    <div key={s.id} style={{
                        display: "grid",
                        gridTemplateColumns: "1.8fr 1.2fr 1fr 1fr 0.9fr 1fr",
                        padding: "11px 20px", alignItems: "center",
                        background: s.status === "active"
                            ? "#f0fdf4"
                            : i % 2 === 0 ? "#fff" : "#fafafa",
                        borderBottom: "1px solid #f3f4f6",
                        borderLeft: s.status === "active" ? "3px solid #16a34a" : "3px solid transparent",
                        transition: "background 0.15s",
                    }}
                        onMouseEnter={e => {
                            if (s.status !== "active") e.currentTarget.style.background = "#eff6ff";
                        }}
                        onMouseLeave={e => {
                            if (s.status !== "active") e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafafa";
                        }}
                    >
                        {/* Admin name */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <AdminAvatar name={s.admin} size={30} />
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>{s.admin}</div>
                                <div style={{ fontSize: 10, color: "#9ca3af" }}>{s.ip}</div>
                            </div>
                        </div>

                        {/* Role */}
                        <span style={{
                            fontSize: 11, fontWeight: 600, padding: "2px 8px",
                            borderRadius: 6, width: "fit-content",
                            background: s.role === "Super Admin" ? "#ede9fe" : "#e0f2fe",
                            color: s.role === "Super Admin" ? "#6d28d9" : "#0369a1",
                        }}>{s.role}</span>

                        {/* Login time */}
                        <div>
                            <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                                <LogIn size={10} />
                                {s.loginTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
                            </div>
                            <div style={{ fontSize: 10, color: "#9ca3af" }}>
                                {s.loginTime.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                            </div>
                        </div>

                        {/* Logout time */}
                        <div>
                            {s.logoutTime ? (
                                <>
                                    <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                                        <LogOut size={10} />
                                        {s.logoutTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
                                    </div>
                                    <div style={{ fontSize: 10, color: "#9ca3af" }}>
                                        {s.logoutTime.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                                    </div>
                                </>
                            ) : (
                                <span style={{ fontSize: 11, color: "#9ca3af" }}>Still active</span>
                            )}
                        </div>

                        {/* Duration */}
                        <span style={{
                            fontSize: 12, fontFamily: "monospace",
                            color: s.duration ? "#374151" : "#9ca3af",
                        }}>
                            {formatDuration(s.duration)}
                        </span>

                        {/* Status */}
                        <SessionStatusPill status={s.status} />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div style={{
                padding: "12px 20px", borderTop: "1px solid #e5e7eb",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexShrink: 0, background: "#fafafa",
            }}>
                <span style={{ fontSize: 12, color: "#6b7280" }}>
                    {(sessionPage - 1) * SESSION_PAGE_SIZE + 1}–{Math.min(sessionPage * SESSION_PAGE_SIZE, SESSION_HISTORY.length)} of {SESSION_HISTORY.length} sessions
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                    <button
                        onClick={() => setSessionPage(p => Math.max(1, p - 1))}
                        disabled={sessionPage <= 1}
                        style={{
                            width: 30, height: 30, borderRadius: 8,
                            border: "1px solid #e5e7eb", background: "#fff",
                            cursor: sessionPage <= 1 ? "default" : "pointer",
                            opacity: sessionPage <= 1 ? 0.4 : 1,
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                        <ChevronLeft size={15} />
                    </button>
                    {Array.from({ length: totalSessionPages }, (_, i) => i + 1).map(p => (
                        <button key={p} onClick={() => setSessionPage(p)} style={{
                            width: 30, height: 30, borderRadius: 8,
                            border: "1px solid #e5e7eb",
                            background: sessionPage === p ? "#111827" : "#fff",
                            color: sessionPage === p ? "#fff" : "#374151",
                            cursor: "pointer", fontSize: 12,
                            fontWeight: sessionPage === p ? 600 : 400,
                        }}>{p}</button>
                    ))}
                    <button
                        onClick={() => setSessionPage(p => Math.min(totalSessionPages, p + 1))}
                        disabled={sessionPage >= totalSessionPages}
                        style={{
                            width: 30, height: 30, borderRadius: 8,
                            border: "1px solid #e5e7eb", background: "#fff",
                            cursor: sessionPage >= totalSessionPages ? "default" : "pointer",
                            opacity: sessionPage >= totalSessionPages ? 0.4 : 1,
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                        <ChevronRight size={15} />
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </div>
    );
}

// ─── AI Chat Panel ────────────────────────────────────────────────────────────

function ChatPanel({ onClose }) {
    const [messages, setMessages] = useState([
        { role: "assistant", text: "Hi! Ask me anything about teacher records, departments, entry/exit timings, or statistics." },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

    async function send() {
        const q = input.trim();
        if (!q || loading) return;
        setInput("");
        const next = [...messages, { role: "user", text: q }];
        setMessages(next);
        setLoading(true);
        try {
            const apiMessages = [
                { role: "user", content: DATA_CONTEXT },
                { role: "assistant", content: "Understood. I have the teacher data. Ask me anything." },
                ...next.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })),
            ];
            const res = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: apiMessages }),
            });
            const data = await res.json();
            const reply = data.content?.map(c => c.text || "").join("") || "Sorry, couldn't get a response.";
            setMessages(prev => [...prev, { role: "assistant", text: reply }]);
        } catch {
            setMessages(prev => [...prev, { role: "assistant", text: "Connection error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{
            position: "fixed", bottom: 24, right: 24, width: 380, height: 520,
            background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18,
            boxShadow: "0 8px 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column",
            zIndex: 1000, overflow: "hidden",
        }}>
            <div style={{ padding: "14px 16px", background: "#111827", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Bot size={15} color="#fff" />
                    </div>
                    <div>
                        <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Admin AI Assistant</div>
                        <div style={{ color: "#9ca3af", fontSize: 11 }}>Ask about teachers, departments, timings</div>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }}>
                    <X size={18} />
                </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 4px", display: "flex", flexDirection: "column", gap: 10 }}>
                {messages.map((m, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                        <div style={{
                            width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                            background: m.role === "assistant" ? "#4f46e5" : "#e5e7eb",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            {m.role === "assistant" ? <Bot size={13} color="#fff" /> : <User size={13} color="#374151" />}
                        </div>
                        <div style={{
                            maxWidth: "78%", padding: "9px 12px",
                            borderRadius: m.role === "user" ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
                            background: m.role === "user" ? "#4f46e5" : "#f9fafb",
                            border: m.role === "user" ? "none" : "1px solid #e5e7eb",
                            color: m.role === "user" ? "#fff" : "#111827",
                            fontSize: 13, lineHeight: 1.55, whiteSpace: "pre-wrap",
                        }}>{m.text}</div>
                    </div>
                ))}
                {loading && (
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Bot size={13} color="#fff" />
                        </div>
                        <div style={{ padding: "9px 14px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "4px 14px 14px 14px", display: "flex", gap: 5, alignItems: "center" }}>
                            {[0, 1, 2].map(j => (
                                <div key={j} style={{ width: 7, height: 7, borderRadius: "50%", background: "#9ca3af", animation: "bounce 1.2s infinite", animationDelay: `${j * 0.2}s` }} />
                            ))}
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <div style={{ padding: "10px 12px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 8, alignItems: "center" }}>
                <input
                    value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                    placeholder="Ask about teachers, departments..."
                    style={{ flex: 1, padding: "9px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, outline: "none", color: "#111827", background: "#f9fafb" }}
                />
                <button onClick={send} disabled={loading || !input.trim()} style={{
                    width: 36, height: 36, borderRadius: 10, border: "none",
                    background: loading || !input.trim() ? "#e5e7eb" : "#4f46e5",
                    cursor: loading || !input.trim() ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                    <Send size={15} color={loading || !input.trim() ? "#9ca3af" : "#fff"} />
                </button>
            </div>
            <style>{`
                @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
            `}</style>
        </div>
    );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

export default function SuperAdminDashboard() {
    const [activeDept, setActiveDept] = useState("All");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [timeFilter, setTimeFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [chatOpen, setChatOpen] = useState(false);
    const [sessionOpen, setSessionOpen] = useState(false);

    const filtered = useMemo(() => TEACHERS.filter(t => {
        if (activeDept !== "All" && t.dept !== activeDept) return false;
        if (statusFilter !== "all" && t.status !== statusFilter) return false;
        if (timeFilter === "morning" && t.entryH >= 9) return false;
        if (timeFilter === "regular" && (t.entryH < 9 || t.entryH >= 10)) return false;
        if (timeFilter === "late" && t.entryH < 10) return false;
        if (search) {
            const q = search.toLowerCase();
            if (!`${t.name} ${t.email} ${t.desig} ${t.dept}`.toLowerCase().includes(q)) return false;
        }
        return true;
    }), [activeDept, search, statusFilter, timeFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const curPage = Math.min(page, totalPages);
    const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);

    const globalStats = useMemo(() => {
        const active = TEACHERS.filter(t => t.status === "active").length;
        const left = TEACHERS.filter(t => t.status === "left").length;
        const avgEntry = TEACHERS.reduce((s, t) => s + t.entryH + t.entryM / 60, 0) / TEACHERS.length;
        return { active, left, avgEntry };
    }, []);

    const deptStats = useMemo(() => DEPARTMENTS.map(d => ({
        dept: d,
        count: TEACHERS.filter(t => t.dept === d).length,
        active: TEACHERS.filter(t => t.dept === d && t.status === "active").length,
    })), []);
    const maxCount = Math.max(...deptStats.map(d => d.count));

    const activeAdminSession = SESSION_HISTORY.find(s => s.status === "active");

    function changeDept(d) { setActiveDept(d); setPage(1); }

    const avgH = Math.floor(globalStats.avgEntry);
    const avgM = Math.round((globalStats.avgEntry % 1) * 60);
    const colStyle = { fontSize: 12, color: "#374151" };

    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: "#111827", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Shield size={22} color="#34d399" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>Super Admin Dashboard</h1>
                            <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>All teacher records — timings, departments, status</p>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>

                        {/* Session log button */}
                        <button
                            onClick={() => { setSessionOpen(o => !o); if (chatOpen) setChatOpen(false); }}
                            style={{
                                display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
                                background: sessionOpen ? "#111827" : "#fff",
                                color: sessionOpen ? "#fff" : "#374151",
                                border: "1px solid #e5e7eb", borderRadius: 12,
                                fontSize: 13, fontWeight: 600, cursor: "pointer",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                position: "relative",
                            }}
                        >
                            <Activity size={16} color={sessionOpen ? "#34d399" : "#6b7280"} />
                            Session Logs
                            {activeAdminSession && (
                                <span style={{
                                    position: "absolute", top: -4, right: -4,
                                    width: 10, height: 10, borderRadius: "50%",
                                    background: "#16a34a", border: "2px solid #f8fafc",
                                    animation: "pulse 1.5s infinite",
                                }} />
                            )}
                        </button>

                        {/* AI Assistant button */}
                        <button
                            onClick={() => { setChatOpen(o => !o); if (sessionOpen) setSessionOpen(false); }}
                            style={{
                                display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
                                background: chatOpen ? "#111827" : "#4f46e5", color: "#fff",
                                border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer",
                                boxShadow: "0 2px 8px rgba(79,70,229,0.3)",
                            }}
                        >
                            <MessageSquare size={16} />
                            {chatOpen ? "Close Assistant" : "Ask AI Assistant"}
                        </button>
                    </div>
                </div>

                {/* Active session info bar */}
                {activeAdminSession && (
                    <div style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "10px 16px", borderRadius: 12, marginBottom: 18,
                        background: "#f0fdf4", border: "1px solid #86efac",
                    }}>
                        <div style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: "#16a34a", flexShrink: 0,
                            boxShadow: "0 0 0 3px #bbf7d0",
                            animation: "pulse 1.5s infinite",
                        }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <LogIn size={13} color="#16a34a" />
                            <span style={{ fontSize: 13, color: "#15803d", fontWeight: 600 }}>
                                {activeAdminSession.admin}
                            </span>
                            <span style={{ fontSize: 13, color: "#16a34a" }}>
                                is currently logged in as {activeAdminSession.role}
                            </span>
                            <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 6 }}>
                                · Since {activeAdminSession.loginTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
                                · IP: {activeAdminSession.ip}
                            </span>
                        </div>
                        <button
                            onClick={() => setSessionOpen(true)}
                            style={{
                                marginLeft: "auto", fontSize: 12, color: "#15803d",
                                background: "none", border: "1px solid #86efac",
                                borderRadius: 8, padding: "4px 12px", cursor: "pointer",
                                fontWeight: 600,
                            }}
                        >
                            View All Logs
                        </button>
                    </div>
                )}

                {/* Stat Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
                    <StatCard icon={<Users size={18} />} label="Total Teachers" value={TEACHERS.length} color="#4f46e5" />
                    <StatCard icon={<UserPlus size={18} />} label="Active Teachers" value={globalStats.active} color="#16a34a" />
                    <StatCard icon={<UserMinus size={18} />} label="Teachers Left" value={globalStats.left} color="#dc2626" />
                    <StatCard icon={<Clock size={18} />} label="Avg. Entry Time" value={fmtTime(avgH, avgM)} color="#d97706" />
                </div>

                {/* Dept bars */}
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "20px 22px", marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 14 }}>Department Overview (active / total)</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 36px" }}>
                        {deptStats.map(({ dept, count, active }) => (
                            <DeptBar key={dept} dept={dept} count={count} max={maxCount} activeCount={active} />
                        ))}
                    </div>
                </div>

                {/* Dept tabs */}
                <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                    {["All", ...DEPARTMENTS].map(d => {
                        const cnt = d === "All" ? TEACHERS.length : TEACHERS.filter(t => t.dept === d).length;
                        return (
                            <button key={d} onClick={() => changeDept(d)} style={{
                                padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer",
                                border: activeDept === d ? "none" : "1px solid #e5e7eb",
                                background: activeDept === d ? "#111827" : "#fff",
                                color: activeDept === d ? "#fff" : "#374151", transition: "all 0.15s",
                            }}>
                                {d === "All" ? "All" : d.split(" ")[0]}
                                <span style={{ marginLeft: 5, fontSize: 11, opacity: 0.65 }}>({cnt})</span>
                            </button>
                        );
                    })}
                </div>

                {/* Filters */}
                <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                    <div style={{ position: "relative", flex: "1 1 220px" }}>
                        <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                        <input
                            value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Search name, email, designation..."
                            style={{ width: "100%", paddingLeft: 36, paddingRight: 12, paddingTop: 9, paddingBottom: 9, borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, color: "#111827", outline: "none", background: "#fff", boxSizing: "border-box" }}
                        />
                    </div>
                    {[
                        { id: "statusFilter", value: statusFilter, setter: setStatusFilter, opts: [["all", "All Status"], ["active", "Active"], ["left", "Left"]] },
                        { id: "timeFilter", value: timeFilter, setter: setTimeFilter, opts: [["all", "All Entry Times"], ["morning", "Morning (< 9am)"], ["regular", "Regular (9–10am)"], ["late", "Late (> 10am)"]] },
                    ].map(f => (
                        <select key={f.id} value={f.value} onChange={e => { f.setter(e.target.value); setPage(1); }}
                            style={{ padding: "9px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, color: "#374151", background: "#fff", cursor: "pointer" }}>
                            {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                        </select>
                    ))}
                </div>

                {/* Table */}
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", marginBottom: 14 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1.1fr 1.3fr 1fr 1fr 1.2fr 0.9fr", padding: "10px 16px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                        {["Teacher", "Department", "Designation", "Entry", "Exit", "Joined / Left", "Status"].map(h => (
                            <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
                        ))}
                    </div>

                    {paginated.length === 0 && (
                        <div style={{ textAlign: "center", padding: 40, color: "#9ca3af", fontSize: 14 }}>No records found.</div>
                    )}

                    {paginated.map((t, i) => (
                        <div
                            key={t.id}
                            style={{ display: "grid", gridTemplateColumns: "2fr 1.1fr 1.3fr 1fr 1fr 1.2fr 0.9fr", padding: "12px 16px", alignItems: "center", background: i % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #f3f4f6", cursor: "default" }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#eff6ff")}
                            onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafafa")}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <Avatar initials={t.initials} dept={t.dept} size={34} />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{t.name}</div>
                                    <div style={{ fontSize: 11, color: "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>{t.email}</div>
                                </div>
                            </div>
                            <span style={{ ...colStyle, fontSize: 12 }}>{t.dept.split(" ")[0]}</span>
                            <span style={{ ...colStyle, fontSize: 12 }}>{t.desig}</span>
                            <span style={{ fontFamily: "monospace", fontSize: 12, color: "#2563eb" }}>{fmtTime(t.entryH, t.entryM)}</span>
                            <span style={{ fontFamily: "monospace", fontSize: 12, color: "#7c3aed" }}>{fmtTime(t.exitH, t.exitM)}</span>
                            <div>
                                <div style={{ fontSize: 12, color: "#374151" }}>{fmtDate(t.joinDate)}</div>
                                {t.leftDate && <div style={{ fontSize: 11, color: "#dc2626" }}>Left: {fmtDate(t.leftDate)}</div>}
                            </div>
                            <StatusPill status={t.status} />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, color: "#6b7280" }}>
                    <span>
                        {filtered.length === 0 ? "0 records" : `${(curPage - 1) * PAGE_SIZE + 1}–${Math.min(curPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
                    </span>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={curPage <= 1}
                            style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: curPage <= 1 ? "default" : "pointer", opacity: curPage <= 1 ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ChevronLeft size={16} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(p => p === 1 || p === totalPages || Math.abs(p - curPage) <= 1)
                            .reduce((acc, p, idx, arr) => {
                                if (idx > 0 && arr[idx - 1] !== p - 1) acc.push("…");
                                acc.push(p); return acc;
                            }, [])
                            .map((p, idx) =>
                                p === "…"
                                    ? <span key={`dot${idx}`} style={{ color: "#9ca3af", padding: "0 2px" }}>…</span>
                                    : <button key={p} onClick={() => setPage(p)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: curPage === p ? "#111827" : "#fff", color: curPage === p ? "#fff" : "#374151", cursor: "pointer", fontSize: 13, fontWeight: curPage === p ? 600 : 400 }}>{p}</button>
                            )}
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={curPage >= totalPages}
                            style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: curPage >= totalPages ? "default" : "pointer", opacity: curPage >= totalPages ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

            </div>

            {sessionOpen && <AdminSessionPanel onClose={() => setSessionOpen(false)} />}
            {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </div>
    );
}