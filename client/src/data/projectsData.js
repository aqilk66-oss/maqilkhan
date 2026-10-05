// Verified Project Dataset & Data Contract for Muhammad Aqil Khan
// Strictly follows the MongoDB Project Mongoose Schema from Stage 1

export const VERIFIED_PROJECTS = [
  {
    id: 'proj-1',
    title: 'WeddingHub',
    slug: 'weddinghub',
    shortDescription: 'Full-stack multi-vendor marketplace platform connecting event organizers, couples, and wedding service vendors with real-time service booking and interactive dashboards.',
    fullDescription: 'WeddingHub is a comprehensive full-stack web application designed to streamline event planning and vendor management. It integrates vendor profile catalogs, quote management, interactive booking workflows, and responsive client dashboards.',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80'
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST API'],
    features: [
      'Multi-vendor catalog with categorization and filtering',
      'Role-based access management for clients and service vendors',
      'Interactive quote submission and booking inquiry workflows',
      'Responsive client interface engineered for mobile and desktop'
    ],
    category: 'Full-Stack',
    githubUrl: 'https://github.com/aqilk66-oss',
    liveUrl: '', // Preserved empty until live deployment URL provided
    caseStudyUrl: '/projects/weddinghub',
    featured: true,
    published: true,
    order: 1,
    problem: 'Event coordination often suffers from fragmented communication between diverse service providers (catering, photography, venues) and clients.',
    solution: 'Engineered a centralized MERN web platform providing unified listings, inquiry tracking, and authenticated communication channels.'
  },
  {
    id: 'proj-2',
    title: 'RouteWise',
    slug: 'routewise',
    shortDescription: 'Intelligent journey planner and route optimization web application providing automated transit itineraries, multi-stop planning, and commute analytics.',
    fullDescription: 'RouteWise is a modern travel and transit planning web application built to calculate optimized multi-destination journeys. Featuring responsive mapping, journey timing calculations, and clean UI visualizations.',
    thumbnail: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80'
    ],
    technologies: ['React', 'JavaScript (ES2023)', 'Tailwind CSS', 'REST API', 'Vite'],
    features: [
      'Multi-stop itinerary construction and route sequencing',
      'Dynamic travel time estimation and stopover scheduling',
      'Mobile-first responsive interface with tactile touch controls'
    ],
    category: 'Web Application',
    githubUrl: 'https://github.com/aqilk66-oss',
    liveUrl: '',
    caseStudyUrl: '/projects/routewise',
    featured: true,
    published: true,
    order: 2,
    problem: 'Manual multi-destination planning leads to suboptimal route sequences, redundant travel legs, and inaccurate time estimates.',
    solution: 'Created an intuitive web interface with structured data inputs to calculate logical sequence ordering and schedule checkpoints.'
  },
  {
    id: 'proj-3',
    title: 'Atmosfera',
    slug: 'atmosfera',
    shortDescription: 'High-precision meteorological dashboard and weather forecast web application featuring location lookup, multi-day forecasting, and atmospheric visualizations.',
    fullDescription: 'Atmosfera delivers real-time weather analytics, radar data indicators, humidity, pressure, and wind speed calculations wrapped in an elegant dark-mode glassmorphic interface.',
    thumbnail: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80'
    ],
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Weather API', 'Responsive UI'],
    features: [
      'Real-time atmospheric telemetry fetching via external APIs',
      '5-day dynamic weather outlook and temperature trend graphs',
      'Location-based search with automated units conversion'
    ],
    category: 'Frontend',
    githubUrl: 'https://github.com/aqilk66-oss',
    liveUrl: 'https://atmosfera-pied.vercel.app/',
    caseStudyUrl: '/projects/atmosfera',
    featured: true,
    published: true,
    order: 3,
    problem: 'Standard weather apps are frequently cluttered with ad placements and slow, bloated script bundles.',
    solution: 'Built a lightweight, fast-loading, responsive weather telemetry application deployed on Vercel.'
  },
  {
    id: 'proj-4',
    title: 'NexCart',
    slug: 'nexcart',
    shortDescription: 'Modern e-commerce storefront web application featuring interactive product catalogs, real-time cart state management, and streamlined checkout UX.',
    fullDescription: 'NexCart is an e-commerce web platform engineered with vanilla JavaScript, modern CSS architecture, and dynamic DOM manipulation (Note: accurately engineered as a JavaScript/HTML/CSS project, not React).',
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    technologies: ['JavaScript (ES2023)', 'HTML5', 'CSS3', 'Local Storage', 'Responsive Web Design'],
    features: [
      'Dynamic product catalog with category and price filters',
      'Client-side cart calculation with persistent local storage',
      'Mobile-responsive layout with seamless checkout step progression'
    ],
    category: 'Web Application',
    githubUrl: 'https://github.com/aqilk66-oss',
    liveUrl: 'https://nex-cart-red.vercel.app/',
    caseStudyUrl: '/projects/nexcart',
    featured: true,
    published: true,
    order: 4,
    problem: 'Many commercial storefronts require excessive client-side frameworks for standard consumer catalog browsing.',
    solution: 'Constructed an ultra-fast, zero-overhead vanilla JavaScript shopping cart with responsive CSS and local persistence.'
  }
];

export const PROJECT_CATEGORIES = [
  'All',
  'Full-Stack',
  'Frontend',
  'Web Application'
];
