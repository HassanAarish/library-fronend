import {
  LuLayoutDashboard,
  LuBookOpen,
  LuLibrary,
  LuUser,
  LuBookMarked,
  LuUsers,
  LuTags,
  LuShieldCheck,
} from "react-icons/lu";

/**
 * Role-aware navigation. The AppShell renders the list that matches the
 * authenticated user's `role`, so the same single signup flow lands an
 * "admin" inside the admin portal and a "user" inside the reader portal.
 *
 * `end` marks index routes so the active-link match is exact.
 */
export const NAV_BY_ROLE = {
  user: [
    { to: "/", label: "Dashboard", icon: LuLayoutDashboard, end: true },
    { to: "/browse", label: "Browse Books", icon: LuBookOpen },
    { to: "/rentals", label: "My Rentals", icon: LuLibrary },
    { to: "/profile", label: "Profile", icon: LuUser },
  ],
  admin: [
    { to: "/", label: "Overview", icon: LuLayoutDashboard, end: true },
    { to: "/books", label: "Book Requests", icon: LuBookMarked },
    { to: "/users", label: "Users", icon: LuUsers },
    { to: "/categories", label: "Categories", icon: LuTags },
    { to: "/profile", label: "Profile", icon: LuUser },
  ],
};

export const PORTAL_META = {
  user: { label: "Reader", icon: LuBookOpen },
  admin: { label: "Admin Console", icon: LuShieldCheck },
};

export const getNav = (role) => NAV_BY_ROLE[role] || NAV_BY_ROLE.user;
