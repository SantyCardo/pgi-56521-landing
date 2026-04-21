"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Proyecto", href: "#proyecto" },
  { label: "Problema", href: "#problema" },
  { label: "Objetivos", href: "#objetivos" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Contacto", href: "#contacto" },
];

const SECTION_IDS = LINKS.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-50% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 dark:bg-[#080e1a]/85 backdrop-blur-xl saturate-150 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] border-b border-primary-lighter/40 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <motion.a
          href="#inicio"
          className="font-[family-name:var(--font-playfair)] text-xl font-bold text-primary dark:text-primary-lighter"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          VR Insulinización
        </motion.a>

        {/* Desktop links + theme toggle */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            {LINKS.map((l) => {
              const isActive = activeSection === l.href.replace("#", "");
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-primary-light" : "text-dark/70 dark:text-primary-lighter/70 hover:text-primary-light"
                    }`}
                  >
                    {l.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-light to-accent rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="text-primary dark:text-primary-lighter p-2"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
            className="md:hidden bg-white/90 dark:bg-[#080e1a]/90 backdrop-blur-xl saturate-150 border-t border-primary-lighter/30 dark:border-white/10 overflow-hidden"
          >
            <ul className="flex flex-col py-4 px-6 gap-1">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block py-2.5 text-sm font-medium transition-colors ${
                      activeSection === l.href.replace("#", "")
                        ? "text-primary-light"
                        : "text-dark/70 dark:text-primary-lighter/70 hover:text-primary-light"
                    }`}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
