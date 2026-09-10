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
import { FaceTracker, TrackingAnchor } from "@vincentt-xr/sdk/tracking";
import {
  DEFAULT_FACE_MESH_RENDERER,
  FaceMeshRenderer,
  resolveFaceMeshRendererSettings,
} from "@vincentt-xr/sdk/face-effects";

const faceMesh = resolveFaceMeshRendererSettings(DEFAULT_FACE_MESH_RENDERER, {
  materialType: "shader",
  shaderPreset: "composite",
  faceTextureUrl: "/assets/Dirt_Tex.png",
  opacity: 1,
  side: "front",
});

export const Scene = () => {
  // Keep preview drag/resize edits in React state, so they survive re-renders.
  const [hatTransform, setHatTransform] = useState<ScreenTransform2DSettings>({
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
    enabled: true,
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
    size: { width: 720, height: 1920 },
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
      <FaceMeshRenderer value={faceMesh} />
      <FaceTracker>
        <TrackingAnchor target="face.forehead" smoothing={15}>
          <ScreenSpaceUI>
            <ScreenImage
              name="Hat"
              src="/assets/hat.png"
              fit="contain"
              transparent
              alphaTest={0.01}
              transform={hatTransform}
              onScreenTransformChange={setHatTransform}
              transformGuideLayer="overlay"
            />
          </ScreenSpaceUI>
        </TrackingAnchor>
        <TrackingAnchor target="face.forehead" smoothing={15}>
          <ScreenSpaceUI>
            <ScreenImage
              name="Small Bug"
              source={{ kind: "gif", src: "/assets/small-bug.gif" }}
              fit="contain"
              transparent
              alphaTest={0.01}
              transform={smallBugTransform}
              renderOrder={1001}
            />
          </ScreenSpaceUI>
        </TrackingAnchor>
      </FaceTracker>
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
