"use client";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';

function FloatingCluster() {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      position: new THREE.Vector3((Math.random()-0.5)*8, (Math.random()-0.5)*4, (Math.random()-0.5)*6),
      rotation: new THREE.Euler(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI),
      scale: Math.random()*0.6 + 0.3,
      type: Math.random() > 0.5 ? 'cube' : 'sphere',
      speed: Math.random()*0.3 + 0.05
    }));
  }, []);
  const temp = new THREE.Vector3();
  useFrame((state, delta) => {
    if (!group.current) return;
    // Parallax follow pointer
    const targetX = state.pointer.x * 0.8;
    const targetY = state.pointer.y * 0.6;
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 2.2, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 2.2, delta);
    group.current.rotation.y += delta * 0.05;
    // Spin children
    group.current.children.forEach((child, idx) => {
      child.rotation.x += delta * 0.25;
      child.rotation.y += delta * 0.35;
      const data = items[idx];
      if (data) {
        const t = state.clock.elapsedTime * data.speed;
        child.position.x = data.position.x + Math.sin(t * 1.2 + data.id) * 0.4;
        child.position.y = data.position.y + Math.cos(t * 1.1 + data.id) * 0.35;
      }
    });
  });
  return (
    <group ref={group}>
      {items.map(item => (
        <mesh key={item.id} position={item.position} rotation={item.rotation} scale={item.scale} castShadow>
          {item.type === 'cube' ? <boxGeometry args={[1,1,1]} /> : <icosahedronGeometry args={[0.9, 1]} />}
          <meshStandardMaterial color={new THREE.Color(`hsl(${265 + item.id*8},70%,62%)`)} metalness={0.5} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField({ count = 900 }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] = (Math.random() - 0.5) * 18;
      arr[i3 + 1] = (Math.random() - 0.5) * 10;
      arr[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [count]);
  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.02;
    const ox = state.pointer.x * 0.15;
    const oy = state.pointer.y * 0.1;
    points.current.position.x = THREE.MathUtils.damp(points.current.position.x, ox, 2, delta);
    points.current.position.y = THREE.MathUtils.damp(points.current.position.y, oy, 2, delta);
  });
  return (
    <points ref={points} position={[0,0,-6]} geometry={geometry}>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

export function HeroScene() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current; if(!el) return;
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){ setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  if (reduce) {
    // Fallback: no WebGL, light gradient only for accessibility
    return <div ref={ref} className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--primary)/0.25),transparent_70%)]" />;
  }
  return (
    <div ref={ref} className="absolute inset-0 -z-10">
      {visible && (
        <Canvas camera={{ position: [0, 0, 11], fov: 52 }} dpr={[1, 1.8]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[8, 10, 5]} intensity={1.4} />
          <Suspense fallback={null}>
            <ParticleField />
            <FloatingCluster />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
