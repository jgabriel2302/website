// Shared, deterministic easing for the 3D scene and its CSS/Canvas fallback.
export const clamp01 = (value) => Math.max(0, Math.min(1, value));
export function smoothRange(value, start, end) {
  const t = clamp01((value - start) / (end - start));
  return t * t * (3 - 2 * t);
}
export function bookPresence(progress) {
  return (
    1 - smoothRange(progress, 1.12, 2.1) + 0.18 * smoothRange(progress, 4.05, 5)
  );
}
export function secondaryPresence(progress) {
  return 0.68 - 0.46 * smoothRange(progress, 0.45, 1.05);
}
export function follow(value, target, seconds, response = 0.22) {
  const next =
    target + (value - target) * Math.exp(-Math.max(0, seconds) / response);
  return Math.abs(next - target) < 0.0005 ? target : next;
}
export function sceneAnchorX(screenX, progress, sceneIndex, panelWidth) {
  return screenX + (progress - sceneIndex) * panelWidth;
}
