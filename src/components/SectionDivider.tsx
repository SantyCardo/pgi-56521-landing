"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const line = el.querySelector(".sd-line") as HTMLElement;
        const dot = el.querySelector(".sd-dot") as HTMLElement;
        if (line) {
          animate(line, {
            scaleX: [0, 1],
            opacity: [0, 1],
            duration: 800,
            ease: "outExpo",
          });
        }
        if (dot) {
          animate(dot, {
            scale: [0, 1],
            opacity: [0, 1],
            duration: 400,
            delay: 500,
            ease: "outBack",
          });
        }
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative py-2" ref={ref}>
      <div
        className="sd-line mx-auto h-px w-full max-w-5xl opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(41,128,185,0.2) 20%, rgba(14,165,233,0.3) 50%, rgba(41,128,185,0.2) 80%, transparent 100%)",
          transformOrigin: "center",
        }}
      />
      {/* Center dot accent */}
      <div className="sd-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-light/40 opacity-0" />
    </div>
  );
}
