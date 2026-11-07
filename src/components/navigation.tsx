"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { navigation } from "@/config/site";

function NavigationLinks({
  className,
  onNavigate,
}: {
  className: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {navigation.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            onClick={onNavigate}
            className="flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-lavender aria-[current=page]:bg-lavender"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function DesktopNavigation() {
  return (
    <nav
      aria-label="Main navigation"
      className="col-start-2 row-start-1 hidden justify-self-end md:block"
    >
      <NavigationLinks className="flex items-center gap-1 lg:gap-3" />
    </nav>
  );
}

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <nav
      aria-label="Main navigation"
      className="col-span-full col-start-1 row-start-1 md:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          setIsOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="flex min-h-20 items-center justify-end">
        <button
          ref={toggle}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-border px-3 text-sm font-semibold text-primary hover:bg-lavender"
        >
          <svg
            aria-hidden="true"
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d={isOpen ? "m6 6 12 12M18 6 6 18" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
          Menu
        </button>
      </div>
      <div
        id="mobile-navigation"
        hidden={!isOpen}
        className="border-t border-border py-3"
      >
        <NavigationLinks
          className="grid gap-1"
          onNavigate={() => {
            setIsOpen(false);
            toggle.current?.focus();
          }}
        />
      </div>
    </nav>
  );
}
