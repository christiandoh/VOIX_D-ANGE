import { useMemo } from 'react';
import { OrbitItem } from './OrbitItem';
import {
  getOrbitPosition,
  getDepthEffects,
  type DepthEffects,
} from '../utils/orbitMath';

interface OrbitingImagesProps {
  rotationAngle: number;
  radius: number;
  imageSrcs: string[];
  fallbackSrc?: string;
}

/**
 * Calcule les positions 3D et applique la rotation ; anneau type Saturne autour du centre.
 */
export function OrbitingImages({
  rotationAngle,
  radius,
  imageSrcs,
  fallbackSrc = '',
}: OrbitingImagesProps) {
  const totalItems = imageSrcs.length || 1;
  const items = useMemo(() => {
    const list: Array<{
      index: number;
      pos: { x: number; y: number; z: number };
      depth: DepthEffects;
      src: string;
      alt: string;
    }> = [];
    for (let i = 0; i < totalItems; i++) {
      const pos = getOrbitPosition(i, totalItems, radius, rotationAngle);
      const depth = getDepthEffects(pos.z, radius);
      list.push({
        index: i,
        pos,
        depth,
        src: imageSrcs[i] ?? fallbackSrc,
        alt: `Orbit ${i + 1}`,
      });
    }
    return list;
  }, [rotationAngle, radius, imageSrcs, fallbackSrc, totalItems]);

  return (
    <>
      {items.map(({ index, pos, depth, src, alt }) => (
        <OrbitItem
          key={index}
          src={src}
          alt={alt}
          fallbackSrc={fallbackSrc}
          x={pos.x}
          y={pos.y}
          z={pos.z}
          depth={depth}
        />
      ))}
    </>
  );
}
