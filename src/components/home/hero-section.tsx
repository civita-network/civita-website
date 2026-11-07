import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/config/site";

export function HeroSection() {
  return (
    <section
      aria-labelledby="civita-heading"
      className="grid items-center gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.45fr)] xl:gap-12"
    >
      <div>
        <h1
          id="civita-heading"
          className="max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.08] font-bold tracking-tight text-balance text-primary"
        >
          From Model Development to Predictive Engineering
        </h1>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          {site.name}
        </h2>
        <p className="mt-1 max-w-[64ch] text-base leading-relaxed text-muted sm:text-lg">
          {site.fullName}
        </p>
        <div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
          <ButtonLink href="/explore" className="max-sm:px-3">
            Explore CIVITA
          </ButtonLink>
          <ButtonLink href="/contribute" className="max-sm:px-3">
            Contribute Data
          </ButtonLink>
        </div>
      </div>

      <Image
        src={site.logo.src}
        alt={site.logo.alt}
        width={site.logo.width}
        height={site.logo.height}
        className="mx-auto h-auto w-36 sm:w-44 xl:w-full xl:max-w-60"
        sizes="(min-width: 1280px) 240px, (min-width: 640px) 176px, 144px"
      />
    </section>
  );
}
