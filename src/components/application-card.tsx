import {
  getApplicationUrl,
  type Application,
  type ApplicationIcon,
} from "@/config/applications";
import { AvailabilityIndicator } from "./ui/availability-indicator";
import { ButtonLink } from "./ui/button";

const iconPaths: Record<ApplicationIcon, string> = {
  database:
    "M20 5c0 1.7-3.6 3-8 3S4 6.7 4 5s3.6-3 8-3 8 1.3 8 3Z M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  benchmark: "M4 4v16h16 M8 16v-4m4 4V8m4 8v-6m4 6V5",
  experiment: "M9 3h6 M10 3v7l-5 8a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-8V3 M7 15h10",
  simulation: "m12 2 9 5v10l-9 5-9-5V7l9-5Z M3 7l9 5 9-5 M12 12v10",
};

export function ApplicationCard({ application }: { application: Application }) {
  const url = getApplicationUrl(application);

  return (
    <article
      className={`flex h-full min-w-0 flex-col rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6 ${url ? "hover:border-accent" : ""}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-lg bg-lavender text-primary">
          <svg
            aria-hidden="true"
            className="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={iconPaths[application.icon]} />
          </svg>
        </span>
        <p className="text-xs font-semibold tracking-wide text-muted uppercase">
          {application.category}
        </p>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-primary">
        {application.name}
      </h3>
      <p className="mt-2 flex-1 leading-relaxed text-muted">
        {application.description}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
        <AvailabilityIndicator status={url ? "available" : "coming_soon"} />
        {url && (
          <ButtonLink
            href={url}
            variant="secondary"
            aria-label={`Open application: ${application.name}`}
          >
            Open application
          </ButtonLink>
        )}
      </div>
    </article>
  );
}
