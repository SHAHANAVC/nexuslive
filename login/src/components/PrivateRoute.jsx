import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, roles }) => {
  const { auth } = useAuth();

  // ✅ Better loading state
  if (auth.loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // ✅ Debug logs to see what's happening
  console.log('PrivateRoute auth state:', { 
    hasToken: !!auth.token, 
    hasUser: !!auth.user, 
    userRole: auth.user?.role,
    requiredRoles: roles 
  });

  if (!auth.token || !auth.user) {
    console.log('Redirecting to login: No auth token or user');
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(auth.user.role)) {
    console.log('Redirecting: Role not allowed', auth.user.role);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;