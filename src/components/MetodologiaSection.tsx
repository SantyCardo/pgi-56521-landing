"use client";

import { useEffect, useRef, useCallback } from "react";
import { createTimeline, animate, stagger } from "animejs";

const fases = [
  {
    num: "01",
    title: "Identificación de Requerimientos",
    desc: "Revisión de literatura clínica y pedagógica, entrevistas con profesionales de salud y definición de controles por Gaze.",
    entregable: "Documento formal de requerimientos clínicos, educativos, funcionales y no funcionales.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Diseño y Desarrollo",
    desc: "Arquitectura de la app, modelado 3D, animaciones, UX/UI, sonido, evaluación interactiva y generación del APK.",
    entregable: "APK Android compatible con Google Cardboard con 5 módulos educativos + manual de usuario.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
        <path d="M12 22V12M2 7l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Validación por Expertos",
    desc: "Evaluación por médicos de la Fundación Clínica, ajustes por retroalimentación y documentación de resultados.",
    entregable: "Prototipo final validado + documentación de resultados y conclusiones.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function MetodologiaSection() {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".met-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".met-underline", {
      scaleX: [0, 1],
      duration: 700,
    }, 200);

    tl.add(".met-desc", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
    }, 400);

    // Kanban badge bounces in
    tl.add(".met-kanban", {
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 700,
      ease: "outElastic(1, .7)",
    }, 600);

    // Kanban pills stagger
    tl.add(".met-kanban-pill", {
      translateX: [-20, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(150),
    }, 800);

    // Progress line grows
    tl.add(".met-progress-line", {
      scaleY: [0, 1],
      duration: 1200,
      ease: "inOutQuad",
    }, 900);

    // Dots pop
    tl.add(".met-dot", {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(200),
      ease: "outBack",
    }, 1000);

    // Phase cards slide in
    tl.add(".met-card", {
      translateX: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(200),
    }, 1100);

    // Phase numbers
    tl.add(".met-num", {
      scale: [0, 1],
      rotate: [-10, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(200),
      ease: "outBack",
    }, 1300);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        runAnimation();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [runAnimation]);

  // Floating
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(".met-float", {
        translateY: [-2, 2, -2],
        duration: 4500,
        loop: true,
        ease: "inOutSine",
        delay: stagger(300),
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="metodologia" className="py-24 px-4 bg-white dark:bg-[#060d14] tech-grid" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="met-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            Metodología de Desarrollo
          </h2>
          <div className="met-underline w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent mb-6" style={{ transformOrigin: "center", transform: "scaleX(0)" }} />
          <p className="met-desc text-muted dark:text-primary-lighter/60 max-w-2xl mx-auto opacity-0">
            Desarrollo ágil con Kanban en 3 fases secuenciales, orientado a alcanzar un nivel de madurez tecnológica TRL 4.
          </p>
        </div>

        {/* Kanban badge */}
        <div className="met-kanban flex justify-center mb-14 opacity-0">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-primary-lighter/20 dark:bg-primary/15 border border-primary-lighter/40 dark:border-white/10">
            <div className="flex gap-1.5">
              {["Por hacer", "En progreso", "Finalizado"].map((col, i) => (
                <span
                  key={col}
                  className={`met-kanban-pill text-xs font-medium px-2.5 py-1 rounded-lg opacity-0 ${
                    i === 0
                      ? "bg-primary-lighter/50 dark:bg-primary/30 text-primary dark:text-primary-lighter"
                      : i === 1
                        ? "bg-primary-light/20 dark:bg-accent/20 text-primary-light dark:text-accent"
                        : "bg-accent/15 text-accent"
                  }`}
                >
                  {col}
                </span>
              ))}
            </div>
            <span className="text-xs text-muted dark:text-primary-lighter/50">— Tablero Kanban</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative space-y-6">
          {/* Progress line */}
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-primary-lighter/30 dark:bg-white/10">
            <div
              className="met-progress-line absolute inset-x-0 top-0 bg-gradient-to-b from-primary-light to-accent"
              style={{ height: "100%", width: "100%", transformOrigin: "top", transform: "scaleY(0)" }}
            />
          </div>

          {fases.map((fase, i) => (
            <div
              key={i}
              className="met-float group relative flex items-start gap-6 pl-4 md:pl-0"
            >
              {/* Dot on the line */}
              <div className="met-dot relative z-10 flex-shrink-0 w-[1.15rem] h-[1.15rem] ml-[1.65rem] rounded-full bg-primary-light ring-4 ring-white dark:ring-[#060d14] shadow-md opacity-0" />

              {/* Content card */}
              <div className="met-card flex-1 flex items-start gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary-lighter/20 dark:from-primary/15 to-transparent hover:from-primary-lighter/40 dark:hover:from-primary/25 transition-all duration-500 border border-transparent hover:border-primary-lighter/50 dark:hover:border-white/10 hover:shadow-[0_12px_40px_rgba(26,82,118,0.06)] opacity-0">
                {/* Phase number */}
                <div className="met-num hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light items-center justify-center text-white font-bold text-xl group-hover:scale-110 group-hover:shadow-[0_8px_25px_rgba(26,82,118,0.25)] transition-all duration-300 opacity-0">
                  {fase.num}
                </div>

                {/* Icon for mobile */}
                <div className="md:hidden flex-shrink-0 w-12 h-12 rounded-xl bg-primary-lighter/50 flex items-center justify-center text-primary">
                  {fase.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-primary dark:text-primary-lighter mb-2 group-hover:text-primary-light transition-colors duration-300">
                    {fase.title}
                  </h3>
                  <p className="text-muted dark:text-primary-lighter/60 leading-relaxed text-sm md:text-base mb-3">
                    {fase.desc}
                  </p>
                  <div className="flex items-start gap-2 text-xs text-primary-light dark:text-accent">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0">
                      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.7 5.3a.75.75 0 00-1.06-1.06L7.5 8.38 5.86 6.74a.75.75 0 00-1.06 1.06l2.18 2.18a.75.75 0 001.06 0l3.66-3.68z" />
                    </svg>
                    <span className="leading-relaxed">{fase.entregable}</span>
                  </div>
                </div>

                {/* Icon for desktop */}
                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl items-center justify-center text-primary-light opacity-30 group-hover:opacity-100 transition-all duration-500">
                  {fase.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
