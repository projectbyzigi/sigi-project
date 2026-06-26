"use client";

import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "@/lib/site-content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "glass border-b border-[var(--color-line)] py-3"
            : "border-b border-transparent py-5"
        }`}
      >
        <div className="container-x flex items-center justify-between">
          {/* Spacer keeps nav right-aligned now that the logo is removed */}
          <span aria-hidden="true" />

          {/* "Start" link replaces the former logo for returning to top */}
          <a href="#start" aria-label="SIGI — Startseite" className="sr-only">
            Zur Startseite
          </a>

          {/* Desktop nav — revealed once the user starts scrolling */}
          <nav
            aria-hidden={!scrolled}
            className={`hidden items-center gap-8 transition-all duration-300 md:flex ${
              scrolled
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline text-sm font-medium tracking-wide text-[var(--color-ink)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              aria-hidden={!scrolled}
              tabIndex={scrolled ? 0 : -1}
              className={`btn btn-primary !py-2.5 !px-5 text-sm transition-all duration-300 ${
                scrolled
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              }`}
            >
              Projekt besprechen
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menü öffnen"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="h-px w-6 bg-[var(--color-ink)]" />
            <span className="h-px w-6 bg-[var(--color-ink)]" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
