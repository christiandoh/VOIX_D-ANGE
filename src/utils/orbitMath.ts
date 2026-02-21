/**
 * Orbite 3D : positions et effets de profondeur (scale, opacity, blur, brightness).
 * Spec: x = radius * cos(θ), z = radius * sin(θ), y = 0
 */

const TWO_PI = 2 * Math.PI;

export interface OrbitPosition3D {
  x: number;
  y: number;
  z: number;
}

export interface DepthEffects {
  scale: number;
  opacity: number;
  blurPx: number;
  brightness: number;
}

/**
 * Position 3D d'un item sur l'orbite (y = 0).
 */
export function getOrbitPosition(
  index: number,
  totalItems: number,
  radius: number,
  rotationAngle: number
): OrbitPosition3D {
  const deltaTheta = TWO_PI / totalItems;
  const theta = index * deltaTheta + rotationAngle;
  return {
    x: radius * Math.cos(theta),
    y: 0,
    z: radius * Math.sin(theta),
  };
}

/**
 * Effets de profondeur selon z (0 = derrière, 2*radius = devant).
 * Spec: scale 0.65..1, opacity 0.4..1, blur 6..0px, brightness 0.8..1
 */
export function getDepthEffects(z: number, radius: number): DepthEffects {
  const depthNorm = (z + radius) / (2 * radius); // 0 .. 1
  return {
    scale: 0.65 + 0.35 * depthNorm,
    opacity: 0.4 + 0.6 * depthNorm,
    blurPx: (1 - depthNorm) * 6,
    brightness: 0.8 + 0.2 * depthNorm,
  };
}

/**
 * Angle de pas pour un "step" de scroll (deltaTheta / 3).
 */
export function getStepAngle(totalItems: number): number {
  const deltaTheta = TWO_PI / totalItems;
  return deltaTheta / 3;
}

/**
 * Normalise l'angle dans [0, 2π).
 */
export function normalizeAngle(angle: number): number {
  let a = angle % TWO_PI;
  if (a < 0) a += TWO_PI;
  return a;
}
