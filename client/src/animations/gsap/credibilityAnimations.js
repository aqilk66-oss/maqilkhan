import { gsap } from './gsapConfig';

/**
 * Animate Journey Timeline items on scroll
 */
export const animateJourneyTimeline = (containerRef, itemsRef) => {
  if (!containerRef || !itemsRef || itemsRef.length === 0) return null;

  return gsap.fromTo(
    itemsRef,
    { opacity: 0, x: -25 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Animate Education Card on scroll
 */
export const animateEducationSection = (cardRef) => {
  if (!cardRef) return null;

  return gsap.fromTo(
    cardRef,
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Animate Capabilities cards with staggered reveal
 */
export const animateCapabilitiesGrid = (gridRef, cardsRef) => {
  if (!gridRef || !cardsRef || cardsRef.length === 0) return null;

  return gsap.fromTo(
    cardsRef,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Animate Development Approach 6-step flow
 */
export const animateApproachFlow = (flowRef, stepsRef) => {
  if (!flowRef || !stepsRef || stepsRef.length === 0) return null;

  return gsap.fromTo(
    stepsRef,
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: flowRef,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
};
