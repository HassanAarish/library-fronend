import { LuCheck, LuX, LuBookMarked } from "react-icons/lu";
import { PageHeader, GlassCard, Badge } from "@/components";

// Mirrors the pending → approved/rejected workflow on the Book model.
const ROWS = [
  { title: "Atomic Habits", author: "James Clear", by: "samira.k", price: 7, status: "pending" },
  {
    title: "The Pragmatic Programmer",
    author: "Hunt & Thomas",
    by: "deniz.y",
    price: 12,
    status: "pending",
  },
  { title: "Dune", author: "Frank Herbert", by: "amir.h", price: 9, status: "approved" },
  { title: "Spam Title", author: "Unknown", by: "bot.user", price: 0, status: "rejected" },
];

const TABS = ["Pending", "Approved", "Rejected", "All"];

const AdminBooks = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Moderation"
        title="Book Requests"
        subtitle="Approve or reject community-uploaded books before they go live."
      />

      <div className="flex flex-wrap gap-2">
        {TABS.map((t, i) => (
          <button
            key={t}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              i === 0
                ? "bg-aurora text-white"
                : "border border-white/10 text-muted hover:bg-white/5 hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <GlassCard className="overflow-hidden p-0 animate-rise">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/8 text-xs uppercase tracking-wider text-faint">
                <th className="px-5 py-4 font-medium">Book</th>
                <th className="px-5 py-4 font-medium">Uploader</th>
                <th className="px-5 py-4 font-medium">Price</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr
                  key={r.title}
                  className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/3"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-aurora grid h-10 w-8 shrink-0 place-items-center rounded-md text-white">
                        <LuBookMarked className="text-xs" />
                      </span>
                      <div>
                        <p className="font-medium text-ink">{r.title}</p>
                        <p className="text-xs text-faint">{r.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted">@{r.by}</td>
                  <td className="px-5 py-4 text-ink">${r.price}</td>
                  <td className="px-5 py-4">
                    <Badge tone={r.status}>{r.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        disabled={r.status !== "pending"}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-success/15 text-success transition-colors hover:bg-success/25 disabled:opacity-30"
                        title="Approve"
                      >
                        <LuCheck />
                      </button>
                      <button
                        disabled={r.status !== "pending"}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-danger/15 text-danger transition-colors hover:bg-danger/25 disabled:opacity-30"
                        title="Reject"
                      >
                        <LuX />
                      </button>
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

export default AdminBooks;
