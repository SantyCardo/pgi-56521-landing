"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, PerformanceMonitor } from "@react-three/drei";
import { ThreeThemeProvider } from "./ThreeThemeContext";
import { useDeviceCapability } from "./useDeviceCapability";

interface SceneContainerProps {
  children: React.ReactNode;
}

export default function SceneContainer({ children }: SceneContainerProps) {
  const { tier } = useDeviceCapability();
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Low tier: don't render Canvas at all
  if (!mounted || tier === "low") return null;

  return (
    <ThreeThemeProvider>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Canvas
          dpr={dpr}
          gl={{
            antialias: tier === "high",
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          camera={{ position: [0, 0, 10], fov: 50 }}
          style={{ background: "transparent" }}
        >
          <PerformanceMonitor
            onDecline={() => setDpr([1, 1])}
            onIncline={() => setDpr([1, 2])}
          />
          <Suspense fallback={null}>
            {children}
          </Suspense>
          <Preload all />
        </Canvas>
      </div>
    </ThreeThemeProvider>
  );
}
