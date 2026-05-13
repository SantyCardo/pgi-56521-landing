import { useEffect, useRef } from "react";
import { createTimeline, stagger, type TimelineParams } from "animejs";

type AnimeFn = (tl: ReturnType<typeof createTimeline>) => void;

/**
 * Fires an anime.js timeline once when the element enters viewport.
 */
export function useAnimeOnScroll(
  buildTimeline: AnimeFn,
  opts?: { threshold?: number; defaults?: TimelineParams["defaults"] }
) {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          const tl = createTimeline({
            defaults: { ease: "outExpo", ...opts?.defaults },
          });
          buildTimeline(tl);
        }
      },
      { threshold: opts?.threshold ?? 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [buildTimeline, opts]);

  return ref;
}

export { stagger };
