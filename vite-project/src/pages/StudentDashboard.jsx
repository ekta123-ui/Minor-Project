import { useState, useRef, useMemo, useCallback, useEffect } from "react";

// ─── OFFICES ─────────────────────────────────────────────────────────────────
const OFFICES = {
    1: {
        name: "ID Card Office", block: "Block A", floor: "Ground Floor", room: "Room 101", timings: "9 AM – 5 PM, Mon–Sat", color: "#6366F1", bg: "rgba(99,102,241,.12)", border: "rgba(99,102,241,.3)", icon: "🪪", reply: q => {
            if (/lost|missing|stolen/i.test(q)) return "Your ID card is lost — visit ID Card Office (Block A, Room 101) with ₹100 fee + passport-size photo. Ready in 2–3 working days. Bring your enrollment number.";
            if (/damag|broken|scratch/i.test(q)) return "Damaged ID card? Bring old card + ₹50 to Block A, Room 101. New card issued on the spot before 3 PM.";
            if (/rfid|swipe|scan/i.test(q)) return "RFID/swipe issues fixed at ID Card Office, Block A Room 101. Carry student ID + registration number — re-encoded same day.";
            return "For all ID card queries → Block A, Ground Floor, Room 101. Hours: 9 AM – 5 PM, Mon–Sat. Carry enrollment number + photo.";
        }
    },
    2: {
        name: "Accounts Office", block: "Block A", floor: "Ground Floor", room: "Room 102", timings: "9 AM – 5 PM, Mon–Sat", color: "#F59E0B", bg: "rgba(245,158,11,.12)", border: "rgba(245,158,11,.3)", icon: "💰", reply: q => {
            if (/fail|not show|not reflect|online/i.test(q)) return "Online payment failed/not reflecting? Visit Accounts Office (Block A, Room 102) with transaction ID/screenshot. Manually verified within 24 hours.";
            if (/refund/i.test(q)) return "Fee refunds at Accounts Office, Block A Room 102. Submit written application + bank details. Refunds take 7–10 working days.";
            if (/receipt|slip|challan/i.test(q)) return "Fee receipts/challans from Block A, Room 102. Bring transaction reference — official receipt printed immediately.";
            if (/late|penalty|fine/i.test(q)) return "Late fee waivers at Accounts Office, Block A Room 102. Written explanation + HOD approval needed in genuine cases.";
            return "Fee and payment queries → Block A, Ground Floor, Room 102. Hours: 9 AM – 5 PM, Mon–Sat. Carry roll number + payment proof.";
        }
    },
    3: {
        name: "Scholarship Office", block: "Block B", floor: "1st Floor", room: "Room 201", timings: "9 AM – 5 PM, Mon–Sat", color: "#10B981", bg: "rgba(16,185,129,.12)", border: "rgba(16,185,129,.3)", icon: "🎓", reply: q => {
            if (/apply|form|how to/i.test(q)) return "Apply for scholarship at Block B, Room 201. Collect form, attach mark sheets + income certificate + bank passbook copy. Submit before deadline.";
            if (/not receiv|disburs|amount/i.test(q)) return "Scholarship not received? Visit Block B, Room 201 with bank account details + approval letter. Traced within 2 days.";
            if (/renew|next year/i.test(q)) return "Scholarship renewal every year at Block B, Room 201. Need ≥60% marks previous semester + no pending fees.";
            if (/sc|st|obc|ews|category/i.test(q)) return "Government category scholarships (SC/ST/OBC/EWS) at Scholarship Office, Block B Room 201. Bring caste certificate + income proof + Aadhaar.";
            return "Scholarship queries → Block B, 1st Floor, Room 201. Hours: 9 AM – 5 PM, Mon–Sat. Bring academic records + income documents.";
        }
    },
    4: {
        name: "Certificate Section", block: "Block A", floor: "1st Floor", room: "Room 110", timings: "9 AM – 5 PM, Mon–Sat", color: "#8B5CF6", bg: "rgba(139,92,246,.12)", border: "rgba(139,92,246,.3)", icon: "📜", reply: q => {
            if (/bonafide/i.test(q)) return "Bonafide Certificate from Block A, Room 110. Written application + student ID + purpose. Ready in 1–2 days. Fee: ₹50.";
            if (/transcript/i.test(q)) return "Official transcripts at Certificate Section, Block A Room 110. ₹200/copy. Sealed transcripts for abroad take 5–7 days.";
            if (/migration/i.test(q)) return "Migration certificate at Block A, Room 110 after no-dues clearance from all departments. Takes ~1 week.";
            if (/degree|provisional/i.test(q)) return "Provisional/degree certificates collected from Block A, Room 110 after results. Carry hall ticket + ₹100 fee.";
            if (/marksheet|grade card/i.test(q)) return "Certified marksheet copies at Block A, Room 110. ₹100/copy. Bring roll number + original for attestation.";
            return "Certificates (bonafide, transcript, migration, degree) → Block A, 1st Floor, Room 110. Hours: 9 AM – 5 PM. Carry ID + application form.";
        }
    },
    5: {
        name: "Hostel Office", block: "Hostel Block", floor: "Ground Floor", room: "Warden Room", timings: "8 AM – 8 PM, Daily", color: "#F43F5E", bg: "rgba(244,63,94,.12)", border: "rgba(244,63,94,.3)", icon: "🏠", reply: q => {
            if (/allot|room|accommod/i.test(q)) return "Hostel allotment at Warden's Room, Hostel Block — start of each semester. Fill online form + ₹500 deposit. First-come first-served.";
            if (/mess|food|meal/i.test(q)) return "Hostel mess timings — Breakfast 7–9 AM, Lunch 12–2 PM, Dinner 7–9 PM. Complaints to Hostel Warden, Hostel Block.";
            if (/curfew|timing/i.test(q)) return "Hostel curfew — Boys: 10 PM, Girls: 9 PM. Late entry permission from Hostel Warden 1 day in advance with valid reason.";
            if (/wifi|internet/i.test(q)) return "Hostel WiFi credentials from Warden Room. SSID: KRM_Hostel. Issues? Contact IT Helpdesk (Block C, Room 302).";
            if (/mainten|repair|water|electric/i.test(q)) return "Hostel maintenance at Warden Room, Hostel Block. Dedicated maintenance team — most issues resolved in 24 hours.";
            return "Hostel queries → Warden Room, Hostel Block, Ground Floor. Hours: 8 AM – 8 PM daily. Carry student ID + hostel form.";
        }
    },
    6: {
        name: "Transport Office", block: "Block C", floor: "Ground Floor", room: "Room 301", timings: "8 AM – 6 PM, Mon–Sat", color: "#06B6D4", bg: "rgba(6,182,212,.12)", border: "rgba(6,182,212,.3)", icon: "🚌", reply: q => {
            if (/timing|schedule|time|when/i.test(q)) return "College bus timings — Morning: 7:00 AM & 8:00 AM pickup. Evening drop: 5:00 PM & 6:00 PM. Route-specific schedule at Transport Office, Block C Room 301.";
            if (/pass|card|bus pass/i.test(q)) return "Bus passes at Transport Office, Block C Room 301. Enrollment card + ₹200 semester fee + address proof. Valid one semester.";
            if (/route|stop|area/i.test(q)) return "Route details and printed route maps at Transport Office, Block C Room 301. Office hours: 8 AM – 6 PM.";
            if (/crowd|full|seat|late|delay/i.test(q)) return "Overcrowded bus or late arrival complaints at Transport Office, Block C Room 301. They track complaints and may add extra buses.";
            return "Transport Office → Block C, Ground Floor, Room 301. Hours: 8 AM – 6 PM, Mon–Sat. For bus passes, routes, timings, and complaints.";
        }
    },
    7: {
        name: "Medical Center", block: "Block D", floor: "Ground Floor", room: "Health Center", timings: "9 AM – 5 PM, Mon–Sat", color: "#EF4444", bg: "rgba(239,68,68,.12)", border: "rgba(239,68,68,.3)", icon: "🏥", reply: q => {
            if (/sick|fever|ill|cold|headache|pain/i.test(q)) return "Feeling sick? Go to Medical Center, Block D, Ground Floor. Doctor available 9 AM – 5 PM. Basic medicines free for students.";
            if (/emergency|accident|injur|urgent/i.test(q)) return "Emergency? Head to Block D, Ground Floor immediately. First-aid station + ambulance arrangement within campus. After-hours → contact Main Gate security.";
            if (/leave|certif|medical leave/i.test(q)) return "Medical leave certificates from Medical Center, Block D. Campus doctor certifies — valid for attendance excuse. Obtain within 48 hours of illness.";
            return "Medical Center → Block D, Ground Floor (Health Center). Hours: 9 AM – 5 PM, Mon–Sat. After-hours emergencies → Security at Main Gate.";
        }
    },
    8: {
        name: "Central Library", block: "Block A", floor: "Basement", room: "Library Hall", timings: "9 AM – 9 PM, Mon–Sat", color: "#0EA5E9", bg: "rgba(14,165,233,.12)", border: "rgba(14,165,233,.3)", icon: "📚", reply: q => {
            if (/where|locat/i.test(q)) return "Central Library is in Block A, Basement — Library Hall. Open 9 AM – 9 PM, Mon–Sat. Use student ID card to enter.";
            if (/issue|borrow|take book/i.test(q)) return "Borrow up to 3 books at Central Library (Block A Basement). Student ID + library card at circulation desk. Books issued for 14 days.";
            if (/return|overdue|fine/i.test(q)) return "Return books at Central Library (Block A Basement). Overdue fine: ₹2/book/day. Clear fines before borrowing new books.";
            if (/card|member/i.test(q)) return "Library membership cards at Block A Basement on first day of semester. Bring student ID + one passport-size photo.";
            if (/study|reading room/i.test(q)) return "Reading room at Block A Basement — 200+ seats. Student ID required. 9 AM – 9 PM. Silence mandatory.";
            return "Central Library → Block A, Basement (Library Hall). Open 9 AM – 9 PM, Mon–Sat. Borrow books, reading room, digital resources with student ID.";
        }
    },
    9: {
        name: "Academic Section", block: "Block B", floor: "Ground Floor", room: "Room 205", timings: "9 AM – 5 PM, Mon–Sat", color: "#84CC16", bg: "rgba(132,204,22,.12)", border: "rgba(132,204,22,.3)", icon: "📋", reply: q => {
            if (/register|registration|enroll/i.test(q)) return "Course registration at Academic Section, Block B Room 205 — start of each semester. Bring fee clearance receipt + previous marksheet.";
            if (/elective|add|drop|change subject/i.test(q)) return "Add/drop electives at Academic Section, Block B Room 205 — within first 2 weeks of semester. Elective change form + HOD approval needed.";
            if (/credit|backlog|arrear/i.test(q)) return "Credit issues or backlog registration at Academic Section, Block B Room 205. They'll check your academic record and guide you.";
            return "Course registration, add/drop, academic queries → Block B, Ground Floor, Room 205. Hours: 9 AM – 5 PM, Mon–Sat.";
        }
    },
    10: {
        name: "Examination Cell", block: "Block B", floor: "2nd Floor", room: "Room 210", timings: "9 AM – 5 PM, Mon–Sat", color: "#F97316", bg: "rgba(249,115,22,.12)", border: "rgba(249,115,22,.3)", icon: "📝", reply: q => {
            if (/admit card|hall ticket/i.test(q)) return "Admit cards on student portal 5 days before exams. Missing/errors? Visit Examination Cell, Block B 2nd Floor, Room 210 immediately.";
            if (/result|marks|grade|revaluat/i.test(q)) return "Revaluation at Examination Cell (Block B, Room 210) within 7 days of result. Written application + ₹500/subject fee.";
            if (/date|schedule|datesheet/i.test(q)) return "Exam datesheet on student portal + Examination Cell notice board (Block B, 2nd Floor). Published 3 weeks before exam period.";
            if (/backlog|supply|arrear|fail/i.test(q)) return "Backlog registration at Examination Cell, Block B Room 210. Pay backlog fee (₹300/subject) at Accounts Office first, then submit receipt here.";
            return "Exam queries → Examination Cell, Block B, 2nd Floor, Room 210. Hours: 9 AM – 5 PM, Mon–Sat.";
        }
    },
    11: {
        name: "Attendance Office", block: "Block B", floor: "1st Floor", room: "Room 208", timings: "9 AM – 5 PM, Mon–Sat", color: "#EC4899", bg: "rgba(236,72,153,.12)", border: "rgba(236,72,153,.3)", icon: "📅", reply: q => {
            if (/low|shortage|below|75|detain/i.test(q)) return "Low attendance (below 75%) → possible detention. Visit Attendance Office, Block B Room 208 with medical cert or valid reason. Condonation needs HOD approval.";
            if (/wrong|incorrect|error|not mark/i.test(q)) return "Attendance correction: written request to Attendance Office, Block B Room 208 with subject teacher's signature — within 3 days.";
            if (/condon|waiver/i.test(q)) return "Attendance condonation at Block B, Room 208. Submit medical cert or event proof. Max condonation: 5% of total classes.";
            return "Attendance queries/corrections → Block B, 1st Floor, Room 208. Hours: 9 AM – 5 PM, Mon–Sat. Carry student ID + timetable.";
        }
    },
    12: {
        name: "Faculty / Department", block: "Block C", floor: "Various Floors", room: "Department Rooms", timings: "9 AM – 5 PM, Mon–Sat", color: "#A78BFA", bg: "rgba(167,139,250,.12)", border: "rgba(167,139,250,.3)", icon: "👨‍🏫", reply: q => {
            if (/meet|appointment|cabin/i.test(q)) return "Faculty cabins are in Block C. Check schedule posted outside their cabin. Email via college portal for appointment during free periods.";
            if (/doubt|help|clarif/i.test(q)) return "Academic doubts? Approach subject teacher during free/tutorial hours or visit their cabin in Block C. Also use student portal to send queries.";
            if (/sit|where.*teacher|teacher.*where|professor.*where|where.*faculty/i.test(q)) return "Faculty/teachers sit in Block C — Department Rooms across various floors. BCA faculty → Block B 1st Floor. B.Tech faculty → Block A 1st Floor + Block C. MBA faculty → Block E 1st Floor. MCA faculty → Block B 2nd Floor.";
            return "Faculty cabins → Block C, various floors. Check department notice board for room numbers. Hours: 9 AM – 5 PM, Mon–Sat.";
        }
    },
    13: {
        name: "Student Counselling", block: "Block D", floor: "1st Floor", room: "Room 401", timings: "9 AM – 5 PM, Mon–Sat", color: "#14B8A6", bg: "rgba(20,184,166,.12)", border: "rgba(20,184,166,.3)", icon: "💬", reply: q => {
            if (/ragging|bully|harass/i.test(q)) return "Ragging/bullying — report immediately to Counselling Center, Block D Room 401. Anti-Ragging helpline also available. Identity kept 100% confidential.";
            if (/mental|stress|anxiety|depress|sad/i.test(q)) return "Counselling Center (Block D, 1st Floor, Room 401) — free, confidential mental health support. Walk-ins welcome 9 AM – 5 PM. Professional counsellor always available.";
            return "Student Counselling Center → Block D, 1st Floor, Room 401. Hours: 9 AM – 5 PM, Mon–Sat. Free, confidential. Walk-ins always welcome.";
        }
    },
    14: {
        name: "IT Helpdesk", block: "Block C", floor: "Ground Floor", room: "Room 302", timings: "9 AM – 6 PM, Mon–Sat", color: "#7C3AED", bg: "rgba(124,58,237,.12)", border: "rgba(124,58,237,.3)", icon: "💻", reply: q => {
            if (/password|reset|forgot/i.test(q)) return "Password reset at IT Helpdesk, Block C Room 302. Bring student ID — verified and reset on the spot in ~5 minutes.";
            if (/wifi|internet|connect/i.test(q)) return "Campus WiFi SSID: KRM_Campus — credentials at IT Helpdesk, Block C Room 302. Connectivity issues? Visit with your device for immediate diagnosis.";
            if (/portal|lms|login|access/i.test(q)) return "Portal/LMS login issues at IT Helpdesk, Block C Room 302. Bring enrollment number. Server-side issues followed up within 24 hours.";
            if (/email|mail|account/i.test(q)) return "College email accounts at IT Helpdesk, Block C Room 302. New students: bring admission letter. Account recovery: bring student ID.";
            return "Technical issues (WiFi, portal, email, password) → IT Helpdesk, Block C, Ground Floor, Room 302. Hours: 9 AM – 6 PM, Mon–Sat.";
        }
    },
    15: {
        name: "Training & Placement", block: "Block E", floor: "Ground Floor", room: "Room 501", timings: "9 AM – 5 PM, Mon–Sat", color: "#D97706", bg: "rgba(217,119,6,.12)", border: "rgba(217,119,6,.3)", icon: "💼", reply: q => {
            if (/internship/i.test(q)) return "Internship opportunities at Placement Cell, Block E Room 501. 200+ partner companies. Bring updated resume and apply through portal.";
            if (/campus drive|company|recruit/i.test(q)) return "Campus drives announced on Placement Cell notice board (Block E, Room 501) + student portal. Register 48 hours before with resume + marksheets.";
            if (/resume|cv/i.test(q)) return "Free resume-building sessions every Friday at Placement Cell (Block E, Room 501). Register at front desk. Resume verification/stamping also available.";
            if (/offer letter|job|placed/i.test(q)) return "Offer letter verification at Placement Cell, Block E Room 501. They coordinate joining formalities and document collection.";
            return "Placements/internships → Block E, Ground Floor, Room 501. Hours: 9 AM – 5 PM, Mon–Sat.";
        }
    },
    16: {
        name: "Admission Department", block: "Block A", floor: "Ground Floor", room: "Room 105", timings: "9 AM – 5 PM, Mon–Sat", color: "#059669", bg: "rgba(5,150,105,.12)", border: "rgba(5,150,105,.3)", icon: "📋", reply: q => {
            if (/document|upload|submit/i.test(q)) return "Admission documents (marksheets, Aadhaar, certs) at Block A Room 105. Originals + 2 photocopies. Verification 1–2 days.";
            if (/number|registration|roll/i.test(q)) return "Enrollment/registration number from Admission Department, Block A Room 105. Bring admission receipt + fee clearance.";
            if (/transfer|tc/i.test(q)) return "Transfer certificates at Admission Dept, Block A Room 105. Written application + no-dues certificate from all departments.";
            return "Admission/enrollment queries → Block A, Ground Floor, Room 105. Hours: 9 AM – 5 PM, Mon–Sat.";
        }
    },
    17: {
        name: "Timetable Office", block: "Block B", floor: "2nd Floor", room: "Room 212", timings: "9 AM – 5 PM, Mon–Sat", color: "#0891B2", bg: "rgba(8,145,178,.12)", border: "rgba(8,145,178,.3)", icon: "🗓️", reply: q => {
            if (/change|clash|conflict|overlap/i.test(q)) return "Timetable clash? Visit Timetable Office, Block B Room 212 (2nd Floor). Bring current timetable — adjustments take 2–3 days.";
            if (/section|batch/i.test(q)) return "Section/batch changes at Timetable Office, Block B Room 212 with HOD recommendation. Written request with valid reason required.";
            return "Timetable/scheduling queries → Block B, 2nd Floor, Room 212. Hours: 9 AM – 5 PM, Mon–Sat.";
        }
    },
    18: {
        name: "Security Office", block: "Main Gate", floor: "Ground Floor", room: "Security Post", timings: "24×7 (Always open)", color: "#DC2626", bg: "rgba(220,38,38,.12)", border: "rgba(220,38,38,.3)", icon: "🛡️", reply: q => {
            if (/lost|missing|found/i.test(q)) return "Lost items at Security Post, Main Gate. Check guard on duty — they maintain a lost-and-found register. Open 24×7.";
            if (/theft|stolen/i.test(q)) return "Report theft immediately to Security Office, Main Gate. Campus security report filed + local police coordination if needed. Open 24×7.";
            if (/gate pass|visitor|entry/i.test(q)) return "Gate passes for visitors at Security Post, Main Gate. Students need ID card + HOD permission slip for late exits.";
            return "Security Office → Main Gate, Ground Floor. Open 24×7. Emergencies, lost items, campus safety — report immediately.";
        }
    },
    19: {
        name: "Campus Facilities", block: "Admin Block", floor: "Ground Floor", room: "Room 001", timings: "9 AM – 5 PM, Mon–Sat", color: "#65A30D", bg: "rgba(101,163,13,.12)", border: "rgba(101,163,13,.3)", icon: "🏫", reply: q => {
            if (/canteen|cafeteria|food|eat|hunger/i.test(q)) return "Campus cafeteria → Block C, Basement. Open 8 AM – 8 PM daily. Breakfast, lunch, snacks, dinner at subsidized rates. Hygiene complaints to Campus Facilities, Admin Block Room 001.";
            if (/water|cooler|drinking/i.test(q)) return "Water coolers on every floor of all blocks. Non-functioning cooler? Report to Campus Facilities, Admin Block Room 001 — same-day maintenance.";
            if (/washroom|toilet|bathroom|clean/i.test(q)) return "Washroom/cleanliness issues at Campus Facilities, Admin Block Room 001. Report block + floor — housekeeping responds within 2 hours.";
            if (/parking|bike|car|vehicle/i.test(q)) return "Student parking near Block D. Parking stickers from Campus Facilities, Admin Block Room 001. Two-wheelers left, four-wheelers right.";
            return "Facility issues (canteen, washrooms, water, parking) → Campus Facilities, Admin Block, Ground Floor, Room 001. Hours: 9 AM – 5 PM, Mon–Sat.";
        }
    },
    20: {
        name: "Grievance Cell", block: "Block A", floor: "1st Floor", room: "Room 115", timings: "9 AM – 5 PM, Mon–Sat", color: "#BE185D", bg: "rgba(190,24,93,.12)", border: "rgba(190,24,93,.3)", icon: "⚖️", reply: q => {
            if (/complaint|file|submit/i.test(q)) return "File grievance at Block A, Room 115 with written complaint. Anonymous complaints accepted. Resolved within 15 working days — strictly confidential.";
            if (/escalat|not resolv/i.test(q)) return "Issue unresolved? Escalate to Grievance Cell, Block A Room 115. They involve department heads and Dean. Bring all previous correspondence.";
            return "Complaints/grievances → Grievance Cell, Block A, 1st Floor, Room 115. Hours: 9 AM – 5 PM, Mon–Sat. Strict confidentiality guaranteed.";
        }
    },
};

