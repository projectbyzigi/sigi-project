"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/site-content";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    // Privacy-friendly: no third-party submission — compose a local email.
    const subject = encodeURIComponent(`Projektanfrage von ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="kontakt" className="section scroll-mt-24 bg-[var(--color-bg)]">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="eyebrow">Kontakt und Impressum</span>
          <h2 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]">
            Sprechen wir über Ihr Projekt.
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg font-light leading-relaxed text-[var(--color-ink-soft)]">
            Erzählen Sie uns von Ihrer Idee. Wir melden uns persönlich und
            unverbindlich bei Ihnen zurück.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Details */}
          <div className="flex flex-col gap-12">
            <div className="grid gap-10 sm:grid-cols-2">
              <ContactBlock label="Anschrift">
                {CONTACT.company}
                <br />
                {CONTACT.address.line1}
                <br />
                {CONTACT.address.line2}
                <br />
                {CONTACT.address.line3}
              </ContactBlock>

              <ContactBlock label="Direkt">
                <a href={`tel:${CONTACT.phoneHref}`} className="link-underline w-fit">
                  {CONTACT.phoneDisplay}
                </a>
                <br />
                <a href={`mailto:${CONTACT.email}`} className="link-underline w-fit">
                  {CONTACT.email}
                </a>
                <br />
                <a
                  href={CONTACT.websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline w-fit"
                >
                  {CONTACT.website}
                </a>
              </ContactBlock>

              <ContactBlock label="Inhaber">{CONTACT.owner}</ContactBlock>
              <ContactBlock label="NIF / CIF">{CONTACT.nif}</ContactBlock>
            </div>

            {/* Location card — intentional, no broken embed */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${CONTACT.address.line2}, ${CONTACT.address.line3}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_44px_-34px_rgba(28,26,22,0.4)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_28px_64px_-40px_rgba(28,26,22,0.5)]"
            >
              <span className="flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-[var(--color-sand)] text-[var(--color-gold)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="font-medium text-[var(--color-ink)]">
                  Son Servera, Mallorca
                </span>
                <span className="mt-0.5 text-sm text-[var(--color-ink-soft)]">
                  Standort in Google Maps öffnen
                  <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </span>
            </a>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[var(--color-line)] bg-white p-8 shadow-[0_30px_80px_-50px_rgba(28,26,22,0.55)] sm:p-10"
          >
            <div className="grid gap-6">
              <Field label="Name" name="name" autoComplete="name" required />
              <Field
                label="E-Mail"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
              <Field label="Telefon (optional)" name="phone" type="tel" autoComplete="tel" />
              <div className="flex flex-col gap-2.5">
                <label htmlFor="message" className="text-sm font-medium text-[var(--color-ink)]">
                  Ihr Projekt
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Erzählen Sie uns kurz von Ihrem Vorhaben …"
                  className="resize-none rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:bg-white"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-8 w-full">
              {sent ? "E-Mail wird geöffnet …" : "Projekt besprechen"}
              <span aria-hidden>→</span>
            </button>

            <p className="mt-4 text-xs leading-relaxed text-[var(--color-muted)]">
              Ihre Angaben werden ausschließlich zur Bearbeitung Ihrer Anfrage
              verwendet und nicht an Dritte weitergegeben.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="eyebrow">{label}</span>
      <p className="mt-3.5 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
        {children}
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={name} className="text-sm font-medium text-[var(--color-ink)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 text-sm outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:bg-white"
      />
    </div>
  );
}
