"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createTimeline, animate, stagger } from "animejs";

const fases = [
  {
    num: "01",
    title: "Investigación y Análisis",
    desc: "Revisión sistemática de literatura clínica y pedagógica, entrevistas con profesionales de la Fundación y análisis de necesidades educativas en insulinización.",
    entregable: "Documento formal de requerimientos clínicos, educativos, funcionales y no funcionales.",
    color: "#60a5fa",
    glowRgb: "96,165,250",
    semanas: "Semanas 1 – 3",
    previewItems: [
      "Revisión de literatura clínica y pedagógica",
      "Entrevistas con profesionales de salud",
      "Análisis de errores frecuentes en insulinización",
      "Mapeo de necesidades educativas",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Diseño y Arquitectura",
    desc: "Definición de controles por Gaze, diseño de arquitectura de la aplicación, configuración del entorno y propuesta final del prototipo VR.",
    entregable: "Propuesta final de desarrollo + arquitectura del sistema.",
    color: "#a78bfa",
    glowRgb: "167,139,250",
    semanas: "Semanas 3 – 6",
    previewItems: [
      "Definición de controles por Gaze Tracking",
      "Arquitectura de la aplicación VR",
      "Configuración del entorno Unity + GitHub",
      "Diseño UX/UI de menús inmersivos",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
        <path d="M12 22V12M2 7l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Desarrollo e Implementación",
    desc: "Modelado 3D, animaciones, sonido inmersivo, sistema de evaluación interactiva, integración y generación del APK para Google Cardboard.",
    entregable: "APK ejecutable para Android / Google Cardboard + Manual de usuario.",
    color: "#34d399",
    glowRgb: "52,211,153",
    semanas: "Semanas 6 – 14",
    previewItems: [
      "Modelado 3D del proceso de insulinización",
      "Animaciones paso a paso para el usuario",
      "Sonido inmersivo del entorno de enseñanza",
      "Controlador de interactividad VR",
      "Sistema de evaluación de conocimientos",
      "Integración, pruebas y generación del APK",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Validación y Entrega",
    desc: "Evaluación del prototipo por expertos de la FOSUNAB, ajustes por retroalimentación, documentación final de resultados y presentación.",
    entregable: "Prototipo final validado + documentación de resultados y conclusiones.",
    color: "#f59e0b",
    glowRgb: "245,158,11",
    semanas: "Semanas 15 – 18",
    previewItems: [
      "Instrumento de evaluación para expertos",
      "Validación clínica con FOSUNAB",
      "Ajustes por retroalimentación médica",
      "Documentación final y presentación",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

/* ── HUD corner brackets ────────────────────────── */
function HudCorners({ color }: { color: string }) {
  const b = "absolute pointer-events-none";
  const s = { borderColor: `${color}70` };
  return (
    <>
      <div className={`${b} top-0 left-0 w-5 h-5 border-t-2 border-l-2`} style={s} />
      <div className={`${b} top-0 right-0 w-5 h-5 border-t-2 border-r-2`} style={s} />
      <div className={`${b} bottom-0 left-0 w-5 h-5 border-b-2 border-l-2`} style={s} />
      <div className={`${b} bottom-0 right-0 w-5 h-5 border-b-2 border-r-2`} style={s} />
    </>
  );
}

/* ═══════════════════════════════════════════════════ */
export default function MetodologiaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const fired = useRef(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const prev = useRef<number | null>(null);

  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Entry animation ──────────────────────── */
  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.add(".met-title", { translateY: [40, 0], opacity: [0, 1], duration: 800 }, 0);
    tl.add(".met-line", { scaleX: [0, 1], duration: 700 }, 200);
    tl.add(".met-desc", { translateY: [20, 0], opacity: [0, 1], duration: 600 }, 400);
    tl.add(".met-spine", { scaleY: [0, 1], duration: 1400, ease: "inOutQuad" }, 600);
    tl.add(".met-node", { scale: [0, 1], opacity: [0, 1], duration: 500, delay: stagger(180), ease: "outBack" }, 900);
    tl.add(".met-card-l", { translateX: [-50, 0], opacity: [0, 1], duration: 800, delay: stagger(200) }, 1000);
    tl.add(".met-card-r", { translateX: [50, 0], opacity: [0, 1], duration: 800, delay: stagger(200) }, 1000);
    tl.add(".met-hint", { opacity: [0, 0.6], duration: 800 }, 2200);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !fired.current) { fired.current = true; runAnimation(); } },
      { threshold: 0.06 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [runAnimation]);

  /* ── Hover animation ──────────────────────── */
  useEffect(() => {
    const p = prev.current;

    // --- animate OUT previous ---
    if (p !== null && p !== hovered) {
      const pEl = previewRefs.current[p];
      const lEl = lineRefs.current[p];
      const nEl = nodeRefs.current[p];
      if (pEl) animate(pEl, { opacity: 0, scale: 0.9, filter: "blur(12px)", duration: 250, ease: "inExpo" });
      if (lEl) animate(lEl, { scaleX: 0, duration: 280, delay: 40, ease: "inExpo" });
      if (nEl) animate(nEl, { scale: 1, boxShadow: "0 0 0px rgba(0,0,0,0)", duration: 280 });
    }

    // --- animate IN current ---
    if (hovered !== null) {
      const fase = fases[hovered];
      const isLeft = hovered % 2 === 0;
      const nEl = nodeRefs.current[hovered];
      const lEl = lineRefs.current[hovered];
      const pEl = previewRefs.current[hovered];

      if (nEl) {
        animate(nEl, {
          scale: [1, 1.8],
          boxShadow: `0 0 28px rgba(${fase.glowRgb},0.8), 0 0 70px rgba(${fase.glowRgb},0.3)`,
          duration: 420,
          ease: "outExpo",
        });
      }
      if (lEl) {
        animate(lEl, {
          scaleX: [0, 1],
          duration: 480,
          ease: "outExpo",
        });
      }
      if (pEl) {
        animate(pEl, {
          opacity: [0, 1],
          translateX: [isLeft ? 35 : -35, 0],
          scale: [0.9, 1],
          filter: ["blur(12px)", "blur(0px)"],
          duration: 550,
          delay: 200,
          ease: "outExpo",
        });
        // slow zoom on glow bg
        const bg = pEl.querySelector(".preview-bg") as HTMLElement | null;
        if (bg) animate(bg, { scale: [1, 1.15], duration: 8000, ease: "linear" });
      }
    }

    prev.current = hovered;
  }, [hovered]);

  /* ════════════════  RENDER  ════════════════ */
  return (
    <section
      ref={sectionRef}
      id="metodologia"
      className="relative py-28 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040810 0%, #08111c 50%, #040810 100%)" }}
    >
      {/* ── Grid background ─────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,165,233,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,.35) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 700px 500px at 15% 20%, rgba(96,165,250,0.05), transparent)," +
            "radial-gradient(ellipse 700px 500px at 85% 80%, rgba(167,139,250,0.04), transparent)",
        }}
      />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* ── Header ───────────────────────── */}
        <div className="text-center mb-20">
          <h2 className="met-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-4 opacity-0">
            Metodología de Desarrollo
          </h2>
          <div
            className="met-line w-16 h-1 mx-auto rounded-full mb-6"
            style={{ background: "linear-gradient(90deg, #60a5fa, #a78bfa, #34d399, #f59e0b)", transformOrigin: "center", transform: "scaleX(0)" }}
          />
          <p className="met-desc text-slate-400 max-w-2xl mx-auto opacity-0">
            Proceso de desarrollo en 4 fases secuenciales con enfoque ágil,
            orientado a alcanzar un nivel de madurez tecnológica TRL&nbsp;4.
          </p>
        </div>

        {/* ═══ DESKTOP: alternating timeline ═══ */}
        <div className="hidden md:block relative">
          {/* Central vertical spine */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06]">
            <div
              className="met-spine absolute inset-x-0 top-0 h-full"
              style={{
                background: "linear-gradient(180deg, #60a5fa30, #a78bfa30, #34d39930, #f59e0b30)",
                transformOrigin: "top",
                transform: "scaleY(0)",
              }}
            />
          </div>

          <div className="space-y-20">
            {fases.map((fase, i) => {
              const isLeft = i % 2 === 0;
              const active = hovered === i;
              const cardCls = isLeft ? "met-card-l" : "met-card-r";

              return (
                <div key={i} className="relative" style={{ minHeight: 220 }}>
                  <div className="grid grid-cols-[1fr_72px_1fr] items-center">
                    {/* ── LEFT COLUMN ───────────── */}
                    <div className="flex justify-end pr-10">
                      {isLeft ? (
                        <PhaseCard fase={fase} active={active} cls={cardCls}
                          onEnter={() => setHovered(i)} onLeave={() => setHovered(null)} />
                      ) : (
                        <div
                          ref={(el) => { previewRefs.current[i] = el; }}
                          className="max-w-sm w-full opacity-0 pointer-events-none"
                          style={{ transform: "translateX(-35px) scale(0.9)", filter: "blur(12px)" }}
                        >
                          <PreviewPanel fase={fase} />
                        </div>
                      )}
                    </div>

                    {/* ── CENTER NODE ───────────── */}
                    <div className="flex items-center justify-center">
                      <div
                        ref={(el) => { nodeRefs.current[i] = el; }}
                        className="met-node relative z-20 w-[14px] h-[14px] rounded-full opacity-0"
                        style={{ backgroundColor: fase.color }}
                      />
                    </div>

                    {/* ── RIGHT COLUMN ──────────── */}
                    <div className="flex justify-start pl-10">
                      {!isLeft ? (
                        <PhaseCard fase={fase} active={active} cls={cardCls}
                          onEnter={() => setHovered(i)} onLeave={() => setHovered(null)} />
                      ) : (
                        <div
                          ref={(el) => { previewRefs.current[i] = el; }}
                          className="max-w-sm w-full opacity-0 pointer-events-none"
                          style={{ transform: "translateX(35px) scale(0.9)", filter: "blur(12px)" }}
                        >
                          <PreviewPanel fase={fase} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── Neon connector line ─────── */}
                  <div
                    ref={(el) => { lineRefs.current[i] = el; }}
                    className="absolute top-1/2 -translate-y-1/2 h-[2px] z-10 pointer-events-none"
                    style={{
                      ...(isLeft
                        ? { left: "calc(50% + 14px)", right: "60px", transformOrigin: "left" }
                        : { right: "calc(50% + 14px)", left: "60px", transformOrigin: "right" }),
                      transform: "scaleX(0)",
                      background: `linear-gradient(${isLeft ? "90deg" : "270deg"}, ${fase.color}, ${fase.color}15)`,
                      boxShadow: `0 0 10px rgba(${fase.glowRgb},0.5), 0 0 30px rgba(${fase.glowRgb},0.15)`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          <p className="met-hint text-center text-slate-600 text-[11px] mt-14 opacity-0 tracking-[0.25em] uppercase">
            Hover sobre cada fase para explorar detalles
          </p>
        </div>

        {/* ═══ MOBILE: simple vertical ═══ */}
        <div className="md:hidden relative space-y-6">
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-white/[0.08]" />
          {fases.map((fase, i) => (
            <div key={i} className="relative flex items-start gap-5 pl-1">
              <div
                className="met-node relative z-10 flex-shrink-0 w-[14px] h-[14px] mt-6 rounded-full opacity-0"
                style={{ backgroundColor: fase.color, boxShadow: `0 0 12px rgba(${fase.glowRgb},0.4)` }}
              />
              <div
                className={`${i % 2 === 0 ? "met-card-l" : "met-card-r"} flex-1 p-5 rounded-xl border border-white/[0.06] opacity-0`}
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <CardContent fase={fase} />

                {/* Inline preview on mobile */}
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <ul className="space-y-1.5">
                    {fase.previewItems.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: fase.color }} />
                        <span className="text-[11px] text-slate-500 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   Sub-components
   ══════════════════════════════════════════════════ */

function CardContent({ fase }: { fase: (typeof fases)[number] }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `rgba(${fase.glowRgb},0.12)`, color: fase.color }}
        >
          <div className="w-5 h-5">{fase.icon}</div>
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: fase.color }}>
            FASE {fase.num}
          </span>
          <h3 className="text-[15px] font-semibold text-white leading-tight">{fase.title}</h3>
        </div>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed mb-3">{fase.desc}</p>
      <div className="flex items-center gap-2 mb-2">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 flex-shrink-0" style={{ color: fase.color }}>
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.5 3v4l3 1.5.5-.87-2.5-1.25V4h-1z" />
        </svg>
        <span className="text-[11px] text-slate-500 font-mono">{fase.semanas}</span>
      </div>
      <div className="flex items-start gap-2 text-xs">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: fase.color }}>
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.7 5.3a.75.75 0 00-1.06-1.06L7.5 8.38 5.86 6.74a.75.75 0 00-1.06 1.06l2.18 2.18a.75.75 0 001.06 0l3.66-3.68z" />
        </svg>
        <span className="text-slate-500 leading-relaxed">{fase.entregable}</span>
      </div>
    </>
  );
}

function PhaseCard({
  fase, active, cls, onEnter, onLeave,
}: {
  fase: (typeof fases)[number]; active: boolean; cls: string;
  onEnter: () => void; onLeave: () => void;
}) {
  return (
    <div
      className={`${cls} relative max-w-md w-full p-6 rounded-2xl border cursor-default transition-all duration-500 opacity-0 ${
        active ? "border-white/20" : "border-white/[0.06] hover:border-white/15"
      }`}
      style={{
        background: active
          ? `linear-gradient(135deg, rgba(${fase.glowRgb},0.1), rgba(${fase.glowRgb},0.02))`
          : "rgba(255,255,255,0.02)",
        boxShadow: active
          ? `0 0 50px rgba(${fase.glowRgb},0.08), inset 0 1px 0 rgba(${fase.glowRgb},0.12)`
          : "none",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <CardContent fase={fase} />
    </div>
  );
}

function PreviewPanel({ fase }: { fase: (typeof fases)[number] }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border"
      style={{
        background: "rgba(6,10,18,0.88)",
        backdropFilter: "blur(20px)",
        borderColor: `rgba(${fase.glowRgb},0.2)`,
        boxShadow: `0 0 40px rgba(${fase.glowRgb},0.08), inset 0 1px 0 rgba(${fase.glowRgb},0.1)`,
      }}
    >
      <HudCorners color={fase.color} />

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      {/* Slow-zoom glow bg */}
      <div className="preview-bg absolute inset-0 pointer-events-none" style={{ transformOrigin: "center" }}>
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 30% 40%, rgba(${fase.glowRgb},0.18), transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: fase.color, boxShadow: `0 0 8px rgba(${fase.glowRgb},0.7)` }}
          />
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase" style={{ color: fase.color }}>
            FASE {fase.num} — DETALLE
          </span>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `rgba(${fase.glowRgb},0.1)`, color: fase.color }}
          >
            <div className="w-9 h-9">{fase.icon}</div>
          </div>
        </div>

        {/* Activities */}
        <ul className="space-y-2 mb-4">
          {fase.previewItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5">
              <div className="w-1 h-1 rounded-full mt-[7px] flex-shrink-0" style={{ backgroundColor: fase.color }} />
              <span className="text-[12px] text-slate-400 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        {/* Entregable */}
        <div
          className="px-3 py-2.5 rounded-lg border text-[11px]"
          style={{
            borderColor: `rgba(${fase.glowRgb},0.2)`,
            backgroundColor: `rgba(${fase.glowRgb},0.05)`,
          }}
        >
          <span className="font-bold tracking-wider uppercase text-[9px]" style={{ color: fase.color }}>
            Entregable:{" "}
          </span>
          <span className="text-slate-400">{fase.entregable}</span>
        </div>
      </div>
    </div>
  );
}
