import React from 'react';
import SEO from '../../components/common/SEO';
import Hero from '../../sections/Hero/Hero';
import TechnologyStrip from '../../sections/TechStrip/TechnologyStrip';
import AboutSection from '../../sections/About/AboutSection';
import SkillsSection from '../../sections/Skills/SkillsSection';
import FeaturedProjects from '../../sections/Projects/FeaturedProjects';
import DevelopmentJourney from '../../sections/Credibility/DevelopmentJourney';
import EducationSection from '../../sections/Credibility/EducationSection';
import CapabilitiesSection from '../../sections/Credibility/CapabilitiesSection';
import DevelopmentApproach from '../../sections/Credibility/DevelopmentApproach';
import FinalCTA from '../../sections/CTA/FinalCTA';
import ContactSection from '../../sections/Contact/ContactSection';

export const HomePage = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Muhammad Aqil Khan',
    jobTitle: 'MERN Stack Developer / Full-Stack Web Developer',
    url: 'https://aqilkhan.dev',
    sameAs: [
      'https://github.com/aqilk66-oss',
      'https://www.linkedin.com/in/muhammad-aqil-khan-a20a87428/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Charsadda',
      addressCountry: 'Pakistan',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'B.S. Computer Science (2022–2026)',
    },
  };

  return (
    <>
      <SEO
        title="Muhammad Aqil Khan | MERN Stack & Full-Stack Web Developer"
        description="Official portfolio of Muhammad Aqil Khan, MERN Stack and Full-Stack Web Developer based in Charsadda, Pakistan. Specializing in high-performance web applications, REST APIs, and modern interfaces."
        canonicalUrl="https://aqilkhan.dev/"
        structuredData={structuredData}
      />

      {/* 01 — Hero Experience */}
      <Hero />

      {/* 02 — Technology Signature Strip */}
      <TechnologyStrip />

      {/* 03 — About Trajectory */}
      <AboutSection />

      {/* 04 — Categorized Skills Matrix */}
      <SkillsSection />

      {/* 05 — Featured Projects Showcase */}
      <FeaturedProjects />

      {/* 06 — Development Journey & Milestones */}
      <DevelopmentJourney />

      {/* 07 — Academic Education */}
      <EducationSection />

      {/* 08 — What I Build / Capabilities */}
      <CapabilitiesSection />

      {/* 09 — Development Approach & Methodology */}
      <DevelopmentApproach />

      {/* 10 — High-Impact Final Call to Action */}
      <FinalCTA />

      {/* 11 — Interactive Contact & Communication */}
      <ContactSection />
    </>
  );
};

export default HomePage;
