# Changelog — Muhammad Aqil Khan Portfolio Platform

All notable changes and architectural releases for this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-09-24 — Production Release Candidate

### Added
- **Full-Stack Architecture**: Modern decoupled monorepo containing React/Vite client and Node.js/Express server with MongoDB Mongoose ODM.
- **Dynamic Content Management System (CMS)**:
  - Private administration portal at `/admin/login` and `/admin/dashboard`.
  - Full CRUD management for Projects, Skills, Professional Experience, Education, Profile, Media Assets, and Active CV.
  - Visitor inquiry management inbox with read/unread flags and message deletion.
- **Technical SEO & Metadata**:
  - Centralized `SEO.jsx` supporting route-specific `<title>`, `<meta name="description">`, OpenGraph previews, and canonical `<link>`.
  - JSON-LD structured data schemas (`Person` on homepage, `SoftwareApplication` on project case studies).
  - Production `sitemap.xml` and `robots.txt` disallowing search indexing of the administrative portal.
- **Advanced Motion & 3D WebGL Layer**:
  - Three.js / React Three Fiber interactive Hero geometry with camera pointer parallax and DPR capping.
  - GSAP and ScrollTrigger narrative animations with clean context lifecycle cleanup.
  - Lenis smooth momentum scrolling with automatic reduced-motion fallback.
- **Enterprise-Grade Security Hardening**:
  - JWT authentication stored exclusively in `HttpOnly; Secure; SameSite=Strict` cookies.
  - Multi-tier rate limiting for login attempts, public contact submissions, and global API routes.
  - NoSQL query injection prevention via `express-mongo-sanitize`.
  - Helmet HTTP security headers and strictly configured CORS policy.
- **Production DevOps & Infrastructure**:
  - SPA rewrite rules via `vercel.json` and Netlify `_redirects`.
  - GitHub Actions CI/CD pipeline verifying production builds and backend route syntax on push to `main`.
  - Comprehensive documentation suite covering Architecture, Database Schemas, API contracts, Deployment Runbook, Admin Guide, Maintenance, Animations, and Troubleshooting.
