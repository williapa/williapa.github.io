import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Color, Group, Mesh, Quaternion, Vector3 } from 'three';
import { siteContent } from '../content';
import type { PortfolioItem } from '../types';
import { sceneTuning } from './constants';
import { lerp, normalizeAngle } from './utils';
import { Starfield } from './Starfield';

type PortfolioSceneProps = {
  selectedId: string;
  hoveredId: string | null;
  reducedMotion: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onResumeActivate: () => void;
};

type SolarSystemProps = PortfolioSceneProps;

export function PortfolioScene(props: PortfolioSceneProps) {
  return (
    <Canvas
      camera={{ position: [...sceneTuning.cameraDefault], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={[sceneTuning.background]} />
      <fog attach="fog" args={[sceneTuning.background, 12, 36]} />
      <Suspense fallback={null}>
        <SceneCamera reducedMotion={props.reducedMotion} />
        <SolarSystem {...props} />
      </Suspense>
    </Canvas>
  );
}

function SceneCamera({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, size } = useThree();
  const target = useRef(new Vector3(...sceneTuning.cameraLookAt));
  const desired = useMemo(
    () =>
      new Vector3(
        ...(size.width < 840
          ? sceneTuning.cameraMobile
          : sceneTuning.cameraDefault),
      ),
    [size.width],
  );

  useFrame(() => {
    const factor = reducedMotion ? 0.24 : 0.08;
    camera.position.x = lerp(camera.position.x, desired.x, factor);
    camera.position.y = lerp(camera.position.y, desired.y, factor);
    camera.position.z = lerp(camera.position.z, desired.z, factor);
    camera.lookAt(target.current);
  });

  return null;
}

function SolarSystem({
  selectedId,
  hoveredId,
  reducedMotion,
  onSelect,
  onHover,
  onResumeActivate,
}: SolarSystemProps) {
  const rigRef = useRef<Group>(null);
  const planets = siteContent.projects;
  const selectedIndex = Math.max(
    0,
    planets.findIndex((project) => project.id === selectedId),
  );

  useEffect(() => {
    document.body.style.cursor = hoveredId ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hoveredId]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const transitionFactor = reducedMotion
      ? sceneTuning.reducedMotionTransitionLerp
      : sceneTuning.transitionLerp;
    const selectedBaseAngle =
      (selectedIndex / planets.length) * Math.PI * 2 + Math.PI / 2;
    const targetRotation = selectedBaseAngle - sceneTuning.frontAngleOffset;

    if (rigRef.current) {
      const difference = normalizeAngle(targetRotation - rigRef.current.rotation.y);
      rigRef.current.rotation.y += difference * transitionFactor;

      if (!reducedMotion) {
        rigRef.current.rotation.z = Math.sin(elapsed * 0.18) * 0.03;
        rigRef.current.position.y = Math.sin(elapsed * 0.55) * 0.12;
      }
    }

  });

  return (
    <>
      <ambientLight intensity={0.95} color="#90a8ff" />
      <pointLight position={[0, 0, 0]} intensity={145} color="#ffcf7d" />
      <directionalLight
        position={[8, 6, 10]}
        intensity={1.5}
        color="#d7e4ff"
      />
      <Starfield
        count={sceneTuning.starCount}
        radius={sceneTuning.starRadius}
        reducedMotion={reducedMotion}
      />
      <group ref={rigRef}>
        <Sun
          label={siteContent.ownerName}
          hovered={hoveredId === 'resume'}
          reducedMotion={reducedMotion}
          onHover={onHover}
          onActivate={onResumeActivate}
        />
        {planets.map((project, index) => (
          <Planet
            key={project.id}
            item={project}
            index={index}
            selected={project.id === selectedId}
            hovered={hoveredId === project.id}
            reducedMotion={reducedMotion}
            onHover={onHover}
            onSelect={onSelect}
          />
        ))}
      </group>
    </>
  );
}

type SunProps = {
  label: string;
  hovered: boolean;
  reducedMotion: boolean;
  onHover: (id: string | null) => void;
  onActivate: () => void;
};

function Sun({
  label,
  hovered,
  reducedMotion,
  onHover,
  onActivate,
}: SunProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.y += reducedMotion ? 0.005 : 0.012;
    meshRef.current.rotation.x += 0.0015;

    if (!reducedMotion) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.4) * 0.04;
      meshRef.current.scale.setScalar(sceneTuning.sunScale * pulse);
    } else {
      meshRef.current.scale.setScalar(sceneTuning.sunScale);
    }
  });

  const handlePointerEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onHover('resume');
  };

  const handlePointerLeave = () => onHover(null);
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onActivate();
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color={new Color(hovered ? '#ffd89a' : '#ffb347')}
          emissive={new Color('#ff9f1c')}
          emissiveIntensity={hovered ? 3.6 : 2.8}
          roughness={0.3}
          metalness={0.06}
        />
      </mesh>
      <mesh scale={2.15}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={new Color('#ffca6b')}
          transparent
          opacity={0.13}
        />
      </mesh>
      <FacingLabel
        text={label}
        position={[0, 2.55, 0]}
        fontSize={0.5}
        color="#fff7df"
        outlineColor="#160d00"
        outlineWidth={0.035}
      />
    </group>
  );
}

