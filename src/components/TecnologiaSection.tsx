"use client";

import { useEffect, useRef, useCallback } from "react";
import { createTimeline, animate, stagger } from "animejs";

const lecciones = [
  { num: 1, title: "Via de administración", desc: "Subcutánea correcta vs. IV/IM accidental", color: "bg-red-500" },
  { num: 2, title: "Rotación de sitios", desc: "4 cuadrantes, prevención de lipodistrofia", color: "bg-orange-500" },
  { num: 3, title: "Agujas y desecho", desc: "No reutilizar, contenedor rigido", color: "bg-yellow-500" },
  { num: 4, title: "Almacenamiento", desc: "Temperatura, sin congelar, tapada", color: "bg-emerald-500" },
  { num: 5, title: "Tips del pen", desc: "Dosis, espera 10s, basal vs. rápida", color: "bg-sky-500" },
];

const techIcons = [
  <svg key="unity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
    <path d="M12 22V12M2 7l10 5 10-5" />
  </svg>,
  <svg key="cardboard" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
    <rect x="2" y="7" width="20" height="10" rx="3" />
    <circle cx="8" cy="12" r="2.5" />
    <circle cx="16" cy="12" r="2.5" />
    <path d="M10.5 12h3" />
  </svg>,
  <svg key="gaze" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  <svg key="apk" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M12 8v6M9 12l3 3 3-3" />
    <circle cx="12" cy="19" r="0.5" fill="currentColor" />
  </svg>,
];

const techStack = [
  { name: "Unity", desc: "Motor de desarrollo del prototipo VR con exportación APK Android" },
  { name: "Google Cardboard", desc: "Hardware VR de bajo costo, accesible en contexto colombiano" },
  { name: "Gaze Navigation", desc: "Interacción por mirada con temporizador visual (3 DOF)" },
  { name: "APK Offline", desc: "Distribución local sin internet ni servidores externos" },
];

export default function TecnologiaSection() {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".tech-header", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".tech-underline", {
      scaleX: [0, 1],
      duration: 700,
    }, 200);

    tl.add(".tech-desc", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
    }, 400);

    // Timeline vertical line grows
    tl.add(".tech-timeline-line", {
      scaleY: [0, 1],
      duration: 1200,
      ease: "inOutQuad",
    }, 500);

    // Timeline dots pop in sequence
    tl.add(".tech-dot", {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 400,
      delay: stagger(120),
      ease: "outBack",
    }, 700);

    // Lesson cards alternate entrance
    tl.add(".tech-lesson", {
      translateY: [30, 0],
      opacity: [0, 1],
      scale: [0.92, 1],
      duration: 700,
      delay: stagger(120),
      ease: "outExpo",
    }, 800);

    // Stack title
    tl.add(".tech-stack-title", {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 700,
    }, 1400);

    // Tech stack cards — stagger from center
    tl.add(".tech-stack-card", {
      translateY: [40, 0],
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 700,
      delay: stagger(120, { from: "center" }),
      ease: "outElastic(1, .8)",
    }, 1600);

    // Tech icons pop
    tl.add(".tech-stack-icon", {
      scale: [0, 1],
      rotate: [-15, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(120, { from: "center" }),
      ease: "outBack",
    }, 1800);

    // Evidence quote
    tl.add(".tech-evidence", {
      translateY: [30, 0],
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 900,
    }, 2000);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        runAnimation();
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [runAnimation]);

  // Floating tech icons
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(".tech-float", {
        translateY: [-3, 3, -3],
        duration: 3500,
        loop: true,
        ease: "inOutSine",
        delay: stagger(250),
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="tecnologia" className="py-24 px-4 bg-gradient-to-b from-[#f0f6fb] to-white dark:from-[#0a1018] dark:to-[#060d14] tech-grid" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="tech-header font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            Tecnología y Contenido
          </h2>
          <div className="tech-underline w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent mb-6" style={{ transformOrigin: "center", transform: "scaleX(0)" }} />
          <p className="tech-desc text-muted dark:text-primary-lighter/60 max-w-2xl mx-auto opacity-0">
            5 lecciones clínicas ordenadas por prioridad, con sesiones de 15-20 minutos
            diseñadas para el contexto de consultorio médico.
          </p>
        </div>

        {/* Lessons timeline */}
        <div className="relative mb-20">
          {/* Animated vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-primary-lighter/30 dark:bg-white/10">
            <div
              className="tech-timeline-line absolute inset-x-0 top-0 h-full bg-gradient-to-b from-red-400 via-yellow-400 to-sky-400"
              style={{ transformOrigin: "top", transform: "scaleY(0)" }}
            />
          </div>

          {lecciones.map((l, i) => (
            <div
              key={i}
              className={`relative flex items-center gap-6 mb-8 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className={`tech-dot w-5 h-5 rounded-full ${l.color} ring-4 ring-white dark:ring-[#060d14] shadow-md opacity-0`} />
              </div>

              {/* Content card */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <div className="tech-lesson bg-white dark:bg-white/5 rounded-xl p-5 border border-primary-lighter/30 dark:border-white/10 hover:shadow-[0_12px_40px_rgba(26,82,118,0.08)] hover:border-primary-light/30 transition-all duration-500 opacity-0">
                  <div className={`inline-flex items-center gap-2 text-xs font-bold text-white px-2.5 py-1 rounded-full ${l.color} mb-2`}>
                    Lección {l.num}
                  </div>
                  <h3 className="font-semibold text-primary dark:text-primary-lighter text-base">{l.title}</h3>
                  <p className="text-muted dark:text-primary-lighter/60 text-sm mt-1">{l.desc}</p>
                </div>
              </div>

              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div>
          <h3 className="tech-stack-title font-[family-name:var(--font-playfair)] text-2xl font-bold text-primary dark:text-primary-lighter text-center mb-8 opacity-0">
            Stack Tecnológico
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((t, i) => (
              <div
                key={i}
                className="tech-stack-card tech-float group text-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-primary-lighter/30 dark:border-white/10 hover:border-primary-light/40 transition-all duration-500 opacity-0"
              >
                <div className="tech-stack-icon w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary-lighter/30 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-primary-lighter group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-light group-hover:text-white group-hover:shadow-[0_8px_25px_rgba(26,82,118,0.2)] transition-all duration-300 opacity-0">
                  {techIcons[i]}
                </div>
                <h4 className="font-semibold text-primary dark:text-primary-lighter text-sm mb-1">{t.name}</h4>
                <p className="text-muted dark:text-primary-lighter/60 text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence quote */}
        <div className="tech-evidence mt-14 p-px rounded-2xl bg-gradient-to-r from-primary via-primary-light to-accent opacity-0">
          <div className="bg-primary rounded-2xl p-8 text-center text-white">
            <p className="italic text-lg leading-relaxed opacity-90">
              &ldquo;La eficacia reside en la experiencia inmersiva y no en el costo del hardware.&rdquo;
            </p>
            <cite className="text-primary-lighter text-sm mt-3 block not-italic">
              — Taunk et al. 2022 · Google Cardboard vs. Oculus: sin diferencias significativas en resultados educativos
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
