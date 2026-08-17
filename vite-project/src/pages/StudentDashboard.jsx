import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROOT } from "../config/api";

// Hardcoded Data
const TEACHERS = [
    { id: 1001, name: "Dr. Pankaj Agarwal", designation: "Examination Coordinator", email: "dean.soet@krmangalam.edu.in", block: "B" },
    { id: 1002, name: "Dr. Shweta Bansal", designation: "Asst. Professor", email: "shweta.bansal@krmangalam.edu.in", block: "B" },
    { id: 1003, name: "Dr. Aman Jatain", designation: "Program Coordinator", email: "aman.jatain@krmangalam.edu.in", block: "B" },
    { id: 1004, name: "Dr. Meenu", designation: "Internship Coordinator", email: "meenu@krmangalam.edu.in", block: "B" },
    // A sample set of teachers to keep file size reasonable
    { id: 1005, name: "Dr. Swati Gupta", designation: "Examination Coordinator", email: "swati@krmangalam.edu.in", block: "B" },
    { id: 1007, name: "Dr. Amar Saraswat", designation: "Discipline Coordinator", email: "amar.saraswat@krmangalam.edu.in", block: "B" },
    { id: 1010, name: "Dr. Vandna Batra", designation: "Timetable Coordinator", email: "vandna.batra@krmangalam.edu.in", block: "B" },
    { id: 1013, name: "Dr. Surabhi Shanker", designation: "Training & Placement", email: "surabhi.shanker@krmangalam.edu.in", block: "B" },
    { id: 1027, name: "Dr. Shahjad", designation: "Library Coordinator", email: "shahjad@krmangalam.edu.in", block: "B" },
];

const OFFICES = {
    1: { name: "ID Card Office", block: "Block A", room: "Room 101", timings: "9 AM – 5 PM", icon: "🪪", color: "#6366F1" },
    2: { name: "Accounts Office", block: "Block A", room: "Room 102", timings: "9 AM – 5 PM", icon: "💰", color: "#F59E0B" },
    3: { name: "Scholarship Office", block: "Block B", room: "Room 201", timings: "9 AM – 5 PM", icon: "🎓", color: "#10B981" },
    4: { name: "Certificate Section", block: "Block A", room: "Room 110", timings: "9 AM – 5 PM", icon: "📜", color: "#8B5CF6" },
    8: { name: "Central Library", block: "Block A", room: "Basement", timings: "9 AM – 9 PM", icon: "📚", color: "#0EA5E9" },
    10: { name: "Examination Cell", block: "Block B", room: "Room 210", timings: "9 AM – 5 PM", icon: "📝", color: "#F97316" },
    14: { name: "IT Helpdesk", block: "Block C", room: "Room 302", timings: "9 AM – 6 PM", icon: "💻", color: "#7C3AED" },
    15: { name: "Placement", block: "Block E", room: "Room 501", timings: "9 AM – 5 PM", icon: "💼", color: "#D97706" },
};

const SUGGESTIONS = [
    "Where is the Library?",
    "Who is the Examination Coordinator?",
    "I lost my ID card",
    "How to get a bus pass?",
];

const STATUS_META = {
    unsolved: { label: "⏳ Unsolved", color: "#F59E0B", bg: "rgba(245,158,11,.15)" },
    in_progress: { label: "🔄 In Progress", color: "#6366F1", bg: "rgba(99,102,241,.15)" },
    solved: { label: "✅ Solved", color: "#10B981", bg: "rgba(16,185,129,.15)" },
};

