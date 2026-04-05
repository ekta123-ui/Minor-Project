import { useState, useMemo, useRef, useEffect } from "react";
import {
    Shield, Users, UserCheck, Search, ChevronLeft, ChevronRight,
    Send, Bot, User, X, MessageSquare, GraduationCap, Building2,
    Phone, Mail, BookOpen, Layers, Filter, Download,
} from "lucide-react";

// ─── Real COLA Database (200 teachers) ────────────────────────────────────────
const TEACHERS = [
    { id: 1, name: "Vikas Sharma", school: 5, dept_id: 29, course_id: 9, designation: "Assistant Professor", email: "vikas.sharma@cola.com", phone: "9848096238", gender: "Male", domain: "Computer Science", block: "C", coord: "Project Coordinator" },
    { id: 2, name: "Amit Verma", school: 3, dept_id: 18, course_id: 11, designation: "Lecturer", email: "amit.verma@cola.com", phone: "9537007213", gender: "Female", domain: "Civil", block: "C", coord: "Student Welfare" },
    { id: 3, name: "Arjun Mehta", school: 8, dept_id: 14, course_id: 14, designation: "Assistant Professor", email: "arjun.mehta@cola.com", phone: "9634347749", gender: "Male", domain: "Mechanical", block: "D", coord: "Exam Coordinator" },
    { id: 4, name: "Amit Arora", school: 8, dept_id: 21, course_id: 14, designation: "Lecturer", email: "amit.arora@cola.com", phone: "9060418269", gender: "Male", domain: "Commerce", block: "C", coord: "Exam Coordinator" },
    { id: 5, name: "Priya Sharma", school: 4, dept_id: 2, course_id: 6, designation: "Professor", email: "priya.sharma@cola.com", phone: "9209986576", gender: "Female", domain: "IT", block: "B", coord: "Student Welfare" },
    { id: 6, name: "Amit Kapoor", school: 7, dept_id: 6, course_id: 12, designation: "Professor", email: "amit.kapoor@cola.com", phone: "9662101010", gender: "Male", domain: "IT", block: "D", coord: "Academic Coordinator" },
    { id: 7, name: "Rahul Kapoor", school: 3, dept_id: 7, course_id: 14, designation: "Lecturer", email: "rahul.kapoor@cola.com", phone: "9712343938", gender: "Female", domain: "IT", block: "D", coord: "Student Welfare" },
    { id: 8, name: "Pooja Bansal", school: 2, dept_id: 5, course_id: 19, designation: "Assistant Professor", email: "pooja.bansal@cola.com", phone: "9263576043", gender: "Female", domain: "Mechanical", block: "B", coord: "Student Welfare" },
    { id: 9, name: "Vikas Arora", school: 6, dept_id: 28, course_id: 7, designation: "Lecturer", email: "vikas.arora@cola.com", phone: "9898764610", gender: "Male", domain: "Computer Science", block: "C", coord: "Exam Coordinator" },
    { id: 10, name: "Rahul Kapoor", school: 8, dept_id: 5, course_id: 4, designation: "Professor", email: "rahul.kapoor@cola.com", phone: "9064571013", gender: "Female", domain: "Business", block: "C", coord: "Exam Coordinator" },
    { id: 11, name: "Pooja Mehta", school: 3, dept_id: 5, course_id: 20, designation: "Professor", email: "pooja.mehta@cola.com", phone: "9519603368", gender: "Male", domain: "Law", block: "B", coord: "Academic Coordinator" },
    { id: 12, name: "Suresh Arora", school: 5, dept_id: 10, course_id: 9, designation: "Professor", email: "suresh.arora@cola.com", phone: "9111316734", gender: "Male", domain: "Law", block: "D", coord: "Academic Coordinator" },
    { id: 13, name: "Amit Gupta", school: 8, dept_id: 27, course_id: 3, designation: "Assistant Professor", email: "amit.gupta@cola.com", phone: "9766894356", gender: "Male", domain: "Business", block: "B", coord: "Student Welfare" },
    { id: 14, name: "Priya Sharma", school: 3, dept_id: 16, course_id: 12, designation: "Professor", email: "priya.sharma@cola.com", phone: "9494951762", gender: "Male", domain: "Commerce", block: "D", coord: "Lab Coordinator" },
    { id: 15, name: "Vikas Agarwal", school: 2, dept_id: 13, course_id: 17, designation: "Professor", email: "vikas.agarwal@cola.com", phone: "9664931782", gender: "Male", domain: "IT", block: "B", coord: "Exam Coordinator" },
    { id: 16, name: "Rohit Gupta", school: 5, dept_id: 22, course_id: 4, designation: "Assistant Professor", email: "rohit.gupta@cola.com", phone: "9127364540", gender: "Female", domain: "Civil", block: "A", coord: "Academic Coordinator" },
    { id: 17, name: "Pooja Verma", school: 5, dept_id: 12, course_id: 19, designation: "Lecturer", email: "pooja.verma@cola.com", phone: "9334290553", gender: "Female", domain: "Commerce", block: "C", coord: "Project Coordinator" },
    { id: 18, name: "Karan Bansal", school: 4, dept_id: 8, course_id: 3, designation: "Professor", email: "karan.bansal@cola.com", phone: "9754587208", gender: "Male", domain: "Psychology", block: "D", coord: "Student Welfare" },
    { id: 19, name: "Meena Arora", school: 1, dept_id: 27, course_id: 3, designation: "Associate Professor", email: "meena.arora@cola.com", phone: "9633096840", gender: "Male", domain: "Business", block: "A", coord: "Student Welfare" },
    { id: 20, name: "Arjun Arora", school: 8, dept_id: 14, course_id: 17, designation: "Lecturer", email: "arjun.arora@cola.com", phone: "9779897792", gender: "Male", domain: "Computer Science", block: "B", coord: "Student Welfare" },
    { id: 21, name: "Arjun Agarwal", school: 5, dept_id: 16, course_id: 13, designation: "Associate Professor", email: "arjun.agarwal@cola.com", phone: "9332369550", gender: "Female", domain: "Business", block: "B", coord: "Student Welfare" },
    { id: 22, name: "Amit Sharma", school: 2, dept_id: 10, course_id: 10, designation: "Professor", email: "amit.sharma@cola.com", phone: "9494824669", gender: "Male", domain: "Computer Science", block: "D", coord: "Lab Coordinator" },
    { id: 23, name: "Riya Yadav", school: 5, dept_id: 18, course_id: 10, designation: "Lecturer", email: "riya.yadav@cola.com", phone: "9783417253", gender: "Female", domain: "Commerce", block: "A", coord: "Student Welfare" },
    { id: 24, name: "Arjun Sharma", school: 5, dept_id: 20, course_id: 1, designation: "Assistant Professor", email: "arjun.sharma@cola.com", phone: "9587584706", gender: "Male", domain: "Civil", block: "C", coord: "Lab Coordinator" },
    { id: 25, name: "Arjun Agarwal", school: 6, dept_id: 8, course_id: 15, designation: "Assistant Professor", email: "arjun.agarwal@cola.com", phone: "9288245915", gender: "Female", domain: "Law", block: "C", coord: "Project Coordinator" },
    { id: 26, name: "Suresh Mehta", school: 5, dept_id: 16, course_id: 10, designation: "Associate Professor", email: "suresh.mehta@cola.com", phone: "9831692174", gender: "Male", domain: "Psychology", block: "B", coord: "Lab Coordinator" },
    { id: 27, name: "Deepak Gupta", school: 4, dept_id: 19, course_id: 7, designation: "Associate Professor", email: "deepak.gupta@cola.com", phone: "9154876710", gender: "Male", domain: "Psychology", block: "B", coord: "Project Coordinator" },
    { id: 28, name: "Anita Arora", school: 6, dept_id: 14, course_id: 12, designation: "Lecturer", email: "anita.arora@cola.com", phone: "9410672073", gender: "Female", domain: "Psychology", block: "C", coord: "Academic Coordinator" },
    { id: 29, name: "Anita Singh", school: 1, dept_id: 24, course_id: 15, designation: "Associate Professor", email: "anita.singh@cola.com", phone: "9891475765", gender: "Female", domain: "Commerce", block: "B", coord: "Academic Coordinator" },
    { id: 30, name: "Rahul Yadav", school: 2, dept_id: 26, course_id: 14, designation: "Professor", email: "rahul.yadav@cola.com", phone: "9700297336", gender: "Female", domain: "Civil", block: "A", coord: "Exam Coordinator" },
    { id: 31, name: "Rohit Bansal", school: 3, dept_id: 3, course_id: 4, designation: "Associate Professor", email: "rohit.bansal@cola.com", phone: "9408171698", gender: "Female", domain: "Computer Science", block: "B", coord: "Academic Coordinator" },
    { id: 32, name: "Rahul Bansal", school: 7, dept_id: 7, course_id: 12, designation: "Associate Professor", email: "rahul.bansal@cola.com", phone: "9352968262", gender: "Male", domain: "Commerce", block: "C", coord: "Student Welfare" },
    { id: 33, name: "Rahul Mehta", school: 1, dept_id: 10, course_id: 11, designation: "Assistant Professor", email: "rahul.mehta@cola.com", phone: "9684156104", gender: "Female", domain: "Law", block: "C", coord: "Exam Coordinator" },
    { id: 34, name: "Sneha Arora", school: 6, dept_id: 15, course_id: 6, designation: "Lecturer", email: "sneha.arora@cola.com", phone: "9085599450", gender: "Male", domain: "Law", block: "A", coord: "Student Welfare" },
    { id: 35, name: "Rahul Bansal", school: 8, dept_id: 15, course_id: 8, designation: "Associate Professor", email: "rahul.bansal@cola.com", phone: "9919850068", gender: "Male", domain: "Mechanical", block: "A", coord: "Student Welfare" },
    { id: 36, name: "Suresh Bansal", school: 5, dept_id: 19, course_id: 18, designation: "Assistant Professor", email: "suresh.bansal@cola.com", phone: "9116875526", gender: "Male", domain: "Business", block: "C", coord: "Lab Coordinator" },
    { id: 37, name: "Anita Mehta", school: 7, dept_id: 24, course_id: 12, designation: "Lecturer", email: "anita.mehta@cola.com", phone: "9831532454", gender: "Female", domain: "Business", block: "D", coord: "Exam Coordinator" },
    { id: 38, name: "Meena Arora", school: 6, dept_id: 24, course_id: 12, designation: "Associate Professor", email: "meena.arora@cola.com", phone: "9335726204", gender: "Male", domain: "Mechanical", block: "A", coord: "Project Coordinator" },
    { id: 39, name: "Amit Arora", school: 2, dept_id: 8, course_id: 10, designation: "Assistant Professor", email: "amit.arora@cola.com", phone: "9955005203", gender: "Female", domain: "Business", block: "C", coord: "Exam Coordinator" },
    { id: 40, name: "Pooja Agarwal", school: 7, dept_id: 27, course_id: 11, designation: "Assistant Professor", email: "pooja.agarwal@cola.com", phone: "9081790637", gender: "Male", domain: "Mechanical", block: "D", coord: "Student Welfare" },
    { id: 41, name: "Arjun Mehta", school: 4, dept_id: 20, course_id: 5, designation: "Associate Professor", email: "arjun.mehta@cola.com", phone: "9517205536", gender: "Male", domain: "Computer Science", block: "C", coord: "Lab Coordinator" },
    { id: 42, name: "Arjun Agarwal", school: 2, dept_id: 15, course_id: 18, designation: "Associate Professor", email: "arjun.agarwal@cola.com", phone: "9704573026", gender: "Female", domain: "Computer Science", block: "D", coord: "Project Coordinator" },
    { id: 43, name: "Riya Gupta", school: 6, dept_id: 28, course_id: 6, designation: "Professor", email: "riya.gupta@cola.com", phone: "9564757212", gender: "Male", domain: "Law", block: "A", coord: "Lab Coordinator" },
    { id: 44, name: "Meena Singh", school: 7, dept_id: 15, course_id: 12, designation: "Associate Professor", email: "meena.singh@cola.com", phone: "9643611667", gender: "Male", domain: "Psychology", block: "B", coord: "Project Coordinator" },
    { id: 45, name: "Rahul Mehta", school: 2, dept_id: 4, course_id: 11, designation: "Professor", email: "rahul.mehta@cola.com", phone: "9727331212", gender: "Male", domain: "Civil", block: "A", coord: "Academic Coordinator" },
    { id: 46, name: "Vikas Singh", school: 6, dept_id: 28, course_id: 11, designation: "Lecturer", email: "vikas.singh@cola.com", phone: "9980490930", gender: "Male", domain: "Civil", block: "C", coord: "Academic Coordinator" },
    { id: 47, name: "Vikas Singh", school: 6, dept_id: 11, course_id: 8, designation: "Associate Professor", email: "vikas.singh@cola.com", phone: "9944113125", gender: "Male", domain: "Business", block: "A", coord: "Student Welfare" },
    { id: 48, name: "Meena Verma", school: 6, dept_id: 4, course_id: 3, designation: "Professor", email: "meena.verma@cola.com", phone: "9525774382", gender: "Female", domain: "Computer Science", block: "A", coord: "Exam Coordinator" },
    { id: 49, name: "Suresh Agarwal", school: 1, dept_id: 8, course_id: 6, designation: "Professor", email: "suresh.agarwal@cola.com", phone: "9475134179", gender: "Male", domain: "Commerce", block: "C", coord: "Project Coordinator" },
    { id: 50, name: "Karan Yadav", school: 4, dept_id: 17, course_id: 8, designation: "Associate Professor", email: "karan.yadav@cola.com", phone: "9765827839", gender: "Male", domain: "Psychology", block: "C", coord: "Exam Coordinator" },
    { id: 51, name: "Vikas Sharma", school: 7, dept_id: 5, course_id: 4, designation: "Associate Professor", email: "vikas.sharma@cola.com", phone: "9437648513", gender: "Male", domain: "Law", block: "A", coord: "Project Coordinator" },
    { id: 52, name: "Amit Verma", school: 7, dept_id: 18, course_id: 18, designation: "Associate Professor", email: "amit.verma@cola.com", phone: "9253533840", gender: "Female", domain: "Commerce", block: "B", coord: "Exam Coordinator" },
    { id: 53, name: "Sneha Bansal", school: 6, dept_id: 17, course_id: 20, designation: "Lecturer", email: "sneha.bansal@cola.com", phone: "9518815096", gender: "Female", domain: "Mechanical", block: "C", coord: "Academic Coordinator" },
    { id: 54, name: "Vikas Bansal", school: 4, dept_id: 12, course_id: 19, designation: "Lecturer", email: "vikas.bansal@cola.com", phone: "9304111082", gender: "Male", domain: "Business", block: "A", coord: "Student Welfare" },
    { id: 55, name: "Amit Mehta", school: 4, dept_id: 24, course_id: 3, designation: "Lecturer", email: "amit.mehta@cola.com", phone: "9199263058", gender: "Male", domain: "Civil", block: "B", coord: "Exam Coordinator" },
    { id: 56, name: "Rahul Yadav", school: 1, dept_id: 22, course_id: 2, designation: "Assistant Professor", email: "rahul.yadav@cola.com", phone: "9385499785", gender: "Male", domain: "Computer Science", block: "B", coord: "Academic Coordinator" },
    { id: 57, name: "Riya Yadav", school: 2, dept_id: 14, course_id: 15, designation: "Assistant Professor", email: "riya.yadav@cola.com", phone: "9701642429", gender: "Female", domain: "Commerce", block: "C", coord: "Lab Coordinator" },
    { id: 58, name: "Priya Gupta", school: 5, dept_id: 13, course_id: 15, designation: "Lecturer", email: "priya.gupta@cola.com", phone: "9284443946", gender: "Female", domain: "Computer Science", block: "C", coord: "Exam Coordinator" },
    { id: 59, name: "Amit Verma", school: 6, dept_id: 30, course_id: 20, designation: "Lecturer", email: "amit.verma@cola.com", phone: "9329473004", gender: "Female", domain: "Computer Science", block: "A", coord: "Academic Coordinator" },
    { id: 60, name: "Pooja Mehta", school: 2, dept_id: 8, course_id: 1, designation: "Associate Professor", email: "pooja.mehta@cola.com", phone: "9627026774", gender: "Female", domain: "Business", block: "A", coord: "Academic Coordinator" },
    { id: 61, name: "Anita Arora", school: 4, dept_id: 19, course_id: 5, designation: "Assistant Professor", email: "anita.arora@cola.com", phone: "9714704288", gender: "Male", domain: "Business", block: "B", coord: "Academic Coordinator" },
    { id: 62, name: "Deepak Arora", school: 6, dept_id: 30, course_id: 16, designation: "Professor", email: "deepak.arora@cola.com", phone: "9731688106", gender: "Female", domain: "Business", block: "B", coord: "Exam Coordinator" },
    { id: 63, name: "Amit Bansal", school: 5, dept_id: 1, course_id: 8, designation: "Assistant Professor", email: "amit.bansal@cola.com", phone: "9821565198", gender: "Female", domain: "Civil", block: "D", coord: "Exam Coordinator" },
    { id: 64, name: "Deepak Mehta", school: 3, dept_id: 1, course_id: 17, designation: "Associate Professor", email: "deepak.mehta@cola.com", phone: "9064965688", gender: "Male", domain: "Business", block: "A", coord: "Lab Coordinator" },
    { id: 65, name: "Arjun Bansal", school: 4, dept_id: 7, course_id: 19, designation: "Professor", email: "arjun.bansal@cola.com", phone: "9945905448", gender: "Male", domain: "Law", block: "A", coord: "Exam Coordinator" },
    { id: 66, name: "Deepak Singh", school: 8, dept_id: 18, course_id: 17, designation: "Lecturer", email: "deepak.singh@cola.com", phone: "9243088286", gender: "Male", domain: "Law", block: "C", coord: "Exam Coordinator" },
    { id: 67, name: "Karan Verma", school: 2, dept_id: 25, course_id: 10, designation: "Lecturer", email: "karan.verma@cola.com", phone: "9415764682", gender: "Female", domain: "Commerce", block: "D", coord: "Exam Coordinator" },
    { id: 68, name: "Suresh Singh", school: 6, dept_id: 25, course_id: 16, designation: "Associate Professor", email: "suresh.singh@cola.com", phone: "9558777201", gender: "Female", domain: "Commerce", block: "C", coord: "Academic Coordinator" },
    { id: 69, name: "Vikas Verma", school: 2, dept_id: 10, course_id: 10, designation: "Assistant Professor", email: "vikas.verma@cola.com", phone: "9802694528", gender: "Male", domain: "Psychology", block: "C", coord: "Project Coordinator" },
    { id: 70, name: "Rahul Yadav", school: 3, dept_id: 17, course_id: 1, designation: "Professor", email: "rahul.yadav@cola.com", phone: "9921784397", gender: "Male", domain: "Business", block: "B", coord: "Student Welfare" },
    { id: 71, name: "Pooja Arora", school: 8, dept_id: 21, course_id: 8, designation: "Associate Professor", email: "pooja.arora@cola.com", phone: "9009532996", gender: "Female", domain: "Psychology", block: "B", coord: "Student Welfare" },
    { id: 72, name: "Amit Verma", school: 2, dept_id: 10, course_id: 9, designation: "Lecturer", email: "amit.verma@cola.com", phone: "9660034151", gender: "Female", domain: "Commerce", block: "B", coord: "Student Welfare" },
    { id: 73, name: "Priya Mehta", school: 6, dept_id: 28, course_id: 14, designation: "Associate Professor", email: "priya.mehta@cola.com", phone: "9391595564", gender: "Male", domain: "Computer Science", block: "A", coord: "Student Welfare" },
    { id: 74, name: "Amit Bansal", school: 5, dept_id: 14, course_id: 15, designation: "Associate Professor", email: "amit.bansal@cola.com", phone: "9142216348", gender: "Male", domain: "Business", block: "C", coord: "Student Welfare" },
    { id: 75, name: "Meena Agarwal", school: 2, dept_id: 2, course_id: 16, designation: "Lecturer", email: "meena.agarwal@cola.com", phone: "9848448599", gender: "Male", domain: "IT", block: "A", coord: "Lab Coordinator" },
    { id: 76, name: "Karan Singh", school: 3, dept_id: 5, course_id: 3, designation: "Associate Professor", email: "karan.singh@cola.com", phone: "9794788704", gender: "Male", domain: "Law", block: "B", coord: "Student Welfare" },
    { id: 77, name: "Suresh Kapoor", school: 8, dept_id: 7, course_id: 6, designation: "Assistant Professor", email: "suresh.kapoor@cola.com", phone: "9210293820", gender: "Female", domain: "Mechanical", block: "D", coord: "Student Welfare" },
    { id: 78, name: "Meena Yadav", school: 5, dept_id: 12, course_id: 3, designation: "Assistant Professor", email: "meena.yadav@cola.com", phone: "9736238088", gender: "Male", domain: "Computer Science", block: "C", coord: "Exam Coordinator" },
    { id: 79, name: "Priya Kapoor", school: 8, dept_id: 21, course_id: 18, designation: "Lecturer", email: "priya.kapoor@cola.com", phone: "9068173761", gender: "Female", domain: "Law", block: "B", coord: "Exam Coordinator" },
    { id: 80, name: "Meena Verma", school: 6, dept_id: 17, course_id: 9, designation: "Professor", email: "meena.verma@cola.com", phone: "9483896891", gender: "Male", domain: "Business", block: "C", coord: "Project Coordinator" },
    { id: 81, name: "Priya Sharma", school: 2, dept_id: 10, course_id: 2, designation: "Professor", email: "priya.sharma@cola.com", phone: "9862507229", gender: "Male", domain: "Civil", block: "A", coord: "Student Welfare" },
    { id: 82, name: "Deepak Bansal", school: 1, dept_id: 3, course_id: 10, designation: "Assistant Professor", email: "deepak.bansal@cola.com", phone: "9170696079", gender: "Female", domain: "Civil", block: "A", coord: "Academic Coordinator" },
    { id: 83, name: "Vikas Agarwal", school: 1, dept_id: 17, course_id: 1, designation: "Assistant Professor", email: "vikas.agarwal@cola.com", phone: "9750105357", gender: "Female", domain: "IT", block: "B", coord: "Lab Coordinator" },
    { id: 84, name: "Riya Gupta", school: 2, dept_id: 7, course_id: 2, designation: "Assistant Professor", email: "riya.gupta@cola.com", phone: "9460023986", gender: "Female", domain: "Commerce", block: "A", coord: "Exam Coordinator" },
    { id: 85, name: "Deepak Yadav", school: 4, dept_id: 21, course_id: 3, designation: "Professor", email: "deepak.yadav@cola.com", phone: "9559894669", gender: "Male", domain: "Law", block: "D", coord: "Project Coordinator" },
    { id: 86, name: "Meena Arora", school: 1, dept_id: 16, course_id: 18, designation: "Assistant Professor", email: "meena.arora@cola.com", phone: "9735878042", gender: "Female", domain: "Civil", block: "B", coord: "Lab Coordinator" },
    { id: 87, name: "Riya Agarwal", school: 6, dept_id: 3, course_id: 13, designation: "Professor", email: "riya.agarwal@cola.com", phone: "9757901904", gender: "Male", domain: "Commerce", block: "D", coord: "Student Welfare" },
    { id: 88, name: "Neha Yadav", school: 3, dept_id: 14, course_id: 6, designation: "Assistant Professor", email: "neha.yadav@cola.com", phone: "9422950756", gender: "Male", domain: "Commerce", block: "D", coord: "Exam Coordinator" },
    { id: 89, name: "Riya Yadav", school: 6, dept_id: 4, course_id: 1, designation: "Assistant Professor", email: "riya.yadav@cola.com", phone: "9851031129", gender: "Female", domain: "Computer Science", block: "B", coord: "Student Welfare" },
    { id: 90, name: "Karan Verma", school: 2, dept_id: 25, course_id: 13, designation: "Lecturer", email: "karan.verma@cola.com", phone: "9650618897", gender: "Female", domain: "Civil", block: "C", coord: "Lab Coordinator" },
    { id: 91, name: "Neha Singh", school: 7, dept_id: 18, course_id: 1, designation: "Professor", email: "neha.singh@cola.com", phone: "9133788895", gender: "Female", domain: "Business", block: "B", coord: "Student Welfare" },
    { id: 92, name: "Pooja Arora", school: 1, dept_id: 26, course_id: 20, designation: "Assistant Professor", email: "pooja.arora@cola.com", phone: "9300497698", gender: "Male", domain: "Business", block: "D", coord: "Academic Coordinator" },
    { id: 93, name: "Priya Yadav", school: 3, dept_id: 22, course_id: 5, designation: "Professor", email: "priya.yadav@cola.com", phone: "9634578535", gender: "Female", domain: "Psychology", block: "D", coord: "Lab Coordinator" },
    { id: 94, name: "Deepak Sharma", school: 7, dept_id: 9, course_id: 16, designation: "Lecturer", email: "deepak.sharma@cola.com", phone: "9321001454", gender: "Female", domain: "Mechanical", block: "A", coord: "Student Welfare" },
    { id: 95, name: "Rohit Gupta", school: 8, dept_id: 21, course_id: 11, designation: "Assistant Professor", email: "rohit.gupta@cola.com", phone: "9750521063", gender: "Male", domain: "Psychology", block: "A", coord: "Project Coordinator" },
    { id: 96, name: "Rahul Arora", school: 2, dept_id: 28, course_id: 18, designation: "Professor", email: "rahul.arora@cola.com", phone: "9970347327", gender: "Male", domain: "Psychology", block: "B", coord: "Lab Coordinator" },
    { id: 97, name: "Vikas Agarwal", school: 7, dept_id: 7, course_id: 17, designation: "Assistant Professor", email: "vikas.agarwal@cola.com", phone: "9896052558", gender: "Male", domain: "Psychology", block: "B", coord: "Student Welfare" },
    { id: 98, name: "Meena Bansal", school: 7, dept_id: 4, course_id: 9, designation: "Professor", email: "meena.bansal@cola.com", phone: "9617183386", gender: "Female", domain: "Commerce", block: "C", coord: "Lab Coordinator" },
    { id: 99, name: "Arjun Kapoor", school: 4, dept_id: 13, course_id: 11, designation: "Assistant Professor", email: "arjun.kapoor@cola.com", phone: "9595656326", gender: "Male", domain: "Civil", block: "D", coord: "Exam Coordinator" },
    { id: 100, name: "Riya Agarwal", school: 7, dept_id: 19, course_id: 7, designation: "Associate Professor", email: "riya.agarwal@cola.com", phone: "9336953199", gender: "Male", domain: "Business", block: "A", coord: "Exam Coordinator" },
    { id: 101, name: "Priya Yadav", school: 7, dept_id: 1, course_id: 17, designation: "Lecturer", email: "priya.yadav@cola.com", phone: "9421038440", gender: "Male", domain: "Business", block: "D", coord: "Academic Coordinator" },
    { id: 102, name: "Amit Yadav", school: 2, dept_id: 17, course_id: 11, designation: "Lecturer", email: "amit.yadav@cola.com", phone: "9499725933", gender: "Female", domain: "Psychology", block: "B", coord: "Project Coordinator" },
    { id: 103, name: "Deepak Kapoor", school: 7, dept_id: 10, course_id: 4, designation: "Assistant Professor", email: "deepak.kapoor@cola.com", phone: "9545761329", gender: "Male", domain: "Computer Science", block: "D", coord: "Project Coordinator" },
    { id: 104, name: "Amit Verma", school: 2, dept_id: 28, course_id: 14, designation: "Assistant Professor", email: "amit.verma@cola.com", phone: "9202717001", gender: "Female", domain: "Computer Science", block: "A", coord: "Lab Coordinator" },
    { id: 105, name: "Meena Kapoor", school: 5, dept_id: 12, course_id: 3, designation: "Assistant Professor", email: "meena.kapoor@cola.com", phone: "9527507403", gender: "Male", domain: "Civil", block: "A", coord: "Academic Coordinator" },
    { id: 106, name: "Rohit Kapoor", school: 6, dept_id: 26, course_id: 20, designation: "Assistant Professor", email: "rohit.kapoor@cola.com", phone: "9372452551", gender: "Female", domain: "Computer Science", block: "B", coord: "Project Coordinator" },
    { id: 107, name: "Suresh Mehta", school: 6, dept_id: 19, course_id: 19, designation: "Assistant Professor", email: "suresh.mehta@cola.com", phone: "9593295217", gender: "Female", domain: "Law", block: "C", coord: "Student Welfare" },
    { id: 108, name: "Priya Yadav", school: 1, dept_id: 30, course_id: 16, designation: "Associate Professor", email: "priya.yadav@cola.com", phone: "9609549835", gender: "Male", domain: "Civil", block: "C", coord: "Academic Coordinator" },
    { id: 109, name: "Riya Singh", school: 7, dept_id: 29, course_id: 9, designation: "Professor", email: "riya.singh@cola.com", phone: "9609668744", gender: "Female", domain: "Mechanical", block: "D", coord: "Exam Coordinator" },
    { id: 110, name: "Rohit Sharma", school: 6, dept_id: 13, course_id: 9, designation: "Professor", email: "rohit.sharma@cola.com", phone: "9835854686", gender: "Female", domain: "Civil", block: "D", coord: "Lab Coordinator" },
    { id: 111, name: "Priya Bansal", school: 2, dept_id: 2, course_id: 15, designation: "Lecturer", email: "priya.bansal@cola.com", phone: "9089421966", gender: "Female", domain: "Commerce", block: "C", coord: "Student Welfare" },
    { id: 112, name: "Pooja Singh", school: 5, dept_id: 1, course_id: 4, designation: "Professor", email: "pooja.singh@cola.com", phone: "9893954573", gender: "Female", domain: "Mechanical", block: "D", coord: "Project Coordinator" },
    { id: 113, name: "Neha Yadav", school: 3, dept_id: 15, course_id: 5, designation: "Associate Professor", email: "neha.yadav@cola.com", phone: "9020688709", gender: "Male", domain: "IT", block: "D", coord: "Lab Coordinator" },
    { id: 114, name: "Vikas Arora", school: 2, dept_id: 21, course_id: 3, designation: "Assistant Professor", email: "vikas.arora@cola.com", phone: "9757044522", gender: "Male", domain: "Mechanical", block: "D", coord: "Project Coordinator" },
    { id: 115, name: "Arjun Verma", school: 5, dept_id: 3, course_id: 5, designation: "Lecturer", email: "arjun.verma@cola.com", phone: "9616201086", gender: "Female", domain: "IT", block: "C", coord: "Lab Coordinator" },
    { id: 116, name: "Vikas Arora", school: 4, dept_id: 7, course_id: 9, designation: "Assistant Professor", email: "vikas.arora@cola.com", phone: "9846840918", gender: "Male", domain: "Law", block: "D", coord: "Lab Coordinator" },
    { id: 117, name: "Riya Kapoor", school: 8, dept_id: 16, course_id: 16, designation: "Assistant Professor", email: "riya.kapoor@cola.com", phone: "9977622910", gender: "Female", domain: "IT", block: "A", coord: "Project Coordinator" },
    { id: 118, name: "Rohit Yadav", school: 1, dept_id: 8, course_id: 10, designation: "Associate Professor", email: "rohit.yadav@cola.com", phone: "9497770706", gender: "Male", domain: "Computer Science", block: "C", coord: "Lab Coordinator" },
    { id: 119, name: "Pooja Agarwal", school: 2, dept_id: 14, course_id: 11, designation: "Professor", email: "pooja.agarwal@cola.com", phone: "9193165688", gender: "Male", domain: "Civil", block: "A", coord: "Student Welfare" },
    { id: 120, name: "Karan Verma", school: 8, dept_id: 14, course_id: 2, designation: "Associate Professor", email: "karan.verma@cola.com", phone: "9880942792", gender: "Male", domain: "IT", block: "A", coord: "Exam Coordinator" },
    { id: 121, name: "Priya Yadav", school: 5, dept_id: 7, course_id: 1, designation: "Professor", email: "priya.yadav@cola.com", phone: "9046850485", gender: "Male", domain: "Business", block: "A", coord: "Student Welfare" },
    { id: 122, name: "Deepak Gupta", school: 5, dept_id: 4, course_id: 16, designation: "Lecturer", email: "deepak.gupta@cola.com", phone: "9783078572", gender: "Female", domain: "Computer Science", block: "D", coord: "Academic Coordinator" },
    { id: 123, name: "Amit Mehta", school: 4, dept_id: 15, course_id: 20, designation: "Lecturer", email: "amit.mehta@cola.com", phone: "9936235516", gender: "Female", domain: "Computer Science", block: "B", coord: "Lab Coordinator" },
    { id: 124, name: "Meena Verma", school: 7, dept_id: 18, course_id: 1, designation: "Lecturer", email: "meena.verma@cola.com", phone: "9215863265", gender: "Female", domain: "Civil", block: "C", coord: "Academic Coordinator" },
    { id: 125, name: "Riya Mehta", school: 7, dept_id: 24, course_id: 5, designation: "Lecturer", email: "riya.mehta@cola.com", phone: "9002714683", gender: "Male", domain: "Psychology", block: "A", coord: "Exam Coordinator" },
    { id: 126, name: "Meena Arora", school: 1, dept_id: 10, course_id: 19, designation: "Assistant Professor", email: "meena.arora@cola.com", phone: "9966276630", gender: "Female", domain: "Business", block: "C", coord: "Academic Coordinator" },
    { id: 127, name: "Neha Singh", school: 7, dept_id: 1, course_id: 5, designation: "Lecturer", email: "neha.singh@cola.com", phone: "9464752193", gender: "Male", domain: "Law", block: "A", coord: "Exam Coordinator" },
    { id: 128, name: "Priya Singh", school: 2, dept_id: 16, course_id: 5, designation: "Associate Professor", email: "priya.singh@cola.com", phone: "9379643022", gender: "Female", domain: "Business", block: "A", coord: "Project Coordinator" },
    { id: 129, name: "Karan Agarwal", school: 5, dept_id: 19, course_id: 5, designation: "Assistant Professor", email: "karan.agarwal@cola.com", phone: "9111011728", gender: "Male", domain: "Commerce", block: "B", coord: "Exam Coordinator" },
    { id: 130, name: "Deepak Sharma", school: 3, dept_id: 27, course_id: 3, designation: "Lecturer", email: "deepak.sharma@cola.com", phone: "9688444127", gender: "Male", domain: "Computer Science", block: "B", coord: "Exam Coordinator" },
    { id: 131, name: "Amit Arora", school: 6, dept_id: 12, course_id: 12, designation: "Professor", email: "amit.arora@cola.com", phone: "9106894128", gender: "Male", domain: "Civil", block: "D", coord: "Project Coordinator" },
    { id: 132, name: "Neha Agarwal", school: 2, dept_id: 17, course_id: 11, designation: "Lecturer", email: "neha.agarwal@cola.com", phone: "9757604676", gender: "Male", domain: "Commerce", block: "D", coord: "Project Coordinator" },
    { id: 133, name: "Anita Yadav", school: 4, dept_id: 6, course_id: 6, designation: "Professor", email: "anita.yadav@cola.com", phone: "9721088292", gender: "Male", domain: "Civil", block: "D", coord: "Lab Coordinator" },
    { id: 134, name: "Meena Bansal", school: 6, dept_id: 20, course_id: 5, designation: "Lecturer", email: "meena.bansal@cola.com", phone: "9296856362", gender: "Male", domain: "Civil", block: "A", coord: "Exam Coordinator" },
    { id: 135, name: "Rahul Verma", school: 4, dept_id: 6, course_id: 17, designation: "Lecturer", email: "rahul.verma@cola.com", phone: "9515544349", gender: "Female", domain: "Law", block: "A", coord: "Lab Coordinator" },
    { id: 136, name: "Sneha Verma", school: 6, dept_id: 16, course_id: 10, designation: "Lecturer", email: "sneha.verma@cola.com", phone: "9256303439", gender: "Male", domain: "Business", block: "B", coord: "Student Welfare" },
    { id: 137, name: "Neha Kapoor", school: 2, dept_id: 6, course_id: 9, designation: "Lecturer", email: "neha.kapoor@cola.com", phone: "9240410744", gender: "Male", domain: "IT", block: "B", coord: "Exam Coordinator" },
    { id: 138, name: "Sneha Arora", school: 6, dept_id: 19, course_id: 1, designation: "Associate Professor", email: "sneha.arora@cola.com", phone: "9197460118", gender: "Male", domain: "Civil", block: "A", coord: "Academic Coordinator" },
    { id: 139, name: "Anita Kapoor", school: 3, dept_id: 22, course_id: 8, designation: "Associate Professor", email: "anita.kapoor@cola.com", phone: "9018644301", gender: "Female", domain: "Law", block: "C", coord: "Project Coordinator" },
    { id: 140, name: "Rohit Arora", school: 1, dept_id: 4, course_id: 13, designation: "Professor", email: "rohit.arora@cola.com", phone: "9848550791", gender: "Male", domain: "IT", block: "B", coord: "Lab Coordinator" },
    { id: 141, name: "Arjun Sharma", school: 1, dept_id: 19, course_id: 1, designation: "Associate Professor", email: "arjun.sharma@cola.com", phone: "9742231002", gender: "Male", domain: "Civil", block: "D", coord: "Academic Coordinator" },
    { id: 142, name: "Priya Arora", school: 8, dept_id: 23, course_id: 11, designation: "Assistant Professor", email: "priya.arora@cola.com", phone: "9823316340", gender: "Male", domain: "Business", block: "C", coord: "Student Welfare" },
    { id: 143, name: "Karan Sharma", school: 3, dept_id: 13, course_id: 6, designation: "Associate Professor", email: "karan.sharma@cola.com", phone: "9123589552", gender: "Female", domain: "Mechanical", block: "A", coord: "Academic Coordinator" },
    { id: 144, name: "Rohit Agarwal", school: 1, dept_id: 21, course_id: 20, designation: "Assistant Professor", email: "rohit.agarwal@cola.com", phone: "9029446564", gender: "Female", domain: "IT", block: "B", coord: "Exam Coordinator" },
    { id: 145, name: "Vikas Arora", school: 5, dept_id: 12, course_id: 4, designation: "Lecturer", email: "vikas.arora@cola.com", phone: "9242517725", gender: "Female", domain: "Mechanical", block: "D", coord: "Exam Coordinator" },
    { id: 146, name: "Sneha Agarwal", school: 2, dept_id: 28, course_id: 19, designation: "Lecturer", email: "sneha.agarwal@cola.com", phone: "9522387162", gender: "Female", domain: "Mechanical", block: "B", coord: "Project Coordinator" },
    { id: 147, name: "Priya Agarwal", school: 7, dept_id: 17, course_id: 4, designation: "Lecturer", email: "priya.agarwal@cola.com", phone: "9792559284", gender: "Male", domain: "Commerce", block: "C", coord: "Project Coordinator" },
    { id: 148, name: "Vikas Kapoor", school: 2, dept_id: 3, course_id: 10, designation: "Associate Professor", email: "vikas.kapoor@cola.com", phone: "9408782497", gender: "Male", domain: "Business", block: "C", coord: "Student Welfare" },
    { id: 149, name: "Vikas Arora", school: 4, dept_id: 17, course_id: 20, designation: "Professor", email: "vikas.arora@cola.com", phone: "9791636759", gender: "Female", domain: "Commerce", block: "A", coord: "Academic Coordinator" },
    { id: 150, name: "Meena Singh", school: 4, dept_id: 24, course_id: 19, designation: "Lecturer", email: "meena.singh@cola.com", phone: "9897343616", gender: "Male", domain: "Law", block: "C", coord: "Exam Coordinator" },
    { id: 151, name: "Sneha Verma", school: 8, dept_id: 17, course_id: 10, designation: "Associate Professor", email: "sneha.verma@cola.com", phone: "9351938172", gender: "Male", domain: "IT", block: "A", coord: "Lab Coordinator" },
    { id: 152, name: "Rohit Bansal", school: 2, dept_id: 23, course_id: 9, designation: "Associate Professor", email: "rohit.bansal@cola.com", phone: "9879661270", gender: "Female", domain: "Civil", block: "C", coord: "Project Coordinator" },
    { id: 153, name: "Riya Mehta", school: 5, dept_id: 6, course_id: 10, designation: "Assistant Professor", email: "riya.mehta@cola.com", phone: "9949913202", gender: "Female", domain: "Computer Science", block: "C", coord: "Student Welfare" },
    { id: 154, name: "Neha Sharma", school: 1, dept_id: 28, course_id: 16, designation: "Lecturer", email: "neha.sharma@cola.com", phone: "9006223870", gender: "Female", domain: "Law", block: "B", coord: "Project Coordinator" },
    { id: 155, name: "Pooja Bansal", school: 4, dept_id: 23, course_id: 3, designation: "Lecturer", email: "pooja.bansal@cola.com", phone: "9686376527", gender: "Male", domain: "Commerce", block: "A", coord: "Exam Coordinator" },
    { id: 156, name: "Rohit Kapoor", school: 6, dept_id: 2, course_id: 18, designation: "Lecturer", email: "rohit.kapoor@cola.com", phone: "9218447488", gender: "Female", domain: "IT", block: "A", coord: "Lab Coordinator" },
    { id: 157, name: "Vikas Arora", school: 3, dept_id: 19, course_id: 11, designation: "Professor", email: "vikas.arora@cola.com", phone: "9351295039", gender: "Male", domain: "IT", block: "A", coord: "Student Welfare" },
    { id: 158, name: "Sneha Singh", school: 6, dept_id: 26, course_id: 8, designation: "Associate Professor", email: "sneha.singh@cola.com", phone: "9980550890", gender: "Female", domain: "Business", block: "C", coord: "Student Welfare" },
    { id: 159, name: "Rohit Mehta", school: 4, dept_id: 4, course_id: 16, designation: "Lecturer", email: "rohit.mehta@cola.com", phone: "9686505474", gender: "Male", domain: "Law", block: "C", coord: "Project Coordinator" },
    { id: 160, name: "Riya Kapoor", school: 3, dept_id: 1, course_id: 4, designation: "Lecturer", email: "riya.kapoor@cola.com", phone: "9570733627", gender: "Male", domain: "Mechanical", block: "B", coord: "Lab Coordinator" },
    { id: 161, name: "Anita Gupta", school: 5, dept_id: 24, course_id: 19, designation: "Associate Professor", email: "anita.gupta@cola.com", phone: "9232192642", gender: "Female", domain: "Business", block: "C", coord: "Lab Coordinator" },
    { id: 162, name: "Karan Kapoor", school: 7, dept_id: 4, course_id: 17, designation: "Assistant Professor", email: "karan.kapoor@cola.com", phone: "9731410445", gender: "Male", domain: "Computer Science", block: "D", coord: "Exam Coordinator" },
    { id: 163, name: "Rahul Singh", school: 8, dept_id: 15, course_id: 6, designation: "Assistant Professor", email: "rahul.singh@cola.com", phone: "9943548185", gender: "Female", domain: "Mechanical", block: "C", coord: "Academic Coordinator" },
    { id: 164, name: "Rohit Verma", school: 5, dept_id: 9, course_id: 19, designation: "Assistant Professor", email: "rohit.verma@cola.com", phone: "9979177681", gender: "Female", domain: "IT", block: "A", coord: "Student Welfare" },
    { id: 165, name: "Meena Singh", school: 6, dept_id: 1, course_id: 11, designation: "Lecturer", email: "meena.singh@cola.com", phone: "9810781664", gender: "Female", domain: "Civil", block: "A", coord: "Project Coordinator" },
    { id: 166, name: "Meena Verma", school: 8, dept_id: 3, course_id: 19, designation: "Professor", email: "meena.verma@cola.com", phone: "9252908286", gender: "Male", domain: "Psychology", block: "D", coord: "Lab Coordinator" },
    { id: 167, name: "Pooja Yadav", school: 8, dept_id: 3, course_id: 4, designation: "Professor", email: "pooja.yadav@cola.com", phone: "9078583636", gender: "Female", domain: "Law", block: "D", coord: "Exam Coordinator" },
    { id: 168, name: "Vikas Yadav", school: 6, dept_id: 14, course_id: 6, designation: "Lecturer", email: "vikas.yadav@cola.com", phone: "9901396779", gender: "Male", domain: "Psychology", block: "D", coord: "Project Coordinator" },
    { id: 169, name: "Meena Singh", school: 5, dept_id: 10, course_id: 4, designation: "Lecturer", email: "meena.singh@cola.com", phone: "9488211189", gender: "Female", domain: "Commerce", block: "A", coord: "Student Welfare" },
    { id: 170, name: "Vikas Arora", school: 5, dept_id: 13, course_id: 4, designation: "Professor", email: "vikas.arora@cola.com", phone: "9997133821", gender: "Male", domain: "Business", block: "C", coord: "Academic Coordinator" },
    { id: 171, name: "Neha Arora", school: 2, dept_id: 1, course_id: 11, designation: "Assistant Professor", email: "neha.arora@cola.com", phone: "9516217548", gender: "Female", domain: "Civil", block: "B", coord: "Student Welfare" },
    { id: 172, name: "Meena Agarwal", school: 2, dept_id: 6, course_id: 6, designation: "Professor", email: "meena.agarwal@cola.com", phone: "9838480685", gender: "Male", domain: "Psychology", block: "B", coord: "Exam Coordinator" },
    { id: 173, name: "Amit Singh", school: 2, dept_id: 20, course_id: 1, designation: "Lecturer", email: "amit.singh@cola.com", phone: "9960724085", gender: "Female", domain: "Civil", block: "A", coord: "Student Welfare" },
    { id: 174, name: "Anita Kapoor", school: 8, dept_id: 12, course_id: 2, designation: "Assistant Professor", email: "anita.kapoor@cola.com", phone: "9237749055", gender: "Male", domain: "Commerce", block: "A", coord: "Student Welfare" },
    { id: 175, name: "Arjun Singh", school: 8, dept_id: 17, course_id: 13, designation: "Lecturer", email: "arjun.singh@cola.com", phone: "9313847026", gender: "Female", domain: "Psychology", block: "C", coord: "Student Welfare" },
    { id: 176, name: "Deepak Arora", school: 4, dept_id: 12, course_id: 10, designation: "Lecturer", email: "deepak.arora@cola.com", phone: "9037146652", gender: "Female", domain: "Commerce", block: "B", coord: "Exam Coordinator" },
    { id: 177, name: "Vikas Agarwal", school: 8, dept_id: 19, course_id: 1, designation: "Lecturer", email: "vikas.agarwal@cola.com", phone: "9289805654", gender: "Female", domain: "Business", block: "A", coord: "Lab Coordinator" },
    { id: 178, name: "Arjun Mehta", school: 8, dept_id: 2, course_id: 12, designation: "Lecturer", email: "arjun.mehta@cola.com", phone: "9283225209", gender: "Male", domain: "Law", block: "D", coord: "Academic Coordinator" },
    { id: 179, name: "Anita Sharma", school: 4, dept_id: 30, course_id: 5, designation: "Associate Professor", email: "anita.sharma@cola.com", phone: "9570352966", gender: "Female", domain: "IT", block: "B", coord: "Student Welfare" },
    { id: 180, name: "Deepak Sharma", school: 6, dept_id: 8, course_id: 20, designation: "Professor", email: "deepak.sharma@cola.com", phone: "9280412950", gender: "Female", domain: "Law", block: "C", coord: "Exam Coordinator" },
    { id: 181, name: "Deepak Gupta", school: 5, dept_id: 9, course_id: 15, designation: "Associate Professor", email: "deepak.gupta@cola.com", phone: "9997343673", gender: "Male", domain: "Mechanical", block: "B", coord: "Project Coordinator" },
    { id: 182, name: "Deepak Gupta", school: 6, dept_id: 3, course_id: 15, designation: "Lecturer", email: "deepak.gupta@cola.com", phone: "9712612143", gender: "Male", domain: "Law", block: "C", coord: "Project Coordinator" },
    { id: 183, name: "Vikas Gupta", school: 1, dept_id: 27, course_id: 1, designation: "Professor", email: "vikas.gupta@cola.com", phone: "9049830069", gender: "Male", domain: "Mechanical", block: "C", coord: "Exam Coordinator" },
    { id: 184, name: "Suresh Bansal", school: 8, dept_id: 22, course_id: 8, designation: "Lecturer", email: "suresh.bansal@cola.com", phone: "9766560521", gender: "Male", domain: "Psychology", block: "A", coord: "Academic Coordinator" },
    { id: 185, name: "Deepak Singh", school: 6, dept_id: 1, course_id: 6, designation: "Lecturer", email: "deepak.singh@cola.com", phone: "9336441143", gender: "Male", domain: "Mechanical", block: "C", coord: "Project Coordinator" },
    { id: 186, name: "Meena Gupta", school: 5, dept_id: 25, course_id: 10, designation: "Professor", email: "meena.gupta@cola.com", phone: "9951493519", gender: "Male", domain: "Civil", block: "B", coord: "Project Coordinator" },
    { id: 187, name: "Sneha Arora", school: 6, dept_id: 21, course_id: 4, designation: "Assistant Professor", email: "sneha.arora@cola.com", phone: "9827317237", gender: "Male", domain: "Mechanical", block: "A", coord: "Exam Coordinator" },
    { id: 188, name: "Sneha Singh", school: 3, dept_id: 8, course_id: 9, designation: "Professor", email: "sneha.singh@cola.com", phone: "9404156806", gender: "Male", domain: "Computer Science", block: "B", coord: "Project Coordinator" },
    { id: 189, name: "Rohit Gupta", school: 3, dept_id: 13, course_id: 9, designation: "Lecturer", email: "rohit.gupta@cola.com", phone: "9767855607", gender: "Male", domain: "Computer Science", block: "C", coord: "Student Welfare" },
    { id: 190, name: "Riya Arora", school: 3, dept_id: 24, course_id: 3, designation: "Lecturer", email: "riya.arora@cola.com", phone: "9123545560", gender: "Female", domain: "Business", block: "B", coord: "Exam Coordinator" },
    { id: 191, name: "Rohit Gupta", school: 1, dept_id: 26, course_id: 15, designation: "Assistant Professor", email: "rohit.gupta@cola.com", phone: "9951676372", gender: "Female", domain: "Psychology", block: "D", coord: "Student Welfare" },
    { id: 192, name: "Rahul Yadav", school: 5, dept_id: 5, course_id: 15, designation: "Professor", email: "rahul.yadav@cola.com", phone: "9558420981", gender: "Female", domain: "IT", block: "B", coord: "Project Coordinator" },
    { id: 193, name: "Arjun Mehta", school: 4, dept_id: 27, course_id: 13, designation: "Assistant Professor", email: "arjun.mehta@cola.com", phone: "9669283184", gender: "Male", domain: "Mechanical", block: "C", coord: "Project Coordinator" },
    { id: 194, name: "Vikas Singh", school: 4, dept_id: 30, course_id: 3, designation: "Assistant Professor", email: "vikas.singh@cola.com", phone: "9086457260", gender: "Female", domain: "Psychology", block: "B", coord: "Lab Coordinator" },
    { id: 195, name: "Amit Agarwal", school: 6, dept_id: 15, course_id: 2, designation: "Assistant Professor", email: "amit.agarwal@cola.com", phone: "9016262728", gender: "Male", domain: "Law", block: "A", coord: "Academic Coordinator" },
    { id: 196, name: "Suresh Mehta", school: 6, dept_id: 22, course_id: 11, designation: "Lecturer", email: "suresh.mehta@cola.com", phone: "9537857937", gender: "Male", domain: "Mechanical", block: "B", coord: "Lab Coordinator" },
    { id: 197, name: "Neha Arora", school: 1, dept_id: 3, course_id: 7, designation: "Professor", email: "neha.arora@cola.com", phone: "9225042075", gender: "Female", domain: "Business", block: "B", coord: "Exam Coordinator" },
    { id: 198, name: "Deepak Gupta", school: 7, dept_id: 24, course_id: 9, designation: "Lecturer", email: "deepak.gupta@cola.com", phone: "9045621303", gender: "Female", domain: "Law", block: "B", coord: "Exam Coordinator" },
    { id: 199, name: "Vikas Kapoor", school: 6, dept_id: 15, course_id: 16, designation: "Lecturer", email: "vikas.kapoor@cola.com", phone: "9217313710", gender: "Female", domain: "Commerce", block: "A", coord: "Lab Coordinator" },
    { id: 200, name: "Vikas Gupta", school: 1, dept_id: 4, course_id: 13, designation: "Professor", email: "vikas.gupta@cola.com", phone: "9253175879", gender: "Male", domain: "Computer Science", block: "B", coord: "Academic Coordinator" },
];

