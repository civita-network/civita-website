import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="site-container">
        <div className="grid gap-4 py-5 sm:grid-cols-[2fr_1fr] sm:gap-8">
          <div>
            <p className="text-lg font-bold tracking-[0.16em] text-primary">
              {site.name}
            </p>
            <p className="mt-1 max-w-lg text-base leading-relaxed text-muted">
              An open scientific infrastructure supporting the calibration,
              validation, and benchmarking of concrete computational models.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-primary">Community</h2>
            <ul className="mt-1 space-y-1 text-sm text-primary">
              <li>
                <a
                  href={site.discussionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-6 items-center rounded-sm underline underline-offset-4 hover:decoration-2"
                >
                  Suggest an Improvement
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/civita-network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-6 items-center rounded-sm underline underline-offset-4 hover:decoration-2"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-border py-3 text-xs text-muted">
          <p>CIVITA Network</p>
          <p>Open Science · Reproducibility · Collaboration</p>
        </div>
      </div>
    </footer>
  );
}
