import Link from "next/link";
import { ApplicationCard } from "@/components/application-card";
import { HeroSection } from "@/components/home/hero-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { applications } from "@/config/applications";
import { site } from "@/config/site";

const resources = [
  {
    title: "Documentation",
    description:
      "Access user guides, data formats, submission procedures, and scientific standards.",
    href: "/documentation",
  },
  {
    title: "About CIVITA",
    description:
      "Learn about CIVITA’s objectives, scientific scope, and long-term vision.",
    href: "/about",
  },
  {
    title: "Community and Governance",
    description:
      "Learn about scientific contributions, collaboration, and governance principles.",
    href: "/about",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section
        aria-labelledby="applications-heading"
        className="mt-10 border-t border-border pt-8"
      >
        <SectionHeading
          id="applications-heading"
          eyebrow="Scientific applications"
          title="Explore and Contribute"
          description="Access CIVITA’s scientific applications to explore experimental data, compare computational results, and contribute new research datasets."
        />
        <div className="mt-6 grid gap-4 md:auto-rows-fr md:grid-cols-2 md:gap-5">
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="mission-heading"
        className="mt-12 rounded-xl border border-border bg-lavender/60 p-5 sm:mt-16 sm:p-8 lg:p-10"
      >
        <SectionHeading
          id="mission-heading"
          eyebrow="Scientific mission"
          title="Toward Reliable Predictive Modeling of Concrete"
        />
        <div className="mt-4 max-w-[76ch] space-y-3 leading-relaxed text-slate">
          <p>
            Reliable computational predictions depend on accessible experimental
            evidence, reproducible parameter identification, systematic
            validation, and transparent benchmarking.
          </p>
          <p>
            CIVITA stands for {site.fullName}. It brings these activities
            together to support reproducibility, independent assessment, and
            collaboration in computational modeling.
          </p>
        </div>
        <Link
          href="/about"
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-primary underline decoration-accent underline-offset-4 hover:decoration-2"
        >
          Learn More About CIVITA <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section aria-labelledby="resources-heading" className="mt-12 sm:mt-16">
        <SectionHeading id="resources-heading" title="Resources" />
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {resources.map(({ title, description, href }) => (
            <li key={title}>
              <Link
                href={href}
                className="group block h-full rounded-lg border border-border bg-surface p-4 hover:border-accent sm:p-5"
              >
                <h3 className="flex items-baseline justify-between gap-3 font-semibold text-primary">
                  <span className="group-hover:underline">{title}</span>
                  <span aria-hidden="true" className="text-accent">→</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