// ─── Constants ─────────────────────────────────────────────────────────────────
const DOMAINS = [...new Set(TEACHERS.map(t => t.domain))].sort();
const DESIGNATIONS = [...new Set(TEACHERS.map(t => t.designation))].sort();
const BLOCKS = [...new Set(TEACHERS.map(t => t.block))].sort();
const COORDS = [...new Set(TEACHERS.map(t => t.coord))].sort();

const DOMAIN_COLORS = {
    "Computer Science": "#4f46e5",
    "Civil": "#65a30d",
    "Mechanical": "#d97706",
    "Commerce": "#0891b2",
    "IT": "#7c3aed",
    "Business": "#db2777",
    "Law": "#ea580c",
    "Psychology": "#0f766e",
};

const DESIG_ORDER = { "Professor": 5, "Associate Professor": 4, "Assistant Professor": 3, "Lecturer": 2 };

// ─── Context for AI ─────────────────────────────────────────────────────────────
function buildContext() {
    const byDomain = DOMAINS.map(d => {
        const g = TEACHERS.filter(t => t.domain === d);
        const male = g.filter(t => t.gender === "Male").length;
        const female = g.filter(t => t.gender === "Female").length;
        return `  ${d}: ${g.length} teachers (M:${male} F:${female})`;
    }).join("\n");
    const byDesig = DESIGNATIONS.map(d => {
        const g = TEACHERS.filter(t => t.designation === d);
        return `  ${d}: ${g.length}`;
    }).join("\n");
    const sample = TEACHERS.slice(0, 40).map(t =>
        `  ${t.name} | ${t.domain} | ${t.designation} | Block:${t.block} | School:${t.school} | ${t.coord} | ${t.gender} | ${t.email} | ${t.phone}`
    ).join("\n");
    return `You are an AI assistant for COLA College Admin Dashboard. Answer questions about the 200 real teacher records.

TOTAL: ${TEACHERS.length} teachers | Male: ${TEACHERS.filter(t => t.gender === "Male").length} | Female: ${TEACHERS.filter(t => t.gender === "Female").length}

DOMAINS:\n${byDomain}

DESIGNATIONS:\n${byDesig}

BLOCKS: A(${TEACHERS.filter(t => t.block === "A").length}) B(${TEACHERS.filter(t => t.block === "B").length}) C(${TEACHERS.filter(t => t.block === "C").length}) D(${TEACHERS.filter(t => t.block === "D").length})

SCHOOLS (1-8): ${[1, 2, 3, 4, 5, 6, 7, 8].map(s => `S${s}:${TEACHERS.filter(t => t.school === s).length}`).join(" ")}

COORDINATORSHIPS: ${COORDS.map(c => `${c}(${TEACHERS.filter(t => t.coord === c).length})`).join(", ")}

SAMPLE (40 of 200):\n${sample}

Answer concisely and accurately. For stats or comparisons, use the data above.`;
}
const DATA_CONTEXT = buildContext();

