import { LuBookOpen, LuLibrary, LuClock, LuStar, LuArrowRight } from "react-icons/lu";
import { useAuthContext } from "@/context/AuthContext";
import { GlassCard, StatCard, PageHeader, Badge } from "@/components";

// NOTE: placeholder figures — wire to the Book / Rental list endpoints next.
const STATS = [
  {
    label: "Active Rentals",
    value: "4",
    icon: LuLibrary,
    accent: "primary",
    trend: { value: "+2", up: true },
  },
  {
    label: "Books Read",
    value: "37",
    icon: LuBookOpen,
    accent: "accent",
    trend: { value: "+5", up: true },
  },
  { label: "Due Soon", value: "1", icon: LuClock, accent: "warning" },
  { label: "Your Rating", value: "4.8", icon: LuStar, accent: "pink" },
];

const READING = [
  { title: "The Midnight Library", author: "Matt Haig", progress: 72 },
  { title: "Project Hail Mary", author: "Andy Weir", progress: 41 },
  { title: "Dune", author: "Frank Herbert", progress: 18 },
];

const UserDashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Reader Portal"
        title={`Welcome back, ${user?.name?.split(" ")[0] || "Reader"}`}
        subtitle="Pick up where you left off or discover something new."
      />

      {/* Hero */}
      <GlassCard glow className="overflow-hidden p-0 animate-rise">
        <div className="relative flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="bg-aurora-soft absolute inset-0 -z-10" />
          <div className="max-w-lg">
            <Badge tone="accent" dot>
              New this week
            </Badge>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              52 fresh titles just landed in the catalog
            </h2>
            <p className="mt-2 text-sm text-muted">
              From sci-fi epics to quiet literary gems — your next favorite is waiting on the shelf.
            </p>
          </div>
          <button className="bg-aurora group inline-flex items-center gap-2 self-start rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform active:scale-[0.98] sm:self-center">
            Browse catalog
            <LuArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Continue reading */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">Continue reading</h3>
          <button className="text-sm font-medium text-primary hover:underline">View all</button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {READING.map((b) => (
            <GlassCard key={b.title} hover className="p-5 animate-rise">
              <div className="flex gap-4">
                <div className="bg-aurora flex h-20 w-14 shrink-0 items-center justify-center rounded-lg text-white shadow-md">
                  <LuBookOpen />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{b.title}</p>
                  <p className="text-sm text-faint">{b.author}</p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                    <div
                      className="bg-aurora h-full rounded-full"
                      style={{ width: `${b.progress}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-muted">{b.progress}% complete</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
