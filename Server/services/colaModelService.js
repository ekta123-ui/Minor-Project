// services/colaModelService.js
// COLA model logic ported from Python — no Python runtime needed

const OFFICE_ID_TO_NAME = {
    "1": "ID Card & Identity",
    "2": "Fee & Accounts",
    "3": "Scholarship",
    "4": "Certificates & Bonafide",
    "5": "Hostel",
    "6": "Transport",
    "7": "Medical / Health Center",
    "8": "Library",
    "9": "Academic / Course Registration",
    "10": "Examination Cell",
    "11": "Attendance",
    "12": "Faculty / Teacher",
    "13": "Counselling",
    "14": "IT / Technical Support",
    "15": "Placement & Internship",
    "16": "Admission",
    "17": "Timetable",
    "18": "Safety & Security",
    "19": "Campus Facilities",
    "20": "Complaint & Grievance",
    "21": "Main Reception",
    "22": "Student Activities & Events",
    "23": "Discipline Committee",
};

// From your DB problems table — keywords → office_id
const KEYWORD_TO_OFFICE = {
    // Office 1 - ID Card
    "id": "1", "idcard": "1", "identity": "1", "lost id": "1",
    "damaged card": "1", "new id": "1", "id reissue": "1", "swipe card": "1",
    // Office 2 - Fee
    "fee": "2", "fees": "2", "payment": "2", "pay": "2", "transaction": "2",
    "receipt": "2", "slip": "2", "challan": "2", "accounts": "2",
    "refund": "2", "late fee": "2",
    // Office 3 - Scholarship
    "scholarship": "3", "scholar": "3", "financial aid": "3",
    "stipend": "3", "fee waiver": "3", "disbursement": "3",
    // Office 4 - Certificate
    "bonafide": "4", "certificate": "4", "character certificate": "4",
    "transcript": "4", "marksheet": "4", "provisional": "4",
    "migration": "4", "degree copy": "4",
    // Office 5 - Hostel
    "hostel": "5", "warden": "5", "mess": "5", "curfew": "5",
    "room change": "5",
    // Office 6 - Transport
    "bus": "6", "transport": "6", "shuttle": "6", "pass": "6",
    "route": "6", "bus card": "6",
    // Office 7 - Medical
    "medical": "7", "health": "7", "doctor": "7", "nurse": "7",
    "clinic": "7", "first aid": "7", "injury": "7", "sick": "7",
    "medicine": "7", "emergency": "7", "fever": "7",
    // Office 8 - Library
    "library": "8", "book": "8", "issue book": "8", "return book": "8",
    "fine": "8", "library card": "8", "overdue": "8", "renew book": "8",
    // Office 9 - Academic
    "course": "9", "registration": "9", "add drop": "9", "electives": "9",
    "credits": "9", "subject change": "9", "elective": "9",
    // Office 10 - Exam
    "exam": "10", "exam form": "10", "admit card": "10", "datesheet": "10",
    "revaluation": "10", "backlog": "10", "result": "10",
    "marks correction": "10",
    // Office 11 - Attendance
    "attendance": "11", "absent": "11", "present": "11",
    "attendance correction": "11", "low attendance": "11",
    // Office 12 - Faculty
    "teacher": "12", "faculty": "12", "cabin": "12",
    "faculty issue": "12", "professor": "12",
    // Office 13 - Counselling
    "counselling": "13", "counselor": "13", "support": "13",
    "mental health": "13", "stress": "13", "harassment": "13",
    "ragging": "13", "anxiety": "13",
    // Office 14 - IT
    "technical": "14", "portal": "14", "lms": "14", "login": "14",
    "password": "14", "wifi": "14", "internet": "14", "email": "14",
    "reset password": "14",
    // Office 15 - Placement
    "placement": "15", "internship": "15", "resume": "15", "job fair": "15", "career": "15",
    "training": "15", "job fair": "15", "campus drive": "15",
    "offer letter": "15",
    // Office 16 - Admission
    "admission": "16", "enroll": "16", "enrollment": "16",
    "document upload": "16", "admission form": "16",
    // Office 17 - Timetable
    "timetable": "17", "schedule": "17", "class timing": "17",
    "lecture change": "17", "section change": "17",
    // Office 18 - Security
    "safety": "18", "security": "18", "lost item": "18",
    "theft": "18", "security guard": "18",
    // Office 19 - Facilities
    "canteen": "19", "washroom": "19", "water": "19",
    "parking": "19", "facility": "19", "toilet": "19",
    // Office 20 - Grievance
    "complaint": "20", "grievance": "20", "escalate": "20",
    "report": "20",
    // Office 21 - Reception
    "reception": "21", "hello": "21", "hi": "21", "hey": "21", "inquiry": "21", "help": "21",
    // Office 22 - Events
    "event": "22", "club": "22", "societies": "22", "fest": "22", "cultural": "22",
    // Office 23 - Discipline
    "discipline": "23", "code of conduct": "23", "rules": "23", "fine": "23",
};

