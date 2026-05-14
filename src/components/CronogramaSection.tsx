"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createTimeline, animate, stagger } from "animejs";

interface Activity {
  name: string;
  weeks: number[];
}

interface Phase {
  fase: string;
  nombre: string;
  color: string;
  colorBg: string;
  semanas: string;
  weekRange: [number, number];
  actividades: Activity[];
  entregable: string;
  icon: React.ReactNode;
}

const phases: Phase[] = [
  {
    fase: "FASE 1",
    nombre: "Requerimientos",
    color: "#60a5fa",
    colorBg: "rgba(96,165,250,0.12)",
    semanas: "Semanas 1 – 5",
    weekRange: [1, 5],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    actividades: [
      { name: "Revisión sistemática de literatura clínica y pedagógica sobre insulinización y sus errores.", weeks: [1, 2] },
      { name: "Entrevistas con profesionales de la Fundación Clínica para confirmación de requerimientos.", weeks: [2, 3] },
      { name: "Construcción de la propuesta final a desarrollar.", weeks: [3, 4] },
      { name: "Definición de controles del prototipo a través de los alcances del Gaze.", weeks: [4, 5] },
    ],
    entregable: "Documento formal de requerimientos clínicos, educativos, funcionales y no funcionales.",
  },
  {
    fase: "FASE 2",
    nombre: "Desarrollo",
    color: "#34d399",
    colorBg: "rgba(52,211,153,0.12)",
    semanas: "Semanas 4 – 15",
    weekRange: [4, 15],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
        <path d="M12 22V12M2 7l10 5 10-5" />
      </svg>
    ),
    actividades: [
      { name: "Diseño de arquitectura de la aplicación, configuración del entorno y reglas de GitHub.", weeks: [4, 6] },
      { name: "Desarrollo del diseño e implementación de los menús UX/UI del sistema.", weeks: [5, 7] },
      { name: "Modelado 3D de los elementos del proceso de insulinización y almacenamiento.", weeks: [6, 9] },
      { name: "Desarrollo de animaciones para los pasos a explicar al usuario.", weeks: [7, 9] },
      { name: "Desarrollo del controlador del usuario para interactividad de menús y entorno.", weeks: [8, 10] },
      { name: "Desarrollo del sonido que se usará en el entorno de enseñanza.", weeks: [9, 11] },
      { name: "Desarrollo de evaluación para validación de comprensión de conocimientos.", weeks: [10, 11] },
      { name: "Integración final y pruebas internas de usabilidad.", weeks: [11, 13] },
      { name: "Generación del primer APK.", weeks: [12, 12] },
      { name: "Reunión con asesores temáticos para revisión del prototipo y ajustes.", weeks: [13, 13] },
      { name: "Ajustes del prototipo según asesores temáticos.", weeks: [13, 13] },
      { name: "Generación del APK final.", weeks: [13, 14] },
      { name: "Desarrollo del manual de usuario.", weeks: [14, 14] },
    ],
    entregable: "APK ejecutable para Android / Google Cardboard + Manual de usuario.",
  },
  {
    fase: "FASE 3",
    nombre: "Validación",
    color: "#f59e0b",
    colorBg: "rgba(245,158,11,0.12)",
    semanas: "Semanas 15 – 18",
    weekRange: [15, 18],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    actividades: [
      { name: "Diseño del instrumento de evaluación para expertos en salud.", weeks: [15, 16] },
      { name: "Evaluación del prototipo por parte de los expertos de la Fundación.", weeks: [16, 17] },
      { name: "Documentación final de resultados obtenidos y conclusiones; presentación final.", weeks: [17, 18] },
    ],
    entregable: "Prototipo final validado, documentación final y presentación.",
  },
];

const TOTAL_WEEKS = 18;

