import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * MagneticButton: High-end magnetic pointer tracking for primary CTA buttons.
 * Automatically disables on touch devices or when prefers-reduced-motion is active.
 */
export const MagneticButton = ({
  children,
  className = '',
  strength = 0.35,
  onClick,
  as: Component = 'div',
  ...rest
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Detect touch capability
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || prefersReduced || !buttonRef.current) return;

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Component
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: !prefersReduced && !isTouchDevice ? `translate3d(${position.x}px, ${position.y}px, 0)` : 'none',
        transition: position.x === 0 && position.y === 0 ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s linear',
      }}
      className={`inline-block will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default MagneticButton;
