"use client";

import { useEffect, useRef, useCallback } from "react";
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

/* ── Detailed Insulin Pen SVG ── */
function InsulinPenSVG() {
  return (
    <svg viewBox="0 0 400 500" className="w-full h-full" fill="none">
      <defs>
        {/* Pen body gradient */}
        <linearGradient id="penBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a3a5c" />
          <stop offset="30%" stopColor="#2a5a8c" />
          <stop offset="50%" stopColor="#3a7ab8" />
          <stop offset="70%" stopColor="#2a5a8c" />
          <stop offset="100%" stopColor="#1a3a5c" />
        </linearGradient>
        {/* Cap gradient */}
        <linearGradient id="penCap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0c2d42" />
          <stop offset="40%" stopColor="#1a5276" />
          <stop offset="60%" stopColor="#1a5276" />
          <stop offset="100%" stopColor="#0c2d42" />
        </linearGradient>
        {/* Insulin liquid */}
        <linearGradient id="insulin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(14,165,233,0.05)" />
          <stop offset="100%" stopColor="rgba(14,165,233,0.2)" />
        </linearGradient>
        {/* Metallic needle */}
        <linearGradient id="needle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8899aa" />
          <stop offset="40%" stopColor="#d4dde6" />
          <stop offset="60%" stopColor="#e8eef4" />
          <stop offset="100%" stopColor="#8899aa" />
        </linearGradient>
        {/* Button gradient */}
        <linearGradient id="penButton" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0a1f33" />
          <stop offset="50%" stopColor="#163a5c" />
          <stop offset="100%" stopColor="#0a1f33" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="glowSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowStrong" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Reflection highlight */}
        <linearGradient id="highlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Ambient glow behind pen */}
      <ellipse cx="200" cy="250" rx="60" ry="200" fill="rgba(14,165,233,0.06)" filter="url(#glowStrong)" />

      {/* ── NEEDLE (fine 31G) ── */}
      {/* Needle shaft — thin and short like a real 31G x 5mm */}
      <rect x="198.5" y="87" width="3" height="23" rx="0.5" fill="url(#needle)" />
      {/* Needle tip */}
      <polygon points="200,81 198.5,87 201.5,87" fill="url(#needle)" />
      {/* Needle highlight */}
      <rect x="199.5" y="82" width="1" height="27" rx="0.5" fill="rgba(255,255,255,0.3)" />
      {/* Tiny drop */}
      <circle cx="200" cy="79" r="2" fill="rgba(14,165,233,0.4)" filter="url(#glowSoft)">
        <animate attributeName="r" values="2;3;2" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* ── NEEDLE HUB ── */}
      <rect x="186" y="108" width="28" height="22" rx="4" fill="#c0cdd8" stroke="#8899aa" strokeWidth="1" />
      <rect x="190" y="112" width="20" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      {/* Threading lines */}
      <line x1="186" y1="118" x2="214" y2="118" stroke="rgba(136,153,170,0.4)" strokeWidth="0.5" />
      <line x1="186" y1="122" x2="214" y2="122" stroke="rgba(136,153,170,0.4)" strokeWidth="0.5" />
      <line x1="186" y1="126" x2="214" y2="126" stroke="rgba(136,153,170,0.4)" strokeWidth="0.5" />

      {/* ── CARTRIDGE / WINDOW ── */}
      {/* Outer cartridge housing */}
      <rect x="181" y="130" width="38" height="120" rx="6" fill="url(#penBody)" stroke="rgba(14,165,233,0.15)" strokeWidth="1" />
      {/* Inner insulin window */}
      <rect x="187" y="138" width="26" height="100" rx="4" fill="rgba(14,165,233,0.05)" stroke="rgba(14,165,233,0.2)" strokeWidth="1" />
      {/* Insulin liquid level */}
      <rect x="188" y="168" width="24" height="69" rx="3" fill="url(#insulin)">
        <animate attributeName="y" values="168;172;168" dur="5s" repeatCount="indefinite" />
        <animate attributeName="height" values="69;65;69" dur="5s" repeatCount="indefinite" />
      </rect>
      {/* Dose scale markings */}
      {[0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88].map((offset, i) => (
        <g key={i}>
          <line
            x1={i % 2 === 0 ? "187" : "189"}
            y1={`${140 + offset}`}
            x2="193"
            y2={`${140 + offset}`}
            stroke="rgba(14,165,233,0.3)"
            strokeWidth={i % 2 === 0 ? "0.8" : "0.5"}
          />
          {i % 2 === 0 && (
            <text x="184" y={`${143 + offset}`} fontSize="5" fill="rgba(14,165,233,0.35)" textAnchor="end" fontFamily="monospace">
              {Math.round((12 - i) * (80 / 12))}
            </text>
          )}
        </g>
      ))}
      {/* Reflection strip on cartridge */}
      <rect x="204" y="138" width="4" height="100" rx="2" fill="url(#highlight)" />

      {/* ── PEN BODY ── */}
      <rect x="178" y="250" width="44" height="140" rx="8" fill="url(#penBody)" stroke="rgba(41,128,185,0.2)" strokeWidth="1" />
      {/* Body highlight strip */}
      <rect x="206" y="255" width="5" height="130" rx="2.5" fill="url(#highlight)" />
      {/* Grip texture */}
      {[0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108].map((offset, i) => (
        <line
          key={i}
          x1="180"
          y1={`${255 + offset}`}
          x2="220"
          y2={`${255 + offset}`}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.8"
        />
      ))}
      {/* Label area */}
      <rect x="184" y="280" width="32" height="60" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <text x="200" y="300" fontSize="5" fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="monospace">INSULIN</text>
      <text x="200" y="308" fontSize="4" fill="rgba(14,165,233,0.4)" textAnchor="middle" fontFamily="monospace">100 U/mL</text>
      <text x="200" y="316" fontSize="3.5" fill="rgba(255,255,255,0.2)" textAnchor="middle" fontFamily="monospace">3 mL</text>
      {/* Medical cross icon */}
      <rect x="197" y="322" width="6" height="2" rx="0.5" fill="rgba(14,165,233,0.3)" />
      <rect x="199" y="320" width="2" height="6" rx="0.5" fill="rgba(14,165,233,0.3)" />

      {/* ── DOSE SELECTOR ── */}
      <rect x="182" y="390" width="36" height="30" rx="5" fill="url(#penCap)" stroke="rgba(41,128,185,0.25)" strokeWidth="1" />
      {/* Selector ring grooves */}
      {[0, 4, 8, 12, 16, 20, 24].map((offset, i) => (
        <line
          key={i}
          x1="183"
          y1={`${393 + offset}`}
          x2="217"
          y2={`${393 + offset}`}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
        />
      ))}
      {/* Dose number window */}
      <rect x="192" y="398" width="16" height="12" rx="2" fill="rgba(0,0,0,0.3)" stroke="rgba(14,165,233,0.2)" strokeWidth="0.5" />
      <text x="200" y="408" fontSize="8" fill="rgba(14,165,233,0.7)" textAnchor="middle" fontFamily="monospace" fontWeight="bold">12</text>

      {/* ── INJECTION BUTTON ── */}
      <rect x="185" y="420" width="30" height="45" rx="10" fill="url(#penButton)" stroke="rgba(41,128,185,0.2)" strokeWidth="1" />
      {/* Button top cap */}
      <ellipse cx="200" cy="462" rx="12" ry="4" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.15)" strokeWidth="0.5" />
      {/* Button highlight */}
      <rect x="194" y="425" width="3" height="30" rx="1.5" fill="rgba(255,255,255,0.06)" />

      {/* ── FLOATING TECH ANNOTATIONS ── */}
      {/* Left annotation - needle gauge */}
      <g className="hero-pen-label" opacity="0">
        <line x1="120" y1="95" x2="196" y2="95" stroke="rgba(14,165,233,0.3)" strokeWidth="0.5" strokeDasharray="3 2" />
        <circle cx="120" cy="95" r="2.5" fill="rgba(14,165,233,0.4)" />
        <text x="116" y="99" fontSize="12" fill="rgba(14,165,233,0.7)" textAnchor="end" fontFamily="monospace" fontWeight="600">31G x 5mm</text>
      </g>
      {/* Right annotation - cartridge */}
      <g className="hero-pen-label" opacity="0">
        <line x1="221" y1="190" x2="280" y2="190" stroke="rgba(14,165,233,0.3)" strokeWidth="0.5" strokeDasharray="3 2" />
        <circle cx="280" cy="190" r="2.5" fill="rgba(14,165,233,0.4)" />
        <text x="284" y="194" fontSize="12" fill="rgba(14,165,233,0.7)" textAnchor="start" fontFamily="monospace" fontWeight="600">Cartucho 3mL</text>
      </g>
      {/* Left annotation - dose */}
      <g className="hero-pen-label" opacity="0">
        <line x1="110" y1="405" x2="190" y2="405" stroke="rgba(14,165,233,0.3)" strokeWidth="0.5" strokeDasharray="3 2" />
        <circle cx="110" cy="405" r="2.5" fill="rgba(14,165,233,0.4)" />
        <text x="106" y="409" fontSize="12" fill="rgba(14,165,233,0.7)" textAnchor="end" fontFamily="monospace" fontWeight="600">Selector dosis</text>
      </g>
      {/* Right annotation - button */}
      <g className="hero-pen-label" opacity="0">
        <line x1="217" y1="445" x2="280" y2="445" stroke="rgba(14,165,233,0.3)" strokeWidth="0.5" strokeDasharray="3 2" />
        <circle cx="280" cy="445" r="2.5" fill="rgba(14,165,233,0.4)" />
        <text x="284" y="449" fontSize="12" fill="rgba(14,165,233,0.7)" textAnchor="start" fontFamily="monospace" fontWeight="600">Inyección</text>
      </g>

      {/* Ambient scan line */}
      <rect x="175" y="0" width="50" height="2" rx="1" fill="rgba(14,165,233,0.15)">
        <animate attributeName="y" values="0;500;0" dur="8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.3;0" dur="8s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

