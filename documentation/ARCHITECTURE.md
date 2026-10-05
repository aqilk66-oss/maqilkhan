# Stage 1 — Professional Portfolio & CMS Platform Architecture

**Owner / Principal**: Muhammad Aqil Khan  
**Primary Positioning**: MERN Stack Developer / Full-Stack Web Developer  
**Status**: Stage 1 Completed (Architecture, System Design, Schema Planning & Security Specification)

---

## 1. System Architecture Overview

The platform is designed as an enterprise-grade, decoupled full-stack Web Application & Content Management System (CMS) containing two dedicated operational surfaces:

1. **Public Portfolio Client**: A high-performance, dynamic React application optimized for recruiters, prospective clients, and engineering leaders. It features high-end aesthetics, GSAP ScrollTrigger-driven narrative animations, subtle 3D WebGL experiences powered by Three.js/R3F, and smooth momentum scrolling via Lenis. It consumes strictly sanitized, published read-only data.
2. **Private Admin CMS Dashboard**: A secure, isolated administrative suite with RBAC (`super_admin`), real-time content authoring, drag-and-drop project curation, media asset organization, multi-version CV lifecycle management, and lead/inquiry moderation.
3. **Backend API Layer**: A production-hardened Node.js/Express REST API offering centralized validation, security headers (Helmet, rate limiting, sanitization), JWT token issuance via encrypted `HttpOnly` cookies, and clean multi-tier controller-service-model separation.
4. **Data & Storage Layer**: MongoDB (Mongoose ODM) enforcing strict schema validation and indexed queries, paired with Cloud Storage (Cloudinary / AWS S3) for CDN-backed media assets and downloadable CV files.

---

## 2. Directory Tree Structure

A decoupled mono-repository structure cleanly separating frontend, backend, and documentation assets without leaky abstractions:

```
Aqil khan porfolio 1/
├── documentation/
│   ├── ARCHITECTURE.md
│   ├── API_SPECIFICATION.md
│   ├── DATABASE_SCHEMAS.md
│   └── DEPLOYMENT_GUIDE.md
├── client/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── sections/
│   │   ├── animations/
│   │   ├── three/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── constants/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── .gitignore
├── README.md
└── package.json
```

---

## 3. Route Map Specification

### A. Public Portfolio Routes (`PublicLayout.jsx`)
- `/`: Hero, narrative presentation, featured projects showcase, high-level skills, direct CTA.
- `/about`: Detailed developer trajectory, technical ethos, education summary, and download resume action.
- `/skills`: Categorized skill domains (Frontend, Backend, Databases, Tools, Core Development Areas).
- `/projects`: Complete searchable, filterable repository of published case studies.
- `/projects/:slug`: Deep-dive technical case studies (e.g., `/projects/weddinghub`, `/projects/routewise`, `/projects/atmosfera`, `/projects/nexcart`).
- `/experience`: Professional trajectory, milestones, and development contributions.
- `/education`: B.S. Computer Science (2022–2026) academic accomplishments and key subjects.
- `/resume`: Dedicated interactive CV viewer, version display, and direct download triggering the active CV.
- `/contact`: Interactive validated inquiry submission form, direct WhatsApp, and verified email links.
- `*`: Custom 404 page with navigation recovery.

### B. Admin CMS Routes (`AdminLayout.jsx` & `AuthLayout.jsx`)
- `/admin/login`: Secure credential authentication portal with rate-limit protection.
- `/admin/dashboard`: Metrics hub (Published vs Draft projects, Total Skills, Active CV status, Unread Inquiries).
- `/admin/profile`: Primary author identity manager (Positioning, Bio, Coordinates, Avatars).
- `/admin/projects`: Tabular project management with quick publish/unpublish toggles and ordering.
- `/admin/projects/new`: Rich project editor (Markdown description, tech stack tags, feature bullets, media).
- `/admin/projects/:id/edit`: Targeted case study updates, gallery upload/reorder.
- `/admin/skills`: Category-based skill management with ordering weights and featured badges.
- `/admin/experience`: Work history editor (Company, title, dates, bulleted achievements).
- `/admin/education`: Degree & institutional records editor.
- `/admin/cv`: Multi-version CV file management, preview, and one-click active selection toggle.
- `/admin/media`: Cloudinary/S3 asset gallery with copy-URL, bulk delete, and image dimensions view.
- `/admin/contact`: Social profiles, WhatsApp, email, and location configuration.
- `/admin/messages`: Inquiry inbox with read/unread flags, reply shortcuts, and deletion.
- `/admin/settings`: System maintenance toggles, security session inspection, and password updates.

---

## 4. Database Schema Specifications (MongoDB / Mongoose)

- **Admin**: Email (unique), bcrypt passwordHash, role `super_admin`, tokenVersion, lastLogin.
- **Profile**: Full Name ("Muhammad Aqil Khan"), Titles ("MERN Stack Developer" / "Full-Stack Web Developer"), Bio, Location ("Charsadda, Pakistan"), Email, WhatsApp, LinkedIn, GitHub, activeCv ref.
- **Skill**: Name, category (Frontend, Backend, Databases, Tools, Core), icon, description, featured, order.
- **Project**: Title, slug (indexed), short/full descriptions, thumbnail, gallery, technologies, features, category, githubUrl, liveUrl, caseStudyUrl, featured, published (draft/published), order.
- **Experience**: Role, company, location, employmentType, startDate, endDate, isCurrent, achievements, technologiesUsed, order.
- **Education**: Degree ("B.S. Computer Science"), institution, startYear (2022), endYear (2026), highlights, order.
- **Cv**: Title, fileName, fileUrl, version, isActive (single active CV), uploadedAt.
- **Media**: PublicId, originalName, url, mimeType, size, category.
- **ContactInfo**: Email, WhatsApp, location, GitHub, LinkedIn, button labels.
- **Message**: Visitor name, email, message body, isRead status, ipHash, createdAt.

---

## 5. Security & Authentication Architecture
- JWT stored in **`HttpOnly; SameSite=Strict; Secure`** cookie.
- CSRF defense & SameSite enforcement.
- Rate limiting on login (5/15min) and message dispatch (3/hr).
- Helmet HTTP security headers & Mongo query sanitization.
- Role-based authorization (`super_admin`) with instant session revocation via `tokenVersion`.

---

## 6. Animation, 3D & Smooth Scroll Integration
- Unified render loop: Lenis Smooth Scroll updates virtual momentum into GSAP Ticker, driving ScrollTrigger and Three.js camera drifts in one frame.
- Clean component lifecycle cleanups using GSAP context (`useGSAP`).
- Mobile & reduced-motion friendly: 3D canvas gracefully scales down to lightweight visual fallbacks on low-tier devices.
