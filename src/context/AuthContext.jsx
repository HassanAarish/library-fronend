import React, { createContext, useState, useContext, useEffect } from "react";
import apis from "@/api/index";

// Create the AuthContext
export const AuthContext = createContext();
const initialStates = {
  isAuthenticated: false,
  user: null,
  preferences: null,
  token: null,
  splashLoading: true,
};

// Provide AuthContext to the app
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialStates);

  const fetchProfile = async (token) => {
    setAuthState((prev) => ({ ...prev, splashLoading: true }));
    try {
      const { data } = await apis.fetchProfile();
      if (data?.success) {
        setAuthState((prev) => ({
          ...prev,
          token: token,
          isAuthenticated: true,
          user: data?.data?.user,
          preferences: data?.data?.preferences,
        }));
      } else {
        logout();
      }
    } catch (error) {
      console.error("🚀 ~ fetchProfile ~ error:", error);
    } finally {
      setAuthState((prev) => ({ ...prev, splashLoading: false }));
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    // After setting token, we fetch the fresh profile
    fetchProfile(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ ...initialStates, splashLoading: false });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(token);
    } else {
      setAuthState((prev) => ({ ...prev, splashLoading: false }));
    }
  }, []);

  // Context value
  const value = { ...authState, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
