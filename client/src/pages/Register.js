import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      // Password validation
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      // SUCCESS
      if (response.data.success) {
        alert(response.data.message);

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f2937]">
      <div className="bg-[#f5f5f5] w-[500px] p-10 rounded-sm shadow-md">
        <h1 className="text-4xl font-bold text-center mb-10">Register</h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-6">
            <label className="block text-[18px] mb-2 text-gray-700">
              <span className="text-red-500">*</span> Name
            </label>

            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 bg-gray-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-[18px] mb-2 text-gray-700">
              <span className="text-red-500">*</span> Email
            </label>

            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 bg-gray-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-[18px] mb-2 text-gray-700">
              <span className="text-red-500">*</span> Password
            </label>

            <input
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 bg-gray-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-8">
            <label className="block text-[18px] mb-2 text-gray-700">
              <span className="text-red-500">*</span> Confirm password
            </label>

            <input
              required
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 bg-gray-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <hr className="mb-8 border-gray-300" />

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
