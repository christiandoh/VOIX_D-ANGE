import { useRef, useEffect, useState } from 'react';
import { OrbitingImages } from './OrbitingImages';
import { useContinuousRotation } from '../hooks/useContinuousRotation';
import styles from '../styles/orbital.module.css';

const PLACEHOLDER = 'assets/images/placeholder.svg';
const MAIN_IMAGE = 'assets/images/main-woman.png';
const ORBIT_IMAGES = [
  'assets/images/orbit-1.png',
  'assets/images/orbit-2.png',
  'assets/images/orbit-3.png',
  'assets/images/orbit-4.png',
  'assets/images/orbit-5.png',
  'assets/images/orbit-6.png',
  'assets/images/orbit-7.png',
  'assets/images/orbit-8.png',
  'assets/images/orbit-9.png',
  'assets/images/orbit-10.png',
];

function getRadius(): number {
  if (typeof window === 'undefined') return 380;
  const w = window.innerWidth;
  if (w <= 380) return 160;
  if (w <= 768) return 240;
  if (w <= 1024) return 300;
  return 380;
}

/** Caméra fixe (pas de tilt au scroll). */
const CAMERA_STYLE = { transform: 'translateZ(-50px)' };

/**
 * Scène orbitaire fixe : images qui tournent en continu, pas de scroll.
 */
export function OrbitalScene() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(380);
  const [mainImageSrc, setMainImageSrc] = useState(MAIN_IMAGE);

  useEffect(() => {
    const update = () => setRadius(getRadius());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const rotationAngle = useContinuousRotation();

  return (
    <div ref={outerRef} className={styles.outer}>
      <div className={styles.stickyStage}>
        <div className={styles.cameraWrapper} style={CAMERA_STYLE}>
          <div className={styles.orbitContainer}>
            <OrbitingImages
              rotationAngle={rotationAngle}
              radius={radius}
              imageSrcs={ORBIT_IMAGES}
              fallbackSrc={PLACEHOLDER}
            />
          </div>
          <img
            src={mainImageSrc}
            alt=""
            className={styles.centerImage}
            loading="eager"
            draggable={false}
            onError={() => setMainImageSrc(PLACEHOLDER)}
          />
        </div>
      </div>
    </div>
  );
}
