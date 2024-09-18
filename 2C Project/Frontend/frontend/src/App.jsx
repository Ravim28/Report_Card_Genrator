import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Navbar /> {/* Include Navbar here */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Route for Super Admin */}
        <Route 
          path="/superadmin-dashboard" 
          element={
            <ProtectedRoute role="SuperAdmin">
              <SuperAdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Route for Teacher */}
        <Route 
          path="/teacher-dashboard" 
          element={
            <ProtectedRoute role="Teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Route for Student */}
        <Route 
          path="/student-dashboard" 
          element={
            <ProtectedRoute role="Student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
