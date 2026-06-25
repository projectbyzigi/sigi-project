"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import SceneText from "./SceneText";
import { SCENES } from "@/lib/site-content";
import {
  buildPriorityOrder,
  FRAME_MANIFEST,
  frameDrawForProgress,
} from "@/lib/sequence";

/** How much vertical scroll the whole story consumes (in viewport heights). */
const STORY_VH = 760;

/* Draw an image so it covers the canvas (object-fit: cover). */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  alpha = 1
) {
  if (!img.naturalWidth) return;
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = cw / ch;
  let dw: number;
  let dh: number;
  if (ir > cr) {
    dh = ch;
    dw = ch * ir;
  } else {
    dw = cw;
    dh = cw / ir;
  }
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, dx, dy, dw, dh);
  ctx.globalAlpha = 1;
}

export default function ScrollSequenceCanvas() {
  const prefersReduced = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // smoothed scrubbing state (canvas) — kept in refs to avoid re-renders
  const targetProgress = useRef(0);
  const renderedProgress = useRef(-1);
  const rafId = useRef<number | null>(null);
  const lastEmitted = useRef(0);

  const [loadPct, setLoadPct] = useState(0);
  const [ready, setReady] = useState(false);
  // numeric progress used to drive the text overlays / rail / logo
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* ---------------- Preload frames progressively ---------------- */
  useEffect(() => {
    let cancelled = false;
    const total = FRAME_MANIFEST.length;
    const imgs: HTMLImageElement[] = new Array(total);
    imagesRef.current = imgs;

    let loaded = 0;
    const order = buildPriorityOrder(total, 12);
    let cursor = 0;
    const CONCURRENCY = 6;

    const bump = () => {
      loaded += 1;
      if (!cancelled) {
        setLoadPct(Math.round((loaded / total) * 100));
        if (loaded >= Math.min(24, total) || loaded === total) {
          setReady(true);
        }
      }
    };

    const loadNext = () => {
      if (cancelled || cursor >= order.length) return;
      const idx = order[cursor++];
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        bump();
        loadNext();
      };
      img.onerror = () => {
        bump();
        loadNext();
      };
      img.src = FRAME_MANIFEST[idx];
      imgs[idx] = img;
    };

    for (let i = 0; i < CONCURRENCY; i++) loadNext();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------------- Canvas sizing (DPR-aware) ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
      renderedProgress.current = -1; // force redraw
      requestTick();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- Draw a given progress value ---------------- */
  const draw = (p: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    const { index, blendIndex, blend } = frameDrawForProgress(p);
    const imgs = imagesRef.current;

    // Fallback to the nearest already-loaded frame so scrubbing never blanks.
    const pick = (i: number): HTMLImageElement | undefined => {
      if (imgs[i]?.complete && imgs[i]?.naturalWidth) return imgs[i];
      for (let d = 1; d < imgs.length; d++) {
        const a = imgs[i - d];
        if (a?.complete && a?.naturalWidth) return a;
        const b = imgs[i + d];
        if (b?.complete && b?.naturalWidth) return b;
      }
      return undefined;
    };

    const primary = pick(index);
    if (!primary) return;

    ctx.clearRect(0, 0, cw, ch);
    drawCover(ctx, primary, cw, ch, 1);

    if (blendIndex !== undefined && blend > 0.001) {
      const secondary = pick(blendIndex);
      if (secondary) drawCover(ctx, secondary, cw, ch, blend);
    }
  };

  /* ---------------- rAF loop with easing toward target ---------------- */
  const requestTick = () => {
    if (rafId.current != null) return;
    const loop = () => {
      const target = targetProgress.current;
      const current =
        renderedProgress.current < 0 ? target : renderedProgress.current;
      const next = current + (target - current) * 0.18;
      const settled = Math.abs(target - next) < 0.0004;
      const value = settled ? target : next;

      renderedProgress.current = value;
      draw(value);

      if (!settled) {
        rafId.current = requestAnimationFrame(loop);
      } else {
        rafId.current = null;
      }
    };
    rafId.current = requestAnimationFrame(loop);
  };

  // Update canvas target + overlay progress from scroll.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    targetProgress.current = v;
    // Throttle React updates for the overlays to meaningful deltas.
    if (Math.abs(v - lastEmitted.current) > 0.0015) {
      lastEmitted.current = v;
      setProgress(v);
    }
    if (prefersReduced) {
      renderedProgress.current = v;
      draw(v);
    } else {
      requestTick();
    }
  });

  // Initial paint once frames start arriving.
  useEffect(() => {
    if (ready) {
      const v = scrollYProgress.get();
      targetProgress.current = v;
      renderedProgress.current = -1;
      setProgress(v);
      draw(v);
      requestTick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  /* ============================================================= */
  /*  Reduced-motion fallback: a calm, static, stacked narrative.  */
  /* ============================================================= */
  if (prefersReduced) {
    return (
      <section id="story" aria-label="Vom Rohbau zur schlüsselfertigen Villa">
        <div className="relative">
          <Image
            src="/frames/ezgif-frame-001.jpg"
            alt="Fertiggestellte Luxusvilla auf Mallorca"
            width={1920}
            height={1080}
            priority
            className="h-[60vh] w-full object-cover"
          />
        </div>
        <div className="container-x section grid gap-12 md:grid-cols-2">
          {SCENES.map((s) => (
            <div key={s.id} className="border-t border-[var(--color-line)] pt-6">
              <span className="eyebrow">
                {s.index} — {s.title}
              </span>
              <h2 className="display mt-3 text-[clamp(1.6rem,3vw,2.4rem)]">
                {s.headline}
              </h2>
              {s.text && (
                <p className="mt-3 max-w-[46ch] font-light leading-relaxed text-[var(--color-ink-soft)]">
                  {s.text}
                </p>
              )}
              {s.bullets && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-sm text-[var(--color-ink-soft)]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ============================================================= */
  /*  Interactive scrollytelling                                    */
  /* ============================================================= */
  return (
    <section
      id="story"
      ref={trackRef}
      aria-label="Vom Rohbau zur schlüsselfertigen Villa"
      style={{ height: `${STORY_VH}vh` }}
      className="relative"
    >
      {/* Sticky cinematic stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#eef0f1]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />

        {/* Loading veil */}
        <div
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-[var(--color-bg)] transition-opacity duration-700"
          style={{
            opacity: ready ? 0 : 1,
            visibility: ready ? "hidden" : "visible",
          }}
        >
          <div className="text-center">
            <div className="eyebrow">Szene wird geladen</div>
            <div className="display mt-2 text-5xl text-[var(--color-ink)]">
              {loadPct}%
            </div>
          </div>
        </div>

        {/* Scene captions */}
        {SCENES.map((scene) => (
          <SceneText key={scene.id} scene={scene} progress={progress} />
        ))}

        {/* Subtle progress rail with chapter ticks */}
        <div className="pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex">
          {SCENES.map((s) => {
            const [a, b] = s.range;
            const active = progress >= a - 0.02 && progress <= b + 0.02;
            return (
              <span
                key={s.id}
                className="block rounded-full bg-white transition-all duration-300"
                style={{
                  height: active ? 10 : 6,
                  width: 6,
                  opacity: active ? 1 : 0.4,
                }}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
