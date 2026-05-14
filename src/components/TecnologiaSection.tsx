"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createTimeline, animate, stagger } from "animejs";

/* ── Metodología timeline data ── */
const phases = [
  {
    tag: "Fase 1",
    title: "Planeación Clínica",
    desc: "Levantamiento de requerimientos médicos, educativos y UX junto a profesionales de salud especializados en insulinoterapia.",
    glow: "#e84393",
    shadow: "rgba(232,67,147,0.35)",
    previewTitle: "Investigación Clínica",
    previewDesc: "Revisión de literatura y entrevistas con profesionales de la FOSUNAB para definir requerimientos del prototipo educativo.",
    previewImage: "/images/fase1-preview.jpg",
  },
  {
    tag: "Fase 2",
    title: "Diseño GDD + UX",
    desc: "Construcción del Game Design Document, definición de navegación gaze, arquitectura de interacción y flujo inmersivo.",
    glow: "#f39c12",
    shadow: "rgba(243,156,18,0.35)",
    previewTitle: "Game Design Document",
    previewDesc: "Arquitectura de interacción, mecánicas gaze, flujo educativo y wireframes de la experiencia VR inmersiva.",
    previewImage: "/images/fase2-preview.jpg",
  },
  {
    tag: "Fase 3",
    title: "Desarrollo en Unity",
    desc: "Implementación técnica del prototipo utilizando Unity, Google Cardboard, audio guiado, escenas 3D y sistema gaze.",
    glow: "#f1c40f",
    shadow: "rgba(241,196,15,0.35)",
    previewTitle: "Prototipo Unity",
    previewDesc: "Modelado 3D, animaciones, audio guiado y sistema de evaluación interactiva integrados en el entorno inmersivo.",
    previewImage: "/images/fase3-preview.jpg",
  },
  {
    tag: "Fase 4",
    title: "Validación y Testing",
    desc: "Pruebas técnicas, evaluación clínica mediante escala Likert, SUS e Índice de Validez de Contenido (IVC ≥ 0.80).",
    glow: "#00cec9",
    shadow: "rgba(0,206,201,0.35)",
    previewTitle: "Evaluación Clínica",
    previewDesc: "Validación con expertos de la FOSUNAB mediante instrumentos SUS, Likert e IVC para garantizar calidad educativa.",
    previewImage: "/images/fase4-preview.jpg",
  },
];

/* ── HUD corner brackets ── */
function HudCorners({ color }: { color: string }) {
  const b = "absolute pointer-events-none";
  const s = { borderColor: `${color}70` };
  return (
    <>
      <div className={`${b} top-0 left-0 w-4 h-4 border-t-2 border-l-2`} style={s} />
      <div className={`${b} top-0 right-0 w-4 h-4 border-t-2 border-r-2`} style={s} />
      <div className={`${b} bottom-0 left-0 w-4 h-4 border-b-2 border-l-2`} style={s} />
      <div className={`${b} bottom-0 right-0 w-4 h-4 border-b-2 border-r-2`} style={s} />
    </>
  );
}

/* ── GDD cards data ── */
const gddCards = [
  {
    title: "Core Loop",
    desc: "Observar → interactuar → practicar → responder → retroalimentación inmediata.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M21 12a9 9 0 11-6.22-8.56" />
        <path d="M21 3v5h-5" />
      </svg>
    ),
  },
  {
    title: "Mecánica Gaze",
    desc: "Navegación basada en mirada con temporizador visual optimizado para Google Cardboard.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Flujo Educativo",
    desc: "Lecciones cortas de 15–20 minutos enfocadas en técnica segura de insulinización.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <path d="M8 7h8M8 11h6" />
      </svg>
    ),
  },
  {
    title: "Arquitectura Técnica",
    desc: "Unity + Android APK + interacción 3DOF + ejecución offline.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
  },
  {
    title: "Feedback Clínico",
    desc: "Evaluación mediante médicos expertos utilizando SUS, Likert e IVC.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Accesibilidad",
    desc: "Diseño pensado para pacientes con baja alfabetización digital y contextos de bajos recursos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="8" r="1.5" fill="currentColor" />
        <path d="M12 11v1l3 4M12 12l-3 4M8.5 11.5h7" />
      </svg>
    ),
  },
];

