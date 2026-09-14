import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useFaceInfo } from "@vincentt-xr/sdk/tracking";
import type { ScreenTransform2DSettings } from "@vincentt-xr/sdk";
import { faceBoundsCenterToScreen } from "./faceOverlayCoordinates";
import {
  BUG_CENTER_Y_OFFSET, BUG_WIDTH_MULTIPLIER, FACE_OVERLAY_VIEWPORT,
  HAT_REFERENCE_FACE_WIDTH, HAT_WIDTH_MULTIPLIER, HAT_Y_OFFSET,
  MAX_HAT_OFFSET, MIN_HAT_OFFSET,
} from "./faceOverlayConstants";

export const useFaceOverlay = (hat: ScreenTransform2DSettings, bug: ScreenTransform2DSettings) => {
  const face = useFaceInfo({ active: true, throttleMs: 0, holdMs: 0 });
  const [hatTransform, setHatTransform] = useState(hat);
  const [bugTransform, setBugTransform] = useState(bug);
  const lastLog = useRef(0);
  useFrame(() => {
    if (!face) return;
    const center = faceBoundsCenterToScreen(face.bounds.centerX, face.bounds.centerY);
    const hatSize = face.bounds.width * FACE_OVERLAY_VIEWPORT.width * HAT_WIDTH_MULTIPLIER;
    const bugSize = face.bounds.width * FACE_OVERLAY_VIEWPORT.width * BUG_WIDTH_MULTIPLIER;
    const angle = face.pose.rotation.z;
    const rotation = (angle * 180) / Math.PI;
    const offset = Math.max(MIN_HAT_OFFSET, Math.min(MAX_HAT_OFFSET,
      HAT_Y_OFFSET * (face.bounds.width / HAT_REFERENCE_FACE_WIDTH)));
    const rotatedOffset = { x: -Math.sin(angle) * offset, y: Math.cos(angle) * offset };
    const hatPosition = { x: center.x + rotatedOffset.x, y: center.y + rotatedOffset.y };
    if (performance.now() - lastLog.current > 500) {
      lastLog.current = performance.now();
      // eslint-disable-next-line no-console
      console.log("[In-the-jungle face overlay]", { bounds: face.bounds, center, offset, rotatedOffset, hatPosition, rotation });
    }
    setHatTransform({ ...hat, position: hatPosition, size: { width: hatSize, height: hatSize }, rotation });
    setBugTransform({ ...bug, position: { x: center.x + bugSize * 0.8, y: center.y + BUG_CENTER_Y_OFFSET }, size: { width: bugSize, height: bugSize }, rotation });
  });
  return { hatTransform, bugTransform };
};
