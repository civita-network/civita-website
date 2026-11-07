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

export const applications: readonly Application[] = [
  {
    id: "concrete-database-search",
    name: "Concrete Database Search",
    description: "Discover and explore experimental concrete datasets.",
    category: "Explore",
    externalUrl: null,
    status: "coming_soon",
    icon: "database",
  },
  {
    id: "benchmarking",
    name: "Benchmarking",
    description:
      "Explore benchmark specifications and compare computational results.",
    category: "Explore",
    externalUrl: null,
    status: "coming_soon",
    icon: "benchmark",
  },
  {
    id: "experimental-data-submission",
    name: "Experimental Data Submission",
    description:
      "Contribute documented experimental datasets to the CIVITA repository.",
    category: "Contribute",
    externalUrl: null,
    status: "coming_soon",
    icon: "experiment",
  },
  {
    id: "computational-results-submission",
    name: "Computational Results Submission",
    description:
      "Contribute simulation results with model, implementation, and provenance metadata.",
    category: "Contribute",
    externalUrl: null,
    status: "coming_soon",
    icon: "simulation",
  },
];
