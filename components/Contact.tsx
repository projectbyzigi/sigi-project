"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/site-content";

/**
 * Web3Forms access key — delivers submissions straight to CONTACT.email
 * (sigibau6@gmail.com), no backend required. Create a free key for that
 * inbox at https://web3forms.com and set NEXT_PUBLIC_WEB3FORMS_KEY in the
 * environment (e.g. .env.local), or paste it as the fallback below.
 */
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "YOUR_WEB3FORMS_ACCESS_KEY";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const projektart = String(data.get("projektart") || "");

    data.append("access_key", WEB3FORMS_KEY);
    data.append("from_name", "SIGI Website");
    data.append(
      "subject",
      `Projektanfrage von ${name}${projektart ? ` – ${projektart}` : ""}`
    );

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
                <br />
                {CONTACT.address.line4}
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
          </div>

          {/* Form / success confirmation */}
          {status === "sent" ? (
            <div className="flex flex-col items-start justify-center rounded-3xl border border-[var(--color-line)] bg-white p-8 shadow-[0_30px_80px_-50px_rgba(28,26,22,0.55)] sm:p-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-gold)]">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <h3 className="display mt-6 text-2xl text-[var(--color-ink)]">
                Vielen Dank.
              </h3>
              <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns
                schnellstmöglich bei Ihnen.
              </p>
            </div>
          ) : (
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
                <label htmlFor="projektart" className="text-sm font-medium text-[var(--color-ink)]">
                  Art des Projekts
                </label>
                <select
                  id="projektart"
                  name="projektart"
                  defaultValue=""
                  className="h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-gold)] focus:bg-white"
                >
                  <option value="" disabled>
                    Bitte wählen …
                  </option>
                  <option>Neubau / Villa</option>
                  <option>Renovierung / Sanierung</option>
                  <option>Pool / Außenanlage</option>
                  <option>Immobilie kaufen</option>
                  <option>Immobilie verkaufen</option>
                  <option>Sonstiges</option>
                </select>
              </div>
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

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
              <span aria-hidden>→</span>
            </button>

            {status === "error" && (
              <p className="mt-4 text-sm leading-relaxed text-red-600">
                Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es
                erneut oder schreiben Sie uns direkt an {CONTACT.email}.
              </p>
            )}

            <p className="mt-4 text-xs leading-relaxed text-[var(--color-muted)]">
              Ihre Angaben werden ausschließlich zur Bearbeitung Ihrer Anfrage
              verwendet und nicht an Dritte weitergegeben.
            </p>
          </form>
          )}
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
