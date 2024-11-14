import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../features/auth/authSlice';

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role === 'attack' && window.location.pathname.includes('/defense')) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
