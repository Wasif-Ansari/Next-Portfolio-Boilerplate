"use client";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function WavePlane() {
  const ref = useRef<THREE.Mesh>(null);
  const start = useRef(Date.now());
  useFrame(() => {
    if (!ref.current) return;
    const t = (Date.now() - start.current) / 1000;
    const geo = ref.current.geometry as THREE.PlaneGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i); const y = pos.getY(i);
      const z = Math.sin(x * 0.6 + t) * 0.25 + Math.cos(y * 0.6 + t * 0.8) * 0.25;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    ref.current.rotation.x = -Math.PI / 2.2;
  });
  return (
    <mesh ref={ref} position={[0,-1.2,0]}>      
      <planeGeometry args={[18, 18, 48, 48]} />
      <meshStandardMaterial color="#4b39ba" metalness={0.4} roughness={0.5} wireframe />
    </mesh>
  );
}