export default function StudentDashboard() {
    const navigate = useNavigate();
    const [tab, setTab] = useState("chat");
    
    // Profile State (No Login Required)
    const [studentProfile, setStudentProfile] = useState(() => {
        const saved = localStorage.getItem("cola_student_profile");
        return saved ? JSON.parse(saved) : { name: "", roll: "", isSet: false };
    });

    const [tempName, setTempName] = useState(studentProfile.name);
    const [tempRoll, setTempRoll] = useState(studentProfile.roll);

    const handleSaveProfile = () => {
        if (!tempName.trim() || !tempRoll.trim()) return alert("Please enter both Name and Roll Number.");
        const profile = { name: tempName, roll: tempRoll, isSet: true };
        setStudentProfile(profile);
        localStorage.setItem("cola_student_profile", JSON.stringify(profile));
    };

    // Chat State
    const [msgs, setMsgs] = useState([{
        id: 1, role: "bot", 
        content: "👋 Hi! I'm COLA — your AI Campus Assistant.\n\nI can help you find offices, contact faculty, and navigate the campus. Ask me anything! 🎓",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const chatEndRef = useRef(null);

    // Scroll chat to bottom
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [msgs, typing]);

    const sendMsg = async (text = input) => {
        if (!text.trim() || typing) return;
        const query = text.trim();
        setInput("");
        
        const userMsg = { id: Date.now(), role: "user", content: query, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
        setMsgs(prev => [...prev, userMsg]);
        setTyping(true);

        try {
            // Call backend API
            const res = await fetch(`${API_ROOT}/chat/ai`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, studentId: studentProfile.roll || "guest" })
            });
            const data = await res.json();
            
            const botText = data.content?.[0]?.text || data.reply || "Sorry, I couldn't process that.";
            
            setMsgs(prev => [...prev, {
                id: Date.now() + 1,
                role: "bot",
                content: botText,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            }]);
        } catch (err) {
            // Fallback if backend is offline
            setMsgs(prev => [...prev, {
                id: Date.now() + 1,
                role: "bot",
                content: "⚠️ **Server Offline**\nI cannot connect to the COLA backend right now. Please ensure the server is running on port 5000.",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            }]);
        } finally {
            setTyping(false);
        }
    };

    // Problem Tracker State
    const [problems, setProblems] = useState(() => {
        const saved = localStorage.getItem("cola_problems");
        return saved ? JSON.parse(saved) : [];
    });
    const [probText, setProbText] = useState("");

    const submitProblem = () => {
        if (!probText.trim()) return;
        const newProb = {
            id: Date.now(),
            text: probText,
            status: "unsolved",
            adminReply: "",
            date: new Date().toLocaleDateString()
        };
        const updated = [newProb, ...problems];
        setProblems(updated);
        localStorage.setItem("cola_problems", JSON.stringify(updated));
        setProbText("");
        alert("Problem submitted successfully!");
    };

    // UI Renderers
    if (!studentProfile.isSet) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
                <div className="bg-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl border border-slate-700">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🎓</div>
                        <h1 className="text-2xl font-bold">Welcome to COLA</h1>
                        <p className="text-slate-400 mt-2">Enter your details to access the campus portal. No account required!</p>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                            <input type="text" value={tempName} onChange={e => setTempName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g., John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Roll Number</label>
                            <input type="text" value={tempRoll} onChange={e => setTempRoll(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="e.g., 2021CS01" />
                        </div>
                        <button onClick={handleSaveProfile} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-4">
                            Enter Portal
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 flex overflow-hidden font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0 hidden md:flex">
                <div className="p-6">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                        <span className="text-blue-500">🎓</span> COLA Portal
                    </h2>
                </div>
                
                <div className="px-4 pb-4 border-b border-slate-700 mb-4">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-700">
                        <p className="font-medium text-white truncate">{studentProfile.name}</p>
                        <p className="text-xs text-slate-400">{studentProfile.roll}</p>
                        <button onClick={() => setStudentProfile({...studentProfile, isSet: false})} className="text-xs text-red-400 hover:text-red-300 mt-2">Edit Profile</button>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    <SidebarBtn icon="🤖" label="AI Chatbot" active={tab === "chat"} onClick={() => setTab("chat")} />
                    <SidebarBtn icon="🏢" label="Offices" active={tab === "offices"} onClick={() => setTab("offices")} />
                    <SidebarBtn icon="👨‍🏫" label="Faculty" active={tab === "faculty"} onClick={() => setTab("faculty")} />
                    <SidebarBtn icon="📝" label="Problem Tracker" active={tab === "problems"} onClick={() => setTab("problems")} />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-900">
                {/* Mobile Header */}
                <div className="md:hidden p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold">🎓 COLA</h2>
                    <select value={tab} onChange={e => setTab(e.target.value)} className="bg-slate-900 border border-slate-700 rounded p-1">
                        <option value="chat">Chat</option>
                        <option value="offices">Offices</option>
                        <option value="faculty">Faculty</option>
                        <option value="problems">Tracker</option>
                    </select>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    
                    {/* CHAT TAB */}
                    {tab === "chat" && (
                        <div className="max-w-4xl mx-auto h-full flex flex-col">
                            <div className="bg-slate-800 rounded-2xl border border-slate-700 flex-1 flex flex-col overflow-hidden shadow-xl">
                                {/* Chat Header */}
                                <div className="p-4 border-b border-slate-700 bg-slate-800/80 backdrop-blur">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        COLA Assistant
                                    </h3>
                                </div>
                                
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                    {msgs.map((m) => (
                                        <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 ${m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-700 border border-slate-600"}`}>
                                                <div className="whitespace-pre-wrap font-medium leading-relaxed">{m.content}</div>
                                                <div className={`text-[10px] mt-2 ${m.role === "user" ? "text-blue-200" : "text-slate-400"}`}>{m.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {typing && (
                                        <div className="flex justify-start">
                                            <div className="bg-slate-700 border border-slate-600 rounded-2xl p-4 text-slate-400">
                                                <span className="animate-pulse">Thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>

                                {/* Suggestions */}
                                {msgs.length < 3 && !typing && (
                                    <div className="p-4 flex flex-wrap gap-2">
                                        {SUGGESTIONS.map((s, i) => (
                                            <button key={i} onClick={() => sendMsg(s)} className="text-sm bg-slate-700 hover:bg-slate-600 border border-slate-600 px-3 py-1.5 rounded-full transition-colors">
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Input */}
                                <div className="p-4 bg-slate-800 border-t border-slate-700">
                                    <form onSubmit={(e) => { e.preventDefault(); sendMsg(); }} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Ask about offices, faculty, campus..."
                                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                                        />
                                        <button type="submit" disabled={!input.trim() || typing} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 rounded-xl font-bold transition-colors">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* OFFICES TAB */}
                    {tab === "offices" && (
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">Campus Offices</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.values(OFFICES).map((o, i) => (
                                    <div key={i} className="bg-slate-800 border border-slate-700 p-5 rounded-xl hover:border-slate-500 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: `${o.color}20`, color: o.color }}>{o.icon}</div>
                                            <h3 className="font-bold text-white">{o.name}</h3>
                                        </div>
                                        <div className="space-y-1 text-sm text-slate-300">
                                            <p><span className="text-slate-500">Block:</span> {o.block}</p>
                                            <p><span className="text-slate-500">Room:</span> {o.room}</p>
                                            <p><span className="text-slate-500">Time:</span> {o.timings}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FACULTY TAB */}
                    {tab === "faculty" && (
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">Faculty Directory</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {TEACHERS.map((t, i) => (
                                    <div key={i} className="bg-slate-800 border border-slate-700 p-5 rounded-xl flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xl shrink-0">👨‍🏫</div>
                                        <div>
                                            <h3 className="font-bold text-white">{t.name}</h3>
                                            <p className="text-sm text-blue-400">{t.designation}</p>
                                            <p className="text-sm text-slate-400 mt-1">{t.email}</p>
                                            <p className="text-xs text-slate-500 mt-1">Block {t.block}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PROBLEMS TAB */}
                    {tab === "problems" && (
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">Problem Tracker</h2>
                            
                            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl mb-8">
                                <h3 className="font-bold mb-4">Report an Issue</h3>
                                <textarea 
                                    value={probText}
                                    onChange={e => setProbText(e.target.value)}
                                    placeholder="Describe your issue here..."
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white h-24 mb-4 focus:outline-none focus:border-blue-500"
                                />
                                <button onClick={submitProblem} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                                    Submit Ticket
                                </button>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg border-b border-slate-700 pb-2">Your Tickets</h3>
                                {problems.length === 0 ? (
                                    <p className="text-slate-500 italic">No tickets submitted yet.</p>
                                ) : (
                                    problems.map(p => (
                                        <div key={p.id} className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs text-slate-500">{p.date}</span>
                                                <span className="text-xs px-2 py-1 rounded font-medium" style={{ backgroundColor: STATUS_META[p.status].bg, color: STATUS_META[p.status].color }}>
                                                    {STATUS_META[p.status].label}
                                                </span>
                                            </div>
                                            <p className="text-white">{p.text}</p>
                                            {p.adminReply && (
                                                <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                                                    <p className="text-xs text-blue-400 font-bold mb-1">Admin Reply:</p>
                                                    <p className="text-sm text-slate-300">{p.adminReply}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

function SidebarBtn({ icon, label, active, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-slate-400 hover:bg-slate-700/50 hover:text-white"}`}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{label}</span>
        </button>
    );
}