// ─── Small components ──────────────────────────────────────────────────────────
function Avatar({ name, domain, size = 34 }) {
    const bg = DOMAIN_COLORS[domain] || "#6b7280";
    const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
    return (
        <div style={{
            width: size, height: size, borderRadius: "50%",
            background: bg + "22", border: `1.5px solid ${bg}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: bg, fontSize: size * 0.34, fontWeight: 700, flexShrink: 0,
        }}>{initials}</div>
    );
}

function DesigBadge({ d }) {
    const map = {
        "Professor": { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
        "Associate Professor": { bg: "#ede9fe", color: "#5b21b6", border: "#ddd6fe" },
        "Assistant Professor": { bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe" },
        "Lecturer": { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0" },
    };
    const s = map[d] || { bg: "#f3f4f6", color: "#374151", border: "#e5e7eb" };
    return (
        <span style={{
            fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 12,
            background: s.bg, color: s.color, border: `1px solid ${s.border}`,
            whiteSpace: "nowrap",
        }}>{d}</span>
    );
}

function StatCard({ icon, label, value, sub, color }) {
    return (
        <div style={{
            background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
            padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <div style={{ color }}>{icon}</div>
                <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>{label}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{value}</div>
            {sub && <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{sub}</div>}
        </div>
    );
}

function DomainBar({ domain, count, max, male, female }) {
    const color = DOMAIN_COLORS[domain] || "#6b7280";
    return (
        <div style={{ marginBottom: 9 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                <span style={{ color: "#374151", fontWeight: 500 }}>{domain}</span>
                <span style={{ color: "#6b7280", fontSize: 11 }}>{count} · M:{male} F:{female}</span>
            </div>
            <div style={{ height: 6, background: "#f3f4f6", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(count / max) * 100}%`, background: color, borderRadius: 4 }} />
            </div>
        </div>
    );
}

