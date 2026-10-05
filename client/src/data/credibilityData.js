// Verified Credibility, Education, Journey, and Capability Data Architecture
// Aligned with Stage 1 Mongoose Schemas (Education, Experience, Certification)

export const VERIFIED_EDUCATION = [
  {
    id: 'edu-1',
    degree: 'B.S. Computer Science',
    institution: 'Government Post Graduate College (GPGC)',
    location: 'Charsadda, Pakistan',
    startDate: '2022',
    endDate: '2026',
    status: 'In Progress (Degree Candidate)',
    description: 'Undergraduate academic foundation covering data structures, object-oriented software engineering, algorithms, database systems, computer networking, and operating systems.',
    coreAreas: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Database Systems & Modeling',
      'Software Engineering Principles',
      'Computer Networks & Protocols'
    ],
    order: 1
  }
];

export const VERIFIED_JOURNEY = [
  {
    id: 'journey-1',
    year: '2022',
    period: '2022 — 2023',
    title: 'Computer Science Academic Inception',
    subtitle: 'Core Computing Fundamentals',
    description: 'Began B.S. in Computer Science. Mastered algorithmic thinking, procedural programming, object-oriented concepts, and basic computational modeling.',
    technologies: ['C++', 'Data Structures', 'Algorithms', 'OOP'],
    type: 'Academic Foundation'
  },
  {
    id: 'journey-2',
    year: '2024',
    period: '2024',
    title: 'Modern Web Engineering & Frontend Architecture',
    subtitle: 'Interactive Interfaces & UI Systems',
    description: 'Deepened focus on modern client-side software. Specialized in ES2023 JavaScript, responsive layouts with Tailwind CSS, state management, and React component architectures.',
    technologies: ['JavaScript (ES2023)', 'React', 'Tailwind CSS', 'Vite', 'Git'],
    type: 'Frontend Specialization'
  },
  {
    id: 'journey-3',
    year: '2025',
    period: '2025 — 2026',
    title: 'Full-Stack MERN Specialization',
    subtitle: 'Scalable APIs, Database Modeling & Authentication',
    description: 'Expanded architecture end-to-end: building RESTful APIs with Node.js and Express, designing document schemas with MongoDB/Mongoose, and implementing role-based access control with HttpOnly JWT security.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'MERN Stack', 'JWT Security', 'REST APIs'],
    type: 'Full-Stack Engineering'
  },
  {
    id: 'journey-4',
    year: '2026',
    period: '2026',
    title: 'Production Platforms & Creative Engineering',
    subtitle: 'Portfolio CMS & Advanced Motion Systems',
    description: 'Synthesizing full-stack engineering with creative design systems: integrating GSAP ScrollTrigger timelines, Three.js 3D WebGL scenes, smooth momentum scrolling, and custom headless CMS architectures.',
    technologies: ['GSAP', 'ScrollTrigger', 'Three.js / R3F', 'Lenis', 'CMS Architecture'],
    type: 'Production & Systems'
  }
];

// Experience Data Structure: Prepared for future CMS entries.
// Strict Accuracy: No fake corporate employment fabricated.
export const VERIFIED_EXPERIENCE = [
  // Empty or designated real roles only. CMS will populate when verified.
];

// Certifications Data Structure: Prepared for future verified credentials
export const VERIFIED_CERTIFICATIONS = [
  // Ready for verified certificate URLs and IDs via CMS
];

