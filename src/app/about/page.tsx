import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/config/site";

const description =
  "CIVITA is an open, community-driven effort to support the calibration, validation, and benchmarking of computational models for concrete and concrete structures.";

export const metadata: Metadata = { title: "About", description };

export default function AboutPage() {
  return (
    <SectionHeading
      as="h1"
      title="About CIVITA"
      eyebrow={site.fullName}
      description={description}
    />
  );
}
