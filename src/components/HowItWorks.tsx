"use client";

import { useEffect, useRef, useCallback } from "react";
import { createTimeline, animate, stagger } from "animejs";

const STEPS = [
  {
    num: "1",
    title: "Coloca tu Google Cardboard",
    desc: "Solo necesitas un smartphone y un visor de bajo costo. Sin internet, sin configuración compleja.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="6" y="14" width="36" height="20" rx="6" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="18" cy="24" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="24" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M4 24 Q2 20 6 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M44 24 Q46 20 42 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "Aprende con 5 lecciones",
    desc: "Cada lección cubre un aspecto critico: via de administración, rotación, agujas, almacenamiento y tips.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 16h16M16 22h12M16 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="36" r="8" fill="currentColor" opacity="0.15" />
        <path d="M33 36l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Practica sin riesgo clinico",
    desc: "Practica la técnica completa en un entorno seguro, tantas veces como necesites, antes de la primera inyección real.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M24 4 L28 16 L40 16 L30 24 L34 36 L24 28 L14 36 L18 24 L8 16 L20 16 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" opacity="0.2" strokeDasharray="4 4" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".hiw-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".hiw-line", {
      scaleX: [0, 1],
      duration: 700,
    }, 200);

    // SVG connecting dashed lines draw in
    tl.add(".hiw-connector", {
      strokeDashoffset: [500, 0],
      opacity: [0, 0.3],
      duration: 1200,
      delay: stagger(400),
      ease: "inOutQuad",
    }, 600);

    // Step cards cascade from bottom with scale
    tl.add(".hiw-step", {
      translateY: [60, 0],
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 800,
      delay: stagger(200),
      ease: "outElastic(1, .8)",
    }, 400);

    // Numbered circles pop in with rotation
    tl.add(".hiw-num", {
      scale: [0, 1],
      rotate: [-180, 0],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(200),
      ease: "outBack",
    }, 700);

    // Icons fade in
    tl.add(".hiw-icon", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(200),
    }, 1000);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        runAnimation();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [runAnimation]);

  // Floating pulse on numbered circles
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(".hiw-num", {
        scale: [1, 1.05, 1],
        duration: 3000,
        loop: true,
        ease: "inOutSine",
        delay: stagger(400),
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-[#f0f6fb] dark:from-[#060d14] dark:to-[#0a1018] tech-grid" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="hiw-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            Asi Funciona
          </h2>
          <div className="hiw-line w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent" style={{ transformOrigin: "center", transform: "scaleX(0)" }} />
        </div>

        <div className="relative grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Connecting lines (desktop only) */}
          <svg
            className="hidden md:block absolute top-16 left-0 w-full h-4 pointer-events-none"
            viewBox="0 0 1000 20"
            preserveAspectRatio="none"
          >
            <path
              className="hiw-connector"
              d="M170 10 L500 10"
              stroke="#2980b9"
              strokeWidth="2"
              strokeDasharray="8 6"
              fill="none"
              opacity="0"
            />
            <path
              className="hiw-connector"
              d="M500 10 L830 10"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="8 6"
              fill="none"
              opacity="0"
            />
          </svg>

          {STEPS.map((step, i) => (
            <div key={i} className="hiw-step text-center relative opacity-0">
              {/* Numbered circle */}
              <div className="hiw-num w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-primary to-primary-light text-white text-2xl font-bold shadow-[0_8px_30px_rgba(26,82,118,0.2)] opacity-0">
                {step.num}
              </div>

              {/* Icon */}
              <div className="hiw-icon text-primary-light mb-4 flex justify-center opacity-0">
                {step.icon}
              </div>

              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-primary dark:text-primary-lighter mb-3">
                {step.title}
              </h3>
              <p className="text-muted dark:text-primary-lighter/60 text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
