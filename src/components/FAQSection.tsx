"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createTimeline, animate, stagger } from "animejs";

const faqs = [
  {
    q: "Necesito un casco VR costoso?",
    a: "No. El prototipo funciona con Google Cardboard, un visor de bajo costo que usa tu smartphone como pantalla. No necesitas Oculus, HTC Vive ni ningún hardware especializado.",
  },
  {
    q: "Requiere conexión a internet?",
    a: "No. La aplicación se distribuye como un APK que se instala directamente en el teléfono Android. Funciona completamente offline, sin servidores ni cuentas.",
  },
  {
    q: "Cuánto dura cada sesión?",
    a: "Cada sesión está diseñada para durar entre 15 y 20 minutos, ideal para el contexto de un consultorio médico donde el tiempo es limitado.",
  },
  {
    q: "Está validado clínicamente?",
    a: "El prototipo será validado por profesionales de la salud de la Fundación Clínica UNAB. El contenido está basado en el consenso FITTER y en evidencia de 20 artículos científicos.",
  },
  {
    q: "Quién puede usarlo?",
    a: "Está diseñado para pacientes adultos con diabetes tipo 2 que inician terapia con insulina. La interfaz es accesible para personas con baja familiaridad digital.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const fired = useRef(false);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chevronRefs = useRef<(SVGSVGElement | null)[]>([]);

  const runAnimation = useCallback(() => {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(".faq-title", {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
    }, 0);

    tl.add(".faq-line", {
      scaleX: [0, 1],
      duration: 700,
    }, 200);

    // FAQ items cascade in
    tl.add(".faq-item", {
      translateY: [30, 0],
      opacity: [0, 1],
      scale: [0.96, 1],
      duration: 600,
      delay: stagger(100),
      ease: "outExpo",
    }, 400);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
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

  const toggle = (i: number) => {
    const wasOpen = open === i;
    const newOpen = wasOpen ? null : i;

    // Close previous
    if (open !== null && open !== i) {
      const prevAnswer = answerRefs.current[open];
      const prevChevron = chevronRefs.current[open];
      if (prevAnswer) {
        animate(prevAnswer, { height: [prevAnswer.scrollHeight, 0], opacity: [1, 0], duration: 300, ease: "outQuad" });
      }
      if (prevChevron) {
        animate(prevChevron, { rotate: [180, 0], duration: 300, ease: "outQuad" });
      }
    }

    // Toggle current
    const answer = answerRefs.current[i];
    const chevron = chevronRefs.current[i];

    if (wasOpen) {
      if (answer) {
        animate(answer, { height: [answer.scrollHeight, 0], opacity: [1, 0], duration: 300, ease: "outQuad" });
      }
      if (chevron) {
        animate(chevron, { rotate: [180, 0], duration: 300, ease: "outQuad" });
      }
    } else {
      if (answer) {
        // Temporarily show to measure
        answer.style.height = "auto";
        const h = answer.scrollHeight;
        answer.style.height = "0px";
        animate(answer, { height: [0, h], opacity: [0, 1], duration: 400, ease: "outExpo" });
      }
      if (chevron) {
        animate(chevron, { rotate: [0, 180], duration: 300, ease: "outQuad" });
      }
    }

    setOpen(newOpen);
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-white dark:bg-[#060d14] tech-grid">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="faq-title font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4 opacity-0">
            Preguntas Frecuentes
          </h2>
          <div className="faq-line w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent" style={{ transformOrigin: "center", transform: "scaleX(0)" }} />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item border border-primary-lighter/30 dark:border-white/10 rounded-2xl overflow-hidden hover:border-primary-light/40 transition-colors duration-300 opacity-0"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
              >
                <span className="font-medium text-primary dark:text-primary-lighter group-hover:text-primary-light transition-colors pr-4">
                  {faq.q}
                </span>
                <svg
                  ref={(el) => { chevronRefs.current[i] = el; }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5 flex-shrink-0 text-primary-light"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div
                ref={(el) => { answerRefs.current[i] = el; }}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-muted dark:text-primary-lighter/60 text-sm leading-relaxed border-t border-primary-lighter/20 dark:border-white/10 pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
