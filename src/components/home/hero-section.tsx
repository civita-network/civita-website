import { ButtonLink } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      aria-labelledby="civita-heading"
      className="grid items-center xl:grid-cols-[minmax(0,1fr)_minmax(0,0.45fr)] xl:gap-12"
    >
      <div>
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          Open scientific platform
        </p>
        <h1
          id="civita-heading"
          className="max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.08] font-bold tracking-tight text-balance text-primary"
        >
          Computational Modeling of Concrete, Connected.
        </h1>
        <p className="mt-5 max-w-[64ch] text-base leading-relaxed text-muted sm:text-lg">
          CIVITA is a community-driven platform for exploring experimental data,
          evaluating computational models, and sharing reproducible results.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
          <ButtonLink href="/explore" className="max-sm:px-3">
            Explore CIVITA
          </ButtonLink>
          <ButtonLink
            href="/contribute"
            variant="secondary"
            className="max-sm:px-3"
          >
            Contribute Data
          </ButtonLink>
        </div>
      </div>

      <svg
        aria-hidden="true"
        className="hidden w-full xl:block"
        viewBox="0 0 352 272"
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="350"
          height="270"
          rx="16"
          className="fill-lavender/55 stroke-border"
        />
        <path
          className="stroke-accent/15"
          strokeDasharray="3 5"
          d="M36 42h280M36 94h280M36 146h280M36 198h280M36 230h280M76 26v220M126 26v220M176 26v220M226 26v220M276 26v220"
        />
        <path
          className="stroke-accent/45"
          strokeLinejoin="round"
          d="m101 81 100 52m-75-65 100 52m-75-65 100 52m-150 0 100-52m-75 65 100-52m-75 65 100-52
             M76 114l100 52 100-52M76 134l100 52 100-52M76 154l100 52 100-52
             M101 107v80m25-67v80m25-67v80m50-80v80m25-93v80m25-93v80"
        />
        <path
          className="stroke-primary/65"
          strokeWidth="1.5"
          strokeLinejoin="round"
          d="m76 94 100-52 100 52-100 52-100-52v80l100 52 100-52V94m-100 52v80"
        />
        <g className="fill-accent stroke-lavender" strokeWidth="2">
          <circle cx="176" cy="42" r="4" />
          <circle cx="76" cy="94" r="4" />
          <circle cx="276" cy="94" r="4" />
          <circle cx="176" cy="146" r="5" />
          <circle cx="176" cy="226" r="4" />
        </g>
      </svg>
    </section>
  );
}
