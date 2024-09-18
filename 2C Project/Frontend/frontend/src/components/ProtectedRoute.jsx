import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const storedRole = localStorage.getItem('role'); // Retrieve the role from localStorage

  // Check if the user is logged in and has the correct role
  if (!storedRole || storedRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
