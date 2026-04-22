"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { VRHeadsetModel } from "./VRHeadsetModel";
import { InsulinPenModel } from "./InsulinPenModel";
import { HeartModel } from "./HeartModel";
import { ParticleField } from "./ParticleField";
import type { DeviceTier } from "./useDeviceCapability";

interface HeroSceneProps {
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

function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const state = useRef({
    active: false,
    delay: Math.random() * 300 + 100,
    elapsed: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    life: 0,
    maxLife: 60 + Math.random() * 40,
  });

  const reset = () => {
    const s = state.current;
    s.x = (Math.random() - 0.3) * 15;
    s.y = 3 + Math.random() * 4;
    const angle = (210 + Math.random() * 30) * (Math.PI / 180);
    const speed = 0.12 + Math.random() * 0.1;
    s.vx = Math.cos(angle) * speed;
    s.vy = -Math.sin(angle) * speed;
    s.life = 0;
    s.maxLife = 60 + Math.random() * 40;
    s.delay = 150 + Math.random() * 250;
    s.elapsed = 0;
    s.active = false;
  };

  useFrame(() => {
    if (!ref.current) return;
    const s = state.current;

    s.elapsed++;
    if (!s.active) {
      if (s.elapsed > s.delay) s.active = true;
      else {
        ref.current.visible = false;
        if (trailRef.current) trailRef.current.visible = false;
        return;
      }
    }

    s.life++;
    s.x += s.vx;
    s.y += s.vy;

    const progress = s.life / s.maxLife;
    let alpha: number;
    if (progress < 0.1) alpha = progress / 0.1;
    else if (progress < 0.6) alpha = 1;
    else alpha = 1 - (progress - 0.6) / 0.4;
    alpha = Math.max(0, Math.min(1, alpha));

    ref.current.visible = true;
    ref.current.position.set(s.x, s.y, -5);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = alpha;

    if (trailRef.current) {
      trailRef.current.visible = true;
      trailRef.current.position.set(s.x - s.vx * 15, s.y - s.vy * 15, -5);
      trailRef.current.lookAt(s.x, s.y, -5);
      (trailRef.current.material as THREE.MeshBasicMaterial).opacity = alpha * 0.3;
    }

    if (s.life >= s.maxLife || s.y < -8 || s.x < -15) {
      reset();
    }
  });

  return (
    <>
      <mesh ref={ref} visible={false}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>
      <mesh ref={trailRef} visible={false}>
        <boxGeometry args={[0.02, 0.02, 2]} />
        <meshBasicMaterial
          color="#b4d8f0"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

function RotatingRing({ scrollRef }: { scrollRef: HeroSceneProps["scrollRef"] }) {
  const ringRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    timeRef.current += delta;
    const heroProgress = scrollRef.current?.heroProgress ?? 0;
    ringRef.current.rotation.z = heroProgress * Math.PI * 2;

    // Gentle wobble
    ringRef.current.rotation.x = Math.sin(timeRef.current * 0.5) * 0.1;
  });

  return (
    <group ref={ringRef}>
      <mesh>
        <torusGeometry args={[2.5, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#d4e6f1"
          transparent
          opacity={0.15}
          emissive="#2980b9"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Orbiting dots */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial
          color="#2980b9"
          emissive="#2980b9"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[0, -2.5, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

export function HeroScene({ scrollRef, theme, tier }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const modelOpacities = useRef({ vr: 1, pen: 0, heart: 0 });
  const visibleRef = useRef(true);

  const particleCount = tier === "high" ? 1500 : 500;

  useFrame(() => {
    const heroProgress = scrollRef.current?.heroProgress ?? 0;
    const phase = scrollRef.current?.phase ?? 0;

    // Fade out entire hero when scrolled past
    const pageProgress = scrollRef.current?.progress ?? 0;
    visibleRef.current = pageProgress < 0.4;

    if (groupRef.current) {
      groupRef.current.visible = visibleRef.current;
      // Subtle parallax
      groupRef.current.position.y = heroProgress * -2;
    }

    // Smooth opacity transitions for models
    const target = { vr: 0, pen: 0, heart: 0 };
    if (phase === 0) target.vr = 1;
    else if (phase === 1) target.pen = 1;
    else target.heart = 1;

    const lerpSpeed = 0.08;
    modelOpacities.current.vr += (target.vr - modelOpacities.current.vr) * lerpSpeed;
    modelOpacities.current.pen += (target.pen - modelOpacities.current.pen) * lerpSpeed;
    modelOpacities.current.heart += (target.heart - modelOpacities.current.heart) * lerpSpeed;
  });

  return (
    <group ref={groupRef}>
      {/* Stars (dark mode only) */}
      {theme.isDark && (
        <Stars
          radius={80}
          depth={60}
          count={tier === "high" ? 4000 : 2000}
          factor={4}
          saturation={0.2}
          fade
          speed={0.5}
        />
      )}

      {/* Shooting stars (dark mode) */}
      {theme.isDark &&
        Array.from({ length: tier === "high" ? 4 : 2 }).map((_, i) => (
          <ShootingStar key={`meteor-${i}`} />
        ))}

      {/* Rotating ring */}
      <RotatingRing scrollRef={scrollRef} />

      {/* Center models — all render, opacity controls visibility */}
      <group position={[0, 0, 0]}>
        <VRHeadsetModel
          visible={modelOpacities.current.vr > 0.01}
          opacity={modelOpacities.current.vr}
        />
        <InsulinPenModel
          visible={modelOpacities.current.pen > 0.01}
          opacity={modelOpacities.current.pen}
        />
        <HeartModel
          visible={modelOpacities.current.heart > 0.01}
          opacity={modelOpacities.current.heart}
        />
      </group>

      {/* Ambient particles */}
      <ParticleField
        count={particleCount}
        color={theme.colors.particleA}
        secondaryColor={theme.colors.particleB}
        spread={[20, 15, 10]}
        speed={0.2}
        opacity={0.4}
        size={0.04}
      />

      {/* Nebula glows (dark mode) — emissive spheres */}
      {theme.isDark && (
        <>
          <mesh position={[6, 4, -15]}>
            <sphereGeometry args={[5, 16, 16]} />
            <meshBasicMaterial
              color="#5eadd5"
              transparent
              opacity={0.03}
            />
          </mesh>
          <mesh position={[-5, -3, -12]}>
            <sphereGeometry args={[4, 16, 16]} />
            <meshBasicMaterial
              color="#7864c8"
              transparent
              opacity={0.02}
            />
          </mesh>
          <mesh position={[0, 0, -10]}>
            <sphereGeometry args={[3, 16, 16]} />
            <meshBasicMaterial
              color="#5eadd5"
              transparent
              opacity={0.02}
            />
          </mesh>
        </>
      )}
    </group>
  );
}
