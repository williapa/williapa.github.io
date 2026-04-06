export function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

export function normalizeAngle(angle: number) {
  let normalized = angle;
  while (normalized < -Math.PI) normalized += Math.PI * 2;
  while (normalized > Math.PI) normalized -= Math.PI * 2;
  return normalized;
}
