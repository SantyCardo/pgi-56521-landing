"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const fases = [
  {
    num: "01",
    title: "Identificación de Requerimientos",
    desc: "Revisión de literatura clínica y pedagógica, entrevistas con profesionales de salud y definición de controles por Gaze.",
    entregable: "Documento formal de requerimientos clínicos, educativos, funcionales y no funcionales.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Diseño y Desarrollo",
    desc: "Arquitectura de la app, modelado 3D, animaciones, UX/UI, sonido, evaluación interactiva y generación del APK.",
    entregable: "APK Android compatible con Google Cardboard con 5 módulos educativos + manual de usuario.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
        <path d="M12 22V12M2 7l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Validación por Expertos",
    desc: "Evaluación por médicos de la Fundación Clínica, ajustes por retroalimentación y documentación de resultados.",
    entregable: "Prototipo final validado + documentación de resultados y conclusiones.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function MetodologiaSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section id="metodologia" className="py-24 px-4 bg-white dark:bg-[#080e1a]" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4">
            Metodología de Desarrollo
          </h2>
          <motion.div
            className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-muted dark:text-primary-lighter/60 max-w-2xl mx-auto">
            Desarrollo ágil con Kanban en 3 fases secuenciales, orientado a alcanzar un nivel de madurez tecnológica TRL 4.
          </p>
        </motion.div>

        {/* Kanban badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-primary-lighter/20 dark:bg-primary/15 border border-primary-lighter/40 dark:border-white/10">
            <div className="flex gap-1.5">
              {["Por hacer", "En progreso", "Finalizado"].map((col, i) => (
                <span
                  key={col}
                  className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                    i === 0
                      ? "bg-primary-lighter/50 dark:bg-primary/30 text-primary dark:text-primary-lighter"
                      : i === 1
                        ? "bg-primary-light/20 dark:bg-accent/20 text-primary-light dark:text-accent"
                        : "bg-accent/15 text-accent"
                  }`}
                >
                  {col}
                </span>
              ))}
            </div>
            <span className="text-xs text-muted dark:text-primary-lighter/50">— Tablero Kanban</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-6">
          {/* Progress line */}
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-primary-lighter/30 dark:bg-white/10">
            <motion.div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-primary-light to-accent origin-top"
              style={{ scaleY: lineScaleY, height: "100%", width: "100%" }}
            />
          </div>

          {fases.map((fase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.25, 0.1, 0, 1] }}
              whileHover={{ y: -3 }}
              className="group relative flex items-start gap-6 pl-4 md:pl-0"
            >
              {/* Dot on the line */}
              <motion.div
                className="relative z-10 flex-shrink-0 w-[1.15rem] h-[1.15rem] ml-[1.65rem] rounded-full bg-primary-light ring-4 ring-white dark:ring-[#080e1a] shadow-md"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.15, type: "spring", stiffness: 300 }}
              />

              {/* Content card */}
              <div className="flex-1 flex items-start gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary-lighter/20 dark:from-primary/15 to-transparent hover:from-primary-lighter/40 dark:hover:from-primary/25 transition-all duration-500 border border-transparent hover:border-primary-lighter/50 dark:hover:border-white/10 hover:shadow-[0_12px_40px_rgba(26,82,118,0.06)]">
                {/* Phase number */}
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light items-center justify-center text-white font-bold text-xl group-hover:scale-110 group-hover:shadow-[0_8px_25px_rgba(26,82,118,0.25)] transition-all duration-300">
                  {fase.num}
                </div>

                {/* Icon for mobile */}
                <div className="md:hidden flex-shrink-0 w-12 h-12 rounded-xl bg-primary-lighter/50 flex items-center justify-center text-primary">
                  {fase.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-primary dark:text-primary-lighter mb-2 group-hover:text-primary-light transition-colors duration-300">
                    {fase.title}
                  </h3>
                  <p className="text-muted dark:text-primary-lighter/60 leading-relaxed text-sm md:text-base mb-3">
                    {fase.desc}
                  </p>
                  <div className="flex items-start gap-2 text-xs text-primary-light dark:text-accent">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0">
                      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.7 5.3a.75.75 0 00-1.06-1.06L7.5 8.38 5.86 6.74a.75.75 0 00-1.06 1.06l2.18 2.18a.75.75 0 001.06 0l3.66-3.68z" />
                    </svg>
                    <span className="leading-relaxed">{fase.entregable}</span>
                  </div>
                </div>

                {/* Icon for desktop */}
                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl items-center justify-center text-primary-light opacity-30 group-hover:opacity-100 transition-all duration-500">
                  {fase.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
