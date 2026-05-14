"use client";

import { useEffect, useRef, useCallback } from "react";
import { createTimeline, animate, stagger } from "animejs";

const team = [
  { name: "Santiago Cardona Prada", initials: "SC", role: "Co-investigador", type: "Ingenieria de Sistemas, UNAB" },
  { name: "Brayan Steven León Martinez", initials: "BL", role: "Co-investigador", type: "Ingenieria de Sistemas, UNAB" },
  { name: "Leonardo Stiven Pardo Niño", initials: "LP", role: "Director", type: "Proyecto de Grado" },
];

const advisors = [
  { name: "FOSUNAB — Fundación Oftalmológica de Santander", role: "Asesor temático institucional" },
];

export default function ContactoSection() {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".cont-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".cont-underline", {
      scaleX: [0, 1],
      duration: 700,
    }, 200);

    tl.add(".cont-subtitle", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
    }, 400);

    // Team cards pop in from center
    tl.add(".cont-team", {
      translateY: [50, 0],
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 800,
      delay: stagger(150, { from: "center" }),
      ease: "outElastic(1, .8)",
    }, 600);

    // Avatar initials spin in
    tl.add(".cont-avatar", {
      scale: [0, 1],
      rotate: [-90, 0],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(150, { from: "center" }),
      ease: "outBack",
    }, 800);

    // Advisors slide in
    tl.add(".cont-advisor", {
      translateX: [-30, 0],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(150),
    }, 1100);

    // Contact info lines
    tl.add(".cont-info", {
      translateY: [15, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(120),
    }, 1300);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        runAnimation();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [runAnimation]);

  // Floating team cards
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(".cont-float", {
        translateY: [-2, 2, -2],
        duration: 4000,
        loop: true,
        ease: "inOutSine",
        delay: stagger(400),
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="contacto" className="relative py-24 px-4 text-primary dark:text-white overflow-hidden" ref={ref}>
      {/* Light mode background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8f0f8] to-[#f0f6fb] dark:hidden" />
      {/* Dark mode background */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: "linear-gradient(135deg, #060d14 0%, #0a1018 40%, #060d14 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          background: "radial-gradient(ellipse at 80% 20%, #0ea5e9 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #2980b9 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto z-10">
        <div className="text-center mb-16">
          <h2 className="cont-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4 opacity-0">
            Equipo de Investigación
          </h2>
          <div className="cont-underline w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-lighter to-accent mb-6" style={{ transformOrigin: "center", transform: "scaleX(0)" }} />
          <p className="cont-subtitle text-muted dark:text-primary-lighter/80 max-w-xl mx-auto opacity-0">
            Universidad Autónoma de Bucaramanga (UNAB)
            <br />Facultad de Ingeniería, Programa de Ingeniería de Sistemas
          </p>
        </div>

        {/* Team */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {team.map((p, i) => (
            <div
              key={i}
              className="cont-team cont-float text-center p-6 rounded-2xl bg-primary-lighter/30 dark:bg-white/5 border border-primary-lighter/40 dark:border-white/10 hover:bg-primary-lighter/50 dark:hover:bg-white/10 hover:border-primary-light/30 dark:hover:border-accent/20 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)] transition-all duration-500 opacity-0"
            >
              <div className="cont-avatar w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center text-white text-xl font-bold shadow-[0_4px_20px_rgba(14,165,233,0.3)] opacity-0">
                {p.initials}
              </div>
              <h3 className="font-semibold text-lg text-primary dark:text-white">{p.name}</h3>
              <p className="text-primary-light dark:text-primary-lighter text-sm mt-1">{p.role}</p>
              <p className="text-muted dark:text-primary-lighter/60 text-xs mt-0.5">{p.type}</p>
            </div>
          ))}
        </div>

        {/* Institutional Advisor */}
        <div className="flex justify-center mb-14">
          <div className="cont-advisor inline-flex items-center gap-4 px-7 py-5 rounded-2xl bg-gradient-to-r from-primary-lighter/30 to-primary-lighter/10 dark:from-white/[0.06] dark:to-white/[0.02] border border-primary-lighter/40 dark:border-white/10 shadow-[0_4px_20px_rgba(26,82,118,0.06)] opacity-0">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shadow-[0_4px_15px_rgba(26,82,118,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-6 h-6">
                <path d="M3 21h18M5 21V7l8-4 8 4v14" />
                <path d="M9 21v-4a3 3 0 016 0v4" />
                <path d="M10 10h.01M14 10h.01" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary dark:text-white">{advisors[0].name}</p>
              <p className="text-primary-light dark:text-primary-lighter/60 text-xs mt-0.5">{advisors[0].role}</p>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="text-center space-y-4">
          {[
            {
              icon: <><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></>,
              content: <span className="text-muted dark:text-primary-lighter/80">Bucaramanga, Colombia</span>,
            },
            {
              icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
              content: <span className="text-muted dark:text-primary-lighter/80">Fundación Clínica UNAB — Validación clínica</span>,
            },
          ].map((item, i) => (
            <div key={i} className="cont-info flex items-center justify-center gap-3 opacity-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5 text-primary-light dark:text-primary-lighter">
                {item.icon}
              </svg>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
