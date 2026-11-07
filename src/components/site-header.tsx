import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { DesktopNavigation, MobileNavigation } from "./navigation";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="site-container grid min-h-20 grid-cols-[auto_1fr] items-center gap-x-4">
        <Link
          href="/"
          aria-label="CIVITA home"
          className="z-10 col-start-1 row-start-1 my-3 inline-flex items-center gap-2 self-start justify-self-start rounded-md text-primary"
        >
          <Image
            src={site.logo.src}
            alt={site.logo.alt}
            width={site.logo.width}
            height={site.logo.height}
            className="size-14"
            sizes="56px"
            preload
          />
          <span aria-hidden="true" className="text-lg font-bold tracking-[0.16em]">
            {site.name}
          </span>
        </Link>
        <DesktopNavigation />
        <MobileNavigation />
      </div>
    </header>
  );
}
