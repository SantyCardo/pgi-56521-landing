"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate, createTimeline, stagger, utils } from "animejs";

/* ── Starry Canvas ── */
function StarryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<
    Array<{
      x: number;
      y: number;
      r: number;
      baseAlpha: number;
      speed: number;
      offset: number;
    }>
  >([]);
  const frameRef = useRef<number>(0);

  const generate = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const count = Math.floor((c.width * c.height) / 2500);
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.2 + 0.2,
      baseAlpha: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.003 + 0.001,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = c.parentElement;
      if (!parent) return;
      c.width = parent.offsetWidth;
      c.height = parent.offsetHeight;
      generate();
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const s of starsRef.current) {
        const twinkle = Math.sin(t * s.speed + s.offset);
        const alpha = Math.max(
          0.05,
          Math.min(1, s.baseAlpha + twinkle * 0.15)
        );
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,230,241,${alpha})`;
        ctx.fill();
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [generate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-0 dark:opacity-100 transition-opacity duration-700"
    />
  );
}

/* ── Animated Grid Background ── */
function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(41,128,185,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(41,128,185,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage:
          "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 20%, transparent 70%)",
      }}
    />
  );
}

/* ── SVG Medical Icons for orbital ring ── */
function SyringeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      <path d="M18 2l4 4M7.5 13.5L2 19l3 3 5.5-5.5M15 3l-8.5 8.5 6 6L21 9" />
      <line x1="10" y1="11" x2="8" y2="13" />
      <line x1="13" y1="8" x2="11" y2="10" />
    </svg>
  );
}

function VRIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      <rect x="2" y="7" width="20" height="10" rx="3" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
      <path d="M10 12h4" />
    </svg>
  );
}

function HeartPulseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      <path d="M3 12h4l3-9 4 18 3-9h4" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
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

/* ── Main Hero ── */
export default function HeroTechnical() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const authorsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const techLabelsRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
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
      // Snap selected node to top (270°)
      const targetAngle = (i / ORBITAL_ITEMS.length) * 360;
      setRotation(((270 - targetAngle) % 360 + 360) % 360);
    }
  };

  // anime.js entrance animations
  useEffect(() => {
    const tl = createTimeline({
      defaults: { ease: "outExpo" },
    });

    // Corner frames slide in
    tl.add(
      ".corner-frame",
      {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(100),
      },
      0
    );

    // Top technical line draws in
    tl.add(
      ".tech-line-draw",
      {
        scaleX: [0, 1],
        opacity: [0, 0.6],
        duration: 800,
      },
      200
    );

    // Title words stagger in
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll(".title-word");
      tl.add(
        words,
        {
          translateY: [60, 0],
          opacity: [0, 1],
          duration: 900,
          delay: stagger(120),
        },
        400
      );
    }

    // Subtitle slides in
    if (subtitleRef.current) {
      tl.add(
        subtitleRef.current,
        {
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 800,
        },
        800
      );
    }

    // Decorative dots stagger
    tl.add(
      ".deco-dot",
      {
        scale: [0, 1],
        opacity: [0, 0.4],
        duration: 300,
        delay: stagger(15),
      },
      900
    );

    // Description fades in
    if (descRef.current) {
      tl.add(
        descRef.current,
        {
          translateY: [25, 0],
          opacity: [0, 1],
          duration: 700,
        },
        1100
      );
    }

    // Authors
    if (authorsRef.current) {
      tl.add(
        authorsRef.current,
        {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 700,
        },
        1300
      );
    }

    // CTA buttons
    if (ctaRef.current) {
      tl.add(
        ctaRef.current.children,
        {
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 600,
          delay: stagger(150),
        },
        1500
      );
    }

    // Tech labels at bottom
    tl.add(
      ".tech-label",
      {
        translateY: [15, 0],
        opacity: [0, 0.5],
        duration: 500,
        delay: stagger(80),
      },
      1600
    );

    // Orbital ring
    if (orbitRef.current) {
      tl.add(
        orbitRef.current,
        {
          scale: [0.6, 1],
          opacity: [0, 1],
          duration: 1200,
        },
        600
      );
    }

    // SVG line drawing for orbit ring
    tl.add(
      ".orbit-ring-path",
      {
        strokeDashoffset: [utils.get(".orbit-ring-path", "strokeDasharray") as unknown as number, 0],
        duration: 2000,
      },
      800
    );

    return () => {};
  }, []);

  // Pulsing glow animation loop
  useEffect(() => {
    animate(".pulse-glow", {
      opacity: [0.15, 0.35, 0.15],
      scale: [1, 1.05, 1],
      duration: 3000,
      loop: true,
      ease: "inOutSine",
    });

    animate(".float-particle", {
      translateY: [-15, 15, -15],
      opacity: [0.2, 0.5, 0.2],
      duration: 4000,
      delay: stagger(600),
      loop: true,
      ease: "inOutSine",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#f8fbfe] dark:bg-[#060d14]"
      onClick={() => setActiveNode(null)}
    >
      {/* Backgrounds */}
      <StarryCanvas />
      <GridBackground />

      {/* Gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.07] dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(26,82,118,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(41,128,185,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(14,165,233,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Light mode: floating clouds */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden opacity-100 dark:opacity-0 transition-opacity duration-700">
        <div className="absolute -top-10 left-[10%] w-[500px] h-[200px] rounded-full bg-primary-lighter/20 blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute top-[30%] right-[5%] w-[400px] h-[180px] rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
        <div className="absolute bottom-[20%] left-[20%] w-[350px] h-[150px] rounded-full bg-primary-light/10 blur-3xl animate-pulse" style={{ animationDuration: "12s", animationDelay: "4s" }} />
      </div>

      {/* Floating particles */}
      {[
        { top: "12%", left: "8%", size: 4 },
        { top: "22%", left: "85%", size: 3 },
        { top: "55%", left: "15%", size: 5 },
        { top: "70%", left: "78%", size: 3 },
        { top: "80%", left: "35%", size: 4 },
        { top: "35%", left: "92%", size: 3 },
      ].map((p, i) => (
        <div
          key={i}
          className="float-particle absolute rounded-full z-[2]"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: i % 2 === 0 ? "#0ea5e9" : "#d4e6f1",
            opacity: 0,
          }}
        />
      ))}

      {/* Corner Frame Accents */}
      <div
        className="corner-frame absolute top-3 left-3 md:top-4 md:left-4 w-8 h-8 md:w-14 md:h-14 z-20 opacity-0"
        style={{
          borderTop: "2px solid rgba(41,128,185,0.3)",
          borderLeft: "2px solid rgba(41,128,185,0.3)",
        }}
      />
      <div
        className="corner-frame absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-14 md:h-14 z-20 opacity-0"
        style={{
          borderTop: "2px solid rgba(41,128,185,0.3)",
          borderRight: "2px solid rgba(41,128,185,0.3)",
        }}
      />
      <div
        className="corner-frame absolute bottom-3 left-3 md:bottom-4 md:left-4 w-8 h-8 md:w-14 md:h-14 z-20 opacity-0"
        style={{
          borderBottom: "2px solid rgba(41,128,185,0.3)",
          borderLeft: "2px solid rgba(41,128,185,0.3)",
        }}
      />
      <div
        className="corner-frame absolute bottom-3 right-3 md:bottom-4 md:right-4 w-8 h-8 md:w-14 md:h-14 z-20 opacity-0"
        style={{
          borderBottom: "2px solid rgba(41,128,185,0.3)",
          borderRight: "2px solid rgba(41,128,185,0.3)",
        }}
      />

      {/* Top spacer for Navbar */}

      {/* Main content area */}
      <div className="relative z-10 flex flex-1 w-full max-w-7xl mx-auto items-center px-6 md:px-12 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Left: Text content */}
          <div className="max-w-xl">
            {/* Top decorative line */}
            <div
              ref={linesRef}
              className="flex items-center gap-2 mb-4"
            >
              <div className="tech-line-draw w-10 h-px bg-primary-light origin-left opacity-0" />
              <span className="font-mono text-primary-light/60 text-[10px] tracking-wider opacity-60">
                001
              </span>
              <div className="tech-line-draw flex-1 h-px bg-gradient-to-r from-primary-light/40 to-transparent origin-left opacity-0" />
            </div>

            {/* Dither pattern accent */}
            <div className="relative">
              <div
                className="hidden lg:block absolute -left-4 top-0 bottom-0 w-1 opacity-0 tech-line-draw"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(41,128,185,0.4) 2px, rgba(41,128,185,0.4) 3px)",
                  backgroundSize: "3px 5px",
                  opacity: 0.3,
                }}
              />

              {/* Title */}
              <h1
                ref={titleRef}
                className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-1"
              >
                <span className="title-word inline-block text-primary dark:text-primary-lighter opacity-0">
                  Insulinizaci&oacute;n
                </span>
                <br />
                <span
                  ref={subtitleRef}
                  className="inline-block text-primary-light mt-1 opacity-0"
                >
                  con Realidad Virtual
                </span>
              </h1>
            </div>

            {/* Decorative dots */}
            <div className="flex gap-1 my-4">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="deco-dot w-[3px] h-[3px] rounded-full bg-primary-light opacity-0"
                  style={{ transform: "scale(0)" }}
                />
              ))}
            </div>

            {/* Description */}
            <p
              ref={descRef}
              className="font-mono text-muted dark:text-primary-lighter/60 text-xs md:text-sm leading-relaxed mb-6 opacity-0"
            >
              Prototipo educativo inmersivo para el fortalecimiento de la
              t&eacute;cnica de aplicaci&oacute;n de insulina en pacientes
              adultos con diabetes tipo II
            </p>

            {/* Authors */}
            <div ref={authorsRef} className="space-y-1.5 mb-8 opacity-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-primary-light/40" />
                <span className="font-mono text-[10px] md:text-xs text-muted dark:text-primary-lighter/50 tracking-wider">
                  AUTORES
                </span>
              </div>
              <p className="font-mono text-xs md:text-sm text-primary/70 dark:text-primary-lighter/70 pl-8">
                Brayan Steven Le&oacute;n Martinez
              </p>
              <p className="font-mono text-xs md:text-sm text-primary/70 dark:text-primary-lighter/70 pl-8">
                Santiago Cardona Prada
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-px bg-primary-light/40" />
                <span className="font-mono text-[10px] md:text-xs text-muted dark:text-primary-lighter/50 tracking-wider">
                  DIRECTOR
                </span>
              </div>
              <p className="font-mono text-xs md:text-sm text-primary/70 dark:text-primary-lighter/70 pl-8">
                Leonardo Stiven Pardo Ni&ntilde;o
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3">
              <a
                href="#proyecto"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 font-mono text-xs md:text-sm text-primary dark:text-white border border-primary/40 dark:border-primary-light/60 hover:bg-primary-light hover:text-white hover:border-primary-light transition-all duration-300"
              >
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-primary-light opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-primary-light opacity-0 group-hover:opacity-100 transition-opacity" />
                EXPLORAR PROYECTO
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 3L8 13M3 8L8 13L13 8" />
                </svg>
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 font-mono text-xs md:text-sm text-muted dark:text-primary-lighter/70 border border-primary/15 dark:border-white/15 hover:bg-primary/5 dark:hover:bg-white/5 hover:border-primary/30 dark:hover:border-white/30 transition-all duration-300"
              >
                CONTACTO
              </a>
            </div>

            {/* Bottom technical notation */}
            <div className="hidden md:flex items-center gap-2 mt-8">
              <span className="tech-label font-mono text-[9px] text-primary/40 dark:text-primary-light/50 opacity-0">
                &infin;
              </span>
              <div className="tech-label flex-1 h-px bg-gradient-to-r from-primary/15 dark:from-white/15 to-transparent opacity-0" />
              <span className="tech-label font-mono text-[9px] text-primary/40 dark:text-primary-light/50 tracking-[0.15em] opacity-0">
                FUNDACI&Oacute;N CL&Iacute;NICA UNAB
              </span>
            </div>
          </div>

          {/* Right: Orbital visualization */}
          <div
            ref={orbitRef}
            className="relative flex items-center justify-center opacity-0"
          >
            <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
              {/* Pulsing center glow */}
              <div className="pulse-glow absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
                  }}
                />
              </div>

              {/* Orbit rings - SVG */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 420 420"
              >
                <circle
                  className="orbit-ring-path"
                  cx="210"
                  cy="210"
                  r="160"
                  fill="none"
                  stroke="rgba(41,128,185,0.25)"
                  strokeWidth="1"
                  strokeDasharray="1005"
                  strokeDashoffset="1005"
                />
                <circle
                  className="orbit-ring-path"
                  cx="210"
                  cy="210"
                  r="130"
                  fill="none"
                  stroke="rgba(14,165,233,0.2)"
                  strokeWidth="1"
                  strokeDasharray="817"
                  strokeDashoffset="817"
                />
                {/* Inner dashed ring */}
                <circle
                  cx="210"
                  cy="210"
                  r="100"
                  fill="none"
                  stroke="rgba(26,82,118,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
              </svg>

              {/* Center VR Headset SVG */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-28 md:h-28">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full"
                    fill="none"
                  >
                    <rect
                      x="30"
                      y="65"
                      width="140"
                      height="70"
                      rx="20"
                      fill="#1a5276"
                    />
                    <rect
                      x="40"
                      y="75"
                      width="48"
                      height="40"
                      rx="10"
                      fill="#2980b9"
                    />
                    <circle
                      cx="64"
                      cy="95"
                      r="12"
                      fill="#d4e6f1"
                      opacity="0.5"
                    />
                    <circle
                      cx="64"
                      cy="95"
                      r="5"
                      fill="#ffffff"
                      opacity="0.3"
                    />
                    <rect
                      x="112"
                      y="75"
                      width="48"
                      height="40"
                      rx="10"
                      fill="#2980b9"
                    />
                    <circle
                      cx="136"
                      cy="95"
                      r="12"
                      fill="#d4e6f1"
                      opacity="0.5"
                    />
                    <circle
                      cx="136"
                      cy="95"
                      r="5"
                      fill="#ffffff"
                      opacity="0.3"
                    />
                    <path
                      d="M25 100 Q20 85 30 72"
                      stroke="#1a5276"
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M175 100 Q180 85 170 72"
                      stroke="#1a5276"
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <rect
                      x="90"
                      y="100"
                      width="20"
                      height="15"
                      rx="5"
                      fill="#0c2d42"
                    />
                    <path
                      d="M64 75 L64 45 M136 75 L136 45"
                      stroke="#0ea5e9"
                      strokeWidth="2"
                      opacity="0.4"
                      strokeDasharray="4 4"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="8"
                        to="0"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              </div>

              {/* Orbital nodes */}
              {ORBITAL_ITEMS.map((item, i) => {
                const angle =
                  ((i / ORBITAL_ITEMS.length) * 360 + rotation) % 360;
                const radian = (angle * Math.PI) / 180;
                const radius = 155;
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
                    {/* Glow ring when active */}
                    {isActive && (
                      <div
                        className="absolute rounded-full animate-pulse"
                        style={{
                          background: `radial-gradient(circle, ${item.color}33 0%, transparent 70%)`,
                          width: 60,
                          height: 60,
                          left: -9,
                          top: -9,
                        }}
                      />
                    )}
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group shadow-sm dark:shadow-none ${
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
                        className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                          isActive ? "text-accent" : "text-primary dark:text-primary-lighter/70 group-hover:text-accent"
                        }`}
                      />
                    </div>
                    <span
                      className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] md:text-[9px] tracking-wider transition-all duration-300 ${
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

            {/* Detail card — appears on node click */}
            <AnimatePresence>
              {activeNode !== null && (
                <motion.div
                  key={activeNode}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 z-[300] max-sm:w-[90%]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0, 1] }}
                >
                  <div className="relative bg-white/95 dark:bg-[#0c2d42]/95 backdrop-blur-md rounded-xl border border-primary-lighter/40 dark:border-white/10 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                    {/* Color accent line */}
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
      </div>

      {/* Bottom Footer Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-primary/10 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 md:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-6 font-mono text-[8px] md:text-[9px] text-primary/40 dark:text-primary-lighter/40">
            <span>SYS.ACTIVE</span>
            <div className="hidden md:flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary-light/30"
                  style={{ height: `${4 + ((i * 7 + 3) % 12)}px` }}
                />
              ))}
            </div>
            <span>V1.0.0</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4 font-mono text-[8px] md:text-[9px] text-primary/40 dark:text-primary-lighter/40">
            <span className="hidden md:inline">
              &#x25D0; RENDERING
            </span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-accent/60 rounded-full animate-pulse" />
              <div
                className="w-1 h-1 bg-accent/40 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="w-1 h-1 bg-accent/20 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <span className="hidden md:inline">FRAME: &infin;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
