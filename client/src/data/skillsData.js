// Verified Initial Data for Stage 5 & API Readiness Fallback
// This structured data mirrors the MongoDB Mongoose models (Profile, Skill)

export const PERSONAL_PHOTOS = {
  hero: {
    src: '/images/personal/image-2-hero.jpg',
    alt: 'Muhammad Aqil Khan coding full-stack applications in black kurta at his developer desk with Clean Code and Web Development literature',
    caption: 'MERN Stack & Full-Stack Web Developer',
  },
  workspace: {
    src: '/images/personal/image-1-workspace.jpg',
    alt: 'Muhammad Aqil Khan working on high-performance web systems and system architecture at developer workstation',
    caption: 'Full-Stack Engineering & System Design',
  },
  journey: {
    src: '/images/personal/image-3-story.jpg',
    alt: 'Muhammad Aqil Khan reflecting during computer science academic studies',
    caption: 'Academic Inception & Theoretical Grounding',
  },
  contact: {
    src: '/images/personal/image-4-connect.jpg',
    alt: 'Muhammad Aqil Khan smiling, available for professional MERN stack opportunities and collaborations',
    caption: 'Available for Opportunities',
  },
};

export const VERIFIED_PROFILE = {
  fullName: 'Muhammad Aqil Khan',
  primaryRole: 'MERN Stack Developer / Full-Stack Web Developer',
  secondaryRole: 'Full-Stack Web Developer',
  degree: 'B.S. Computer Science',
  educationPeriod: '2022 – 2026',
  location: 'Charsadda, Pakistan',
  email: 'aqilk4992@gmail.com',
  whatsapp: '+92 342 5730066',
  github: 'https://github.com/aqilk66-oss',
  linkedin: 'https://www.linkedin.com/in/muhammad-aqil-khan-a20a87428/',
  avatarUrl: '/images/personal/image-1-workspace.jpg',
  heroPhotoUrl: '/images/personal/image-2-hero.jpg',
  bioShort: 'Architecting secure, high-performance web applications with Node.js, Express, MongoDB, and dynamic React interfaces.',
  aboutTrajectory: [
    'I am a Computer Science student (B.S. CS 2022–2026) dedicated to engineering robust, modern full-stack web applications. My core expertise is anchored around the MERN stack—connecting modular React user interfaces with scalable, secure Node.js and Express backend architectures.',
    'With a principled approach to clean code and database architecture, I develop responsive applications that prioritize performance, accessible UI/UX, and robust authentication systems. My goal is to build web software that delivers real functional value with technical precision.'
  ],
  quickFacts: [
    { label: 'Academic Qualification', value: 'B.S. Computer Science', sub: '2022 – 2026' },
    { label: 'Primary Specialization', value: 'MERN & Full-Stack Development', sub: 'APIs • DB • UI/UX' },
    { label: 'Geographic Location', value: 'Charsadda, Pakistan', sub: 'Remote & Hybrid Available' },
    { label: 'Core Engineering Ethos', value: 'Modular & Accessible Architecture', sub: 'Clean Code & Security' }
  ]
};

export const SIGNATURE_TECH_STACK = [
  { name: 'React', category: 'Frontend', descriptor: 'Component Architecture' },
  { name: 'JavaScript', category: 'Language', descriptor: 'ES2023 Modern Core' },
  { name: 'TypeScript', category: 'Language', descriptor: 'Type-Safe Applications' },
  { name: 'Node.js', category: 'Backend', descriptor: 'Runtime Environment' },
  { name: 'Express.js', category: 'Backend', descriptor: 'RESTful API Services' },
  { name: 'MongoDB', category: 'Database', descriptor: 'Document Data Store' },
  { name: 'Tailwind CSS', category: 'Styling', descriptor: 'Design System Tokens' },
  { name: 'GSAP', category: 'Motion', descriptor: 'Scroll & Timeline Engine' },
  { name: 'Three.js', category: '3D Graphics', descriptor: 'WebGL Interactive Depth' },
  { name: 'Git', category: 'Tools', descriptor: 'Version Control & CI' }
];

export const SKILL_CATEGORIES = [
  'Frontend Development',
  'Backend Development',
  'Databases & Backend Services',
  'Development Tools',
  'Core Development Areas'
];

