"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

function ParticleSwarm({ count = 180 }) {
  const points = useRef<THREE.Points>(null);
  const { geometry, base, speeds } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i=0;i<count;i++) {
      const i3 = i*3;
      arr[i3] = (Math.random()-0.5)*12;
      arr[i3+1] = (Math.random()-0.5)*8;
      arr[i3+2] = (Math.random()-0.5)*10;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    const speeds = new Float32Array(count);
    for (let i=0;i<count;i++) speeds[i] = Math.random()*0.6+0.2;
    return { geometry: geo, base: arr.slice(0), speeds };
  }, [count]);
  useFrame((state, delta) => {
    if(!points.current) return;
    const t = state.clock.elapsedTime;
    const pos = (points.current.geometry.attributes.position as THREE.BufferAttribute);
    for (let i=0;i<count;i++) {
      const i3 = i*3;
      const speed = speeds[i];
  const b = base as Float32Array | number[];
  pos.setX(i, b[i3] + Math.sin(t*speed + i)*0.6);
  pos.setY(i, b[i3+1] + Math.cos(t*speed*0.9 + i*0.6)*0.5);
  pos.setZ(i, b[i3+2] + Math.sin(t*speed*0.7 + i*0.4)*0.4);
    }
    pos.needsUpdate = true;
    points.current.position.x = THREE.MathUtils.damp(points.current.position.x, state.pointer.x * 0.8, 3, delta);
    points.current.position.y = THREE.MathUtils.damp(points.current.position.y, state.pointer.y * 0.5, 3, delta);
  });
  return (
    <points ref={points} position={[0,0,-5]} geometry={geometry}>
      <pointsMaterial size={0.08} color="#9d7bff" transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

export function ContactScene() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false); const ref = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{ const el=ref.current; if(!el) return; const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setVisible(true); obs.disconnect(); } },{threshold:0.15}); obs.observe(el); return ()=>obs.disconnect(); },[]);
  if (reduce) return <div ref={ref} className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--primary)/0.15),transparent_70%)]" />;
  return (
    <div ref={ref} className="absolute inset-0 -z-10">
      {visible && (
        <Canvas camera={{ position: [0,0,9], fov: 55 }} dpr={[1,1.6]}>
          <ambientLight intensity={0.4} />
          <ParticleSwarm />
        </Canvas>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--primary)/0.25),transparent_70%)] mix-blend-plus-lighter" />
    </div>
  );
}
