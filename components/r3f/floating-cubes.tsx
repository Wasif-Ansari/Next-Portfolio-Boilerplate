"use client";
import * as THREE from 'three';
import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export function FloatingCubes() {
  const cubes = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i,
    position: [ (Math.random()-0.5)*8, (Math.random()-0.5)*5, (Math.random()-0.5)*6 ] as [number, number, number],
    rotation: [Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI] as [number, number, number],
    scale: Math.random()*0.7 + 0.3,
    speed: Math.random()*0.4 + 0.1,
  })), []);
  useFrame((state, delta) => {
    state.scene.traverse(obj => {
      const spin = (obj as THREE.Object3D & { userData: { spin?: boolean } }).userData.spin;
      if (spin) {
        obj.rotation.x += delta * 0.25;
        obj.rotation.y += delta * 0.35;
      }
    });
  });
  return (
    <group>
      {cubes.map(c => (
        <mesh key={c.id} position={c.position} rotation={c.rotation} scale={c.scale} userData={{ spin: true }}>
          <boxGeometry args={[1,1,1]} />
          <meshStandardMaterial color={new THREE.Color(`hsl(${260 + c.id*10},70%,60%)`)} metalness={0.4} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}
