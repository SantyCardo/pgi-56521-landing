"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function Footer() {
  const arrowRef = useRef<SVGSVGElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Looping arrow bounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (arrowRef.current) {
        animate(arrowRef.current, {
          translateY: [0, -2, 0],
          duration: 1500,
          loop: true,
          ease: "inOutSine",
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="relative bg-[#f0f6fb] dark:bg-[#060d14] text-muted dark:text-primary-lighter/40 px-4">
      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-light/20 to-transparent" />

      <div className="max-w-5xl mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 font-mono text-[10px] md:text-xs tracking-wider">
          <span>&copy; 2026</span>
          <div className="h-3 w-px bg-primary/10 dark:bg-white/10" />
          <span>Prototipo Educativo Inmersivo para Insulinizaci&oacute;n</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] md:text-xs tracking-wider">
            UNAB &bull; Bucaramanga
          </span>
          <div className="h-3 w-px bg-primary/10 dark:bg-white/10" />
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono text-[10px] md:text-xs tracking-wider text-primary-light/70 dark:text-primary-lighter/50 hover:text-primary-light dark:hover:text-primary-lighter transition-colors"
          >
            VOLVER ARRIBA
            <svg
              ref={arrowRef}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3 h-3"
            >
              <path d="M8 13V3M3 7l5-5 5 5" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
