'use client';

import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Three procedural forms — kept tiny on purpose:
//  - Lathe ribbon (paper-fold silhouette)
//  - Smoothed river stone (low-poly icosahedron, FlatShading off)
//  - Draped fabric loop (TorusKnot with low tube radius)
// Each takes a `paused` flag so prefers-reduced-motion can freeze the
// animation in place without unmounting.

type Tones = {
  cream: string;
  earth: string;
  sage: string;
  ink: string;
};

const TONES: Tones = {
  cream: '#F1E4CD',
  earth: '#A57C52',
  sage: '#9B9B85',
  ink: '#1A1814',
};

// ─── Paper-fold lathe ────────────────────────────────────────────
// A gentle s-curve revolved around the Y axis; reads as a folded
// paper ribbon caught mid-air. Low segment counts keep it cheap.
function paperFoldPoints(): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];
  const STEPS = 24;
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    // s-curve in radius: starts narrow, swells, narrows again
    const r =
      0.55 +
      0.35 * Math.sin(t * Math.PI) +
      0.06 * Math.sin(t * Math.PI * 3);
    const y = (t - 0.5) * 1.8;
    pts.push(new THREE.Vector2(Math.max(0.02, r), y));
  }
  return pts;
}

export function PaperFold({
  paused,
  position,
}: {
  paused: boolean;
  position: [number, number, number];
}) {
  const ref = React.useRef<THREE.Group>(null);
  const points = React.useMemo(() => paperFoldPoints(), []);

  useFrame((_, delta) => {
    if (!ref.current || paused) return;
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x += delta * 0.012;
    ref.current.position.y =
      position[1] + Math.sin(performance.now() / 4400) * 0.08;
  });

  return (
    <group ref={ref} position={position} rotation={[0.18, -0.4, -0.2]}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 48]} />
        <meshStandardMaterial
          color={TONES.cream}
          roughness={0.78}
          metalness={0.02}
          flatShading={false}
          side={THREE.DoubleSide}
          envMapIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

// ─── River stone ─────────────────────────────────────────────────
// Smoothed icosahedron at detail=2 → 320 faces. Smooth-shaded so
// it reads as a single soft form, not a polyhedron.
export function RiverStone({
  paused,
  position,
  detail,
}: {
  paused: boolean;
  position: [number, number, number];
  detail: number;
}) {
  const ref = React.useRef<THREE.Mesh>(null);
  // Wider on x, slightly squashed on y so it looks like a smoothed
  // pebble, not a sphere.
  const scale: [number, number, number] = [1.05, 0.78, 1.0];

  useFrame((_, delta) => {
    if (!ref.current || paused) return;
    ref.current.rotation.x += delta * 0.04;
    ref.current.rotation.z += delta * 0.022;
    ref.current.position.y =
      position[1] + Math.sin(performance.now() / 5200 + 1.4) * 0.06;
  });

  return (
    <mesh ref={ref} position={position} scale={scale} castShadow receiveShadow>
      <icosahedronGeometry args={[1, detail]} />
      <meshStandardMaterial
        color={TONES.earth}
        roughness={0.62}
        metalness={0.03}
        flatShading={false}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

// ─── Draped ribbon ───────────────────────────────────────────────
// TorusKnot with extended tube radius reads as a continuous draped
// curve, not a knot, when oriented edge-on.
export function DrapedRibbon({
  paused,
  position,
  detail,
}: {
  paused: boolean;
  position: [number, number, number];
  detail: number;
}) {
  const ref = React.useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current || paused) return;
    ref.current.rotation.y += delta * 0.018;
    ref.current.rotation.x += delta * 0.028;
    ref.current.position.y =
      position[1] + Math.sin(performance.now() / 6100 + 2.7) * 0.05;
  });

  // p=2, q=3 keeps the curve gentle — not a tight technical knot.
  // Tube radius set generous so the form reads as folded fabric.
  return (
    <mesh
      ref={ref}
      position={position}
      rotation={[0.6, 0.3, -0.4]}
      castShadow
      receiveShadow
    >
      <torusKnotGeometry args={[0.85, 0.34, detail === 2 ? 96 : 64, detail === 2 ? 16 : 12, 2, 3]} />
      <meshStandardMaterial
        color={TONES.sage}
        roughness={0.7}
        metalness={0.04}
        flatShading={false}
        envMapIntensity={0.45}
      />
    </mesh>
  );
}
