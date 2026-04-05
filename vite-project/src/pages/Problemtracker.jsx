import React, { useState, useEffect } from "react";

const STUDENT_EMAIL = localStorage.getItem("email") || "student@krmangalam.edu.in";

const initialProblems = [
    { id: 1, cat: "wifi", text: "WiFi drops frequently in Block B classrooms (B007–B018)", count: 38, resolved: false },
    { id: 2, cat: "facility", text: "Projector not working — A201 and A203", count: 31, resolved: false },
    { id: 3, cat: "admin", text: "Bonafide certificate processing takes 7+ days", count: 27, resolved: false },
    { id: 4, cat: "transport", text: "Evening shuttle departs before 5:30 PM", count: 24, resolved: false },
    { id: 5, cat: "wifi", text: "No WiFi signal in Block C basement cafeteria", count: 22, resolved: true },
    { id: 6, cat: "facility", text: "Block A 3rd floor washroom — broken tap and no soap", count: 19, resolved: true },
    { id: 7, cat: "academic", text: "Timetable clash — lab slots overlap with lectures", count: 17, resolved: false },
    { id: 8, cat: "transport", text: "Bus route doesn't cover Sector 47 / DLF area", count: 15, resolved: false },
    { id: 9, cat: "facility", text: "Drinking water dispenser on B Ground Floor broken", count: 13, resolved: true },
    { id: 10, cat: "academic", text: "Student portal goes down near assignment deadlines", count: 11, resolved: false },
    { id: 11, cat: "safety", text: "Street lights outside Block C not working after 7 PM", count: 9, resolved: false },
    { id: 12, cat: "facility", text: "Central Library — insufficient power sockets at desks", count: 8, resolved: false },
    { id: 13, cat: "wifi", text: "WiFi login page broken on Android devices", count: 7, resolved: true },
    { id: 14, cat: "admin", text: "Fee receipt not generated after online payment", count: 6, resolved: true },
    { id: 15, cat: "safety", text: "CCTV camera near Block B parking not functional", count: 5, resolved: false },
];

