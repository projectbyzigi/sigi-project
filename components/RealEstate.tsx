import { REAL_ESTATE } from "@/lib/site-content";

export default function RealEstate() {
  return (
    <section id="immobilien" className="scroll-mt-24 bg-[var(--color-bg)] pb-[clamp(3rem,8vw,6rem)]">
      <div className="container-x">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--color-line)] bg-white p-8 shadow-[0_24px_70px_-50px_rgba(28,26,22,0.5)] sm:p-12">
          <span className="eyebrow">{REAL_ESTATE.eyebrow}</span>
          <h2 className="display mt-4 text-[clamp(1.7rem,3.5vw,2.6rem)] text-[var(--color-ink)]">
            {REAL_ESTATE.title}
          </h2>

          {REAL_ESTATE.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-5 max-w-[62ch] text-base font-light leading-relaxed text-[var(--color-ink-soft)] sm:text-lg"
            >
              {paragraph}
            </p>
          ))}

          <a href={REAL_ESTATE.cta.href} className="btn btn-primary mt-8">
            {REAL_ESTATE.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
