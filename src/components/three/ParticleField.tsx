"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count: number;
  color: string;
  secondaryColor?: string;
  spread: [number, number, number]; // x, y, z bounding box
  speed?: number;
  opacity?: number;
  position?: [number, number, number];
  size?: number;
}

export function ParticleField({
  count,
  color,
  secondaryColor,
  spread,
  speed = 0.3,
  opacity = 0.6,
  position = [0, 0, 0],
  size = 0.05,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, colors, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 3); // random offsets for animation

    const colorA = new THREE.Color(color);
    const colorB = secondaryColor ? new THREE.Color(secondaryColor) : colorA;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread[0];
      positions[i3 + 1] = (Math.random() - 0.5) * spread[1];
      positions[i3 + 2] = (Math.random() - 0.5) * spread[2];

      seeds[i3] = Math.random() * Math.PI * 2;
      seeds[i3 + 1] = Math.random() * Math.PI * 2;
      seeds[i3 + 2] = 0.5 + Math.random() * 0.5; // speed multiplier

      const mixColor = Math.random() > 0.5 ? colorA : colorB;
      colors[i3] = mixColor.r;
      colors[i3 + 1] = mixColor.g;
      colors[i3 + 2] = mixColor.b;
    }

    return { positions, colors, seeds };
  }, [count, color, secondaryColor, spread]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta * speed;
    const t = timeRef.current;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const sx = seeds[i3];
      const sy = seeds[i3 + 1];
      const sm = seeds[i3 + 2];

      // Gentle bobbing
      posArray[i3 + 1] += Math.sin(t * sm + sx) * 0.002;

      // Subtle horizontal drift
      posArray[i3] += Math.cos(t * sm * 0.5 + sy) * 0.001;

      // Wrap around bounds
      if (posArray[i3 + 1] > spread[1] / 2) posArray[i3 + 1] = -spread[1] / 2;
      if (posArray[i3 + 1] < -spread[1] / 2) posArray[i3 + 1] = spread[1] / 2;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        transparent
        opacity={opacity}
        vertexColors
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
