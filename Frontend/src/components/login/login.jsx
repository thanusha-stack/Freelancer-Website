import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from "@react-oauth/google";
import { useSearchParams, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleFromURL = searchParams.get("role"); // "client" | "freelancer"

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: roleFromURL
  });
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Update form role when URL changes
  useEffect(() => {
    setForm(prev => ({ ...prev, role: roleFromURL }));
  }, [roleFromURL]);

  // Auto-redirect if token exists
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {
      if (roleFromURL && storedRole !== roleFromURL) {
        // Role mismatch → logout
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
      } else {
        // Existing user → go to dashboard
        if (storedRole === "freelancer") navigate("/FLDashboard", { replace: true });
        else if (storedRole === "client") navigate("/ClientDashboard", { replace: true });
      }
    }
  }, [roleFromURL, navigate]);

  // Register function
  const register = async () => {
    try {
      const res = await axios.post(`${API}/register`, form);
      alert(res.data.message || "Registered Successfully");

      // After registration → redirect to profile creation page
      if (form.role === "freelancer") navigate("/Certify", { replace: true });
      else if (form.role === "client") navigate("/ClientProfile", { replace: true });

      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // Login function
  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, {
        email: form.email,
        password: form.password
      });

      // Role mismatch protection
      if (roleFromURL && res.data.role !== roleFromURL) {
        alert(`You are registered as ${res.data.role}, not ${roleFromURL}`);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      setToken(res.data.token);

      // Check if user has completed profile
      if (res.data.isProfileComplete) {
        // Profile done → go to dashboard
        if (res.data.role === "freelancer") navigate("/FLDashboard", { replace: true });
        else if (res.data.role === "client") navigate("/ClientDashboard", { replace: true });
      } else {
        // New user → go to profile creation
        if (res.data.role === "freelancer") navigate("/Certify", { replace: true });
        else if (res.data.role === "client") navigate("/ClientProfile", { replace: true });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // Google login
  const googleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API}/google-login`, {
        token: credentialResponse.credential,
        role: roleFromURL
      });

      if (roleFromURL && res.data.role !== roleFromURL) {
        alert(`You are registered as ${res.data.role}, not ${roleFromURL}`);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      setToken(res.data.token);

      // Navigate depending on profile completion
      if (res.data.isProfileComplete) {
        if (res.data.role === "freelancer") navigate("/FLDashboard", { replace: true });
        else if (res.data.role === "client") navigate("/ClientDashboard", { replace: true });
      } else {
        if (res.data.role === "freelancer") navigate("/Certify", { replace: true });
        else if (res.data.role === "client") navigate("/ClientProfile", { replace: true });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Google login failed");
    }
  };

  // Logout (optional)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-600 via-orange-400 to-orange-300">
      <div className="w-[360px] bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          {isLogin ? "LOGIN" : "REGISTER"} ({roleFromURL})
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 mb-3 rounded bg-gray-200 focus:outline-none"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 mb-3 rounded bg-gray-200 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-200 focus:outline-none"
        />

        <button
          onClick={isLogin ? login : register}
          className="w-full py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700"
        >
          {isLogin ? "LOGIN" : "REGISTER"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-red-500 mt-4 cursor-pointer underline"
        >
          {isLogin ? "Not a member? Sign up now" : "Already Registered? Login here"}
        </p>

        <hr className="my-4" />
        <h6 className="text-sm mb-3">OR</h6>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={googleLogin}
            onError={() => alert("Google Login Failed")}
          />
        </div>

        {token && (
          <button
            onClick={logout}
            className="mt-4 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
