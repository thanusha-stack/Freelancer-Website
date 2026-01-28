import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/GetInfo" replace />;
  }

  return children;
};

export default ProtectedRoutes;
