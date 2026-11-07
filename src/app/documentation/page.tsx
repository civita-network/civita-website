import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

const description =
  "Find guidance on data formats, submission requirements, and benchmarking protocols here as the platform develops.";

export const metadata: Metadata = { title: "Documentation", description };

export default function DocumentationPage() {
  return (
    <SectionHeading as="h1" title="Documentation" description={description} />
  );
}
