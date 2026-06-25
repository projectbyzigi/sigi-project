"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/site-content";

export default function Services() {
  return (
    <section id="leistungen" className="section scroll-mt-24 bg-[var(--color-bg)]">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">Leistungen</span>
          <h2 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]">
            Alles aus einer Hand.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg font-light leading-relaxed text-[var(--color-ink-soft)]">
            Von der Planung und Architektur über den Rohbau bis zum letzten
            Detail im Innenausbau — wir koordinieren jedes Gewerk und
            übergeben Ihnen die fertige Villa.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-9">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white py-10 pl-7 pr-10 shadow-[0_16px_44px_-32px_rgba(28,26,22,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--color-gold-soft)] hover:shadow-[0_36px_80px_-46px_rgba(28,26,22,0.55)] sm:py-12 sm:pl-9 sm:pr-12"
            >
              {/* Gold accent bar — slides in on hover */}
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-soft)] transition-transform duration-500 ease-out group-hover:scale-x-100" />

              {/* Large ghost numeral — top-right, behind the text */}
              <span
                aria-hidden="true"
                className="display pointer-events-none absolute right-6 top-4 select-none text-[5.5rem] leading-none text-[rgba(216,205,186,0.5)] transition-colors duration-500 group-hover:text-[rgba(176,141,87,0.32)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="relative mt-10 max-w-[14ch] text-xl font-medium text-[var(--color-ink)]">
                {service.title}
              </h3>
              <p className="relative mt-3.5 text-sm font-light leading-relaxed text-[var(--color-ink-soft)]">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