/* ── Stack Tecnológico data ── */
const stackItems = [
  {
    name: "Unity",
    desc: "Motor de desarrollo 3D inmersivo",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M10.4 0L1.6 5.2v10.4L4 17.2l5.2-3v-6L14.4 5l5.2 3.2v6L22.4 16V5.2L13.6 0l-3.2 2 3.2 1.8-3.2 1.8-3.2-1.8L10.4 2v-2z" />
        <path d="M4 17.2l3.2 1.8 3.2-1.8V14l-3.2 1.8L4 14v3.2z" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: "Google Cardboard",
    desc: "Visor VR accesible y de bajo costo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-6 h-6">
        <rect x="2" y="7" width="20" height="10" rx="3" />
        <circle cx="8" cy="12" r="2.5" />
        <circle cx="16" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    name: "Android APK Offline",
    desc: "Ejecución sin conexión a internet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    name: "Gaze Interaction",
    desc: "Control por mirada sin mandos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="8" strokeDasharray="4 3" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
  },
];

/* ── Shared glassmorphism style ── */
const glass = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.06)",
} as const;

export default function TecnologiaSection() {
  const ref = useRef<HTMLElement>(null);
  const gddRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const fired = useRef(false);
  const gddFired = useRef(false);
  const stackFired = useRef(false);

  /* ── Hover state for HUD preview ── */
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const prevHovered = useRef<number | null>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeGlowRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Timeline animations ── */
  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".mdev-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".mdev-subtitle", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
    }, 300);

    tl.add(".mdev-line", {
      scaleY: [0, 1],
      duration: 1400,
      ease: "inOutQuad",
    }, 500);

    tl.add(".mdev-node", {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(180),
      ease: "outBack",
    }, 700);

    tl.add(".mdev-card", {
      translateX: (_: unknown, i: number) => [i % 2 === 0 ? -60 : 60, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(180),
    }, 800);

    tl.add(".mdev-quote", {
      translateY: [30, 0],
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 900,
    }, 2000);
  }, []);

  /* ── GDD animations ── */
  const runGddAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".gdd-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".gdd-subtitle", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
    }, 300);

    tl.add(".gdd-card", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(120),
    }, 500);
  }, []);

  /* ── Stack animations ── */
  const runStackAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".stack-title", {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 700,
    }, 0);

    tl.add(".stack-item", {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(100),
    }, 300);
  }, []);

  /* ── Intersection observers ── */
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

  useEffect(() => {
    const el = gddRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !gddFired.current) {
        gddFired.current = true;
        runGddAnimation();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [runGddAnimation]);

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !stackFired.current) {
        stackFired.current = true;
        runStackAnimation();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [runStackAnimation]);

  /* ── Floating node pulse ── */
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(".mdev-node", {
        scale: [1, 1.15, 1],
        duration: 3000,
        loop: true,
        ease: "inOutSine",
        delay: stagger(300),
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  /* ── HUD hover animation ── */
  useEffect(() => {
    const p = prevHovered.current;

    // Animate OUT previous
    if (p !== null && p !== hoveredPhase) {
      const prevPreview = previewRefs.current[p];
      const prevLine = lineRefs.current[p];
      const prevGlow = nodeGlowRefs.current[p];
      if (prevPreview) animate(prevPreview, { opacity: 0, scale: 0.9, filter: "blur(12px)", duration: 250, ease: "inExpo" });
      if (prevLine) animate(prevLine, { scaleX: 0, duration: 280, delay: 40, ease: "inExpo" });
      if (prevGlow) animate(prevGlow, { opacity: 0, scale: 0.5, duration: 250 });
    }

    // Animate IN current
    if (hoveredPhase !== null) {
      const phase = phases[hoveredPhase];
      const isLeft = hoveredPhase % 2 === 0;
      const lineEl = lineRefs.current[hoveredPhase];
      const previewEl = previewRefs.current[hoveredPhase];
      const glowEl = nodeGlowRefs.current[hoveredPhase];

      if (glowEl) {
        animate(glowEl, {
          opacity: [0, 1],
          scale: [0.5, 1],
          duration: 400,
          ease: "outExpo",
        });
      }
      if (lineEl) {
        animate(lineEl, {
          scaleX: [0, 1],
          duration: 480,
          ease: "outExpo",
        });
      }
      if (previewEl) {
        animate(previewEl, {
          opacity: [0, 1],
          translateX: [isLeft ? 30 : -30, 0],
          scale: [0.9, 1],
          filter: ["blur(12px)", "blur(0px)"],
          duration: 550,
          delay: 200,
          ease: "outExpo",
        });
        // slow zoom on preview image
        const img = previewEl.querySelector(".preview-zoom") as HTMLElement | null;
        if (img) animate(img, { scale: [1, 1.08], duration: 6000, ease: "linear" });
      }
    }

    prevHovered.current = hoveredPhase;
  }, [hoveredPhase]);

  return (
    <section
      id="metodologia-dev"
      ref={ref}
      className="relative py-28 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050B14 0%, #08111F 100%)" }}
    >
      {/* Glowing grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,206,201,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,206,201,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* ════════════════════════════════════════════
            SECTION 1 — METODOLOGÍA DE DESARROLLO
            ════════════════════════════════════════════ */}

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="mdev-title font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold text-white mb-5 opacity-0">
            Metodología de Desarrollo
          </h2>
          <p className="mdev-subtitle text-[#8ea8c3] max-w-2xl mx-auto text-base md:text-lg leading-relaxed opacity-0">
            Arquitectura de trabajo basada en desarrollo ágil, validación clínica y prototipado inmersivo en Unity.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central glowing line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
            <div className="absolute inset-0 bg-[#1a2a3a]" />
            <div
              className="mdev-line absolute inset-x-0 top-0 h-full"
              style={{
                background: "linear-gradient(180deg, #e84393, #f39c12, #f1c40f, #00cec9)",
                transformOrigin: "top",
                transform: "scaleY(0)",
                boxShadow: "0 0 12px rgba(0,206,201,0.3)",
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-20">
            {phases.map((phase, i) => {
              const isLeft = i % 2 === 0;
              const isHovered = hoveredPhase === i;

              return (
                <div
                  key={i}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Node + enhanced glow ring */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <div
                      ref={(el) => { nodeGlowRefs.current[i] = el; }}
                      className="absolute -inset-3 rounded-full opacity-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${phase.shadow}, transparent 70%)`,
                        boxShadow: `0 0 30px ${phase.shadow}, 0 0 60px ${phase.shadow}`,
                      }}
                    />
                    <div
                      className="mdev-node w-5 h-5 rounded-full opacity-0 relative z-10"
                      style={{
                        background: phase.glow,
                        boxShadow: `0 0 16px ${phase.shadow}, 0 0 40px ${phase.shadow}`,
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isLeft ? "md:pr-10 md:text-right" : "md:pl-10 md:ml-auto"
                    }`}
                  >
                    <div
                      className="mdev-card group relative rounded-2xl p-6 md:p-7 opacity-0 transition-all duration-500 hover:translate-y-[-2px]"
                      style={{
                        ...glass,
                        boxShadow: isHovered
                          ? `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 40px ${phase.shadow}`
                          : `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 0 ${phase.shadow}`,
                        borderColor: isHovered ? `${phase.glow}40` : undefined,
                      }}
                      onMouseEnter={(e) => {
                        setHoveredPhase(i);
                        (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 40px ${phase.shadow}`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${phase.glow}40`;
                      }}
                      onMouseLeave={(e) => {
                        setHoveredPhase(null);
                        (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 0 ${phase.shadow}`;
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                      }}
                    >
                      <span
                        className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                        style={{
                          background: `${phase.glow}20`,
                          color: phase.glow,
                          border: `1px solid ${phase.glow}40`,
                        }}
                      >
                        {phase.tag}
                      </span>
                      <h3 className="text-white font-semibold text-lg md:text-xl mb-2">
                        {phase.title}
                      </h3>
                      <p className="text-[#7a94ad] text-sm md:text-base leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  </div>

                  {/* ── Neon connector line (desktop only) ── */}
                  <div
                    ref={(el) => { lineRefs.current[i] = el; }}
                    className="hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] z-[5] pointer-events-none"
                    style={{
                      ...(isLeft
                        ? { left: "calc(50% + 16px)", right: "calc(50% - 50% + 40px)", transformOrigin: "left" }
                        : { right: "calc(50% + 16px)", left: "calc(50% - 50% + 40px)", transformOrigin: "right" }),
                      transform: "scaleX(0)",
                      background: `linear-gradient(${isLeft ? "90deg" : "270deg"}, ${phase.glow}, ${phase.glow}10)`,
                      boxShadow: `0 0 10px ${phase.shadow}, 0 0 30px ${phase.shadow}`,
                    }}
                  />

                  {/* ── HUD Preview panel (opposite side, desktop only) ── */}
                  <div
                    className={`hidden md:block ${
                      isLeft ? "md:w-[calc(50%-5rem)] md:ml-auto" : "md:w-[calc(50%-5rem)]"
                    }`}
                  >
                    <div
                      ref={(el) => { previewRefs.current[i] = el; }}
                      className="opacity-0 pointer-events-none"
                      style={{
                        transform: `translateX(${isLeft ? "30px" : "-30px"}) scale(0.9)`,
                        filter: "blur(12px)",
                      }}
                    >
                      <div
                        className="relative rounded-xl overflow-hidden"
                        style={{
                          background: "rgba(6,10,20,0.9)",
                          backdropFilter: "blur(20px)",
                          border: `1px solid ${phase.glow}30`,
                          boxShadow: `0 0 30px ${phase.shadow}, inset 0 1px 0 ${phase.glow}15`,
                        }}
                      >
                        <HudCorners color={phase.glow} />

                        {/* Scan lines overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                          }}
                        />

                        {/* Image area */}
                        <div className="relative h-36 overflow-hidden">
                          <div
                            className="preview-zoom absolute inset-0"
                            style={{
                              background: `linear-gradient(135deg, ${phase.glow}25, ${phase.glow}08)`,
                              transformOrigin: "center",
                            }}
                          />
                          {/* Placeholder icon when no image */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className="w-16 h-16 rounded-2xl flex items-center justify-center opacity-30"
                              style={{ border: `1px solid ${phase.glow}40` }}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke={phase.glow} strokeWidth="1" className="w-8 h-8">
                                <rect x="3" y="3" width="18" height="18" rx="3" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                              </svg>
                            </div>
                          </div>
                          {/* Gradient fade at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[rgba(6,10,20,0.9)] to-transparent" />
                        </div>

                        {/* Text content */}
                        <div className="relative z-10 px-4 pb-4 pt-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: phase.glow, boxShadow: `0 0 6px ${phase.shadow}` }}
                            />
                            <span
                              className="text-[9px] font-bold tracking-[0.25em] uppercase"
                              style={{ color: phase.glow }}
                            >
                              {phase.previewTitle}
                            </span>
                          </div>
                          <p className="text-[12px] text-[#8ea8c3] leading-relaxed">
                            {phase.previewDesc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom quote */}
        <div
          className="mdev-quote mt-20 rounded-2xl p-8 md:p-10 text-center opacity-0"
          style={{
            background: "rgba(0,206,201,0.05)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(0,206,201,0.15)",
            boxShadow: "0 0 40px rgba(0,206,201,0.08)",
          }}
        >
          <p className="text-white/90 italic text-lg md:text-xl leading-relaxed font-[family-name:var(--font-playfair)]">
            &ldquo;La eficacia del aprendizaje inmersivo depende de la accesibilidad, claridad clínica y mejora iterativa constante.&rdquo;
          </p>
        </div>

        {/* ════════════════════════════════════════════
            SECTION 2 — GAME DESIGN DOCUMENT (GDD)
            ════════════════════════════════════════════ */}

        <div id="tecnologia" ref={gddRef} className="mt-32">
          {/* GDD Header */}
          <div className="text-center mb-16">
            <h2 className="gdd-title font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold text-white mb-5 opacity-0">
              Mecánicas y Flujo
            </h2>
            <p className="gdd-subtitle text-[#8ea8c3] max-w-2xl mx-auto text-base md:text-lg leading-relaxed opacity-0">
              Estructura funcional y narrativa del prototipo inmersivo para enseñanza de insulinización.
            </p>
          </div>

          {/* GDD Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gddCards.map((card, i) => (
              <div
                key={i}
                className="gdd-card group relative rounded-2xl p-6 md:p-7 opacity-0 transition-all duration-500 hover:translate-y-[-3px]"
                style={{
                  ...glass,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(0,206,201,0.2)";
                  el.style.borderColor = "rgba(0,206,201,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05)";
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[#00cec9] transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(0,206,201,0.08)",
                    border: "1px solid rgba(0,206,201,0.15)",
                  }}
                >
                  {card.icon}
                </div>

                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#00cec9] transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-[#7a94ad] text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            BOTTOM — STACK TECNOLÓGICO
            ════════════════════════════════════════════ */}

        <div ref={stackRef} className="mt-28">
          <h3 className="stack-title text-center font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-12 opacity-0">
            Stack Tecnológico
          </h3>

          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {stackItems.map((item, i) => (
              <div
                key={i}
                className="stack-item group flex flex-col items-center text-center w-36 md:w-40 rounded-2xl p-5 opacity-0 transition-all duration-500 hover:translate-y-[-3px]"
                style={{
                  ...glass,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 0 rgba(0,206,201,0)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 25px rgba(0,206,201,0.15)";
                  el.style.borderColor = "rgba(0,206,201,0.2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 0 rgba(0,206,201,0)";
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <div className="text-[#00cec9] mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="text-white text-sm font-semibold mb-1">{item.name}</span>
                <span className="text-[#5d7a94] text-xs leading-snug">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