// ─── Detail Drawer ──────────────────────────────────────────────────────────────
function TeacherDrawer({ teacher, onClose }) {
    const color = DOMAIN_COLORS[teacher.domain] || "#6b7280";
    return (
        <div style={{
            position: "fixed", top: 0, right: 0, width: 360, height: "100vh",
            background: "#fff", borderLeft: "1px solid #e5e7eb",
            boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
            display: "flex", flexDirection: "column", zIndex: 1001,
        }}>
            <div style={{ padding: "20px", background: color + "11", borderBottom: "1px solid " + color + "33", flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Avatar name={teacher.name} domain={teacher.domain} size={52} />
                    <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }}>
                        <X size={18} />
                    </button>
                </div>
                <div style={{ marginTop: 12, fontSize: 18, fontWeight: 700, color: "#111827" }}>{teacher.name}</div>
                <div style={{ marginTop: 4 }}><DesigBadge d={teacher.designation} /></div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
                {[
                    ["Domain", teacher.domain, <BookOpen size={14} />],
                    ["School ID", `School ${teacher.school}`, <Building2 size={14} />],
                    ["Block", `Block ${teacher.block}`, <Layers size={14} />],
                    ["Gender", teacher.gender, <Users size={14} />],
                    ["Coordinatorship", teacher.coord, <UserCheck size={14} />],
                    ["Email", teacher.email, <Mail size={14} />],
                    ["Phone", teacher.phone, <Phone size={14} />],
                ].map(([label, val, icon]) => (
                    <div key={label} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                        <div style={{ color, marginTop: 1 }}>{icon}</div>
                        <div>
                            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>{label}</div>
                            <div style={{ fontSize: 13, color: "#111827", fontWeight: 500 }}>{val}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── AI Chat Panel ─────────────────────────────────────────────────────────────
function ChatPanel({ onClose }) {
    const [messages, setMessages] = useState([
        { role: "assistant", text: "Hi! Ask me anything about COLA teachers — domains, designations, blocks, coordinatorships, gender distribution, and more." },
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
                { role: "assistant", content: "Understood. I have COLA's 200 teacher records. Ask me anything." },
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
        } finally { setLoading(false); }
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
                        <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>COLA AI Assistant</div>
                        <div style={{ color: "#9ca3af", fontSize: 11 }}>Ask about your 200 teachers</div>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }}>
                    <X size={18} />
                </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 4px", display: "flex", flexDirection: "column", gap: 10 }}>
                {messages.map((m, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                        <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, background: m.role === "assistant" ? "#4f46e5" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                            {[0, 1, 2].map(j => <div key={j} style={{ width: 7, height: 7, borderRadius: "50%", background: "#9ca3af", animation: "bounce 1.2s infinite", animationDelay: `${j * 0.2}s` }} />)}
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
            <div style={{ padding: "10px 12px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 8, alignItems: "center" }}>
                <input
                    value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                    placeholder="How many CS teachers in Block A?"
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
            <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
        </div>
    );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────────
const PAGE_SIZE = 12;

export default function COLADashboard() {
    const [search, setSearch] = useState("");
    const [domainFilter, setDomainFilter] = useState("All");
    const [desigFilter, setDesigFilter] = useState("All");
    const [blockFilter, setBlockFilter] = useState("All");
    const [coordFilter, setCoordFilter] = useState("All");
    const [genderFilter, setGenderFilter] = useState("All");
    const [sortBy, setSortBy] = useState("name");
    const [page, setPage] = useState(1);
    const [chatOpen, setChatOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const filtered = useMemo(() => {
        let arr = TEACHERS.filter(t => {
            if (domainFilter !== "All" && t.domain !== domainFilter) return false;
            if (desigFilter !== "All" && t.designation !== desigFilter) return false;
            if (blockFilter !== "All" && t.block !== blockFilter) return false;
            if (coordFilter !== "All" && t.coord !== coordFilter) return false;
            if (genderFilter !== "All" && t.gender !== genderFilter) return false;
            if (search) {
                const q = search.toLowerCase();
                if (!`${t.name} ${t.email} ${t.phone} ${t.domain} ${t.designation} ${t.coord}`.toLowerCase().includes(q)) return false;
            }
            return true;
        });
        arr = [...arr].sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (sortBy === "domain") return a.domain.localeCompare(b.domain);
            if (sortBy === "desig_high") return (DESIG_ORDER[b.designation] || 0) - (DESIG_ORDER[a.designation] || 0);
            if (sortBy === "desig_low") return (DESIG_ORDER[a.designation] || 0) - (DESIG_ORDER[b.designation] || 0);
            if (sortBy === "school") return a.school - b.school;
            return 0;
        });
        return arr;
    }, [search, domainFilter, desigFilter, blockFilter, coordFilter, genderFilter, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const curPage = Math.min(page, totalPages);
    const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);

    const domainStats = useMemo(() => DOMAINS.map(d => ({
        domain: d,
        count: TEACHERS.filter(t => t.domain === d).length,
        male: TEACHERS.filter(t => t.domain === d && t.gender === "Male").length,
        female: TEACHERS.filter(t => t.domain === d && t.gender === "Female").length,
    })), []);
    const maxCount = Math.max(...domainStats.map(d => d.count));

    const male = TEACHERS.filter(t => t.gender === "Male").length;
    const female = TEACHERS.filter(t => t.gender === "Female").length;
    const professors = TEACHERS.filter(t => t.designation === "Professor").length;

    function resetFilters() {
        setSearch(""); setDomainFilter("All"); setDesigFilter("All");
        setBlockFilter("All"); setCoordFilter("All"); setGenderFilter("All");
        setSortBy("name"); setPage(1);
    }
    const hasFilters = search || domainFilter !== "All" || desigFilter !== "All" || blockFilter !== "All" || coordFilter !== "All" || genderFilter !== "All";

    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
            <div style={{ maxWidth: 1140, margin: "0 auto", padding: "28px 18px" }}>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: "#111827", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <GraduationCap size={22} color="#34d399" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: 0 }}>COLA Teacher Records</h1>
                            <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>200 faculty · 8 domains · Schools 1–8</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setChatOpen(o => !o)}
                        style={{
                            display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
                            background: chatOpen ? "#111827" : "#4f46e5", color: "#fff",
                            border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(79,70,229,0.3)",
                        }}
                    >
                        <MessageSquare size={16} />
                        {chatOpen ? "Close Assistant" : "Ask AI"}
                    </button>
                </div>

                {/* Stat Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
                    <StatCard icon={<Users size={18} />} label="Total Teachers" value={200} sub="All 200 records" color="#4f46e5" />
                    <StatCard icon={<UserCheck size={18} />} label="Male Faculty" value={male} sub={`${Math.round(male / 2)}% of total`} color="#2563eb" />
                    <StatCard icon={<UserCheck size={18} />} label="Female Faculty" value={female} sub={`${Math.round(female / 2)}% of total`} color="#db2777" />
                    <StatCard icon={<GraduationCap size={18} />} label="Professors" value={professors} sub="Full professors" color="#d97706" />
                </div>

                {/* Domain bars */}
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "18px 20px", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 14 }}>Domain Distribution (M / F breakdown)</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 36px" }}>
                        {domainStats.map(({ domain, count, male, female }) => (
                            <DomainBar key={domain} domain={domain} count={count} max={maxCount} male={male} female={female} />
                        ))}
                    </div>
                </div>

                {/* Filters Row */}
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px", marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <div style={{ position: "relative", flex: "1 1 200px" }}>
                            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                            <input
                                value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                                placeholder="Search name, email, phone…"
                                style={{ width: "100%", paddingLeft: 30, paddingRight: 10, paddingTop: 8, paddingBottom: 8, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12, color: "#111827", outline: "none", background: "#f9fafb", boxSizing: "border-box" }}
                            />
                        </div>
                        {[
                            { val: domainFilter, set: setDomainFilter, opts: ["All", ...DOMAINS], label: "Domain" },
                            { val: desigFilter, set: setDesigFilter, opts: ["All", ...DESIGNATIONS], label: "Designation" },
                            { val: blockFilter, set: setBlockFilter, opts: ["All", ...BLOCKS], label: "Block" },
                            { val: coordFilter, set: setCoordFilter, opts: ["All", ...COORDS], label: "Role" },
                            { val: genderFilter, set: setGenderFilter, opts: ["All", "Male", "Female"], label: "Gender" },
                        ].map(f => (
                            <select key={f.label} value={f.val} onChange={e => { f.set(e.target.value); setPage(1); }}
                                style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12, color: "#374151", background: "#f9fafb", cursor: "pointer" }}>
                                <option value="All">{f.label}: All</option>
                                {f.opts.filter(o => o !== "All").map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        ))}
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                            style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12, color: "#374151", background: "#f9fafb", cursor: "pointer" }}>
                            <option value="name">Sort: Name A-Z</option>
                            <option value="domain">Sort: Domain</option>
                            <option value="desig_high">Sort: Senior First</option>
                            <option value="desig_low">Sort: Junior First</option>
                            <option value="school">Sort: School</option>
                        </select>
                        {hasFilters && (
                            <button onClick={resetFilters} style={{
                                padding: "8px 12px", borderRadius: 8, border: "1px solid #fca5a5",
                                background: "#fff1f2", color: "#dc2626", fontSize: 12, fontWeight: 600,
                                cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
                            }}>
                                <X size={12} /> Clear
                            </button>
                        )}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
                        Showing <strong style={{ color: "#111827" }}>{filtered.length}</strong> of 200 teachers
                    </div>
                </div>

                {/* Table */}
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 14 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1.2fr 1.5fr 0.8fr 0.7fr 1.4fr 0.5fr", padding: "10px 16px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                        {["Teacher", "Domain", "Designation", "Block", "School", "Coordinatorship", ""].map((h, i) => (
                            <span key={i} style={{ fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
                        ))}
                    </div>

                    {paginated.length === 0 && (
                        <div style={{ textAlign: "center", padding: 40, color: "#9ca3af", fontSize: 13 }}>No records match your filters.</div>
                    )}

                    {paginated.map((t, i) => {
                        const color = DOMAIN_COLORS[t.domain] || "#6b7280";
                        return (
                            <div
                                key={t.id}
                                onClick={() => setSelected(t)}
                                style={{ display: "grid", gridTemplateColumns: "2.2fr 1.2fr 1.5fr 0.8fr 0.7fr 1.4fr 0.5fr", padding: "11px 16px", alignItems: "center", background: i % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #f3f4f6", cursor: "pointer", transition: "background 0.1s", borderLeft: `3px solid ${color}22` }}
                                onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafafa"}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                    <Avatar name={t.name} domain={t.domain} size={32} />
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{t.name}</div>
                                        <div style={{ fontSize: 10, color: "#9ca3af" }}>{t.email}</div>
                                    </div>
                                </div>
                                <span style={{ fontSize: 12, color, fontWeight: 600 }}>{t.domain}</span>
                                <DesigBadge d={t.designation} />
                                <span style={{
                                    fontSize: 12, fontWeight: 700, color: "#fff", background: ["#4f46e5", "#0891b2", "#d97706", "#65a30d"][["A", "B", "C", "D"].indexOf(t.block)],
                                    width: 24, height: 24, borderRadius: 6, display: "inline-flex", alignItems: "center", justifyContent: "center",
                                }}>{t.block}</span>
                                <span style={{ fontSize: 12, color: "#6b7280", textAlign: "center" }}>S{t.school}</span>
                                <span style={{ fontSize: 11, color: "#6b7280" }}>{t.coord}</span>
                                <span style={{ fontSize: 10, color: "#9ca3af", textAlign: "right" }}>→</span>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "#6b7280" }}>
                    <span>{filtered.length === 0 ? "0 records" : `${(curPage - 1) * PAGE_SIZE + 1}–${Math.min(curPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`}</span>
                    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={curPage <= 1}
                            style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: curPage <= 1 ? "default" : "pointer", opacity: curPage <= 1 ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ChevronLeft size={15} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(p => p === 1 || p === totalPages || Math.abs(p - curPage) <= 1)
                            .reduce((acc, p, idx, arr) => { if (idx > 0 && arr[idx - 1] !== p - 1) acc.push("…"); acc.push(p); return acc; }, [])
                            .map((p, idx) => p === "…"
                                ? <span key={`d${idx}`} style={{ color: "#9ca3af", padding: "0 2px" }}>…</span>
                                : <button key={p} onClick={() => setPage(p)} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #e5e7eb", background: curPage === p ? "#111827" : "#fff", color: curPage === p ? "#fff" : "#374151", cursor: "pointer", fontSize: 12, fontWeight: curPage === p ? 600 : 400 }}>{p}</button>
                            )}
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={curPage >= totalPages}
                            style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: curPage >= totalPages ? "default" : "pointer", opacity: curPage >= totalPages ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={15} />
                        </button>
                    </div>
                </div>
            </div>

            {selected && <TeacherDrawer teacher={selected} onClose={() => setSelected(null)} />}
            {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}

            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
        </div>
    );
}