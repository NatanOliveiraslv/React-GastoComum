import React from 'react';
import { Navigate, Outlet  } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext' 
import Loading from '../components/layout/Loading';

export function PrivateRoute () {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
