// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import your authentication context

const PrivateRoute = ({ children }) => {
  const { authenticated } = useAuth(); // Use your authentication context to check if the user is authenticated
  console.log('Is authenticated:', authenticated);

  return authenticated ? (
    children
    ) : (
    <Navigate to="/signin" replace />
  );
};

export default PrivateRoute;
  