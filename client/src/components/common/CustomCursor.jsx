import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Creative developer custom cursor.
 * Desktop mouse only, zero interference with native focus or touch events.
 */
export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || prefersReduced) return;

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Interactive target detection
    const handleElementHover = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], select');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseover', handleElementHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible, prefersReduced]);

  if (!isVisible || prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300 hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Outer subtle glow ring */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-electric-cyan/40 transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 bg-electric-cyan/15 scale-125 border-electric-cyan'
            : 'w-6 h-6 bg-electric-cyan/5'
        }`}
      >
        {/* Core point */}
        <div
          className={`rounded-full bg-electric-cyan transition-all duration-150 ${
            isHovered ? 'w-1.5 h-1.5 opacity-90' : 'w-1 h-1 opacity-70'
          }`}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
