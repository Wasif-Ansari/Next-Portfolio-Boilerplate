"use client";
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Float, Environment } from '@react-three/drei';
import { FloatingCubes } from './floating-cubes';

export function CanvasScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>        
        <ambientLight intensity={0.4} />
        <directionalLight position={[6, 6, 6]} intensity={1.2} />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <FloatingCubes />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
