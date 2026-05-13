"use client";

import { useEffect, useRef, useCallback } from "react";
import { createTimeline, animate } from "animejs";

export default function PreguntaInvestigacionSection() {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".preg-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".preg-line", {
      scaleX: [0, 1],
      duration: 700,
    }, 200);

    // Card scales in with elastic bounce
    tl.add(".preg-card", {
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1000,
      ease: "outElastic(1, .7)",
    }, 400);

    // Icon spins in
    tl.add(".preg-icon", {
      scale: [0, 1],
      rotate: [-180, 0],
      opacity: [0, 1],
      duration: 800,
      ease: "outBack",
    }, 700);

    // Question text fades in word by word feel
    tl.add(".preg-text", {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 900,
    }, 900);

    // Decorative "?" marks
    tl.add(".preg-deco", {
      opacity: [0, 0.06],
      scale: [0.5, 1],
      duration: 800,
      ease: "outExpo",
    }, 600);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        runAnimation();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [runAnimation]);

  // Gentle pulse on icon
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(".preg-icon", {
        scale: [1, 1.08, 1],
        duration: 3000,
        loop: true,
        ease: "inOutSine",
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      id="pregunta"
      className="py-24 px-4 bg-white dark:bg-[#060d14] tech-grid"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="preg-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            Pregunta de Investigaci&oacute;n
          </h2>
          <div className="preg-line w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent" style={{ transformOrigin: "center", transform: "scaleX(0)" }} />
        </div>

        {/* Question card */}
        <div className="relative max-w-3xl mx-auto">
          <div className="preg-card relative bg-gradient-to-br from-primary/5 via-primary-light/5 to-accent/5 dark:from-primary/15 dark:via-primary-light/10 dark:to-accent/10 rounded-3xl p-10 md:p-14 border-2 border-primary-light/20 dark:border-primary-light/15 shadow-[0_16px_50px_rgba(26,82,118,0.06)] opacity-0">
            {/* Decorative question marks */}
            <span className="preg-deco absolute top-4 left-6 font-[family-name:var(--font-playfair)] text-7xl md:text-8xl text-primary/[0.06] dark:text-primary-lighter/[0.06] leading-none select-none pointer-events-none opacity-0">
              ?
            </span>
            <span className="preg-deco absolute bottom-4 right-6 font-[family-name:var(--font-playfair)] text-7xl md:text-8xl text-primary/[0.06] dark:text-primary-lighter/[0.06] leading-none select-none pointer-events-none rotate-180 opacity-0">
              ?
            </span>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="preg-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shadow-[0_8px_25px_rgba(26,82,118,0.2)] opacity-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="w-7 h-7"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
            </div>

            {/* Question text */}
            <p className="preg-text relative z-10 text-center text-primary/90 dark:text-primary-lighter/85 text-lg md:text-xl leading-relaxed font-medium italic opacity-0">
              &iquest;C&oacute;mo se puede desarrollar una herramienta educativa
              inmersiva e interactiva que ayude a fortalecer la correcta
              t&eacute;cnica de insulinizaci&oacute;n y el adecuado
              almacenamiento de la insulina en pacientes con diabetes?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
