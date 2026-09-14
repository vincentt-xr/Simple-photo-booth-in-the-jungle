import { ScreenImage, ScreenSpaceUI, type ScreenTransform2DSettings } from "@vincentt-xr/sdk";
import { useFaceOverlay } from "./useFaceOverlay";

export const FaceOverlay = ({ hat, bug, toucan }: { hat: ScreenTransform2DSettings; bug: ScreenTransform2DSettings; toucan: ScreenTransform2DSettings }) => {
  const transforms = useFaceOverlay(hat, bug, toucan);
  return <ScreenSpaceUI>
    <ScreenImage name="Hat" src="/assets/hat.png" fit="contain" transparent alphaTest={0.01} transform={transforms.hatTransform} transformGuideLayer="overlay" />
    <ScreenImage name="Small Bug" source={{ kind: "gif", src: "/assets/small-bug.gif" }} fit="contain" transparent alphaTest={0.01} transform={transforms.bugTransform} renderOrder={1001} />
    <ScreenImage name="Toucan Companion" src="/assets/toucan-companion.png" fit="contain" transparent alphaTest={0.01} transform={transforms.toucanTransform} renderOrder={1002} />
  </ScreenSpaceUI>;
};
