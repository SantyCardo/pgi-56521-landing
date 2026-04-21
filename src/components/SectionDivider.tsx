"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      className="mx-auto h-px w-full max-w-4xl"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(41,128,185,0.3) 0%, transparent 70%)",
      }}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
    />
  );
}
