import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ErrorBoundary from '../../components/common/ErrorBoundary';

/**
 * WebGL Detection helper
 */
const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

/**
 * Fallback static illustration when WebGL is unavailable or user preferred
 */
const FallbackVisual = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-electric-cyan/20 flex items-center justify-center bg-gradient-to-tr from-navy-900 via-navy-850 to-navy-950 shadow-glow-cyan">
      <div className="w-48 h-48 rounded-full border border-dashed border-electric-blue/40 flex items-center justify-center animate-spin" style={{ animationDuration: '25s' }}>
        <div className="w-24 h-24 rounded-2xl bg-electric-cyan/10 border border-electric-cyan/40 rotate-45 flex items-center justify-center">
          <span className="font-display font-extrabold text-2xl text-electric-cyan">AK</span>
        </div>
      </div>
    </div>
  </div>
);

export const CanvasContainer = ({ children, className = '', camera = { position: [0, 0, 5], fov: 55 } }) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setHasWebGL(checkWebGLSupport());
  }, []);

  if (!hasWebGL) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <FallbackVisual />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full pointer-events-none ${className}`}>
      <ErrorBoundary fallback={<FallbackVisual />}>
        <Suspense fallback={<FallbackVisual />}>
          <Canvas
            camera={camera}
            dpr={[1, 1.5]}
            gl={{
              antialias: false,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            className="pointer-events-auto"
          >
            {children}
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default CanvasContainer;
