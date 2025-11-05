import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { Role } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactElement;
  role: Role;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    // Redirect them to the home page if not authorized
    return <Navigate to="/" replace />;
  }

  return children;
};
