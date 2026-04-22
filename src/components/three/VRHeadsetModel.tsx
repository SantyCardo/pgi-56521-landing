"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface VRHeadsetModelProps {
  visible: boolean;
  opacity: number;
}

export function VRHeadsetModel({ visible, opacity }: VRHeadsetModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const dataStreamRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // Lens glow material
  const lensMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d4e6f1",
        emissive: "#0ea5e9",
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a5276",
        metalness: 0.3,
        roughness: 0.6,
        transparent: true,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2980b9",
        metalness: 0.2,
        roughness: 0.5,
        transparent: true,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current || !visible) return;
    timeRef.current += delta;

    // Gentle float
    groupRef.current.position.y = Math.sin(timeRef.current * 0.8) * 0.1;
    groupRef.current.rotation.y = Math.sin(timeRef.current * 0.3) * 0.1;

    // Animate data streams
    if (dataStreamRef.current) {
      dataStreamRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        mesh.position.y = ((timeRef.current * 2 + i * 0.5) % 3) - 0.5;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.opacity = 0.4 * (1 - mesh.position.y / 2.5);
      });
    }

    // Update opacity on all materials
    bodyMaterial.opacity = opacity;
    accentMaterial.opacity = opacity;
    lensMaterial.opacity = opacity * 0.8;
  });

  if (!visible && opacity <= 0.01) return null;

  return (
    <group ref={groupRef} scale={opacity}>
      {/* Main body */}
      <mesh material={bodyMaterial} position={[0, 0, 0]}>
        <boxGeometry args={[3, 1.4, 1.2, 4, 4, 4]} />
      </mesh>

      {/* Left lens housing */}
      <mesh material={accentMaterial} position={[-0.65, 0.05, 0.5]}>
        <cylinderGeometry args={[0.45, 0.45, 0.3, 24]} />
      </mesh>
      {/* Left lens */}
      <mesh material={lensMaterial} position={[-0.65, 0.05, 0.66]}>
        <circleGeometry args={[0.35, 24]} />
      </mesh>

      {/* Right lens housing */}
      <mesh material={accentMaterial} position={[0.65, 0.05, 0.5]}>
        <cylinderGeometry args={[0.45, 0.45, 0.3, 24]} />
      </mesh>
      {/* Right lens */}
      <mesh material={lensMaterial} position={[0.65, 0.05, 0.66]}>
        <circleGeometry args={[0.35, 24]} />
      </mesh>

      {/* Nose bridge */}
      <mesh position={[0, -0.3, 0.4]}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial color="#0c2d42" transparent opacity={opacity} />
      </mesh>

      {/* Straps */}
      <mesh position={[-1.6, 0.1, 0]} rotation={[0, 0, Math.PI * 0.1]}>
        <boxGeometry args={[0.4, 0.15, 0.1]} />
        <meshStandardMaterial color="#1a5276" transparent opacity={opacity} />
      </mesh>
      <mesh position={[1.6, 0.1, 0]} rotation={[0, 0, -Math.PI * 0.1]}>
        <boxGeometry args={[0.4, 0.15, 0.1]} />
        <meshStandardMaterial color="#1a5276" transparent opacity={opacity} />
      </mesh>

      {/* Data streams rising from lenses */}
      <group ref={dataStreamRef}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              i < 3 ? -0.65 + (i - 1) * 0.15 : 0.65 + (i - 4) * 0.15,
              0.5,
              0.5,
            ]}
          >
            <boxGeometry args={[0.04, 0.15, 0.04]} />
            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#0ea5e9"
              emissiveIntensity={0.8}
              transparent
              opacity={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
