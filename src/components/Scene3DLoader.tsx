"use client";

import dynamic from "next/dynamic";

const Scene3DWrapper = dynamic(
  () => import("@/components/three/Scene3DWrapper"),
  { ssr: false }
);

export default function Scene3DLoader() {
  return <Scene3DWrapper />;
}
