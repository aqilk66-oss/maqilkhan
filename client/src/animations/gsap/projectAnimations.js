import { gsap } from './gsapConfig';

/**
 * Animate Featured Projects section heading & intro
 */
export const animateProjectsHeader = (headerElement) => {
  if (!headerElement) return null;

  return gsap.fromTo(
    headerElement,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Animate individual Project Card on scroll
 */
export const animateProjectCard = (cardElement) => {
  if (!cardElement) return null;

  return gsap.fromTo(
    cardElement,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardElement,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Animate Project Detail Page sequence
 */
export const animateProjectDetail = (containerRef, { heroRef, metaRef, contentRef, galleryRef }) => {
  if (!containerRef) return null;

  const tl = gsap.timeline();

  if (heroRef) {
    tl.fromTo(heroRef, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  }

  if (metaRef) {
    tl.fromTo(metaRef, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
  }

  if (contentRef) {
    tl.fromTo(contentRef, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
  }

  if (galleryRef) {
    tl.fromTo(galleryRef, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2');
  }

  return tl;
};