// From your DB offices table — office locations
const OFFICE_LOCATIONS = {
    "1": { block: "A", floor: "Ground Floor", room: "101", timings: "9AM–5PM Mon–Sat" },
    "2": { block: "A", floor: "Ground Floor", room: "102", timings: "9AM–5PM Mon–Sat" },
    "3": { block: "B", floor: "1st Floor", room: "201", timings: "9AM–5PM Mon–Sat" },
    "4": { block: "A", floor: "1st Floor", room: "110", timings: "9AM–5PM Mon–Sat" },
    "5": { block: "Hostel Block", floor: "Ground Floor", room: "Warden Room", timings: "8AM–8PM Daily" },
    "6": { block: "C", floor: "Ground Floor", room: "301", timings: "8AM–6PM Mon–Sat" },
    "7": { block: "D", floor: "Ground Floor", room: "Health Center", timings: "9AM–5PM Mon–Sat" },
    "8": { block: "A", floor: "Basement", room: "Library Hall", timings: "9AM–9PM Mon–Sat" },
    "9": { block: "B", floor: "Ground Floor", room: "205", timings: "9AM–5PM Mon–Sat" },
    "10": { block: "B", floor: "2nd Floor", room: "210", timings: "9AM–5PM Mon–Sat" },
    "11": { block: "B", floor: "1st Floor", room: "208", timings: "9AM–5PM Mon–Sat" },
    "12": { block: "A/B/C", floor: "Floors 2–3", room: "A201/B201/C201", timings: "9AM–5PM Mon–Sat" },
    "13": { block: "D", floor: "1st Floor", room: "401", timings: "9AM–5PM Mon–Sat" },
    "14": { block: "C", floor: "Ground Floor", room: "302", timings: "9AM–6PM Mon–Sat" },
    "15": { block: "E", floor: "Ground Floor", room: "501", timings: "9AM–5PM Mon–Sat" },
    "16": { block: "A", floor: "Ground Floor", room: "105", timings: "9AM–5PM Mon–Sat" },
    "17": { block: "B", floor: "2nd Floor", room: "212", timings: "9AM–5PM Mon–Sat" },
    "18": { block: "Main Gate", floor: "Ground Floor", room: "Security Post", timings: "24×7 Always Open" },
    "19": { block: "Admin Block", floor: "Ground Floor", room: "001", timings: "9AM–5PM Mon–Sat" },
    "20": { block: "A", floor: "1st Floor", room: "115", timings: "9AM–5PM Mon–Sat" },
    "21": { block: "A", floor: "Ground Floor", room: "Main Lobby", timings: "8AM–6PM Mon–Sat" },
    "22": { block: "C", floor: "1st Floor", room: "105", timings: "9AM–5PM Mon–Fri" },
    "23": { block: "B", floor: "Basement", room: "B515", timings: "10AM–4PM Mon–Fri" },
};

// From your DB teachers table — coordinators per office
const OFFICE_COORDINATORS = {
    "10": { name: "Dr. Shweta Bansal", email: "shweta.bansal@krmangalam.edu.in", role: "Examination Coordinator", block: "B" },
    "15": { name: "Dr. Surabhi Shanker", email: "surabhi.shanker@krmangalam.edu.in", role: "Training & Placement Coordinator", block: "B" },
    "8": { name: "Dr. Shahjad", email: "shahjad@krmangalam.edu.in", role: "Library Coordinator", block: "B" },
    "9": { name: "Dr. Aman Jatain", email: "aman.jatain@krmangalam.edu.in", role: "Program Coordinator", block: "B" },
    "11": { name: "Dr. Amar Saraswat", email: "amar.saraswat@krmangalam.edu.in", role: "Discipline Coordinator", block: "B" },
    "13": { name: "Dr. Vandna Batra", email: "vandna.batra@krmangalam.edu.in", role: "Timetable Coordinator", block: "B" },
    "17": { name: "Ms. Ruchika Bhakhar", email: "Ruchika.bhakhar@krmangalam.edu.in", role: "Timetable Coordinator", block: "B" },
    "4": { name: "Dr. Aman Jatain", email: "aman.jatain@krmangalam.edu.in", role: "Program Coordinator", block: "B" },
    "3": { name: "Dr. Pankaj Agarwal", email: "dean.soet@krmangalam.edu.in", role: "NAAC Coordinator", block: "B" },
    "16": { name: "Dr. Pankaj Agarwal", email: "dean.soet@krmangalam.edu.in", role: "NAAC Coordinator", block: "B" },
    "12": { name: "Dr. Manish Kumar", email: "manish@krmangalam.edu.in", role: "Program Coordinator", block: "B" },
};

// Intent detection — same logic as Python model
const NAVIGATION_WORDS = new Set(["where", "location", "located", "find", "room", "block", "floor", "directions", "go", "reach", "address"]);
const HELP_WORDS = new Set(["submit", "meet", "contact", "issue", "problem", "form", "permission", "complaint", "how", "help", "apply", "process", "who", "resolve", "get", "need", "what"]);
const TEACHER_WORDS = new Set(["teacher", "faculty", "professor", "sir", "madam", "cabin", "dr", "mr", "ms", "miss"]);
const GREETING_WORDS = new Set(["hello", "hi", "hey", "greetings", "morning", "evening"]);

