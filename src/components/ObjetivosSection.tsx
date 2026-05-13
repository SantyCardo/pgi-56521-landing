"use client";

import { useEffect, useRef, useCallback } from "react";
import { createTimeline, animate, stagger } from "animejs";

const objetivoGeneral = {
  title: "Objetivo General",
  desc: "Desarrollar un prototipo de herramienta educativa inmersiva e interactiva, basada en requerimientos clínicos, procedimientos y almacenamiento de la insulinización, para el fortalecimiento de la técnica de aplicación en pacientes adultos con diabetes tipo II.",
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" />
      <path d="M2 12h20" />
    </svg>
  ),
};

const objetivosEspecificos = [
  {
    num: "01",
    title: "Identificar Requerimientos",
    desc: "Identificar los requerimientos clínicos, educativos, funcionales y no funcionales del procedimiento de insulinización, mediante revisión documental y consulta a profesionales de salud, para asegurar su adecuada representación y adaptación a las características de la población objetivo en el prototipo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Diseñar el Prototipo",
    desc: "Diseñar el prototipo educativo, mediante la integración de componentes interactivos de las etapas del procedimiento, con orientación al entrenamiento práctico y seguro del usuario.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Validar con Expertos",
    desc: "Validar el prototipo a través de expertos en el área, como médicos de la fundación clínica, para la verificación del procedimiento esté correctamente explicado para su comprensión y aplicación.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ObjetivosSection() {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".obj-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".obj-underline", {
      scaleX: [0, 1],
      duration: 700,
    }, 200);

    // General objective — dramatic entrance
    tl.add(".obj-general", {
      translateY: [60, 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 1000,
      ease: "outElastic(1, .8)",
    }, 400);

    tl.add(".obj-general-icon", {
      scale: [0, 1],
      rotate: [90, 0],
      opacity: [0, 1],
      duration: 600,
      ease: "outBack",
    }, 700);

    // Específicos subtitle
    tl.add(".obj-esp-title", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
    }, 900);

    // Progress line grows
    tl.add(".obj-progress-line", {
      scaleY: [0, 1],
      duration: 1200,
      ease: "inOutQuad",
    }, 1000);

    // Timeline dots pop
    tl.add(".obj-dot", {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(200),
      ease: "outBack",
    }, 1100);

    // Cards slide in alternating
    tl.add(".obj-card", {
      translateX: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(200),
      ease: "outExpo",
    }, 1200);

    // Number badges scale in
    tl.add(".obj-num", {
      scale: [0, 1],
      rotate: [-10, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(200),
      ease: "outBack",
    }, 1400);
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

  // Floating cards
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(".obj-float", {
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
    <section id="objetivos" className="py-24 px-4 bg-white dark:bg-[#060d14] tech-grid" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="obj-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            Objetivos del Proyecto
          </h2>
          <div className="obj-underline w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent" style={{ transformOrigin: "center", transform: "scaleX(0)" }} />
        </div>

        {/* Objetivo General — destacado */}
        <div className="obj-general mb-14 opacity-0">
          <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-primary-light/5 to-accent/5 dark:from-primary/20 dark:via-primary-light/10 dark:to-accent/10 border-2 border-primary-light/30 dark:border-primary-light/20 shadow-[0_12px_40px_rgba(26,82,118,0.08)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="obj-general-icon flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white opacity-0">
                {objetivoGeneral.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary dark:text-primary-lighter">
                {objetivoGeneral.title}
              </h3>
            </div>
            <p className="text-muted dark:text-primary-lighter/70 leading-relaxed text-base md:text-lg">
              {objetivoGeneral.desc}
            </p>
          </div>
        </div>

        {/* Objetivos Específicos — subtítulo */}
        <div className="obj-esp-title mb-8 opacity-0">
          <h3 className="text-xl md:text-2xl font-semibold text-primary-light dark:text-primary-lighter/80 text-center">
            Objetivos Específicos
          </h3>
        </div>

        <div className="relative space-y-6">
          {/* Progress line */}
          <div className="absolute left-[2.25rem] md:left-[2.25rem] top-0 bottom-0 w-px bg-primary-lighter/30 dark:bg-white/10">
            <div
              className="obj-progress-line absolute inset-x-0 top-0 bg-gradient-to-b from-primary-light to-accent"
              style={{ height: "100%", width: "100%", transformOrigin: "top", transform: "scaleY(0)" }}
            />
          </div>

          {objetivosEspecificos.map((obj, i) => (
            <div
              key={i}
              className="obj-float group relative flex items-start gap-6 pl-4 md:pl-0"
            >
              {/* Number dot on the line */}
              <div className="obj-dot relative z-10 flex-shrink-0 w-[1.15rem] h-[1.15rem] ml-[1.65rem] md:ml-[1.65rem] rounded-full bg-primary-light ring-4 ring-white dark:ring-[#060d14] shadow-md opacity-0" />

              {/* Content card */}
              <div className="obj-card flex-1 flex items-start gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary-lighter/20 dark:from-primary/15 to-transparent hover:from-primary-lighter/40 dark:hover:from-primary/25 transition-all duration-500 border border-transparent hover:border-primary-lighter/50 dark:hover:border-white/10 hover:shadow-[0_12px_40px_rgba(26,82,118,0.06)] opacity-0">
                {/* Number */}
                <div className="obj-num hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light items-center justify-center text-white font-bold text-xl group-hover:scale-110 group-hover:shadow-[0_8px_25px_rgba(26,82,118,0.25)] transition-all duration-300 opacity-0">
                  {obj.num}
                </div>

                {/* Icon for mobile */}
                <div className="md:hidden flex-shrink-0 w-12 h-12 rounded-xl bg-primary-lighter/50 flex items-center justify-center text-primary">
                  {obj.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-primary dark:text-primary-lighter mb-2 group-hover:text-primary-light transition-colors duration-300">
                    {obj.title}
                  </h3>
                  <p className="text-muted dark:text-primary-lighter/60 leading-relaxed text-sm md:text-base">
                    {obj.desc}
                  </p>
                </div>

                {/* Icon for desktop */}
                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl items-center justify-center text-primary-light opacity-30 group-hover:opacity-100 transition-all duration-500">
                  {obj.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
