import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../../animations/gsap/gsapConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // If reduced motion is explicitly requested by system accessibility, complete immediately
    if (prefersReduced) {
      if (onComplete) onComplete();
      return;
    }

    // Safety fallback timeout: guaranteed completion within 2.5s maximum
    const safetyTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimer);
          sessionStorage.setItem('portfolio_loaded', 'true');
          if (onComplete) onComplete();
        },
      });

      // Brand entrance
      tl.fromTo(
        [textRef.current, subtitleRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }
      );

      // Progress bar simulation (quick and fluid: 0.8s)
      const progressObj = { value: 0 };
      tl.to(
        progressObj,
        {
          value: 100,
          duration: 0.9,
          ease: 'power2.inOut',
          onUpdate: () => {
            const val = Math.round(progressObj.value);
            setPercent(val);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${val}%`;
            }
          },
        },
        '-=0.2'
      );

      // Exit transition
      tl.to([textRef.current, subtitleRef.current, counterRef.current, progressBarRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: 'power3.in',
        onStart: () => {
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = 'none';
          }
        },
      });

      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          opacity: 0,
          duration: 0.5,
          ease: 'power4.inOut',
          onComplete: () => {
            sessionStorage.setItem('portfolio_loaded', 'true');
            if (onComplete) onComplete();
          },
        },
        '-=0.1'
      );
    }, containerRef);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
  }, [onComplete, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={containerRef}
      aria-label="Loading portfolio experience"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin="0"
      aria-valuemax="100"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950 text-slate-100 select-none overflow-hidden"
    >
      <div className="w-full max-w-md px-6 flex flex-col items-center text-center">
        {/* Monogram brand marker */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-navy-850 to-navy-900 border border-slate-800 flex items-center justify-center mb-6 shadow-glow-cyan">
          <span className="font-display font-extrabold text-lg text-electric-cyan tracking-wider">
            AK
          </span>
        </div>

        {/* Brand name */}
        <h1
          ref={textRef}
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mb-1 uppercase"
        >
          Muhammad Aqil Khan
        </h1>

        {/* Position specification */}
        <p
          ref={subtitleRef}
          className="text-xs font-mono tracking-widest text-slate-400 mb-8 uppercase"
        >
          MERN Stack Developer • Portfolio Platform
        </p>

        {/* Progress track */}
        <div className="w-full h-1 bg-navy-900 rounded-full overflow-hidden border border-slate-800/80 mb-3 relative">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-electric-cyan to-electric-blue w-0 rounded-full transition-all duration-75 shadow-glow-cyan"
          />
        </div>

        {/* Numerical counter */}
        <div ref={counterRef} className="flex justify-between w-full text-[11px] font-mono text-slate-400">
          <span className="text-slate-400">INITIALIZING SYSTEM</span>
          <span className="text-electric-cyan font-semibold">{percent}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
