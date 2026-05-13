"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger } from "animejs";

const PILLARS = [
  {
    title: "Desarrollo de software educativo",
    subtitle: "Software para mejorar el bienestar",
    color: "#f59e0b",
    colorLight: "rgba(245,158,11,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h4M7 11h2" />
      </svg>
    ),
  },
  {
    title: "Implementación de técnicas de cuidado",
    subtitle: "Enseñar cuidado, almacenamiento y aplicación",
    color: "#f97316",
    colorLight: "rgba(249,115,22,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M18 2l4 4M7.5 13.5L2 19l3 3 5.5-5.5M15 3l-8.5 8.5 6 6L21 9" />
        <line x1="10" y1="11" x2="8" y2="13" />
      </svg>
    ),
  },
  {
    title: "Acceso constante al software",
    subtitle: "Priorizar el acceso para poblaciones de riesgo",
    color: "#10b981",
    colorLight: "rgba(16,185,129,0.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function JustificacionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          runAnimations();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function runAnimations() {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    // Header
    tl.add(".just-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".just-underline", {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 600,
    }, 200);

    tl.add(".just-subtitle", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
    }, 400);

    // Bridge diagram
    // Left label
    tl.add(".bridge-left", {
      translateX: [-40, 0],
      opacity: [0, 1],
      duration: 700,
    }, 500);

    // Right label
    tl.add(".bridge-right", {
      translateX: [40, 0],
      opacity: [0, 1],
      duration: 700,
    }, 500);

    // Bridge line draws
    tl.add(".bridge-line", {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 900,
    }, 600);

    // Pillars rise up
    tl.add(".pillar-card", {
      translateY: [60, 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 700,
      delay: stagger(150),
    }, 800);

    // Pillar icons pop
    tl.add(".pillar-icon", {
      scale: [0, 1],
      rotate: [-15, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(150),
    }, 1100);

    // Bridge label
    tl.add(".bridge-center-label", {
      translateY: [15, 0],
      opacity: [0, 1],
      duration: 600,
    }, 1300);

    // Context paragraphs
    tl.add(".just-context", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(150),
    }, 1400);
  }

  // Continuous floating for pillar icons
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(".pillar-float", {
        translateY: [-4, 4, -4],
        duration: 3000,
        loop: true,
        ease: "inOutSine",
        delay: stagger(400),
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="justificacion"
      className="py-24 px-4 bg-gradient-to-b from-[#f0f6fb] to-white dark:from-[#0a1018] dark:to-[#060d14] tech-grid overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="just-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            Justificaci&oacute;n del Proyecto
          </h2>
          <div
            className="just-underline w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent mb-6 opacity-0"
            style={{ transformOrigin: "center" }}
          />
          <p className="just-subtitle text-muted dark:text-primary-lighter/60 max-w-2xl mx-auto opacity-0">
            Convergencia entre innovaci&oacute;n tecnol&oacute;gica y salud p&uacute;blica para transformar la educaci&oacute;n en insulinizaci&oacute;n
          </p>
        </div>

        {/* ── Bridge Diagram ── */}
        <div className="relative max-w-5xl mx-auto mb-20">
          {/* Bridge horizontal line */}
          <div className="relative flex items-center">
            {/* Left endpoint label */}
            <div className="bridge-left flex-shrink-0 text-right pr-4 md:pr-6 opacity-0">
              <span className="font-mono text-xs md:text-sm font-bold text-red-500 dark:text-red-400 leading-tight block">
                Mala educaci&oacute;n
              </span>
              <span className="font-mono text-xs md:text-sm font-bold text-red-500 dark:text-red-400 leading-tight block">
                en insulinizaci&oacute;n
              </span>
            </div>

            {/* Bridge line */}
            <div className="flex-1 relative">
              <div className="bridge-line h-0.5 bg-gradient-to-r from-red-400 via-primary-light to-emerald-400 opacity-0" style={{ transformOrigin: "left" }} />

              {/* Vertical connectors from pillars to line */}
              <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none">
                {PILLARS.map((_, i) => (
                  <div
                    key={i}
                    className="pillar-card w-0.5 h-6 opacity-0"
                    style={{ backgroundColor: PILLARS[i].color, opacity: 0 }}
                  />
                ))}
              </div>
            </div>

            {/* Right endpoint label */}
            <div className="bridge-right flex-shrink-0 text-left pl-4 md:pl-6 opacity-0">
              <span className="font-mono text-xs md:text-sm font-bold text-emerald-500 dark:text-emerald-400 leading-tight block">
                Mejor cumplimiento
              </span>
              <span className="font-mono text-xs md:text-sm font-bold text-emerald-500 dark:text-emerald-400 leading-tight block">
                del tratamiento
              </span>
            </div>
          </div>

          {/* Pillars — above the line */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {PILLARS.map((p, i) => (
              <div key={i} className="pillar-card opacity-0">
                <div
                  className="relative rounded-2xl p-6 border transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] group"
                  style={{
                    backgroundColor: p.colorLight,
                    borderColor: `${p.color}30`,
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-6 right-6 h-0.5 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />

                  {/* Icon */}
                  <div className="pillar-icon pillar-float flex justify-center mb-4 opacity-0">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${p.color}20`, color: p.color }}
                    >
                      {p.icon}
                    </div>
                  </div>

                  {/* Text */}
                  <h3
                    className="font-mono text-sm font-bold text-center mb-2 tracking-wide"
                    style={{ color: p.color }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-muted dark:text-primary-lighter/60 text-xs text-center leading-relaxed">
                    {p.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center label below pillars */}
          <div className="bridge-center-label text-center mt-6 opacity-0">
            <span className="inline-block font-mono text-xs md:text-sm text-muted dark:text-primary-lighter/50 tracking-wider px-4 py-2 rounded-full border border-primary-lighter/20 dark:border-white/10 bg-white/50 dark:bg-white/5">
              Experiencia inmersiva e interactiva
            </span>
          </div>
        </div>

        {/* ── Context Cards ── */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <div className="just-context opacity-0 relative bg-white dark:bg-white/5 rounded-xl p-6 border border-primary-lighter/30 dark:border-white/10 hover:shadow-[0_8px_30px_rgba(26,82,118,0.06)] transition-all duration-500 group">
            <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="font-mono text-[10px] text-red-500 dark:text-red-400 tracking-wider font-bold">PROBLEMA</span>
            </div>
            <p className="text-muted dark:text-primary-lighter/60 text-xs leading-relaxed">
              En Colombia, ~8.4% de la poblaci&oacute;n adulta vive con diabetes (FID, 2024).
              Errores en la t&eacute;cnica como reutilizaci&oacute;n de agujas o falta de rotaci&oacute;n
              provocan lipohipertrofia y afectan el control gluc&eacute;mico.
            </p>
          </div>

          <div className="just-context opacity-0 relative bg-white dark:bg-white/5 rounded-xl p-6 border border-primary-lighter/30 dark:border-white/10 hover:shadow-[0_8px_30px_rgba(26,82,118,0.06)] transition-all duration-500 group">
            <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary-light" />
              <span className="font-mono text-[10px] text-primary-light tracking-wider font-bold">INNOVACI&Oacute;N</span>
            </div>
            <p className="text-muted dark:text-primary-lighter/60 text-xs leading-relaxed">
              Convergencia entre tecnolog&iacute;a y salud p&uacute;blica. Software educativo
              inmersivo que fortalece la fundaci&oacute;n, mitiga la desinformaci&oacute;n y
              prioriza el acceso para poblaciones de riesgo.
            </p>
          </div>

          <div className="just-context opacity-0 relative bg-white dark:bg-white/5 rounded-xl p-6 border border-primary-lighter/30 dark:border-white/10 hover:shadow-[0_8px_30px_rgba(26,82,118,0.06)] transition-all duration-500 group">
            <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px] text-emerald-500 dark:text-emerald-400 tracking-wider font-bold">FORMACI&Oacute;N</span>
            </div>
            <p className="text-muted dark:text-primary-lighter/60 text-xs leading-relaxed">
              Aplicaci&oacute;n de competencias en Ingenier&iacute;a de Sistemas: dise&ntilde;o de software,
              interacci&oacute;n humano-computador y prototipado inmersivo con enfoque social
              para educaci&oacute;n en salud.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