function normalize(text) {
    return text.toLowerCase().trim();
}

function tokenize(text) {
    return normalize(text).match(/\w+/g) || [];
}

function detectIntent(query) {
    const tokens = new Set(tokenize(query));
    if ([...tokens].some(t => GREETING_WORDS.has(t))) return "greeting";
    if ([...tokens].some(t => TEACHER_WORDS.has(t))) return "teacher";
    if ([...tokens].some(t => HELP_WORDS.has(t))) return "help";
    return "navigation";
}

function detectOfficeId(query) {
    const q = normalize(query);
    const tokens = tokenize(query);

    // Check bigrams first (multi-word keywords)
    const bigrams = [];
    for (let i = 0; i < tokens.length - 1; i++) {
        bigrams.push(`${tokens[i]} ${tokens[i + 1]}`);
    }

    const score = {};
    for (const term of [...tokens, ...bigrams]) {
        const oid = KEYWORD_TO_OFFICE[term];
        if (oid) score[oid] = (score[oid] || 0) + 1;
    }

    if (Object.keys(score).length === 0) return null;
    return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
}

// Main model function — mirrors build_response() from Python
function colaModel(query) {
    const intent = detectIntent(query);
    const officeId = detectOfficeId(query);
    const lines = [];

    if (intent === "greeting") {
        lines.push("👋 Hello! I am COLA, your Campus Assistant. How can I help you today? You can ask me about teachers, room locations, job fairs, or events.");
        
    } else if (intent === "teacher") {
        // Look for name in query
        const stop = new Set(["where", "is", "the", "find", "teacher", "faculty", "professor", "cabin", "of", "for", "sir", "madam"]);
        const nameTokens = tokenize(query).filter(t => !stop.has(t) && t.length > 2);

        // Check against known coordinators by name fragment
        const allCoords = Object.values(OFFICE_COORDINATORS);
        let found = null;
        for (const token of nameTokens) {
            found = allCoords.find(c => c.name.toLowerCase().includes(token));
            if (found) break;
        }

        if (found) {
            lines.push(`👤 Faculty: ${found.name}`);
            lines.push(`   Role: ${found.role}`);
            lines.push(`   Email: ${found.email}`);
            lines.push(`   Block: ${found.block} | Faculty Office Floor 2`);
            lines.push(`   Timings: 9AM–5PM Mon–Sat`);
        } else if (officeId) {
            const coord = OFFICE_COORDINATORS[officeId];
            const loc = OFFICE_LOCATIONS[officeId];
            lines.push(`📋 For '${OFFICE_ID_TO_NAME[officeId]}' queries:`);
            if (coord) {
                lines.push(`   Coordinator: ${coord.name}`);
                lines.push(`   Role: ${coord.role}`);
                lines.push(`   Email: ${coord.email}`);
                lines.push(`   Block: ${coord.block}`);
            }
            if (loc) {
                lines.push(`   Office: Block ${loc.block}, ${loc.floor}, Room ${loc.room}`);
                lines.push(`   Timings: ${loc.timings}`);
            }
        } else {
            lines.push("❓ Could not identify the faculty member. Please provide a name or specific role.");
        }

    } else if (intent === "help") {
        if (officeId) {
            const loc = OFFICE_LOCATIONS[officeId];
            const coord = OFFICE_COORDINATORS[officeId];
            lines.push(`🏢 You need to visit: ${OFFICE_ID_TO_NAME[officeId]}`);
            if (loc) {
                lines.push(`   Block ${loc.block} | ${loc.floor} | Room ${loc.room}`);
                lines.push(`   Timings: ${loc.timings}`);
            }
            if (coord) {
                lines.push(`   Coordinator: ${coord.name} (${coord.role})`);
                lines.push(`   Email: ${coord.email}`);
            }
        } else {
            lines.push("❓ Could not identify the relevant office. Try keywords like:");
            lines.push("   exam, placement, scholarship, library, hostel, transport, attendance, admission…");
        }

    } else {
        // navigation
        if (officeId) {
            const loc = OFFICE_LOCATIONS[officeId];
            const coord = OFFICE_COORDINATORS[officeId];
            lines.push(`📍 Location: ${OFFICE_ID_TO_NAME[officeId]}`);
            if (loc) {
                lines.push(`   Block ${loc.block} | ${loc.floor} | Room ${loc.room}`);
                lines.push(`   Timings: ${loc.timings}`);
            }
            if (coord) {
                lines.push(`   Coordinator: ${coord.name}`);
                lines.push(`   Email: ${coord.email}`);
            }
        } else {
            lines.push("❓ Location not found. Try keywords like:");
            lines.push("   library, exam cell, placement, hostel, canteen, lab, admission…");
        }
    }

    return lines.join("\n");
}

module.exports = { colaModel, detectOfficeId, OFFICE_ID_TO_NAME };