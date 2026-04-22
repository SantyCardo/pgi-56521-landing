"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "medium" | "low";

interface DeviceCapability {
  tier: DeviceTier;
  isMobile: boolean;
}

let cachedResult: DeviceCapability | null = null;

function detect(): DeviceCapability {
  if (cachedResult) return cachedResult;

  const isMobile =
    /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || navigator.maxTouchPoints > 1;

  // Check for WebGL support
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl2") || canvas.getContext("webgl");

  if (!gl) {
    cachedResult = { tier: "low", isMobile };
    return cachedResult;
  }

  // Try to get GPU info
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = debugInfo
    ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
    : "";

  // Known low-end GPUs
  const lowEndPatterns = [
    "mali-4",
    "mali-t",
    "adreno 3",
    "adreno 4",
    "powervr",
    "intel hd 4",
    "intel hd 5",
    "swiftshader",
    "llvmpipe",
    "software",
  ];
  const isLowEnd = lowEndPatterns.some((p) => renderer.includes(p));

  // Check hardware concurrency
  const cores = navigator.hardwareConcurrency || 2;

  let tier: DeviceTier;
  if (isLowEnd || cores <= 2) {
    tier = "low";
  } else if (isMobile || cores <= 4) {
    tier = "medium";
  } else {
    tier = "high";
  }

  cachedResult = { tier, isMobile };
  return cachedResult;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    tier: "medium",
    isMobile: false,
  });

  useEffect(() => {
    setCapability(detect());
  }, []);

  return capability;
}

export function getDeviceCapability(): DeviceCapability {
  if (cachedResult) return cachedResult;
  return { tier: "medium", isMobile: false };
}
