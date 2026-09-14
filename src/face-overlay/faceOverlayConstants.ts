export const FACE_OVERLAY_VIEWPORT = { width: 720, height: 1280 };
export const HAT_WIDTH_MULTIPLIER = 1.15;
export const BUG_WIDTH_MULTIPLIER = 0.48;
export const HAT_Y_OFFSET = 200;
export const HAT_REFERENCE_FACE_WIDTH = 0.35;
export const MIN_HAT_OFFSET = 180;
export const MAX_HAT_OFFSET = 650;
export const BUG_CENTER_Y_OFFSET = -220;
// The face tracker does not expose shoulder landmarks, so estimate the
// shoulder from face width. The toucan stays outside and below the face rather
// than reading as another cheek-side sticker.
export const TOUCAN_WIDTH_MULTIPLIER = 0.72;
export const TOUCAN_X_OFFSET_MULTIPLIER = 0.85;
export const TOUCAN_Y_OFFSET_MULTIPLIER = -0.65;
