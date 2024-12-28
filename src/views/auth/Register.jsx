import React, { useState } from "react";
import { FaGoogle, FaApple, FaEnvelope } from "react-icons/fa";
import { register } from "../../API/Post";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    authType: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call the registerUser API function
      const response = await register(formData);

      if (response.success) {
        toast.success(
          response?.message ||
            "Registration successful. Please verify your email."
        );
        navigate("/verify-code");
      }
    } catch (error) {
      setError(error?.message || "Registration failed. Please try again.");
      toast.error(error?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Choose icon based on authType
  const getAuthIcon = () => {
    switch (formData.authType) {
      case "":
        return null;
      case "google":
        return <FaGoogle className="text-2xl text-red-500" />;
      case "apple":
        return <FaApple className="text-2xl text-gray-800" />;
      default:
        return <FaEnvelope className="text-2xl text-blue-500" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col space-y-4"
        >
          <div className="w-full">
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="w-full">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="w-full relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full text-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <select
              name="authType"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Authentication</option>
              <option value="email">Email</option>
              <option value="google">Google</option>
              <option value="apple">Apple</option>
            </select>
            {getAuthIcon()}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-bold rounded-md transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
