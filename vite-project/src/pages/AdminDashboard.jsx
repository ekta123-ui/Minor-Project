import { useState, useMemo, useRef, useEffect } from "react";
import {
    LayoutDashboard, MessageSquareWarning, ClipboardList,
    BarChart3, LogOut, Menu, CheckCircle, XCircle, Trash2,
    MessageSquare, Send, ChevronDown, ChevronUp, Star,
    Users, TrendingUp, Bell, Search, Filter, RefreshCw, X,
    Mail, GraduationCap, Building2, Phone, BookOpen, Layers,
    UserCheck, Bot, User,
} from "lucide-react";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

// ════════════════════════════════════════════════════════════════
//  COLA TEACHER DATA (200 records)
// ════════════════════════════════════════════════════════════════
const TEACHERS = [
    { id: 1, name: "Vikas Sharma", school: 5, designation: "Assistant Professor", email: "vikas.sharma@cola.com", phone: "9848096238", gender: "Male", domain: "Computer Science", block: "C", coord: "Project Coordinator" },
    { id: 2, name: "Amit Verma", school: 3, designation: "Lecturer", email: "amit.verma@cola.com", phone: "9537007213", gender: "Female", domain: "Civil", block: "C", coord: "Student Welfare" },
    { id: 3, name: "Arjun Mehta", school: 8, designation: "Assistant Professor", email: "arjun.mehta@cola.com", phone: "9634347749", gender: "Male", domain: "Mechanical", block: "D", coord: "Exam Coordinator" },
    { id: 4, name: "Amit Arora", school: 8, designation: "Lecturer", email: "amit.arora@cola.com", phone: "9060418269", gender: "Male", domain: "Commerce", block: "C", coord: "Exam Coordinator" },
    { id: 5, name: "Priya Sharma", school: 4, designation: "Professor", email: "priya.sharma@cola.com", phone: "9209986576", gender: "Female", domain: "IT", block: "B", coord: "Student Welfare" },
    { id: 6, name: "Amit Kapoor", school: 7, designation: "Professor", email: "amit.kapoor@cola.com", phone: "9662101010", gender: "Male", domain: "IT", block: "D", coord: "Academic Coordinator" },
    { id: 7, name: "Rahul Kapoor", school: 3, designation: "Lecturer", email: "rahul.kapoor@cola.com", phone: "9712343938", gender: "Female", domain: "IT", block: "D", coord: "Student Welfare" },
    { id: 8, name: "Pooja Bansal", school: 2, designation: "Assistant Professor", email: "pooja.bansal@cola.com", phone: "9263576043", gender: "Female", domain: "Mechanical", block: "B", coord: "Student Welfare" },
    { id: 9, name: "Vikas Arora", school: 6, designation: "Lecturer", email: "vikas.arora@cola.com", phone: "9898764610", gender: "Male", domain: "Computer Science", block: "C", coord: "Exam Coordinator" },
    { id: 10, name: "Rahul Kapoor", school: 8, designation: "Professor", email: "rahul.kapoor@cola.com", phone: "9064571013", gender: "Female", domain: "Business", block: "C", coord: "Exam Coordinator" },
    { id: 11, name: "Pooja Mehta", school: 3, designation: "Professor", email: "pooja.mehta@cola.com", phone: "9519603368", gender: "Male", domain: "Law", block: "B", coord: "Academic Coordinator" },
    { id: 12, name: "Suresh Arora", school: 5, designation: "Professor", email: "suresh.arora@cola.com", phone: "9111316734", gender: "Male", domain: "Law", block: "D", coord: "Academic Coordinator" },
    { id: 13, name: "Amit Gupta", school: 8, designation: "Assistant Professor", email: "amit.gupta@cola.com", phone: "9766894356", gender: "Male", domain: "Business", block: "B", coord: "Student Welfare" },
    { id: 14, name: "Priya Sharma", school: 3, designation: "Professor", email: "priya.sharma@cola.com", phone: "9494951762", gender: "Male", domain: "Commerce", block: "D", coord: "Lab Coordinator" },
    { id: 15, name: "Vikas Agarwal", school: 2, designation: "Professor", email: "vikas.agarwal@cola.com", phone: "9664931782", gender: "Male", domain: "IT", block: "B", coord: "Exam Coordinator" },
    { id: 16, name: "Rohit Gupta", school: 5, designation: "Assistant Professor", email: "rohit.gupta@cola.com", phone: "9127364540", gender: "Female", domain: "Civil", block: "A", coord: "Academic Coordinator" },
    { id: 17, name: "Pooja Verma", school: 5, designation: "Lecturer", email: "pooja.verma@cola.com", phone: "9334290553", gender: "Female", domain: "Commerce", block: "C", coord: "Project Coordinator" },
    { id: 18, name: "Karan Bansal", school: 4, designation: "Professor", email: "karan.bansal@cola.com", phone: "9754587208", gender: "Male", domain: "Psychology", block: "D", coord: "Student Welfare" },
    { id: 19, name: "Meena Arora", school: 1, designation: "Associate Professor", email: "meena.arora@cola.com", phone: "9633096840", gender: "Male", domain: "Business", block: "A", coord: "Student Welfare" },
    { id: 20, name: "Arjun Arora", school: 8, designation: "Lecturer", email: "arjun.arora@cola.com", phone: "9779897792", gender: "Male", domain: "Computer Science", block: "B", coord: "Student Welfare" },
    { id: 21, name: "Arjun Agarwal", school: 5, designation: "Associate Professor", email: "arjun.agarwal@cola.com", phone: "9332369550", gender: "Female", domain: "Business", block: "B", coord: "Student Welfare" },
    { id: 22, name: "Amit Sharma", school: 2, designation: "Professor", email: "amit.sharma@cola.com", phone: "9494824669", gender: "Male", domain: "Computer Science", block: "D", coord: "Lab Coordinator" },
    { id: 23, name: "Riya Yadav", school: 5, designation: "Lecturer", email: "riya.yadav@cola.com", phone: "9783417253", gender: "Female", domain: "Commerce", block: "A", coord: "Student Welfare" },
    { id: 24, name: "Arjun Sharma", school: 5, designation: "Assistant Professor", email: "arjun.sharma@cola.com", phone: "9587584706", gender: "Male", domain: "Civil", block: "C", coord: "Lab Coordinator" },
    { id: 25, name: "Arjun Agarwal", school: 6, designation: "Assistant Professor", email: "arjun.agarwal@cola.com", phone: "9288245915", gender: "Female", domain: "Law", block: "C", coord: "Project Coordinator" },
    { id: 26, name: "Suresh Mehta", school: 5, designation: "Associate Professor", email: "suresh.mehta@cola.com", phone: "9831692174", gender: "Male", domain: "Psychology", block: "B", coord: "Lab Coordinator" },
    { id: 27, name: "Deepak Gupta", school: 4, designation: "Associate Professor", email: "deepak.gupta@cola.com", phone: "9154876710", gender: "Male", domain: "Psychology", block: "B", coord: "Project Coordinator" },
    { id: 28, name: "Anita Arora", school: 6, designation: "Lecturer", email: "anita.arora@cola.com", phone: "9410672073", gender: "Female", domain: "Psychology", block: "C", coord: "Academic Coordinator" },
    { id: 29, name: "Anita Singh", school: 1, designation: "Associate Professor", email: "anita.singh@cola.com", phone: "9891475765", gender: "Female", domain: "Commerce", block: "B", coord: "Academic Coordinator" },
    { id: 30, name: "Rahul Yadav", school: 2, designation: "Professor", email: "rahul.yadav@cola.com", phone: "9700297336", gender: "Female", domain: "Civil", block: "A", coord: "Exam Coordinator" },
    { id: 31, name: "Rohit Bansal", school: 3, designation: "Associate Professor", email: "rohit.bansal@cola.com", phone: "9408171698", gender: "Female", domain: "Computer Science", block: "B", coord: "Academic Coordinator" },
    { id: 32, name: "Rahul Bansal", school: 7, designation: "Associate Professor", email: "rahul.bansal@cola.com", phone: "9352968262", gender: "Male", domain: "Commerce", block: "C", coord: "Student Welfare" },
    { id: 33, name: "Rahul Mehta", school: 1, designation: "Assistant Professor", email: "rahul.mehta@cola.com", phone: "9684156104", gender: "Female", domain: "Law", block: "C", coord: "Exam Coordinator" },
    { id: 34, name: "Sneha Arora", school: 6, designation: "Lecturer", email: "sneha.arora@cola.com", phone: "9085599450", gender: "Male", domain: "Law", block: "A", coord: "Student Welfare" },
    { id: 35, name: "Rahul Bansal", school: 8, designation: "Associate Professor", email: "rahul.bansal@cola.com", phone: "9919850068", gender: "Male", domain: "Mechanical", block: "A", coord: "Student Welfare" },
    { id: 36, name: "Suresh Bansal", school: 5, designation: "Assistant Professor", email: "suresh.bansal@cola.com", phone: "9116875526", gender: "Male", domain: "Business", block: "C", coord: "Lab Coordinator" },
    { id: 37, name: "Anita Mehta", school: 7, designation: "Lecturer", email: "anita.mehta@cola.com", phone: "9831532454", gender: "Female", domain: "Business", block: "D", coord: "Exam Coordinator" },
    { id: 38, name: "Meena Arora", school: 6, designation: "Associate Professor", email: "meena.arora@cola.com", phone: "9335726204", gender: "Male", domain: "Mechanical", block: "A", coord: "Project Coordinator" },
    { id: 39, name: "Amit Arora", school: 2, designation: "Assistant Professor", email: "amit.arora@cola.com", phone: "9955005203", gender: "Female", domain: "Business", block: "C", coord: "Exam Coordinator" },
    { id: 40, name: "Pooja Agarwal", school: 7, designation: "Assistant Professor", email: "pooja.agarwal@cola.com", phone: "9081790637", gender: "Male", domain: "Mechanical", block: "D", coord: "Student Welfare" },
    { id: 41, name: "Arjun Mehta", school: 4, designation: "Associate Professor", email: "arjun.mehta@cola.com", phone: "9517205536", gender: "Male", domain: "Computer Science", block: "C", coord: "Lab Coordinator" },
    { id: 42, name: "Arjun Agarwal", school: 2, designation: "Associate Professor", email: "arjun.agarwal@cola.com", phone: "9704573026", gender: "Female", domain: "Computer Science", block: "D", coord: "Project Coordinator" },
    { id: 43, name: "Riya Gupta", school: 6, designation: "Professor", email: "riya.gupta@cola.com", phone: "9564757212", gender: "Male", domain: "Law", block: "A", coord: "Lab Coordinator" },
    { id: 44, name: "Meena Singh", school: 7, designation: "Associate Professor", email: "meena.singh@cola.com", phone: "9643611667", gender: "Male", domain: "Psychology", block: "B", coord: "Project Coordinator" },
    { id: 45, name: "Rahul Mehta", school: 2, designation: "Professor", email: "rahul.mehta@cola.com", phone: "9727331212", gender: "Male", domain: "Civil", block: "A", coord: "Academic Coordinator" },
    { id: 46, name: "Vikas Singh", school: 6, designation: "Lecturer", email: "vikas.singh@cola.com", phone: "9980490930", gender: "Male", domain: "Civil", block: "C", coord: "Academic Coordinator" },
    { id: 47, name: "Vikas Singh", school: 6, designation: "Associate Professor", email: "vikas.singh@cola.com", phone: "9944113125", gender: "Male", domain: "Business", block: "A", coord: "Student Welfare" },
    { id: 48, name: "Meena Verma", school: 6, designation: "Professor", email: "meena.verma@cola.com", phone: "9525774382", gender: "Female", domain: "Computer Science", block: "A", coord: "Exam Coordinator" },
    { id: 49, name: "Suresh Agarwal", school: 1, designation: "Professor", email: "suresh.agarwal@cola.com", phone: "9475134179", gender: "Male", domain: "Commerce", block: "C", coord: "Project Coordinator" },
    { id: 50, name: "Karan Yadav", school: 4, designation: "Associate Professor", email: "karan.yadav@cola.com", phone: "9765827839", gender: "Male", domain: "Psychology", block: "C", coord: "Exam Coordinator" },
    { id: 51, name: "Vikas Sharma", school: 7, designation: "Associate Professor", email: "vikas.sharma@cola.com", phone: "9437648513", gender: "Male", domain: "Law", block: "A", coord: "Project Coordinator" },
    { id: 52, name: "Amit Verma", school: 7, designation: "Associate Professor", email: "amit.verma@cola.com", phone: "9253533840", gender: "Female", domain: "Commerce", block: "B", coord: "Exam Coordinator" },
    { id: 53, name: "Sneha Bansal", school: 6, designation: "Lecturer", email: "sneha.bansal@cola.com", phone: "9518815096", gender: "Female", domain: "Mechanical", block: "C", coord: "Academic Coordinator" },
    { id: 54, name: "Vikas Bansal", school: 4, designation: "Lecturer", email: "vikas.bansal@cola.com", phone: "9304111082", gender: "Male", domain: "Business", block: "A", coord: "Student Welfare" },
    { id: 55, name: "Amit Mehta", school: 4, designation: "Lecturer", email: "amit.mehta@cola.com", phone: "9199263058", gender: "Male", domain: "Civil", block: "B", coord: "Exam Coordinator" },
    { id: 56, name: "Rahul Yadav", school: 1, designation: "Assistant Professor", email: "rahul.yadav@cola.com", phone: "9385499785", gender: "Male", domain: "Computer Science", block: "B", coord: "Academic Coordinator" },
    { id: 57, name: "Riya Yadav", school: 2, designation: "Assistant Professor", email: "riya.yadav@cola.com", phone: "9701642429", gender: "Female", domain: "Commerce", block: "C", coord: "Lab Coordinator" },
    { id: 58, name: "Priya Gupta", school: 5, designation: "Lecturer", email: "priya.gupta@cola.com", phone: "9284443946", gender: "Female", domain: "Computer Science", block: "C", coord: "Exam Coordinator" },
    { id: 59, name: "Amit Verma", school: 6, designation: "Lecturer", email: "amit.verma@cola.com", phone: "9329473004", gender: "Female", domain: "Computer Science", block: "A", coord: "Academic Coordinator" },
    { id: 60, name: "Pooja Mehta", school: 2, designation: "Associate Professor", email: "pooja.mehta@cola.com", phone: "9627026774", gender: "Female", domain: "Business", block: "A", coord: "Academic Coordinator" },
    { id: 61, name: "Anita Arora", school: 4, designation: "Assistant Professor", email: "anita.arora@cola.com", phone: "9714704288", gender: "Male", domain: "Business", block: "B", coord: "Academic Coordinator" },
    { id: 62, name: "Deepak Arora", school: 6, designation: "Professor", email: "deepak.arora@cola.com", phone: "9731688106", gender: "Female", domain: "Business", block: "B", coord: "Exam Coordinator" },
    { id: 63, name: "Amit Bansal", school: 5, designation: "Assistant Professor", email: "amit.bansal@cola.com", phone: "9821565198", gender: "Female", domain: "Civil", block: "D", coord: "Exam Coordinator" },
    { id: 64, name: "Deepak Mehta", school: 3, designation: "Associate Professor", email: "deepak.mehta@cola.com", phone: "9064965688", gender: "Male", domain: "Business", block: "A", coord: "Lab Coordinator" },
    { id: 65, name: "Arjun Bansal", school: 4, designation: "Professor", email: "arjun.bansal@cola.com", phone: "9945905448", gender: "Male", domain: "Law", block: "A", coord: "Exam Coordinator" },
    { id: 66, name: "Deepak Singh", school: 8, designation: "Lecturer", email: "deepak.singh@cola.com", phone: "9243088286", gender: "Male", domain: "Law", block: "C", coord: "Exam Coordinator" },
    { id: 67, name: "Karan Verma", school: 2, designation: "Lecturer", email: "karan.verma@cola.com", phone: "9415764682", gender: "Female", domain: "Commerce", block: "D", coord: "Exam Coordinator" },
    { id: 68, name: "Suresh Singh", school: 6, designation: "Associate Professor", email: "suresh.singh@cola.com", phone: "9558777201", gender: "Female", domain: "Commerce", block: "C", coord: "Academic Coordinator" },
    { id: 69, name: "Vikas Verma", school: 2, designation: "Assistant Professor", email: "vikas.verma@cola.com", phone: "9802694528", gender: "Male", domain: "Psychology", block: "C", coord: "Project Coordinator" },
    { id: 70, name: "Rahul Yadav", school: 3, designation: "Professor", email: "rahul.yadav@cola.com", phone: "9921784397", gender: "Male", domain: "Business", block: "B", coord: "Student Welfare" },
    { id: 71, name: "Pooja Arora", school: 8, designation: "Associate Professor", email: "pooja.arora@cola.com", phone: "9009532996", gender: "Female", domain: "Psychology", block: "B", coord: "Student Welfare" },
    { id: 72, name: "Amit Verma", school: 2, designation: "Lecturer", email: "amit.verma@cola.com", phone: "9660034151", gender: "Female", domain: "Commerce", block: "B", coord: "Student Welfare" },
    { id: 73, name: "Priya Mehta", school: 6, designation: "Associate Professor", email: "priya.mehta@cola.com", phone: "9391595564", gender: "Male", domain: "Computer Science", block: "A", coord: "Student Welfare" },
    { id: 74, name: "Amit Bansal", school: 5, designation: "Associate Professor", email: "amit.bansal@cola.com", phone: "9142216348", gender: "Male", domain: "Business", block: "C", coord: "Student Welfare" },
    { id: 75, name: "Meena Agarwal", school: 2, designation: "Lecturer", email: "meena.agarwal@cola.com", phone: "9848448599", gender: "Male", domain: "IT", block: "A", coord: "Lab Coordinator" },
    { id: 76, name: "Karan Singh", school: 3, designation: "Associate Professor", email: "karan.singh@cola.com", phone: "9794788704", gender: "Male", domain: "Law", block: "B", coord: "Student Welfare" },
    { id: 77, name: "Suresh Kapoor", school: 8, designation: "Assistant Professor", email: "suresh.kapoor@cola.com", phone: "9210293820", gender: "Female", domain: "Mechanical", block: "D", coord: "Student Welfare" },
    { id: 78, name: "Meena Yadav", school: 5, designation: "Assistant Professor", email: "meena.yadav@cola.com", phone: "9736238088", gender: "Male", domain: "Computer Science", block: "C", coord: "Exam Coordinator" },
    { id: 79, name: "Priya Kapoor", school: 8, designation: "Lecturer", email: "priya.kapoor@cola.com", phone: "9068173761", gender: "Female", domain: "Law", block: "B", coord: "Exam Coordinator" },
    { id: 80, name: "Meena Verma", school: 6, designation: "Professor", email: "meena.verma@cola.com", phone: "9483896891", gender: "Male", domain: "Business", block: "C", coord: "Project Coordinator" },
    { id: 81, name: "Priya Sharma", school: 2, designation: "Professor", email: "priya.sharma@cola.com", phone: "9862507229", gender: "Male", domain: "Civil", block: "A", coord: "Student Welfare" },
    { id: 82, name: "Deepak Bansal", school: 1, designation: "Assistant Professor", email: "deepak.bansal@cola.com", phone: "9170696079", gender: "Female", domain: "Civil", block: "A", coord: "Academic Coordinator" },
    { id: 83, name: "Vikas Agarwal", school: 1, designation: "Assistant Professor", email: "vikas.agarwal@cola.com", phone: "9750105357", gender: "Female", domain: "IT", block: "B", coord: "Lab Coordinator" },
    { id: 84, name: "Riya Gupta", school: 2, designation: "Assistant Professor", email: "riya.gupta@cola.com", phone: "9460023986", gender: "Female", domain: "Commerce", block: "A", coord: "Exam Coordinator" },
    { id: 85, name: "Deepak Yadav", school: 4, designation: "Professor", email: "deepak.yadav@cola.com", phone: "9559894669", gender: "Male", domain: "Law", block: "D", coord: "Project Coordinator" },
    { id: 86, name: "Meena Arora", school: 1, designation: "Assistant Professor", email: "meena.arora@cola.com", phone: "9735878042", gender: "Female", domain: "Civil", block: "B", coord: "Lab Coordinator" },
    { id: 87, name: "Riya Agarwal", school: 6, designation: "Professor", email: "riya.agarwal@cola.com", phone: "9757901904", gender: "Male", domain: "Commerce", block: "D", coord: "Student Welfare" },
    { id: 88, name: "Neha Yadav", school: 3, designation: "Assistant Professor", email: "neha.yadav@cola.com", phone: "9422950756", gender: "Male", domain: "Commerce", block: "D", coord: "Exam Coordinator" },
    { id: 89, name: "Riya Yadav", school: 6, designation: "Assistant Professor", email: "riya.yadav@cola.com", phone: "9851031129", gender: "Female", domain: "Computer Science", block: "B", coord: "Student Welfare" },
    { id: 90, name: "Karan Verma", school: 2, designation: "Lecturer", email: "karan.verma@cola.com", phone: "9650618897", gender: "Female", domain: "Civil", block: "C", coord: "Lab Coordinator" },
    { id: 91, name: "Neha Singh", school: 7, designation: "Professor", email: "neha.singh@cola.com", phone: "9133788895", gender: "Female", domain: "Business", block: "B", coord: "Student Welfare" },
    { id: 92, name: "Pooja Arora", school: 1, designation: "Assistant Professor", email: "pooja.arora@cola.com", phone: "9300497698", gender: "Male", domain: "Business", block: "D", coord: "Academic Coordinator" },
    { id: 93, name: "Priya Yadav", school: 3, designation: "Professor", email: "priya.yadav@cola.com", phone: "9634578535", gender: "Female", domain: "Psychology", block: "D", coord: "Lab Coordinator" },
    { id: 94, name: "Deepak Sharma", school: 7, designation: "Lecturer", email: "deepak.sharma@cola.com", phone: "9321001454", gender: "Female", domain: "Mechanical", block: "A", coord: "Student Welfare" },
    { id: 95, name: "Rohit Gupta", school: 8, designation: "Assistant Professor", email: "rohit.gupta@cola.com", phone: "9750521063", gender: "Male", domain: "Psychology", block: "A", coord: "Project Coordinator" },
    { id: 96, name: "Rahul Arora", school: 2, designation: "Professor", email: "rahul.arora@cola.com", phone: "9970347327", gender: "Male", domain: "Psychology", block: "B", coord: "Lab Coordinator" },
    { id: 97, name: "Vikas Agarwal", school: 7, designation: "Assistant Professor", email: "vikas.agarwal@cola.com", phone: "9896052558", gender: "Male", domain: "Psychology", block: "B", coord: "Student Welfare" },
    { id: 98, name: "Meena Bansal", school: 7, designation: "Professor", email: "meena.bansal@cola.com", phone: "9617183386", gender: "Female", domain: "Commerce", block: "C", coord: "Lab Coordinator" },
    { id: 99, name: "Arjun Kapoor", school: 4, designation: "Assistant Professor", email: "arjun.kapoor@cola.com", phone: "9595656326", gender: "Male", domain: "Civil", block: "D", coord: "Exam Coordinator" },
    { id: 100, name: "Riya Agarwal", school: 7, designation: "Associate Professor", email: "riya.agarwal@cola.com", phone: "9336953199", gender: "Male", domain: "Business", block: "A", coord: "Exam Coordinator" },
    { id: 101, name: "Priya Yadav", school: 7, designation: "Lecturer", email: "priya.yadav@cola.com", phone: "9421038440", gender: "Male", domain: "Business", block: "D", coord: "Academic Coordinator" },
    { id: 102, name: "Amit Yadav", school: 2, designation: "Lecturer", email: "amit.yadav@cola.com", phone: "9499725933", gender: "Female", domain: "Psychology", block: "B", coord: "Project Coordinator" },
    { id: 103, name: "Deepak Kapoor", school: 7, designation: "Assistant Professor", email: "deepak.kapoor@cola.com", phone: "9545761329", gender: "Male", domain: "Computer Science", block: "D", coord: "Project Coordinator" },
    { id: 104, name: "Amit Verma", school: 2, designation: "Assistant Professor", email: "amit.verma@cola.com", phone: "9202717001", gender: "Female", domain: "Computer Science", block: "A", coord: "Lab Coordinator" },
    { id: 105, name: "Meena Kapoor", school: 5, designation: "Assistant Professor", email: "meena.kapoor@cola.com", phone: "9527507403", gender: "Male", domain: "Civil", block: "A", coord: "Academic Coordinator" },
    { id: 106, name: "Rohit Kapoor", school: 6, designation: "Assistant Professor", email: "rohit.kapoor@cola.com", phone: "9372452551", gender: "Female", domain: "Computer Science", block: "B", coord: "Project Coordinator" },
    { id: 107, name: "Suresh Mehta", school: 6, designation: "Assistant Professor", email: "suresh.mehta@cola.com", phone: "9593295217", gender: "Female", domain: "Law", block: "C", coord: "Student Welfare" },
    { id: 108, name: "Priya Yadav", school: 1, designation: "Associate Professor", email: "priya.yadav@cola.com", phone: "9609549835", gender: "Male", domain: "Civil", block: "C", coord: "Academic Coordinator" },
    { id: 109, name: "Riya Singh", school: 7, designation: "Professor", email: "riya.singh@cola.com", phone: "9609668744", gender: "Female", domain: "Mechanical", block: "D", coord: "Exam Coordinator" },
    { id: 110, name: "Rohit Sharma", school: 6, designation: "Professor", email: "rohit.sharma@cola.com", phone: "9835854686", gender: "Female", domain: "Civil", block: "D", coord: "Lab Coordinator" },
    { id: 111, name: "Priya Bansal", school: 2, designation: "Lecturer", email: "priya.bansal@cola.com", phone: "9089421966", gender: "Female", domain: "Commerce", block: "C", coord: "Student Welfare" },
    { id: 112, name: "Pooja Singh", school: 5, designation: "Professor", email: "pooja.singh@cola.com", phone: "9893954573", gender: "Female", domain: "Mechanical", block: "D", coord: "Project Coordinator" },
    { id: 113, name: "Neha Yadav", school: 3, designation: "Associate Professor", email: "neha.yadav@cola.com", phone: "9020688709", gender: "Male", domain: "IT", block: "D", coord: "Lab Coordinator" },
    { id: 114, name: "Vikas Arora", school: 2, designation: "Assistant Professor", email: "vikas.arora@cola.com", phone: "9757044522", gender: "Male", domain: "Mechanical", block: "D", coord: "Project Coordinator" },
    { id: 115, name: "Arjun Verma", school: 5, designation: "Lecturer", email: "arjun.verma@cola.com", phone: "9616201086", gender: "Female", domain: "IT", block: "C", coord: "Lab Coordinator" },
    { id: 116, name: "Vikas Arora", school: 4, designation: "Assistant Professor", email: "vikas.arora@cola.com", phone: "9846840918", gender: "Male", domain: "Law", block: "D", coord: "Lab Coordinator" },
    { id: 117, name: "Riya Kapoor", school: 8, designation: "Assistant Professor", email: "riya.kapoor@cola.com", phone: "9977622910", gender: "Female", domain: "IT", block: "A", coord: "Project Coordinator" },
    { id: 118, name: "Rohit Yadav", school: 1, designation: "Associate Professor", email: "rohit.yadav@cola.com", phone: "9497770706", gender: "Male", domain: "Computer Science", block: "C", coord: "Lab Coordinator" },
    { id: 119, name: "Pooja Agarwal", school: 2, designation: "Professor", email: "pooja.agarwal@cola.com", phone: "9193165688", gender: "Male", domain: "Civil", block: "A", coord: "Student Welfare" },
    { id: 120, name: "Karan Verma", school: 8, designation: "Associate Professor", email: "karan.verma@cola.com", phone: "9880942792", gender: "Male", domain: "IT", block: "A", coord: "Exam Coordinator" },
    { id: 121, name: "Priya Yadav", school: 5, designation: "Professor", email: "priya.yadav@cola.com", phone: "9046850485", gender: "Male", domain: "Business", block: "A", coord: "Student Welfare" },
    { id: 122, name: "Deepak Gupta", school: 5, designation: "Lecturer", email: "deepak.gupta@cola.com", phone: "9783078572", gender: "Female", domain: "Computer Science", block: "D", coord: "Academic Coordinator" },
    { id: 123, name: "Amit Mehta", school: 4, designation: "Lecturer", email: "amit.mehta@cola.com", phone: "9936235516", gender: "Female", domain: "Computer Science", block: "B", coord: "Lab Coordinator" },
    { id: 124, name: "Meena Verma", school: 7, designation: "Lecturer", email: "meena.verma@cola.com", phone: "9215863265", gender: "Female", domain: "Civil", block: "C", coord: "Academic Coordinator" },
    { id: 125, name: "Riya Mehta", school: 7, designation: "Lecturer", email: "riya.mehta@cola.com", phone: "9002714683", gender: "Male", domain: "Psychology", block: "A", coord: "Exam Coordinator" },
    { id: 126, name: "Meena Arora", school: 1, designation: "Assistant Professor", email: "meena.arora@cola.com", phone: "9966276630", gender: "Female", domain: "Business", block: "C", coord: "Academic Coordinator" },
    { id: 127, name: "Neha Singh", school: 7, designation: "Lecturer", email: "neha.singh@cola.com", phone: "9464752193", gender: "Male", domain: "Law", block: "A", coord: "Exam Coordinator" },
    { id: 128, name: "Priya Singh", school: 2, designation: "Associate Professor", email: "priya.singh@cola.com", phone: "9379643022", gender: "Female", domain: "Business", block: "A", coord: "Project Coordinator" },
    { id: 129, name: "Karan Agarwal", school: 5, designation: "Assistant Professor", email: "karan.agarwal@cola.com", phone: "9111011728", gender: "Male", domain: "Commerce", block: "B", coord: "Exam Coordinator" },
    { id: 130, name: "Deepak Sharma", school: 3, designation: "Lecturer", email: "deepak.sharma@cola.com", phone: "9688444127", gender: "Male", domain: "Computer Science", block: "B", coord: "Exam Coordinator" },
    { id: 131, name: "Amit Arora", school: 6, designation: "Professor", email: "amit.arora@cola.com", phone: "9106894128", gender: "Male", domain: "Civil", block: "D", coord: "Project Coordinator" },
    { id: 132, name: "Neha Agarwal", school: 2, designation: "Lecturer", email: "neha.agarwal@cola.com", phone: "9757604676", gender: "Male", domain: "Commerce", block: "D", coord: "Project Coordinator" },
    { id: 133, name: "Anita Yadav", school: 4, designation: "Professor", email: "anita.yadav@cola.com", phone: "9721088292", gender: "Male", domain: "Civil", block: "D", coord: "Lab Coordinator" },
    { id: 134, name: "Meena Bansal", school: 6, designation: "Lecturer", email: "meena.bansal@cola.com", phone: "9296856362", gender: "Male", domain: "Civil", block: "A", coord: "Exam Coordinator" },
    { id: 135, name: "Rahul Verma", school: 4, designation: "Lecturer", email: "rahul.verma@cola.com", phone: "9515544349", gender: "Female", domain: "Law", block: "A", coord: "Lab Coordinator" },
    { id: 136, name: "Sneha Verma", school: 6, designation: "Lecturer", email: "sneha.verma@cola.com", phone: "9256303439", gender: "Male", domain: "Business", block: "B", coord: "Student Welfare" },
    { id: 137, name: "Neha Kapoor", school: 2, designation: "Lecturer", email: "neha.kapoor@cola.com", phone: "9240410744", gender: "Male", domain: "IT", block: "B", coord: "Exam Coordinator" },
    { id: 138, name: "Sneha Arora", school: 6, designation: "Associate Professor", email: "sneha.arora@cola.com", phone: "9197460118", gender: "Male", domain: "Civil", block: "A", coord: "Academic Coordinator" },
    { id: 139, name: "Anita Kapoor", school: 3, designation: "Associate Professor", email: "anita.kapoor@cola.com", phone: "9018644301", gender: "Female", domain: "Law", block: "C", coord: "Project Coordinator" },
    { id: 140, name: "Rohit Arora", school: 1, designation: "Professor", email: "rohit.arora@cola.com", phone: "9848550791", gender: "Male", domain: "IT", block: "B", coord: "Lab Coordinator" },
    { id: 141, name: "Arjun Sharma", school: 1, designation: "Associate Professor", email: "arjun.sharma@cola.com", phone: "9742231002", gender: "Male", domain: "Civil", block: "D", coord: "Academic Coordinator" },
    { id: 142, name: "Priya Arora", school: 8, designation: "Assistant Professor", email: "priya.arora@cola.com", phone: "9823316340", gender: "Male", domain: "Business", block: "C", coord: "Student Welfare" },
    { id: 143, name: "Karan Sharma", school: 3, designation: "Associate Professor", email: "karan.sharma@cola.com", phone: "9123589552", gender: "Female", domain: "Mechanical", block: "A", coord: "Academic Coordinator" },
    { id: 144, name: "Rohit Agarwal", school: 1, designation: "Assistant Professor", email: "rohit.agarwal@cola.com", phone: "9029446564", gender: "Female", domain: "IT", block: "B", coord: "Exam Coordinator" },
    { id: 145, name: "Vikas Arora", school: 5, designation: "Lecturer", email: "vikas.arora@cola.com", phone: "9242517725", gender: "Female", domain: "Mechanical", block: "D", coord: "Exam Coordinator" },
    { id: 146, name: "Sneha Agarwal", school: 2, designation: "Lecturer", email: "sneha.agarwal@cola.com", phone: "9522387162", gender: "Female", domain: "Mechanical", block: "B", coord: "Project Coordinator" },
    { id: 147, name: "Priya Agarwal", school: 7, designation: "Lecturer", email: "priya.agarwal@cola.com", phone: "9792559284", gender: "Male", domain: "Commerce", block: "C", coord: "Project Coordinator" },
    { id: 148, name: "Vikas Kapoor", school: 2, designation: "Associate Professor", email: "vikas.kapoor@cola.com", phone: "9408782497", gender: "Male", domain: "Business", block: "C", coord: "Student Welfare" },
    { id: 149, name: "Vikas Arora", school: 4, designation: "Professor", email: "vikas.arora@cola.com", phone: "9791636759", gender: "Female", domain: "Commerce", block: "A", coord: "Academic Coordinator" },
    { id: 150, name: "Meena Singh", school: 4, designation: "Lecturer", email: "meena.singh@cola.com", phone: "9897343616", gender: "Male", domain: "Law", block: "C", coord: "Exam Coordinator" },
    { id: 151, name: "Sneha Verma", school: 8, designation: "Associate Professor", email: "sneha.verma@cola.com", phone: "9351938172", gender: "Male", domain: "IT", block: "A", coord: "Lab Coordinator" },
    { id: 152, name: "Rohit Bansal", school: 2, designation: "Associate Professor", email: "rohit.bansal@cola.com", phone: "9879661270", gender: "Female", domain: "Civil", block: "C", coord: "Project Coordinator" },
    { id: 153, name: "Riya Mehta", school: 5, designation: "Assistant Professor", email: "riya.mehta@cola.com", phone: "9949913202", gender: "Female", domain: "Computer Science", block: "C", coord: "Student Welfare" },
    { id: 154, name: "Neha Sharma", school: 1, designation: "Lecturer", email: "neha.sharma@cola.com", phone: "9006223870", gender: "Female", domain: "Law", block: "B", coord: "Project Coordinator" },
    { id: 155, name: "Pooja Bansal", school: 4, designation: "Lecturer", email: "pooja.bansal@cola.com", phone: "9686376527", gender: "Male", domain: "Commerce", block: "A", coord: "Exam Coordinator" },
    { id: 156, name: "Rohit Kapoor", school: 6, designation: "Lecturer", email: "rohit.kapoor@cola.com", phone: "9218447488", gender: "Female", domain: "IT", block: "A", coord: "Lab Coordinator" },
    { id: 157, name: "Vikas Arora", school: 3, designation: "Professor", email: "vikas.arora@cola.com", phone: "9351295039", gender: "Male", domain: "IT", block: "A", coord: "Student Welfare" },
    { id: 158, name: "Sneha Singh", school: 6, designation: "Associate Professor", email: "sneha.singh@cola.com", phone: "9980550890", gender: "Female", domain: "Business", block: "C", coord: "Student Welfare" },
    { id: 159, name: "Rohit Mehta", school: 4, designation: "Lecturer", email: "rohit.mehta@cola.com", phone: "9686505474", gender: "Male", domain: "Law", block: "C", coord: "Project Coordinator" },
    { id: 160, name: "Riya Kapoor", school: 3, designation: "Lecturer", email: "riya.kapoor@cola.com", phone: "9570733627", gender: "Male", domain: "Mechanical", block: "B", coord: "Lab Coordinator" },
    { id: 161, name: "Anita Gupta", school: 5, designation: "Associate Professor", email: "anita.gupta@cola.com", phone: "9232192642", gender: "Female", domain: "Business", block: "C", coord: "Lab Coordinator" },
    { id: 162, name: "Karan Kapoor", school: 7, designation: "Assistant Professor", email: "karan.kapoor@cola.com", phone: "9731410445", gender: "Male", domain: "Computer Science", block: "D", coord: "Exam Coordinator" },
    { id: 163, name: "Rahul Singh", school: 8, designation: "Assistant Professor", email: "rahul.singh@cola.com", phone: "9943548185", gender: "Female", domain: "Mechanical", block: "C", coord: "Academic Coordinator" },
    { id: 164, name: "Rohit Verma", school: 5, designation: "Assistant Professor", email: "rohit.verma@cola.com", phone: "9979177681", gender: "Female", domain: "IT", block: "A", coord: "Student Welfare" },
    { id: 165, name: "Meena Singh", school: 6, designation: "Lecturer", email: "meena.singh@cola.com", phone: "9810781664", gender: "Female", domain: "Civil", block: "A", coord: "Project Coordinator" },
    { id: 166, name: "Meena Verma", school: 8, designation: "Professor", email: "meena.verma@cola.com", phone: "9252908286", gender: "Male", domain: "Psychology", block: "D", coord: "Lab Coordinator" },
    { id: 167, name: "Pooja Yadav", school: 8, designation: "Professor", email: "pooja.yadav@cola.com", phone: "9078583636", gender: "Female", domain: "Law", block: "D", coord: "Exam Coordinator" },
    { id: 168, name: "Vikas Yadav", school: 6, designation: "Lecturer", email: "vikas.yadav@cola.com", phone: "9901396779", gender: "Male", domain: "Psychology", block: "D", coord: "Project Coordinator" },
    { id: 169, name: "Meena Singh", school: 5, designation: "Lecturer", email: "meena.singh@cola.com", phone: "9488211189", gender: "Female", domain: "Commerce", block: "A", coord: "Student Welfare" },
    { id: 170, name: "Vikas Arora", school: 5, designation: "Professor", email: "vikas.arora@cola.com", phone: "9997133821", gender: "Male", domain: "Business", block: "C", coord: "Academic Coordinator" },
    { id: 171, name: "Neha Arora", school: 2, designation: "Assistant Professor", email: "neha.arora@cola.com", phone: "9516217548", gender: "Female", domain: "Civil", block: "B", coord: "Student Welfare" },
    { id: 172, name: "Meena Agarwal", school: 2, designation: "Professor", email: "meena.agarwal@cola.com", phone: "9838480685", gender: "Male", domain: "Psychology", block: "B", coord: "Exam Coordinator" },
    { id: 173, name: "Amit Singh", school: 2, designation: "Lecturer", email: "amit.singh@cola.com", phone: "9960724085", gender: "Female", domain: "Civil", block: "A", coord: "Student Welfare" },
    { id: 174, name: "Anita Kapoor", school: 8, designation: "Assistant Professor", email: "anita.kapoor@cola.com", phone: "9237749055", gender: "Male", domain: "Commerce", block: "A", coord: "Student Welfare" },
    { id: 175, name: "Arjun Singh", school: 8, designation: "Lecturer", email: "arjun.singh@cola.com", phone: "9313847026", gender: "Female", domain: "Psychology", block: "C", coord: "Student Welfare" },
    { id: 176, name: "Deepak Arora", school: 4, designation: "Lecturer", email: "deepak.arora@cola.com", phone: "9037146652", gender: "Female", domain: "Commerce", block: "B", coord: "Exam Coordinator" },
    { id: 177, name: "Vikas Agarwal", school: 8, designation: "Lecturer", email: "vikas.agarwal@cola.com", phone: "9289805654", gender: "Female", domain: "Business", block: "A", coord: "Lab Coordinator" },
    { id: 178, name: "Arjun Mehta", school: 8, designation: "Lecturer", email: "arjun.mehta@cola.com", phone: "9283225209", gender: "Male", domain: "Law", block: "D", coord: "Academic Coordinator" },
    { id: 179, name: "Anita Sharma", school: 4, designation: "Associate Professor", email: "anita.sharma@cola.com", phone: "9570352966", gender: "Female", domain: "IT", block: "B", coord: "Student Welfare" },
    { id: 180, name: "Deepak Sharma", school: 6, designation: "Professor", email: "deepak.sharma@cola.com", phone: "9280412950", gender: "Female", domain: "Law", block: "C", coord: "Exam Coordinator" },
    { id: 181, name: "Deepak Gupta", school: 5, designation: "Associate Professor", email: "deepak.gupta@cola.com", phone: "9997343673", gender: "Male", domain: "Mechanical", block: "B", coord: "Project Coordinator" },
    { id: 182, name: "Deepak Gupta", school: 6, designation: "Lecturer", email: "deepak.gupta@cola.com", phone: "9712612143", gender: "Male", domain: "Law", block: "C", coord: "Project Coordinator" },
    { id: 183, name: "Vikas Gupta", school: 1, designation: "Professor", email: "vikas.gupta@cola.com", phone: "9049830069", gender: "Male", domain: "Mechanical", block: "C", coord: "Exam Coordinator" },
    { id: 184, name: "Suresh Bansal", school: 8, designation: "Lecturer", email: "suresh.bansal@cola.com", phone: "9766560521", gender: "Male", domain: "Psychology", block: "A", coord: "Academic Coordinator" },
    { id: 185, name: "Deepak Singh", school: 6, designation: "Lecturer", email: "deepak.singh@cola.com", phone: "9336441143", gender: "Male", domain: "Mechanical", block: "C", coord: "Project Coordinator" },
    { id: 186, name: "Meena Gupta", school: 5, designation: "Professor", email: "meena.gupta@cola.com", phone: "9951493519", gender: "Male", domain: "Civil", block: "B", coord: "Project Coordinator" },
    { id: 187, name: "Sneha Arora", school: 6, designation: "Assistant Professor", email: "sneha.arora@cola.com", phone: "9827317237", gender: "Male", domain: "Mechanical", block: "A", coord: "Exam Coordinator" },
    { id: 188, name: "Sneha Singh", school: 3, designation: "Professor", email: "sneha.singh@cola.com", phone: "9404156806", gender: "Male", domain: "Computer Science", block: "B", coord: "Project Coordinator" },
    { id: 189, name: "Rohit Gupta", school: 3, designation: "Lecturer", email: "rohit.gupta@cola.com", phone: "9767855607", gender: "Male", domain: "Computer Science", block: "C", coord: "Student Welfare" },
    { id: 190, name: "Riya Arora", school: 3, designation: "Lecturer", email: "riya.arora@cola.com", phone: "9123545560", gender: "Female", domain: "Business", block: "B", coord: "Exam Coordinator" },
    { id: 191, name: "Rohit Gupta", school: 1, designation: "Assistant Professor", email: "rohit.gupta@cola.com", phone: "9951676372", gender: "Female", domain: "Psychology", block: "D", coord: "Student Welfare" },
    { id: 192, name: "Rahul Yadav", school: 5, designation: "Professor", email: "rahul.yadav@cola.com", phone: "9558420981", gender: "Female", domain: "IT", block: "B", coord: "Project Coordinator" },
    { id: 193, name: "Arjun Mehta", school: 4, designation: "Assistant Professor", email: "arjun.mehta@cola.com", phone: "9669283184", gender: "Male", domain: "Mechanical", block: "C", coord: "Project Coordinator" },
    { id: 194, name: "Vikas Singh", school: 4, designation: "Assistant Professor", email: "vikas.singh@cola.com", phone: "9086457260", gender: "Female", domain: "Psychology", block: "B", coord: "Lab Coordinator" },
    { id: 195, name: "Amit Agarwal", school: 6, designation: "Assistant Professor", email: "amit.agarwal@cola.com", phone: "9016262728", gender: "Male", domain: "Law", block: "A", coord: "Academic Coordinator" },
    { id: 196, name: "Suresh Mehta", school: 6, designation: "Lecturer", email: "suresh.mehta@cola.com", phone: "9537857937", gender: "Male", domain: "Mechanical", block: "B", coord: "Lab Coordinator" },
    { id: 197, name: "Neha Arora", school: 1, designation: "Professor", email: "neha.arora@cola.com", phone: "9225042075", gender: "Female", domain: "Business", block: "B", coord: "Exam Coordinator" },
    { id: 198, name: "Deepak Gupta", school: 7, designation: "Lecturer", email: "deepak.gupta@cola.com", phone: "9045621303", gender: "Female", domain: "Law", block: "B", coord: "Exam Coordinator" },
    { id: 199, name: "Vikas Kapoor", school: 6, designation: "Lecturer", email: "vikas.kapoor@cola.com", phone: "9217313710", gender: "Female", domain: "Commerce", block: "A", coord: "Lab Coordinator" },
    { id: 200, name: "Vikas Gupta", school: 1, designation: "Professor", email: "vikas.gupta@cola.com", phone: "9253175879", gender: "Male", domain: "Computer Science", block: "B", coord: "Academic Coordinator" },
];

