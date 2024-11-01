import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

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

  // Function to handle login (updates state and localStorage)
  const login = (userData, authToken) => {
    setIsAuthenticated(true);
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/home");
  };

  // Function to handle logout (clears state and localStorage)
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Check if redirected back from social login with token
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromRedirect = urlParams.get("token");
    const userFromRedirect = urlParams.get("user");

    if (tokenFromRedirect && userFromRedirect) {
      const userData = JSON.parse(decodeURIComponent(userFromRedirect));
      login(userData, tokenFromRedirect);
      navigate("/home");
    }
  }, [navigate]);

  const value = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
