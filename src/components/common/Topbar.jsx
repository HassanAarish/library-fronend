import { LuMenu, LuSearch, LuBell } from "react-icons/lu";
import { PORTAL_META } from "@/constants/navigation";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";

const Topbar = ({ onMenu, user, role }) => {
  const portal = PORTAL_META[role] || PORTAL_META.user;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 glass-strong px-4 py-3 sm:px-6">
      <button
        onClick={onMenu}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-muted hover:bg-white/5 hover:text-ink lg:hidden"
        aria-label="Open menu"
      >
        <LuMenu className="text-xl" />
      </button>

      <div className="hidden min-w-0 sm:block">
        <p className="truncate font-display text-sm font-semibold text-ink">
          {greeting}, {firstName}
        </p>
        <p className="text-xs text-faint">Welcome to your {portal.label}</p>
      </div>

      {/* Search */}
      <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
        <LuSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
        <input
          type="text"
          placeholder="Search the library…"
          className="w-full rounded-xl border border-white/8 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:ml-0">
        <Badge tone={role === "admin" ? "admin" : "accent"} dot className="hidden sm:inline-flex">
          {role}
        </Badge>

        <button
          className="relative grid h-10 w-10 place-items-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-ink"
          aria-label="Notifications"
        >
          <LuBell className="text-lg" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent-2 ring-2 ring-base-2" />
        </button>

        <Avatar name={user?.name} src={user?.profilePicture?.url} />
      </div>
    </header>
  );
};

export default Topbar;
