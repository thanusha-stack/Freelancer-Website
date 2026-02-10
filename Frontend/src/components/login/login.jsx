import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GoogleLogin } from "@react-oauth/google";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const { login, logout, token } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleFromURL = searchParams.get("role"); // "client" | "freelancer"

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: roleFromURL || "freelancer" // Default to freelancer if not specified
  });

  // Update form role when URL changes
  useEffect(() => {
    if (roleFromURL) {
      setForm(prev => ({ ...prev, role: roleFromURL }));
    }
  }, [roleFromURL]);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      const storedRole = localStorage.getItem("role");
      if (storedRole === "freelancer") navigate("/FLDashboard", { replace: true });
      else if (storedRole === "client") navigate("/ClientDashboard", { replace: true });
    }
  }, [token, navigate]);


  // Register function
  const register = async () => {
    try {
      // Ensure role is set
      const payload = { ...form };
      if (!payload.role) payload.role = "freelancer";

      const res = await axios.post(`${API}/register`, payload);
      alert(res.data.message || "Registered Successfully");

      // Auto login after register? Or just switch to login
      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // Login function
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/login`, {
        email: form.email,
        password: form.password
      });

      // Role mismatch protection (optional, depends on requirement)
      // If user logs in as Client but came from Freelancer link, maybe warn?
      // For now, let's just log them in as whatever they are.

      login(res.data.token, res.data.role, res.data.isProfileComplete);

      // Check if user has completed profile
      if (res.data.isProfileComplete) {
        if (res.data.role === "freelancer") navigate("/FLDashboard", { replace: true });
        else if (res.data.role === "client") navigate("/ClientDashboard", { replace: true });
      } else {
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
        role: roleFromURL || "freelancer"
      });

      login(res.data.token, res.data.role, res.data.isProfileComplete);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-600 via-orange-400 to-orange-300">
      <div className="w-[360px] bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          {isLogin ? "LOGIN" : "REGISTER"} ({form.role})
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

        {/* Role Selection for Registration if not in URL */}
        {!isLogin && !roleFromURL && (
          <div className="mb-4 text-left">
            <label className="mr-4">
              <input
                type="radio"
                value="freelancer"
                checked={form.role === "freelancer"}
                onChange={() => setForm({ ...form, role: "freelancer" })}
              /> Freelancer
            </label>
            <label>
              <input
                type="radio"
                value="client"
                checked={form.role === "client"}
                onChange={() => setForm({ ...form, role: "client" })}
              /> Client
            </label>
          </div>
        )}


        <button
          onClick={isLogin ? handleLogin : register}
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
      </div>
    </div>
  );
}

export default Login;