// ════════════════════════════════════════════════════════════════
//  TEACHER DASHBOARD CONSTANTS
// ════════════════════════════════════════════════════════════════
const T_DOMAINS = [...new Set(TEACHERS.map(t => t.domain))].sort();
const T_DESIGNATIONS = [...new Set(TEACHERS.map(t => t.designation))].sort();
const T_BLOCKS = [...new Set(TEACHERS.map(t => t.block))].sort();
const T_COORDS = [...new Set(TEACHERS.map(t => t.coord))].sort();
const DOMAIN_COLORS = {
    "Computer Science": "#4f46e5", "Civil": "#65a30d", "Mechanical": "#d97706",
    "Commerce": "#0891b2", "IT": "#7c3aed", "Business": "#db2777",
    "Law": "#ea580c", "Psychology": "#0f766e",
};
const DESIG_ORDER = { "Professor": 5, "Associate Professor": 4, "Assistant Professor": 3, "Lecturer": 2 };

function buildAIContext() {
    const byDomain = T_DOMAINS.map(d => {
        const g = TEACHERS.filter(t => t.domain === d);
        return `  ${d}: ${g.length} (M:${g.filter(t => t.gender === "Male").length} F:${g.filter(t => t.gender === "Female").length})`;
    }).join("\n");
    const sample = TEACHERS.slice(0, 40).map(t => `  ${t.name}|${t.domain}|${t.designation}|Block:${t.block}|S${t.school}|${t.coord}|${t.gender}`).join("\n");
    return `You are an AI assistant for COLA Admin. Answer questions about 200 real teacher records.\nTOTAL:200 Male:${TEACHERS.filter(t => t.gender === "Male").length} Female:${TEACHERS.filter(t => t.gender === "Female").length}\nDOMAINS:\n${byDomain}\nSAMPLE(40):\n${sample}`;
}
const AI_CONTEXT = buildAIContext();