type FacingLabelProps = {
  text: string;
  position: [number, number, number];
  fontSize: number;
  color: string;
  outlineColor: string;
  outlineWidth: number;
};

function FacingLabel({
  text,
  position,
  fontSize,
  color,
  outlineColor,
  outlineWidth,
}: FacingLabelProps) {
  const groupRef = useRef<Group>(null);
  const parentQuaternion = useRef(new Quaternion());
  const cameraQuaternion = useRef(new Quaternion());

  useFrame(({ camera }) => {
    const labelGroup = groupRef.current;
    if (!labelGroup || !labelGroup.parent) {
      return;
    }

    labelGroup.parent.getWorldQuaternion(parentQuaternion.current);
    camera.getWorldQuaternion(cameraQuaternion.current);
    labelGroup.quaternion
      .copy(parentQuaternion.current)
      .invert()
      .multiply(cameraQuaternion.current);
  });

  return (
    <group ref={groupRef} position={position}>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineColor={outlineColor}
        outlineWidth={outlineWidth}
      >
        {text}
      </Text>
    </group>
  );
}

type PlanetProps = {
  item: PortfolioItem;
  index: number;
  selected: boolean;
  hovered: boolean;
  reducedMotion: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
};

function Planet({
  item,
  index,
  selected,
  hovered,
  reducedMotion,
  onHover,
  onSelect,
}: PlanetProps) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const baseAngle =
    (index / siteContent.projects.length) * Math.PI * 2 + Math.PI / 2;

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const orbitalAngle = baseAngle;
    const x = Math.cos(orbitalAngle) * sceneTuning.orbitRadius;
    const z = Math.sin(orbitalAngle) * sceneTuning.orbitRadius;
    const y = sceneTuning.orbitVerticalOffset;

    if (groupRef.current) {
      const targetX = x;
      const targetY = y;
      const targetZ = z;
      const factor = reducedMotion ? 0.28 : 0.09;

      groupRef.current.position.x = lerp(groupRef.current.position.x, targetX, factor);
      groupRef.current.position.y = lerp(groupRef.current.position.y, targetY, factor);
      groupRef.current.position.z = lerp(groupRef.current.position.z, targetZ, factor);
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += reducedMotion ? 0.004 : 0.01;
    }
  });

  const handlePointerEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onHover(item.id);
  };

  const handlePointerLeave = () => onHover(null);
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(item.id);
  };

  return (
    <group ref={groupRef}>
      <group rotation={item.theme.tilt}>
        <mesh
          ref={meshRef}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          scale={selected ? 1.15 : 1}
        >
          <sphereGeometry args={[item.theme.size, 48, 48]} />
          <meshStandardMaterial
            color={new Color(hovered ? item.theme.accent : item.theme.surface)}
            emissive={new Color(item.theme.emissive)}
            emissiveIntensity={selected ? 1.15 : 0.7}
            roughness={0.75}
            metalness={0.1}
            transparent
            opacity={selected ? 1 : sceneTuning.deEmphasisOpacity}
          />
        </mesh>
        <mesh scale={item.theme.size * 1.24}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial
            color={new Color(item.theme.atmosphere)}
            transparent
            opacity={selected ? 0.18 : 0.08}
          />
        </mesh>
      </group>
      <FacingLabel
        text={item.title}
        position={item.theme.labelOffset}
        fontSize={0.34}
        color="#f6f3ff"
        outlineColor="#101321"
        outlineWidth={0.03}
      />
    </group>
  );
}
