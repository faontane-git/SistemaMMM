import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from './auth';

const ProtectedRoute: React.FC = () => {
  const user = getUser(); // Obtiene el usuario desde sessionStorage

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
