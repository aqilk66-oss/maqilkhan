import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export const HeroScene = ({ isReducedMotion = false }) => {
  let isDark = true;
  try {
    const themeContext = useTheme();
    if (themeContext && typeof themeContext.isDark !== 'undefined') {
      isDark = themeContext.isDark;
    }
  } catch (e) {
    // Canvas runs in separate React tree where context might not penetrate
    isDark = document.documentElement.classList.contains('dark') || !document.documentElement.classList.contains('light');
  }
  const groupRef = useRef(null);
  const meshRef = useRef(null);
  const innerMeshRef = useRef(null);
  const particlesRef = useRef(null);

  // Mouse position normalized (-1 to 1)
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isReducedMotion) return;

    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isReducedMotion]);

  useFrame((state, delta) => {
    if (isReducedMotion) return;

    // Smooth subtle rotation
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.18;
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * 0.2;
      innerMeshRef.current.rotation.z += delta * 0.15;
    }

    // Interactive subtle pointer parallax
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.3,
        0.05
      );
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={isDark ? 0.4 : 0.8} />
      <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.5 : 1.2} color={isDark ? '#00f2fe' : '#0284c7'} />
      <pointLight position={[-10, -8, -5]} intensity={isDark ? 1.2 : 0.8} color={isDark ? '#4facfe' : '#38bdf8'} />
      <pointLight position={[0, -5, 2]} intensity={0.6} color={isDark ? '#00f2fe' : '#0284c7'} />

      <group ref={groupRef} position={[0, 0, 0]}>
        <Float speed={isReducedMotion ? 0 : 2} rotationIntensity={isReducedMotion ? 0 : 0.4} floatIntensity={isReducedMotion ? 0 : 0.6}>
          {/* Outer Geometric Wireframe (Icosahedron representing complex full-stack nodes) */}
          <mesh ref={meshRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[2.0, 1]} />
            <meshStandardMaterial
              color={isDark ? '#070d1e' : '#f1f5f9'}
              wireframe
              emissive={isDark ? '#00f2fe' : '#0284c7'}
              emissiveIntensity={isDark ? 0.6 : 0.45}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>

          {/* Inner Glowing Core (Octahedron representing database & server core) */}
          <mesh ref={innerMeshRef} position={[0, 0, 0]}>
            <octahedronGeometry args={[1.0, 0]} />
            <meshStandardMaterial
              color={isDark ? '#4facfe' : '#0ea5e9'}
              emissive={isDark ? '#4facfe' : '#0284c7'}
              emissiveIntensity={isDark ? 0.8 : 0.5}
              roughness={0.3}
              metalness={0.8}
              transparent
              opacity={isDark ? 0.7 : 0.85}
              wireframe
            />
          </mesh>
        </Float>
      </group>
    </>
  );
};

export default HeroScene;
