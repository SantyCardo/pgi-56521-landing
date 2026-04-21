"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-dark dark:bg-[#060f1a] text-primary-lighter/50 px-4">
      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-lighter/30 to-transparent" />

      <div className="max-w-5xl mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center md:text-left">
          &copy; 2026 Proyecto PGI 56521 — Prototipo Educativo Inmersivo para Insulinización.
          <span className="block md:inline md:ml-1">Universidad Autónoma de Bucaramanga (UNAB).</span>
        </p>

        <motion.button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-sm text-primary-lighter/60 hover:text-primary-lighter transition-colors"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Volver arriba
          <motion.svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <path d="M8 13V3M3 7l5-5 5 5" />
          </motion.svg>
        </motion.button>
      </div>
    </footer>
  );
}
