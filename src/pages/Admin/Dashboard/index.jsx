import { LuUsers, LuBookMarked, LuClock3, LuDollarSign, LuCheck, LuX } from "react-icons/lu";
import { PageHeader, StatCard, GlassCard, Badge, Avatar } from "@/components";

// NOTE: placeholder figures — wire to the Admin / Book / Rental services next.
const STATS = [
  {
    label: "Total Users",
    value: "1,204",
    icon: LuUsers,
    accent: "primary",
    trend: { value: "+8%", up: true },
  },
  {
    label: "Total Books",
    value: "3,891",
    icon: LuBookMarked,
    accent: "accent",
    trend: { value: "+3%", up: true },
  },
  { label: "Pending Review", value: "12", icon: LuClock3, accent: "warning" },
  {
    label: "Revenue (mo)",
    value: "$4.2k",
    icon: LuDollarSign,
    accent: "success",
    trend: { value: "+14%", up: true },
  },
];

const QUEUE = [
  { title: "Atomic Habits", author: "James Clear", by: "samira.k", cat: "Self-Help" },
  { title: "The Pragmatic Programmer", author: "Hunt & Thomas", by: "deniz.y", cat: "Tech" },
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", by: "amir.h", cat: "Fiction" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Admin Console"
        title="Overview"
        subtitle="Platform health, moderation queue and activity at a glance."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Moderation queue */}
        <GlassCard className="p-6 lg:col-span-2 animate-rise">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">Moderation queue</h3>
              <p className="text-sm text-muted">Books awaiting approval before they go live.</p>
            </div>
            <Badge tone="pending" dot>
              {QUEUE.length} pending
            </Badge>
          </div>

          <ul className="space-y-3">
            {QUEUE.map((b) => (
              <li
                key={b.title}
                className="glass-hover flex items-center gap-4 rounded-xl border border-white/8 p-3.5"
              >
                <div className="bg-aurora grid h-12 w-9 shrink-0 place-items-center rounded-md text-white">
                  <LuBookMarked className="text-sm" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{b.title}</p>
                  <p className="truncate text-xs text-faint">
                    {b.author} · uploaded by @{b.by}
                  </p>
                </div>
                <Badge tone="neutral" className="hidden sm:inline-flex">
                  {b.cat}
                </Badge>
                <div className="flex items-center gap-2">
                  <button
                    className="grid h-9 w-9 place-items-center rounded-lg bg-success/15 text-success transition-colors hover:bg-success/25"
                    title="Approve"
                  >
                    <LuCheck />
                  </button>
                  <button
                    className="grid h-9 w-9 place-items-center rounded-lg bg-danger/15 text-danger transition-colors hover:bg-danger/25"
                    title="Reject"
                  >
                    <LuX />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Recent signups */}
        <GlassCard className="p-6 animate-rise">
          <h3 className="font-display text-lg font-semibold text-ink">New members</h3>
          <p className="text-sm text-muted">Latest registrations.</p>
          <ul className="mt-5 space-y-4">
            {["Samira Khan", "Deniz Yılmaz", "Amir Hassan", "Lena Brandt"].map((n) => (
              <li key={n} className="flex items-center gap-3">
                <Avatar name={n} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{n}</p>
                  <p className="text-xs text-faint">joined today</p>
                </div>
                <Badge tone="user">user</Badge>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
