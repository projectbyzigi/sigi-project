import Image from "next/image";
import { NAV_LINKS, CONTACT, FOOTER } from "@/lib/site-content";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg)]">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            <p className="display max-w-[22ch] text-2xl text-[var(--color-ink)]">
              {FOOTER.tagline}
            </p>
            <Image
              src="/brand/logo-final.png"
              alt="SIGI Bauunternehmen"
              width={280}
              height={180}
              className="mt-8 h-auto w-[220px]"
            />
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            <span className="eyebrow mb-1">Navigation</span>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline w-fit text-sm text-[var(--color-ink-soft)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-2 text-sm text-[var(--color-ink-soft)]">
            <span className="eyebrow mb-1">Kontakt</span>
            <span>{CONTACT.company}</span>
            <span>{CONTACT.address.line1}</span>
            <span>{CONTACT.address.line2}</span>
            <span>{CONTACT.address.line3}</span>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="link-underline mt-2 w-fit text-[var(--color-ink)]"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="link-underline w-fit text-[var(--color-ink)]"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {CONTACT.company} · NIF {CONTACT.nif}
          </span>
          <span>Kontakt und Impressum · {CONTACT.website}</span>
        </div>
      </div>
    </footer>
  );
}