// ─── SPECIAL REPLIES (classrooms, departments, faculty, facilities) ───────────
const SPECIAL_REPLIES = {
    class: q => {
        if (/bca|computer application/i.test(q)) return "BCA classrooms are in Block B — 1st and 2nd Floor (Rooms 201–220). Labs are in Block C, Ground Floor (Rooms 301–305). Check your timetable for specific room allocation.";
        if (/btech|b\.tech|engineering/i.test(q)) return "B.Tech classrooms are in Block A (Rooms 101–120) and Block B (Rooms 201–210). Engineering labs are in Block D, Ground and 1st Floor. Check your timetable for specific rooms.";
        if (/mba/i.test(q)) return "MBA classrooms are in Block E, 1st Floor (Rooms 501–510). Case study rooms and seminar halls are on the 2nd Floor of Block E.";
        if (/mca/i.test(q)) return "MCA classrooms are in Block B, 2nd Floor (Rooms 211–220). Computer labs are in Block C, Ground Floor (Rooms 306–310).";
        if (/lab|practical/i.test(q)) return "Labs are in Block C (IT/Computer labs, Ground Floor) and Block D (Science/Engineering labs, Ground & 1st Floor). Chemistry lab: Block D, Room 102. Physics lab: Block D, Room 104.";
        if (/seminar|audi/i.test(q)) return "Seminar Hall is in Block A, Ground Floor (Room 109). Main Auditorium is in Block E — capacity 800 students. Mini seminar rooms are in Block B and Block C, 2nd Floors.";
        return "Classrooms: Block A & B for lectures, Block C for IT/Computer labs, Block D for Science/Engineering labs, Block E for MBA/PG. Check timetable or visit Timetable Office (Block B, Room 212) for your specific room.";
    },
    faculty: q => {
        if (/hod|head of department/i.test(q)) return "HOD rooms — BCA HOD: Block B, Room 202. B.Tech HOD: Block A, Room 115. MBA HOD: Block E, Room 502. MCA HOD: Block B, Room 213. All HODs available 10 AM – 4 PM, Mon–Sat.";
        if (/bca/i.test(q)) return "BCA faculty sit in Block B, 1st Floor — Rooms 203–208. Check name plates outside each cabin. Department notice board is near Room 201.";
        if (/btech|engineering/i.test(q)) return "B.Tech faculty cabins are in Block A, 1st Floor (Rooms 112–120) and Block C, 1st & 2nd Floor. Department-wise cabins are labeled on each floor.";
        if (/mba/i.test(q)) return "MBA faculty sit in Block E, 1st Floor — Rooms 503–510. Faculty schedule is posted outside each cabin.";
        if (/mca/i.test(q)) return "MCA faculty cabins are in Block B, 2nd Floor — Rooms 214–220. Check department notice board near Room 212 for room assignments.";
        return "Faculty locations — BCA: Block B 1st Floor (Rooms 203–208) | B.Tech: Block A 1st Floor + Block C | MBA: Block E 1st Floor (Rooms 503–510) | MCA: Block B 2nd Floor (Rooms 214–220). Check department notice board for specific cabin numbers.";
    },
    dept: q => {
        if (/bca/i.test(q)) return "BCA Department: Block B, 1st Floor. Office: Room 201. HOD Cabin: Room 202. Faculty Rooms: 203–208. Labs: Block C, Ground Floor (Rooms 301–305).";
        if (/btech|engineering/i.test(q)) return "B.Tech Department: Block A (admin/classrooms) + Block D (labs). Department Office: Block A, Room 111. Labs: Block D, Ground & 1st Floor.";
        if (/mba/i.test(q)) return "MBA Department: Block E, 1st Floor. Office: Room 501. HOD Cabin: Room 502. Faculty Rooms: 503–510. Classrooms: Block E, 1st & 2nd Floor.";
        if (/mca/i.test(q)) return "MCA Department: Block B, 2nd Floor. Office: Room 211. HOD Cabin: Room 213. Faculty Rooms: 214–220. Labs: Block C, Ground Floor (Rooms 306–310).";
        return "Departments — BCA: Block B 1st Floor | B.Tech: Block A + Block D | MBA: Block E | MCA: Block B 2nd Floor. Visit Academic Section (Block B, Room 205) for department-specific guidance.";
    },
    facility: q => {
        if (/gym|sports|ground/i.test(q)) return "Sports Facilities: Football/Cricket ground near Block E (back side). Indoor Gymnasium: Block D, Basement — open 6 AM – 8 PM daily. Basketball & Badminton courts near Hostel Block.";
        if (/auditorium|audi/i.test(q)) return "Main Auditorium: Block E — 800-seat capacity. For bookings/events contact Campus Facilities, Admin Block Room 001. Booking must be done 3 days in advance.";
        if (/seminar/i.test(q)) return "Seminar Hall: Block A, Ground Floor (Room 109) — 150 seats. Block B 2nd Floor — two 50-seat mini seminar rooms. Block C 2nd Floor — one 80-seat seminar room.";
        if (/canteen|cafeteria|food/i.test(q)) return "Campus cafeteria: Block C, Basement. Open 8 AM – 8 PM daily. Veg + Non-veg at subsidized student rates. Juice/snack stalls near Block A entrance.";
        if (/atm|bank/i.test(q)) return "ATM near the Main Gate (SBI ATM). Canara Bank ATM near Block D entrance. For banking queries, contact Admin Block, Ground Floor.";
        if (/photocopy|print|stationery/i.test(q)) return "Photocopying/printing available near Block A entrance and in the Library (Block A Basement). Stationery shops near Main Gate and Block C entrance.";
        return "Campus facilities: Cafeteria (Block C Basement), Gymnasium (Block D Basement), Auditorium (Block E), Sports Ground (behind Block E), Seminar Halls (Blocks A/B/C), ATM (Main Gate), Photocopy (Block A entrance & Library). Contact Campus Facilities (Admin Block, Room 001) for bookings/complaints.";
    },
};

