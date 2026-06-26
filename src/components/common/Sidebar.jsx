import { NavLink } from "react-router-dom";
import { LuLogOut, LuX } from "react-icons/lu";
import { getNav, PORTAL_META } from "@/constants/navigation";
import Avatar from "@/components/ui/Avatar";

const NavItem = ({ item, onNavigate }) => {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
          isActive ? "bg-aurora-soft text-ink" : "text-muted hover:bg-white/5 hover:text-ink"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-aurora transition-opacity ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />
          <Icon
            className={`text-lg transition-colors ${
              isActive ? "text-primary" : "text-faint group-hover:text-ink"
            }`}
          />
          {item.label}
        </>
      )}
    </NavLink>
  );
};

const Sidebar = ({ role, user, onLogout, mobileOpen, onClose }) => {
  const nav = getNav(role);
  const portal = PORTAL_META[role] || PORTAL_META.user;
  const PortalIcon = portal.icon;

  return (
    <>
      {/* Mobile scrim */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col glass-strong p-4 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-1.5 py-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-aurora text-white shadow-lg">
              <PortalIcon className="text-lg" />
            </span>
            <div className="leading-tight">
              <p className="font-display font-bold">
                Library<span className="text-gradient">Hub</span>
              </p>
              <p className="text-[10px] font-medium uppercase tracking-widest text-faint">
                {portal.label}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-white/5 hover:text-ink lg:hidden"
            aria-label="Close menu"
          >
            <LuX />
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-6 flex-1 space-y-1 overflow-y-auto">
          <p className="mb-2 px-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
            Menu
          </p>
          {nav.map((item) => (
            <NavItem key={item.to} item={item} onNavigate={onClose} />
          ))}
        </nav>

        {/* User footer */}
        <div className="mt-4 rounded-2xl glass p-3">
          <div className="flex items-center gap-3">
            <Avatar name={user?.name} src={user?.profilePicture?.url} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{user?.name || "Guest"}</p>
              <p className="truncate text-xs text-faint">{user?.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-danger/15 hover:text-danger"
              aria-label="Log out"
              title="Log out"
            >
              <LuLogOut />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
