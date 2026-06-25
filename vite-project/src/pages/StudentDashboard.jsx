import { useState, useRef, useMemo, useCallback, useEffect } from "react";

const SCHOOLS = {
    1: "School of Engineering & Technology",
    2: "School of Management & Commerce",
    3: "School of Law",
    4: "School of Medical & Allied Sciences / Pharmacy",
    5: "School of Physiotherapy",
    6: "School of Liberal Arts & Humanities",
    7: "School of Design & Architecture",
    8: "School of Basic & Applied Sciences",
    9: "School of Journalism & Mass Communication",
    10: "School of Hotel Management",
    11: "School of Education",
    12: "School of Agricultural Sciences",
};

const DEPARTMENTS = {
    1: { name: "Automobile Engineering", school: 1 },
    2: { name: "Civil Engineering", school: 1 },
    3: { name: "Computer Science & Engineering", school: 1 },
    4: { name: "Electronics & Communication Engineering", school: 1 },
    5: { name: "Information Technology", school: 1 },
    6: { name: "Mechanical Engineering", school: 1 },
    7: { name: "Business Administration", school: 2 },
    8: { name: "Business Analytics", school: 2 },
    9: { name: "Commerce", school: 2 },
    10: { name: "Digital Marketing", school: 2 },
    11: { name: "Entrepreneurship", school: 2 },
    12: { name: "Finance", school: 2 },
    13: { name: "Human Resources", school: 2 },
    14: { name: "International Business", school: 2 },
    15: { name: "Marketing", school: 2 },
    16: { name: "Law", school: 3 },
    17: { name: "Medical & Allied Sciences", school: 4 },
    18: { name: "Pharmacy", school: 4 },
    19: { name: "Physiotherapy", school: 5 },
    20: { name: "Economics", school: 6 },
    21: { name: "English", school: 6 },
    22: { name: "Political Science", school: 6 },
    23: { name: "Psychology", school: 6 },
    24: { name: "Architecture", school: 7 },
    25: { name: "Fashion Design", school: 7 },
    26: { name: "Game Design & Animation", school: 7 },
    27: { name: "Interior Design", school: 7 },
    28: { name: "Chemistry", school: 8 },
    29: { name: "Forensic Science", school: 8 },
    30: { name: "Mathematics", school: 8 },
    31: { name: "Physics", school: 8 },
    32: { name: "Journalism & Mass Communication", school: 9 },
    33: { name: "Hotel Management", school: 10 },
    34: { name: "Education", school: 11 },
    35: { name: "Agricultural Sciences", school: 12 },
};

