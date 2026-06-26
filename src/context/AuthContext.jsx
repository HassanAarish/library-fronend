import { createContext, useState, useContext, useEffect, useCallback } from "react";
import apis from "@/api/index";

// 1. Create the AuthContext (Keep it internal to this file to satisfy Fast Refresh)
const AuthContext = createContext();

const initialStates = {
  isAuthenticated: false,
  user: null,
  preferences: null,
  token: null,
  splashLoading: true,
};

// 2. Provide AuthContext to the app (Main component export)
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialStates);

  // Wrap fetchProfile in useCallback so it safe to include in dependency arrays
  const fetchProfile = useCallback(async (token) => {
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
        // Handle immediate logout cleanup
        localStorage.removeItem("token");
        setAuthState({ ...initialStates, splashLoading: false });
      }
    } catch (error) {
      console.error("🚀 ~ fetchProfile ~ error:", error);
      localStorage.removeItem("token");
      setAuthState({ ...initialStates, splashLoading: false });
    } finally {
      setAuthState((prev) => ({ ...prev, splashLoading: false }));
    }
  }, []);

  // Silently re-pull user + preferences (e.g. after a profile edit) WITHOUT
  // toggling splashLoading, so the app doesn't flash the splash screen.
  const refreshProfile = useCallback(async () => {
    try {
      const { data } = await apis.fetchProfile();
      if (data?.success) {
        setAuthState((prev) => ({
          ...prev,
          user: data?.data?.user,
          preferences: data?.data?.preferences,
        }));
      }
    } catch (error) {
      console.error("🚀 ~ refreshProfile ~ error:", error);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    fetchProfile(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ ...initialStates, splashLoading: false });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchProfile(token);
    } else {
      setAuthState((prev) => ({ ...prev, splashLoading: false }));
    }
  }, [fetchProfile]); // Added fetchProfile here safely because of useCallback

  // Context value
  const value = { ...authState, login, logout, refreshProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Custom Hook (Exported safely alongside the provider)
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
