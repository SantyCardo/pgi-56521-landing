"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InlineIcon3DLoader from "./InlineIcon3DLoader";
import type { IconType } from "@/components/three/InlineIcon3D";

const lecciones = [
  { num: 1, title: "Via de administración", desc: "Subcutánea correcta vs. IV/IM accidental", color: "bg-red-500" },
  { num: 2, title: "Rotación de sitios", desc: "4 cuadrantes, prevención de lipodistrofia", color: "bg-orange-500" },
  { num: 3, title: "Agujas y desecho", desc: "No reutilizar, contenedor rigido", color: "bg-yellow-500" },
  { num: 4, title: "Almacenamiento", desc: "Temperatura, sin congelar, tapada", color: "bg-emerald-500" },
  { num: 5, title: "Tips del pen", desc: "Dosis, espera 10s, basal vs. rápida", color: "bg-sky-500" },
];

const techIcons3D: IconType[] = ["cube", "headset", "eye", "phone"];

const techStack = [
  { name: "Unity", desc: "Motor de desarrollo del prototipo VR con exportación APK Android" },
  { name: "Google Cardboard", desc: "Hardware VR de bajo costo, accesible en contexto colombiano" },
  { name: "Gaze Navigation", desc: "Interacción por mirada con temporizador visual (3 DOF)" },
  { name: "APK Offline", desc: "Distribución local sin internet ni servidores externos" },
];

export default function TecnologiaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tecnologia" className="py-24 px-4 bg-gradient-to-b from-[#f0f6fb] to-white dark:from-[#0c1528] dark:to-[#080e1a]" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4">
            Tecnología y Contenido
          </h2>
          <motion.div
            className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent mb-6"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-muted dark:text-primary-lighter/60 max-w-2xl mx-auto">
            5 lecciones clínicas ordenadas por prioridad, con sesiones de 15-20 minutos
            diseñadas para el contexto de consultorio médico.
          </p>
        </motion.div>

        {/* Lessons timeline */}
        <div className="relative mb-20">
          {/* Animated vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-primary-lighter/30 dark:bg-white/10">
            <motion.div
              className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-red-400 via-yellow-400 to-sky-400 origin-top"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            />
          </div>

          {lecciones.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.25, 0.1, 0, 1] }}
              className={`relative flex items-center gap-6 mb-8 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  className={`w-5 h-5 rounded-full ${l.color} ring-4 ring-white dark:ring-[#0d2137] shadow-md`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.12, type: "spring", stiffness: 300 }}
                />
              </div>

              {/* Content card */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <motion.div
                  className="bg-white dark:bg-white/5 rounded-xl p-5 border border-primary-lighter/30 dark:border-white/10 hover:shadow-[0_12px_40px_rgba(26,82,118,0.08)] hover:border-primary-light/30 transition-all duration-500"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className={`inline-flex items-center gap-2 text-xs font-bold text-white px-2.5 py-1 rounded-full ${l.color} mb-2`}>
                    Lección {l.num}
                  </div>
                  <h3 className="font-semibold text-primary dark:text-primary-lighter text-base">{l.title}</h3>
                  <p className="text-muted dark:text-primary-lighter/60 text-sm mt-1">{l.desc}</p>
                </motion.div>
              </div>

              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>

        {/* Tech stack with distinct icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
        >
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-primary dark:text-primary-lighter text-center mb-8">
            Stack Tecnológico
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((t, i) => (
              <motion.div
                key={i}
                className="group text-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-primary-lighter/30 dark:border-white/10 hover:border-primary-light/40 transition-all duration-500"
                whileHover={{ y: -8, rotateY: 5 }}
                style={{ perspective: 800 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary-lighter/30 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-primary-lighter group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-light group-hover:text-white group-hover:shadow-[0_8px_25px_rgba(26,82,118,0.2)] transition-all duration-300">
                  <InlineIcon3DLoader type={techIcons3D[i]} />
                </div>
                <h4 className="font-semibold text-primary dark:text-primary-lighter text-sm mb-1">{t.name}</h4>
                <p className="text-muted dark:text-primary-lighter/60 text-xs leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Evidence quote with gradient border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
          className="mt-14 p-px rounded-2xl bg-gradient-to-r from-primary via-primary-light to-accent"
        >
          <div className="bg-primary rounded-2xl p-8 text-center text-white">
            <p className="italic text-lg leading-relaxed opacity-90">
              &ldquo;La eficacia reside en la experiencia inmersiva y no en el costo del hardware.&rdquo;
            </p>
            <cite className="text-primary-lighter text-sm mt-3 block not-italic">
              — Taunk et al. 2022 · Google Cardboard vs. Oculus: sin diferencias significativas en resultados educativos
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
