import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

const description =
  "CIVITA will accept documented experimental datasets and simulation results with model, implementation, and provenance information.";

export const metadata: Metadata = { title: "Contribute", description };

export default function ContributePage() {
  return (
    <SectionHeading as="h1" title="Contribute" description={description} />
  );
}
