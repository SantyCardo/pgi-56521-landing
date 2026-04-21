"use client";

import { motion } from "framer-motion";

const team = [
  { name: "Santiago Cardona Prada", initials: "SC", role: "Co-investigador", type: "Ingenieria de Sistemas, UNAB" },
  { name: "Brayan Steven León Martinez", initials: "BL", role: "Co-investigador", type: "Ingenieria de Sistemas, UNAB" },
  { name: "Leonardo Stiven Pardo Niño", initials: "LP", role: "Director", type: "Proyecto de Grado" },
];

const advisors = [
  { name: "Dra. Ana Maria Ospina Galeano", role: "Asesora temática" },
  { name: "Dr. Jaime Gomez", role: "Asesor temático" },
];

export default function ContactoSection() {
  return (
    <section id="contacto" className="relative py-24 px-4 text-primary dark:text-white overflow-hidden">
      {/* Light mode background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8f0f8] to-[#f0f6fb] dark:hidden" />
      {/* Dark mode background */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: "linear-gradient(135deg, #0c2d42 0%, #1a5276 40%, #0c2d42 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          background: "radial-gradient(ellipse at 80% 20%, #0ea5e9 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #2980b9 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            Equipo de Investigación
          </h2>
          <motion.div
            className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-lighter to-accent mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-muted dark:text-primary-lighter/80 max-w-xl mx-auto">
            Proyecto PGI 56521 — Universidad Autónoma de Bucaramanga (UNAB)
            <br />Facultad de Ingenieria, Programa de Ingenieria de Sistemas
          </p>
        </motion.div>

        {/* Team with avatar initials */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {team.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.25, 0.1, 0, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="text-center p-6 rounded-2xl bg-primary-lighter/30 dark:bg-white/5 border border-primary-lighter/40 dark:border-white/10 hover:bg-primary-lighter/50 dark:hover:bg-white/10 hover:border-primary-light/30 dark:hover:border-accent/20 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)] transition-all duration-500"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center text-white text-xl font-bold shadow-[0_4px_20px_rgba(14,165,233,0.3)]">
                {p.initials}
              </div>
              <h3 className="font-semibold text-lg text-primary dark:text-white">{p.name}</h3>
              <p className="text-primary-light dark:text-primary-lighter text-sm mt-1">{p.role}</p>
              <p className="text-muted dark:text-primary-lighter/60 text-xs mt-0.5">{p.type}</p>
            </motion.div>
          ))}
        </div>

        {/* Advisors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
          className="flex flex-wrap justify-center gap-6 mb-14"
        >
          {advisors.map((a, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-primary-lighter/30 dark:bg-white/5 border border-primary-lighter/40 dark:border-white/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5 text-primary-light dark:text-primary-lighter">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <div>
                <p className="text-sm font-medium text-primary dark:text-white">{a.name}</p>
                <p className="text-muted dark:text-primary-lighter/60 text-xs">{a.role}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Contact info with hover nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-4"
        >
          {[
            {
              icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />,
              icon2: <polyline points="22,6 12,13 2,6" />,
              content: <a href="mailto:santiagocardona2004@gmail.com" className="text-primary-light dark:text-primary-lighter hover:text-primary dark:hover:text-white transition-colors">santiagocardona2004@gmail.com</a>,
            },
            {
              icon: <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />,
              icon2: <circle cx="12" cy="10" r="3" />,
              content: <span className="text-muted dark:text-primary-lighter/80">Bucaramanga, Colombia</span>,
            },
            {
              icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
              content: <span className="text-muted dark:text-primary-lighter/80">Fundación Clínica UNAB — Validación clínica</span>,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-center gap-3"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5 text-primary-light dark:text-primary-lighter">
                {item.icon}
                {item.icon2}
              </svg>
              {item.content}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
