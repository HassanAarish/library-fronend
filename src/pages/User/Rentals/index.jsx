import { LuLibrary } from "react-icons/lu";
import { PageHeader, EmptyState } from "@/components";

const Rentals = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="My Library"
        title="My Rentals"
        subtitle="Your active and past rentals, with expiry dates."
      />
      <EmptyState
        icon={LuLibrary}
        title="No rentals yet"
        description="Rented books (from the Rental model — active, expired, with Stripe payment status) will appear here as cards with a countdown to expiry."
      />
    </div>
  );
};

export default Rentals;
