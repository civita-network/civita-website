import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/config/site";

export default function HomePage() {
  return (
    <>
      <section aria-labelledby="civita-heading">
        <SectionHeading
          as="h1"
          id="civita-heading"
          eyebrow="Open scientific platform"
          title={site.name}
        />
        <p className="mt-4 max-w-2xl text-lg leading-snug font-medium text-primary sm:text-xl">
          {site.fullName}
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          CIVITA is a community-driven platform for calibrating, validating, and
          benchmarking computational models of concrete and concrete structures.
        </p>
      </section>

      <section
        aria-labelledby="applications-heading"
        className="mt-12 border-t border-border pt-8 sm:mt-16"
      >
        <SectionHeading
          id="applications-heading"
          title="Scientific applications"
          description="CIVITA’s applications will support dataset discovery, benchmarking, and contributions of experimental data and simulation results."
        />
      </section>
    </>
  );
}
