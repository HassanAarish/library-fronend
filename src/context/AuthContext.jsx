import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { POST } from "../API/Post";
import { baseURL } from "../constant/data";
import { toast } from "react-toastify";

// Create the AuthContext
export const AuthContext = createContext();

// Provide AuthContext to the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Initialize auth state from localStorage on first load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Login method (API call + state update)
  const login = async (formData) => {
    try {
      const response = await POST(`${baseURL}/auth/login`, formData);
      const { data, token } = response;

      if (response.success) {
        setIsAuthenticated(true);
        setUser(data);
        setToken(token);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data));

        navigate("/home");
        toast.success("Logged in successfully");
        return { success: true };
      }

      if (!response.success) {
        console.log("🚀 ~ login ~ response2:", response);
        return response;
      }
    } catch (error) {
      return error?.data?.error || "Failed to login. Please try again.";
    }
  };

  // Logout method (clear state and localStorage)
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  // Context value
  const value = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