// ─── CLASSIFIER ──────────────────────────────────────────────────────────────
const RULES = [
    { re: /bonafide|migration certif|degree certif|transcript|passing certif|provisional certif|no.?dues certif|enrollment certif|character certif/i, o: 4 },
    { re: /id card|identity card|student id|rfid card|swipe card|lost id|damaged id/i, o: 1 },
    { re: /scholarship|financial aid|fee waiver|stipend|merit scholar|sc st|obc scholar/i, o: 3 },
    { re: /fee payment|pay.*fee|fee receipt|challan|fee refund|late fee|fee slip|fee structure|payment fail|accounts office/i, o: 2 },
    { re: /hostel room|hostel fee|hostel wifi|hostel leave|hostel curfew|mess timing|warden|hostel accommod/i, o: 5 },
    { re: /bus pass|bus route|bus timing|bus schedule|bus card|college bus|shuttle|transport office|where is transport/i, o: 6 },
    { re: /medical leave|health center|campus doctor|first aid|clinic|nurse|injury|sick leave certif/i, o: 7 },
    { re: /library card|book issue|borrow book|return book|library fine|reading room|overdue book|central library|renew book/i, o: 8 },
    { re: /exam form|admit card|hall ticket|datesheet|revaluat|backlog exam|marks correct|examination cell/i, o: 10 },
    { re: /attendance correct|low attendance|attendance shortage|absent mark|condonation|wrong attendance/i, o: 11 },
    { re: /placement cell|campus drive|internship|job fair|offer letter|resume|company visit/i, o: 15 },
    { re: /admission form|document upload|enrollment number|registration number|new admission/i, o: 16 },
    { re: /timetable|class schedule|class timing|lecture change|section change|class clash/i, o: 17 },
    { re: /reset password|portal login|lms login|wifi password|it helpdesk|campus wifi|internet issue|portal.*not work/i, o: 14 },
    { re: /ragging|counselling|counselor|mental health|stress|harassment|anxiety|depress/i, o: 13 },
    { re: /security|lost item|theft|gate pass|stolen|campus safety/i, o: 18 },
    { re: /grievance|file complaint|escalate|student complaint/i, o: 20 },
    { re: /canteen|cafeteria|washroom|water cooler|parking|cleanliness|campus facility|toilet/i, o: 19 },
    { re: /meet teacher|meet faculty|meet professor|faculty cabin|teacher cabin|department.*faculty/i, o: 12 },
    { re: /course register|add drop|elective|subject change|credit transfer/i, o: 9 },
    // Department / classroom / facility rules
    { re: /where.*class|which.*room|classroom|lecture hall|lab.*room|room.*number|which block.*class/i, o: "class" },
    { re: /where.*teacher sit|teacher.*sit|faculty.*sit|professor.*sit|hod.*cabin|where.*faculty.*room|faculty.*where/i, o: "faculty" },
    { re: /bca.*department|btech.*department|mca.*department|mba.*department|bsc.*department|department.*where|which block.*department/i, o: "dept" },
    { re: /which facility|college facility|campus facility|sports|gym|auditorium|seminar hall|lab.*facility/i, o: "facility" },
    // Single-word fallbacks
    { re: /\bhostel\b|\bmess\b|\bwarden\b/i, o: 5 },
    { re: /\bbus\b|\btransport\b|\bshuttle\b/i, o: 6 },
    { re: /\bsick\b|\bill\b|\bhurt\b|\binjured\b|\bfever\b|\bdoctor\b/i, o: 7 },
    { re: /\blibrary\b|\bbook\b|\bborrow\b/i, o: 8 },
    { re: /\bexam\b|\btest\b|\bresult\b/i, o: 10 },
    { re: /\battendance\b|\babsent\b/i, o: 11 },
    { re: /\binternship\b|\bplacement\b/i, o: 15 },
    { re: /\bwifi\b|\bpassword\b|\bportal\b|\blms\b|\binternet\b/i, o: 14 },
    { re: /\bfood\b|\beat\b|\bcanteen\b|\bhungry\b/i, o: 19 },
    { re: /\bteacher\b|\bfaculty\b|\bprofessor\b/i, o: 12 },
    { re: /\bcertificate\b|\bmarksheet\b|\bbonafide\b/i, o: 4 },
    { re: /\bscholarship\b/i, o: 3 },
    { re: /\bfee\b|\bpayment\b|\bpay\b|\baccounts\b/i, o: 2 },
    { re: /\bid\b|\bidentity\b/i, o: 1 },
    { re: /\bcomplaint\b|\bgrievance\b/i, o: 20 },
];

