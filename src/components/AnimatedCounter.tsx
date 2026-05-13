"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface AnimatedCounterProps {
  target: string;
  className?: string;
}

export default function AnimatedCounter({ target, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  const match = target.match(/^([<>]?)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numericValue = parseFloat(match?.[2] ?? "0");
  const suffix = match?.[3] ?? "";
  const isInteger = Number.isInteger(numericValue);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired.current) {
        fired.current = true;
        const obj = { val: 0 };
        animate(obj, {
          val: numericValue,
          duration: 1500,
          ease: "outExpo",
          onUpdate: () => {
            if (ref.current) {
              const display = isInteger ? Math.round(obj.val) : obj.val.toFixed(1);
              ref.current.textContent = `${prefix}${display}${suffix}`;
            }
          },
        });
      }
    }, { threshold: 0.5 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [numericValue, prefix, suffix, isInteger]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
