import { LuBan, LuCircleCheck, LuSearch } from "react-icons/lu";
import { PageHeader, GlassCard, Badge, Avatar } from "@/components";

// Reflects User model fields: role + isBlocked moderation.
const USERS = [
  { name: "Samira Khan", email: "samira@mail.com", role: "user", blocked: false },
  { name: "Deniz Yılmaz", email: "deniz@mail.com", role: "user", blocked: false },
  { name: "Aarish Hassan", email: "owner@mail.com", role: "admin", blocked: false },
  { name: "Bot User", email: "bot@spam.io", role: "user", blocked: true },
];

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="People"
        title="Users"
        subtitle="Manage members, roles and account access."
      />

      <GlassCard className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <LuSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            placeholder="Search members…"
            className="w-full rounded-xl border border-white/8 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-ink outline-none placeholder:text-faint focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden p-0 animate-rise">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/8 text-xs uppercase tracking-wider text-faint">
                <th className="px-5 py-4 font-medium">Member</th>
                <th className="px-5 py-4 font-medium">Role</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr
                  key={u.email}
                  className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/3"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <div>
                        <p className="font-medium text-ink">{u.name}</p>
                        <p className="text-xs text-faint">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={u.role === "admin" ? "admin" : "user"}>{u.role}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={u.blocked ? "blocked" : "active"} dot>
                      {u.blocked ? "blocked" : "active"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      {u.blocked ? (
                        <button className="inline-flex items-center gap-1.5 rounded-lg bg-success/15 px-3 py-1.5 text-xs font-medium text-success hover:bg-success/25">
                          <LuCircleCheck /> Unblock
                        </button>
                      ) : (
                        <button
                          disabled={u.role === "admin"}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-danger/15 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/25 disabled:opacity-30"
                        >
                          <LuBan /> Block
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default AdminUsers;
