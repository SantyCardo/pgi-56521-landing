"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import type { DeviceTier } from "./useDeviceCapability";
import * as THREE from "three";

interface SectionBackgroundsProps {
  scrollRef: React.RefObject<{ progress: number; heroProgress: number; phase: number }>;
  theme: {
    isDark: boolean;
    colors: {
      primary: string;
      primaryLight: string;
      accent: string;
      particleA: string;
      particleB: string;
    };
  };
  tier: DeviceTier;
}

function FloatingMolecule({ position, speed = 0.5 }: { position: [number, number, number]; speed?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta * speed;
    groupRef.current.rotation.x = Math.sin(timeRef.current) * 0.5;
    groupRef.current.rotation.y = timeRef.current * 0.3;
    groupRef.current.position.y = position[1] + Math.sin(timeRef.current * 0.7) * 0.3;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Central atom */}
      <mesh>
        <icosahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Orbital atoms */}
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.4, Math.sin(a) * 0.4, 0]}>
            <octahedronGeometry args={[0.06, 0]} />
            <meshStandardMaterial
              color="#2980b9"
              wireframe
              transparent
              opacity={0.25}
            />
          </mesh>
        );
      })}
      {/* Bonds */}
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        const target = new THREE.Vector3(Math.cos(a) * 0.4, Math.sin(a) * 0.4, 0);
        const mid = target.clone().multiplyScalar(0.5);
        return (
          <mesh key={`bond-${i}`} position={[mid.x, mid.y, mid.z]}>
            <boxGeometry args={[0.01, target.length(), 0.01]} />
            <meshBasicMaterial color="#d4e6f1" transparent opacity={0.15} />
          </mesh>
        );
      })}
    </group>
  );
}

function DotGrid({ position, scrollProgress }: { position: [number, number, number]; scrollProgress: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, basePositions } = (() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const gridSize = 20;
    const cols = gridSize;
    const rows = count / cols;

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col / cols - 0.5) * 12;
      const y = (row / rows - 0.5) * 8;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = 0;
    }
    return { positions, basePositions };
  })();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    const posAttr = meshRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;
    const count = posArray.length / 3;

    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      // Wave effect
      posArray[i * 3 + 2] =
        Math.sin(bx * 0.5 + timeRef.current) *
        Math.cos(by * 0.5 + timeRef.current * 0.7) *
        0.3;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#0ea5e9"
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function SectionBackgrounds({ scrollRef, theme, tier }: SectionBackgroundsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const particleCount = tier === "high" ? 300 : 150;

  useFrame(() => {
    if (!groupRef.current) return;
    const progress = scrollRef.current?.progress ?? 0;
    // Only show section backgrounds when past hero
    groupRef.current.visible = progress > 0.05;
    // Parallax — shift up as user scrolls
    groupRef.current.position.y = -progress * 50;
  });

  return (
    <group ref={groupRef}>
      {/* ProblemaSection — red/orange urgency particles */}
      <ParticleField
        count={particleCount}
        color="#e74c3c"
        secondaryColor="#f39c12"
        spread={[15, 8, 5]}
        speed={0.15}
        opacity={0.2}
        position={[0, -12, -5]}
        size={0.03}
      />

      {/* ObjetivosSection — floating molecules */}
      <group position={[0, -24, -3]}>
        <FloatingMolecule position={[-4, 0, 0]} speed={0.3} />
        <FloatingMolecule position={[4, 1, -1]} speed={0.4} />
        <FloatingMolecule position={[0, -2, 1]} speed={0.25} />
        <FloatingMolecule position={[-3, 2, -2]} speed={0.35} />
        <FloatingMolecule position={[3, -1, 0]} speed={0.45} />
      </group>

      {/* MetodologiaSection — blue flow particles */}
      <ParticleField
        count={particleCount}
        color="#2980b9"
        secondaryColor="#0ea5e9"
        spread={[15, 8, 5]}
        speed={0.25}
        opacity={0.15}
        position={[0, -36, -5]}
        size={0.03}
      />

      {/* TecnologiaSection — dot grid wave */}
      <DotGrid position={[0, -48, -8]} scrollProgress={scrollRef.current?.progress ?? 0} />
    </group>
  );
}