// ════════════════════════════════════════════════════════════════
//  DESIGN TOKENS
// ════════════════════════════════════════════════════════════════
const C = {
    bg: "#F4F6FB", card: "#FFFFFF", ink: "#0D0F1A", slate: "#1E2235",
    muted: "#6B7280", border: "#E5E7EB", accent: "#6366F1",
    green: "#10B981", rose: "#F43F5E", amber: "#F59E0B",
    teal: "#06B6D4", sidebar: "#1E2235",
};
const CHART_COLORS = [C.green, C.rose, C.amber, C.teal, C.accent];

// ════════════════════════════════════════════════════════════════
//  GLOBAL STYLES
// ════════════════════════════════════════════════════════════════
const gStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Plus Jakarta Sans',sans-serif;background:${C.bg};color:${C.ink};}
  .admin-shell{display:flex;min-height:100vh;}
  .sidebar{background:${C.sidebar};transition:width 0.28s cubic-bezier(.4,0,.2,1);overflow:hidden;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;flex-shrink:0;}
  .sidebar-logo{font-size:1.3rem;font-weight:800;white-space:nowrap;overflow:hidden;background:linear-gradient(90deg,#A5B4FC,${C.teal});-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .sidebar-logo-area{padding:24px 20px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,0.07);}
  .menu-toggle{background:rgba(255,255,255,0.08);border:none;cursor:pointer;border-radius:8px;padding:7px;color:#fff;transition:background 0.15s;flex-shrink:0;}
  .menu-toggle:hover{background:rgba(255,255,255,0.15);}
  .sidebar-nav{padding:12px 10px;flex:1;display:flex;flex-direction:column;}
  .nav-item{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;cursor:pointer;color:rgba(255,255,255,0.6);font-weight:600;font-size:0.875rem;white-space:nowrap;overflow:hidden;transition:background 0.15s,color 0.15s;margin-bottom:4px;}
  .nav-item:hover{background:rgba(255,255,255,0.07);color:#fff;}
  .nav-item.active{background:linear-gradient(135deg,${C.accent},#4F46E5);color:#fff;box-shadow:0 4px 16px rgba(99,102,241,0.3);}
  .nav-item.danger{color:rgba(255,90,90,0.8);}
  .nav-item.danger:hover{background:rgba(244,63,94,0.12);color:#F43F5E;}
  .nav-label{flex:1;min-width:0;overflow:hidden;}
  .topbar{display:flex;align-items:center;justify-content:space-between;padding:18px 28px;background:${C.card};border-bottom:1px solid ${C.border};position:sticky;top:0;z-index:50;box-shadow:0 2px 12px rgba(0,0,0,0.05);}
  .topbar-title{font-size:1.3rem;font-weight:800;color:${C.ink};}
  .topbar-right{display:flex;align-items:center;gap:12px;}
  .refresh-btn{display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;border:1.5px solid ${C.border};background:#fff;cursor:pointer;font-weight:600;font-size:0.83rem;color:${C.muted};transition:all 0.15s;font-family:inherit;}
  .refresh-btn:hover{border-color:${C.accent};color:${C.accent};}
  .main-content{flex:1;overflow-y:auto;min-width:0;}
  .page{padding:28px;}
  .stats-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:18px;margin-bottom:28px;}
  .stat-card{background:${C.card};border-radius:18px;padding:22px 24px;box-shadow:0 2px 16px rgba(0,0,0,0.06);border:1.5px solid ${C.border};transition:transform 0.2s,box-shadow 0.2s;position:relative;overflow:hidden;}
  .stat-card:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(0,0,0,0.1);}
  .stat-label{font-size:0.78rem;font-weight:700;color:${C.muted};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;}
  .stat-value{font-size:2.2rem;font-weight:800;line-height:1;}
  .stat-sub{font-size:0.75rem;color:${C.muted};margin-top:6px;}
  .g-card{background:${C.card};border-radius:20px;box-shadow:0 2px 16px rgba(0,0,0,0.06);border:1.5px solid ${C.border};padding:24px;}
  .g-card-title{font-size:1.05rem;font-weight:800;color:${C.ink};margin-bottom:18px;display:flex;align-items:center;gap:8px;}
  .filter-pills{display:flex;gap:8px;flex-wrap:wrap;}
  .pill{padding:6px 16px;border-radius:99px;border:1.5px solid ${C.border};background:#fff;font-size:0.8rem;font-weight:700;cursor:pointer;color:${C.muted};transition:all 0.15s;}
  .pill.active{background:${C.accent};color:#fff;border-color:${C.accent};box-shadow:0 4px 12px rgba(99,102,241,0.25);}
  .pill:hover:not(.active){border-color:${C.accent};color:${C.accent};}
  .prob-card{border-radius:14px;overflow:hidden;border:1.5px solid;margin-bottom:14px;transition:box-shadow 0.2s;}
  .prob-card.solved{border-color:#A7F3D0;}
  .prob-card.unsolved{border-color:#FECDD3;}
  .prob-header{display:flex;justify-content:space-between;align-items:flex-start;padding:16px 18px;cursor:pointer;gap:12px;transition:background 0.15s;}
  .prob-card.solved .prob-header{background:#F0FDF4;}
  .prob-card.unsolved .prob-header{background:#FFF1F2;}
  .prob-card.solved .prob-header:hover{background:#DCFCE7;}
  .prob-card.unsolved .prob-header:hover{background:#FFE4E6;}
  .prob-text{font-weight:600;font-size:0.9rem;flex:1;line-height:1.5;}
  .prob-meta{font-size:0.75rem;color:${C.muted};margin-top:5px;}
  .prob-badge{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:99px;font-size:0.72rem;font-weight:700;white-space:nowrap;flex-shrink:0;}
  .prob-badge.solved{background:#D1FAE5;color:#065F46;}
  .prob-badge.unsolved{background:#FFE4E6;color:#9F1239;}
  .prob-expanded{padding:18px;background:#fff;border-top:1px solid ${C.border};display:flex;flex-direction:column;gap:14px;}
  .prev-reply{padding:12px 14px;border-radius:10px;background:#EFF6FF;border-left:3px solid #3B82F6;}
  .reply-row{display:flex;gap:10px;}
  .reply-input{flex:1;border:1.5px solid ${C.border};border-radius:10px;padding:10px 14px;font-family:inherit;font-size:0.87rem;outline:none;transition:border-color 0.2s;}
  .reply-input:focus{border-color:${C.accent};box-shadow:0 0 0 3px rgba(99,102,241,0.1);}
  .action-row{display:flex;gap:8px;flex-wrap:wrap;}
  .act-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border:none;border-radius:10px;font-weight:700;font-size:0.82rem;cursor:pointer;font-family:inherit;transition:all 0.15s;}
  .act-btn:hover{transform:scale(1.03);}
  .act-btn.send{background:${C.accent};color:#fff;}
  .act-btn.send:hover{background:#4F46E5;}
  .act-btn.green{background:${C.green};color:#fff;}
  .act-btn.amber{background:${C.amber};color:#fff;}
  .act-btn.red{background:${C.rose};color:#fff;}
  .fb-card{border:1.5px solid ${C.border};border-radius:14px;padding:18px;background:#FAFAFA;transition:box-shadow 0.15s;margin-bottom:12px;}
  .fb-card:hover{box-shadow:0 4px 20px rgba(0,0,0,0.08);}
  .fb-stars{color:#F59E0B;font-size:1rem;margin-bottom:8px;letter-spacing:2px;}
  .fb-text{font-weight:600;font-size:0.92rem;color:${C.slate};line-height:1.5;}
  .fb-email{font-size:0.76rem;color:${C.muted};margin-top:6px;}
  .stu-table{width:100%;border-collapse:collapse;margin-top:4px;}
  .stu-table th{text-align:left;font-size:0.72rem;font-weight:700;color:${C.muted};text-transform:uppercase;letter-spacing:0.06em;padding:10px 14px;background:#F8FAFF;border-bottom:1.5px solid ${C.border};}
  .stu-table td{padding:13px 14px;border-bottom:1px solid #F1F5F9;font-size:0.87rem;vertical-align:middle;}
  .stu-table tr:last-child td{border-bottom:none;}
  .stu-table tr:hover td{background:#F8FAFF;}
  .stu-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,${C.accent},${C.teal});display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:0.8rem;flex-shrink:0;}
  .stu-name{font-weight:700;color:${C.ink};}
  .stu-roll{font-size:0.75rem;color:${C.muted};margin-top:2px;}
  .ms-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:99px;background:#EFF6FF;color:#1D4ED8;font-size:0.72rem;font-weight:700;}
  .stu-date{font-size:0.78rem;color:${C.muted};}
  .divider{height:1px;background:${C.border};margin:20px 0;}
  .empty{text-align:center;padding:48px 0;color:${C.muted};}
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-bottom:24px;}
  @media(max-width:768px){.two-col{grid-template-columns:1fr;}}

  /* ── TEACHER TABLE ── */
  .t-table{width:100%;border-collapse:collapse;}
  .t-table th{text-align:left;font-size:0.72rem;font-weight:700;color:${C.muted};text-transform:uppercase;letter-spacing:0.06em;padding:10px 14px;background:#F8FAFF;border-bottom:1.5px solid ${C.border};}
  .t-table td{padding:11px 14px;border-bottom:1px solid #F1F5F9;font-size:0.85rem;vertical-align:middle;}
  .t-table tr:last-child td{border-bottom:none;}
  .t-table tr:hover td{background:#F5F7FF;cursor:pointer;}
  .desig-badge{display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;white-space:nowrap;}
  .block-chip{width:24px;height:24px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;}
`;

// ════════════════════════════════════════════════════════════════
//  TEACHER AVATAR
// ════════════════════════════════════════════════════════════════
function TAvatar({ name, domain, size = 32 }) {
    const bg = DOMAIN_COLORS[domain] || "#6b7280";
    const ini = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
    return (
        <div style={{ width: size, height: size, borderRadius: "50%", background: bg + "22", border: `1.5px solid ${bg}55`, display: "flex", alignItems: "center", justifyContent: "center", color: bg, fontSize: size * 0.34, fontWeight: 700, flexShrink: 0 }}>
            {ini}
        </div>
    );
}

function DesigBadge({ d }) {
    const m = { "Professor": { bg: "#fef3c7", c: "#92400e" }, "Associate Professor": { bg: "#ede9fe", c: "#5b21b6" }, "Assistant Professor": { bg: "#dbeafe", c: "#1e40af" }, "Lecturer": { bg: "#f0fdf4", c: "#166534" } };
    const s = m[d] || { bg: "#f3f4f6", c: "#374151" };
    return <span className="desig-badge" style={{ background: s.bg, color: s.c }}>{d}</span>;
}

const BLOCK_COLORS = ["#4f46e5", "#0891b2", "#d97706", "#65a30d"];

// ════════════════════════════════════════════════════════════════
//  TEACHER DETAIL DRAWER
// ════════════════════════════════════════════════════════════════
function TeacherDrawer({ teacher, onClose }) {
    const color = DOMAIN_COLORS[teacher.domain] || "#6b7280";
    return (
        <div style={{ position: "fixed", top: 0, right: 0, width: 340, height: "100vh", background: "#fff", borderLeft: "1px solid #e5e7eb", boxShadow: "-8px 0 40px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", zIndex: 2000 }}>
            <div style={{ padding: 20, background: color + "11", borderBottom: "1px solid " + color + "33", flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <TAvatar name={teacher.name} domain={teacher.domain} size={50} />
                    <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }}><X size={18} /></button>
                </div>
                <div style={{ marginTop: 12, fontSize: 17, fontWeight: 800, color: "#111827" }}>{teacher.name}</div>
                <div style={{ marginTop: 5 }}><DesigBadge d={teacher.designation} /></div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
                {[["Domain", teacher.domain, <BookOpen size={14} />], ["School", `School ${teacher.school}`, <Building2 size={14} />], ["Block", `Block ${teacher.block}`, <Layers size={14} />], ["Gender", teacher.gender, <Users size={14} />], ["Coordinatorship", teacher.coord, <UserCheck size={14} />], ["Email", teacher.email, <Mail size={14} />], ["Phone", teacher.phone, <Phone size={14} />]].map(([lbl, val, icon]) => (
                    <div key={lbl} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                        <div style={{ color, marginTop: 1 }}>{icon}</div>
                        <div>
                            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>{lbl}</div>
                            <div style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>{val}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ════════════════════════════════════════════════════════════════
//  AI CHAT PANEL
// ════════════════════════════════════════════════════════════════
function ChatPanel({ onClose }) {
    const [msgs, setMsgs] = useState([{ role: "assistant", text: "Hi! Ask me anything about COLA's 200 teachers — domains, blocks, designations, gender stats, coordinatorships." }]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);
    async function send() {
        const q = input.trim(); if (!q || loading) return;
        setInput("");
        const next = [...msgs, { role: "user", text: q }];
        setMsgs(next); setLoading(true);
        try {
            const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: AI_CONTEXT }, { role: "assistant", content: "Understood. Ask me anything about COLA teachers." }, ...next.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }))] }) });
            const data = await res.json();
            setMsgs(p => [...p, { role: "assistant", text: data.content?.map(c => c.text || "").join("") || "Sorry, no response." }]);
        } catch { setMsgs(p => [...p, { role: "assistant", text: "Connection error." }]); }
        finally { setLoading(false); }
    }
    return (
        <div style={{ position: "fixed", bottom: 24, right: 24, width: 370, height: 500, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, boxShadow: "0 8px 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", zIndex: 1500, overflow: "hidden" }}>
            <div style={{ padding: "13px 16px", background: "#111827", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}><Bot size={14} color="#fff" /></div>
                    <div><div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>COLA AI Assistant</div><div style={{ color: "#9ca3af", fontSize: 10 }}>200 teacher records loaded</div></div>
                </div>
                <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}><X size={17} /></button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 4px", display: "flex", flexDirection: "column", gap: 9 }}>
                {msgs.map((m, i) => (
                    <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: m.role === "assistant" ? "#4f46e5" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {m.role === "assistant" ? <Bot size={12} color="#fff" /> : <User size={12} color="#374151" />}
                        </div>
                        <div style={{ maxWidth: "78%", padding: "8px 11px", borderRadius: m.role === "user" ? "13px 3px 13px 13px" : "3px 13px 13px 13px", background: m.role === "user" ? "#4f46e5" : "#f9fafb", border: m.role === "user" ? "none" : "1px solid #e5e7eb", color: m.role === "user" ? "#fff" : "#111827", fontSize: 12.5, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{m.text}</div>
                    </div>
                ))}
                {loading && <div style={{ display: "flex", gap: 7 }}><div style={{ width: 24, height: 24, borderRadius: "50%", background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}><Bot size={12} color="#fff" /></div><div style={{ padding: "8px 12px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "3px 13px 13px 13px", display: "flex", gap: 4 }}>{[0, 1, 2].map(j => <div key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: "#9ca3af", animation: "bounce 1.2s infinite", animationDelay: `${j * 0.2}s` }} />)}</div></div>}
                <div ref={bottomRef} />
            </div>
            <div style={{ padding: "9px 11px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 7 }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()} placeholder="Ask about teachers..." style={{ flex: 1, padding: "8px 11px", borderRadius: 9, border: "1px solid #e5e7eb", fontSize: 12.5, outline: "none", color: "#111827", background: "#f9fafb" }} />
                <button onClick={send} disabled={loading || !input.trim()} style={{ width: 34, height: 34, borderRadius: 9, border: "none", background: loading || !input.trim() ? "#e5e7eb" : "#4f46e5", cursor: loading || !input.trim() ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Send size={14} color={loading || !input.trim() ? "#9ca3af" : "#fff"} />
                </button>
            </div>
            <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
        </div>
    );
}

// ════════════════════════════════════════════════════════════════
//  TEACHER RECORDS PAGE
// ════════════════════════════════════════════════════════════════
const T_PAGE_SIZE = 12;
function TeacherRecordsPage() {
    const [search, setSearch] = useState("");
    const [domainF, setDomainF] = useState("All");
    const [desigF, setDesigF] = useState("All");
    const [blockF, setBlockF] = useState("All");
    const [coordF, setCoordF] = useState("All");
    const [genderF, setGenderF] = useState("All");
    const [sortBy, setSortBy] = useState("name");
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);

    const filtered = useMemo(() => {
        let arr = TEACHERS.filter(t => {
            if (domainF !== "All" && t.domain !== domainF) return false;
            if (desigF !== "All" && t.designation !== desigF) return false;
            if (blockF !== "All" && t.block !== blockF) return false;
            if (coordF !== "All" && t.coord !== coordF) return false;
            if (genderF !== "All" && t.gender !== genderF) return false;
            if (search) { const q = search.toLowerCase(); if (!`${t.name} ${t.email} ${t.phone} ${t.domain} ${t.designation}`.toLowerCase().includes(q)) return false; }
            return true;
        });
        return [...arr].sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (sortBy === "domain") return a.domain.localeCompare(b.domain);
            if (sortBy === "desig_high") return (DESIG_ORDER[b.designation] || 0) - (DESIG_ORDER[a.designation] || 0);
            if (sortBy === "desig_low") return (DESIG_ORDER[a.designation] || 0) - (DESIG_ORDER[b.designation] || 0);
            if (sortBy === "school") return a.school - b.school;
            return 0;
        });
    }, [search, domainF, desigF, blockF, coordF, genderF, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / T_PAGE_SIZE));
    const curPage = Math.min(page, totalPages);
    const paginated = filtered.slice((curPage - 1) * T_PAGE_SIZE, curPage * T_PAGE_SIZE);
    const domainStats = useMemo(() => T_DOMAINS.map(d => ({ domain: d, count: TEACHERS.filter(t => t.domain === d).length, male: TEACHERS.filter(t => t.domain === d && t.gender === "Male").length, female: TEACHERS.filter(t => t.domain === d && t.gender === "Female").length })), []);
    const maxCount = Math.max(...domainStats.map(d => d.count));
    const hasF = search || domainF !== "All" || desigF !== "All" || blockF !== "All" || coordF !== "All" || genderF !== "All";

    return (
        <div>
            {/* Header bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "#111827", display: "flex", alignItems: "center", justifyContent: "center" }}><GraduationCap size={20} color="#34d399" /></div>
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: C.ink }}>Teacher Records</div>
                        <div style={{ fontSize: 12, color: C.muted }}>200 faculty · 8 domains · Schools 1–8</div>
                    </div>
                </div>
                <button onClick={() => setChatOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", background: chatOpen ? "#111827" : "#4f46e5", color: "#fff", border: "none", borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(79,70,229,0.3)" }}>
                    <MessageSquare size={15} />{chatOpen ? "Close AI" : "Ask AI"}
                </button>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
                {[
                    { label: "Total Faculty", value: 200, color: "#4f46e5", icon: <Users size={16} /> },
                    { label: "Male", value: TEACHERS.filter(t => t.gender === "Male").length, color: "#2563eb", icon: <UserCheck size={16} /> },
                    { label: "Female", value: TEACHERS.filter(t => t.gender === "Female").length, color: "#db2777", icon: <UserCheck size={16} /> },
                    { label: "Professors", value: TEACHERS.filter(t => t.designation === "Professor").length, color: "#d97706", icon: <GraduationCap size={16} /> },
                ].map((s, i) => (
                    <div key={i} style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}><div style={{ color: s.color }}>{s.icon}</div><span style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{s.label}</span></div>
                        <div style={{ fontSize: 26, fontWeight: 800, color: C.ink }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Domain bars */}
            <div className="g-card" style={{ marginBottom: 18 }}>
                <div className="g-card-title"><BarChart3 size={16} color={C.accent} />Domain Distribution</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 32px" }}>
                    {domainStats.map(({ domain, count, male, female }) => {
                        const color = DOMAIN_COLORS[domain] || "#6b7280";
                        return (
                            <div key={domain} style={{ marginBottom: 8 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                                    <span style={{ color: C.ink, fontWeight: 600 }}>{domain}</span>
                                    <span style={{ color: C.muted, fontSize: 11 }}>{count} · M:{male} F:{female}</span>
                                </div>
                                <div style={{ height: 6, background: "#f3f4f6", borderRadius: 4, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${(count / maxCount) * 100}%`, background: color, borderRadius: 4 }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Filters */}
            <div className="g-card" style={{ marginBottom: 14, padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ position: "relative", flex: "1 1 190px" }}>
                        <Search size={13} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
                        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search name, email, phone…" style={{ width: "100%", paddingLeft: 28, paddingRight: 9, paddingTop: 7, paddingBottom: 7, borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12, color: C.ink, outline: "none", background: "#f9fafb", boxSizing: "border-box" }} />
                    </div>
                    {[{ v: domainF, s: setDomainF, opts: T_DOMAINS, lbl: "Domain" }, { v: desigF, s: setDesigF, opts: T_DESIGNATIONS, lbl: "Designation" }, { v: blockF, s: setBlockF, opts: T_BLOCKS, lbl: "Block" }, { v: coordF, s: setCoordF, opts: T_COORDS, lbl: "Role" }, { v: genderF, s: setGenderF, opts: ["Male", "Female"], lbl: "Gender" }].map(f => (
                        <select key={f.lbl} value={f.v} onChange={e => { f.s(e.target.value); setPage(1); }} style={{ padding: "7px 9px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12, color: "#374151", background: "#f9fafb", cursor: "pointer" }}>
                            <option value="All">{f.lbl}: All</option>
                            {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    ))}
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: "7px 9px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12, color: "#374151", background: "#f9fafb", cursor: "pointer" }}>
                        <option value="name">A–Z Name</option>
                        <option value="domain">Domain</option>
                        <option value="desig_high">Senior First</option>
                        <option value="desig_low">Junior First</option>
                        <option value="school">School</option>
                    </select>
                    {hasF && <button onClick={() => { setSearch(""); setDomainF("All"); setDesigF("All"); setBlockF("All"); setCoordF("All"); setGenderF("All"); setSortBy("name"); setPage(1); }} style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid #fca5a5", background: "#fff1f2", color: "#dc2626", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><X size={11} />Clear</button>}
                </div>
                <div style={{ marginTop: 7, fontSize: 12, color: C.muted }}>Showing <strong style={{ color: C.ink }}>{filtered.length}</strong> of 200 teachers</div>
            </div>

            {/* Table */}
            <div className="g-card" style={{ padding: 0, overflow: "hidden", marginBottom: 14 }}>
                <table className="t-table">
                    <thead><tr>{["Teacher", "Domain", "Designation", "Block", "School", "Coordinatorship"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                    <tbody>
                        {paginated.length === 0 && <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: C.muted }}>No records match filters.</td></tr>}
                        {paginated.map((t) => {
                            const color = DOMAIN_COLORS[t.domain] || "#6b7280";
                            const bColor = BLOCK_COLORS[["A", "B", "C", "D"].indexOf(t.block)] || "#6b7280";
                            return (
                                <tr key={t.id} onClick={() => setSelected(t)} style={{ borderLeft: `3px solid ${color}33` }}>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                            <TAvatar name={t.name} domain={t.domain} size={30} />
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: 13, color: C.ink }}>{t.name}</div>
                                                <div style={{ fontSize: 10, color: C.muted }}>{t.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span style={{ fontSize: 12, color, fontWeight: 700 }}>{t.domain}</span></td>
                                    <td><DesigBadge d={t.designation} /></td>
                                    <td><span className="block-chip" style={{ background: bColor }}>{t.block}</span></td>
                                    <td style={{ fontSize: 12, color: C.muted, textAlign: "center" }}>S{t.school}</td>
                                    <td style={{ fontSize: 11, color: C.muted }}>{t.coord}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: C.muted }}>
                <span>{filtered.length === 0 ? "0 records" : `${(curPage - 1) * T_PAGE_SIZE + 1}–${Math.min(curPage * T_PAGE_SIZE, filtered.length)} of ${filtered.length}`}</span>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={curPage <= 1} style={{ width: 29, height: 29, borderRadius: 7, border: `1px solid ${C.border}`, background: "#fff", cursor: curPage <= 1 ? "default" : "pointer", opacity: curPage <= 1 ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={14} /></button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => p === 1 || p === totalPages || Math.abs(p - curPage) <= 1).reduce((acc, p, idx, arr) => { if (idx > 0 && arr[idx - 1] !== p - 1) acc.push("…"); acc.push(p); return acc; }, []).map((p, idx) => p === "…" ? <span key={`d${idx}`} style={{ color: C.muted, padding: "0 2px" }}>…</span> : <button key={p} onClick={() => setPage(p)} style={{ width: 29, height: 29, borderRadius: 7, border: `1px solid ${C.border}`, background: curPage === p ? "#111827" : "#fff", color: curPage === p ? "#fff" : "#374151", cursor: "pointer", fontSize: 12, fontWeight: curPage === p ? 700 : 400 }}>{p}</button>)}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={curPage >= totalPages} style={{ width: 29, height: 29, borderRadius: 7, border: `1px solid ${C.border}`, background: "#fff", cursor: curPage >= totalPages ? "default" : "pointer", opacity: curPage >= totalPages ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={14} /></button>
                </div>
            </div>

            {selected && <TeacherDrawer teacher={selected} onClose={() => setSelected(null)} />}
            {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
        </div>
    );
}

// ════════════════════════════════════════════════════════════════
//  ADMIN DASHBOARD (main shell)
// ════════════════════════════════════════════════════════════════
export default function AdminDashboard() {
    
    const [open, setOpen] = useState(true);
    const [page, setPage] = useState("superadmin");
    const [problems, setProblems] = useState([]);
    const [stats, setStats] = useState({ total: 0, solved: 0, unsolved: 0 });
    const [graphData, setGraphData] = useState([{ name: "Solved", value: 0 }, { name: "Unsolved", value: 0 }]);
    const [replyMap, setReplyMap] = useState({});
    const [expandedId, setExpandedId] = useState(null);
    const [filter, setFilter] = useState("all");
    const [feedbacks, setFeedbacks] = useState([]);
    const [search, setSearch] = useState("");
    const [studentStats, setStudentStats] = useState({ totalActiveStudents: 0 });
    const [outlookStudents, setOutlookStudents] = useState([]);
    const [outlookTotal, setOutlookTotal] = useState(0);
    const [outlookSearch, setOutlookSearch] = useState("");

    useEffect(() => {
        fetchAll(); fetchStudentStats(); fetchOutlookStudents(); fetchFeedback();
        const iv = setInterval(() => { fetchAll(); fetchStudentStats(); }, 5000);
        return () => clearInterval(iv);
    }, []);

    const fetchAll = () => Promise.all([fetchProblems(), fetchStats(), fetchGraph()]);
    const fetchProblems = async () => { try { const r = await fetch("http://localhost:5000/api/all-problems"); setProblems(await r.json()); } catch (e) { console.error(e); } };
    const fetchStats = async () => { try { const r = await fetch("http://localhost:5000/api/problem-stats"); setStats(await r.json()); } catch (e) { console.error(e); } };
    const fetchGraph = async () => { try { const r = await fetch("http://localhost:5000/api/graph-data"); setGraphData(await r.json()); } catch (e) { console.error(e); } };
    const fetchFeedback = async () => { try { const r = await fetch("http://localhost:5000/api/get-feedback"); setFeedbacks(await r.json()); } catch (e) { console.error(e); } };
    const fetchStudentStats = async () => { try { const r = await fetch("http://localhost:5000/api/student-stats"); if (r.ok) setStudentStats(await r.json()); } catch (e) { console.error(e); } };
    const fetchOutlookStudents = async () => { try { const r = await fetch("http://localhost:5000/api/admin/microsoft-students"); const d = await r.json(); setOutlookStudents(d.students || []); setOutlookTotal(d.total || 0); } catch (e) { console.error(e); } };
    const updateProblem = async (id, updates) => { await fetch(`http://localhost:5000/api/update-problem/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updates) }); fetchAll(); };
    const deleteProblem = async (id) => { if (!window.confirm("Delete permanently?")) return; await fetch(`http://localhost:5000/api/delete-problem/${id}`, { method: "DELETE" }); fetchAll(); };
    const sendReply = async (id) => { const reply = replyMap[id]?.trim(); if (!reply) return; await updateProblem(id, { adminReply: reply, status: "solved" }); setReplyMap(p => ({ ...p, [id]: "" })) };
    const handleLogout = () => { localStorage.clear(); window.location.href = "/admin-login"; };
    const filtered = problems.filter(p => filter === "all" || p.status === filter).filter(p => !search || p.problemText.toLowerCase().includes(search.toLowerCase()) || p.studentEmail.toLowerCase().includes(search.toLowerCase()));
    const avgRating = feedbacks.length ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1) : "–";
    const filteredOutlook = outlookStudents.filter(s => !outlookSearch || s.name.toLowerCase().includes(outlookSearch.toLowerCase()) || s.email.toLowerCase().includes(outlookSearch.toLowerCase()) || (s.roll_number || "").includes(outlookSearch));

    const navItems = [
        { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
        { id: "problems", icon: <ClipboardList size={18} />, label: "All Problems" },
        { id: "teachers", icon: <GraduationCap size={18} />, label: "Teacher Records" },
        { id: "students", icon: <Users size={18} />, label: "Outlook Students" },
        { id: "feedback", icon: <Star size={18} />, label: "Feedback" },
        { id: "graph", icon: <BarChart3 size={18} />, label: "Analytics" },
    ];

    const pageLabel = navItems.find(n => n.id === page)?.label || page;

    return (
        <>
            <style>{gStyles}</style>
            <div className="admin-shell">
                {/* SIDEBAR */}
                <div className="sidebar" style={{ width: open ? 240 : 68 }}>
                    <div className="sidebar-logo-area">
                        <button className="menu-toggle" onClick={() => setOpen(!open)}><Menu size={17} /></button>
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

                {/* MAIN */}
                <div className="main-content">
                    <div className="topbar">
                        <div className="topbar-title">{pageLabel}</div>
                        <div className="topbar-right">
                            <button className="refresh-btn" onClick={() => { fetchAll(); fetchFeedback(); fetchOutlookStudents(); }}>
                                <RefreshCw size={14} />Refresh
                            </button>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${C.accent},${C.teal})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "0.8rem" }}>AD</div>
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
                                    <StatCard label="Outlook Students" value={outlookTotal} color="#1D4ED8" icon={<Mail size={20} />} sub="unique accounts" />
                                    <StatCard label="Total Faculty" value={200} color="#4f46e5" icon={<GraduationCap size={20} />} sub="8 domains" />
                                </div>
                                <div className="two-col">
                                    <div className="g-card">
                                        <div className="g-card-title"><BarChart3 size={18} color={C.accent} />Problem Status</div>
                                        <ResponsiveContainer width="100%" height={220}>
                                            <PieChart><Pie data={graphData} cx="50%" cy="50%" outerRadius={85} dataKey="value" label>{graphData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}</Pie><Tooltip /><Legend /></PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="g-card">
                                        <div className="g-card-title"><Star size={18} color={C.amber} />Recent Feedback</div>
                                        {feedbacks.length === 0 ? <div className="empty"><Star size={32} /><p>No feedback yet.</p></div> : feedbacks.slice(0, 3).map(f => (
                                            <div key={f.id} className="fb-card">
                                                <div className="fb-stars">{"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}</div>
                                                <p className="fb-text">{f.feedbackText}</p>
                                                <p className="fb-email">{f.studentEmail}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="g-card">
                                    <div className="g-card-title"><ClipboardList size={18} color={C.accent} />Recent Problems</div>
                                    {problems.slice(0, 5).map(p => (
                                        <ProblemCard key={p.id} p={p} expanded={expandedId === p.id} onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)} reply={replyMap[p.id] || ""} onReplyChange={v => setReplyMap(prev => ({ ...prev, [p.id]: v }))} onSendReply={() => sendReply(p.id)} onMarkSolved={() => updateProblem(p.id, { status: "solved" })} onMarkUnsolved={() => updateProblem(p.id, { status: "unsolved" })} onDelete={() => deleteProblem(p.id)} />
                                    ))}
                                </div>
                            </>
                        )}

                        {/* ── ALL PROBLEMS ── */}
                        {page === "problems" && (
                            <div className="g-card">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
                                    <div className="g-card-title" style={{ marginBottom: 0 }}><ClipboardList size={18} color={C.accent} />All Problems ({filtered.length})</div>
                                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F8FAFF", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "7px 14px" }}>
                                            <Search size={15} color={C.muted} />
                                            <input style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.85rem", width: 180 }} placeholder="Search problems…" value={search} onChange={e => setSearch(e.target.value)} />
                                            {search && <button style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }} onClick={() => setSearch("")}><X size={13} /></button>}
                                        </div>
                                        <div className="filter-pills">
                                            {["all", "unsolved", "solved"].map(s => <button key={s} className={`pill ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>)}
                                        </div>
                                    </div>
                                </div>
                                {filtered.length === 0 ? <div className="empty"><ClipboardList size={36} /><p>No problems found.</p></div> : filtered.map(p => (
                                    <ProblemCard key={p.id} p={p} expanded={expandedId === p.id} onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)} reply={replyMap[p.id] || ""} onReplyChange={v => setReplyMap(prev => ({ ...prev, [p.id]: v }))} onSendReply={() => sendReply(p.id)} onMarkSolved={() => updateProblem(p.id, { status: "solved" })} onMarkUnsolved={() => updateProblem(p.id, { status: "unsolved" })} onDelete={() => deleteProblem(p.id)} />
                                ))}
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
                                        <span style={{ marginLeft: 8, background: "#EFF6FF", color: "#1D4ED8", borderRadius: 99, padding: "3px 12px", fontSize: "0.78rem", fontWeight: 700 }}>{outlookTotal} unique</span>
                                    </div>
                                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F8FAFF", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "7px 14px" }}>
                                            <Search size={15} color={C.muted} />
                                            <input style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.85rem", width: 200 }} placeholder="Search name, email, roll no…" value={outlookSearch} onChange={e => setOutlookSearch(e.target.value)} />
                                            {outlookSearch && <button style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }} onClick={() => setOutlookSearch("")}><X size={13} /></button>}
                                        </div>
                                        <button className="refresh-btn" onClick={fetchOutlookStudents}><RefreshCw size={14} />Refresh</button>
                                    </div>
                                </div>
                                {filteredOutlook.length === 0 ? <div className="empty"><Mail size={36} style={{ opacity: 0.2, marginBottom: 10 }} /><p>{outlookSearch ? "No students match." : "No Outlook students yet."}</p></div> : (
                                    <div style={{ overflowX: "auto" }}>
                                        <table className="stu-table">
                                            <thead><tr><th>#</th><th>Student</th><th>Email</th><th>Roll Number</th><th>Auth</th><th>Joined</th></tr></thead>
                                            <tbody>
                                                {filteredOutlook.map((s, i) => (
                                                    <tr key={s.id}>
                                                        <td style={{ color: C.muted, fontWeight: 700, fontSize: "0.8rem" }}>{i + 1}</td>
                                                        <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div className="stu-avatar">{s.name?.charAt(0)?.toUpperCase() || "?"}</div><div><div className="stu-name">{s.name}</div><div className="stu-roll">{s.roll_number}</div></div></div></td>
                                                        <td style={{ color: C.slate, fontSize: "0.85rem" }}>{s.email}</td>
                                                        <td style={{ fontWeight: 700, fontSize: "0.85rem" }}>{s.roll_number || "—"}</td>
                                                        <td><span className="ms-badge"><img src="https://img.icons8.com/color/20/microsoft.png" alt="ms" style={{ width: 13 }} />Outlook</span></td>
                                                        <td className="stu-date">{s.joined_at ? new Date(s.joined_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── FEEDBACK ── */}
                        {page === "feedback" && (
                            <div className="g-card">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                    <div className="g-card-title" style={{ marginBottom: 0 }}><Star size={18} color={C.amber} />Student Feedback ({feedbacks.length})</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#FEF3C7", padding: "8px 16px", borderRadius: 99, fontWeight: 700, fontSize: "0.85rem", color: "#92400E" }}>⭐ {avgRating} / 5 Average</div>
                                </div>
                                {feedbacks.length > 0 && (
                                    <>
                                        <div style={{ marginBottom: 24 }}>
                                            {[5, 4, 3, 2, 1].map(star => {
                                                const count = feedbacks.filter(f => f.rating === star).length; const pct = feedbacks.length ? Math.round(count / feedbacks.length * 100) : 0; return (
                                                    <div key={star} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                                        <span style={{ fontSize: "0.8rem", fontWeight: 700, width: 16, color: C.muted }}>{star}</span>
                                                        <span style={{ color: "#F59E0B", fontSize: "0.85rem" }}>★</span>
                                                        <div style={{ flex: 1, height: 8, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: "#F59E0B", borderRadius: 99, transition: "width 0.5s" }} /></div>
                                                        <span style={{ fontSize: "0.75rem", color: C.muted, width: 30 }}>{count}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="divider" />
                                    </>
                                )}
                                {feedbacks.length === 0 ? <div className="empty"><Star size={36} /><p>No feedback yet.</p></div> : feedbacks.map(f => (
                                    <div key={f.id} className="fb-card">
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <div className="fb-stars">{"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}</div>
                                            <span style={{ fontSize: "0.7rem", color: C.muted, fontWeight: 600 }}>{["", "⭐", "⭐⭐", "⭐⭐⭐", "Very Good", "Excellent"][f.rating]}</span>
                                        </div>
                                        <p className="fb-text">{f.feedbackText}</p>
                                        <p className="fb-email">{f.studentEmail}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ── ANALYTICS ── */}
                        {page === "graph" && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                                <div className="g-card">
                                    <div className="g-card-title"><BarChart3 size={18} color={C.accent} />Problem Status – Pie Chart</div>
                                    <ResponsiveContainer width="100%" height={320}><PieChart><Pie data={graphData} cx="50%" cy="50%" outerRadius={120} dataKey="value" label>{graphData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer>
                                </div>
                                <div className="g-card">
                                    <div className="g-card-title"><Star size={18} color={C.amber} />Feedback Rating Distribution</div>
                                    <ResponsiveContainer width="100%" height={260}>
                                        <BarChart data={[5, 4, 3, 2, 1].map(s => ({ star: `${s}★`, count: feedbacks.filter(f => f.rating === s).length }))}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                                            <XAxis dataKey="star" tick={{ fontSize: 13 }} /><YAxis allowDecimals={false} tick={{ fontSize: 13 }} /><Tooltip />
                                            <Bar dataKey="count" fill={C.amber} radius={[6, 6, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
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

function ProblemCard({ p, expanded, onToggle, reply, onReplyChange, onSendReply, onMarkSolved, onMarkUnsolved, onDelete }) {
    return (
        <div className={`prob-card ${p.status}`}>
            <div className="prob-header" onClick={onToggle}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="prob-text">{p.problemText}</p>
                    <p className="prob-meta"><strong>{p.studentEmail}</strong> · {new Date(p.createdAt).toLocaleString()}{p.adminReply && <span style={{ color: "#2563EB", marginLeft: 6 }}>💬 Replied</span>}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span className={`prob-badge ${p.status}`}>{p.status === "solved" ? <><CheckCircle size={11} />Solved</> : <><XCircle size={11} />Unsolved</>}</span>
                    {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
            </div>
            {expanded && (
                <div className="prob-expanded">
                    {p.adminReply && <div className="prev-reply"><p style={{ fontSize: "0.77rem", fontWeight: 700, color: "#2563EB", marginBottom: 4 }}>Previous Reply:</p><p style={{ fontSize: "0.87rem" }}>{p.adminReply}</p></div>}
                    <div>
                        <label style={{ fontSize: "0.77rem", fontWeight: 700, color: C.muted, display: "block", marginBottom: 6 }}>Reply to Student</label>
                        <div className="reply-row">
                            <input className="reply-input" placeholder="Type your reply…" value={reply} onChange={e => onReplyChange(e.target.value)} onKeyDown={e => e.key === "Enter" && onSendReply()} />
                            <button className="act-btn send" onClick={onSendReply}><Send size={13} />Send</button>
                        </div>
                    </div>
                    <div className="action-row">
                        {p.status !== "solved" ? <button className="act-btn green" onClick={onMarkSolved}><CheckCircle size={13} />Mark Solved</button> : <button className="act-btn amber" onClick={onMarkUnsolved}><XCircle size={13} />Mark Unsolved</button>}
                        <button className="act-btn red" onClick={onDelete}><Trash2 size={13} />Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}