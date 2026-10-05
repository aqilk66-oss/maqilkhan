import { gsap } from '../gsap/gsapConfig';

/**
 * Animate the horizontal Technology Strip on entry
 */
export const animateTechStrip = (triggerElement, items) => {
  if (!triggerElement || !items || items.length === 0) return null;

  return gsap.fromTo(
    items,
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Animate the About Section elements with ScrollTrigger
 */
export const animateAboutSection = (sectionRef, { labelRef, headingRef, textRefs, visualRef, factsRefs }) => {
  if (!sectionRef) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });

  if (labelRef) {
    tl.fromTo(labelRef, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  }

  if (headingRef) {
    tl.fromTo(headingRef, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }

  if (textRefs && textRefs.length > 0) {
    tl.fromTo(textRefs, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }, '-=0.3');
  }

  if (visualRef) {
    tl.fromTo(visualRef, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5');
  }

  if (factsRefs && factsRefs.length > 0) {
    tl.fromTo(factsRefs, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.3');
  }

  return tl;
};

/**
 * Animate the Skills Section elements
 */
export const animateSkillsSection = (sectionRef, { headerRef, categoryNavRef, cardsRef }) => {
  if (!sectionRef) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });

  if (headerRef) {
    tl.fromTo(headerRef, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  }

  if (categoryNavRef) {
    tl.fromTo(categoryNavRef, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
  }

  if (cardsRef && cardsRef.length > 0) {
    tl.fromTo(cardsRef, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' }, '-=0.2');
  }

  return tl;
};
