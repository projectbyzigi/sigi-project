"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HERO } from "@/lib/site-content";

export default function Hero() {
  return (
    <section
      id="start"
      className="relative min-h-[100svh] overflow-hidden bg-white text-[var(--color-ink)]"
    >
      <div className="container-x relative z-10 flex min-h-[100svh] flex-col items-center justify-center pt-28 text-center">
        {/* Logo — sits in the space between the menu and the headline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex justify-center md:mb-16"
        >
          <Image
            src="/brand/logo-final.png"
            alt="SIGI Bauunternehmen"
            width={280}
            height={180}
            priority
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 300px, 220px"
            className="h-auto w-[220px] sm:w-[300px] lg:w-[360px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <p className="eyebrow mb-6">{HERO.eyebrow}</p>

          <h1 className="display whitespace-pre-line text-[clamp(2.6rem,7vw,6rem)] text-[var(--color-ink)]">
            {HERO.headline}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-[clamp(1.05rem,2vw,1.4rem)] font-light leading-relaxed text-[var(--color-ink-soft)]">
            {HERO.subline}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={HERO.primaryCta.href} className="btn btn-primary">
              {HERO.primaryCta.label}
              <span aria-hidden="true">→</span>
            </a>

            <a href={HERO.secondaryCta.href} className="btn btn-ghost">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </motion.div>

        {/* Scroll prompt */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.32em] text-[var(--color-muted)] md:flex">
          <span>{HERO.scrollPrompt}</span>
          <span className="relative h-10 w-6 rounded-full border border-[var(--color-line)]">
            <span className="scroll-dot absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-gold)]" />
          </span>
        </div>
      </div>
    </section>
  );
}