const catMeta = {
    all: { label: "All", color: "#6366F1", bg: "#EEF2FF" },
    wifi: { label: "WiFi", color: "#6366F1", bg: "#EEF2FF" },
    facility: { label: "Facility", color: "#F59E0B", bg: "#FFFBEB" },
    admin: { label: "Admin", color: "#06B6D4", bg: "#ECFEFF" },
    transport: { label: "Transport", color: "#10B981", bg: "#F0FDF4" },
    academic: { label: "Academic", color: "#8B5CF6", bg: "#F5F3FF" },
    safety: { label: "Safety", color: "#F43F5E", bg: "#FFF1F2" },
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

  .pt-page { font-family:'Plus Jakarta Sans',sans-serif; background:#0F1117; min-height:100vh; color:#fff; }

  .pt-hero {
    padding:48px 32px 40px;
    background:linear-gradient(180deg,#161824 0%,#0F1117 100%);
    border-bottom:1px solid rgba(255,255,255,0.06);
  }
  .pt-hero-inner { max-width:1100px; margin:0 auto; }
  .pt-tag {
    display:inline-flex; align-items:center; gap:6px;
    background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.3);
    color:#A5B4FC; padding:5px 14px; border-radius:99px;
    font-size:11px; font-weight:600; letter-spacing:0.06em;
    text-transform:uppercase; margin-bottom:16px;
  }
  .pt-hero h1 {
    font-family:'Syne',sans-serif;
    font-size:clamp(1.9rem,4vw,2.8rem);
    font-weight:800; color:#fff;
    margin-bottom:8px; line-height:1.1;
  }
  .pt-hero h1 span { color:#6366F1; }
  .pt-hero-sub { color:rgba(255,255,255,0.45); font-size:0.9rem; }

  .pt-stats {
    display:grid; grid-template-columns:repeat(4,1fr); gap:12px;
    max-width:1100px; margin:28px auto 0;
  }
  .pt-stat {
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.07);
    border-radius:16px; padding:16px 18px;
  }
  .pt-stat-num { font-family:'Syne',sans-serif; font-size:1.9rem; font-weight:800; }
  .pt-stat-lbl { font-size:11px; color:rgba(255,255,255,0.4); margin-top:2px; text-transform:uppercase; letter-spacing:0.05em; }

  .pt-container { max-width:1100px; margin:0 auto; padding:28px 24px; }

  .pt-controls {
    display:flex; align-items:center; gap:8px; flex-wrap:wrap;
    margin-bottom:20px;
  }
  .pt-pill {
    padding:7px 16px; border-radius:99px;
    font-size:12px; font-weight:600; cursor:pointer;
    border:1px solid rgba(255,255,255,0.1);
    background:rgba(255,255,255,0.05);
    color:rgba(255,255,255,0.55);
    transition:all 0.15s; font-family:inherit;
  }
  .pt-pill:hover { background:rgba(255,255,255,0.09); color:#fff; }
  .pt-pill.active { border-color:currentColor; background:transparent; }

  .pt-sort {
    margin-left:auto;
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:10px; padding:7px 12px;
    color:rgba(255,255,255,0.6); font-size:12px;
    font-family:inherit; cursor:pointer; outline:none;
  }

  .pt-list { display:flex; flex-direction:column; gap:10px; margin-bottom:28px; }

  .pt-item {
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.07);
    border-radius:16px; padding:16px 18px;
    transition:border-color 0.15s, background 0.15s;
  }
  .pt-item:hover { background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.12); }

  .pt-item-top {
    display:flex; justify-content:space-between;
    align-items:flex-start; gap:12px; margin-bottom:10px;
  }
  .pt-item-left { display:flex; gap:10px; align-items:flex-start; flex:1; }
  .pt-cat-dot {
    width:8px; height:8px; border-radius:50%;
    flex-shrink:0; margin-top:5px;
  }
  .pt-item-text { font-size:13.5px; color:rgba(255,255,255,0.85); line-height:1.5; }

  .pt-status {
    padding:4px 11px; border-radius:99px;
    font-size:11px; font-weight:600;
    white-space:nowrap; flex-shrink:0;
  }
  .pt-status.resolved { background:rgba(16,185,129,0.15); color:#6EE7B7; }
  .pt-status.pending  { background:rgba(244,63,94,0.12);  color:#FDA4AF; }

  .pt-bar-row { display:flex; align-items:center; gap:10px; }
  .pt-cat-tag {
    font-size:11px; font-weight:600; padding:3px 9px;
    border-radius:99px; flex-shrink:0;
  }
  .pt-track { flex:1; height:5px; border-radius:99px; background:rgba(255,255,255,0.08); }
  .pt-fill { height:100%; border-radius:99px; transition:width 0.6s ease; }
  .pt-count { font-size:11px; color:rgba(255,255,255,0.35); min-width:72px; text-align:right; }

  .pt-submit {
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.09);
    border-radius:20px; padding:24px;
  }
  .pt-submit h3 {
    font-family:'Syne',sans-serif;
    font-size:1.1rem; font-weight:700;
    color:#fff; margin-bottom:14px;
  }
  .pt-textarea {
    width:100%;
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:12px; padding:13px 15px;
    color:#fff; font-size:13px; font-family:inherit;
    resize:vertical; min-height:90px; outline:none;
    transition:border-color 0.2s;
    margin-bottom:12px;
  }
  .pt-textarea::placeholder { color:rgba(255,255,255,0.25); }
  .pt-textarea:focus { border-color:#6366F1; }

  .pt-submit-row { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
  .pt-cat-select {
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:10px; padding:9px 14px;
    color:rgba(255,255,255,0.7); font-size:12px;
    font-family:inherit; cursor:pointer; outline:none;
  }
  .pt-submit-btn {
    background:#6366F1; color:#fff;
    border:none; border-radius:10px;
    padding:10px 22px; font-size:13px; font-weight:600;
    cursor:pointer; font-family:inherit;
    transition:background 0.15s, transform 0.1s;
  }
  .pt-submit-btn:hover { background:#4F46E5; transform:scale(1.02); }
  .pt-submit-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }

  .pt-toast {
    position:fixed; bottom:24px; right:24px; z-index:999;
    padding:12px 20px; border-radius:12px;
    font-size:13px; font-weight:600;
    box-shadow:0 8px 32px rgba(0,0,0,0.4);
    transition:opacity 0.3s, transform 0.3s;
    pointer-events:none;
  }
  .pt-toast.show { opacity:1; transform:none; }
  .pt-toast.hidden { opacity:0; transform:translateY(10px); }
  .pt-toast.success { background:#059669; color:#fff; }
  .pt-toast.error   { background:#E11D48; color:#fff; }

  .pt-empty {
    text-align:center; padding:48px 0;
    color:rgba(255,255,255,0.25); font-size:13px;
  }

  @media(max-width:600px){
    .pt-stats { grid-template-columns:1fr 1fr; }
  }
`;

export default function ProblemTracker() {
    const [problems, setProblems] = useState(initialProblems);
    const [activeCat, setActiveCat] = useState("all");
    const [sort, setSort] = useState("count");
    const [newText, setNewText] = useState("");
    const [newCat, setNewCat] = useState("wifi");
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3200);
    };

    const submitProblem = async () => {
        if (!newText.trim()) { showToast("Please describe the problem first.", "error"); return; }
        setSubmitting(true);
        try {
            await fetch("http://localhost:5000/api/add-problem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ problemText: newText, studentEmail: STUDENT_EMAIL }),
            });
            setProblems(prev => [
                { id: Date.now(), cat: newCat, text: newText, count: 1, resolved: false },
                ...prev,
            ]);
            setNewText("");
            showToast("✅ Problem submitted! Admin will review it soon.");
        } catch {
            // fallback: still add locally
            setProblems(prev => [
                { id: Date.now(), cat: newCat, text: newText, count: 1, resolved: false },
                ...prev,
            ]);
            setNewText("");
            showToast("✅ Submitted locally (backend offline).");
        }
        setSubmitting(false);
    };

    const filtered = (activeCat === "all" ? problems : problems.filter(p => p.cat === activeCat))
        .slice()
        .sort((a, b) =>
            sort === "count" ? b.count - a.count :
                sort === "pending" ? a.resolved - b.resolved :
                    b.resolved - a.resolved
        );

    const maxCount = Math.max(...problems.map(p => p.count), 1);
    const total = problems.length;
    const resolved = problems.filter(p => p.resolved).length;
    const pending = total - resolved;
    const topCount = Math.max(...problems.map(p => p.count));

    return (
        <div className="pt-page">
            <style>{styles}</style>

            <div className="pt-hero">
                <div className="pt-hero-inner">
                    <div className="pt-tag">📋 Live Problem Tracker</div>
                    <h1>Campus <span>Issues</span><br />Dashboard</h1>
                    <p className="pt-hero-sub">Most reported problems · Submit yours · Admin reviews within 24 hrs</p>

                    <div className="pt-stats">
                        <div className="pt-stat">
                            <div className="pt-stat-num" style={{ color: "#fff" }}>{total}</div>
                            <div className="pt-stat-lbl">Total Reports</div>
                        </div>
                        <div className="pt-stat">
                            <div className="pt-stat-num" style={{ color: "#6EE7B7" }}>{resolved}</div>
                            <div className="pt-stat-lbl">Resolved</div>
                        </div>
                        <div className="pt-stat">
                            <div className="pt-stat-num" style={{ color: "#FDA4AF" }}>{pending}</div>
                            <div className="pt-stat-lbl">Pending</div>
                        </div>
                        <div className="pt-stat">
                            <div className="pt-stat-num" style={{ color: "#A5B4FC" }}>{topCount}</div>
                            <div className="pt-stat-lbl">Top Issue Votes</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-container">
                <div className="pt-controls">
                    {Object.entries(catMeta).map(([key, meta]) => (
                        <button
                            key={key}
                            className={`pt-pill${activeCat === key ? " active" : ""}`}
                            style={activeCat === key ? { color: meta.color, borderColor: meta.color } : {}}
                            onClick={() => setActiveCat(key)}
                        >
                            {meta.label}
                        </button>
                    ))}
                    <select className="pt-sort" value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="count">Most Reported</option>
                        <option value="pending">Pending First</option>
                        <option value="resolved">Resolved First</option>
                    </select>
                </div>

                <div className="pt-list">
                    {filtered.length === 0 ? (
                        <div className="pt-empty">No problems in this category yet.</div>
                    ) : filtered.map(p => {
                        const meta = catMeta[p.cat] || catMeta.facility;
                        const pct = Math.round((p.count / maxCount) * 100);
                        return (
                            <div key={p.id} className="pt-item">
                                <div className="pt-item-top">
                                    <div className="pt-item-left">
                                        <div className="pt-cat-dot" style={{ background: meta.color }} />
                                        <div className="pt-item-text">{p.text}</div>
                                    </div>
                                    <span className={`pt-status ${p.resolved ? "resolved" : "pending"}`}>
                                        {p.resolved ? "✓ Resolved" : "⏳ Pending"}
                                    </span>
                                </div>
                                <div className="pt-bar-row">
                                    <span
                                        className="pt-cat-tag"
                                        style={{ background: meta.bg, color: meta.color }}
                                    >
                                        {meta.label}
                                    </span>
                                    <div className="pt-track">
                                        <div
                                            className="pt-fill"
                                            style={{
                                                width: `${pct}%`,
                                                background: p.resolved ? "#10B981" : meta.color,
                                            }}
                                        />
                                    </div>
                                    <span className="pt-count">{p.count} report{p.count !== 1 ? "s" : ""}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-submit">
                    <h3>Submit a Problem</h3>
                    <textarea
                        className="pt-textarea"
                        placeholder="Describe your issue clearly — location, what happened, when it started..."
                        value={newText}
                        onChange={e => setNewText(e.target.value)}
                    />
                    <div className="pt-submit-row">
                        <select
                            className="pt-cat-select"
                            value={newCat}
                            onChange={e => setNewCat(e.target.value)}
                        >
                            {Object.entries(catMeta).filter(([k]) => k !== "all").map(([k, m]) => (
                                <option key={k} value={k}>{m.label}</option>
                            ))}
                        </select>
                        <button
                            className="pt-submit-btn"
                            onClick={submitProblem}
                            disabled={submitting}
                        >
                            {submitting ? "Submitting…" : "Submit Problem →"}
                        </button>
                    </div>
                </div>
            </div>

            {toast && (
                <div className={`pt-toast show ${toast.type}`}>{toast.msg}</div>
            )}
        </div>
    );
}