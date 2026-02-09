import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { token, role, isProfileComplete } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/GetInfo" replace />;
  }

  // If authenticated but profile not complete, redirect to profile creation
  if (!isProfileComplete) {
    if (role === "freelancer") return <Navigate to="/Certify" replace />;
    if (role === "client") return <Navigate to="/ClientProfile" replace />;
    // Fallback if role is unknown (shouldn't happen)
    return <Navigate to="/GetInfo" replace />;
  }

  return children;
};

export default ProtectedRoutes;
