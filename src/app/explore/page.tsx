import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

const description =
  "Explore experimental concrete datasets, review benchmark specifications, and compare computational results.";

export const metadata: Metadata = { title: "Explore", description };

export default function ExplorePage() {
  return <SectionHeading as="h1" title="Explore" description={description} />;
}
