import { useCallback, useEffect, useRef, useState } from 'react';
import { lerp } from '../utils/easing';

const SMOOTHING = 0.08;
const MAX_TILT_X = 6;
const MAX_TILT_Y = 8;
const CAMERA_DEPTH = -50;

export interface CameraTilt {
  tiltX: number;
  tiltY: number;
  translateZ: number;
}

/**
 * Caméra dynamique : tilt selon progression du scroll, avec smoothing (lerp).
 * Spec: progress = scrollY / maxScroll, tiltX = sin(progress * π) * 6, tiltY = cos(progress * π) * 8.
 */
export function useCameraTilt(maxScroll: number) {
  const [tilt, setTilt] = useState<CameraTilt>({
    tiltX: 0,
    tiltY: 0,
    translateZ: CAMERA_DEPTH,
  });
  const currentRef = useRef({ tiltX: 0, tiltY: 0 });
  const rafIdRef = useRef<number | null>(null);

  const updateTilt = useCallback(() => {
    if (typeof maxScroll !== 'number' || maxScroll <= 0) {
      rafIdRef.current = requestAnimationFrame(updateTilt);
      return;
    }

    const scrollY = Math.max(0, window.scrollY);
    const progress = Math.min(1, scrollY / maxScroll);
    const targetTiltX = Math.sin(progress * Math.PI) * MAX_TILT_X;
    const targetTiltY = Math.cos(progress * Math.PI) * MAX_TILT_Y;

    const current = currentRef.current;
    const nextX = lerp(current.tiltX, targetTiltX, SMOOTHING);
    const nextY = lerp(current.tiltY, targetTiltY, SMOOTHING);

    currentRef.current = { tiltX: nextX, tiltY: nextY };
    setTilt({
      tiltX: nextX,
      tiltY: nextY,
      translateZ: CAMERA_DEPTH,
    });
    rafIdRef.current = requestAnimationFrame(updateTilt);
  }, [maxScroll]);

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(updateTilt);
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateTilt]);

  return tilt;
}
