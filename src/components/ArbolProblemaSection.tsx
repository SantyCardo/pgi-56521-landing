"use client";

import { useEffect, useRef, useCallback } from "react";
import { createTimeline, animate, stagger } from "animejs";

/* ── Data ── */
const efectos = [
  "Absorción errática, mayor variabilidad glucémica e incremento de hipoglucemias y HbA1c elevada.",
  "Descontrol glucémico progresivo y eventos adversos locales por administración inadecuada.",
  "Incremento de hospitalizaciones y deterioro de la calidad de vida.",
  "Aumento de mortalidad, carga económica e impacto social y familiar por control deficiente de la enfermedad.",
];

const consecuencias = [
  "Lipohipertrofia como complicación cutánea frecuente por técnica inadecuada.",
  "Aplicación incorrecta de la insulina, incluyendo errores en la técnica y manejo del dispositivo (Rosales-Meléndez et al., 2025).",
  "Control glucémico inadecuado, evidenciado en brechas en el seguimiento metabólico de los pacientes (Cuenta de Alto Costo, 2024).",
  "Mayor riesgo de complicaciones micro y macrovasculares, que impactan la calidad de vida y la carga del sistema de salud (OMS, 2022; FID, 2024).",
];

const problema =
  "En pacientes adultos con diabetes tipo 2 se presentan errores en la técnica de insulinización y miedo asociado al procedimiento, situación relacionada con deficiencias en los procesos educativos tradicionales en salud (FID, 2024; Rosales-Meléndez et al., 2025).";

const causasDirectas = [
  "Reutilización de agujas: Se genera hipertrofia y daño tisular en el paciente (Gentile et al., 2021).",
  "Educación práctica insuficiente sobre técnica de insulinización (FID, 2024).",
  "Miedo, ansiedad e inseguridad frente a la aplicación a causa de mitos y desinformación (FID, 2024; Rosales-Meléndez et al., 2025).",
  "Limitaciones de estrategias educativas convencionales para procedimientos complejos (Rosales-Meléndez et al., 2025).",
];

const causasIndirectas = [
  "La persistencia en la reutilización se relaciona con educación diabetológica insuficiente de la técnica en consulta (FID, 2024; Chen et al., 2021).",
  "Tiempo limitado en consulta, ausencia de programas estandarizados y falta de tecnologías interactivas (Cuenta de Alto Costo, 2024; FID, 2024; Rosales-Meléndez et al., 2025).",
  "Mitos sobre la insulina, escaso abordaje emocional y falta de práctica autónoma (FID, 2024; Rosales-Meléndez et al., 2025).",
  "Métodos pasivos, baja alfabetización en salud y ausencia de mecanismos de aprendizaje (Rosales-Meléndez et al., 2025; Cuenta de Alto Costo, 2024).",
];

/* ── Reusable pieces ── */

function LevelLabel({ label, color }: { label: string; color: string }) {
  return (
    <div className="arb-label flex-shrink-0 w-full md:w-40 opacity-0">
      <span
        className="inline-block text-xs md:text-sm font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border"
        style={{
          color,
          borderColor: `${color}40`,
          backgroundColor: `${color}10`,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function TreeCards({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((text, i) => (
        <div
          key={i}
          className="arb-card group relative bg-white dark:bg-white/5 rounded-xl p-4 border border-primary-lighter/30 dark:border-white/10 hover:shadow-[0_8px_30px_rgba(26,82,118,0.08)] transition-all duration-400 opacity-0"
        >
          <div
            className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: accent }}
          />
          <p className="text-muted dark:text-primary-lighter/60 text-xs md:text-sm leading-relaxed">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}

/* Vertical connector arrows */
function ConnectorArrows({ direction }: { direction: "up" | "down" }) {
  return (
    <div className="flex justify-center py-2">
      <div className="flex items-center gap-8 md:gap-16">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="arb-arrow flex flex-col items-center opacity-0">
            <svg
              width="16"
              height="28"
              viewBox="0 0 16 28"
              fill="none"
              className="text-primary-light/40 dark:text-primary-lighter/20"
            >
              {direction === "up" ? (
                <>
                  <path d="M8 28V4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 10L8 4L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </>
              ) : (
                <>
                  <path d="M8 0V24" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 18L8 24L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function ArbolProblemaSection() {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".arb-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".arb-line", {
      scaleX: [0, 1],
      duration: 700,
    }, 200);

    tl.add(".arb-subtitle", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
    }, 400);

    // Labels slide from left
    tl.add(".arb-label", {
      translateX: [-30, 0],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(120),
    }, 500);

    // Cards cascade in rows
    tl.add(".arb-card", {
      translateY: [25, 0],
      opacity: [0, 1],
      scale: [0.93, 1],
      duration: 600,
      delay: stagger(60),
      ease: "outExpo",
    }, 600);

    // Arrows draw in
    tl.add(".arb-arrow", {
      scaleY: [0, 1],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(80),
      ease: "outBack",
    }, 800);

    // Central problem card — dramatic
    tl.add(".arb-central", {
      scale: [0.85, 1],
      opacity: [0, 1],
      duration: 1000,
      ease: "outElastic(1, .8)",
    }, 700);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        runAnimation();
      }
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [runAnimation]);

  return (
    <section
      ref={ref}
      id="arbol-problema"
      className="py-24 px-4 bg-gradient-to-b from-white to-[#f0f6fb] dark:from-[#060d14] dark:to-[#0a1018] tech-grid"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="arb-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            &Aacute;rbol de Problema
          </h2>
          <div className="arb-line w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent mb-6" style={{ transformOrigin: "center", transform: "scaleX(0)" }} />
          <p className="arb-subtitle text-muted dark:text-primary-lighter/60 max-w-2xl mx-auto opacity-0">
            Relaci&oacute;n causal entre las deficiencias educativas y sus
            consecuencias en la insulinizaci&oacute;n
          </p>
        </div>

        {/* Tree */}
        <div className="space-y-2">
          {/* EFECTOS */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <LevelLabel label="Efectos" color="#e74c3c" />
            <TreeCards items={efectos} accent="#e74c3c" />
          </div>

          <ConnectorArrows direction="up" />

          {/* CONSECUENCIAS */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <LevelLabel label="Consecuencias" color="#e67e22" />
            <TreeCards items={consecuencias} accent="#e67e22" />
          </div>

          <ConnectorArrows direction="up" />

          {/* PROBLEMA CENTRAL */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <LevelLabel label="Problema" color="#1a5276" />
            <div className="arb-central flex-1 opacity-0">
              <div className="relative bg-primary/5 dark:bg-primary/15 rounded-2xl p-6 md:p-8 border-2 border-primary/30 dark:border-primary-light/20 shadow-[0_8px_30px_rgba(26,82,118,0.06)]">
                <div className="absolute -left-1 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-primary to-primary-light" />
                <p className="text-primary/90 dark:text-primary-lighter/80 text-sm md:text-base leading-relaxed font-medium">
                  {problema}
                </p>
              </div>
            </div>
          </div>

          <ConnectorArrows direction="up" />

          {/* CAUSAS DIRECTAS */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <LevelLabel label="Causas directas" color="#2980b9" />
            <TreeCards items={causasDirectas} accent="#2980b9" />
          </div>

          <ConnectorArrows direction="up" />

          {/* CAUSAS INDIRECTAS */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <LevelLabel label="Causas indirectas" color="#0ea5e9" />
            <TreeCards items={causasIndirectas} accent="#0ea5e9" />
          </div>
        </div>
      </div>
    </section>
  );
}
