import { normalizedToScreenPixels } from "@vincentt-xr/sdk";
import { FACE_OVERLAY_VIEWPORT } from "./faceOverlayConstants";

export const faceBoundsCenterToScreen = (centerX: number, centerY: number) =>
  normalizedToScreenPixels({
    point: { x: centerX, y: centerY },
    viewportSize: FACE_OVERLAY_VIEWPORT,
  });
