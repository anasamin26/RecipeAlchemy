import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = (props) => {
  const { authenticated } = useAuth();

  return (
    <Route
      {...props}
      element={authenticated ? props.element : <Navigate to="/signin" replace />}
    />
  );
};

export default PrivateRoute;
