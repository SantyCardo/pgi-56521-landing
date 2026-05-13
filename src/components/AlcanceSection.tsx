"use client";

import { useEffect, useRef, useCallback } from "react";
import { createTimeline, animate, stagger } from "animejs";

const STEPS = [
  {
    title: "Preparación del Dispositivo",
    desc: "Configurar el visor VR y el dispositivo móvil.",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="10" rx="3" />
        <circle cx="8" cy="12" r="2.5" />
        <circle cx="16" cy="12" r="2.5" />
        <path d="M10.5 12h3" />
      </svg>
    ),
  },
  {
    title: "Selección de Zona",
    desc: "Elegir y rotar sitios de inyección.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
        <path d="M18 11V6a2 2 0 00-2-2h-1a2 2 0 00-2 2v0M14 10V4.5a2 2 0 00-2-2v0a2 2 0 00-2 2V10" />
        <path d="M10 10.5V5a2 2 0 00-2-2v0a2 2 0 00-2 2v9" />
        <path d="M18 11a2 2 0 012 2v0c0 1-.3 1.9-.8 2.7L16 21H8l-2-5.7" />
      </svg>
    ),
  },
  {
    title: "Técnica de Inyección",
    desc: "Aprender y practicar la técnica de inyección correcta.",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
        <path d="M18 2l4 4M7.5 13.5L2 19l3 3 5.5-5.5M15 3l-8.5 8.5 6 6L21 9" />
        <line x1="10" y1="11" x2="8" y2="13" />
      </svg>
    ),
  },
  {
    title: "Almacenamiento de Insulina",
    desc: "Comprender las condiciones adecuadas de almacenamiento.",
    color: "#a3e635",
    bg: "rgba(163,230,53,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 4v16M15 4v16M4 9h16M4 15h16" />
        <path d="M12 8v2M12 14v2" />
      </svg>
    ),
  },
  {
    title: "Desecho de Elementos",
    desc: "Aprender el desecho seguro de suministros de insulina.",
    color: "#facc15",
    bg: "rgba(250,204,21,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
      </svg>
    ),
  },
  {
    title: "Evaluación",
    desc: "Completar cuestionarios para evaluar la comprensión.",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 12l2 2 4-4" />
        <path d="M8 7h8" />
        <path d="M8 17h4" />
      </svg>
    ),
  },
  {
    title: "Validación",
    desc: "El personal de salud revisa la herramienta.",
    color: "#f87171",
    bg: "rgba(248,113,113,0.12)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const INCLUYE = [
  "App Android con Google Cardboard",
  "Navegación por Gaze con temporizador",
  "Animaciones 3D + narración + subtítulos",
  "Menú, historial y resumen de sesiones",
  "Evaluación por módulo",
  "Almacenamiento 100% local / offline",
  "Validación por profesionales de salud",
];

const NO_INCLUYE = [
  "Interacción física ni simulación háptica",
  "Integración con historia clínica / hospitales",
  "Pruebas directas con pacientes",
  "Sincronización entre dispositivos",
  "Modelos 3D de alta fidelidad",
];

export default function AlcanceSection() {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".alc-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".alc-underline", {
      scaleX: [0, 1],
      duration: 700,
    }, 200);

    tl.add(".alc-desc", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
    }, 400);

    // Staircase steps rise from bottom
    tl.add(".alc-step", {
      translateY: [60, 0],
      translateX: [-20, 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 700,
      delay: stagger(120),
      ease: "outElastic(1, .8)",
    }, 600);

    // Icons pop inside steps
    tl.add(".alc-step-icon", {
      scale: [0, 1],
      rotate: [-15, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(120),
      ease: "outBack",
    }, 900);

    // Scope cards
    tl.add(".alc-scope-title", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
    }, 1400);

    tl.add(".alc-include", {
      translateX: [-20, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(80),
    }, 1500);

    tl.add(".alc-exclude", {
      translateX: [20, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(80),
    }, 1500);
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

  // Floating steps
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(".alc-float", {
        translateY: [-2, 2, -2],
        duration: 4000,
        loop: true,
        ease: "inOutSine",
        delay: stagger(200),
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      id="alcance"
      className="py-24 px-4 bg-gradient-to-b from-white to-[#f0f6fb] dark:from-[#060d14] dark:to-[#0a1018] tech-grid overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="alc-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            Alcance y Delimitaci&oacute;n
          </h2>
          <div
            className="alc-underline w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent mb-6"
            style={{ transformOrigin: "center", transform: "scaleX(0)" }}
          />
          <p className="alc-desc text-muted dark:text-primary-lighter/60 max-w-2xl mx-auto opacity-0">
            Etapas del prototipo educativo VR para insulinizaci&oacute;n
          </p>
        </div>

        {/* ── Staircase Diagram ── */}
        <div className="relative max-w-4xl mx-auto mb-20">
          {/* Vertical guide line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-300/30 via-green-300/30 via-yellow-300/30 to-red-300/30 dark:from-blue-500/20 dark:via-green-500/20 dark:via-yellow-500/20 dark:to-red-500/20" />

          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="alc-step alc-float opacity-0"
                style={{ paddingLeft: `${i * 2 + 2}rem` }}
              >
                <div
                  className="relative flex items-center gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group"
                  style={{
                    backgroundColor: step.bg,
                    borderColor: `${step.color}30`,
                  }}
                >
                  {/* Step number */}
                  <div
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md"
                    style={{ backgroundColor: step.color }}
                  >
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className="alc-step-icon flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 opacity-0"
                    style={{ backgroundColor: `${step.color}20`, color: step.color }}
                  >
                    {step.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-mono text-sm md:text-base font-bold tracking-wide"
                      style={{ color: step.color }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-muted dark:text-primary-lighter/60 text-xs md:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Decorative arrow connector */}
                  {i < STEPS.length - 1 && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                      <svg width="12" height="12" viewBox="0 0 12 12" className="text-primary-light/20 dark:text-primary-lighter/10">
                        <path d="M6 0v10M2 6l4 5 4-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scope: Incluye / No incluye ── */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Incluye */}
          <div>
            <div className="alc-scope-title flex items-center gap-2 mb-4 opacity-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h3 className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                INCLUYE
              </h3>
            </div>
            <div className="space-y-2">
              {INCLUYE.map((text, i) => (
                <div
                  key={i}
                  className="alc-include flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200/50 dark:border-emerald-500/10 hover:border-emerald-300 dark:hover:border-emerald-500/20 transition-all duration-300 opacity-0"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4 flex-shrink-0">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span className="text-muted dark:text-primary-lighter/70 text-xs md:text-sm">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* No incluye */}
          <div>
            <div className="alc-scope-title flex items-center gap-2 mb-4 opacity-0">
              <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
              <h3 className="font-mono text-sm font-bold text-red-500 dark:text-red-400 tracking-wider">
                NO INCLUYE (TRABAJO FUTURO)
              </h3>
            </div>
            <div className="space-y-2">
              {NO_INCLUYE.map((text, i) => (
                <div
                  key={i}
                  className="alc-exclude flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-500/5 border border-red-200/50 dark:border-red-500/10 hover:border-red-300 dark:hover:border-red-500/20 transition-all duration-300 opacity-0"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4 flex-shrink-0">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  <span className="text-muted dark:text-primary-lighter/70 text-xs md:text-sm">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
