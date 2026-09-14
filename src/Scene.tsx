// Scene.tsx — the agent's surface.
// Add SDK components and R3F primitives here.
// See GROUNDING.md for the API reference and pattern catalog.
//
// react/no-unknown-property is disabled for this file in .eslintrc.json, not by
// a directive here: R3F props (position, rotation, args) are unknown to the rule
// and every one of them errors, but this file is EMPTY of primitives until an
// agent adds some — so an in-file directive sits unused, and the lint script
// runs --report-unused-disable-directives, which makes the unused directive
// itself the error. Disabling at the config keeps the suppression true in both
// states.
import { useState } from "react";
import {
  ScreenImage,
  ScreenSpaceUI,
  type ScreenTransform2DSettings,
} from "@vincentt-xr/sdk";
import {
  DEFAULT_FACE_MESH_RENDERER,
  FaceMeshRenderer,
  resolveFaceMeshRendererSettings,
} from "@vincentt-xr/sdk/face-effects";
import { FaceOverlay } from "./face-overlay/FaceOverlay";

const faceMesh = resolveFaceMeshRendererSettings(DEFAULT_FACE_MESH_RENDERER, {
  materialType: "shader",
  shaderPreset: "composite",
  faceTextureUrl: "/assets/Dirt_Tex.png",
  opacity: 1,
  side: "front",
});


export const Scene = () => {
  // Keep transform edits in React state so editor preview drag/resize changes
  // survive re-renders. For a simple fixed asset, use a plain constant instead.
  const [hatTransform] = useState<ScreenTransform2DSettings>({
    enabled: true,
    position: { x: 0, y: 140 },
    size: { width: 512, height: 512 },
    pivot: [0.5, 0.5],
    rotation: 0,
    scale2D: { x: 1, y: 1 },
    referencePixelsPerUnit: 32,
    renderOrder: 1001,
    overlay: true,
    visible: true,
    showTransformGuides: false,
  });

  const [smallBugTransform] = useState<ScreenTransform2DSettings>({
    enabled: true,
    position: { x: 100, y: -240 },
    size: { width: 512, height: 512 },
    pivot: [0.5, 0.5],
    rotation: 0,
    scale2D: { x: 1, y: 1 },
    referencePixelsPerUnit: 32,
    renderOrder: 1001,
    overlay: true,
    visible: true,
    showTransformGuides: false,
  });

  const [flowerTransform] = useState<ScreenTransform2DSettings>({
    enabled: false,
    position: { x: 100, y: 300 },
    size: { width: 512, height: 512 },
    pivot: [0.5, 0.5],
    rotation: 50,
    scale2D: { x: 1, y: 1 },
    referencePixelsPerUnit: 32,
    renderOrder: 3000,
    overlay: true,
    visible: true,
    showTransformGuides: false,
  });

  const [portraitFrameTransform] = useState<ScreenTransform2DSettings>({
    enabled: true,
    position: { x: 0, y: 0 },
    size: { width: 720, height: 1280 },
    pivot: [0.5, 0.5],
    rotation: 0,
    scale2D: { x: 1, y: 1 },
    referencePixelsPerUnit: 32,
    renderOrder: 2000,
    overlay: true,
    visible: true,
    showTransformGuides: false,
  });

  return (
    <>
      {/* 1. FACE EFFECT — replace the texture URL to create a different mask. */}
      <FaceMeshRenderer value={faceMesh} />

      {/* 2. FACE-ATTACHED ASSETS — change the image URL or tracking target. */}
      <FaceOverlay hat={hatTransform} bug={smallBugTransform} />

      {/* 3. SCREEN-SPACE DECORATION — these elements stay fixed to the frame. */}
      <ScreenSpaceUI>
        <ScreenImage
          name="Footer Frame"
          src="/assets/footer-frame.png"
          fit="contain"
          transparent
          alphaTest={0.01}
          transform={portraitFrameTransform}
          transformGuideLayer="overlay"
        />
        <ScreenImage
          name="Flower"
          source={{ kind: "gif", src: "/assets/flower.gif" }}
          fit="contain"
          transparent
          alphaTest={0.01}
          transform={flowerTransform}
          transformGuideLayer="overlay"
        />
      </ScreenSpaceUI>
    </>
  );
};
