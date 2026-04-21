"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
    title: "Via incorrecta",
    desc: "La administración IV accidental causa hipoglucemia severa. La via IM genera variabilidad glucémica impredecible.",
    severity: "Critico",
    color: "red",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    title: "No rotar sitios",
    desc: "98.3% de quienes reutilizan agujas presentan lipohipertrofia, reduciendo la absorción de insulina hasta en un 25%.",
    severity: "Alto",
    color: "orange",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Almacenamiento incorrecto",
    desc: "Congelar, guardar destapada o usar insulina vencida desnaturaliza la molécula y elimina su eficacia terapéutica.",
    severity: "Alto",
    color: "orange",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Ansiedad del paciente",
    desc: "36% de pacientes con diabetes reportan ansiedad; 63% teme el desarrollo de complicaciones. El miedo reduce la adherencia.",
    severity: "Medio",
    color: "yellow",
  },
];

const severityStyles: Record<string, string> = {
  red: "bg-red-100 text-red-700",
  orange: "bg-orange-100 text-orange-700",
  yellow: "bg-yellow-100 text-yellow-700",
};

export default function ProblemaSection() {
  return (
    <section id="problema" className="py-24 px-4 bg-gradient-to-b from-[#f0f6fb] to-white dark:from-[#0c1528] dark:to-[#080e1a]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4">
            El Problema
          </h2>
          <motion.div
            className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-muted dark:text-primary-lighter/60 max-w-2xl mx-auto text-lg">
            La formación insuficiente en técnica de insulinización genera errores
            clínicos que comprometen la salud del paciente y su calidad de vida.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.25, 0.1, 0, 1] }}
              whileHover={{ y: -4 }}
              className="group relative bg-white dark:bg-white/5 rounded-2xl p-6 border border-primary-lighter/40 dark:border-white/10 hover:shadow-[0_20px_60px_rgba(26,82,118,0.1)] hover:border-primary-light/40 transition-all duration-500 overflow-hidden"
            >
              {/* Animated left border */}
              <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-primary-light scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-lighter/40 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-primary-lighter group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {p.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-primary dark:text-primary-lighter text-lg">{p.title}</h3>
                    <span className={`relative text-xs px-2 py-0.5 rounded-full font-medium ${severityStyles[p.color]}`}>
                      {p.severity}
                      {p.color === "red" && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-red-200 opacity-40" />
                      )}
                    </span>
                  </div>
                  <p className="text-muted dark:text-primary-lighter/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote with glassmorphism */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
          className="relative mt-14 max-w-3xl mx-auto bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-primary-lighter/30 dark:border-white/10 rounded-2xl p-8 text-center"
        >
          <span className="absolute top-3 left-6 font-[family-name:var(--font-playfair)] text-6xl text-primary/10 leading-none">&ldquo;</span>
          <p className="text-primary/80 dark:text-primary-lighter/80 italic text-lg leading-relaxed relative z-10">
            &ldquo;Las estrategias convencionales no garantizan comprensión
            adecuada ni reducción del miedo al procedimiento.&rdquo;
          </p>
          <cite className="text-muted dark:text-primary-lighter/50 text-sm mt-3 block not-italic">
            — PGI 56521, Anteproyecto de Grado
          </cite>
          <span className="absolute bottom-3 right-6 font-[family-name:var(--font-playfair)] text-6xl text-primary/10 leading-none rotate-180">&ldquo;</span>
        </motion.blockquote>
      </div>
    </section>
  );
}
