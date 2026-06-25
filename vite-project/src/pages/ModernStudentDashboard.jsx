import { useState, useEffect, useRef } from "react";

function ModernStudentDashboard() {

    const loginRecords = [
        { name: "Stella Walton", role: "Student", time: "09:12 AM" },
        { name: "John Smith", role: "Teacher", time: "09:30 AM" },
        { name: "Admin Panel", role: "Admin", time: "10:00 AM" },
        { name: "Emma Brown", role: "Student", time: "10:15 AM" },
        { name: "Michael Lee", role: "Teacher", time: "11:05 AM" }
    ];

    const totalStudents = loginRecords.filter(u => u.role === "Student").length;
    const totalTeachers = loginRecords.filter(u => u.role === "Teacher").length;
    const totalAdmins = loginRecords.filter(u => u.role === "Admin").length;

    // Chat
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Welcome back! Need help?", time: new Date().toLocaleTimeString() }
    ]);
    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!query.trim()) return;

        const userMsg = {
            sender: "user",
            text: query,
            time: new Date().toLocaleTimeString()
        };

        const botMsg = {
            sender: "bot",
            text: "Thanks for your question! Our support will respond shortly.",
            time: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMsg, botMsg]);
        setQuery("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 p-8">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold text-indigo-700">
                    Student Analytics Dashboard
                </h1>
                <div className="px-5 py-2 bg-indigo-600 text-white rounded-full shadow-lg">
                    Stella Walton
                </div>
            </div>

            {/* ANALYTICS CARDS */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">

                {[
                    { title: "Students Logged", value: totalStudents, color: "from-indigo-500 to-blue-500" },
                    { title: "Teachers Logged", value: totalTeachers, color: "from-green-400 to-emerald-500" },
                    { title: "Admins Logged", value: totalAdmins, color: "from-pink-400 to-red-500" }
                ].map((card, i) => (
                    <div
                        key={i}
                        className={`bg-gradient-to-r ${card.color} text-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition duration-300`}
                    >
                        <p className="text-lg opacity-80">{card.title}</p>
                        <h2 className="text-4xl font-bold">{card.value}</h2>
                    </div>
                ))}

            </div>

            {/* LOGIN RECORD TABLE */}
            <div className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl mb-12">

                <h2 className="text-2xl font-semibold mb-6 text-indigo-700">
                    Recent Login Activity
                </h2>

                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b text-gray-600">
                            <th className="py-3">Name</th>
                            <th>Role</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loginRecords.map((user, index) => (
                            <tr key={index} className="border-b hover:bg-indigo-50 transition">
                                <td className="py-3">{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* CHAT SECTION */}
            <div className="bg-white p-8 rounded-3xl shadow-xl h-[500px] flex flex-col">

                <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
                    AI Support Assistant
                </h2>

                <div className="flex-1 overflow-y-auto space-y-4 mb-4">

                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`p-4 rounded-2xl max-w-[70%] ${msg.sender === "bot"
                                    ? "bg-indigo-100 text-gray-800"
                                    : "bg-indigo-600 text-white ml-auto"
                                }`}
                        >
                            <p>{msg.text}</p>
                            <span className="text-xs opacity-60 block mt-1">
                                {msg.time}
                            </span>
                        </div>
                    ))}

                    <div ref={chatRef}></div>

                </div>

                <div className="flex gap-3">

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-1 px-4 py-3 rounded-full bg-gray-100 outline-none"
                    />

                    <button
                        onClick={handleSend}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ModernStudentDashboard;


