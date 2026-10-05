# Muhammad Aqil Khan Portfolio Platform — Database Schema & Data Models

This document defines the authoritative MongoDB / Mongoose schemas, indexes, validation constraints, and publication flow governing the portfolio platform.

---

## 1. Schema Specifications

### A. Profile (`Profile.js`)
- `fullName`: String, required, default `"Muhammad Aqil Khan"`
- `primaryRole`: String, required, default `"MERN Stack Developer"`
- `secondaryRole`: String, default `"Full-Stack Web Developer"`
- `bio`: String, required
- `location`: String, default `"Charsadda, Pakistan"`
- `email`: String, required, regex validated (`aqilk4992@gmail.com`)
- `phone`: String, optional (`+92 342 5730066`)
- `whatsapp`: String, optional (`+92 342 5730066`)
- `githubUrl`: String, default `"https://github.com/aqilk66-oss"`
- `linkedinUrl`: String, default `"https://www.linkedin.com/in/muhammad-aqil-khan-a20a87428/"`
- `avatarUrl`: String, Cloudinary/S3 image URL
- `activeCvUrl`: String, link to active CV download route
- `aboutTrajectory`: [String], narrative paragraphs

### B. Project (`Project.js`)
- `title`: String, required (e.g., `"Atmosfera"`, `"NexCart"`, `"MERN Portfolio CMS"`)
- `slug`: String, required, unique, indexed, slugified
- `summary`: String, short overview for grid cards
- `description`: String, comprehensive markdown narrative
- `category`: String, required (e.g. `"Web Application"`, `"E-Commerce"`, `"Full-Stack"`)
- `technologies`: [String], tech stack tags (e.g. `["React", "Node.js", "Express", "MongoDB"]`)
- `features`: [String], bulleted feature list
- `thumbnailUrl`: String, grid card asset
- `galleryUrls`: [String], high-resolution screenshot array
- `liveDemoUrl`: String, verified URL (e.g. `https://atmosfera-pied.vercel.app/`)
- `githubClientUrl`: String, repository link
- `githubServerUrl`: String, backend repository link
- `architecture`: String, optional architectural overview
- `problem`: String, optional problem statement
- `solution`: String, optional solution methodology
- `challenges`: String, optional engineering hurdles
- `lessons`: String, optional takeaways
- `isFeatured`: Boolean, default `false`, indexed
- `isPublished`: Boolean, default `true`, indexed
- `order`: Number, default `0`, indexed for deterministic ranking

### C. Skill (`Skill.js`)
- `name`: String, required (e.g., `"React"`, `"MongoDB"`, `"Express"`, `"Node.js"`)
- `category`: String, required (`Frontend Development`, `Backend Development`, `Databases & Services`, `Development Tools`, `Core Concepts`)
- `icon`: String, icon identifier
- `proficiency`: Number, 1–100
- `description`: String, technical context
- `isFeatured`: Boolean, default `false`
- `order`: Number, default `0`

### D. Education (`Education.js`)
- `degree`: String, required (`"B.S. Computer Science"`)
- `institution`: String, required (`"Postgraduate College / University"`, Charsadda)
- `location`: String, `"Charsadda, Pakistan"`
- `startDate`: Date, 2022
- `endDate`: Date, 2026
- `isCurrent`: Boolean, default `true`
- `description`: String, summary of focus areas and foundational algorithms
- `order`: Number, default `0`

### E. Experience (`Experience.js`)
- `role`: String, required
- `organization`: String, required
- `type`: String, enum (`"Full-time"`, `"Freelance"`, `"Open Source"`, `"Academic"`)
- `startDate`: Date, required
- `endDate`: Date, optional
- `isCurrent`: Boolean, default `false`
- `description`: String, narrative summary
- `responsibilities`: [String]
- `technologies`: [String]
- `order`: Number, default `0`

### F. Curriculum Vitae (`Cv.js`)
- `title`: String, required (e.g., `"Muhammad Aqil Khan - MERN Stack CV"`)
- `version`: String, required (e.g., `"v1.2"`)
- `fileName`: String, required
- `fileUrl`: String, required (PDF storage URL)
- `fileSize`: Number, in bytes
- `isActive`: Boolean, default `false`, indexed
- `uploadedAt`: Date, default `Date.now`

### G. Message (`Message.js`)
- `name`: String, required, trimmed
- `email`: String, required, lowercase, email format validated
- `subject`: String, optional
- `message`: String, required, trimmed
- `ipAddress`: String, hashed
- `isRead`: Boolean, default `false`, indexed
- `createdAt`: Date, default `Date.now`

---

## 2. Publication and Visibility Model

1. **Draft Protection**: Only documents satisfying `{ isPublished: true }` are returned to public endpoints. Queries on `/api/v1/projects` explicitly filter out drafts at the database layer.
2. **Active CV Rule**: The public endpoint `/api/v1/cv` queries exclusively for `{ isActive: true }`. When an admin marks a CV as active via `/api/v1/admin/cv/:id/activate`, an atomic transaction or multi-document update resets all other records to `{ isActive: false }`.
3. **Contact Submission Pipeline**: Public users write exclusively to `messages` through rate-limited `POST /api/v1/messages`. Public visitors have zero read permissions on the messages collection.
