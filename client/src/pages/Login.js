import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      // SUCCESS
      if (response.data.success) {
        // Save JWT token
        localStorage.setItem("token", response.data.token);

        // Optional user data
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Navigate to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f2937]">
      <div className="bg-[#f5f5f5] w-[500px] p-10 rounded-sm shadow-md">
        <h1 className="text-4xl font-bold text-center mb-10">Login</h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label className="block text-[18px] mb-2 text-gray-700">
              <span className="text-red-500">*</span> Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 bg-gray-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="block text-[18px] mb-2 text-gray-700">
              <span className="text-red-500">*</span> Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 bg-gray-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <hr className="mb-8 border-gray-300" />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg transition duration-200"
          >
            Login
          </button>

          {/* Optional Register Link */}
          <p className="text-center mt-5 text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
