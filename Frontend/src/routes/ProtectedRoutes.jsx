import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { token, role, isProfileComplete } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/GetInfo" replace />;
  }
  if (!isProfileComplete) {
    if (role === "freelancer") return <Navigate to="/Certify" replace />;
    if (role === "client") return <Navigate to="/ClientProfile" replace />;
    return <Navigate to="/GetInfo" replace />;
  }

  return children;
};

export default ProtectedRoutes;
