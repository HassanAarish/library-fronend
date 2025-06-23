import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "@/constants/data";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import apis from "../api";

// Create the AuthContext
export const AuthContext = createContext();
const initialStates = {
  isAuthenticated: null,
  user: null,
  token: null,
};

// Provide AuthContext to the app
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialStates);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const { mutate: loginApi, isPending } = useMutation({
    mutationFn: (body) => apis.login(body),
    onError: (error) => {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    },
    onSuccess: ({ data }) => {
      const { token, user } = data;
      setAuthState({
        isAuthenticated: true,
        user,
        token,
      });
      localStorage.setItem("token", token);
      navigate("/home");
      toast.success("Logged in successfully");
    },
  });

  // Login method (API call + state update)
  const login = async (email, password) => {
    loginApi({ email, password, authType: "email" });
  };

  // Logout method (clear state and localStorage)
  const logout = () => {
    setAuthState(initialStates);
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  // Context value
  const value = {
    login,
    logout,
    ...authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
