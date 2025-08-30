"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
	const mountRef = useRef<HTMLDivElement | null>(null);
	const [ready, setReady] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (mq.matches) return; // reduce motion
		const mount = mountRef.current; if (!mount) return;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 1000);
		camera.position.z = 42;
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
		renderer.setSize(mount.clientWidth, mount.clientHeight);
		mount.appendChild(renderer.domElement);
		scene.fog = new THREE.FogExp2('#05010b', 0.0085);
		const count = 1600;
		const makeCloud = (n: number, size: number, color: string, spread: number) => {
			const positions = new Float32Array(n * 3);
			for (let i = 0; i < n; i++) {
				const i3 = i * 3;
				positions[i3] = (Math.random() - 0.5) * spread;
				positions[i3 + 1] = (Math.random() - 0.5) * (spread * 0.55);
				positions[i3 + 2] = (Math.random() - 0.5) * spread;
			}
			const geo = new THREE.BufferGeometry();
			geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			const mat = new THREE.PointsMaterial({ size, sizeAttenuation: true, color, transparent: true, opacity: 0.85 });
			const pts = new THREE.Points(geo, mat);
			return { geo, mat, pts };
		};
		const cloud1 = makeCloud(count, 0.9, '#a57bff', 160);
		const cloud2 = makeCloud(count, 0.55, '#ff7de9', 140);
		scene.add(cloud1.pts, cloud2.pts);
		let raf: number;
		const animate = () => {
			raf = requestAnimationFrame(animate);
			cloud1.pts.rotation.y += 0.0009; cloud1.pts.rotation.x += 0.0003;
			cloud2.pts.rotation.y -= 0.0006; cloud2.pts.rotation.x -= 0.0002;
			renderer.render(scene, camera);
		};
		animate();
		const handleResize = () => {
			if (!mount) return; camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight); };
		window.addEventListener('resize', handleResize);
		setReady(true);
		return () => {
			cancelAnimationFrame(raf); window.removeEventListener('resize', handleResize);
			renderer.dispose(); cloud1.geo.dispose(); cloud2.geo.dispose(); cloud1.mat.dispose(); cloud2.mat.dispose();
		};
	}, []);
	return <div ref={mountRef} aria-hidden className="absolute inset-0 -z-20 hero-webgl pointer-events-none" style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.2s ease' }} />;
}

