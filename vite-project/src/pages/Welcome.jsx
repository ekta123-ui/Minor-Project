import { Link } from "react-router-dom";
import {
    GraduationCap,
    Shield,
    BookOpen,
    MapPin,
    Bell,
    Users,
    HelpCircle,
    X,
    Mail,
    Phone,
    AlertCircle,
    LayoutDashboard,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import collegeBg from "../assets/college.jpg";
import video from "../assets/welcome.mp4";

function HelpDeskModal({ onClose }) {
    const [activeTab, setActiveTab] = useState("guide");

    const steps = [
        {
            title: "Login to your portal",
            desc: "Choose Student Portal or Admin Portal from the home screen and sign in with your university credentials.",
        },
        {
            title: "Navigate the campus",
            desc: "Use Campus Navigator to find any room, lab, or facility across all 3 buildings instantly.",
        },
        {
            title: "Report a problem",
            desc: "Open Problem Tracker, describe the issue, choose a location, and submit — you'll get live status updates.",
        },
        {
            title: "Contact a committee",
            desc: "Go to Support Committees to reach the right team — grievance, academic, or welfare.",
        },
        {
            title: "Admins: use the dashboard",
            desc: "Admin Dashboard gives you live stats, reports, and issue management across the campus.",
        },
    ];

    const loginIssues = [
        {
            problem: "Forgot your password?",
            solution:
                "Click 'Forgot Password' on the login page. A reset link will be sent to your registered university email.",
            icon: "🔑",
        },
        {
            problem: "Wrong password / account locked?",
            solution:
                "After 5 failed attempts your account gets locked for 30 minutes. Wait or contact IT support to unlock immediately.",
            icon: "🔒",
        },
        {
            problem: "Never received login credentials?",
            solution:
                "New students receive credentials within 48 hours of admission. If not received, contact the IT Helpdesk or your department office.",
            icon: "📭",
        },
        {
            problem: "Username not recognized?",
            solution:
                "Your username is your university enrollment number (e.g. 2200123456). Check your admission letter or contact the registrar.",
            icon: "👤",
        },
        {
            problem: "Portal not loading / blank screen?",
            solution:
                "Clear your browser cache, try a different browser (Chrome recommended), or check your internet connection.",
            icon: "🌐",
        },
    ];

    const contacts = [
        {
            role: "IT Helpdesk (Login & Technical Issues)",
            email: "ithelpdesk@krmu.edu.in",
            phone: "+91-124-XXXXXXX",
            hours: "Mon–Sat, 9:00 AM – 5:00 PM",
            color: "#3b82f6",
        },
        {
            role: "Student Affairs Office",
            email: "studentaffairs@krmu.edu.in",
            phone: "+91-124-XXXXXXX",
            hours: "Mon–Fri, 10:00 AM – 4:00 PM",
            color: "#8b5cf6",
        },
        {
            role: "Exam & Academic Support",
            email: "academics@krmu.edu.in",
            phone: "+91-124-XXXXXXX",
            hours: "Mon–Fri, 9:00 AM – 5:00 PM",
            color: "#06b6d4",
        },
        {
            role: "Registrar / Enrollment Issues",
            email: "registrar@krmu.edu.in",
            phone: "+91-124-XXXXXXX",
            hours: "Mon–Fri, 10:00 AM – 3:00 PM",
            color: "#10b981",
        },
    ];

    const tabStyle = (tab) => ({
        padding: "6px 14px",
        borderRadius: "8px",
        fontSize: "12px",
        fontWeight: "500",
        cursor: "pointer",
        border: "none",
        background:
            activeTab === tab ? "rgba(59,130,246,0.25)" : "transparent",
        color:
            activeTab === tab ? "#93c5fd" : "rgba(255,255,255,0.45)",
        transition: "all 0.2s",
    });

    return (
        <div
            className="absolute inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.70)" }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg rounded-2xl shadow-2xl flex flex-col"
                style={{
                    background: "rgba(8,18,45,0.97)",
                    border: "0.5px solid rgba(255,255,255,0.12)",
                    maxHeight: "85vh",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 pt-5 pb-4"
                    style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}
                >
                    <div className="flex items-center gap-2">
                        <HelpCircle size={18} className="text-blue-400" />
                        <span className="text-white font-semibold text-base">
                            COLA Help Desk
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <X size={15} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 px-6 pt-3 pb-2">
                    <button style={tabStyle("guide")} onClick={() => setActiveTab("guide")}>
                        📘 Quick Guide
                    </button>
                    <button style={tabStyle("login")} onClick={() => setActiveTab("login")}>
                        🔐 Login Issues
                    </button>
                    <button style={tabStyle("contact")} onClick={() => setActiveTab("contact")}>
                        📞 Contact Us
                    </button>
                </div>

                {/* Scrollable content */}
                <div
                    className="overflow-y-auto px-6 pb-5 pt-2"
                    style={{ scrollbarWidth: "none" }}
                >
                    {activeTab === "guide" && (
                        <div className="flex flex-col gap-3 mt-1">
                            <span
                                className="inline-block text-xs px-3 py-1 rounded-full mb-1 w-fit"
                                style={{
                                    background: "rgba(59,130,246,0.15)",
                                    color: "#93c5fd",
                                    border: "0.5px solid rgba(59,130,246,0.3)",
                                }}
                            >
                                Help Desk · Quick Guide
                            </span>
                            {steps.map((step, i) => (
                                <div
                                    key={i}
                                    className="flex gap-3 items-start p-3 rounded-xl"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "0.5px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div
                                        className="min-w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                                        style={{
                                            background: "rgba(59,130,246,0.2)",
                                            color: "#93c5fd",
                                        }}
                                    >
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium leading-tight mb-0.5">
                                            {step.title}
                                        </p>
                                        <p className="text-gray-400 text-xs leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "login" && (
                        <div className="flex flex-col gap-3 mt-1">
                            <div
                                className="flex items-start gap-3 p-3 rounded-xl mb-1"
                                style={{
                                    background: "rgba(251,191,36,0.08)",
                                    border: "0.5px solid rgba(251,191,36,0.25)",
                                }}
                            >
                                <AlertCircle
                                    size={15}
                                    style={{ color: "#fbbf24", marginTop: "1px", flexShrink: 0 }}
                                />
                                <p
                                    className="text-xs leading-relaxed"
                                    style={{ color: "#fcd34d" }}
                                >
                                    If you cannot log in, do <strong>not</strong> share your
                                    password with anyone. Contact IT Helpdesk directly for
                                    account recovery.
                                </p>
                            </div>

                            {loginIssues.map((issue, i) => (
                                <div
                                    key={i}
                                    className="p-3 rounded-xl"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "0.5px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span style={{ fontSize: "15px" }}>{issue.icon}</span>
                                        <p className="text-white text-sm font-medium">
                                            {issue.problem}
                                        </p>
                                    </div>
                                    <p className="text-gray-400 text-xs leading-relaxed pl-6">
                                        {issue.solution}
                                    </p>
                                </div>
                            ))}

                            <div
                                className="p-3 rounded-xl mt-1"
                                style={{
                                    background: "rgba(59,130,246,0.08)",
                                    border: "0.5px solid rgba(59,130,246,0.25)",
                                }}
                            >
                                <p className="text-xs text-blue-300 font-medium mb-1">
                                    📧 Email IT Helpdesk directly
                                </p>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Send an email to{" "}
                                    <span className="text-blue-400 font-medium">
                                        ithelpdesk@krmu.edu.in
                                    </span>{" "}
                                    with your{" "}
                                    <strong className="text-white">enrollment number</strong>,{" "}
                                    <strong className="text-white">full name</strong>, and a{" "}
                                    <strong className="text-white">
                                        screenshot of the error
                                    </strong>{" "}
                                    (if any). Response within 2–4 working hours.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === "contact" && (
                        <div className="flex flex-col gap-3 mt-1">
                            <span
                                className="inline-block text-xs px-3 py-1 rounded-full mb-1 w-fit"
                                style={{
                                    background: "rgba(59,130,246,0.15)",
                                    color: "#93c5fd",
                                    border: "0.5px solid rgba(59,130,246,0.3)",
                                }}
                            >
                                Support Contacts · KR Mangalam University
                            </span>

                            {contacts.map((c, i) => (
                                <div
                                    key={i}
                                    className="p-3 rounded-xl"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "0.5px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div
                                            className="w-2 h-2 rounded-full shrink-0"
                                            style={{ background: c.color }}
                                        ></div>
                                        <p className="text-white text-sm font-medium">
                                            {c.role}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1 pl-4">
                                        <Mail size={12} className="text-gray-500 shrink-0" />
                                        <a
                                            href={`mailto:${c.email}`}
                                            className="text-blue-400 text-xs"
                                            style={{ textDecoration: "none" }}
                                            onMouseEnter={(e) =>
                                                (e.target.style.textDecoration = "underline")
                                            }
                                            onMouseLeave={(e) =>
                                                (e.target.style.textDecoration = "none")
                                            }
                                        >
                                            {c.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1 pl-4">
                                        <Phone size={12} className="text-gray-500 shrink-0" />
                                        <span className="text-gray-300 text-xs">{c.phone}</span>
                                    </div>
                                    <div className="pl-4">
                                        <span
                                            className="text-xs px-2 py-0.5 rounded-full"
                                            style={{
                                                background: "rgba(255,255,255,0.06)",
                                                color: "rgba(255,255,255,0.4)",
                                            }}
                                        >
                                            🕐 {c.hours}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <div
                                className="p-3 rounded-xl"
                                style={{
                                    background: "rgba(16,185,129,0.08)",
                                    border: "0.5px solid rgba(16,185,129,0.2)",
                                }}
                            >
                                <p
                                    className="text-xs leading-relaxed"
                                    style={{ color: "#6ee7b7" }}
                                >
                                    💡 <strong>Tip:</strong> When emailing support, always
                                    include your{" "}
                                    <strong>enrollment number</strong>,{" "}
                                    <strong>full name</strong>, and{" "}
                                    <strong>department</strong> for a faster response.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Welcome() {
    const canvasRef = useRef(null);
    const [showHelp, setShowHelp] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 0.5,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.1,
        }));

        let animId;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity})`;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            animId = requestAnimationFrame(draw);
        };
        draw();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const features = [
        {
            icon: <MapPin size={18} />,
            label: "Campus Navigator",
            desc: "Find any room instantly",
            path: "/navigator",
            accent: "#3b82f6",
            glow: "rgba(59,130,246,0.3)",
            bg: "rgba(59,130,246,0.08)",
            border: "rgba(59,130,246,0.25)",
            tag: "Live Map",
        },
        {
            icon: <Bell size={18} />,
            label: "Problem Tracker",
            desc: "Report & track issues",
            path: "/problemtrackers",
            accent: "#f59e0b",
            glow: "rgba(245,158,11,0.3)",
            bg: "rgba(245,158,11,0.08)",
            border: "rgba(245,158,11,0.25)",
            tag: "Real-time",
        },
        {
            icon: <Users size={18} />,
            label: "Support Committees",
            desc: "Get help when needed",
            path: "/committees",
            accent: "#8b5cf6",
            glow: "rgba(139,92,246,0.3)",
            bg: "rgba(139,92,246,0.08)",
            border: "rgba(139,92,246,0.25)",
            tag: "6 Teams",
        },
        {
            icon: <LayoutDashboard size={18} />,
            label: "Admin Dashboard",
            desc: "Live stats & insights",
            path: "/superadmindashboard",
            accent: "#10b981",
            glow: "rgba(16,185,129,0.3)",
            bg: "rgba(16,185,129,0.08)",
            border: "rgba(16,185,129,0.25)",
            tag: "Admin Only",
        },
    ];

    return (
        <div
            className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url(${collegeBg})` }}
        >
            {/* Layered dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-blue-950/70 to-black/80"></div>

            {/* Animated particles canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-0"
            />

            {/* Decorative glowing orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Help Desk Modal */}
            {showHelp && <HelpDeskModal onClose={() => setShowHelp(false)} />}

            {/* Main content */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-16 px-6 py-16 max-w-7xl w-full">

                {/* LEFT — Text & Buttons */}
                <div
                    className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg"
                    style={{ animation: "slideUp 0.8s ease both" }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                        KR Mangalam University Portal
                    </div>

                    {/* Heading */}
                    <h1 className="text-6xl md:text-7xl font-black text-white mb-4 leading-none tracking-tight">
                        Welcome to{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage:
                                    "linear-gradient(135deg, #60a5fa, #818cf8, #38bdf8)",
                            }}
                        >
                            COLA
                        </span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-gray-300 text-lg mb-3 leading-relaxed">
                        <span className="text-blue-300 font-semibold">
                            CAMPUS OFFICE LOCATOR ASSISTANT
                        </span>
                    </p>
                    <p className="text-gray-400 text-base mb-10 leading-relaxed">
                        A unified digital portal for students and administrators —
                        navigate campus, report problems, and manage everything in one
                        place.
                    </p>

                    {/* Portal Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
                        <Link
                            to="/student-login"
                            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl
                                text-white font-semibold text-lg shadow-2xl transition-all duration-300
                                hover:scale-105 hover:shadow-blue-500/40 relative overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                            }}
                        >
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl"></div>
                            <GraduationCap
                                size={22}
                                className="group-hover:rotate-12 transition-transform duration-300"
                            />
                            <span>Student Portal</span>
                        </Link>

                        <Link
                            to="/admin-login"
                            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl
                                text-white font-semibold text-lg shadow-2xl transition-all duration-300
                                hover:scale-105 hover:shadow-emerald-400/40 relative overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg, #059669, #0d9488)",
                            }}
                        >
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl"></div>
                            <Shield
                                size={22}
                                className="group-hover:rotate-12 transition-transform duration-300"
                            />
                            <span>Admin Portal</span>
                        </Link>
                    </div>

                    {/* ── REDESIGNED Feature Cards ── */}
                    <div className="grid grid-cols-2 gap-3 w-full">
                        {features.map((f, i) => (
                            <Link
                                to={f.path}
                                key={i}
                                onMouseEnter={() => setHoveredCard(i)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className="relative flex flex-col gap-2 px-4 py-3.5 rounded-2xl
                                    focus:outline-none focus:ring-0 overflow-hidden"
                                style={{
                                    background:
                                        hoveredCard === i ? f.bg : "rgba(255,255,255,0.04)",
                                    border: `1px solid ${hoveredCard === i ? f.border : "rgba(255,255,255,0.09)"}`,
                                    boxShadow:
                                        hoveredCard === i
                                            ? `0 0 20px ${f.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
                                            : "none",
                                    textDecoration: "none",
                                    transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                                    animation: `slideUp 0.8s ease ${0.1 * i + 0.4}s both`,
                                    transform: hoveredCard === i ? "translateY(-2px)" : "none",
                                }}
                            >
                                {/* Subtle top shine on hover */}
                                {hoveredCard === i && (
                                    <div
                                        className="absolute inset-x-0 top-0 h-px"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)`,
                                        }}
                                    />
                                )}

                                {/* Icon + tag row */}
                                <div className="flex items-center justify-between">
                                    <div
                                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                                        style={{
                                            background:
                                                hoveredCard === i
                                                    ? `${f.accent}30`
                                                    : "rgba(255,255,255,0.07)",
                                            color:
                                                hoveredCard === i
                                                    ? f.accent
                                                    : "rgba(255,255,255,0.5)",
                                        }}
                                    >
                                        {f.icon}
                                    </div>

                                    <span
                                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                        style={{
                                            background:
                                                hoveredCard === i
                                                    ? `${f.accent}20`
                                                    : "rgba(255,255,255,0.05)",
                                            color:
                                                hoveredCard === i
                                                    ? f.accent
                                                    : "rgba(255,255,255,0.25)",
                                            border: `1px solid ${
                                                hoveredCard === i
                                                    ? `${f.accent}40`
                                                    : "rgba(255,255,255,0.07)"
                                            }`,
                                            transition: "all 0.25s",
                                        }}
                                    >
                                        {f.tag}
                                    </span>
                                </div>

                                {/* Text */}
                                <div>
                                    <p
                                        className="text-sm font-semibold leading-tight mb-0.5 transition-colors duration-200"
                                        style={{
                                            color: hoveredCard === i ? "#fff" : "rgba(255,255,255,0.85)",
                                        }}
                                    >
                                        {f.label}
                                    </p>
                                    <p
                                        className="text-xs leading-snug transition-colors duration-200"
                                        style={{
                                            color:
                                                hoveredCard === i
                                                    ? "rgba(255,255,255,0.55)"
                                                    : "rgba(255,255,255,0.35)",
                                        }}
                                    >
                                        {f.desc}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Help Desk Button */}
                    <button
                        onClick={() => setShowHelp(true)}
                        className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                            text-blue-300 hover:text-white border border-blue-400/30 hover:border-blue-400/60
                            bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm transition-all duration-200"
                    >
                        <HelpCircle size={16} />
                        Help Desk · How to use this portal
                    </button>
                </div>

                {/* RIGHT — Video */}
                <div
                    className="flex flex-col items-center gap-6"
                    style={{ animation: "slideUp 0.8s ease 0.2s both" }}
                >
                    <div className="relative">
                        <div
                            className="absolute -inset-3 rounded-full blur-xl opacity-60 animate-pulse"
                            style={{
                                background:
                                    "conic-gradient(from 0deg, #3b82f6, #6366f1, #06b6d4, #3b82f6)",
                            }}
                        ></div>
                        <div
                            className="absolute -inset-1 rounded-full"
                            style={{
                                background:
                                    "conic-gradient(from 0deg, #3b82f6, #6366f1, #06b6d4, #3b82f6)",
                            }}
                        ></div>

                        <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl z-10">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover scale-110"
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/30"></div>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-6 text-center">
                        {[
                            { value: "3", label: "Buildings" },
                            { value: "50+", label: "Facilities" },
                            { value: "6", label: "Committees" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <p className="text-2xl font-black text-blue-300">
                                    {stat.value}
                                </p>
                                <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom subtle text */}
            <div className="relative z-10 pb-6 text-gray-500 text-xs text-center">
                © 2025 KR Mangalam University · COLA Platform
            </div>

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default Welcome;