export default function CronogramaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const fired = useRef(false);
  const [activePhase, setActivePhase] = useState(0);

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".crono-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".crono-underline", {
      scaleX: [0, 1],
      duration: 700,
    }, 200);

    tl.add(".crono-desc", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
    }, 400);

    tl.add(".crono-weekbar", {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 600,
    }, 500);

    tl.add(".crono-week-marker", {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 400,
      delay: stagger(40),
      ease: "outBack",
    }, 700);

    tl.add(".crono-phase-node", {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(150),
    }, 900);

    tl.add(".crono-detail-box", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
    }, 1200);

    tl.add(".crono-legend", {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 500,
    }, 1400);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
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

  // Animate activity cards when phase changes
  useEffect(() => {
    animate(".crono-activity-card", {
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 500,
      delay: stagger(50),
      ease: "outExpo",
    });
    animate(".crono-entregable", {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 600,
      delay: 300,
      ease: "outBack",
    });
  }, [activePhase]);

  const currentPhase = phases[activePhase];

  return (
    <section
      id="cronograma"
      className="py-24 px-4 bg-white dark:bg-[#060d14] tech-grid"
      ref={sectionRef}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="crono-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            Cronograma de Actividades
          </h2>
          <div
            className="crono-underline w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent mb-6"
            style={{ transformOrigin: "center", transform: "scaleX(0)" }}
          />
          <p className="crono-desc text-muted dark:text-primary-lighter/60 max-w-2xl mx-auto opacity-0">
            Plan de trabajo en 18 semanas, organizado en tres fases secuenciales
            con entregables verificables al cierre de cada etapa.
          </p>
        </div>

        {/* Week progress bar */}
        <div className="crono-weekbar mb-10 opacity-0">
          <div className="relative overflow-x-auto pb-2">
            <div className="relative min-w-[540px] h-12 flex items-end">
              {/* Track line */}
              <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary-lighter/20 dark:bg-white/10 rounded-full" />

              {/* Phase colored segments */}
              {phases.map((phase, i) => {
                const startPct = ((phase.weekRange[0] - 1) / TOTAL_WEEKS) * 100;
                const widthPct = ((phase.weekRange[1] - phase.weekRange[0] + 1) / TOTAL_WEEKS) * 100;
                return (
                  <div
                    key={i}
                    className="absolute bottom-0 h-[3px] rounded-full transition-opacity duration-400"
                    style={{
                      left: `${startPct}%`,
                      width: `${widthPct}%`,
                      backgroundColor: phase.color,
                      opacity: activePhase === i ? 1 : 0.2,
                    }}
                  />
                );
              })}

              {/* Week markers */}
              {Array.from({ length: TOTAL_WEEKS }, (_, i) => {
                const pct = ((i + 0.5) / TOTAL_WEEKS) * 100;
                const belongsToPhase = phases.findIndex(
                  (p) => i + 1 >= p.weekRange[0] && i + 1 <= p.weekRange[1]
                );
                const isActive = belongsToPhase === activePhase;
                return (
                  <div
                    key={i}
                    className="crono-week-marker absolute flex flex-col items-center -translate-x-1/2 opacity-0"
                    style={{ left: `${pct}%`, bottom: 0 }}
                  >
                    <span
                      className="text-[9px] font-mono font-medium mb-1 transition-all duration-300"
                      style={{
                        color: isActive
                          ? phases[belongsToPhase >= 0 ? belongsToPhase : 0].color
                          : "rgba(93,109,126,0.4)",
                      }}
                    >
                      S{i + 1}
                    </span>
                    <div
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300 mb-[-3px]"
                      style={{
                        backgroundColor: isActive
                          ? phases[belongsToPhase >= 0 ? belongsToPhase : 0].color
                          : "rgba(93,109,126,0.25)",
                        transform: isActive ? "scale(1.3)" : "scale(1)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Phase selector nodes - Detroit-style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-8">
          {phases.map((phase, i) => (
            <button
              key={i}
              onClick={() => setActivePhase(i)}
              className={`crono-phase-node relative group text-left p-5 rounded-xl border-2 transition-all duration-400 opacity-0 ${
                activePhase === i
                  ? "shadow-lg"
                  : "border-primary-lighter/20 dark:border-white/10 hover:border-primary-lighter/40 dark:hover:border-white/20"
              }`}
              style={{
                borderColor: activePhase === i ? phase.color : undefined,
                backgroundColor: activePhase === i ? phase.colorBg : undefined,
              }}
            >
              {/* Active glow */}
              {activePhase === i && (
                <div
                  className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${phase.color}, transparent 70%)`,
                  }}
                />
              )}

              <div className="relative z-10 flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: activePhase === i ? phase.color : phase.colorBg,
                    color: activePhase === i ? "#fff" : phase.color,
                  }}
                >
                  {phase.icon}
                </div>
                <div>
                  <span
                    className="text-[10px] font-bold tracking-[0.15em] uppercase"
                    style={{ color: phase.color }}
                  >
                    {phase.fase}
                  </span>
                  <h3 className="text-base font-semibold text-primary dark:text-primary-lighter mt-0.5">
                    {phase.nombre}
                  </h3>
                  <p className="text-[11px] text-muted/60 dark:text-primary-lighter/40 mt-1">
                    {phase.semanas} · {phase.actividades.length} actividades
                  </p>
                </div>
              </div>

              {/* Connector line between phases (desktop) */}
              {i < phases.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-[calc(0.5rem+1px)] w-[calc(1rem+2px)] h-[2px] bg-primary-lighter/20 dark:bg-white/10 -translate-y-1/2" />
              )}
            </button>
          ))}
        </div>

        {/* Flowchart detail area */}
        <div className="crono-detail-box rounded-2xl border border-primary-lighter/20 dark:border-white/10 bg-gradient-to-br from-primary-lighter/10 dark:from-primary/10 to-transparent p-6 md:p-8 opacity-0">
          {/* Phase header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary-lighter/15 dark:border-white/5">
            <div
              className="w-1.5 h-10 rounded-full"
              style={{ backgroundColor: currentPhase.color }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: currentPhase.color }}
                >
                  {currentPhase.fase}
                </span>
                <span className="text-[10px] text-muted/40 dark:text-primary-lighter/30 font-mono">
                  {currentPhase.semanas}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-primary dark:text-primary-lighter font-[family-name:var(--font-playfair)]">
                {currentPhase.nombre}
              </h3>
            </div>
          </div>

          {/* Activities flowchart */}
          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[18px] md:left-[22px] top-2 bottom-16 w-[2px] rounded-full"
              style={{ backgroundColor: currentPhase.color, opacity: 0.2 }}
            />

            <div className="space-y-2.5">
              {currentPhase.actividades.map((activity, i) => (
                <div
                  key={`${activePhase}-${i}`}
                  className="crono-activity-card relative flex items-start gap-3 md:gap-4 group opacity-0"
                >
                  {/* Node dot */}
                  <div className="relative flex-shrink-0 w-[38px] md:w-[46px] flex justify-center pt-3.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full border-2 z-10 bg-white dark:bg-[#060d14] transition-all duration-200 group-hover:scale-150"
                      style={{ borderColor: currentPhase.color }}
                    />
                    {/* Horizontal connector */}
                    <div
                      className="absolute top-[17px] left-[calc(50%+5px)] w-[calc(100%-50%-5px)] h-[1.5px]"
                      style={{ backgroundColor: currentPhase.color, opacity: 0.2 }}
                    />
                  </div>

                  {/* Activity card */}
                  <div className="flex-1 bg-white/50 dark:bg-white/[0.03] rounded-lg border border-primary-lighter/15 dark:border-white/[0.06] px-4 py-3 group-hover:border-primary-lighter/40 dark:group-hover:border-white/15 transition-all duration-300 group-hover:shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-primary dark:text-primary-lighter/80 leading-relaxed">
                        {activity.name}
                      </p>
                      <span
                        className="flex-shrink-0 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md whitespace-nowrap"
                        style={{
                          color: currentPhase.color,
                          backgroundColor: currentPhase.colorBg,
                        }}
                      >
                        S{activity.weeks[0]}
                        {activity.weeks[1] !== activity.weeks[0] && `–${activity.weeks[1]}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Entregable node */}
              <div
                key={`entregable-${activePhase}`}
                className="crono-entregable relative flex items-start gap-3 md:gap-4 opacity-0"
              >
                {/* Diamond marker */}
                <div className="relative flex-shrink-0 w-[38px] md:w-[46px] flex justify-center pt-3">
                  <div
                    className="w-3.5 h-3.5 rotate-45 z-10"
                    style={{
                      backgroundColor: currentPhase.color,
                      boxShadow: `0 0 12px ${currentPhase.color}40`,
                    }}
                  />
                </div>

                {/* Entregable card */}
                <div
                  className="flex-1 rounded-lg border-2 px-4 py-3 relative overflow-hidden"
                  style={{
                    borderColor: currentPhase.color,
                    backgroundColor: currentPhase.colorBg,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${currentPhase.color}, transparent 60%)`,
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <svg
                        viewBox="0 0 20 20"
                        fill={currentPhase.color}
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className="text-[11px] font-bold tracking-wide uppercase"
                        style={{ color: currentPhase.color }}
                      >
                        Entregable
                      </span>
                    </div>
                    <p className="text-sm font-medium text-primary dark:text-primary-lighter">
                      {currentPhase.entregable}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="crono-legend mt-8 flex flex-wrap justify-center gap-5 text-center opacity-0">
          {phases.map((phase, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: phase.color }}
              />
              <span className="text-xs text-muted/60 dark:text-primary-lighter/40">
                {phase.nombre}
              </span>
              <span className="text-[10px] font-mono text-muted/30 dark:text-primary-lighter/20">
                ({phase.actividades.length})
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rotate-45"
              style={{ backgroundColor: "#0ea5e9" }}
            />
            <span className="text-xs text-muted/60 dark:text-primary-lighter/40">
              Entregable
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
