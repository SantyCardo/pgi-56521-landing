"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { animate } from "animejs";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Proyecto", href: "#proyecto" },
  { label: "Problema", href: "#problema" },
  { label: "Objetivos", href: "#objetivos" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Alcance", href: "#alcance" },
  { label: "Contacto", href: "#contacto" },
];

const SECTION_IDS = LINKS.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    if (navRef.current) {
      animate(navRef.current, {
        translateY: [-80, 0],
        duration: 600,
        ease: "outExpo",
      });
    }
  }, []);

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

  // Animate mobile menu open/close
  const toggleMenu = useCallback(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (!open) {
      menu.style.display = "block";
      animate(menu, {
        height: [0, menu.scrollHeight],
        opacity: [0, 1],
        duration: 300,
        ease: "outExpo",
      });
      // Stagger menu items
      const items = menu.querySelectorAll(".nav-mobile-item");
      animate(items, {
        translateX: [-20, 0],
        opacity: [0, 1],
        duration: 300,
        delay: (_el: Element, i: number) => i * 50,
        ease: "outExpo",
      });
    } else {
      animate(menu, {
        height: [menu.scrollHeight, 0],
        opacity: [1, 0],
        duration: 250,
        ease: "outQuad",
        onComplete: () => { menu.style.display = "none"; },
      });
    }
    setOpen(!open);
  }, [open]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 dark:bg-[#060d14]/85 backdrop-blur-xl saturate-150 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] border-b border-primary/10 dark:border-white/10"
          : "bg-transparent"
      }`}
      style={{ transform: "translateY(-80px)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-primary dark:text-primary-lighter">
            VR Insulinización
          </span>
          <span className="hidden sm:inline-block h-4 w-px bg-primary/20 dark:bg-white/20" />
          <span className="hidden sm:inline-block font-mono text-[9px] text-muted dark:text-primary-lighter/40 tracking-wider">
            2026
          </span>
        </a>

        {/* Desktop links + theme toggle */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-5">
            {LINKS.map((l) => {
              const isActive = activeSection === l.href.replace("#", "");
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    className={`font-mono text-xs tracking-wider transition-colors duration-300 ${
                      isActive ? "text-primary-light" : "text-muted dark:text-primary-lighter/60 hover:text-primary-light"
                    }`}
                  >
                    {l.label}
                  </a>
                  {isActive && (
                    <div
                      ref={underlineRef}
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-primary-light to-accent"
                    />
                  )}
                </li>
              );
            })}
          </ul>
          <div className="h-4 w-px bg-primary/10 dark:bg-white/10" />
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
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
      <div
        ref={mobileMenuRef}
        className="md:hidden bg-white/90 dark:bg-[#060d14]/95 backdrop-blur-xl saturate-150 border-t border-primary/10 dark:border-white/10 overflow-hidden"
        style={{ display: "none", height: 0 }}
      >
        <ul className="flex flex-col py-4 px-6 gap-1">
          {LINKS.map((l) => (
            <li key={l.href} className="nav-mobile-item opacity-0">
              <a
                href={l.href}
                onClick={() => {
                  setOpen(false);
                  if (mobileMenuRef.current) {
                    mobileMenuRef.current.style.display = "none";
                    mobileMenuRef.current.style.height = "0";
                  }
                }}
                className={`block py-2.5 font-mono text-xs tracking-wider transition-colors ${
                  activeSection === l.href.replace("#", "")
                    ? "text-primary-light"
                    : "text-muted dark:text-primary-lighter/60 hover:text-primary-light"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
