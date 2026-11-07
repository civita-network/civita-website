export type ApplicationIcon =
  | "database"
  | "benchmark"
  | "experiment"
  | "simulation";

type ExternalUrl = `https://${string}` | `http://${string}`;

export type Application = {
  id: string;
  name: string;
  description: string;
  category: "Explore" | "Contribute";
  icon: ApplicationIcon;
} & (
  | { status: "available"; externalUrl: ExternalUrl }
  | { status: "coming_soon"; externalUrl: ExternalUrl | null }
);

export function getApplicationUrl(application: Application): string | null {
  if (application.status !== "available") return null;

  const url = URL.parse(application.externalUrl);
  return url?.protocol === "https:" || url?.protocol === "http:"
    ? url.href
    : null;
}

export const applications: readonly Application[] = [
  {
    id: "concrete-database-search",
    name: "Concrete Database Search",
    description:
      "Discover and explore experimental concrete datasets, including material properties, specimen configurations, experimental procedures, and measured responses.",
    category: "Explore",
    externalUrl: null,
    status: "coming_soon",
    icon: "database",
  },
  {
    id: "benchmarking",
    name: "Benchmarking",
    description:
      "Explore standardized benchmark specifications and compare computational results across models, implementations, and software versions.",
    category: "Explore",
    externalUrl: null,
    status: "coming_soon",
    icon: "benchmark",
  },
  {
    id: "experimental-data-submission",
    name: "Experimental Data Submission",
    description:
      "Contribute documented experimental datasets to CIVITA using standardized data structures and submission procedures.",
    category: "Contribute",
    externalUrl: null,
    status: "coming_soon",
    icon: "experiment",
  },
  {
    id: "computational-results-submission",
    name: "Computational Results Submission",
    description:
      "Submit computational results together with model definitions, parameter sets, simulation configurations, and provenance information.",
    category: "Contribute",
    externalUrl: null,
    status: "coming_soon",
    icon: "simulation",
  },
];
