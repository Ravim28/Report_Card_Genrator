import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Get the role from localStorage

  const handleLogout = () => {
    localStorage.removeItem('role'); // Clear role from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav>
      <ul>
        {/* Show different links based on the role */}
        {!role ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            {role === 'SuperAdmin' && (
              <li>
                <Link to="/superadmin-dashboard">Super Admin Dashboard</Link>
              </li>
            )}
            {role === 'Teacher' && (
              <li>
                <Link to="/teacher-dashboard">Teacher Dashboard</Link>
              </li>
            )}
            {role === 'Student' && (
              <li>
                <Link to="/student-dashboard">Student Dashboard</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
