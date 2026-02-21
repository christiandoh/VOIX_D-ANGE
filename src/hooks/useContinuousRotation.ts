import { useEffect, useRef, useState } from 'react';
import { normalizeAngle } from '../utils/orbitMath';

/** Vitesse de rotation en radians par seconde */
const ROTATION_SPEED = 0.15;

/**
 * Rotation continue de l'orbite : l'angle augmente à chaque frame.
 */
export function useContinuousRotation() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const angleRef = useRef(0);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    let rafId: number;

    const tick = (now: number) => {
      const deltaMs = now - lastTimeRef.current;
      lastTimeRef.current = now;
      angleRef.current = normalizeAngle(
        angleRef.current + (ROTATION_SPEED * deltaMs) / 1000
      );
      setRotationAngle(angleRef.current);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return rotationAngle;
}
