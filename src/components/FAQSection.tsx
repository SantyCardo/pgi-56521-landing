"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <section className="py-24 px-4 bg-white dark:bg-[#080e1a]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-primary-lighter mb-4">
            Preguntas Frecuentes
          </h2>
          <motion.div
            className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-light to-accent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0, 1] }}
              className="border border-primary-lighter/30 dark:border-white/10 rounded-2xl overflow-hidden hover:border-primary-light/40 transition-colors duration-300"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
              >
                <span className="font-medium text-primary dark:text-primary-lighter group-hover:text-primary-light transition-colors pr-4">
                  {faq.q}
                </span>
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5 flex-shrink-0 text-primary-light"
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <p className="text-muted dark:text-primary-lighter/60 text-sm leading-relaxed border-t border-primary-lighter/20 dark:border-white/10 pt-4">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
