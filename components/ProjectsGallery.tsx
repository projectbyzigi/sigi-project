"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/lib/site-content";

type Filter = "Alle" | ProjectCategory;

export default function ProjectsGallery() {
  const [filter, setFilter] = useState<Filter>("Alle");

  const visible = useMemo(
    () => (filter === "Alle" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projekte" className="section scroll-mt-24 bg-[var(--color-bg)]">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Projekte</span>
            <h2 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]">
              Realisierte Arbeiten.
            </h2>
            <p className="mt-5 max-w-[48ch] text-lg font-light leading-relaxed text-[var(--color-ink-soft)]">
              Ein Einblick in unsere Handschrift — vom Rohbau über Naturstein
              bis zum fertigen Innenausbau auf Mallorca.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  filter === cat
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-surface)]"
                    : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style responsive grid */}
        <motion.div
          layout
          className="mt-20 columns-1 gap-8 sm:columns-2 lg:columns-3 lg:gap-10 [&>*]:mb-8 lg:[&>*]:mb-10"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.figure
                key={project.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="group relative block break-inside-avoid overflow-hidden rounded-xl bg-[var(--color-sand)]"
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  width={900}
                  height={project.span === "tall" ? 1200 : project.span === "wide" ? 600 : 800}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="text-sm font-medium tracking-wide text-white">
                    {project.category}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-10 text-sm text-[var(--color-muted)]">
          {/* More project photos can be added in lib/site-content.ts → PROJECTS */}
          Weitere Projekte auf Anfrage.
        </p>
      </div>
    </section>
  );
}
