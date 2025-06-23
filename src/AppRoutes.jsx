import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import HomeLayout from "@/layout/HomeLayout";
import { useAuth } from "@/context/AuthContext";

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={isAuthenticated ? <HomeLayout /> : <AuthLayout />}
      />
      {/* <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/home/*" element={<HomeLayout />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} /> */}
    </Routes>
  );
}

export default AppRoutes;