export const VERIFIED_SKILLS = [
  // Frontend Development
  { name: 'React', category: 'Frontend Development', isCore: true, descriptor: 'Component lifecycles, hooks, context API, state management, and modern patterns.' },
  { name: 'JavaScript (ES2023)', category: 'Frontend Development', isCore: true, descriptor: 'Asynchronous programming, closures, promises, prototypes, and modern standards.' },
  { name: 'TypeScript', category: 'Frontend Development', isCore: true, descriptor: 'Static typing, interfaces, generics, and strict type-safety for scalable codebases.' },
  { name: 'Tailwind CSS', category: 'Frontend Development', isCore: true, descriptor: 'Tokenized design systems, custom configuration, responsive utilities, and dark mode.' },
  { name: 'HTML5 & CSS3', category: 'Frontend Development', isCore: false, descriptor: 'Semantic document structure, flexbox, CSS grid, and modern web standards.' },
  { name: 'Responsive Web Design', category: 'Frontend Development', isCore: true, descriptor: 'Mobile-first architectural planning, fluid viewports, and multi-device compliance.' },
  { name: 'Modern UI/UX', category: 'Frontend Development', isCore: false, descriptor: 'Micro-interactions, accessible color contrast, visual hierarchy, and component consistency.' },
  { name: 'GSAP', category: 'Frontend Development', isCore: true, descriptor: 'Timeline choreography, ScrollTrigger synchronization, and lifecycle-safe cleanups.' },
  { name: 'Three.js', category: 'Frontend Development', isCore: false, descriptor: 'React Three Fiber (R3F), Drei, 3D geometric viewports, and hardware-aware fallbacks.' },

  // Backend Development
  { name: 'Node.js', category: 'Backend Development', isCore: true, descriptor: 'Event-driven asynchronous server runtime, non-blocking I/O, and process management.' },
  { name: 'Express.js', category: 'Backend Development', isCore: true, descriptor: 'Middleware pipelines, routing architecture, controllers, and REST service design.' },
  { name: 'REST API Development', category: 'Backend Development', isCore: true, descriptor: 'Resource-oriented endpoint architecture, versioning (/api/v1), and status codes.' },
  { name: 'CRUD Operations', category: 'Backend Development', isCore: false, descriptor: 'Safe document lifecycle processing, atomic mutations, and transactional integrity.' },

  // Databases & Backend Services
  { name: 'MongoDB', category: 'Databases & Backend Services', isCore: true, descriptor: 'Document schema design, Mongoose models, aggregation pipelines, and indexing.' },
  { name: 'MySQL', category: 'Databases & Backend Services', isCore: false, descriptor: 'Relational data modeling, foreign key constraints, table normalization, and SQL queries.' },
  { name: 'Firebase Firestore', category: 'Databases & Backend Services', isCore: false, descriptor: 'NoSQL document cloud database, real-time listeners, and security rules.' },
  { name: 'Firebase Authentication', category: 'Databases & Backend Services', isCore: false, descriptor: 'OAuth identity integration, session validation, and provider configs.' },
  { name: 'Firebase Storage', category: 'Databases & Backend Services', isCore: false, descriptor: 'Cloud binary storage, secure upload rules, and asset delivery.' },

  // Development Tools
  { name: 'Git', category: 'Development Tools', isCore: true, descriptor: 'Branch workflows, rebasing, merge strategies, commit hygiene, and collaboration.' },
  { name: 'GitHub', category: 'Development Tools', isCore: true, descriptor: 'Repository management, PR reviews, workflow automation, and open-source practices.' },
  { name: 'VS Code', category: 'Development Tools', isCore: false, descriptor: 'Customized developer environment, debugging tools, extensions, and workspace configs.' },
  { name: 'Vite', category: 'Development Tools', isCore: true, descriptor: 'Next-generation ES module bundler, fast HMR, and production roll-up pipelines.' },

  // Core Development Areas (Capabilities)
  { name: 'MERN Stack Development', category: 'Core Development Areas', isCore: true, isCapability: true, descriptor: 'End-to-end full-stack development synthesizing MongoDB, Express, React, and Node.js.' },
  { name: 'Full-Stack Web Development', category: 'Core Development Areas', isCore: true, isCapability: true, descriptor: 'Unified application architecture spanning database persistence, REST APIs, and client interfaces.' },
  { name: 'Authentication & Authorization', category: 'Core Development Areas', isCore: true, isCapability: true, descriptor: 'Bcrypt password hashing, JWT issuance via HttpOnly cookies, and CSRF defense.' },
  { name: 'Role-Based Access Control', category: 'Core Development Areas', isCore: true, isCapability: true, descriptor: 'Fine-grained route guards, super_admin middleware protection, and permission gates.' },
  { name: 'API Integration & Middleware', category: 'Core Development Areas', isCore: true, isCapability: true, descriptor: 'Centralized Axios interceptors, rate limiting, request validation, and error envelopes.' },
  { name: 'Responsive Web Applications', category: 'Core Development Areas', isCore: true, isCapability: true, descriptor: 'Cross-browser responsive layouts functioning seamlessly across 320px to 4K displays.' },
  { name: 'Database-Driven Applications', category: 'Core Development Areas', isCore: true, isCapability: true, descriptor: 'Relational & document database schema modeling, queries optimization, and integrity.' }
];
