import React from 'react';
import { Container, Section, SectionTitle } from '../../components/common';
import SEO from '../../components/common/SEO';
import AboutSection from '../../sections/About/AboutSection';
import SkillsSection from '../../sections/Skills/SkillsSection';
import CapabilitiesSection from '../../sections/Credibility/CapabilitiesSection';
import DevelopmentApproach from '../../sections/Credibility/DevelopmentApproach';
import { NavLink } from 'react-router-dom';

export const AboutPage = () => (
  <div className="py-16 md:py-24 bg-navy-950 min-h-screen">
    <SEO
      title="About Muhammad Aqil Khan | Full-Stack Web Developer"
      description="Learn about Muhammad Aqil Khan, B.S. Computer Science candidate (2022–2026), MERN stack specialist, and full-stack software engineer based in Charsadda, Pakistan."
      canonicalUrl="https://aqilkhan.dev/about"
    />
    <AboutSection />
    <CapabilitiesSection />
    <DevelopmentApproach />
  </div>
);

export const SkillsPage = () => (
  <div className="py-16 md:py-24 bg-navy-950 min-h-screen">
    <SEO
      title="Technical Skills & Competencies | Muhammad Aqil Khan"
      description="Categorized technical proficiencies: React, Node.js, Express, MongoDB, Tailwind CSS, GSAP, REST APIs, Git, and modern web architectures."
      canonicalUrl="https://aqilkhan.dev/skills"
    />
    <SkillsSection />
    <CapabilitiesSection />
  </div>
);

export const ProjectsPage = () => (
  <Section>
    <Container>
      <SectionTitle subtitle="Case Studies" title="Featured Projects" description="WeddingHub, RouteWise, Atmosfera, NexCart & More" />
      <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 max-w-3xl mx-auto text-slate-300">
        <p>Architectural placeholder for published case studies grid.</p>
      </div>
    </Container>
  </Section>
);

export const ExperiencePage = () => (
  <Section>
    <Container>
      <SectionTitle subtitle="Milestones" title="Professional Experience" description="Career history and technical contributions" />
      <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 max-w-3xl mx-auto text-slate-300">
        <p>Architectural placeholder for chronological experience timeline.</p>
      </div>
    </Container>
  </Section>
);

export const EducationPage = () => (
  <Section>
    <Container>
      <SectionTitle subtitle="Academics" title="Education & Qualifications" description="B.S. Computer Science (2022 – 2026)" />
      <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 max-w-3xl mx-auto text-slate-300">
        <p>Architectural placeholder for university education and achievements.</p>
      </div>
    </Container>
  </Section>
);

export const ResumePage = () => (
  <Section>
    <Container>
      <SectionTitle subtitle="Curriculum Vitae" title="Resume & Documents" description="Active CV download and preview" />
      <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 max-w-3xl mx-auto text-slate-300">
        <p>Architectural placeholder for active CV preview and download resolution.</p>
      </div>
    </Container>
  </Section>
);

export const ContactPage = () => (
  <Section>
    <Container>
      <SectionTitle subtitle="Communication" title="Get in Touch" description="Inquire for collaborations, full-stack contracts, or opportunities" />
      <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 max-w-3xl mx-auto text-slate-300">
        <p>Architectural placeholder for rate-limited visitor inquiry form.</p>
      </div>
    </Container>
  </Section>
);

export const ProjectDetailPage = () => (
  <Section>
    <Container>
      <SectionTitle subtitle="Deep Dive" title="Project Case Study" description="Detailed architectural breakdown and live links" />
      <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 max-w-3xl mx-auto text-slate-300">
        <p>Architectural placeholder for SEO slug-driven dynamic case study view.</p>
      </div>
    </Container>
  </Section>
);

export const NotFoundPage = () => (
  <div className="min-h-screen bg-navy-950 flex items-center justify-center py-20">
    <SEO
      title="404 — Page Not Found | Muhammad Aqil Khan"
      description="The requested page does not exist or has been moved."
      noIndex={true}
    />
    <Container className="text-center max-w-lg">
      <div className="w-20 h-20 rounded-3xl bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center text-electric-cyan mx-auto mb-6 shadow-glow-cyan">
        <span className="font-mono text-3xl font-extrabold">404</span>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
        Page Not Found
      </h1>
      <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
        The route you are navigating to could not be located or has been relocated to another section of the portfolio platform.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <NavLink
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-cyan text-navy-950 font-bold text-sm shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all"
        >
          Return Home
        </NavLink>
        <NavLink
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 border border-slate-800 text-slate-200 font-semibold text-sm hover:border-slate-700 transition-all"
        >
          View Projects
        </NavLink>
        <NavLink
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 border border-slate-800 text-slate-200 font-semibold text-sm hover:border-slate-700 transition-all"
        >
          Contact
        </NavLink>
      </div>
    </Container>
  </div>
);
