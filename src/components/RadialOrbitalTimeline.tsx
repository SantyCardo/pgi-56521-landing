"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Glasses,
  BookOpen,
  Heart,
  ClipboardCheck,
  Cpu,
  Zap,
  ArrowRight,
  X,
} from "lucide-react";
const ShaderBackground = dynamic(
  () => import("@/components/ui/shader-background").then((m) => m.ShaderBackground),
  { ssr: false }
);
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

/* ── Timeline Data ── */
type CenterSvg = "headset" | "pen" | "heart";

interface TimelineItem {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  icon: React.ElementType;
  color: string;
  relatedIds: number[];
  energy: number;
  centerSvg: CenterSvg;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    title: "El Problema",
    subtitle: "Diabetes & Insulinización",
    content:
      "830M de personas con diabetes en el mundo. En Colombia, adherencia a insulina <55%. Miedo a las agujas y falta de educación impiden el inicio oportuno de la terapia.",
    icon: AlertTriangle,
    color: "#e74c3c",
    relatedIds: [2, 4],
    energy: 95,
    centerSvg: "heart",
  },
  {
    id: 2,
    title: "Experiencia VR",
    subtitle: "Google Cardboard",
    content:
      "Entorno inmersivo con Google Cardboard que simula el proceso completo de insulinización. Navegación por mirada (gaze), 3 DOF, sin controles externos.",
    icon: Glasses,
    color: "#2980b9",
    relatedIds: [1, 3, 6],
    energy: 90,
    centerSvg: "headset",
  },
  {
    id: 3,
    title: "5 Lecciones",
    subtitle: "Contenido Educativo",
    content:
      "Vía de administración, rotación de sitios de inyección, manejo de agujas, almacenamiento de insulina y tips del pen. Cada lección es interactiva con retroalimentación visual.",
    icon: BookOpen,
    color: "#0ea5e9",
    relatedIds: [2, 4],
    energy: 85,
    centerSvg: "pen",
  },
  {
    id: 4,
    title: "Impacto Paciente",
    subtitle: "Resultados Esperados",
    content:
      "Reducción de ansiedad y mejor adherencia terapéutica mediante educación inmersiva. Evaluación pre/post con escalas validadas de autoeficacia.",
    icon: Heart,
    color: "#1a5276",
    relatedIds: [1, 3, 5],
    energy: 80,
    centerSvg: "heart",
  },
  {
    id: 5,
    title: "Validación Clínica",
    subtitle: "Fundación UNAB",
    content:
      "Protocolo de investigación aprobado. Métricas de usabilidad SUS y entrevistas semiestructuradas con profesionales de la Fundación Clínica UNAB.",
    icon: ClipboardCheck,
    color: "#27ae60",
    relatedIds: [4, 6],
    energy: 70,
    centerSvg: "pen",
  },
  {
    id: 6,
    title: "Tecnología",
    subtitle: "Unity + Cardboard SDK",
    content:
      "Desarrollado en Unity con Google Cardboard SDK. APK offline sin necesidad de internet. Distribución local en dispositivos Android, sin costos recurrentes.",
    icon: Cpu,
    color: "#8e44ad",
    relatedIds: [2, 5],
    energy: 75,
    centerSvg: "headset",
  },
];

/* ── Starry Canvas (dark mode) — stars only, slow twinkle ── */
function StarryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Array<{
    x: number; y: number; r: number;
    baseAlpha: number; speed: number; offset: number;
  }>>([]);
  const frameRef = useRef<number>(0);

  const generate = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const count = Math.floor((c.width * c.height) / 3000);
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.3 + 0.2,
      baseAlpha: Math.random() * 0.5 + 0.15,
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
        const alpha = Math.max(0.05, Math.min(1, s.baseAlpha + twinkle * 0.15));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener("resize", resize); };
  }, [generate]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-700 z-0" />
  );
}

