"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ABOUT } from "@/lib/site-content";

export default function About() {
  return (
    <section id="ueber-uns" className="section scroll-mt-24 bg-[var(--color-bg)]">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Team / group photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-sand)] shadow-[var(--shadow-soft)]"
        >
          <Image
            src={ABOUT.image}
            alt={ABOUT.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* Text on the right */}
        <div>
          <span className="eyebrow">{ABOUT.eyebrow}</span>
          <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.25rem)]">
            {ABOUT.headline}
          </h2>
          <p className="mt-6 max-w-[50ch] text-lg font-light leading-relaxed text-[var(--color-ink-soft)]">
            {ABOUT.body}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--color-line)] pt-8">
            {ABOUT.stats.map((stat) => (
              <div key={stat.label}>
                <div className="display text-[clamp(1.4rem,3vw,2.2rem)] text-[var(--color-ink)]">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs tracking-wide text-[var(--color-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
