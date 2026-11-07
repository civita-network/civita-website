import type { Application } from "@/config/applications";

const labels = {
  available: "Available",
  coming_soon: "Coming soon",
} satisfies Record<Application["status"], string>;

export function AvailabilityIndicator({
  status,
}: {
  status: Application["status"];
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-primary">
      <span
        aria-hidden="true"
        className={
          status === "available"
            ? "size-2 rounded-full bg-primary"
            : "size-2 rounded-full border border-primary"
        }
      />
      {labels[status]}
    </span>
  );
}