/* ── Floating Clouds (light mode) ── */
function FloatingClouds() {
  const cloudStyle = (blur: number): React.CSSProperties => ({
    filter: `drop-shadow(0 2px ${blur}px rgba(26,82,118,0.08)) drop-shadow(0 0 ${blur * 2}px rgba(41,128,185,0.04))`,
  });
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] opacity-100 dark:opacity-0 transition-opacity duration-700 overflow-hidden">
      <motion.div className="absolute" style={{ top: "6%", left: "-20%", ...cloudStyle(4) }} animate={{ x: ["0vw", "120vw"] }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
        <svg width="380" height="140" viewBox="0 0 380 140" fill="none"><ellipse cx="190" cy="85" rx="160" ry="42" fill="white" opacity="0.55" /><ellipse cx="140" cy="65" rx="95" ry="52" fill="white" opacity="0.65" /><ellipse cx="240" cy="58" rx="105" ry="55" fill="white" opacity="0.55" /><ellipse cx="185" cy="52" rx="70" ry="40" fill="white" opacity="0.75" /><ellipse cx="160" cy="48" rx="45" ry="28" fill="white" opacity="0.85" /></svg>
      </motion.div>
      <motion.div className="absolute" style={{ top: "18%", right: "-15%", ...cloudStyle(3) }} animate={{ x: ["0vw", "-120vw"] }} transition={{ duration: 95, repeat: Infinity, ease: "linear", delay: 5 }}>
        <svg width="300" height="110" viewBox="0 0 300 110" fill="none"><ellipse cx="150" cy="65" rx="130" ry="35" fill="white" opacity="0.5" /><ellipse cx="110" cy="50" rx="80" ry="42" fill="white" opacity="0.6" /><ellipse cx="200" cy="45" rx="85" ry="45" fill="white" opacity="0.5" /><ellipse cx="148" cy="42" rx="55" ry="30" fill="white" opacity="0.7" /></svg>
      </motion.div>
      <motion.div className="absolute" style={{ top: "38%", left: "-12%", ...cloudStyle(2) }} animate={{ x: ["0vw", "120vw"] }} transition={{ duration: 55, repeat: Infinity, ease: "linear", delay: 20 }}>
        <svg width="220" height="85" viewBox="0 0 220 85" fill="none"><ellipse cx="110" cy="50" rx="95" ry="28" fill="white" opacity="0.45" /><ellipse cx="80" cy="38" rx="60" ry="32" fill="white" opacity="0.55" /><ellipse cx="145" cy="35" rx="65" ry="30" fill="white" opacity="0.45" /></svg>
      </motion.div>
      <motion.div className="absolute" style={{ top: "58%", right: "-18%", ...cloudStyle(5) }} animate={{ x: ["0vw", "-130vw"] }} transition={{ duration: 100, repeat: Infinity, ease: "linear", delay: 35 }}>
        <svg width="340" height="120" viewBox="0 0 340 120" fill="none"><ellipse cx="170" cy="72" rx="150" ry="38" fill="white" opacity="0.4" /><ellipse cx="120" cy="55" rx="90" ry="45" fill="white" opacity="0.5" /><ellipse cx="225" cy="50" rx="95" ry="42" fill="white" opacity="0.4" /><ellipse cx="168" cy="45" rx="60" ry="32" fill="white" opacity="0.6" /></svg>
      </motion.div>
    </div>
  );
}

/* ── VR Headset SVG (center) ── */
function VRHeadsetSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
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
  );
}

/* ── Insulin Pen SVG ── */
function InsulinPenSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
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
    </svg>
  );
}

/* ── Heart SVG ── */
function HeartSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <path d="M100 170 C60 140 20 110 20 75 C20 50 40 35 65 35 C80 35 92 45 100 58 C108 45 120 35 135 35 C160 35 180 50 180 75 C180 110 140 140 100 170Z" fill="#1a5276" />
      <path d="M100 155 C70 130 40 108 40 82 C40 62 55 50 72 50 C83 50 92 57 100 68 C108 57 117 50 128 50 C145 50 160 62 160 82 C160 108 130 130 100 155Z" fill="#2980b9" opacity="0.5" />
      <path d="M35 95 L60 95 L70 75 L82 115 L92 80 L100 100 L108 90 L120 95 L165 95" stroke="#d4e6f1" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="100" cy="95" r="40" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="40;55;40" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <rect x="92" y="40" width="16" height="5" rx="2" fill="#ffffff" opacity="0.4" />
      <rect x="97" y="35" width="6" height="15" rx="2" fill="#ffffff" opacity="0.4" />
    </svg>
  );
}

/* ── Center SVG Switcher ── */
function CenterSVG({ type, className }: { type: CenterSvg; className?: string }) {
  switch (type) {
    case "headset": return <VRHeadsetSVG className={className} />;
    case "pen": return <InsulinPenSVG className={className} />;
    case "heart": return <HeartSVG className={className} />;
  }
}

/* ── Floating Particles ── */
const PARTICLES = [
  { top: "15%", left: "12%", size: 4, glow: true, dur: 14 },
  { top: "25%", right: "18%", size: 3, glow: false, dur: 11 },
  { top: "50%", left: "20%", size: 5, glow: true, dur: 16 },
  { top: "65%", right: "22%", size: 3, glow: false, dur: 12 },
  { top: "75%", left: "30%", size: 4, glow: true, dur: 15 },
];

