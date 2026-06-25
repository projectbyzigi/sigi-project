"use client";

import { motion } from "framer-motion";
import { PROCESS } from "@/lib/site-content";

export default function Process() {
  return (
    <section id="ablauf" className="section scroll-mt-24 bg-[var(--color-bg)]">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="eyebrow">Ablauf</span>
          <h2 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-[var(--color-ink)]">
            In sechs Schritten zur fertigen Villa.
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg font-light leading-relaxed text-[var(--color-ink-soft)]">
            Ein klar strukturierter Ablauf — ruhig, transparent und
            koordiniert von der ersten Idee bis zur Übergabe.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-9 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-stone)] hover:shadow-[0_30px_70px_-45px_rgba(28,26,22,0.5)] sm:p-10"
            >
              <span className="display text-5xl text-[var(--color-gold)]">
                {step.index}
              </span>
              <h3 className="mt-6 text-xl font-medium text-[var(--color-ink)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-[var(--color-ink-soft)]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
