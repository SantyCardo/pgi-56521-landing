"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`);
  };

  const handleLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      className={className}
      style={{ transform, transition: "transform 0.3s ease" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

const STATS = [
  { num: "830M", label: "Personas con diabetes en el mundo (OMS)" },
  { num: "3M+", label: "Casos en Colombia (FID 2024)" },
  { num: "<55%", label: "Adherencia terapeutica en LMIC" },
  { num: "36%", label: "Pacientes con ansiedad asociada" },
];

export default function ProyectoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="proyecto" className="py-24 px-4 bg-white dark:bg-[#080e1a]" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4">
            Acerca del Proyecto
          </h2>
          <motion.div
            className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
          >
            <p className="text-muted dark:text-primary-lighter/60 leading-relaxed mb-5">
              El proyecto <strong className="text-primary dark:text-primary-lighter">PGI 56521</strong> propone un prototipo
              funcional de herramienta educativa inmersiva e interactiva mediante
              Realidad Virtual y Google Cardboard para enseñar la técnica de
              insulinización y el almacenamiento correcto de insulina a pacientes
              adultos con diabetes tipo 2 en Bucaramanga.
            </p>
            <p className="text-muted dark:text-primary-lighter/60 leading-relaxed mb-5">
              La insulinización requiere que el paciente se inyecte correctamente
              de forma autónoma. Sin embargo, la formación insuficiente genera
              lipohipertrofia, variabilidad glucémica, ansiedad y baja adherencia
              al tratamiento.
            </p>
            <p className="text-muted dark:text-primary-lighter/60 leading-relaxed">
              Este prototipo ocupa la <strong className="text-primary dark:text-primary-lighter">intersección de tres dimensiones</strong> que
              ninguna solución existente cubre simultáneamente: educación en
              insulinización, experiencia inmersiva y accesibilidad local sin
              internet.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0, 1] }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Animated circles */}
                <motion.circle
                  cx="175" cy="155" r="110" fill="#1a5276" opacity="0.12" stroke="#1a5276" strokeWidth="2"
                  initial={{ r: 0, opacity: 0 }}
                  animate={inView ? { r: 110, opacity: 0.12 } : {}}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
                <text x="145" y="110" fontSize="13" fill="#1a5276" fontWeight="600" textAnchor="middle">Educación en</text>
                <text x="145" y="128" fontSize="13" fill="#1a5276" fontWeight="600" textAnchor="middle">Insulinización</text>

                <motion.circle
                  cx="225" cy="155" r="110" fill="#2980b9" opacity="0.12" stroke="#2980b9" strokeWidth="2"
                  initial={{ r: 0, opacity: 0 }}
                  animate={inView ? { r: 110, opacity: 0.12 } : {}}
                  transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                />
                <text x="270" y="110" fontSize="13" fill="#2980b9" fontWeight="600" textAnchor="middle">Experiencia</text>
                <text x="270" y="128" fontSize="13" fill="#2980b9" fontWeight="600" textAnchor="middle">Inmersiva VR</text>

                <motion.circle
                  cx="200" cy="240" r="110" fill="#0ea5e9" opacity="0.12" stroke="#0ea5e9" strokeWidth="2"
                  initial={{ r: 0, opacity: 0 }}
                  animate={inView ? { r: 110, opacity: 0.12 } : {}}
                  transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                />
                <text x="200" y="320" fontSize="13" fill="#0ea5e9" fontWeight="600" textAnchor="middle">Accesibilidad</text>
                <text x="200" y="338" fontSize="13" fill="#0ea5e9" fontWeight="600" textAnchor="middle">Local / Offline</text>

                {/* Center with pulsing glow */}
                <motion.circle
                  cx="200" cy="200" r="20" fill="#1a5276" opacity="0.08"
                  animate={{ r: [20, 28, 20], opacity: [0.08, 0.15, 0.08] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
                <text x="200" y="195" fontSize="11" fill="#1a5276" fontWeight="700" textAnchor="middle">Nuestro</text>
                <text x="200" y="211" fontSize="11" fill="#1a5276" fontWeight="700" textAnchor="middle">Prototipo</text>
                <circle cx="200" cy="200" r="4" fill="#1a5276" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Key stats with animated counters and tilt */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0, 1] }}
            >
              <TiltCard className="text-center p-6 rounded-2xl bg-gradient-to-b from-primary-lighter/30 dark:from-primary/20 to-transparent border border-primary-lighter/20 dark:border-white/10 hover:border-primary-light/30 hover:shadow-[0_12px_40px_rgba(26,82,118,0.08)] transition-all duration-500">
                <AnimatedCounter
                  target={s.num}
                  className="text-3xl md:text-4xl font-bold text-primary-light mb-1 block"
                />
                <div className="text-xs text-muted dark:text-primary-lighter/50 leading-snug">{s.label}</div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