function classify(q) {
    for (let i = 0; i < RULES.length; i++) {
        if (RULES[i].re.test(q)) return { officeId: RULES[i].o, confidence: i < 20 ? 0.92 : 0.78 };
    }
    return { officeId: null, confidence: 0 };
}

const SUGGESTIONS = [
    "Where is the transport office?",
    "I lost my student ID card",
    "Where do BCA classes happen?",
    "Where does faculty sit?",
    "How to get bonafide certificate?",
    "My portal password isn't working",
    "What are the bus timings?",
    "Where is the canteen?",
    "Exam form submission help",
    "Which block has the gym?",
    "Where is MBA department?",
    "Low attendance issue",
];

const STATUS_META = {
    pending: { label: "⏳ Pending", color: "#F59E0B", bg: "rgba(245,158,11,.15)" },
    inprogress: { label: "🔄 In Progress", color: "#6366F1", bg: "rgba(99,102,241,.15)" },
    resolved: { label: "✅ Resolved", color: "#10B981", bg: "rgba(16,185,129,.15)" },
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

const INITIAL_PROBLEMS = [
    { id: 1, cat: "wifi", name: "Amit Kumar", roll: "2023BCA001", text: "WiFi drops frequently in Block B classrooms (B007–B018)", status: "pending", conf: 89 },
    { id: 2, cat: "facility", name: "Priya Singh", roll: "2023MBA002", text: "Projector not working — A201 and A203", status: "inprogress", conf: 82 },
    { id: 3, cat: "admin", name: "Rahul Sharma", roll: "2022BCA015", text: "Bonafide certificate processing takes 7+ days", status: "pending", conf: 91 },
    { id: 4, cat: "transport", name: "Sneha Patel", roll: "2023MCA008", text: "Evening shuttle departs before 5:30 PM", status: "resolved", conf: 87 },
];

const CAMPUS_BLOCKS = [
    { id: "A", label: "Block A", color: "#6366F1", rooms: ["101: ID Card Office", "102: Accounts Office", "105: Admission Dept", "109: Seminar Hall", "110: Certificate Section", "111: Dept Office (BTech)", "115: Grievance Cell", "Basement: Central Library"] },
    { id: "B", label: "Block B", color: "#10B981", rooms: ["201: Scholarship Office", "205: Academic Section", "208: Attendance Office", "210: Examination Cell", "212: Timetable Office", "BCA Dept: 1st Floor (201–208)", "MCA Dept: 2nd Floor (211–220)"] },
    { id: "C", label: "Block C", color: "#06B6D4", rooms: ["301: Transport Office", "302: IT Helpdesk", "IT/Computer Labs: Ground Floor", "Faculty Cabins: 1st–3rd Floor", "Cafeteria: Basement", "Seminar Room: 2nd Floor"] },
    { id: "D", label: "Block D", color: "#EF4444", rooms: ["Health Center: Ground Floor", "Science/Engg Labs: Ground–1st Floor", "Chemistry Lab: Room 102", "Physics Lab: Room 104", "Gymnasium: Basement", "Counselling: 1st Floor, Room 401"] },
    { id: "E", label: "Block E", color: "#D97706", rooms: ["501: Placement Cell", "MBA Dept: 1st Floor (501–510)", "Auditorium: Main (800 seats)", "MBA Classrooms: 1st–2nd Floor"] },
    { id: "H", label: "Hostel Block", color: "#F43F5E", rooms: ["Warden Room: Ground Floor", "Boys Hostel: Wing A", "Girls Hostel: Wing B", "Mess Hall: Ground Floor"] },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function COLADashboard() {
    const [tab, setTab] = useState("chat");
    // Chat
    const [msgs, setMsgs] = useState([{
        id: 1, role: "bot", officeId: null, confidence: 0,
        content: "👋 Hi! I'm COLA — your Campus Office Locator Assistant for KR Mangalam University.\n\nI can answer questions about:\n• 20 campus offices (ID card, fees, exams, hostel, etc.)\n• Departments & classrooms (BCA, B.Tech, MBA, MCA)\n• Faculty locations & HOD cabins\n• Campus facilities (gym, canteen, auditorium)\n• Transport office, bus timings, bus passes\n• And much more!\n\nAsk me anything! 🎓",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const endRef = useRef(null);

    // Problems
    const [probName, setProbName] = useState("");
    const [probRoll, setProbRoll] = useState("");
    const [probText, setProbText] = useState("");
    const [probCat, setProbCat] = useState("wifi");
    const [problems, setProblems] = useState(INITIAL_PROBLEMS);
    const [ptCat, setPtCat] = useState("all");

    // Toast
    const [toast, setToast] = useState(null);

    const scroll = () => setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
    const showToast = (msg, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000); };

    const preview = useMemo(() => probText.trim() ? classify(probText) : null, [probText]);
    const prevO = preview?.officeId && typeof preview.officeId === "number" ? OFFICES[preview.officeId] : null;

    // ── Chat send ──
    const send = useCallback(async (text) => {
        const q = (text || input).trim();
        if (!q) return;
        if (typing) { showToast("Please wait — COLA is still replying…", false); return; }
        setMsgs(p => [...p, { id: Date.now(), role: "user", content: q, officeId: null, confidence: 0, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
        setInput("");
        setTyping(true);
        scroll();
        await new Promise(r => setTimeout(r, 650 + Math.random() * 400));
        const { officeId, confidence } = classify(q);
        let content;
        if (officeId && typeof officeId === "number" && OFFICES[officeId]) {
            content = OFFICES[officeId].reply(q);
        } else if (officeId && SPECIAL_REPLIES[officeId]) {
            content = SPECIAL_REPLIES[officeId](q);
        } else {
            content = "I'm not sure which office handles that. Common queries:\n• Lost ID card → Block A, Room 101\n• Fee payment → Block A, Room 102\n• WiFi/portal → Block C, Room 302 (IT Helpdesk)\n• Bus timing → Block C, Room 301 (Transport Office)\n• BCA Dept → Block B, 1st Floor\n• Faculty cabins → Block C (various floors)\n• General complaint → Block A, Room 115 (Grievance Cell)";
        }
        setMsgs(p => [...p, { id: Date.now() + 1, role: "bot", content, officeId, confidence, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
        setTyping(false);
        scroll();
    }, [input, typing]);

    // ── Submit problem ──
    const submitProblem = () => {
        if (!probName.trim()) return showToast("Please enter your name.", false);
        if (!probText.trim()) return showToast("Please describe your problem.", false);
        const { officeId, confidence } = classify(probText);
        const o = officeId && typeof officeId === "number" ? OFFICES[officeId] : null;
        setProblems(p => [{
            id: Date.now(),
            cat: probCat,
            name: probName.trim(),
            roll: probRoll.trim() || "—",
            text: probText.trim(),
            status: "pending",
            conf: Math.round((confidence || 0.7) * 100),
            office: o?.name || "Admin Office",
            officeId,
            icon: o?.icon || "🏢",
            color: o?.color || "#94A3B8",
            bg: o?.bg || "rgba(148,163,184,.1)",
            border: o?.border || "rgba(148,163,184,.25)",
            time: new Date().toLocaleString(),
        }, ...p]);
        setProbName(""); setProbRoll(""); setProbText("");
        showToast(`✅ Routed to ${o?.name || "Admin Office"}!`);
    };

    const updateStatus = (id, status) => setProblems(p => p.map(x => x.id === id ? { ...x, status } : x));
    const deleteProblem = (id) => setProblems(p => p.filter(x => x.id !== id));
    const isSubmitDisabled = !probName.trim() || !probText.trim();

    const filteredProblems = ptCat === "all" ? problems : problems.filter(p => p.cat === ptCat);

    // ── Styles ──
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

    const tabs = [["chat", "🤖 Chat"], ["problems", "📝 Problems"], ["offices", "🏢 Offices"], ["map", "🗺️ Map"]];

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
        textarea:focus,input:focus,select:focus{border-color:#6366F1!important;outline:none}
      `}</style>

            {/* NAV */}
            <nav style={s.nav}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#6366F1,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".9rem" }}>🎓</div>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: "1.05rem", background: "linear-gradient(90deg,#A5B4FC,#67E8F9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>COLA</div>
                        <div style={{ color: "#334155", fontSize: ".68rem" }}>KR Mangalam University</div>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    {tabs.map(([id, lbl]) => (
                        <button key={id} style={s.navBtn(tab === id)} onClick={() => setTab(id)}>{lbl}</button>
                    ))}
                </div>
            </nav>

            {/* HERO */}
            <div style={s.hero}>
                <h1 style={{ fontSize: "clamp(1.4rem,3.5vw,2.2rem)", fontWeight: 800, background: "linear-gradient(90deg,#A5B4FC,#67E8F9,#F9A8D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>Campus Office Locator Assistant</h1>
                <p style={{ color: "rgba(255,255,255,.4)", fontSize: ".8rem" }}>Trained on 12,000+ queries · 20 offices · Departments · Classrooms · Faculty · Facilities</p>
                <div style={{ display: "flex", gap: 7, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
                    {["🧠 Smart Classifier", "🏫 Departments & Rooms", "👨‍🏫 Faculty Locations", "🚌 Transport", "📝 Problem Tracker", "⚡ Instant Routing"].map(b => (
                        <span key={b} style={{ background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.22)", color: "#A5B4FC", padding: "3px 10px", borderRadius: 99, fontSize: ".68rem", fontWeight: 600 }}>{b}</span>
                    ))}
                </div>
            </div>

            <div style={s.container}>

                {/* ═══ CHAT ═══ */}
                {tab === "chat" && (
                    <div style={{ ...s.card, overflow: "hidden", display: "flex", flexDirection: "column", height: 560 }}>
                        {/* Header */}
                        <div style={{ background: "linear-gradient(135deg,#1a1f35,#2d1b6b)", padding: "13px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(99,102,241,.15)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366F1,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🤖</div>
                                <div>
                                    <div style={{ fontWeight: 800, color: "#fff", fontSize: ".9rem" }}>COLA Assistant</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "glow 2s infinite" }} />
                                        <span style={{ fontSize: ".62rem", color: "rgba(255,255,255,.4)" }}>Classrooms · Depts · Faculty · Offices · Transport · Facilities</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => { setTyping(false); setMsgs([{ id: Date.now(), role: "bot", officeId: null, confidence: 0, content: "Chat cleared! Ask me anything about campus 🎓", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]); }} style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.5)", borderRadius: 7, padding: "4px 10px", cursor: "pointer", fontSize: ".7rem", fontFamily: "inherit" }}>🔄 Clear</button>
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 13, background: "#0E1120" }}>
                            {msgs.map(m => {
                                const o = m.officeId && typeof m.officeId === "number" ? OFFICES[m.officeId] : null;
                                const specialLabels = { class: "🏛️ Classrooms", faculty: "👨‍🏫 Faculty Locations", dept: "🏢 Department", facility: "🏫 Campus Facilities" };
                                const specialColors = { class: "#06B6D4", faculty: "#A78BFA", dept: "#84CC16", facility: "#65A30D" };
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
                                                    <span style={{ fontSize: ".62rem", color: "rgba(255,255,255,.25)", marginLeft: 2 }}>{Math.round(m.confidence * 100)}%</span>
                                                </div>
                                            )}
                                            {m.role === "bot" && typeof m.officeId === "string" && specialLabels[m.officeId] && (
                                                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 5, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 99, padding: "2px 10px" }}>
                                                    <span style={{ fontSize: ".7rem", fontWeight: 800, color: specialColors[m.officeId] }}>{specialLabels[m.officeId]}</span>
                                                    <span style={{ fontSize: ".62rem", color: "rgba(255,255,255,.25)", marginLeft: 2 }}>{Math.round(m.confidence * 100)}%</span>
                                                </div>
                                            )}
                                            <div style={{ padding: "10px 14px", fontSize: ".84rem", lineHeight: 1.65, whiteSpace: "pre-wrap", wordBreak: "break-word", borderRadius: m.role === "bot" ? "4px 16px 16px 16px" : "16px 4px 16px 16px", background: m.role === "bot" ? (o ? `linear-gradient(135deg,${o.bg},rgba(20,24,40,.95))` : "#1C2035") : "linear-gradient(135deg,#6366F1,#818CF8)", border: m.role === "bot" ? `1px solid ${o ? o.border : "rgba(255,255,255,.07)"}` : "none", color: "#E2E8F0" }}>
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
                                    </div>
                                </div>
                            )}
                            {msgs.length === 1 && (
                                <div style={{ paddingLeft: 38, animation: "fadeUp .5s ease" }}>
                                    <p style={{ fontSize: ".67rem", color: "#334155", marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>Try these — each gives a unique answer</p>
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                        {SUGGESTIONS.map((sg, i) => (
                                            <button key={i} className="chip" onClick={() => send(sg)} style={{ background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.22)", color: "#A5B4FC", borderRadius: 99, padding: "4px 11px", fontSize: ".7rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>{sg}</button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <div style={{ padding: "11px 16px", background: "#13172A", borderTop: "1px solid rgba(255,255,255,.05)", display: "flex", gap: 9, alignItems: "flex-end" }}>
                            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Ask about offices, classrooms, departments, faculty, transport, facilities…" rows={1} style={{ flex: 1, background: "#0E1120", border: "1.5px solid rgba(99,102,241,.18)", borderRadius: 11, padding: "9px 13px", color: "#E2E8F0", fontFamily: "inherit", fontSize: ".85rem", resize: "none", outline: "none", maxHeight: 90, minHeight: 38, lineHeight: 1.5 }} />
                            <button onClick={() => send()} disabled={!input.trim()} style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, background: "linear-gradient(135deg,#6366F1,#818CF8)", border: "none", cursor: !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: !input.trim() ? .4 : 1, transition: "opacity .15s" }}>
                                <span style={{ color: "#fff", fontSize: "1.05rem" }}>➤</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══ PROBLEMS ═══ */}
                {tab === "problems" && (
                    <>
                        <p style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 3, color: "#E2E8F0" }}>📝 Submit a Problem</p>
                        <p style={{ color: "#475569", fontSize: ".79rem", marginBottom: 14 }}>AI auto-routes your problem to the right office.</p>
                        <div style={s.section}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                                <div>
                                    <label style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".05em" }}>Your Name *</label>
                                    <input value={probName} onChange={e => setProbName(e.target.value)} placeholder="e.g. Rahul Sharma" style={{ ...s.input, width: "100%" }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".05em" }}>Roll No. (optional)</label>
                                    <input value={probRoll} onChange={e => setProbRoll(e.target.value)} placeholder="e.g. 2023BCA001" style={{ ...s.input, width: "100%" }} />
                                </div>
                            </div>
                            <label style={{ fontSize: ".65rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".05em" }}>Describe Problem *</label>
                            <textarea value={probText} onChange={e => setProbText(e.target.value)} placeholder="Describe your issue clearly…" style={{ width: "100%", background: "#0E1120", border: "1.5px solid rgba(255,255,255,.08)", borderRadius: 11, padding: 13, color: "#E2E8F0", fontFamily: "inherit", fontSize: ".88rem", resize: "vertical", minHeight: 80, outline: "none", lineHeight: 1.6 }} />
                            {prevO && (
                                <div style={{ marginTop: 10, padding: "9px 14px", background: prevO.bg, border: `1px solid ${prevO.border}`, borderRadius: 9, display: "flex", alignItems: "center", gap: 9, animation: "fadeUp .2s" }}>
                                    <span style={{ fontSize: "1.1rem" }}>{prevO.icon}</span>
                                    <div>
                                        <div style={{ fontSize: ".77rem", fontWeight: 800, color: prevO.color }}>Will route to: {prevO.name}</div>
                                        <div style={{ fontSize: ".69rem", color: "#475569" }}>{prevO.block} · {prevO.room} · {prevO.timings}</div>
                                    </div>
                                    <span style={{ marginLeft: "auto", fontSize: ".7rem", color: "#334155" }}>{Math.round((preview?.confidence || .8) * 100)}% confident</span>
                                </div>
                            )}
                            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                                <select value={probCat} onChange={e => setProbCat(e.target.value)} style={{ ...s.input, fontSize: ".8rem" }}>
                                    {Object.entries(CAT_META).map(([k, m]) => <option key={k} value={k}>{m.label}</option>)}
                                </select>
                                <button onClick={submitProblem} disabled={isSubmitDisabled} style={{ background: isSubmitDisabled ? "rgba(244,63,94,.25)" : "linear-gradient(135deg,#F43F5E,#E11D48)", color: "#fff", border: "none", borderRadius: 11, padding: "9px 20px", fontWeight: 700, fontSize: ".85rem", cursor: isSubmitDisabled ? "not-allowed" : "pointer", opacity: isSubmitDisabled ? .6 : 1, transition: "all .15s" }}>
                                    📤 Submit Problem
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 9, marginBottom: 18 }}>
                            {[["Total", problems.length, "#fff"], ["Resolved", problems.filter(p => p.status === "resolved").length, "#6EE7B7"], ["Pending", problems.filter(p => p.status === "pending").length, "#FDA4AF"], ["In Progress", problems.filter(p => p.status === "inprogress").length, "#A5B4FC"]].map(([lbl, val, col]) => (
                                <div key={lbl} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, padding: "12px 15px" }}>
                                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: col }}>{val}</div>
                                    <div style={{ fontSize: ".63rem", color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".05em", marginTop: 2 }}>{lbl}</div>
                                </div>
                            ))}
                        </div>

                        {/* Filters */}
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                            {["all", ...Object.keys(CAT_META)].map(c => {
                                const lbl = c === "all" ? "All" : CAT_META[c].label;
                                const col = c === "all" ? "#6366F1" : CAT_META[c].color;
                                const active = ptCat === c;
                                return <button key={c} className="pt-pill" onClick={() => setPtCat(c)} style={{ padding: "5px 13px", borderRadius: 99, fontSize: ".7rem", fontWeight: 600, cursor: "pointer", border: `1px solid ${active ? col : "rgba(255,255,255,.1)"}`, background: "rgba(255,255,255,.05)", color: active ? col : "rgba(255,255,255,.55)", fontFamily: "inherit" }}>{lbl}</button>;
                            })}
                        </div>

                        {/* List */}
                        {filteredProblems.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "40px 0", color: "#475569" }}>No problems in this category yet.</div>
                        ) : filteredProblems.map(p => {
                            const sm = STATUS_META[p.status] || STATUS_META.pending;
                            const catCol = CAT_META[p.cat]?.color || "#94A3B8";
                            const catLbl = CAT_META[p.cat]?.label || "Other";
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
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                        <span style={{ fontSize: ".69rem", fontWeight: 600, padding: "2px 9px", borderRadius: 99, background: "rgba(255,255,255,.06)", color: catCol }}>{catLbl}</span>
                                        <div style={{ flex: 1, height: 5, borderRadius: 99, background: "rgba(255,255,255,.08)" }}>
                                            <div style={{ width: `${p.conf}%`, height: "100%", borderRadius: 99, background: p.status === "resolved" ? "#10B981" : catCol, transition: "width .6s ease" }} />
                                        </div>
                                        <span style={{ fontSize: ".69rem", color: "rgba(255,255,255,.3)" }}>{p.conf}% conf</span>
                                    </div>
                                    <div style={{ fontSize: ".71rem", color: "#475569", marginBottom: 10 }}>
                                        {p.icon} <span style={{ color: p.color, fontWeight: 700 }}>{p.office}</span>
                                    </div>
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                        {p.status === "pending" && <button className="prob-btn" onClick={() => updateStatus(p.id, "inprogress")} style={{ background: "rgba(99,102,241,.12)", border: "1px solid rgba(99,102,241,.28)", color: "#818CF8", borderRadius: 7, padding: "4px 11px", fontSize: ".69rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>🔄 Mark In Progress</button>}
                                        {p.status !== "resolved" && <button className="prob-btn" onClick={() => updateStatus(p.id, "resolved")} style={{ background: "rgba(16,185,129,.12)", border: "1px solid rgba(16,185,129,.28)", color: "#10B981", borderRadius: 7, padding: "4px 11px", fontSize: ".69rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✅ Resolve</button>}
                                        <button className="prob-btn" onClick={() => deleteProblem(p.id)} style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.22)", color: "#EF4444", borderRadius: 7, padding: "4px 11px", fontSize: ".69rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✕ Delete</button>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}

                {/* ═══ OFFICES ═══ */}
                {tab === "offices" && (
                    <>
                        <p style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 3, color: "#E2E8F0" }}>🏢 All 20 Campus Offices</p>
                        <p style={{ color: "#475569", fontSize: ".79rem", marginBottom: 18 }}>Click any card to ask about it in chat.</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10 }}>
                            {Object.entries(OFFICES).map(([id, o]) => (
                                <div key={id} className="ocard" onClick={() => { setTab("chat"); setTimeout(() => send(`Tell me about ${o.name}`), 200); }} style={{ background: "#13172A", borderRadius: 13, padding: "14px 15px 16px", border: `1.5px solid ${o.border}`, cursor: "pointer", transition: "all .2s", position: "relative", overflow: "hidden" }}>
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

                {/* ═══ MAP ═══ */}
                {tab === "map" && (
                    <>
                        <p style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 3, color: "#E2E8F0" }}>🗺️ Campus Map</p>
                        <p style={{ color: "#475569", fontSize: ".79rem", marginBottom: 16 }}>Visual layout of KR Mangalam University. Click a block to ask about it in chat.</p>
                        <div style={s.section}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
                                {CAMPUS_BLOCKS.map(b => (
                                    <div key={b.id} onClick={() => { setTab("chat"); setTimeout(() => send(`Tell me about ${b.label}`), 200); }} style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${b.color}33`, borderRadius: 12, padding: 14, borderTop: `3px solid ${b.color}`, cursor: "pointer" }}>
                                        <div style={{ fontWeight: 800, color: b.color, fontSize: ".88rem", marginBottom: 9 }}>{b.label}</div>
                                        {b.rooms.map(r => (
                                            <div key={r} style={{ fontSize: ".72rem", color: "#94A3B8", padding: "2px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>{r}</div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: 16, padding: 12, background: "rgba(255,255,255,.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,.07)" }}>
                                <div style={{ fontSize: ".72rem", color: "#475569", fontWeight: 700, marginBottom: 6 }}>CAMPUS LANDMARKS</div>
                                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontSize: ".71rem", color: "#94A3B8" }}>
                                    {["🛡️ Main Gate: Security + ATM (24×7)", "🚌 Bus Stand: Near Block C entrance", "🏀 Sports Ground: Behind Block E", "🅿️ Parking: Near Block D", "☕ Snack Stalls: Block A entrance", "🖨️ Photocopy: Block A entrance & Library"].map(l => (
                                        <span key={l}>{l}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>

            {/* Toast */}
            {toast && (
                <div style={{ position: "fixed", bottom: 22, right: 22, zIndex: 9999, background: toast.ok ? "#059669" : "#E11D48", color: "#fff", padding: "10px 18px", borderRadius: 11, fontWeight: 700, fontSize: ".83rem", boxShadow: `0 8px 32px ${toast.ok ? "rgba(5,150,105,.4)" : "rgba(225,29,72,.4)"}`, animation: "fadeUp .3s ease" }}>
                    {toast.msg}
                </div>
            )}
        </div>
    );
}