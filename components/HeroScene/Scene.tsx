'use client';

import * as React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PaperFold, RiverStone, DrapedRibbon } from './forms';

// Compact rig that owns:
//  - lighting (warm key upper-left + soft ambient + cool rim)
//  - camera drift (slow sinusoidal lookAt offset)
//  - mouse parallax (group-level rotation, gated to non-touch)
//  - device tier (mobile drops one form + lowers detail)

type DeviceTier = 'desktop' | 'mobile';

export function HeroScene({
  paused,
  enableParallax,
  tier,
}: {
  paused: boolean;
  enableParallax: boolean;
  tier: DeviceTier;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);
  const targetRot = React.useRef({ x: 0, y: 0 });
  const { camera, size } = useThree();

  // Capture the camera once it mounts so we can nudge it inside useFrame.
  React.useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      cameraRef.current = camera;
    }
  }, [camera]);

  // Mouse parallax — desktop only. Normalize cursor to [-1,1], damp toward
  // a small max rotation so the scene reacts but doesn't lurch.
  React.useEffect(() => {
    if (!enableParallax) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const nx = (e.clientX / size.width) * 2 - 1;
      const ny = (e.clientY / size.height) * 2 - 1;
      // Cap to ~6° each axis (0.1 rad)
      targetRot.current.y = nx * 0.1;
      targetRot.current.x = -ny * 0.06;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [enableParallax, size.width, size.height]);

  useFrame((_, delta) => {
    // Slow camera drift — tiny, purely for life.
    if (cameraRef.current && !paused) {
      const t = performance.now() / 1000;
      cameraRef.current.position.x = Math.sin(t / 11) * 0.18;
      cameraRef.current.position.y = 0.2 + Math.cos(t / 13) * 0.12;
      cameraRef.current.lookAt(0, 0, 0);
    }
    // Damp the parallax group toward the target rotation.
    if (groupRef.current && enableParallax && !paused) {
      groupRef.current.rotation.y +=
        (targetRot.current.y - groupRef.current.rotation.y) * Math.min(1, delta * 2.5);
      groupRef.current.rotation.x +=
        (targetRot.current.x - groupRef.current.rotation.x) * Math.min(1, delta * 2.5);
    }
  });

  // On mobile we drop the draped ribbon (cheapest visual cost to remove)
  // and reduce icosahedron detail.
  const stoneDetail = tier === 'desktop' ? 2 : 1;
  const ribbonDetail = tier === 'desktop' ? 2 : 1;

  return (
    <>
      {/* Ambient fill — keeps shadows from going black */}
      <ambientLight intensity={0.65} color="#FFF5E1" />

      {/* Warm key light, upper-left, matches the gradient direction
          of the fallback CSS hero so the visual story is continuous */}
      <directionalLight
        position={[-4, 5, 3]}
        intensity={1.6}
        color="#FFD9A8"
        castShadow={false}
      />

      {/* Cool rim — picks out the back edge of each form for depth */}
      <directionalLight
        position={[3, -2, -2]}
        intensity={0.4}
        color="#9BA28C"
      />

      <group ref={groupRef}>
        <PaperFold paused={paused} position={[-2.2, 0.8, -0.2]} />
        <RiverStone paused={paused} position={[0.3, -0.2, 0.4]} detail={stoneDetail} />
        {tier === 'desktop' ? (
          <DrapedRibbon paused={paused} position={[2.4, -0.5, -0.6]} detail={ribbonDetail} />
        ) : null}
      </group>
    </>
  );
}
