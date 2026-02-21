/**
 * Easing et interpolation pour scroll et caméra.
 * Spec: easeOutCubic, lerp pour smoothing.
 */

/**
 * Linear interpolation.
 * Spec: lerp(current, target, 0.08) pour smoothing caméra.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * easeOutCubic: 1 - (1 - t)^3
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Clamp value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
