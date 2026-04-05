import React, { useState } from "react";

const committees = [
    {
        icon: "🛡️",
        color: "#EEF2FF",
        tc: "#4338CA",
        badge: "Confidential",
        title: "Internal Committee (Sexual Harassment)",
        email: "icc@krmangalam.edu.in",
        phone: "0124-2867800 Extn 9289114766",
        desc: "Handles complaints related to sexual harassment on campus. All cases are strictly confidential. You may file a complaint in person, via email, or through the registrar's office.",
        hours: "Mon–Fri, 10 AM – 4 PM",
        room: "Block A, 4th Floor",
    },
    {
        icon: "📋",
        color: "#F0FDF4",
        tc: "#166534",
        badge: "Open to all",
        title: "Student Grievance Redressal Committee",
        email: "grievance.redressal@krmangalam.edu.in",
        phone: "0124-2867800, 8800697004",
        desc: "Address any academic or administrative grievance. Response guaranteed within 7 working days. All students are encouraged to use this channel before escalating.",
        hours: "Mon–Sat, 9 AM – 5 PM",
        room: "Block A, Ground Floor",
    },
    {
        icon: "⚖️",
        color: "#FFF7ED",
        tc: "#9A3412",
        badge: "Discipline",
        title: "Student Discipline Committee",
        email: "student.discipline@krmangalam.edu.in",
        phone: "0124-2867800 Extn 1017",
        desc: "Maintains campus discipline and code of conduct. Students can also report misconduct they witness on campus premises or online platforms.",
        hours: "Mon–Fri, 9 AM – 5 PM",
        room: "Block B, Basement (B515)",
    },
    {
        icon: "🚫",
        color: "#FEF2F2",
        tc: "#991B1B",
        badge: "Urgent",
        title: "Anti-Ragging Committee",
        email: "antiragginghelpline@krmangalam.edu.in",
        phone: "0124-2867800 Extn 1017",
        desc: "Zero tolerance policy on ragging in any form. Incidents must be reported immediately. Anonymous complaints are accepted and taken seriously.",
        hours: "24 × 7 helpline available",
        room: "Block A, Admin Section",
    },
    {
        icon: "✊",
        color: "#FFFBEB",
        tc: "#92400E",
        badge: "Equality",
        title: "Anti-Discrimination & Minority Committee",
        email: "antidiscriminationcell@krmangalam.edu.in",
        phone: "0124-2867800 Extn 1017",
        desc: "Ensures equal treatment for all students regardless of caste, religion, gender, region, or background. Committed to an inclusive campus for everyone.",
        hours: "Mon–Fri, 10 AM – 4 PM",
        room: "Block A, 2nd Floor",
    },
    {
        icon: "💜",
        color: "#FDF4FF",
        tc: "#6B21A8",
        badge: "Safety",
        title: "Gender Sensitization & Safety Committee",
        email: "gssc@krmangalam.edu.in",
        phone: "0124-2867800 Extn 1017",
        desc: "Promotes gender equality and campus safety for all. Organises awareness workshops, self-defence sessions, and sensitisation drives every semester.",
        hours: "Mon–Fri, 9 AM – 5 PM",
        room: "Block A, 2nd Floor",
    },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap');

  .com-page { font-family:'DM Sans',sans-serif; background:#F8F7F4; min-height:100vh; }

  .com-hero {
    background:#0D0F1A;
    padding:48px 32px 52px;
    text-align:center;
  }
  .com-hero h1 {
    font-family:'Playfair Display',serif;
    font-size:clamp(1.8rem,4vw,2.8rem);
    color:#fff;
    margin-bottom:8px;
  }
  .com-hero p { color:rgba(255,255,255,0.5); font-size:0.95rem; }
  .com-hero-badge {
    display:inline-block;
    background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.15);
    color:rgba(255,255,255,0.7);
    padding:5px 16px; border-radius:99px;
    font-size:0.78rem; font-weight:500;
    margin-bottom:18px;
    letter-spacing:0.05em;
    text-transform:uppercase;
  }

  .com-container { max-width:1100px; margin:0 auto; padding:40px 24px; }

  .com-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(320px,1fr));
    gap:18px;
    margin-bottom:28px;
  }

  .com-card {
    background:#fff;
    border:1px solid #E8E6E0;
    border-radius:20px;
    padding:24px;
    transition:transform 0.2s, box-shadow 0.2s;
    cursor:pointer;
    position:relative;
    overflow:hidden;
  }
  .com-card::before {
    content:'';
    position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg,var(--tc),transparent);
    opacity:0; transition:opacity 0.2s;
  }
  .com-card:hover { transform:translateY(-3px); box-shadow:0 12px 40px rgba(0,0,0,0.09); }
  .com-card:hover::before { opacity:1; }
  .com-card.expanded { box-shadow:0 16px 48px rgba(0,0,0,0.12); }

  .com-top { display:flex; align-items:flex-start; gap:14px; margin-bottom:14px; }
  .com-icon-wrap {
    width:44px; height:44px; border-radius:13px;
    display:flex; align-items:center; justify-content:center;
    font-size:20px; flex-shrink:0;
  }
  .com-badge {
    display:inline-block;
    padding:3px 10px; border-radius:99px;
    font-size:11px; font-weight:600;
    margin-bottom:5px;
    letter-spacing:0.03em;
    text-transform:uppercase;
  }
  .com-title { font-size:13.5px; font-weight:600; color:#0D0F1A; line-height:1.45; }

  .com-desc {
    font-size:12.5px; color:#6B7280; line-height:1.65;
    margin-bottom:14px;
    max-height:0; overflow:hidden;
    transition:max-height 0.3s ease;
  }
  .com-card.expanded .com-desc { max-height:200px; }

  .com-divider { height:1px; background:#F0EDE8; margin:12px 0; }

  .com-info { display:flex; flex-direction:column; gap:7px; }
  .com-info-row {
    display:flex; align-items:flex-start; gap:9px;
    font-size:12px; color:#6B7280; line-height:1.5;
  }
  .com-info-row strong { color:#0D0F1A; font-weight:600; }
  .com-info-icon { font-size:13px; flex-shrink:0; margin-top:1px; }

  .com-expand-btn {
    display:flex; align-items:center; gap:5px;
    background:none; border:none; cursor:pointer;
    font-size:11.5px; font-weight:600;
    padding:0; margin-top:12px;
    font-family:inherit;
    transition:opacity 0.15s;
  }
  .com-expand-btn:hover { opacity:0.7; }

  .com-bottom {
    display:grid; grid-template-columns:1fr 1fr; gap:14px;
    margin-top:4px;
  }
  .com-info-box {
    background:#F8F7F4;
    border:1px solid #E8E6E0;
    border-radius:16px;
    padding:18px 20px;
  }
  .com-info-box h3 { font-size:13px; font-weight:600; color:#0D0F1A; margin-bottom:10px; }
  .com-info-box p { font-size:12.5px; color:#6B7280; line-height:1.8; }
  .com-info-box strong { color:#0D0F1A; font-weight:600; }

  .com-emergency {
    background:#0D0F1A;
    border-radius:16px;
    padding:20px 24px;
    display:flex; align-items:center; justify-content:space-between;
    flex-wrap:wrap; gap:12px;
    margin-top:4px;
  }
  .com-emergency-left h3 { font-size:13px; font-weight:600; color:#fff; margin-bottom:3px; }
  .com-emergency-left p { font-size:12px; color:rgba(255,255,255,0.5); }
  .com-emergency-num {
    font-family:'Playfair Display',serif;
    font-size:1.6rem; color:#F43F5E;
    letter-spacing:0.03em;
  }
  .com-emergency-note { font-size:11px; color:rgba(255,255,255,0.4); margin-top:2px; }
`;

export default function Committees() {
    const [expanded, setExpanded] = useState(null);

    return (
        <div className="com-page">
            <style>{styles}</style>

            <div className="com-hero">
                <div className="com-hero-badge">Student Support</div>
                <h1>Support Committees</h1>
                <p>Six dedicated bodies protecting your rights, safety and welfare on campus</p>
            </div>

            <div className="com-container">
                <div className="com-grid">
                    {committees.map((c, i) => (
                        <div
                            key={i}
                            className={`com-card${expanded === i ? " expanded" : ""}`}
                            style={{ "--tc": c.tc }}
                            onClick={() => setExpanded(expanded === i ? null : i)}
                        >
                            <div className="com-top">
                                <div className="com-icon-wrap" style={{ background: c.color }}>
                                    {c.icon}
                                </div>
                                <div>
                                    <div className="com-badge" style={{ background: c.color, color: c.tc }}>
                                        {c.badge}
                                    </div>
                                    <div className="com-title">{c.title}</div>
                                </div>
                            </div>

                            <div className="com-desc">{c.desc}</div>

                            <div className="com-divider" />

                            <div className="com-info">
                                <div className="com-info-row">
                                    <span className="com-info-icon">📧</span>
                                    <strong>{c.email}</strong>
                                </div>
                                <div className="com-info-row">
                                    <span className="com-info-icon">📞</span>
                                    <span>{c.phone}</span>
                                </div>
                                {expanded === i && (
                                    <>
                                        <div className="com-info-row">
                                            <span className="com-info-icon">🕐</span>
                                            <span>{c.hours}</span>
                                        </div>
                                        <div className="com-info-row">
                                            <span className="com-info-icon">📍</span>
                                            <span>{c.room}</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <button
                                className="com-expand-btn"
                                style={{ color: c.tc }}
                                onClick={e => { e.stopPropagation(); setExpanded(expanded === i ? null : i); }}
                            >
                                {expanded === i ? "▲ Show less" : "▼ See details"}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="com-bottom">
                    <div className="com-info-box">
                        <h3>Working Hours</h3>
                        <p>
                            Monday – Friday: <strong>9 AM – 5 PM</strong><br />
                            Saturday: <strong>9 AM – 1 PM</strong><br />
                            Emergency helplines available <strong>24 × 7</strong>
                        </p>
                    </div>
                    <div className="com-info-box">
                        <h3>How to Reach</h3>
                        <p>
                            Central: <strong>0124-2867800</strong><br />
                            Walk-in: Admin block, 4th floor (Block A)<br />
                            Email replies within <strong>2 working days</strong>
                        </p>
                    </div>
                </div>

                <div className="com-emergency">
                    <div className="com-emergency-left">
                        <h3>🚨 Anti-Ragging Helpline (UGC Mandate)</h3>
                        <p className="com-emergency-note">Toll-free · Available 24 × 7 · Completely confidential</p>
                    </div>
                    <div>
                        <div className="com-emergency-num">1800-180-5522</div>
                    </div>
                </div>
            </div>
        </div>
    );
}