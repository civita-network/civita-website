import Link from "next/link";
import { navigation, site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="site-container">
        <div className="grid gap-8 py-9 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label="CIVITA home"
              className="inline-flex rounded-sm text-lg font-bold tracking-[0.16em] text-primary"
            >
              {site.name}
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              Open scientific infrastructure for computational modeling of
              concrete and concrete structures.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold text-primary">Site navigation</h2>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm lg:max-w-52">
              {navigation.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-8 items-center rounded-sm text-muted hover:text-primary hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-sm font-semibold text-primary">Project resources</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <a
                  href={site.discussionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm hover:text-primary hover:underline"
                >
                  Suggest an Improvement
                </a>
              </li>
              <li>Contact information pending</li>
            </ul>
          </div>
        </div>
        <p className="border-t border-border py-4 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
