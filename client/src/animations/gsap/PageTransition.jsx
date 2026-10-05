import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../gsap/gsapConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * PageTransition: Cinematic brand transition between public pages.
 * Fully transparent and safe: can never cover or occlude page content.
 */
export const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    // Smooth subtle entry fade for new routes
    gsap.fromTo(
      containerRef.current,
      { opacity: 0.95, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
    );
  }, [location.pathname, prefersReduced]);

  return (
    <div ref={containerRef} className="relative w-full">
      {children}
    </div>
  );
};

export default PageTransition;

