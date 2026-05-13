"use client";

import { useRef, useState, MouseEvent, useEffect, useCallback } from "react";
import { createTimeline, animate, stagger } from "animejs";
import AnimatedCounter from "./AnimatedCounter";

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
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".proy-title", {
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 900,
      delay: stagger(80),
    }, 0);

    tl.add(".proy-line", {
      scaleX: [0, 1],
      duration: 800,
    }, 200);

    tl.add(".proy-text", {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(150),
    }, 400);

    tl.add(".proy-venn", {
      scale: [0.5, 1],
      opacity: [0, 1],
      rotate: [-10, 0],
      duration: 1000,
    }, 500);

    tl.add(".proy-stat", {
      translateY: [40, 0],
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 700,
      delay: stagger(100, { from: "center" }),
    }, 800);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        runAnimation();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [runAnimation]);

  // Floating stats on loop
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(".stat-float", {
        translateY: [-3, 3, -3],
        duration: 4000,
        loop: true,
        ease: "inOutSine",
        delay: stagger(300),
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="proyecto" className="relative py-24 px-4 bg-white dark:bg-[#060d14] overflow-hidden tech-grid" ref={ref}>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="proy-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            Acerca del Proyecto
          </h2>
          <div className="proy-line w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent" style={{ transformOrigin: "center", transform: "scaleX(0)" }} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="proy-text text-muted dark:text-primary-lighter/60 leading-relaxed mb-5 opacity-0">
              El proyecto propone un prototipo
              funcional de herramienta educativa inmersiva e interactiva mediante
              Realidad Virtual y Google Cardboard para enseñar la técnica de
              insulinización y el almacenamiento correcto de insulina a pacientes
              adultos con diabetes tipo 2 en Bucaramanga.
            </p>
            <p className="proy-text text-muted dark:text-primary-lighter/60 leading-relaxed mb-5 opacity-0">
              La insulinización requiere que el paciente se inyecte correctamente
              de forma autónoma. Sin embargo, la formación insuficiente genera
              lipohipertrofia, variabilidad glucémica, ansiedad y baja adherencia
              al tratamiento.
            </p>
            <p className="proy-text text-muted dark:text-primary-lighter/60 leading-relaxed opacity-0">
              Este prototipo ocupa la <strong className="text-primary dark:text-primary-lighter">intersección de tres dimensiones</strong> que
              ninguna solución existente cubre simultáneamente: educación en
              insulinización, experiencia inmersiva y accesibilidad local sin
              internet.
            </p>
          </div>

          <div className="proy-venn relative opacity-0">
            <div className="aspect-square max-w-md mx-auto relative">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <circle cx="175" cy="155" r="110" fill="#1a5276" opacity="0.12" stroke="#1a5276" strokeWidth="2" />
                <text x="145" y="110" fontSize="13" fill="#1a5276" fontWeight="600" textAnchor="middle">Educación en</text>
                <text x="145" y="128" fontSize="13" fill="#1a5276" fontWeight="600" textAnchor="middle">Insulinización</text>

                <circle cx="225" cy="155" r="110" fill="#2980b9" opacity="0.12" stroke="#2980b9" strokeWidth="2" />
                <text x="270" y="110" fontSize="13" fill="#2980b9" fontWeight="600" textAnchor="middle">Experiencia</text>
                <text x="270" y="128" fontSize="13" fill="#2980b9" fontWeight="600" textAnchor="middle">Inmersiva VR</text>

                <circle cx="200" cy="240" r="110" fill="#0ea5e9" opacity="0.12" stroke="#0ea5e9" strokeWidth="2" />
                <text x="200" y="320" fontSize="13" fill="#0ea5e9" fontWeight="600" textAnchor="middle">Accesibilidad</text>
                <text x="200" y="338" fontSize="13" fill="#0ea5e9" fontWeight="600" textAnchor="middle">Local / Offline</text>

                <circle cx="200" cy="200" r="4" fill="#1a5276" />
                <text x="200" y="195" fontSize="11" fill="#1a5276" fontWeight="700" textAnchor="middle">Nuestro</text>
                <text x="200" y="211" fontSize="11" fill="#1a5276" fontWeight="700" textAnchor="middle">Prototipo</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {STATS.map((s, i) => (
            <div key={i} className="proy-stat stat-float opacity-0">
              <TiltCard className="text-center p-6 rounded-2xl bg-gradient-to-b from-primary-lighter/30 dark:from-primary/20 to-transparent border border-primary-lighter/20 dark:border-white/10 hover:border-primary-light/30 hover:shadow-[0_12px_40px_rgba(26,82,118,0.08)] transition-all duration-500 h-full flex flex-col items-center justify-center">
                <AnimatedCounter
                  target={s.num}
                  className="text-3xl md:text-4xl font-bold text-primary-light mb-1 block"
                />
                <div className="text-xs text-muted dark:text-primary-lighter/50 leading-snug">{s.label}</div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
