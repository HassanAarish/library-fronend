import { Routes, Route } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import HomeLayout from "@/layout/HomeLayout";
import { useAuthContext } from "@/context/AuthContext";
import { SplashScreen } from "@/components/index";

function AppRoutes() {
  const { isAuthenticated, splashLoading } = useAuthContext();

  if (splashLoading) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route exact path="/*" element={isAuthenticated ? <HomeLayout /> : <AuthLayout />} />
    </Routes>
  );
}

export default AppRoutes;