/* ── Main Hero ── */
export default function HeroTechnical() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const authorsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const penRef = useRef<HTMLDivElement>(null);

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

    // Insulin pen entrance
    if (penRef.current) {
      tl.add(
        penRef.current,
        {
          translateY: [60, 0],
          opacity: [0, 1],
          scale: [0.85, 1],
          duration: 1200,
        },
        600
      );
    }

    // Pen labels
    tl.add(
      ".hero-pen-label",
      {
        opacity: [0, 1],
        duration: 600,
        delay: stagger(200),
      },
      1800
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
                  Insulinización
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
              técnica de aplicación de insulina en pacientes
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
                Brayan Steven León Martinez
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
                Leonardo Stiven Pardo Niño
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
                FUNDACIÓN CLÍNICA UNAB
              </span>
            </div>
          </div>

          {/* Right: Insulin Pen Illustration */}
          <div
            ref={penRef}
            className="relative flex items-center justify-center opacity-0"
          >
            <div className="relative w-[280px] h-[420px] md:w-[340px] md:h-[480px]">
              {/* Pulsing ambient glow */}
              <div className="pulse-glow absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-40 h-80 md:w-48 md:h-96 rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(14,165,233,0.1) 0%, transparent 70%)",
                  }}
                />
              </div>
              <InsulinPenSVG />
            </div>
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
