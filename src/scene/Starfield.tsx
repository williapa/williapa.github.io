import { useMemo, useRef } from 'react';
import { Color, Group, MathUtils, Mesh, MeshBasicMaterial } from 'three';
import { useFrame } from '@react-three/fiber';

type StarfieldProps = {
  count: number;
  radius: number;
  reducedMotion: boolean;
};

type StarDatum = {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  phase: number;
};

const palette = ['#8fd3ff', '#ffd6f7', '#ffffff', '#ffe0a3', '#b8b8ff'];

export function Starfield({ count, radius, reducedMotion }: StarfieldProps) {
  const groupRef = useRef<Group>(null);

  const stars = useMemo<StarDatum[]>(() => {
    return Array.from({ length: count }, (_, index) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const distance = radius * (0.2 + Math.random() * 0.4);
      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.cos(phi) * 0.7;
      const z = distance * Math.sin(phi) * Math.sin(theta);

      return {
        position: [x, y, z],
        scale: MathUtils.lerp(0.02, 0.12, Math.random()),
        color: palette[index % palette.length] ?? '#ffffff',
        speed: MathUtils.lerp(0.45, 1.4, Math.random()),
        phase: Math.random() * Math.PI * 2,
      };
    });
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.y = elapsed * 0.012;
    groupRef.current.children.forEach((child, index) => {
      const star = stars[index];
      if (!star) {
        return;
      }

      const opacity = 0.45 + Math.sin(elapsed * star.speed + star.phase) * 0.2;
      const starMesh = child.children[0] as Mesh | undefined;
      const material = starMesh?.material;
      if (material instanceof MeshBasicMaterial) {
        material.opacity = opacity;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, index) => (
        <group key={index} position={star.position}>
          <mesh>
            <sphereGeometry args={[star.scale, 6, 6]} />
            <meshBasicMaterial
              color={new Color(star.color)}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
