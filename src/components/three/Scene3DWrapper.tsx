"use client";

import SceneContainer from "./SceneContainer";
import { HeroScene } from "./HeroScene";
import { SectionBackgrounds } from "./SectionBackground3D";
import { useScrollRig } from "./ScrollRig";
import { useThreeTheme } from "./ThreeThemeContext";
import { useDeviceCapability } from "./useDeviceCapability";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

function PostprocessingEffects() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.4}
        intensity={0.5}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0008, 0.0008)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette
        offset={0.1}
        darkness={0.4}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

function SceneContent() {
  const scrollRef = useScrollRig();
  const theme = useThreeTheme();
  const { tier } = useDeviceCapability();

  return (
    <>
      {/* Global lighting */}
      <ambientLight intensity={theme.isDark ? 0.3 : 0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={theme.isDark ? 0.6 : 0.8}
        color={theme.isDark ? "#4a9eda" : "#ffffff"}
      />
      {theme.isDark && (
        <pointLight
          position={[-5, 2, -5]}
          intensity={0.4}
          color="#0ea5e9"
        />
      )}

      <HeroScene scrollRef={scrollRef} theme={theme} tier={tier} />
      <SectionBackgrounds scrollRef={scrollRef} theme={theme} tier={tier} />

      {/* Postprocessing only for high-tier devices */}
      {tier === "high" && <PostprocessingEffects />}
    </>
  );
}

export default function Scene3DWrapper() {
  return (
    <SceneContainer>
      <SceneContent />
    </SceneContainer>
  );
}
