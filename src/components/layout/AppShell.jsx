import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import AuroraBackground from "@/components/common/AuroraBackground";
import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";

/**
 * Authenticated layout chrome shared by both portals. The role-specific
 * navigation and routes are decided one level up (HomeLayout) and by the
 * Sidebar via the user's role — this component is role-agnostic.
 */
const AppShell = () => {
  const location = useLocation();
  const { user, logout } = useAuthContext();
  const role = user?.role === "admin" ? "admin" : "user";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(location.pathname);

  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setMobileOpen(false);
  }

  return (
    <div className="relative min-h-screen font-body text-ink">
      <AuroraBackground />

      <Sidebar
        role={role}
        user={user}
        onLogout={logout}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Content column — offset for the fixed sidebar on large screens */}
      <div className="relative z-10 flex min-h-screen flex-col lg:pl-72">
        <Topbar onMenu={() => setMobileOpen(true)} user={user} role={role} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
