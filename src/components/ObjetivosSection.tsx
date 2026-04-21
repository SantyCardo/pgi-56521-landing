"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const objetivos = [
  {
    num: "01",
    title: "Diseñar la experiencia VR",
    desc: "Desarrollar un entorno de Realidad Virtual inmersivo con Google Cardboard que simule el proceso completo de insulinización: desde la preparación del pen hasta el desecho seguro de la aguja.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Reducir la ansiedad del paciente",
    desc: "Evaluar el impacto de la experiencia VR en los niveles de ansiedad y percepción de miedo asociados al inicio de la terapia con insulina, especialmente el miedo a las agujas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Mejorar la adherencia terapéutica",
    desc: "Analizar si la educación inmersiva contribuye a una mayor adherencia al tratamiento con insulina, actualmente inferior al 55% en países de ingreso medio-bajo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Validar con profesionales de salud",
    desc: "Generar evidencia científica validada por profesionales de la Fundación Clínica UNAB sobre la efectividad de herramientas VR en el contexto de insulinización.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ObjetivosSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section id="objetivos" className="py-24 px-4 bg-white dark:bg-[#080e1a]" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4">
            Objetivos del Proyecto
          </h2>
          <motion.div
            className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="relative space-y-6">
          {/* Progress line */}
          <div className="absolute left-[2.25rem] md:left-[2.25rem] top-0 bottom-0 w-px bg-primary-lighter/30 dark:bg-white/10">
            <motion.div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-primary-light to-accent origin-top"
              style={{ scaleY: lineScaleY, height: "100%", width: "100%" }}
            />
          </div>

          {objetivos.map((obj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.25, 0.1, 0, 1] }}
              whileHover={{ y: -3 }}
              className="group relative flex items-start gap-6 pl-4 md:pl-0"
            >
              {/* Number dot on the line */}
              <motion.div
                className="relative z-10 flex-shrink-0 w-[1.15rem] h-[1.15rem] ml-[1.65rem] md:ml-[1.65rem] rounded-full bg-primary-light ring-4 ring-white dark:ring-[#080e1a] shadow-md"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.15, type: "spring", stiffness: 300 }}
              />

              {/* Content card */}
              <div className="flex-1 flex items-start gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary-lighter/20 dark:from-primary/15 to-transparent hover:from-primary-lighter/40 dark:hover:from-primary/25 transition-all duration-500 border border-transparent hover:border-primary-lighter/50 dark:hover:border-white/10 hover:shadow-[0_12px_40px_rgba(26,82,118,0.06)]">
                {/* Number */}
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light items-center justify-center text-white font-bold text-xl group-hover:scale-110 group-hover:shadow-[0_8px_25px_rgba(26,82,118,0.25)] transition-all duration-300">
                  {obj.num}
                </div>

                {/* Icon for mobile */}
                <div className="md:hidden flex-shrink-0 w-12 h-12 rounded-xl bg-primary-lighter/50 flex items-center justify-center text-primary">
                  {obj.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-primary dark:text-primary-lighter mb-2 group-hover:text-primary-light transition-colors duration-300">
                    {obj.title}
                  </h3>
                  <p className="text-muted dark:text-primary-lighter/60 leading-relaxed text-sm md:text-base">
                    {obj.desc}
                  </p>
                </div>

                {/* Icon for desktop */}
                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl items-center justify-center text-primary-light opacity-30 group-hover:opacity-100 transition-all duration-500">
                  {obj.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
