"use client";
import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Starfield({ count = 800, speed = 0.02 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] = (Math.random() - 0.5) * 120;
      arr[i3 + 1] = (Math.random() - 0.5) * 70;
      arr[i3 + 2] = (Math.random() - 0.5) * 120;
    }
    return arr;
  }, [count]);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  const mat = useMemo(() => new THREE.PointsMaterial({ size: 0.6, color: '#ffffff', transparent: true, opacity: 0.7 }), []);
  useFrame((_, d) => {
    geo.rotateY(d * speed * 0.2);
  });
  return <points args={[geo, mat]} />;
}
