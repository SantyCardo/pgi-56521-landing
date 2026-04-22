"use client";

import dynamic from "next/dynamic";
import type { IconType } from "@/components/three/InlineIcon3D";

const InlineIcon3D = dynamic(
  () => import("@/components/three/InlineIcon3D"),
  { ssr: false, loading: () => <div className="w-12 h-12" /> }
);

export default function InlineIcon3DLoader({ type, className = "" }: { type: IconType; className?: string }) {
  return <InlineIcon3D type={type} className={className} />;
}