// What I Build / Practical Capabilities
export const VERIFIED_CAPABILITIES = [
  {
    id: 'cap-1',
    number: '01',
    title: 'Full-Stack Web Applications',
    tagline: 'End-to-end MERN platform architecture',
    description: 'Engineered from database models to responsive client interfaces. Synthesizing MongoDB, Express, React, and Node.js for maintainable web software.',
    deliverables: [
      'Complete client-server data synchronization',
      'Stateful user experiences with persistent local storage',
      'Clean separation of presentation, business, and data layers'
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB']
  },
  {
    id: 'cap-2',
    number: '02',
    title: 'RESTful API Systems & Services',
    tagline: 'Secure, versioned backend micro-architectures',
    description: 'Designing structured REST endpoints (/api/v1) with centralized error envelopes, rate limiting, request validation, and strict HTTP status handling.',
    deliverables: [
      'Standardized JSON response formats (success, message, data, error)',
      'Defensive rate limiting against abuse and brute-force attacks',
      'Robust parameter sanitization to prevent NoSQL query injection'
    ],
    technologies: ['Express.js', 'Node.js', 'Zod', 'Helmet']
  },
  {
    id: 'cap-3',
    number: '03',
    title: 'Modern Interactive UI / UX Interfaces',
    tagline: 'Component-driven, responsive client engineering',
    description: 'Crafting responsive user interfaces with tokenized Tailwind CSS, Space Grotesk typography, and subtle micro-interactions that elevate usability.',
    deliverables: [
      'Mobile-first responsive fluid layouts from 320px to 4K',
      'High-contrast accessible color tokens adhering to WCAG standards',
      'Lightweight component primitives with zero styling leaks'
    ],
    technologies: ['React', 'Tailwind CSS', 'Lucide React', 'Vite']
  },
  {
    id: 'cap-4',
    number: '04',
    title: 'Database Modeling & Persistence',
    tagline: 'Document & relational schema architecture',
    description: 'Architecting MongoDB/Mongoose document schemas with strict validation, compound indexes, and relational integrity via foreign key references.',
    deliverables: [
      'Clean indexing for fast search and slug resolution',
      'Safe document mutation workflows with atomic updates',
      'Decoupled media asset metadata referencing cloud storage'
    ],
    technologies: ['MongoDB', 'Mongoose', 'MySQL', 'Firebase']
  },
  {
    id: 'cap-5',
    number: '05',
    title: 'Authentication & Access Control',
    tagline: 'Production-hardened session security',
    description: 'Implementing token-based authentication with bcrypt password hashing and JSON Web Tokens delivered strictly via encrypted HttpOnly cookies.',
    deliverables: [
      'Complete protection against XSS token exfiltration',
      'Role-based access control (RBAC) with super_admin route guards',
      'Instant session revocation via tokenVersion validation'
    ],
    technologies: ['JWT', 'Bcrypt.js', 'HttpOnly Cookies', 'RBAC']
  },
  {
    id: 'cap-6',
    number: '06',
    title: 'Creative Motion & WebGL Graphics',
    tagline: 'High-performance visual storytelling',
    description: 'Integrating GSAP ScrollTrigger timelines, Lenis smooth momentum scrolling, and Three.js / React Three Fiber scenes with reduced-motion fallbacks.',
    deliverables: [
      'Unified render loop wiring virtual scroll to GSAP ticker',
      'Lifecycle-safe animation cleanups eliminating memory leaks',
      'Hardware-aware WebGL fallbacks for mobile and weak GPUs'
    ],
    technologies: ['GSAP', 'ScrollTrigger', 'Three.js / R3F', 'Lenis']
  }
];

// Professional Development Approach Methodology
export const DEVELOPMENT_APPROACH = [
  {
    step: '01',
    name: 'Understand',
    summary: 'Deconstruct requirements & define scope',
    details: 'Analyze the domain, isolate functional requirements from cosmetic desires, identify technical constraints, and define user journeys.',
    focus: 'Problem Framing & Requirements'
  },
  {
    step: '02',
    name: 'Plan',
    summary: 'Architect data flow & technical schema',
    details: 'Map API endpoint contracts (/api/v1), design MongoDB collections, define security models, and plan component hierarchies before writing code.',
    focus: 'System Architecture & Schema Design'
  },
  {
    step: '03',
    name: 'Design',
    summary: 'Establish tokenized UI/UX systems',
    details: 'Structure semantic color palettes, typographic scales, responsive breakpoints, and accessible focus states following the 70/20/10 design rule.',
    focus: 'UI/UX Design Tokens & Accessibility'
  },
  {
    step: '04',
    name: 'Develop',
    summary: 'Construct modular full-stack code',
    details: 'Build decoupled frontend components and layered backend controllers, services, and models adhering to DRY and Single Responsibility principles.',
    focus: 'MERN Stack Engineering & Integration'
  },
  {
    step: '05',
    name: 'Refine',
    summary: 'Test, optimize & polish animations',
    details: 'Benchmark frame rates, audit accessibility compliance, verify reduced-motion fallbacks, eliminate layout shifts, and profile build bundles.',
    focus: 'Performance, a11y & Motion Polish'
  },
  {
    step: '06',
    name: 'Deliver',
    summary: 'Deploy, document & maintain systems',
    details: 'Configure production environment variables, write clear architectural documentation, configure security headers, and verify live endpoints.',
    focus: 'Deployment & System Reliability'
  }
];