const TEACHERS = [
    { id: 1001, name: "Dr. Pankaj Agarwal", dept_id: 3, designation: "Examination Coordinator", email: "dean.soet@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "NAAC Coordinator" },
    { id: 1002, name: "Dr. Shweta Bansal", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "shweta.bansal@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Examination Coordinator" },
    { id: 1003, name: "Dr. Aman Jatain", dept_id: 3, designation: "Program Coordinator", email: "aman.jatain@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Program Coordinator" },
    { id: 1004, name: "Dr. Meenu", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "meenu@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Internship Coordinator" },
    { id: 1005, name: "Dr. Swati Gupta", dept_id: 3, designation: "Examination Coordinator", email: "swati@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Internship Coordinator" },
    { id: 1006, name: "Dr. Anshu", dept_id: 3, designation: "Senior Lab Assistant", email: "anshu@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Internship/T&P Coordinator" },
    { id: 1007, name: "Dr. Amar Saraswat", dept_id: 3, designation: "Professor", email: "amar.saraswat@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Discipline Coordinator" },
    { id: 1008, name: "Ms. Jyoti Kataria", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "jyoti.kataria@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Project Coordinator" },
    { id: 1009, name: "Ms. Suman", dept_id: 3, designation: "Examination Coordinator", email: "suman@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Examination Coordinator" },
    { id: 1010, name: "Dr. Vandna Batra", dept_id: 3, designation: "Professor", email: "vandna.batra@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Timetable Coordinator" },
    { id: 1011, name: "Ms. Ruchika Bhakhar", dept_id: 3, designation: "Associate Professor", email: "Ruchika.bhakhar@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Timetable Coordinator" },
    { id: 1012, name: "Dr. Saneh Lata Yadav", dept_id: 3, designation: "Assistant Professor", email: "sanehlata.yadav@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Internship Coordinator" },
    { id: 1013, name: "Dr. Surabhi Shanker", dept_id: 3, designation: "Professor", email: "surabhi.shanker@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Training & Placement Coordinator" },
    { id: 1014, name: "Dr. Preeti Rathi", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "preeti.rathi@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Training & Placement Coordinator" },
    { id: 1015, name: "Ms. Neetu Chauhan", dept_id: 3, designation: "Assistant Professor", email: "neetu.chauhan@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "D", coord: "Discipline Coordinator" },
    { id: 1016, name: "Ms. Lucky Verma", dept_id: 3, designation: "Examination Coordinator", email: "lucky.verma@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Project Coordinator" },
    { id: 1017, name: "Dr. Yogita Yashveer Raghav", dept_id: 3, designation: "Professor", email: "yogita.raghav@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "School Event Coordinator" },
    { id: 1018, name: "Ms. Rishika Mehta", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "rishika.mehta@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Alumni Coordinator" },
    { id: 1019, name: "Ms. Mansi Kajal", dept_id: 3, designation: "Technical Assistant", email: "mansi.kajal@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Timetable Coordinator" },
    { id: 1020, name: "Dr. Reenu", dept_id: 3, designation: "Program Coordinator", email: "reenubatra1988@gmail.com", phone: "8615377439", specialization: "CSE", block: "B", coord: "Internship Coordinator" },
    { id: 1021, name: "Ms. Megha Sharma", dept_id: 3, designation: "Assistant Professor", email: "sharmamegha027@gmail.com", phone: "8615377439", specialization: "CSE", block: "B", coord: "Research Coordinator" },
    { id: 1022, name: "Dr. Aarti", dept_id: 3, designation: "Examination Coordinator", email: "aarti.sangwan@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Discipline Coordinator" },
    { id: 1024, name: "Dr. Manish Kumar", dept_id: 3, designation: "Program Coordinator", email: "manish@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Program Coordinator" },
    { id: 1025, name: "Dr. Ravinder Beniwal", dept_id: 3, designation: "Professor", email: "ravinder.beniwal@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "NAAC Coordinator" },
    { id: 1026, name: "Dr. Monika Khatkar", dept_id: 3, designation: "Technical Assistant", email: "monika.khatkar@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "School Placement Coordinator" },
    { id: 1027, name: "Dr. Shahjad", dept_id: 3, designation: "Assistant Professor", email: "shahjad@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Library Coordinator" },
    { id: 1028, name: "Mr. Vishwanil Suman", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "vishwanil.suman@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "NAAC Coordinator" },
    { id: 1029, name: "Mr. Mohammad Aijaz", dept_id: 3, designation: "Examination Coordinator", email: "mohammad.aijaz@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Discipline Coordinator" },
    { id: 1030, name: "Mr. Deepak Kaushik", dept_id: 3, designation: "Lab Assistant", email: "deepak.kaushik@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Examination Coordinator" },
    { id: 1031, name: "Ms. Jyoti Kaurav", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "jyoti.kaurav@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Internship Coordinator" },
    { id: 1032, name: "Ms. Ritu Devi", dept_id: 3, designation: "Project Coordinator", email: "ritu.rani@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Internship Coordinator" },
    { id: 1033, name: "Ms. Jyoti Yadav", dept_id: 3, designation: "Project Coordinator", email: "jyoti.yadav@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Training & Placement Coordinator" },
    { id: 1034, name: "Mr. Rajesh Kumar", dept_id: 3, designation: "Program Coordinator", email: "rajesh.badrana@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "D", coord: "Examination Coordinator" },
    { id: 1036, name: "Dr. Sameer Farooq", dept_id: 3, designation: "Professor", email: "sameer.farooq@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Examination Coordinator" },
    { id: 1037, name: "Dr. Feroz Ahmed", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "feroz.ahmed@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "D", coord: "Training & Placement Coordinator" },
    { id: 1038, name: "Dr. Rupendra Pratap Singh", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "rupendrapratap.singhhada@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Research Coordinator" },
    { id: 1039, name: "Ms. Swati Jain Kansal", dept_id: 3, designation: "Program Coordinator", email: "swati.jain@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "NAAC Coordinator" },
    { id: 1040, name: "Ms. Neha Kaushik", dept_id: 3, designation: "Professor", email: "neha.kaushik@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "NAAC Coordinator" },
    { id: 1042, name: "Mr. Aryan Sharma", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "aryan.sharma@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Project Coordinator" },
    { id: 1044, name: "Dr. Satinder Pal Singh", dept_id: 3, designation: "Associate Professor", email: "satinder.palsingh@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "D", coord: "Discipline Coordinator" },
    { id: 1045, name: "Dr. Shahid Ahmad Wani", dept_id: 3, designation: "Program Coordinator", email: "shahidahmad.wani@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "D", coord: "Research Coordinator" },
    { id: 1046, name: "Mr. Anurag Singh", dept_id: 3, designation: "Assistant Professor", email: "anurag.singh@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Program Coordinator" },
    { id: 1048, name: "Mr. Akash Tiwari", dept_id: 3, designation: "Professor", email: "Akash.t@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "D", coord: "Examination Coordinator" },
    { id: 1049, name: "Ms. Santosh Rani", dept_id: 3, designation: "Professor", email: "santosh.rani@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Discipline Coordinator" },
    { id: 1050, name: "Dr. Shweta Agarwal", dept_id: 3, designation: "Senior Lab Assistant", email: "shweta.agarwal@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Training & Placement Coordinator" },
    { id: 1051, name: "Madhu Yadav", dept_id: 3, designation: "Senior Lab Assistant", email: "madhu.yadav@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Event Coordinator" },
    { id: 1052, name: "Himanshi", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "himanshi.yadav@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Research Coordinator" },
    { id: 1073, name: "Mr. Bhavesh Badani", dept_id: 3, designation: "Asst. Professor (Senior Scale)", email: "mr.bhavesh.badani@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "D", coord: "Discipline Coordinator" },
    { id: 1074, name: "Mr. Nandan", dept_id: 3, designation: "Project Coordinator", email: "mr.nandan@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "D", coord: "Training & Placement Coordinator" },
    { id: 1075, name: "Mohd. Shadab", dept_id: 3, designation: "Project Coordinator", email: "mohd.shadab@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Research Coordinator" },
    { id: 1077, name: "Mr. SP Acharya", dept_id: 3, designation: "Program Coordinator", email: "mr.sp.acharya@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Research Coordinator" },
    { id: 1079, name: "Mr. Himanshu Kaushik", dept_id: 3, designation: "Professor", email: "mr.himanshu.kaushik@krmangalam.edu.in", phone: "8615377439", specialization: "CSE", block: "B", coord: "Discipline Coordinator" },
    { id: 1085, name: "Mr. Love Porwal", dept_id: 3, designation: "Associate Professor", email: "mr.love.porwal@krmangalam.edu.in", phone: "6152206534", specialization: "CSE", block: "B", coord: "Discipline Coordinator" },
    { id: 1086, name: "Mr. Vishal", dept_id: 3, designation: "Lab Assistant", email: "mr.vishal@krmangalam.edu.in", phone: "9050167508", specialization: "CSE", block: "B", coord: "Internship Coordinator" },
];
const OFFICES = {
    1: { name: "ID Card Office", block: "Block A", floor: "Ground Floor", room: "Room 101", timings: "9 AM – 5 PM, Mon–Sat", color: "#6366F1", bg: "rgba(99,102,241,.12)", border: "rgba(99,102,241,.3)", icon: "🪪" },
    2: { name: "Accounts Office", block: "Block A", floor: "Ground Floor", room: "Room 102", timings: "9 AM – 5 PM, Mon–Sat", color: "#F59E0B", bg: "rgba(245,158,11,.12)", border: "rgba(245,158,11,.3)", icon: "💰" },
    3: { name: "Scholarship Office", block: "Block B", floor: "1st Floor", room: "Room 201", timings: "9 AM – 5 PM, Mon–Sat", color: "#10B981", bg: "rgba(16,185,129,.12)", border: "rgba(16,185,129,.3)", icon: "🎓" },
    4: { name: "Certificate Section", block: "Block A", floor: "1st Floor", room: "Room 110", timings: "9 AM – 5 PM, Mon–Sat", color: "#8B5CF6", bg: "rgba(139,92,246,.12)", border: "rgba(139,92,246,.3)", icon: "📜" },
    5: { name: "Hostel Office", block: "Hostel Block", floor: "Ground Floor", room: "Warden Room", timings: "8 AM – 8 PM, Daily", color: "#F43F5E", bg: "rgba(244,63,94,.12)", border: "rgba(244,63,94,.3)", icon: "🏠" },
    6: { name: "Transport Office", block: "Block C", floor: "Ground Floor", room: "Room 301", timings: "8 AM – 6 PM, Mon–Sat", color: "#06B6D4", bg: "rgba(6,182,212,.12)", border: "rgba(6,182,212,.3)", icon: "🚌" },
    7: { name: "Medical Center", block: "Block D", floor: "Ground Floor", room: "Health Center", timings: "9 AM – 5 PM, Mon–Sat", color: "#EF4444", bg: "rgba(239,68,68,.12)", border: "rgba(239,68,68,.3)", icon: "🏥" },
    8: { name: "Central Library", block: "Block A", floor: "Basement", room: "Library Hall", timings: "9 AM – 9 PM, Mon–Sat", color: "#0EA5E9", bg: "rgba(14,165,233,.12)", border: "rgba(14,165,233,.3)", icon: "📚" },
    9: { name: "Academic Section", block: "Block B", floor: "Ground Floor", room: "Room 205", timings: "9 AM – 5 PM, Mon–Sat", color: "#84CC16", bg: "rgba(132,204,22,.12)", border: "rgba(132,204,22,.3)", icon: "📋" },
    10: { name: "Examination Cell", block: "Block B", floor: "2nd Floor", room: "Room 210", timings: "9 AM – 5 PM, Mon–Sat", color: "#F97316", bg: "rgba(249,115,22,.12)", border: "rgba(249,115,22,.3)", icon: "📝" },
    11: { name: "Attendance Office", block: "Block B", floor: "1st Floor", room: "Room 208", timings: "9 AM – 5 PM, Mon–Sat", color: "#EC4899", bg: "rgba(236,72,153,.12)", border: "rgba(236,72,153,.3)", icon: "📅" },
    12: { name: "Faculty / Department", block: "Block C", floor: "Various Floors", room: "Department Rooms", timings: "9 AM – 5 PM, Mon–Sat", color: "#A78BFA", bg: "rgba(167,139,250,.12)", border: "rgba(167,139,250,.3)", icon: "👨‍🏫" },
    13: { name: "Student Counselling", block: "Block D", floor: "1st Floor", room: "Room 401", timings: "9 AM – 5 PM, Mon–Sat", color: "#14B8A6", bg: "rgba(20,184,166,.12)", border: "rgba(20,184,166,.3)", icon: "💬" },
    14: { name: "IT Helpdesk", block: "Block C", floor: "Ground Floor", room: "Room 302", timings: "9 AM – 6 PM, Mon–Sat", color: "#7C3AED", bg: "rgba(124,58,237,.12)", border: "rgba(124,58,237,.3)", icon: "💻" },
    15: { name: "Training & Placement", block: "Block E", floor: "Ground Floor", room: "Room 501", timings: "9 AM – 5 PM, Mon–Sat", color: "#D97706", bg: "rgba(217,119,6,.12)", border: "rgba(217,119,6,.3)", icon: "💼" },
    16: { name: "Admission Department", block: "Block A", floor: "Ground Floor", room: "Room 105", timings: "9 AM – 5 PM, Mon–Sat", color: "#059669", bg: "rgba(5,150,105,.12)", border: "rgba(5,150,105,.3)", icon: "📋" },
    17: { name: "Timetable Office", block: "Block B", floor: "2nd Floor", room: "Room 212", timings: "9 AM – 5 PM, Mon–Sat", color: "#0891B2", bg: "rgba(8,145,178,.12)", border: "rgba(8,145,178,.3)", icon: "🗓️" },
    18: { name: "Security Office", block: "Main Gate", floor: "Ground Floor", room: "Security Post", timings: "24×7 (Always open)", color: "#DC2626", bg: "rgba(220,38,38,.12)", border: "rgba(220,38,38,.3)", icon: "🛡️" },
    19: { name: "Campus Facilities", block: "Admin Block", floor: "Ground Floor", room: "Room 001", timings: "9 AM – 5 PM, Mon–Sat", color: "#65A30D", bg: "rgba(101,163,13,.12)", border: "rgba(101,163,13,.3)", icon: "🏫" },
    20: { name: "Grievance Cell", block: "Block A", floor: "1st Floor", room: "Room 115", timings: "9 AM – 5 PM, Mon–Sat", color: "#BE185D", bg: "rgba(190,24,93,.12)", border: "rgba(190,24,93,.3)", icon: "⚖️" },
    21: { name: "Main Reception", block: "Block A", floor: "Ground Floor", room: "Main Lobby", timings: "8 AM – 6 PM, Mon–Sat", color: "#60A5FA", bg: "rgba(96,165,250,.12)", border: "rgba(96,165,250,.3)", icon: "👋" },
    22: { name: "Student Activities Office", block: "Block C", floor: "1st Floor", room: "Room 105", timings: "9 AM – 5 PM, Mon–Fri", color: "#A855F7", bg: "rgba(168,85,247,.12)", border: "rgba(168,85,247,.3)", icon: "🎉" },
    23: { name: "Discipline Committee Office", block: "Block B", floor: "Basement", room: "B515", timings: "10 AM – 4 PM, Mon–Fri", color: "#EF4444", bg: "rgba(239,68,68,.12)", border: "rgba(239,68,68,.3)", icon: "⚖️" },
};

const TRANSPORT_INFO = `
Bus Timings: Morning pickup 7:00 AM and 8:00 AM. Evening drop 5:00 PM and 6:00 PM.
Bus Pass: Available at Transport Office, Block C Room 301. Fee: ₹200/semester. Bring enrollment card + address proof.
Routes cover: Gurgaon, Sohna, Faridabad, South Delhi, Noida (check Transport Office for specific stops).
Bus complaints or overcrowding → Transport Office, Block C Room 301, Mon–Sat 8 AM–6 PM.
Special shuttle for hostelers: runs between main gate and hostel block every 30 minutes.
`;

const COURSES_SUMMARY = `
School of Engineering & Technology (School 1): B.Tech CSE, B.Tech CSE (AI & ML with IBM & Microsoft support), B.Tech CSE (Robotics & AI), B.Tech CSE (Cybersecurity with EC-Council), B.Tech CSE (Data Science with IBM), B.Tech CSE (Full Stack Dev with ImaginXP), B.Tech CSE (UX/UI with ImaginXP), BCA (AI & Data Science), BCA (Cyber Security with EC-Council), B.Sc. Cyber Security, B.Sc. Data Science, B.Sc. Computer Science with IBM, MCA, MCA (AI & ML), M.Tech CSE, M.Tech Automobile Engineering, PhD programs.
School of Management & Commerce (School 2): BBA (HR, Marketing, Finance, Digital Marketing with IIDE, International Business, Travel & Tourism, Business Analytics with EY, Entrepreneurship with GCEC, ACCA-UK with Grant Thornton, Logistics & Supply Chain with Safexpress), B.Com (Hons.), Integrated BBA-MBA, MBA (Fintech with EY, Digital Marketing with IIDE, HR/Marketing/Finance etc with IBM), PhD.
School of Law (School 3): BBA LL.B., B.A. LL.B., LL.B., LL.M., PhD in Law.
School of Medical & Allied Sciences / Pharmacy (School 4): B.Pharm, B.Sc. Emergency Medical Technology, B.Sc. Respiratory Technology, B.Sc. Cardiovascular Technology, M.Pharm (Pharmaceutics, Pharmacology), PhD, D.Pharm.
School of Physiotherapy (School 5): Bachelor of Physiotherapy (BPT).
School of Liberal Arts & Humanities (School 6): B.A. English, Economics, Psychology, Political Science, B.A. Programme, M.A. Applied Psychology, M.A. English, M.A. Economics, PhD.
School of Design & Architecture (School 7): B.Arch, BFA, B.Des Fashion Design, Interior Design, Game Design & Animation (with ImaginXP), UX/UI & Interaction Design (with ImaginXP).
School of Basic & Applied Sciences (School 8): B.Sc. Physics, Chemistry, Forensic Science, Integrated B.Sc.-M.Sc. Forensic Science, M.Sc. Forensic Science, PhD.
School of Journalism & Mass Communication (School 9): B.A. Journalism & Mass Communication, M.A. Journalism & Mass Communication, PhD.
School of Hotel Management (School 10): B.HMCT.
School of Education (School 11): B.Ed., B.El.Ed., M.A. Education, PhD.
School of Agricultural Sciences (School 12): B.Sc. Agriculture.
`;
function buildSystemPrompt() {
    return `You are COLA (Campus Office Locator Assistant) for KR Mangalam University (KRMU). You are trained on the university's live MySQL database. Answer student queries accurately, concisely, and helpfully.

## SCHOOLS (12 total) (Do not make up data for schools)
1. School of Engineering & Technology
2. School of Management & Commerce
3. School of Legal Studies
4. School of Medical & Allied Sciences
5. School of Physiotherapy and Rehabilitation Sciences
6. School of Liberal Arts
7. School of Architecture & Design
8. School of Basic & Applied Sciences
9. School of Emerging Media & Creator Economy
10. School of Hotel Management & Catering Technology
11. School of Education
12. School of Agricultural Sciences
 
## PROBLEM CATEGORIES & ROUTING (23 categories from DB)
1. ID Card & Identity → id, idcard, identity, lost id, damaged card, new id, swipe card
2. Fee & Accounts → fee, payment, pay, transaction, receipt, challan, refund, late fee
3. Scholarship → scholarship, scholar, financial aid, stipend, fee waiver, disbursement
4. Bonafide / Certificate → bonafide, certificate, character certificate, transcript, marksheet, provisional, migration, degree copy
5. Hostel → hostel, warden, room, mess, food, water, electricity, curfew, room change
6. Transport & Bus → bus, transport, shuttle, pass, route, timing, schedule, bus card
7. Medical / Health → medical, health, doctor, nurse, clinic, first aid, injury, sick, medicine
8. Library → library, book, issue book, return book, fine, library card, study area, overdue
9. Academic / Course → course, registration, add drop, electives, credits, subject change
10. Exam & Exam Form → exam, exam form, admit card, datesheet, revaluation, backlog, result, marks
11. Attendance → attendance, absent, present, update attendance, attendance correction
12. Teacher / Faculty → teacher, faculty, cabin, meet teacher, appointment, faculty room
13. Counselling → counselling, counselor, support, mental health, stress, harassment, ragging
14. IT / Technical → technical, portal, lms, login, password, wifi, internet, email, reset password
15. Placement & Internship → placement, internship, resume, training, job fair, campus drive, offer letter
16. Admission & Enrollment → admission, enroll, enrollment, document upload, admission form
17. Timetable → timetable, schedule, class timing, lecture change, class change, section change
18. Safety & Security → safety, security, lost item, theft, emergency, security guard
19. Campus Facilities → water cooler, washroom, toilet, canteen, parking, campus facility
20. Complaint & Grievance → complaint, grievance, issue, report, feedback, escalate
21. General Inquiry / Reception → reception, inquiry, general help, front desk, visitor
22. Student Activities / Events → events, activities, clubs, societies, cultural, sports, festival
23. Discipline / Code of Conduct → discipline, code of conduct, rules, regulations, misconduct, college code

## CAMPUS OFFICES (23 offices with exact locations from DB)
1. ID Card Office → Block A, Ground Floor, Room 101 | 9AM–5PM Mon–Sat
2. Accounts Office → Block A, Ground Floor, Room 102 | 9AM–5PM Mon–Sat
3. Scholarship Office → Block B, 1st Floor, Room 201 | 9AM–5PM Mon–Sat
4. Certificate Section → Block A, 1st Floor, Room 110 | 9AM–5PM Mon–Sat
5. Hostel Office → Hostel Block, Ground Floor, Warden Room | 8AM–8PM Daily
6. Transport Office → Block C, Ground Floor, Room 301 | 8AM–6PM Mon–Sat
7. Medical Center → Block D, Ground Floor, Health Center | 9AM–5PM Mon–Sat
8. Central Library → Block A, Basement, Library Hall | 9AM–9PM Mon–Sat
9. Academic Section → Block B, Ground Floor, Room 205 | 9AM–5PM Mon–Sat
10. Examination Cell → Block B, 2nd Floor, Room 210 | 9AM–5PM Mon–Sat
11. Attendance Office → Block B, 1st Floor, Room 208 | 9AM–5PM Mon–Sat
12. Faculty / Department → Block A/B/C, Floors 2–3, Rooms A201/B201/C201 | 9AM–5PM Mon–Sat
13. Student Counselling → Block D, 1st Floor, Room 401 | 9AM–5PM Mon–Sat
14. IT Helpdesk → Block C, Ground Floor, Room 302 | 9AM–6PM Mon–Sat
15. Training & Placement → Block E, Ground Floor, Room 501 | 9AM–5PM Mon–Sat
16. Admission Department → Block A, Ground Floor, Room 105 | 9AM–5PM Mon–Sat
17. Timetable Office → Block B, 2nd Floor, Room 212 | 9AM–5PM Mon–Sat
18. Security Office → Main Gate, Ground Floor, Security Post | 24×7 Always Open
19. Campus Facilities → Admin Block, Ground Floor, Room 001 | 9AM–5PM Mon–Sat
20. Grievance Cell → Block A, 1st Floor, Room 115 | 9AM–5PM Mon–Sat
21. Main Reception → Block A, Ground Floor, Main Lobby | 8AM–6PM Mon–Sat
22. Student Activities Office → Block C, 1st Floor, Room 105 | 9AM–5PM Mon–Fri
23. Discipline Committee Office → Block B, Basement, B515 | 10AM–4PM Mon–Fri

## FACULTY OFFICES (from DB offices table)
All faculty sit in Faculty Offices across Blocks A, B, C on Floors 2–3:
- Block A Floor 2: Rooms A201 (Desks 1–8), A202 (Desks 25–32), A203 (Desks 49–56) | 9AM–5PM
- Block B Floor 2: Rooms B201 (Desks 9–16), B202 (Desks 33–40), B203 (Desks 57–64) | 9AM–5PM
- Block C Floor 2: Rooms C201 (Desks 17–24), C202 (Desks 41–48), C203 (Desks 65–72) | 9AM–5PM
- Block A Floor 3: Room A301 (Desks 73–80) | Block B Floor 3: Room B301 (Desks 81–86)

## KEY COORDINATORS (real faculty from DB)
Examination Coordinator: Dr. Shweta Bansal (shweta.bansal@krmangalam.edu.in) — Block B | Ms. Suman (suman@krmangalam.edu.in) — Block B | Dr. Pankaj Agarwal (dean.soet@krmangalam.edu.in) — Block B
Training & Placement Coordinator: Dr. Surabhi Shanker (surabhi.shanker@krmangalam.edu.in) — Block B | Dr. Preeti Rathi (preeti.rathi@krmangalam.edu.in) — Block B | Dr. Shweta Agarwal (shweta.agarwal@krmangalam.edu.in) — Block B
Internship Coordinator: Dr. Meenu (meenu@krmangalam.edu.in) — Block B | Dr. Swati Gupta (swati@krmangalam.edu.in) — Block B | Dr. Anshu (anshu@krmangalam.edu.in) — Block B
Timetable Coordinator: Dr. Vandna Batra (vandna.batra@krmangalam.edu.in) — Block B | Ms. Ruchika Bhakhar (Ruchika.bhakhar@krmangalam.edu.in) — Block B | Ms. Mansi Kajal (mansi.kajal@krmangalam.edu.in) — Block B
Program Coordinator: Dr. Aman Jatain (aman.jatain@krmangalam.edu.in) — Block B | Dr. Manish Kumar (manish@krmangalam.edu.in) — Block B
Project Coordinator: Ms. Jyoti Kataria (jyoti.kataria@krmangalam.edu.in) — Block B | Ms. Lucky Verma (lucky.verma@krmangalam.edu.in) — Block B
Research Coordinator: Dr. Rupendra Pratap Singh (rupendrapratap.singhhada@krmangalam.edu.in) — Block B
NAAC Coordinator: Dr. Pankaj Agarwal (dean.soet@krmangalam.edu.in) — Block B | Dr. Ravinder Beniwal (ravinder.beniwal@krmangalam.edu.in) — Block B
Discipline Coordinator: Dr. Amar Saraswat (amar.saraswat@krmangalam.edu.in) — Block B | Ms. Neetu Chauhan (neetu.chauhan@krmangalam.edu.in) — Block D
Library Coordinator: Dr. Shahjad (shahjad@krmangalam.edu.in) — Block B
Alumni Coordinator: Ms. Rishika Mehta (rishika.mehta@krmangalam.edu.in) — Block B
Event Coordinator: Madhu Yadav (madhu.yadav@krmangalam.edu.in) — Block B
School Placement Coordinator: Dr. Monika Khatkar (monika.khatkar@krmangalam.edu.in) — Block B

## FULL FACULTY LIST (86 real teachers from DB)
Dr. Pankaj Agarwal | NAAC Coordinator | Block B | dean.soet@krmangalam.edu.in | 8615377439
Dr. Shweta Bansal | Examination Coordinator | Block B | shweta.bansal@krmangalam.edu.in | 8615377439
Dr. Aman Jatain | Program Coordinator | Block B | aman.jatain@krmangalam.edu.in | 8615377439
Dr. Meenu | Internship Coordinator | Block B | meenu@krmangalam.edu.in | 8615377439
Dr. Swati Gupta | Internship Coordinator | Block B | swati@krmangalam.edu.in | 8615377439
Dr. Anshu | Internship/T&P Coordinator | Block B | anshu@krmangalam.edu.in | 8615377439
Dr. Amar Saraswat | Discipline Coordinator | Block B | amar.saraswat@krmangalam.edu.in | 8615377439
Ms. Jyoti Kataria | Project Coordinator | Block B | jyoti.kataria@krmangalam.edu.in | 8615377439
Ms. Suman | Examination Coordinator | Block B | suman@krmangalam.edu.in | 8615377439
Dr. Vandna Batra | Timetable Coordinator | Block B | vandna.batra@krmangalam.edu.in | 8615377439
Ms. Ruchika Bhakhar | Timetable Coordinator | Block B | Ruchika.bhakhar@krmangalam.edu.in | 8615377439
Dr. Saneh Lata Yadav | Internship Coordinator | Block B | sanehlata.yadav@krmangalam.edu.in | 8615377439
Dr. Surabhi Shanker | Training & Placement Coordinator | Block B | surabhi.shanker@krmangalam.edu.in | 8615377439
Dr. Preeti Rathi | Training & Placement Coordinator | Block B | preeti.rathi@krmangalam.edu.in | 8615377439
Ms. Neetu Chauhan | Discipline Coordinator | Block D | neetu.chauhan@krmangalam.edu.in | 8615377439
Ms. Lucky Verma | Project Coordinator | Block B | lucky.verma@krmangalam.edu.in | 8615377439
Dr. Yogita Yashveer Raghav | School Event Coordinator | Block B | yogita.raghav@krmangalam.edu.in | 8615377439
Ms. Rishika Mehta | Alumni Coordinator | Block B | rishika.mehta@krmangalam.edu.in | 8615377439
Ms. Mansi Kajal | Timetable Coordinator | Block B | mansi.kajal@krmangalam.edu.in | 8615377439
Dr. Reenu | Internship Coordinator | Block B | reenubatra1988@gmail.com | 8615377439
Ms. Megha Sharma | Research Coordinator | Block B | sharmamegha027@gmail.com | 8615377439
Dr. Aarti | Discipline Coordinator | Block B | aarti.sangwan@krmangalam.edu.in | 8615377439
Ms. Kriti Sharma | Prism e-magazine | Block B | kriti.s@krmangalam.edu.in | 8615377439
Dr. Manish Kumar | Program Coordinator | Block B | manish@krmangalam.edu.in | 8615377439
Dr. Ravinder Beniwal | NAAC Coordinator | Block B | ravinder.beniwal@krmangalam.edu.in | 8615377439
Dr. Monika Khatkar | School Placement Coordinator | Block B | monika.khatkar@krmangalam.edu.in | 8615377439
Dr. Shahjad | Library Coordinator | Block B | shahjad@krmangalam.edu.in | 8615377439
Mr. Vishwanil Suman | NAAC Coordinator | Block B | vishwanil.suman@krmangalam.edu.in | 8615377439
Mr. Mohammad Aijaz | Discipline Coordinator | Block B | mohammad.aijaz@krmangalam.edu.in | 8615377439
Mr. Deepak Kaushik | Examination Coordinator | Block B | deepak.kaushik@krmangalam.edu.in | 8615377439
Ms. Jyoti Kaurav | Internship Coordinator | Block B | jyoti.kaurav@krmangalam.edu.in | 8615377439
Ms. Ritu Devi | Internship Coordinator | Block B | ritu.rani@krmangalam.edu.in | 8615377439
Ms. Jyoti Yadav | Training & Placement Coordinator | Block B | jyoti.yadav@krmangalam.edu.in | 8615377439
Mr. Rajesh Kumar | Examination Coordinator | Block D | rajesh.badrana@krmangalam.edu.in | 8615377439
Dr. Sameer Farooq | Examination Coordinator | Block B | sameer.farooq@krmangalam.edu.in | 8615377439
Dr. Feroz Ahmed | Training & Placement Coordinator | Block D | feroz.ahmed@krmangalam.edu.in | 8615377439
Dr. Rupendra Pratap Singh | Research Coordinator | Block B | rupendrapratap.singhhada@krmangalam.edu.in | 8615377439
Ms. Swati Jain Kansal | NAAC Coordinator | Block B | swati.jain@krmangalam.edu.in | 8615377439
Ms. Neha Kaushik | NAAC Coordinator | Block B | neha.kaushik@krmangalam.edu.in | 8615377439
Mr. Aryan Sharma | Project Coordinator | Block B | aryan.sharma@krmangalam.edu.in | 8615377439
Dr. Satinder Pal Singh | Discipline Coordinator | Block D | satinder.palsingh@krmangalam.edu.in | 8615377439
Dr. Shahid Ahmad Wani | Research Coordinator | Block D | shahidahmad.wani@krmangalam.edu.in | 8615377439
Mr. Anurag Singh | Program Coordinator | Block B | anurag.singh@krmangalam.edu.in | 8615377439
Mr. Akash Tiwari | Examination Coordinator | Block D | Akash.t@krmangalam.edu.in | 8615377439
Ms. Santosh Rani | Discipline Coordinator | Block B | santosh.rani@krmangalam.edu.in | 8615377439
Dr. Shweta Agarwal | Training & Placement Coordinator | Block B | shweta.agarwal@krmangalam.edu.in | 8615377439
Madhu Yadav | Event Coordinator | Block B | madhu.yadav@krmangalam.edu.in | 8615377439
Himanshi | Research Coordinator | Block B | himanshi.yadav@krmangalam.edu.in | 8615377439
Mr. Bhavesh Badani | Discipline Coordinator | Block D | mr..bhavesh.badani48krmangalam.edu.in | 8615377439
Mr. Nandan | Training & Placement Coordinator | Block D | mr..nandan65krmangalam.edu.in | 8615377439
Mr. SP Acharya | Research Coordinator | Block B | mr..sp.acharya29krmangalam.edu.in | 8615377439
Mr. Himanshu Kaushik | Discipline Coordinator | Block B | mr..himanshu.kaushik83krmangalam.edu.in | 8615377439
Mr. Love Porwal | Discipline Coordinator | Block B | mr..love.porwal40krmangalam.edu.in | 6152206534
Mr. Vishal | Internship Coordinator | Block B | mr..vishal17krmangalam.edu.in | 9050167508

## COURSES (108 courses across 12 schools — sample)
School 1 (Engineering): B.Tech CSE, B.Tech CSE AI&ML (IBM/Microsoft), B.Tech CSE Robotics&AI, B.Tech CSE Cybersecurity (EC-Council), B.Tech CSE Data Science (IBM), B.Tech CSE Full Stack (ImaginXP), B.Tech CSE UX/UI (ImaginXP), BCA AI&DS (IBM/Microsoft), BCA Cybersecurity (EC-Council), B.Sc Cyber Security, B.Sc Data Science, B.Sc CS (IBM), MCA, MCA AI&ML, M.Tech CSE, M.Tech Automobile Engg, PhD CSE, PhD Mechanical
School 2 (Management): BBA HR/Marketing/Finance/Digital Marketing/International Business/Travel&Tourism/Business Analytics(EY)/Entrepreneurship(GCEC)/ACCA-UK(Grant Thornton)/Logistics(Safexpress), B.Com Hons, Integrated BBA-MBA, MBA Fintech(EY)/Digital Marketing(IIDE)/HR/Marketing/Finance/IB(IBM), PhD Management, PhD Commerce
School 3 (Law): BBA LLB, BA LLB, LLB, LLM, PhD Law
School 4 (Medical): B.Pharm, B.Sc Emergency Medical Technology, B.Sc Respiratory Technology, B.Sc Cardiovascular Technology, M.Pharm Pharmaceutics/Pharmacology, PhD Pharmaceutical Sciences, D.Pharm
School 5 (Physiotherapy): BPT (Bachelor of Physiotherapy)
School 6 (Liberal Arts): BA English/Economics/Psychology/Political Science, BA Programme, MA Applied Psychology/English/Economics, PhD Psychology/Economics/English
School 7 (Architecture & Design): B.Arch, BFA, B.Des Fashion Design/Interior Design/Game Design&Animation(ImaginXP)/UX-UI(ImaginXP)
School 8 (Sciences): B.Sc Physics/Chemistry/Forensic Science, Integrated BSc-MSc Forensic Science, MSc Forensic Science, PhD Forensic Science/Chemistry/Physics/Mathematics
School 9 (Media): BA Journalism & Mass Communication, MA Journalism & Mass Communication, PhD
School 10 (Hotel): B.HMCT
School 11 (Education): B.Ed, B.El.Ed, MA Education, PhD Education
School 12 (Agriculture): B.Sc Agriculture

## TRANSPORT
Bus Timings: Morning pickup 7:00 AM and 8:00 AM. Evening drop 5:00 PM and 6:00 PM.
Bus Pass: Available at Transport Office, Block C Room 301. Fee: ₹200/semester. Bring enrollment card + address proof.
Routes: Gurgaon, Sohna, Faridabad, South Delhi, Noida.
Special hostel shuttle: every 30 minutes between main gate and hostel block.
Complaints → Transport Office, Block C Room 301, Mon–Sat 8AM–6PM.

## SYNONYMS (for better matching)
id card = identity card, lost id, damaged card | fee = payment, challan, receipt, refund
scholarship = stipend, financial aid, fee waiver | certificate = bonafide, marksheet, provisional
hostel = warden, mess, room | transport = bus, shuttle, pass, route
medical = clinic, doctor, health center | library = book, issue book, return book
exam = admit card, datesheet, result | attendance = absent, attendance correction
teacher = faculty, professor, faculty room | counselling = counselor, support, grievance
technical = it support, portal, wifi, reset password | placement = internship, job, resume, campus drive

## RESPONSE RULES
- Always mention Block, Room/Floor, and Timings.
- For teacher/faculty queries: give name, email, coordinatorship, block.
- For problem routing: identify the correct office from the 20 categories.
- For course queries: mention exact school and available specialisations.
- Never make up data. If uncertain, direct to most relevant office.
- Keep responses under 150 words unless listing multiple items.
- End with quick reference: Office → Block → Room → Timings.`;
}
const SUGGESTIONS = [
    "Where is Transport Office?",
    "Who is Priya Sharma teacher?",
    "I lost my student ID card",
    "Where do BCA classes happen?",
    "Bus timings for evening?",
    "How to get bonafide certificate?",
    "Which school offers BBA Finance?",
    "Where is Examination Cell?",
    "Low attendance — what to do?",
    "Portal password not working",
    "How to apply for scholarship?",
    "Where is MBA department?",
];

const STATUS_META = {
    unsolved: { label: "⏳ Unsolved", color: "#F59E0B", bg: "rgba(245,158,11,.15)" },
    in_progress: { label: "🔄 In Progress", color: "#6366F1", bg: "rgba(99,102,241,.15)" },
    solved: { label: "✅ Solved", color: "#10B981", bg: "rgba(16,185,129,.15)" },
};

const CAT_META = {
    wifi: { label: "WiFi / IT", color: "#6366F1" },
    facility: { label: "Facility", color: "#F59E0B" },
    admin: { label: "Admin", color: "#06B6D4" },
    transport: { label: "Transport", color: "#10B981" },
    academic: { label: "Academic", color: "#8B5CF6" },
    safety: { label: "Safety", color: "#F43F5E" },
    other: { label: "Other", color: "#94A3B8" },
};

const INITIAL_PROBLEMS = [];
// ── FEEDBACK DATA ─────────────────────────────────────────────────────────────
const FEEDBACK_CATEGORIES = [
    { id: "chat", label: "AI Chat", icon: "🤖" },
    { id: "navigation", label: "Navigation", icon: "🧭" },
    { id: "faculty", label: "Faculty Info", icon: "👨‍🏫" },
    { id: "offices", label: "Office Info", icon: "🏢" },
    { id: "transport", label: "Transport", icon: "🚌" },
    { id: "general", label: "General", icon: "⭐" },
];

const INITIAL_FEEDBACKS = [];

function quickClassify(q) {
    const t = q.toLowerCase();
    if (/hello|hi|hey|reception|inquiry/.test(t)) return 21;
    if (/\bid\b|identity|idcard/.test(t)) return 1;
    if (/fee|payment|challan|accounts|refund/.test(t)) return 2;
    if (/scholar/.test(t)) return 3;
    if (/bonafide|certificate|transcript|marksheet|migration|degree/.test(t)) return 4;
    if (/hostel|warden|mess|curfew/.test(t)) return 5;
    if (/bus|transport|shuttle|route|pass/.test(t)) return 6;
    if (/medical|health|doctor|sick|fever|injur/.test(t)) return 7;
    if (/library|book|borrow/.test(t)) return 8;
    if (/course|register|elective|credit/.test(t)) return 9;
    if (/exam|admit|result|revaluat|backlog|datesheet/.test(t)) return 10;
    if (/attendance|absent/.test(t)) return 11;
    if (/teacher|faculty|professor|cabin|sit/.test(t)) return 12;
    if (/counsel|stress|anxiety|rag/.test(t)) return 13;
    if (/wifi|portal|password|login|lms|internet/.test(t)) return 14;
    if (/placement|internship|resume|job fair|career/.test(t)) return 15;
    if (/admission|enroll/.test(t)) return 16;
    if (/timetable|schedule|class timing/.test(t)) return 17;
    if (/security|safety|theft|lost item/.test(t)) return 18;
    if (/canteen|washroom|water|parking|facility/.test(t)) return 19;
    if (/complaint|grievance/.test(t)) return 20;
    if (/event|activity|club|society|cultural|sports|festival/.test(t)) return 22;
    if (/discipline|code of conduct|rules|regulations|misconduct/.test(t)) return 23;
    return null;
}

export default function COLADashboard() {
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const role = localStorage.getItem("role");
        if (isLoggedIn !== "true" || role !== "student") {
            window.location.href = "/student-login";
        }
    }, []);
    const [tab, setTab] = useState("chat");

    // Chat state
    const [msgs, setMsgs] = useState([{
        id: 1, role: "bot", officeId: null,
        content: "👋 Hi! I'm COLA — your AI-powered Campus Office Locator for KR Mangalam University.\n\nI'm trained on the live university database with:\n• 8,000+ student problems & solutions\n• 202 faculty members across 35 departments\n• 12 schools & 108 courses\n• Transport routes, timings & bus passes\n• All 23 campus offices\n\nAsk me anything — teacher names, bus timings, departments, scholarships, ID cards, exams! 🎓",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const endRef = useRef(null);

    // Problems state
    const [probName, setProbName] = useState("");
    const [probRoll, setProbRoll] = useState("");
    const [probText, setProbText] = useState("");
    const [probCat, setProbCat] = useState("wifi");
    const [problems, setProblems] = useState(INITIAL_PROBLEMS);
    // Fetch student problems with email guard + auto-refresh
    const fetchStudentProblems = useCallback(() => {
        const userEmail = localStorage.getItem("email");
        if (!userEmail) return;

        fetch(`http://localhost:5000/api/problems/student-problems/${encodeURIComponent(userEmail)}`)
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const mapped = data.map(p => {
                        const oid = quickClassify(p.problemText || '');
                        const o = oid ? OFFICES[oid] : null;
                        return {
                            id: p.problem_id,
                            name: p.studentEmail,
                            roll: p.studentEmail,
                            text: p.problemText,
                            status: p.status || "unsolved",
                            adminReply: p.adminReply || "",
                            office: o?.name || "Admin Office",
                            icon: o?.icon || "🏢",
                            color: o?.color || "#94A3B8",
                            bg: o?.bg || "rgba(148,163,184,.1)",
                            border: o?.border || "rgba(148,163,184,.25)",
                        };
                    });
                    setProblems(mapped);
                }
            })
            .catch(err => console.error("Failed to load problems:", err));
    }, []);

    useEffect(() => {
        fetchStudentProblems();
        const iv = setInterval(fetchStudentProblems, 10000); // refresh every 10s
        return () => clearInterval(iv);
    }, [fetchStudentProblems]);
    const [ptCat, setPtCat] = useState("all");

    // Feedback state
    const [feedbacks, setFeedbacks] = useState(INITIAL_FEEDBACKS);
    const [fbName, setFbName] = useState("");
    const [fbRoll, setFbRoll] = useState("");

    const fetchFeedbacks = useCallback(() => {
        fetch("http://localhost:5000/api/feedback/all-feedback")
            .then(res => res.json())
            .then(data => { if (Array.isArray(data)) setFeedbacks(data); })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);
    const [fbCat, setFbCat] = useState("general");
    const [fbRating, setFbRating] = useState(0);
    const [fbHover, setFbHover] = useState(0);
    const [fbText, setFbText] = useState("");
    const [fbFilter, setFbFilter] = useState("all");

    // Teacher search
    const [searchTeacher, setSearchTeacher] = useState("");

    const [toast, setToast] = useState(null);

    const scroll = () => setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
    const showToast = (msg, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000); };

    const send = useCallback(async (text) => {
        const q = (text || input).trim();
        if (!q) return;
        if (typing) { showToast("Please wait — COLA is thinking…", false); return; }

        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMsgs(p => [...p, { id: Date.now(), role: "user", content: q, officeId: null, time }]);
        setInput("");
        setTyping(true);
        scroll();

        try {
            const response = await fetch("http://localhost:5000/api/chat/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: q,
                    studentId: localStorage.getItem("email"),
                    systemPrompt: buildSystemPrompt(),
                }),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err?.error?.message || `HTTP ${response.status}`);
            }

            const data = await response.json();
            const content =
                data?.content?.[0]?.text ||
                "I am working on this. Your query has been noted for future improvements.";
            const officeId = quickClassify(q);
            setMsgs(p => [...p, {
                id: Date.now() + 1,
                role: "bot",
                content,
                officeId: null,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                }),
            }]);
        } catch (err) {
            console.error("COLA API error:", err);
            setMsgs(p => [...p, {
                id: Date.now() + 1, role: "bot", officeId: null,
                content: "I am working on this. Your query has been noted for future improvements. For urgent help, please visit Block A Reception.",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }]);
        }
        setTyping(false);
        scroll();
    }, [input, typing]);

    const submitProblem = async () => {
        if (!probName.trim()) return showToast("Please enter your name.", false);
        if (!probText.trim()) return showToast("Please describe your problem.", false);

        try {
            const userEmail = localStorage.getItem("email"); // ✅ ADD THIS
            console.log("Submitting email:", userEmail); // debug

            const response = await fetch("http://localhost:5000/api/problems/add-problem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    problemText: probText.trim(),
                    studentEmail: userEmail
                }),
            });


            if (!response.ok) throw new Error("Failed to submit");

            // Refresh from server to get accurate data
            fetchStudentProblems();

            // Also add optimistic UI update
            const oid = quickClassify(probText);
            const o = oid ? OFFICES[oid] : null;
            setProblems(p => [{
                id: Date.now(), cat: probCat, name: probName.trim(),
                roll: probRoll.trim() || "—", text: probText.trim(),
                status: "unsolved",
                office: o?.name || "Admin Office", icon: o?.icon || "🏢",
                color: o?.color || "#94A3B8", bg: o?.bg || "rgba(148,163,184,.1)",
                border: o?.border || "rgba(148,163,184,.25)",
            }, ...p]);

            setProbName(""); setProbRoll(""); setProbText("");
            showToast(`✅ Submitted to ${o?.name || "Admin Office"}!`);
        } catch (err) {
            console.error("Submit error:", err);
            showToast("❌ Failed to submit. Please try again.", false);
        }
    };

    const updateStatus = (id, status) => setProblems(p => p.map(x => x.id === id ? { ...x, status } : x));
    const deleteProblem = (id) => setProblems(p => p.filter(x => x.id !== id));
    const filteredProblems =
        ptCat === "all"
            ? problems
            : problems.filter(p => p.cat === ptCat);

    const submitFeedback = async () => {
        if (!fbText.trim()) return showToast("Please write feedback", false);

        try {
            const userEmail = localStorage.getItem("email");

            const response = await fetch("http://localhost:5000/api/feedback/add-feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    studentEmail: userEmail,
                    feedbackText: fbText,
                    rating: fbRating,
                    category: fbCat
                }),
            });

            if (!response.ok) throw new Error("Failed");

            setFbText("");
            setFbRating(0);

            // Refresh feedback list from server
            fetchFeedbacks();

            showToast("Feedback submitted successfully");
        } catch (err) {
            console.error(err);
            showToast("Failed to submit feedback", false);
        }
    };
    const markHelpful = (id) =>
        setFeedbacks(p =>
            p.map(x =>
                x.id === id
                    ? { ...x, helpful: (x.helpful || 0) + 1 }
                    : x
            )
        );
    const filteredFeedbacks =
        fbFilter === "all"
            ? (feedbacks || [])
            : (feedbacks || []).filter(f => f.category === fbFilter);

    const avgRating = feedbacks?.length
        ? (
            feedbacks.reduce((a, f) => a + Number(f.rating || 0), 0) /
            feedbacks.length
        ).toFixed(1)
        : "—";
    const ratingDist = [5, 4, 3, 2, 1].map(r => ({
        r,
        count: (feedbacks || []).filter(f => Number(f.rating) === r).length
    }));
    const filteredTeachers = useMemo(() => {
        if (!searchTeacher.trim()) return TEACHERS.slice(0, 20);
        const s = searchTeacher.toLowerCase();
        return TEACHERS.filter(t =>
            t.name.toLowerCase().includes(s) ||
            (DEPARTMENTS[t.dept_id]?.name || "").toLowerCase().includes(s) ||
            t.specialization.toLowerCase().includes(s) ||
            t.designation.toLowerCase().includes(s)
        );
    }, [searchTeacher]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/student-login";
    };

    const s = {
        page: { fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#0B0E1A", minHeight: "100vh", color: "#E2E8F0" },
        nav: { background: "#10131F", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, flexWrap: "wrap", gap: 8 },
        navBtn: (active) => ({ background: active ? "rgba(99,102,241,.15)" : "none", border: active ? "1px solid rgba(99,102,241,.3)" : "1px solid transparent", color: active ? "#A5B4FC" : "#475569", borderRadius: 8, padding: "5px 11px", cursor: "pointer", fontFamily: "inherit", fontSize: ".75rem", fontWeight: 700, transition: "all .15s" }),
        hero: { background: "linear-gradient(155deg,#111827 0%,#0d1030 45%,#111827 100%)", padding: "28px 18px 34px", textAlign: "center", borderBottom: "1px solid rgba(99,102,241,.1)" },
        container: { maxWidth: 860, margin: "0 auto", padding: "20px 14px" },
        card: { background: "#13172A", borderRadius: 18, border: "1.5px solid rgba(99,102,241,.18)" },
        input: { background: "#0E1120", border: "1.5px solid rgba(99,102,241,.18)", borderRadius: 10, padding: "8px 12px", color: "#E2E8F0", fontFamily: "inherit", fontSize: ".84rem", outline: "none" },
        section: { background: "#13172A", borderRadius: 15, padding: 20, border: "1px solid rgba(255,255,255,.06)", marginBottom: 22 },
    };

    const tabs = [["chat", "🤖 Chat"], ["problems", "📝 Problems"], ["faculty", "👨‍🏫 Faculty"], ["offices", "🏢 Offices"], ["courses", "📚 Courses"], ["feedback", "💬 Feedback"]];

    return (
        <div style={s.page}>
            <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#1E2A3A;border-radius:4px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes bounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}
        @keyframes glow{0%,100%{opacity:.6}50%{opacity:1}}
        .chip:hover{opacity:.85!important;transform:scale(1.02)!important}
        .ocard:hover{transform:translateY(-3px)!important;box-shadow:0 12px 36px rgba(0,0,0,.4)!important}
        .prob-btn:hover{opacity:.8!important}
        .star-btn{background:none;border:none;cursor:pointer;font-size:1.6rem;padding:2px 4px;transition:transform .1s}
        .star-btn:hover{transform:scale(1.2)}
        .fb-card:hover{border-color:rgba(99,102,241,.4)!important}
        textarea:focus,input:focus,select:focus{border-color:#6366F1!important;outline:none}
        .tcard:hover{border-color:rgba(99,102,241,.5)!important;background:#1a1f35!important}
      `}</style>

            {/* NAV */}
            <nav style={s.nav}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#6366F1,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".9rem" }}>🎓</div>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: "1.05rem", background: "linear-gradient(90deg,#A5B4FC,#67E8F9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>COLA AI</div>
                        <div style={{ color: "#334155", fontSize: ".68rem" }}>KR Mangalam University · DB-Powered</div>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    {tabs.map(([id, lbl]) => (
                        <button key={id} style={s.navBtn(tab === id)} onClick={() => setTab(id)}>{lbl}</button>
                    ))}
                    <button onClick={handleLogout} style={{ ...s.navBtn(false), marginLeft: 10, background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.3)", color: "#EF4444" }}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <div style={s.hero}>
                <h1 style={{ fontSize: "clamp(1.4rem,3.5vw,2.2rem)", fontWeight: 800, background: "linear-gradient(90deg,#A5B4FC,#67E8F9,#F9A8D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>Campus Office Locator Assistant</h1>
                <p style={{ color: "rgba(255,255,255,.4)", fontSize: ".8rem" }}>Powered by Anthropic AI · Trained on 8,000+ problems · 202 teachers · 108 courses · 12 schools</p>
                <div style={{ display: "flex", gap: 7, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
                    {["🧠 AI-Powered", "👩‍🏫 202 Faculty", "📚 108 Courses", "🚌 Transport Data", "📝 8K+ Problems", "🏫 12 Schools"].map(b => (
                        <span key={b} style={{ background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.22)", color: "#A5B4FC", padding: "3px 10px", borderRadius: 99, fontSize: ".68rem", fontWeight: 600 }}>{b}</span>
                    ))}
                </div>
            </div>

            <div style={s.container}>

                {/* ═══ CHAT ═══ */}
                {tab === "chat" && (
                    <div style={{ ...s.card, overflow: "hidden", display: "flex", flexDirection: "column", height: 580 }}>
                        <div style={{ background: "linear-gradient(135deg,#1a1f35,#2d1b6b)", padding: "13px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(99,102,241,.15)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366F1,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🤖</div>
                                <div>
                                    <div style={{ fontWeight: 800, color: "#fff", fontSize: ".9rem" }}>COLA AI Assistant</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "glow 2s infinite" }} />
                                        <span style={{ fontSize: ".62rem", color: "rgba(255,255,255,.4)" }}>Live DB · 202 Teachers · 8K Problems</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => { setTyping(false); setMsgs([{ id: Date.now(), role: "bot", officeId: null, content: "Chat cleared! Ask me anything 🎓", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]); }} style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.5)", borderRadius: 7, padding: "4px 10px", cursor: "pointer", fontSize: ".7rem", fontFamily: "inherit" }}>🔄 Clear</button>
                        </div>

                        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 13, background: "#0E1120" }}>
                            {msgs.map(m => {
                                const o = m.officeId ? OFFICES[m.officeId] : null;
                                return (
                                    <div key={m.id} style={{ display: "flex", gap: 9, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-end", animation: "fadeUp .3s ease" }}>
                                        <div style={{ width: 28, height: 28, borderRadius: 9, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".8rem", background: m.role === "bot" ? "linear-gradient(135deg,#6366F1,#06B6D4)" : "linear-gradient(135deg,#F43F5E,#F97316)" }}>
                                            {m.role === "bot" ? "🤖" : "👤"}
                                        </div>
                                        <div style={{ maxWidth: "80%" }}>
                                            {o && m.role === "bot" && (
                                                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 5, background: o.bg, border: `1px solid ${o.border}`, borderRadius: 99, padding: "2px 10px 2px 7px" }}>
                                                    <span style={{ fontSize: ".84rem" }}>{o.icon}</span>
                                                    <span style={{ fontSize: ".7rem", fontWeight: 800, color: o.color }}>{o.name}</span>
                                                </div>
                                            )}
                                            <div style={{ padding: "10px 14px", fontSize: ".84rem", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word", borderRadius: m.role === "bot" ? "4px 16px 16px 16px" : "16px 4px 16px 16px", background: m.role === "bot" ? (o ? `linear-gradient(135deg,${o.bg},rgba(20,24,40,.95))` : "#1C2035") : "linear-gradient(135deg,#6366F1,#818CF8)", border: m.role === "bot" ? `1px solid ${o ? o.border : "rgba(255,255,255,.07)"}` : "none", color: "#E2E8F0" }}>
                                                {m.content}
                                            </div>
                                            <div style={{ fontSize: ".62rem", color: "#2D3748", marginTop: 2, textAlign: m.role === "user" ? "right" : "left" }}>{m.time}</div>
                                        </div>
                                    </div>
                                );
                            })}
                            {typing && (
                                <div style={{ display: "flex", gap: 9, alignItems: "flex-end", animation: "fadeUp .3s ease" }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 9, background: "linear-gradient(135deg,#6366F1,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center" }}>🤖</div>
                                    <div style={{ background: "#1C2035", border: "1px solid rgba(255,255,255,.07)", borderRadius: "4px 16px 16px 16px", padding: "11px 14px", display: "flex", gap: 5, alignItems: "center" }}>
                                        {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#A5B4FC", animation: `bounce 1.2s ${i * .15}s infinite` }} />)}
                                        <span style={{ fontSize: ".7rem", color: "#475569", marginLeft: 6 }}>I am working on this...</span>
                                    </div>
                                </div>
                            )}
                            {msgs.length === 1 && (
                                <div style={{ paddingLeft: 38, animation: "fadeUp .5s ease" }}>
                                    <p style={{ fontSize: ".67rem", color: "#334155", marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>Try asking</p>
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                        {SUGGESTIONS.map((sg, i) => (
                                            <button key={i} className="chip" onClick={() => send(sg)} style={{ background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.22)", color: "#A5B4FC", borderRadius: 99, padding: "4px 11px", fontSize: ".7rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>{sg}</button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={endRef} />
                        </div>

                        <div style={{ padding: "11px 16px", background: "#13172A", borderTop: "1px solid rgba(255,255,255,.05)", display: "flex", gap: 9, alignItems: "flex-end" }}>
                            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Ask about any teacher, transport, department, course, scholarship, bus timing…" rows={1} style={{ flex: 1, background: "#0E1120", border: "1.5px solid rgba(99,102,241,.18)", borderRadius: 11, padding: "9px 13px", color: "#E2E8F0", fontFamily: "inherit", fontSize: ".85rem", resize: "none", outline: "none", maxHeight: 90, minHeight: 38, lineHeight: 1.5 }} />
                            <button onClick={() => send()} disabled={!input.trim()} style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, background: "linear-gradient(135deg,#6366F1,#818CF8)", border: "none", cursor: !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: !input.trim() ? .4 : 1 }}>
                                <span style={{ color: "#fff", fontSize: "1.05rem" }}>➤</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══ PROBLEMS ═══ */}
                {tab === "problems" && (
                    <>
                        <p style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 3, color: "#E2E8F0" }}>📝 Submit a Problem</p>
                        <p style={{ color: "#475569", fontSize: ".79rem", marginBottom: 14 }}>AI auto-routes your problem to the right office using the 8,000+ problem database.</p>
                        <div style={s.section}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                                <div>
                                    <label style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: 4, textTransform: "uppercase" }}>Your Name *</label>
                                    <input value={probName} onChange={e => setProbName(e.target.value)} placeholder="e.g. Rahul Sharma" style={{ ...s.input, width: "100%" }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: 4, textTransform: "uppercase" }}>Roll No. (optional)</label>
                                    <input value={probRoll} onChange={e => setProbRoll(e.target.value)} placeholder="e.g. 2023BCA001" style={{ ...s.input, width: "100%" }} />
                                </div>
                            </div>
                            <label style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: 4, textTransform: "uppercase" }}>Describe Problem *</label>
                            <textarea value={probText} onChange={e => setProbText(e.target.value)} placeholder="e.g. My fee payment failed but money was deducted…" style={{ width: "100%", background: "#0E1120", border: "1.5px solid rgba(255,255,255,.08)", borderRadius: 11, padding: 13, color: "#E2E8F0", fontFamily: "inherit", fontSize: ".88rem", resize: "vertical", minHeight: 80, outline: "none" }} />
                            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                                <select value={probCat} onChange={e => setProbCat(e.target.value)} style={{ ...s.input, fontSize: ".8rem" }}>
                                    {Object.entries(CAT_META).map(([k, m]) => <option key={k} value={k}>{m.label}</option>)}
                                </select>
                                <button onClick={submitProblem} disabled={!probName.trim() || !probText.trim()} style={{ background: "linear-gradient(135deg,#F43F5E,#E11D48)", color: "#fff", border: "none", borderRadius: 11, padding: "9px 20px", fontWeight: 700, fontSize: ".85rem", cursor: "pointer", opacity: (!probName.trim() || !probText.trim()) ? .5 : 1 }}>
                                    📤 Submit Problem
                                </button>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 9, marginBottom: 18 }}>
                            {[["Total", problems.length, "#fff"], ["Solved", problems.filter(p => p.status === "solved").length, "#6EE7B7"], ["Unsolved", problems.filter(p => p.status === "unsolved").length, "#FDA4AF"], ["In Progress", problems.filter(p => p.status === "in_progress").length, "#A5B4FC"]].map(([lbl, val, col]) => (
                                <div key={lbl} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, padding: "12px 15px" }}>
                                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: col }}>{val}</div>
                                    <div style={{ fontSize: ".63rem", color: "rgba(255,255,255,.4)", textTransform: "uppercase", marginTop: 2 }}>{lbl}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                            {["all", ...Object.keys(CAT_META)].map(c => {
                                const lbl = c === "all" ? "All" : CAT_META[c].label;
                                const col = c === "all" ? "#6366F1" : CAT_META[c].color;
                                return <button key={c} onClick={() => setPtCat(c)} style={{ padding: "5px 13px", borderRadius: 99, fontSize: ".7rem", fontWeight: 600, cursor: "pointer", border: `1px solid ${ptCat === c ? col : "rgba(255,255,255,.1)"}`, background: "rgba(255,255,255,.05)", color: ptCat === c ? col : "rgba(255,255,255,.55)", fontFamily: "inherit" }}>{lbl}</button>;
                            })}
                        </div>

                        {filteredProblems.map(p => {
                            const sm = STATUS_META[p.status] || STATUS_META.pending;
                            return (
                                <div key={p.id} style={{ borderRadius: 13, padding: "14px 16px", marginBottom: 10, border: `1.5px solid ${p.border}`, background: p.bg, animation: "fadeUp .3s ease" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: ".79rem", fontWeight: 800, color: "#E2E8F0", marginBottom: 3 }}>
                                                {p.name}{p.roll !== "—" && <span style={{ color: "#475569", fontSize: ".67rem" }}> · {p.roll}</span>}
                                            </div>
                                            <p style={{ fontSize: ".85rem", color: "#CBD5E1", lineHeight: 1.5 }}>{p.text}</p>
                                        </div>
                                        <span style={{ background: sm.bg, color: sm.color, padding: "3px 10px", borderRadius: 99, fontSize: ".69rem", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{sm.label}</span>
                                    </div>
                                    <div style={{ fontSize: ".71rem", color: "#475569", marginBottom: 10 }}>
                                        {p.icon} <span style={{ color: p.color, fontWeight: 700 }}>{p.office}</span>
                                    </div>
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                        {p.status === "unsolved" && <button className="prob-btn" onClick={() => updateStatus(p.id, "in_progress")} style={{ background: "rgba(99,102,241,.12)", border: "1px solid rgba(99,102,241,.28)", color: "#818CF8", borderRadius: 7, padding: "4px 11px", fontSize: ".69rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>🔄 In Progress</button>}
                                        {p.status !== "solved" && <button className="prob-btn" onClick={() => updateStatus(p.id, "solved")} style={{ background: "rgba(16,185,129,.12)", border: "1px solid rgba(16,185,129,.28)", color: "#10B981", borderRadius: 7, padding: "4px 11px", fontSize: ".69rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✅ Solved</button>}
                                        <button className="prob-btn" onClick={() => deleteProblem(p.id)} style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.22)", color: "#EF4444", borderRadius: 7, padding: "4px 11px", fontSize: ".69rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✕ Delete</button>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}

                {/* ═══ FACULTY ═══ */}
                {tab === "faculty" && (
                    <>
                        <p style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 3, color: "#E2E8F0" }}>👨‍🏫 Faculty Directory</p>
                        <p style={{ color: "#475569", fontSize: ".79rem", marginBottom: 14 }}>202 faculty members across 35 departments. Search by name, department, or specialization.</p>
                        <div style={{ marginBottom: 16 }}>
                            <input value={searchTeacher} onChange={e => setSearchTeacher(e.target.value)} placeholder="Search teacher name, dept (e.g. CSE, Law, Psychology)…" style={{ ...s.input, width: "100%", fontSize: ".88rem", padding: "10px 14px" }} />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
                            {filteredTeachers.map(t => (
                                <div key={t.id} className="tcard" onClick={() => { setTab("chat"); setTimeout(() => send(`Tell me about teacher ${t.name} from ${DEPARTMENTS[t.dept_id]?.name || ""} department`), 200); }} style={{ background: "#13172A", borderRadius: 13, padding: "13px 15px", border: "1.5px solid rgba(99,102,241,.15)", cursor: "pointer", transition: "all .2s" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366F1,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>👤</div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: ".82rem", color: "#E2E8F0" }}>{t.name}</div>
                                            <div style={{ fontSize: ".68rem", color: "#A78BFA" }}>{t.designation}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: ".71rem", color: "#475569", lineHeight: 1.8 }}>
                                        <div>🏛️ {DEPARTMENTS[t.dept_id]?.name || "—"}</div>
                                        <div>📍 Block {t.block}</div>
                                        <div>📧 {t.email}</div>
                                        <div>📞 {t.phone}</div>
                                    </div>
                                    <div style={{ marginTop: 8, display: "inline-block", background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.2)", color: "#A5B4FC", fontSize: ".65rem", fontWeight: 700, padding: "2px 9px", borderRadius: 99 }}>{t.specialization}</div>
                                </div>
                            ))}
                        </div>
                        {searchTeacher && filteredTeachers.length === 0 && (
                            <div style={{ textAlign: "center", padding: "40px 0", color: "#475569" }}>No faculty found. Try the AI chat for more details!</div>
                        )}
                        {!searchTeacher && (
                            <p style={{ textAlign: "center", marginTop: 14, fontSize: ".72rem", color: "#334155" }}>Showing 20 of 202 faculty. Use search to find specific teachers.</p>
                        )}
                    </>
                )}

                {/* ═══ OFFICES ═══ */}
                {tab === "offices" && (
                    <>
                        <p style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 3, color: "#E2E8F0" }}>🏢 All 20 Campus Offices</p>
                        <p style={{ color: "#475569", fontSize: ".79rem", marginBottom: 18 }}>Click any card to ask the AI about it.</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10 }}>
                            {Object.entries(OFFICES).map(([id, o]) => (
                                <div key={id} className="ocard" onClick={() => { setTab("chat"); setTimeout(() => send(`Tell me about the ${o.name} — what problems does it handle?`), 200); }} style={{ background: "#13172A", borderRadius: 13, padding: "14px 15px 16px", border: `1.5px solid ${o.border}`, cursor: "pointer", transition: "all .2s", position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", top: 0, right: 0, width: 46, height: 46, background: o.bg, borderRadius: "0 13px 0 46px", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", paddingTop: 6, paddingRight: 7, fontSize: "1.1rem" }}>{o.icon}</div>
                                    <div style={{ fontSize: ".6rem", color: o.color, fontWeight: 800, marginBottom: 6, letterSpacing: ".07em", textTransform: "uppercase" }}>Office #{id}</div>
                                    <div style={{ fontWeight: 700, fontSize: ".81rem", color: "#E2E8F0", marginBottom: 9, paddingRight: 26, lineHeight: 1.3 }}>{o.name}</div>
                                    <div style={{ fontSize: ".7rem", color: "#475569", lineHeight: 1.8 }}>
                                        <div>📍 {o.block}</div>
                                        <div>🚪 {o.room}</div>
                                        <div style={{ color: o.color, fontWeight: 700, marginTop: 4, fontSize: ".68rem" }}>⏰ {o.timings}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ═══ COURSES ═══ */}
                {tab === "courses" && (
                    <>
                        <p style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 3, color: "#E2E8F0" }}>📚 Schools & Courses</p>
                        <p style={{ color: "#475569", fontSize: ".79rem", marginBottom: 18 }}>108 courses across 12 schools. Click any school to ask the AI for more details.</p>
                        {Object.entries(SCHOOLS).map(([sid, sname]) => {
                            const depts = Object.entries(DEPARTMENTS).filter(([, d]) => d.school === +sid);
                            const colors = ["#6366F1", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6", "#06B6D4", "#F97316", "#EC4899", "#0EA5E9", "#84CC16", "#D97706", "#14B8A6"];
                            const col = colors[(+sid - 1) % colors.length];
                            return (
                                <div key={sid} onClick={() => { setTab("chat"); setTimeout(() => send(`What courses and departments are in ${sname}?`), 200); }} style={{ background: "#13172A", borderRadius: 13, padding: "14px 16px", marginBottom: 10, border: "1px solid rgba(255,255,255,.07)", borderTop: `3px solid ${col}`, cursor: "pointer" }}>
                                    <div style={{ fontWeight: 800, color: col, fontSize: ".9rem", marginBottom: 8 }}>🏛️ {sname}</div>
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                        {depts.map(([did, d]) => (
                                            <span key={did} style={{ background: `${col}18`, border: `1px solid ${col}33`, color: col, fontSize: ".68rem", padding: "3px 9px", borderRadius: 99, fontWeight: 600 }}>{d.name}</span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}

                {/* ═══ FEEDBACK ═══ */}
                {tab === "feedback" && (
                    <>
                        <p style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 3, color: "#E2E8F0" }}>💬 Student Feedback</p>
                        <p style={{ color: "#475569", fontSize: ".79rem", marginBottom: 18 }}>Rate your experience with COLA. Your feedback helps improve the campus system.</p>

                        {/* Stats row */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
                            {/* Average rating card */}
                            <div style={{ background: "#13172A", borderRadius: 15, padding: "18px 20px", border: "1px solid rgba(99,102,241,.2)" }}>
                                <div style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Overall Rating</div>
                                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                                    <span style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F59E0B" }}>{avgRating}</span>
                                    <span style={{ fontSize: ".9rem", color: "#475569" }}>/ 5</span>
                                </div>
                                <div style={{ display: "flex", gap: 2 }}>
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <span key={s} style={{ fontSize: "1.1rem", opacity: parseFloat(avgRating) >= s ? 1 : 0.25 }}>⭐</span>
                                    ))}
                                </div>
                                <div style={{ marginTop: 6, fontSize: ".7rem", color: "#475569" }}>{feedbacks.length} review{feedbacks.length !== 1 ? "s" : ""}</div>
                            </div>

                            {/* Rating distribution */}
                            <div style={{ background: "#13172A", borderRadius: 15, padding: "18px 20px", border: "1px solid rgba(99,102,241,.2)" }}>
                                <div style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Rating Breakdown</div>
                                {ratingDist.map(({ r, count }) => {
                                    const pct = feedbacks.length ? Math.round((count / feedbacks.length) * 100) : 0;
                                    return (
                                        <div key={r} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                                            <span style={{ fontSize: ".7rem", color: "#F59E0B", minWidth: 12 }}>{r}★</span>
                                            <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,.06)", borderRadius: 99, overflow: "hidden" }}>
                                                <div style={{ width: `${pct}%`, height: "100%", background: r >= 4 ? "#10B981" : r === 3 ? "#F59E0B" : "#EF4444", borderRadius: 99, transition: "width .4s" }} />
                                            </div>
                                            <span style={{ fontSize: ".65rem", color: "#475569", minWidth: 24 }}>{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Submit feedback form */}
                        <div style={s.section}>
                            <div style={{ fontWeight: 800, fontSize: ".9rem", color: "#E2E8F0", marginBottom: 14 }}>✍️ Leave Your Feedback</div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                                <div>
                                    <label style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: 4, textTransform: "uppercase" }}>Your Name *</label>
                                    <input value={fbName} onChange={e => setFbName(e.target.value)} placeholder="e.g. Anjali Verma" style={{ ...s.input, width: "100%" }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: 4, textTransform: "uppercase" }}>Roll No. (optional)</label>
                                    <input value={fbRoll} onChange={e => setFbRoll(e.target.value)} placeholder="e.g. 2023CSE012" style={{ ...s.input, width: "100%" }} />
                                </div>
                            </div>

                            <label style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: 6, textTransform: "uppercase" }}>Category</label>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                                {FEEDBACK_CATEGORIES.map(c => (
                                    <button key={c.id} onClick={() => setFbCat(c.id)} style={{ background: fbCat === c.id ? "rgba(99,102,241,.18)" : "rgba(255,255,255,.04)", border: `1px solid ${fbCat === c.id ? "rgba(99,102,241,.5)" : "rgba(255,255,255,.1)"}`, color: fbCat === c.id ? "#A5B4FC" : "#475569", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: ".73rem", fontWeight: 600, fontFamily: "inherit" }}>
                                        {c.icon} {c.label}
                                    </button>
                                ))}
                            </div>

                            <label style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: 6, textTransform: "uppercase" }}>Your Rating *</label>
                            <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button key={star} className="star-btn" onMouseEnter={() => setFbHover(star)} onMouseLeave={() => setFbHover(0)} onClick={() => setFbRating(star)}>
                                        <span style={{ opacity: (fbHover || fbRating) >= star ? 1 : 0.22, filter: (fbHover || fbRating) >= star ? "none" : "grayscale(1)" }}>⭐</span>
                                    </button>
                                ))}
                                {fbRating > 0 && <span style={{ fontSize: ".75rem", color: "#F59E0B", fontWeight: 700, marginLeft: 8, alignSelf: "center" }}>{["", "Poor", "Fair", "Good", "Great", "Excellent!"][fbRating]}</span>}
                            </div>

                            <label style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: 4, textTransform: "uppercase" }}>Your Feedback *</label>
                            <textarea value={fbText} onChange={e => setFbText(e.target.value)} placeholder="Share your experience — what worked well, what can be improved…" style={{ width: "100%", background: "#0E1120", border: "1.5px solid rgba(255,255,255,.08)", borderRadius: 11, padding: 13, color: "#E2E8F0", fontFamily: "inherit", fontSize: ".88rem", resize: "vertical", minHeight: 90, outline: "none", marginBottom: 12 }} />

                            <button onClick={submitFeedback} disabled={!fbName.trim() || fbRating === 0 || !fbText.trim()} style={{ background: "linear-gradient(135deg,#6366F1,#818CF8)", color: "#fff", border: "none", borderRadius: 11, padding: "9px 22px", fontWeight: 700, fontSize: ".85rem", cursor: "pointer", opacity: (!fbName.trim() || fbRating === 0 || !fbText.trim()) ? .45 : 1 }}>
                                🚀 Submit Feedback
                            </button>
                        </div>

                        {/* Filter */}
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                            {["all", ...FEEDBACK_CATEGORIES.map(c => c.id)].map(f => {
                                const lbl = f === "all" ? "All" : FEEDBACK_CATEGORIES.find(c => c.id === f)?.label;
                                return <button key={f} onClick={() => setFbFilter(f)} style={{ padding: "5px 13px", borderRadius: 99, fontSize: ".7rem", fontWeight: 600, cursor: "pointer", border: `1px solid ${fbFilter === f ? "#6366F1" : "rgba(255,255,255,.1)"}`, background: "rgba(255,255,255,.05)", color: fbFilter === f ? "#A5B4FC" : "rgba(255,255,255,.55)", fontFamily: "inherit" }}>{lbl}</button>;
                            })}
                        </div>

                        {/* Feedback cards */}
                        {filteredFeedbacks.map(f => {
                            const catObj = FEEDBACK_CATEGORIES.find(c => c.id === f.category);
                            return (
                                <div key={f.id} className="fb-card" style={{ background: "#13172A", borderRadius: 13, padding: "14px 16px", marginBottom: 10, border: "1.5px solid rgba(99,102,241,.12)", animation: "fadeUp .3s ease", transition: "border-color .2s" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366F1,#818CF8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".85rem", fontWeight: 800, color: "#fff" }}>
                                                {(f.studentEmail || "U").charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: ".82rem", color: "#E2E8F0" }}>{f.studentEmail}</div>
                                                {f.roll !== "—" && <div style={{ fontSize: ".67rem", color: "#475569" }}>{f.roll}</div>}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                                            <div style={{ display: "flex", gap: 1 }}>
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <span key={s} style={{ fontSize: ".85rem", opacity: f.rating >= s ? 1 : 0.2 }}>⭐</span>
                                                ))}
                                            </div>
                                            <div style={{ fontSize: ".63rem", color: "#334155" }}>{f.time}</div>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: ".85rem", color: "#CBD5E1", lineHeight: 1.6, marginBottom: 10 }}>{f.feedbackText}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.2)", color: "#A5B4FC", fontSize: ".65rem", fontWeight: 700, padding: "2px 9px", borderRadius: 99 }}>
                                            {catObj?.icon} {catObj?.label}
                                        </span>
                                        <button onClick={() => markHelpful(f.id)} style={{ background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)", color: "#10B981", borderRadius: 7, padding: "3px 10px", fontSize: ".68rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                                            👍 Helpful ({f.helpful})
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredFeedbacks.length === 0 && (
                            <div style={{ textAlign: "center", padding: "40px 0", color: "#475569" }}>
                                No feedback in this category yet. Be the first!
                            </div>
                        )}
                    </>
                )}

            </div>

            {toast && (
                <div style={{ position: "fixed", bottom: 22, right: 22, zIndex: 9999, background: toast.ok ? "#059669" : "#E11D48", color: "#fff", padding: "10px 18px", borderRadius: 11, fontWeight: 700, fontSize: ".83rem", boxShadow: `0 8px 32px ${toast.ok ? "rgba(5,150,105,.4)" : "rgba(225,29,72,.4)"}`, animation: "fadeUp .3s ease" }}>
                    {toast.msg}
                </div>
            )}
        </div>
    );
}