"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface InsulinPenModelProps {
  visible: boolean;
  opacity: number;
}

export function InsulinPenModel({ visible, opacity }: InsulinPenModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const dropletRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a5276",
        metalness: 0.4,
        roughness: 0.4,
        transparent: true,
      }),
    []
  );

  const windowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d4e6f1",
        emissive: "#d4e6f1",
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current || !visible) return;
    timeRef.current += delta;

    // Gentle rotation
    groupRef.current.rotation.z = Math.sin(timeRef.current * 0.5) * 0.05;
    groupRef.current.position.y = Math.sin(timeRef.current * 0.7) * 0.08;

    // Droplet pulse
    if (dropletRef.current) {
      const s = 1 + Math.sin(timeRef.current * 3) * 0.2;
      dropletRef.current.scale.set(s, s, s);
      const mat = dropletRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = opacity * (0.5 + Math.sin(timeRef.current * 3) * 0.2);
    }

    bodyMaterial.opacity = opacity;
    windowMaterial.opacity = opacity * 0.8;
  });

  if (!visible && opacity <= 0.01) return null;

  return (
    <group ref={groupRef} rotation={[0, 0, -Math.PI * 0.05]} scale={opacity}>
      {/* Main body cylinder */}
      <mesh material={bodyMaterial} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 3.2, 24]} />
      </mesh>

      {/* Dosage window */}
      <mesh material={windowMaterial} position={[-0.2, 0, 0.28]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.35, 0.8, 0.05]} />
      </mesh>

      {/* Graduation marks */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[-0.8 + i * 0.2, 0.29, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <boxGeometry args={[0.02, i % 2 === 0 ? 0.12 : 0.08, 0.02]} />
          <meshStandardMaterial
            color="#d4e6f1"
            transparent
            opacity={opacity * 0.6}
          />
        </mesh>
      ))}

      {/* Needle cap */}
      <mesh position={[1.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.18, 0.5, 16]} />
        <meshStandardMaterial
          color="#2980b9"
          metalness={0.3}
          roughness={0.5}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Needle */}
      <mesh position={[2.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.01, 0.5, 8]} />
        <meshStandardMaterial
          color="#5d6d7e"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Plunger button */}
      <mesh position={[-1.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.3, 0.4, 16]} />
        <meshStandardMaterial
          color="#0c2d42"
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Droplet at needle tip */}
      <mesh ref={dropletRef} position={[2.6, -0.05, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.6}
          transparent
          opacity={opacity * 0.7}
        />
      </mesh>

      {/* Orbital dots */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={`dot-${i}`}
            position={[
              Math.cos(angle) * 0.8,
              -1.3 + Math.sin(angle) * 0.8,
              0,
            ]}
          >
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#0ea5e9"
              emissiveIntensity={0.5}
              transparent
              opacity={opacity * 0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}
