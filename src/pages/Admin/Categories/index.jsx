import { LuTags, LuPlus } from "react-icons/lu";
import { PageHeader, GlassCard, Badge, PrimaryButton } from "@/components";

const CATEGORIES = [
  { name: "Fiction", books: 482, status: "approved" },
  { name: "Science Fiction", books: 213, status: "approved" },
  { name: "Self-Help", books: 156, status: "approved" },
  { name: "History", books: 98, status: "approved" },
  { name: "Graphic Novels", books: 0, status: "pending" },
  { name: "Poetry", books: 41, status: "approved" },
];

const AdminCategories = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Taxonomy"
        title="Categories"
        subtitle="Organize the catalog and moderate proposed categories."
        actions={<PrimaryButton label="New Category" variant="primary" icon={LuPlus} />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <GlassCard key={c.name} hover className="p-5 animate-rise">
            <div className="flex items-start justify-between">
              <span className="bg-aurora-soft grid h-11 w-11 place-items-center rounded-xl text-primary">
                <LuTags />
              </span>
              <Badge tone={c.status}>{c.status}</Badge>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{c.name}</h3>
            <p className="text-sm text-faint">{c.books} books</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
