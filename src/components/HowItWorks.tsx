"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InlineIcon3DLoader from "./InlineIcon3DLoader";
import type { IconType } from "@/components/three/InlineIcon3D";

const STEPS: Array<{ num: string; title: string; desc: string; icon3d: IconType }> = [
  {
    num: "1",
    title: "Coloca tu Google Cardboard",
    desc: "Solo necesitas un smartphone y un visor de bajo costo. Sin internet, sin configuración compleja.",
    icon3d: "headset",
  },
  {
    num: "2",
    title: "Aprende con 5 lecciones",
    desc: "Cada lección cubre un aspecto critico: via de administración, rotación, agujas, almacenamiento y tips.",
    icon3d: "book",
  },
  {
    num: "3",
    title: "Practica sin riesgo clinico",
    desc: "Practica la técnica completa en un entorno seguro, tantas veces como necesites, antes de la primera inyección real.",
    icon3d: "star",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-[#f0f6fb] dark:from-[#080e1a] dark:to-[#0c1528]" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4">
            Asi Funciona
          </h2>
          <motion.div
            className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Connecting lines (desktop only) */}
          <svg
            className="hidden md:block absolute top-16 left-0 w-full h-4 pointer-events-none"
            viewBox="0 0 1000 20"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M170 10 L500 10"
              stroke="#2980b9"
              strokeWidth="2"
              strokeDasharray="8 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M500 10 L830 10"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="8 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
              transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
            />
          </svg>

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              className="text-center relative"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.2, ease: [0.25, 0.1, 0, 1] }}
            >
              {/* Numbered circle */}
              <motion.div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-primary to-primary-light text-white text-2xl font-bold shadow-[0_8px_30px_rgba(26,82,118,0.2)]"
                whileHover={{ scale: 1.1, boxShadow: "0 12px 40px rgba(14,165,233,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {step.num}
              </motion.div>

              {/* Icon */}
              <div className="text-primary-light mb-4 flex justify-center">
                <InlineIcon3DLoader type={step.icon3d} />
              </div>

              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-primary dark:text-primary-lighter mb-3">
                {step.title}
              </h3>
              <p className="text-muted dark:text-primary-lighter/60 text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
