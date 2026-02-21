import { useCallback, useEffect, useRef, useState } from 'react';
import { getStepAngle, normalizeAngle } from '../utils/orbitMath';
import { lerp } from '../utils/easing';

const SCROLL_THRESHOLD = 90;
const TARGET_LERP_FACTOR = 0.12;

/**
 * Gère le scroll step-by-step avec seuil, targetRotation et interpolation (lerp).
 * Spec: threshold 90px, stepAngle = deltaTheta/3, inertie via lerp.
 */
export function useScrollStep(maxScroll: number, totalItems: number) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const accumulatedRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const stepAngle = getStepAngle(totalItems);

  const updateRotation = useCallback(() => {
    const current = currentAngleRef.current;
    const target = targetAngleRef.current;
    const diff = target - current;

    if (Math.abs(diff) < 0.001) {
      currentAngleRef.current = normalizeAngle(target);
      setRotationAngle(currentAngleRef.current);
      return;
    }

    const next = lerp(current, target, TARGET_LERP_FACTOR);
    currentAngleRef.current = normalizeAngle(next);
    setRotationAngle(currentAngleRef.current);
    rafIdRef.current = requestAnimationFrame(updateRotation);
  }, []);

  useEffect(() => {
    if (typeof maxScroll !== 'number' || maxScroll <= 0) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const delta = scrollY - lastScrollYRef.current;
        lastScrollYRef.current = scrollY;

        // Accumuler le delta pour déclencher une rotation même avec de petits scrolls
        accumulatedRef.current += delta;
        const absAcc = Math.abs(accumulatedRef.current);

        if (absAcc >= SCROLL_THRESHOLD) {
          const direction = accumulatedRef.current > 0 ? 1 : -1;
          const steps = Math.floor(absAcc / SCROLL_THRESHOLD);
          const addAngle = direction * steps * stepAngle;
          targetAngleRef.current = normalizeAngle(
            targetAngleRef.current + addAngle
          );
          // Garder le reste pour le prochain step
          accumulatedRef.current = accumulatedRef.current - direction * steps * SCROLL_THRESHOLD;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [maxScroll, stepAngle]);

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(updateRotation);
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateRotation]);

  return { rotationAngle, stepAngle };
}
