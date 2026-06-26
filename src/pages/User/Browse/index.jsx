import { LuBookOpen, LuSearch } from "react-icons/lu";
import { PageHeader, EmptyState, GlassCard } from "@/components";

const CATEGORIES = ["All", "Fiction", "Sci-Fi", "Mystery", "Romance", "History", "Self-Help"];

const Browse = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catalog"
        title="Browse Books"
        subtitle="Explore approved titles available to rent."
      />

      {/* Filter bar */}
      <GlassCard className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <LuSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            placeholder="Search by title or author…"
            className="w-full rounded-xl border border-white/8 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-ink outline-none placeholder:text-faint focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c, i) => (
            <button
              key={c}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                i === 0
                  ? "bg-aurora text-white"
                  : "border border-white/10 text-muted hover:bg-white/5 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </GlassCard>

      <EmptyState
        icon={LuBookOpen}
        title="Catalog coming online"
        description="This grid will list approved books from GET /book, with cover art, price and a rent action. The layout and filters are ready to wire."
      />
    </div>
  );
};

export default Browse;
