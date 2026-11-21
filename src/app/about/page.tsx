import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import workingGroup from "@/data/working-group.json";

const description =
  "Learn about the Grand Challenge, the CIVITA Network, and the international Working Group advancing predictive modeling for concrete and concrete structures.";

export const metadata: Metadata = { title: "About", description };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl">
      <header className="border-b border-border pb-7 sm:pb-9">
        <SectionHeading
          as="h1"
          title="From Model Development to Predictive Engineering"
        />
      </header>

      <section
        aria-labelledby="grand-challenge-heading"
        className="mt-8 sm:mt-10"
      >
        <SectionHeading
          id="grand-challenge-heading"
          title="The Grand Challenge"
        />
        <div className="mt-4 space-y-4 leading-relaxed">
          <p>
            The{" "}
            <strong>
              Grand Challenge on the Calibration, Validation, and Benchmarking of
              Concrete Computational Models
            </strong>{" "}
            is an international, community-driven initiative aimed at advancing
            the predictive capabilities and reliability of computational models
            for concrete and concrete structures.
          </p>
          <p>
            Over the past decades, significant progress has been achieved in the
            development of increasingly sophisticated computational models
            capable of representing complex material behaviors and structural
            responses. However, the systematic assessment of their predictive
            capabilities remains challenging. Experimental data are often
            scattered across publications, calibration procedures are not always
            sufficiently documented, and consistent validation and benchmarking
            protocols are still lacking.
          </p>
          <p>
            The Grand Challenge seeks to address these limitations by promoting
            the systematic collection and curation of experimental evidence,
            transparent parameter identification, independent model validation,
            and rigorous computational benchmarking. Its long-term objective is
            to establish a common scientific foundation for assessing model
            accuracy, identifying limitations, and defining ranges of
            applicability, thereby facilitating the transition from model
            development to predictive engineering.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="civita-network-heading"
        className="mt-10 border-t border-border pt-8 sm:mt-12 sm:pt-10"
      >
        <SectionHeading id="civita-network-heading" title="The CIVITA Network" />
        <div className="mt-4 space-y-4 leading-relaxed">
          <p>
            <strong>
              CIVITA (Computational Infrastructure for Validation, Integration,
              Testing, and Assessment of Concrete Computational Frameworks)
            </strong>{" "}
            is an open scientific platform being developed to provide the tools
            and infrastructure needed to pursue the objectives of the Grand
            Challenge.
          </p>
          <p>
            The CIVITA Network integrates experimental and computational
            databases with dedicated environments for parameter identification,
            validation, and benchmarking. These interconnected components are
            intended to support the systematic documentation, exchange,
            analysis, and comparison of experimental observations and
            computational predictions.
          </p>
          <p>
            CIVITA is designed as a modular, extensible, and community-driven
            infrastructure. Its components will be developed progressively, with
            an emphasis on scientific transparency, reproducibility,
            interoperability, and long-term accessibility of research data and
            computational results.
          </p>
          <p>
            Through CIVITA, the Grand Challenge aims to establish a sustainable
            framework in which contributions from researchers and practitioners
            can be systematically documented, independently assessed, and
            progressively expanded.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="working-group-heading"
        className="mt-10 border-t border-border pt-8 sm:mt-12 sm:pt-10"
      >
        <SectionHeading id="working-group-heading" title="The Working Group" />
        <div className="mt-4 space-y-4 leading-relaxed">
          <p>
            The Grand Challenge is supported by an international Working Group of
            researchers and professionals representing universities, research
            institutions, engineering consulting firms, and industry.
          </p>
          <p>
            The Working Group contributes to the scientific development of the
            initiative by identifying priorities, defining common procedures for
            experimental data collection and documentation, and supporting the
            development of approaches for calibration, validation, and
            benchmarking of concrete computational models.
          </p>
        </div>

        <div className="mt-8">
          <h3
            id="working-group-members-heading"
            className="text-xl font-semibold text-primary"
          >
            Working Group Members
          </h3>
          <table
            aria-labelledby="working-group-members-heading"
            role="table"
            className="mt-4 w-full border-y border-border bg-surface text-left text-sm max-sm:block"
          >
            <thead
              role="rowgroup"
              className="bg-lavender/60 text-primary max-sm:sr-only"
            >
              <tr role="row">
                <th
                  role="columnheader"
                  scope="col"
                  className="w-[30%] px-4 py-3 font-semibold"
                >
                  Member
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  className="w-[48%] px-4 py-3 font-semibold"
                >
                  Institution
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  className="px-4 py-3 font-semibold"
                >
                  Country
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup" className="divide-y divide-border max-sm:block">
              {workingGroup.members.map(({ name, institution, country }) => (
                <tr
                  key={name}
                  role="row"
                  className="max-sm:grid max-sm:gap-1 max-sm:px-4 max-sm:py-3"
                >
                  <th
                    role="rowheader"
                    scope="row"
                    className="font-semibold text-primary max-sm:text-base sm:px-4 sm:py-3"
                  >
                    {name}
                  </th>
                  <td
                    role="cell"
                    className="max-sm:grid max-sm:grid-cols-[5.25rem_minmax(0,1fr)] max-sm:gap-2 sm:px-4 sm:py-3"
                  >
                    <span aria-hidden="true" className="text-muted sm:hidden">
                      Institution
                    </span>
                    <span>{institution}</span>
                  </td>
                  <td
                    role="cell"
                    className="max-sm:grid max-sm:grid-cols-[5.25rem_minmax(0,1fr)] max-sm:gap-2 sm:px-4 sm:py-3"
                  >
                    <span aria-hidden="true" className="text-muted sm:hidden">
                      Country
                    </span>
                    <span>{country}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
