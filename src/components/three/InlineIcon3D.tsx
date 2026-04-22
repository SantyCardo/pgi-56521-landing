"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AutoRotate({ children, speed = 1 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
    }
  });
  return <group ref={ref}>{children}</group>;
}

/* ── Mini VR Headset ── */
function MiniHeadset() {
  return (
    <AutoRotate speed={0.8}>
      <mesh>
        <boxGeometry args={[1.5, 0.8, 0.6]} />
        <meshStandardMaterial color="#1a5276" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[-0.35, 0, 0.25]}>
        <cylinderGeometry args={[0.22, 0.22, 0.15, 16]} />
        <meshStandardMaterial color="#2980b9" />
      </mesh>
      <mesh position={[0.35, 0, 0.25]}>
        <cylinderGeometry args={[0.22, 0.22, 0.15, 16]} />
        <meshStandardMaterial color="#2980b9" />
      </mesh>
      <mesh position={[-0.35, 0, 0.33]}>
        <circleGeometry args={[0.17, 16]} />
        <meshStandardMaterial color="#d4e6f1" emissive="#0ea5e9" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.35, 0, 0.33]}>
        <circleGeometry args={[0.17, 16]} />
        <meshStandardMaterial color="#d4e6f1" emissive="#0ea5e9" emissiveIntensity={0.4} />
      </mesh>
    </AutoRotate>
  );
}

/* ── Mini Book/Tablet ── */
function MiniBook() {
  return (
    <AutoRotate speed={0.6}>
      <mesh>
        <boxGeometry args={[1, 1.3, 0.1]} />
        <meshStandardMaterial color="#1a5276" />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.8, 1.1, 0.01]} />
        <meshStandardMaterial color="#d4e6f1" emissive="#d4e6f1" emissiveIntensity={0.2} />
      </mesh>
      {/* Text lines */}
      {[-0.25, 0, 0.25].map((y, i) => (
        <mesh key={i} position={[0, y, 0.08]}>
          <boxGeometry args={[0.5 - i * 0.1, 0.04, 0.01]} />
          <meshStandardMaterial color="#2980b9" />
        </mesh>
      ))}
    </AutoRotate>
  );
}

/* ── Mini Star ── */
function MiniStar() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
      ref.current.rotation.z += delta * 0.3;
    }
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial
        color="#0ea5e9"
        emissive="#0ea5e9"
        emissiveIntensity={0.4}
        metalness={0.5}
        roughness={0.3}
      />
    </mesh>
  );
}

/* ── Mini Cube (Unity) ── */
function MiniCube() {
  return (
    <AutoRotate speed={1}>
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#1a5276" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.82, 0.82, 0.82]} />
        <meshStandardMaterial color="#2980b9" wireframe transparent opacity={0.3} />
      </mesh>
    </AutoRotate>
  );
}

/* ── Mini Eye (Gaze) ── */
function MiniEye() {
  const irisRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (irisRef.current) {
      irisRef.current.position.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      irisRef.current.position.y = Math.cos(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.6, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color="#f0f6fb" />
      </mesh>
      <mesh ref={irisRef} position={[0, 0, 0.45]}>
        <circleGeometry args={[0.2, 24]} />
        <meshStandardMaterial color="#2980b9" />
      </mesh>
      <mesh position={[0, 0, 0.48]}>
        <circleGeometry args={[0.1, 24]} />
        <meshStandardMaterial color="#0c2d42" />
      </mesh>
    </group>
  );
}

/* ── Mini Phone (APK) ── */
function MiniPhone() {
  return (
    <AutoRotate speed={0.7}>
      <mesh>
        <boxGeometry args={[0.6, 1, 0.06]} />
        <meshStandardMaterial color="#1a5276" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.5, 0.85, 0.01]} />
        <meshStandardMaterial color="#2980b9" emissive="#0ea5e9" emissiveIntensity={0.15} />
      </mesh>
      {/* Download arrow */}
      <mesh position={[0, 0.05, 0.06]}>
        <boxGeometry args={[0.04, 0.25, 0.01]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, -0.1, 0.06]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.04, 0.15, 0.01]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, -0.1, 0.06]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.04, 0.15, 0.01]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </AutoRotate>
  );
}

/* ── Exported components ── */
export type IconType = "headset" | "book" | "star" | "cube" | "eye" | "phone";

const iconMap: Record<IconType, React.FC> = {
  headset: MiniHeadset,
  book: MiniBook,
  star: MiniStar,
  cube: MiniCube,
  eye: MiniEye,
  phone: MiniPhone,
};

export default function InlineIcon3D({ type, className = "" }: { type: IconType; className?: string }) {
  const IconComponent = iconMap[type];
  return (
    <div className={`w-12 h-12 ${className}`}>
      <Canvas
        frameloop="always"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={0.8} />
        <Suspense fallback={null}>
          <IconComponent />
        </Suspense>
      </Canvas>
    </div>
  );
}
