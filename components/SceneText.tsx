"use client";

import type { Scene } from "@/lib/site-content";

interface SceneTextProps {
  scene: Scene;
  /** Global 0–1 scroll progress through the story section. */
  progress: number;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * A single scrollytelling caption that fades in and out as scroll
 * progress moves through the scene's [start, end] window. Driven by a
 * plain numeric `progress` value (no MotionValue→style binding) so it
 * stays compatible across animation backends and never blanks.
 */
export default function SceneText({ scene, progress }: SceneTextProps) {
  const [start, end] = scene.range;
  const span = end - start;
  const fade = Math.max(span * 0.18, 0.02);
  const isLast = end >= 0.999;
  const isCenter = scene.align === "center";

  // opacity + vertical drift
  let opacity: number;
  let y: number;

  if (isLast) {
    // Fade in over [start, start+fade] and stay fully visible to the end.
    const t = clamp01((progress - start) / fade);
    opacity = t;
    y = lerp(50, 0, t);
  } else if (progress <= start || progress >= end) {
    opacity = 0;
    y = progress <= start ? 50 : -50;
  } else if (progress < start + fade) {
    const t = clamp01((progress - start) / fade);
    opacity = t;
    y = lerp(50, 0, t);
  } else if (progress > end - fade) {
    const t = clamp01((end - progress) / fade);
    opacity = t;
    y = lerp(-50, 0, t);
  } else {
    opacity = 1;
    y = 0;
  }

  const hidden = opacity <= 0.001;

  return (
    <div
      aria-hidden="true"
      style={{ opacity, visibility: hidden ? "hidden" : "visible" }}
      className="pointer-events-none absolute inset-0 z-20"
    >
      {/* Legibility scrim */}
      {isCenter ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(18,16,13,0.66) 0%, rgba(18,16,13,0.40) 44%, rgba(18,16,13,0) 78%)",
          }}
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(18,16,13,0.74) 0%, rgba(18,16,13,0.22) 36%, rgba(18,16,13,0) 62%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(18,16,13,0.45) 0%, rgba(18,16,13,0) 55%)",
            }}
          />
        </>
      )}

      {/* Content */}
      <div
        style={{ transform: `translateY(${y}px)`, willChange: "transform, opacity" }}
        className={
          isCenter
            ? "container-x absolute inset-0 flex flex-col items-center justify-center text-center"
            : "container-x absolute inset-x-0 bottom-0 flex flex-col items-start pb-[clamp(3rem,9vh,7rem)]"
        }
      >
        <span className="eyebrow text-[var(--color-gold-soft)]">
          {scene.index} — {scene.title}
        </span>

        <h2
          className={
            isCenter
              ? "display mt-5 max-w-[18ch] text-balance text-white text-[clamp(2.2rem,6vw,4.6rem)]"
              : "display mt-5 max-w-[16ch] text-white text-[clamp(2rem,5.4vw,4.4rem)]"
          }
        >
          {scene.headline}
        </h2>

        {scene.text && (
          <p
            className={
              isCenter
                ? "mt-6 max-w-[46ch] text-balance text-[clamp(1rem,1.6vw,1.2rem)] font-light leading-relaxed text-white/80"
                : "mt-6 max-w-[42ch] text-[clamp(1rem,1.6vw,1.2rem)] font-light leading-relaxed text-white/80"
            }
          >
            {scene.text}
          </p>
        )}

        {scene.bullets && (
          <ul
            className={
              isCenter
                ? "mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-3"
                : "mt-7 flex flex-wrap gap-x-3 gap-y-3"
            }
          >
            {scene.bullets.map((b) => (
              <li
                key={b}
                className="rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-light text-white/90 backdrop-blur-sm"
              >
                {b}
              </li>
            ))}
          </ul>
        )}

        {scene.cta && (
          <a
            href={scene.cta.href}
            className={`btn btn-light mt-9 ${hidden ? "" : "pointer-events-auto"}`}
          >
            {scene.cta.label}
            <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </div>
  );
}
