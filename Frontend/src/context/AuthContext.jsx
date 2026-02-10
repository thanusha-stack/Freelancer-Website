import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isProfileComplete, setIsProfileComplete] = useState(localStorage.getItem("isProfileComplete") === "true");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const syncProfileStatus = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });

          const serverProfileStatus = response.data.isProfileComplete;
          const serverRole = response.data.role;
          localStorage.setItem("isProfileComplete", serverProfileStatus);
          localStorage.setItem("role", serverRole);

          setToken(storedToken);
          setRole(serverRole);
          setIsProfileComplete(serverProfileStatus);
        } catch (error) {
          console.error("Failed to sync profile status:", error);
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("isProfileComplete");
            setToken(null);
            setRole(null);
            setIsProfileComplete(false);
          } else {
            const storedRole = localStorage.getItem("role");
            const storedProfileStatus = localStorage.getItem("isProfileComplete");
            setToken(storedToken);
            setRole(storedRole);
            setIsProfileComplete(storedProfileStatus === "true");
          }
        }
      }

      setLoading(false);
    };

    syncProfileStatus();
  }, []);

  const login = (newToken, newRole, newProfileStatus) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    localStorage.setItem("isProfileComplete", newProfileStatus);

    setToken(newToken);
    setRole(newRole);
    setIsProfileComplete(newProfileStatus);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isProfileComplete");

    setToken(null);
    setRole(null);
    setIsProfileComplete(false);
  };
  const refreshProfileStatus = async () => {
    if (token) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const serverProfileStatus = response.data.isProfileComplete;
        localStorage.setItem("isProfileComplete", serverProfileStatus);
        setIsProfileComplete(serverProfileStatus);
      } catch (error) {
        console.error("Failed to refresh profile status:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ token, role, isProfileComplete, login, logout, refreshProfileStatus, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
