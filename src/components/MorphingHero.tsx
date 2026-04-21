"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const LABELS = [
  "Realidad Virtual",
  "Insulinización",
  "Impacto en el Paciente",
];

const DESCRIPTIONS = [
  "Experiencia inmersiva con Google Cardboard",
  "Enseñanza de técnica correcta paso a paso",
  "Reducción de ansiedad y mejor adherencia",
];

const PARTICLES = [
  { top: "15%", left: "12%", size: 4, glow: true, dur: 14 },
  { top: "25%", right: "18%", size: 3, glow: false, dur: 11 },
  { top: "50%", left: "20%", size: 5, glow: true, dur: 16 },
  { top: "65%", right: "22%", size: 3, glow: false, dur: 12 },
  { top: "75%", left: "30%", size: 4, glow: true, dur: 15 },
];

/* ── Starry Night Canvas + Shooting Stars (dark mode only) ── */
/* Shooting stars are drawn on the same canvas for true frame-by-frame animation */
interface Meteor {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  trailLen: number;
  width: number;
  delay: number;
  elapsed: number;
  active: boolean;
}

function createMeteor(w: number, h: number): Meteor {
  // Spawn from top-right quadrant, travel toward bottom-left
  const startX = w * (0.45 + Math.random() * 0.55);
  const startY = h * (Math.random() * 0.35);
  const angle = (210 + Math.random() * 30) * (Math.PI / 180); // 210°–240°
  const speed = 6 + Math.random() * 6;
  return {
    x: startX, y: startY,
    vx: Math.cos(angle) * speed,
    vy: -Math.sin(angle) * speed,
    life: 0,
    maxLife: 60 + Math.random() * 50,
    trailLen: 80 + Math.random() * 100,
    width: 1.2 + Math.random() * 1.2,
    delay: Math.random() * 400,
    elapsed: 0,
    active: false,
  };
}

function StarryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Array<{
    x: number; y: number; r: number;
    baseAlpha: number; speed: number; offset: number;
    hue: number; sat: number;
  }>>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const frameRef = useRef<number>(0);

  const generate = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const count = Math.floor((c.width * c.height) / 2500);
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.5 + 0.3,
      baseAlpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.015 + 0.005,
      offset: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.85 ? (Math.random() > 0.5 ? 210 : 40) : 0,
      sat: Math.random() > 0.85 ? 30 : 0,
    }));
    // Initialize meteors with staggered delays
    meteorsRef.current = Array.from({ length: 4 }, () => createMeteor(c.width, c.height));
    meteorsRef.current.forEach((m, i) => { m.delay = i * 180 + Math.random() * 120; });
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

      // ── Draw stars ──
      for (const s of starsRef.current) {
        const twinkle = Math.sin(t * s.speed + s.offset);
        const alpha = Math.max(0.05, Math.min(1, s.baseAlpha + twinkle * 0.3));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.hue
          ? `hsla(${s.hue},${s.sat}%,90%,${alpha})`
          : `rgba(255,255,255,${alpha})`;
        ctx.fill();
        if (s.r > 1.1 && alpha > 0.5) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,210,240,${alpha * 0.08})`;
          ctx.fill();
        }
      }

      // ── Draw shooting stars ──
      for (const m of meteorsRef.current) {
        m.elapsed++;
        if (!m.active) {
          if (m.elapsed > m.delay) m.active = true;
          else continue;
        }
        m.life++;
        m.x += m.vx;
        m.y += m.vy;

        const progress = m.life / m.maxLife;
        // Fade in fast, hold, fade out
        let headAlpha: number;
        if (progress < 0.08) headAlpha = progress / 0.08;
        else if (progress < 0.6) headAlpha = 1;
        else headAlpha = 1 - (progress - 0.6) / 0.4;
        headAlpha = Math.max(0, Math.min(1, headAlpha));

        // Normalize trail direction (opposite of velocity)
        const speed = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
        const nx = -m.vx / speed;
        const ny = -m.vy / speed;

        // Trail: gradient line from head backward
        const trailSteps = 30;
        for (let i = 0; i < trailSteps; i++) {
          const frac = i / trailSteps;
          const tx = m.x + nx * m.trailLen * frac;
          const ty = m.y + ny * m.trailLen * frac;
          const trailAlpha = headAlpha * (1 - frac) * (1 - frac);
          const trailWidth = m.width * (1 - frac * 0.7);

          ctx.beginPath();
          ctx.arc(tx, ty, trailWidth, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220,240,255,${trailAlpha * 0.6})`;
          ctx.fill();
        }

        // Outer glow trail (wider, softer)
        for (let i = 0; i < 15; i++) {
          const frac = i / 15;
          const tx = m.x + nx * m.trailLen * 0.6 * frac;
          const ty = m.y + ny * m.trailLen * 0.6 * frac;
          const ga = headAlpha * (1 - frac) * 0.12;
          ctx.beginPath();
          ctx.arc(tx, ty, m.width * 4 * (1 - frac), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150,200,255,${ga})`;
          ctx.fill();
        }

        // Bright head
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${headAlpha})`;
        ctx.fill();
        // Head glow
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.width * 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,220,255,${headAlpha * 0.2})`;
        ctx.fill();

        // Reset when dead or off-screen
        if (m.life >= m.maxLife || m.x < -100 || m.y > c.height + 100) {
          const fresh = createMeteor(c.width, c.height);
          fresh.delay = 200 + Math.random() * 350;
          fresh.elapsed = 0;
          fresh.active = false;
          Object.assign(m, fresh);
        }
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-700 z-0"
    />
  );
}

/* ── Floating Clouds (light mode) ── */
function FloatingClouds() {
  const cloudStyle = (blur: number): React.CSSProperties => ({
    filter: `drop-shadow(0 2px ${blur}px rgba(26,82,118,0.08)) drop-shadow(0 0 ${blur * 2}px rgba(41,128,185,0.04))`,
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] opacity-100 dark:opacity-0 transition-opacity duration-700 overflow-hidden">
      {/* Cloud 1 — large, slow */}
      <motion.div
        className="absolute"
        style={{ top: "6%", left: "-20%", ...cloudStyle(4) }}
        animate={{ x: ["0vw", "120vw"] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        <svg width="380" height="140" viewBox="0 0 380 140" fill="none">
          <ellipse cx="190" cy="85" rx="160" ry="42" fill="white" opacity="0.55" />
          <ellipse cx="140" cy="65" rx="95" ry="52" fill="white" opacity="0.65" />
          <ellipse cx="240" cy="58" rx="105" ry="55" fill="white" opacity="0.55" />
          <ellipse cx="185" cy="52" rx="70" ry="40" fill="white" opacity="0.75" />
          <ellipse cx="160" cy="48" rx="45" ry="28" fill="white" opacity="0.85" />
          {/* Subtle edge highlight */}
          <ellipse cx="185" cy="45" rx="65" ry="25" fill="none" stroke="rgba(41,128,185,0.08)" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Cloud 2 — medium, mid-height, opposite direction */}
      <motion.div
        className="absolute"
        style={{ top: "18%", right: "-15%", ...cloudStyle(3) }}
        animate={{ x: ["0vw", "-120vw"] }}
        transition={{ duration: 95, repeat: Infinity, ease: "linear", delay: 5 }}
      >
        <svg width="300" height="110" viewBox="0 0 300 110" fill="none">
          <ellipse cx="150" cy="65" rx="130" ry="35" fill="white" opacity="0.5" />
          <ellipse cx="110" cy="50" rx="80" ry="42" fill="white" opacity="0.6" />
          <ellipse cx="200" cy="45" rx="85" ry="45" fill="white" opacity="0.5" />
          <ellipse cx="148" cy="42" rx="55" ry="30" fill="white" opacity="0.7" />
          <ellipse cx="148" cy="38" rx="40" ry="20" fill="white" opacity="0.8" />
          <ellipse cx="148" cy="38" rx="50" ry="22" fill="none" stroke="rgba(41,128,185,0.07)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Cloud 3 — small, faster, lower */}
      <motion.div
        className="absolute"
        style={{ top: "38%", left: "-12%", ...cloudStyle(2) }}
        animate={{ x: ["0vw", "120vw"] }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear", delay: 20 }}
      >
        <svg width="220" height="85" viewBox="0 0 220 85" fill="none">
          <ellipse cx="110" cy="50" rx="95" ry="28" fill="white" opacity="0.45" />
          <ellipse cx="80" cy="38" rx="60" ry="32" fill="white" opacity="0.55" />
          <ellipse cx="145" cy="35" rx="65" ry="30" fill="white" opacity="0.45" />
          <ellipse cx="108" cy="32" rx="40" ry="22" fill="white" opacity="0.65" />
        </svg>
      </motion.div>

      {/* Cloud 4 — tiny wisp, high */}
      <motion.div
        className="absolute"
        style={{ top: "3%", left: "30%", ...cloudStyle(2) }}
        animate={{ x: ["0vw", "80vw"] }}
        transition={{ duration: 85, repeat: Infinity, ease: "linear", delay: 12 }}
      >
        <svg width="160" height="50" viewBox="0 0 160 50" fill="none">
          <ellipse cx="80" cy="30" rx="70" ry="16" fill="white" opacity="0.35" />
          <ellipse cx="60" cy="24" rx="45" ry="18" fill="white" opacity="0.45" />
          <ellipse cx="105" cy="22" rx="40" ry="17" fill="white" opacity="0.38" />
        </svg>
      </motion.div>

      {/* Cloud 5 — bottom, large & faint */}
      <motion.div
        className="absolute"
        style={{ top: "58%", right: "-18%", ...cloudStyle(5) }}
        animate={{ x: ["0vw", "-130vw"] }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear", delay: 35 }}
      >
        <svg width="340" height="120" viewBox="0 0 340 120" fill="none">
          <ellipse cx="170" cy="72" rx="150" ry="38" fill="white" opacity="0.4" />
          <ellipse cx="120" cy="55" rx="90" ry="45" fill="white" opacity="0.5" />
          <ellipse cx="225" cy="50" rx="95" ry="42" fill="white" opacity="0.4" />
          <ellipse cx="168" cy="45" rx="60" ry="32" fill="white" opacity="0.6" />
          <ellipse cx="168" cy="42" rx="40" ry="20" fill="white" opacity="0.7" />
        </svg>
      </motion.div>
    </div>
  );
}

export default function MorphingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v < 0.33) setPhase(0);
      else if (v < 0.66) setPhase(1);
      else setPhase(2);
    });
  }, [scrollYProgress]);

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.15, 0.08]);
  const glowRadius = useTransform(scrollYProgress, [0, 0.5, 1], [60, 120, 80]);

  return (
    <section ref={containerRef} className="relative min-h-[300vh]">
      {/* Sticky container — restructured to prevent overlapping */}
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden">

        {/* ── Starry night layer (dark mode) ── */}
        <StarryCanvas />
        {/* Nebula glows */}
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-1000 z-0" style={{ background: "radial-gradient(circle, rgba(94,173,213,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute -bottom-12 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-1000 z-0" style={{ background: "radial-gradient(circle, rgba(120,100,200,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-1000 z-0" style={{ background: "radial-gradient(circle, rgba(94,173,213,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />
        {/* ── Floating clouds (light mode) ── */}
        <FloatingClouds />

        {/* Gradient mesh background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07] dark:opacity-[0.15]"
          style={{
            background: "radial-gradient(ellipse at 25% 20%, #1a5276 0%, transparent 50%), radial-gradient(ellipse at 75% 40%, #2980b9 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, #0ea5e9 0%, transparent 50%)",
          }}
        />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #1a5276 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />

        {/* Center glow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: bgOpacity }}
        >
          <motion.div
            className="rounded-full bg-primary-light"
            style={{
              width: glowRadius,
              height: glowRadius,
              scale: 4,
              filter: "blur(80px)",
            }}
          />
        </motion.div>

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full will-change-transform"
            style={{
              top: p.top,
              left: p.left,
              right: p.right,
              width: p.size,
              height: p.size,
              background: p.glow ? "#0ea5e9" : "#d4e6f1",
            }}
            animate={{
              y: [0, -25, 15, 0],
              opacity: [0.3, 0.5, 0.2, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: p.dur,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Title — flows from top, no longer absolute to avoid overlapping */}
        <div className="relative z-10 text-center px-4 pt-24 md:pt-28 pb-4 flex-shrink-0">
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-primary-lighter leading-tight">
            <motion.span
              className="inline-block overflow-hidden"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
            >
              <motion.span
                className="inline-block"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
              >
                Insulinización
              </motion.span>
            </motion.span>
            <motion.span
              className="block overflow-hidden"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0, 1] }}
            >
              <motion.span
                className="inline-block text-primary-light"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0, 1] }}
              >
                con Realidad Virtual
              </motion.span>
            </motion.span>
          </h1>
          <motion.p
            className="mt-3 text-muted dark:text-primary-lighter/60 text-base md:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0, 1] }}
          >
            Prototipo educativo inmersivo para la enseñanza de técnicas
            de insulinización en pacientes con diabetes tipo 2
          </motion.p>
        </div>

        {/* Center area: ring + morphing SVG — flex-1 to fill remaining space */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0">
          {/* Rotating ring */}
          <motion.div
            className="absolute w-52 h-52 md:w-72 md:h-72 rounded-full border border-primary-lighter/20 dark:border-primary-lighter/10"
            style={{ rotate }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-light shadow-[0_0_10px_rgba(41,128,185,0.5)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
          </motion.div>

          {/* Main morphing object */}
          <motion.div className="relative" style={{ scale }}>
            <div className="w-36 h-36 md:w-52 md:h-52 relative">
              {/* VR Headset */}
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full"
                initial={false}
                animate={{
                  opacity: phase === 0 ? 1 : 0,
                  scale: phase === 0 ? 1 : 0.6,
                  rotate: phase === 0 ? 0 : -30,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
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
                <path d="M40 160 L65 160 L75 145 L85 175 L95 150 L105 168 L115 155 L135 160 L160 160" stroke="#2980b9" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
                  <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2s" repeatCount="indefinite" />
                </path>
              </motion.svg>

              {/* Insulin Pen */}
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full"
                initial={false}
                animate={{
                  opacity: phase === 1 ? 1 : 0,
                  scale: phase === 1 ? 1 : 0.6,
                  rotate: phase === 1 ? 0 : 30,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <rect x="35" y="85" width="110" height="30" rx="6" fill="#1a5276" />
                <rect x="60" y="90" width="30" height="20" rx="3" fill="#d4e6f1" />
                <text x="75" y="105" textAnchor="middle" fontSize="12" fill="#1a5276" fontWeight="bold">10U</text>
                <rect x="145" y="88" width="30" height="24" rx="4" fill="#2980b9" />
                <line x1="175" y1="100" x2="195" y2="100" stroke="#5d6d7e" strokeWidth="2" />
                <circle cx="195" cy="100" r="1.5" fill="#5d6d7e" />
                <rect x="20" y="92" width="15" height="16" rx="3" fill="#0c2d42" />
                <line x1="50" y1="88" x2="50" y2="82" stroke="#d4e6f1" strokeWidth="1.5" />
                <line x1="55" y1="88" x2="55" y2="84" stroke="#d4e6f1" strokeWidth="1" />
                <line x1="95" y1="88" x2="95" y2="82" stroke="#d4e6f1" strokeWidth="1.5" />
                <line x1="100" y1="88" x2="100" y2="84" stroke="#d4e6f1" strokeWidth="1" />
                <circle cx="100" cy="155" r="30" fill="none" stroke="#2980b9" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
                <circle cx="80" cy="145" r="4" fill="#0ea5e9" opacity="0.6" />
                <circle cx="120" cy="145" r="4" fill="#0ea5e9" opacity="0.6" />
                <circle cx="80" cy="165" r="4" fill="#0ea5e9" opacity="0.6" />
                <circle cx="120" cy="165" r="4" fill="#0ea5e9" opacity="0.6" />
                <path d="M195 104 Q197 112 195 118 Q193 112 195 104" fill="#0ea5e9" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.5s" repeatCount="indefinite" />
                </path>
              </motion.svg>

              {/* Heart / Patient */}
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full"
                initial={false}
                animate={{
                  opacity: phase === 2 ? 1 : 0,
                  scale: phase === 2 ? 1 : 0.6,
                  rotate: phase === 2 ? 0 : -30,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <path d="M100 170 C60 140 20 110 20 75 C20 50 40 35 65 35 C80 35 92 45 100 58 C108 45 120 35 135 35 C160 35 180 50 180 75 C180 110 140 140 100 170Z" fill="#1a5276" />
                <path d="M100 155 C70 130 40 108 40 82 C40 62 55 50 72 50 C83 50 92 57 100 68 C108 57 117 50 128 50 C145 50 160 62 160 82 C160 108 130 130 100 155Z" fill="#2980b9" opacity="0.5" />
                <path d="M35 95 L60 95 L70 75 L82 115 L92 80 L100 100 L108 90 L120 95 L165 95" stroke="#d4e6f1" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="100" cy="95" r="40" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.3">
                  <animate attributeName="r" values="40;55;40" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <rect x="92" y="40" width="16" height="5" rx="2" fill="#ffffff" opacity="0.4" />
                <rect x="97" y="35" width="6" height="15" rx="2" fill="#ffffff" opacity="0.4" />
              </motion.svg>
            </div>
          </motion.div>

          {/* Label & description */}
          <div className="relative mt-4 text-center h-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary-light/15 text-primary dark:text-primary-lighter text-sm font-medium mb-2 backdrop-blur-sm border border-primary-lighter/20 dark:border-primary-lighter/10">
                  {LABELS[phase]}
                </span>
                <p className="text-muted dark:text-primary-lighter/50 text-sm max-w-md mx-auto">
                  {DESCRIPTIONS[phase]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA button */}
        <div className="relative z-10 flex-shrink-0 pb-4">
          <motion.a
            href="#proyecto"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary-light text-white font-medium text-sm transition-shadow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.25, 0.1, 0, 1] }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(14,165,233,0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Explorar Proyecto
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3L8 13M3 8L8 13L13 8" />
            </svg>
          </motion.a>
        </div>

        {/* Bottom area: dots + scroll indicator — combined to avoid overlap */}
        <div className="relative z-10 flex-shrink-0 flex flex-col items-center gap-4 pb-6">
          {/* Phase progress dots */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                animate={{
                  scale: i === phase ? 1.3 : 1,
                  backgroundColor: i === phase ? "#2980b9" : "#d4e6f1",
                  boxShadow: i === phase ? "0 0 10px rgba(41,128,185,0.4)" : "none",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-1 text-muted/50 dark:text-primary-lighter/30"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">Desplaza</span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 4 L10 16 M4 10 L10 16 L16 10" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
