import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = localStorage.getItem('user');

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;