"use client";

import { useEffect, useRef, useState } from "react";
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

  return (
    <section ref={containerRef} className="relative min-h-[300vh]">
      {/* Sticky container — 3D scene renders behind via SceneContainer (fixed, z-0) */}
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden">

        {/* Gradient mesh background (kept as subtle overlay) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08]"
          style={{
            background: "radial-gradient(ellipse at 25% 20%, #1a5276 0%, transparent 50%), radial-gradient(ellipse at 75% 40%, #2980b9 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, #0ea5e9 0%, transparent 50%)",
          }}
        />

        {/* Title — flows from top */}
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

        {/* Center spacer — 3D models render in this area via the global Canvas */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0">
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

        {/* Bottom area: dots + scroll indicator */}
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
