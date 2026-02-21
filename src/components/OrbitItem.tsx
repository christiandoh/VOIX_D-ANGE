import { memo, useState, useEffect } from 'react';
import type { DepthEffects } from '../utils/orbitMath';
import styles from '../styles/orbital.module.css';

interface OrbitItemProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  x: number;
  y: number;
  z: number;
  depth: DepthEffects;
}

/**
 * Rendu d'un item sur l'orbite avec transform 3D et effets de profondeur.
 * Uniquement transform et opacity pour la perf (spec).
 */
function OrbitItemComponent({
  src,
  alt,
  fallbackSrc,
  x,
  y,
  z,
  depth,
}: OrbitItemProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);
  const transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${depth.scale})`;
  const opacity = depth.opacity;
  const filter = `blur(${depth.blurPx}px) brightness(${depth.brightness})`;

  const handleError = () => {
    if (fallbackSrc) setCurrentSrc(fallbackSrc);
  };

  return (
    <div
      className={styles.orbitItem}
      style={{
        transform,
        opacity,
        filter,
      }}
      aria-hidden
    >
      <img
        src={currentSrc}
        alt={alt}
        className={styles.orbitItemImg}
        loading="lazy"
        draggable={false}
        onError={handleError}
      />
    </div>
  );
}

export const OrbitItem = memo(OrbitItemComponent);
