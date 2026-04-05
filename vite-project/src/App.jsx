import React from 'react'
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/ModernSignIn";
import SignUp from "./pages/ModernSignUp";
import Campusnavigator from "./pages/Campusnavigator";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Committees from './pages/Committees';
import ProblemTracker from './pages/Problemtracker';
import SuperAdminDashboard from './pages/TeacherDrawer'

import './App.css'
import AuthPopup from './pages/AuthPopup';
function App() {
  return (
    <><div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path ="/navigator" element={<Campusnavigator/>}/>
        <Route path ="/committees" element={<Committees/>}/>
        <Route path ="/problemtrackers" element={<ProblemTracker/>}/>
        <Route path ="/superadmindashboard" element={<SuperAdminDashboard/>}/>
        <Route path="/auth-popup" element={<AuthPopup />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
