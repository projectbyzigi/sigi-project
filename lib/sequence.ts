/* ------------------------------------------------------------------ */
/*  lib/sequence.ts                                                    */
/*  Ordered frame manifest + virtual timeline for the scroll canvas.   */
/*                                                                     */
/*  The source video was exported to 271 JPG frames that already run   */
/*  in the correct narrative order: a finished Mallorca villa that is  */
/*  progressively *deconstructed* down to the foundations / excavation.*/
/*                                                                     */
/*    frame 001  ->  finished luxury villa                             */
/*    frame 271  ->  foundations / hole in the ground                  */
/*                                                                     */
/*  We map scroll progress onto a VIRTUAL timeline so that two extra   */
/*  "held" beats can be injected without re-exporting anything:        */
/*                                                                     */
/*    progress 0.00 – 0.82  ->  villa frames 1 … 271  (deconstruction) */
/*    progress 0.82 – 0.95  ->  architecture sketch   (held, turning   */
/*                                                      point)         */
/*    progress 0.95 – 1.00  ->  finished villa frame 1 (held, for the  */
/*                                                      final headline) */
/* ------------------------------------------------------------------ */

/** Number of exported villa frames in /public/frames. */
export const VILLA_FRAME_COUNT = 271;

/**
 * Folder + filename pattern of the exported frames.
 * ezgif exported them 1-indexed and zero-padded to 3 digits.
 * If you re-export with a different tool, only change this helper.
 */
export function villaFrameSrc(index1Based: number): string {
  const n = String(index1Based).padStart(3, "0");
  return `/frames/ezgif-frame-${n}.jpg`;
}

/** The architectural wireframe sketch (emotional turning point). */
export const SKETCH_SRC = "/brand/architecture-sketch.png";

/* ------------------------------------------------------------------ */
/*  Manifest — the unique images we actually preload.                  */
/*  Index 0 … 270  = villa frames 1 … 271                              */
/*  Index 271       = architecture sketch                              */
/* ------------------------------------------------------------------ */
export const SKETCH_MANIFEST_INDEX = VILLA_FRAME_COUNT; // 271

export const FRAME_MANIFEST: string[] = [
  ...Array.from({ length: VILLA_FRAME_COUNT }, (_, i) => villaFrameSrc(i + 1)),
  SKETCH_SRC,
];

/* ------------------------------------------------------------------ */
/*  Virtual-timeline boundaries (must match the scene ranges in        */
/*  site-content.ts so visuals and copy stay in sync).                 */
/* ------------------------------------------------------------------ */
export const VILLA_PHASE_END = 0.82; // deconstruction finishes here
export const SKETCH_PHASE_END = 0.95; // sketch is held until here (longer beat)

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Map a 0–1 scroll progress value to an index into FRAME_MANIFEST.
 * This is what the canvas draws on every frame.
 */
export function manifestIndexForProgress(progress: number): number {
  const p = clamp01(progress);

  if (p <= VILLA_PHASE_END) {
    // Deconstruction: spread all villa frames across this band.
    const local = p / VILLA_PHASE_END; // 0 … 1
    return Math.round(local * (VILLA_FRAME_COUNT - 1)); // 0 … 270
  }

  if (p <= SKETCH_PHASE_END) {
    // Hold the architecture sketch — do not let it flash past.
    return SKETCH_MANIFEST_INDEX;
  }

  // Return to the pristine finished villa for the closing headline.
  return 0;
}

/**
 * Progress windows during which we crossfade between two *different*
 * source images (villa <-> sketch). Used by the canvas to blend the
 * hard scene cuts into smooth dissolves. Adjacent villa frames never
 * need a crossfade because they are visually continuous.
 */
export const CROSSFADE_BAND = 0.025;

export interface FrameDraw {
  /** Primary manifest index to draw. */
  index: number;
  /** Optional second index to blend in. */
  blendIndex?: number;
  /** 0 = only `index`, 1 = only `blendIndex`. */
  blend: number;
}

/**
 * Richer resolver that also returns crossfade information around the
 * villa→sketch and sketch→villa transitions for buttery scene changes.
 */
export function frameDrawForProgress(progress: number): FrameDraw {
  const p = clamp01(progress);
  const base = manifestIndexForProgress(p);

  // villa -> sketch transition, centred on VILLA_PHASE_END
  if (Math.abs(p - VILLA_PHASE_END) < CROSSFADE_BAND) {
    const t = (p - (VILLA_PHASE_END - CROSSFADE_BAND)) / (2 * CROSSFADE_BAND);
    return {
      index: VILLA_FRAME_COUNT - 1, // last villa frame
      blendIndex: SKETCH_MANIFEST_INDEX,
      blend: clamp01(t),
    };
  }

  // sketch -> finished villa transition, centred on SKETCH_PHASE_END
  if (Math.abs(p - SKETCH_PHASE_END) < CROSSFADE_BAND) {
    const t = (p - (SKETCH_PHASE_END - CROSSFADE_BAND)) / (2 * CROSSFADE_BAND);
    return {
      index: SKETCH_MANIFEST_INDEX,
      blendIndex: 0, // finished villa
      blend: clamp01(t),
    };
  }

  return { index: base, blend: 0 };
}

/* ------------------------------------------------------------------ */
/*  Progressive preloading.                                            */
/*  Frames are loaded in priority order: a sparse "skeleton" first so  */
/*  scrubbing works almost immediately, then everything in between.    */
/* ------------------------------------------------------------------ */

export interface PreloadHandle {
  images: (HTMLImageElement | undefined)[];
  loadedCount: () => number;
  cancel: () => void;
}

/** Build a load order: every 12th frame first, then fill the gaps. */
export function buildPriorityOrder(total: number, stride = 12): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  // Always make sure key beats exist first.
  for (let i = 0; i < total; i += stride) {
    if (!seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  }
  for (let i = 0; i < total; i++) {
    if (!seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  }
  return order;
}
