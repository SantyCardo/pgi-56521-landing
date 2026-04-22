"use client";

import { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

// Extend to register Three.Line as 'threeLine' to avoid conflict with SVG <line>
extend({ ThreeLine: THREE.Line });

interface HeartModelProps {
  visible: boolean;
  opacity: number;
}

function createHeartShape(): THREE.Shape {
  const shape = new THREE.Shape();
  const x = 0, y = 0;

  shape.moveTo(x, y + 0.5);
  shape.bezierCurveTo(x, y + 0.5, x - 0.5, y + 1.3, x - 1.2, y + 1.3);
  shape.bezierCurveTo(x - 2, y + 1.3, x - 2, y + 0.5, x - 2, y + 0.5);
  shape.bezierCurveTo(x - 2, y, x - 1.2, y - 0.8, x, y - 1.5);
  shape.bezierCurveTo(x + 1.2, y - 0.8, x + 2, y, x + 2, y + 0.5);
  shape.bezierCurveTo(x + 2, y + 0.5, x + 2, y + 1.3, x + 1.2, y + 1.3);
  shape.bezierCurveTo(x + 0.5, y + 1.3, x, y + 0.5, x, y + 0.5);

  return shape;
}

export function HeartModel({ visible, opacity }: HeartModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);
  const ecgRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const heartShape = useMemo(() => createHeartShape(), []);

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 3,
    }),
    []
  );

  // ECG line geometry
  const ecgGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 60;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      let y = 0;

      // ECG waveform pattern
      const phase = (i / segments) * 4;
      if (phase > 1.5 && phase < 1.7) y = -0.5;
      else if (phase > 1.7 && phase < 1.9) y = 1.2;
      else if (phase > 1.9 && phase < 2.1) y = -0.8;
      else if (phase > 2.1 && phase < 2.3) y = 0.3;
      else y = Math.sin(t * 2) * 0.05;

      points.push(new THREE.Vector3((i / segments) * 5 - 2.5, y * 0.5, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const heartMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a5276",
        metalness: 0.2,
        roughness: 0.6,
        transparent: true,
        side: THREE.DoubleSide,
      }),
    []
  );

  const innerHeartMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2980b9",
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current || !visible) return;
    timeRef.current += delta;

    // Heartbeat pulse
    const beat = 1 + Math.sin(timeRef.current * 4) * 0.05;
    groupRef.current.scale.set(
      beat * opacity,
      beat * opacity,
      beat * opacity
    );
    groupRef.current.position.y = Math.sin(timeRef.current * 0.6) * 0.08;
    groupRef.current.rotation.y = Math.sin(timeRef.current * 0.4) * 0.1;

    // Pulse ring expansion
    if (pulseRingRef.current) {
      const ringScale = 1 + ((timeRef.current * 0.7) % 1) * 1.5;
      pulseRingRef.current.scale.set(ringScale, ringScale, 1);
      const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity * 0.3 * (1 - ((timeRef.current * 0.7) % 1));
    }

    // ECG line scroll
    if (ecgRef.current) {
      ecgRef.current.position.x = -((timeRef.current * 0.5) % 1) * 0.5;
    }

    heartMaterial.opacity = opacity;
    innerHeartMaterial.opacity = opacity * 0.5;
  });

  if (!visible && opacity <= 0.01) return null;

  return (
    <group ref={groupRef}>
      {/* Main heart */}
      <mesh material={heartMaterial} rotation={[0, 0, Math.PI]} position={[0, 0.3, 0]}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
      </mesh>

      {/* Inner heart (smaller, lighter) */}
      <mesh material={innerHeartMaterial} rotation={[0, 0, Math.PI]} position={[0, 0.3, 0.15]} scale={0.7}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
      </mesh>

      {/* ECG line */}
      <group ref={ecgRef} position={[0, -0.2, 0.6]}>
        <primitive
          object={new THREE.Line(
            ecgGeometry,
            new THREE.LineBasicMaterial({ color: "#d4e6f1", transparent: true, opacity: 0.8 })
          )}
        />
      </group>

      {/* Pulse ring */}
      <mesh ref={pulseRingRef} position={[0, 0, 0.4]}>
        <ringGeometry args={[1, 1.05, 32]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cross symbol */}
      <mesh position={[0, 1.6, 0.3]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={opacity * 0.4}
        />
      </mesh>
      <mesh position={[0, 1.6, 0.3]}>
        <boxGeometry args={[0.1, 0.3, 0.05]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={opacity * 0.4}
        />
      </mesh>
    </group>
  );
}
