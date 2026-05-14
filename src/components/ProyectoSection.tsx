"use client";

import { useRef, useState, MouseEvent, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createTimeline, animate, stagger, utils } from "animejs";
import AnimatedCounter from "./AnimatedCounter";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`);
  };

  const handleLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      className={className}
      style={{ transform, transition: "transform 0.3s ease" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

/* ── SVG Medical Icons ── */
function SyringeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M18 2l4 4M7.5 13.5L2 19l3 3 5.5-5.5M15 3l-8.5 8.5 6 6L21 9" />
      <line x1="10" y1="11" x2="8" y2="13" />
      <line x1="13" y1="8" x2="11" y2="10" />
    </svg>
  );
}

function VRIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <rect x="2" y="7" width="20" height="10" rx="3" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
      <path d="M10 12h4" />
    </svg>
  );
}

function HeartPulseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M3 12h4l3-9 4 18 3-9h4" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const ORBITAL_ITEMS = [
  {
    icon: SyringeIcon,
    label: "Insulinización",
    title: "Técnica de Insulinización",
    desc: "Simulación del proceso completo: preparación del pen, selección de dosis, inyección subcutánea y desecho seguro de la aguja.",
    color: "#e74c3c",
  },
  {
    icon: VRIcon,
    label: "Realidad Virtual",
    title: "Experiencia VR Inmersiva",
    desc: "Entorno 3D con Google Cardboard, navegación por mirada (gaze) y 3 DOF. Sin controles externos ni internet.",
    color: "#2980b9",
  },
  {
    icon: HeartPulseIcon,
    label: "Salud",
    title: "Impacto en Salud",
    desc: "830M de personas con diabetes en el mundo. Reducción de ansiedad y mejor adherencia terapéutica mediante educación inmersiva.",
    color: "#1a5276",
  },
  {
    icon: ShieldIcon,
    label: "Seguridad",
    title: "Práctica sin Riesgo",
    desc: "El paciente practica tantas veces como necesite en un entorno seguro antes de la primera inyección real.",
    color: "#27ae60",
  },
  {
    icon: BookIcon,
    label: "Educación",
    title: "5 Lecciones Clínicas",
    desc: "Vía de administración, rotación de sitios, manejo de agujas, almacenamiento de insulina y tips del pen.",
    color: "#0ea5e9",
  },
  {
    icon: EyeIcon,
    label: "Inmersión",
    title: "Accesibilidad Local",
    desc: "APK offline sin internet. Distribución local en dispositivos Android, sin costos recurrentes ni servidores.",
    color: "#8e44ad",
  },
];

const STATS = [
  { num: "830M", label: "Personas con diabetes en el mundo (OMS)" },
  { num: "3M+", label: "Casos en Colombia (FID 2024)" },
  { num: "<55%", label: "Adherencia terapeutica en LMIC" },
  { num: "36%", label: "Pacientes con ansiedad asociada" },
];

export default function ProyectoSection() {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);
  const [rotation, setRotation] = useState(0);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const frameRef = useRef<number>(0);

  // Slow orbital rotation — pauses when node selected
  useEffect(() => {
    if (activeNode !== null) return;
    const tick = () => {
      setRotation((prev) => (prev + 0.08) % 360);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [activeNode]);

  const toggleNode = (i: number) => {
    if (activeNode === i) {
      setActiveNode(null);
    } else {
      setActiveNode(i);
      const targetAngle = (i / ORBITAL_ITEMS.length) * 360;
      setRotation(((270 - targetAngle) % 360 + 360) % 360);
    }
  };

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".proy-title", {
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 900,
      delay: stagger(80),
    }, 0);

    tl.add(".proy-line", {
      scaleX: [0, 1],
      duration: 800,
    }, 200);

    tl.add(".proy-text", {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(150),
    }, 400);

    // Orbital ring entrance
    tl.add(".proy-orbit", {
      scale: [0.6, 1],
      opacity: [0, 1],
      duration: 1200,
    }, 500);

    // SVG ring draw
    tl.add(".proy-ring-path", {
      strokeDashoffset: [utils.get(".proy-ring-path", "strokeDasharray") as unknown as number, 0],
      duration: 2000,
    }, 700);

    tl.add(".proy-stat", {
      translateY: [40, 0],
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 700,
      delay: stagger(100, { from: "center" }),
    }, 800);
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

  // Floating stats on loop
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(".stat-float", {
        translateY: [-3, 3, -3],
        duration: 4000,
        loop: true,
        ease: "inOutSine",
        delay: stagger(300),
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="proyecto"
      className="relative py-24 px-4 bg-white dark:bg-[#060d14] overflow-hidden tech-grid"
      ref={ref}
      onClick={() => setActiveNode(null)}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="proy-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            Acerca del Proyecto
          </h2>
          <div className="proy-line w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent" style={{ transformOrigin: "center", transform: "scaleX(0)" }} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="proy-text text-muted dark:text-primary-lighter/60 leading-relaxed mb-5 opacity-0">
              El proyecto propone un prototipo
              funcional de herramienta educativa inmersiva e interactiva mediante
              Realidad Virtual y Google Cardboard para enseñar la técnica de
              insulinización y el almacenamiento correcto de insulina a pacientes
              adultos con diabetes tipo 2 en Bucaramanga.
            </p>
            <p className="proy-text text-muted dark:text-primary-lighter/60 leading-relaxed mb-5 opacity-0">
              La insulinización requiere que el paciente se inyecte correctamente
              de forma autónoma. Sin embargo, la formación insuficiente genera
              lipohipertrofia, variabilidad glucémica, ansiedad y baja adherencia
              al tratamiento.
            </p>
            <p className="proy-text text-muted dark:text-primary-lighter/60 leading-relaxed opacity-0">
              Este prototipo ocupa la <strong className="text-primary dark:text-primary-lighter">intersección de tres dimensiones</strong> que
              ninguna solución existente cubre simultáneamente: educación en
              insulinización, experiencia inmersiva y accesibilidad local sin
              internet.
            </p>
          </div>

          {/* Orbital Carousel */}
          <div className="proy-orbit relative flex items-center justify-center opacity-0">
            <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
              {/* Pulsing center glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full animate-pulse"
                  style={{
                    background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
                    animationDuration: "3s",
                  }}
                />
              </div>

              {/* Orbit rings - SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 360">
                <circle
                  className="proy-ring-path"
                  cx="180"
                  cy="180"
                  r="135"
                  fill="none"
                  stroke="rgba(41,128,185,0.25)"
                  strokeWidth="1"
                  strokeDasharray="848"
                  strokeDashoffset="848"
                />
                <circle
                  className="proy-ring-path"
                  cx="180"
                  cy="180"
                  r="110"
                  fill="none"
                  stroke="rgba(14,165,233,0.2)"
                  strokeWidth="1"
                  strokeDasharray="691"
                  strokeDashoffset="691"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="85"
                  fill="none"
                  stroke="rgba(26,82,118,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
              </svg>

              {/* Center VR Headset */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-24 md:h-24">
                  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                    <rect x="30" y="65" width="140" height="70" rx="20" fill="#1a5276" />
                    <rect x="40" y="75" width="48" height="40" rx="10" fill="#2980b9" />
                    <circle cx="64" cy="95" r="12" fill="#d4e6f1" opacity="0.5" />
                    <circle cx="64" cy="95" r="5" fill="#ffffff" opacity="0.3" />
                    <rect x="112" y="75" width="48" height="40" rx="10" fill="#2980b9" />
                    <circle cx="136" cy="95" r="12" fill="#d4e6f1" opacity="0.5" />
                    <circle cx="136" cy="95" r="5" fill="#ffffff" opacity="0.3" />
                    <path d="M25 100 Q20 85 30 72" stroke="#1a5276" strokeWidth="5" fill="none" strokeLinecap="round" />
                    <path d="M175 100 Q180 85 170 72" stroke="#1a5276" strokeWidth="5" fill="none" strokeLinecap="round" />
                    <rect x="90" y="100" width="20" height="15" rx="5" fill="#0c2d42" />
                    <path d="M64 75 L64 45 M136 75 L136 45" stroke="#0ea5e9" strokeWidth="2" opacity="0.4" strokeDasharray="4 4">
                      <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
                    </path>
                  </svg>
                </div>
              </div>

              {/* Orbital nodes */}
              {ORBITAL_ITEMS.map((item, i) => {
                const angle = ((i / ORBITAL_ITEMS.length) * 360 + rotation) % 360;
                const radian = (angle * Math.PI) / 180;
                const radius = 130;
                const x = radius * Math.cos(radian);
                const y = radius * Math.sin(radian);
                const Icon = item.icon;
                const isActive = activeNode === i;

                return (
                  <div
                    key={i}
                    className="absolute cursor-pointer"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      zIndex: isActive ? 200 : Math.round(100 + 50 * Math.cos(radian)),
                      transition: "transform 0.7s ease",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleNode(i);
                    }}
                  >
                    {isActive && (
                      <div
                        className="absolute rounded-full animate-pulse"
                        style={{
                          background: `radial-gradient(circle, ${item.color}33 0%, transparent 70%)`,
                          width: 56,
                          height: 56,
                          left: -8,
                          top: -8,
                        }}
                      />
                    )}
                    <div
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group shadow-sm dark:shadow-none ${
                        isActive
                          ? "bg-white dark:bg-[#0c2d42] scale-125 shadow-lg"
                          : "bg-white/80 dark:bg-[#0c2d42]/80 hover:bg-primary-lighter/50 dark:hover:bg-primary/30"
                      }`}
                      style={{
                        borderWidth: 2,
                        borderColor: isActive ? item.color : "rgba(41,128,185,0.3)",
                        boxShadow: isActive ? `0 0 20px ${item.color}40` : undefined,
                      }}
                    >
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-accent" : "text-primary dark:text-primary-lighter/70 group-hover:text-accent"
                        }`}
                      />
                    </div>
                    <span
                      className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] md:text-[8px] tracking-wider transition-all duration-300 ${
                        isActive
                          ? "text-primary dark:text-primary-lighter scale-110"
                          : "text-muted dark:text-primary-lighter/40"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Detail card */}
            <AnimatePresence>
              {activeNode !== null && (
                <motion.div
                  key={activeNode}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-64 md:w-72 z-[300]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0, 1] }}
                >
                  <div className="relative bg-white/95 dark:bg-[#0c2d42]/95 backdrop-blur-md rounded-xl border border-primary-lighter/40 dark:border-white/10 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                    <div
                      className="absolute top-0 left-4 right-4 h-0.5 rounded-full"
                      style={{ backgroundColor: ORBITAL_ITEMS[activeNode].color }}
                    />
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-mono text-xs tracking-wider font-semibold text-primary dark:text-primary-lighter">
                        {ORBITAL_ITEMS[activeNode].title}
                      </h4>
                      <button
                        className="text-muted dark:text-primary-lighter/50 hover:text-primary dark:hover:text-primary-lighter transition-colors flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveNode(null);
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-muted dark:text-primary-lighter/60 text-xs leading-relaxed">
                      {ORBITAL_ITEMS[activeNode].desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {STATS.map((s, i) => (
            <div key={i} className="proy-stat stat-float opacity-0">
              <TiltCard className="text-center p-6 rounded-2xl bg-gradient-to-b from-primary-lighter/30 dark:from-primary/20 to-transparent border border-primary-lighter/20 dark:border-white/10 hover:border-primary-light/30 hover:shadow-[0_12px_40px_rgba(26,82,118,0.08)] transition-all duration-500 h-full flex flex-col items-center justify-center">
                <AnimatedCounter
                  target={s.num}
                  className="text-3xl md:text-4xl font-bold text-primary-light mb-1 block"
                />
                <div className="text-xs text-muted dark:text-primary-lighter/50 leading-snug">{s.label}</div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
