"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  target: string;
  className?: string;
}

export default function AnimatedCounter({ target, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const match = target.match(/^([<>]?)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numericValue = parseFloat(match?.[2] ?? "0");
  const suffix = match?.[3] ?? "";

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.5,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const rounded = Number.isInteger(numericValue)
          ? Math.round(latest)
          : latest.toFixed(1);
        ref.current.textContent = `${prefix}${rounded}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix, numericValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
