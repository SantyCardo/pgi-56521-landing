"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative mx-auto w-full max-w-4xl h-8 flex items-center overflow-hidden">
      {/* Base gradient line */}
      <motion.div
        className="absolute inset-x-0 h-px top-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(41,128,185,0.3) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
      />

      {/* Animated particles flowing left to right */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            top: `${40 + Math.sin(i * 1.3) * 20}%`,
            background: i % 2 === 0 ? "#0ea5e9" : "#2980b9",
            boxShadow: `0 0 6px ${i % 2 === 0 ? "rgba(14,165,233,0.5)" : "rgba(41,128,185,0.4)"}`,
          }}
          initial={{ x: "-10%", opacity: 0 }}
          whileInView={{
            x: ["0%", "100%"],
            opacity: [0, 0.8, 0.8, 0],
          }}
          viewport={{ once: false }}
          transition={{
            duration: 3 + i * 0.5,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Center glow pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/60"
        initial={{ scale: 0 }}
        whileInView={{ scale: [1, 1.5, 1] }}
        viewport={{ once: false }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: "0 0 12px rgba(14,165,233,0.4)" }}
      />
    </div>
  );
}
