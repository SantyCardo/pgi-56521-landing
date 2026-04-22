"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface ScrollState {
  progress: number; // 0-1 overall page scroll
  heroProgress: number; // 0-1 within hero section
  phase: number; // 0, 1, or 2
}

const ScrollContext = createContext<React.RefObject<ScrollState>>(
  { current: { progress: 0, heroProgress: 0, phase: 0 } } as React.RefObject<ScrollState>
);

/**
 * Place inside R3F Canvas. Reads scroll from DOM each frame.
 */
export function ScrollRig() {
  const stateRef = useRef<ScrollState>({
    progress: 0,
    heroProgress: 0,
    phase: 0,
  });

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;

      // Hero is min-h-[300vh], so hero ends at roughly 2 * window.innerHeight
      const heroEnd = window.innerHeight * 2;
      const heroProgress = Math.min(1, scrollTop / heroEnd);

      let phase = 0;
      if (heroProgress >= 0.66) phase = 2;
      else if (heroProgress >= 0.33) phase = 1;

      stateRef.current = { progress, heroProgress, phase };
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ScrollContext.Provider value={stateRef}>
      {null}
    </ScrollContext.Provider>
  );
}

/**
 * Hook for R3F components to read scroll state each frame.
 * Returns a ref that updates every frame — read inside useFrame.
 */
export function useScrollState(): React.RefObject<ScrollState> {
  return useContext(ScrollContext);
}

/**
 * Standalone hook: read scroll values reactively inside R3F useFrame.
 * Returns current scroll state (read in useFrame callback).
 */
export function useScrollRig() {
  const ref = useRef<ScrollState>({
    progress: 0,
    heroProgress: 0,
    phase: 0,
  });

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;

      const heroEnd = window.innerHeight * 2;
      const heroProgress = Math.min(1, scrollTop / heroEnd);

      let phase = 0;
      if (heroProgress >= 0.66) phase = 2;
      else if (heroProgress >= 0.33) phase = 1;

      ref.current = { progress, heroProgress, phase };
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return ref;
}

/**
 * Lerp helper for smooth transitions inside useFrame.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
