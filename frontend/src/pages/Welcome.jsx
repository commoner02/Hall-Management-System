import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Welcome() {
  // Redirect to login if accessing welcome directly
  return <Navigate to="/login" replace />;
}