/* ── Main Component ── */
export default function RadialOrbitalTimeline() {
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  // Rotate only when nothing selected
  useEffect(() => {
    if (activeNodeId !== null) return;
    let raf: number;
    const tick = () => {
      setRotationAngle((prev) => (prev + 0.15) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeNodeId]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setActiveNodeId(null);
      setPulseEffect({});
    }
  };

  const toggleItem = (id: number) => {
    if (activeNodeId === id) {
      setActiveNodeId(null);
      setPulseEffect({});
    } else {
      setActiveNodeId(id);

      // Snap selected node to north (top = 270°)
      const nodeIndex = TIMELINE_DATA.findIndex((i) => i.id === id);
      const targetAngle = (nodeIndex / TIMELINE_DATA.length) * 360;
      setRotationAngle(((270 - targetAngle) % 360 + 360) % 360);

      // Pulse related nodes
      const item = TIMELINE_DATA.find((i) => i.id === id);
      const newPulse: Record<number, boolean> = {};
      item?.relatedIds.forEach((relId) => { newPulse[relId] = true; });
      setPulseEffect(newPulse);
    }
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const radius = 230;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    return { x, y, angle, zIndex };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const item = TIMELINE_DATA.find((i) => i.id === activeNodeId);
    return item?.relatedIds.includes(itemId) ?? false;
  };

  const activeItem = activeNodeId ? TIMELINE_DATA.find((i) => i.id === activeNodeId) : null;

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center overflow-hidden"
      onClick={handleContainerClick}
    >
      {/* Background layers */}
      <StarryCanvas />
      {/* Shader background — dark mode only */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-1000 z-[1]">
        <ShaderBackground opacity={0.3} />
      </div>
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-1000 z-[2]" style={{ background: "radial-gradient(circle, rgba(94,173,213,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute -bottom-12 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-1000 z-[2]" style={{ background: "radial-gradient(circle, rgba(120,100,200,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <FloatingClouds />

      {/* Gradient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] dark:opacity-[0.15]" style={{ background: "radial-gradient(ellipse at 25% 20%, #1a5276 0%, transparent 50%), radial-gradient(ellipse at 75% 40%, #2980b9 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, #0ea5e9 0%, transparent 50%)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, #1a5276 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)" }} />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{ top: p.top, left: p.left, right: (p as Record<string, unknown>).right as string | undefined, width: p.size, height: p.size, background: p.glow ? "#0ea5e9" : "#d4e6f1" }}
          animate={{ y: [0, -25, 15, 0], opacity: [0.3, 0.5, 0.2, 0.3] }}
          transition={{ repeat: Infinity, duration: p.dur, ease: "easeInOut" }}
        />
      ))}

      {/* Title */}
      <div className="relative z-10 text-center px-4 pt-20 md:pt-22 pb-2 flex-shrink-0">
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl lg:text-4xl font-bold text-primary dark:text-primary-lighter leading-tight">
          <motion.span
            className="inline-block overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
          >
            <motion.span className="inline-block" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}>
              Insulinizaci&oacute;n
            </motion.span>
          </motion.span>
          <motion.span
            className="block overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0, 1] }}
          >
            <motion.span className="inline-block text-primary-light" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0, 1] }}>
              con Realidad Virtual
            </motion.span>
          </motion.span>
        </h1>
        <motion.p
          className="mt-2 text-muted dark:text-primary-lighter/60 text-sm md:text-base max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0, 1] }}
        >
          Haz clic en los nodos para explorar el proyecto
        </motion.p>
        <motion.div
          className="mt-4 space-y-1"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: [0.25, 0.1, 0, 1] }}
        >
          <p className="text-xs md:text-sm text-muted dark:text-primary-lighter/50">
            <span className="font-semibold text-primary dark:text-primary-lighter/70">Autores:</span>{" "}
            Brayan Steven Le&oacute;n Martinez &bull; Santiago Cardona Prada
          </p>
          <p className="text-xs md:text-sm text-muted dark:text-primary-lighter/50">
            <span className="font-semibold text-primary dark:text-primary-lighter/70">Director:</span>{" "}
            Leonardo Stiven Pardo Ni&ntilde;o
          </p>
        </motion.div>
      </div>

      {/* Orbital area */}
      <div className="relative z-10 flex-1 flex items-center justify-center min-h-0 w-full">
        {/* Scale wrapper for responsive radius */}
        <div
          ref={orbitRef}
          className="relative scale-[0.7] sm:scale-[0.85] md:scale-100"
          style={{ width: 540, height: 540 }}
        >
          {/* Orbital ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[460px] h-[460px] rounded-full border border-dashed border-primary-lighter/20 dark:border-primary-lighter/10" />
          </div>

          {/* Center: Dynamic SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative cursor-pointer"
              animate={{ scale: activeNodeId ? 0.85 : 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveNodeId(null);
                setPulseEffect({});
              }}
            >
              {/* Glow rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-primary-light/20 dark:border-primary-light/10 animate-ping opacity-30" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary-light/5 dark:bg-primary-light/10 animate-pulse" />
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem?.centerSvg ?? "headset"}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <CenterSVG type={activeItem?.centerSvg ?? "headset"} className="w-full h-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Orbital Nodes */}
          {TIMELINE_DATA.map((item, index) => {
            const position = calculateNodePosition(index, TIMELINE_DATA.length);
            const isExpanded = activeNodeId === item.id;
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Energy glow */}
                {(isPulsing || isExpanded) && (
                  <div
                    className="absolute rounded-full animate-pulse"
                    style={{
                      background: `radial-gradient(circle, ${item.color}33 0%, transparent 70%)`,
                      width: 60, height: 60,
                      left: -10, top: -10,
                    }}
                  />
                )}

                {/* Node circle */}
                <motion.div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isExpanded
                      ? "bg-white dark:bg-dark shadow-lg scale-150"
                      : isRelated
                      ? "bg-white/80 dark:bg-dark/80 animate-pulse"
                      : "bg-white/60 dark:bg-dark/60"
                    }
                  `}
                  style={{
                    borderColor: isExpanded || isRelated ? item.color : "rgba(41,128,185,0.3)",
                    boxShadow: isExpanded ? `0 0 20px ${item.color}40` : "none",
                  }}
                  whileHover={{ scale: isExpanded ? 1.5 : 1.2 }}
                >
                  <Icon size={18} style={{ color: item.color }} />
                </motion.div>

                {/* Node label */}
                <div
                  className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isExpanded ? "text-primary dark:text-primary-lighter scale-110" : "text-muted dark:text-primary-lighter/60"
                  }`}
                >
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Card — slides in from right on desktop, bottom on mobile */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              key={activeItem.id}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-[300] w-72 max-sm:right-auto max-sm:bottom-4 max-sm:top-auto max-sm:translate-y-0 max-sm:left-4 max-sm:right-4 max-sm:w-auto"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
            >
              <Card className="relative overflow-visible">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-px max-sm:hidden" style={{ backgroundColor: activeItem.color }} />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge style={{ backgroundColor: `${activeItem.color}20`, color: activeItem.color, borderColor: `${activeItem.color}30` }}>
                      {activeItem.subtitle}
                    </Badge>
                    <button
                      className="text-muted dark:text-primary-lighter/50 hover:text-primary dark:hover:text-primary-lighter transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveNodeId(null);
                        setPulseEffect({});
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <CardTitle className="text-primary dark:text-primary-lighter">
                    {activeItem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted dark:text-primary-lighter/70 leading-relaxed">
                    {activeItem.content}
                  </p>

                  {/* Energy bar */}
                  <div className="mt-4 pt-3 border-t border-primary-lighter/10 dark:border-primary-lighter/5">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="flex items-center gap-1 text-muted dark:text-primary-lighter/50">
                        <Zap size={10} />
                        Relevancia
                      </span>
                      <span className="font-mono text-muted dark:text-primary-lighter/50">{activeItem.energy}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-primary-lighter/10 dark:bg-primary-lighter/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: activeItem.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${activeItem.energy}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Related nodes */}
                  {activeItem.relatedIds.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-primary-lighter/10 dark:border-primary-lighter/5">
                      <h4 className="text-xs uppercase tracking-wider font-medium text-muted dark:text-primary-lighter/50 mb-2">
                        Nodos conectados
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeItem.relatedIds.map((relatedId) => {
                          const relatedItem = TIMELINE_DATA.find((i) => i.id === relatedId);
                          if (!relatedItem) return null;
                          return (
                            <Button
                              key={relatedId}
                              variant="outline"
                              size="sm"
                              className="h-7 px-2 text-xs text-muted dark:text-primary-lighter/70 border-primary-lighter/20 dark:border-primary-lighter/10 hover:border-primary-light"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItem(relatedId);
                              }}
                            >
                              {relatedItem.title}
                              <ArrowRight size={10} className="ml-1 opacity-50" />
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Button */}
      <div className="relative z-10 flex-shrink-0 pb-8">
        <motion.a
          href="#proyecto"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary-light text-white font-medium text-sm transition-shadow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.25, 0.1, 0, 1] }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(14,165,233,0.3)" }}
          whileTap={{ scale: 0.98 }}
        >
          Explorar Proyecto
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3L8 13M3 8L8 13L13 8" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}
