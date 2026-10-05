import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Cv from '../models/Cv.js';
import { config } from '../config/env.js';

dotenv.config();

const seedContent = async () => {
  try {
    console.log('[SEED-CONTENT] Connecting to MongoDB...');
    await mongoose.connect(config.mongoUri);
    console.log('[SEED-CONTENT] MongoDB connected.');

    // 1. Profile Seed
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      await Profile.create({
        fullName: 'Muhammad Aqil Khan',
        primaryRole: 'MERN Stack Developer / Full-Stack Web Developer',
        secondaryRole: 'Full-Stack Web Developer',
        location: 'Charsadda, Pakistan',
        email: 'aqilk4992@gmail.com',
        whatsapp: '+92 342 5730066',
        github: 'https://github.com/aqilk66-oss',
        linkedin: 'https://www.linkedin.com/in/muhammad-aqil-khan-a20a87428/',
        bio: 'Full-Stack Developer focused on high-performance MERN architecture, responsive web applications, secure REST APIs, and modern interaction design.',
        availableForHire: true,
      });
      console.log('[SEED-CONTENT] Profile initialized.');
    }

    // 2. Education Seed
    const existingEducation = await Education.countDocuments();
    if (existingEducation === 0) {
      await Education.create({
        degree: 'B.S. Computer Science',
        institution: 'Government Post Graduate College Charsadda',
        location: 'Charsadda, Pakistan',
        startYear: '2022',
        endYear: '2026',
        gradeOrStatus: 'In Progress',
        highlights: [
          'Core coursework: Data Structures, Algorithms, Database Management Systems, Software Engineering',
          'Architectural focus: Web Systems, Distributed Architectures, Network Protocols',
        ],
        order: 1,
      });
      console.log('[SEED-CONTENT] Education initialized.');
    }

    // 3. Experience Seed
    const existingExperience = await Experience.countDocuments();
    if (existingExperience === 0) {
      await Experience.create({
        role: 'MERN Stack Developer',
        organization: 'Independent / Self-Employed',
        location: 'Charsadda, Pakistan',
        type: 'Independent',
        startDate: '2023',
        endDate: 'Present',
        isCurrent: true,
        description:
          'Engineering full-stack web applications, architecting performant Node.js/Express REST APIs, and implementing accessible React frontends.',
        responsibilities: [
          'Designed modular RESTful endpoints adhering to strict HTTP response and error-handling standards.',
          'Built responsive and fluid user interfaces with React, Tailwind CSS, and GSAP interaction choreography.',
          'Integrated MongoDB collections with Mongoose schemas, indexes, and validation pipelines.',
        ],
        technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'REST APIs'],
        order: 1,
      });
      console.log('[SEED-CONTENT] Experience initialized.');
    }

    // 4. Skills Seed
    const existingSkills = await Skill.countDocuments();
    if (existingSkills === 0) {
      const skillsData = [
        { name: 'React.js', category: 'Frontend', description: 'Components, hooks, context, state flow', featured: true, order: 1 },
        { name: 'JavaScript (ES6+)', category: 'Frontend', description: 'Modern syntax, async/await, DOM APIs', featured: true, order: 2 },
        { name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first systems, responsive tokens', featured: true, order: 3 },
        { name: 'HTML5 / Modern Semantic Web', category: 'Frontend', description: 'Semantic structure, accessibility', featured: false, order: 4 },
        { name: 'CSS3 / Modern Layouts', category: 'Frontend', description: 'Flexbox, Grid, custom properties', featured: false, order: 5 },
        { name: 'Node.js', category: 'Backend', description: 'Runtime, asynchronous I/O, event loops', featured: true, order: 6 },
        { name: 'Express.js', category: 'Backend', description: 'REST routing, middleware, controllers', featured: true, order: 7 },
        { name: 'REST API Design', category: 'Backend', description: 'Stateless endpoints, HTTP status standards', featured: true, order: 8 },
        { name: 'Authentication & Security', category: 'Backend', description: 'JWT, bcrypt, HttpOnly cookies, CORS', featured: true, order: 9 },
        { name: 'MongoDB', category: 'Database', description: 'Document schemas, indexes, aggregation', featured: true, order: 10 },
        { name: 'Mongoose ODM', category: 'Database', description: 'Data modeling, pre/post hooks, validation', featured: true, order: 11 },
        { name: 'Git & GitHub', category: 'Tools', description: 'Version control, branching, PR workflows', featured: true, order: 12 },
        { name: 'Postman', category: 'Tools', description: 'API contract testing, environment configs', featured: false, order: 13 },
        { name: 'Vite', category: 'Tools', description: 'Modern build tooling, HMR, bundling', featured: false, order: 14 },
        { name: 'Responsive Web Design', category: 'Core Development', description: 'Fluid layouts, mobile-first workflows', featured: true, order: 15 },
        { name: 'Data Structures & Algorithms', category: 'Core Development', description: 'Algorithmic efficiency, problem solving', featured: false, order: 16 },
      ];

      await Skill.insertMany(skillsData);
      console.log(`[SEED-CONTENT] ${skillsData.length} Skills initialized.`);
    }

    // 5. Projects Seed (Verified URLs: Atmosfera, NexCart)
    const existingProjects = await Project.countDocuments();
    if (existingProjects === 0) {
      const projectsData = [
        {
          title: 'Atmosfera',
          slug: 'atmosfera',
          category: 'Frontend',
          summary: 'Modern atmospheric web experience featuring clean typography, responsive layout, and fluid interactions.',
          description: 'A refined web application built to explore atmospheric visuals, minimalist UI hierarchy, and responsive interaction design across desktop, tablet, and mobile displays.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
          features: [
            'Minimalist visual hierarchy and curated typography',
            'Cross-device responsive layout adaptation',
            'Lightweight, fluid animation performance',
            'Live cloud deployment on Vercel',
          ],
          liveDemoUrl: 'https://atmosfera-pied.vercel.app/',
          githubUrl: 'https://github.com/aqilk66-oss',
          thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
          featured: true,
          published: true,
          order: 1,
        },
        {
          title: 'NexCart',
          slug: 'nex-cart',
          category: 'Full-Stack',
          summary: 'Modern digital storefront web application focused on product catalogs, structured cart workflows, and clean commerce UI.',
          description: 'A focused digital commerce project engineered to provide an intuitive shopping experience with catalog filtering, organized category views, and responsive transaction flows.',
          technologies: ['JavaScript', 'HTML5', 'CSS3', 'Web APIs'],
          features: [
            'Dynamic product catalog display',
            'Cart item management and status overview',
            'Mobile-friendly responsive commerce UI',
            'Live deployment on Vercel',
          ],
          liveDemoUrl: 'https://nex-cart-red.vercel.app/',
          githubUrl: 'https://github.com/aqilk66-oss',
          thumbnailUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
          featured: true,
          published: true,
          order: 2,
        },
        {
          title: 'MERN Portfolio Platform & CMS',
          slug: 'mern-portfolio-cms',
          category: 'Full-Stack',
          summary: 'Production-ready full-stack portfolio platform with secure administrative CMS, HttpOnly session authentication, and dynamic REST APIs.',
          description: 'An architectural showcase platform built with Node.js, Express, MongoDB/Mongoose, and React. Features an isolated administrative control panel for real-time CRUD management of projects, skills, resumes, and inquiries.',
          technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'GSAP', 'JWT'],
          features: [
            'Secure HttpOnly cookie session management and bcrypt password hashing',
            'Complete CMS CRUD workflows for projects, skills, education, and resumes',
            'Lenis + GSAP + ScrollTrigger coordinated motion system',
            'Interactive Three.js WebGL spatial Hero scene',
            'Rate-limited contact inquiry pipeline with NoSQL injection sanitization',
          ],
          liveDemoUrl: 'http://localhost:5173',
          githubUrl: 'https://github.com/aqilk66-oss',
          thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
          featured: true,
          published: true,
          order: 3,
        },
      ];

      await Project.insertMany(projectsData);
      console.log(`[SEED-CONTENT] ${projectsData.length} Projects initialized.`);
    }

    // 6. CV Seed
    const existingCv = await Cv.countDocuments();
    if (existingCv === 0) {
      await Cv.create({
        version: 'v1.0',
        title: 'Muhammad Aqil Khan - MERN Stack Developer Resume',
        fileName: 'Muhammad_Aqil_Khan_CV.pdf',
        fileUrl: '/Muhammad_Aqil_Khan_CV.pdf',
        fileSize: '184 KB',
        isActive: true,
      });
      console.log('[SEED-CONTENT] Active CV initialized.');
    }

    await mongoose.disconnect();
    console.log('[SEED-CONTENT] Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('[SEED-CONTENT] Failed to seed content:', error.message);
    process.exit(1);
  }
};

seedContent();
