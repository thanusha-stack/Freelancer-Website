import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the role from URL parameters
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      return "Email and password are required";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitted(true);
    setErrorMessage("");

    // Decide the dashboard route based on userRole
    const dashboardRoute = userRole === "freelancer" ? "/FLDashboard" : "/ClientDashboard";

    setTimeout(() => {
      navigate(dashboardRoute);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center bg-white lg:my-10 py-20">
      <div className="max-w-md w-full bg-white p-8 rounded-lg border-2 shadow-md">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Login</h1>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
          >
            {isSubmitted ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="border border-gray-300 my-3"></div>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/Signup" className="text-orange-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
