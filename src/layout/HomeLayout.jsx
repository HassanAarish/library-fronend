import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/index";
import { useAuthContext } from "@/context/AuthContext";
import { UserDashboard, Browse, Rentals } from "@/pages/User";
import { AdminDashboard, AdminBooks, AdminUsers, AdminCategories } from "@/pages/Admin";
import Profile from "@/pages/Profile";

/**
 * Authenticated entry point. A SINGLE signup feeds this layout; the user's
 * `role` decides which portal (route tree + nav) renders — this is the RBAC
 * boundary. AppShell is a layout route, so each page renders into its <Outlet/>.
 */
const HomeLayout = () => {
  const { user } = useAuthContext();
  const isAdmin = user?.role === "admin";

  return (
    <Routes>
      <Route element={<AppShell />}>
        {isAdmin ? (
          <>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/books" element={<AdminBooks />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/categories" element={<AdminCategories />} />
          </>
        ) : (
          <>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/rentals" element={<Rentals />} />
          </>
        )}
        {/* Shared across roles */}
        <Route path="/profile" element={<Profile />} />
        {/* Unknown route → portal home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default HomeLayout;
